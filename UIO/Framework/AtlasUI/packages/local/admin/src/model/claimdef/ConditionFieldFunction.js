Ext.define('Atlas.admin.model.claimdef.ConditionFieldFunction', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefconditionfieldfunction',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pMode: '',
            pSelection: 'F'
        },
        url: 'claims/{0}/claimeditfieldsfunctions'
    }
});