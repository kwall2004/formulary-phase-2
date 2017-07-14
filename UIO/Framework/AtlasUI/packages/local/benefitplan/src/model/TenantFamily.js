Ext.define('Atlas.benefitplan.model.TenantFamily', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
    {name: 'TenantFamSK', type: 'int'},
		{name: 'TenantFamName', type: 'string'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
    {name: 'CurrentUser', type: 'string'}
  ],
	proxy: {
		url: '/TenantFamily'
  }
});
