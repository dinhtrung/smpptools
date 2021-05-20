# SmscAccount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** | unique account ID | [optional] 
**Name** | **string** | name of this SMSCaccount account | 
**Description** | Pointer to **string** | short description text | [optional] 
**SystemID** | **string** | SystemID used to connect to remote SMSC | 
**Password** | **string** | Password for login | 
**SystemType** | Pointer to **string** | The system_type parameter is used to categorize the type of ESME that is binding to the SMSC | [optional] 
**InterfaceVersion** | Pointer to **int** | version of the SMPP protocol | [optional] 
**BindType** | Pointer to **string** | Bind Type, transmitter, receiver or transceiver | [optional] [default to "transceiver"]
**AddressRange** | Pointer to **string** | Bind Address Range | [optional] 
**AddressNPI** | Pointer to **int** | Bind Address Numbering Plan Indication | [optional] 
**AddressTON** | Pointer to **int** | Bind Address Type of Number | [optional] 
**AcceptRatio** | Pointer to [**[]ErrorRate**](ErrorRate.md) | Error ratio for return on receive Submit SM from ESME | [optional] 
**DeliveryRatio** | Pointer to [**[]ErrorRate**](ErrorRate.md) | Error ratio for generate the Delivery Report and send back to client | [optional] 
**MoThroughput** | Pointer to **int** | Maximum throughput for sending MO | [optional] 
**MaxBinds** | Pointer to **int** | max number of active binds on this account | [optional] 

## Methods

### NewSmscAccount

`func NewSmscAccount(name string, systemID string, password string, ) *SmscAccount`

NewSmscAccount instantiates a new SmscAccount object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmscAccountWithDefaults

`func NewSmscAccountWithDefaults() *SmscAccount`

NewSmscAccountWithDefaults instantiates a new SmscAccount object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

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


### GetSystemType

`func (o *SmscAccount) GetSystemType() string`

GetSystemType returns the SystemType field if non-nil, zero value otherwise.

### GetSystemTypeOk

`func (o *SmscAccount) GetSystemTypeOk() (*string, bool)`

GetSystemTypeOk returns a tuple with the SystemType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSystemType

`func (o *SmscAccount) SetSystemType(v string)`

SetSystemType sets SystemType field to given value.

### HasSystemType

`func (o *SmscAccount) HasSystemType() bool`

HasSystemType returns a boolean if a field has been set.

### GetInterfaceVersion

`func (o *SmscAccount) GetInterfaceVersion() int`

GetInterfaceVersion returns the InterfaceVersion field if non-nil, zero value otherwise.

### GetInterfaceVersionOk

`func (o *SmscAccount) GetInterfaceVersionOk() (*int, bool)`

GetInterfaceVersionOk returns a tuple with the InterfaceVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInterfaceVersion

`func (o *SmscAccount) SetInterfaceVersion(v int)`

SetInterfaceVersion sets InterfaceVersion field to given value.

### HasInterfaceVersion

`func (o *SmscAccount) HasInterfaceVersion() bool`

HasInterfaceVersion returns a boolean if a field has been set.

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

### GetAddressNPI

`func (o *SmscAccount) GetAddressNPI() int`

GetAddressNPI returns the AddressNPI field if non-nil, zero value otherwise.

### GetAddressNPIOk

`func (o *SmscAccount) GetAddressNPIOk() (*int, bool)`

GetAddressNPIOk returns a tuple with the AddressNPI field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressNPI

`func (o *SmscAccount) SetAddressNPI(v int)`

SetAddressNPI sets AddressNPI field to given value.

### HasAddressNPI

`func (o *SmscAccount) HasAddressNPI() bool`

HasAddressNPI returns a boolean if a field has been set.

### GetAddressTON

`func (o *SmscAccount) GetAddressTON() int`

GetAddressTON returns the AddressTON field if non-nil, zero value otherwise.

### GetAddressTONOk

`func (o *SmscAccount) GetAddressTONOk() (*int, bool)`

GetAddressTONOk returns a tuple with the AddressTON field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddressTON

`func (o *SmscAccount) SetAddressTON(v int)`

SetAddressTON sets AddressTON field to given value.

### HasAddressTON

`func (o *SmscAccount) HasAddressTON() bool`

HasAddressTON returns a boolean if a field has been set.

### GetAcceptRatio

`func (o *SmscAccount) GetAcceptRatio() []ErrorRate`

GetAcceptRatio returns the AcceptRatio field if non-nil, zero value otherwise.

### GetAcceptRatioOk

`func (o *SmscAccount) GetAcceptRatioOk() (*[]ErrorRate, bool)`

GetAcceptRatioOk returns a tuple with the AcceptRatio field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAcceptRatio

`func (o *SmscAccount) SetAcceptRatio(v []ErrorRate)`

SetAcceptRatio sets AcceptRatio field to given value.

### HasAcceptRatio

`func (o *SmscAccount) HasAcceptRatio() bool`

HasAcceptRatio returns a boolean if a field has been set.

### GetDeliveryRatio

`func (o *SmscAccount) GetDeliveryRatio() []ErrorRate`

GetDeliveryRatio returns the DeliveryRatio field if non-nil, zero value otherwise.

### GetDeliveryRatioOk

`func (o *SmscAccount) GetDeliveryRatioOk() (*[]ErrorRate, bool)`

GetDeliveryRatioOk returns a tuple with the DeliveryRatio field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeliveryRatio

`func (o *SmscAccount) SetDeliveryRatio(v []ErrorRate)`

SetDeliveryRatio sets DeliveryRatio field to given value.

### HasDeliveryRatio

`func (o *SmscAccount) HasDeliveryRatio() bool`

HasDeliveryRatio returns a boolean if a field has been set.

### GetMoThroughput

`func (o *SmscAccount) GetMoThroughput() int`

GetMoThroughput returns the MoThroughput field if non-nil, zero value otherwise.

### GetMoThroughputOk

`func (o *SmscAccount) GetMoThroughputOk() (*int, bool)`

GetMoThroughputOk returns a tuple with the MoThroughput field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMoThroughput

`func (o *SmscAccount) SetMoThroughput(v int)`

SetMoThroughput sets MoThroughput field to given value.

### HasMoThroughput

`func (o *SmscAccount) HasMoThroughput() bool`

HasMoThroughput returns a boolean if a field has been set.

### GetMaxBinds

`func (o *SmscAccount) GetMaxBinds() int`

GetMaxBinds returns the MaxBinds field if non-nil, zero value otherwise.

### GetMaxBindsOk

`func (o *SmscAccount) GetMaxBindsOk() (*int, bool)`

GetMaxBindsOk returns a tuple with the MaxBinds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxBinds

`func (o *SmscAccount) SetMaxBinds(v int)`

SetMaxBinds sets MaxBinds field to given value.

### HasMaxBinds

`func (o *SmscAccount) HasMaxBinds() bool`

HasMaxBinds returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


