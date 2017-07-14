/**
 * Created by d3973 on 10/31/2016.
 */
Ext.define('Atlas.encounter.model.getDocumentURL', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'pURL',
        type: 'string'
    }, {
        name: 'pDocumentType',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/documenturl'
    }
});