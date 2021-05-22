package authjwt

import (
	"fmt"
	"strings"

	"github.com/dinhtrung/smpptools/pkg/fiber/authjwt/consts"
	"github.com/dinhtrung/smpptools/pkg/fiber/authjwt/web/rest"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
)

var ACCOUNT_RESOURCE rest.AccountResource
var USER_RESOURCE rest.UserResource

// Protected protect routes
func Protected() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey:   []byte(consts.JWTSECRET),
		ErrorHandler: jwtError,
	})
}

// HasAuthority check if the current role has specified authorities
func HasAuthority(authorityName string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals(consts.FIBER_CONTEXT_KEY).(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		if authorities, ok := claims[consts.AUTHORITIES_KEY]; ok && (authorities != nil) {
			authorities := strings.Split(claims[consts.AUTHORITIES_KEY].(string), ",")
			for _, authority := range authorities {
				if fmt.Sprint(authority) == authorityName {
					return c.Next()
				}
			}
		}
		return fiber.NewError(fiber.StatusForbidden, "missing required authority to access this resource")
	}
}

// jwtError return error for JWT
func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return fiber.NewError(fiber.StatusBadRequest, "missing or malformed authorization token")
	}
	return fiber.NewError(fiber.StatusUnauthorized, "invalid or expired authorization token")
}

// setupRoutes setup the route for application
func SetupRoutes(app *fiber.App) {
	// + Jhipster endpoint for ROLE_USER
	app.Get("api/account", ACCOUNT_RESOURCE.GetAccount)                                 // getAccount
	app.Post("api/account", ACCOUNT_RESOURCE.SaveAccount)                               // saveAccount
	app.Post("api/account/change-password", ACCOUNT_RESOURCE.ChangePassword)            // ChangePassword
	app.Post("api/account/reset-password/finish", ACCOUNT_RESOURCE.FinishPasswordReset) // finishPasswordReset
	app.Post("api/account/reset-password/init", ACCOUNT_RESOURCE.RequestPasswordReset)  // requestPasswordReset

	// + account public end point
	app.Get("api/activate", ACCOUNT_RESOURCE.ActivateAccount) // activateAccount
	app.Post("api/authenticate", ACCOUNT_RESOURCE.Login)      // isAuthenticated
	app.Post("api/register", ACCOUNT_RESOURCE.Register)       // registerAccount

	// + user Management routes
	app.Get("api/authorities", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.GetAuthorities)
	app.Get("api/admin/users", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.GetAllUser)
	app.Get("api/admin/users/:id", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.GetUser)
	app.Post("api/admin/users", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.CreateUser)
	app.Put("api/admin/users", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.UpdateUser)
	app.Delete("api/admin/users/:id", HasAuthority("ROLE_ADMIN"), USER_RESOURCE.DeleteUser)
}

// setupAuthJWT provide JWT for non-user related authentication
func SetupAuthJWT(srv *fiber.App, jwtSecret string) {
	consts.JWTSECRET = jwtSecret
	// JWT Middleware
	srv.Use(jwtware.New(jwtware.Config{
		ContextKey: consts.FIBER_CONTEXT_KEY,
		// return true to skip middleware
		Filter: func(c *fiber.Ctx) bool {
			//log.Printf("Checking jwt on path %s", c.Path())
			return strings.HasPrefix(c.Path(), "/api/activate") ||
				strings.HasPrefix(c.Path(), "/api/authenticate") ||
				strings.HasPrefix(c.Path(), "/api/register") ||
				strings.HasPrefix(c.Path(), "/api/account/reset-password")
		},
		SuccessHandler: func(c *fiber.Ctx) error {
			// declare locals:account to create audit log
			token := c.Locals(consts.FIBER_CONTEXT_KEY).(*jwt.Token)
			claims := token.Claims.(jwt.MapClaims)
			subject := claims["sub"].(string)
			c.Locals("account", subject)
			return c.Next()
		},
		SigningKey:    []byte(consts.JWTSECRET),
		SigningMethod: "HS512",
	}))
	srv.Get("api/account", HasAuthority("ROLE_USER"), ACCOUNT_RESOURCE.GetAccount)   // getAccount
	srv.Post("api/account", HasAuthority("ROLE_USER"), ACCOUNT_RESOURCE.SaveAccount) // saveAccount
}
