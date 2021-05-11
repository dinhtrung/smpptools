# \EsmeAccountResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateEsmeAccountUsingPOST**](EsmeAccountResourceApi.md#CreateEsmeAccountUsingPOST) | **Post** /api/esme-accounts | createEsmeAccount
[**DeleteEsmeAccountUsingDELETE**](EsmeAccountResourceApi.md#DeleteEsmeAccountUsingDELETE) | **Delete** /api/esme-accounts/{id} | deleteEsmeAccount
[**GetAllEsmeAccountsUsingGET**](EsmeAccountResourceApi.md#GetAllEsmeAccountsUsingGET) | **Get** /api/esme-accounts | getAllEsmeAccounts
[**GetEsmeAccountUsingGET**](EsmeAccountResourceApi.md#GetEsmeAccountUsingGET) | **Get** /api/esme-accounts/{id} | getEsmeAccount
[**PartialUpdateEsmeAccountUsingPATCH**](EsmeAccountResourceApi.md#PartialUpdateEsmeAccountUsingPATCH) | **Patch** /api/esme-accounts/{id} | partialUpdateEsmeAccount
[**UpdateEsmeAccountUsingPUT**](EsmeAccountResourceApi.md#UpdateEsmeAccountUsingPUT) | **Put** /api/esme-accounts/{id} | updateEsmeAccount



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

> DeleteEsmeAccountUsingDELETE(ctx, id).Execute()

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
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.DeleteEsmeAccountUsingDELETE(context.Background(), id).Execute()
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
**id** | **string** | id | 

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


## GetEsmeAccountUsingGET

> EsmeAccount GetEsmeAccountUsingGET(ctx, id).Execute()

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
    id := "id_example" // string | id

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.GetEsmeAccountUsingGET(context.Background(), id).Execute()
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
**id** | **string** | id | 

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

> EsmeAccount PartialUpdateEsmeAccountUsingPATCH(ctx, id).EsmeAccount(esmeAccount).Execute()

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
    id := "id_example" // string | id
    esmeAccount := *openapiclient.NewEsmeAccount("Name_example") // EsmeAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.PartialUpdateEsmeAccountUsingPATCH(context.Background(), id).EsmeAccount(esmeAccount).Execute()
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
**id** | **string** | id | 

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


## UpdateEsmeAccountUsingPUT

> EsmeAccount UpdateEsmeAccountUsingPUT(ctx, id).EsmeAccount(esmeAccount).Execute()

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
    id := "id_example" // string | id
    esmeAccount := *openapiclient.NewEsmeAccount("Name_example") // EsmeAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.EsmeAccountResourceApi.UpdateEsmeAccountUsingPUT(context.Background(), id).EsmeAccount(esmeAccount).Execute()
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
**id** | **string** | id | 

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

