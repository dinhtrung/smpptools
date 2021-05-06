package dto

import (
	"context"
	"encoding/json"
	"log"
	"strings"

	"github.com/daominah/smpp"
	"github.com/daominah/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/google/uuid"
)

// SmppConnectionProfile hold the session information
type SmppConnectionProfile struct {
	Name       string
	Connection smpp.BindConf
	BindType   string
	Session    *smpp.Session `json:"-"`
}

// Bind perform bind request to server for testing
func (c *SmppConnectionProfile) Bind(ctx context.Context) error {
	var err error
	sc := smpp.SessionConf{
		Handler: smpp.HandlerFunc(c.SessionHandleFunc),
	}
	if c.Name == "" {
		c.Name = uuid.NewString()
	}
	log.Printf("[%s] starting SMPP connection %s : %+v", c.Name, c.BindType, c.Connection)
	switch strings.ToLower(c.BindType) {
	case "rx", "receiver":
		c.Session, err = smpp.BindRx(sc, c.Connection)
	case "tx", "transmitter":
		c.Session, err = smpp.BindTx(sc, c.Connection)
	default:
		c.Session, err = smpp.BindTRx(sc, c.Connection)
	}
	if err == nil {
		services.SMPP_CLIENT_SESSIONS[c.Name] = c.Session
		go func() {
			<-ctx.Done()
			log.Printf("shutdown connection: %+v", c.Connection)
			if err := c.Session.Close(); err != nil {
				log.Printf("[%s] error close session: %s", c.Name, err)
			}
			delete(services.SMPP_CLIENT_SESSIONS, c.Name)
		}()
	}
	return err
}

// SessionHandleFunc handle incoming messages
func (c *SmppConnectionProfile) SessionHandleFunc(ctx *smpp.Context) {
	switch ctx.CommandID() {
	case pdu.DeliverSmID:
		req, _ := ctx.DeliverSm()
		log.Printf("<< [%s] deliver_sm %+v", c.Name, req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
	case pdu.DataSmID:
		req, _ := ctx.DataSm()
		log.Printf("<< [%s] data_sm %+v", c.Name, req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
	case pdu.SubmitSmID:
		req, _ := ctx.SubmitSm()
		log.Printf("<< [%s] submit_sm %+v", c.Name, req)
		if notif, err := json.Marshal(req); err == nil {
			channels.WS_BROADCAST <- string(notif)
		}
	}
}
