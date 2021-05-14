package dto

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/ajankovic/smpp"
	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/google/uuid"
)

var MO_CHAN = make(chan *pdu.DeliverSm)

// SmppConnectionProfile hold the session information
type SmscInstance struct {
	Address             string
	Server              *smpp.Server             `json:"-"`
	Sessions            map[string]*smpp.Session `json:"-"` // active client session. key is a pattern of ${systemID}-${ip-host}-${unixTimestamp}
	MobileOriginatedSMS *SmsSet                  // template of the Mobile OriginatedSMS to send out
	Accounts            map[string]*SMSCAccount  // active smsc account, key by smpp context ID
}

// StartInstance perform bind request to server for testing
func (c *SmscInstance) StartInstance(ctx context.Context) error {
	var err error
	if _, ok := services.SMSC_INSTANCES[c.Address]; ok {
		return fmt.Errorf("there is already instance running on address %s", c.Address)
	}
	sc := smpp.SessionConf{
		Handler: smpp.HandlerFunc(c.SmscHandleFunc),
		Logger:  services.WebsocketLogger{},
	}

	c.Server = smpp.NewServer(c.Address, sc)
	c.Sessions = make(map[string]*smpp.Session)
	services.SMSC_INSTANCES[c.Address] = c.Server
	go func() {
		err := c.Server.ListenAndServe()
		if err != nil {
			log.Printf("error starting smsc: %s", err)
		}
	}()
	go func() {
		<-ctx.Done()
		log.Printf("[%s] stopping instance", c.Address)
		if err := c.Server.Unbind(context.Background()); err != nil {
			log.Printf("[%s] unable to send unbind to all connection: %s", c.Address, err)
		}
		if err := c.Server.Close(); err != nil {
			log.Printf("[%s] error close server instance: %s", c.Address, err)
		}
		delete(services.SMSC_INSTANCES, c.Address)

		// case req := <-MO_CHAN:
		// 	c.Sessions.Send(context.Background(), req)
		// case <-ENQUIRELINK_TIMER.C:
		// 	c.Session.Send(context.Background(), &pdu.EnquireLink{})
	}()
	return err
}

// SessionHandleFunc handle incoming messages
func (c *SmscInstance) SmscHandleFunc(ctx *smpp.Context) {
	switch ctx.CommandID() {
	case pdu.BindTransceiverID:
		c.Sessions[ctx.Sess.ID()] = ctx.Sess
		req, _ := ctx.BindTRx()
		rsp := req.Response("smsc")
		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.BindReceiverID:
		c.Sessions[ctx.Sess.ID()] = ctx.Sess
		req, _ := ctx.BindRx()
		rsp := req.Response("smsc")
		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.BindTransmitterID:
		c.Sessions[ctx.Sess.ID()] = ctx.Sess
		req, _ := ctx.BindTx()
		rsp := req.Response("smsc")
		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.UnbindID:
		delete(c.Sessions, ctx.Sess.ID())
		req, _ := ctx.Unbind()
		ctx.Respond(req.Response(), pdu.StatusOK)

	case pdu.EnquireLinkID:
		req, _ := ctx.EnquireLink()
		resp := req.Response()
		if err := ctx.Respond(resp, pdu.StatusOK); err != nil {
			log.Printf("client can't respond to the enquire_link")
		} else {
			log.Printf(">> enquire_link_resp[%+v]", ctx.SystemID())
		}

	case pdu.DeliverSmID:
		req, _ := ctx.DeliverSm()
		if req.EsmClass.Type == pdu.DelRecEsmType {
			dlr, err := pdu.ParseDeliveryReceipt(req.ShortMessage)
			if err != nil {
				log.Printf("<< [%s] ERR delivery_receipt: %s", ctx.Sess.ID(), err)
			}
			log.Printf("<< [%s] delivery_receipt %+v", ctx.Sess.ID(), dlr)
		} else {
			log.Printf("<< [%s] deliver_sm %+v", ctx.Sess.ID(), req)
		}
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
		resp := req.Response(uuid.NewString())
		ctx.Respond(resp, pdu.StatusOK)

	case pdu.DataSmID:
		req, _ := ctx.DataSm()
		log.Printf("<< [%s] data_sm %+v", ctx.Sess.ID(), req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
		resp := &pdu.DataSmResp{}
		ctx.Respond(resp, pdu.StatusRejeAppErr)

	// SubmitSM handling
	case pdu.SubmitSmID:
		req, _ := ctx.SubmitSm()
		msgID := uuid.NewString()
		resp := req.Response(msgID)
		ctx.Respond(resp, pdu.StatusOK)
		log.Printf("<< [%s] submit_sm %+v", ctx.Sess.ID(), req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}

		go c.SendDLRDelay(ctx.Sess.ID(), msgID, req)
	}
}

// SendDLRDelay send a message back to current client ID
func (c *SmscInstance) SendDLRDelay(sessionID string, msgID string, origin *pdu.SubmitSm) {
	if sess, ok := c.Sessions[sessionID]; ok {
		dlr := &pdu.DeliveryReceipt{
			Id:         msgID,
			Sub:        "001",
			SubmitDate: time.Now(),
			DoneDate:   time.Now(),
			Dlvrd:      "001",
			Stat:       pdu.DelStatDelivered,
			Err:        "000",
			Text:       "",
		}
		pduReq := pdu.NewPDU(pdu.DeliverSmID)
		req := pduReq.(*pdu.DeliverSm)
		req.ServiceType = origin.ServiceType
		req.SourceAddrTon = origin.DestAddrTon
		req.SourceAddrNpi = origin.DestAddrNpi
		req.SourceAddr = origin.DestinationAddr
		req.DestAddrTon = origin.SourceAddrTon
		req.DestAddrNpi = origin.SourceAddrNpi
		req.DestinationAddr = origin.SourceAddr
		req.EsmClass = origin.EsmClass
		req.EsmClass.Type = pdu.DelAckEsmType
		req.ProtocolID = origin.ProtocolID
		req.PriorityFlag = origin.PriorityFlag
		req.ScheduleDeliveryTime = origin.ScheduleDeliveryTime
		req.ValidityPeriod = origin.ValidityPeriod
		req.RegisteredDelivery = origin.RegisteredDelivery
		req.ReplaceIfPresentFlag = origin.ReplaceIfPresentFlag
		req.DataCoding = origin.DataCoding
		req.SmDefaultMsgID = origin.SmDefaultMsgID
		req.ShortMessage = dlr.String()

		// FIXME: This should come from current testing configuration
		time.Sleep(time.Duration(3) * time.Second)
		_, err := sess.Send(context.TODO(), pduReq)
		if err != nil {
			log.Printf("unable to send delivery receipt")
		}
	}
}
