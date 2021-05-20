# SmppTlv

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Tag** | Pointer to **int** | Tag ID | [optional] 
**Value** | Pointer to **string** | hex bytes of the value | [optional] 

## Methods

### NewSmppTlv

`func NewSmppTlv() *SmppTlv`

NewSmppTlv instantiates a new SmppTlv object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmppTlvWithDefaults

`func NewSmppTlvWithDefaults() *SmppTlv`

NewSmppTlvWithDefaults instantiates a new SmppTlv object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTag

`func (o *SmppTlv) GetTag() int`

GetTag returns the Tag field if non-nil, zero value otherwise.

### GetTagOk

`func (o *SmppTlv) GetTagOk() (*int, bool)`

GetTagOk returns a tuple with the Tag field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTag

`func (o *SmppTlv) SetTag(v int)`

SetTag sets Tag field to given value.

### HasTag

`func (o *SmppTlv) HasTag() bool`

HasTag returns a boolean if a field has been set.

### GetValue

`func (o *SmppTlv) GetValue() string`

GetValue returns the Value field if non-nil, zero value otherwise.

### GetValueOk

`func (o *SmppTlv) GetValueOk() (*string, bool)`

GetValueOk returns a tuple with the Value field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetValue

`func (o *SmppTlv) SetValue(v string)`

SetValue sets Value field to given value.

### HasValue

`func (o *SmppTlv) HasValue() bool`

HasValue returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


