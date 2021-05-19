package api

import (
	"context"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/gofiber/fiber/v2"
	"github.com/minio/minio-go/v7"
)

func CreateDataFileUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func DeleteDataFileUsingDELETE(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllDataFilesUsingGET(c *fiber.Ctx) error {
	res := make([]minio.ObjectInfo, 0)
	for object := range app.S3Client.ListObjects(context.TODO(), app.Config.String("s3.bucket"), minio.ListObjectsOptions{Prefix: "starthere", Recursive: true}) {
		res = append(res, object)
	}
	return c.JSON(res)
}

func GetDataFileUsingGET(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func PartialUpdateDataFileUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateDataFileUsingPUT(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
