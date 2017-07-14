// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeReplyWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.homereplywindow',

  init: function () {
    var vm = this.getViewModel(),
      selectedRow = vm.getData().selectedRow.getData();

    vm.set('selection', selectedRow);
  },

  onSendClick: function () {
    var me = this,
      selectionData = this.getViewModel().getData().selectedRow.getData(),
      replyMessage = this.lookup('replyMessage').value,
      messagesStatusModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {}),
      messageObject = {
        'createDate': selectionData.createDate,
        'createDateTime': selectionData.createDateTime,
        'createTime': 0,
        'recipientID': selectionData.recipientID,
        'parentSystemID': selectionData.parentSystemID,
        'systemID': 0,
        'messageType': 'Sent',
        'messageFrom': selectionData.messageTo,
        'messageSubject': 'Re: ' + selectionData.messageSubject,
        'messageTo': selectionData.messageFrom,
        'messageText': replyMessage + '\n\n ---------- ORIGINAL MESSAGE ---------- \n\n' + selectionData.messageText,
        'taskFlag': selectionData.taskFlag,
        'taskFollowUpDate': '',
        'messageReadDate': '',
        'actionTaken': '',
        'createUser': selectionData.createUser,
        'messageReadDateTime': selectionData.messageReadDateTime,
        'messageReadTime': selectionData.messageReadTime,
        'messageReadUser': selectionData.messageReadUser,
        'dispGroup': 'Prov',
        'messageAck': true,
        'dispType': 'Message',
        'isVisible': selectionData.isVisible,
        'dispProv': selectionData.dispProv,
        'dbRowID': '',
        'rowNum': selectionData.rowNum
      };

    messagesStatusModel.phantom = false;
    messagesStatusModel.getProxy().url = 'provider/hp/coordcaremessage';
    messagesStatusModel.getProxy().setExtraParam('pStatus', true);
    messagesStatusModel.getProxy().setExtraParam('TT1', messageObject);
    messagesStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    messagesStatusModel.save({
      success: function () {
        Ext.MessageBox.alert('Send Confirmation', 'Your message has been sent!');
        me.getView().destroy();
      },
      failure: function () {
        Ext.MessageBox.alert('Send Failed', 'Something went wrong. Please try again.');
        me.getView().destroy();
      }
    });
  },

  onCancelClick: function () {
    this.getView().destroy();
  }
});