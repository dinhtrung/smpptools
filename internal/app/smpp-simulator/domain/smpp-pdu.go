package domain

import (
	"github.com/ajankovic/smpp/pdu"
	"github.com/google/uuid"
)

const PDU = "PDU"

type BaseSM struct {
	ID            string
	Name          string
	SM            pdu.SubmitSm
	ShortMessages []string
}

func (c *BaseSM) Key() string {
	if c.ID == "" {
		c.ID = uuid.NewString()
	}
	return PDU + ":" + c.ID
}
