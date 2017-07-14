Ext.define('Atlas.benefitplan.model.Account', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
    	{name: 'AcctSK', type: 'int'},
		{name: 'AcctName', type: 'string'},
		{name: 'AcctNbr', type: 'string'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
    	{name: 'CurrentUser', type: 'string'}
	],
  	hasMany: 'AccountIndustryIdentifier',
	proxy: {
		url: '/Account'
  	}
});
