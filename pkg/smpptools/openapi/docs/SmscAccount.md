# SmscAccount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**AddressNPI** | Pointer to **int32** | Bind Address Numbering Plan Indication | [optional] 
**AddressRange** | Pointer to **string** | Bind Address Range | [optional] 
**AddressTON** | Pointer to **int32** | Bind Address Type of Number | [optional] 
**BindType** | Pointer to **string** | Bind Type, transmitter, receiver or transceiver | [optional] 
**Description** | Pointer to **string** | short description text | [optional] 
**DlrErrorCode** | Pointer to **int32** | Error Code return to SMSC for Mobile Originated SMS | [optional] 
**DlrErrorRate** | Pointer to **int32** | Error Ratio for Receiving Mobile Orignated SMS | [optional] 
**Id** | Pointer to **string** |  | [optional] 
**MaxBinds** | Pointer to **int32** | max number of active binds on this account | [optional] 
**MoErrorCode** | Pointer to **int32** | Error Code return to SMSC for Mobile Originated SMS | [optional] 
**MoErrorRate** | Pointer to **int32** | Error Ratio for Receiving Mobile Orignated SMS | [optional] 
**Name** | **string** | name of this SMSCaccount account | 
**Password** | **string** | Password for login | 
**SystemID** | **string** | SystemID used to connect to remote SMSC | 

## Methods

### NewSmscAccount

`func NewSmscAccount(name string, password string, systemID string, ) *SmscAccount`

NewSmscAccount instantiates a new SmscAccount object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmscAccountWithDefaults

`func NewSmscAccountWithDefaults() *SmscAccount`

NewSmscAccountWithDefaults instantiates a new SmscAccount object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddressNPI

`func (o *SmscAccount) GetAddressNPI() int32`

GetAddressNPI returns the AddressNPI field if non-nil, zero value otherwise.

### GetAddressNPIOk

`func (o *SmscAccount) GetAddressNPIOk() (*int32, bool)`

GetAddressNPIOk returns a tuple with the AddressNPI field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressNPI

`func (o *SmscAccount) SetAddressNPI(v int32)`

SetAddressNPI sets AddressNPI field to given value.

### HasAddressNPI

`func (o *SmscAccount) HasAddressNPI() bool`

HasAddressNPI returns a boolean if a field has been set.

### GetAddressRange

`func (o *SmscAccount) GetAddressRange() string`

GetAddressRange returns the AddressRange field if non-nil, zero value otherwise.

### GetAddressRangeOk

`func (o *SmscAccount) GetAddressRangeOk() (*string, bool)`

GetAddressRangeOk returns a tuple with the AddressRange field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressRange

`func (o *SmscAccount) SetAddressRange(v string)`

SetAddressRange sets AddressRange field to given value.

### HasAddressRange

`func (o *SmscAccount) HasAddressRange() bool`

HasAddressRange returns a boolean if a field has been set.

### GetAddressTON

`func (o *SmscAccount) GetAddressTON() int32`

GetAddressTON returns the AddressTON field if non-nil, zero value otherwise.

### GetAddressTONOk

`func (o *SmscAccount) GetAddressTONOk() (*int32, bool)`

GetAddressTONOk returns a tuple with the AddressTON field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressTON

`func (o *SmscAccount) SetAddressTON(v int32)`

SetAddressTON sets AddressTON field to given value.

### HasAddressTON

`func (o *SmscAccount) HasAddressTON() bool`

HasAddressTON returns a boolean if a field has been set.

### GetBindType

`func (o *SmscAccount) GetBindType() string`

GetBindType returns the BindType field if non-nil, zero value otherwise.

### GetBindTypeOk

`func (o *SmscAccount) GetBindTypeOk() (*string, bool)`

GetBindTypeOk returns a tuple with the BindType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBindType

`func (o *SmscAccount) SetBindType(v string)`

SetBindType sets BindType field to given value.

### HasBindType

`func (o *SmscAccount) HasBindType() bool`

HasBindType returns a boolean if a field has been set.

### GetDescription

