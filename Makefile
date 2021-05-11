# note: call scripts from /scripts
.DEFAULT_GOAL := all

GOBUILD=GOOS=linux GOARCH=amd64 go build 
GOSTATICBUILD=CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w -extldflags "-static"' 
# Clean all binaries
clean:
	rm -f build/package/*

go-update:
	go get -u ./...

smpp:
	$(GOBUILD) -o build/package/smpp-simulator cmd/smpp-simulator/smpp-simulator.go

# === PROJECT SPECIFIC TARGETS =========
generate-sources:
	docker run --rm -v "${PWD}:/local" -u 1000:1000 openapitools/openapi-generator-cli:latest generate \
    -i /local/api/openapi.yaml \
    -g go \
    -o /local/pkg/smpptools/openapi

