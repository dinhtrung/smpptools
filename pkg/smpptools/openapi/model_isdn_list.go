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

// IsdnList struct for IsdnList
type IsdnList struct {
	// Uploaded files or CSV
	Content *string `json:"content,omitempty"`
	// short description text
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	// name of this ISDN list
	Name string `json:"name"`
}

// NewIsdnList instantiates a new IsdnList object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewIsdnList(name string) *IsdnList {
	this := IsdnList{}
	this.Name = name
	return &this
}

// NewIsdnListWithDefaults instantiates a new IsdnList object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewIsdnListWithDefaults() *IsdnList {
	this := IsdnList{}
	return &this
}

// GetContent returns the Content field value if set, zero value otherwise.
func (o *IsdnList) GetContent() string {
	if o == nil || o.Content == nil {
		var ret string
		return ret
	}
	return *o.Content
}

// GetContentOk returns a tuple with the Content field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IsdnList) GetContentOk() (*string, bool) {
	if o == nil || o.Content == nil {
		return nil, false
	}
	return o.Content, true
}

// HasContent returns a boolean if a field has been set.
func (o *IsdnList) HasContent() bool {
	if o != nil && o.Content != nil {
		return true
	}

	return false
}

// SetContent gets a reference to the given string and assigns it to the Content field.
func (o *IsdnList) SetContent(v string) {
	o.Content = &v
}

// GetDescription returns the Description field value if set, zero value otherwise.
func (o *IsdnList) GetDescription() string {
	if o == nil || o.Description == nil {
		var ret string
		return ret
	}
	return *o.Description
}

// GetDescriptionOk returns a tuple with the Description field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IsdnList) GetDescriptionOk() (*string, bool) {
	if o == nil || o.Description == nil {
		return nil, false
	}
	return o.Description, true
}

// HasDescription returns a boolean if a field has been set.
func (o *IsdnList) HasDescription() bool {
	if o != nil && o.Description != nil {
		return true
	}

	return false
}

// SetDescription gets a reference to the given string and assigns it to the Description field.
func (o *IsdnList) SetDescription(v string) {
	o.Description = &v
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *IsdnList) GetId() string {
	if o == nil || o.Id == nil {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IsdnList) GetIdOk() (*string, bool) {
	if o == nil || o.Id == nil {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *IsdnList) HasId() bool {
	if o != nil && o.Id != nil {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *IsdnList) SetId(v string) {
	o.Id = &v
}

// GetName returns the Name field value
func (o *IsdnList) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *IsdnList) GetNameOk() (*string, bool) {
	if o == nil  {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *IsdnList) SetName(v string) {
	o.Name = v
}

func (o IsdnList) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if o.Content != nil {
		toSerialize["content"] = o.Content
	}
	if o.Description != nil {
		toSerialize["description"] = o.Description
	}
	if o.Id != nil {
		toSerialize["id"] = o.Id
	}
	if true {
		toSerialize["name"] = o.Name
	}
	return json.Marshal(toSerialize)
}

type NullableIsdnList struct {
	value *IsdnList
	isSet bool
}

func (v NullableIsdnList) Get() *IsdnList {
	return v.value
}

func (v *NullableIsdnList) Set(val *IsdnList) {
	v.value = val
	v.isSet = true
}

func (v NullableIsdnList) IsSet() bool {
	return v.isSet
}

func (v *NullableIsdnList) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableIsdnList(val *IsdnList) *NullableIsdnList {
	return &NullableIsdnList{value: val, isSet: true}
}

func (v NullableIsdnList) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableIsdnList) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


