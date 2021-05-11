# EsmeAccount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**AddressNPI** | Pointer to **int32** | Bind Address Numbering Plan Indication | [optional] 
**AddressRange** | Pointer to **string** | Bind Address Range | [optional] 
**AddressTON** | Pointer to **int32** | Bind Address Type of Number | [optional] 
**BindType** | Pointer to **string** | Bind Type, transmitter, receiver or transceiver | [optional] 
**ConnectionTimeout** | Pointer to **int32** | Connection timeout in milliseconds | [optional] 
**Description** | Pointer to **string** | short description text | [optional] 
**DlrErrorCode** | Pointer to **int32** | Error Code return to SMSC for Mobile Originated SMS | [optional] 
**DlrErrorRate** | Pointer to **int32** | Error Ratio for Receiving Mobile Orignated SMS | [optional] 
**EnquireLinkInterval** | Pointer to **int32** | Enquire links interval in seconds | [optional] 
**Host** | Pointer to **string** | remote SMSC host | [optional] 
**Id** | Pointer to **string** |  | [optional] 
**IsEnable** | Pointer to **bool** | true if this ESME should be start automatically | [optional] 
**IsPersist** | Pointer to **bool** | true if this ESME should be start automatically on start up | [optional] 
**MoErrorCode** | Pointer to **int32** | Error Code return to SMSC for Mobile Originated SMS | [optional] 
**MoErrorRate** | Pointer to **int32** | Error Ratio for Receiving Mobile Orignated SMS | [optional] 
**MtThroughtput** | Pointer to **int32** | Sending out speeds in TPS | [optional] 
**Name** | **string** | name of this ESME account | 
**NumBinds** | Pointer to **int32** | number of active binds on start up | [optional] 
**Password** | Pointer to **string** | Password for login | [optional] 
**Port** | Pointer to **int32** | remote SMSC port | [optional] 
**ReconnectDelay** | Pointer to **int32** | Delay in seconds before retry reconnect | [optional] 
**SystemID** | Pointer to **string** | SystemID used to connect to remote SMSC | [optional] 
**WindowSize** | Pointer to **int32** | Number of packets send out per one go | [optional] 

## Methods

### NewEsmeAccount

`func NewEsmeAccount(name string, ) *EsmeAccount`

NewEsmeAccount instantiates a new EsmeAccount object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewEsmeAccountWithDefaults

`func NewEsmeAccountWithDefaults() *EsmeAccount`

NewEsmeAccountWithDefaults instantiates a new EsmeAccount object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddressNPI

`func (o *EsmeAccount) GetAddressNPI() int32`

GetAddressNPI returns the AddressNPI field if non-nil, zero value otherwise.

### GetAddressNPIOk

`func (o *EsmeAccount) GetAddressNPIOk() (*int32, bool)`

GetAddressNPIOk returns a tuple with the AddressNPI field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressNPI

`func (o *EsmeAccount) SetAddressNPI(v int32)`

SetAddressNPI sets AddressNPI field to given value.

### HasAddressNPI

`func (o *EsmeAccount) HasAddressNPI() bool`

HasAddressNPI returns a boolean if a field has been set.

### GetAddressRange

`func (o *EsmeAccount) GetAddressRange() string`

GetAddressRange returns the AddressRange field if non-nil, zero value otherwise.

### GetAddressRangeOk

`func (o *EsmeAccount) GetAddressRangeOk() (*string, bool)`

GetAddressRangeOk returns a tuple with the AddressRange field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressRange

`func (o *EsmeAccount) SetAddressRange(v string)`

SetAddressRange sets AddressRange field to given value.

### HasAddressRange

`func (o *EsmeAccount) HasAddressRange() bool`

HasAddressRange returns a boolean if a field has been set.

### GetAddressTON

`func (o *EsmeAccount) GetAddressTON() int32`

GetAddressTON returns the AddressTON field if non-nil, zero value otherwise.

