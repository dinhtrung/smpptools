package domain

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/google/uuid"
)

const PDU = "PDU"

// BaseSM is shared settings for both SMSC Mobile Originated SMS and ESME SubmitSM profile
type BaseSM struct {
	ID          string
	Name        string
	Description string
	SM          dto.SmsSet
}

func (c *BaseSM) Key() string {
	if c.ID == "" {
		c.ID = uuid.NewString()
	}
	return PDU + ":" + c.ID
}
