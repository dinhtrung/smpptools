package test

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/ajankovic/smpp"
	"github.com/ajankovic/smpp/pdu"
	"github.com/google/uuid"
)

func TestSMPPServer(t *testing.T) {
	serverAddr := "127.0.0.1:2775"
	systemID := "ExampleServer"

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(5)*time.Second)
	defer cancel()

	sessConf := smpp.SessionConf{
		Handler: smpp.HandlerFunc(func(ctx *smpp.Context) {
			switch ctx.CommandID() {
			case pdu.BindTransceiverID:
				btrx, err := ctx.BindTRx()
				if err != nil {
					t.Logf("Invalid PDU in context error: %+v", err)
				}
				resp := btrx.Response(systemID)
				if err := ctx.Respond(resp, pdu.StatusOK); err != nil {
					t.Logf("Server can't respond to the Binding request: %+v", err)
				}
			case pdu.SubmitSmID:
				sm, err := ctx.SubmitSm()
				if err != nil {
					t.Logf("Invalid PDU in context error: %+v", err)
				}
				t.Logf("UPPER: %s\n", strings.ToUpper(sm.ShortMessage))
				resp := sm.Response(uuid.NewString())
				if err := ctx.Respond(resp, pdu.StatusOK); err != nil {
					t.Logf("Server can't respond to the submit_sm request: %+v", err)
				}
			case pdu.UnbindID:
				unb, err := ctx.Unbind()
				if err != nil {
					t.Logf("Invalid PDU in context error: %+v", err)
				}
				resp := unb.Response()
				if err := ctx.Respond(resp, pdu.StatusOK); err != nil {
					t.Logf("Server can't respond to the submit_sm request: %+v", err)
				}
				ctx.CloseSession()
			}
		}),
	}
	srv := smpp.NewServer("localhost:2775", sessConf)
	go func() {
		<-ctx.Done()
		t.Log("shutting down server")
		srv.Unbind(context.TODO())
	}()

	t.Logf("'%s' is listening on '%s'\n", systemID, serverAddr)
	err := srv.ListenAndServe()
	if err != nil {
		t.Fatalf("Serving exited with error: %+v", err)
	}
	t.Log("Server closed")
}
