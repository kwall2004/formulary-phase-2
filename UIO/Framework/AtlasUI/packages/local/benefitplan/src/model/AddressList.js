Ext.define('Atlas.benefitplan.model.AddressList', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
		{name: 'Value', type: 'int'},
		{name: 'Text', type: 'string'}
	],
	proxy: {
		url: '/EntityAddress'
  	}
});
