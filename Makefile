# note: call scripts from /scripts
.DEFAULT_GOAL := all

GOBUILD=GOOS=linux GOARCH=amd64 go build 
GOWIN=GOOS=windows GOARCH=amd64 go build
GOSTATICBUILD=CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w -extldflags "-static"' 
# Clean all binaries
clean:
	rm -f build/package/*
	find ./ -iname 'pkged.go' -exec rm -f '{}' \;
go-update:
	go get -u ./...

pkger:
	pkger -o cmd/smpp-simulator
	go mod vendor

smpp:
	$(GOBUILD) -o build/package/smpp-simulator cmd/smpp-simulator/*.go

smpp-windows:
	$(GOWIN) -o build/package/smpp-simulator.exe cmd/smpp-simulator/*.go

# === PROJECT SPECIFIC TARGETS =========
generate-sources:
	docker run --rm -v "${PWD}:/local" -u 1000:1000 openapitools/openapi-generator-cli:latest generate \
    -i /local/api/openapi.yaml \
    -g go \
    -o /local/pkg/smpptools/openapi

all: clean pkger smpp smpp-windows