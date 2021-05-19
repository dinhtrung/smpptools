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

// StressTestSettings Configuration for Stress Testing Process
type StressTestSettings struct {
	SmsPattern *BaseSm `json:"smsPattern,omitempty"`
	SmsData *IsdnList `json:"smsData,omitempty"`
	// maximum throughput try to reach
	Throughput *float32 `json:"throughput,omitempty"`
	// max number of PDU send out
	MaxPDU *float32 `json:"maxPDU,omitempty"`
}

// NewStressTestSettings instantiates a new StressTestSettings object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewStressTestSettings() *StressTestSettings {
	this := StressTestSettings{}
	return &this
}

// NewStressTestSettingsWithDefaults instantiates a new StressTestSettings object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewStressTestSettingsWithDefaults() *StressTestSettings {
	this := StressTestSettings{}
	return &this
}

// GetSmsPattern returns the SmsPattern field value if set, zero value otherwise.
func (o *StressTestSettings) GetSmsPattern() BaseSm {
	if o == nil || o.SmsPattern == nil {
		var ret BaseSm
		return ret
	}
	return *o.SmsPattern
}

// GetSmsPatternOk returns a tuple with the SmsPattern field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *StressTestSettings) GetSmsPatternOk() (*BaseSm, bool) {
	if o == nil || o.SmsPattern == nil {
		return nil, false
	}
	return o.SmsPattern, true
}

// HasSmsPattern returns a boolean if a field has been set.
func (o *StressTestSettings) HasSmsPattern() bool {
	if o != nil && o.SmsPattern != nil {
		return true
	}

	return false
}

// SetSmsPattern gets a reference to the given BaseSm and assigns it to the SmsPattern field.
func (o *StressTestSettings) SetSmsPattern(v BaseSm) {
	o.SmsPattern = &v
}

// GetSmsData returns the SmsData field value if set, zero value otherwise.
func (o *StressTestSettings) GetSmsData() IsdnList {
	if o == nil || o.SmsData == nil {
		var ret IsdnList
		return ret
	}
	return *o.SmsData
}

// GetSmsDataOk returns a tuple with the SmsData field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *StressTestSettings) GetSmsDataOk() (*IsdnList, bool) {
	if o == nil || o.SmsData == nil {
		return nil, false
	}
	return o.SmsData, true
}

// HasSmsData returns a boolean if a field has been set.
func (o *StressTestSettings) HasSmsData() bool {
	if o != nil && o.SmsData != nil {
		return true
	}

	return false
}

// SetSmsData gets a reference to the given IsdnList and assigns it to the SmsData field.
func (o *StressTestSettings) SetSmsData(v IsdnList) {
	o.SmsData = &v
}

// GetThroughput returns the Throughput field value if set, zero value otherwise.
func (o *StressTestSettings) GetThroughput() float32 {
	if o == nil || o.Throughput == nil {
		var ret float32
		return ret
	}
	return *o.Throughput
}

// GetThroughputOk returns a tuple with the Throughput field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *StressTestSettings) GetThroughputOk() (*float32, bool) {
	if o == nil || o.Throughput == nil {
		return nil, false
	}
	return o.Throughput, true
}

// HasThroughput returns a boolean if a field has been set.
func (o *StressTestSettings) HasThroughput() bool {
	if o != nil && o.Throughput != nil {
		return true
	}

	return false
}

// SetThroughput gets a reference to the given float32 and assigns it to the Throughput field.
func (o *StressTestSettings) SetThroughput(v float32) {
	o.Throughput = &v
}

// GetMaxPDU returns the MaxPDU field value if set, zero value otherwise.
func (o *StressTestSettings) GetMaxPDU() float32 {
	if o == nil || o.MaxPDU == nil {
		var ret float32
		return ret
	}
	return *o.MaxPDU
}

// GetMaxPDUOk returns a tuple with the MaxPDU field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *StressTestSettings) GetMaxPDUOk() (*float32, bool) {
	if o == nil || o.MaxPDU == nil {
		return nil, false
	}
	return o.MaxPDU, true
}

// HasMaxPDU returns a boolean if a field has been set.
func (o *StressTestSettings) HasMaxPDU() bool {
	if o != nil && o.MaxPDU != nil {
		return true
	}

	return false
}

// SetMaxPDU gets a reference to the given float32 and assigns it to the MaxPDU field.
func (o *StressTestSettings) SetMaxPDU(v float32) {
	o.MaxPDU = &v
}

func (o StressTestSettings) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if o.SmsPattern != nil {
		toSerialize["smsPattern"] = o.SmsPattern
	}
	if o.SmsData != nil {
		toSerialize["smsData"] = o.SmsData
	}
	if o.Throughput != nil {
		toSerialize["throughput"] = o.Throughput
	}
	if o.MaxPDU != nil {
		toSerialize["maxPDU"] = o.MaxPDU
	}
	return json.Marshal(toSerialize)
}

type NullableStressTestSettings struct {
	value *StressTestSettings
	isSet bool
}

func (v NullableStressTestSettings) Get() *StressTestSettings {
	return v.value
}

func (v *NullableStressTestSettings) Set(val *StressTestSettings) {
	v.value = val
	v.isSet = true
}

func (v NullableStressTestSettings) IsSet() bool {
	return v.isSet
}

func (v *NullableStressTestSettings) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableStressTestSettings(val *StressTestSettings) *NullableStressTestSettings {
	return &NullableStressTestSettings{value: val, isSet: true}
}

func (v NullableStressTestSettings) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableStressTestSettings) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


