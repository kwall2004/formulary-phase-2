/**
 * Created by d3973 on 9/30/2016.
 */
Ext.define('Atlas.admin.model.ListNamesModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminlistnamesmodel',

    fields: [{
        name: 'name',
        type: 'string'
    }],

    proxy: {
        url: 'system/{0}/listnames'
    }
});