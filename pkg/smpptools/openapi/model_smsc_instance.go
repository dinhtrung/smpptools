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

// SmscInstance SMSC hold information for SMPP instances that serve traffic from ESME
type SmscInstance struct {
	Id *string `json:"id,omitempty"`
	// name of this SMSC Instance
	Name string `json:"name"`
	// short description text
	Description *string `json:"description,omitempty"`
	// TCP Port to listen to
	Port *int32 `json:"port,omitempty"`
	// Connection timeout in milliseconds
	ConnectionTimeout *int32 `json:"connectionTimeout,omitempty"`
	// true if this SMSC should be start automatically on start up
	IsPersist *bool `json:"isPersist,omitempty"`
	// true to bypass checking on SMSC account. Accept ratio and Delivery Error ratio will use system default
	AllowAnonymous *bool `json:"allowAnonymous,omitempty"`
	// Number of packets send out per one go
	WindowSize *int32 `json:"windowSize,omitempty"`
}

// NewSmscInstance instantiates a new SmscInstance object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSmscInstance(name string) *SmscInstance {
	this := SmscInstance{}
	this.Name = name
	var allowAnonymous bool = false
	this.AllowAnonymous = &allowAnonymous
	return &this
}

// NewSmscInstanceWithDefaults instantiates a new SmscInstance object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSmscInstanceWithDefaults() *SmscInstance {
	this := SmscInstance{}
	var allowAnonymous bool = false
	this.AllowAnonymous = &allowAnonymous
	return &this
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *SmscInstance) GetId() string {
	if o == nil || o.Id == nil {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetIdOk() (*string, bool) {
	if o == nil || o.Id == nil {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *SmscInstance) HasId() bool {
	if o != nil && o.Id != nil {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *SmscInstance) SetId(v string) {
	o.Id = &v
}

// GetName returns the Name field value
func (o *SmscInstance) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetNameOk() (*string, bool) {
	if o == nil  {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *SmscInstance) SetName(v string) {
	o.Name = v
}

// GetDescription returns the Description field value if set, zero value otherwise.
func (o *SmscInstance) GetDescription() string {
	if o == nil || o.Description == nil {
		var ret string
		return ret
	}
	return *o.Description
}

// GetDescriptionOk returns a tuple with the Description field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetDescriptionOk() (*string, bool) {
	if o == nil || o.Description == nil {
		return nil, false
	}
	return o.Description, true
}

// HasDescription returns a boolean if a field has been set.
func (o *SmscInstance) HasDescription() bool {
	if o != nil && o.Description != nil {
		return true
	}

	return false
}

// SetDescription gets a reference to the given string and assigns it to the Description field.
func (o *SmscInstance) SetDescription(v string) {
	o.Description = &v
}

// GetPort returns the Port field value if set, zero value otherwise.
func (o *SmscInstance) GetPort() int32 {
	if o == nil || o.Port == nil {
		var ret int32
		return ret
	}
	return *o.Port
}

// GetPortOk returns a tuple with the Port field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetPortOk() (*int32, bool) {
	if o == nil || o.Port == nil {
		return nil, false
	}
	return o.Port, true
}

// HasPort returns a boolean if a field has been set.
func (o *SmscInstance) HasPort() bool {
	if o != nil && o.Port != nil {
		return true
	}

	return false
}

// SetPort gets a reference to the given int32 and assigns it to the Port field.
func (o *SmscInstance) SetPort(v int32) {
	o.Port = &v
}

// GetConnectionTimeout returns the ConnectionTimeout field value if set, zero value otherwise.
func (o *SmscInstance) GetConnectionTimeout() int32 {
	if o == nil || o.ConnectionTimeout == nil {
		var ret int32
		return ret
	}
	return *o.ConnectionTimeout
}

// GetConnectionTimeoutOk returns a tuple with the ConnectionTimeout field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetConnectionTimeoutOk() (*int32, bool) {
	if o == nil || o.ConnectionTimeout == nil {
		return nil, false
	}
	return o.ConnectionTimeout, true
}

// HasConnectionTimeout returns a boolean if a field has been set.
func (o *SmscInstance) HasConnectionTimeout() bool {
	if o != nil && o.ConnectionTimeout != nil {
		return true
	}

	return false
}

// SetConnectionTimeout gets a reference to the given int32 and assigns it to the ConnectionTimeout field.
func (o *SmscInstance) SetConnectionTimeout(v int32) {
	o.ConnectionTimeout = &v
}

// GetIsPersist returns the IsPersist field value if set, zero value otherwise.
func (o *SmscInstance) GetIsPersist() bool {
	if o == nil || o.IsPersist == nil {
		var ret bool
		return ret
	}
	return *o.IsPersist
}

// GetIsPersistOk returns a tuple with the IsPersist field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetIsPersistOk() (*bool, bool) {
	if o == nil || o.IsPersist == nil {
		return nil, false
	}
	return o.IsPersist, true
}

// HasIsPersist returns a boolean if a field has been set.
func (o *SmscInstance) HasIsPersist() bool {
	if o != nil && o.IsPersist != nil {
		return true
	}

	return false
}

// SetIsPersist gets a reference to the given bool and assigns it to the IsPersist field.
func (o *SmscInstance) SetIsPersist(v bool) {
	o.IsPersist = &v
}

// GetAllowAnonymous returns the AllowAnonymous field value if set, zero value otherwise.
func (o *SmscInstance) GetAllowAnonymous() bool {
	if o == nil || o.AllowAnonymous == nil {
		var ret bool
		return ret
	}
	return *o.AllowAnonymous
}

// GetAllowAnonymousOk returns a tuple with the AllowAnonymous field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetAllowAnonymousOk() (*bool, bool) {
	if o == nil || o.AllowAnonymous == nil {
		return nil, false
	}
	return o.AllowAnonymous, true
}

