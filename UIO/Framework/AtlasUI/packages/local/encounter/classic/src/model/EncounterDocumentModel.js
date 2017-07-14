/**
 * Created by d3973 on 10/28/2016.
 */
Ext.define('Atlas.encounter.model.EncounterDocumentModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'DocumentId',
        type: 'number'
    }, {
        name: 'FILENAME',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/encounterdocument'
    }
});