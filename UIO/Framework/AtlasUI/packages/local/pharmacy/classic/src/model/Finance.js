Ext.define('Atlas.pharmacy.model.Finance', {
    //extend: 'Atlas.common.model.Base',
    extend: 'Ext.data.Model',
    fields: [
        {name: 'CredLevel', type: 'string'},
        {name: 'NCPDPId', type: 'string'},
        {name: 'PharmName', type: 'string'},
        {name: 'RelationshipId', type: 'string'},
        {name: 'RelName', type: 'string'},
        {name: 'CredStDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'StaffName', type: 'string'},
        {name: 'DaysinQ', type: 'string'},
        {name: 'CredStatus', type: 'string'},
        {name: 'credLogId', type: 'string'}
    ]
});
