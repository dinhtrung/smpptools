# ThroughputSeries

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **string** | Name of this throughput series | 
**Description** | Pointer to **string** | A short description of this throughput | [optional] 
**Values** | Pointer to **[]int32** | throughput per minute of current series | [optional] 
**Datafile** | Pointer to **string** | CDR file name this throughput series was generated from | [optional] 
**State** | Pointer to **int32** | State of this throughput series | [optional] 

## Methods

### NewThroughputSeries

`func NewThroughputSeries(name string, ) *ThroughputSeries`

NewThroughputSeries instantiates a new ThroughputSeries object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewThroughputSeriesWithDefaults

`func NewThroughputSeriesWithDefaults() *ThroughputSeries`

NewThroughputSeriesWithDefaults instantiates a new ThroughputSeries object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *ThroughputSeries) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *ThroughputSeries) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *ThroughputSeries) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *ThroughputSeries) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *ThroughputSeries) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *ThroughputSeries) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *ThroughputSeries) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetValues

`func (o *ThroughputSeries) GetValues() []int32`

GetValues returns the Values field if non-nil, zero value otherwise.

### GetValuesOk

`func (o *ThroughputSeries) GetValuesOk() (*[]int32, bool)`

GetValuesOk returns a tuple with the Values field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetValues

`func (o *ThroughputSeries) SetValues(v []int32)`

SetValues sets Values field to given value.

### HasValues

`func (o *ThroughputSeries) HasValues() bool`

HasValues returns a boolean if a field has been set.

### GetDatafile

`func (o *ThroughputSeries) GetDatafile() string`

GetDatafile returns the Datafile field if non-nil, zero value otherwise.

### GetDatafileOk

`func (o *ThroughputSeries) GetDatafileOk() (*string, bool)`

GetDatafileOk returns a tuple with the Datafile field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDatafile

`func (o *ThroughputSeries) SetDatafile(v string)`

SetDatafile sets Datafile field to given value.

### HasDatafile

`func (o *ThroughputSeries) HasDatafile() bool`

HasDatafile returns a boolean if a field has been set.

### GetState

`func (o *ThroughputSeries) GetState() int32`

GetState returns the State field if non-nil, zero value otherwise.

### GetStateOk

`func (o *ThroughputSeries) GetStateOk() (*int32, bool)`

GetStateOk returns a tuple with the State field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetState

`func (o *ThroughputSeries) SetState(v int32)`

SetState sets State field to given value.

### HasState

`func (o *ThroughputSeries) HasState() bool`

HasState returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


