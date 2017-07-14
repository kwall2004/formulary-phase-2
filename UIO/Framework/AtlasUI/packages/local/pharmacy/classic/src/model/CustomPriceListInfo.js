Ext.define('Atlas.pharmacy.model.CustomPriceListInfo', {
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
        url: 'formulary/{0}/custompricelistinfo',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                var activePriceList = [];
                payload.data.forEach(function (item, index) {
                    if ((item.priceStatus == 'A' && ((!item.terminationDate) || (new Date(item.terminationDate) >= Atlas.common.utility.Utilities.getLocalDateTime() ))) && activePriceList.indexOf(item) == -1) {
                        activePriceList.push(item);
                    }
                });
                return activePriceList;
            }
        }
    }
});