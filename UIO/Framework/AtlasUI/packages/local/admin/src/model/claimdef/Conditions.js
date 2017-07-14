Ext.define('Atlas.admin.model.claimdef.Conditions', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefconditions',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        url: 'claims/{0}/claimeditconditions'
    }
});