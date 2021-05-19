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

// BaseSm BaseSM is used to deser DeliverSM, SubmitSM, DataSM PDU
type BaseSm struct {
	// a short name for this SMPP parameter set
	Name *string `json:"name,omitempty"`
	// a short description
	Description *string `json:"description,omitempty"`
	// Data Coding for SMS
	DataCoding *int32 `json:"dataCoding,omitempty"`
	// Default Message ID
	DefaultMessageID *int32 `json:"defaultMessageID,omitempty"`
	// destination address
	DestinationAddr *string `json:"destinationAddr,omitempty"`
	// destination address Number plan indication
	DestinationNPI *int32 `json:"destinationNPI,omitempty"`
	// destination address Type of number
	DestinationTON *int32 `json:"destinationTON,omitempty"`
	// ESM Class
	EsmClass *int32 `json:"esmClass,omitempty"`
	Id *string `json:"id,omitempty"`
	// Priority Flag
	PriorityFlag *int32 `json:"priorityFlag,omitempty"`
	// Protocol ID
	ProtocolID *int32 `json:"protocolID,omitempty"`
	// Registered Delivery
	RegisteredDelivery *int32 `json:"registeredDelivery,omitempty"`
	// Replace if present flag
	ReplaceIfPresentFlag *int32 `json:"replaceIfPresentFlag,omitempty"`
	// Scheduled Delivery Time
	ScheduleDeliveryTime *string `json:"scheduleDeliveryTime,omitempty"`
	// SMPP Service Type
	ServiceType *string `json:"serviceType,omitempty"`
	// source address
	SourceAddr *string `json:"sourceAddr,omitempty"`
	// source address Number plan indication
	SourceNPI *int32 `json:"sourceNPI,omitempty"`
	// source address Type of number
	SourceTON *int32 `json:"sourceTON,omitempty"`
	// Validity Period
	ValidityPeriod *string `json:"validityPeriod,omitempty"`
	// Character set used for encoding and decoding between text and shortMessages
	Charset *string `json:"charset,omitempty"`
	// Message content in text
	Text *string `json:"text,omitempty"`
	// Array of short messages
	ShortMessages *[]ShortMessageHex `json:"shortMessages,omitempty"`
	// is this message using TLV for concatenate long SMS
	IsConcatTLV *bool `json:"isConcatTLV,omitempty"`
	// List of optional TLV
	TlvList *[]SmppTlv `json:"tlvList,omitempty"`
}

// NewBaseSm instantiates a new BaseSm object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewBaseSm() *BaseSm {
	this := BaseSm{}
	var isConcatTLV bool = false
	this.IsConcatTLV = &isConcatTLV
	return &this
}

// NewBaseSmWithDefaults instantiates a new BaseSm object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewBaseSmWithDefaults() *BaseSm {
	this := BaseSm{}
	var isConcatTLV bool = false
	this.IsConcatTLV = &isConcatTLV
	return &this
}

// GetName returns the Name field value if set, zero value otherwise.
func (o *BaseSm) GetName() string {
	if o == nil || o.Name == nil {
		var ret string
		return ret
	}
	return *o.Name
}

// GetNameOk returns a tuple with the Name field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetNameOk() (*string, bool) {
	if o == nil || o.Name == nil {
		return nil, false
	}
	return o.Name, true
}

// HasName returns a boolean if a field has been set.
func (o *BaseSm) HasName() bool {
	if o != nil && o.Name != nil {
		return true
	}

	return false
}

// SetName gets a reference to the given string and assigns it to the Name field.
func (o *BaseSm) SetName(v string) {
	o.Name = &v
}

// GetDescription returns the Description field value if set, zero value otherwise.
func (o *BaseSm) GetDescription() string {
	if o == nil || o.Description == nil {
		var ret string
		return ret
	}
	return *o.Description
}

// GetDescriptionOk returns a tuple with the Description field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDescriptionOk() (*string, bool) {
	if o == nil || o.Description == nil {
		return nil, false
	}
	return o.Description, true
}

// HasDescription returns a boolean if a field has been set.
func (o *BaseSm) HasDescription() bool {
	if o != nil && o.Description != nil {
		return true
	}

	return false
}

// SetDescription gets a reference to the given string and assigns it to the Description field.
func (o *BaseSm) SetDescription(v string) {
	o.Description = &v
}

// GetDataCoding returns the DataCoding field value if set, zero value otherwise.
func (o *BaseSm) GetDataCoding() int32 {
	if o == nil || o.DataCoding == nil {
		var ret int32
		return ret
	}
	return *o.DataCoding
}

