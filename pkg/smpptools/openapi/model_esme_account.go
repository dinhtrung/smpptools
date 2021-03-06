/*
 * smpptools API
 *
 * smpptools API documentation
 *
 * API version: 0.0.2
 */

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
)

// EsmeAccount ESME hold information on how to establish a SMPP Session towards SMSC
type EsmeAccount struct {
	// unique id for this ESME account
	Id *string `json:"id,omitempty"`
	// name of this ESME account
	Name string `json:"name"`
	// short description text
	Description *string `json:"description,omitempty"`
	// remote SMSC host
	Host *string `json:"host,omitempty"`
	// remote SMSC port
	Port *int `json:"port,omitempty"`
	// SystemID used to connect to remote SMSC
	SystemID *string `json:"systemID,omitempty"`
	// Password for login
	Password *string `json:"password,omitempty"`
	// The system_type parameter is used to categorize the type of ESME that is binding to the SMSC
	SystemType *string `json:"systemType,omitempty"`
	// version of the SMPP protocol
	InterfaceVersion *int `json:"interfaceVersion,omitempty"`
	// Bind Type, transmitter, receiver or transceiver
	BindType *string `json:"bindType,omitempty"`
	// Bind Address Range
	AddressRange *string `json:"addressRange,omitempty"`
	// Bind Address Numbering Plan Indication
	AddressNPI *int `json:"addressNPI,omitempty"`
	// Bind Address Type of Number
	AddressTON *int `json:"addressTON,omitempty"`
	// Connection timeout in milliseconds
	ConnectionTimeout *int `json:"connectionTimeout,omitempty"`
	// Error rate on receiving Mobile Originated SMS
	AcceptRatio *[]ErrorRate `json:"acceptRatio,omitempty"`
	// Error ratio on receiving Delivery Receipt
	AckRatio *[]ErrorRate `json:"ackRatio,omitempty"`
	// Enquire links interval in seconds
	EnquireLinkInterval *int `json:"enquireLinkInterval,omitempty"`
	// true if this ESME should be start automatically
	IsEnable *bool `json:"isEnable,omitempty"`
	// true if this ESME should be start automatically on start up
	IsPersist *bool `json:"isPersist,omitempty"`
	// Sending out speeds in TPS
	MtThroughtput *int `json:"mtThroughtput,omitempty"`
	// number of active binds on start up
	NumBinds *int `json:"numBinds,omitempty"`
	// Delay in seconds before retry reconnect
	ReconnectDelay *int `json:"reconnectDelay,omitempty"`
	// Number of packets send out per one go
	WindowSize *int `json:"windowSize,omitempty"`
}

// NewEsmeAccount instantiates a new EsmeAccount object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewEsmeAccount(name string) *EsmeAccount {
	this := EsmeAccount{}
	this.Name = name
	var bindType string = "transceiver"
	this.BindType = &bindType
	return &this
}

