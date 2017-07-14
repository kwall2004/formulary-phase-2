/**
 * Created by agupta on 11/28/2016.
 */

Ext.define('Atlas.admin.model.ErrorListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.errorlistmodel',

    fields: [{
        name: 'ErrorSource',
        type: 'string'
    }, {
        name: 'Description',
        type: 'string'
    }, {
        name: 'ErrorSourceID',
        type: 'string'
    }, {
        name: 'ErrorListId',
        type: 'number'
    }, {
        name: 'Systemid',
        type: 'number'
    }],

    proxy: {
        extraParams: {

        },
        url: 'shared/{0}/errorlist'

    }

});