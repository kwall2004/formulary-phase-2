Ext.define('Atlas.admin.model.claimdef.NCPDPErrorCode', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefncpderrorcode',
    idProperty: 'systemID',
    fields: [
        {
            name: 'id',
            type: 'string'
        }, {
            name: 'value',
            type: 'string'
        },
        {
            name: 'combo',
            type: 'string',
            convert: function (val,rec)
            {
                return rec.get('id') + ' - ' + rec.get('value');
            }
        }
    ],
    proxy: {
                url: 'claims/{0}/ncpdperrcodes'
    }
});