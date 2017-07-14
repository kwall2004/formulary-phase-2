Ext.define('Atlas.common.model.RxAuthQuestion', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:'PrescPortalSecQues'
        },
        url: 'portal/rx/listitemsmrx'
    }
});