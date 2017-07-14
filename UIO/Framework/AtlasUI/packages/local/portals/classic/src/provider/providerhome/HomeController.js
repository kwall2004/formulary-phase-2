// k3279 - Kevin Tabasan - 12/01/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.providerhome',

  init: function () {
    this.stateCheck();
    this.loadInitialMessages();
    this.loadInitialNotifications();
    this.getViewModel().set('readStatusNotification', 'false');
    this.getViewModel().set('batch', []);
    this.loadMemberPlanStore();
  },

  stateCheck: function () {
    var vm = this.getViewModel(),
      state = Atlas.user.providerStateSelected,
      miProviderFieldset = this.lookup('miProviderFieldSet'),
      miEligibilityFieldset = this.lookup('miEligibilityFieldSet'),
      miInquiryRadioGroupTop = this.lookup('miInquiryRadioGroupTop'),
      miInquiryRadioGroupBottom = this.lookup('miInquiryRadioGroupBottom'),
      miMemberPlanCombo = this.lookup('miMemberPlanCombo'),
      ilInquiryText = this.lookup('ilInquiryText'),
      outputScreen = this.lookup('outputToScreen'),
      outputPDF = this.lookup('outputToPDF'),
      grid = this.lookup('batchGrid');

    if ('MI' === state) {
      miProviderFieldset.setHidden(false);
      miEligibilityFieldset.setHidden(false);
      miInquiryRadioGroupTop.setHidden(false);
      miInquiryRadioGroupBottom.setHidden(false);
      miMemberPlanCombo.setHidden(false);
      ilInquiryText.setHidden(true);
      outputScreen.setValue(true);
      outputPDF.setValue(false);
      grid.columns[4].setHidden(true);
      vm.set('inquiryName', 'Recipient ID/Name');
    } else if ('IL' === state) {
      miProviderFieldset.setHidden(true);
      miEligibilityFieldset.setHidden(true);
      miInquiryRadioGroupTop.setHidden(true);
      miInquiryRadioGroupBottom.setHidden(true);
      miMemberPlanCombo.setHidden(true);
      ilInquiryText.setHidden(false);
      outputScreen.setValue(false);
      outputPDF.setValue(true);
      grid.columns[0].setHidden(true);
      grid.columns[2].setHidden(true);
      grid.columns[3].setHidden(true);
      this.lookup('batchGrid').setHidden(false);
      vm.set('inquiryName', 'Member ID');
    }
  },

  loadInitialNotifications: function () {
    var me = this,
      homeStore = this.getViewModel().getStore('notifications');

    homeStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    homeStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    homeStore.load({
      callback: function (record) {
        var unread = 0,
          i = 0;

        if (null !== record) {
          for (i = 0; i < record.length; i++) {
            if ('false' === record[i].getData().read) {
              unread += 1;
            }
          }
        }

        me.getViewModel().set('unreadNotifications', unread);
      }
    });
  },

  loadInitialMessages: function () {
    var me = this,
      providerListStore = this.getViewModel().getStore('providerList'),
      cocSearchParam = ' taskFlag = false ',
      cocMessagesStore = this.getViewModel().getStore('coc'),
      cocProviderIds = null;

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load({
      callback: function (record) {
        var i = 0;

        if (null !== record) {
          for (i = 0; i < record.length; i++) {
            cocProviderIds += ',' + record[i].getData().provID;
          }

          cocProviderIds = cocProviderIds.substring(5);

          cocSearchParam = cocSearchParam + ' AND messageReadDate=? AND LOOKUP(trim(messageTo),\'' + cocProviderIds +
            '\')>0';

          cocMessagesStore.getProxy().setExtraParam('pWhere', cocSearchParam);
          cocMessagesStore.load({
            callback: function (messageRecord) {
              var unread = 0,
                j = 0,
                currentUser = null;

              if (messageRecord[0] !== undefined) {
                currentUser = messageRecord[0].getData().messageTo;
              }

              for (j = 0; j < messageRecord.length; j++) {
                if (null === messageRecord[j].getData().messageReadDate) {
                  unread += 1;
                }
              }

              me.getViewModel().set('currentUser', currentUser);
              me.getViewModel().set('unreadMessages', unread);
            }
          });
        }
      }
    });
  },

  loadMemberPlanStore: function () {
    var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
      serviceStore = {},
      serviceCombo = this.lookupReference('miMemberPlanCombo');

    listItemsModel.getProxy().setExtraParam('pListName', 'ProvPortalPlanLOB');
    listItemsModel.load({
      callback: function (record, operation) {
        var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
          servicesMap = [],
          splitValues = [],
          i = 0;

        if (!results) {
          return;
        }

        splitValues = results.split('^');

        for (i = 0; i < splitValues.length; i++) {
          servicesMap.push({
            key: splitValues[i],
            value: splitValues[i + 1]
          });

          i += 1;
        }

        serviceStore = new Ext.data.ArrayStore({});
        serviceStore.add(servicesMap);
        serviceStore.sort('value', 'ASC');
        serviceCombo.setStore(serviceStore);
      }
    });
  },

  onMemberIDBlur: function () {
    var me = this,
      memberIdStore = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {});

    memberIdStore.getProxy().setExtraParam('pFunction', 'fGetAllIDForEligibility');
    memberIdStore.getProxy().setExtraParam('pPlanId', '');
    memberIdStore.getProxy().setExtraParam('pLobID', '');
    memberIdStore.getProxy().setExtraParam('pMemberID', this.lookupReference('memberIdRef').getValue());
    memberIdStore.getProxy().setExtraParam('pRecipientID', '');
    memberIdStore.getProxy().setExtraParam('pMemberDOB', '');
    memberIdStore.getProxy().setExtraParam('pPortalPlan', '');
    memberIdStore.getProxy().setExtraParam('pPortalType', 'Provider');
    memberIdStore.load({
      callback: function (records) {
        var response = '';

        if (!records && !records.length) {
          Ext.Msg.alert('Error', 'There was an error searching for this member.');

          return;
        }

        response = records.data.value;

        if (0 < response.indexOf('Duplicate')) {
          me.lookupReference('miMemberPlanCombo').setDisabled(false);

          return;
        }

        me.lookupReference('miMemberPlanCombo').setDisabled(true);
        me.lookupReference('miMemberPlanCombo').setValue('');
      }
    });
  },

  onProviderComboSelect: function () {
    var comboValue = this.lookup('cocCombo').value,
      comboItems = this.lookup('providersCombo').valueCollection.items[0],
      comboRecord = null,
      cocMessagesStore = this.getViewModel().getStore('coc'),
      cocGridStore = this.lookup('cocGrid').getStore(),
      providerListStore = this.getViewModel().getStore('providerList');

    this.lookup('cocSearchBox').setValue('');

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load({
      callback: function (record) {
        var cocProviderIds = null,
          searchParam = null,
          provIDsToSend = null,
          i = 0;

        if (null !== record) {
          if (comboItems === undefined) {
            comboRecord = {
              'fullName': 'All Providers Within This Group',
              'provID': '0'
            };
          } else {
            comboRecord = comboItems.data;
          }

          for (i = 0; i < record.length; i++) {
            cocProviderIds += ',' + record[i].getData().provID;
          }

          cocProviderIds = cocProviderIds.substring(5);
          cocGridStore.clearFilter();

          if ('All Providers Within This Group' === comboRecord.fullName) {
            provIDsToSend = cocProviderIds;
          } else {
            provIDsToSend = comboRecord.provID;
          }

          if ('All' === comboValue) {
            searchParam = ' taskFlag = false  AND (LOOKUP(trim(messageTo),\'' + provIDsToSend +
            '\')>0 OR LOOKUP(trim(messageFrom),\'' + provIDsToSend + '\')>0 )';
          } else if ('Unread' === comboValue) {
            searchParam = ' taskFlag = false  AND messageReadDate=? AND LOOKUP(trim(messageTo),\'' + provIDsToSend +
            '\')>0';
          } else if ('Read' === comboValue) {
            searchParam = ' taskFlag = false  AND messageReadDate<>? AND LOOKUP(trim(messageTo),\'' + provIDsToSend +
            '\')>0';
          } else if ('Sent' === comboValue) {
            searchParam = ' taskFlag = false  AND LOOKUP(trim(messageFrom),\'' + provIDsToSend + '\')>0';
          }

          cocMessagesStore.getProxy().setExtraParam('pWhere', searchParam);
          cocMessagesStore.load();
        }
      }
    });
  },

  onNotificationComboSelect: function () {
    var vm = this.getViewModel(),
      me = this,
      comboValue = this.lookup('notificationCombo').value,
      homeStore = vm.getStore('notifications'),
      notificationMessages = vm.getStore('notificationMessages');

    this.lookup('notificationSearchBox').setValue('');
    this.lookup('notificationGrid').getStore().clearFilter();

    homeStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    homeStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    homeStore.load({
      callback: function (record) {
        if ('All' === comboValue) {
          notificationMessages.getProxy().setData(null);
          notificationMessages.getProxy().setData(record);
          notificationMessages.reload();
        } else if ('Unread' === comboValue) {
          me.getViewModel().set('readStatusNotification', 'false');
          me.onNotificationMessagesLoad(homeStore, record);
        } else if ('Read' === comboValue) {
          me.getViewModel().set('readStatusNotification', 'true');
          me.onNotificationMessagesLoad(homeStore, record);
        }
      }
    });
  },

  onCOCRowDoubleClick: function () {
    var grid = this.lookup('cocGrid'),
      selection = grid.getView().getSelectionModel().getSelection()[0],
      pocStatus = selection.getData().pocStatus,
      homeDecisionWindow = new Atlas.portals.view.provider.providerhome.HomeDecisionWindow({
        itemConfig: {
          selectedRow: selection,
          gridReference: grid
        }
      }),
      homeMessageWindow = new Atlas.portals.view.provider.providerhome.HomeMessageWindow({
        itemConfig: {
          selectedRow: selection
        }
      });

    if (null !== pocStatus && '' !== pocStatus) {
      if (0 === pocStatus.indexOf('Approved')) {
        Ext.MessageBox.alert('Approved', 'This PoC Status is already approved.');
      } else {
        homeDecisionWindow.show();
      }
    } else {
      if (null === selection.getData().messageReadDate) {
        this.markMessage(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
      }

      homeMessageWindow.show();
    }
  },

  onNotificationMessagesLoad: function (store, record) {
    var vm = this.getViewModel(),
      newRecord = [],
      newRecordCount = 0,
      notificationMessages = vm.getStore('notificationMessages'),
      i = 0;

    if (null !== record) {
      for (i = 0; i < record.length; i++) {
        if (record[i].getData().read === vm.get('readStatusNotification')) {
          newRecord[newRecordCount] = record[i];
          newRecordCount += 1;
        }
      }
    }

    notificationMessages.getProxy().setData(null);
    notificationMessages.getProxy().setData(newRecord);
    notificationMessages.reload();
  },

  onAddToBatchClick: function () {
    var vm = this.getViewModel(),
      memberDataStore = vm.getStore('memberData'),
      radioValue = this.lookup('memberIDRadio').value,
      memberIDForm = this.lookup('memberField'),
      memberPlanCombo = this.lookup('miMemberPlanCombo'),
      nameForm = this.lookup('nameField'),
      nameFieldSetValues = this.lookup('nameField').getValues(),
      dobValue = nameForm.items.items[2].getValue(),
      ssnValue = nameForm.items.items[3].getValue(),
      batchStore = vm.getStore('batchList'),
      batchList = vm.get('batch'),
      grid = this.lookup('batchGrid'),
      portalMembersStore = vm.getStore('portalFuncs'),
      memberIdStore = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {});

    if (true === radioValue && memberPlanCombo.isDisabled()) {
      if (memberIDForm.isValid()) {
        portalMembersStore.getProxy().setExtraParam('pFunction', 'fGetAllIDForEligibility');
        portalMembersStore.getProxy().setExtraParam('pPlanId', null);
        portalMembersStore.getProxy().setExtraParam('pLobID', null);
        portalMembersStore.getProxy().setExtraParam('pRecipientID', null);
        portalMembersStore.getProxy().setExtraParam('pMemberID', memberIDForm.getValues().memberID);
        portalMembersStore.getProxy().setExtraParam('pMemberDOB', null);
        portalMembersStore.getProxy().setExtraParam('pPortalPlan', null);
        portalMembersStore.getProxy().setExtraParam('pPortalType', 'Provider');
        portalMembersStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        portalMembersStore.load({
          callback: function (record) {
            if (0 === record[0].getData().value.toLowerCase().indexOf('error')) {
              Ext.MessageBox.alert('Error', 'Member Not Found.');
            } else {
              if ('IL' === Atlas.user.providerStateSelected) {
                memberDataStore.getProxy().setExtraParam('pRecipientID', record[0].getData().value);
                memberDataStore.getProxy().setExtraParam('pFieldList', '@primaryLOB');
                memberDataStore.getProxy().setExtraParam('pAppServerID', '');
                memberDataStore.getProxy().setExtraParam('portalPlan', '');
                memberDataStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
                memberDataStore.load({
                  callback: function (memberDataRecord) {
                    batchList.push({
                      'memberID': memberIDForm.getValues().memberID,
                      'lob': memberDataRecord[0].get('@primaryLOB')
                    });

                    vm.set('batch', batchList);

                    batchStore.getProxy().setData(null);
                    batchStore.getProxy().setData(batchList);
                    batchStore.reload({
                      callback: function () {
                        memberIDForm.reset();
                      }
                    });
                  }
                });

                return;
              }
              batchList.push({
                'memberID': memberIDForm.getValues().memberID
              });

              vm.set('batch', batchList);

              batchStore.getProxy().setData(null);
              batchStore.getProxy().setData(batchList);
              batchStore.reload({
                callback: function () {
                  grid.setHidden(false);
                  memberIDForm.reset();
                }
              });
            }
          }
        });
      } else {
        Ext.MessageBox.alert('Validation Error', 'Please input a Member ID first.');
      }

      return;
    } else if (true === radioValue && !memberPlanCombo.isDisabled()) {
      if (null === memberPlanCombo.value) {
        Ext.MessageBox.alert('Validation Error', 'Please select a plan for this member.');
      } else {
        Ext.MessageBox.show({
          title: 'Adding To Batch',
          msg: 'Please Wait...',
          closable: false
        });

        memberIdStore.getProxy().setExtraParam('pFunction', 'fGetAllIDForEligibility');
        memberIdStore.getProxy().setExtraParam('pPlanId', '');
        memberIdStore.getProxy().setExtraParam('pLobID', '');
        memberIdStore.getProxy().setExtraParam('pMemberID', this.lookupReference('memberIdRef').getValue());
        memberIdStore.getProxy().setExtraParam('pRecipientID', '');
        memberIdStore.getProxy().setExtraParam('pMemberDOB', '');
        memberIdStore.getProxy().setExtraParam('pPortalPlan', memberPlanCombo.value);
        memberIdStore.getProxy().setExtraParam('pPortalType', 'Provider');
        memberIdStore.load({
          callback: function (record, operation) {
            var obj = Ext.decode(operation.getResponse().responseText),
              objData = obj.data[1];

            if (objData === undefined) {
              Ext.MessageBox.alert('Error', 'Member ID not associated with this plan.');

              return;
            }

            memberDataStore.getProxy().setExtraParam('pRecipientID', objData.value);
            memberDataStore.getProxy().setExtraParam('pFieldList', 'recipientID, lastName, firstName, birthDate,' +
            'socSecNum');
            memberDataStore.getProxy().setExtraParam('pAppServerID', '');
            memberDataStore.getProxy().setExtraParam('portalPlan', '');
            memberDataStore.load({
              callback: function (memberRecord) {
                var dupMemberValues = memberRecord[0];

                batchList.push({
                  'firstName': dupMemberValues.get(' firstName'),
                  'lastName': dupMemberValues.get(' lastName'),
                  'dob': dupMemberValues.get(' birthDate'),
                  'ssn': dupMemberValues.get(' socSecNum')
                });

                vm.set('batch', batchList);

                batchStore.getProxy().setData(null);
                batchStore.getProxy().setData(batchList);
                batchStore.reload({
                  callback: function () {
                    grid.setHidden(false);
                    memberIDForm.reset();
                  }
                });

                Ext.MessageBox.hide();
              }
            });
          }
        });
      }

      return;
    }

    if (nameForm.isValid()) {
      if (null === dobValue && '' === ssnValue) {
        Ext.MessageBox.alert('Validation Error', 'Please enter a Birth Date or a Social Security Number.');

        return;
      }

      batchList.push({
        'firstName': nameFieldSetValues.firstName,
        'lastName': nameFieldSetValues.lastName,
        'dob': nameFieldSetValues.dob,
        'ssn': nameFieldSetValues.ssn
      });

      vm.set('batch', batchList);

      batchStore.getProxy().setData(null);
      batchStore.getProxy().setData(batchList);
      batchStore.reload({
        callback: function () {
          grid.setHidden(false);
          nameForm.reset();
        }
      });
    } else {
      Ext.MessageBox.alert('Validation Error', 'Please fill out the required fields.');
    }
  },

  onBatchRowDoubleClick: function (one, record) {
    var vm = this.getViewModel(),
      grid = this.lookup('batchGrid'),
      batchStore = vm.getStore('batchList'),
      batchList = [],
      batchData = null,
      i = 0;

    Ext.MessageBox.show({
      title: 'Delete Confirmation',
      msg: 'Are you sure you want to delete this record?',
      buttons: Ext.MessageBox.YESNO,
      fn: function (btn) {
        if ('yes' === btn) {
          batchStore.remove(record);

          for (i = 0; i < batchStore.getData().items.length; i++) {
            batchData = batchStore.getData().items[i].getData();

            batchList.push({
              'memberID': batchData.memberID,
              'lastName': batchData.lastName,
              'firstName': batchData.firstName,
              'dob': batchData.dob,
              'ssn': batchData.ssn
            });
          }

          batchStore.getProxy().setData(null);
          batchStore.getProxy().setData(batchList);
          batchStore.reload();

          vm.set('batch', batchList);

          if (0 === batchStore.getData().items.length) {
            if ('MI' === Atlas.user.providerStateSelected) {
              grid.setHidden(true);
            }
          }
        }
      }
    });
  },

  onClearBatchList: function () {
    var batchStore = this.getViewModel().getStore('batchList');

    batchStore.getProxy().setData(null);
    batchStore.load();
    this.getViewModel().set('batch', []);

    if ('MI' === Atlas.user.providerStateSelected) {
      this.lookup('batchGrid').setHidden(true);
    }
  },

  onMessageReplyClick: function () {
    var selection = this.lookup('cocGrid').getView().getSelectionModel().getSelection()[0],
      pocStatus = selection.getData().pocStatus,
      homeReplyWindow = new Atlas.portals.view.provider.providerhome.HomeReplyWindow({
        itemConfig: {
          selectedRow: selection
        }
      });

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a Message first.');

      return;
    }

    if (null !== pocStatus && '' === pocStatus) {
      homeReplyWindow.show();
    } else {
      Ext.MessageBox.alert('Error', 'You cannot reply to a PoC Review. Please select a CoC message to send a reply.');
    }
  },

  onRefreshMessagesClick: function () {
    this.onProviderComboSelect();
  },

  onMarkMessageClick: function () {
    var selection = this.lookup('cocGrid').getView().getSelectionModel().getSelection()[0];

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a Message first.');

      return;
    }

    if (null === selection.getData().messageReadDate) {
      this.markMessage(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    } else {
      this.markMessage(null);
    }
  },

  markMessage: function (currentDate) {
    var me = this,
      selection = this.lookup('cocGrid').getView().getSelectionModel().getSelection()[0],
      selectionData = selection.getData(),
      messagesStatusModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {}),
      unreadNumber = this.getViewModel().get('unreadMessages'),
      messageObject = {
        'createDate': selectionData.createDate,
        'createDateTime': selectionData.createDateTime,
        'createTime': selectionData.createTime,
        'recipientID': selectionData.recipientID,
        'parentSystemID': selectionData.parentSystemID,
        'systemID': selectionData.systemID,
        'messageType': selectionData.messageType,
        'messageFrom': selectionData.messageFrom,
        'messageSubject': selectionData.messageSubject,
        'messageTo': selectionData.messageTo,
        'messageText': selectionData.messageText,
        'taskFlag': selectionData.taskFlag,
        'taskFollowUpDate': selectionData.taskFollowUpDate,
        'messageReadDate': currentDate,
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
        var selectedUser = selectionData.messageFrom,
          currentUser = me.getViewModel().get('currentUser');

        if (null === currentDate) {
          selection.set('messageReadDate', null);
          if (selectedUser !== currentUser) {
            me.getViewModel().set('unreadMessages', unreadNumber + 1);
          }
        } else {
          selection.set('messageReadDate', currentDate);
          if (selectedUser !== currentUser) {
            me.getViewModel().set('unreadMessages', unreadNumber - 1);
          }
        }
      }
    });
  },

  onMessageSearchClick: function () {
    var grid = this.lookup('cocGrid'),
      searchbox = this.lookup('cocSearchBox');

    if (searchbox.value) {
      this.subjectFilter = grid.getStore().getFilters().add({
        id: 'messageFilter',
        property: 'messageSubject',
        value: searchbox.value,
        anyMatch: true,
        caseSensitive: false
      });
    } else if (this.subjectFilter) {
      grid.getStore().clearFilter();
      this.subjectFilter = null;
    }
  },

  onEnterMessagePress: function (field, event) {
    if (event.getKey() === event.ENTER) {
      this.onMessageSearchClick();
    }
  },

  onRefreshNotificationClick: function () {
    this.onNotificationComboSelect();
  },

  onPrintNotificationClick: function () {
    var selection = this.lookup('notificationGrid').getView().getSelectionModel().getSelection()[0],
      outputType = null;

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a Notification first.');
    } else {
      if ('Provider Hedis Report' === selection.getData().subject) {
        outputType = 'xls';
      } else {
        outputType = 'pdf';
      }

      this.displayReportFile(null, null, 3, outputType, selection.getData().jobNum);
    }
  },

  onDeleteNotificationClick: function () {
    var me = this,
      grid = this.lookup('notificationGrid'),
      selection = grid.getView().getSelectionModel().getSelection()[0],
      notificationDeleteModel = Ext.create('Atlas.portals.provider.model.DeleteNotification', {});

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a Notification first.');
    } else {
      Ext.MessageBox.show({
        title: 'Delete Confirmation',
        msg: 'Are you sure you want to delete this record?',
        buttons: Ext.MessageBox.YESNO,
        fn: function (btn) {
          if ('yes' === btn) {
            notificationDeleteModel.phantom = false;
            notificationDeleteModel.getProxy().url = 'provider/hp/delmessages';
            notificationDeleteModel.getProxy().setExtraParam('pMessageID', selection.getData().messageID);
            notificationDeleteModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
            notificationDeleteModel.save({
              success: function () {
                if ('false' === selection.getData().read) {
                  me.getViewModel().set('unreadNotifications', me.getViewModel().get('unreadNotifications') - 1);
                }
                grid.getStore().remove(grid.getView().getSelectionModel().getSelection());
              }
            });
          }
        }
      });
    }
  },

  onCollapseNotificationRow: function (rowNode, record) {
    var unreadNumber = this.getViewModel().get('unreadNotifications') - 1;

    if ('false' === record.getData().read) {
      this.markNotification(record, unreadNumber, 'true');
    }
  },

  markNotification: function (record, unreadNumber, status) {
    var me = this,
      notificationStatusModel = Ext.create('Atlas.portals.provider.model.NotificationStatus', {});

    notificationStatusModel.phantom = false;
    notificationStatusModel.getProxy().url = 'provider/hp/messagedata';
    notificationStatusModel.getProxy().setExtraParam('pMessageID', record.getData().messageID);
    notificationStatusModel.getProxy().setExtraParam('pFieldList', 'read');
    notificationStatusModel.getProxy().setExtraParam('pFields', status);
    notificationStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    notificationStatusModel.save({
      success: function () {
        record.set('read', status);
        me.getViewModel().set('unreadNotifications', unreadNumber);
      }
    });
  },

  onMarkNotificationClick: function () {
    var selection = this.lookup('notificationGrid').getView().getSelectionModel().getSelection()[0],
      status = selection.getData().read,
      unread = this.getViewModel().get('unreadNotifications');

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a record first.');

      return;
    }

    if ('true' === status) {
      this.markNotification(selection, unread + 1, 'false');
    } else if ('false' === status) {
      this.markNotification(selection, unread - 1, 'true');
    }
  },

  onNotificationSearchClick: function () {
    var grid = this.lookup('notificationGrid'),
      searchbox = this.lookup('notificationSearchBox');

    if (searchbox.value) {
      this.subjectFilter = grid.getStore().getFilters().add({
        id: 'notificationFilter',
        property: 'subject',
        value: searchbox.value,
        anyMatch: true,
        caseSensitive: false
      });
    } else if (this.subjectFilter) {
      grid.getStore().clearFilter();
      this.subjectFilter = null;
    }
  },

  onEnterNotificationPress: function (field, event) {
    if (event.getKey() === event.ENTER) {
      this.onNotificationSearchClick();
    }
  },

  champsServerDownCheck: function () {
    var serverDownStore = Ext.create('Atlas.common.model.HoldPayment', {});

    serverDownStore.getProxy().setExtraParam('pKeyName', 'MPHIServerDown');
    serverDownStore.load({
      callback: function (record) {
        if ('yes' === record.data.value && 'MI' === Atlas.user.providerStateSelected) {
          return true;
        }

        return false;
      }
    });
  },

  onSubmitEligibilityInquiryClick: function () {
    var me = this,
      gridSelection = this.lookup('batchGrid').getSelectionModel().selected.items[0],
      batchStore = this.getViewModel().getStore('batchList'),
      batchStoreLength = batchStore.getData().items.length,
      batchItems = batchStore.getData().items,
      gridSelectionArray = [],
      outputRadio = this.lookup('outputToPDF').value,
      startDateFull = this.lookup('startDate').value,
      radioValue = this.lookup('memberIDRadio').value,
      endDateFull = this.lookup('endDate').value,
      nameForm = this.lookup('nameField'),
      nameFieldSetValues = nameForm.getValues(),
      dobValue = nameForm.items.items[2].getValue(),
      ssnValue = nameForm.items.items[3].getValue(),
      memberID = this.lookup('memberField').getValues().memberID,
      memberIdStore = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {}),
      memberDataStore = this.getViewModel().getStore('memberData'),
      memberPlanCombo = this.lookup('miMemberPlanCombo'),
      state = Atlas.user.providerStateSelected,
      startDate = startDateFull.getMonth() + 1 + '/' + startDateFull.getDate() + '/' + startDateFull.getFullYear(),
      endDate = endDateFull.getMonth() + 1 + '/' + endDateFull.getDate() + '/' + endDateFull.getFullYear();

    if (this.champsServerDownCheck()) {
      Ext.MessageBox.alert('Request Failed', 'The CHAMPS eligibility server is currently not available. Please' +
        'try again later.');
    } else {
      Ext.MessageBox.show({
        title: 'Request Submitted',
        msg: 'Please Wait...',
        closable: false
      });

      if (0 < batchStoreLength) {
        if (gridSelection === undefined) {
          if ('MI' === state) {
            me.submitEligibilityInquiry(batchItems, startDate, endDate);
          } else if ('IL' === state) {
            me.displayInfo(batchStore.data.items[0].data.memberID, outputRadio, startDate, endDate);
          }
        } else if ('MI' === state) {
          gridSelectionArray.push({
            data: {
              memberID: gridSelection.data.memberID,
              lastName: gridSelection.data.lastName,
              firstName: gridSelection.data.firstName,
              dob: gridSelection.data.dob,
              ssn: gridSelection.data.ssn
            }
          }, {
            data: {
              memberID: gridSelection.data.memberID,
              lastName: gridSelection.data.lastName,
              firstName: gridSelection.data.firstName,
              dob: gridSelection.data.dob,
              ssn: gridSelection.data.ssn
            }
          });

          me.submitEligibilityInquiry(gridSelectionArray, startDate, endDate);
        } else if ('IL' === state) {
          me.displayInfo(gridSelection.data.memberID, outputRadio, startDate, endDate);
        }
      } else if (0 === batchStoreLength) {
        if (true === radioValue) {
          if (memberPlanCombo.isDisabled()) {
            if ('MI' === state) {
              me.displayInfo(memberID, outputRadio, startDate, endDate);
            } else {
              Ext.MessageBox.alert('Validation Error', 'Please add the Member ID to the batch.');
            }
          } else if (null === memberPlanCombo.value) {
            Ext.MessageBox.alert('Validation Error', 'Please select a plan for this member.');
          } else {
            memberIdStore.getProxy().setExtraParam('pFunction', 'fGetAllID');
            memberIdStore.getProxy().setExtraParam('pPlanId', '');
            memberIdStore.getProxy().setExtraParam('pLobID', '');
            memberIdStore.getProxy().setExtraParam('pMemberID', me.lookupReference('memberIdRef').getValue());
            memberIdStore.getProxy().setExtraParam('pRecipientID', '');
            memberIdStore.getProxy().setExtraParam('pMemberDOB', '');
            memberIdStore.getProxy().setExtraParam('pPortalPlan', memberPlanCombo.value);
            memberIdStore.getProxy().setExtraParam('pPortalType', 'Provider');
            memberIdStore.load({
              callback: function (memberIdRecord, operation) {
                var obj = Ext.decode(operation.getResponse().responseText),
                  objData = obj.data[1];

                if (objData === undefined) {
                  Ext.MessageBox.alert('Error', 'Member ID not associated with this plan.');

                  return;
                }

                memberDataStore.getProxy().setExtraParam('pRecipientID', objData.value);
                memberDataStore.getProxy().setExtraParam('pFieldList', 'recipientID, lastName, firstName,' +
                  'birthDate, socSecNum');
                memberDataStore.getProxy().setExtraParam('pAppServerID', '');
                memberDataStore.getProxy().setExtraParam('portalPlan', '');
                memberDataStore.load({
                  callback: function (memberDataRecord) {
                    var dupMemberValues = memberDataRecord[0],
                      dupMemberArray = [];

                    dupMemberArray.push({
                      'data': {
                        'firstName': dupMemberValues.get(' firstName'),
                        'lastName': dupMemberValues.get(' lastName'),
                        'dob': dupMemberValues.get(' birthDate'),
                        'ssn': dupMemberValues.get(' socSecNum')
                      }
                    });

                    me.submitEligibilityInquiry(dupMemberArray, startDate, endDate);
                  }
                });
              }
            });
          }
        } else {
          if (!nameForm.isValid()) {
            Ext.MessageBox.alert('Validation Error', 'Please fill out the required fields.');

            return;
          }

          if (null === dobValue && '' === ssnValue) {
            Ext.MessageBox.alert('Validation Error', 'Please enter a Birth Date or a Social Security Number.');

            return;
          }

          gridSelectionArray.push({
            data: {
              'memberID': '',
              'firstName': nameFieldSetValues.firstName,
              'lastName': nameFieldSetValues.lastName,
              'dob': nameFieldSetValues.dob,
              'ssn': nameFieldSetValues.ssn
            }
          });

          me.submitEligibilityInquiry(gridSelectionArray, startDate, endDate);
        }
      }
    }
  },

  submitEligibilityInquiry: function (batchItems, startDate, endDate) {
    var npiInput = this.lookup('npiField').value,
      batchItemData = batchItems[0].data,
      memberID = batchItemData.memberID ? batchItemData.memberID : '',
      firstName = batchItemData.firstName ? batchItemData.firstName : '',
      lastName = batchItemData.lastName ? batchItemData.lastName : '',
      dob = batchItemData.dob ? batchItemData.dob : '',
      ssn = batchItemData.ssn ? batchItemData.ssn : '',
      npiNum = '174151587',
      inputString = 'D00111|HPM|' + memberID + '|' + startDate + '|' + endDate + '|' + lastName + '|' + firstName +
        '|' + dob + '|' + ssn + '|' + npiNum + '|' + Atlas.user.memberId + '|0';

    if (false === this.lookup('providerRadio').value) {
      if (this.lookup('npiForm').isValid()) {
        npiNum = npiInput;
      } else {
        Ext.MessageBox.alert('Validation Error', 'NPI or Medicaid ID is required.');

        return;
      }
    }

    Ext.MessageBox.show({
      title: 'Request Submitted',
      msg: 'Please Wait...',
      closable: false
    });

    if (1 === batchItems.length) {
      this.submitSingleBatchItem(inputString, memberID);
    } else if (0 < batchItems.length) {
      this.submitMultipleBatchItems(batchItems, npiNum);
    } else {
      Ext.MessageBox.hide();
    }
  },

  submitSingleBatchItem: function (inputString, memberID) {
    var me = this,
      state = Atlas.user.providerStateSelected,
      eligibilityInquiryWebModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {});

    eligibilityInquiryWebModel.phantom = false;
    eligibilityInquiryWebModel.getProxy().url = 'eligibility/hp/make004010x092a1web';
    eligibilityInquiryWebModel.getProxy().setExtraParam('pparameters', inputString);
    eligibilityInquiryWebModel.getProxy().setExtraParam('userState', state);
    eligibilityInquiryWebModel.save({
      success: function (inquiryRecord, operation) {
        var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
          controlNum = metadata.p271ControlNum;

        if (true === me.lookup('outputToPDF').value) {
          if ('MI' === state) {
            me.displayReportFile('print271.p', controlNum, 2, 'pdf', 0);
          } else if ('IL' === state) {
            me.displayReportFile('printmhpeligibleforms.p', memberID + '|Medicaid', 2, 'pdf', 0);
          }
        } else {
          me.displayReportWeb(controlNum);
        }

        Ext.MessageBox.hide();
      }
    });
  },

  submitMultipleBatchItems: function (batchItems, npiNum) {
    var batchItemsData = null,
      TT1Array = [],
      TT1Object = {},
      startDateMultipleFormat = this.lookup('startDate').value,
      endDateMultipleFormat = this.lookup('endDate').value,
      eligibilityInquiriesWebModel = Ext.create('Atlas.portals.provider.model.Submit270Batch'),
      i = 0;

    for (i = 0; i < batchItems.length; i++) {
      batchItemsData = batchItems[0].data;

      TT1Array.push({
        'memberId': batchItemsData.memberID ? batchItemsData.memberID : '',
        'lastname': batchItemsData.lastName ? batchItemsData.lastName : '',
        'firstname': batchItemsData.firstName ? batchItemsData.firstName : '',
        'birthdate': Ext.Date.form(batchItemsData.dob, 'Y-m-d') ? batchItemsData.dob : '',
        'ssn': batchItemsData.ssn ? batchItemsData.ssn : '',
        'startdate': Ext.Date.format(startDateMultipleFormat, 'Y-m-d'),
        'enddate': Ext.Date.format(endDateMultipleFormat, 'Y-m-d'),
        'providerId': npiNum,
        'reqOrder': i + 1
      });
    }
    TT1Object = {
      'TT1': TT1Array
    };

    eligibilityInquiriesWebModel.phantom = false;
    eligibilityInquiriesWebModel.getProxy().url = 'eligibility/hp/submit270batch';
    eligibilityInquiriesWebModel.getProxy().setExtraParam('TT1', TT1Object);
    eligibilityInquiriesWebModel.getProxy().setExtraParam('pSubmitterId', 'D00111');
    eligibilityInquiriesWebModel.getProxy().setExtraParam('pPayerId', 'HPM');
    eligibilityInquiriesWebModel.getProxy().setExtraParam('cUserName', Atlas.user.un);
    eligibilityInquiriesWebModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    eligibilityInquiriesWebModel.save({
      success: function () {
        Ext.MessageBox.hide();
        if (batchItemsData.memberID === undefined) {
          Ext.MessageBox.alert('Submit Message', 'Inquiry For (' + TT1Array[0].lastname + ', ' +
            TT1Array[0].firstname + '). A Message will be generated when ' +
            'the response is available. Refresh your Notifications to check if your eligibility ' +
            'report has arrived.');
        } else {
          Ext.MessageBox.alert('Submit Message', 'Inquiry For (' + TT1Array[0].memberId + '). A Message will be' +
            'generated when the response is available. Refresh your Notifications to check if your eligibility ' +
            'report has arrived.');
        }
      },
      failure: function () {
        Ext.MessageBox.hide();
        Ext.MessageBox.alert('Request Failed', 'Please try again.');
      }
    });
  },

  displayInfo: function (memberID, outputRadio, startDate, endDate) {
    var me = this,
      portalMembersStore = this.getViewModel().getStore('portalFuncs'),
      inputString = 'D00111|HPM|' + memberID + '|' + startDate + '|' + endDate + '|||||174151587|' +
        Atlas.user.memberId + '|0';

    portalMembersStore.getProxy().setExtraParam('pFunction', 'fGetAllIDForEligibility');
    portalMembersStore.getProxy().setExtraParam('pPlanId', null);
    portalMembersStore.getProxy().setExtraParam('pLobID', null);
    portalMembersStore.getProxy().setExtraParam('pRecipientID', null);
    portalMembersStore.getProxy().setExtraParam('pMemberID', memberID);
    portalMembersStore.getProxy().setExtraParam('pMemberDOB', null);
    portalMembersStore.getProxy().setExtraParam('pPortalPlan', null);
    portalMembersStore.getProxy().setExtraParam('pPortalType', 'Provider');
    portalMembersStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    portalMembersStore.load({
      callback: function (record) {
        if (0 === record[0].getData().value.toLowerCase().indexOf('error')) {
          Ext.MessageBox.alert('Error', 'Member Not Found.');
        } else if (0 === record[0].getData().value.toLowerCase().indexOf('error')) {
          Ext.MessageBox.alert('Error', 'Member Not Found.');
        } else {
          me.submitSingleBatchItem(inputString, memberID);
        }
      }
    });
  },

  displayReportFile: function (reportName, params, regenReport, outputType, jobNum) {
    var notificationPrintModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {});

    notificationPrintModel.phantom = false;
    notificationPrintModel.getProxy().url = 'eligibility/hp/runreport64';
    notificationPrintModel.getProxy().setExtraParam('pReportName', reportName);
    notificationPrintModel.getProxy().setExtraParam('pParameters', params);
    notificationPrintModel.getProxy().setExtraParam('pRegenReport', regenReport);
    notificationPrintModel.getProxy().setExtraParam('pOutputType', outputType);
    notificationPrintModel.getProxy().setExtraParam('pJobNum', jobNum);
    notificationPrintModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    notificationPrintModel.save({
      success: function (response, operation) {
        var base64String = Ext.JSON.decode(operation._response.responseText).data;

        if (null !== base64String && '' !== base64String) {
          if ('pdf' === outputType) {
            Atlas.common.utility.Utilities.displayDocument('pdf', base64String);
            Ext.MessageBox.hide();
          } else if ('xls' === outputType) {
            Atlas.common.utility.Utilities.displayDocument('xls', base64String);
            Ext.MessageBox.hide();
          }
        } else if (null !== base64String && '' === base64String) {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        } else {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        }
      },
      failure: function () {
        Ext.MessageBox.alert('Request Failed', 'Internal Server Error.');
      }
    });
  },

  displayReportWeb: function (param) {
    var displayReportWebModel = Ext.create('Atlas.portals.provider.model.DisplayReportWeb', {});

    displayReportWebModel.phantom = false;
    displayReportWebModel.getProxy().url = 'eligibility/hp/display271';
    displayReportWebModel.getProxy().setExtraParam('pParameters', param);
    displayReportWebModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    displayReportWebModel.save({
      success: function (response, operation) {
        var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
          inquiryWindow = new Atlas.portals.view.provider.providerhome.InquiryWindow({
            itemConfig: {
              memberData: response.getData(),
              metaData: metadata,
              controlNum: param
            }
          });

        if (0 === metadata.pProgramStatus.toLowerCase().indexOf('timed out')) {
          Ext.MessageBox.alert('Error', 'Operation has timed out. Please try again.');
        } else {
          Ext.MessageBox.hide();
          inquiryWindow.show();
        }
      },
      failure: function () {
        Ext.MessageBox.alert('Request Failed', 'Unknown Failure.');
      }
    });
  },

  onTopRadioGroupClick: function (field, newValue) {
    if (newValue) {
      this.lookup('npiField').reset();
      this.lookup('npiForm').setHidden(true);
    } else {
      this.lookup('npiForm').setHidden(false);
    }
  },

  onMiddleRadioGroupClick: function (field, newValue) {
    if (newValue) {
      this.lookup('nameField').setHidden(true);
      this.lookup('nameField').reset();
      this.lookup('memberField').setHidden(false);
    } else {
      this.lookup('nameField').setHidden(false);
      this.lookup('memberField').reset();
      this.lookup('memberField').setHidden(true);
    }
  },

  reformatProviderList: function (store) {
    var reformattedListStore = this.getViewModel().getStore('reformattedProviderList'),
      storeData = store.getData(),
      listObjectArray = [{
        'fullName': 'All Providers Within This Group',
        'provID': '0'
      }],
      items = null,
      i = 0;

    for (i = 0; i < storeData.length; i++) {
      items = storeData.items[i].getData();

      listObjectArray.push({
        'fullName': items.lastName + ', ' + items.firstName,
        'provID': items.provID
      });
    }

    reformattedListStore.getProxy().setData(null);
    reformattedListStore.getProxy().setData(listObjectArray);
  },

  onClearFormClick: function () {
    this.lookup('memberField').reset();
    this.lookup('providerRadio').setValue(true);
    this.lookup('memberIDRadio').setValue(true);
  }
});