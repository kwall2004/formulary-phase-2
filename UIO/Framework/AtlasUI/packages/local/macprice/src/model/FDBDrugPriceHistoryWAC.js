
Ext.define('Atlas.macprice.model.FDBDrugPriceHistoryWAC', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'priceDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'price', type: 'number'},
        {name: 'src', type: 'string'},
        {name: 'lastModified', type: 'date', dateFormat: 'Y-m-d'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/fdbdrugprchist'
    }
});