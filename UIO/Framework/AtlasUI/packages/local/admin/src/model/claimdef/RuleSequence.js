Ext.define('Atlas.admin.model.claimdef.RuleSequence', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefrulesequeence',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleSequence'
        },
        url: 'system/{0}/listdetail'
    }
});