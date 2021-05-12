# SmscSession

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** | unique session ID | 
**RemoteAddr** | Pointer to **string** | remote TCP address | [optional] 
**CreatedAt** | Pointer to **time.Time** | the local time this session is created | [optional] 
**Account** | Pointer to [**SmscAccount**](SmscAccount.md) |  | [optional] 

## Methods

### NewSmscSession

`func NewSmscSession(id string, ) *SmscSession`

NewSmscSession instantiates a new SmscSession object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmscSessionWithDefaults

`func NewSmscSessionWithDefaults() *SmscSession`

NewSmscSessionWithDefaults instantiates a new SmscSession object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SmscSession) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SmscSession) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SmscSession) SetId(v string)`

SetId sets Id field to given value.


### GetRemoteAddr

`func (o *SmscSession) GetRemoteAddr() string`

GetRemoteAddr returns the RemoteAddr field if non-nil, zero value otherwise.

### GetRemoteAddrOk

`func (o *SmscSession) GetRemoteAddrOk() (*string, bool)`

GetRemoteAddrOk returns a tuple with the RemoteAddr field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRemoteAddr

`func (o *SmscSession) SetRemoteAddr(v string)`

SetRemoteAddr sets RemoteAddr field to given value.

### HasRemoteAddr

`func (o *SmscSession) HasRemoteAddr() bool`

HasRemoteAddr returns a boolean if a field has been set.

### GetCreatedAt

`func (o *SmscSession) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SmscSession) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SmscSession) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *SmscSession) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.

### GetAccount

`func (o *SmscSession) GetAccount() SmscAccount`

GetAccount returns the Account field if non-nil, zero value otherwise.

### GetAccountOk

`func (o *SmscSession) GetAccountOk() (*SmscAccount, bool)`

GetAccountOk returns a tuple with the Account field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAccount

`func (o *SmscSession) SetAccount(v SmscAccount)`

SetAccount sets Account field to given value.

### HasAccount

`func (o *SmscSession) HasAccount() bool`

HasAccount returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


