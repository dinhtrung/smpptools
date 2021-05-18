# BaseSm

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | Pointer to **string** | a short name for this SMPP parameter set | [optional] 
**Description** | Pointer to **string** | a short description | [optional] 
**DataCoding** | Pointer to **int32** | Data Coding for SMS | [optional] 
**DefaultMessageID** | Pointer to **int32** | Default Message ID | [optional] 
**DestinationAddr** | Pointer to **string** | destination address | [optional] 
**DestinationNPI** | Pointer to **int32** | destination address Number plan indication | [optional] 
**DestinationTON** | Pointer to **int32** | destination address Type of number | [optional] 
**EsmClass** | Pointer to **int32** | ESM Class | [optional] 
**Id** | Pointer to **string** |  | [optional] 
**PriorityFlag** | Pointer to **int32** | Priority Flag | [optional] 
**ProtocolID** | Pointer to **int32** | Protocol ID | [optional] 
**RegisteredDelivery** | Pointer to **int32** | Registered Delivery | [optional] 
**ReplaceIfPresentFlag** | Pointer to **int32** | Replace if present flag | [optional] 
**ScheduleDeliveryTime** | Pointer to **string** | Scheduled Delivery Time | [optional] 
**ServiceType** | Pointer to **string** | SMPP Service Type | [optional] 
**SourceAddr** | Pointer to **string** | source address | [optional] 
**SourceNPI** | Pointer to **int32** | source address Number plan indication | [optional] 
**SourceTON** | Pointer to **int32** | source address Type of number | [optional] 
**ValidityPeriod** | Pointer to **string** | Validity Period | [optional] 
**Text** | Pointer to **string** | Message content in text | [optional] 
**ShortMessages** | Pointer to [**[]ShortMessageHex**](ShortMessageHex.md) | Array of short messages | [optional] 
**Charset** | Pointer to **string** | Character set used for encoding and decoding between text and shortMessages | [optional] 
**IsConcatTLV** | Pointer to **bool** | is this message using TLV for concatenate long SMS | [optional] [default to false]
**TlvList** | Pointer to [**[]SmppTlv**](SmppTlv.md) | List of optional TLV | [optional] 

## Methods

### NewBaseSm

`func NewBaseSm() *BaseSm`

NewBaseSm instantiates a new BaseSm object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBaseSmWithDefaults

`func NewBaseSmWithDefaults() *BaseSm`

NewBaseSmWithDefaults instantiates a new BaseSm object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *BaseSm) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *BaseSm) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *BaseSm) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *BaseSm) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDescription

