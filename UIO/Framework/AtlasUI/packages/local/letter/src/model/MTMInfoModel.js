/** ... **/

Ext.define('Atlas.letter.model.MTMInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.mtminfomdl',
    fields: [
        {name: '@enrollmentStatus', type: 'string' },
        {name: 'birthDate', type: 'string' },
        {name: 'firstname', type: 'string' },
        {name: 'gender', type: 'string' },
        {name: 'homephone.ContactInfo', type: 'string' },
        {name: 'lastname', type: 'string' },
        {name: 'middlename', type: 'string' },
        {name: 'recipientID', type: 'string' },
        {name: 'suffix', type: 'string' },
        {name: 'FullName', type: 'string'},
        {name: 'LOBName', type: 'string'}
    ],
    proxy: {
        url: 'member/{0}/mtmcases'
    }
});