package domain

import (
	"fmt"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
)

const ESME = "ESME"

type EsmeConnection struct {
	ID   string
	Info dto.SmppConnectionProfile
}

func (c *EsmeConnection) Key() string {
	if c.ID == "" {
		c.ID = fmt.Sprintf("%s:%s:%s", ESME, c.Info.Connection.SystemID, c.Info.Connection.Addr)
	}
	return c.ID
}
