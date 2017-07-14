Ext.define('Atlas.member.view.requestmemberhandbook.RequestMemberHandbookForm', {
    extend: 'Ext.form.Panel',
    xtype: 'member-requestmemberhandbook-requestmemberhandbookform',

    items: [
      {
        xtype: 'combobox',
        fieldLabel: 'Family:',
        name: 'family'
      },
      {
        xtype: 'combobox',
        fieldLabel: 'LOB:',
        name: 'lob'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Member ID:',
        name: 'memberID'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Last Name',
        name: 'lastName'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'First Name',
        name: 'firstName'
      },
      {
        xtype: 'combobox',
        fieldLabel: 'Language:',
        name: 'language'
      }
    ]
});