// GetDataCodingOk returns a tuple with the DataCoding field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDataCodingOk() (*int32, bool) {
	if o == nil || o.DataCoding == nil {
		return nil, false
	}
	return o.DataCoding, true
}

// HasDataCoding returns a boolean if a field has been set.
func (o *BaseSm) HasDataCoding() bool {
	if o != nil && o.DataCoding != nil {
		return true
	}

	return false
}

// SetDataCoding gets a reference to the given int32 and assigns it to the DataCoding field.
func (o *BaseSm) SetDataCoding(v int32) {
	o.DataCoding = &v
}

// GetDefaultMessageID returns the DefaultMessageID field value if set, zero value otherwise.
func (o *BaseSm) GetDefaultMessageID() int32 {
	if o == nil || o.DefaultMessageID == nil {
		var ret int32
		return ret
	}
	return *o.DefaultMessageID
}

// GetDefaultMessageIDOk returns a tuple with the DefaultMessageID field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDefaultMessageIDOk() (*int32, bool) {
	if o == nil || o.DefaultMessageID == nil {
		return nil, false
	}
	return o.DefaultMessageID, true
}

// HasDefaultMessageID returns a boolean if a field has been set.
func (o *BaseSm) HasDefaultMessageID() bool {
	if o != nil && o.DefaultMessageID != nil {
		return true
	}

	return false
}

// SetDefaultMessageID gets a reference to the given int32 and assigns it to the DefaultMessageID field.
func (o *BaseSm) SetDefaultMessageID(v int32) {
	o.DefaultMessageID = &v
}

// GetDestinationAddr returns the DestinationAddr field value if set, zero value otherwise.
func (o *BaseSm) GetDestinationAddr() string {
	if o == nil || o.DestinationAddr == nil {
		var ret string
		return ret
	}
	return *o.DestinationAddr
}

// GetDestinationAddrOk returns a tuple with the DestinationAddr field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDestinationAddrOk() (*string, bool) {
	if o == nil || o.DestinationAddr == nil {
		return nil, false
	}
	return o.DestinationAddr, true
}

// HasDestinationAddr returns a boolean if a field has been set.
func (o *BaseSm) HasDestinationAddr() bool {
	if o != nil && o.DestinationAddr != nil {
		return true
	}

	return false
}

// SetDestinationAddr gets a reference to the given string and assigns it to the DestinationAddr field.
func (o *BaseSm) SetDestinationAddr(v string) {
	o.DestinationAddr = &v
}

// GetDestinationNPI returns the DestinationNPI field value if set, zero value otherwise.
func (o *BaseSm) GetDestinationNPI() int32 {
	if o == nil || o.DestinationNPI == nil {
		var ret int32
		return ret
	}
	return *o.DestinationNPI
}

// GetDestinationNPIOk returns a tuple with the DestinationNPI field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDestinationNPIOk() (*int32, bool) {
	if o == nil || o.DestinationNPI == nil {
		return nil, false
	}
	return o.DestinationNPI, true
}

// HasDestinationNPI returns a boolean if a field has been set.
func (o *BaseSm) HasDestinationNPI() bool {
	if o != nil && o.DestinationNPI != nil {
		return true
	}

	return false
}

// SetDestinationNPI gets a reference to the given int32 and assigns it to the DestinationNPI field.
func (o *BaseSm) SetDestinationNPI(v int32) {
	o.DestinationNPI = &v
}

// GetDestinationTON returns the DestinationTON field value if set, zero value otherwise.
func (o *BaseSm) GetDestinationTON() int32 {
	if o == nil || o.DestinationTON == nil {
		var ret int32
		return ret
	}
	return *o.DestinationTON
}

// GetDestinationTONOk returns a tuple with the DestinationTON field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetDestinationTONOk() (*int32, bool) {
	if o == nil || o.DestinationTON == nil {
		return nil, false
	}
	return o.DestinationTON, true
}

// HasDestinationTON returns a boolean if a field has been set.
func (o *BaseSm) HasDestinationTON() bool {
	if o != nil && o.DestinationTON != nil {
		return true
	}

	return false
}

// SetDestinationTON gets a reference to the given int32 and assigns it to the DestinationTON field.
func (o *BaseSm) SetDestinationTON(v int32) {
	o.DestinationTON = &v
}

