package channels

import (
	"os"
)

var TERMCHAN = make(chan os.Signal, 1)
