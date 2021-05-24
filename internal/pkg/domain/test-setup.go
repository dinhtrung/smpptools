package domain

import "time"

type TestSetup struct {
	ID             string `json:"id,omitempty"`
	Name           string `json:"name,omitempty"`
	Description    string `json:"description,omitempty"`
	AccountFile    string `json:"accountFile,omitempty"`
	ConnectionFile string `json:"connectionFile,omitempty"`
	SupplierFile   string `json:"supplierFile,omitempty"`
}

type TestSession struct {
	ID                     string `json:"id,omitempty"`
	Name                   string `json:"name,omitempty"`
	Description            string `json:"description,omitempty"`
	TestSetup              string `json:"testSetup,omitempty"`
	TrafficFileContentType string `json:"trafficFileContentType,omitempty"`
	TrafficFile            string `json:"trafficFile,omitempty"`
	PatternVariant         string `json:"patternVariant,omitempty"`
}

type TestCase struct {
	ID          string    `json:"id,omitempty"`
	Name        string    `json:"name,omitempty"`
	Description string    `json:"description,omitempty"`
	TestSession string    `json:"testSession,omitempty"`
	State       int       `json:"state,omitempty"`
	CreatedAt   time.Time `json:"createdAt,omitempty"`
	UpdatedAt   time.Time `json:"updatedAt,omitempty"`
}
