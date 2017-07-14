// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeMessageWindow', {
  extend: 'Ext.window.Window',
  xtype: 'provider-homemessagewindow',
  viewModel: 'homemessagewindow',
  controller: 'homemessagewindow',
  title: 'Message',
  modal: true,
  width: 500,
  height: 290,

  defaults: {
    xtype: 'displayfield',
    labelWidth: 85
  },

  items: [{
    fieldLabel: 'Date',
    bind: '{selection.createDate}'
  }, {
    fieldLabel: 'From',
    bind: '{selection.messageFrom}'
  }, {
    fieldLabel: 'Subject',
    bind: '{selection.messageSubject}'
  }, {
    fieldLabel: 'Message'
  }, {
    xtype: 'textareafield',
    width: 482,
    readOnly: true,
    scrollable: true,
    bind: '{selection.messageText}'
  }],

  bbar: ['->', {
    text: 'All Messages for this Member',
    handler: 'onAllMessagesView'
  }, {
    text: 'Reply',
    handler: 'onReplyClick'
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