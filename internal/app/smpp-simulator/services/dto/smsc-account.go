package dto

import "github.com/ajankovic/smpp"

// SmscAccount hold the settings for SMSC
type SMSCAccount struct {
	Name            string         // user-friendly name for this account
	Description     string         // description for this account
	Connection      smpp.BindConf  // binding information
	BindType        string         // bind type
	MaxBind         int            // max number of bind. 0 for unlimited
	SubmitRateLimit float32        // The rate limit on a particular account on TPS
	ErrorRatio      map[int]int    // the ratio to return error on SMSC. Key is command status, value is number of return
	DLRDelay        map[string]int // Delay in DLR. key is state, value is second to delay
	DLRStateRatio   map[string]int // ratio to return error code
}
