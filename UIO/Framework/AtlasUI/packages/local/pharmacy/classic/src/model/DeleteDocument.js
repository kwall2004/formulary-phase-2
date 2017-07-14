Ext.define('Atlas.pharmacy.model.DeleteDocument', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //'metadata'
    ],
    proxy: {
        url: 'shared/{0}/delDocument'
    }

});
