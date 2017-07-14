Ext.define('Atlas.pharmacy.model.PharmaListitems', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'name', type: 'string'},
        {name: 'value', type: 'string'}
    ],

    proxy: {
        extraParams: {
           // pListName: 'States'
        },
        url: 'shared/{0}/listitems'
    }
});
