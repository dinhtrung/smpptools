package test

import (
	"context"
	"testing"

	"github.com/ajankovic/smpp"
	"github.com/ajankovic/smpp/pdu"
)

func TestSMPPClient(t *testing.T) {

	bc := smpp.BindConf{
		Addr:     "127.0.0.1:2775",
		SystemID: "1536",
		Password: "abcd1234",
	}
	sc := smpp.SessionConf{
		Sequencer: pdu.NewSequencer(4098759198),
	}
	sess, err := smpp.BindTRx(sc, bc)
	if err != nil {
		t.Fatalf("Can't bind: %v", err)
	}
	sm := &pdu.SubmitSm{
		SourceAddr:         "1536",
		DataCoding:         3,
		EsmClass:           pdu.EsmClass{Mode: 0, Type: pdu.DefaultEsmType, Feature: 0},
		RegisteredDelivery: pdu.ParseRegisteredDelivery(0),
		DestinationAddr:    "84936414498",
		ShortMessage:       "Hello world",
	}

	resp, err := sess.Send(context.Background(), sm)
	if err != nil {
		t.Fatalf("Can't send message: %+v", err)
	}
	t.Log("Message sent")
	t.Logf("Received response %s %+v", resp.CommandID(), resp)
	if err := smpp.Unbind(context.Background(), sess); err != nil {
		t.Fatal(err)
	}
}
