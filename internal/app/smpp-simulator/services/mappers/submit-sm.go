package mappers

import (
	"encoding/hex"
	"log"
	"math/rand"
	"strconv"
	"strings"

	"github.com/ajankovic/gsm"
	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/fiorix/go-smpp/smpp/pdu/pdutext"
	"golang.org/x/text/transform"
)

const GSM_MAXLEN = 160
const GSM_SPLITLEN = 152
const UCS_MAXLEN = 70
const UCS_SPLITLEN = 66
const BINARY_MAXLEN = 140
const BINARY_SPLITLEN = 132

func ToSubmitSM(r *openapi.BaseSm) ([]pdu.PDU, error) {
	results := make([]pdu.PDU, 0)
	isConcat := len(r.GetShortMessages()) > 1
	for _, part := range r.GetShortMessages() {
		segmentPDU := pdu.NewPDU(pdu.SubmitSmID)
		submit := segmentPDU.(*pdu.SubmitSm)
		submit.ServiceType = r.GetServiceType()
		submit.SourceAddr, submit.SourceAddrTon, submit.SourceAddrNpi = AddressNorm(r.GetSourceAddr(), int(r.GetSourceTON()), int(r.GetSourceNPI()))
		submit.DestinationAddr, submit.DestAddrTon, submit.DestAddrNpi = AddressNorm(r.GetDestinationAddr(), int(r.GetDestinationTON()), int(r.GetDestinationNPI()))

		submit.EsmClass = pdu.ParseEsmClass(byte(r.GetEsmClass()))
		if isConcat {
			submit.EsmClass.Feature |= pdu.UDHIEsmFeat
		}
		submit.ProtocolID = int(r.GetProtocolID())
		submit.PriorityFlag = int(r.GetPriorityFlag())
		submit.RegisteredDelivery = pdu.ParseRegisteredDelivery(byte(r.GetRegisteredDelivery()))
		submit.ReplaceIfPresentFlag = int(r.GetReplaceIfPresentFlag())
		submit.DataCoding = int(r.GetDataCoding())
		submit.SmDefaultMsgID = int(r.GetDefaultMessageID())
		submit.ShortMessageHex = part.GetUdhPart() + part.GetTxtPart()
		// FIXME: TLV should be in the same way as the message part
		results = append(results, segmentPDU)
	}
	return results, nil
}

func AddressNorm(addr string, ton, npi int) (string, int, int) {
	addr = strings.Replace(addr, "+", "00", 1)
	num, err := strconv.Atoi(addr)
	if ton == -1 {
		if err != nil {
			ton = 5
		} else {
			if num < 1000000 {
				ton = 3
			} else {
				ton = 1
			}
		}
	}
	if npi == -1 {
		if err != nil {
			npi = 0
		} else {
			if num < 1000000 {
				npi = 0
			} else {
				npi = 1
			}
		}
	}
	return addr, ton, npi
}
func SplitShortMessages(r *openapi.BaseSm) error {
	switch r.GetDataCoding() {
	case 4:
		return SplitDCS4(r)
	case 8:
		return SplitDCS8(r)
	default:
		return SplitGSM(r)
	}
}

func splitByWidth(str string, size int) []string {
	strLength := len(str)
	var splited []string
	var stop int
	for i := 0; i < strLength; i += size {
		stop = i + size
		if stop > strLength {
			stop = strLength
		}
		splited = append(splited, str[i:stop])
	}
	return splited
}

func SplitDCS4(r *openapi.BaseSm) error {
	parts := make([]openapi.ShortMessageHex, 0)
	if len(r.GetText()) > GSM_MAXLEN {
		msgTotal := len(r.GetText()) / GSM_SPLITLEN
		msgRef := rand.Int()
		msgPart := openapi.NewShortMessageHex()
		for msgCur := 1; msgCur <= msgTotal; msgCur++ {
			output := pdutext.Raw([]byte(r.GetText()[(msgCur-1)*GSM_SPLITLEN : msgCur*GSM_SPLITLEN]))
			msgPart.SetUdhPart(ConcatenateUdh5(msgRef, msgCur, msgTotal))
			msgPart.SetTxtPart(hex.EncodeToString(output.Encode()))
			parts = append(parts, *msgPart)
		}
		r.SetEsmClass(r.GetEsmClass() | 32)
	} else {
		output := pdutext.Raw([]byte(r.GetText()))
		msgPart := openapi.NewShortMessageHex()
		msgPart.SetTxtPart(hex.EncodeToString(output.Encode()))
		parts = append(parts, *msgPart)
	}
	r.SetShortMessages(parts)
	return nil
}

