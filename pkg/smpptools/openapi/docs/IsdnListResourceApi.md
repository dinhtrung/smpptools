# \IsdnListResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateIsdnListUsingPOST**](IsdnListResourceApi.md#CreateIsdnListUsingPOST) | **Post** /api/isdn-lists | createIsdnList
[**DeleteIsdnListUsingDELETE**](IsdnListResourceApi.md#DeleteIsdnListUsingDELETE) | **Delete** /api/isdn-lists/{id} | deleteIsdnList
[**GetAllIsdnListsUsingGET**](IsdnListResourceApi.md#GetAllIsdnListsUsingGET) | **Get** /api/isdn-lists | getAllIsdnLists
[**GetIsdnListUsingGET**](IsdnListResourceApi.md#GetIsdnListUsingGET) | **Get** /api/isdn-lists/{id} | getIsdnList
[**PartialUpdateIsdnListUsingPATCH**](IsdnListResourceApi.md#PartialUpdateIsdnListUsingPATCH) | **Patch** /api/isdn-lists/{id} | partialUpdateIsdnList
[**UpdateIsdnListUsingPUT**](IsdnListResourceApi.md#UpdateIsdnListUsingPUT) | **Put** /api/isdn-lists/{id} | updateIsdnList



## CreateIsdnListUsingPOST

> IsdnList CreateIsdnListUsingPOST(ctx).IsdnList(isdnList).Execute()

createIsdnList

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
    isdnList := *openapiclient.NewIsdnList("Name_example") // IsdnList |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.IsdnListResourceApi.CreateIsdnListUsingPOST(context.Background()).IsdnList(isdnList).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.CreateIsdnListUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateIsdnListUsingPOST`: IsdnList
    fmt.Fprintf(os.Stdout, "Response from `IsdnListResourceApi.CreateIsdnListUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateIsdnListUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isdnList** | [**IsdnList**](IsdnList.md) |  | 

### Return type

[**IsdnList**](IsdnList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteIsdnListUsingDELETE

> DeleteIsdnListUsingDELETE(ctx, id).Execute()

deleteIsdnList

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
    resp, r, err := api_client.IsdnListResourceApi.DeleteIsdnListUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.DeleteIsdnListUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteIsdnListUsingDELETERequest struct via the builder pattern


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


## GetAllIsdnListsUsingGET

> []IsdnList GetAllIsdnListsUsingGET(ctx).Execute()

getAllIsdnLists

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
    resp, r, err := api_client.IsdnListResourceApi.GetAllIsdnListsUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.GetAllIsdnListsUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllIsdnListsUsingGET`: []IsdnList
    fmt.Fprintf(os.Stdout, "Response from `IsdnListResourceApi.GetAllIsdnListsUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllIsdnListsUsingGETRequest struct via the builder pattern


### Return type

[**[]IsdnList**](IsdnList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetIsdnListUsingGET

> IsdnList GetIsdnListUsingGET(ctx, id).Execute()

getIsdnList

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
    resp, r, err := api_client.IsdnListResourceApi.GetIsdnListUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.GetIsdnListUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetIsdnListUsingGET`: IsdnList
    fmt.Fprintf(os.Stdout, "Response from `IsdnListResourceApi.GetIsdnListUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetIsdnListUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**IsdnList**](IsdnList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateIsdnListUsingPATCH

> IsdnList PartialUpdateIsdnListUsingPATCH(ctx, id).IsdnList(isdnList).Execute()

partialUpdateIsdnList

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
    isdnList := *openapiclient.NewIsdnList("Name_example") // IsdnList |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.IsdnListResourceApi.PartialUpdateIsdnListUsingPATCH(context.Background(), id).IsdnList(isdnList).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.PartialUpdateIsdnListUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateIsdnListUsingPATCH`: IsdnList
    fmt.Fprintf(os.Stdout, "Response from `IsdnListResourceApi.PartialUpdateIsdnListUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateIsdnListUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **isdnList** | [**IsdnList**](IsdnList.md) |  | 

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


## UpdateIsdnListUsingPUT

> IsdnList UpdateIsdnListUsingPUT(ctx, id).IsdnList(isdnList).Execute()

updateIsdnList

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
    isdnList := *openapiclient.NewIsdnList("Name_example") // IsdnList |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.IsdnListResourceApi.UpdateIsdnListUsingPUT(context.Background(), id).IsdnList(isdnList).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IsdnListResourceApi.UpdateIsdnListUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateIsdnListUsingPUT`: IsdnList
    fmt.Fprintf(os.Stdout, "Response from `IsdnListResourceApi.UpdateIsdnListUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateIsdnListUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **isdnList** | [**IsdnList**](IsdnList.md) |  | 

### Return type

[**IsdnList**](IsdnList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

