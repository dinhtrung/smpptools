# IsdnList

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Content** | Pointer to **string** | Uploaded files or CSV | [optional] 
**Description** | Pointer to **string** | short description text | [optional] 
**Id** | Pointer to **string** |  | [optional] 
**Name** | **string** | name of this ISDN list | 

## Methods

### NewIsdnList

`func NewIsdnList(name string, ) *IsdnList`

NewIsdnList instantiates a new IsdnList object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewIsdnListWithDefaults

`func NewIsdnListWithDefaults() *IsdnList`

NewIsdnListWithDefaults instantiates a new IsdnList object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetContent

`func (o *IsdnList) GetContent() string`

GetContent returns the Content field if non-nil, zero value otherwise.

### GetContentOk

`func (o *IsdnList) GetContentOk() (*string, bool)`

GetContentOk returns a tuple with the Content field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContent

`func (o *IsdnList) SetContent(v string)`

SetContent sets Content field to given value.

### HasContent

`func (o *IsdnList) HasContent() bool`

HasContent returns a boolean if a field has been set.

### GetDescription

`func (o *IsdnList) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *IsdnList) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *IsdnList) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *IsdnList) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetId

`func (o *IsdnList) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *IsdnList) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *IsdnList) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *IsdnList) HasId() bool`

HasId returns a boolean if a field has been set.

### GetName

`func (o *IsdnList) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *IsdnList) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *IsdnList) SetName(v string)`

SetName sets Name field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


