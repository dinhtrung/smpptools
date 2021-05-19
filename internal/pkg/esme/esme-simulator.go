package esme

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/ajankovic/smpp"
	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
)

var PDU_CHAN = make(chan *pdu.SubmitSm)
var ENQUIRELINK_TIMER *time.Ticker

// EsmeSimulator hold the session information
type EsmeSimulator struct {
	config  *openapi.EsmeSession
	Session *smpp.Session
}

// Create a new session
func NewEsmeSimulator(cfg *openapi.EsmeSession) EsmeSimulator {
	return EsmeSimulator{config: cfg}
}

// Bind perform bind request to server for testing
func (c *EsmeSimulator) Start() error {
	var err error
	account := c.config.GetAccount()
	sc := smpp.SessionConf{
		ID: uuid.NewString(),

		Handler:  smpp.HandlerFunc(c.SessionHandleFunc),
		SystemID: account.GetSystemID(),
		Logger:   smpp.DefaultLogger{},
	}
	bindConf := smpp.BindConf{
		Addr:     fmt.Sprintf("%s:%d", account.GetHost(), account.GetPort()),
		SystemID: account.GetSystemID(),
		Password: account.GetPassword(),
	}

	switch strings.ToLower(account.GetBindType()) {
	case "rx", "receiver":
		bindConf.AddrRange = account.GetAddressRange()
		bindConf.AddrTon = int(account.GetAddressTON())
		bindConf.AddrNpi = int(account.GetAddressNPI())
		session, err := smpp.BindRx(sc, bindConf)
		if err != nil {
			return err
		}
		log.Printf("bind receiver: %s", session.ID())
		c.Session = session
	case "tx", "transmitter":
		session, err := smpp.BindTx(sc, bindConf)
		if err != nil {
			return err
		}
		log.Printf("bind transmitter: %s", session.ID())
		c.Session = session
	default:
		bindConf.AddrRange = account.GetAddressRange()
		bindConf.AddrTon = int(account.GetAddressTON())
		bindConf.AddrNpi = int(account.GetAddressNPI())
		session, err := smpp.BindTRx(sc, bindConf)
		if err != nil {
			return err
		}
		log.Printf("bind transceiver: %s", session.ID())
		c.Session = session
	}
	if err == nil {
		c.config.SetId(c.Session.ID())
		c.config.SetLocalAddr(c.Session.LocalAddr())
		c.config.SetCreatedAt(time.Now())
		// + save to DB
		instances.EsmeSessionRepo.Save(c.config)
		services.SMPP_CLIENT_SESSIONS[c.Session.ID()] = c.Session
		go func() {
			for {
				select {
				case <-c.Session.NotifyClosed():
					return
				case req := <-PDU_CHAN:
					c.Session.Send(context.Background(), req)
				case <-ENQUIRELINK_TIMER.C:
					c.Session.Send(context.Background(), &pdu.EnquireLink{})
				}
			}
		}()
	}
	return err
}

// Stop terminate the current session
func (c *EsmeSimulator) Stop() {
	sid := c.Session.ID()
	if err := c.Session.Close(); err != nil {
		log.Printf("[%s] error close session: %s", sid, err)
	}
	delete(services.SMPP_CLIENT_SESSIONS, sid)
}

// SessionHandleFunc handle incoming messages
func (c *EsmeSimulator) SessionHandleFunc(ctx *smpp.Context) {
	switch ctx.CommandID() {
	case pdu.DeliverSmID:
		req, _ := ctx.DeliverSm()
		if req.EsmClass.Type == pdu.DelRecEsmType {
			dlr, err := pdu.ParseDeliveryReceipt(req.ShortMessage)
			if err != nil {
				log.Printf("<< [%s] ERR delivery_receipt: %s", c.Session.ID(), err)
			}
			log.Printf("<< [%s] delivery_receipt %+v", c.Session.ID(), dlr)
		} else {
			log.Printf("<< [%s] deliver_sm %+v", c.Session.ID(), req)
		}
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
		resp := req.Response(uuid.NewString())
		ctx.Respond(resp, pdu.StatusOK)
	case pdu.DataSmID:
		req, _ := ctx.DataSm()
		log.Printf("<< [%s] data_sm %+v", c.Session.ID(), req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
		resp := &pdu.DataSmResp{}
		ctx.Respond(resp, pdu.StatusRejeAppErr)

	case pdu.SubmitSmID:
		req, _ := ctx.SubmitSm()
		log.Printf("<< [%s] submit_sm %+v", c.Session.ID(), req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
	}
}
