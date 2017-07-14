Ext.define('Atlas.common.model.HpAuthQuestion', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        // extraParams: {
        //    pListName:'RxOrigin'
        // },
        url: 'system/hp/secretquestions'
    }
});