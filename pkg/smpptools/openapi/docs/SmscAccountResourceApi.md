# \SmscAccountResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateSmscAccountUsingPOST**](SmscAccountResourceApi.md#CreateSmscAccountUsingPOST) | **Post** /api/smsc-accounts | createSmscAccount
[**DeleteSmscAccountUsingDELETE**](SmscAccountResourceApi.md#DeleteSmscAccountUsingDELETE) | **Delete** /api/smsc-accounts/{id} | deleteSmscAccount
[**GetAllSmscAccountsUsingGET**](SmscAccountResourceApi.md#GetAllSmscAccountsUsingGET) | **Get** /api/smsc-accounts | getAllSmscAccounts
[**GetSmscAccountUsingGET**](SmscAccountResourceApi.md#GetSmscAccountUsingGET) | **Get** /api/smsc-accounts/{id} | getSmscAccount
[**PartialUpdateSmscAccountUsingPATCH**](SmscAccountResourceApi.md#PartialUpdateSmscAccountUsingPATCH) | **Patch** /api/smsc-accounts/{id} | partialUpdateSmscAccount
[**UpdateSmscAccountUsingPUT**](SmscAccountResourceApi.md#UpdateSmscAccountUsingPUT) | **Put** /api/smsc-accounts/{id} | updateSmscAccount



## CreateSmscAccountUsingPOST

> SmscAccount CreateSmscAccountUsingPOST(ctx).SmscAccount(smscAccount).Execute()

createSmscAccount

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
    smscAccount := *openapiclient.NewSmscAccount("Name_example", "Password_example", "SystemID_example") // SmscAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscAccountResourceApi.CreateSmscAccountUsingPOST(context.Background()).SmscAccount(smscAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.CreateSmscAccountUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateSmscAccountUsingPOST`: SmscAccount
    fmt.Fprintf(os.Stdout, "Response from `SmscAccountResourceApi.CreateSmscAccountUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateSmscAccountUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **smscAccount** | [**SmscAccount**](SmscAccount.md) |  | 

### Return type

[**SmscAccount**](SmscAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteSmscAccountUsingDELETE

> DeleteSmscAccountUsingDELETE(ctx, id).Execute()

deleteSmscAccount

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
    resp, r, err := api_client.SmscAccountResourceApi.DeleteSmscAccountUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.DeleteSmscAccountUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteSmscAccountUsingDELETERequest struct via the builder pattern


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


## GetAllSmscAccountsUsingGET

> []SmscAccount GetAllSmscAccountsUsingGET(ctx).Execute()

getAllSmscAccounts

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
    resp, r, err := api_client.SmscAccountResourceApi.GetAllSmscAccountsUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.GetAllSmscAccountsUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllSmscAccountsUsingGET`: []SmscAccount
    fmt.Fprintf(os.Stdout, "Response from `SmscAccountResourceApi.GetAllSmscAccountsUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllSmscAccountsUsingGETRequest struct via the builder pattern


### Return type

[**[]SmscAccount**](SmscAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetSmscAccountUsingGET

> SmscAccount GetSmscAccountUsingGET(ctx, id).Execute()

getSmscAccount

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
    resp, r, err := api_client.SmscAccountResourceApi.GetSmscAccountUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.GetSmscAccountUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetSmscAccountUsingGET`: SmscAccount
    fmt.Fprintf(os.Stdout, "Response from `SmscAccountResourceApi.GetSmscAccountUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSmscAccountUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SmscAccount**](SmscAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateSmscAccountUsingPATCH

> SmscAccount PartialUpdateSmscAccountUsingPATCH(ctx, id).SmscAccount(smscAccount).Execute()

partialUpdateSmscAccount

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
    smscAccount := *openapiclient.NewSmscAccount("Name_example", "Password_example", "SystemID_example") // SmscAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscAccountResourceApi.PartialUpdateSmscAccountUsingPATCH(context.Background(), id).SmscAccount(smscAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.PartialUpdateSmscAccountUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateSmscAccountUsingPATCH`: SmscAccount
    fmt.Fprintf(os.Stdout, "Response from `SmscAccountResourceApi.PartialUpdateSmscAccountUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateSmscAccountUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscAccount** | [**SmscAccount**](SmscAccount.md) |  | 

### Return type

[**SmscAccount**](SmscAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateSmscAccountUsingPUT

> SmscAccount UpdateSmscAccountUsingPUT(ctx, id).SmscAccount(smscAccount).Execute()

updateSmscAccount

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
    smscAccount := *openapiclient.NewSmscAccount("Name_example", "Password_example", "SystemID_example") // SmscAccount |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.SmscAccountResourceApi.UpdateSmscAccountUsingPUT(context.Background(), id).SmscAccount(smscAccount).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `SmscAccountResourceApi.UpdateSmscAccountUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateSmscAccountUsingPUT`: SmscAccount
    fmt.Fprintf(os.Stdout, "Response from `SmscAccountResourceApi.UpdateSmscAccountUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateSmscAccountUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **smscAccount** | [**SmscAccount**](SmscAccount.md) |  | 

### Return type

[**SmscAccount**](SmscAccount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

