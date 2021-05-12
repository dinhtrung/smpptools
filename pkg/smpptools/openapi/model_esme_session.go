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
	"time"
)

// EsmeSession struct for EsmeSession
type EsmeSession struct {
	// unique session ID
	Id string `json:"id"`
	// local TCP address
	LocalAddr *string `json:"localAddr,omitempty"`
	// the local time this session is created
	CreatedAt *time.Time `json:"createdAt,omitempty"`
	Account *EsmeAccount `json:"account,omitempty"`
}

// NewEsmeSession instantiates a new EsmeSession object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewEsmeSession(id string) *EsmeSession {
	this := EsmeSession{}
	this.Id = id
	return &this
}

// NewEsmeSessionWithDefaults instantiates a new EsmeSession object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewEsmeSessionWithDefaults() *EsmeSession {
	this := EsmeSession{}
	return &this
}

// GetId returns the Id field value
func (o *EsmeSession) GetId() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Id
}

// GetIdOk returns a tuple with the Id field value
// and a boolean to check if the value has been set.
func (o *EsmeSession) GetIdOk() (*string, bool) {
	if o == nil  {
		return nil, false
	}
	return &o.Id, true
}

// SetId sets field value
func (o *EsmeSession) SetId(v string) {
	o.Id = v
}

// GetLocalAddr returns the LocalAddr field value if set, zero value otherwise.
func (o *EsmeSession) GetLocalAddr() string {
	if o == nil || o.LocalAddr == nil {
		var ret string
		return ret
	}
	return *o.LocalAddr
}

// GetLocalAddrOk returns a tuple with the LocalAddr field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeSession) GetLocalAddrOk() (*string, bool) {
	if o == nil || o.LocalAddr == nil {
		return nil, false
	}
	return o.LocalAddr, true
}

// HasLocalAddr returns a boolean if a field has been set.
func (o *EsmeSession) HasLocalAddr() bool {
	if o != nil && o.LocalAddr != nil {
		return true
	}

	return false
}

// SetLocalAddr gets a reference to the given string and assigns it to the LocalAddr field.
func (o *EsmeSession) SetLocalAddr(v string) {
	o.LocalAddr = &v
}

// GetCreatedAt returns the CreatedAt field value if set, zero value otherwise.
func (o *EsmeSession) GetCreatedAt() time.Time {
	if o == nil || o.CreatedAt == nil {
		var ret time.Time
		return ret
	}
	return *o.CreatedAt
}

// GetCreatedAtOk returns a tuple with the CreatedAt field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeSession) GetCreatedAtOk() (*time.Time, bool) {
	if o == nil || o.CreatedAt == nil {
		return nil, false
	}
	return o.CreatedAt, true
}

// HasCreatedAt returns a boolean if a field has been set.
func (o *EsmeSession) HasCreatedAt() bool {
	if o != nil && o.CreatedAt != nil {
		return true
	}

	return false
}

// SetCreatedAt gets a reference to the given time.Time and assigns it to the CreatedAt field.
func (o *EsmeSession) SetCreatedAt(v time.Time) {
	o.CreatedAt = &v
}

// GetAccount returns the Account field value if set, zero value otherwise.
func (o *EsmeSession) GetAccount() EsmeAccount {
	if o == nil || o.Account == nil {
		var ret EsmeAccount
		return ret
	}
	return *o.Account
}

// GetAccountOk returns a tuple with the Account field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *EsmeSession) GetAccountOk() (*EsmeAccount, bool) {
	if o == nil || o.Account == nil {
		return nil, false
	}
	return o.Account, true
}

// HasAccount returns a boolean if a field has been set.
func (o *EsmeSession) HasAccount() bool {
	if o != nil && o.Account != nil {
		return true
	}

	return false
}

// SetAccount gets a reference to the given EsmeAccount and assigns it to the Account field.
func (o *EsmeSession) SetAccount(v EsmeAccount) {
	o.Account = &v
}

func (o EsmeSession) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if true {
		toSerialize["id"] = o.Id
	}
	if o.LocalAddr != nil {
		toSerialize["localAddr"] = o.LocalAddr
	}
	if o.CreatedAt != nil {
		toSerialize["createdAt"] = o.CreatedAt
	}
	if o.Account != nil {
		toSerialize["account"] = o.Account
	}
	return json.Marshal(toSerialize)
}

type NullableEsmeSession struct {
	value *EsmeSession
	isSet bool
}

func (v NullableEsmeSession) Get() *EsmeSession {
	return v.value
}

func (v *NullableEsmeSession) Set(val *EsmeSession) {
	v.value = val
	v.isSet = true
}

func (v NullableEsmeSession) IsSet() bool {
	return v.isSet
}

func (v *NullableEsmeSession) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableEsmeSession(val *EsmeSession) *NullableEsmeSession {
	return &NullableEsmeSession{value: val, isSet: true}
}

func (v NullableEsmeSession) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableEsmeSession) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


