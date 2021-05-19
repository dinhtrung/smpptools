# SmscInstance

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Name** | **string** | name of this SMSC Instance | 
**Description** | Pointer to **string** | short description text | [optional] 
**Port** | Pointer to **int32** | TCP Port to listen to | [optional] 
**ConnectionTimeout** | Pointer to **int32** | Connection timeout in milliseconds | [optional] 
**IsPersist** | Pointer to **bool** | true if this SMSC should be start automatically on start up | [optional] 
**AllowAnonymous** | Pointer to **bool** | true to bypass checking on SMSC account. Accept ratio and Delivery Error ratio will use system default | [optional] [default to false]
**WindowSize** | Pointer to **int32** | Number of packets send out per one go | [optional] 

## Methods

### NewSmscInstance

`func NewSmscInstance(name string, ) *SmscInstance`

NewSmscInstance instantiates a new SmscInstance object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmscInstanceWithDefaults

`func NewSmscInstanceWithDefaults() *SmscInstance`

NewSmscInstanceWithDefaults instantiates a new SmscInstance object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SmscInstance) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SmscInstance) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SmscInstance) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SmscInstance) HasId() bool`

HasId returns a boolean if a field has been set.

### GetName

`func (o *SmscInstance) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SmscInstance) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SmscInstance) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *SmscInstance) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SmscInstance) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SmscInstance) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *SmscInstance) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetPort

`func (o *SmscInstance) GetPort() int32`

GetPort returns the Port field if non-nil, zero value otherwise.

### GetPortOk

`func (o *SmscInstance) GetPortOk() (*int32, bool)`

GetPortOk returns a tuple with the Port field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPort

`func (o *SmscInstance) SetPort(v int32)`

SetPort sets Port field to given value.

### HasPort

`func (o *SmscInstance) HasPort() bool`

HasPort returns a boolean if a field has been set.

### GetConnectionTimeout

`func (o *SmscInstance) GetConnectionTimeout() int32`

GetConnectionTimeout returns the ConnectionTimeout field if non-nil, zero value otherwise.

### GetConnectionTimeoutOk

`func (o *SmscInstance) GetConnectionTimeoutOk() (*int32, bool)`

GetConnectionTimeoutOk returns a tuple with the ConnectionTimeout field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetConnectionTimeout

`func (o *SmscInstance) SetConnectionTimeout(v int32)`

SetConnectionTimeout sets ConnectionTimeout field to given value.

### HasConnectionTimeout

`func (o *SmscInstance) HasConnectionTimeout() bool`

HasConnectionTimeout returns a boolean if a field has been set.

### GetIsPersist

`func (o *SmscInstance) GetIsPersist() bool`

GetIsPersist returns the IsPersist field if non-nil, zero value otherwise.

### GetIsPersistOk

`func (o *SmscInstance) GetIsPersistOk() (*bool, bool)`

GetIsPersistOk returns a tuple with the IsPersist field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPersist

`func (o *SmscInstance) SetIsPersist(v bool)`

SetIsPersist sets IsPersist field to given value.

### HasIsPersist

`func (o *SmscInstance) HasIsPersist() bool`

HasIsPersist returns a boolean if a field has been set.

### GetAllowAnonymous

`func (o *SmscInstance) GetAllowAnonymous() bool`

GetAllowAnonymous returns the AllowAnonymous field if non-nil, zero value otherwise.

### GetAllowAnonymousOk

`func (o *SmscInstance) GetAllowAnonymousOk() (*bool, bool)`

GetAllowAnonymousOk returns a tuple with the AllowAnonymous field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAllowAnonymous

`func (o *SmscInstance) SetAllowAnonymous(v bool)`

SetAllowAnonymous sets AllowAnonymous field to given value.

### HasAllowAnonymous

`func (o *SmscInstance) HasAllowAnonymous() bool`

HasAllowAnonymous returns a boolean if a field has been set.

### GetWindowSize

`func (o *SmscInstance) GetWindowSize() int32`

GetWindowSize returns the WindowSize field if non-nil, zero value otherwise.

### GetWindowSizeOk

`func (o *SmscInstance) GetWindowSizeOk() (*int32, bool)`

GetWindowSizeOk returns a tuple with the WindowSize field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWindowSize

`func (o *SmscInstance) SetWindowSize(v int32)`

SetWindowSize sets WindowSize field to given value.

### HasWindowSize

`func (o *SmscInstance) HasWindowSize() bool`

HasWindowSize returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


