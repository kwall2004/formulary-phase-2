Ext.define('Atlas.benefitplan.model.Provinces', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'StPrvncCodeSK', type: 'number'},
        {name: 'StPrvncDesc', type: 'string'}
    ],
    proxy: {
        url: '/StateProvinceCode'
    }
});
