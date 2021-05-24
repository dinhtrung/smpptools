package test

import (
	"net/url"
	"testing"
)

func TestURIParser(t *testing.T) {
	uris := []string{
		"smpp-esme://test:test@127.0.0.1:2775/transceiver",
		"smpp-smsc://127.0.0.1:2776/receiver",
		"https://127.0.0.1:19060/api/test",
	}

	for _, URL := range uris {
		thisURL, err := url.Parse(URL)
		if err != nil {
			t.Fatal(err)
		}
		pass, passIsSet := thisURL.User.Password()
		t.Logf("Scheme: %s Username: %s Password: %s, %v Host: %s Port: %s Path: %s", thisURL.Scheme, thisURL.User.Username(), pass, passIsSet, thisURL.Host, thisURL.Port(), thisURL.Path)

	}
}
