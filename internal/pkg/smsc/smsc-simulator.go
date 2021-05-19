package smsc

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/ajankovic/smpp"
	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
)

const (
	CtxKeyAccount = iota
	CtxKeyFeatures
)

var MO_CHAN = make(chan *pdu.DeliverSm)

// SmppConnectionProfile hold the session information
type SmscSimulator struct {
	config *openapi.SmscInstance
	server *smpp.Server
}

func NewSmscSimulatorInstance(config *openapi.SmscInstance) SmscSimulator {
	return SmscSimulator{
		config: config,
	}
}

// StartInstance perform bind request to server for testing
func (c *SmscSimulator) Start(ctx context.Context) error {
	instancePort := c.config.GetPort()
	if instancePort <= 0 {
		return fmt.Errorf("invalid port")
	}

	if _, ok := services.SMSC_INSTANCES[instancePort]; ok {
		return fmt.Errorf("there is already instance running on port %d", instancePort)
	}
	sc := smpp.SessionConf{
		Handler: smpp.HandlerFunc(c.SmscHandleFunc),
	}
	server := smpp.NewServer(fmt.Sprintf(":%d", instancePort), sc)
	services.SMSC_INSTANCES[instancePort] = server
	go func() {
		for {
			select {
			case <-ctx.Done():
				c.Stop()
			case req := <-MO_CHAN:
				for _, sess := range server.EsmeSessions {
					sess.Send(context.TODO(), req)
				}
			}
		}
	}()
	c.server = server
	return server.ListenAndServe()
}

// Stop terminate all server
func (c *SmscSimulator) Stop() {
	log.Printf("[%s] stopping instance", c.config.GetName())
	if err := c.server.Unbind(context.Background()); err != nil {
		log.Printf("[%s] unable to send unbind to all connection: %s", c.config.GetName(), err)
		return
	}
	delete(services.SMSC_INSTANCES, c.config.GetPort())
}

// SessionHandleFunc handle incoming messages
func (c *SmscSimulator) SmscHandleFunc(ctx *smpp.Context) {
	switch ctx.CommandID() {
	case pdu.BindTransceiverID:
		req, _ := ctx.BindTRx()
		rsp := req.Response(c.config.GetName())
		if c.config.GetAllowAnonymous() {
			ctx.Respond(rsp, pdu.StatusOK)
			return
		}
		account, err := instances.SmscAccountRepo.FindById(req.SystemID)
		if err != nil {
			ctx.Respond(rsp, pdu.StatusInvSysID)
			return
		}
		if account.GetBindType() != "transceiver" {
			ctx.Respond(rsp, pdu.StatusInvBnd)
			return
		}
		if account.GetPassword() != req.Password {
			ctx.Respond(rsp, pdu.StatusInvPaswd)
			return
		}
		sess := openapi.NewSmscSessionWithDefaults()
		sess.Account = account
		sess.SetCreatedAt(time.Now())
		sess.SetRemoteAddr(ctx.RemoteAddr())
		sess.SetId(ctx.SessionID())
		instances.SmscSessionRepo.Save(sess)

		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.BindReceiverID:
		req, _ := ctx.BindRx()
		rsp := req.Response(c.config.GetName())
		if c.config.GetAllowAnonymous() {
			ctx.Respond(rsp, pdu.StatusOK)
			return
		}
		account, err := instances.SmscAccountRepo.FindById(req.SystemID)
		if err != nil {
			ctx.Respond(rsp, pdu.StatusInvSysID)
			return
		}
		if account.GetBindType() != "receiver" {
			ctx.Respond(rsp, pdu.StatusInvBnd)
			return
		}
		if account.GetPassword() != req.Password {
			ctx.Respond(rsp, pdu.StatusInvPaswd)
			return
		}
		sess := openapi.NewSmscSessionWithDefaults()
		sess.Account = account
		sess.SetCreatedAt(time.Now())
		sess.SetRemoteAddr(ctx.RemoteAddr())
		sess.SetId(ctx.SessionID())
		instances.SmscSessionRepo.Save(sess)
		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.BindTransmitterID:
		req, _ := ctx.BindTx()
		rsp := req.Response(c.config.GetName())
		if c.config.GetAllowAnonymous() {
			ctx.Respond(rsp, pdu.StatusOK)
			return
		}
		account, err := instances.SmscAccountRepo.FindById(req.SystemID)
		if err != nil {
			ctx.Respond(rsp, pdu.StatusInvSysID)
			return
		}
		if account.GetBindType() != "transmitter" {
			ctx.Respond(rsp, pdu.StatusInvBnd)
			return
		}
		if account.GetPassword() != req.Password {
			ctx.Respond(rsp, pdu.StatusInvPaswd)
			return
		}
		sess := openapi.NewSmscSessionWithDefaults()
		sess.Account = account
		sess.SetCreatedAt(time.Now())
		sess.SetRemoteAddr(ctx.RemoteAddr())
		sess.SetId(ctx.SessionID())
		instances.SmscSessionRepo.Save(sess)
		ctx.Respond(rsp, pdu.StatusOK)

	case pdu.UnbindID:
		req, _ := ctx.Unbind()
		instances.SmscSessionRepo.DeleteById(ctx.SessionID())
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
func (c *SmscSimulator) SendDLRDelay(sessionID string, msgID string, origin *pdu.SubmitSm) {
	if sess, ok := c.server.EsmeSessions[sessionID]; ok {
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
