package dto

import (
	"time"

	"github.com/ajankovic/smpp/pdu"
)

// SmsSet hold a list of SMS for compose concatenate SMS
type SmsSet struct {
	ServiceType          string
	SourceAddrTon        int
	SourceAddrNpi        int
	SourceAddr           string
	DestAddrTon          int
	DestAddrNpi          int
	DestinationAddr      string
	EsmClass             pdu.EsmClass
	ProtocolID           int
	PriorityFlag         int
	ScheduleDeliveryTime time.Time
	ValidityPeriod       time.Time
	RegisteredDelivery   pdu.RegisteredDelivery
	ReplaceIfPresentFlag int
	DataCoding           int
	SmDefaultMsgID       int
	ShortMessage         string
	UDHParts             []string
	TxtParts             []string
	Options              *pdu.Options
}
