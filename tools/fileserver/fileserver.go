package main

import (
	"flag"
	"log"
	"net/http"
)

var addr, path string

func main() {
	flag.StringVar(&addr, "a", ":80", "HTTP Server Address")
	flag.StringVar(&path, "p", "./assets", "Path to serve files from")
	flag.Parse()
	// Simple static webserver:
	log.Fatal(http.ListenAndServe(addr, http.FileServer(http.Dir("./assets"))))
}
