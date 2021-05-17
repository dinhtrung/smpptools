package mappers

import (
	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
)

func ToSubmitSM(r *openapi.BaseSm) ([]pdu.PDU, error) {
	results := make([]pdu.PDU, 0)
	segmentPDU := pdu.NewPDU(pdu.SubmitSmID)
	submit := segmentPDU.(*pdu.SubmitSm)
	submit.ServiceType = r.GetServiceType()
	submit.SourceAddrTon = int(r.GetSourceTON())
	submit.SourceAddrNpi = int(r.GetSourceNPI())
	submit.SourceAddr = r.GetSourceAddr()
	submit.DestAddrTon = int(r.GetDestinationTON())
	submit.DestAddrNpi = int(r.GetDestinationNPI())
	submit.DestinationAddr = r.GetDestinationAddr()
	submit.EsmClass = pdu.ParseEsmClass(byte(r.GetEsmClass()))
	submit.ProtocolID = int(r.GetProtocolID())
	submit.PriorityFlag = int(r.GetPriorityFlag())
	submit.RegisteredDelivery = pdu.ParseRegisteredDelivery(byte(r.GetRegisteredDelivery()))
	submit.ReplaceIfPresentFlag = int(r.GetReplaceIfPresentFlag())
	submit.DataCoding = int(r.GetDataCoding())
	submit.SmDefaultMsgID = int(r.GetDefaultMessageID())
	results = append(results, segmentPDU)
	return results, nil
}
