Ext.define('Atlas.member.model.MemLocksMedication', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'names', type: 'string'},
        {name: 'address1', type: 'string'},
        {name: 'address2', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'zip', type: 'string'},
        {name: 'LockIdSubType', type: 'int'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNum', type: 'int'},
        {name: 'Id', type: 'string'},
        {name: 'crossStreet', type: 'string'},
        {name: 'LockIdType', type: 'string'}
    ],

    proxy: {
        url: 'member/{0}/memberlocks',
        extraParams: {
            pKeyType: 'DRUG',
            pRecipientId: 0
        }
    }
});
