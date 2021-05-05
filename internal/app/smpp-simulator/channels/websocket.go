package channels

import "github.com/gofiber/websocket/v2"

var WS_REGISTER = make(chan *websocket.Conn)
var WS_BROADCAST = make(chan string)
var WS_UNREGISTER = make(chan *websocket.Conn)
