Ext.define('Atlas.member.view.requestprotectedhealthinformation.RequestProtectedHealthInformationForm', {
    extend: 'Ext.form.Panel',
    xtype: 'member-requestprotectedhealthinformation-requestprotectedhealthinformationform',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Member ID:',
            name: 'memberID'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Last Name:',
            name: 'lastName'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'First Name:',
            name: 'firstName'
        }
    ]
});
