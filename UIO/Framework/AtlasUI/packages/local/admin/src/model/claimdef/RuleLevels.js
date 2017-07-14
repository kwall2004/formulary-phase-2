Ext.define('Atlas.admin.model.claimdef.RuleLevels', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefrulelevels',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleLevel'
        },
        url: 'system/{0}/listdetail'
    }
});