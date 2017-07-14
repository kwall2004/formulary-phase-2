Ext.define('Atlas.macprice.model.CustomPriceHeader', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'systemID',
    fields: [
        {name: 'systemID', type: 'number'},
        {name: 'customPriceListId', type: 'string'},
        {name: 'customPriceListVersion', type: 'number'},
        {name: 'customPriceName', type: 'string'},
        {name: 'priceStatus', type: 'string'},
        {
            name: 'priceStatusFormat', type: 'string',
            calculate: function (data) {
                var stat = '';

                if (data.priceStatus == 'A') {
                    stat = 'Approved';
                }
                else if (data.priceStatus == 'D') {
                    stat = 'Draft';
                }

                return stat;
            }
        },
        {name: 'effectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'terminationDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'lastModifiedDt', type: 'date'},
        {name: 'lastModifiedBy', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/custompricelistinfo'
    }
});