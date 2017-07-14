Ext.define('Atlas.pharmacy.model.ReCredReceived', {
    extend: 'Atlas.common.model.Base',
    fields: [

        {name: 'CredLevel', type: 'string'},
        {name: 'NCPDPId', type: 'string'},
        {name: 'PharmName', type: 'string'},
        {name: 'RelationshipId', type: 'string'},
        {name: 'RelName', type: 'string'},
        {name: 'CredStDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'ReCredDueDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LastCredDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'StaffName', type: 'string'},
        {name: 'DaysinQ', type: 'string'},
        {name: 'CredStatus', type: 'string'},
        {name: 'credLogId', type: 'string'}


    ]
});
