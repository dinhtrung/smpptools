package services

import "context"

var SMPP_SESSIONS = make(map[string]*context.CancelFunc)
