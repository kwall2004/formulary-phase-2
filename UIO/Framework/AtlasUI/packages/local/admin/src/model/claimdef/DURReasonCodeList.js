Ext.define('Atlas.admin.model.claimdef.DURReasonCodeList', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefdurreasoncodelist',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'DUR Reason Codes'
        },
        url: 'system/{0}/listdetail'
    }
});