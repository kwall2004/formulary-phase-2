Ext.define('Atlas.letter.model.ApprovedLettersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.approvedlettersmdl',
    fields: [
        {name: 'Account', type: 'string', mapping: 'Account' },
        {name: 'ApprovedBy', type: 'string', mapping: 'ApprovedBy' },
        {name: 'ApprovedDate', type: 'string', mapping: 'ApprovedDate',dateFormat: 'Y-m-d' },
        {name: 'AssignTo', type: 'string', mapping: 'AssignTo' },
        {name: 'Carrier', type: 'string', mapping: 'Carrier' },
        {name: 'CreatedBy', type: 'string', mapping: 'CreatedBy' },
         {
            name: 'CreatedDate',
            type: 'string',
             dateFormat: 'Y-m-d'
            //    dateFormat: 'Y-m-d H:i:s'
        },
        {name: 'DueDate', type: 'string', dateFormat: 'Y-m-d' },
        {name: 'HourRemaining', type: 'string', mapping: 'HourRemaining' },
        {name: 'LOB', type: 'string', mapping: 'LOB' },
        {name: 'LetterID', type: 'string', mapping: 'LetterID' },
        {name: 'LetterName', type: 'string', mapping: 'LetterName' },
        {name: 'MemberName', type: 'string', mapping: 'MemberName' },
        {name: 'RID', type: 'string', mapping: 'RID' }
    ],
    pageSize: 50,
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'member/{0}/lettersqapproved'
    }
});