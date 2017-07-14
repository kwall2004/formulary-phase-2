//TODO seems that this is not in use, replaced with Atlas.common.view.sharedviews.AddContactLogController
Ext.define('Atlas.home.xclassview.ContactLogAlertAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactlogalertaddcontroller'
    // init: function () {
    //     var me = this,
    //         vm = me.getViewModel(),
    //         user = Ext.first('viewport').getViewModel().get('user'),
    //         date = new Date(),
    //         formatedDate = me.getShortDate(date),
    //         contactliststore = vm.getStore('contactreceiverlist'),
    //         receivedForm = me.lookup('receiveForm'),
    //         contactcodelist = me.lookup('contactcodecard'),
    //         typestore = me.lookup('contactlogtype').getStore(),
    //         statusstore = me.lookup('contactlogstatus').getStore(),
    //         assignstore = me.lookup('assignto').getStore();
    //
    //     typestore.load();
    //     statusstore.load();
    //     assignstore.load();
    //     vm.set('user', user);
    //     vm.set('date', formatedDate);
    //     vm.set('time', date.getHours());
    //     vm.set('case', 0);
    //     contactliststore.getProxy().setExtraParam('pListName', 'ContactCodeCategory');
    //     contactliststore.load({
    //
    //         callback: function (masterrecord, operation, success) {
    //             var i;
    //             for (i = 0; i < masterrecord.length; i++) {
    //                 if (masterrecord[i].get('charString') === 'yes|ContactLog') {
    //                     if (masterrecord[i].get('ListDescription') === 'Care Coordination') {
    //                         receivedForm.add({
    //                             boxLabel: masterrecord[i].get('ListDescription'),
    //                             name: 'from',
    //                             inputValue: masterrecord[i].get('ListItem'),
    //                             id: 'from' + i,
    //                             checked: true
    //                         });
    //                         me.loadCheckBoxes('CC');
    //                     } else {
    //                         receivedForm.add({
    //                             boxLabel: masterrecord[i].get('ListDescription'),
    //                             name: 'from',
    //                             inputValue: masterrecord[i].get('ListItem'),
    //                             id: 'from' + i
    //                         });
    //                     }
    //
    //                 }
    //             }
    //
    //         }
    //     });
    // },
    // loadCheckBoxes: function (loadcategory) {
    //     var me = this,
    //         vm = me.getViewModel(),
    //         maxReached = vm.get('maxReached'),
    //         contactcodestore = vm.getStore('contactcodelist'),
    //         contactcodelist = me.getView().lookup('contactcodecard'),
    //         myMask = new Ext.LoadMask({
    //             msg: 'Loading..',
    //             target: contactcodelist
    //         });
    //
    //     myMask.show();
    //     contactcodestore.getProxy().setExtraParam('ipcCategory', loadcategory);
    //
    //     contactcodelist.add({
    //         masked: {
    //             xtype: 'loadmask',
    //             message: 'A message..',
    //             indicator: false
    //         }
    //     });
    //     contactcodestore.load({
    //         callback: function (records, two, tree) {
    //             contactcodelist.removeAll();
    //             for (var c = 0; c < records.length; c++) {
    //                 contactcodelist.add({
    //                     xtype: 'checkbox',
    //                     boxLabel: records[c].get('ShortDescription'),
    //                     inputValue: records[c].get('ShortDescription')
    //                 });
    //             }
    //             myMask.hide();
    //             if (maxReached) {
    //                 me.disableCheckBoxGroup(contactcodelist);
    //             }
    //         }
    //     });
    // },
    // onReceivedFormChange: function (me, radio) {
    //     this.loadCheckBoxes(radio.from);
    // },
    // onContactCodeCheck: function (checkboxgroup, newValue, oldValue) {
    //     var me = this,
    //         reasonbox,
    //         vm = me.getViewModel(),
    //         newVal = newValue[Object.keys(newValue)[0]],
    //         oldVal = oldValue[Object.keys(oldValue)[0]];
    //
    //     vm.set('currentContactCodeCheckboxGroup', checkboxgroup);
    //     if (newVal.constructor !== Array) {
    //         reasonbox = me.lookup('reason1');
    //         reasonbox.setValue(newVal);
    //         vm.set('reason1Delete', false);
    //     } else if (newVal.length === 2) {
    //         reasonbox = me.lookup('reason2');
    //         reasonbox.setValue(newVal[1]);
    //         vm.set('reason2Delete', false);
    //     } else if (newVal.length === 3) {
    //         reasonbox = me.lookup('reason3');
    //         reasonbox.setValue(newVal[2]);
    //         vm.set('reason3Delete', false);
    //
    //         me.disableCheckBoxGroup(checkboxgroup);
    //         vm.set('maxReached', true);
    //     }
    //
    //     if (oldValue.length) {
    //         if (newVal.length === 2 && oldVal.length === 3) {
    //             me.enableCheckBoxGroup(checkboxgroup);
    //             vm.set('maxReached', false);
    //         }
    //     }
    // },
    // getShortDate: function (date) {
    //     return (date.getMonth() + 1) +
    //         '/' + date.getDate() +
    //         '/' + date.getFullYear();
    // },
    // deleteReason: function (button) {
    //     var vm = this.getViewModel();
    //     vm.set('maxReached', false);
    //     this.enableCheckBoxGroup(vm.get('currentContactCodeCheckboxGroup'));
    //
    //     if (button.reference === 'reason1Delete') {
    //         button.up().up().up().up().lookup('reason1').setValue(''); // TODO What is this??? 4times up??
    //         vm.set(button.reference, true);
    //     } else if (button.reference === 'reason2Delete') {
    //         button.up().up().up().up().lookup('reason2').setValue('');
    //         vm.set(button.reference, true);
    //     } else if (button.reference === 'reason3Delete') {
    //         button.up().up().up().up().lookup('reason3').setValue('');
    //         vm.set(button.reference, true);
    //     }
    // },
    // disableCheckBoxGroup: function (checkboxgroup) {
    //     for (var i = 0; i < checkboxgroup.items.items.length; i++) {
    //         var checkbox = checkboxgroup.items.items[i];
    //         if (checkbox.checked === false) {
    //             checkbox.setDisabled(true);
    //         }
    //     }
    // },
    // enableCheckBoxGroup: function (checkboxgroup) {
    //     for (var i = 0; i < checkboxgroup.items.items.length; i++) {
    //         var checkbox = checkboxgroup.items.items[i];
    //         checkbox.setDisabled(false);
    //     }
    // },
    // saveContactLog: function () {
    //
    //     var me = this,
    //         vm = this.getViewModel(),
    //         record = this.getView().lookup('callerform').getForm().getValues(),
    //         fieldList = 'callerFirstname|callerLastName|callerPhone|subject|description|callStatus|contactType|oldContactUser|contactUser|updatedBy|callDateTime|npi|ncpdpid|recipientID|authID|transactionID|MTMId|LastModifiedUser|resolvedFirstCall|planGroupId|updatedDatetime',
    //         memberrecord = vm.get('memberrecord'),
    //         prescriberrecord = vm.get('prescriberrecord'),
    //         contactlogmodel = Ext.create('Atlas.common.model.ContactLogData'),
    //         fields = record.callerFirstName + '|' + record.callerLastName + '|' + record.callerPhone + '|' + record.subject + '|' + record.description +
    //             '|' + record.callStatus + '|' + record.contactType + '|' + record.oldContactUser + '|' + record.contactUser + '|' + record.updatedBy +
    //             '|' + record.callDateTime + '|' + prescriberrecord.get('npi') + '|' + prescriberrecord.get('ncpdpid') + '|' + memberrecord.get('recipientID') + '|' + record.authID + '|' +
    //             record.transactionID + '|' + record.MTMId + '|' + record.LastModifiedUser + '|' + record.resolvedFirstCall + '|' + record.planGroupId + '|' + record.updatedDatetime,
    //         ttContactReasonCode = {"CodeType": "0", "codeValue": "D32F"};
    //     contactlogmodel.phantom = false;
    //     contactlogmodel.getProxy().setExtraParam('pKeyValue', '0');
    //     contactlogmodel.getProxy().setExtraParam('pKeyType', 'CaseNum');
    //     contactlogmodel.getProxy().setExtraParam('pFieldList', fieldList);
    //     contactlogmodel.getProxy().setExtraParam('pFields', fields);
    //     contactlogmodel.getProxy().setExtraParam('ttContactReasonCode', ttContactReasonCode);
    //     contactlogmodel.save({
    //         success: function () {
    //             Ext.MessageBox.alert('Success', ' Contact log successfully saved!');
    //         },
    //         callback: function () {
    //             // debugger
    //         }
    //     });
    //
    //     me.onCancelClick();
    // },
    // onCancelClick: function () {
    //     var window = this.getView().up();
    //     this.editor = Ext.destroy(window);
    // },
    // launchNotesDialog: function (button) {
    //     var that = this,
    //         vm = that.getViewModel(),
    //         notesModel = Ext.create('Atlas.common.model.Notes', {});
    //
    //     notesModel.getProxy().setExtraParam('pParentSystemID', this.lookup('systemid').getValue());
    //     notesModel.load({
    //         callback: function (record, operation) {
    //             var view = that.getView(),
    //                 form = that.lookup('callerform'),
    //                 window = Ext.create('Ext.window.Window', {
    //                     items: [{
    //                         xtype: 'panel',
    //                         viewModel: {
    //                             data: {
    //                                 formValues: form.getForm().getValues()
    //                             }
    //                         },
    //                         items: [{
    //                             xtype: 'textarea',
    //                             reference: 'notebox',
    //                             fieldLabel: 'Notes'
    //                         }],
    //                         dockedItems: [{
    //                             xtype: 'toolbar',
    //                             dock: 'bottom',
    //                             items: [{
    //                                 text: 'Save',
    //                                 hidden: that.showSaveButton(button),
    //                                 listeners: {
    //                                     click: function (form) {
    //                                         var view = form.up().up(),
    //                                             vm = view.getViewModel(),
    //                                             formVals = vm.getData().formValues,
    //                                             note = view.items.items[0].value,
    //                                             user = Ext.first('viewport').getViewModel().get('user'),
    //                                             fields = 'CreateUser,CreateDate,CreateTime,Subject,Note,SystemID',
    //                                             fieldvals = user.un + '|10/12/2016|5:00|' + formVals.subject + '|' + note + '|' + formVals.systemId;
    //
    //                                         var notesModel = Ext.create('Atlas.common.model.Notes', {});
    //                                         notesModel.getProxy().setExtraParam('psystemId', formVals.systemId);
    //                                         notesModel.getProxy().setExtraParam('pMode', 'A');
    //                                         notesModel.getProxy().setExtraParam('pFieldList', fields);
    //                                         notesModel.getProxy().setExtraParam('pFields', fieldvals);
    //                                         notesModel.save();
    //                                     }
    //                                 }
    //                             }, {
    //                                 text: 'Cancel'
    //                             }]
    //                         }]
    //                     }]
    //                 });
    //             view.add(window).show();
    //             var response = Ext.decode(operation.getResponse().responseText);
    //             var noteboxValue = '';
    //             for (var i = 0; i < response.data.length; i++) {
    //                 var data = response.data[i];
    //
    //                 noteboxValue += data.CreateUser + '(' + data.CreateDate + ' ' + data.CreateTime + ')' + '\n' + data.Subject + '/n' + data.Note + '\n' + '\n';
    //             }
    //             that.lookup('notebox').setValue(noteboxValue);
    //         }
    //     });
    //
    // },
    // showSaveButton: function (button) {
    //     if (button.reference === 'viewNotesButton') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

});