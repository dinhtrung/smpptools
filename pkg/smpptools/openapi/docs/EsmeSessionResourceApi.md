# \EsmeSessionResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateEsmeSessionUsingPOST**](EsmeSessionResourceApi.md#CreateEsmeSessionUsingPOST) | **Post** /api/esme-sessions | Create a new SMPP Session from ESME based on given account
[**DeleteEsmeSessionUsingDELETE**](EsmeSessionResourceApi.md#DeleteEsmeSessionUsingDELETE) | **Delete** /api/esme-sessions/{sessionID} | deleteEsmeSession
[**GetAllEsmeSessions**](EsmeSessionResourceApi.md#GetAllEsmeSessions) | **Get** /api/esme-sessions | getAllEsmeSessions
[**GetEsmeSessionUsingGET**](EsmeSessionResourceApi.md#GetEsmeSessionUsingGET) | **Get** /api/esme-sessions/{sessionID} | View ESME Session Details
[**PartialUpdateEsmeSessionUsingPATCH**](EsmeSessionResourceApi.md#PartialUpdateEsmeSessionUsingPATCH) | **Patch** /api/esme-sessions/{sessionID} | partialUpdateEsmeSession
[**SendSMSonEsmeSessionUsingPOST**](EsmeSessionResourceApi.md#SendSMSonEsmeSessionUsingPOST) | **Post** /api/esme-sessions/{id}/batch | Send Mobile Originated SMS on selected session with given patterns and data files
[**StopAllBachOnEsmeSessionUsingDELETE**](EsmeSessionResourceApi.md#StopAllBachOnEsmeSessionUsingDELETE) | **Delete** /api/esme-sessions/{id}/batch | Stop all batch current running in selected SMSC sessions
[**UpdateEsmeSessionUsingPUT**](EsmeSessionResourceApi.md#UpdateEsmeSessionUsingPUT) | **Put** /api/esme-sessions/{sessionID} | updateEsmeSession



## CreateEsmeSessionUsingPOST

> EsmeSession CreateEsmeSessionUsingPOST(ctx).EsmeAccount(esmeAccount).Execute()

Create a new SMPP Session from ESME based on given account

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
    esmeAccount := *openapiclient.NewEsmeAccount("Name_example") // EsmeAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeSessionResourceApi.CreateEsmeSessionUsingPOST(context.Background()).EsmeAccount(esmeAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.CreateEsmeSessionUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateEsmeSessionUsingPOST`: EsmeSession
    fmt.Fprintf(os.Stdout, "Response from `EsmeSessionResourceApi.CreateEsmeSessionUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateEsmeSessionUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **esmeAccount** | [**EsmeAccount**](EsmeAccount.md) |  | 

### Return type

[**EsmeSession**](EsmeSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteEsmeSessionUsingDELETE

> DeleteEsmeSessionUsingDELETE(ctx, sessionID).Execute()

deleteEsmeSession

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
    sessionID := "sessionID_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeSessionResourceApi.DeleteEsmeSessionUsingDELETE(context.Background(), sessionID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.DeleteEsmeSessionUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteEsmeSessionUsingDELETERequest struct via the builder pattern


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


## GetAllEsmeSessions

> []EsmeSession GetAllEsmeSessions(ctx).Execute()

getAllEsmeSessions

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
    resp, r, err := api_client.EsmeSessionResourceApi.GetAllEsmeSessions(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.GetAllEsmeSessions``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllEsmeSessions`: []EsmeSession
    fmt.Fprintf(os.Stdout, "Response from `EsmeSessionResourceApi.GetAllEsmeSessions`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllEsmeSessionsRequest struct via the builder pattern


### Return type

[**[]EsmeSession**](EsmeSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetEsmeSessionUsingGET

> EsmeSession GetEsmeSessionUsingGET(ctx, sessionID).Execute()

View ESME Session Details

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
    sessionID := "sessionID_example" // string | session ID

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeSessionResourceApi.GetEsmeSessionUsingGET(context.Background(), sessionID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.GetEsmeSessionUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetEsmeSessionUsingGET`: EsmeSession
    fmt.Fprintf(os.Stdout, "Response from `EsmeSessionResourceApi.GetEsmeSessionUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionID** | **string** | session ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetEsmeSessionUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**EsmeSession**](EsmeSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateEsmeSessionUsingPATCH

> IsdnList PartialUpdateEsmeSessionUsingPATCH(ctx, sessionID).EsmeSession(esmeSession).Execute()

partialUpdateEsmeSession

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
    sessionID := "sessionID_example" // string | id
    esmeSession := *openapiclient.NewEsmeSession("Id_example") // EsmeSession |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeSessionResourceApi.PartialUpdateEsmeSessionUsingPATCH(context.Background(), sessionID).EsmeSession(esmeSession).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.PartialUpdateEsmeSessionUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateEsmeSessionUsingPATCH`: IsdnList
    fmt.Fprintf(os.Stdout, "Response from `EsmeSessionResourceApi.PartialUpdateEsmeSessionUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateEsmeSessionUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **esmeSession** | [**EsmeSession**](EsmeSession.md) |  | 

### Return type

[**IsdnList**](IsdnList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendSMSonEsmeSessionUsingPOST

> SendSMSonEsmeSessionUsingPOST(ctx, id).Batch(batch).Execute()

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
    resp, r, err := api_client.EsmeSessionResourceApi.SendSMSonEsmeSessionUsingPOST(context.Background(), id).Batch(batch).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.SendSMSonEsmeSessionUsingPOST``: %v\n", err)
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

Other parameters are passed through a pointer to a apiSendSMSonEsmeSessionUsingPOSTRequest struct via the builder pattern


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


## StopAllBachOnEsmeSessionUsingDELETE

> StopAllBachOnEsmeSessionUsingDELETE(ctx, id).Execute()

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
    resp, r, err := api_client.EsmeSessionResourceApi.StopAllBachOnEsmeSessionUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.StopAllBachOnEsmeSessionUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiStopAllBachOnEsmeSessionUsingDELETERequest struct via the builder pattern


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


## UpdateEsmeSessionUsingPUT

> EsmeSession UpdateEsmeSessionUsingPUT(ctx, sessionID).EsmeSession(esmeSession).Execute()

updateEsmeSession

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
    sessionID := "sessionID_example" // string | id
    esmeSession := *openapiclient.NewEsmeSession("Id_example") // EsmeSession |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeSessionResourceApi.UpdateEsmeSessionUsingPUT(context.Background(), sessionID).EsmeSession(esmeSession).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeSessionResourceApi.UpdateEsmeSessionUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateEsmeSessionUsingPUT`: EsmeSession
    fmt.Fprintf(os.Stdout, "Response from `EsmeSessionResourceApi.UpdateEsmeSessionUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateEsmeSessionUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **esmeSession** | [**EsmeSession**](EsmeSession.md) |  | 

### Return type

[**EsmeSession**](EsmeSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