// GetEsmClass returns the EsmClass field value if set, zero value otherwise.
func (o *BaseSm) GetEsmClass() int32 {
	if o == nil || o.EsmClass == nil {
		var ret int32
		return ret
	}
	return *o.EsmClass
}

// GetEsmClassOk returns a tuple with the EsmClass field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetEsmClassOk() (*int32, bool) {
	if o == nil || o.EsmClass == nil {
		return nil, false
	}
	return o.EsmClass, true
}

// HasEsmClass returns a boolean if a field has been set.
func (o *BaseSm) HasEsmClass() bool {
	if o != nil && o.EsmClass != nil {
		return true
	}

	return false
}

// SetEsmClass gets a reference to the given int32 and assigns it to the EsmClass field.
func (o *BaseSm) SetEsmClass(v int32) {
	o.EsmClass = &v
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *BaseSm) GetId() string {
	if o == nil || o.Id == nil {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetIdOk() (*string, bool) {
	if o == nil || o.Id == nil {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *BaseSm) HasId() bool {
	if o != nil && o.Id != nil {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *BaseSm) SetId(v string) {
	o.Id = &v
}

// GetPriorityFlag returns the PriorityFlag field value if set, zero value otherwise.
func (o *BaseSm) GetPriorityFlag() int32 {
	if o == nil || o.PriorityFlag == nil {
		var ret int32
		return ret
	}
	return *o.PriorityFlag
}

// GetPriorityFlagOk returns a tuple with the PriorityFlag field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetPriorityFlagOk() (*int32, bool) {
	if o == nil || o.PriorityFlag == nil {
		return nil, false
	}
	return o.PriorityFlag, true
}

// HasPriorityFlag returns a boolean if a field has been set.
func (o *BaseSm) HasPriorityFlag() bool {
	if o != nil && o.PriorityFlag != nil {
		return true
	}

	return false
}

// SetPriorityFlag gets a reference to the given int32 and assigns it to the PriorityFlag field.
func (o *BaseSm) SetPriorityFlag(v int32) {
	o.PriorityFlag = &v
}

// GetProtocolID returns the ProtocolID field value if set, zero value otherwise.
func (o *BaseSm) GetProtocolID() int32 {
	if o == nil || o.ProtocolID == nil {
		var ret int32
		return ret
	}
	return *o.ProtocolID
}

// GetProtocolIDOk returns a tuple with the ProtocolID field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetProtocolIDOk() (*int32, bool) {
	if o == nil || o.ProtocolID == nil {
		return nil, false
	}
	return o.ProtocolID, true
}

// HasProtocolID returns a boolean if a field has been set.
func (o *BaseSm) HasProtocolID() bool {
	if o != nil && o.ProtocolID != nil {
		return true
	}

	return false
}

// SetProtocolID gets a reference to the given int32 and assigns it to the ProtocolID field.
func (o *BaseSm) SetProtocolID(v int32) {
	o.ProtocolID = &v
}

// GetRegisteredDelivery returns the RegisteredDelivery field value if set, zero value otherwise.
func (o *BaseSm) GetRegisteredDelivery() int32 {
	if o == nil || o.RegisteredDelivery == nil {
		var ret int32
		return ret
	}
	return *o.RegisteredDelivery
}

// GetRegisteredDeliveryOk returns a tuple with the RegisteredDelivery field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetRegisteredDeliveryOk() (*int32, bool) {
	if o == nil || o.RegisteredDelivery == nil {
		return nil, false
	}
	return o.RegisteredDelivery, true
}

// HasRegisteredDelivery returns a boolean if a field has been set.
func (o *BaseSm) HasRegisteredDelivery() bool {
	if o != nil && o.RegisteredDelivery != nil {
		return true
	}

	return false
}

// SetRegisteredDelivery gets a reference to the given int32 and assigns it to the RegisteredDelivery field.
func (o *BaseSm) SetRegisteredDelivery(v int32) {
	o.RegisteredDelivery = &v
}

// GetReplaceIfPresentFlag returns the ReplaceIfPresentFlag field value if set, zero value otherwise.
func (o *BaseSm) GetReplaceIfPresentFlag() int32 {
	if o == nil || o.ReplaceIfPresentFlag == nil {
		var ret int32
		return ret
	}
	return *o.ReplaceIfPresentFlag
}

// GetReplaceIfPresentFlagOk returns a tuple with the ReplaceIfPresentFlag field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetReplaceIfPresentFlagOk() (*int32, bool) {
	if o == nil || o.ReplaceIfPresentFlag == nil {
		return nil, false
	}
	return o.ReplaceIfPresentFlag, true
}

