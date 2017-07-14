/**
 * Created by agupta on 10/16/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGOutreachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagoutreachcontroller',
    selSystemID: null,
    selectedAuthID: null,

    listen: {
        controller: {
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            }
        }
    },

    updateAuthID: function(authID, EventUUID, refreshView) {
        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title,
            CDAGInstanceUUID = this.getViewModel().get('CDAGInstanceUUID');

        if (activeTabTitle != 'Outreach' || EventUUID != CDAGInstanceUUID) {
            return;
        }

        var vm = this.getViewModel(),
            LastAuthID = vm.get('LastAuthID');

        if (!refreshView && LastAuthID != null && LastAuthID != undefined && LastAuthID == authID) {
            return;
        }

        vm.set('LastAuthID', authID);
        this.selectedAuthID = authID;

        this.getView().down('#hiddenKey').setValue(authID);
        this.loadGridData(0, authID);

    },

    btnCreate_Click : function(){
        var view = this.getView();
        this.resetFields();
        view.down('#hdnRecordAction').setValue("ADD");
        this.setButtonState("Add");
        this.selSystemID = null;

        var dtCreateDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'),
            currentTime = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'h:i:s A').toString().trim().split(' '),
            tCreateTime = currentTime[0],
            cbxCreateAMPM = currentTime[1];

        view.down('#dtCreateDate').setValue(dtCreateDate);
        view.down('#tCreateTime').setValue(tCreateTime);
        view.down('#cbxCreateAMPM').setValue(cbxCreateAMPM);
    },

    populateFields : function(record){
        var view = this.getView();

        this.resetFields();

        this.getViewModel().set('SelectedGridRecord', record);

        if (record == null){
            return;
        }

        this.selSystemID = record.data.SystemID;
        this.getView().down('#formOutreach').loadRecord(record);

        if (record.data.CallDateTime != '')
        {
            var arrCallDateTime = record.data.CallDateTime.toString().replace('  ',' ').split(' ');
            view.down('#dtCreateDate').setValue(arrCallDateTime[0]);
            view.down('#tCreateTime').setValue(arrCallDateTime[1].length == 7 ? '0' + arrCallDateTime[1] : arrCallDateTime[1]);
            view.down('#cbxCreateAMPM').setValue(arrCallDateTime[2]);
        }
        view.down('#btnDelete').setDisabled(false);
    },

    btnDelete_Click: function () {
        var me = this;

        if (me.selSystemID == null) {
            Ext.Msg.alert("Error", "Please select a record to delete.");
            return;
        }

        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete selected record?', function (btn) {
            if (btn == 'yes') {
                var view = this.getView();

                var objOutreachBean = {};
                var authID = view.down('#hiddenKey').getValue();
                objOutreachBean.SystemID = me.selSystemID;
                objOutreachBean.RecordAction = "D";

                var setOutreachModel = Ext.create('Atlas.authorization.model.cdag.SetOutreachModel');
                setOutreachModel.getProxy().setExtraParam('pAuthID', authID);
                setOutreachModel.getProxy().setExtraParam('ttOutReach', objOutreachBean);
                setOutreachModel.phantom = false;
                setOutreachModel.save(
                    {
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                this.setButtonState('Delete');
                                this.resetFields();
                                me.getViewModel().set('SelectedGridRecord', '');
                                Ext.Msg.alert("Success", "Record deleted successfully.");
                                me.loadGridData('0', authID);
                            }
                            else {
                                Ext.Msg.alert("Error", objResp.message[0].message);
                            }
                        }
                    }
                )
            }
            else {
                return false;
            }
        }, this);
    },

    btnCancel_Click: function () {
        var view = this.getView();
        this.setButtonState('Cancel');

        var rdgContactCode = view.down("#rdgContactCode");
        rdgContactCode.removeAll(true);

        this.populateFields(this.getViewModel().get('SelectedGridRecord'));
        view.down('#hdnRecordAction').setValue('');
    },

    checkDateTime: function (dControl, tControl, cControl) {
        var format = cControl.getValue();
        var ddate = dControl.getRawValue();
        var time = tControl.getValue();

        if (
            (format != null && format != undefined && format != '') &&
            (ddate != null && ddate != undefined && ddate != '') &&
            (time != null && time != undefined && time != '')
        ) {
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            if (format == "PM" && hours < 12) hours = hours + 12;
            if (format == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            ddate = ddate + " " + sHours + ":" + sMinutes + ":00";
            var date1 = new Date(ddate);
            var date2 = Atlas.common.utility.Utilities.getLocalDateTime();
            if (date1 > date2) {
                Ext.Msg.alert('Validation Error', 'Please enter "' + dControl.fieldLabel.replace('<b>', '').replace('</b>', '') + '" date time less than current date time.');
                dControl.focus();
                return false;
            }
        }
        return true;
    },

    rdgContactCode_Change: function (rdgContactType, newValue, oldValue, eOpts) {
        var view = this.getView();
        view.down('#txtReason').setValue(newValue.ContactCode);
    },

    btnSave_Click: function () {
        var me = this,
            view = this.getView();

        if (!view.down('#formOutreach').isValid()) {
            Ext.Msg.alert('Review Validation Error', 'Please enter required fields.');
            return false;
        }

        if (!this.checkDateTime(view.down('#dtCreateDate'), view.down('#tCreateTime'), view.down('#cbxCreateAMPM'))) {
            return false;
        }

        var recordAction = view.down('#gridOutreachHistory').getSelectionModel().getSelected().items.length == 0 ? 'ADD' : view.down('#hdnRecordAction').getValue();
        var objOutreachBean = {};
        var setOutreachModel = Ext.create('Atlas.authorization.model.cdag.SetOutreachModel');
        var authID = view.down('#hiddenKey').getValue();
        objOutreachBean.CallDateTime = view.down('#dtCreateDate').getValue() == '' ? '' : (Ext.Date.format(view.down('#dtCreateDate').getValue(), 'm/d/Y') + ' ' + view.down('#tCreateTime').getValue() + ' ' + view.down('#cbxCreateAMPM').getValue());
        objOutreachBean.OutreachEntity = view.down('#cbxDetermination').getValue();
        objOutreachBean.CallerLastName = view.down('#txtCallerLastName').getValue();
        objOutreachBean.CallerFirstName = view.down('#txtCallerFirstName').getValue();
        objOutreachBean.CallerPhone = view.down('#txtCallerPhone').getValue();
        objOutreachBean.CallerFax = view.down('#txtCallerFax').getValue();
        objOutreachBean.ReasonCode = view.down('#txtReason').getValue().split('-')[0].trim();
        objOutreachBean.OutreachDescription = view.down('#txtOutreachDescription').getValue();

        if (recordAction == "ADD") {
            objOutreachBean.SystemID = 0;
            objOutreachBean.RecordAction = "A";
        }

        setOutreachModel.getProxy().setExtraParam('pAuthID', authID);
        setOutreachModel.getProxy().setExtraParam('ttOutReach', objOutreachBean);
        setOutreachModel.phantom = false;
        setOutreachModel.save(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code != 0) {
                            Ext.Msg.alert("Error", objResp.message[0].message);
                        }
                        else if (objResp.message[0].code == 0) {

                            var rdgContactCode = view.down("#rdgContactCode");
                            rdgContactCode.removeAll(true);

                            Ext.Msg.alert('Success', 'Record ' + (objOutreachBean.RecordAction == 'D' ? 'deleted' : 'saved') + ' successfully' , function (btn) {
                                me.fireEvent('refreshNotesAttachment', authID);
                                me.setButtonState("Save");
                                me.loadGridData(objResp.metadata.pSystemID, authID);
                            });

                        }
                    }
                }
            }
        )


    },

    rdgContactType_Change: function (rdgContactType, newValue, oldValue, eOpts) {

        var view = this.getView();
        var ContactCodeCategory = newValue.ContactCodeCategory;
        var rdgContactCode = view.down("#rdgContactCode");

        view.down('#txtReason').setValue('');
        rdgContactCode.removeAll(true);

        if (ContactCodeCategory == 'InvalidType') {
            return;
        }

        var modelContactCode = Ext.create('Atlas.common.model.ContactCode');
        modelContactCode.getProxy().setExtraParam('pShowAll', true);
        modelContactCode.getProxy().setExtraParam('ipcCategory', ContactCodeCategory);
        modelContactCode.getProxy().setExtraParam('iplGetGeneral', false);

        modelContactCode.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    objResp.data.forEach(function (item, count) {
                        if (item.ACTIVE == true) {
                            view.down('#rdgContactCode').add({
                                xtype: 'radio',
                                inputValue: item.ReasonCode + ' - ' + item.DESCRIPTION,
                                name: 'ContactCode',
                                itemId: item.ReasonCode,
                                boxLabel: item.DESCRIPTION,
                                checked: false
                            });

                        }
                    })
                }
            }
        });

    },

    init: function () {

    },

    initViewModel: function () {
        var view = this.getView();
        this.bindContactCategory();
        view.down('#hiddenKey').setValue(this.selectedAuthID);
        this.setButtonState('');
    },

    bindContactCategory: function () {
        var view = this.getView();
        var listDetailModel = Ext.create('Atlas.common.model.shared.ListDetailModel');
        listDetailModel.getProxy().setExtraParam('pListName', 'ContactCodeCategory');
        listDetailModel.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    view.down('#rdgContactType').add({
                        xtype: 'radio',
                        itemId: 'InvalidType',
                        inputValue: 'InvalidType',
                        name: 'ContactCodeCategory',
                        hidden: true
                    });
                    objResp.data.forEach(function (item, count) {
                        if (item.charString == 'yes|Outreach') {
                            view.down('#rdgContactType').add({
                                xtype: 'radio',
                                itemId: item.ListItem,
                                width: 200,
                                inputValue: item.ListItem,
                                name: 'ContactCodeCategory',
                                boxLabel: item.ListDescription
                            });

                        }
                    })

                }
            }
        });
    },

    loadGridData: function (systemID, authId) {
        var vm = this.getViewModel(),
            me = this,
            grid = this.getView().down('#gridOutreachHistory'),
            selectedItem = 0,
            storeOutreachHistory = vm.getStore('storeoutreachhistory');

        this.resetFields();
        this.selSystemID = null;

        var storeDetermination = vm.getStore('storedetermination');
        storeDetermination.getProxy().setExtraParam('pAuthID', authId);
        storeDetermination.getProxy().setExtraParam('pIncCanceled', 'true');
        storeDetermination.load();

        storeOutreachHistory.getProxy().setExtraParam('pAuthID', authId);
        storeOutreachHistory.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        if (records.length != 0)
                        {
                            if (systemID != 0)
                            {
                                selectedItem = grid.getStore().find('SystemID', systemID);
                            }
                            grid.getSelectionModel().select(selectedItem);
                            me.populateFields(records[selectedItem]);
                        }
                    }
                }
            });
    },

    gridRowSelected: function(dv, record, item, index, e){
        this.populateFields(record);
    },

    disableFields: function (lDisabled) {
        var view = this.getView();
        view.down('#cbxDetermination').setDisabled(lDisabled);
        view.down('#txtCallerLastName').setDisabled(lDisabled);
        view.down('#txtCallerFirstName').setDisabled(lDisabled);
        view.down('#dtCreateDate').setDisabled(lDisabled);
        view.down('#tCreateTime').setDisabled(lDisabled);
        view.down('#cbxCreateAMPM').setDisabled(lDisabled);
        view.down('#txtCallerPhone').setDisabled(lDisabled);
        view.down('#txtCallerFax').setDisabled(lDisabled);
        view.down('#txtReason').setDisabled(lDisabled);
        view.down('#txtOutreachDescription').setReadOnly(lDisabled);

        if (lDisabled) {
            view.down('#txtOutreachDescription').addCls('readonly-opacity');
        }
        else {
            view.down('#txtOutreachDescription').removeCls('readonly-opacity');
        }

        if (!lDisabled) {
            view.down('#formOutreach').isValid();
        }
    },

    setButtonState: function (mode) {
        var view = this.getView();
        var lDisabled = true;

        if (mode == "Add") {
            view.down('#btnCreate').setDisabled(true);
            view.down('#btnSave').setDisabled(false);
            view.down('#btnCancel').setDisabled(false);
            view.down('#btnDelete').setDisabled(true);
            view.down('#gridOutreachHistory').setDisabled(true);
            view.down('#rdgContactType').setDisabled(false);
            lDisabled = false;

        }
        else if (mode == "Cancel" || mode == "Save") {
            view.down('#btnCreate').setDisabled(false);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnDelete').setDisabled(false);
            view.down('#gridOutreachHistory').setDisabled(false);
            view.down('#rdgContactType').setDisabled(true);
            lDisabled = true;
        }
        else {
            view.down('#btnCreate').setDisabled(false);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnDelete').setDisabled(true);
            view.down('#gridOutreachHistory').setDisabled(false);
            view.down('#rdgContactType').setDisabled(true);
            lDisabled = true;
        }

        this.disableFields(lDisabled);
    },

    resetFields: function () {
        this.getView().down('#formOutreach').reset();
        this.getView().down('#rdgContactType').setValue({
            ContactCodeCategory : 'InvalidType'
        });
    },

    timeChange: function (control, e) {
        var hour = "";
        var min = "";
        var sec = "";
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            return;
        }

        var val = control.getValue();

        for (var iCnt = 0; iCnt < val.length; iCnt++) {

            if (val[iCnt] == ":") {
                continue;
            }

            if (iCnt <= 2) {
                hour = hour + val[iCnt];
                if (iCnt == 1) {
                    hour = hour + ":";
                }
            }

            if (iCnt > 2 && iCnt <= 5) {
                min = min + val[iCnt];

                if (iCnt == 4) {
                    min = min + ":";
                }
            }

            if (iCnt > 5) {
                sec = sec + val[iCnt];
            }
        }

        control.setValue(hour + min + sec);
    },

    formatPhoneNumber: function (control, e) {
        var i;
        var returnString = '';
        var s = control.getValue();
        if (s.charAt(0) == '+'){
            return false;
        }
        var filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';

        /* Search through string and append to unfiltered values
         to returnString. */
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }
        control.setValue(returnString);

        return false;
    }

});