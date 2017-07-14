Ext.define('Atlas.macprice.model.CustomPriceMaintenance', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'NDC', type: 'string'},
        { name: 'labelName', type: 'string'},
        { name: 'customPriceListID', type: 'string'},
        { name: 'customPriceListVersion', type: 'number'},
        { name: 'costBasis', type: 'string'},
        { name: 'NDCPrice', type: 'number'},
        { name: 'CustomUnitPrice', type: 'number'},
        { name: 'unitPrice', type: 'number', mapping: 'CustomUnitPrice'},
        { name: 'customDiscount', type: 'number'},
        { name: 'discpercent', type: 'number', mapping: 'customDiscount'},
        { name: 'customPrice', type: 'number'},
        { name: 'contractId', type: 'number'},
        { name: 'pharmacyChain', type: 'string'},
        { name: 'pharmacyName', type: 'string'},
        { name: 'pharmacyAddress', type: 'string'},
        { name: 'pharmacyPhone', type: 'string'},
        { name: 'included', type: 'boolean'},
        { name: 'systemId', type: 'number'},
        { name: 'dispFee', type: 'number'},
        { name: 'LineOfBusiness', type: 'string'},
        { name: 'PharmacyType', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/custompricingnew'
    }
});