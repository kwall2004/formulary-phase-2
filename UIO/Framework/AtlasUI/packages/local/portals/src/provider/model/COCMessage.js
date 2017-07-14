// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.provider.model.COCMessage', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'provider/hp/coordcaremessageweb',
        extraParams: {
            pRowID: '',
            pRowNum: 0,
            pRows: 0,
            pSort: ''
        }
    }
});