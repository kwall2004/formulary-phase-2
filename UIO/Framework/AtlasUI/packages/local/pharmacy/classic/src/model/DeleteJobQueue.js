Ext.define('Atlas.pharmacy.model.DeleteJobQueue', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //'metadata'
    ],
    proxy: {
        url: 'shared/{0}/deletejobqueuedirectly'
    }

});