### GetAddressTONOk

`func (o *EsmeAccount) GetAddressTONOk() (*int32, bool)`

GetAddressTONOk returns a tuple with the AddressTON field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressTON

`func (o *EsmeAccount) SetAddressTON(v int32)`

SetAddressTON sets AddressTON field to given value.

### HasAddressTON

`func (o *EsmeAccount) HasAddressTON() bool`

HasAddressTON returns a boolean if a field has been set.

### GetBindType

`func (o *EsmeAccount) GetBindType() string`

GetBindType returns the BindType field if non-nil, zero value otherwise.

### GetBindTypeOk

`func (o *EsmeAccount) GetBindTypeOk() (*string, bool)`

GetBindTypeOk returns a tuple with the BindType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBindType

`func (o *EsmeAccount) SetBindType(v string)`

SetBindType sets BindType field to given value.

### HasBindType

`func (o *EsmeAccount) HasBindType() bool`

HasBindType returns a boolean if a field has been set.

### GetConnectionTimeout

`func (o *EsmeAccount) GetConnectionTimeout() int32`

GetConnectionTimeout returns the ConnectionTimeout field if non-nil, zero value otherwise.

### GetConnectionTimeoutOk

`func (o *EsmeAccount) GetConnectionTimeoutOk() (*int32, bool)`

GetConnectionTimeoutOk returns a tuple with the ConnectionTimeout field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetConnectionTimeout

`func (o *EsmeAccount) SetConnectionTimeout(v int32)`

SetConnectionTimeout sets ConnectionTimeout field to given value.

### HasConnectionTimeout

`func (o *EsmeAccount) HasConnectionTimeout() bool`

HasConnectionTimeout returns a boolean if a field has been set.

### GetDescription

