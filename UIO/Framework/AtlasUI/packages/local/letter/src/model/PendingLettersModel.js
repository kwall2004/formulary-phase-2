Ext.define('Atlas.letter.model.PendingLettersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.pendinglettersmdl',
    fields: [
        {name: 'Account', type: 'string', mapping: 'Account'},
        {name: 'AssignTo', type: 'string', mapping: 'AssignTo'},
        {name: 'Carrier', type: 'string', mapping: 'Carrier'},
        {name: 'CreatedBy', type: 'string', mapping: 'CreatedBy'},
        {name: 'CreatedDate', type: 'date', mapping: 'CreatedDate'},
        {name: 'DueDate', type: 'date', mapping: 'DueDate'},
        {name: 'HourRemaining', type: 'string', mapping: 'HourRemaining'},
        {name: 'LOB', type: 'string', mapping: 'LOB'},
        {name: 'LetterID', type: 'string', mapping: 'LetterID'},
        {name: 'LetterName', type: 'string', mapping: 'LetterName'},
        {name: 'MemberName', type: 'string', mapping: 'MemberName'},
        {name: 'RID', type: 'string', mapping: 'RID'}
    ],
    pageSize: 50,
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'member/{0}/lettersqpending'
    }
});