Ext.define('Atlas.letter.model.QueryDBModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.querydbmdl',
    fields: [
        {name: 'ListName', type: 'string', mapping: 'ListName' },
        {name: 'ListValue', type: 'string', mapping: 'ListValue' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/querydb',
        extraParams: {
            pBuffer: 'PostScript',
            pWhere: 'Type = "Signature"',
            pField: 'Name',
            pOrderBy: '',
            pAscDesc: ''
        }
    }
});