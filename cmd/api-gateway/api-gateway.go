package main

import (
	"flag"
	"fmt"
	"log"
	"strings"

	"github.com/dinhtrung/smpptools/internal/app"
	authImpl "github.com/dinhtrung/smpptools/internal/app/api-gateway/services/impl"
	"github.com/dinhtrung/smpptools/internal/app/s3proxy"
	authJwt "github.com/dinhtrung/smpptools/pkg/fiber/authjwt"
	authApi "github.com/dinhtrung/smpptools/pkg/fiber/authjwt/web/rest"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/proxy"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/markbates/pkger"
)

var configFile string

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&configFile, "config", "configs/api-gateway.yaml", "API Gateway configuration file")
	flag.Parse()

	// 1 - set default settings for components.
	app.BuntDBConfig()
	app.S3Config()

	// 2 - override defaults with configuration file and watch changes
	app.ConfigInit(configFile)
	app.ConfigWatch(configFile)

	app.S3Init()
	app.BuntDBInit()

	// 3 - bring up components
	// + inject UserServiceDummy into application
	userRepo := authImpl.NewUserRepositoryBuntDB(app.Config.MustString("buntdb.path"))
	userSvc := authImpl.NewUserServiceBuntDB(userRepo)
	// 4 - setup the web server
	srv := fiber.New(fiber.Config{
		BodyLimit: 50 * 1024 * 1024,
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				return c.Status(code).JSON(e)
			}
			return c.Status(code).JSON(fiber.Map{"error": code, "message": err.Error()})
		},
	})
	configureFiber(srv)

	authJwt.USER_RESOURCE = authApi.NewDefaultUserResource(userSvc, userRepo)
	authJwt.ACCOUNT_RESOURCE = authApi.NewDefaultAccountResource(userSvc)
	authJwt.SetupAuthJWT(srv, app.Config.MustString("security.jwt-secret"))
	authJwt.SetupRoutes(srv)
	s3proxy.SetupRoutes(srv)
	setupProxy(srv)
	if app.Config.String("https.listen") != "" {
		log.Fatal(srv.ListenTLS(app.Config.String("https.listen"), app.Config.MustString("https.cert"), app.Config.MustString("https.key")))
	} else {
		log.Fatal(srv.Listen(app.Config.String("http.listen")))
	}
}

// configureFiber start the fiber with common settings
func configureFiber(srv *fiber.App) {
	staticAsset := filesystem.New(filesystem.Config{
		Next: func(c *fiber.Ctx) bool {
			return strings.HasPrefix(c.Path(), "/api") || strings.HasPrefix(c.Path(), "/services")
		},
		Root: pkger.Dir("/web"),
	})
	srv.Use(staticAsset)
	// + logging
	srv.Use(logger.New(logger.Config{
		TimeFormat: "2006-01-02T15:04:05-0700",
	}))

	srv.Use(recover.New())
}

// setupProxy setup the reverse proxy based on
func setupProxy(srv *fiber.App) {
	for k, v := range app.Config.StringsMap("services") {
		serviceNamespace := fmt.Sprintf("/services/%s/", strings.TrimRight(k, "/"))
		log.Printf("proxy request on %s to %v", serviceNamespace, v)
		srv.Use(serviceNamespace, proxy.Balancer(proxy.Config{
			Servers: v,
			ModifyRequest: func(c *fiber.Ctx) error {
				c.Request().Header.Add("X-Real-IP", c.IP())
				c.Path(c.Path()[len(serviceNamespace):])
				return nil
			},
			ModifyResponse: func(c *fiber.Ctx) error {
				c.Response().Header.Del(fiber.HeaderServer)
				return nil
			},
		}))
	}
}
