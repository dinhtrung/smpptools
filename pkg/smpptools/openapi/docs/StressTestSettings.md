# StressTestSettings

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**SmsPattern** | Pointer to [**BaseSm**](BaseSm.md) |  | [optional] 
**SmsData** | Pointer to [**IsdnList**](IsdnList.md) |  | [optional] 
**Throughput** | Pointer to **int32** | maximum throughput try to reach | [optional] 
**MaxPDU** | Pointer to **int32** | max number of PDU send out | [optional] 

## Methods

### NewStressTestSettings

`func NewStressTestSettings() *StressTestSettings`

NewStressTestSettings instantiates a new StressTestSettings object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewStressTestSettingsWithDefaults

`func NewStressTestSettingsWithDefaults() *StressTestSettings`

NewStressTestSettingsWithDefaults instantiates a new StressTestSettings object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSmsPattern

`func (o *StressTestSettings) GetSmsPattern() BaseSm`

GetSmsPattern returns the SmsPattern field if non-nil, zero value otherwise.

### GetSmsPatternOk

`func (o *StressTestSettings) GetSmsPatternOk() (*BaseSm, bool)`

GetSmsPatternOk returns a tuple with the SmsPattern field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSmsPattern

`func (o *StressTestSettings) SetSmsPattern(v BaseSm)`

SetSmsPattern sets SmsPattern field to given value.

### HasSmsPattern

`func (o *StressTestSettings) HasSmsPattern() bool`

HasSmsPattern returns a boolean if a field has been set.

### GetSmsData

`func (o *StressTestSettings) GetSmsData() IsdnList`

GetSmsData returns the SmsData field if non-nil, zero value otherwise.

### GetSmsDataOk

`func (o *StressTestSettings) GetSmsDataOk() (*IsdnList, bool)`

GetSmsDataOk returns a tuple with the SmsData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSmsData

`func (o *StressTestSettings) SetSmsData(v IsdnList)`

SetSmsData sets SmsData field to given value.

### HasSmsData

`func (o *StressTestSettings) HasSmsData() bool`

HasSmsData returns a boolean if a field has been set.

### GetThroughput

`func (o *StressTestSettings) GetThroughput() int32`

GetThroughput returns the Throughput field if non-nil, zero value otherwise.

### GetThroughputOk

`func (o *StressTestSettings) GetThroughputOk() (*int32, bool)`

GetThroughputOk returns a tuple with the Throughput field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetThroughput

`func (o *StressTestSettings) SetThroughput(v int32)`

SetThroughput sets Throughput field to given value.

### HasThroughput

`func (o *StressTestSettings) HasThroughput() bool`

HasThroughput returns a boolean if a field has been set.

### GetMaxPDU

`func (o *StressTestSettings) GetMaxPDU() int32`

GetMaxPDU returns the MaxPDU field if non-nil, zero value otherwise.

### GetMaxPDUOk

`func (o *StressTestSettings) GetMaxPDUOk() (*int32, bool)`

GetMaxPDUOk returns a tuple with the MaxPDU field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxPDU

`func (o *StressTestSettings) SetMaxPDU(v int32)`

SetMaxPDU sets MaxPDU field to given value.

### HasMaxPDU

`func (o *StressTestSettings) HasMaxPDU() bool`

HasMaxPDU returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


