// Most likely different model than 'Atlas.common.model.AttachmentList'
Ext.define('Atlas.pharmacy.model.Letters', {
    extend: 'Atlas.common.model.Base',
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


    ],
    proxy: {
        extraParams: {},
        url: 'pharmacy/{0}/nameHere'
    }
});