package ws

import (
	"log"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/gofiber/websocket/v2"
)

var WS_CLIENTS = make(map[*websocket.Conn]bool)

// RunHub handle connection register and deregister for websocket client
func RunHub() {
	for {
		select {
		case connection := <-channels.WS_REGISTER:
			WS_CLIENTS[connection] = true
			log.Printf("connection registered: %s", connection.RemoteAddr().String())

		case message := <-channels.WS_BROADCAST:
			log.Println("message received:", message)

			// Send the message to all clients
			for connection := range WS_CLIENTS {
				if err := connection.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
					log.Println("write error:", err)

					connection.WriteMessage(websocket.CloseMessage, []byte{})
					connection.Close()
					delete(WS_CLIENTS, connection)
				}
			}

		case connection := <-channels.WS_UNREGISTER:
			// Remove the client from the hub
			delete(WS_CLIENTS, connection)

			log.Println("connection unregistered")
		}
	}
}

// WebsocketHandle handle the web socket connection
func WebsocketHandle(c *websocket.Conn) {
	// When the function returns, unregister the client and close the connection
	defer func() {
		channels.WS_UNREGISTER <- c
		c.Close()
	}()

	// Register the client
	channels.WS_REGISTER <- c

	for {
		messageType, message, err := c.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("read error:", err)
			}

			return // Calls the deferred function, i.e. closes the connection on error
		}

		if messageType == websocket.TextMessage {
			// Broadcast the received message
			channels.WS_BROADCAST <- string(message)
		} else {
			log.Println("websocket message received of type", messageType)
		}
	}
}