// NewEsmeAccountWithDefaults instantiates a new EsmeAccount object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewEsmeAccountWithDefaults() *EsmeAccount {
	this := EsmeAccount{}
	var bindType string = "transceiver"
	this.BindType = &bindType
	return &this
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *EsmeAccount) GetId() string {
	if o == nil || o.Id == nil {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetIdOk() (*string, bool) {
	if o == nil || o.Id == nil {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *EsmeAccount) HasId() bool {
	if o != nil && o.Id != nil {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *EsmeAccount) SetId(v string) {
	o.Id = &v
}

// GetName returns the Name field value
func (o *EsmeAccount) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetNameOk() (*string, bool) {
	if o == nil  {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *EsmeAccount) SetName(v string) {
	o.Name = v
}

// GetDescription returns the Description field value if set, zero value otherwise.
func (o *EsmeAccount) GetDescription() string {
	if o == nil || o.Description == nil {
		var ret string
		return ret
	}
	return *o.Description
}

// GetDescriptionOk returns a tuple with the Description field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetDescriptionOk() (*string, bool) {
	if o == nil || o.Description == nil {
		return nil, false
	}
	return o.Description, true
}

// HasDescription returns a boolean if a field has been set.
func (o *EsmeAccount) HasDescription() bool {
	if o != nil && o.Description != nil {
		return true
	}

	return false
}

// SetDescription gets a reference to the given string and assigns it to the Description field.
func (o *EsmeAccount) SetDescription(v string) {
	o.Description = &v
}

// GetHost returns the Host field value if set, zero value otherwise.
func (o *EsmeAccount) GetHost() string {
	if o == nil || o.Host == nil {
		var ret string
		return ret
	}
	return *o.Host
}

// GetHostOk returns a tuple with the Host field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetHostOk() (*string, bool) {
	if o == nil || o.Host == nil {
		return nil, false
	}
	return o.Host, true
}

// HasHost returns a boolean if a field has been set.
func (o *EsmeAccount) HasHost() bool {
	if o != nil && o.Host != nil {
		return true
	}

	return false
}

// SetHost gets a reference to the given string and assigns it to the Host field.
func (o *EsmeAccount) SetHost(v string) {
	o.Host = &v
}

// GetPort returns the Port field value if set, zero value otherwise.
func (o *EsmeAccount) GetPort() int {
	if o == nil || o.Port == nil {
		var ret int
		return ret
	}
	return *o.Port
}

// GetPortOk returns a tuple with the Port field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetPortOk() (*int, bool) {
	if o == nil || o.Port == nil {
		return nil, false
	}
	return o.Port, true
}

// HasPort returns a boolean if a field has been set.
func (o *EsmeAccount) HasPort() bool {
	if o != nil && o.Port != nil {
		return true
	}

	return false
}

// SetPort gets a reference to the given int and assigns it to the Port field.
func (o *EsmeAccount) SetPort(v int) {
	o.Port = &v
}

// GetSystemID returns the SystemID field value if set, zero value otherwise.
func (o *EsmeAccount) GetSystemID() string {
	if o == nil || o.SystemID == nil {
		var ret string
		return ret
	}
	return *o.SystemID
}

// GetSystemIDOk returns a tuple with the SystemID field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetSystemIDOk() (*string, bool) {
	if o == nil || o.SystemID == nil {
		return nil, false
	}
	return o.SystemID, true
}

// HasSystemID returns a boolean if a field has been set.
func (o *EsmeAccount) HasSystemID() bool {
	if o != nil && o.SystemID != nil {
		return true
	}

	return false
}

// SetSystemID gets a reference to the given string and assigns it to the SystemID field.
func (o *EsmeAccount) SetSystemID(v string) {
	o.SystemID = &v
}

// GetPassword returns the Password field value if set, zero value otherwise.
func (o *EsmeAccount) GetPassword() string {
	if o == nil || o.Password == nil {
		var ret string
		return ret
	}
	return *o.Password
}

// GetPasswordOk returns a tuple with the Password field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetPasswordOk() (*string, bool) {
	if o == nil || o.Password == nil {
		return nil, false
	}
	return o.Password, true
}

// HasPassword returns a boolean if a field has been set.
func (o *EsmeAccount) HasPassword() bool {
	if o != nil && o.Password != nil {
		return true
	}

	return false
}

// SetPassword gets a reference to the given string and assigns it to the Password field.
func (o *EsmeAccount) SetPassword(v string) {
	o.Password = &v
}

// GetSystemType returns the SystemType field value if set, zero value otherwise.
func (o *EsmeAccount) GetSystemType() string {
	if o == nil || o.SystemType == nil {
		var ret string
		return ret
	}
	return *o.SystemType
}

// GetSystemTypeOk returns a tuple with the SystemType field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetSystemTypeOk() (*string, bool) {
	if o == nil || o.SystemType == nil {
		return nil, false
	}
	return o.SystemType, true
}

// HasSystemType returns a boolean if a field has been set.
func (o *EsmeAccount) HasSystemType() bool {
	if o != nil && o.SystemType != nil {
		return true
	}

	return false
}

// SetSystemType gets a reference to the given string and assigns it to the SystemType field.
func (o *EsmeAccount) SetSystemType(v string) {
	o.SystemType = &v
}

