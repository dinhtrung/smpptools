package instances

import "github.com/dinhtrung/smpptools/internal/pkg/interfaces"

// + repositories
var (
	BaseSmRepo           interfaces.BaseSmCrudRepository
	EsmeAccountRepo      interfaces.EsmeAccountCrudRepository
	EsmeSessionRepo      interfaces.EsmeSessionCrudRepository
	SmscAccountRepo      interfaces.SmscAccountCrudRepository
	SmscInstanceRepo     interfaces.SmscInstanceCrudRepository
	SmscSessionRepo      interfaces.SmscSessionCrudRepository
	ThroughputSeriesRepo interfaces.ThroughputSeriesCrudRepository
	IsdnListRepo         interfaces.IsdnListCrudRepository
)
