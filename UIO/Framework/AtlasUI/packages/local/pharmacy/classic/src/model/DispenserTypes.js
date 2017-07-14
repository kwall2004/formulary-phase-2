Ext.define('Atlas.pharmacy.model.DispenserTypes', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'name', 'value'
    ],

    proxy: {
        extraParams: {
            pListName: 'DispenserType'
        },
        url: 'shared/{0}/listitems'
        //shared/rx/listitems/read
    }
});
