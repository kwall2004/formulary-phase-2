
Ext.define('Atlas.letter.model.LetterUserMaintModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterusermaintmdl',
    fields: [
        {name: 'ContactInfo', mapping: 'Ext.ContactInfo'},
        {name: 'active', mapping: 'active'},
        {name: 'cell', mapping: 'cell.ContactInfo'},
        {name: 'createDateTime', mapping: 'createDateTime'},
        {name: 'email', mapping: 'email.ContactInfo'},
        {name: 'fax', mapping: 'fax.ContactInfo'},
        {name: 'firstname', mapping: 'firstname'},
        {name: 'groupid', mapping: 'groupid'},
        {name: 'homephone', mapping: 'homephone.ContactInfo'},
        {name: 'lastname', mapping: 'lastname'},
        {name: 'middlename', mapping: 'middlename'},
        {name: 'gueueAdmin', mapping: 'gueueAdmin'},
        {name: 'username', mapping: 'username'},
        {name: 'workphone', mapping: 'workphone.ContactInfo'}
    ],
    proxy: {
        url: 'system/{0}/usermasterdata'
    }
});