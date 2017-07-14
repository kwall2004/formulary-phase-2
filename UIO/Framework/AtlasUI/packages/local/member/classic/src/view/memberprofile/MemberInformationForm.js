Ext.define('Atlas.member.view.memberprofile.MemberInformationForm', {
    extend: 'Ext.form.Panel',
    xtype: 'member-memberprofile-memberinformationform',

    defaults:
      {
        margin: 10
      },

    items: [
      {
        xtype: 'textfield',
        fieldLabel: 'First Name:',
        name: 'firstName'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Middle Name:',
        name: 'middleName'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'LastName:',
        name: 'lastName'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Address 1:',
        name: 'addressOne'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Address 2:',
        name: 'addressTwo'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'City:',
        name: 'city'
      },
      {
        xtype: 'combobox',
        fieldLabel: 'State:',
        name: 'state'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Zip Code:',
        name: 'zipCode'
      }
    ]
});
