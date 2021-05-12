# EsmeSession

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** | unique session ID | 
**LocalAddr** | Pointer to **string** | local TCP address | [optional] 
**CreatedAt** | Pointer to **time.Time** | the local time this session is created | [optional] 
**Account** | Pointer to [**EsmeAccount**](EsmeAccount.md) |  | [optional] 

## Methods

### NewEsmeSession

`func NewEsmeSession(id string, ) *EsmeSession`

NewEsmeSession instantiates a new EsmeSession object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewEsmeSessionWithDefaults

`func NewEsmeSessionWithDefaults() *EsmeSession`

NewEsmeSessionWithDefaults instantiates a new EsmeSession object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *EsmeSession) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *EsmeSession) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *EsmeSession) SetId(v string)`

SetId sets Id field to given value.


### GetLocalAddr

`func (o *EsmeSession) GetLocalAddr() string`

GetLocalAddr returns the LocalAddr field if non-nil, zero value otherwise.

### GetLocalAddrOk

`func (o *EsmeSession) GetLocalAddrOk() (*string, bool)`

GetLocalAddrOk returns a tuple with the LocalAddr field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLocalAddr

`func (o *EsmeSession) SetLocalAddr(v string)`

SetLocalAddr sets LocalAddr field to given value.

### HasLocalAddr

`func (o *EsmeSession) HasLocalAddr() bool`

HasLocalAddr returns a boolean if a field has been set.

### GetCreatedAt

`func (o *EsmeSession) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *EsmeSession) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *EsmeSession) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *EsmeSession) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.

### GetAccount

`func (o *EsmeSession) GetAccount() EsmeAccount`

GetAccount returns the Account field if non-nil, zero value otherwise.

### GetAccountOk

`func (o *EsmeSession) GetAccountOk() (*EsmeAccount, bool)`

GetAccountOk returns a tuple with the Account field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAccount

`func (o *EsmeSession) SetAccount(v EsmeAccount)`

SetAccount sets Account field to given value.

### HasAccount

`func (o *EsmeSession) HasAccount() bool`

HasAccount returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


