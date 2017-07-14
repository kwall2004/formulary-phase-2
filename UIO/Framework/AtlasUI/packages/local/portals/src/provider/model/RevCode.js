// k3279 - kevin tabasan - 11/30/2016

Ext.define('Atlas.portals.provider.model.RevCode', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'revCode', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'XprocCodeReq', type: 'string'},
        {name: 'wrdIdx', type: 'string'},
        {name: 'XbundleCode', type: 'string'},
        {name: 'XpayByProc', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'XreqRevCodes', type: 'string'},
        {name: 'procCodeReq', type: 'string'},
        {name: 'payByProc', type: 'string'},
        {name: 'bundleCode', type: 'string'},
        {name: 'reqRevCodes', type: 'string'},
        {name: 'lobID', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNUm', type: 'string'}
    ],

    proxy: {
        url: 'provider/hp/revcodemasterweb'
    }
});