// GetInterfaceVersion returns the InterfaceVersion field value if set, zero value otherwise.
func (o *EsmeAccount) GetInterfaceVersion() int {
	if o == nil || o.InterfaceVersion == nil {
		var ret int
		return ret
	}
	return *o.InterfaceVersion
}

// GetInterfaceVersionOk returns a tuple with the InterfaceVersion field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetInterfaceVersionOk() (*int, bool) {
	if o == nil || o.InterfaceVersion == nil {
		return nil, false
	}
	return o.InterfaceVersion, true
}

// HasInterfaceVersion returns a boolean if a field has been set.
func (o *EsmeAccount) HasInterfaceVersion() bool {
	if o != nil && o.InterfaceVersion != nil {
		return true
	}

	return false
}

// SetInterfaceVersion gets a reference to the given int and assigns it to the InterfaceVersion field.
func (o *EsmeAccount) SetInterfaceVersion(v int) {
	o.InterfaceVersion = &v
}

// GetBindType returns the BindType field value if set, zero value otherwise.
func (o *EsmeAccount) GetBindType() string {
	if o == nil || o.BindType == nil {
		var ret string
		return ret
	}
	return *o.BindType
}

// GetBindTypeOk returns a tuple with the BindType field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetBindTypeOk() (*string, bool) {
	if o == nil || o.BindType == nil {
		return nil, false
	}
	return o.BindType, true
}

// HasBindType returns a boolean if a field has been set.
func (o *EsmeAccount) HasBindType() bool {
	if o != nil && o.BindType != nil {
		return true
	}

	return false
}

// SetBindType gets a reference to the given string and assigns it to the BindType field.
func (o *EsmeAccount) SetBindType(v string) {
	o.BindType = &v
}

// GetAddressRange returns the AddressRange field value if set, zero value otherwise.
func (o *EsmeAccount) GetAddressRange() string {
	if o == nil || o.AddressRange == nil {
		var ret string
		return ret
	}
	return *o.AddressRange
}

// GetAddressRangeOk returns a tuple with the AddressRange field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetAddressRangeOk() (*string, bool) {
	if o == nil || o.AddressRange == nil {
		return nil, false
	}
	return o.AddressRange, true
}

// HasAddressRange returns a boolean if a field has been set.
func (o *EsmeAccount) HasAddressRange() bool {
	if o != nil && o.AddressRange != nil {
		return true
	}

	return false
}

// SetAddressRange gets a reference to the given string and assigns it to the AddressRange field.
func (o *EsmeAccount) SetAddressRange(v string) {
	o.AddressRange = &v
}

// GetAddressNPI returns the AddressNPI field value if set, zero value otherwise.
func (o *EsmeAccount) GetAddressNPI() int {
	if o == nil || o.AddressNPI == nil {
		var ret int
		return ret
	}
	return *o.AddressNPI
}

// GetAddressNPIOk returns a tuple with the AddressNPI field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetAddressNPIOk() (*int, bool) {
	if o == nil || o.AddressNPI == nil {
		return nil, false
	}
	return o.AddressNPI, true
}

// HasAddressNPI returns a boolean if a field has been set.
func (o *EsmeAccount) HasAddressNPI() bool {
	if o != nil && o.AddressNPI != nil {
		return true
	}

	return false
}

// SetAddressNPI gets a reference to the given int and assigns it to the AddressNPI field.
func (o *EsmeAccount) SetAddressNPI(v int) {
	o.AddressNPI = &v
}

// GetAddressTON returns the AddressTON field value if set, zero value otherwise.
func (o *EsmeAccount) GetAddressTON() int {
	if o == nil || o.AddressTON == nil {
		var ret int
		return ret
	}
	return *o.AddressTON
}

// GetAddressTONOk returns a tuple with the AddressTON field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetAddressTONOk() (*int, bool) {
	if o == nil || o.AddressTON == nil {
		return nil, false
	}
	return o.AddressTON, true
}

// HasAddressTON returns a boolean if a field has been set.
func (o *EsmeAccount) HasAddressTON() bool {
	if o != nil && o.AddressTON != nil {
		return true
	}

	return false
}