`func (o *EsmeAccount) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *EsmeAccount) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *EsmeAccount) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *EsmeAccount) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetDlrErrorCode

`func (o *EsmeAccount) GetDlrErrorCode() int32`

GetDlrErrorCode returns the DlrErrorCode field if non-nil, zero value otherwise.

### GetDlrErrorCodeOk

`func (o *EsmeAccount) GetDlrErrorCodeOk() (*int32, bool)`

GetDlrErrorCodeOk returns a tuple with the DlrErrorCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDlrErrorCode

`func (o *EsmeAccount) SetDlrErrorCode(v int32)`

SetDlrErrorCode sets DlrErrorCode field to given value.

### HasDlrErrorCode

`func (o *EsmeAccount) HasDlrErrorCode() bool`

HasDlrErrorCode returns a boolean if a field has been set.

### GetDlrErrorRate

`func (o *EsmeAccount) GetDlrErrorRate() int32`

GetDlrErrorRate returns the DlrErrorRate field if non-nil, zero value otherwise.

### GetDlrErrorRateOk

`func (o *EsmeAccount) GetDlrErrorRateOk() (*int32, bool)`

GetDlrErrorRateOk returns a tuple with the DlrErrorRate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDlrErrorRate

`func (o *EsmeAccount) SetDlrErrorRate(v int32)`

SetDlrErrorRate sets DlrErrorRate field to given value.

### HasDlrErrorRate

`func (o *EsmeAccount) HasDlrErrorRate() bool`

HasDlrErrorRate returns a boolean if a field has been set.

### GetEnquireLinkInterval

`func (o *EsmeAccount) GetEnquireLinkInterval() int32`

GetEnquireLinkInterval returns the EnquireLinkInterval field if non-nil, zero value otherwise.

### GetEnquireLinkIntervalOk

`func (o *EsmeAccount) GetEnquireLinkIntervalOk() (*int32, bool)`

GetEnquireLinkIntervalOk returns a tuple with the EnquireLinkInterval field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEnquireLinkInterval

`func (o *EsmeAccount) SetEnquireLinkInterval(v int32)`

SetEnquireLinkInterval sets EnquireLinkInterval field to given value.

### HasEnquireLinkInterval

`func (o *EsmeAccount) HasEnquireLinkInterval() bool`

HasEnquireLinkInterval returns a boolean if a field has been set.

### GetHost

`func (o *EsmeAccount) GetHost() string`

GetHost returns the Host field if non-nil, zero value otherwise.

### GetHostOk

`func (o *EsmeAccount) GetHostOk() (*string, bool)`

GetHostOk returns a tuple with the Host field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHost

`func (o *EsmeAccount) SetHost(v string)`

SetHost sets Host field to given value.

### HasHost

`func (o *EsmeAccount) HasHost() bool`

HasHost returns a boolean if a field has been set.

### GetId

`func (o *EsmeAccount) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *EsmeAccount) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *EsmeAccount) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *EsmeAccount) HasId() bool`

HasId returns a boolean if a field has been set.

### GetIsEnable

`func (o *EsmeAccount) GetIsEnable() bool`

GetIsEnable returns the IsEnable field if non-nil, zero value otherwise.

### GetIsEnableOk

`func (o *EsmeAccount) GetIsEnableOk() (*bool, bool)`

GetIsEnableOk returns a tuple with the IsEnable field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsEnable

`func (o *EsmeAccount) SetIsEnable(v bool)`

SetIsEnable sets IsEnable field to given value.

### HasIsEnable

`func (o *EsmeAccount) HasIsEnable() bool`

HasIsEnable returns a boolean if a field has been set.

### GetIsPersist

`func (o *EsmeAccount) GetIsPersist() bool`

GetIsPersist returns the IsPersist field if non-nil, zero value otherwise.

### GetIsPersistOk

`func (o *EsmeAccount) GetIsPersistOk() (*bool, bool)`

GetIsPersistOk returns a tuple with the IsPersist field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPersist

`func (o *EsmeAccount) SetIsPersist(v bool)`

SetIsPersist sets IsPersist field to given value.

### HasIsPersist

`func (o *EsmeAccount) HasIsPersist() bool`

HasIsPersist returns a boolean if a field has been set.

### GetMoErrorCode

`func (o *EsmeAccount) GetMoErrorCode() int32`

GetMoErrorCode returns the MoErrorCode field if non-nil, zero value otherwise.

### GetMoErrorCodeOk

`func (o *EsmeAccount) GetMoErrorCodeOk() (*int32, bool)`

GetMoErrorCodeOk returns a tuple with the MoErrorCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMoErrorCode

`func (o *EsmeAccount) SetMoErrorCode(v int32)`

SetMoErrorCode sets MoErrorCode field to given value.

### HasMoErrorCode

`func (o *EsmeAccount) HasMoErrorCode() bool`

HasMoErrorCode returns a boolean if a field has been set.

### GetMoErrorRate

`func (o *EsmeAccount) GetMoErrorRate() int32`

GetMoErrorRate returns the MoErrorRate field if non-nil, zero value otherwise.

### GetMoErrorRateOk

`func (o *EsmeAccount) GetMoErrorRateOk() (*int32, bool)`

GetMoErrorRateOk returns a tuple with the MoErrorRate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMoErrorRate

`func (o *EsmeAccount) SetMoErrorRate(v int32)`

SetMoErrorRate sets MoErrorRate field to given value.

### HasMoErrorRate

`func (o *EsmeAccount) HasMoErrorRate() bool`

HasMoErrorRate returns a boolean if a field has been set.

### GetMtThroughtput

`func (o *EsmeAccount) GetMtThroughtput() int32`

GetMtThroughtput returns the MtThroughtput field if non-nil, zero value otherwise.

### GetMtThroughtputOk

`func (o *EsmeAccount) GetMtThroughtputOk() (*int32, bool)`

GetMtThroughtputOk returns a tuple with the MtThroughtput field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMtThroughtput

`func (o *EsmeAccount) SetMtThroughtput(v int32)`

SetMtThroughtput sets MtThroughtput field to given value.

### HasMtThroughtput

`func (o *EsmeAccount) HasMtThroughtput() bool`

HasMtThroughtput returns a boolean if a field has been set.

### GetName

`func (o *EsmeAccount) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *EsmeAccount) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *EsmeAccount) SetName(v string)`

SetName sets Name field to given value.


### GetNumBinds

`func (o *EsmeAccount) GetNumBinds() int32`

GetNumBinds returns the NumBinds field if non-nil, zero value otherwise.

### GetNumBindsOk

`func (o *EsmeAccount) GetNumBindsOk() (*int32, bool)`

GetNumBindsOk returns a tuple with the NumBinds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNumBinds

`func (o *EsmeAccount) SetNumBinds(v int32)`

SetNumBinds sets NumBinds field to given value.

### HasNumBinds

`func (o *EsmeAccount) HasNumBinds() bool`

HasNumBinds returns a boolean if a field has been set.

### GetPassword

`func (o *EsmeAccount) GetPassword() string`

GetPassword returns the Password field if non-nil, zero value otherwise.

### GetPasswordOk

`func (o *EsmeAccount) GetPasswordOk() (*string, bool)`

GetPasswordOk returns a tuple with the Password field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPassword

`func (o *EsmeAccount) SetPassword(v string)`

SetPassword sets Password field to given value.

### HasPassword

`func (o *EsmeAccount) HasPassword() bool`

HasPassword returns a boolean if a field has been set.

### GetPort

`func (o *EsmeAccount) GetPort() int32`

GetPort returns the Port field if non-nil, zero value otherwise.

### GetPortOk

`func (o *EsmeAccount) GetPortOk() (*int32, bool)`

GetPortOk returns a tuple with the Port field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPort

`func (o *EsmeAccount) SetPort(v int32)`

SetPort sets Port field to given value.

### HasPort

`func (o *EsmeAccount) HasPort() bool`

HasPort returns a boolean if a field has been set.

### GetReconnectDelay

`func (o *EsmeAccount) GetReconnectDelay() int32`

GetReconnectDelay returns the ReconnectDelay field if non-nil, zero value otherwise.

### GetReconnectDelayOk

`func (o *EsmeAccount) GetReconnectDelayOk() (*int32, bool)`

GetReconnectDelayOk returns a tuple with the ReconnectDelay field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReconnectDelay

`func (o *EsmeAccount) SetReconnectDelay(v int32)`

SetReconnectDelay sets ReconnectDelay field to given value.

### HasReconnectDelay

`func (o *EsmeAccount) HasReconnectDelay() bool`

HasReconnectDelay returns a boolean if a field has been set.

### GetSystemID

`func (o *EsmeAccount) GetSystemID() string`

GetSystemID returns the SystemID field if non-nil, zero value otherwise.

### GetSystemIDOk

`func (o *EsmeAccount) GetSystemIDOk() (*string, bool)`

GetSystemIDOk returns a tuple with the SystemID field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSystemID

`func (o *EsmeAccount) SetSystemID(v string)`

SetSystemID sets SystemID field to given value.

### HasSystemID

`func (o *EsmeAccount) HasSystemID() bool`

HasSystemID returns a boolean if a field has been set.

### GetWindowSize

`func (o *EsmeAccount) GetWindowSize() int32`

GetWindowSize returns the WindowSize field if non-nil, zero value otherwise.

### GetWindowSizeOk

`func (o *EsmeAccount) GetWindowSizeOk() (*int32, bool)`

GetWindowSizeOk returns a tuple with the WindowSize field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWindowSize

`func (o *EsmeAccount) SetWindowSize(v int32)`

SetWindowSize sets WindowSize field to given value.

### HasWindowSize

`func (o *EsmeAccount) HasWindowSize() bool`

HasWindowSize returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