`func (o *BaseSm) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *BaseSm) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *BaseSm) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *BaseSm) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetDataCoding

`func (o *BaseSm) GetDataCoding() int32`

GetDataCoding returns the DataCoding field if non-nil, zero value otherwise.

### GetDataCodingOk

`func (o *BaseSm) GetDataCodingOk() (*int32, bool)`

GetDataCodingOk returns a tuple with the DataCoding field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDataCoding

`func (o *BaseSm) SetDataCoding(v int32)`

SetDataCoding sets DataCoding field to given value.

### HasDataCoding

`func (o *BaseSm) HasDataCoding() bool`

HasDataCoding returns a boolean if a field has been set.

### GetDefaultMessageID

`func (o *BaseSm) GetDefaultMessageID() int32`

GetDefaultMessageID returns the DefaultMessageID field if non-nil, zero value otherwise.

### GetDefaultMessageIDOk

`func (o *BaseSm) GetDefaultMessageIDOk() (*int32, bool)`

GetDefaultMessageIDOk returns a tuple with the DefaultMessageID field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultMessageID

`func (o *BaseSm) SetDefaultMessageID(v int32)`

SetDefaultMessageID sets DefaultMessageID field to given value.

### HasDefaultMessageID

`func (o *BaseSm) HasDefaultMessageID() bool`

HasDefaultMessageID returns a boolean if a field has been set.

### GetDestinationAddr

`func (o *BaseSm) GetDestinationAddr() string`

GetDestinationAddr returns the DestinationAddr field if non-nil, zero value otherwise.

### GetDestinationAddrOk

`func (o *BaseSm) GetDestinationAddrOk() (*string, bool)`

GetDestinationAddrOk returns a tuple with the DestinationAddr field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDestinationAddr

`func (o *BaseSm) SetDestinationAddr(v string)`

SetDestinationAddr sets DestinationAddr field to given value.

### HasDestinationAddr

`func (o *BaseSm) HasDestinationAddr() bool`

HasDestinationAddr returns a boolean if a field has been set.

### GetDestinationNPI

`func (o *BaseSm) GetDestinationNPI() int32`

GetDestinationNPI returns the DestinationNPI field if non-nil, zero value otherwise.

### GetDestinationNPIOk

`func (o *BaseSm) GetDestinationNPIOk() (*int32, bool)`

GetDestinationNPIOk returns a tuple with the DestinationNPI field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDestinationNPI

`func (o *BaseSm) SetDestinationNPI(v int32)`

SetDestinationNPI sets DestinationNPI field to given value.

### HasDestinationNPI

`func (o *BaseSm) HasDestinationNPI() bool`

HasDestinationNPI returns a boolean if a field has been set.

### GetDestinationTON

`func (o *BaseSm) GetDestinationTON() int32`

GetDestinationTON returns the DestinationTON field if non-nil, zero value otherwise.

### GetDestinationTONOk

`func (o *BaseSm) GetDestinationTONOk() (*int32, bool)`

GetDestinationTONOk returns a tuple with the DestinationTON field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDestinationTON

`func (o *BaseSm) SetDestinationTON(v int32)`

SetDestinationTON sets DestinationTON field to given value.

### HasDestinationTON

`func (o *BaseSm) HasDestinationTON() bool`

HasDestinationTON returns a boolean if a field has been set.

### GetEsmClass

`func (o *BaseSm) GetEsmClass() int32`

GetEsmClass returns the EsmClass field if non-nil, zero value otherwise.

### GetEsmClassOk

`func (o *BaseSm) GetEsmClassOk() (*int32, bool)`

GetEsmClassOk returns a tuple with the EsmClass field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEsmClass

`func (o *BaseSm) SetEsmClass(v int32)`

SetEsmClass sets EsmClass field to given value.

### HasEsmClass

`func (o *BaseSm) HasEsmClass() bool`

HasEsmClass returns a boolean if a field has been set.

### GetId

`func (o *BaseSm) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *BaseSm) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *BaseSm) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *BaseSm) HasId() bool`

HasId returns a boolean if a field has been set.

### GetPriorityFlag

`func (o *BaseSm) GetPriorityFlag() int32`

GetPriorityFlag returns the PriorityFlag field if non-nil, zero value otherwise.

### GetPriorityFlagOk

`func (o *BaseSm) GetPriorityFlagOk() (*int32, bool)`

GetPriorityFlagOk returns a tuple with the PriorityFlag field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriorityFlag

`func (o *BaseSm) SetPriorityFlag(v int32)`

SetPriorityFlag sets PriorityFlag field to given value.

### HasPriorityFlag

`func (o *BaseSm) HasPriorityFlag() bool`

HasPriorityFlag returns a boolean if a field has been set.

### GetProtocolID

`func (o *BaseSm) GetProtocolID() int32`

GetProtocolID returns the ProtocolID field if non-nil, zero value otherwise.

### GetProtocolIDOk

`func (o *BaseSm) GetProtocolIDOk() (*int32, bool)`

GetProtocolIDOk returns a tuple with the ProtocolID field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocolID

`func (o *BaseSm) SetProtocolID(v int32)`

SetProtocolID sets ProtocolID field to given value.

### HasProtocolID

`func (o *BaseSm) HasProtocolID() bool`

HasProtocolID returns a boolean if a field has been set.

### GetRegisteredDelivery

`func (o *BaseSm) GetRegisteredDelivery() int32`

GetRegisteredDelivery returns the RegisteredDelivery field if non-nil, zero value otherwise.

### GetRegisteredDeliveryOk

`func (o *BaseSm) GetRegisteredDeliveryOk() (*int32, bool)`

GetRegisteredDeliveryOk returns a tuple with the RegisteredDelivery field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRegisteredDelivery

`func (o *BaseSm) SetRegisteredDelivery(v int32)`

SetRegisteredDelivery sets RegisteredDelivery field to given value.

### HasRegisteredDelivery

`func (o *BaseSm) HasRegisteredDelivery() bool`

HasRegisteredDelivery returns a boolean if a field has been set.

### GetReplaceIfPresentFlag

`func (o *BaseSm) GetReplaceIfPresentFlag() int32`

GetReplaceIfPresentFlag returns the ReplaceIfPresentFlag field if non-nil, zero value otherwise.

### GetReplaceIfPresentFlagOk

`func (o *BaseSm) GetReplaceIfPresentFlagOk() (*int32, bool)`

GetReplaceIfPresentFlagOk returns a tuple with the ReplaceIfPresentFlag field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReplaceIfPresentFlag

`func (o *BaseSm) SetReplaceIfPresentFlag(v int32)`

SetReplaceIfPresentFlag sets ReplaceIfPresentFlag field to given value.

### HasReplaceIfPresentFlag

`func (o *BaseSm) HasReplaceIfPresentFlag() bool`

HasReplaceIfPresentFlag returns a boolean if a field has been set.

### GetScheduleDeliveryTime

`func (o *BaseSm) GetScheduleDeliveryTime() string`

GetScheduleDeliveryTime returns the ScheduleDeliveryTime field if non-nil, zero value otherwise.

### GetScheduleDeliveryTimeOk

`func (o *BaseSm) GetScheduleDeliveryTimeOk() (*string, bool)`

GetScheduleDeliveryTimeOk returns a tuple with the ScheduleDeliveryTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScheduleDeliveryTime

`func (o *BaseSm) SetScheduleDeliveryTime(v string)`

SetScheduleDeliveryTime sets ScheduleDeliveryTime field to given value.

### HasScheduleDeliveryTime

`func (o *BaseSm) HasScheduleDeliveryTime() bool`

HasScheduleDeliveryTime returns a boolean if a field has been set.

### GetServiceType

`func (o *BaseSm) GetServiceType() string`

GetServiceType returns the ServiceType field if non-nil, zero value otherwise.

### GetServiceTypeOk

`func (o *BaseSm) GetServiceTypeOk() (*string, bool)`

GetServiceTypeOk returns a tuple with the ServiceType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetServiceType

`func (o *BaseSm) SetServiceType(v string)`

SetServiceType sets ServiceType field to given value.

### HasServiceType

`func (o *BaseSm) HasServiceType() bool`

HasServiceType returns a boolean if a field has been set.

### GetSourceAddr

`func (o *BaseSm) GetSourceAddr() string`

GetSourceAddr returns the SourceAddr field if non-nil, zero value otherwise.

### GetSourceAddrOk

`func (o *BaseSm) GetSourceAddrOk() (*string, bool)`

GetSourceAddrOk returns a tuple with the SourceAddr field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSourceAddr

`func (o *BaseSm) SetSourceAddr(v string)`

SetSourceAddr sets SourceAddr field to given value.

### HasSourceAddr

`func (o *BaseSm) HasSourceAddr() bool`

HasSourceAddr returns a boolean if a field has been set.

### GetSourceNPI

`func (o *BaseSm) GetSourceNPI() int32`

GetSourceNPI returns the SourceNPI field if non-nil, zero value otherwise.

### GetSourceNPIOk

`func (o *BaseSm) GetSourceNPIOk() (*int32, bool)`

GetSourceNPIOk returns a tuple with the SourceNPI field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSourceNPI

`func (o *BaseSm) SetSourceNPI(v int32)`

SetSourceNPI sets SourceNPI field to given value.

### HasSourceNPI

`func (o *BaseSm) HasSourceNPI() bool`

HasSourceNPI returns a boolean if a field has been set.

### GetSourceTON

`func (o *BaseSm) GetSourceTON() int32`

GetSourceTON returns the SourceTON field if non-nil, zero value otherwise.

### GetSourceTONOk

`func (o *BaseSm) GetSourceTONOk() (*int32, bool)`

GetSourceTONOk returns a tuple with the SourceTON field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSourceTON

`func (o *BaseSm) SetSourceTON(v int32)`

SetSourceTON sets SourceTON field to given value.

### HasSourceTON

`func (o *BaseSm) HasSourceTON() bool`

HasSourceTON returns a boolean if a field has been set.

### GetValidityPeriod

`func (o *BaseSm) GetValidityPeriod() string`

GetValidityPeriod returns the ValidityPeriod field if non-nil, zero value otherwise.

### GetValidityPeriodOk

`func (o *BaseSm) GetValidityPeriodOk() (*string, bool)`

GetValidityPeriodOk returns a tuple with the ValidityPeriod field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetValidityPeriod

`func (o *BaseSm) SetValidityPeriod(v string)`

SetValidityPeriod sets ValidityPeriod field to given value.

### HasValidityPeriod

`func (o *BaseSm) HasValidityPeriod() bool`

HasValidityPeriod returns a boolean if a field has been set.

### GetText

`func (o *BaseSm) GetText() string`

GetText returns the Text field if non-nil, zero value otherwise.

### GetTextOk

`func (o *BaseSm) GetTextOk() (*string, bool)`

GetTextOk returns a tuple with the Text field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetText

`func (o *BaseSm) SetText(v string)`

SetText sets Text field to given value.

### HasText

`func (o *BaseSm) HasText() bool`

HasText returns a boolean if a field has been set.

### GetShortMessages

`func (o *BaseSm) GetShortMessages() []ShortMessageHex`

GetShortMessages returns the ShortMessages field if non-nil, zero value otherwise.

### GetShortMessagesOk

`func (o *BaseSm) GetShortMessagesOk() (*[]ShortMessageHex, bool)`

GetShortMessagesOk returns a tuple with the ShortMessages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetShortMessages

`func (o *BaseSm) SetShortMessages(v []ShortMessageHex)`

SetShortMessages sets ShortMessages field to given value.

### HasShortMessages

`func (o *BaseSm) HasShortMessages() bool`

HasShortMessages returns a boolean if a field has been set.

### GetCharset

`func (o *BaseSm) GetCharset() string`

GetCharset returns the Charset field if non-nil, zero value otherwise.

### GetCharsetOk

`func (o *BaseSm) GetCharsetOk() (*string, bool)`

GetCharsetOk returns a tuple with the Charset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCharset

`func (o *BaseSm) SetCharset(v string)`

SetCharset sets Charset field to given value.

### HasCharset

`func (o *BaseSm) HasCharset() bool`

HasCharset returns a boolean if a field has been set.

### GetIsConcatTLV

`func (o *BaseSm) GetIsConcatTLV() bool`

GetIsConcatTLV returns the IsConcatTLV field if non-nil, zero value otherwise.

### GetIsConcatTLVOk

`func (o *BaseSm) GetIsConcatTLVOk() (*bool, bool)`

GetIsConcatTLVOk returns a tuple with the IsConcatTLV field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsConcatTLV

`func (o *BaseSm) SetIsConcatTLV(v bool)`

SetIsConcatTLV sets IsConcatTLV field to given value.

### HasIsConcatTLV

`func (o *BaseSm) HasIsConcatTLV() bool`

HasIsConcatTLV returns a boolean if a field has been set.

### GetTlvList

`func (o *BaseSm) GetTlvList() []SmppTlv`

GetTlvList returns the TlvList field if non-nil, zero value otherwise.

### GetTlvListOk

`func (o *BaseSm) GetTlvListOk() (*[]SmppTlv, bool)`

GetTlvListOk returns a tuple with the TlvList field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTlvList

`func (o *BaseSm) SetTlvList(v []SmppTlv)`

SetTlvList sets TlvList field to given value.

### HasTlvList

`func (o *BaseSm) HasTlvList() bool`

HasTlvList returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


