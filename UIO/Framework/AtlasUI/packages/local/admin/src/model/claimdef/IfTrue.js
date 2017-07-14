Ext.define('Atlas.admin.model.claimdef.IfTrue', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefiftrue',
    idProperty: 'systemID',
    fields: [{
        name: 'listDescription',
        type: 'string'
    }, {
        name: 'listName',
        type: 'string'
    }],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditRuleIfTrue'
        },
        url: 'system/{0}/listdetail'
    }
});