// SetAddressTON gets a reference to the given int and assigns it to the AddressTON field.
func (o *EsmeAccount) SetAddressTON(v int) {
	o.AddressTON = &v
}

// GetConnectionTimeout returns the ConnectionTimeout field value if set, zero value otherwise.
func (o *EsmeAccount) GetConnectionTimeout() int {
	if o == nil || o.ConnectionTimeout == nil {
		var ret int
		return ret
	}
	return *o.ConnectionTimeout
}

// GetConnectionTimeoutOk returns a tuple with the ConnectionTimeout field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetConnectionTimeoutOk() (*int, bool) {
	if o == nil || o.ConnectionTimeout == nil {
		return nil, false
	}
	return o.ConnectionTimeout, true
}

// HasConnectionTimeout returns a boolean if a field has been set.
func (o *EsmeAccount) HasConnectionTimeout() bool {
	if o != nil && o.ConnectionTimeout != nil {
		return true
	}

	return false
}

// SetConnectionTimeout gets a reference to the given int and assigns it to the ConnectionTimeout field.
func (o *EsmeAccount) SetConnectionTimeout(v int) {
	o.ConnectionTimeout = &v
}

// GetAcceptRatio returns the AcceptRatio field value if set, zero value otherwise.
func (o *EsmeAccount) GetAcceptRatio() []ErrorRate {
	if o == nil || o.AcceptRatio == nil {
		var ret []ErrorRate
		return ret
	}
	return *o.AcceptRatio
}

// GetAcceptRatioOk returns a tuple with the AcceptRatio field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetAcceptRatioOk() (*[]ErrorRate, bool) {
	if o == nil || o.AcceptRatio == nil {
		return nil, false
	}
	return o.AcceptRatio, true
}

// HasAcceptRatio returns a boolean if a field has been set.
func (o *EsmeAccount) HasAcceptRatio() bool {
	if o != nil && o.AcceptRatio != nil {
		return true
	}

	return false
}

// SetAcceptRatio gets a reference to the given []ErrorRate and assigns it to the AcceptRatio field.
func (o *EsmeAccount) SetAcceptRatio(v []ErrorRate) {
	o.AcceptRatio = &v
}

// GetAckRatio returns the AckRatio field value if set, zero value otherwise.
func (o *EsmeAccount) GetAckRatio() []ErrorRate {
	if o == nil || o.AckRatio == nil {
		var ret []ErrorRate
		return ret
	}
	return *o.AckRatio
}

// GetAckRatioOk returns a tuple with the AckRatio field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetAckRatioOk() (*[]ErrorRate, bool) {
	if o == nil || o.AckRatio == nil {
		return nil, false
	}
	return o.AckRatio, true
}

// HasAckRatio returns a boolean if a field has been set.
func (o *EsmeAccount) HasAckRatio() bool {
	if o != nil && o.AckRatio != nil {
		return true
	}

	return false
}

// SetAckRatio gets a reference to the given []ErrorRate and assigns it to the AckRatio field.
func (o *EsmeAccount) SetAckRatio(v []ErrorRate) {
	o.AckRatio = &v
}

// GetEnquireLinkInterval returns the EnquireLinkInterval field value if set, zero value otherwise.
func (o *EsmeAccount) GetEnquireLinkInterval() int {
	if o == nil || o.EnquireLinkInterval == nil {
		var ret int
		return ret
	}
	return *o.EnquireLinkInterval
}

// GetEnquireLinkIntervalOk returns a tuple with the EnquireLinkInterval field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetEnquireLinkIntervalOk() (*int, bool) {
	if o == nil || o.EnquireLinkInterval == nil {
		return nil, false
	}
	return o.EnquireLinkInterval, true
}

// HasEnquireLinkInterval returns a boolean if a field has been set.
func (o *EsmeAccount) HasEnquireLinkInterval() bool {
	if o != nil && o.EnquireLinkInterval != nil {
		return true
	}

	return false
}

// SetEnquireLinkInterval gets a reference to the given int and assigns it to the EnquireLinkInterval field.
func (o *EsmeAccount) SetEnquireLinkInterval(v int) {
	o.EnquireLinkInterval = &v
}

