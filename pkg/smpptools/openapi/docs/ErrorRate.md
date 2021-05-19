# ErrorRate

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Error** | **int32** | Error Code | 
**Description** | Pointer to **string** | Description about this error rate | [optional] 
**Rate** | **int32** | Percentage this error will occur | 

## Methods

### NewErrorRate

`func NewErrorRate(error_ int32, rate int32, ) *ErrorRate`

NewErrorRate instantiates a new ErrorRate object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewErrorRateWithDefaults

`func NewErrorRateWithDefaults() *ErrorRate`

NewErrorRateWithDefaults instantiates a new ErrorRate object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetError

`func (o *ErrorRate) GetError() int32`

GetError returns the Error field if non-nil, zero value otherwise.

### GetErrorOk

`func (o *ErrorRate) GetErrorOk() (*int32, bool)`

GetErrorOk returns a tuple with the Error field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetError

`func (o *ErrorRate) SetError(v int32)`

SetError sets Error field to given value.


### GetDescription

`func (o *ErrorRate) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *ErrorRate) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *ErrorRate) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *ErrorRate) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetRate

`func (o *ErrorRate) GetRate() int32`

GetRate returns the Rate field if non-nil, zero value otherwise.

### GetRateOk

`func (o *ErrorRate) GetRateOk() (*int32, bool)`

GetRateOk returns a tuple with the Rate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRate

`func (o *ErrorRate) SetRate(v int32)`

SetRate sets Rate field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


