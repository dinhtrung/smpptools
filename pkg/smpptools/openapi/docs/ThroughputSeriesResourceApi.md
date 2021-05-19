# \ThroughputSeriesResourceApi

All URIs are relative to *https://virtserver.swaggerhub.com/foxtechvn/smpptools/0.0.2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateThroughputSeriesUsingPOST**](ThroughputSeriesResourceApi.md#CreateThroughputSeriesUsingPOST) | **Post** /api/throughput-series | createThroughputSeries
[**DeleteThroughputSeriesUsingDELETE**](ThroughputSeriesResourceApi.md#DeleteThroughputSeriesUsingDELETE) | **Delete** /api/throughput-series/{id} | deleteThroughputSeries
[**GetAllThroughputSeriessUsingGET**](ThroughputSeriesResourceApi.md#GetAllThroughputSeriessUsingGET) | **Get** /api/throughput-series | getAllThroughputSeriess
[**GetThroughputSeriesUsingGET**](ThroughputSeriesResourceApi.md#GetThroughputSeriesUsingGET) | **Get** /api/throughput-series/{id} | getThroughputSeries
[**GetVariantThroughputSeriesUsingGET**](ThroughputSeriesResourceApi.md#GetVariantThroughputSeriesUsingGET) | **Get** /api/throughput-series/{id}/transform/{variantID} | Get a variant of selected throughput series
[**PartialUpdateThroughputSeriesUsingPATCH**](ThroughputSeriesResourceApi.md#PartialUpdateThroughputSeriesUsingPATCH) | **Patch** /api/throughput-series/{id} | partialUpdateThroughputSeries
[**UpdateThroughputSeriesUsingPUT**](ThroughputSeriesResourceApi.md#UpdateThroughputSeriesUsingPUT) | **Put** /api/throughput-series/{id} | updateThroughputSeries



## CreateThroughputSeriesUsingPOST

> ThroughputSeries CreateThroughputSeriesUsingPOST(ctx).ThroughputSeries(throughputSeries).Execute()

createThroughputSeries

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
    throughputSeries := *openapiclient.NewThroughputSeries("Load test 2021-05-12") // ThroughputSeries |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.ThroughputSeriesResourceApi.CreateThroughputSeriesUsingPOST(context.Background()).ThroughputSeries(throughputSeries).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.CreateThroughputSeriesUsingPOST``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CreateThroughputSeriesUsingPOST`: ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.CreateThroughputSeriesUsingPOST`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateThroughputSeriesUsingPOSTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **throughputSeries** | [**ThroughputSeries**](ThroughputSeries.md) |  | 

### Return type

[**ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteThroughputSeriesUsingDELETE

> DeleteThroughputSeriesUsingDELETE(ctx, id).Execute()

deleteThroughputSeries

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
    resp, r, err := api_client.ThroughputSeriesResourceApi.DeleteThroughputSeriesUsingDELETE(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.DeleteThroughputSeriesUsingDELETE``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteThroughputSeriesUsingDELETERequest struct via the builder pattern


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


## GetAllThroughputSeriessUsingGET

> []ThroughputSeries GetAllThroughputSeriessUsingGET(ctx).Execute()

getAllThroughputSeriess

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
    resp, r, err := api_client.ThroughputSeriesResourceApi.GetAllThroughputSeriessUsingGET(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.GetAllThroughputSeriessUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetAllThroughputSeriessUsingGET`: []ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.GetAllThroughputSeriessUsingGET`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetAllThroughputSeriessUsingGETRequest struct via the builder pattern


### Return type

[**[]ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/x-ndjson

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetThroughputSeriesUsingGET

> ThroughputSeries GetThroughputSeriesUsingGET(ctx, id).Execute()

getThroughputSeries

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
    resp, r, err := api_client.ThroughputSeriesResourceApi.GetThroughputSeriesUsingGET(context.Background(), id).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.GetThroughputSeriesUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetThroughputSeriesUsingGET`: ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.GetThroughputSeriesUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetThroughputSeriesUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetVariantThroughputSeriesUsingGET

> ThroughputSeries GetVariantThroughputSeriesUsingGET(ctx, id, variantID).Min(min).Max(max).Execute()

Get a variant of selected throughput series

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
    variantID := "variantID_example" // string | One of available transform over throughput series values
    min := float32(3.4) // float32 |  (optional)
    max := float32(3.4) // float32 |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.ThroughputSeriesResourceApi.GetVariantThroughputSeriesUsingGET(context.Background(), id, variantID).Min(min).Max(max).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.GetVariantThroughputSeriesUsingGET``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetVariantThroughputSeriesUsingGET`: ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.GetVariantThroughputSeriesUsingGET`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 
**variantID** | **string** | One of available transform over throughput series values | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetVariantThroughputSeriesUsingGETRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **min** | **float32** |  | 
 **max** | **float32** |  | 

### Return type

[**ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PartialUpdateThroughputSeriesUsingPATCH

> ThroughputSeries PartialUpdateThroughputSeriesUsingPATCH(ctx, id).ThroughputSeries(throughputSeries).Execute()

partialUpdateThroughputSeries

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
    throughputSeries := *openapiclient.NewThroughputSeries("Load test 2021-05-12") // ThroughputSeries |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.ThroughputSeriesResourceApi.PartialUpdateThroughputSeriesUsingPATCH(context.Background(), id).ThroughputSeries(throughputSeries).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.PartialUpdateThroughputSeriesUsingPATCH``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `PartialUpdateThroughputSeriesUsingPATCH`: ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.PartialUpdateThroughputSeriesUsingPATCH`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiPartialUpdateThroughputSeriesUsingPATCHRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **throughputSeries** | [**ThroughputSeries**](ThroughputSeries.md) |  | 

### Return type

[**ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/merge-patch+json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateThroughputSeriesUsingPUT

> ThroughputSeries UpdateThroughputSeriesUsingPUT(ctx, id).ThroughputSeries(throughputSeries).Execute()

updateThroughputSeries

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
    throughputSeries := *openapiclient.NewThroughputSeries("Load test 2021-05-12") // ThroughputSeries |  (optional)

    configuration := openapiclient.NewConfiguration()
    api_client := openapiclient.NewAPIClient(configuration)
    resp, r, err := api_client.ThroughputSeriesResourceApi.UpdateThroughputSeriesUsingPUT(context.Background(), id).ThroughputSeries(throughputSeries).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ThroughputSeriesResourceApi.UpdateThroughputSeriesUsingPUT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateThroughputSeriesUsingPUT`: ThroughputSeries
    fmt.Fprintf(os.Stdout, "Response from `ThroughputSeriesResourceApi.UpdateThroughputSeriesUsingPUT`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** | id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateThroughputSeriesUsingPUTRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **throughputSeries** | [**ThroughputSeries**](ThroughputSeries.md) |  | 

### Return type

[**ThroughputSeries**](ThroughputSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

