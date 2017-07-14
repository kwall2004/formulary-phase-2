/**
 * Created by s6627 on 11/27/2016.
 */
Ext.define('Atlas.casemanagement.model.FaxQModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'SystemID', type: 'string'},
        {name: 'inOut', type: 'string'},
        {name: 'AssignTo', type: 'string'},
        {name: 'AcknowledgedDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'RecieptDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'RecieptTime', type: 'string'},
        {name: 'DocumentID',type: 'int'},
        {name: 'DESCRIPTION',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/faxqdocuments'
    }
})