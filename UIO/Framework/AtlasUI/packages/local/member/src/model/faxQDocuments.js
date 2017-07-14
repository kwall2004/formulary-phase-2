/**
 * Created by d3973 on 10/24/2016.
 */
Ext.define('Atlas.member.model.faxQDocuments', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'AcknowledgedDate',
        type: 'date',
        dateFormat: 'Y-m-d'
    }, {
        name: 'AssignTo',
        type: 'string'
    }, {
        name: 'RecieptTime',
        type: 'string'
    }, {
        name: 'DocumentID',
        type: 'number'
    }, {
        name: 'SystemID',
        type: 'number'
    }, {
        name: 'RecieptDate',
        type: 'date',
        dateFormat: 'Y-m-d'
    }],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/faxqdocuments'
    }
});