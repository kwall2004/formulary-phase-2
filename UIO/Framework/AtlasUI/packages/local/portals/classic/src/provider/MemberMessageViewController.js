Ext.define('Atlas.portals.view.provider.MemberMessagesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.membermessages',

    afterRender: function() {
        var vm = this.getViewModel(),
            me = this,
            homeStore = vm.getStore('notifications'),
            providerListStore = vm.getStore('providerList'),
            cocMessagesStore = vm.getStore('coc'),
            miProviderFieldset = this.lookup('miProviderFieldSet'),
            miEligibilityFieldset = this.lookup('miEligibilityFieldSet'),
            miInquiryRadioGroupTop = this.lookup('miInquiryRadioGroupTop'),
            miInquiryRadioGroupBottom = this.lookup('miInquiryRadioGroupBottom'),
            miMemberPlanCombo = this.lookup('miMemberPlanCombo'),
            ilInquiryText = this.lookup('ilInquiryText'),
            recipientId = this.getView().up().up().recipientIDInput,
            state = Atlas.user.providerStateSelected,
            cocProviderIds = null,
            batchList = [];

        vm.set('readStatusNotification','false');
        vm.set('batch',batchList);
        vm.set('recipientId',recipientId);

        homeStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        homeStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        homeStore.load({
            scope: this,
            callback: function (record) {
                var unread = 0;

                for (var i=0; i<record.length; i++){
                    if (record[i].getData().read === 'false') {
                        unread++;
                    }
                }

                me.getViewModel().set('unreadNotifications',unread);
            }
        });

        providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        providerListStore.load({
            scope: this,
            callback: function(record) {
                for (var i=0; i<record.length; i++) {
                    cocProviderIds += ',' + record[i].getData().provID;
                }

                cocProviderIds = cocProviderIds.substring(5);

                var cocSearchParam = "taskFlag = false AND recipientID = '" + recipientId + "' AND messageReadDate=? AND LOOKUP(trim(messageTo),'"+ cocProviderIds +"')>0";

                cocMessagesStore.getProxy().setExtraParam('pWhere',cocSearchParam);
                cocMessagesStore.load({
                    scope: this,
                    callback: function(record) {
                        var unread = 0,
                            currentUser = null;

                        if (record[0] !== undefined) {
                            currentUser = record[0].getData().messageTo
                        }

                        for (var i=0; i<record.length; i++){
                            if (record[i].getData().messageReadDate === null) {
                                unread++;
                            }
                        }

                        me.getViewModel().set('currentUser',currentUser);
                        me.getViewModel().set('unreadMessages',unread);
                    }
                });
            }
        });
    },

    loadCOCMessages: function(searchParam) {
        var vm = this.getViewModel(),
            cocMessagesStore = vm.getStore('coc');

        cocMessagesStore.getProxy().setExtraParam('pWhere',searchParam);
        cocMessagesStore.load();
    },

    onCOCComboSelect: function() {
        var vm = this.getViewModel(),
            me = this,
            comboValue = this.lookup('cocCombo').value,
            grid = this.lookup('cocGrid'),
            providerListStore = vm.getStore('providerList'),
            recipientId = vm.get('recipientId');

        grid.getStore().clearFilter();
        this.lookup('cocSearchBox').setValue('');
        
        providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        providerListStore.load({
            scope: this,
            callback: function(record) {
                var cocProviderIds = null,
                    searchParam = null;

                for (var i=0; i<record.length; i++) {
                    cocProviderIds += ',' + record[i].getData().provID;
                }

                cocProviderIds = cocProviderIds.substring(5);

                if (comboValue === 'All') {
                    searchParam = " taskFlag = false  AND recipientID = '" + recipientId + "' AND (LOOKUP(trim(messageTo),'"+cocProviderIds+"')>0 OR LOOKUP(trim(messageFrom),'"+cocProviderIds+"')>0 )"
                } else if (comboValue === 'Unread') {
                    searchParam = " taskFlag = false  AND recipientID = '" + recipientId + "' AND messageReadDate=? AND LOOKUP(trim(messageTo),'"+cocProviderIds+"')>0";
                } else if (comboValue === 'Read') {
                    searchParam = " taskFlag = false  AND recipientID = '" + recipientId + "' AND messageReadDate<>? AND LOOKUP(trim(messageTo),'"+cocProviderIds+"')>0";
                } else if (comboValue === 'Sent') {
                    searchParam = " taskFlag = false  AND recipientID = '" + recipientId + "' AND LOOKUP(trim(messageFrom),'"+cocProviderIds+"')>0"
                }

                me.loadCOCMessages(searchParam);
            }
        });
    },

    onCOCRowDoubleClick: function() {
        var grid = this.lookup('cocGrid'),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            pocStatus = selection.getData().pocStatus,
            readStatus = selection.getData().messageReadDate,
            currentDate = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();

        if (pocStatus !== null && pocStatus !== '') {
            if (pocStatus.includes('Approved')) {
                Ext.MessageBox.alert('Approved', 'This PoC Status is already approved.');
            } else {
                var homeDecisionWindow = new Atlas.portals.view.provider.providerhome.HomeDecisionWindow({
                    itemConfig: {
                        selectedRow: selection,
                        gridReference: grid
                    }
                });

                homeDecisionWindow.show();
            }
        } else {
            if (readStatus === null) {
                this.markMessage(currentDate);
            }

            var homeMessageWindow = new Atlas.portals.view.provider.providerhome.HomeMessageWindow({
                itemConfig: {
                    selectedRow: selection
                }
            });

            homeMessageWindow.show();
        }
    },

    onMarkMessageClick: function() {
        var grid = this.lookup('cocGrid'),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            selectionData = selection.getData(),
            currentDate = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();

        if (selection !== undefined) {
            if (selectionData.messageReadDate === null) {
                this.markMessage(currentDate);
            } else {
                this.markMessage(null);
            }
        } else {
            Ext.MessageBox.alert('Selection', 'Please Select a Message first.');
        }
    },

    markMessage: function(currentDate) {
        var grid = this.lookup('cocGrid'),
            me = this,
            selection = selection = grid.getView().getSelectionModel().getSelection()[0],
            selectionData = selection.getData(),
            messagesStatusModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {}),
            unreadNumber = this.getViewModel().get('unreadMessages'),
            messageObject = {
                "createDate":selectionData.createDate,
                "createDateTime":selectionData.createDateTime,
                "createTime":selectionData.createTime,
                "recipientID":selectionData.recipientID,
                "parentSystemID":selectionData.parentSystemID,
                "systemID":selectionData.systemID,
                "messageType":selectionData.messageType,
                "messageFrom":selectionData.messageFrom,
                "messageSubject":selectionData.messageSubject,
                "messageTo":selectionData.messageTo,
                "messageText":selectionData.messageText,
                "taskFlag":selectionData.taskFlag,
                "taskFollowUpDate":selectionData.taskFollowUpDate,
                "messageReadDate":currentDate,
                "actionTaken":selectionData.actionTaken,
                "createUser":selectionData.createUser,
                "messageReadDateTime":selectionData.messageReadDateTime,
                "messageReadTime":selectionData.messageReadTime,
                "messageReadUser":selectionData.messageReadUser,
                "dispGroup":selectionData.dispGroup,
                "messageAck":selectionData.messageAck,
                "dispType":selectionData.dispType,
                "isVisible":selectionData.isVisible,
                "dispProv":selectionData.dispProv,
                "dbRowID":selectionData.dbRowID,
                "rowNum":selectionData.rowNum
            };

        messagesStatusModel.phantom = false;
        messagesStatusModel.getProxy().url = 'provider/hp/coordcaremessage';
        messagesStatusModel.getProxy().setExtraParam('pStatus',true);
        messagesStatusModel.getProxy().setExtraParam('TT1',messageObject);
        messagesStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        messagesStatusModel.save({
            success: function () {
                var selectedUser = selectionData.messageFrom,
                    currentUser = me.getViewModel().get('currentUser');

                if (currentDate !== null) {
                    selection.set('messageReadDate',currentDate);
                    if (selectedUser !== currentUser) {
                        me.getViewModel().set('unreadMessages', unreadNumber - 1);
                    }
                } else {
                    selection.set('messageReadDate',null);
                    if (selectedUser !== currentUser) {
                        me.getViewModel().set('unreadMessages', unreadNumber + 1);
                    }
                }
            }
        });
    },

    onNotificationMessagesLoad: function(store, record) {
        var vm = this.getViewModel(),
            newRecord = [],
            newRecordCount = 0,
            status = vm.get('readStatusNotification'),
            notificationMessages = vm.getStore('notificationMessages');

        if (record !== null) {
            for (var i=0;i<record.length; i++) {
                if (record[i].getData().read === status) {
                    newRecord[newRecordCount] = record[i];
                    newRecordCount++;
                }
            }
        }

        notificationMessages.getProxy().setData(null);
        notificationMessages.getProxy().setData(newRecord);
        notificationMessages.reload();
    },

    onAddToBatchClick: function() {
        var vm = this.getViewModel(),
            radioValue = this.lookup('memberIDRadio').value,
            textfieldValue = this.lookup('memberIDTextField').value,
            batchStore = vm.getStore('batchList'),
            batchList = vm.get('batch'),
            grid = this.lookup('batchGrid');

        if (radioValue === true) {
            if (textfieldValue !== '') {
                var portalMembersStore = vm.getStore('portalFuncs');

                portalMembersStore.getProxy().setExtraParam('pFunction','fGetRecipientID');
                portalMembersStore.getProxy().setExtraParam('pPlanId',null);
                portalMembersStore.getProxy().setExtraParam('pLobID',null);
                portalMembersStore.getProxy().setExtraParam('pRecipientID',null);
                portalMembersStore.getProxy().setExtraParam('pMemberID',textfieldValue);
                portalMembersStore.getProxy().setExtraParam('pMemberDOB',null);
                portalMembersStore.getProxy().setExtraParam('pPortalPlan',null);
                portalMembersStore.getProxy().setExtraParam('pPortalType','Provider');
                portalMembersStore.getProxy().setExtraParam('userState',Atlas.user.providerStateSelected);
                portalMembersStore.load({
                    scope: this,
                    callback: function(record) {
                        if (record[0].getData().value.toLowerCase().includes('error')) {
                            Ext.MessageBox.alert('Error', 'Member Not Found.');
                        } else {
                            if (record[0].getData().value.toLowerCase().includes('error')) {
                                Ext.MessageBox.alert('Error', 'Member Not Found.');
                            } else {
                                batchList.push({
                                    "memberID":textfieldValue
                                });

                                vm.set('batch',batchList);

                                batchStore.getProxy().setData(null);
                                batchStore.getProxy().setData(batchList);
                                batchStore.reload({
                                    callback: function() {
                                        grid.setHidden(false);
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                Ext.MessageBox.alert('Alert', 'Please input a Member ID first.');
            }
        } else {
            var nameFieldSetValues = this.lookup('nameField').getValues();

            batchList.push({
                "firstName":nameFieldSetValues.firstName,
                "lastName":nameFieldSetValues.lastName,
                "dob":nameFieldSetValues.dob,
                "ssn":nameFieldSetValues.ssn
            });

            vm.set('batch',batchList);

            batchStore.getProxy().setData(null);
            batchStore.getProxy().setData(batchList);
            batchStore.reload({
                callback: function() {
                    grid.setHidden(false);
                }
            });
        }
    },

    onClearBatchList: function() {
        var batchStore = this.getViewModel().getStore('batchList'),
            grid = this.lookup('batchGrid');
        batchStore.getProxy().setData(null);
        batchStore.load();
        this.getViewModel().set('batch',[]);
        grid.setHidden(true);
    },

    onSubmitEligibilityInquiryClick: function() {
        var batchStore = this.getViewModel().getStore('batchList'),
            memberID = null,
            startDateFull = this.lookup('startDate').value,
            endDateFull = this.lookup('endDate').value,
            startDate = startDateFull.getMonth() + 1 + '/' + startDateFull.getDate() + '/' + startDateFull.getFullYear(),
            endDate = endDateFull.getMonth() + 1 + '/' + endDateFull.getDate() + '/' + endDateFull.getFullYear(),
            radioValue = this.lookup('memberIDRadio').value,
            nameFieldSetValues = null,
            lastName = null,
            firstName = null,
            dob = null,
            ssn = null;

        if (batchStore.getData().items.length !== 0) {
            memberID = batchStore.getData().items[0].getData().memberID;
            nameFieldSetValues = batchStore.getData().items[0].getData();
            lastName = nameFieldSetValues.lastName;
            firstName = nameFieldSetValues.firstName;
            dob = nameFieldSetValues.dob;
            ssn = nameFieldSetValues.ssn;
        }

        if (batchStore.getData().items.length === 0) {
            Ext.MessageBox.alert('Alert','Please add a record to the Batch.');
        } else if (batchStore.getData().items.length === 1) {
            if (radioValue === true) {
                this.submitSingleEligibilityInquiry(memberID,startDate,endDate,'','','','');
            } else {
                this.submitSingleEligibilityInquiry('',startDate,endDate,lastName,firstName,dob,ssn);
            }
        } else if (batchStore.getData().items.length > 1) {
            alert('Multiple Records');
        }
    },

    onClearFormClick: function() {
        var providerRadio = this.lookup('providerRadio'),
            memberIDRadio = this.lookup('memberIDRadio'),
            outputToPDFRadio = this.lookup('outputToPDF'),
            memberForm = this.lookup('memberField');

        memberForm.reset();
        providerRadio.setValue(true);
        memberIDRadio.setValue(true);
        outputToPDFRadio.setValue(true);
    },

    onbatchRowDoubleClick: function(one, record) {
        var vm = this.getViewModel(),
            grid = this.lookup('batchGrid'),
            batchStore = vm.getStore('batchList'),
            batchList = [];

        Ext.MessageBox.show({
            title: 'Delete Confirmation',
            msg: 'Are you sure you want to delete this record?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn === 'yes') {
                    batchStore.remove(record);

                    for (var i=0;i<batchStore.getData().items.length;i++) {
                        batchList.push({
                            "memberID":batchStore.getData().items[i].getData().memberID
                        });
                    }
                    batchStore.getProxy().setData(null);
                    batchStore.getProxy().setData(batchList);
                    batchStore.reload();

                    vm.set('batch',batchList);

                    if (batchStore.getData().items.length === 0) {
                        grid.setHidden(true);
                    }
                }
            }
        });
    },

    submitSingleEligibilityInquiry: function(memberID,startDate,endDate,lastName,firstName,dob,ssn) {
        var me = this,
            state = Atlas.user.providerStateSelected,
            eligibilityInquiryWebModel = Ext.create('Atlas.portals.provider.model.MessagesStatus', {}),
            outputRadio = this.lookup('outputToPDF').value,
            inputString = 'D00111|HPM|' + memberID +'|' + startDate +'|' + endDate + '|' + firstName + '|' + lastName + '|' + dob + '|' + ssn + '|174151587|'+ Atlas.user.memberId + '|0';

        Ext.MessageBox.show({
            title: 'Request Submitted',
            msg: 'Please Wait...',
            closable:false
        });

        eligibilityInquiryWebModel.phantom = false;
        eligibilityInquiryWebModel.getProxy().url = 'eligibility/hp/make004010x092a1web';
        eligibilityInquiryWebModel.getProxy().setExtraParam('pparameters',inputString);
        eligibilityInquiryWebModel.getProxy().setExtraParam('userState', state);
        eligibilityInquiryWebModel.save({
            success: function (record, operation) {
                var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                    controlNum = metadata.p271ControlNum;

                if (outputRadio === true) {
                    if (state === "MI") {
                        me.displayReportFile('print271.p',controlNum,2,'pdf',0);
                    } else if (state === "IL"){
                        me.displayReportFile('printmhpeligibleforms.p',memberID + '|Medicaid',2,'pdf',0);
                    }
                } else {
                    me.displayReportWeb(controlNum);
                }
            }
        });
    },

    onNotificationComboSelect: function() {
        var vm = this.getViewModel(),
            me = this,
            comboValue = this.lookup('notificationCombo').value,
            homeStore = vm.getStore('notifications'),
            grid = this.lookup('notificationGrid');

        grid.getStore().clearFilter();

        homeStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        homeStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        homeStore.load({
            scope: this,
            callback: function (record) {
                if (comboValue === 'All') {
                    var notificationMessages = vm.getStore('notificationMessages');
                    notificationMessages.getProxy().setData(null);
                    notificationMessages.getProxy().setData(record);
                    notificationMessages.reload();
                } else if (comboValue === 'Unread') {
                    me.getViewModel().set('readStatusNotification','false');
                    me.onNotificationMessagesLoad(homeStore,record);
                } else if (comboValue === 'Read') {
                    me.getViewModel().set('readStatusNotification','true');
                    me.onNotificationMessagesLoad(homeStore,record);
                }
            }
        });
    },

    insertAllOption: function(store) {
        store.insert(0,{
            lastName:"Providers within the group",
            firstName: "(ALL)"
        });
    },

    onRefreshNotificationClick: function() {
        this.onNotificationComboSelect();
    },

    onRefreshMessagesClick: function() {
        this.onCOCComboSelect();
    },

    onDeleteNotificationClick: function() {
        var me = this,
            grid = this.lookup('notificationGrid'),
            gridStore = grid.getStore(),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            unreadNumber = this.getViewModel().get('unreadNotifications'),
            notificationDeleteModel = Ext.create('Atlas.portals.provider.model.DeleteNotification', {});

        if (selection !== undefined) {
            Ext.MessageBox.show({
                title: 'Delete Confirmation',
                msg: 'Are you sure you want to delete this record?',
                buttons: Ext.MessageBox.YESNO,
                fn: function(btn) {
                    if (btn === 'yes') {
                        notificationDeleteModel.phantom = false;
                        notificationDeleteModel.getProxy().url = 'provider/hp/delmessages';
                        notificationDeleteModel.getProxy().setExtraParam('pMessageID',selection.getData().messageID);
                        notificationDeleteModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
                        notificationDeleteModel.save({
                            success: function () {
                                if (selection.getData().read === 'false') {
                                    me.getViewModel().set('unreadNotifications',unreadNumber-1);
                                }
                                gridStore.remove(grid.getView().getSelectionModel().getSelection());
                            }
                        });
                    }
                }
            });
        } else {
            Ext.MessageBox.alert('Selection', 'Please Select a Notification first.');
        }
    },

    onMessageReplyClick: function() {
        var grid = this.lookup('cocGrid'),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        if (selection !== undefined) {
            var homeReplyWindow = new Atlas.portals.view.provider.providerhome.HomeReplyWindow({
                itemConfig: {
                    selectedRow: selection
                }
            });

            homeReplyWindow.show();
        } else {
            Ext.MessageBox.alert('Selection', 'Please Select a Message first.');
        }
    },

    onCollapseRow: function(rowNode, record) {
        if (record.getData().read === 'false') {
            var vm = this.getViewModel(),
                notificationMessages = vm.getStore('notificationMessages'),
                unreadNumber = this.getViewModel().get('unreadNotifications') - 1;

            this.markNotification(record, unreadNumber, 'true')
        }
    },

    markNotification: function(record, unreadNumber, status) {
        var me = this,
            notificationStatusModel = Ext.create('Atlas.portals.provider.model.NotificationStatus', {});

        notificationStatusModel.phantom = false;
        notificationStatusModel.getProxy().url = 'provider/hp/messagedata';
        notificationStatusModel.getProxy().setExtraParam('pMessageID',record.getData().messageID);
        notificationStatusModel.getProxy().setExtraParam('pFieldList','read');
        notificationStatusModel.getProxy().setExtraParam('pFields',status);
        notificationStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        notificationStatusModel.save({
            success: function () {
                record.set('read',status);
                me.getViewModel().set('unreadNotifications',unreadNumber);
            }
        });
    },

    onMarkNotificationClick: function() {
        var grid = this.lookup('notificationGrid'),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            unread = this.getViewModel().get('unreadNotifications');

        if (selection !== undefined) {
            var status = selection.getData().read;

            if (status === 'true') {
                this.markNotification(selection, unread+1, 'false');
            } else if (status === 'false') {
                this.markNotification(selection, unread-1, 'true');
            }
        } else {
            Ext.MessageBox.alert('Selection', 'Please Select a record first.');
        }
    },

    onNotificationSearchClick: function() {
        var grid = this.lookup('notificationGrid'),
            gridfilters = grid.getStore().getFilters(),
            searchbox = this.lookup('notificationSearchBox');

        if (searchbox.value) {
            this.subjectFilter = gridfilters.add({
                id            : 'notificationFilter',
                property      : 'subject',
                value         : searchbox.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.subjectFilter) {
            grid.getStore().clearFilter();
            this.subjectFilter = null;
        }
    },

    onMessageSearchClick: function() {
        var grid = this.lookup('cocGrid'),
            gridfilters = grid.getStore().getFilters(),
            searchbox = this.lookup('cocSearchBox');

        if (searchbox.value) {
            this.subjectFilter = gridfilters.add({
                id            : 'messageFilter',
                property      : 'messageSubject',
                value         : searchbox.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.subjectFilter) {
            grid.getStore().clearFilter();
            this.subjectFilter = null;
        }
    },

    onEnterNotificationPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onNotificationSearchClick();
        }
    },

    onEnterMessagePress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onMessageSearchClick();
        }
    },

    displayReportFile: function(reportName, params, regenReport, outputType, jobNum) {
        var notificationPrintModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {});

        notificationPrintModel.phantom = false;
        notificationPrintModel.getProxy().url = 'eligibility/hp/runreport64';
        notificationPrintModel.getProxy().setExtraParam('pReportName',reportName);
        notificationPrintModel.getProxy().setExtraParam('pParameters',params);
        notificationPrintModel.getProxy().setExtraParam('pRegenReport',regenReport);
        notificationPrintModel.getProxy().setExtraParam('pOutputType',outputType);
        notificationPrintModel.getProxy().setExtraParam('pJobNum',jobNum);
        notificationPrintModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        notificationPrintModel.save({
            success: function (response,operation) {
                var base64String = Ext.JSON.decode(operation._response.responseText).data;

                if (base64String !== null && base64String !== '') {
                    if (outputType === 'pdf') {
                        Atlas.common.utility.Utilities.displayDocument('pdf', base64String);
                        Ext.MessageBox.hide();
                    }
                } else if (base64String !== null && base64String === '') {
                    Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
                } else {
                    Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
                }
            },
            failure: function() {
                Ext.MessageBox.alert('Request Failed', 'Unknown Failure.');
            }
        });
    },

    displayReportWeb: function(param) {
        var displayReportWebModel = Ext.create('Atlas.portals.provider.model.DisplayReportWeb', {});

        displayReportWebModel.phantom = false;
        displayReportWebModel.getProxy().url = 'eligibility/hp/display271';
        displayReportWebModel.getProxy().setExtraParam('pParameters',param);
        displayReportWebModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        displayReportWebModel.save({
            success: function (response,operation) {
                var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                    inquiryWindow = new Atlas.portals.view.provider.providerhome.InquiryWindow({
                        itemConfig: {
                            memberData: response.getData(),
                            metaData: metadata,
                            controlNum: param
                        }
                    });

                if (metadata.pProgramStatus.toLowerCase().includes('timed out')) {
                    Ext.MessageBox.alert('Alert','Operation has timed out. Please try again.')
                } else {
                    Ext.MessageBox.hide();
                    inquiryWindow.show();
                }
            },
            failure: function() {
                Ext.MessageBox.alert('Request Failed', 'Unknown Failure.');
            }
        });
    },

    onPrintNotificationClick: function() {
        var grid = this.lookup('notificationGrid'),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            outputType = null;

        if (selection !== undefined) {
            if (selection.getData().subject === 'Provider Hedis Report') {
                outputType = 'xls'
            } else {
                outputType = 'pdf'
            }

            this.displayReportFile(null,null,3,outputType,selection.getData().jobNum);
        } else {
            Ext.MessageBox.alert('Selection', 'Please Select a Notification first.');
        }
    },

    onProviderRadioClick: function (field, newValue) {
        if (newValue){
            var npiField = this.lookup('npiField');
            npiField.reset();
            this.lookup('npiField').setHidden(true);
        }
    },

    onCSHCSRadioClick: function (field, newValue) {
        if (newValue){
            this.lookup('npiField').setHidden(false);
        }
    },

    onMemberRadioClick: function (field, newValue) {
        if (newValue){
            this.lookup('nameField').setHidden(true);
            this.lookup('nameField').reset();
            this.lookup('memberField').setHidden(false);
        }
    },

    onNameRadioClick: function (field, newValue) {
        if (newValue){
            this.lookup('nameField').setHidden(false);
            this.lookup('memberField').reset();
            this.lookup('memberField').setHidden(true);
        }
    },

    reformatProviderList: function(store) {
        var reformattedListStore = this.getViewModel().getStore('reformattedProviderList'),
            storeData = store.getData(),
            listObjectArray = [{
                "fullName":"All Providers Within This Group",
                "provID":"0"
            }];

        for (var i=0;i<storeData.length;i++) {
            var items = storeData.items[i].getData();

            listObjectArray.push({
                "fullName":items.lastName + ', ' + items.firstName,
                "provID":items.provID
            });
        }

        reformattedListStore.getProxy().setData(null);
        reformattedListStore.getProxy().setData(listObjectArray);
    }
});