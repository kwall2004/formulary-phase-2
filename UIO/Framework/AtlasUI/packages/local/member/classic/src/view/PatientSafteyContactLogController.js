/**
 * Created by T4317 on 12/8/2016.
 */
Ext.define('Atlas.common.view.sharedviews.PatientSafteyContactLogController', {
    extend: 'Atlas.common.view.sharedviews.AddContactLogController',
    alias: 'controller.patientsafteycontactlog',
    init: function() {
        var me = this,
        //view = Ext.first('viewport').down().down().lookup('prescribertoolbar'),
            vm = this.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            date = Atlas.common.utility.Utilities.getLocalDateTime() ,
            formatedDate = me.getShortDate(date),
            contactliststore = vm.getStore('contactreceiverlist'),
            receivedForm = this.getView().lookupReference('receiveForm'),
            contactcodelist = this.getView().lookupReference('contactcodecard'),
            typestore = this.getView().lookup('contactlogtype').getStore(),
            statusstore = this.getView().lookup('contactlogstatus').getStore(),
            assignstore = this.getView().lookup('assignto').getStore();

        typestore.load();
        statusstore.load();
        assignstore.load();
        vm.set('user', user);
        vm.set('date', formatedDate);
        vm.set('time', date.getHours() + ':' + date.getMinutes());
        vm.set('case', 0);
        contactliststore.getProxy().setExtraParam('pListName', 'ContactCodeCategory');
        contactliststore.load({
            failure: function () {
            },
            success: function (record, operation) {
            },
            callback: function (masterrecord, operation, success) {
                var i;
                for (i = 0; i < masterrecord.length; i++) {
                    if (masterrecord[i].get('charString') === 'yes|ContactLog') {
                        if (masterrecord[i].get('ListDescription') === 'Care Coordination') {
                            receivedForm.add({
                                boxLabel: masterrecord[i].get('ListDescription'),
                                name: 'from',
                                inputValue: masterrecord[i].get('ListItem'),
                                id: 'from' + i,
                                checked: true
                            });
                            me.loadCheckBoxes('CC');
                        } else {
                            receivedForm.add({
                                boxLabel: masterrecord[i].get('ListDescription'),
                                name: 'from',
                                inputValue: masterrecord[i].get('ListItem'),
                                id: 'from' + i
                            });
                        }

                    }
                }
            }

        });
    },
    loadCheckBoxes: function(loadcategory) {
        var vm = this.getViewModel(),
            maxReached = vm.get('maxReached'),
            contactcodestore = vm.getStore('contactcodelist'),
            contactcodelist = this.getView().lookup('contactcodecard'),
            reason1 = this.getView().lookup('reason1').value,
            reason2 = this.getView().lookup('reason2').value,
            reason3 = this.getView().lookup('reason3').value,
            checkboxGroup = this.getView().lookup('contactcodecard'),
            controller = this,
            myMask = new Ext.LoadMask({
                msg: 'Loading..',
                target: contactcodelist
            });

        myMask.show();
        contactcodestore.getProxy().setExtraParam('ipcCategory',loadcategory);

        contactcodelist.add({
            masked: {
                xtype: 'loadmask',
                message: 'A message..',
                indicator: false
            }
        });
        contactcodestore.load({
            callback:function (records, two, tree) {
                contactcodelist.removeAll();
                for(c = 0; c < records.length; c++ ) {
                    contactcodelist.add({
                        xtype: 'checkbox',
                        boxLabel: records[c].get('ShortDescription'),
                        inputValue: records[c].get('ShortDescription')
                    });
                }
                myMask.hide();
                if(maxReached){
                    controller.disableCheckBoxGroup(contactcodelist);
                    controller.checkBoxes(reason1, checkboxGroup);
                    controller.checkBoxes(reason2, checkboxGroup);
                    controller.checkBoxes(reason3, checkboxGroup);
                }
            }
        });
    },
    onReceivedFormChange: function(me, radio) {
        this.loadCheckBoxes(radio.from);

    },
    onContactCodeCheck: function(checkboxgroup , newValue , oldValue ) {
        var reasonbox,
            vm = this.getViewModel(),
            newVal = newValue[Object.keys(newValue)[0]],
            oldVal = oldValue[Object.keys(oldValue)[0]];
        vm.set('currentContactCodeCheckboxGroup', checkboxgroup);
        if(!this.getView().lookup('reason1').value){
            reasonbox = this.getView().lookup('reason1');

            reasonbox.setValue(newVal);
            vm.set('reason1Delete', false);
        }else if(!this.getView().lookup('reason2').value){
            reasonbox = this.getView().lookup('reason2');
            reasonbox.setValue(newVal[1]);
            vm.set('reason2Delete', false);
        }else if(!this.getView().lookup('reason3').value){
            reasonbox = this.getView().lookup('reason3');
            reasonbox.setValue(newVal[2]);
            vm.set('reason3Delete', false);

            this.disableCheckBoxGroup(checkboxgroup);
            vm.set('maxReached', true);
        }

        if(oldValue.length)
        {
            if (newVal.length === 2 && oldVal.length === 3) {
                this.enableCheckBoxGroup(checkboxgroup);
                vm.set('maxReached', false);
            }
        }
    },
    getShortDate: function(date) {
        return (date.getMonth() + 1) +
            '/' +  date.getDate() +
            '/' +  date.getFullYear();
    },
    deleteReason: function(button) {
        var view = this.getView().items.items[0],
            reason1 = this.getView().lookup('reason1').value,
            reason2 = this.getView().lookup('reason2').value,
            reason3 = this.getView().lookup('reason3').value,
            vm = view.getViewModel(),
            checkboxGroup = this.getView().lookup('contactcodecard');
        vm.set('maxReached', false);
        this.enableCheckBoxGroup(vm.get('currentContactCodeCheckboxGroup'));

        if(button.reference === 'reason1Delete') {
            //debugger;
            this.getView().lookup('reason1').setValue(null);
            vm.set(button.reference, true);
            this.uncheckBox(reason1, checkboxGroup);
        } else if (button.reference === 'reason2Delete'){
            this.getView().lookup('reason2').setValue(null);
            vm.set(button.reference, true);
            this.uncheckBox(reason2, checkboxGroup);
        } else if(button.reference === 'reason3Delete') {
            this.getView().lookup('reason3').setValue(null);
            vm.set(button.reference, true);
            this.uncheckBox(reason3, checkboxGroup);
        }
    },
    uncheckBox: function(reason, checkboxGroup){
        for(var i = 0; i < checkboxGroup.items.items.length; i ++) {
            if(checkboxGroup.items.items[i].boxLabel === reason) {
                checkboxGroup.items.items[i].setValue(false);
            }
        }
    },
    checkBoxes: function (reason, checkboxGroup) {
        for(var i = 0; i < checkboxGroup.items.items.length; i ++) {
            if(checkboxGroup.items.items[i].boxLabel === reason) {
                checkboxGroup.items.items[i].setValue(true);
            }
        }
    },
    disableCheckBoxGroup: function(checkboxgroup) {
        for(i=0; i < checkboxgroup.items.items.length; i ++) {
            var checkbox = checkboxgroup.items.items[i];
            if(checkbox.checked === false) {
                checkbox.setDisabled(true);
            }
        }
    },
    enableCheckBoxGroup: function(checkboxgroup) {
        for(i=0; i < checkboxgroup.items.items.length; i ++) {
            var checkbox = checkboxgroup.items.items[i];
            checkbox.setDisabled(false);
        }
    },
    saveContactLog: function () {
        // debugger;
        var me = this,
            view = this.getView().items.items[0],
            vm = view.getViewModel(),
            prescriber = this.getView().lookup('prescribertypeaheadbox'),
            pharmacy = this.getView().lookup('providertypeaheadbox'),
            member = this.getView().lookup('membertypeaheadbox'),
            record = vm.get('record').data,
            fieldList = 'callerFirstname,callerLastName,callerPhone,subject,description,callStatus,contactType,oldContactUser,contactUser,updatedBy,' +
                'callDateTime,npi,ncpdpid,recipientID,authID,transactionID,MTMId,LastModifiedUser,resolvedFirstCall,planGroupId,updatedDatetime',
            memberrecord = vm.get('memberrecord'),
            prescriberrecord = vm.get('prescriberrecord'),
            contactlogmodel = Ext.create('Atlas.common.model.ContactLogData'),
            fields = record.callerFirstName+'|' + record.callerLastName+'|' + record.callerPhone+'|' + record.subject +'|' + record.description +
                '|' + record.callStatus+'|' + record.contactType+'|' + record.oldContactUser+'|' + record.contactUser+'|' + record.updatedBy +
                '|' + record.callDateTime+'|' + prescriber.npi +'|' + pharmacy.value+'|' + member.value +'|' + record.authID +'|' +
                record.transactionID +'|' + record.MTMId + '|' + record.LastModifiedUser + '|' + record.resolvedFirstCall + '|' + record.planGroupId + '|'+ record.updatedDatetime,
            ttContactReasonCode = {"CodeType":"0","codeValue":"D32F"};
        var newFields = fields.replace(/undefined/gi, '');
        contactlogmodel.phantom = false;
        contactlogmodel.getProxy().setExtraParam('pKeyValue','0');
        contactlogmodel.getProxy().setExtraParam('pKeyType', 'CaseNum');
        contactlogmodel.getProxy().setExtraParam('pFieldList', fieldList);
        contactlogmodel.getProxy().setExtraParam('pFields', newFields);
        contactlogmodel.getProxy().setExtraParam('ttContactReasonCode',ttContactReasonCode);
        contactlogmodel.save({
            callback:function(record, operation, response) {
                Ext.MessageBox.alert('Success', ' Contact log successfully saved!');
                me.onCancelClick();

            }
        });

    },
    updateContactLog: function () {
        var me = this,
            view = this.getView().items.items[0],
            vm = view.getViewModel(),
            prescriber = this.getView().lookup('prescribertypeaheadbox'),
            pharmacy = this.getView().lookup('providertypeaheadbox'),
            member = this.getView().lookup('membertypeaheadbox'),
            record = vm.get('record'),
            newRecord = this.getView().lookup('callerform').getForm().getValues(),
            fieldList = 'callerFirstname,callerLastName,callerPhone,subject,description,callStatus,contactType,oldContactUser,contactUser,updatedBy,' +
                'callDateTime,npi,ncpdpid,recipientID,authID,transactionID,MTMId,LastModifiedUser,resolvedFirstCall,planGroupId,updatedDatetime',
            memberrecord = vm.get('memberrecord'),
            prescriberrecord = vm.get('prescriberrecord'),
            fields = newRecord.callerFirstName+'|' + newRecord.callerLastName+'|' + newRecord.callerPhone+'|' + newRecord.subject +'|' + newRecord.description +
                '|' + newRecord.callStatus+'|' + newRecord.contactType+'|' + newRecord.oldContactUser+'|' + newRecord.contactUser+'|' + newRecord.updatedBy +
                '|' + newRecord.callDateTime+'|' + prescriber.npi +'|' + pharmacy.value+'|' + member.value +'|' + newRecord.authID +'|' +
                newRecord.transactionID +'|' + newRecord.MTMId + '|' + newRecord.LastModifiedUser + '|' + newRecord.resolvedFirstCall + '|' + newRecord.planGroupId + '|'+ newRecord.updatedDatetime,
            ttContactReasonCode = {"CodeType":"0","codeValue":"D32F"};
        var newFields = fields.replace(/undefined/gi, '');
        record.phantom = false;
        //debugger;
        record.getProxy().setExtraParam('pKeyValue',record.get('CaseNum'));
        record.getProxy().setExtraParam('pKeyType', 'CaseNum');
        record.getProxy().setExtraParam('pFieldList', fieldList);
        record.getProxy().setExtraParam('pFields', newFields);
        record.getProxy().setExtraParam('ttContactReasonCode',ttContactReasonCode);
        record.getProxy().url = 'shared/rx/contactlogdata';
        record.save({
            callback:function(record, operation, response) {
                Ext.MessageBox.alert('Success', ' Contact log successfully saved!');
                me.onCancelClick();

            }
        });
    },
    onCancelClick: function () {
        //debugger;
        var window = this.getView();
        this.editor = Ext.destroy(window);
    },
    launchNotesDialog: function(button) {
        var that = this,
            vm = that.getViewModel(),
            notesModel = Ext.create('Atlas.common.model.Notes',{});

        notesModel.getProxy().setExtraParam('pParentSystemID',this.lookup('systemid').getValue());
        notesModel.load({
            success:function(record,operation)
            {
            },
            callback:function(record,operation)
            {
                var view = that.getView(),
                    form = that.lookup('callerform'),
                    window = Ext.create('Ext.window.Window', {
                        items:[{
                            xtype: 'panel',
                            viewModel:{
                                data:{
                                    formValues:form.getForm().getValues()
                                }
                            },
                            items:[{
                                xtype:'textarea',
                                reference:'notebox',
                                fieldLabel:'Notes'
                            }],
                            dockedItems:[{
                                xtype: 'toolbar',
                                dock:'bottom',
                                items:[{
                                    text:'Save',
                                    hidden: that.showSaveButton(button),
                                    listeners: {
                                        click: function (form) {
                                            var view = form.up().up(),
                                                vm = view.getViewModel(),
                                                formVals = vm.getData().formValues,
                                                note = view.items.items[0].value,
                                                user = Ext.first('viewport').getViewModel().get('user'),
                                                fields = 'CreateUser,CreateDate,CreateTime,Subject,Note,SystemID',
                                                fieldvals = user.un+'|10/12/2016|5:00|'+formVals.subject+'|'+note+'|'+formVals.systemId;

                                            var notesModel = Ext.create('Atlas.common.model.Notes', {});
                                            notesModel.getProxy().setExtraParam('psystemId', formVals.systemId);
                                            notesModel.getProxy().setExtraParam('pMode', 'A');
                                            notesModel.getProxy().setExtraParam('pFieldList', fields);
                                            notesModel.getProxy().setExtraParam('pFields', fieldvals);
                                            notesModel.save();
                                        }
                                    }
                                },{
                                    text:'Cancel'
                                }]
                            }]
                        }]
                    });
                view.add(window).show();
                var response = Ext.decode(operation.getResponse().responseText);
                var noteboxValue ='';
                for(var i = 0; i < response.data.length; i++){
                    var data = response.data[i];

                    noteboxValue+=data.CreateUser+'('+data.CreateDate+' '+data.CreateTime+')'+'\n'+data.Subject+'/n'+data.Note +'\n' + '\n';
                }
                that.lookup('notebox').setValue(noteboxValue);
            }
        });

    },
    showSaveButton: function(button) {
        if(button.reference === 'viewNotesButton'){
            return true;
        }else{
            return false;
        }
    }

});
