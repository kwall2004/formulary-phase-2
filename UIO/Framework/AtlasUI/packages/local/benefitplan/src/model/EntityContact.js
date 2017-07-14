/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.model.EntityContact', {
    extend: 'Atlas.benefitplan.model.Base',
    hasMany: {model: 'ContactCommunications', name: 'ContactCommunications', associationKey: 'ContactCommunications'},
    hasOne: {model: 'ContactAddress', name: 'ContactAddress', associationKey: 'ContactAddress'},
    fields: [
        {name: 'EntityType', type: 'int'},
        {name: 'EntityTypeSK', type: 'int'},
        {name: 'EntityTypeContactSK', type: 'int'},
        {name: 'CntctSK', type: 'int'},
        {name: 'FirstName', type: 'string'},
        {name: 'LastName', type: 'string'},
        {name: 'Company', type: 'string'},
        {name: 'CntctRespCode', type: 'string'},
        {name: 'Priority', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'InctvTsDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'PrintName', type: 'string'},
        {name: 'Title', type: 'string'},
        {name: 'ContactCommunications'},
        {name: 'ContactAddress'},
        {name: 'CurrentUser', type: 'string'}
    ],
    validators: {
        FirstName: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        LastName: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        PrintName: [
            {type: 'length', max: 111},
            {type: 'presence'}
        ],
        Company: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        CntctRespCode: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        Title: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        Priority: [
            {type: 'presence'}
        ],
        EfctvStartDt: [
            {type: 'presence'},
            {minValue: new Date()}
        ],
        EfctvEndDt: [
            {type: 'presence'},
            {minValue: new Date()}
        ]
    },
    proxy: {
        url: '/entitycontact',
        reader: {
            keepRawData: true
        }
    }
});