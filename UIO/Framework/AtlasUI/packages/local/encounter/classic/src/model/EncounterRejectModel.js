/**
 * Created by d3973 on 10/10/2016.
 */
Ext.define('Atlas.encounter.model.EncounterRejectModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'RejectCode',
        type: 'string'
    }, {
        name: 'RejectDesc',
        type: 'string'
    }],
    proxy: {
        url: 'shared/{0}/encounterreject'
    }
});