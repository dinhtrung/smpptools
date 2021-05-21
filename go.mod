module github.com/dinhtrung/smpptools

go 1.14

require (
	github.com/ajankovic/smpp v0.1.3
	github.com/brianvoe/gofakeit/v6 v6.4.1
	github.com/fiorix/go-smpp v0.0.0-20210403173735-2894b96e70ba
	github.com/gabriel-vasile/mimetype v1.3.0
	github.com/gofiber/fiber/v2 v2.8.0
	github.com/gofiber/websocket/v2 v2.0.3
	github.com/google/uuid v1.2.0
	github.com/gosimple/slug v1.9.0
	github.com/knadh/koanf v0.16.0
	github.com/markbates/pkger v0.17.1
	github.com/minio/minio-go/v7 v7.0.10
	github.com/sethvargo/go-limiter v0.6.0
	github.com/tidwall/buntdb v1.2.3
	github.com/vmihailenco/msgpack/v5 v5.3.2
	golang.org/x/oauth2 v0.0.0-20180821212333-d2e6202438be
)

replace github.com/ajankovic/smpp => ../smpp

replace github.com/sethvargo/go-limiter => ../go-limiter
