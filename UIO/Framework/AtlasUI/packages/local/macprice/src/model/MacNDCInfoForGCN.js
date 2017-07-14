
Ext.define('Atlas.macprice.model.MacNDCInfoForGCN', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'DrugCode',
    fields: [
        { name: 'GCN_SeqNo', type: 'number'},
        { name: 'DrugCode', type: 'string'},
        { name: 'DrugType', type: 'string'},
        { name: 'OTC_IND', type: 'string'},
        { name: 'LN', type: 'string'},
        { name: 'BN', type: 'string'},
        { name: 'ETC_ID', type: 'number'},
        { name: 'ETC_NAME', type: 'string'},
        { name: 'ULTIMATE_PARENT_ETC_ID', type: 'number'},
        { name: 'ULTIMATE_PARENT_ETC_NAME', type: 'string'},
        { name: 'FULInd', type: 'boolean'},
        { name: 'FUL', type: 'number'},
        { name: 'AWP', type: 'number'},
        { name: 'DiscountedAWP', type: 'number'},
        { name: 'WAC', type: 'number'},
        { name: 'DiscountedWAC', type: 'number'},
        { name: 'LastUpdatedDate', dateFormat: 'Y-m-d'},
        { name: 'LastUpdateBy', type: 'string'},
        { name: 'ObsoleteDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'NewDrug', type: 'boolean'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/macndcInfoforgcn',
        timeout: 120000
    }
});
