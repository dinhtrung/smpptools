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

smpp:
	$(GOBUILD) -o build/package/smpp-simulator cmd/smpp-simulator/*.go

smpp-windows:
	$(GOWIN) -o build/package/smpp-simulator.exe cmd/smpp-simulator/*.go

all: clean pkger smpp smpp-windows