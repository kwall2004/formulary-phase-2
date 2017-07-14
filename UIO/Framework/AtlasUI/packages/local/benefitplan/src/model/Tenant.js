Ext.define('Atlas.benefitplan.model.Tenant', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
    {name: 'TenantSK', type: 'int'},
		{name: 'TenantName', type: 'string'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
    {name: 'CurrentUser', type: 'string'}
	],
	proxy: {
		url: '/Tenant'
  }
});