// GetIsEnable returns the IsEnable field value if set, zero value otherwise.
func (o *EsmeAccount) GetIsEnable() bool {
	if o == nil || o.IsEnable == nil {
		var ret bool
		return ret
	}
	return *o.IsEnable
}

// GetIsEnableOk returns a tuple with the IsEnable field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetIsEnableOk() (*bool, bool) {
	if o == nil || o.IsEnable == nil {
		return nil, false
	}
	return o.IsEnable, true
}

// HasIsEnable returns a boolean if a field has been set.
func (o *EsmeAccount) HasIsEnable() bool {
	if o != nil && o.IsEnable != nil {
		return true
	}

	return false
}

// SetIsEnable gets a reference to the given bool and assigns it to the IsEnable field.
func (o *EsmeAccount) SetIsEnable(v bool) {
	o.IsEnable = &v
}

// GetIsPersist returns the IsPersist field value if set, zero value otherwise.
func (o *EsmeAccount) GetIsPersist() bool {
	if o == nil || o.IsPersist == nil {
		var ret bool
		return ret
	}
	return *o.IsPersist
}

// GetIsPersistOk returns a tuple with the IsPersist field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetIsPersistOk() (*bool, bool) {
	if o == nil || o.IsPersist == nil {
		return nil, false
	}
	return o.IsPersist, true
}

// HasIsPersist returns a boolean if a field has been set.
func (o *EsmeAccount) HasIsPersist() bool {
	if o != nil && o.IsPersist != nil {
		return true
	}

	return false
}

// SetIsPersist gets a reference to the given bool and assigns it to the IsPersist field.
func (o *EsmeAccount) SetIsPersist(v bool) {
	o.IsPersist = &v
}

// GetMtThroughtput returns the MtThroughtput field value if set, zero value otherwise.
func (o *EsmeAccount) GetMtThroughtput() int {
	if o == nil || o.MtThroughtput == nil {
		var ret int
		return ret
	}
	return *o.MtThroughtput
}

// GetMtThroughtputOk returns a tuple with the MtThroughtput field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetMtThroughtputOk() (*int, bool) {
	if o == nil || o.MtThroughtput == nil {
		return nil, false
	}
	return o.MtThroughtput, true
}

// HasMtThroughtput returns a boolean if a field has been set.
func (o *EsmeAccount) HasMtThroughtput() bool {
	if o != nil && o.MtThroughtput != nil {
		return true
	}

	return false
}

// SetMtThroughtput gets a reference to the given int and assigns it to the MtThroughtput field.
func (o *EsmeAccount) SetMtThroughtput(v int) {
	o.MtThroughtput = &v
}

// GetNumBinds returns the NumBinds field value if set, zero value otherwise.
func (o *EsmeAccount) GetNumBinds() int {
	if o == nil || o.NumBinds == nil {
		var ret int
		return ret
	}
	return *o.NumBinds
}

// GetNumBindsOk returns a tuple with the NumBinds field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetNumBindsOk() (*int, bool) {
	if o == nil || o.NumBinds == nil {
		return nil, false
	}
	return o.NumBinds, true
}

// HasNumBinds returns a boolean if a field has been set.
func (o *EsmeAccount) HasNumBinds() bool {
	if o != nil && o.NumBinds != nil {
		return true
	}

	return false
}

// SetNumBinds gets a reference to the given int and assigns it to the NumBinds field.
func (o *EsmeAccount) SetNumBinds(v int) {
	o.NumBinds = &v
}

// GetReconnectDelay returns the ReconnectDelay field value if set, zero value otherwise.
func (o *EsmeAccount) GetReconnectDelay() int {
	if o == nil || o.ReconnectDelay == nil {
		var ret int
		return ret
	}
	return *o.ReconnectDelay
}

// GetReconnectDelayOk returns a tuple with the ReconnectDelay field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetReconnectDelayOk() (*int, bool) {
	if o == nil || o.ReconnectDelay == nil {
		return nil, false
	}
	return o.ReconnectDelay, true
}

// HasReconnectDelay returns a boolean if a field has been set.
func (o *EsmeAccount) HasReconnectDelay() bool {
	if o != nil && o.ReconnectDelay != nil {
		return true
	}

	return false
}

