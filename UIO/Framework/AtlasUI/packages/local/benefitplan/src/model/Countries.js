Ext.define('Atlas.benefitplan.model.Countries', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'ISOCntryCodeSK', type: 'number'},
        {name: 'ISOCntryCode1', type: 'string'}
    ],
    proxy: {
        url: '/ISOCountryCode'
    }
});
