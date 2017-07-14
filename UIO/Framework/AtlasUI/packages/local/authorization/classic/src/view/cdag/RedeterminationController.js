/**
 * Created by agupta on 10/3/2016.
 */
Ext.define('Atlas.authorization.view.cdag.RedeterminationController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.redeterminationcontroller',
    selectedAuthID: null,
    authPlangroupId: null,
    selectedRDSystemID: null,
    CarrierLobID: null,
    InitialDecisionBy: null,
    MedicareUrgencyType: [],
    UrgencyType: [],

    listen: {
        controller: {
            '*': {
                tabchange : function(){ alert('activate rd');}
            },
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            }
        },
        store: {
            '#storeRDUrgency': {
                load: 'filterRDUrgencyStore'
            },
            '#storeRDUrgencyMedicare': {
                load: 'filterRDUrgencyStore'
            },
            '#storereceivedviass' : {
                load: 'storereceivedviass'
            },
            '#storeassignto' : {
                load: 'storeassignto'
            }
        }
    },

    filterRDUrgencyStore: function (store, records, success) {

        var vm = this.getViewModel(),
            storeRDUrgencyMedicare = vm.getStore('storeRDUrgencyMedicare'),
            storeRDUrgency = vm.getStore('storeRDUrgency'),
            lobId = (store.storeId == 'storeRDUrgencyMedicare' ? '' : '2');

        store.each(function (record) {
            if (record.get('charString').trim() == lobId) {
                var itemIndex = store.data.indexOf(record);
                store.removeAt(itemIndex );
            }
        });

        if (storeRDUrgencyMedicare.data.length != 0 && storeRDUrgency.data.length != 0) {
            this.bindUrgencyTypeCombo(this.CarrierLobID);
        }
    },

    storereceivedviass: function (store, records, success) {
        var selIndex = store.find('name', '--Select--'),
            emptySelection = Ext.data.Record.create({
                name: '--Select--',
                value: '-1'
            });

        if (selIndex == -1) {
            store.insert(0, emptySelection);
        }
    },

    storeassignto: function (store, records, success) {
        var selIndex = store.find('userName', '--Select--'),
            emptySelection = Ext.data.Record.create({
                userName: '--Select--'
            });

        if (selIndex == -1) {
            store.insert(0, emptySelection);
        }
    },

    bindUrgencyTypeCombo: function (lobID) {
        var view = this.getView(),
            vm = this.getViewModel(),
            cbxUrgencyType = view.down('#cbxUrgencyType'),
            storeurgencytype = vm.getStore('storeurgencytype'),
            storeRDUrgency = vm.getStore('storeRDUrgency'),
            storeRDUrgencyMedicare = vm.getStore('storeRDUrgencyMedicare');

        if (storeurgencytype != null) {
            storeurgencytype.removeAll();

            if (lobID == '0') {
                cbxUrgencyType.bindStore(storeurgencytype);
            }
            else if (lobID == '2') {
                cbxUrgencyType.bindStore(storeRDUrgencyMedicare);
            }
            else {
                cbxUrgencyType.bindStore(storeRDUrgency);
            }
        }
    },

    loadAppealType: function (planGroupId) {
        var soreappealtype = this.getViewModel().getStore('storeappealtype');
        soreappealtype.getProxy().setExtraParam('ipiPlangroupId', planGroupId);
        soreappealtype.getProxy().setExtraParam('iplChkAccessToUser',false);
        soreappealtype.getProxy().setExtraParam('pListName','AppealType');
        soreappealtype.load();
    },

    updateAuthID: function(authID, EventUUID, refreshView) {
        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title,
            CDAGInstanceUUID = this.getViewModel().get('CDAGInstanceUUID');

        if (activeTabTitle != 'Redetermination' || EventUUID != CDAGInstanceUUID) {
            return;
        }

        var view = this.getView(),
            vm = this.getViewModel(),
            CDAGTopPanelData = vm.get('CDAGTopPanelData'),
            DeterminationType = CDAGTopPanelData.DeterminationType,
            PrntHidLOB = CDAGTopPanelData.CarrierLobID,
            LastAuthID = vm.get('LastAuthID');

        if (!refreshView && LastAuthID != null && LastAuthID != undefined && LastAuthID == authID) {
            return;
        }

        vm.set('LastAuthID', authID);
        view.down('#hdnPrntHidLOB').setValue(PrntHidLOB);

        this.InitialDecisionBy = CDAGTopPanelData.InitialDecisionBy;

        if (DeterminationType == 'CD') {
            view.down('#chkDischargeNotification').show();
            view.down('#txtHospital').show();
        }
        else {
            view.down('#chkDischargeNotification').hide();
            view.down('#txtHospital').hide();
        }

        this.CarrierLobID = PrntHidLOB;
        this.selectedAuthID = authID;
        this.authPlangroupId = CDAGTopPanelData.PlanGroupId;

        this.bindUrgencyTypeCombo(this.CarrierLobID);
        this.loadAppealType(CDAGTopPanelData.PlanGroupId);
        this.loadStatusDropDown(this.authPlangroupId, '15', 'Denied - Appeal In Process', false);
        //this.loadGridData(0, authID);
    },

    showUrgencyChangeWindow: function () {
        var me = this,
            vm  = this.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Urgency Type Change',
            itemId: 'winUrgencyType',
            height: 120,
            width: 450,
            modal : true,
            controller: {
                parent: me
            },
            viewModel: {
                parent: vm
            },
            dockedItems:[{
                xtype:'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text:'Save',
                        handler: 'onUrgencyChangeSave',
                        scope: me
                    }
                ]
            }],
            layout: 'hbox',
            bodyPadding: '10',
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    itemId: 'UrgencyChangeForm',
                    items:[
                        {
                            xtype : 'datefield',
                            itemId : 'dtUrgecyChangeDate',
                            fieldLabel : 'Date/Time',
                            labelWidth: 100,
                            width : 250,
                            listeners: {
                                render: function(control) {
                                    control.setMaxValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                }

                            },
                            format: 'm/d/Y',
                            allowBlank: false
                        },
                        {
                            xtype : 'textfield',
                            itemId : 'tUrgecyChangeTime',
                            width : 90,
                            enableKeyEvents: true,
                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                            allowBlank: false,
                            listeners: {
                                'keyup': {
                                    fn: 'timeChange',
                                    scope: me
                                }
                            },
                            emptyText: 'HH:MM:SS',
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            enforceMaxLength: 8
                        },
                        {
                            xtype: 'combobox',
                            itemId : 'cbxUrgecyChange',
                            width : 72,
                            store:['AM','PM'],
                            allowBlank: false
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onUrgencyChangeSave: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            winUrgencyType = view.down('#winUrgencyType'),
            UrgencyChangeForm = winUrgencyType.down('#UrgencyChangeForm').getForm();

        if (!UrgencyChangeForm.isValid()) {
            Ext.Msg.alert('CD Validation Error','Please provide date and time.');
        }
        else {
            if (!this.checkDateTime(winUrgencyType.down('#dtUrgecyChangeDate'), winUrgencyType.down('#tUrgecyChangeTime'), winUrgencyType.down('#cbxUrgecyChange'))) {
                return false;
            }

            vm.set('UrgencyWindowOpen', true);
            this.btnSave_Click();
        }
    },

    selectDischargenotification: function (selection) {
        var view = this.getView();

        if(selection.value == true){
            view.down('#txtHospital').setDisabled(false);
        }
        else{
            view.down('#txtHospital').setDisabled(true);
            view.down('#txtHospital').setValue('');
        }
    },

    selectRequestor: function (selection) {

        var view = this.getView();

        view.down('#formRequestor').reset();

        if (selection.value == 'MemberRep') {
            view.down('#formRDRequestor').expand();
            view.down('#txtRDRequestorName').allowBlank = false;
            view.down('#txtRDRequestorRelationship').allowBlank = false;
            view.down('#txtRDRequestorAddress').allowBlank = false;
            view.down('#txtRDRequestorCity').allowBlank = false;
            view.down('#txtRDRequestorState').allowBlank = false;
            view.down('#txtRDRequestorZip').allowBlank = false;
            view.down('#txtRDRequestorPhone').allowBlank = false;
        }
        else {
            view.down('#formRDRequestor').collapse();
            view.down('#txtRDRequestorName').allowBlank = true;
            view.down('#txtRDRequestorRelationship').allowBlank = true;
            view.down('#txtRDRequestorAddress').allowBlank = true;
            view.down('#txtRDRequestorCity').allowBlank = true;
            view.down('#txtRDRequestorState').allowBlank = true;
            view.down('#txtRDRequestorZip').allowBlank = true;
            view.down('#txtRDRequestorPhone').allowBlank = true;
            view.down('#txtRDRequestorFax').allowBlank = true;
            view.down('#txtRDRequestorEmail').allowBlank = true;
        }

        view.down('#formRedetermination').isValid();
    },

    btnCreate_Click : function(){
        this.selectedRDSystemID = null;
        var view = this.getView(),
            cbxRedeterminationStatus = view.down('#cbxRedeterminationStatus');

        this.resetFields();
        view.down('#cbxRedeterminationStatus').setValue(15);
        view.down('#hdnRecordAction').setValue('ADD');
        this.setButtonState('Add');
        view.down('#dtRDEffectiveDate').setDisabled(true);
        view.down('#dtRDTermDate').setDisabled(true);
        view.down('#cbxUpdateEffectuationDate').setValue('');
        view.down('#cbxUpdateEffectuationDate').hide();
        view.down('#cbxUpdateEffectuationDate').AllowBlank = true;

        view.down('#hdnRDUrgencyType').setValue('');

        var store = cbxRedeterminationStatus.getStore(),
            selIndex = store.find('tempRec', true);

        if (selIndex != -1) {
            store.removeAt(selIndex);
        }
    },

    btnEdit_Click: function () {

        if (this.selectedRDSystemID == null) {
            Ext.Msg.alert('Error', 'Please select a record to edit.');
            return;
        }

        this.getView().down('#hdnRecordAction').setValue('UPDATE');
        this.getView().down('#cbxRedeterminationStatus').setDisabled(false);
        this.setButtonState('Edit');
    },

    btnCancel_Click: function () {
        this.setButtonState('Cancel');

        this.populateFields(this.getViewModel().get('SelectedGridRecord'));
    },

    btnDelete_Click: function () {

        var me = this;

        if (this.selectedRDSystemID == null) {
            Ext.Msg.alert('Error', 'Please select a record to delete.');
            return;
        }

        Ext.Msg.confirm('Delete Appeal', 'Are you sure you would like to delete selected appeal?', function (btn) {
            if (btn == 'yes') {
                me.getView().down('#hdnRecordAction').setValue('DELETE');
                me.btnSave_Click();
                return false;
            }
        });
    },

    AppealStatusUpdate: function (selection) {

        var view = this.getView();

        if (selection.value == '14'){
            view.down('#dtRDEffectiveDate').setDisabled(false);
            view.down('#dtRDTermDate').setDisabled(false);
        }
        else {
            view.down('#dtRDEffectiveDate').setDisabled(true);
            view.down('#dtRDTermDate').setDisabled(true);
        }
    },

    loadGridData: function (systemID, authId) {
        this.initViewModel();
        this.resetFields();

        var view = this.getView(),
            me = this,
            vm = this.getViewModel(),
            selectedItem = 0;

        view.down('#cbxRDReason').setValue('');
        view.down('#txtRDNotes').setValue('');
        view.down('#chkRDResvldInFirstCall').setValue(false);
        view.down('#chkRDResvldInFirstCall').setDisabled(true);

        var grid = this.getView().down('#RedeterminationHistoryGridPanel');
        var storeRd = vm.getStore('storeredeterminationhistory');
        storeRd.getProxy().setExtraParam('pAuthID', authId);
        storeRd.load(
            {
                callback: function (records, opts, success) {
                    var hasRecord = storeRd.queryBy(function(records,id){
                        return ((records.get('AppealStatus') == '15' || records.get('AppealStatus') == '26' || records.get('AppealStatus') == '27') && records.get('AppealCanceled') == 'false');
                    });
                    
                    if (hasRecord.length == 0) {
                        view.down('#btnRedeterminationCreate').setDisabled(false);
                    }
                    else {
                        view.down('#btnRedeterminationCreate').setDisabled(true);

                    }

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
            var date2 =  Atlas.common.utility.Utilities.getLocalDateTime();
            if (date1 > date2) {
                Ext.Msg.alert('Validation Error', 'Please enter "' + dControl.fieldLabel.replace('<b>', '').replace('</b>', '') + '" date time less than current date time.');
                dControl.focus();
                return false;
            }
        }
        return true;
    },

    gridRowSelected: function(dv, record, item, index, e){
        this.populateFields(record);
    },

    populateFields: function (record) {

        if (record == null) {
            return;
        }

        var view = this.getView(),
            cbxRedeterminationStatus = view.down('#cbxRedeterminationStatus'),
            vm = this.getViewModel();
        this.resetFields();
        this.getViewModel().set('SelectedGridRecord', record);
        var PrntHidMedicarePAQueueAccess = (vm.get('hidMedicarePAQueueAccess') == null || vm.get('hidMedicarePAQueueAccess') == undefined ? false : vm.get('hidMedicarePAQueueAccess'))
        var PrntHidLOB = view.down('#hdnPrntHidLOB').getValue() != '' ? view.down('#hdnPrntHidLOB').getValue() : 1;
        var AppealStatus = record.data.AppealStatus;
        var IsEditableRow = this.CheckEditableRow();

        var store = cbxRedeterminationStatus.getStore(),
            selIndex = store.find('tempRec', true);

        if (selIndex != -1) {
            store.removeAt(selIndex);
        }

        selIndex = store.findExact('ListItem', AppealStatus);
        if (selIndex == -1) {
            var existingSelection = Ext.data.Record.create({
                ListDescription: record.data.AppealStatusDesc,
                ListItem: AppealStatus,
                tempRec: true
            });
            store.add(existingSelection);
        }

        this.selectedRDSystemID = record.data.SystemID;
        this.getView().down('#formRedetermination').loadRecord(record);
        view.down('#dtRDEffectiveDate').setValue(record.data.EffectiveDate);
        view.down('#dtRDTermDate').setValue(record.data.TermDate);
        view.down('#txtHospital').setValue(record.data.PendDischrgHospital);
        view.down('#lblCreatedBy').setValue(record.data.AssignFrom);
        cbxRedeterminationStatus.setValue(AppealStatus);

        if (record.data.UserStartDate != '') {
            var startDateValue = this.getDateTimeFormat(record.data.UserStartDate);
            view.down('#dtRDReceivedDate').setValue(startDateValue["DATE"]);
            view.down('#tRDReceivedTime').setValue(startDateValue["TIME"].length == 7 ? '0' + startDateValue["TIME"] : startDateValue["TIME"]);
            view.down('#cbxRDReceiveDate').setValue(startDateValue["TERM"]);
        }
        if (record.data.AORDateTime != '') {
            var aORDateTime = this.getDateTimeFormat(record.data.AORDateTime);
            view.down('#dtRDAORRecvdDate').setValue(aORDateTime["DATE"]);
            view.down('#tRDAORRecvdTime').setValue(aORDateTime["TIME"].length == 7 ? '0' + aORDateTime["TIME"] : aORDateTime["TIME"]);
            view.down('#cbxRDAORRecvdDate').setValue(aORDateTime["TERM"]);
        }

        view.down('#cbxRDSSReceiveType').setValue(record.data.SupportingDocIntake);
        if (record.data.SupportingDocDateTime != '') {
            var ssDateTime = this.getDateTimeFormat(record.data.SupportingDocDateTime);
            view.down('#dtSSReceived').setValue(ssDateTime["DATE"]);
            view.down('#tSSRecvdTime').setValue(ssDateTime["TIME"].length == 7 ? '0' + ssDateTime["TIME"] : ssDateTime["TIME"]);
            view.down('#cbxSSAmPm').setValue(ssDateTime["TERM"]);
        }
        else {
            view.down('#dtSSReceived').setValue('');
            view.down('#tSSRecvdTime').setValue('');
            view.down('#cbxSSAmPm').setValue('');
        }
        view.down('#cbxUpdateEffectuationDate').hide();
        view.down('#cbxUpdateEffectuationDate').allowBlank = true;

        if (record.data.AppealCanceled == 'true' || record.data.AppealStatus != '15') {
            view.down('#btnRedeterminationEdit').setDisabled(true);
            view.down('#btnRedeterminationDelete').setDisabled(true);

            if (PrntHidMedicarePAQueueAccess == true && PrntHidLOB == 2 && IsEditableRow) {
                view.down('#btnRedeterminationEdit').setDisabled(false);
                if (AppealStatus == "14") {
                    view.down('#cbxUpdateEffectuationDate').show();
                    view.down('#cbxUpdateEffectuationDate').allowBlank = false;
                    view.down('#cbxUpdateEffectuationDate').setDisabled(true);
                }
            }
        }
        else {
            view.down('#btnRedeterminationCreate').setDisabled(true);
            view.down('#btnRedeterminationEdit').setDisabled(false);
            view.down('#btnRedeterminationDelete').setDisabled(false);
        }

        view.down('#cbxRedeterminationStatus').setDisabled(true);
        view.down('#dtRDEffectiveDate').setDisabled(true);
        view.down('#dtRDTermDate').setDisabled(true);
        view.down('#hdnAppealStatus').setValue(record.data.AppealStatus);

        vm.set('UrgencyType', record.data.UrgencyType);
        vm.set('DischargeNotification', record.data.PendDischrgNotify);

        view.down('#cbxUrgencyType').setValue(record.data.UrgencyType);

        if (record.data.AuthRecvdFrom == 'MemberRep' || record.data.RequestorName != '' || record.data.RequestorRelationship != '' ||
            record.data.Address != '' || record.data.City != '' || record.data.State != '' ||
            record.data.ZipCode != '' || record.data.Phone != '' || record.data.Fax != '' || record.data.Email != '') {
            view.down('#formRDRequestor').expand();
        }
        else {
            view.down('#formRDRequestor').collapse();
        }

        this.markAuthReadOnly();
    },

    resetFields: function () {
        var view = this.getView();
        view.down('#formRedetermination').reset();

        view.down('#lblFirstDecisionMaker').setValue(this.InitialDecisionBy);
        view.down('#lblCreatedBy').setValue(Atlas.user.un);
    },

    CheckEditableRow: function () {
        var result = false;
        var view = this.getView();
        if (view.down('#RedeterminationHistoryGridPanel').getSelectionModel().hasSelection()) {
            var selectedSeq = view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items[0].data.SeqNum;
            var lastSeq = 0;
            var i;
            for (i = 0; i < view.down('#RedeterminationHistoryGridPanel').store.data.items.length; i++) {
                if (lastSeq < view.down('#RedeterminationHistoryGridPanel').store.data.items[i].data.SeqNum) {
                    lastSeq = view.down('#RedeterminationHistoryGridPanel').store.data.items[i].data.SeqNum;
                }
            }
            if (selectedSeq == lastSeq) {
                result = true;
            }
        }
        return result;
    },

    getDateTimeFormat: function (dateTime) {
        var dateDictionary = [];
        if (dateTime != '') {
            if (dateTime.toString().length > 15) {
                dateDictionary['DATE'] = dateTime.substring(0, 10);
                dateDictionary['TIME'] = dateTime.substring(11, 19).trim();

                if (dateDictionary['TIME'].length == 7) {
                    dateDictionary['TIME'] = '0' + dateDictionary['TIME'];
                }


                if (dateTime.indexOf('PM') != -1) {
                    dateDictionary['TERM'] = 'PM';
                }
                else {
                    dateDictionary['TERM'] = 'AM';
                }
            }
            else {
                dateDictionary['DATE'] = '';
                dateDictionary['TIME'] = '';
            }
        }
        else {
            dateDictionary['DATE'] = '';
            dateDictionary['TIME'] = '';
            dateDictionary['TERM'] = 'AM';
        }

        return dateDictionary;

    },

    loadStatusDropDown: function (planGroupId, status, description, isCreate) {
        var me = this;
        var vm = this.getViewModel();
        var objRespDeterminationStatus = '';
        var objRespAuthStatus = '';
        var cbxRedeterminationStatus = this.getView().down('#cbxRedeterminationStatus');
        var rdList = [];
        var storeRDCombo = vm.getStore('storeRDCombo');

        var storeRd = vm.getStore('storeredeterminationstatus');
        storeRd.getProxy().setExtraParam('pListName', 'DeterminationStatus');
        storeRd.load({
            scope: me,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {

                    objRespDeterminationStatus = Ext.decode(operation.getResponse().responseText);
                    if (objRespDeterminationStatus.data.length > 0) {
                        objRespDeterminationStatus.data.forEach(function (item, count) {
                            if (item.ListItem == 'RD') {
                                rdList = item.charString.split(',');
                            }
                        });
                    }
                    var setModel = Ext.create('Atlas.authorization.model.cdag.ListMaintenanceModel');
                    setModel.getProxy().setExtraParam('ipiPlangroupId', planGroupId);
                    setModel.getProxy().setExtraParam('iplChkAccessToUser', true);
                    setModel.getProxy().setExtraParam('pListName', 'PriorAuthStatus');
                    setModel.load(
                        {
                            scope: me,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                storeRDCombo.removeAll();

                                if (success) {
                                    objRespAuthStatus = Ext.decode(operation.getResponse().responseText);
                                    if (objRespAuthStatus.data.length > 0) {

                                        var isFound = false;

                                        for (var CDItem in objRespAuthStatus.data){

                                            for (var RDItem in rdList){

                                                if (rdList[RDItem] == objRespAuthStatus.data[CDItem].ListItem){

                                                    if (objRespAuthStatus.data[CDItem].ListItem == status)
                                                    {
                                                        isFound = true;
                                                    }

                                                    storeRDCombo.add(
                                                        {
                                                            ListItem: objRespAuthStatus.data[CDItem].ListItem,
                                                            ListDescription: objRespAuthStatus.data[CDItem].ListDescription
                                                        }
                                                    );
                                                }
                                            }
                                        }

                                        if (!isFound){
                                            storeRDCombo.add(
                                                {
                                                    ListItem: status,
                                                    ListDescription: description
                                                }
                                            );
                                        }

                                        cbxRedeterminationStatus.bindStore(storeRDCombo);
                                        cbxRedeterminationStatus.setValue(status);
                                    }
                                    else {
                                        storeRDCombo.add(
                                            {
                                                ListItem: status,
                                                ListDescription: description
                                            }
                                        );
                                        cbxRedeterminationStatus.bindStore(storeRDCombo);
                                        cbxRedeterminationStatus.setValue(status);
                                    }
                                }
                                else {
                                    storeRDCombo.add(
                                        {
                                            ListItem: status,
                                            ListDescription: description
                                        }
                                    );
                                    cbxRedeterminationStatus.bindStore(storeRDCombo);
                                    cbxRedeterminationStatus.setValue(status);
                                }
                            }
                        });
                }
                me.loadGridData(0, me.selectedAuthID);
            }
        });

    },

    btnSave_Click: function () {
        var me = this;
        var view = this.getView(),
            vm = this.getViewModel(),
            DischargeNotification = (vm.get('DischargeNotification') == 'true' ? true : false),
            UrgencyType = vm.get('UrgencyType'),
            winUrgencyType = view.down('#winUrgencyType'),
            ReasonCode = view.down('#cbxRDReason').getValue() != null && view.down('#cbxRDReason').getValue() != undefined ? view.down('#cbxRDReason').getValue() : '';

        var authID = this.selectedAuthID;

        if (authID == '' || authID == 'undefined'){
            Ext.Msg.alert('PA Validation Error', 'Please select an auth.');
            return;
        }


        if ((view.down('#dtRDAORRecvdDate').getValue() == null && view.down('#tRDAORRecvdTime').getValue() != '') ||
            (view.down('#dtRDAORRecvdDate').getValue() != null && view.down('#tRDAORRecvdTime').getValue() == '')) {
            Ext.Msg.alert('PA Validation Error', 'Please provide user date and time.');
            return false;
        }

        if ((view.down('#dtRDReceivedDate').getValue() == null && view.down('#tRDReceivedTime').getValue() != '') ||
            (view.down('#dtRDReceivedDate').getValue() != null && view.down('#tRDReceivedTime').getValue() == '')) {
            Ext.Msg.alert('PA Validation Error', 'Please provide user date and time.');
            return false;
        }

        var ssreceivedtype = view.down('#cbxRDSSReceiveType').getValue() != null &&
            view.down('#cbxRDSSReceiveType').getValue() != undefined &&
            view.down('#cbxRDSSReceiveType').getValue() != '' &&
            view.down('#cbxRDSSReceiveType').getValue() != '-1';
        var ssintake = view.down('#dtSSReceived').getValue() != null &&
            view.down('#dtSSReceived').getValue() != undefined &&
            view.down('#dtSSReceived').getValue() != '';
        if (ssreceivedtype != ssintake) {
            Ext.Msg.alert('PBM', 'Please fill S.S Received Date and S.S. Intake both.');
            return false;
        }
        if ((view.down('#dtSSReceived').getValue() == null && view.down('#tSSRecvdTime').getValue() != '') ||
            (view.down('#dtSSReceived').getValue() != null && view.down('#tSSRecvdTime').getValue() == '')) {
            Ext.Msg.alert('RD Validation Error', 'Please provide date and time.');
            return false;
        }

        if (view.down('#cbxRDRequestor').getValue() == 'MemberRep') {
            view.down('#txtRDRequestorName').allowBlank = false;
            view.down('#txtRDRequestorRelationship').allowBlank = false;
            view.down('#txtRDRequestorAddress').allowBlank = false;
            view.down('#txtRDRequestorCity').allowBlank = false;
            view.down('#txtRDRequestorState').allowBlank = false;
            view.down('#txtRDRequestorZip').allowBlank = false;
            view.down('#txtRDRequestorPhone').allowBlank = false;
        }
        else {
            view.down('#txtRDRequestorName').allowBlank = true;
            view.down('#txtRDRequestorRelationship').allowBlank = true;
            view.down('#txtRDRequestorAddress').allowBlank = true;
            view.down('#txtRDRequestorCity').allowBlank = true;
            view.down('#txtRDRequestorState').allowBlank = true;
            view.down('#txtRDRequestorZip').allowBlank = true;
            view.down('#txtRDRequestorPhone').allowBlank = true;
            view.down('#txtRDRequestorFax').allowBlank = true;
            view.down('#txtRDRequestorEmail').allowBlank = true;
        }
        if (!view.down('#formRedetermination').isValid()) {
            Ext.Msg.alert('Validation Error', 'Please enter valid field values.');
            return false;

        }

        if (!this.checkDateTime(view.down('#dtRDReceivedDate'), view.down('#tRDReceivedTime'), view.down('#cbxRDReceiveDate')) || !this.checkDateTime(view.down('#dtSSReceived'), view.down('#tSSRecvdTime'), view.down('#cbxSSAmPm')) || !this.checkDateTime(view.down('#dtRDAORRecvdDate'), view.down('#tRDAORRecvdTime'), view.down('#cbxRDAORRecvdDate')))
        {
            return false;
        }

        var objRedeterminationBean = {};
        objRedeterminationBean.EffectiveDate = Ext.Date.format(view.down('#dtRDEffectiveDate').getValue(), 'm/d/Y');
        objRedeterminationBean.TermDate = Ext.Date.format(view.down('#dtRDTermDate').getValue(), 'm/d/Y');
        objRedeterminationBean.recordAction = view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items.length == 0 ? 'ADD' : view.down('#hdnRecordAction').getValue();
        objRedeterminationBean.SaveDocList = view.down('#hdnSaveDocList').getValue();
        objRedeterminationBean.SaveAttachmentList = view.down('#hdnSaveDescList').getValue();
        objRedeterminationBean.PrntHidMedicarePAQueueAccess = view.down('#hdnPrntHidMedicarePAQueueAccess').getValue();
        objRedeterminationBean.RecievedDate = Ext.Date.format(view.down('#dtRDReceivedDate').getValue(), 'm/d/Y');
        objRedeterminationBean.ReceivedTime = view.down('#tRDReceivedTime').getValue();
        objRedeterminationBean.ReceivedAmPm = view.down('#cbxRDReceiveDate').getValue();
        objRedeterminationBean.AORRecvdDate = Ext.Date.format(view.down('#dtRDAORRecvdDate').getValue(), 'm/d/Y');
        objRedeterminationBean.AORRecvdTime = view.down('#tRDAORRecvdTime').getValue();
        objRedeterminationBean.AORRecvdAmPm = view.down('#cbxRDAORRecvdDate').getValue();
        objRedeterminationBean.SSRDRecvdDate = Ext.Date.format(view.down('#dtSSReceived').getValue(), 'm/d/Y');
        objRedeterminationBean.SSRDRecvdTime = view.down('#tSSRecvdTime').getValue();
        objRedeterminationBean.SSRDRecvdAmPm = view.down('#cbxSSAmPm').getValue();
        objRedeterminationBean.dtUrgencyUpdate = (vm.get('UrgencyWindowOpen') == false ? '' : winUrgencyType.down('#dtUrgecyChangeDate').getRawValue());
        objRedeterminationBean.tUrgencyUpdate = (vm.get('UrgencyWindowOpen') == false ? '' : winUrgencyType.down('#tUrgecyChangeTime').getValue());
        objRedeterminationBean.cbxAMPMUrgencyUpdate = (vm.get('UrgencyWindowOpen') == false ? '' : winUrgencyType.down('#cbxUrgecyChange').getValue());
        objRedeterminationBean.SystemID = view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items.length == 0 ? '0' : view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items[0].data.SystemID;
        objRedeterminationBean.AuthOirign = view.down('#cbxRDIntake').getValue();
        objRedeterminationBean.AppealType = view.down('#cbxRDAppealType').getValue();
        objRedeterminationBean.AppealStatus = view.down('#cbxRedeterminationStatus').getValue();
        objRedeterminationBean.AssignFrom = view.down('#lblCreatedBy').getValue();
        objRedeterminationBean.AssignTo = view.down('#cbxRDAssignUser').getValue() == '--Select--' || view.down('#cbxRDAssignUser').getValue() == null ? '' : view.down('#cbxRDAssignUser').getValue();
        objRedeterminationBean.AuthRecvdFrom = view.down('#cbxRDRequestor').getValue() == '-1' ? '' : view.down('#cbxRDRequestor').getValue();
        objRedeterminationBean.RequestorName = view.down('#txtRDRequestorName').getValue();
        objRedeterminationBean.RequestorRelationship = view.down('#txtRDRequestorRelationship').getValue();
        objRedeterminationBean.Address = view.down('#txtRDRequestorAddress').getValue();
        objRedeterminationBean.City = view.down('#txtRDRequestorCity').getValue();
        objRedeterminationBean.State = view.down('#txtRDRequestorState').getValue();
        objRedeterminationBean.ZipCode = view.down('#txtRDRequestorZip').getValue();
        objRedeterminationBean.Phone = view.down('#txtRDRequestorPhone').getValue();
        objRedeterminationBean.Fax = view.down('#txtRDRequestorFax').getValue();
        objRedeterminationBean.Email = view.down('#txtRDRequestorEmail').getValue();
        objRedeterminationBean.UrgencyType = view.down('#cbxUrgencyType').getValue();
        objRedeterminationBean.AppealCanceled = view.down('#chkAppealCancel').getValue();
        objRedeterminationBean.Notes = view.down('#txtRDNotes').getValue();
        objRedeterminationBean.ReasonCode = ReasonCode;
        objRedeterminationBean.ResolvedInFirstCall = view.down('#chkRDResvldInFirstCall').getValue();
        objRedeterminationBean.LastModified = view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items.length == 0 ? '' : view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items[0].data.LastModified;
        objRedeterminationBean.SupportingDocIntake = view.down('#cbxRDSSReceiveType').getValue() == '-1' || view.down('#cbxRDSSReceiveType').getValue() == null ? '' : view.down('#cbxRDSSReceiveType').getValue();

        /******************* IMPLEMENT CD and DMR **************************/
        objRedeterminationBean.PendDischrgNotify = view.down('#chkDischargeNotification').getValue();
        objRedeterminationBean.PendDischrgHospital = view.down('#txtHospital').getValue();

        var prntHidMedicarePAQueueAccess = objRedeterminationBean.PrntHidMedicarePAQueueAccess != '' ? objRedeterminationBean.PrntHidMedicarePAQueueAccess : false;

        var effectiveDate = view.down('#dtRDEffectiveDate').getValue();
        var termDate = view.down('#dtRDTermDate').getValue();
        var recordAction = objRedeterminationBean.recordAction;

        objRedeterminationBean.UpdateEffectuationdate = view.down('#cbxUpdateEffectuationDate').getValue() != null && (prntHidMedicarePAQueueAccess == true) ? view.down('#cbxUpdateEffectuationDate').getValue() : '';
        objRedeterminationBean.UserStartDate = view.down('#dtRDReceivedDate').getValue() == null ? '' : (Ext.Date.format(view.down('#dtRDReceivedDate').getValue(), 'm/d/Y') + ' ' + view.down('#tRDReceivedTime').getValue() + ' ' + view.down('#cbxRDReceiveDate').getValue());
        objRedeterminationBean.AORDateTime = view.down('#dtRDAORRecvdDate').getValue() == null ? '' : (Ext.Date.format(view.down('#dtRDAORRecvdDate').getValue(), 'm/d/Y') + ' ' + view.down('#tRDAORRecvdTime').getValue() + ' ' + view.down('#cbxRDAORRecvdDate').getValue());
        objRedeterminationBean.SupportingDocDateTime = view.down('#dtSSReceived').getValue() == null ? '' : (Ext.Date.format(view.down('#dtSSReceived').getValue(), 'm/d/Y') + ' ' + view.down('#tSSRecvdTime').getValue() + ' ' + view.down('#cbxSSAmPm').getValue());
        objRedeterminationBean.UrgencyUpdateDateTime = objRedeterminationBean.dtUrgencyUpdate == '' ? '' : objRedeterminationBean.dtUrgencyUpdate + ' ' + objRedeterminationBean.tUrgencyUpdate + ' ' + objRedeterminationBean.cbxAMPMUrgencyUpdate;

        objRedeterminationBean.lOverrideDecision = false;

        if (recordAction == 'ADD')
        {
            objRedeterminationBean.SystemID = 0;
            objRedeterminationBean.RecordAction = 'A';
        }
        else if (recordAction == 'UPDATE')
        {
            objRedeterminationBean.RecordAction = 'U';
            objRedeterminationBean.lastModified = this.getViewModel().get('SelectedGridRecord').get('lastModified');
            this.getViewModel().get('SelectedGridRecord')
        }
        else if (recordAction == 'DELETE')
        {
            objRedeterminationBean.RecordAction = 'D';
        }

        if (vm.get('UrgencyWindowOpen') == false) {
            if (this.selectedRDSystemID != null && UrgencyType != '' && view.down('#cbxUrgencyType').getValue() != UrgencyType && this.CarrierLobID == '2') {
                Ext.Msg.confirm('Confirm', 'Was request initially made under another timeframe ?', function (btn) {
                    if (btn == 'yes') {
                        me.showUrgencyChangeWindow();
                        return false;
                    }
                    else {
                        if (DischargeNotification != '' && DischargeNotification != view.down('#chkDischargeNotification').getValue() && view.down('#chkDischargeNotification').getValue() == true) {
                            Ext.Msg.confirm('Confirm', 'A discharge notification email will be sent to the review team, would you like to continue?', function (btn) {
                                if (btn == 'yes') {
                                    me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, false);
                                }
                                else {
                                    return false;
                                }
                            }, this);
                        }
                        else {
                            me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, false);
                        }
                    }
                });
                return false;
            }
        }
        else {
            if (winUrgencyType != 'undefined') {
                winUrgencyType.hide();
            }
        }

        if (DischargeNotification != '' && DischargeNotification != view.down('#chkDischargeNotification').getValue() && view.down('#chkDischargeNotification').getValue() == true) {
            Ext.Msg.confirm('Confirm', 'A discharge notification email will be sent to the review team, would you like to continue?', function (btn) {
                if (btn == 'yes') {
                    me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, false);
                }
                else {
                    return false;
                }
            }, this);
        }
        else {
            me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, false);

        }
    },

    redeterminationSaveDetail: function(authID, objRedeterminationBean, effectiveDate, termDate, skipWarning) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            oldAppealStatus = view.down('#hdnAppealStatus').getValue(),
            CDAGTopPanelData = vm.get('CDAGTopPanelData'),
            carrierId = CDAGTopPanelData.CarrierID,
            carrierLobId = CDAGTopPanelData.CarrierLobID,
            appealLetter = false,
            timeFrame = '',
            letterId = 0;

        if (carrierId == '5' || carrierId == '55' || carrierId == '32' || carrierId == '27') {
            if (objRedeterminationBean.RecordAction == 'U' && objRedeterminationBean.AppealStatus != oldAppealStatus && (objRedeterminationBean.AppealStatus == '13' || objRedeterminationBean.AppealStatus == '14')) {
                appealLetter = true;
            }
        }

        var setRedeterminationModel = Ext.create('Atlas.authorization.model.cdag.SetCoverageRedeterminationModel');
        setRedeterminationModel.getProxy().setExtraParam('pAuthId', authID);
        setRedeterminationModel.getProxy().setExtraParam('pSkipWarning', skipWarning);
        setRedeterminationModel.getProxy().setExtraParam('ttCoverageRedetermination', objRedeterminationBean);
        setRedeterminationModel.getProxy().setExtraParam('pEffDate', effectiveDate);
        setRedeterminationModel.getProxy().setExtraParam('pTermDate', termDate);
        setRedeterminationModel.phantom = false;

        setRedeterminationModel.save(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var view = this.getView();
                        var objResp = Ext.decode(operation.getResponse().responseText);

                        if (objResp.message[0].code == 0) {


                            Ext.Msg.alert('Success', 'Record saved successfully' , function (btn) {
                                me.setButtonState("Save");
                                me.loadGridData(objResp.metadata.pSystemID, authID);

                                view.down('#dtRDEffectiveDate').setDisabled(true);
                                view.down('#dtRDTermDate').setDisabled(true);
                                if (objRedeterminationBean.AppealCanceled || objRedeterminationBean.AppealStatus != '15')
                                {
                                    view.down('#btnRedeterminationEdit').setDisabled(true);
                                    view.down('#btnRedeterminationDelete').setDisabled(true);
                                    view.down('#cbxRedeterminationStatus').setDisabled(true);
                                }

                                me.fireEvent('parent_LoadGridValues', authID);
                                me.fireEvent('parentEventGetPA', authID);
                                me.fireEvent('setAuthDocument', authID);

                                if (appealLetter){

                                    if (objRedeterminationBean.AppealType == 'M1' || objRedeterminationBean.AppealType == 'M2'){

                                        if (objRedeterminationBean.AppealStatus == '14' && objRedeterminationBean.AppealType == 'M1'){
                                            letterId = '1';
                                            timeFrame = objRedeterminationBean.EffectiveDate.toString() + ' to ' + objRedeterminationBean.TermDate.toString();
                                        }
                                        else if (objRedeterminationBean.AppealStatus == '13' && objRedeterminationBean.AppealType == 'M1'){
                                            letterId = '2';
                                        }
                                        else if (objRedeterminationBean.AppealStatus == '14' && objRedeterminationBean.AppealType == 'M2' && carrierLobId != '2' && carrierLobId != '3'){
                                            letterId = '3';
                                            timeFrame = objRedeterminationBean.EffectiveDate.toString() + ' to ' + objRedeterminationBean.TermDate.toString();
                                        }
                                        else if (objRedeterminationBean.AppealStatus == '13' && objRedeterminationBean.AppealType == 'M2' && carrierLobId != '2' && carrierLobId != '3'){
                                            letterId = '4';
                                        }

                                        if (carrierLobId == '1' || carrierLobId == '3'){

                                            if (carrierId == '32'){
                                                me.openLetterTemplate('NextLevelMemberAppeal', timeFrame, letterId, objRedeterminationBean.SystemID);
                                            }
                                            else {
                                                me.openLetterTemplate('MemberAppeal', timeFrame, letterId, objRedeterminationBean.SystemID);
                                            }
                                        }
                                        else if (carrierLobId == '2'){
                                            me.openLetterTemplate('MemberRedetermination', timeFrame, letterId, objRedeterminationBean.SystemID);
                                        }
                                    }
                                    else if (objRedeterminationBean.AppealType == 'PA'){

                                        if (objRedeterminationBean.AppealStatus == '14'){
                                            letterId = '1';
                                            timeFrame = objRedeterminationBean.EffectiveDate.toString() + ' to ' + objRedeterminationBean.TermDate.toString();
                                        }
                                        else if (objRedeterminationBean.AppealStatus == '13'){
                                            letterId = '2';
                                        }


                                        if (carrierId == '27') {
                                            me.openLetterTemplate('ProviderAppeal', timeFrame, letterId, objRedeterminationBean.SystemID);
                                        }else {
                                            if (carrierLobId == '1'){
                                                if (carrierId == '32'){
                                                    me.openLetterTemplate('NextLevelProviderAppeal', timeFrame, letterId, objRedeterminationBean.SystemID);
                                                }
                                                else {
                                                    me.openLetterTemplate('ProviderAppeal', timeFrame, letterId, objRedeterminationBean.SystemID);
                                                }
                                            }
                                            else if (carrierLobId == '2'){
                                                me.openLetterTemplate('ProviderRedetermination', timeFrame, letterId, objRedeterminationBean.SystemID);
                                            }


                                        }

                                    }
                                }
                            });

                        }
                        else if (objResp.message[0].code == 1007) {
                            Ext.Msg.confirm('Information', objResp.message[0].message, function (btn) {
                                if (btn == 'yes') {
                                    me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, true);
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        else if (objResp.message[0].code == 1008) {
                            Ext.Msg.confirm('Information', objResp.message[0].message, function (btn) {
                                if (btn == 'yes') {
                                    objRedeterminationBean.lOverrideDecision = true;
                                    me.redeterminationSaveDetail(authID, objRedeterminationBean, effectiveDate, termDate, true);
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        else {
                            Ext.Msg.alert("Error", objResp.message[0].message);
                        }
                    }
                }
            }
        )
    },

    openLetterTemplate: function (pLetterName, timeFrame, letterId, appealType) {



        var vm = this.getViewModel(),
            letterParameters = vm.get('letterParameters');

        letterParameters[0].timeFrame = timeFrame;
        letterParameters[0].letterId = letterId;
        letterParameters[0].appealType = appealType;
        letterParameters[0].LetterName = pLetterName;

        var me = this,
            authId = this.selectedAuthID,
            win = Ext.create({
                xtype: 'cdaglettertemplate',
                autoShow: true,
                extraParams: letterParameters
            });

        me.getView().add(win);
        win.show();
    },

    disableFields : function(lDisabled) {
        var view = this.getView();
        view.down('#cbxRDIntake').setDisabled(lDisabled);
        view.down('#cbxRDAppealType').setDisabled(lDisabled);
        view.down('#cbxRDAssignUser').setDisabled(lDisabled);
        view.down('#cbxRDRequestor').setDisabled(lDisabled);
        view.down('#txtRDRequestorName').setDisabled(lDisabled);
        view.down('#txtRDRequestorRelationship').setDisabled(lDisabled);
        view.down('#txtRDRequestorAddress').setDisabled(lDisabled);
        view.down('#txtRDRequestorCity').setDisabled(lDisabled);
        view.down('#txtRDRequestorState').setDisabled(lDisabled);
        view.down('#txtRDRequestorZip').setDisabled(lDisabled);
        view.down('#txtRDRequestorPhone').setDisabled(lDisabled);
        view.down('#txtRDRequestorFax').setDisabled(lDisabled);
        view.down('#txtRDRequestorEmail').setDisabled(lDisabled);
        view.down('#cbxUrgencyType').setDisabled(lDisabled);
        view.down('#dtRDReceivedDate').setDisabled(lDisabled);
        view.down('#tRDReceivedTime').setDisabled(lDisabled);
        view.down('#cbxRDReceiveDate').setDisabled(lDisabled);
        view.down('#dtRDAORRecvdDate').setDisabled(lDisabled);
        view.down('#tRDAORRecvdTime').setDisabled(lDisabled);
        view.down('#cbxRDAORRecvdDate').setDisabled(lDisabled);
        view.down('#txtRDNotes').setDisabled(lDisabled);
        view.down('#cbxRDReason').setDisabled(lDisabled);
        view.down('#cbxRDSSReceiveType').setDisabled(lDisabled);
        view.down('#dtSSReceived').setDisabled(lDisabled);
        view.down('#tSSRecvdTime').setDisabled(lDisabled);
        view.down('#cbxSSAmPm').setDisabled(lDisabled);

        if (!lDisabled) {
            view.down('#formRedetermination').isValid();
        }
    },

    setButtonState : function(mode) {
        var view = this.getView();
        var hasSelection = view.down('#RedeterminationHistoryGridPanel').getSelectionModel().getSelected().items.length > 0;
        var lDisabled = true;

        if (mode == 'Add')
        {
            view.down('#btnRedeterminationCreate').setDisabled(true);
            view.down('#btnRedeterminationEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(false);
            view.down('#btnRedeterminationCancel').setDisabled(false);
            view.down('#btnRedeterminationDelete').setDisabled(true);
            view.down('#chkAppealCancel').Checked = false;
            view.down('#chkAppealCancel').setDisabled(true);
            view.down('#cbxRedeterminationStatus').setDisabled(true);
            lDisabled = false;
            view.down('#RedeterminationHistoryGridPanel').setDisabled(true);
            view.down('#cbxUpdateEffectuationDate').setDisabled(true);
            view.down('#chkDischargeNotification').setDisabled(false);
            view.down('#txtHospital').setDisabled(true);
        }
        else if (mode == 'Edit')
        {
            view.down('#btnRedeterminationCreate').setDisabled(true);
            view.down('#btnRedeterminationEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(false);
            view.down('#btnRedeterminationCancel').setDisabled(false);
            view.down('#btnRedeterminationDelete').setDisabled(true);
            view.down('#cbxRedeterminationStatus').setDisabled(false);
            lDisabled = false;
            view.down('#chkAppealCancel').setDisabled(false);
            view.down('#RedeterminationHistoryGridPanel').setDisabled(true);
            view.down('#cbxUpdateEffectuationDate').setDisabled(false);
            view.down('#chkDischargeNotification').setDisabled(false);
            if (view.down('#chkDischargeNotification').Checked == true)
            {
                view.down('#txtHospital').setDisabled(false);
            }
            else
            {
                view.down('#txtHospital').setDisabled(true);
            }
        }
        else if (mode == 'Cancel' || mode == 'Save')
        {
            view.down('#btnRedeterminationCreate').setDisabled(false);
            view.down('#btnRedeterminationEdit').setDisabled(hasSelection ? false : true);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnRedeterminationCancel').setDisabled(true);
            view.down('#btnRedeterminationDelete').setDisabled(hasSelection ? false : true);
            view.down('#cbxRedeterminationStatus').setDisabled(true);
            view.down('#chkAppealCancel').setDisabled(true);
            lDisabled = true;
            view.down('#RedeterminationHistoryGridPanel').setDisabled(false);
            view.down('#cbxUpdateEffectuationDate').setDisabled(true);
            view.down('#chkDischargeNotification').setDisabled(true);
            view.down('#txtHospital').setDisabled(true);
        }
        else {
            view.down('#btnRedeterminationCreate').setDisabled(false);
            view.down('#btnRedeterminationEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnRedeterminationCancel').setDisabled(true);
            view.down('#btnRedeterminationDelete').setDisabled(true);
            view.down('#cbxRedeterminationStatus').setDisabled(true);
            view.down('#chkAppealCancel').setDisabled(true);
            view.down('#RedeterminationHistoryGridPanel').setDisabled(false);
            view.down('#cbxUpdateEffectuationDate').setDisabled(true);
            view.down('#chkDischargeNotification').setDisabled(true);
            view.down('#txtHospital').setDisabled(true);
            lDisabled = true;
        }
        view.down('#chkRDResvldInFirstCall').setDisabled(true);
        this.disableFields(lDisabled);
        this.markAuthReadOnly();
    },

    markAuthReadOnly: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            IsAuthFromOldModule = view.up('cdagmain').down('#IsAuthFromOldModule').getValue();

        if (IsAuthFromOldModule == 'true' || IsAuthFromOldModule == true) {
            view.down('#btnSave').setDisabled(true);
            view.down('#btnRedeterminationDelete').setDisabled(true);
        }
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
            if ((filteredValues.indexOf(c) == -1) && (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }
        control.setValue(returnString);

        return false;
    },

    cbxReason_Select: function (combo, record) {
        var view = this.getView(),
            reasonCode = record.data.ContactCode;

        if(reasonCode != '') {
            view.down('#chkRDResvldInFirstCall').setDisabled(false);
        }
        else{
            view.down('#chkRDResvldInFirstCall').setDisabled(true);
        }
    },

    initViewModel: function () {
        var view = this.getView();
        var vm = this.getViewModel();

        vm.set('UrgencyWindowOpen', false);
        view.down('#formRDRequestor').collapse();
        view.down('#lblCreatedBy').setValue(Atlas.user.un);
        this.setButtonState('');
    }

});