// SetReconnectDelay gets a reference to the given int and assigns it to the ReconnectDelay field.
func (o *EsmeAccount) SetReconnectDelay(v int) {
	o.ReconnectDelay = &v
}

// GetWindowSize returns the WindowSize field value if set, zero value otherwise.
func (o *EsmeAccount) GetWindowSize() int {
	if o == nil || o.WindowSize == nil {
		var ret int
		return ret
	}
	return *o.WindowSize
}

// GetWindowSizeOk returns a tuple with the WindowSize field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeAccount) GetWindowSizeOk() (*int, bool) {
	if o == nil || o.WindowSize == nil {
		return nil, false
	}
	return o.WindowSize, true
}

// HasWindowSize returns a boolean if a field has been set.
func (o *EsmeAccount) HasWindowSize() bool {
	if o != nil && o.WindowSize != nil {
		return true
	}

	return false
}

// SetWindowSize gets a reference to the given int and assigns it to the WindowSize field.
func (o *EsmeAccount) SetWindowSize(v int) {
	o.WindowSize = &v
}

func (o EsmeAccount) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if o.Id != nil {
		toSerialize["id"] = o.Id
	}
	if true {
		toSerialize["name"] = o.Name
	}
	if o.Description != nil {
		toSerialize["description"] = o.Description
	}
	if o.Host != nil {
		toSerialize["host"] = o.Host
	}
	if o.Port != nil {
		toSerialize["port"] = o.Port
	}
	if o.SystemID != nil {
		toSerialize["systemID"] = o.SystemID
	}
	if o.Password != nil {
		toSerialize["password"] = o.Password
	}
	if o.SystemType != nil {
		toSerialize["systemType"] = o.SystemType
	}
	if o.InterfaceVersion != nil {
		toSerialize["interfaceVersion"] = o.InterfaceVersion
	}
	if o.BindType != nil {
		toSerialize["bindType"] = o.BindType
	}
	if o.AddressRange != nil {
		toSerialize["addressRange"] = o.AddressRange
	}
	if o.AddressNPI != nil {
		toSerialize["addressNPI"] = o.AddressNPI
	}
	if o.AddressTON != nil {
		toSerialize["addressTON"] = o.AddressTON
	}
	if o.ConnectionTimeout != nil {
		toSerialize["connectionTimeout"] = o.ConnectionTimeout
	}
	if o.AcceptRatio != nil {
		toSerialize["acceptRatio"] = o.AcceptRatio
	}
	if o.AckRatio != nil {
		toSerialize["ackRatio"] = o.AckRatio
	}
	if o.EnquireLinkInterval != nil {
		toSerialize["enquireLinkInterval"] = o.EnquireLinkInterval
	}
	if o.IsEnable != nil {
		toSerialize["isEnable"] = o.IsEnable
	}
	if o.IsPersist != nil {
		toSerialize["isPersist"] = o.IsPersist
	}
	if o.MtThroughtput != nil {
		toSerialize["mtThroughtput"] = o.MtThroughtput
	}
	if o.NumBinds != nil {
		toSerialize["numBinds"] = o.NumBinds
	}
	if o.ReconnectDelay != nil {
		toSerialize["reconnectDelay"] = o.ReconnectDelay
	}
	if o.WindowSize != nil {
		toSerialize["windowSize"] = o.WindowSize
	}
	return json.Marshal(toSerialize)
}

type NullableEsmeAccount struct {
	value *EsmeAccount
	isSet bool
}

func (v NullableEsmeAccount) Get() *EsmeAccount {
	return v.value
}

func (v *NullableEsmeAccount) Set(val *EsmeAccount) {
	v.value = val
	v.isSet = true
}

func (v NullableEsmeAccount) IsSet() bool {
	return v.isSet
}

func (v *NullableEsmeAccount) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableEsmeAccount(val *EsmeAccount) *NullableEsmeAccount {
	return &NullableEsmeAccount{value: val, isSet: true}
}

func (v NullableEsmeAccount) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableEsmeAccount) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


