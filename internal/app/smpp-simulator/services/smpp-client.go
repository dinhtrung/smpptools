package services

import (
	"fmt"
	"log"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
)

// DefaultLogger prints logs if smpp.logs flag is set.
type WebsocketLogger struct{}

// InfoF implements Logger interface.
func (dl WebsocketLogger) InfoF(msg string, params ...interface{}) {
	channels.WS_BROADCAST <- fmt.Sprintf("INFO: "+msg, params...)
	log.Printf("INFO: "+msg+"\n", params...)
}

// ErrorF implements Logger interface.
func (dl WebsocketLogger) ErrorF(msg string, params ...interface{}) {
	channels.WS_BROADCAST <- fmt.Sprintf("ERROR: "+msg, params...)
	log.Printf("ERROR: "+msg+"\n", params...)
}