// HasReplaceIfPresentFlag returns a boolean if a field has been set.
func (o *BaseSm) HasReplaceIfPresentFlag() bool {
	if o != nil && o.ReplaceIfPresentFlag != nil {
		return true
	}

	return false
}

// SetReplaceIfPresentFlag gets a reference to the given int32 and assigns it to the ReplaceIfPresentFlag field.
func (o *BaseSm) SetReplaceIfPresentFlag(v int32) {
	o.ReplaceIfPresentFlag = &v
}

// GetScheduleDeliveryTime returns the ScheduleDeliveryTime field value if set, zero value otherwise.
func (o *BaseSm) GetScheduleDeliveryTime() string {
	if o == nil || o.ScheduleDeliveryTime == nil {
		var ret string
		return ret
	}
	return *o.ScheduleDeliveryTime
}

// GetScheduleDeliveryTimeOk returns a tuple with the ScheduleDeliveryTime field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetScheduleDeliveryTimeOk() (*string, bool) {
	if o == nil || o.ScheduleDeliveryTime == nil {
		return nil, false
	}
	return o.ScheduleDeliveryTime, true
}

// HasScheduleDeliveryTime returns a boolean if a field has been set.
func (o *BaseSm) HasScheduleDeliveryTime() bool {
	if o != nil && o.ScheduleDeliveryTime != nil {
		return true
	}

	return false
}

// SetScheduleDeliveryTime gets a reference to the given string and assigns it to the ScheduleDeliveryTime field.
func (o *BaseSm) SetScheduleDeliveryTime(v string) {
	o.ScheduleDeliveryTime = &v
}

// GetServiceType returns the ServiceType field value if set, zero value otherwise.
func (o *BaseSm) GetServiceType() string {
	if o == nil || o.ServiceType == nil {
		var ret string
		return ret
	}
	return *o.ServiceType
}

// GetServiceTypeOk returns a tuple with the ServiceType field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetServiceTypeOk() (*string, bool) {
	if o == nil || o.ServiceType == nil {
		return nil, false
	}
	return o.ServiceType, true
}

// HasServiceType returns a boolean if a field has been set.
func (o *BaseSm) HasServiceType() bool {
	if o != nil && o.ServiceType != nil {
		return true
	}

	return false
}

// SetServiceType gets a reference to the given string and assigns it to the ServiceType field.
func (o *BaseSm) SetServiceType(v string) {
	o.ServiceType = &v
}

// GetSourceAddr returns the SourceAddr field value if set, zero value otherwise.
func (o *BaseSm) GetSourceAddr() string {
	if o == nil || o.SourceAddr == nil {
		var ret string
		return ret
	}
	return *o.SourceAddr
}

// GetSourceAddrOk returns a tuple with the SourceAddr field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetSourceAddrOk() (*string, bool) {
	if o == nil || o.SourceAddr == nil {
		return nil, false
	}
	return o.SourceAddr, true
}

// HasSourceAddr returns a boolean if a field has been set.
func (o *BaseSm) HasSourceAddr() bool {
	if o != nil && o.SourceAddr != nil {
		return true
	}

	return false
}

// SetSourceAddr gets a reference to the given string and assigns it to the SourceAddr field.
func (o *BaseSm) SetSourceAddr(v string) {
	o.SourceAddr = &v
}

// GetSourceNPI returns the SourceNPI field value if set, zero value otherwise.
func (o *BaseSm) GetSourceNPI() int32 {
	if o == nil || o.SourceNPI == nil {
		var ret int32
		return ret
	}
	return *o.SourceNPI
}

// GetSourceNPIOk returns a tuple with the SourceNPI field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetSourceNPIOk() (*int32, bool) {
	if o == nil || o.SourceNPI == nil {
		return nil, false
	}
	return o.SourceNPI, true
}

// HasSourceNPI returns a boolean if a field has been set.
func (o *BaseSm) HasSourceNPI() bool {
	if o != nil && o.SourceNPI != nil {
		return true
	}

	return false
}

// SetSourceNPI gets a reference to the given int32 and assigns it to the SourceNPI field.
func (o *BaseSm) SetSourceNPI(v int32) {
	o.SourceNPI = &v
}

// GetSourceTON returns the SourceTON field value if set, zero value otherwise.
func (o *BaseSm) GetSourceTON() int32 {
	if o == nil || o.SourceTON == nil {
		var ret int32
		return ret
	}
	return *o.SourceTON
}

