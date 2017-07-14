Ext.define('Atlas.admin.model.claimdef.ConditionList', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefconditionlist',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleCond'
        },
        url: 'system/{0}/listdetail'
    }
});