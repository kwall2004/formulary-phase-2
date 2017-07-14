// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeReplyWindow', {
  extend: 'Ext.window.Window',
  xtype: 'provider-homereplywindow',
  viewModel: 'homereplywindow',
  controller: 'homereplywindow',
  title: 'Reply Message',
  modal: true,
  width: 600,
  height: 320,

  defaults: {
    xtype: 'displayfield',
    labelWidth: 140
  },

  items: [{
    fieldLabel: 'To',
    labelWidth: 150,
    bind: '{selection.messageFrom}'
  }, {
    xtype: 'textfield',
    width: 580,
    fieldLabel: 'Subject',
    bind: 'Re: {selection.messageSubject}'
  }, {
    xtype: 'textareafield',
    fieldLabel: 'Original Message',
    width: 580,
    readOnly: true,
    scrollable: true,
    bind: '{selection.messageText}'
  }, {
    xtype: 'textareafield',
    reference: 'replyMessage',
    fieldLabel: 'Reply Message',
    width: 580,
    scrollable: true
  }],

  bbar: ['->', {
    text: 'Send',
    handler: 'onSendClick'
  }, {
    text: 'Cancel',
    handler: 'onCancelClick'
  }],

  initComponent: function () {
    var me = this;

    if (me.itemConfig.selectedRow) {
      me.getViewModel().data.selectedRow = me.itemConfig.selectedRow;
    }

    me.callParent();
  }
});