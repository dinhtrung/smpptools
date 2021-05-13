package main

import (
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/daominah/smpp"
	"github.com/daominah/smpp/pdu"
)

func TestSending(t *testing.T) {

	bc := smpp.BindConf{
		Addr:     "172.16.16.84:2775",
		SystemID: "1536",
		Password: "abcd1234",
	}
	sc := smpp.SessionConf{
		Sequencer: pdu.NewSequencer(4098759198),
	}
	sess, err := smpp.BindTRx(sc, bc)
	if err != nil {
		fail("Can't bind: %v", err)
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
		fail("Can't send message: %+v", err)
	}
	fmt.Fprintf(os.Stderr, "Message sent\n")
	fmt.Fprintf(os.Stderr, "Received response %s %+v\n", resp.CommandID(), resp)
	if err := smpp.Unbind(context.Background(), sess); err != nil {
		fmt.Fprintln(os.Stderr, err.Error())
	}
}

func fail(msg string, params ...interface{}) {
	fmt.Fprintf(os.Stderr, msg+"\n", params...)
	os.Exit(1)
}
