# \BaseSmResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateBaseSmUsingPOST**](BaseSmResourceApi.md#CreateBaseSmUsingPOST) | **Post** /api/base-sms | createBaseSm
[**DeleteBaseSmUsingDELETE**](BaseSmResourceApi.md#DeleteBaseSmUsingDELETE) | **Delete** /api/base-sms/{id} | deleteBaseSm
[**GetAllBaseSmsUsingGET**](BaseSmResourceApi.md#GetAllBaseSmsUsingGET) | **Get** /api/base-sms | getAllBaseSms
[**GetBaseSmUsingGET**](BaseSmResourceApi.md#GetBaseSmUsingGET) | **Get** /api/base-sms/{id} | getBaseSm
[**PartialUpdateBaseSmUsingPATCH**](BaseSmResourceApi.md#PartialUpdateBaseSmUsingPATCH) | **Patch** /api/base-sms/{id} | partialUpdateBaseSm
[**UpdateBaseSmUsingPUT**](BaseSmResourceApi.md#UpdateBaseSmUsingPUT) | **Put** /api/base-sms/{id} | updateBaseSm



## CreateBaseSmUsingPOST

> BaseSm CreateBaseSmUsingPOST(ctx).BaseSm(baseSm).Execute()

createBaseSm

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
    baseSm := *openapiclient.NewBaseSm() // BaseSm |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.BaseSmResourceApi.CreateBaseSmUsingPOST(context.Background()).BaseSm(baseSm).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.CreateBaseSmUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateBaseSmUsingPOST`: BaseSm
    fmt.Fprintf(os.Stdout, "Response from `BaseSmResourceApi.CreateBaseSmUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateBaseSmUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **baseSm** | [**BaseSm**](BaseSm.md) |  | 

### Return type

[**BaseSm**](BaseSm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteBaseSmUsingDELETE

> DeleteBaseSmUsingDELETE(ctx, id).Execute()

deleteBaseSm

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
    resp, r, err := api_client.BaseSmResourceApi.DeleteBaseSmUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.DeleteBaseSmUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteBaseSmUsingDELETERequest struct via the builder pattern


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


## GetAllBaseSmsUsingGET

> []BaseSm GetAllBaseSmsUsingGET(ctx).Execute()

getAllBaseSms

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
    resp, r, err := api_client.BaseSmResourceApi.GetAllBaseSmsUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.GetAllBaseSmsUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllBaseSmsUsingGET`: []BaseSm
    fmt.Fprintf(os.Stdout, "Response from `BaseSmResourceApi.GetAllBaseSmsUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllBaseSmsUsingGETRequest struct via the builder pattern


### Return type

[**[]BaseSm**](BaseSm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetBaseSmUsingGET

> BaseSm GetBaseSmUsingGET(ctx, id).Execute()

getBaseSm

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
    resp, r, err := api_client.BaseSmResourceApi.GetBaseSmUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.GetBaseSmUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetBaseSmUsingGET`: BaseSm
    fmt.Fprintf(os.Stdout, "Response from `BaseSmResourceApi.GetBaseSmUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetBaseSmUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**BaseSm**](BaseSm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateBaseSmUsingPATCH

> BaseSm PartialUpdateBaseSmUsingPATCH(ctx, id).BaseSm(baseSm).Execute()

partialUpdateBaseSm

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
    baseSm := *openapiclient.NewBaseSm() // BaseSm |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.BaseSmResourceApi.PartialUpdateBaseSmUsingPATCH(context.Background(), id).BaseSm(baseSm).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.PartialUpdateBaseSmUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateBaseSmUsingPATCH`: BaseSm
    fmt.Fprintf(os.Stdout, "Response from `BaseSmResourceApi.PartialUpdateBaseSmUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateBaseSmUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **baseSm** | [**BaseSm**](BaseSm.md) |  | 

### Return type

[**BaseSm**](BaseSm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateBaseSmUsingPUT

> BaseSm UpdateBaseSmUsingPUT(ctx, id).BaseSm(baseSm).Execute()

updateBaseSm

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
    baseSm := *openapiclient.NewBaseSm() // BaseSm |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.BaseSmResourceApi.UpdateBaseSmUsingPUT(context.Background(), id).BaseSm(baseSm).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `BaseSmResourceApi.UpdateBaseSmUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateBaseSmUsingPUT`: BaseSm
    fmt.Fprintf(os.Stdout, "Response from `BaseSmResourceApi.UpdateBaseSmUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateBaseSmUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **baseSm** | [**BaseSm**](BaseSm.md) |  | 

### Return type

[**BaseSm**](BaseSm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

