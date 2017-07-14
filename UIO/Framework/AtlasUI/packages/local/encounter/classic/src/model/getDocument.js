/**
 * Created by d3973 on 11/2/2016.
 */
Ext.define('Atlas.encounter.model.getDocument', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'pData',
        type: 'string'
    }, {
        name: 'pDocumentType',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/document'
    }
});