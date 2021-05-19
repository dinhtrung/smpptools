# \SmscInstanceResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateSmscInstanceUsingPOST**](SmscInstanceResourceApi.md#CreateSmscInstanceUsingPOST) | **Post** /api/smsc-instances | createSmscInstance
[**DeleteSmscInstanceUsingDELETE**](SmscInstanceResourceApi.md#DeleteSmscInstanceUsingDELETE) | **Delete** /api/smsc-instances/{id} | deleteSmscInstance
[**GetAllSessionsOnInstanceUsingGET**](SmscInstanceResourceApi.md#GetAllSessionsOnInstanceUsingGET) | **Get** /api/smsc-instances/{id}/sessions | List all connected ESME sessions on this SMSC Instance
[**GetAllSmscInstancesUsingGET**](SmscInstanceResourceApi.md#GetAllSmscInstancesUsingGET) | **Get** /api/smsc-instances | getAllSmscInstances
[**GetSmscInstanceUsingGET**](SmscInstanceResourceApi.md#GetSmscInstanceUsingGET) | **Get** /api/smsc-instances/{id} | getSmscInstance
[**PartialUpdateSmscInstanceUsingPATCH**](SmscInstanceResourceApi.md#PartialUpdateSmscInstanceUsingPATCH) | **Patch** /api/smsc-instances/{id} | partialUpdateSmscInstance
[**StartBatchOnSmscInstanceUsingPOST**](SmscInstanceResourceApi.md#StartBatchOnSmscInstanceUsingPOST) | **Post** /api/smsc-instances/{id}/batch | Start sending batch on selected SMSC Instance
[**StartSmscInstanceUsingGET**](SmscInstanceResourceApi.md#StartSmscInstanceUsingGET) | **Get** /api/smsc-instances/{id}/start | Start selected SMSC Instance
[**StopAllBatchSmscInstanceUsingDELETE**](SmscInstanceResourceApi.md#StopAllBatchSmscInstanceUsingDELETE) | **Delete** /api/smsc-instances/{id}/batch | Stop all batch sending using DELETE
[**StopSmscInstanceUsingDELETE**](SmscInstanceResourceApi.md#StopSmscInstanceUsingDELETE) | **Delete** /api/smsc-instances/{id}/stop | Stop selected SMSC Instance
[**UpdateSmscInstanceUsingPUT**](SmscInstanceResourceApi.md#UpdateSmscInstanceUsingPUT) | **Put** /api/smsc-instances/{id} | updateSmscInstance



## CreateSmscInstanceUsingPOST

> SmscInstance CreateSmscInstanceUsingPOST(ctx).SmscInstance(smscInstance).Execute()

createSmscInstance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    smscInstance := *openapiclient.NewSmscInstance("Name_example") // SmscInstance |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.CreateSmscInstanceUsingPOST(context.Background()).SmscInstance(smscInstance).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.CreateSmscInstanceUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateSmscInstanceUsingPOST`: SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.CreateSmscInstanceUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateSmscInstanceUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **smscInstance** | [**SmscInstance**](SmscInstance.md) |  | 

### Return type

[**SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteSmscInstanceUsingDELETE

> DeleteSmscInstanceUsingDELETE(ctx, id).Execute()

deleteSmscInstance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.DeleteSmscInstanceUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.DeleteSmscInstanceUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteSmscInstanceUsingDELETERequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetAllSessionsOnInstanceUsingGET

> SmscSession GetAllSessionsOnInstanceUsingGET(ctx, id).Execute()

List all connected ESME sessions on this SMSC Instance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.GetAllSessionsOnInstanceUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.GetAllSessionsOnInstanceUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllSessionsOnInstanceUsingGET`: SmscSession
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.GetAllSessionsOnInstanceUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllSessionsOnInstanceUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SmscSession**](SmscSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetAllSmscInstancesUsingGET

> []SmscInstance GetAllSmscInstancesUsingGET(ctx).Execute()

getAllSmscInstances

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.GetAllSmscInstancesUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.GetAllSmscInstancesUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllSmscInstancesUsingGET`: []SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.GetAllSmscInstancesUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllSmscInstancesUsingGETRequest struct via the builder pattern


### Return type

[**[]SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetSmscInstanceUsingGET

> SmscInstance GetSmscInstanceUsingGET(ctx, id).Execute()

getSmscInstance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.GetSmscInstanceUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.GetSmscInstanceUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetSmscInstanceUsingGET`: SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.GetSmscInstanceUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSmscInstanceUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateSmscInstanceUsingPATCH

> SmscInstance PartialUpdateSmscInstanceUsingPATCH(ctx, id).SmscInstance(smscInstance).Execute()

partialUpdateSmscInstance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id
    smscInstance := *openapiclient.NewSmscInstance("Name_example") // SmscInstance |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.PartialUpdateSmscInstanceUsingPATCH(context.Background(), id).SmscInstance(smscInstance).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.PartialUpdateSmscInstanceUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateSmscInstanceUsingPATCH`: SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.PartialUpdateSmscInstanceUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateSmscInstanceUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscInstance** | [**SmscInstance**](SmscInstance.md) |  | 

### Return type

[**SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StartBatchOnSmscInstanceUsingPOST

> StartBatchOnSmscInstanceUsingPOST(ctx, id).Batch(batch).Execute()

Start sending batch on selected SMSC Instance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id
    batch := *openapiclient.NewBatch() // Batch |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.StartBatchOnSmscInstanceUsingPOST(context.Background(), id).Batch(batch).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.StartBatchOnSmscInstanceUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiStartBatchOnSmscInstanceUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **batch** | [**Batch**](Batch.md) |  | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StartSmscInstanceUsingGET

> SmscInstance StartSmscInstanceUsingGET(ctx, id).Execute()

Start selected SMSC Instance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.StartSmscInstanceUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.StartSmscInstanceUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `StartSmscInstanceUsingGET`: SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.StartSmscInstanceUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiStartSmscInstanceUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StopAllBatchSmscInstanceUsingDELETE

> StopAllBatchSmscInstanceUsingDELETE(ctx, id).Execute()

Stop all batch sending using DELETE

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | SMS Intance ID

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.StopAllBatchSmscInstanceUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.StopAllBatchSmscInstanceUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | SMS Intance ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiStopAllBatchSmscInstanceUsingDELETERequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StopSmscInstanceUsingDELETE

> StopSmscInstanceUsingDELETE(ctx, id).Execute()

Stop selected SMSC Instance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.StopSmscInstanceUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.StopSmscInstanceUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiStopSmscInstanceUsingDELETERequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateSmscInstanceUsingPUT

> SmscInstance UpdateSmscInstanceUsingPUT(ctx, id).SmscInstance(smscInstance).Execute()

updateSmscInstance

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    id := "id_example" // string | id
    smscInstance := *openapiclient.NewSmscInstance("Name_example") // SmscInstance |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscInstanceResourceApi.UpdateSmscInstanceUsingPUT(context.Background(), id).SmscInstance(smscInstance).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscInstanceResourceApi.UpdateSmscInstanceUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateSmscInstanceUsingPUT`: SmscInstance
    fmt.Fprintf(os.Stdout, "Response from `SmscInstanceResourceApi.UpdateSmscInstanceUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateSmscInstanceUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscInstance** | [**SmscInstance**](SmscInstance.md) |  | 

### Return type

[**SmscInstance**](SmscInstance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

