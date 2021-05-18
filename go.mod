module github.com/dinhtrung/smpptools

go 1.14

require (
	github.com/ajankovic/gsm v0.1.0
	github.com/ajankovic/smpp v0.1.3
	github.com/fiorix/go-smpp v0.0.0-20210403173735-2894b96e70ba
	github.com/gofiber/fiber/v2 v2.8.0
	github.com/gofiber/websocket/v2 v2.0.3
	github.com/google/uuid v1.2.0
	github.com/knadh/koanf v0.16.0
	github.com/markbates/pkger v0.17.1
	github.com/sethvargo/go-limiter v0.6.0
	github.com/tidwall/buntdb v1.2.3
	golang.org/x/oauth2 v0.0.0-20180821212333-d2e6202438be
	golang.org/x/text v0.3.6
)

replace github.com/ajankovic/smpp => ../smpp

replace github.com/sethvargo/go-limiter => ../go-limiter
