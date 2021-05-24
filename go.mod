module github.com/dinhtrung/smpptools

go 1.14

require (
	github.com/ajankovic/smpp v0.1.3
	github.com/brianvoe/gofakeit/v6 v6.4.1
	github.com/fasthttp/websocket v1.4.3 // indirect
	github.com/fiorix/go-smpp v0.0.0-20210403173735-2894b96e70ba
	github.com/form3tech-oss/jwt-go v3.2.3+incompatible
	github.com/gabriel-vasile/mimetype v1.3.0
	github.com/gobuffalo/here v0.6.2 // indirect
	github.com/gofiber/fiber/v2 v2.10.0
	github.com/gofiber/jwt/v2 v2.2.1
	github.com/gofiber/websocket/v2 v2.0.3
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/google/uuid v1.2.0
	github.com/gosimple/slug v1.9.0
	github.com/json-iterator/go v1.1.11 // indirect
	github.com/klauspost/cpuid/v2 v2.0.6 // indirect
	github.com/knadh/koanf v1.0.0
	github.com/markbates/pkger v0.17.1
	github.com/minio/md5-simd v1.1.2 // indirect
	github.com/minio/minio-go/v7 v7.0.10
	github.com/minio/sha256-simd v1.0.0 // indirect
	github.com/rs/xid v1.3.0 // indirect
	github.com/savsgio/gotils v0.0.0-20210520110740-c57c45b83e0a // indirect
	github.com/sethvargo/go-limiter v0.6.0
	github.com/tidwall/btree v0.5.0 // indirect
	github.com/tidwall/buntdb v1.2.3
	github.com/tidwall/gjson v1.8.0 // indirect
	github.com/valyala/fasthttp v1.25.0 // indirect
	github.com/vmihailenco/msgpack/v5 v5.3.2
	golang.org/x/crypto v0.0.0-20210513164829-c07d793c2f9a
	golang.org/x/net v0.0.0-20210521195947-fe42d452be8f // indirect
	golang.org/x/oauth2 v0.0.0-20210514164344-f6687ab2804c
	golang.org/x/sys v0.0.0-20210521203332-0cec03c779c1 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	gopkg.in/ini.v1 v1.62.0 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
)

replace github.com/ajankovic/smpp => ../smpp

replace github.com/sethvargo/go-limiter => ../go-limiter