// GetSourceTONOk returns a tuple with the SourceTON field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetSourceTONOk() (*int32, bool) {
	if o == nil || o.SourceTON == nil {
		return nil, false
	}
	return o.SourceTON, true
}

// HasSourceTON returns a boolean if a field has been set.
func (o *BaseSm) HasSourceTON() bool {
	if o != nil && o.SourceTON != nil {
		return true
	}

	return false
}

// SetSourceTON gets a reference to the given int32 and assigns it to the SourceTON field.
func (o *BaseSm) SetSourceTON(v int32) {
	o.SourceTON = &v
}

// GetValidityPeriod returns the ValidityPeriod field value if set, zero value otherwise.
func (o *BaseSm) GetValidityPeriod() string {
	if o == nil || o.ValidityPeriod == nil {
		var ret string
		return ret
	}
	return *o.ValidityPeriod
}

// GetValidityPeriodOk returns a tuple with the ValidityPeriod field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetValidityPeriodOk() (*string, bool) {
	if o == nil || o.ValidityPeriod == nil {
		return nil, false
	}
	return o.ValidityPeriod, true
}

// HasValidityPeriod returns a boolean if a field has been set.
func (o *BaseSm) HasValidityPeriod() bool {
	if o != nil && o.ValidityPeriod != nil {
		return true
	}

	return false
}

// SetValidityPeriod gets a reference to the given string and assigns it to the ValidityPeriod field.
func (o *BaseSm) SetValidityPeriod(v string) {
	o.ValidityPeriod = &v
}

// GetCharset returns the Charset field value if set, zero value otherwise.
func (o *BaseSm) GetCharset() string {
	if o == nil || o.Charset == nil {
		var ret string
		return ret
	}
	return *o.Charset
}

// GetCharsetOk returns a tuple with the Charset field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetCharsetOk() (*string, bool) {
	if o == nil || o.Charset == nil {
		return nil, false
	}
	return o.Charset, true
}

// HasCharset returns a boolean if a field has been set.
func (o *BaseSm) HasCharset() bool {
	if o != nil && o.Charset != nil {
		return true
	}

	return false
}

// SetCharset gets a reference to the given string and assigns it to the Charset field.
func (o *BaseSm) SetCharset(v string) {
	o.Charset = &v
}

// GetText returns the Text field value if set, zero value otherwise.
func (o *BaseSm) GetText() string {
	if o == nil || o.Text == nil {
		var ret string
		return ret
	}
	return *o.Text
}

// GetTextOk returns a tuple with the Text field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetTextOk() (*string, bool) {
	if o == nil || o.Text == nil {
		return nil, false
	}
	return o.Text, true
}

// HasText returns a boolean if a field has been set.
func (o *BaseSm) HasText() bool {
	if o != nil && o.Text != nil {
		return true
	}

	return false
}

// SetText gets a reference to the given string and assigns it to the Text field.
func (o *BaseSm) SetText(v string) {
	o.Text = &v
}

// GetShortMessages returns the ShortMessages field value if set, zero value otherwise.
func (o *BaseSm) GetShortMessages() []ShortMessageHex {
	if o == nil || o.ShortMessages == nil {
		var ret []ShortMessageHex
		return ret
	}
	return *o.ShortMessages
}

// GetShortMessagesOk returns a tuple with the ShortMessages field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetShortMessagesOk() (*[]ShortMessageHex, bool) {
	if o == nil || o.ShortMessages == nil {
		return nil, false
	}
	return o.ShortMessages, true
}

// HasShortMessages returns a boolean if a field has been set.
func (o *BaseSm) HasShortMessages() bool {
	if o != nil && o.ShortMessages != nil {
		return true
	}

	return false
}

// SetShortMessages gets a reference to the given []ShortMessageHex and assigns it to the ShortMessages field.
func (o *BaseSm) SetShortMessages(v []ShortMessageHex) {
	o.ShortMessages = &v
}

// GetIsConcatTLV returns the IsConcatTLV field value if set, zero value otherwise.
func (o *BaseSm) GetIsConcatTLV() bool {
	if o == nil || o.IsConcatTLV == nil {
		var ret bool
		return ret
	}
	return *o.IsConcatTLV
}

// GetIsConcatTLVOk returns a tuple with the IsConcatTLV field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetIsConcatTLVOk() (*bool, bool) {
	if o == nil || o.IsConcatTLV == nil {
		return nil, false
	}
	return o.IsConcatTLV, true
}

