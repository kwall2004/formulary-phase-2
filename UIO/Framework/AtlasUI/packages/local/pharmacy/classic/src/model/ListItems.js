Ext.define('Atlas.pharmacy.model.ListItems', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'name', 'value'
    ],
    proxy: {
/*
        extraParams: {
            pListName: ''
        },
*/
        url: 'shared/{0}/listitems'
    }
});
