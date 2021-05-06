package dto

import (
	"context"
	"encoding/json"
	"log"
	"strings"
	"time"

	"github.com/daominah/smpp"
	"github.com/daominah/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/google/uuid"
)

var PDU_CHAN = make(chan *pdu.SubmitSm)
var ENQUIRELINK_TIMER *time.Ticker

// SmppConnectionProfile hold the session information
type SmppConnectionProfile struct {
	Connection smpp.BindConf
	BindType   string
	Session    *smpp.Session `json:"-"`
}

// Bind perform bind request to server for testing
func (c *SmppConnectionProfile) Bind(ctx context.Context) error {
	var err error
	sc := smpp.SessionConf{
		Handler:  smpp.HandlerFunc(c.SessionHandleFunc),
		SystemID: c.Connection.SystemID,
		Logger:   services.WebsocketLogger{},
	}

	switch strings.ToLower(c.BindType) {
	case "rx", "receiver":
		c.Session, err = smpp.BindRx(sc, c.Connection)
	case "tx", "transmitter":
		c.Session, err = smpp.BindTx(sc, c.Connection)
	default:
		c.Session, err = smpp.BindTRx(sc, c.Connection)
	}
	if err == nil {
		services.SMPP_CLIENT_SESSIONS[c.Session.ID()] = c.Session
		go func() {
			for {
				select {
				case <-ctx.Done():
					sid := c.Session.ID()
					if err := c.Session.Close(); err != nil {
						log.Printf("[%s] error close session: %s", sid, err)
					}
					delete(services.SMPP_CLIENT_SESSIONS, sid)
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

// SessionHandleFunc handle incoming messages
func (c *SmppConnectionProfile) SessionHandleFunc(ctx *smpp.Context) {
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