// HasIsConcatTLV returns a boolean if a field has been set.
func (o *BaseSm) HasIsConcatTLV() bool {
	if o != nil && o.IsConcatTLV != nil {
		return true
	}

	return false
}

// SetIsConcatTLV gets a reference to the given bool and assigns it to the IsConcatTLV field.
func (o *BaseSm) SetIsConcatTLV(v bool) {
	o.IsConcatTLV = &v
}

// GetTlvList returns the TlvList field value if set, zero value otherwise.
func (o *BaseSm) GetTlvList() []SmppTlv {
	if o == nil || o.TlvList == nil {
		var ret []SmppTlv
		return ret
	}
	return *o.TlvList
}

// GetTlvListOk returns a tuple with the TlvList field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *BaseSm) GetTlvListOk() (*[]SmppTlv, bool) {
	if o == nil || o.TlvList == nil {
		return nil, false
	}
	return o.TlvList, true
}

// HasTlvList returns a boolean if a field has been set.
func (o *BaseSm) HasTlvList() bool {
	if o != nil && o.TlvList != nil {
		return true
	}

	return false
}

// SetTlvList gets a reference to the given []SmppTlv and assigns it to the TlvList field.
func (o *BaseSm) SetTlvList(v []SmppTlv) {
	o.TlvList = &v
}

func (o BaseSm) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if o.Name != nil {
		toSerialize["name"] = o.Name
	}
	if o.Description != nil {
		toSerialize["description"] = o.Description
	}
	if o.DataCoding != nil {
		toSerialize["dataCoding"] = o.DataCoding
	}
	if o.DefaultMessageID != nil {
		toSerialize["defaultMessageID"] = o.DefaultMessageID
	}
	if o.DestinationAddr != nil {
		toSerialize["destinationAddr"] = o.DestinationAddr
	}
	if o.DestinationNPI != nil {
		toSerialize["destinationNPI"] = o.DestinationNPI
	}
	if o.DestinationTON != nil {
		toSerialize["destinationTON"] = o.DestinationTON
	}
	if o.EsmClass != nil {
		toSerialize["esmClass"] = o.EsmClass
	}
	if o.Id != nil {
		toSerialize["id"] = o.Id
	}
	if o.PriorityFlag != nil {
		toSerialize["priorityFlag"] = o.PriorityFlag
	}
	if o.ProtocolID != nil {
		toSerialize["protocolID"] = o.ProtocolID
	}
	if o.RegisteredDelivery != nil {
		toSerialize["registeredDelivery"] = o.RegisteredDelivery
	}
	if o.ReplaceIfPresentFlag != nil {
		toSerialize["replaceIfPresentFlag"] = o.ReplaceIfPresentFlag
	}
	if o.ScheduleDeliveryTime != nil {
		toSerialize["scheduleDeliveryTime"] = o.ScheduleDeliveryTime
	}
	if o.ServiceType != nil {
		toSerialize["serviceType"] = o.ServiceType
	}
	if o.SourceAddr != nil {
		toSerialize["sourceAddr"] = o.SourceAddr
	}
	if o.SourceNPI != nil {
		toSerialize["sourceNPI"] = o.SourceNPI
	}
	if o.SourceTON != nil {
		toSerialize["sourceTON"] = o.SourceTON
	}
	if o.ValidityPeriod != nil {
		toSerialize["validityPeriod"] = o.ValidityPeriod
	}
	if o.Charset != nil {
		toSerialize["charset"] = o.Charset
	}
	if o.Text != nil {
		toSerialize["text"] = o.Text
	}
	if o.ShortMessages != nil {
		toSerialize["shortMessages"] = o.ShortMessages
	}
	if o.IsConcatTLV != nil {
		toSerialize["isConcatTLV"] = o.IsConcatTLV
	}
	if o.TlvList != nil {
		toSerialize["tlvList"] = o.TlvList
	}
	return json.Marshal(toSerialize)
}

type NullableBaseSm struct {
	value *BaseSm
	isSet bool
}

func (v NullableBaseSm) Get() *BaseSm {
	return v.value
}

func (v *NullableBaseSm) Set(val *BaseSm) {
	v.value = val
	v.isSet = true
}

func (v NullableBaseSm) IsSet() bool {
	return v.isSet
}

func (v *NullableBaseSm) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableBaseSm(val *BaseSm) *NullableBaseSm {
	return &NullableBaseSm{value: val, isSet: true}
}

func (v NullableBaseSm) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableBaseSm) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