func SplitDCS8(r *openapi.BaseSm) error {
	parts := make([]openapi.ShortMessageHex, 0)
	if len(r.GetText()) > UCS_MAXLEN {
		txtParts := splitByWidth(r.GetText(), UCS_SPLITLEN)
		msgTotal := len(txtParts)
		msgRef := rand.Int31()
		msgPart := openapi.NewShortMessageHex()
		for msgCur, txtPart := range txtParts {
			output := pdutext.UCS2([]byte(txtPart))
			msgPart.SetUdhPart(ConcatenateUdh6(int16(msgRef), msgCur+1, msgTotal))
			msgPart.SetTxtPart(hex.EncodeToString(output.Encode()))
			parts = append(parts, *msgPart)
		}
		r.SetEsmClass(r.GetEsmClass() | 32)
	} else {
		output := pdutext.UCS2([]byte(r.GetText()))
		msgPart := openapi.NewShortMessageHex()
		msgPart.SetTxtPart(hex.EncodeToString(output.Encode()))
		parts = append(parts, *msgPart)
	}
	r.SetShortMessages(parts)
	return nil
}

func SplitGSM(r *openapi.BaseSm) error {
	encoder := gsm.NewEncoder(0)
	parts := make([]openapi.ShortMessageHex, 0)
	if len(r.GetText()) > GSM_MAXLEN {
		msgTotal := len(r.GetText()) / GSM_SPLITLEN
		msgRef := rand.Int()
		msgPart := openapi.NewShortMessageHex()
		for msgCur := 1; msgCur <= msgTotal; msgCur++ {
			output, _, err := transform.Bytes(encoder, []byte(r.GetText()[(msgCur-1)*GSM_SPLITLEN:msgCur*GSM_SPLITLEN]))
			if err != nil {
				return err
			}
			msgPart.SetUdhPart(ConcatenateUdh5(msgRef, msgCur, msgTotal))
			msgPart.SetTxtPart(hex.EncodeToString(output))
			parts = append(parts, *msgPart)
		}
		r.SetEsmClass(r.GetEsmClass() | 32)
	} else {
		output, _, err := transform.Bytes(encoder, []byte(r.GetText()))
		if err != nil {
			return err
		}
		msgPart := openapi.NewShortMessageHex()
		msgPart.SetTxtPart(hex.EncodeToString(output))
		parts = append(parts, *msgPart)
	}
	r.SetShortMessages(parts)
	return nil
}

// ConcatenateUdh5 return hex string for the UDH5 part for concatenate SMS
func ConcatenateUdh5(msgRef int, current int, total int) string {
	log.Printf("msgRef %d msgCur %d msgTotal %d", msgRef, current, total)
	udh := make([]byte, 6)
	udh[0] = 5
	udh[1] = 0
	udh[2] = 3
	udh[3] = byte(msgRef)
	udh[4] = byte(total)
	udh[5] = byte(current)
	return hex.EncodeToString(udh)
}

func ConcatenateUdh6(rn int16, current int, total int) string {
	udh := make([]byte, 7)
	udh[0] = 0x06           // length of user data header
	udh[1] = 0x08           // information element identifier, CSMS 16 bit reference number
	udh[2] = 0x04           // length of remaining header
	udh[3] = uint8(rn >> 8) // most significant byte of the reference number
	udh[4] = uint8(rn)      // least significant byte of the reference number
	udh[5] = uint8(total)   // total number of message parts
	udh[6] = uint8(current)
	return hex.EncodeToString(udh)
}
