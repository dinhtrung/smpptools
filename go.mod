module github.com/dinhtrung/smpptools

go 1.14

require (
	github.com/ajankovic/smpp v0.1.3
	github.com/gofiber/fiber/v2 v2.8.0
	github.com/gofiber/websocket/v2 v2.0.3
	github.com/google/uuid v1.2.0
	github.com/knadh/koanf v0.16.0
	github.com/markbates/pkger v0.17.1
	github.com/tidwall/buntdb v1.2.3
	golang.org/x/oauth2 v0.0.0-20180821212333-d2e6202438be
)

replace github.com/ajankovic/smpp => ../smpp
