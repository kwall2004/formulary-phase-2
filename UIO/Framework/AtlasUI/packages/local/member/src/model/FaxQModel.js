/**
 * Created by s6627 on 1/12/2017.
 */
Ext.define('Atlas.member.model.FaxQModel', {
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