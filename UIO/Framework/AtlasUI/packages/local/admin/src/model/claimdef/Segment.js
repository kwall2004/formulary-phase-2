Ext.define('Atlas.admin.model.claimdef.Segment', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefsegment',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleSegment'
        },
        url: 'system/{0}/listdetail'
    }
});