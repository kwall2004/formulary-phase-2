Ext.define('Atlas.benefitplan.model.Address', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
        {name: "EntityType", type: 'int'},
        {name: "EntityTypeAddressSK", type: 'int'},
        {name: "EntityTypeSK", type: 'int'},
        {name: 'EntityEfctvStartDt', type: 'date',  dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EntityEfctvEndDt', type: 'date',  dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'AddrSK', type: 'int'},
		{name: 'EfctvStartDt', type: 'date',  dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date',  dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'AddrLine1', type: 'string'},
		{name: 'AddrLine2', type: 'string'},
		{name: 'City', type: 'string'},
        {name: 'StPrvncCodeSK', type: 'int'},
        {name: 'PostalCode', type: 'string'},
		{name: 'ISOCntryCodeSK', type: 'int'},
        {name: 'CurrentUser', type: 'string'}
	],
	proxy: {
		url: '/EntityAddress'
  	}
});