// HasAllowAnonymous returns a boolean if a field has been set.
func (o *SmscInstance) HasAllowAnonymous() bool {
	if o != nil && o.AllowAnonymous != nil {
		return true
	}

	return false
}

// SetAllowAnonymous gets a reference to the given bool and assigns it to the AllowAnonymous field.
func (o *SmscInstance) SetAllowAnonymous(v bool) {
	o.AllowAnonymous = &v
}

// GetWindowSize returns the WindowSize field value if set, zero value otherwise.
func (o *SmscInstance) GetWindowSize() int32 {
	if o == nil || o.WindowSize == nil {
		var ret int32
		return ret
	}
	return *o.WindowSize
}

// GetWindowSizeOk returns a tuple with the WindowSize field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *SmscInstance) GetWindowSizeOk() (*int32, bool) {
	if o == nil || o.WindowSize == nil {
		return nil, false
	}
	return o.WindowSize, true
}

// HasWindowSize returns a boolean if a field has been set.
func (o *SmscInstance) HasWindowSize() bool {
	if o != nil && o.WindowSize != nil {
		return true
	}

	return false
}

// SetWindowSize gets a reference to the given int32 and assigns it to the WindowSize field.
func (o *SmscInstance) SetWindowSize(v int32) {
	o.WindowSize = &v
}

func (o SmscInstance) MarshalJSON() ([]byte, error) {
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
	if o.Port != nil {
		toSerialize["port"] = o.Port
	}
	if o.ConnectionTimeout != nil {
		toSerialize["connectionTimeout"] = o.ConnectionTimeout
	}
	if o.IsPersist != nil {
		toSerialize["isPersist"] = o.IsPersist
	}
	if o.AllowAnonymous != nil {
		toSerialize["allowAnonymous"] = o.AllowAnonymous
	}
	if o.WindowSize != nil {
		toSerialize["windowSize"] = o.WindowSize
	}
	return json.Marshal(toSerialize)
}

type NullableSmscInstance struct {
	value *SmscInstance
	isSet bool
}

func (v NullableSmscInstance) Get() *SmscInstance {
	return v.value
}

func (v *NullableSmscInstance) Set(val *SmscInstance) {
	v.value = val
	v.isSet = true
}

func (v NullableSmscInstance) IsSet() bool {
	return v.isSet
}

func (v *NullableSmscInstance) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSmscInstance(val *SmscInstance) *NullableSmscInstance {
	return &NullableSmscInstance{value: val, isSet: true}
}

func (v NullableSmscInstance) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSmscInstance) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


