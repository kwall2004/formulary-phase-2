Ext.define('Atlas.common.model.State',{
    extend: 'Atlas.common.model.Base',

    fields: [
        'name',
        'value'
    ],
    proxy: {
        extraParams: {
            pListName: 'states'
        },

        url: 'shared/{0}/listitems'
    }
});