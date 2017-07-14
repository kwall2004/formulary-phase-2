/** ... **/

Ext.define('Atlas.letter.model.MemberInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.memberinfomdl',
    fields: [
        {name: '@enrollmentStatus', type: 'string' },
        {name: 'enrollmentStatus', type: 'string', mapping: '@enrollmentStatus' },
        {name: 'birthDate', type: 'string' },
        {name: 'firstname', type: 'string' },
        {name: 'gender', type: 'string' },
        {name: 'homephone.ContactInfo', type: 'string' },
        {name: 'homephone', type: 'string', mapping: 'homephone.ContactInfo' },
        {name: 'lastname', type: 'string' },
        {name: 'middlename', type: 'string' },
        {name: 'recipientID', type: 'string' },
        {name: 'suffix', type: 'string' },
        {name: 'FullName', type: 'string'},
        {name: 'LOBName', type: 'string'}
    ],
    proxy: {
        url: 'member/{0}/membermasterdata'
    }
});