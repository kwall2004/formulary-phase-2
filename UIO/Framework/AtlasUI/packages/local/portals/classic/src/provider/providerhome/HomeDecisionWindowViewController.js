// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeDecisionWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.homedecisionwindow',

  init: function () {
    var vm = this.getViewModel(),
      selectedRow = vm.getData().selectedRow.getData();

    vm.set('selection', selectedRow);
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onViewPoCClick: function () {
    var vmData = this.getViewModel().getData(),
      homePoCWindow = new Atlas.portals.view.provider.providerhome.HomePOCWindow({
        itemConfig: {
          selectedRow: vmData.selectedRow.getData(),
          gridReference: vmData.gridReference
        }
      });

    homePoCWindow.show();
  },

  onOKClick: function () {
    var me = this,
      approveradio = this.lookup('approveradio').value,
      pocNoteProviderModel = Ext.create('Atlas.portals.provider.model.POCNoteProvider', {}),
      selectionData = this.getViewModel().getData().selection,
      recipientID = selectionData.recipientID,
      userName = Atlas.user.un + '|' + selectionData.dispGroup,
      pocStatus = selectionData.pocStatus,
      notes = this.lookup('comments').value,
      status = 'Not Approved';

    if (true === approveradio) {
      status = 'Approved';
    }

    if (false === approveradio && (null === notes || '' === notes)) {
      Ext.MessageBox.alert('Alert', 'Comments are required to reject a PoC');
    } else if (null !== pocStatus && !pocStatus.includes('Approved')) {
      pocNoteProviderModel.phantom = false;
      pocNoteProviderModel.getProxy().url = 'provider/hp/pocnoteproviderweb';
      pocNoteProviderModel.getProxy().setExtraParam('pRecipientID', recipientID);
      pocNoteProviderModel.getProxy().setExtraParam('pUserName', userName);
      pocNoteProviderModel.getProxy().setExtraParam('pStatus', status);
      pocNoteProviderModel.getProxy().setExtraParam('pNotes', notes);
      pocNoteProviderModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
      pocNoteProviderModel.save({
        success: function () {
          me.markMessage(approveradio);
        }
      });
    } else {
      Ext.MessageBox.alert('Alert', 'Could not complete action. PoC has already been either Approved or Rejected.');
    }
  },

  markMessage: function (approveradio) {
    var grid = this.getViewModel().getData().gridReference,
      me = this,
      selection = grid.getView().getSelectionModel().getSelection()[0],
      selectionData = selection.getData(),
      messagesStatusModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {}),
      messageObject = {
        'createDate': selectionData.createDate,
        'createDateTime': selectionData.createDateTime,
        'createTime': selectionData.createTime,
        'recipientID': selectionData.recipientID,
        'parentSystemID': selectionData.parentSystemID,
        'systemID': selectionData.systemID,
        'messageType': selectionData.messageType,
        'messageFrom': selectionData.messageTo,
        'messageSubject': selectionData.messageSubject,
        'messageTo': selectionData.messageFrom,
        'messageText': selectionData.messageText,
        'taskFlag': selectionData.taskFlag,
        'taskFollowUpDate': selectionData.taskFollowUpDate,
        'messageReadDate': null,
        'actionTaken': selectionData.actionTaken,
        'createUser': selectionData.createUser,
        'messageReadDateTime': selectionData.messageReadDateTime,
        'messageReadTime': selectionData.messageReadTime,
        'messageReadUser': selectionData.messageReadUser,
        'dispGroup': selectionData.dispGroup,
        'messageAck': selectionData.messageAck,
        'dispType': selectionData.dispType,
        'isVisible': selectionData.isVisible,
        'dispProv': selectionData.dispProv,
        'dbRowID': selectionData.dbRowID,
        'rowNum': selectionData.rowNum
      };

    messagesStatusModel.phantom = false;
    messagesStatusModel.getProxy().url = 'provider/hp/coordcaremessage';
    messagesStatusModel.getProxy().setExtraParam('pStatus', true);
    messagesStatusModel.getProxy().setExtraParam('TT1', messageObject);
    messagesStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    messagesStatusModel.save({
      success: function () {
        if (false === approveradio) {
          Ext.MessageBox.alert('Rejection', 'PoC has been rejected.');
        } else {
          Ext.MessageBox.alert('Approval', 'PoC has been approved.');
        }

        me.getView().destroy();
      }
    });
  }
});