Ext.define('Atlas.prescriber.model.SearchPriorAuth', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ListDescription', type: 'string'}
    ],
    proxy: {
        extraParams: {
        },
        url: 'portal/{0}/listdetail'
    }
});