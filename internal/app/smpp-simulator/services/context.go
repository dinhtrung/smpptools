package services

import (
	"context"

	"github.com/daominah/smpp"
)

// SMPP_SESSIONS hold a map of session unique name vs its cancelFunc
var SMPP_SESSIONS = make(map[string]*context.CancelFunc)

// SMPP_CLIENT_SESSIONS hold a map of session key by session name
var SMPP_CLIENT_SESSIONS = make(map[string]*smpp.Session)

// SMSC_INSTANCES hold a map of session unique name vs its cancelFunc
var SMSC_INSTANCES = make(map[string]*smpp.Server)
