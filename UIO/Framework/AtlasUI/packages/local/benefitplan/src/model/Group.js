Ext.define('Atlas.benefitplan.model.Group', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
		{name: 'GrpSK', type: 'int'},
		{name: 'AcctSK', type: 'int'},
		{name: 'GrpName', type: 'string'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'GrpNbr', type: 'string'},
		{name: 'HIOIssuerID', type: 'string'},
		{name: 'CurrentUser', type: 'string'}
	],
	proxy: {
		url: '/Group'
	}
});