`func (o *SmscAccount) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SmscAccount) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SmscAccount) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *SmscAccount) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetDlrErrorCode

`func (o *SmscAccount) GetDlrErrorCode() int32`

GetDlrErrorCode returns the DlrErrorCode field if non-nil, zero value otherwise.

### GetDlrErrorCodeOk

`func (o *SmscAccount) GetDlrErrorCodeOk() (*int32, bool)`

GetDlrErrorCodeOk returns a tuple with the DlrErrorCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDlrErrorCode

`func (o *SmscAccount) SetDlrErrorCode(v int32)`

SetDlrErrorCode sets DlrErrorCode field to given value.

### HasDlrErrorCode

`func (o *SmscAccount) HasDlrErrorCode() bool`

HasDlrErrorCode returns a boolean if a field has been set.

### GetDlrErrorRate

`func (o *SmscAccount) GetDlrErrorRate() int32`

GetDlrErrorRate returns the DlrErrorRate field if non-nil, zero value otherwise.

### GetDlrErrorRateOk

`func (o *SmscAccount) GetDlrErrorRateOk() (*int32, bool)`

GetDlrErrorRateOk returns a tuple with the DlrErrorRate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDlrErrorRate

`func (o *SmscAccount) SetDlrErrorRate(v int32)`

SetDlrErrorRate sets DlrErrorRate field to given value.

### HasDlrErrorRate

`func (o *SmscAccount) HasDlrErrorRate() bool`

HasDlrErrorRate returns a boolean if a field has been set.

### GetId

`func (o *SmscAccount) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SmscAccount) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SmscAccount) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SmscAccount) HasId() bool`

HasId returns a boolean if a field has been set.

### GetMaxBinds

`func (o *SmscAccount) GetMaxBinds() int32`

GetMaxBinds returns the MaxBinds field if non-nil, zero value otherwise.

### GetMaxBindsOk

`func (o *SmscAccount) GetMaxBindsOk() (*int32, bool)`

GetMaxBindsOk returns a tuple with the MaxBinds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxBinds

`func (o *SmscAccount) SetMaxBinds(v int32)`

SetMaxBinds sets MaxBinds field to given value.

### HasMaxBinds

`func (o *SmscAccount) HasMaxBinds() bool`

HasMaxBinds returns a boolean if a field has been set.

### GetMoErrorCode

`func (o *SmscAccount) GetMoErrorCode() int32`

GetMoErrorCode returns the MoErrorCode field if non-nil, zero value otherwise.

### GetMoErrorCodeOk

`func (o *SmscAccount) GetMoErrorCodeOk() (*int32, bool)`

GetMoErrorCodeOk returns a tuple with the MoErrorCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMoErrorCode

`func (o *SmscAccount) SetMoErrorCode(v int32)`

SetMoErrorCode sets MoErrorCode field to given value.

### HasMoErrorCode

`func (o *SmscAccount) HasMoErrorCode() bool`

HasMoErrorCode returns a boolean if a field has been set.

### GetMoErrorRate

`func (o *SmscAccount) GetMoErrorRate() int32`

GetMoErrorRate returns the MoErrorRate field if non-nil, zero value otherwise.

### GetMoErrorRateOk

`func (o *SmscAccount) GetMoErrorRateOk() (*int32, bool)`

GetMoErrorRateOk returns a tuple with the MoErrorRate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMoErrorRate

`func (o *SmscAccount) SetMoErrorRate(v int32)`

SetMoErrorRate sets MoErrorRate field to given value.

### HasMoErrorRate

`func (o *SmscAccount) HasMoErrorRate() bool`

HasMoErrorRate returns a boolean if a field has been set.

### GetName

`func (o *SmscAccount) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SmscAccount) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SmscAccount) SetName(v string)`

SetName sets Name field to given value.


### GetPassword

`func (o *SmscAccount) GetPassword() string`

GetPassword returns the Password field if non-nil, zero value otherwise.

### GetPasswordOk

`func (o *SmscAccount) GetPasswordOk() (*string, bool)`

GetPasswordOk returns a tuple with the Password field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPassword

`func (o *SmscAccount) SetPassword(v string)`

SetPassword sets Password field to given value.


### GetSystemID

`func (o *SmscAccount) GetSystemID() string`

GetSystemID returns the SystemID field if non-nil, zero value otherwise.

### GetSystemIDOk

`func (o *SmscAccount) GetSystemIDOk() (*string, bool)`

GetSystemIDOk returns a tuple with the SystemID field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSystemID

`func (o *SmscAccount) SetSystemID(v string)`

SetSystemID sets SystemID field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


