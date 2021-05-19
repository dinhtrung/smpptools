# \EsmeAccountResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ApiEsmeAccountsIdBatchDelete**](EsmeAccountResourceApi.md#ApiEsmeAccountsIdBatchDelete) | **Delete** /api/esme-accounts/{id}/batch | Stop all batch current running in selected SMSC sessions
[**CreateEsmeAccountUsingPOST**](EsmeAccountResourceApi.md#CreateEsmeAccountUsingPOST) | **Post** /api/esme-accounts | createEsmeAccount
[**DeleteEsmeAccountUsingDELETE**](EsmeAccountResourceApi.md#DeleteEsmeAccountUsingDELETE) | **Delete** /api/esme-accounts/{accountID} | deleteEsmeAccount
[**GetAllEsmeAccountsUsingGET**](EsmeAccountResourceApi.md#GetAllEsmeAccountsUsingGET) | **Get** /api/esme-accounts | getAllEsmeAccounts
[**GetAllEsmeSessionsByAccountUsingGET**](EsmeAccountResourceApi.md#GetAllEsmeSessionsByAccountUsingGET) | **Get** /api/esme-accounts/{accountID}/sessions | Retrieve all active session for current account
[**GetEsmeAccountUsingGET**](EsmeAccountResourceApi.md#GetEsmeAccountUsingGET) | **Get** /api/esme-accounts/{accountID} | getEsmeAccount
[**PartialUpdateEsmeAccountUsingPATCH**](EsmeAccountResourceApi.md#PartialUpdateEsmeAccountUsingPATCH) | **Patch** /api/esme-accounts/{accountID} | partialUpdateEsmeAccount
[**SendMobileTerminatedSMSOnAccountUsingPOST**](EsmeAccountResourceApi.md#SendMobileTerminatedSMSOnAccountUsingPOST) | **Post** /api/esme-accounts/{id}/send-mt | Send Mobile Terminated SMS on selected SMSC account during Functional Testing
[**SendSMSonSMSCsessionUsingPOST**](EsmeAccountResourceApi.md#SendSMSonSMSCsessionUsingPOST) | **Post** /api/esme-accounts/{id}/batch | Send Mobile Originated SMS on selected session with given patterns and data files
[**StopAllEsmeSessionsForAccountUsingDELETE**](EsmeAccountResourceApi.md#StopAllEsmeSessionsForAccountUsingDELETE) | **Delete** /api/esme-accounts/{accountID}/sessions | Stop all active SMPP sessions from this account
[**UpdateEsmeAccountUsingPUT**](EsmeAccountResourceApi.md#UpdateEsmeAccountUsingPUT) | **Put** /api/esme-accounts/{accountID} | updateEsmeAccount



## ApiEsmeAccountsIdBatchDelete

> ApiEsmeAccountsIdBatchDelete(ctx, id).Execute()

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
    resp, r, err := api_client.EsmeAccountResourceApi.ApiEsmeAccountsIdBatchDelete(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.ApiEsmeAccountsIdBatchDelete``: %v\n", err)
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

Other parameters are passed through a pointer to a apiApiEsmeAccountsIdBatchDeleteRequest struct via the builder pattern


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


## CreateEsmeAccountUsingPOST

> EsmeAccount CreateEsmeAccountUsingPOST(ctx).EsmeAccount(esmeAccount).Execute()

createEsmeAccount

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
    resp, r, err := api_client.EsmeAccountResourceApi.CreateEsmeAccountUsingPOST(context.Background()).EsmeAccount(esmeAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.CreateEsmeAccountUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateEsmeAccountUsingPOST`: EsmeAccount
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.CreateEsmeAccountUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateEsmeAccountUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **esmeAccount** | [**EsmeAccount**](EsmeAccount.md) |  | 

### Return type

[**EsmeAccount**](EsmeAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteEsmeAccountUsingDELETE

> DeleteEsmeAccountUsingDELETE(ctx, accountID).Execute()

deleteEsmeAccount

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
    accountID := "accountID_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.DeleteEsmeAccountUsingDELETE(context.Background(), accountID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.DeleteEsmeAccountUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteEsmeAccountUsingDELETERequest struct via the builder pattern


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


## GetAllEsmeAccountsUsingGET

> []EsmeAccount GetAllEsmeAccountsUsingGET(ctx).Execute()

getAllEsmeAccounts

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
    resp, r, err := api_client.EsmeAccountResourceApi.GetAllEsmeAccountsUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.GetAllEsmeAccountsUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllEsmeAccountsUsingGET`: []EsmeAccount
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.GetAllEsmeAccountsUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllEsmeAccountsUsingGETRequest struct via the builder pattern


### Return type

[**[]EsmeAccount**](EsmeAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetAllEsmeSessionsByAccountUsingGET

> EsmeSession GetAllEsmeSessionsByAccountUsingGET(ctx, accountID).Execute()

Retrieve all active session for current account

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
    accountID := "accountID_example" // string | ID of selected session

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.GetAllEsmeSessionsByAccountUsingGET(context.Background(), accountID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.GetAllEsmeSessionsByAccountUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllEsmeSessionsByAccountUsingGET`: EsmeSession
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.GetAllEsmeSessionsByAccountUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllEsmeSessionsByAccountUsingGETRequest struct via the builder pattern


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


## GetEsmeAccountUsingGET

> EsmeAccount GetEsmeAccountUsingGET(ctx, accountID).Execute()

getEsmeAccount

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
    accountID := "accountID_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.GetEsmeAccountUsingGET(context.Background(), accountID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.GetEsmeAccountUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetEsmeAccountUsingGET`: EsmeAccount
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.GetEsmeAccountUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetEsmeAccountUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**EsmeAccount**](EsmeAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateEsmeAccountUsingPATCH

> EsmeAccount PartialUpdateEsmeAccountUsingPATCH(ctx, accountID).EsmeAccount(esmeAccount).Execute()

partialUpdateEsmeAccount

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
    accountID := "accountID_example" // string | id
    esmeAccount := *openapiclient.NewEsmeAccount("Name_example") // EsmeAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.PartialUpdateEsmeAccountUsingPATCH(context.Background(), accountID).EsmeAccount(esmeAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.PartialUpdateEsmeAccountUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateEsmeAccountUsingPATCH`: EsmeAccount
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.PartialUpdateEsmeAccountUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateEsmeAccountUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **esmeAccount** | [**EsmeAccount**](EsmeAccount.md) |  | 

### Return type

[**EsmeAccount**](EsmeAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendMobileTerminatedSMSOnAccountUsingPOST

> SendMobileTerminatedSMSOnAccountUsingPOST(ctx, id).BaseSm(baseSm).Execute()

Send Mobile Terminated SMS on selected SMSC account during Functional Testing

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
    resp, r, err := api_client.EsmeAccountResourceApi.SendMobileTerminatedSMSOnAccountUsingPOST(context.Background(), id).BaseSm(baseSm).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.SendMobileTerminatedSMSOnAccountUsingPOST``: %v\n", err)
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

Other parameters are passed through a pointer to a apiSendMobileTerminatedSMSOnAccountUsingPOSTRequest struct via the builder pattern


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


## SendSMSonSMSCsessionUsingPOST

> SendSMSonSMSCsessionUsingPOST(ctx, id).Batch(batch).Execute()

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
    resp, r, err := api_client.EsmeAccountResourceApi.SendSMSonSMSCsessionUsingPOST(context.Background(), id).Batch(batch).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.SendSMSonSMSCsessionUsingPOST``: %v\n", err)
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

Other parameters are passed through a pointer to a apiSendSMSonSMSCsessionUsingPOSTRequest struct via the builder pattern


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


## StopAllEsmeSessionsForAccountUsingDELETE

> StopAllEsmeSessionsForAccountUsingDELETE(ctx, accountID).Execute()

Stop all active SMPP sessions from this account

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
    accountID := "accountID_example" // string | ID of selected session

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.StopAllEsmeSessionsForAccountUsingDELETE(context.Background(), accountID).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.StopAllEsmeSessionsForAccountUsingDELETE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | ID of selected session | 

### Other Parameters

Other parameters are passed through a pointer to a apiStopAllEsmeSessionsForAccountUsingDELETERequest struct via the builder pattern


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


## UpdateEsmeAccountUsingPUT

> EsmeAccount UpdateEsmeAccountUsingPUT(ctx, accountID).EsmeAccount(esmeAccount).Execute()

updateEsmeAccount

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
    accountID := "accountID_example" // string | id
    esmeAccount := *openapiclient.NewEsmeAccount("Name_example") // EsmeAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.UpdateEsmeAccountUsingPUT(context.Background(), accountID).EsmeAccount(esmeAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `EsmeAccountResourceApi.UpdateEsmeAccountUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateEsmeAccountUsingPUT`: EsmeAccount
    fmt.Fprintf(os.Stdout, "Response from `EsmeAccountResourceApi.UpdateEsmeAccountUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**accountID** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateEsmeAccountUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **esmeAccount** | [**EsmeAccount**](EsmeAccount.md) |  | 

### Return type

[**EsmeAccount**](EsmeAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

