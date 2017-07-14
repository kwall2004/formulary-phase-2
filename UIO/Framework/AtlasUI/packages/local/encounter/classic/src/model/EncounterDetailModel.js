/**
 * Created by d3973 on 10/10/2016.
 */
Ext.define('Atlas.encounter.model.EncounterDetailModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'EncounterID',
        type: 'number'
    }, {
        name: 'RecordId',
        type: 'number'
    }, {
        name: 'RecordStatus',
        type: 'string'
    }, {
        name: 'AdditionalInfo',
        type: 'string'
    }, {
        name: 'RecPointer',
        type: 'string'
    }, {
        name: 'SystemID',
        type: 'number'
    }],

    proxy: {
        //calls getEncounterDetail
        url: 'shared/{0}/encounterdetail'
    }
});