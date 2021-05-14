package test

import (
	"context"
	"testing"
	"time"

	"github.com/sethvargo/go-limiter/dynamicmemorystore"
)

func TestRateLimitter(t *testing.T) {
	store, err := dynamicmemorystore.New(&dynamicmemorystore.Config{
		Index: 0,
		// Number of tokens allowed per interval.
		Tokens: []uint64{1, 1, 2, 3, 5, 8},

		// Interval until tokens reset.
		Interval: time.Minute,
	})
	if err != nil {
		t.Fatal(err)
	}

	ctx := context.Background()

	// key is the unique value upon which you want to rate limit, like an IP or
	// MAC address.
	key := "uniqueID"
	for {
		tokens, remaining, reset, ok, err := store.Take(ctx, key)
		if err != nil {
			t.Fatal(err)
		}
		// tokens is the configured tokens (15 in this example).
		_ = tokens

		// // remaining is the number of tokens remaining (14 now).
		_ = remaining

		// reset is the unix nanoseconds at which the tokens will replenish.
		_ = reset

		// ok indicates whether the take was successful. If the key is over the
		// configured limit, ok will be false.
		// _ = ok

		// Here's a more realistic example:
		if ok {
			t.Log("consumed 1 event")
		}
	}

}
