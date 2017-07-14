Ext.define('Atlas.admin.model.claimdef.OperatorList', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefoperatorlist',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleOper'
        },
        url: 'system/{0}/listdetail'
    }
});