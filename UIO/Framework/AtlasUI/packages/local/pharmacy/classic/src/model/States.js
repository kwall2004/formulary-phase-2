Ext.define('Atlas.pharmacy.model.States', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'name', 'value'
    ],

    proxy: {
        extraParams: {
            pListName: 'States'
        },
        url: 'shared/{0}/listitems'
        //shared/rx/listitems/read
    }
});
