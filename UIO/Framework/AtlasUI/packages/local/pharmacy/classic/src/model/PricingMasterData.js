Ext.define('Atlas.pharmacy.model.PricingMasterData', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'AdminFee',
        'FulfillmentType',
        'FulfillmentTypeVal',
        'GERCostBasis',
        'GERDiscPercent',
        'GERPeriod',
        'LOB',
        'LOBValue',
        'MultiSource',
        'ParentSystemId',
        'PharmaPricing',
        'PriceId',
        'RebateAmount',
        'RebatePercent',
        'VaccineAdminFee',
        'dbRowID',
        'RowNum',
        'DispFeeRuleID'
    ],

    proxy: {
        extraParams: {
            pRowid: '0',
            pRowNum: 0,
            pBatchSize: 0,
            ParentSystemId: '',
            pSort: ''
        },
        url: 'pharmacy/{0}/pricingmasterdata'
    }
});
