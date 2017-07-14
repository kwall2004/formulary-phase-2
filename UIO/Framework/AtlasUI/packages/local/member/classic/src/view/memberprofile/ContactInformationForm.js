Ext.define('Atlas.member.view.memberprofile.ContactInformationForm', {
    extend: 'Ext.form.Panel',
    xtype: 'member-memberprofile-contactinformationform',

    defaults:
      {
        margin: 10
      },

    items: [
      {
        xtype: 'textfield',
        fieldLabel: 'Current Email:',
        name: 'currentEmail'
      },
      {
        xtype: 'checkbox',
        boxLabel: 'Change Email Address',
        name: 'changeEmailAddress',
        margin: '0px, 0px, 0px, 120px'
      },
      {
        xtype: 'radio',
        boxLabel: 'Receive Eamil Notices',
        name: 'receiveEmailNotices',
        margin: '0px, 0px, 0px, 120px'
      },
      {
        xtype: 'radio',
        boxLabel: 'Unsubscribe',
        name: 'unsubscribeEmail',
        margin: '0px, 0px, 0px, 120px'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Home:',
        name: 'home'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Work:',
        name: 'work'
      },
      {
        xtype: 'combobox',
        fieldLabel: 'Mobile:',
        name: 'mobile'
      },
      {
        xtype: 'radio',
        boxLabel: 'Receive Text Messages',
        name: 'receiveTextMessages',
        margin: '0px, 0px, 0px, 120px'
      },
      {
        xtype: 'radio',
        boxLabel: 'Unsubscribe',
        name: 'unsubscribePhone',
        margin: '0px, 0px, 0px, 120px'
      }
    ]
});
