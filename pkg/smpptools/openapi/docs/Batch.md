# Batch

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**SmsPattern** | Pointer to [**BaseSm**](BaseSm.md) |  | [optional] 
**SmsData** | Pointer to [**IsdnList**](IsdnList.md) |  | [optional] 
**Throuput** | Pointer to [**ThroughputSeries**](ThroughputSeries.md) |  | [optional] 

## Methods

### NewBatch

`func NewBatch() *Batch`

NewBatch instantiates a new Batch object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBatchWithDefaults

`func NewBatchWithDefaults() *Batch`

NewBatchWithDefaults instantiates a new Batch object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSmsPattern

`func (o *Batch) GetSmsPattern() BaseSm`

GetSmsPattern returns the SmsPattern field if non-nil, zero value otherwise.

### GetSmsPatternOk

`func (o *Batch) GetSmsPatternOk() (*BaseSm, bool)`

GetSmsPatternOk returns a tuple with the SmsPattern field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSmsPattern

`func (o *Batch) SetSmsPattern(v BaseSm)`

SetSmsPattern sets SmsPattern field to given value.

### HasSmsPattern

`func (o *Batch) HasSmsPattern() bool`

HasSmsPattern returns a boolean if a field has been set.

### GetSmsData

`func (o *Batch) GetSmsData() IsdnList`

GetSmsData returns the SmsData field if non-nil, zero value otherwise.

### GetSmsDataOk

`func (o *Batch) GetSmsDataOk() (*IsdnList, bool)`

GetSmsDataOk returns a tuple with the SmsData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSmsData

`func (o *Batch) SetSmsData(v IsdnList)`

SetSmsData sets SmsData field to given value.

### HasSmsData

`func (o *Batch) HasSmsData() bool`

HasSmsData returns a boolean if a field has been set.

### GetThrouput

`func (o *Batch) GetThrouput() ThroughputSeries`

GetThrouput returns the Throuput field if non-nil, zero value otherwise.

### GetThrouputOk

`func (o *Batch) GetThrouputOk() (*ThroughputSeries, bool)`

GetThrouputOk returns a tuple with the Throuput field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetThrouput

`func (o *Batch) SetThrouput(v ThroughputSeries)`

SetThrouput sets Throuput field to given value.

### HasThrouput

`func (o *Batch) HasThrouput() bool`

HasThrouput returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


