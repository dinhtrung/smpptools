# \SmscSessionResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ApiSmscSessionsIdBatchDelete**](SmscSessionResourceApi.md#ApiSmscSessionsIdBatchDelete) | **Delete** /api/smsc-sessions/{id}/batch | Stop all batch current running in selected SMSC sessions
[**ApiSmscSessionsIdStopDelete**](SmscSessionResourceApi.md#ApiSmscSessionsIdStopDelete) | **Delete** /api/smsc-sessions/{id}/stop | Stop the selected SMSC sessions
[**DeleteSmscSessionUsingDELETE**](SmscSessionResourceApi.md#DeleteSmscSessionUsingDELETE) | **Delete** /api/smsc-sessions/{id} | deleteSmscSession
[**GetAllSmscSessions**](SmscSessionResourceApi.md#GetAllSmscSessions) | **Get** /api/smsc-sessions | getAllSmscSessions
[**GetSmscSessionUsingGET**](SmscSessionResourceApi.md#GetSmscSessionUsingGET) | **Get** /api/smsc-sessions/{id} | getSmscSessionList
[**PartialUpdateSmscSessionUsingPATCH**](SmscSessionResourceApi.md#PartialUpdateSmscSessionUsingPATCH) | **Patch** /api/smsc-sessions/{id} | partialUpdateSmscSession
[**SendMobileOriginatedSMSUsingPOST**](SmscSessionResourceApi.md#SendMobileOriginatedSMSUsingPOST) | **Post** /api/smsc-sessions/{id}/send-mo | Send Mobile Originated SMS on selected session during Functional Testing
[**SendSMSonSmscSessionUsingPOST**](SmscSessionResourceApi.md#SendSMSonSmscSessionUsingPOST) | **Post** /api/smsc-sessions/{id}/batch | Send Mobile Originated SMS on selected session with given patterns and data files
[**UpdateSmscSessionUsingPUT**](SmscSessionResourceApi.md#UpdateSmscSessionUsingPUT) | **Put** /api/smsc-sessions/{id} | updateSmscSession



## ApiSmscSessionsIdBatchDelete

> ApiSmscSessionsIdBatchDelete(ctx, id).Execute()

Stop all batch current running in selected SMSC sessions

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
    id := "id_example" // string | ID of selected session

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.ApiSmscSessionsIdBatchDelete(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.ApiSmscSessionsIdBatchDelete``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiApiSmscSessionsIdBatchDeleteRequest struct via the builder pattern


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


## ApiSmscSessionsIdStopDelete

> ApiSmscSessionsIdStopDelete(ctx, id).Execute()

Stop the selected SMSC sessions

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
    id := "id_example" // string | ID of selected session

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.ApiSmscSessionsIdStopDelete(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.ApiSmscSessionsIdStopDelete``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiApiSmscSessionsIdStopDeleteRequest struct via the builder pattern


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


## DeleteSmscSessionUsingDELETE

> DeleteSmscSessionUsingDELETE(ctx, id).Execute()

deleteSmscSession

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
    resp, r, err := api_client.SmscSessionResourceApi.DeleteSmscSessionUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.DeleteSmscSessionUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteSmscSessionUsingDELETERequest struct via the builder pattern


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


## GetAllSmscSessions

> []SmscSession GetAllSmscSessions(ctx).Execute()

getAllSmscSessions

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
    resp, r, err := api_client.SmscSessionResourceApi.GetAllSmscSessions(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.GetAllSmscSessions``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllSmscSessions`: []SmscSession
    fmt.Fprintf(os.Stdout, "Response from `SmscSessionResourceApi.GetAllSmscSessions`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllSmscSessionsRequest struct via the builder pattern


### Return type

[**[]SmscSession**](SmscSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetSmscSessionUsingGET

> SmscSession GetSmscSessionUsingGET(ctx, id).Execute()

getSmscSessionList

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
    resp, r, err := api_client.SmscSessionResourceApi.GetSmscSessionUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.GetSmscSessionUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetSmscSessionUsingGET`: SmscSession
    fmt.Fprintf(os.Stdout, "Response from `SmscSessionResourceApi.GetSmscSessionUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSmscSessionUsingGETRequest struct via the builder pattern


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


## PartialUpdateSmscSessionUsingPATCH

> SmscSession PartialUpdateSmscSessionUsingPATCH(ctx, id).SmscSession(smscSession).Execute()

partialUpdateSmscSession

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
    smscSession := *openapiclient.NewSmscSession("Id_example") // SmscSession |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.PartialUpdateSmscSessionUsingPATCH(context.Background(), id).SmscSession(smscSession).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.PartialUpdateSmscSessionUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateSmscSessionUsingPATCH`: SmscSession
    fmt.Fprintf(os.Stdout, "Response from `SmscSessionResourceApi.PartialUpdateSmscSessionUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateSmscSessionUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscSession** | [**SmscSession**](SmscSession.md) |  | 

### Return type

[**SmscSession**](SmscSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendMobileOriginatedSMSUsingPOST

> SendMobileOriginatedSMSUsingPOST(ctx, id).BaseSm(baseSm).Execute()

Send Mobile Originated SMS on selected session during Functional Testing

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
    id := "id_example" // string | ID of selected session
    baseSm := *openapiclient.NewBaseSm() // BaseSm |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.SendMobileOriginatedSMSUsingPOST(context.Background(), id).BaseSm(baseSm).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.SendMobileOriginatedSMSUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiSendMobileOriginatedSMSUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **baseSm** | [**BaseSm**](BaseSm.md) |  | 

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


## SendSMSonSmscSessionUsingPOST

> SendSMSonSmscSessionUsingPOST(ctx, id).Batch(batch).Execute()

Send Mobile Originated SMS on selected session with given patterns and data files

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
    id := "id_example" // string | ID of selected session
    batch := *openapiclient.NewBatch() // Batch |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.SendSMSonSmscSessionUsingPOST(context.Background(), id).Batch(batch).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.SendSMSonSmscSessionUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiSendSMSonSmscSessionUsingPOSTRequest struct via the builder pattern


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


## UpdateSmscSessionUsingPUT

> SmscSession UpdateSmscSessionUsingPUT(ctx, id).SmscSession(smscSession).Execute()

updateSmscSession

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
    smscSession := *openapiclient.NewSmscSession("Id_example") // SmscSession |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscSessionResourceApi.UpdateSmscSessionUsingPUT(context.Background(), id).SmscSession(smscSession).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscSessionResourceApi.UpdateSmscSessionUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateSmscSessionUsingPUT`: SmscSession
    fmt.Fprintf(os.Stdout, "Response from `SmscSessionResourceApi.UpdateSmscSessionUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateSmscSessionUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscSession** | [**SmscSession**](SmscSession.md) |  | 

### Return type

[**SmscSession**](SmscSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

