/**
 * Created by agupta on 9/14/2016.
 */

var parentData = {
    authId: '',
    recipientId: ''
};

var CheckPAAssignmentTask;

Ext.define('Atlas.authorization.view.CDAGMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagmaincontroller',
    selectedAuthID: null,
    parentAuthID: null,
    hasMedicarePAQueueAccess: false,
    receipientID: null,
    checkActiveTab: true,
    CDAGInstanceUUID: null,
    lastDeterminationHistoryAuth: null,
    lastClaimHistoryAuth: null,
    lastContactLogAuth: null,
    ackLetterSystemID: null,
    ackLetterDocID: null,
    createOverride: null,

    requestType: [],
    requestTypeMedicare: [],

    requires: [
        'Atlas.authohrization.view.cdag.CDAGMainSearchWindow'
    ],

    listen: {
        controller: {
            '*': {
                parentEventGetPA: 'parentEventGetPA',
                parentEventGetNewPA: 'parentEventGetNewPA',
                parentEventGetPharmacyId: 'getPharmacyId',
                refreshNotesAttachment: 'refreshNotesAttachment',
                setAuthDocument: 'setAuthDocument'
            }
        },
        store: {
            '#storepharmacyservicetype': {
                load: 'filterListStore'
            },
            '#storepatientresidencecode': {
                load: 'filterListStore'
            },
            '#storeurgencytypebyplanmedicare': {
                load: 'filterUrgencyStore'
            },
            '#storeurgencytypebyplan': {
                load: 'filterUrgencyStore'
            },
            '#MedicarePAQueueAccess': {
                load: 'medicarePAQueueAccess'
            },
            '#storereceivedviass' : {
                load: 'storereceivedviass'
            }
        }
    },

    flagUrgencyWindowOpened: false,

    boxReady: function (view, width, height) {
        this.getViewModel().set('viewready', true);
        if(view.alertType != 'FaxQ' && view.atlasId) {
            this.GetPALoad(view.atlasId);

            if (view.createOverride != undefined) {
                this.createOverride = view.createOverride;
            }
        }
        view.down('#pnlRequestorRep').collapse();
    },

    onExpandReasonCbx: function(cbx){
        cbx.onAfter('collapse', 'onCollapseReasonCbx');
    },

    onCollapseReasonCbx:function(cbx, eOpts){
        /*
        The first time the page loads and the user expands the reason combobox, an error can
        occur. If the user goes to the last page and then clicks the previous page button,
        the combobox sometimes collapses. The following code ensures the combobox shows as needed.
         */
        var vm = this.getViewModel(),
            pagingTb = cbx.picker.pagingToolbar;

        if (cbx.hasFocus){
            cbx.un('expand', 'onExpandReasonCbx');
            cbx.unAfter('collapse', 'onCollapseReasonCbx');
            cbx.expand();
        }
    },

    generateUUID: function () {
        var d = Atlas.common.utility.Utilities.getLocalDateTime().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        this.getViewModel().set('CDAGInstanceUUID', uuid);
        this.CDAGInstanceUUID = uuid;
    },

    init: function() {

        var me = this,
            view = this.getView(),
            vm = me.getViewModel(),
            menuStore = vm.getStore('menu'),
            proxy = menuStore.getProxy(),
            AuthID = view.AuthID;

        view.down('#numAuthID').setValue(AuthID);
        view.down('#txtHospital').setDisabled(true);

        var masterrecord={};
        masterrecord.page='cdag';
        vm.set('contactlogmasterrecord',masterrecord);
        vm.set('skipOverrideChange', false);

        proxy.setExtraParam('pRootMenu', view.menuId);
        proxy.setExtraParam('pLevels', 1);

        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true // Remove listener after Load
        });

        menuStore.load();

        this.resetModelFlag();
        this.generateUUID();

        CheckPAAssignmentTask = {
            run: me.CheckPAAssignment,
            scope: me,
            interval: 100000
        };

        Ext.TaskManager.start(CheckPAAssignmentTask);
        this.loadStatusDropDown('0', '01', 'Received');
        this.Overrides_15_Change('', false, '');
        this.showCDControls();

        var authid = me.getView().authID;

        if(authid!='' && authid!=undefined  ) {
            this.GetPALoad(authid);
        }

        if (view.alertType=='FaxQ'){
            this.openFaxQueueWindow(view.StatusDesc);
        }
        else {
            if(view.atlasId) {
                this.GetPALoad(view.atlasId);
            }
        }

    },

    onMenuLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = me.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            route;

        for (; i < iLen; i++) {
            items.push({
                text: records[i].get('menuTitle'),
                route: records[i].get('route')
            });

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: items[defaultMenu].text,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }
    },

    onMenuClick: function (menu, item) {
        var tabTitle = item.text,
            menuRoute = item.route.split('/'),
            menuxType = menuRoute[menuRoute.length -1],
            tabPanel = this.getView().down('#cdagTabBar'),
            existingTab = tabPanel.down(menuxType),
            tab,
            view = this.getView(),
            NPI = view.down('#lblNPI').getText(),
            Member = view.down('#lblRecipientID').getText();

        if (tabTitle != 'Member Claim History' && this.selectedAuthID == null) {
            Ext.Msg.alert('Info', 'Please select a valid coverage determination id.');
            return false;
        }

        if (tabTitle == 'Contact Log') {
            menuxType = 'common-contactlog';
            existingTab = tabPanel.down(menuxType);
            var param ={
                page:'cdag',
                key:'authid',
                keyvalue:this.selectedAuthID,
                keytext:this.selectedAuthID,
                recipientID:Member,
                prescriberID :NPI
            };
            this.getViewModel().set('masterrecord',param);
            this.getViewModel().set('contactlogmasterrecord',param);
            this.lastContactLogAuth = null;
        }
        else if (tabTitle == 'Member Claim History') {
            menuxType = 'common-claims';
            existingTab = tabPanel.down(menuxType);
            this.lastClaimHistoryAuth = null;
        }

        if (!existingTab) {
            if (menuxType == 'common-contactlog') {
                tab = tabPanel.add({
                    xtype: menuxType,
                    title: tabTitle,
                    width: 1225,
                    closable: true,
                    height: '100%'
                });
            }
            else {
                tab = tabPanel.add({
                    xtype: menuxType,
                    title: tabTitle,
                    width: 1225,
                    closable: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    height: '100%'
                });
            }

            tabPanel.setActiveTab(tab);
            if (tabTitle == 'Contact Log') {
                this.fireEvent('contactloggridrefresh');
            }
        }
        else {
            tabPanel.setActiveTab(existingTab);
        }
    },

    onTabChange: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            activeTab = view.activeTab,
            cdagTabBar = view.down('#cdagTabBar'),
            activeTabTitle = cdagTabBar.getActiveTab().title;

        if (activeTabTitle == 'Member Claim History') {
            var GCN = '',
                GPI = '',
                NDC,
                claimSearchExtraParam = '',
                cdagMain = this.getView(),
                DeterminationType = cdagMain.down('#cbxDeterminationType').getValue(),
                recipientID = cdagMain.down('#lblRecipientID').getText();

            if (recipientID == '' || recipientID == undefined || recipientID == null) {
                recipientID = '0';
            }

            if (!cdagMain.down('#cbxMedication').hidden) {
                GCN = cdagMain.down('#lblGCN').text == undefined || cdagMain.down('#lblGCN').text == null ? '' : cdagMain.down('#lblGCN').text;
            }
            else if (!cdagMain.down('#cbxGPINDC').hidden) {
                GPI = cdagMain.down('#lblGPICode14').text == undefined || cdagMain.down('#lblGPICode14').text == null ? '' : cdagMain.down('#lblGPICode14').text;
            }

            NDC = cdagMain.down('#hdnNDC').getValue() == undefined || cdagMain.down('#hdnNDC').getValue() == null ? '' : cdagMain.down('#hdnNDC').getValue();

            if (DeterminationType == 'CD') {
                claimSearchExtraParam = (GCN != '' ? 'GCN|' + GCN : 'GPI|' + GPI);
            }
            else {
                claimSearchExtraParam = 'NDC|' + NDC;
            }

            if (this.lastClaimHistoryAuth == null || this.lastClaimHistoryAuth != this.selectedAuthID) {
                this.fireEvent('SearchClaimsCommonController', 'recipientID', recipientID, true, 'CDAG|' + claimSearchExtraParam);
                this.lastClaimHistoryAuth = this.selectedAuthID;
            }
        }
        else {
            if (this.selectedAuthID == null) {
                if (activeTabTitle != 'Request') {
                    Ext.Msg.alert('Info', 'Please select a valid coverage determination id.');
                }
                cdagTabBar.setActiveTab(0);
                return false;
            }

            if (activeTab != null && activeTab != undefined) {
                cdagTabBar.setActiveTab(activeTab);
                view.activeTab = null;
            }

            var NPI = view.down('#lblNPI').getText(),
                Member = view.down('#lblRecipientID').getText();

            switch (activeTabTitle) {
                case 'Determination History':
                    if (this.lastDeterminationHistoryAuth == null || this.lastDeterminationHistoryAuth != this.selectedAuthID) {
                        this.fireEvent('SearchMemberPAHistory', 'recipientID', Member, this.CDAGInstanceUUID);
                        this.lastDeterminationHistoryAuth = this.selectedAuthID;
                    }
                    break;
                case 'Contact Log':
                    if (this.lastContactLogAuth == null || this.lastContactLogAuth != this.selectedAuthID) {
                        var param ={
                            page:'cdag',
                            key:'authid',
                            keyvalue:this.selectedAuthID,
                            keytext:this.selectedAuthID,
                            recipientID:Member,
                            prescriberID :NPI
                        };
                        this.getViewModel().set('masterrecord',param);
                        this.getViewModel().set('contactlogmasterrecord',param);
                        this.fireEvent('contactloggridrefresh');
                        this.lastContactLogAuth = this.selectedAuthID
                    }
                    break;
                default:
                    this.fireEvent('AuthIdChanged', this.selectedAuthID, this.CDAGInstanceUUID);
            }
        }
    },

    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#dtEffectiveDate'),
            winDtTo = view.down('#dtTermDate'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'dtEffectiveDate') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    },

    setAuthDocument: function (authId) {
        if (this.selectedAuthID == authId) {
            this.saveAuthDocument(authId);
        }
    },

    parentEventGetPA: function (authId) {
        if (this.selectedAuthID == authId) {
            this.GetPALoad(authId);
        }
    },

    parentEventGetNewPA: function (authId, CDAGInstanceUUIDSearch) {
        var vm = this.getViewModel(),
            view = this.getView(),
            cdagTabBar = view.down('#cdagTabBar');

        if (this.CDAGInstanceUUID == CDAGInstanceUUIDSearch) {
            cdagTabBar.setActiveTab(0);
            this.GetPALoad(authId);
        }
    },

    refreshNotesAttachment: function (authId) {
        if (this.selectedAuthID == authId) {
            var vm = this.getViewModel(),
                notes = '',
                AuthReviewNotes = vm.getStore('AuthReviewNotes');

            AuthReviewNotes.getProxy().setExtraParam('pParentSystemID', vm.get('cdmodel.systemID'));
            AuthReviewNotes.load(
                {
                    callback: function (records, opts, success) {
                        if (success) {
                            AuthReviewNotes.sort('SystemID', 'DESC');
                            AuthReviewNotes.each(function (rec) {
                                notes += rec.get('CreateUser') + ' (' + Ext.Date.format(new Date(rec.get('CreateDate')), 'm/d/Y') + ' ' + rec.get('CreateTime') + ') -- ' + rec.get('Note') + '\r\n\r\n';
                            });

                            vm.set('notesmodel', notes);
                        }
                    }
                });

            this.loadAttachmentGridData();
            this.fireEvent('refreshCDAGReviewHistory', authId);
        }
    },

    resetModelFlag: function () {
        var vm = this.getViewModel();

        vm.set('UrgencyWindowOpen', false);
        vm.set('ApprovalLetterFlag', false);
        vm.set('DenialLetterFlag', false);
        vm.set('NLHApprovalFlag', false);
        vm.set('HIXApprovalLetterFlag', false);
        vm.set('EXTApprovalLetterFlag', false);
    },

    CheckSendFaxRequired: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            reqType = view.down('#cbxRequestType').getValue();

        if (reqType != 'O') {
            vm.set('SendFaxRequired', true);
        }
        else {
            vm.set('SendFaxRequired', false);
        }
    },

    onCloseCdagWindow: function () {
        Ext.TaskManager.stop(CheckPAAssignmentTask);

        if (this.selectedAuthID != null) {
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/priorauthmasterunassign/update', null, [true], {
                    piAuthID: this.selectedAuthID,
                    pAction: 'UnassignUser'
                },
                saveAction, null);
        }

        parentData.authId = '';
        parentData.recipientId = '';
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

    refreshDeterminationType: function (selection) {

        var view = this.getView(),
            RequestForm = view.down('#RequestForm').getForm(),
            CDForm = view.down('#CDForm').getForm(),
            DMRForm = view.down('#DMRForm').getForm();

        RequestForm.reset();
        CDForm.reset();
        DMRForm.reset();

        if (selection.value == 'CD'){
            this.showCDControls();
        }
        else {
            this.showDMRControls();
        }
    },

    filterListStore: function(store, records, success) {

        var view = this.getView(),
            cbxPharServiceType = view.down('#cbxPharServiceType');

        store.each(function (record) {
            if (record.get('value').split(',')[0].trim().length <= 1) {
                var itemIndex = store.data.indexOf(record);
                store.removeAt(itemIndex );
            }
        });
    },

    filterUrgencyStore: function (store, records, success) {

        var vm = this.getViewModel(),
            storeurgencytypebyplanmedicare = vm.getStore('storeurgencytypebyplanmedicare'),
            storeurgencytypebyplan = vm.getStore('storeurgencytypebyplan'),
            lobId = (store.storeId == 'storeurgencytypebyplanmedicare' ? '' : '2');

        store.each(function (record) {
            if (record.get('charString').trim() == lobId) {
                var itemIndex = store.data.indexOf(record);
                store.removeAt(itemIndex );
            }
        });
    },

    medicarePAQueueAccess: function (store, records, success) {
        var view = this.getView(),
            determinationType = view.down('#cbxDeterminationType').getValue(),
            vm = this.getViewModel(),
            cdmodel = vm.get('cdmodel');

        store.filter('userName', Atlas.user.un);

        if (store.data.items.length > 0) {
            this.hasMedicarePAQueueAccess = true;
            view.down('#hidMedicarePAQueueAccess').setValue('true');
            vm.set('hidMedicarePAQueueAccess', true);
        }
        else {
            view.down('#hidMedicarePAQueueAccess').setValue('false');
            vm.set('hidMedicarePAQueueAccess', false);
        }

        if (this.selectedAuthID != null && cdmodel != null && cdmodel != '') {
            var isMedicarePlan = cdmodel.CarrierLobID == '2' ? true: false,
                authStatus     = cdmodel.AuthStatus;

            this.lockPAAfterDecision(isMedicarePlan, authStatus, determinationType);
        }
    },

    loadStatusDropDown: function (planGroupId, status, description) {
        var me = this;
        var vm = this.getViewModel();
        var objRespDeterminationStatus = '';
        var objRespAuthStatus = '';
        var cbxStatus = this.getView().down('#cbxStatus');
        var rdList = [];
        var storeCDCombo = vm.getStore('storeCDCombo');
        var isOverride = false;

        if (this.createOverride != null && this.createOverride != undefined) {
            status = '09';
            description = 'Approved';
            this.createOverride = null;
            isOverride = true;
        }

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
                    setModel.getProxy().setExtraParam('iplChkAccessToUser', planGroupId != '0');
                    setModel.getProxy().setExtraParam('pListName', 'PriorAuthStatus');
                    setModel.load(
                        {
                            scope: me,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                storeCDCombo.removeAll();
                                if (success) {
                                    objRespAuthStatus = Ext.decode(operation.getResponse().responseText);
                                    if (objRespAuthStatus.data.length > 0) {

                                        var isFound = false,
                                            isRDStatus = false;

                                        for (var CDItem in objRespAuthStatus.data){

                                            isRDStatus = false;

                                            for (var RDItem in rdList){

                                                if (rdList[RDItem] == objRespAuthStatus.data[CDItem].ListItem){
                                                    isRDStatus = true;
                                                    break;
                                                }
                                            }

                                            if (!isRDStatus) {
                                                if (objRespAuthStatus.data[CDItem].ListItem == status)
                                                {
                                                    isFound = true;
                                                }

                                                storeCDCombo.add(
                                                    {
                                                        ListItem: objRespAuthStatus.data[CDItem].ListItem,
                                                        ListDescription: objRespAuthStatus.data[CDItem].ListDescription
                                                    }
                                                );
                                            }
                                        }

                                        if (!isFound && status != ''){
                                            if (isOverride) {
                                                status = '01';
                                                description = 'Received';
                                            }
                                            else {
                                                storeCDCombo.add(
                                                    {
                                                        ListItem: status,
                                                        ListDescription: description
                                                    }
                                                );
                                            }
                                        }

                                        cbxStatus.bindStore(storeCDCombo);
                                        cbxStatus.setValue(status);
                                        cbxStatus.setRawValue(description);
                                    }
                                    else {
                                        storeCDCombo.add(
                                            {
                                                ListItem: status,
                                                ListDescription: description
                                            }
                                        );
                                        cbxStatus.bindStore(storeCDCombo);
                                        cbxStatus.setValue(status);
                                        cbxStatus.setRawValue(description);
                                    }
                                }
                                else {
                                    storeCDCombo.add(
                                        {
                                            ListItem: status,
                                            ListDescription: description
                                        }
                                    );
                                    cbxStatus.bindStore(storeCDCombo);
                                    cbxStatus.setValue(status);
                                    cbxStatus.setRawValue(description);
                                }
                            }
                        });
                }
            }
        });

    },

    onRejectionCodeChange:function (control,value) {
        var view = this.getView(),
            txtRejectionCodes = view.down('#txtRejectionCodes');

        txtRejectionCodes.setValue(value);
    },

    Overrides_15_Change: function (checkbox, newValue, oldValue) {
        var view = this.getView();
        if (newValue == true) {
            view.down('#cbxNCPDPerrorCode_Add').setDisabled(false);
            view.down('#txtRejectionCodes').setDisabled(false);
        }
        else {
            view.down('#cbxNCPDPerrorCode_Add').reset();
            view.down('#cbxNCPDPerrorCode_Add').setDisabled(true);
            view.down('#txtRejectionCodes').setDisabled(true);
            view.down('#txtRejectionCodes').setValue('');
        }
    },

    Overrides_8_Change: function (checkbox, newValue, oldValue) {
        var view = this.getView(),
            vm = this.getViewModel(),
            skipOverrideChange = vm.get('skipOverrideChange');

        if (skipOverrideChange) {
            return;
        }

        if (newValue == true) {
            if (view.down('#Overrides_22').getValue() == true) {
                Ext.Msg.alert('Info', 'Medicare Part B Drug override is already selected, selecting Medicare B vs D will remove Medicare Part B Drug override.');
                view.down('#Overrides_22').setValue(false)
            }
        }
    },

    Overrides_22_Change: function (checkbox, newValue, oldValue) {
        var view = this.getView(),
            vm = this.getViewModel(),
            skipOverrideChange = vm.get('skipOverrideChange');

        if (skipOverrideChange) {
            return;
        }

        if (newValue == true) {
            if (view.down('#Overrides_8').getValue() == true) {
                Ext.Msg.alert('Info', 'Medicare B vs D override is already selected, selecting Medicare Part B Drug will remove Medicare B vs D override.');
                view.down('#Overrides_8').setValue(false)
            }
        }
    },

    btnNew_Click: function () {
        var vm = this.getViewModel(),
            view = this.getView(),
            storememgroup = vm.getStore('storememgroup'),
            storeAttachments = vm.getStore('storeAttachments');

        view.down('#cdagTabBar').setActiveTab(0);
        this.selectedAuthID = null;
        view.setTitle('CDAG');

        storememgroup.removeAll();
        storeAttachments.removeAll();

        vm.set('cdmodel', '');
        vm.set('DischargeNotification', '');
        vm.set('UrgencyType', '');


        view.down('#hidPAStatus').setValue('01');
        view.down('#hdnDataSource').setValue('');
        view.down('#hdnLastModified').setValue('');
        view.down('#lblCoCMember').setText('');
        view.down('#lblGCN').setText('');
        view.down('#hidLOB').setValue('999');
        view.down('#lblPARemainingHours').setTooltip('');
        view.down('#cbxMemGroup').setDisabled(false);
        view.down('#chkReopen').hide();
        view.down('#chkDiscard').hide();
        view.down('#chkDiscard').setValue(false);
        view.down('#btnUnlock').hide();
        view.down('#lblProctectedClassDrug').hide();
        view.down('#lblCarveOut').hide();
        view.down('#CntCocMember').hide();

        this.resetModelFlag();
        this.bindRequestTypeCombo('0', false);
        this.overrideDisabled('OverrideClicked');
        this.Overrides_15_Change('', false, '');
        view.down('#pnlRequestorRep').collapse();

        var MemberInfo = view.down('#MemberInfo').getForm(),
            RequestForm = view.down('#RequestForm').getForm(),
            NotesForm = view.down('#NotesForm').getForm(),
            CDForm = view.down('#CDForm').getForm(),
            MemberInfoPanel = view.down('#MemberInfoPanel'),
            RequestInfoPanel = view.down('#RequestInfoPanel'),
            CDFormPanel = view.down('#CDFormPanel'),
            DMRFormPanel = view.down('#DMRFormPanel'),
            DMRForm = view.down('#DMRForm').getForm();

        MemberInfoPanel.enable();
        RequestInfoPanel.enable();
        CDFormPanel.enable();
        DMRFormPanel.enable();

        MemberInfoPanel.down('#cbxMember').setDisabled(false);
        MemberInfoPanel.down('#cbxMemGroup').setDisabled(false);
        MemberInfoPanel.down('#cbxPrescriber').setDisabled(false);
        MemberInfoPanel.down('#cbxMedication').setDisabled(false);
        MemberInfoPanel.down('#cbxGPINDC').setDisabled(false);
        MemberInfoPanel.down('#radGCN').setDisabled(false);
        MemberInfoPanel.down('#radHICL').setDisabled(false);
        MemberInfoPanel.down('#radNDC').setDisabled(false);
        MemberInfoPanel.down('#radGPI14').setDisabled(false);
        MemberInfoPanel.down('#radGPI10').setDisabled(false);
        MemberInfoPanel.down('#btnCustomPrice').setDisabled(false);

        view.down('#dtEffectiveDate').setDisabled(false);
        view.down('#dtTermDate').setDisabled(false);
        view.down('#cbxStatus').setDisabled(false);
        view.down('#btnSave').setDisabled(false);

        MemberInfo.reset();
        RequestForm.reset();
        CDForm.reset();
        DMRForm.reset();
        NotesForm.reset();

        view.down('#notesArea').setValue('');
        view.down('#trackChanges').removeAll();
        view.down('#txtHospital').setDisabled(true);
        view.down('#lblTolling').hide();
        view.down('#lblAuthModule').hide();

        view.down('#lblRecipientID').setText('');
        view.down('#lblSource').setText('');
        view.down('#lblNPI').setText('');
        view.down('#lblAddressNPI').setText('');
        view.down('#lblAddress').setText('');
        view.down('#radGCN').setBoxLabel('GCN:');
        view.down('#radHICL').setBoxLabel('HICL SEQ NO:');
        view.down('#radGPI10').setBoxLabel('GPI10:');
        view.down('#radGPI14').setBoxLabel('GPICode:');
        view.down('#radNDC').setBoxLabel('NDC:');
        view.down('#cbxDeterminationType').setDisabled(false);
        view.down('#cbxDeterminationType').setValue('CD');
        view.down('#cbxDeterminationType').setRawValue('Coverage Determination');
        view.down('#cbxStatus').setValue('01');
        view.down('#dtEffectiveDate').setValue('');
        view.down('#dtTermDate').setValue('');
        view.down('#dtEffectiveDate').setMaxValue(null);
        view.down('#dtTermDate').setMinValue(null);
        view.down('#cbxUpdateEffectuationDate').hide();
        view.down('#cbxUpdateEffectuationDate').allowBlank = true;

        this.refreshDeterminationType(view.down('#cbxDeterminationType').getSelection().data);
    },

    btnAudit_Click: function () {
        if (this.selectedAuthID == null) {
            Ext.Msg.alert('PBM', 'Please enter auth id first.');
            return;
        }

        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            cdmodel = vm.get('cdmodel'),
            authSystemId,
            win;

        if (cdmodel == '' || cdmodel == 'undefined' || cdmodel == null) {
            return;
        }

        authSystemId = cdmodel.SystemID;

        win = view.add({
            xtype: 'sharedviews-AuditTrail',
            autoShow: false,
            auditConfig: {
                'tableName': 'authmaster',
                'parentSystemId': authSystemId,
                'title': 'Coverage Determination Audit Trail'
            }
        });

        win.show();
    },

    routeToMember:function () {
        var me = this,
            view = this.getView(),
            recipientID = view.down('#lblRecipientID').getText(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (recipientID != '' && recipientID != null) {
            me.fireEvent('openView','merlin','member','MemberToolbar', {
                atlasId: recipientID,
                menuId: menuId,
                RID:recipientID,
                keyValue: '0',
                openView: true,
                recordCase:null,
                subTabs:['member-demographics']
            });
        }
    },

    routeToPrescriber:function () {
        var me = this,
            view = this.getView(),
            prescriberNPI = view.down('#lblNPI').getText(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar');

        if (prescriberNPI != '' && prescriberNPI != null) {
            me.fireEvent('openView','merlin','prescriber','PrescriberToolbar', {
                menuId: menuId,
                atlasId: prescriberNPI
            });
        }
    },

    chkDischargeNotification_Change: function (checkbox, newValue, oldValue) {
        var view = this.getView();
        if (newValue == true) {
            view.down('#txtHospital').setDisabled(false);
        }
        else {
            view.down('#txtHospital').setValue('');
            view.down('#txtHospital').setDisabled(true);
        }
        if (newValue) {
            if (view.down('#cbxMemGroup').getValue() == '' || view.down('#cbxMemGroup').getValue() == null) {
                Ext.Msg.alert('Validation', 'Please select Member Group.' , function (btn) {
                    view.down('#chkDischargeNotification').setValue(false);
                });
            }
            else {
                view.down('#cbxStatus').setValue('17');
            }
        }
    },

    btnSearchClick: function () {
        var me = this,
            view = this.getView();

        var authSearchWindow = view.add({
            xtype: 'authorization-cdagmainsearchwindow',
            CDAGInstanceUUID: me.CDAGInstanceUUID
        });
        authSearchWindow.show();
    },

    btnCancel_Click: function () {

        this.btnNew_Click();

        if (this.parentAuthID != null) {
            this.GetPALoad(this.parentAuthID);
        }
    },

    btnCustomPrice_Click: function () {
        var me = this,
            view = this.getView(),
            gcnSeqNo = view.down('#lblGCN').text,
            Medication = '',
            lobId = view.down('#hidLOB').getValue();

        if (lobId == undefined || lobId == null || lobId == '') {
            lobId = '999';
        }

        if (gcnSeqNo != '') {
            Medication = view.down('#cbxMedication').getRawValue();
        }

        var win = view.add({
            xtype: 'authorization-custompricewindow',
            extraParams: {
                'pGCNSEQ': gcnSeqNo,
                'Medication': Medication,
                'iCarrierLOBId': lobId,
                'CDAGInstanceUUID': me.CDAGInstanceUUID
            },
            autoShow: false
        });

        win.show();
    },

    btnFormularyStatus_Click: function (btn, text) {
        this.getDrugFormularyDetails(btn.params.isOpenFormularyWindow)
    },

    btnCompoundGCN_Click: function () {
        var view = this.getView();
        if (view.down('#hdnDataSource').getValue() == 'MDB') {
            if (view.down('#lblGPICode14').text == '99999999999999') {
                var searchWindow = view.add({
                    xtype: 'authorization-compoundgpiwindow'
                });
                searchWindow.show();
            }
            else Ext.Msg.alert('PBM', 'Compound GPI is allowed only for Compound Prior Auths.');
        }
        else {
            if (view.down('#lblGCN').text == '9999999') {
                var searchWindow = view.add({
                    xtype: 'authorization-compoundgcnwindow'
                });
                searchWindow.show();
            }
            else Ext.Msg.alert('PBM', 'Compound GCN is allowed only for Compound Prior Auths.');
        }
    },

    btnClaimTest_Click: function () {
        var view = this.getView(),
            me = this,
            authID = view.down('#numAuthID').getValue(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimTest');

        if (authID == null || authID == '') {
            Ext.Msg.alert('PBM', 'Please enter auth id first.');
            return;
        }

        me.fireEvent('openView', 'merlin', 'claims', 'ClaimTest', {
            atlasId: authID,
            keyType: 'AuthID',
            menuId: menuId
        }, null);
    },

    btnAddDocType_Click: function () {
        var me = this,
            win;

        if (this.selectedAuthID == null) {
            Ext.Msg.alert('Attachment Error', 'Please select an existing CD');
            return;
        }

        win = Ext.create('Ext.window.Window', {
            title: 'File upload', modal: true,
            width: 400, height: 300,
            layout: {type: 'fit', align: 'stretch'},
            listeners: {
                'beforeclose': 'onAttachmentWindowClose'
            },
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imagePA',
                    fileType: 'pdf',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onDocTypeChange: function (selection) {
        var vm = this.getViewModel(),
            storeAttachments = vm.getStore('storeAttachments');

        if (this.selectedAuthID != null) {
            if (selection == null) {
                storeAttachments.removeFilter('AttachmentType');
            }
            else if (selection.value != '') {
                storeAttachments.filter('AttachmentType', selection.value);
            }
        }
    },

    loadAttachmentGridData: function () {
        var vm = this.getViewModel(),
            view = this.getView(),
            cbxDocType = view.down('#cbxDocType'),
            storeAttachments = vm.getStore('storeAttachments');

        cbxDocType.clearValue();
        storeAttachments.removeFilter('AttachmentType');

        storeAttachments.getProxy().setExtraParam('pcKeyType', 'authID');
        storeAttachments.getProxy().setExtraParam('pcKeyValue', this.selectedAuthID);
        storeAttachments.getProxy().setExtraParam('pcInOut', '');
        storeAttachments.load({
            scope: this,
            callback: function (records, operation, success) {
                if(records && records.length >0)
                {
                    for (var i =0 ; i < records.length ; i++)
                    {
                        var receivedDateTime = Ext.util.Format.date(records[i].data.RecieptDate, 'm/d/Y') + ' ' +  records[i].data.RecieptTime;
                        records[i].data.RecieptDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(receivedDateTime, 'm/d/Y');
                        records[i].data.RecieptTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(receivedDateTime, 'H:i:s');
                    }
                }
                storeAttachments.loadData(records);
            }}
        );
    },

    onClearClick: function () {
        var view = this.getView(),
            cbxDocType = view.down('#cbxDocType');

        cbxDocType.clearValue();

        if (this.selectedAuthID != null) {
            this.onDocTypeChange(cbxDocType.getSelection());
        }
    },

    onAttachmentWindowClose: function(win){

        var view = this.getView(),
            documentIDList = win.down('panel').getViewModel().get('documentIDList'),
            vm = this.getViewModel(),
            storeAttachments = vm.getStore('storeAttachments'),
            panelFileUpload = view.down('#fileUploadGrid'),
            fileStore = panelFileUpload.getViewModel().getStore('fileStore');


        if (documentIDList.length != 0) {

            for (var item in documentIDList) {
                var currentDate = new Date();

                var newRec = Ext.data.Record.create({
                    DocumentID: documentIDList[item],
                    Subject: fileStore.data.items[0].data.description,
                    RecieptDate: Ext.util.Format.date(currentDate, 'm/d/Y'),
                    RecieptTime: Ext.util.Format.date(currentDate, 'H:i:s')
                });

                newRec.dirty = true;
                storeAttachments.insert(0, newRec);
            }
        }
    },

    onViewDoc: function (grid, rowIndex, colIndex) {
        var view = this.getView(),
            DocumentID = grid.getStore().getAt(rowIndex).get('DocumentID'),
            RecipientID = view.down('#lblRecipientID').getText();

        if (RecipientID == '' || RecipientID == null) {
            Ext.Msg.alert('PBM','Member info needs to be saved to view the fax.');
            return;
        }

        if (DocumentID != '' && DocumentID != 'undefined') {
            Atlas.common.utility.Utilities.viewDocument(DocumentID);
        }
    },

    onDeleteDoc: function (grid, rowIndex, colIndex) {
        Ext.Msg.confirm('Delete Attachment', 'Are you sure you want to delete selected attachment?', function (btn) {
            if (btn == 'yes') {
                grid.getStore().removeAt(rowIndex);
            }
        });
    },

    btnSendFax_Click: function () {
        var view = this.getView(),
            npi = view.down('#lblNPI').getText(),
            me = this,
            authId = this.selectedAuthID,
            prescriberName = view.down('#cbxPrescriber').getRawValue();

        if (npi != null && npi != '') {
            var win = view.add({
                xtype: 'authorization-sendfaxwindow',
                autoShow: false,
                listeners : {
                    destroy : function(){
                        me.loadAttachmentGridData();
                    }
                },
                prescriber: {
                    'npi': npi,
                    'authId': authId,
                    'prescriberName': prescriberName
                }
            });

            win.show();
        }
    },

    btnFaxQueue_Click: function () {
        this.openFaxQueueWindow('');
    },

    openFaxQueueWindow: function (selectedFaxQueue) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            PAFaxQDistribution = vm.getStore('PAFaxQDistribution');

        PAFaxQDistribution.getProxy().setExtraParam('pListName', 'PAFaxQDistribution');
        PAFaxQDistribution.load({
            callback: function (record, operation, success) {
                if (success) {
                    var faxQueueWindow = view.add({
                        xtype: 'authorization-CDAGFaxQueue',
                        CDAGInstanceUUID: me.CDAGInstanceUUID,
                        selectedFaxQueue: selectedFaxQueue
                    });
                    faxQueueWindow.show();
                }
            }
        });
    },

    setCoverageDeterminationData: function (masterBean, authId, otherValues, skipWarning) {

        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            LOB = view.down('#hidLOB').getValue(),
            storeAttachments = vm.getStore('storeAttachments');

        if (authId == null || authId == undefined || authId == '') {
            authId = 0;
        }

        view.mask('Saving Data....');

        var updateCDModel = Ext.create('Atlas.authorization.model.cdag.SetCoverageDeterminationModel');
        var cdData = masterBean.masterBean.CoverageDeterminationBean;
        if (masterBean.OtherValues[0].IsOverride == 'yes') {
            cdData.ReceivedDateTime = masterBean.OtherValues[0].dtManualRcvd == '' || masterBean.OtherValues[0].dtManualRcvd == null ? '' : (masterBean.OtherValues[0].dtManualRcvd + ' ' + masterBean.OtherValues[0].tManualRcvd + ' ' + masterBean.OtherValues[0].cbAmPM);
            // debugger;
            // if(cdData.ReceivedDateTime && ( (Atlas.user.Offset) != Atlas.user.localTimeOffset))
            // {
            //     var receiveTime = new Date(cdData.ReceivedDateTime);
            //
            //     receiveTime = receiveTime.setHours(receiveTime.getHours() + ((((Atlas.user.Offset *-1) + Atlas.user.localTimeOffset)/60)*-1));
            //     cdData.ReceivedDateTime = me.formatDate(receiveTime);
            // }

            cdData.ReceivedDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(cdData.ReceivedDateTime,'m/d/Y  h:i:s A');
        }
        cdData.SupportStmtReceivedDate = masterBean.OtherValues[0].dtSSReceived == '' || masterBean.OtherValues[0].dtSSReceived == null ? '' : (masterBean.OtherValues[0].dtSSReceived + ' ' + masterBean.OtherValues[0].tSSREceived + ' ' + masterBean.OtherValues[0].cbxSSAmPm);
        cdData.SupportStmtReceivedDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(cdData.SupportStmtReceivedDate,'m/d/Y  h:i:s A');
        // debugger;
        cdData.AORDateTime = ((masterBean.OtherValues[0].dtCDAORRecvdDate == '' || masterBean.OtherValues[0].dtCDAORRecvdDate == null) ? '' : masterBean.OtherValues);

        if(cdData.AORDateTime && cdData.AORDateTime[0])
        {
            cdData.AORDateTime = cdData.AORDateTime[0].dtCDAORRecvdDate + ' ' + cdData.AORDateTime[0].tCDAORRecvdTime + ' ' + cdData.AORDateTime[0].cbxCDAORRecvdDate
        }
        cdData.AORDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(cdData.AORDateTime,'m/d/Y  h:i:s A');

        if (cdData.DeterminationType == 'CD') {
            cdData.UrgencyUpdateDateTime = masterBean.OtherValues[0].dtUrgencyUpdate == '' || masterBean.OtherValues[0].dtUrgencyUpdate == null ? '' : (masterBean.OtherValues[0].dtUrgencyUpdate + ' ' + masterBean.OtherValues[0].tUrgencyUpdate + ' ' + masterBean.OtherValues[0].cbxAMPMUrgencyUpdate);
        }
        else {
            cdData.CheckSentDate = masterBean.OtherValues[0].dtCheckSentDate == '' || masterBean.OtherValues[0].dtCheckSentDate == null ? '' : (masterBean.OtherValues[0].dtCheckSentDate + ' ' + masterBean.OtherValues[0].tCheckSentDate + ' ' + masterBean.OtherValues[0].cbxCheckAmPm);
            cdData.CheckSentDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(cdData.CheckSentDate,'m/d/Y  h:i:s A');
        }

        updateCDModel.getProxy().setExtraParam('piAuthID', authId);
        updateCDModel.getProxy().setExtraParam('pcSource', '');
        updateCDModel.getProxy().setExtraParam('plSkipWarning', skipWarning);
        updateCDModel.getProxy().setExtraParam('ttPriorAuthData', cdData);
        updateCDModel.phantom = false;

        updateCDModel.save(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    view.unmask();

                    vm.set('SendFaxRequired', false);

                    if (success) {
                        if (LOB != '2') {
                            me.CheckSendFaxRequired();
                        }
                        else {
                            vm.set('SendFaxRequired', false);
                        }
                    }

                    var objResp = Ext.decode(operation.getResponse().responseText),
                        pResult = objResp.message[0].code,
                        pMessage = objResp.message[0].message,
                        newAuthId = objResp.metadata.piRetAuthID,
                        btnSave = view.down('#btnSave'),
                        btnUnlock = view.down('#btnUnlock');

                    if (pResult == 0 || pResult == 1009) {
                        if (pResult == 1009) {
                            vm.set('ApprovalLetterFlag', true);
                        }

                        me.saveAuthDocument(newAuthId);

                        view.down('#numAuthID').setValue(newAuthId);

                        Ext.Msg.alert('Success', 'Record saved successfully' , function (btn) {
                            me.GetPALoad(newAuthId);
                        });

                    }
                    else if (pResult == 1004) {
                        Ext.Msg.confirm('Information', pMessage, function (btn) {
                            if (btn == 'yes') {
                                me.setCoverageDeterminationData(masterBean, authId, otherValues, true)
                            }
                        });
                    }
                    else if (pResult == 1001 || pResult == 1003) {
                        Ext.Msg.alert('Reload PA', pMessage , function (btn) {
                            me.resetModelFlag();
                            me.GetPALoad(me.selectedAuthID);
                        });
                    }
                    else if (pResult == 1002) {
                        Ext.Msg.confirm('Release PA', pMessage + ', Would you like to release and assign it to yourself for editing?', function (btn) {
                            if (btn == 'yes') {
                                me.PACheckOut(authId, true);
                            }
                            else {
                                btnSave.setDisabled(true);
                                btnUnlock.show();
                            }
                        });
                    }
                    else {
                        Ext.Msg.alert('PBM', pMessage);
                    }
                }
            }
        );
    },

    btnSave_Click: function () {
        var me = this,
            view = this.getView(),
            winUrgencyType = view.down('#winUrgencyType'),
            vm = this.getViewModel();
        var RejectionCodeOverride = view.down('#txtRejectionCodes').getValue();
        var determinationType = view.down('#cbxDeterminationType').getValue();
        var selectedAuthID = (view.down('#numAuthID').getValue() == null || view.down('#numAuthID').getValue() == '' ? '0' : view.down('#numAuthID').getValue());
        var DischargeNotification = this.getViewModel().get('DischargeNotification'),
            UrgencyType = this.getViewModel().get('UrgencyType'),
            ReasonCode = view.down('#cbxReason').getValue() != null && view.down('#cbxReason').getValue() != undefined ? view.down('#cbxReason').getValue() : '',
            cbxMedication = view.down('#cbxMedication'),
            cbxGPINDC = view.down('#cbxGPINDC'),
            Medication = (cbxMedication.hidden ? cbxGPINDC.getValue() : cbxMedication.getValue()),
            Status=view.down('#cbxStatus').getValue(),
            chkDiscardVal=view.down('#chkDiscard').getValue();

        if (determinationType == '' || determinationType == null || determinationType == 'undefined') {
            Ext.Msg.alert('Error', 'Please select determination type.');
            return;
        }
        if(!chkDiscardVal && Status!=7 ) {
            if (Medication == '' || Medication == null || Medication == 'undefined') {
                Ext.Msg.alert('Error', 'Please select medication.');
                return;
            }
        }

        var MemberInfo = view.down('#MemberInfo').getForm(),
            RequestForm = view.down('#RequestForm').getForm(),
            NotesForm = view.down('#NotesForm').getForm(),
            CDForm = view.down('#CDForm').getForm(),
            DMRForm = view.down('#DMRForm').getForm();

        if (view.down('#chkDiscard').getValue() == true) {
            var js_authStatus = view.down('#cbxStatus').getValue();
            if (js_authStatus == '07') {
                Ext.Msg.confirm('Confirm', 'Are you sure you would like to discard this ' + determinationType + '?', function (btn) {
                    if (btn == 'yes') {
                        var root = {
                            OtherValues: [{
                                dtManualRcvd: '',
                                tManualRcvd: '',
                                cbAmPM: '',
                                dtSSReceived: '',
                                tSSREceived: '',
                                cbxSSAmPm: '',
                                dtCheckSentDate: '',
                                tCheckSentDate: '',
                                cbxCheckAmPm: '',

                                dtCDAORRecvdDate: '',
                                tCDAORRecvdTime: '',
                                cbxCDAORRecvdDate: '',

                                IsOverride: '',

                                dtUrgencyUpdate: '',
                                tUrgencyUpdate: '',
                                cbxAMPMUrgencyUpdate: ''
                            }],
                            masterBean: {
                                CoverageDeterminationBean: {
                                    DiscardPA: true,
                                    ReviewNotes: 'User ' + Atlas.user.un + ' closed this CD and discard without any validations on CD required fields.'
                                }
                            }
                        };
                        me.setCoverageDeterminationData(root, view.down('#numAuthID').getValue(), root.OtherValues, false);

                    } else {
                        view.down('#chkDiscard').setValue(false);
                    }
                });
            } else {
                view.down('#chkDiscard').setValue(false);
                Ext.Msg.alert('PBM', 'Can not discard CD for the selected status.');

            }
        }
        else {
            var hiddenPAStatus = view.down('#hidPAStatus').getValue();
            var PAStatus = view.down('#cbxStatus').getValue();
            var isPartialApproval = view.down('#chkPartialApproval').getValue();
            var LOB = view.down('#hidLOB').getValue();
            var CarrierID = view.down('#hdnCarrierId').getValue();
            var PATypeFlag = view.down('#cbxRequestType').getValue();


            if (determinationType == 'CD') {
                if (view.down('#cbxStatus').getValue() == '17' && (!view.down('#chkDischargeNotification').getValue())) {
                    Ext.Msg.alert('Message', 'Please check Discharge Notification checkbox to set status Discharge Review.');
                    return false;
                }

                var minQuantity = view.down('#txtQtyMin').getValue() == null ? '0' : view.down('#txtQtyMin').getValue(),
                    maxQuantity = view.down('#txtQtyMax').getValue() == null ? '0' : view.down('#txtQtyMax').getValue(),
                    minDaysSupp = view.down('#txtDaysMin').getValue() == null ? '0' : view.down('#txtDaysMin').getValue(),
                    maxDaysSupp = view.down('#txtDaysMax').getValue() == null ? '0' : view.down('#txtDaysMax').getValue();

                if (minQuantity > maxQuantity) {
                    Ext.Msg.alert('Quantity Error', 'Quantity min can not be greater than Quantity max value.');
                    return false;
                }

                if (minDaysSupp > maxDaysSupp) {
                    Ext.Msg.alert('Days Supply Error', 'Days Supply min can not be greater than Days Supply max value.');
                    return false;
                }
            }

            if (LOB == '2') {
                //MHP Medicare and RiverSpring
                if (CarrierID == '5' || CarrierID == '55') {
                    if ((hiddenPAStatus != PAStatus) && (PAStatus == '09' && !isPartialApproval && PATypeFlag != 'O')) {
                        vm.set('ApprovalLetterFlag', true);
                    }

                    if ((hiddenPAStatus != PAStatus) && (PAStatus == '08' || (PAStatus == '09' && isPartialApproval))) {
                        vm.set('DenialLetterFlag', true);
                    }
                }

            }

            if (determinationType == 'CD') {
                if (LOB == '1') {
                    //MHP Medicaid
                    if (CarrierID == '5') {
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '08')) {
                            vm.set('DenialLetterFlag', true);
                        }
                    } else if (CarrierID == '32') {
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '08')) {
                            vm.set('DenialLetterFlag', true);
                        }
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '09') && (PATypeFlag != 'O')) {
                            vm.set('NLHApprovalFlag', true);
                        }
                    }
                } else if (LOB == '3') {
                    //HIX
                    if (CarrierID == '5') {
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '08')) {
                            vm.set('DenialLetterFlag', true);
                        }
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '09') && (PATypeFlag != 'O')) {
                            vm.set('HIXApprovalLetterFlag', true);
                        }
                    }
                    else if (CarrierID == '27') {
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '08')) {
                            vm.set('DenialLetterFlag', true);
                        }
                        if ((hiddenPAStatus != PAStatus) && (PAStatus == '09') && (PATypeFlag != 'O')) {
                            vm.set('EXTApprovalLetterFlag', true);
                        }
                    }
                }
            }

            if (view.down('#dtEffectiveDate').isValid() && view.down('#dtTermDate').isValid() && view.down('#cbxStatus').isValid()) {
                if ((view.down('#cbxStatus').getValue() != '') && (view.down('#dtEffectiveDate').getValue() != '') && (view.down('#dtTermDate').getValue() != '') && (view.down('#cbxDeterminationType').getValue() != '')) {
                    var ssreceivedtype = view.down('#cbxSSReceiveType').getValue() != null && view.down('#cbxSSReceiveType').getValue() != undefined && view.down('#cbxSSReceiveType').getValue() != '' && view.down('#cbxSSReceiveType').getValue() != '-1';
                    var ssintake = view.down('#dtSSReceived').getValue() != null && view.down('#dtSSReceived').getValue() != undefined && view.down('#dtSSReceived').getValue() != '';
                    if (ssreceivedtype != ssintake) {
                        Ext.Msg.alert('PBM', 'Please fill s.s received date and s.s. intake both.');
                        return false;
                    }
                    if ((view.down('#dtSSReceived').getValue() == null && view.down('#tSSREceived').getValue() != '') || (view.down('#dtSSReceived').getValue() != null && view.down('#tSSREceived').getValue() == '')) {
                        Ext.Msg.alert('CD Validation Error', 'Please provide date and time.');
                        return false;
                    }
                    if ((view.down('#dtCDAORRecvdDate').getValue() == null && view.down('#tCDAORRecvdTime').getValue() != '') || (view.down('#dtCDAORRecvdDate').getValue() != null && view.down('#tCDAORRecvdTime').getValue() == '')) {
                        Ext.Msg.alert('CD Validation Error', 'Please provide date and time.');
                        return false;
                    }
                    if ((view.down('#dtManualRcvd').getValue() == null && view.down('#tManualRcvd').getValue() != '') || (view.down('#dtManualRcvd').getValue() != null && view.down('#tManualRcvd').getValue() == '')) {
                        Ext.Msg.alert('CD Validation Error', 'Please provide date and time.');
                        return false;
                    }

                    if (determinationType == 'DMR') {
                        if ((view.down('#dtCheckSentDate').getValue() == null && view.down('#tCheckSentDate').getValue() != '') || (view.down('#dtCheckSentDate').getValue() != null && view.down('#tCheckSentDate').getValue() == '')) {
                            Ext.Msg.alert('CD Validation Error', 'Please provide date and time.');
                            return false;
                        }
                    }

                    if (determinationType == 'CD') {
                        if (view.down('#hdnDataSource').getValue() == 'MDB') {
                            if (view.down('#lblGPICode14').text == '99999999999999') {
                                var compoundGPIs = this.getCompoundGPIs();
                                var arrCompoundGPIs = compoundGPIs.split(',');
                                if (arrCompoundGPIs.length >= 2) {

                                } else {
                                    Ext.Msg.alert('Compound GPI Validation', 'Please select atleast 2 medications.');
                                    return false;
                                }
                            }
                        } else {
                            if (view.down('#lblGCN').text == '9999999') {
                                var compoundGCNs = this.getCompoundGCNs();
                                var arrCompoundGCNs = compoundGCNs.split(',');
                                if (arrCompoundGCNs.length >= 2) {

                                } else {
                                    Ext.Msg.alert('Compound GCN Validation', 'Please select atleast 2 medications.');
                                    return false;
                                }
                            }
                        }

                        if (view.down('#hdnIsOverride').text == 'yes' && view.down('#cbxIntake').getValue() != 'Fax') {
                            me.checkManualReceivedDateTime();
                        }
                    }

                    if (view.down('#cbxRequestor').getValue() == 'MemberRep') {
                        view.down('#txtRequestorName').allowBlank = false;
                        view.down('#txtRelationship').allowBlank = false;
                        view.down('#txtAddress').allowBlank = false;
                        view.down('#txtCity').allowBlank = false;
                        view.down('#txtState').allowBlank = false;
                        view.down('#txtZip').allowBlank = false;
                        view.down('#txtPhone').allowBlank = false;
                    }
                    else {
                        view.down('#txtRequestorName').allowBlank = true;
                        view.down('#txtRelationship').allowBlank = true;
                        view.down('#txtAddress').allowBlank = true;
                        view.down('#txtCity').allowBlank = true;
                        view.down('#txtState').allowBlank = true;
                        view.down('#txtZip').allowBlank = true;
                        view.down('#txtPhone').allowBlank = true;
                        view.down('#txtFax').allowBlank = true;
                        view.down('#txtEmail').allowBlank = true;
                    }

                    if (determinationType == 'CD') {
                        view.down('#cbxUrgencyType').allowBlank = false;
                        view.down('#cbxReasonforRequest').allowBlank = true;
                    }
                    else {
                        view.down('#cbxUrgencyType').allowBlank = true;
                        view.down('#cbxReasonforRequest').allowBlank = false;
                    }

                    if (!MemberInfo.isValid() || !RequestForm.isValid() || !NotesForm.isValid()) {
                        Ext.Msg.alert('Validation Error', 'Please enter all required fields before saving the data.');
                        return;
                    }

                    if (determinationType == 'CD') {
                        if (!view.down('#CDForm').getForm().isValid()) {
                            Ext.Msg.alert('Validation Error', 'Please enter all required fields before saving the data.');
                            return;
                        }
                    }
                    else {
                        if (!view.down('#DMRForm').getForm().isValid()) {
                            Ext.Msg.alert('Validation Error', 'Please enter all required fields before saving the data.');
                            return;
                        }
                    }

                    if (!this.checkDateTime(view.down('#dtManualRcvd'), view.down('#tManualRcvd'), view.down('#cbAmPM')) || !this.checkDateTime(view.down('#dtSSReceived'), view.down('#tSSREceived'), view.down('#cbxSSAmPm')) || !this.checkDateTime(view.down('#dtCDAORRecvdDate'), view.down('#tCDAORRecvdTime'), view.down('#cbxCDAORRecvdDate')))
                    {
                        return false;
                    }
                    // debugger;

                    if (determinationType == 'CD') {
                        var arrOverrides = new Array(50);
                        for (var i = 0; i < 50; i++) {
                            arrOverrides[i] = 0;
                        }
                        arrOverrides[4] = view.down('#Overrides_5').getValue() == true ? 1 : 0;
                        arrOverrides[15] = view.down('#Overrides_16').getValue() == true ? 1 : 0;
                        arrOverrides[13] = view.down('#Overrides_14').getValue() == true ? 1 : 0;
                        arrOverrides[16] = view.down('#Overrides_17').getValue() == true ? 1 : 0;
                        arrOverrides[12] = view.down('#Overrides_13').getValue() == true ? 1 : 0;
                        arrOverrides[3] = view.down('#Overrides_4').getValue() == true ? 1 : 0;
                        arrOverrides[5] = view.down('#Overrides_6').getValue() == true ? 1 : 0;
                        arrOverrides[0] = view.down('#Overrides_1').getValue() == true ? 1 : 0;
                        arrOverrides[11] = view.down('#Overrides_12').getValue() == true ? 1 : 0;
                        arrOverrides[2] = view.down('#Overrides_3').getValue() == true ? 1 : 0;
                        arrOverrides[9] = view.down('#Overrides_10').getValue() == true ? 1 : 0;
                        arrOverrides[1] = view.down('#Overrides_2').getValue() == true ? 1 : 0;
                        arrOverrides[6] = view.down('#Overrides_7').getValue() == true ? 1 : 0;
                        arrOverrides[22] = view.down('#Overrides_23').getValue() == true ? 1 : 0;
                        arrOverrides[8] = view.down('#Overrides_9').getValue() == true ? 1 : 0;
                        arrOverrides[23] = view.down('#Overrides_24').getValue() == true ? 1 : 0;
                        arrOverrides[17] = view.down('#Overrides_18').getValue() == true ? 1 : 0;
                        arrOverrides[24] = view.down('#Overrides_25').getValue() == true ? 1 : 0;
                        arrOverrides[18] = view.down('#Overrides_19').getValue() == true ? 1 : 0;
                        arrOverrides[25] = view.down('#Overrides_26').getValue() == true ? 1 : 0;
                        arrOverrides[19] = view.down('#Overrides_20').getValue() == true ? 1 : 0;
                        arrOverrides[26] = view.down('#Overrides_27').getValue() == true ? 1 : 0;
                        arrOverrides[7] = view.down('#Overrides_8').getValue() == true ? 1 : 0;
                        arrOverrides[27] = view.down('#Overrides_28').getValue() == true ? 1 : 0;
                        arrOverrides[21] = view.down('#Overrides_22').getValue() == true ? 1 : 0;
                        arrOverrides[20] = view.down('#Overrides_21').getValue() == true ? 1 : 0;
                        arrOverrides[10] = view.down('#Overrides_11').getValue() == true ? 1 : 0;
                        arrOverrides[14] = view.down('#Overrides_15').getValue() == true ? 1 : 0;

                        var root = {
                            OtherValues: [{
                                dtManualRcvd: view.down('#dtManualRcvd').getValue() == null ? '' : Ext.Date.format(view.down('#dtManualRcvd').getValue(), 'm/d/Y'),
                                tManualRcvd: view.down('#tManualRcvd').getValue() == null ? '' : view.down('#tManualRcvd').getValue(),
                                cbAmPM: view.down('#cbAmPM').getValue() == null ? 'AM' : view.down('#cbAmPM').getValue(),
                                dtSSReceived: view.down('#dtSSReceived').getValue() == null ? '' : Ext.Date.format(view.down('#dtSSReceived').getValue(), 'm/d/Y'),
                                tSSREceived: view.down('#tSSREceived').getValue() == null ? '' : view.down('#tSSREceived').getValue(),
                                cbxSSAmPm: view.down('#cbxSSAmPm').getValue() == null ? 'AM' : view.down('#cbxSSAmPm').getValue(),

                                dtCDAORRecvdDate: view.down('#dtCDAORRecvdDate').getValue() == null ? '' : Ext.Date.format(view.down('#dtCDAORRecvdDate').getValue(), 'm/d/Y'),
                                tCDAORRecvdTime: view.down('#tCDAORRecvdTime').getValue() == null ? '' : view.down('#tCDAORRecvdTime').getValue(),
                                cbxCDAORRecvdDate: view.down('#cbxCDAORRecvdDate').getValue() == null ? 'AM' : view.down('#cbxCDAORRecvdDate').getValue(),

                                IsOverride: view.down('#hdnIsOverride').text,

                                dtUrgencyUpdate: (vm.get('UrgencyWindowOpen') == false ? '' : winUrgencyType.down('#dtUrgecyChangeDate').getRawValue()),
                                tUrgencyUpdate: (vm.get('UrgencyWindowOpen') == false ? '' : winUrgencyType.down('#tUrgecyChangeTime').getValue()),
                                cbxAMPMUrgencyUpdate: (vm.get('UrgencyWindowOpen') == false ? 'AM' : winUrgencyType.down('#cbxUrgecyChange').getValue())
                            }],
                            masterBean: {
                                CoverageDeterminationBean: {
                                    CompoundGCN: this.getCompoundGCNs(),
                                    compoundGPI: this.getCompoundGPIs(),
                                    DeterminationType: view.down('#cbxDeterminationType').getValue(),
                                    CarrierID: view.down('#hdnCarrierId').getValue() == '' ? 0 : view.down('#hdnCarrierId').getValue(),
                                    NDC: view.down('#hdnNDC').getValue(),
                                    PrescriberID: view.down('#lblNPI').getText(),
                                    RecipientID: view.down('#lblRecipientID').getText() == '' ? 0 : view.down('#lblRecipientID').getText(),
                                    MemberID: view.down('#hdnMemberId').getValue(),
                                    PlanGroupId: view.down('#cbxMemGroup').getValue() == '' ? 0 : view.down('#cbxMemGroup').getValue(),
                                    ProviderNABP: view.down('#lblNCPDPID').getValue(),
                                    ProviderRelationshipId: view.down('#txtRelationshipID').getValue(),
                                    GCN_SEQNO: view.down('#radGCN').getValue() ? view.down('#lblGCN').text : 0,
                                    HICL_SEQNO: view.down('#radHICL').getValue() ? view.down('#lblHICL').text : 0,

                                    GPI10: view.down('#radGPI10').getValue() ? (this.getCompoundGPIs() == '' ? view.down('#lblGPICode10').text : '') : '',
                                    GPICode: view.down('#radGPI14').getValue() ? view.down('#lblGPICode14').text : '',
                                    DataSource: view.down('#hdnDataSource').getValue(),


                                    InTake: view.down('#cbxIntake').getValue() == '-1' ? '' : view.down('#cbxIntake').getValue(),
                                    PAtypeFlag: view.down('#cbxRequestType').getValue(),
                                    UrgencyType: view.down('#cbxUrgencyType').getValue(),
                                    PendDischrgNotify: view.down('#chkDischargeNotification').getValue() ? true : false,
                                    PendDischrgHospital: view.down('#txtHospital').getValue(),
                                    SupportStmtReceivedDate: view.down('#dtSSReceived').getValue() == null ? '' : view.down('#dtSSReceived').getValue(),
                                    SupportStmtType: view.down('#cbxSSReceiveType').getValue() == '-1' || view.down('#cbxSSReceiveType').getValue() == null ? '' : view.down('#cbxSSReceiveType').getValue(),
                                    Requestor: view.down('#cbxRequestor').getValue() == '-1' ? '' : view.down('#cbxRequestor').getValue(),
                                    ReqFullName: view.down('#txtRequestorName').getValue().split(',')[0],
                                    ReqRelationship: view.down('#txtRelationship').getValue(),
                                    ReqAddress: view.down('#txtAddress').getValue(),
                                    ReqCity: view.down('#txtCity').getValue(),
                                    ReqState: view.down('#txtState').getValue(),
                                    ReqZip: view.down('#txtZip').getValue(),
                                    ReqPhone: view.down('#txtPhone').getValue(),
                                    ReqFax: view.down('#txtFax').getValue(),
                                    ReqEmail: view.down('#txtEmail').getValue(),

                                    Overrides: arrOverrides,
                                    RejectionCodeOverride: RejectionCodeOverride,

                                    QtyMin: view.down('#txtQtyMin').getValue() == '' || view.down('#txtQtyMin').getValue() == null ? 0 : view.down('#txtQtyMin').getValue(),
                                    QtyMax: view.down('#txtQtyMax').getValue() == '' || view.down('#txtQtyMax').getValue() == null ? 0 : view.down('#txtQtyMax').getValue(),
                                    DaysSupplyMin: view.down('#txtDaysMin').getValue() == '' || view.down('#txtDaysMin').getValue() == null ? 0 : view.down('#txtDaysMin').getValue(),
                                    DaysSupplyMax: view.down('#txtDaysMax').getValue() == '' || view.down('#txtDaysMax').getValue() == null ? 0 : view.down('#txtDaysMax').getValue(),
                                    MaxNumFills: view.down('#txtNoOfFills').getValue() == '' || view.down('#txtNoOfFills').getValue() == null ? 0 : view.down('#txtNoOfFills').getValue(),
                                    MaxCostMAx: view.down('#txtMaxCost').getValue() == '' || view.down('#txtMaxCost').getValue() == null ? 0 : view.down('#txtMaxCost').getValue(),
                                    PriceMax: view.down('#PriceMax').getValue() == '' || view.down('#PriceMax').getValue() == null ? 0 : view.down('#PriceMax').getValue(),
                                    CopayOverrideAmt: view.down('#CopayMax').getValue() == '' || view.down('#CopayMax').getValue() == null ? 0 : view.down('#CopayMax').getValue(),
                                    PartialApproval: view.down('#chkPartialApproval').getValue() ? true : false,
                                    EmergencySupply: view.down('#chkEmergencySupply').getValue() ? true : false,


                                    ReasonCode: ReasonCode,
                                    ReviewNotes: view.down('#txtNotes').getValue(),
                                    ResolvedInFirstCall: view.down('#chkResvldInFirstCall').getValue() ? true : false,

                                    SOURCE: '',
                                    // EffectiveDateTime: view.down('#dtEffectiveDate').getValue() != null ? Atlas.common.utility.Utilities.FixDateoffsetToSave(view.down('#dtEffectiveDate').getValue(), 'm/d/Y') : '',
                                    // TermDateTime: view.down('#dtTermDate').getValue() != null ? Atlas.common.utility.Utilities.FixDateoffsetToSave(view.down('#dtTermDate').getValue(), 'm/d/Y') : '',
                                    EffectiveDateTime: view.down('#dtEffectiveDate').getValue() != null ? Ext.Date.format(view.down('#dtEffectiveDate').getValue(), 'm/d/Y') : '',
                                    TermDateTime: view.down('#dtTermDate').getValue() != null ? Ext.Date.format(view.down('#dtTermDate').getValue(), 'm/d/Y') : '',
                                    AuthStatus: view.down('#cbxStatus').getValue(),
                                    oldAuthStatus: view.down('#hidPAStatus').getValue(),
                                    LastModified: view.down('#hdnLastModified').getValue(),
                                    UpdateEffectuationdate: view.down('#cbxUpdateEffectuationDate').getValue() != null && (view.down('#hidMedicarePAQueueAccess').getValue() == 'true' || view.down('#hidMedicarePAQueueAccess').getValue() == true) ? view.down('#cbxUpdateEffectuationDate').getValue() : '',
                                    ReOpenRequest: view.down('#chkReopen').getValue() ? true : false

                                }

                            }
                        };

                        if (selectedAuthID == '0') {
                            vm.set('NewAuth', true);
                        }
                        else {
                            if (this.receipientID == null || this.receipientID == 0) {
                                vm.set('NewAuth', true);
                            }
                            else {
                                vm.set('NewAuth', false);
                            }
                        }

                        if (vm.get('UrgencyWindowOpen') == false) {
                            if (selectedAuthID != '0' && UrgencyType != '' && view.down('#cbxUrgencyType').getValue() != UrgencyType && LOB == '2') {
                                Ext.Msg.confirm('Confirm', 'Was request initially made under another timeframe ?', function (btn) {
                                    if (btn == 'yes') {
                                        me.showUrgencyChangeWindow();
                                        return false;
                                    } else {
                                        if ((DischargeNotification != view.down('#chkDischargeNotification').getValue()) && (view.down('#chkDischargeNotification').getValue() == true)) {
                                            Ext.Msg.confirm('Confirm', 'A discharge notification email will be sent to the review team, would you like to continue?', function (btn) {
                                                if (btn == 'yes') {
                                                    me.setCoverageDeterminationData(root, view.down('#numAuthID').getValue(), LOB, false);
                                                } else {
                                                    return false;
                                                }
                                            }, this);
                                        } else {
                                            me.setCoverageDeterminationData(root, view.down('#numAuthID').getValue(), LOB, false);
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

                        if ((DischargeNotification != view.down('#chkDischargeNotification').getValue()) && (view.down('#chkDischargeNotification').getValue() == true)) {
                            Ext.Msg.confirm('Confirm', 'A discharge notification email will be sent to the review team, would you like to continue?', function (btn) {
                                if (btn == 'yes') {
                                    me.setCoverageDeterminationData(root, view.down('#numAuthID').getValue(), LOB, false);
                                } else {
                                    return false;
                                }
                            }, this);
                        } else {
                            me.setCoverageDeterminationData(root, view.down('#numAuthID').getValue(), LOB, false);
                        }
                    }
                    else {
                        var DMRRoot = {
                            OtherValues: [{
                                dtManualRcvd: view.down('#dtManualRcvd').getValue() == null ? '' : Ext.Date.format(view.down('#dtManualRcvd').getValue(), 'm/d/Y'),
                                tManualRcvd: view.down('#tManualRcvd').getValue() == null ? '' : view.down('#tManualRcvd').getValue(),
                                cbAmPM: view.down('#cbAmPM').getValue() == null ? 'AM' : view.down('#cbAmPM').getValue(),
                                dtSSReceived: view.down('#dtSSReceived').getValue() == null ? '' : Ext.Date.format(view.down('#dtSSReceived').getValue(), 'm/d/Y'),
                                tSSREceived: view.down('#tSSREceived').getValue() == null ? '' : view.down('#tSSREceived').getValue(),
                                cbxSSAmPm: view.down('#cbxSSAmPm').getValue() == null ? 'AM' : view.down('#cbxSSAmPm').getValue(),
                                dtCheckSentDate:  view.down('#dtCheckSentDate').getValue() == null ? '' : Ext.Date.format(view.down('#dtCheckSentDate').getValue(), 'm/d/Y'),
                                tCheckSentDate : view.down('#tCheckSentDate').getValue() == null ? '' : view.down('#tCheckSentDate').getValue(),
                                cbxCheckAmPm : view.down('#cbxCheckAmPm').getValue() == null ? 'AM' : view.down('#cbxCheckAmPm').getValue(),

                                dtCDAORRecvdDate: view.down('#dtCDAORRecvdDate').getValue() == null ? '' : Ext.Date.format(view.down('#dtCDAORRecvdDate').getValue(), 'm/d/Y'),
                                tCDAORRecvdTime: view.down('#tCDAORRecvdTime').getValue() == null ? '' : view.down('#tCDAORRecvdTime').getValue(),
                                cbxCDAORRecvdDate: view.down('#cbxCDAORRecvdDate').getValue() == null ? 'AM' : view.down('#cbxCDAORRecvdDate').getValue(),

                                IsOverride: view.down('#hdnIsOverride').text
                            }],
                            masterBean: {
                                CoverageDeterminationBean: {
                                    CarrierID: view.down('#hdnCarrierId').getValue() == '' ? 0 : view.down('#hdnCarrierId').getValue(),
                                    DeterminationType: view.down('#cbxDeterminationType').getValue(),
                                    MemberID: view.down('#hdnMemberId').getValue(),
                                    PrescriberID: view.down('#lblNPI').getText(),
                                    RecipientID: view.down('#lblRecipientID').getText() == '' ? 0 : view.down('#lblRecipientID').getText(),
                                    PlanGroupId: view.down('#cbxMemGroup').getValue() == '' ? 0 : view.down('#cbxMemGroup').getValue(),
                                    ProviderNABP: view.down('#lblNCPDPID').getValue(),
                                    GCN_SEQNO: view.down('#radGCN').getValue() ? view.down('#lblGCN').text : 0,
                                    HICL_SEQNO: view.down('#radHICL').getValue() ? view.down('#lblHICL').text : 0,
                                    NDC: view.down('#hdnNDC').getValue(),
                                    PAtypeFlag: view.down('#cbxRequestType').getValue(),
                                    InTake: view.down('#cbxIntake').getValue() == null ? '' : view.down('#cbxIntake').getValue(),
                                    ReasonForRequest: view.down('#cbxReasonforRequest').getValue() == null ? '' : view.down('#cbxReasonforRequest').getValue(),
                                    SupportStmtReceivedDate: view.down('#dtSSReceived').getValue() == null ? '' : Ext.Date.format(view.down('#dtSSReceived').getValue(), 'm/d/Y'),
                                    SupportStmtType: view.down('#cbxSSReceiveType').getValue() == '-1' || view.down('#cbxSSReceiveType').getValue() == null ? '' : view.down('#cbxSSReceiveType').getValue(),
                                    Requestor: view.down('#cbxRequestor').getValue() == null ? '' : view.down('#cbxRequestor').getValue(),

                                    ReqFullName: view.down('#txtRequestorName').getValue().split(',')[0],
                                    ReqRelationship: view.down('#txtRelationship').getValue(),
                                    ReqAddress: view.down('#txtAddress').getValue(),
                                    ReqCity: view.down('#txtCity').getValue(),
                                    ReqState: view.down('#txtState').getValue(),
                                    ReqZip: view.down('#txtZip').getValue(),
                                    ReqPhone: view.down('#txtPhone').getValue(),
                                    ReqFax: view.down('#txtFax').getValue(),
                                    ReqEmail: view.down('#txtEmail').getValue(),

                                    Quantity : view.down('#txtQuantity').getValue() == null ? '' : view.down('#txtQuantity').getValue(),
                                    DaysSupply : view.down('#txtDaySupply').getValue() == null ? '' : view.down('#txtDaySupply').getValue(),
                                    AmtPaid : view.down('#txtAmountPaid').getValue() == null ? '' : view.down('#txtAmountPaid').getValue(),
                                    RxNum : view.down('#txtRXID').getValue() == null ? '' : view.down('#txtRXID').getValue(),
                                    ServiceDate : view.down('#dfService').getValue() == null ? '' : Ext.Date.format(view.down('#dfService').getValue(), 'm/d/Y'),
                                    PharServiceType : view.down('#cbxPharServiceType').getValue() == null ? '' : view.down('#cbxPharServiceType').getValue(),
                                    SubClarificationCode : view.down('#txtSubclarificationCode').getValue() == null ? '' : view.down('#txtSubclarificationCode').getValue(),
                                    Residence : view.down('#cbxResidence').getValue() == null ? '' : view.down('#cbxResidence').getValue(),

                                    SOURCE: '',
                                    EffectiveDateTime: view.down('#dtEffectiveDate').getValue() != null ? Ext.Date.format(view.down('#dtEffectiveDate').getValue(), 'm/d/Y') : '',
                                    TermDateTime: view.down('#dtTermDate').getValue() != null ? Ext.Date.format(view.down('#dtTermDate').getValue(), 'm/d/Y') : '',
                                    ReasonCode: ReasonCode,
                                    ReviewNotes: view.down('#txtNotes').getValue(),
                                    ResolvedInFirstCall: view.down('#chkResvldInFirstCall').getValue() ? true : false,
                                    AuthStatus: view.down('#cbxStatus').getValue(),
                                    ReOpenRequest: view.down('#chkReopen').getValue() ? true : false,
                                    UpdateEffectuationdate: view.down('#cbxUpdateEffectuationDate').getValue() != null && (view.down('#cbxUpdateEffectuationDate').getValue() != null && (view.down('#hidMedicarePAQueueAccess').getValue() == 'true' || view.down('#hidMedicarePAQueueAccess').getValue() == true)) ? view.down('#cbxUpdateEffectuationDate').getValue() : ''

                                }
                            }
                        };
                        this.setCoverageDeterminationData(DMRRoot, selectedAuthID, LOB, false);
                    }

                } else {
                    Ext.Msg.alert('Validation Error', 'Please enter all required fields before saving the data.');
                }
            } else {
                Ext.Msg.alert('Validation Error', 'Please enter all required fields before saving the data.');
            }
        }
    },

    saveAuthDocument: function (newAuthId) {
        var iCnt,
            vm = this.getViewModel(),
            docList = '',
            delDocList = '',
            descList = '',
            attachmentType = '',
            attachedFor = '',
            docDescription = '',
            saveData = '',
            storeAttachments = vm.getStore('storeAttachments');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        /* ADDD ATTACHMENT RECORD */
        for(iCnt = 0; iCnt < storeAttachments.count(); iCnt++) {

            var record = storeAttachments.data.items[iCnt];

            if (!record.dirty) {
                continue;
            }

            docList = docList + (docList == '' ? '' : '|') + record.get('DocumentID');

            docDescription = record.get('Subject');

            if (docDescription == undefined || docDescription == '') {
                if (descList == '') {
                    descList = 'File' + record.get('DocumentID');
                }
                else {
                    descList = descList + '|' + 'File' + record.get('DocumentID');
                }
            }
            else {
                if (descList == '') {
                    descList = record.get('Subject');
                }
                else {
                    descList = descList + '|' + record.get('Subject');
                }
            }

            attachmentType = attachmentType + (attachmentType == '' ? '' : '|') + record.get('AttachmentType');
            attachedFor = attachedFor + (attachedFor == '' ? '' : '|') + record.get('AddlSystemID');
        }

        descList = descList + '^' + attachmentType + '^' + attachedFor;

        if (docList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'authID',
                    pcKeyValue: newAuthId,
                    pcKeyAction: 'A',
                    pcDocIDList: docList,
                    pcDescrData: descList
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }

        /* DELETE ATTACHMENT RECORD */
        for (iCnt in storeAttachments.removed) {
            delDocList = delDocList + (delDocList == '' ? '' : '|') + storeAttachments.removed[iCnt].data.DocumentID;
        }

        if (delDocList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'authID',
                    pcKeyValue: newAuthId,
                    pcKeyAction: 'D',
                    pcDocIDList: delDocList,
                    pcDescrData: ''
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }
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
                            enforceMaxLength: true
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

    GetPA: function (f, e) {
        if (e.getKey() == e.ENTER) {
            if (parseInt(f.lastValue) > 0) {
                this.GetPALoad(f.lastValue, true);
            }
        }
    },

    cbxMember_Select: function (combo, record) {
        var view = this.getView();
        var vm = this.getViewModel();

        this.bindRequestTypeCombo('0', false);

        view.down('#lblRecipientID').setText(record.data.recipientID);
        view.down('#lblDOB').setValue(Ext.Date.format(new Date(record.data.dob), 'm/d/Y'));
        view.down('#lblGender').setValue(record.data.gender);

        view.down('#lblEnroll').setValue(record.data.memStatus);
        if (record.data.memStatus.toLowerCase() == 'inactive') {
            view.down('#lblEnroll').setFieldStyle({color :'red'});
        }
        else if (record.data.memStatus.toLowerCase() == 'active') {
            view.down('#lblEnroll').setFieldStyle({color :'green'});
        }
        view.down('#hdnMemberId').setValue(record.data.memberID);
        view.down('#hidPARecipientID').setValue('');
        view.down('#hiddenRecipientID').setValue(record.data.recipientID);
        view.down('#hdnCarrierId').setValue(record.data.tcarrierID);

        this.getMemberGroup(record.data.recipientID, '', true); //------------------------------------------ ------------------------------------------------
        view.down('#lblAddress').setText('NA');

		if (!this.tipMember) {
            this.tipMember= Ext.create('Ext.tip.ToolTip', {
                target: view.down('#cbxMember'),
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        tip.update(view.down('#cbxMember').getRawValue());
                    }
                }
            });
        }
    },

    getMemberInfo: function (recipientID, isRefresh, updatePlan) {

        var view = this.getView(),
            vm = this.getViewModel(),
            me = this,
            memberInfo = vm.getStore('memberInfo'),
            memberAddressDetail = vm.getStore('memberAddressDetail'),
            fieldList = 'recipientID,firstname,middlename,lastname,gender,birthDate,@enrollmentStatus,@CoCMember,@MedicarePlanGroupId';

        memberInfo.getProxy().setExtraParam('pKeyValue', recipientID);
        memberInfo.getProxy().setExtraParam('pKeyType', 'RecipientID');
        memberInfo.getProxy().setExtraParam('pFieldList', fieldList);
        memberInfo.load({
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText.replace("@CoCMember","CoCMember").replace("@MedicarePlanGroupId","MedicarePlanGroupId"));

                if (record.length != 0) {
                    if (objResp.data[0].CoCMember == 'CoC') {
                        view.down('#CntCocMember').show();
                        view.down('#lblCoCMember').setText('Coordinated Care Member');
                        view.down('#lblCoCMember').setStyle('color', 'red');
                    }

                    if (updatePlan) {
                        if (objResp.data[0].MedicarePlanGroupId != '' && objResp.data[0].MedicarePlanGroupId != undefined) {
                            view.down('#cbxMemGroup').setValue(objResp.data[0].MedicarePlanGroupId);
                            me.planSelection(view.down('#cbxMemGroup').getValue(), '', isRefresh);
                        }
                        else {
                            view.down('#cbxMemGroup').setValue('');
                        }
                    }
                }
                else
                {
                    view.down('#lblCoCMember').setText('');
                }
            }
        });

        memberAddressDetail.getProxy().setExtraParam('ipiRecipientId', recipientID);
        memberAddressDetail.getProxy().setExtraParam('ipcType', 'Home');
        memberAddressDetail.load({
            callback: function (record, operation, success) {
                if (record.length != 0) {
                    view.down('#lblAddress').setText(record[0].data.address1 != '' ? record[0].data.address1 + " " + record[0].data.address2 + ", " + record[0].data.city + ", " + record[0].data.State + " - " + (record[0].data.ZipCode != '' && record[0].data.ZipCode.length > 5 ? record[0].data.ZipCode.substr(0, 5) + "-" + record[0].data.ZipCode.substr(5) : record[0].data.ZipCode) : "NA");
                }
            }
        });

    },

    cbxMemGroup_Select: function (combo, record) {
        var view = this.getView(),
            cbxMemGroup = view.down('#cbxMemGroup');

        this.planSelection(cbxMemGroup.getValue(), view.down('#lblPAStsatus').getValue(), true);
    },

    cbxPrescriber_Select: function (combo, record) {
        var view = this.getView();
        view.down('#lblNPI').setText(record.data.npi);
        view.down('#lblAddressNPI').setText(record.data.locaddr1 != '' ? record.data.locaddr1 + ", " + record.data.loccity + ", " + record.data.locstate + " - " + (record.data.loczip != '' && record.data.loczip.length > 5 ? record.data.loczip.substr(0, 5) + "-" + record.data.loczip.substr(5) : record.data.loczip) : "NA");
		if (!this.tipPrescriber) {
            this.tipPrescriber = Ext.create('Ext.tip.ToolTip', {
                target: view.down('#cbxPrescriber'),
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        tip.update(view.down('#cbxPrescriber').getRawValue());
                    }
                }
            });
        }
    },

    cbxPharmacy_Select: function (combo, record) {
        var view = this.getView();
        view.down('#lblNCPDPID').setValue(record.data.ncpdpId);
		if (!this.tipPharmacy) {
            this.tipPharmacy= Ext.create('Ext.tip.ToolTip', {
                target: view.down('#cbxPharmacy'),
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        tip.update(view.down('#cbxPharmacy').getRawValue());
                    }
                }
            });
        }
    },

    cbxMedication_Select: function (combo, record) {
        var view = this.getView();
        view.down('#hdnNDC').setValue(view.down('#cbxMedication').getValue());
        this.getGCN(record);
        this.showHideMedicationInfo(record.data.ProtectedClassDrug);
        this.getDrugFormularyDetails(false);
		
		 if (!this.tipGPINDC) {
            this.tipGPINDC= Ext.create('Ext.tip.ToolTip', {
                target: view.down('#cbxGPINDC'),
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        tip.update(view.down('#cbxGPINDC').getRawValue());
                    }
                }
            });
        }
    },

    cbxGPINDC_Select: function (combo, record) {
        var view = this.getView();
        view.down('#hdnNDC').setValue(view.down('#cbxGPINDC').getValue());
        this.getGPI(record);
        this.showHideMedicationInfo(record.data.ProtectedClassDrug);
    },

    cbxRequestor_Select: function (combo, record) {
        var view = this.getView(),
            fpRequestor = view.down('#fpRequestor');

        fpRequestor.getForm().reset();

        if (record.data.value == 'MemberRep') {
            view.down('#pnlRequestorRep').expand();
            view.down('#txtRequestorName').allowBlank = false;
            view.down('#txtRelationship').allowBlank = false;
            view.down('#txtAddress').allowBlank = false;
            view.down('#txtCity').allowBlank = false;
            view.down('#txtState').allowBlank = false;
            view.down('#txtZip').allowBlank = false;
            view.down('#txtPhone').allowBlank = false;
            view.down('#fpRequestor').isValid();
        }
        else {
            view.down('#pnlRequestorRep').collapse();
            view.down('#txtRequestorName').allowBlank = true;
            view.down('#txtRelationship').allowBlank = true;
            view.down('#txtAddress').allowBlank = true;
            view.down('#txtCity').allowBlank = true;
            view.down('#txtState').allowBlank = true;
            view.down('#txtZip').allowBlank = true;
            view.down('#txtPhone').allowBlank = true;
            view.down('#txtFax').allowBlank = true;
            view.down('#txtEmail').allowBlank = true;
            view.down('#fpRequestor').isValid();
        }
    },

    cbxIntake_Select : function(selection) {
        var view = this.getView();
        if(this.selectedAuthID == null){
            if(selection.value == 'Fax'){
                this.overrideDisabled('NewFax');
            }
            else{
                this.overrideDisabled('New');
            }
        }
        else{
            if(selection.value == 'Fax'){
                this.overrideDisabled('OverrideAllowed');
            }
            else{
                this.overrideDisabled('NoOverrideRequired');
            }
        }
    },

    btnOverride_Click : function(btn, text){
        this.overrideDisabled(btn.params.action);
    },

    chkDiscard_Change: function (checkbox, newValue, oldValue) {
        var view = this.getView();
        if (newValue == true) {
            var js_authStatus = view.down('#cbxStatus').getValue();
            if (js_authStatus != '07') {
                Ext.Msg.alert('PBM', 'Can not discard CD for the selected status.', function (btn) {
                    view.down('#chkDiscard').setValue('0');
                });
            }
        }
    },

    cbxStatus_Select: function (combo, record) {
        var view = this.getView();
        if (record.data.ListItem != '07') {
            if (view.down('#chkDiscard').getValue()) {
                view.down('#chkDiscard').setValue('0');
            }
        }
    },

    cbxStatus_beforeSelect: function (combo, record) {
        if (record.data.ListItem == '17' && !this.getView().down('#chkDischargeNotification').getValue()) {
            Ext.Msg.alert('Message', 'Please check Discharge Notification checkbox to set status Discharge Review.');
            return false;
        }
    },

    getMemberGroup: function (recipientId, selPlangroup, isRefresh) {
        var view = this.getView(),
            vm = this.getViewModel(),
            me = this;

        if (recipientId == undefined || recipientId == '') return;
        var store = vm.getStore('storememgroup');
        store.getProxy().setExtraParam('pRecipientId', recipientId);
        store.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (record.length == 1) {
                        var item = record[0].data;
                        view.down('#cbxMemGroup').setValue(item.planGroupId);
                        view.down('#cbxMemGroup').setDisabled(true);

                        var fieldList = 'systemId,planGroupId,carrierId,carrierName,carrierAcctNumber,accountName,carrierLOBId,lobName,planGroupCode,planGroupName,effDate,renewalDate,termDate,planGroupStatus,exclFormularyId,formularyId,MACListID,allowMemberLocks,processMTMCase,processMAPCase,pharmNetworkId,nonPrefPharmNetworkId,planFaxLogo,allowMedAdminFee,medAdminFeeAmt,payablePatRespCodes,partBPCN,pcnCodeList,mandatoryGeneric,cmsPBPid,CMSPlanId,CMSFormularyId,CMSCntrId,CMSPlanType,asthmaHEDISAlert,copayCalcFunction,defMemberEnollAddrType,MbrCardFrontImage,MbrCardFrontCSS,MbrCardBackImage,MbrCardBackCSS,@DrugDataSource,PDEPlanType,useAllowedPrescribers,PayNonPartDIngredients';
                        var store = vm.getStore('storeplangroupinfo');
                        store.getProxy().setExtraParam('pplanGroupId', item.planGroupId);
                        store.getProxy().setExtraParam('pFieldList', fieldList);
                        store.load(
                            {
                                scope: this,
                                failure: function (record, operation) {
                                    //do something if the load failed
                                },
                                success: function (record, operation) {

                                },
                                callback: function (record, operation, success) {
                                    var fieldsValues = record[0].data.result[0].data;
                                    view.down('#hdnCarrierId').setValue(fieldsValues['carrierId']);
                                    var carrierLOBId = fieldsValues['carrierLOBId'];
                                    var drugDataSource = fieldsValues['@DrugDataSource'];
                                    if (view.down('#hdnDataSource').getValue() != "" && view.down('#hdnDataSource').getValue() != drugDataSource) {
                                        if (isRefresh) {
                                            view.down('#radGCN').setValue(false);
                                            view.down('#radHICL').setValue(false);
                                            view.down('#radGPI10').setValue(false);
                                            view.down('#radGPI14').setValue(false);
                                            view.down('#cbxGPINDC').setValue("");
                                            view.down('#cbxMedication').setValue("");
                                            view.down('#lblGPICode10').setText('');
                                            view.down('#lblGPICode14').setText('');
                                            view.down('#lblGCN').setText('');
                                            view.down('#lblHICL').setText('');
                                        }
                                        view.down('#radGCN').BoxLabel = "<b>GCN:</b>";
                                        view.down('#radHICL').BoxLabel = "<b>HICL SEQ NO:</b>";
                                        view.down('#radGPI10').BoxLabel = "<b>GPI10:</b>";
                                        view.down('#radGPI14').BoxLabel = "<b>GPICode:</b>";
                                    }
                                    view.down('#hdnDataSource').setValue(drugDataSource);
                                    if (drugDataSource == "MDB") {
                                        view.down('#radGPI10').show();
                                        view.down('#radGPI14').show();
                                        view.down('#radGCN').hide();
                                        view.down('#radHICL').hide();
                                        view.down('#cbxGPINDC').show();
                                        view.down('#cbxMedication').hide();
                                        if (isRefresh) {
                                            view.down('#radHICL').setValue(false);
                                            view.down('#radGCN').setValue(false);
                                            view.down('#radGPI10').setValue(true);
                                            view.down('#radGPI14').setValue(true);
                                        }
                                        view.down('#cbxGPINDC').allowBlank = false;
                                        view.down('#cbxMedication').allowBlank = true;
                                    }
                                    else {
                                        view.down('#radGPI10').hide();
                                        view.down('#radGPI14').hide();
                                        view.down('#radGCN').show();
                                        view.down('#radHICL').show();
                                        view.down('#cbxGPINDC').hide();
                                        view.down('#cbxMedication').show();
                                        if (isRefresh) {
                                            view.down('#radHICL').setValue(true);
                                            view.down('#radGCN').setValue(true);
                                            view.down('#radGPI10').setValue(false);
                                            view.down('#radGPI14').setValue(false);
                                        }
                                        view.down('#cbxGPINDC').allowBlank = true;
                                        view.down('#cbxMedication').allowBlank = false;
                                    }
                                }
                            }
                        );

                        this.planSelection(view.down('#cbxMemGroup').getValue(), view.down('#lblPAStsatus').getValue(), isRefresh);
                        me.getMemberInfo(recipientId, isRefresh, false);
                    }
                    else {
                        view.down('#cbxMemGroup').setValue(selPlangroup);
                        if (isRefresh) {
                            me.getMemberInfo(recipientId, isRefresh, true);
                            view.down('#cbxMemGroup').setDisabled(false);
                        }
                        else {
                            me.planSelection(view.down('#cbxMemGroup').getValue(), '', isRefresh);
                        }
                    }
                }
            }
        )
    },

    getDrugFormularyDetails: function (isOpenFormularyWindow) {

        var view = this.getView();

        var planGroupID = view.down('#cbxMemGroup').getValue();
        var dataSource = view.down('#hdnDataSource').getValue();
        var keyType = '';
        var keyValue = '';

        if (planGroupID == null || planGroupID == undefined || planGroupID == '') {
            Ext.Msg.alert('Validation', 'Please select a plan group.');
            return false;
        }
        if (dataSource == 'MDB') {
            keyType = view.down('#radGPI14').getValue() ? 'GPICode' : 'GPI10';
            keyValue = view.down('#radGPI14').getValue() ? view.down('#lblGPICode14').text : view.down('#lblGPICode10').text;
        }
        else {
            keyType = view.down('#radGCN').getValue() ? 'GCNSEQ' : view.down('#radHICL').getValue() ? 'HICL' : 'NDC';
            keyValue = view.down('#radGCN').getValue() ? view.down('#lblGCN').text : view.down('#radHICL').getValue() ? view.down('#lblHICL').text : view.down('#lblNDC').text;
        }
        if (isOpenFormularyWindow && (keyValue == null || keyValue == undefined || keyValue == '')) {
            Ext.Msg.alert('Validation', 'Please select a medication.');
            return false;
        }
        //GetFormularyDetails call

        var win = view.add({
            xtype: 'authorization-formularystatuswindow',
            extraParams: {
                'pPlangroupId': planGroupID,
                'pFormularyId': '0',
                'pKeyType': keyType,
                'pKeyValue': keyValue
            },
            autoShow: false
        });
        if (isOpenFormularyWindow) {
            win.show();
            view.down('#lblCarveOut').hide();
        }
    },

    getGCN: function (r) {
        var view = this.getView();
        var determinationType = view.down('#cbxDeterminationType').getValue();

        if (r != null && r.data != null) {
            view.down('#cbxGPINDC').setValue('');
            view.down('#lblNDC').setText(r.data.NDC);
            view.down('#lblGCN').setText(r.data.GCN_SEQNO);
            view.down('#lblHICL').setText(r.data.HICL_SEQNO);
            view.down('#radNDC').setBoxLabel('NDC: ' + r.data.NDC);
            view.down('#radHICL').setBoxLabel('HICL SEQ NO: ' + r.data.HICL_SEQNO);
            view.down('#radGCN').setBoxLabel('GCN: ' + r.data.GCN_SEQNO);
            view.down('#radGPI10').setBoxLabel('GPI10: ');
            view.down('#radGPI14').setBoxLabel('GPICode: ');
            if (determinationType == 'DMR') {
                view.down('#radNDC').setValue(true);
            }
            else {
                view.down('#radGCN').setValue(true);
            }
        }
    },

    getGPI: function (r) {
        var view = this.getView();
        var determinationType = view.down('#cbxDeterminationType').getValue();

        if (r != null && r.data != null) {
            view.down('#cbxMedication').setValue('');
            view.down('#lblNDC').setText(r.data.NDC);
            view.down('#lblGPICode10').setText(r.data.GPICode.substr(0, 10));
            view.down('#lblGPICode14').setText(r.data.GPICode);
            view.down('#radNDC').setBoxLabel('NDC: ' + r.data.NDC);
            view.down('#radGPI10').setBoxLabel('GPI10: ' + (r.data.GPICode == '99999999999999' ? '' : r.data.GPICode.substr(0, 10)));
            view.down('#radGPI14').setBoxLabel('GPICode: ' + r.data.GPICode);
            view.down('#radHICL').setBoxLabel('HICL SEQ NO: ');
            view.down('#radGCN').setBoxLabel('GCN: ');
            if (determinationType == 'DMR') {
                view.down('#radNDC').setValue(true);
            }
            else {
                view.down('#radGPI14').setValue(true);
            }
        }
    },

    showHideMedicationInfo: function (isProtectedClassDrug) {
        var view = this.getView();
        if (isProtectedClassDrug.toString().toLowerCase() == "false" || isProtectedClassDrug == '') {
            view.down('#lblProctectedClassDrug').hide();
        }
        else {
            view.down('#lblProctectedClassDrug').show();
        }
    },

    showHideCarveOut: function (isCarveOut) {
        var view = this.getView();
        if (isCarveOut.toString().toLowerCase() == "true") {
            view.down('#lblCarveOut').show();
        }
        else {
            view.down('#lblCarveOut').hide();
        }
    },

    showHideMemInfo: function (HospiceInd, ESRDInd, TransplantIndicator) {
        var view = this.getView();
        var hosInfo = (HospiceInd == 'true' || HospiceInd == true) ? ' Hospice ' : '';
        var esrdInfo = (ESRDInd == 'true' || ESRDInd == true) ? ' ESRD ' : '';
        var tpIInfo = (TransplantIndicator == 'true' || TransplantIndicator == true) ? ' Transplant ' : '';
        var cocText = '';
        cocText = (view.down('#lblCoCMember').text != undefined && view.down('#lblCoCMember').text.indexOf('Coordinated Care Member') > -1) ? 'Coordinated Care Member     ' : '';
        if (hosInfo == '' && esrdInfo == '' && tpIInfo == '' && cocText == '') {
            view.down('#CntCocMember').hide();
        }
        else {
            view.down('#CntCocMember').show();
        }
        view.down('#lblCoCMember').setText(cocText + hosInfo + esrdInfo + tpIInfo);
        view.down('#lblCoCMember').setStyle('color','red');
    },

    getPharmacyId: function (grid, CDAGInstanceUUID) {
        if (CDAGInstanceUUID != this.CDAGInstanceUUID) {
            return;
        }

        var view = this.getView();
        var selectedRecord = grid.getSelectionModel().selected.items[0].data;

        if (selectedRecord.pharmacyChain.length >= 6) {
            view.down('#lblNCPDPID').show();
            view.down('#lblNCPDPID').setValue(selectedRecord.pharmacyChain);
            view.down('#cbxPharmacy').setRawValue(selectedRecord.pharmacyName);

            view.down('#txtRelationshipID').hide();
            view.down('#txtRelationshipID').setValue('');
        }
        else {
            view.down('#lblNCPDPID').hide();
            view.down('#lblNCPDPID').setValue('');

            view.down('#txtRelationshipID').show();
            view.down('#txtRelationshipID').setValue(selectedRecord.pharmacyChain);
            view.down('#cbxPharmacy').setRawValue(selectedRecord.pharmacyName);

        }
    },

    showCDControls: function () {
        var view = this.getView();

        view.down('#btnCompoundGCN').show();
        view.down('#btnCustomPrice').show();
        view.down('#btnClaimTest').show();

        view.down('#radNDC').hide();

        if (this.selectedAuthID == null) {
            view.down('#cbxPharmacy').setValue('');
            view.down('#lblNCPDPID').setValue('');
        }
        view.down('#cbxPharmacy').setDisabled(true);
        view.down('#cbxPharmacy').allowBlank = true;

        if (view.down('#hdnDataSource').getValue() == 'MDB') {
            view.down('#radGPI10').show();
            view.down('#radGPI14').show();
            view.down('#radGCN').hide();
            view.down('#radHICL').hide();
            view.down('#cbxMedication').hide();
            view.down('#cbxGPINDC').show();
        }
        else {
            view.down('#radGCN').show();
            view.down('#radHICL').show();
            view.down('#radGPI10').hide();
            view.down('#radGPI14').hide();
            view.down('#cbxMedication').show();
            view.down('#cbxGPINDC').hide();
        }
        view.down('#radNDC').hide();
        view.down('#btnCustomPrice').show();
        view.down('#btnClaimTest').show();
        view.down('#cbxDeterminationType').setValue('CD');
        view.down('#cbxPharmacy').allowBlank = true;
        view.down('#cbxPharmacy').clearInvalid();

        view.down('#cbxUrgencyType').show();
        view.down('#chkDischargeNotification').show();
        view.down('#txtHospital').show();
        view.down('#cbxReasonforRequest').hide();

        view.down('#CDForm').show();
        view.down('#DMRForm').hide();

        view.down('#MemberInfo').isValid();
        view.down('#RequestForm').isValid();
        view.down('#NotesForm').isValid();
        view.down('#dtEffectiveDate').isValid();
        view.down('#dtTermDate').isValid();
        view.down('#cbxStatus').isValid();
    },

    showDMRControls: function () {

        var view = this.getView();

        view.down('#btnCompoundGCN').hide();
        view.down('#btnCustomPrice').hide();
        view.down('#btnClaimTest').hide();
        view.down('#cbxPharmacy').setDisabled(false);
        view.down('#cbxPharmacy').allowBlank = false;

        view.down('#radGCN').hide();
        view.down('#radHICL').hide();
        view.down('#radNDC').show();
        view.down('#cbxMedication').show();
        view.down('#cbxGPINDC').hide();

        view.down('#cbxUrgencyType').hide();
        view.down('#chkDischargeNotification').hide();
        view.down('#txtHospital').hide();
        view.down('#cbxReasonforRequest').show();
        view.down('#cbxDeterminationType').setValue('DMR');

        view.down('#CDForm').hide();
        view.down('#DMRForm').show();

        view.down('#MemberInfo').isValid();
        view.down('#RequestForm').isValid();
        view.down('#DMRForm').isValid();
        view.down('#NotesForm').isValid();
        view.down('#dtEffectiveDate').isValid();
        view.down('#dtTermDate').isValid();
        view.down('#cbxStatus').isValid();
    },

    loadDeterminationType: function (determinationType) {
        if (determinationType == 'DMR') {
            this.showDMRControls();
        }
        else if (determinationType == 'CD') {
            this.showCDControls();
        }
    },

    overrideDisabled: function (action) {
        var view = this.getView();
        switch (action) {
            case 'New': {
                view.down('#dtManualRcvd').setDisabled(false);
                view.down('#tManualRcvd').setDisabled(false);
                view.down('#cbAmPM').setDisabled(false);
                view.down('#btnOverride').hide();
                view.down('#hdnIsOverride').setText('yes');
                break;
            }
            case 'NewFax': {
                view.down('#dtManualRcvd').setDisabled(true);
                view.down('#tManualRcvd').setDisabled(true);
                view.down('#cbAmPM').setDisabled(true);
                view.down('#btnOverride').hide();
                view.down('#hdnIsOverride').setText('no');
                break;
            }
            case 'OverrideAllowed': {
                view.down('#dtManualRcvd').setDisabled(true);
                view.down('#tManualRcvd').setDisabled(true);
                view.down('#cbAmPM').setDisabled(true);
                view.down('#btnOverride').show();
                view.down('#btnOverride').setDisabled(false);
                view.down('#hdnIsOverride').setText('no');
                break;
            }
            case 'OverrideClicked': {
                view.down('#dtManualRcvd').setDisabled(false);
                view.down('#tManualRcvd').setDisabled(false);
                view.down('#cbAmPM').setDisabled(false);
                view.down('#btnOverride').hide();
                view.down('#hdnIsOverride').setText('yes');
                break;
            }
            case 'NoOverrideRequired': {
                view.down('#dtManualRcvd').setDisabled(false);
                view.down('#tManualRcvd').setDisabled(false);
                view.down('#cbAmPM').setDisabled(false);
                view.down('#btnOverride').hide();
                view.down('#hdnIsOverride').setText('yes');
            }
            default: {

            }
        }
    },

    openLetterTemplate: function (pLetterName) {
        var vm = this.getViewModel(),
            letterParameters = vm.get('letterParameters');

        letterParameters[0].LetterName = pLetterName;

        var me = this,
            win = Ext.create({
                xtype: 'cdaglettertemplate',
                autoShow: true,
                extraParams: letterParameters
            });

        me.getView().add(win);
        win.show();
    },

    showApprovalWindowFax: function (PrescriberFax) {
        var me = this,
            vm  = this.getViewModel(),
            fax1 = '',
            fax2 = '',
            fax3 = '',
            win;

        if (PrescriberFax.length == 10) {
            fax1 = PrescriberFax.substr(0, 3);
            fax2 = PrescriberFax.substr(3, 3);
            fax3 = PrescriberFax.substr(6, 4);
        }

        win = Ext.create('Ext.window.Window', {
            title: 'Medicare Auth Approval Letter',
            itemId: 'winMedicareAuthApproval',
            height: 170,
            width: 400,
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
                        text:'Send',
                        handler: 'onApprovalFaxSend',
                        scope: me
                    },
                    {
                        text:'Cancel',
                        handler: 'onApprovalFaxCancel',
                        scope: me
                    }
                ]
            }],
            layout: 'vbox',
            bodyPadding: '10',
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    flex: 1,
                    width: '100%',
                    itemId: 'FaxWindowForm',
                    items:[
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Prescriber Fax',
                            itemId: 'fax1',
                            value: fax1,
                            width: 160,
                            minValue: 0,
                            minLength: 3,
                            maxLength: 3,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            value: '-'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fax2',
                            value: fax2,
                            width: 60,
                            minValue: 0,
                            minLength: 3,
                            maxLength: 3,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            value: '-'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fax3',
                            value: fax3,
                            width: 70,
                            minValue: 0,
                            minLength: 4,
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    layout: 'vbox',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Letter will be mailed to the member and fax will be sent to the prescriber.',
                            style: {
                                color: 'green'
                            },
                            width: '100%'
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onApprovalFaxSend: function () {
        var view = this.getView(),
            winMedicareAuthApproval = view.down('#winMedicareAuthApproval'),
            FaxWindowForm = winMedicareAuthApproval.down('#FaxWindowForm');

        if (!FaxWindowForm.isValid()) {
            Ext.Msg.alert('Message','Please enter valid fax number.');
        }
        else {
            var fax1 = FaxWindowForm.down('#fax1').getValue(),
                fax2 = FaxWindowForm.down('#fax2').getValue(),
                fax3 = FaxWindowForm.down('#fax3').getValue(),
                pPrescriberFax = fax1.toString() + fax2.toString() + fax3.toString();

            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/mailfaxauthletter/read', null, [true], {
                    pAuthID: this.selectedAuthID,
                    pLetterName: 'Medicare Auth Approval',
                    pPrescriberFax: pPrescriberFax
                },
                saveAction, null);

            winMedicareAuthApproval.destroy();

            if (saveData.code == "0") {
                Ext.Msg.alert("Success", "Medicare Approval letter has been mailed to the member and a fax has been sent to the Prescriber.", Ext.emptyFn);
                this.GetPALoad(this.selectedAuthID);
                this.fireEvent('parent_LoadGridValues', this.selectedAuthID);
            }
            else {
                Ext.Msg.alert("Error", "Message: Template record not found </br> Medicare Approval Letter has to be created manually.", Ext.emptyFn);
            }
        }
    },

    onApprovalFaxCancel: function () {
        var view = this.getView(),
            winMedicareAuthApproval = view.down('#winMedicareAuthApproval');

        winMedicareAuthApproval.destroy();
    },

    loadTopPanelData: function (coverageDeterminationBean) {
        //get call
        var view = this.getView(),
            vm = this.getViewModel();

        this.loadStatusDropDown(coverageDeterminationBean.PlanGroupId, coverageDeterminationBean.AuthStatus, coverageDeterminationBean.AuthStatusDesc);

        //<editor-fold desc="Hours Remaining / PAStatus">
        if (parseInt(coverageDeterminationBean.HrsRemToProcess) < 0) {
            view.down('#lblPARemainingHours').setStyle('color', 'red');
            view.down('#lblPAStsatus').setFieldStyle({color :'red', fontweight:'bold'});
        }
        else {
            view.down('#lblPARemainingHours').setStyle('color', 'green');
            view.down('#lblPAStsatus').setFieldStyle({color :'green', fontweight:'bold'});
        }
        //</editor-fold>

        //view.down('#lblPARemainingHours').setTooltip(' As of ' + Ext.Date.format(new Date(), 'g:i A') + '<br/> Clock started :' + coverageDeterminationBean.ClockStartDateTime);
        view.down('#lblPARemainingHours').setTooltip(' As of ' + Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(new Date(), 'g:i A') + '<br/> Clock started :' + Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.ClockStartDateTime,'m/d/Y  h:i:s A'));

        //<editor-fold desc="TollingClock">
        if (coverageDeterminationBean.TollingClock) {
            view.down('#lblTolling').show();
            view.down('#lblPAStsatus').setFieldStyle({color :'green' ,fontweight:'bold'});
        }
        else {
            view.down('#lblTolling').hide();
        }
        //</editor-fold>

        //<editor-fold desc="Source">

        view.down('#lblSource').setText(coverageDeterminationBean.SOURCE == '' || coverageDeterminationBean.SOURCE == null ? 'PBM System' : coverageDeterminationBean.SOURCE);
        //</editor-fold>

        //<editor-fold desc="CbxMemberInfo">
        var memberName = coverageDeterminationBean.Lastname != '' ? coverageDeterminationBean.Lastname + ', ' + coverageDeterminationBean.Firstname : '';
        view.down('#cbxMember').setValue(coverageDeterminationBean.RecipientID);
        view.down('#cbxMember').setRawValue(memberName);

        //<editor-fold desc="Medication Info">
        view.down('#cbxMedication').setValue(coverageDeterminationBean.NDC);
        view.down('#cbxMedication').setRawValue(coverageDeterminationBean.LN);

        view.down('#cbxGPINDC').setValue(coverageDeterminationBean.NDC);
        view.down('#cbxGPINDC').setRawValue(coverageDeterminationBean.LN);

        //Ext.getCmp('cbxMedication').setValue(coverageDeterminationBean.LN);
        //</editor-fold>

        //<editor-fold desc="Prescriber Info">
        view.down('#lblNPI').setText(coverageDeterminationBean.PrescriberID);
        view.down('#lblAddressNPI').setText(coverageDeterminationBean.PrescriberAddress != '' ? coverageDeterminationBean.PrescriberAddress : 'NA');
        view.down('#cbxPrescriber').setValue(coverageDeterminationBean.NPI);
        view.down('#cbxPrescriber').setRawValue(coverageDeterminationBean.PrescriberName);
        view.down('#cbxPharmacy').setValue(coverageDeterminationBean.ProviderNABP);
        view.down('#cbxPharmacy').setRawValue(coverageDeterminationBean.ProviderName);
        //</editor-fold>

        view.down('#lblRecipientID').setText(coverageDeterminationBean.RecipientID == '0' ? '' : coverageDeterminationBean.RecipientID);

        if (coverageDeterminationBean.EnrollmentStatus.toLowerCase() == 'inactive') {
            view.down('#lblEnroll').setFieldStyle({color :'red'});
        }
        else if (coverageDeterminationBean.EnrollmentStatus.toLowerCase() == 'active') {
            view.down('#lblEnroll').setFieldStyle({color :'green'});
        }
        //</editor-fold>

        view.down('#cbxMemGroup').setValue(coverageDeterminationBean.PlanGroupId == 0 ? '' : coverageDeterminationBean.PlanGroupId);

        //<editor-fold desc="NCPDPId - RelationshipId">
        if (coverageDeterminationBean.ProviderRelationshipId != '') {
            view.down('#txtRelationshipID').setValue(coverageDeterminationBean.ProviderRelationshipId);
            view.down('#txtRelationshipID').show();
            view.down('#lblNCPDPID').hide();
            view.down('#lblNCPDPID').setValue('');
        }
        else {
            view.down('#lblNCPDPID').setValue(coverageDeterminationBean.ProviderNABP);
            view.down('#lblNCPDPID').show();
            view.down('#txtRelationshipID').hide();
            view.down('#txtRelationshipID').setValue('');
        }
        //</editor-fold>

        //<editor-fold desc="NDC GCN HICL GPI Radion buttons">
        if (coverageDeterminationBean.DataSource == 'MDB') {
            view.down('#radGCN').hide();
            view.down('#radHICL').hide();
            view.down('#radHICL').setValue(false);
            view.down('#radGCN').setValue(false);
            view.down('#radGPI10').show();
            view.down('#radGPI14').show();
            view.down('#cbxMedication').hide();
            view.down('#cbxGPINDC').show();
            view.down('#lblGCN').setText('');
            view.down('#lblHICL').setText('');

            view.down('#cbxGPINDC').allowBlank = false;
            view.down('#cbxMedication').allowBlank = true;

            if (coverageDeterminationBean.GPICode == 0 && coverageDeterminationBean.GPI10 == 0) {
                view.down('#radGPI14').setValue(true);
                view.down('#lblGPICode10').setText('');
                view.down('#lblGPICode14').setText('');
            }
            else if (coverageDeterminationBean.GPI10 > 0) {
                view.down('#radGPI10').setValue(true);
                view.down('#lblGPICode14').setText('');
            }
            else {
                view.down('#radGPI14').setValue(true);
                view.down('#lblGPICode10').setText('');
            }
            view.down('#lblGPICode10').setText(coverageDeterminationBean.GPI10Display);
            view.down('#lblGPICode14').setText(coverageDeterminationBean.GPICodeDisplay);

            view.down('#radGPI10').setBoxLabel('GPI10: ' + coverageDeterminationBean.GPI10Display);
            view.down('#radGPI14').setBoxLabel('GPICode: ' + coverageDeterminationBean.GPICodeDisplay);
            view.down('#radGCN').setBoxLabel('GCN: ');
            view.down('#radHICL').setBoxLabel('HICL SEQ NO: ');
        }
        else {
            view.down('#radGCN').show();
            view.down('#radHICL').show();
            view.down('#radGPI10').hide();
            view.down('#radGPI14').hide();
            view.down('#radGPI10').setValue(false);
            view.down('#radGPI14').setValue(false);
            view.down('#cbxMedication').show();
            view.down('#cbxGPINDC').hide();
            view.down('#lblGPICode10').setText('');
            view.down('#lblGPICode14').setText('');

            view.down('#cbxGPINDC').allowBlank = true;
            view.down('#cbxMedication').allowBlank = false;

            if (coverageDeterminationBean.GCN_SEQNO == 0 && coverageDeterminationBean.HICL_SEQNO == 0) {
                view.down('#radGCN').setValue(true);
                view.down('#lblGCN').setText('');
                view.down('#lblHICL').setText('');
            }
            else if (coverageDeterminationBean.GCN_SEQNO > 0) {
                view.down('#radGCN').setValue(true);
                view.down('#lblHICL').setText('');
            }
            else {
                view.down('#radHICL').setValue(true);
                view.down('#lblGCN').setText('');
            }
            view.down('#lblGCN').setText(coverageDeterminationBean.GCN_SeqNoDisplay);
            view.down('#lblHICL').setText(coverageDeterminationBean.HICL_SeqNoDisplay);
            view.down('#radGPI10').setBoxLabel('GPI10: ');
            view.down('#radGPI14').setBoxLabel('GPICode: ');
            view.down('#radGCN').setBoxLabel('GCN: ' + coverageDeterminationBean.GCN_SeqNoDisplay);
            view.down('#radHICL').setBoxLabel('HICL SEQ NO: ' + coverageDeterminationBean.HICL_SeqNoDisplay);
        }
        view.down('#lblNDC').setText(coverageDeterminationBean.NDC);
        view.down('#radNDC').setBoxLabel('NDC: ' + coverageDeterminationBean.NDC);

        // view.down('#dtEffectiveDate').setValue(coverageDeterminationBean.EffectiveDateTime != '01/01/0001' ? Atlas.common.utility.Utilities.FixDateoffsetToView(coverageDeterminationBean.EffectiveDateTime, 'm/d/Y') : '');
        // view.down('#dtTermDate').setValue(coverageDeterminationBean.TermDateTime != '01/01/0001' ? Atlas.common.utility.Utilities.FixDateoffsetToView(coverageDeterminationBean.TermDateTime, 'm/d/Y') : '');

        view.down('#dtEffectiveDate').setValue(coverageDeterminationBean.EffectiveDateTime != '01/01/0001' ? coverageDeterminationBean.EffectiveDateTime : '');
        view.down('#dtTermDate').setValue(coverageDeterminationBean.TermDateTime != '01/01/0001' ? coverageDeterminationBean.TermDateTime : '');

        if (view.down('#dtTermDate').getValue() != null && view.down('#dtTermDate').getValue() != '') {
            view.down('#dtEffectiveDate').setMaxValue(Ext.Date.format(view.down('#dtTermDate').getValue(), 'm/d/Y'));
        }
        else {
            view.down('#dtEffectiveDate').setMaxValue(null);
        }

        if (view.down('#dtEffectiveDate').getValue() != null && view.down('#dtEffectiveDate').getValue() != '') {
            view.down('#dtTermDate').setMinValue(Ext.Date.format(view.down('#dtEffectiveDate').getValue(), 'm/d/Y'));
        }
        else {
            view.down('#dtTermDate').setMinValue(null);
        }

        view.down('#cbxUpdateEffectuationDate').setValue('');
        view.down('#chkReopen').setValue('');
        if (this.hasMedicarePAQueueAccess && (view.down('#hidLOB').getValue() == '2') && (coverageDeterminationBean.AuthStatus == '09' || coverageDeterminationBean.AuthStatus == '14')) {
            view.down('#cbxUpdateEffectuationDate').show();
            view.down('#cbxUpdateEffectuationDate').allowBlank = false;
        } else {
            view.down('#cbxUpdateEffectuationDate').hide();
            view.down('#cbxUpdateEffectuationDate').allowBlank = true;
        }

        var authStatus = coverageDeterminationBean.AuthStatus;
        if ((authStatus == '07' || authStatus == '08' || authStatus == '09' || authStatus == '13' || authStatus == '14' || authStatus == '15') && this.hasMedicarePAQueueAccess && view.down('#hidLOB').getValue() == '2') {
            view.down('#chkReopen').show();
            view.down('#chkReopen').setValue(coverageDeterminationBean.ReOpenRequest);
            if (coverageDeterminationBean.ReOpenRequest) {
                view.down('#chkReopen').setDisabled(true);
            }
            else {
                view.down('#chkReopen').setDisabled(false);
            }

        } else {
            view.down('#chkReopen').hide();
        }

        view.down('#chkDischargeNotification').setValue(coverageDeterminationBean.PendDischrgNotify);

        if (coverageDeterminationBean.Requestor == 'MemberRep') {
            view.down('#pnlRequestorRep').expand();
        }
        else {
            view.down('#pnlRequestorRep').collapse();
        }

        //<editor-fold desc="SystemId">
        if (coverageDeterminationBean.SystemID != undefined) {
            view.down('#hdnSystemID').setText(coverageDeterminationBean.SystemID);
        }
        //</editor-fold>

        this.loadDeterminationType(coverageDeterminationBean.DeterminationType);
        this.getLetterTemplateValues(view.down('#numAuthID').getValue());

        //<editor-fold desc="CocMember">
        if (view.down('#numAuthID').getValue() != '') {
            if (coverageDeterminationBean.CoCMember != '') {
                view.down('#CntCocMember').show();
                view.down('#lblCoCMember').setText('Coordinated Care Member');
            }
            else {
                view.down('#lblCoCMember').setText('');
            }
            this.showHideMemInfo(coverageDeterminationBean.HospiceInd, coverageDeterminationBean.ESRDInd, coverageDeterminationBean.TransplantIndicator);
            view.down('#lblAddress').setText(coverageDeterminationBean.MemberAddress1 != '' ? coverageDeterminationBean.MemberAddress1 + " " + coverageDeterminationBean.MemberAddress2 + ", " + coverageDeterminationBean.MemberCity + ", " + coverageDeterminationBean.MemberState + " - " + (coverageDeterminationBean.MemberZip != '' && coverageDeterminationBean.MemberZip.length > 5 ? coverageDeterminationBean.MemberZip.substr(0, 5) + "-" + coverageDeterminationBean.MemberZip.substr(5) : coverageDeterminationBean.MemberZip) : "NA");
        }
        else {
            view.down('#CntCocMember').hide();
            view.down('#lblProctectedClassDrug').hide();
            view.down('#lblAddress').setText("NA");
        }
        //</editor-fold>

        view.down('#cbxDeterminationType').setDisabled(true);
        view.down('#chkDiscard').setValue('0');
        // debugger;

        // if(coverageDeterminationBean.ReceivedDateTime && ( (Atlas.user.Offset) != Atlas.user.localTimeOffset))
        // {
        //     var receiveTime = new Date(coverageDeterminationBean.ReceivedDateTime);
        //
        //     receiveTime = receiveTime.setHours(receiveTime.getHours() + ((((Atlas.user.Offset *-1) + Atlas.user.localTimeOffset)/60)));
        //     coverageDeterminationBean.ReceivedDateTime = this.formatDate(receiveTime);
        //
        // }

        coverageDeterminationBean.ReceivedDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.ReceivedDateTime,'m/d/Y  h:i:s A');

        var arrManualRcvdDateTime = coverageDeterminationBean.ReceivedDateTime.toString().replace('  ', ' ').split(' ');
        if (arrManualRcvdDateTime[0] != '') {
            if (arrManualRcvdDateTime[0] != '01/01/0001') {
                if (coverageDeterminationBean.InTake == 'Fax') {
                    this.overrideDisabled('OverrideAllowed');
                }
                else {
                    this.overrideDisabled('NoOverrideRequired');
                }
                view.down('#hdnHasManualRcvd').setText('yes');
                view.down('#hdnManualRcvdDate').setText(arrManualRcvdDateTime.toString());
                view.down('#dtManualRcvd').setValue(arrManualRcvdDateTime[0]);
                view.down('#tManualRcvd').setValue(arrManualRcvdDateTime[1].length == 7 ? '0' + arrManualRcvdDateTime[1] : arrManualRcvdDateTime[1]);
                view.down('#cbAmPM').setValue(arrManualRcvdDateTime[2]);
            }
        }
        else {
            view.down('#hdnHasManualRcvd').setText('no');
            coverageDeterminationBean.ReqCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.ReqCreateDateTime,'m/d/Y  h:i:s A');
            var arrReqRcvdDateTime = coverageDeterminationBean.ReqCreateDateTime.toString().replace('  ', ' ').split(' ');
            if (arrReqRcvdDateTime[0] != '') {
                if (coverageDeterminationBean.InTake == 'Fax') {
                    this.overrideDisabled('OverrideAllowed');
                }
                else {
                    this.overrideDisabled('NoOverrideRequired');
                }
                view.down('#dtManualRcvd').setValue(arrReqRcvdDateTime[0]);
                view.down('#tManualRcvd').setValue(arrReqRcvdDateTime[1].length == 7 ? '0' + arrReqRcvdDateTime[1] : arrReqRcvdDateTime[1]);
                view.down('#cbAmPM').setValue(arrReqRcvdDateTime[2]);
            }
            else {
                this.overrideDisabled('New');
                view.down('#dtManualRcvd').setValue('');
                view.down('#tManualRcvd').setValue('');
                view.down('#cbAmPM').setValue('');
            }
        }

        coverageDeterminationBean.SupportStmtReceivedDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.SupportStmtReceivedDate,'m/d/Y  h:i:s A');
        var arrSSRcvdDateTime = coverageDeterminationBean.SupportStmtReceivedDate.toString().replace('  ', ' ').split(' ');
        if (arrSSRcvdDateTime[0] != '') {
            if (arrSSRcvdDateTime[0] != '01/01/0001') {
                view.down('#dtSSReceived').setValue(arrSSRcvdDateTime[0]);
                view.down('#tSSREceived').setValue(arrSSRcvdDateTime[1].length == 7 ? '0' + arrSSRcvdDateTime[1] : arrSSRcvdDateTime[1]);
                view.down('#cbxSSAmPm').setValue(arrSSRcvdDateTime[2]);
            }
        }
        else {
            view.down('#dtSSReceived').setValue('');
            view.down('#tSSREceived').setValue('');
            view.down('#cbxSSAmPm').setValue('');
        }

        coverageDeterminationBean.AORDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.AORDateTime,'m/d/Y  h:i:s A');
        var arrAORRcvdDateTime = coverageDeterminationBean.AORDateTime.toString().replace('  ', ' ').split(' ');
        if (arrAORRcvdDateTime[0] != '') {
            if (arrAORRcvdDateTime[0] != '01/01/0001') {
                view.down('#dtCDAORRecvdDate').setValue(arrAORRcvdDateTime[0]);
                view.down('#tCDAORRecvdTime').setValue(arrAORRcvdDateTime[1].length == 7 ? '0' + arrAORRcvdDateTime[1] : arrAORRcvdDateTime[1]);
                view.down('#cbxCDAORRecvdDate').setValue(arrAORRcvdDateTime[2]);
            }
        }
        else {
            view.down('#dtCDAORRecvdDate').setValue('');
            view.down('#tCDAORRecvdTime').setValue('');
            view.down('#cbxCDAORRecvdDate').setValue('');
        }

        this.showHideMedicationInfo(coverageDeterminationBean.ProtectedClassDrug);
        this.showHideCarveOut(coverageDeterminationBean.CarveOut);
    },

    loadCDTabData: function (coverageDeterminationBean) {
        this.loadTopPanelData(coverageDeterminationBean);
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#hdnIntakeDisplayVal').setValue(view.down('#cbxIntake').getValue());

        //<editor-fold desc="Hospital">
        var authStatus = coverageDeterminationBean.AuthStatus;
        if (coverageDeterminationBean.PendDischrgNotify) {
            view.down('#txtHospital').setDisabled(false);
        }
        else {
            view.down('#txtHospital').setDisabled(true);
        }

        view.down('#hdnRequestorDisplayVal').setValue(view.down('#cbxRequestor').getValue());

        vm.set('skipOverrideChange', true);
        view.down('#Overrides_5').setValue(true);
        view.down('#Overrides_16').setValue(coverageDeterminationBean.Overrides[15] == '1' ? true : false);
        view.down('#Overrides_13').setValue(coverageDeterminationBean.Overrides[12] == '1' ? true : false);
        view.down('#Overrides_14').setValue(coverageDeterminationBean.Overrides[13] == '1' ? true : false);
        view.down('#Overrides_17').setValue(coverageDeterminationBean.Overrides[16] == '1' ? true : false);
        view.down('#Overrides_6').setValue(coverageDeterminationBean.Overrides[5] == '1' ? true : false);
        view.down('#Overrides_1').setValue(coverageDeterminationBean.Overrides[0] == '1' ? true : false);
        view.down('#Overrides_12').setValue(coverageDeterminationBean.Overrides[11] == '1' ? true : false);
        view.down('#Overrides_3').setValue(coverageDeterminationBean.Overrides[2] == '1' ? true : false);
        view.down('#Overrides_10').setValue(coverageDeterminationBean.Overrides[9] == '1' ? true : false);
        view.down('#Overrides_2').setValue(coverageDeterminationBean.Overrides[1] == '1' ? true : false);
        view.down('#Overrides_7').setValue(coverageDeterminationBean.Overrides[6] == '1' ? true : false);
        view.down('#Overrides_23').setValue(coverageDeterminationBean.Overrides[22] == '1' ? true : false);
        view.down('#Overrides_18').setValue(coverageDeterminationBean.Overrides[17] == '1' ? true : false);
        view.down('#Overrides_25').setValue(coverageDeterminationBean.Overrides[24] == '1' ? true : false);
        view.down('#Overrides_19').setValue(coverageDeterminationBean.Overrides[18] == '1' ? true : false);
        view.down('#Overrides_26').setValue(coverageDeterminationBean.Overrides[25] == '1' ? true : false);
        view.down('#Overrides_20').setValue(coverageDeterminationBean.Overrides[19] == '1' ? true : false);
        view.down('#Overrides_27').setValue(coverageDeterminationBean.Overrides[26] == '1' ? true : false);
        view.down('#Overrides_8').setValue(coverageDeterminationBean.Overrides[7] == '1' ? true : false);
        view.down('#Overrides_28').setValue(coverageDeterminationBean.Overrides[27] == '1' ? true : false);
        view.down('#Overrides_22').setValue(coverageDeterminationBean.Overrides[21] == '1' ? true : false);
        view.down('#Overrides_21').setValue(coverageDeterminationBean.Overrides[20] == '1' ? true : false);
        view.down('#Overrides_11').setValue(coverageDeterminationBean.Overrides[10] == '1' ? true : false);
        view.down('#Overrides_9').setValue(coverageDeterminationBean.Overrides[8] == '1' ? true : false);
        view.down('#Overrides_24').setValue(coverageDeterminationBean.Overrides[23] == '1' ? true : false);
        view.down('#Overrides_4').setValue(coverageDeterminationBean.Overrides[3] == '1' ? true : false);
        view.down('#Overrides_15').setValue(coverageDeterminationBean.Overrides[14] == '1' ? true : false);
        vm.set('skipOverrideChange', false);
        //</editor-fold>

        //<editor-fold desc="Rejection codes textbox">
        view.down('#txtRejectionCodes').setValue(coverageDeterminationBean.RejectionCodeOverride);
        //</editor-fold>

        var RejCodeOverrideCount = coverageDeterminationBean.RejectionCodeOverride.split(',').length;

        coverageDeterminationBean.RejectionCodeOverride = (RejCodeOverrideCount > 1 ? coverageDeterminationBean.RejectionCodeOverride.split(',') : coverageDeterminationBean.RejectionCodeOverride);
        view.down('#cbxNCPDPerrorCode_Add').setValue(coverageDeterminationBean.RejectionCodeOverride);

        if (view.down('#Overrides_15').getValue() == false) {
            this.Overrides_15_Change('', false, '');
        }
        else {
            this.Overrides_15_Change('', true, '');
        }

        //<editor-fold desc="Min / Max Qty Price">
        if (view.down('#numAuthID').getValue() == '') {
            view.down('#txtQtyMin').setValue(coverageDeterminationBean.QtyMin == 0 ? '' : coverageDeterminationBean.QtyMin);
            view.down('#txtQtyMax').setValue(coverageDeterminationBean.QtyMax == 0 ? '' : coverageDeterminationBean.QtyMax);
            view.down('#txtDaysMin').setValue(coverageDeterminationBean.DaysSupplyMin == 0 ? '' : coverageDeterminationBean.DaysSupplyMin);
            view.down('#txtDaysMax').setValue(coverageDeterminationBean.DaysSupplyMax == 0 ? '' : coverageDeterminationBean.DaysSupplyMax);
            view.down('#txtNoOfFills').setValue(coverageDeterminationBean.MaxNumFills == 0 ? '' : coverageDeterminationBean.MaxNumFills);
            view.down('#txtMaxCost').setValue(coverageDeterminationBean.MaxCostMAx == 0 ? '' : coverageDeterminationBean.MaxCostMAx);
            view.down('#PriceMax').setValue(coverageDeterminationBean.PriceMax == 0 ? '' : coverageDeterminationBean.PriceMax);
            view.down('#CopayMax').setValue(coverageDeterminationBean.CopayOverrideAmt == 0 ? '' : coverageDeterminationBean.CopayOverrideAmt);
        }
        else {
            view.down('#txtQtyMin').setValue(coverageDeterminationBean.QtyMin);
            view.down('#txtQtyMax').setValue(coverageDeterminationBean.QtyMax);
            view.down('#txtDaysMin').setValue(coverageDeterminationBean.DaysSupplyMin);
            view.down('#txtDaysMax').setValue(coverageDeterminationBean.DaysSupplyMax);
            view.down('#txtNoOfFills').setValue(coverageDeterminationBean.MaxNumFills);
            view.down('#txtMaxCost').setValue(coverageDeterminationBean.MaxCostMAx);
            view.down('#PriceMax').setValue(coverageDeterminationBean.PriceMax);
            view.down('#CopayMax').setValue(coverageDeterminationBean.CopayOverrideAmt);
        }
        //</editor-fold>

        view.down('#chkPartialApproval').setValue(coverageDeterminationBean.PartialApproval == '1' ? true : false);
        view.down('#chkEmergencySupply').setValue(coverageDeterminationBean.EmergencySupply == '1' ? true : false);

    },

    loadDMRTabData: function (coverageDeterminationBean) {
        this.loadTopPanelData(coverageDeterminationBean);

        var view = this.getView();
        var authID = view.down('#numAuthID').getValue();

        coverageDeterminationBean.CheckSentDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(coverageDeterminationBean.CheckSentDate,'m/d/Y  h:i:s A');
        var CheckSentDateTime = coverageDeterminationBean.CheckSentDate.toString().replace('  ', ' ').split(' ');
        if (CheckSentDateTime[0] != '') {
            if (CheckSentDateTime[0] != '01/01/0001') {
                view.down('#dtCheckSentDate').setValue(CheckSentDateTime[0]);
                view.down('#tCheckSentDate').setValue(CheckSentDateTime[1].length == 7 ? '0' + CheckSentDateTime[1] : CheckSentDateTime[1]);
                view.down('#cbxCheckAmPm').setValue(CheckSentDateTime[2]);
            }
        }
        else {
            view.down('#dtCheckSentDate').setValue('');
            view.down('#tCheckSentDate').setValue('');
            view.down('#cbxCheckAmPm').setValue('');
        }

        //view.down('#txtClaimId').setValue(coverageDeterminationBean.TransactionId == '0' ? '' : coverageDeterminationBean.TransactionId);
        view.down('#ClaimNumber').setValue(coverageDeterminationBean.TransactionId == '0' ? '' : coverageDeterminationBean.TransactionId);
    },

    checkLetterDetail: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            CDAGTopPanelData = vm.get('CDAGTopPanelData'),
            LobId = CDAGTopPanelData.CarrierLobID,
            LobName = '',
            letterParameters = [];

        if (LobId == '1') {
            LobName = 'Medicaid';
        }
        else if (LobId == '2') {
            LobName = 'Medicare';
        }
        else if (LobId == '3') {
            LobName = 'Commercial';
        }
        else if (LobId == '12') {
            LobName = 'THPMedicaid';
        }

        letterParameters.push(
            {
                'AuthID': view.down('#numAuthID').getValue(),
                'Action': 'create',
                'LOB': LobId,
                'LOBName': LobName,
                'MHPPhysicians': view.down('#hidMHPPhysicians').getValue(),
                'RecipientID': CDAGTopPanelData.RecipientID,
                'MemberName': view.down('#cbxMember').getValue(),
                'NPI': CDAGTopPanelData.PrescriberID,
                'PrescriberName': CDAGTopPanelData.PrescriberName,
                'MemberGroupID': CDAGTopPanelData.PlanGroupId,
                'MemberGroupName': view.down('#cbxMemGroup').getRawValue(),
                'Medication': view.down('#cbxMedication').getRawValue(),
                'PCPID': view.down('#hidPCPID').getValue(),
                'PCPName': view.down('#hidPCPName').getValue(),
                'PCPFax': view.down('#hidPCPFax').getValue(),
                'ServiceDate': view.down('#hidServiceDate').getValue(),
                'SystemID': CDAGTopPanelData.SystemID,
                'PrescriberFax': view.down('#hidPrescriberFax').getValue(),
                'AssignTo': view.down('#hidAssignTo').getValue()
            });

        vm.set('letterParameters', letterParameters);

        if (vm.get('NewAuth') == true && vm.get('SendFaxRequired') == true)
        {
            this.GetSendFax();
            vm.set('SendFaxRequired', false);
            vm.set('NewAuth', false);
        }
        else {
            vm.set('NewAuth', false);

            if (vm.get('DenialLetterFlag') == true) {

                if (CDAGTopPanelData.CarrierLobID == '2') {
                    this.openLetterTemplate('MedicareDenial');
                }
                else if (CDAGTopPanelData.CarrierLobID == '1' && CDAGTopPanelData.CarrierID == '5') {
                    this.openLetterTemplate('MedicaidPADenial');
                }
                else if (CDAGTopPanelData.CarrierLobID == '1' && CDAGTopPanelData.CarrierID == '32') {
                    this.openLetterTemplate('NextLevelPADenial');
                }
                else if (CDAGTopPanelData.CarrierLobID == '3' && CDAGTopPanelData.CarrierID == '27') {
                    this.openLetterTemplate('QuickenPADenial');
                }
                else if (CDAGTopPanelData.CarrierLobID == '3') {
                    this.openLetterTemplate('ChoicePADenial');
                }
            }

            vm.set('DenialLetterFlag', false);

            if (vm.get('HIXApprovalLetterFlag') == true) {
                this.openLetterTemplate('ChoicePAApproval');
            }
            if(vm.get('EXTApprovalLetterFlag') == true)
            {
                this.openLetterTemplate('QuickenPAApproval');
            }
            vm.set('HIXApprovalLetterFlag', false);
            vm.set('EXTApprovalLetterFlag', false);

            if (vm.get('NLHApprovalFlag') == true) {
                this.openLetterTemplate('NextLevelPAApproval');
            }

            vm.set('NLHApprovalFlag', false);

            if (vm.get('ApprovalLetterFlag') == true) {
                this.showApprovalWindowFax(CDAGTopPanelData.PrescriberFax);
            }

            vm.set('ApprovalLetterFlag', false);

            this.resetModelFlag();
        }
    },

    getLetterTemplateValues: function (authId) {
        var me = this;
        var view = this.getView();
        var objPAMAsterData = {};
        var fieldList = "recipientID,$LOB,ApprovedBy,ApprovedDateTime,systemID,denyingPhysician,PrescriberID";
        var arrFieldList = fieldList.split(',');
        var RID = '';
        var PrescriberID = '';
        if (authId != 0) {
            var modelPAMAsterData = Ext.create('Atlas.authorization.model.cdag.PriorAuthMasterDataModel');
            modelPAMAsterData.getProxy().setExtraParam('pPlanID', 'HPM');
            modelPAMAsterData.getProxy().setExtraParam('pAuthID', authId);
            modelPAMAsterData.getProxy().setExtraParam('pFieldList', fieldList);
            modelPAMAsterData.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objRespPAMAsterData = Ext.decode(operation.getResponse().responseText);
                    var arrValues = objRespPAMAsterData.metadata.split('|');
                    for (var i = 0; i < arrFieldList.length; i++) {
                        objPAMAsterData[arrFieldList[i]] = arrValues[i];
                    }
                    if (objPAMAsterData.ApprovedDateTime != '') {
                        if(objPAMAsterData.ApprovedDateTime.indexOf('(') > -1){
                            view.down('#hidServiceDate').setValue(Ext.Date.format(objPAMAsterData.ApprovedDateTime, 'm/d/Y'));
                        }
                        else{
                            view.down('#hidServiceDate').setValue(objPAMAsterData.ApprovedDateTime.split(' ')[0]);
                        }
                    }
                    view.down('#hidMHPPhysicians').setValue(objPAMAsterData.denyingPhysician != '' ? objPAMAsterData.denyingPhysician : '');
                    view.down('#hidAssignTo').setValue(objPAMAsterData.ApprovedBy != '' ? objPAMAsterData.ApprovedBy : '');

                    RID = objPAMAsterData.recipientID != '' ? objPAMAsterData.recipientID : '';
                    PrescriberID = objPAMAsterData.PrescriberID != '' ? objPAMAsterData.PrescriberID : '';

                    if (RID != '0' && RID != '') {
                        var modelMemCoverageHistory = Ext.create('Atlas.member.model.MemberCoverage');
                        modelMemCoverageHistory.getProxy().setExtraParam('pKeyValue', RID);
                        modelMemCoverageHistory.getProxy().setExtraParam('pKeyType', 'RecipientID');
                        modelMemCoverageHistory.load({
                            scope: this,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                var objRespMemCoverageHistory = Ext.decode(operation.getResponse().responseText);

                                if (objRespMemCoverageHistory.data.length != 0) {
                                    var PCPID = objRespMemCoverageHistory.data[objRespMemCoverageHistory.data.length - 1].tPCPID;
                                    view.down('#hidPCPID').setValue(PCPID);

                                    var fieldList3 = 'locfax';
                                    var modelPresMasterData = Ext.create('Atlas.portals.rxmember.model.PrescriberInfoStoreModel');
                                    modelPresMasterData.getProxy().setExtraParam('pKeyValue', PrescriberID);
                                    modelPresMasterData.getProxy().setExtraParam('pKeyType', 'npi');
                                    modelPresMasterData.getProxy().setExtraParam('pFieldList', fieldList3);
                                    modelPresMasterData.load({
                                        scope: this,
                                        failure: function (record, operation) {
                                        },
                                        success: function (record, operation) {
                                        },
                                        callback: function (record, operation, success) {
                                            var objRespPresMasterData2 = Ext.decode(operation.getResponse().responseText);
                                            if (objRespPresMasterData2.message[0].code == 0) {
                                                view.down('#hidPrescriberFax').setValue(me.numberFormatter(objRespPresMasterData2.data[0].locfax, 'FAX'));
                                            }
                                            else {
                                                view.down('#hidPrescriberFax').setValue('');
                                            }

                                            if (PCPID != '') {
                                                var fieldList2 = 'locfax,firstname,lastname';
                                                var modelPresMasterData = Ext.create('Atlas.portals.rxmember.model.PrescriberInfoStoreModel');
                                                modelPresMasterData.getProxy().setExtraParam('pKeyValue', PCPID);
                                                modelPresMasterData.getProxy().setExtraParam('pKeyType', 'npi');
                                                modelPresMasterData.getProxy().setExtraParam('pFieldList', fieldList2);
                                                modelPresMasterData.load({
                                                    scope: this,
                                                    failure: function (record, operation) {
                                                    },
                                                    success: function (record, operation) {
                                                    },
                                                    callback: function (record, operation, success) {
                                                        var objRespPresMasterData = Ext.decode(operation.getResponse().responseText);
                                                        if (objRespPresMasterData.message[0].code == 0) {
                                                            view.down('#hidPCPName').setValue(objRespPresMasterData.data[0].firstname + " " + objRespPresMasterData.data[0].lastname);
                                                            view.down('#hidPCPFax').setValue(this.numberFormatter(objRespPresMasterData.data[0].locfax, 'FAX'));
                                                        }
                                                        else {
                                                            view.down('#hidPCPName').setValue('');
                                                            view.down('#hidPCPFax').setValue('');
                                                        }
                                                        me.checkLetterDetail();
                                                    }
                                                });
                                            }
                                            else {
                                                view.down('#hidPCPName').setValue('');
                                                view.down('#hidPCPFax').setValue('');
                                                me.checkLetterDetail();
                                            }
                                        }
                                    });
                                }
                                else {
                                    me.checkLetterDetail();
                                }
                            }
                        });
                    }
                }
            });
        }
    },

    numberFormatter : function(number, formatType){
        var contactNumber = 0;
        var formattedNumber = number.toUpperCase() == "ERROR" ? '' : number;
        number =number.replace("/[-)(\s]/", ""); //Regex.Replace(number, @"[-)(\s]", string.Empty);

        if (number.length == 10){

            //var contactNumber = parseFloat(number);
            //if (contactNumber > 0)            {
            if (formatType.toUpperCase() == "PHONE")
            {
                //formattedNumber = String.Format("{0:(###)-###-####}", contactNumber);
                formattedNumber =  '(' + number.substring(0,3) + ')-' + number.substring(3,6) + '-' + number.substring(6,10) + ')';
            }
            else
            {
                //formattedNumber = String.Format("{0:###-###-####}", contactNumber);
                formattedNumber =  number.substring(0,3) + '-' + number.substring(3,6) + '-' + number.substring(6,10);
            }
            //}
        }
        return formattedNumber;
    },

    loadCompoundGCN: function (compoundGCNCode, compoundGCNDesc) {
        var vm = this.getViewModel(),
            storecompoundgcn = vm.getStore('storecompoundgcn'),
            CompoundGCNList = compoundGCNCode.trim().split(','),
            CompoundGCNListDesc = compoundGCNDesc.trim().split('|');

        storecompoundgcn.removeAll();

        if (compoundGCNCode.length == 0) {
            return;
        }

        for (var item in CompoundGCNList) {
            storecompoundgcn.insert(0, {
                GCN_SEQNO: CompoundGCNList[item],
                GNN60: CompoundGCNListDesc[item]
            });
        }
    },

    loadCompoundGPI: function (compoundGPICode, compoundGPIDesc) {
        var vm = this.getViewModel(),
            storecompoundgpi = vm.getStore('storecompoundgpi'),
            CompoundGPIList = compoundGPICode.trim().split(','),
            CompoundGPIListDesc = compoundGPIDesc.trim().split('|');

        storecompoundgpi.removeAll();

        if (CompoundGPIList.length == 0) {
            return;
        }

        for (var item in CompoundGPIList) {
            storecompoundgpi.insert(0, {
                GPICode: CompoundGPIList[item],
                GPIName: CompoundGPIListDesc[item]
            });
        }
    },

    GetPALoad: function (authId, refreshView) {
        var view = this.getView(),
            viewready = this.getViewModel().get('viewready'),
            tabRedetermination = view.down('#tabRedetermination'),
            tabOutreach = view.down('#tabOutreach'),
            chkDiscard = view.down('#chkDiscard'),
            carrierLobId = '',
            authStatus = '';

        if (authId == null || authId == '0' || authId == '') {
            return;
        }

        parentData.authId = authId;

        if (viewready == null || viewready == 'undefined') {
            return;
        }

        var me = this,
            vm = this.getViewModel(),
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
            saveData,
            btnUnlock = view.down('#btnUnlock'),
            btnSave = view.down('#btnSave');

        btnUnlock.hide();
        btnSave.setDisabled(false);

        var StoreAttachTo = vm.getStore('StoreAttachTo'),
            storeAttachments = vm.getStore('storeAttachments'),
            storencpdperrorcodes = vm.getStore('storencpdperrorcodes');

        view.mask('Loading...');
        view.down('#txtNotes').setValue('');
        view.down('#cbxReason').setValue('');
        view.down('#chkResvldInFirstCall').setValue(false);
        view.down('#chkResvldInFirstCall').setDisabled(true);

        view.down('#hiddenAuthID').setText(authId);
        var storecd = vm.getStore('storecoveragedetermination');
        storecd.getProxy().setExtraParam('pAuthID', authId);
        storecd.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    if (success && record.length > 0) {

                        if (this.selectedAuthID != null && this.selectedAuthID != authId) {
                            me.resetModelFlag();
                        }

                        view.setTitle('CDAG - ' + authId);

                        view.down('#btnSendFax').setDisabled(false);
                        vm.set('cdmodel', record[0].data.result[0].data);
                        var coverageDeterminationBean = record[0].data.result[0].data;

                        if (operation._resultSet.message[0].code == 1001) {
                            view.down('#IsAuthFromOldModule').setValue(true);
                            view.down('#lblAuthModule').show();
                            coverageDeterminationBean.DeterminationType = 'CD';
                        }
                        else {
                            view.down('#IsAuthFromOldModule').setValue(false);
                            view.down('#lblAuthModule').hide();
                        }

                        parentData.recipientId = coverageDeterminationBean.RecipientID;

                        authStatus = coverageDeterminationBean.AuthStatus;
                        carrierLobId = coverageDeterminationBean.CarrierLobID;

                        if (authStatus == '08' || authStatus == '13' || authStatus == '14' || authStatus == '15') {
                            tabRedetermination.setDisabled(false);
                        }
                        else {
                            tabRedetermination.setDisabled(true);
                        }
                        if (carrierLobId == '2') {
                            tabOutreach.setDisabled(false);
                        }
                        else {
                            tabOutreach.setDisabled(true);
                        }

                        if (authStatus == '07') {
                            chkDiscard.hide();
                        }
                        else {
                            chkDiscard.show();
                        }

                        vm.set('CDAGTopPanelData', coverageDeterminationBean);

                        /* Check if PA is locked with some other user */
                        if (coverageDeterminationBean.LockedWith.trim() == '' || coverageDeterminationBean.LockedWith.trim() == null || coverageDeterminationBean.LockedWith.trim() == Atlas.user.un) {

                            if (coverageDeterminationBean.IsLocked == 'false' || coverageDeterminationBean.IsLocked == false) {
                                me.PACheckOut(authId, false);
                            }
                        }
                        else {
                            Ext.Msg.confirm('Release CD', 'This CD is already assigned to ' + coverageDeterminationBean.LockedWithFullName.trim() + ', and is currently in edit mode. Would you like to release and assign it to yourself for editing?', function (btn) {
                                if (btn == 'yes') {
                                    me.PACheckOut(authId, true);
                                }
                                else {
                                    btnSave.setDisabled(true);
                                    btnUnlock.show();
                                }
                            });
                        }

                        if (refreshView || this.selectedAuthID != authId)
                        {
                            saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/priorauthmasterunassign/update', null, [true], {
                                    piAuthID: this.selectedAuthID,
                                    pAction: 'UnassignUser'
                                },
                                saveAction, null);

                            var cdagTabBar = view.down('#cdagTabBar'),
                                CDAGTopPanelData = vm.get('CDAGTopPanelData'),
                                DeterminationType = CDAGTopPanelData.DeterminationType,
                                GCN = CDAGTopPanelData.GCN_SeqNoDisplay,
                                GPI = (CDAGTopPanelData.GPICode != '' ? CDAGTopPanelData.GPICode : CDAGTopPanelData.GPI10),
                                NDC = CDAGTopPanelData.NDC,
                                NPI = CDAGTopPanelData.PrescriberID,
                                Member = CDAGTopPanelData.RecipientID,
                                claimSearchExtraParam,
                                activeTabTitle = cdagTabBar.getActiveTab().title;

                            if (DeterminationType == 'CD') {
                                claimSearchExtraParam = (GCN != '' ? 'GCN|' + GCN : 'GPI|' + GPI);
                            }
                            else {
                                claimSearchExtraParam = 'NDC|' + NDC;
                            }

                            switch(activeTabTitle) {
                                case 'Determination History':
                                    me.fireEvent('SearchMemberPAHistory', 'recipientID', coverageDeterminationBean.RecipientID, me.CDAGInstanceUUID);
                                    me.lastDeterminationHistoryAuth = authId;
                                    break;
                                case 'Member Claim History':
                                    me.fireEvent('SearchClaimsCommonController', 'recipientID', coverageDeterminationBean.RecipientID, true, 'CDAG|' + claimSearchExtraParam);
                                    me.lastClaimHistoryAuth = authId;
                                    break;
                                case 'Contact Log':
                                    var param ={
                                        page:'cdag',
                                        key:'authid',
                                        keyvalue:authId,
                                        keytext:authId,
                                        recipientID:Member,
                                        prescriberID :NPI
                                    };
                                    me.getViewModel().set('masterrecord',param);
                                    me.getViewModel().set('contactlogmasterrecord',param);
                                    me.fireEvent('contactloggridrefresh');
                                    me.lastContactLogAuth = authId;
                                    break;
                                default:
                                    me.fireEvent('AuthIdChanged', authId, me.CDAGInstanceUUID, refreshView);
                            }
                        }

                        this.fireEvent('refreshCDAGReviewHistory', authId);

                        this.receipientID = coverageDeterminationBean.RecipientID;

                        //<editor-fold desc="Track Changes">
                        view.down('#trackChanges').removeAll();
                        var arrPAAudit = record[0].data.result[1].otherData.ttPAAudit.ttPAAudit;
                        if (arrPAAudit != null && arrPAAudit != undefined) {
                            if (arrPAAudit.length != undefined) {
                                for (var i = 0; i < arrPAAudit.length; i++) {
                                    if (arrPAAudit[i] != undefined) {
                                        var newItemAction = new Ext.menu.Item({
                                            text: '----------' + arrPAAudit[i].Action + '----------'
                                        });
                                        view.down('#trackChanges').add(newItemAction);
                                        var newItemActionDate = new Ext.menu.Item({
                                            text: Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal (arrPAAudit[i].ActionDate,'m/d/Y  h:i:s A'),
                                            iconCls: 'fa  fa-pencil-square-o'
                                        });
                                        view.down('#trackChanges').add(newItemActionDate);
                                        var newItemActionBy = new Ext.menu.Item({
                                            text: arrPAAudit[i].ActionBy,
                                            iconCls: 'fa fa-user'
                                        });
                                        view.down('#trackChanges').add(newItemActionBy);
                                    }
                                }
                            }
                        }
                        //</editor-fold>

                        var arrNotes = record[0].data.result[1].otherData.ttNotes.ttNotes;
                        var strNotesJson = {};
                        var strNotes = '';
                        arrNotes.forEach(function (item, count) {
                            // strNotes += item.CreateUser + ' (' + item.CreateDate + ' ' + item.CreateTime + ' ) -- ' + item.Note + '\r\n\r\n';
                            strNotes += item.CreateUser + ' (' + Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(item.CreateDate + ' ' + item.CreateTime, 'm/d/Y  h:i:s A') + ' ) -- ' + item.Note + '\r\n\r\n';
                        });
                        strNotesJson.strNotes = strNotes;
                        vm.set('notesmodel', strNotesJson.strNotes);

                        this.selectedAuthID = authId;
                        this.parentAuthID = authId;
                        vm.set('cdmodel.authId', authId);
                        vm.set('cdmodel.systemID', coverageDeterminationBean.SystemID);

                        StoreAttachTo.getProxy().setExtraParam('pAuthID', authId);
                        StoreAttachTo.getProxy().setExtraParam('pIncCanceled', true);
                        StoreAttachTo.load(
                            {
                                callback: function (record, operation, success) {
                                    me.loadAttachmentGridData();
                                }
                            }
                        );
                        storencpdperrorcodes.load();

                        view.down('#numAuthID').setValue(authId);
                        view.down('#hidLOB').setValue(coverageDeterminationBean.CarrierLobID);

                        view.down('#cbxRequestType').setValue(coverageDeterminationBean.PAtypeFlag);
                        view.down('#cbxRequestType').setRawValue(coverageDeterminationBean.PAtypeFlagDesc);
                        view.down('#cbxUrgencyType').setValue(coverageDeterminationBean.UrgencyType);
                        view.down('#cbxUrgencyType').setRawValue(coverageDeterminationBean.UrgencyTypeDesc);

                        if (coverageDeterminationBean.DeterminationType == 'DMR') {
                            this.loadDMRTabData(coverageDeterminationBean);
                        }
                        else {
                            this.loadCDTabData(coverageDeterminationBean);
                        }

                        me.lockPAAfterDecision((coverageDeterminationBean.CarrierLobID == '2' ? true: false), coverageDeterminationBean.AuthStatus, coverageDeterminationBean.DeterminationType);
                        me.getMemberGroup(coverageDeterminationBean.RecipientID, coverageDeterminationBean.PlanGroupId, false);
                        me.loadCompoundGCN(coverageDeterminationBean.CompoundGCN, coverageDeterminationBean.CompoundGCNDesc);
                        me.loadCompoundGPI(coverageDeterminationBean.compoundGPI, coverageDeterminationBean.compoundGPIDesc);
                        vm.set('DischargeNotification', coverageDeterminationBean.PendDischrgNotify);
                        vm.set('UrgencyType', coverageDeterminationBean.UrgencyType);
                        view.down('#hdnLastModified').setValue(coverageDeterminationBean.LastModified);
                        view.down('#hidPAStatus').setValue(coverageDeterminationBean.AuthStatus);
                        view.down('#hdnDataSource').setValue(coverageDeterminationBean.DataSource);

                        if (view.activeTab != null && view.activeTab != undefined && this.checkActiveTab) {
                            me.onTabChange();
                            this.checkActiveTab = false;
                        }

                        view.unmask();

                    }
                    else if (success) {
                        view.unmask();
                        Ext.Msg.alert('PBM - ' + authId, operation._resultSet.message[0].message, function (btn) {
                            me.GetPALoad(me.selectedAuthID);
                        });
                    }
                }
            });
    },

    GetFaxInfo: function () {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            storereceivedfrom = vm.getStore('storereceivedfrom'),
            storereceivedviass = vm.getStore('storereceivedviass'),
            authRecFrom = vm.get('cdmodel').Requestor,
            authRecVia = vm.get('cdmodel').InTake,
            membercoveragehistorystore = vm.getStore('membercoveragehistorystore'),
            winAckFax = view.down('#winAckFax'),
            prescriberNPI = view.down('#lblNPI').getText(),
            Prescriberfax1 = winAckFax.down('#Prescriberfax1'),
            Prescriberfax2 = winAckFax.down('#Prescriberfax2'),
            Prescriberfax3 = winAckFax.down('#Prescriberfax3'),
            PCPfax1 = winAckFax.down('#PCPfax1'),
            PCPfax2 = winAckFax.down('#PCPfax2'),
            PCPfax3 = winAckFax.down('#PCPfax3'),
            queryDbModel = Ext.create('Atlas.common.model.shared.QueryDb', {});

        storereceivedfrom.each(function (record) {
            if (record.get('value') == authRecFrom) {
                winAckFax.down('#cbxRecFrom').setValue(authRecFrom);
                winAckFax.down('#cbxRecFrom').setRawValue(record.get('name'));
            }
        });

        storereceivedviass.each(function (record) {
            if (record.get('value') == authRecVia) {
                winAckFax.down('#cbxRecVia').setValue(authRecVia);
                winAckFax.down('#cbxRecVia').setRawValue(record.get('name'));
            }
        });

        queryDbModel.getProxy().setExtraParam('pBuffer', 'NPIMaster');
        queryDbModel.getProxy().setExtraParam('pField', 'LocFax');
        queryDbModel.getProxy().setExtraParam('pWhere', "npi = '" + prescriberNPI + "'");
        queryDbModel.load({
            callback: function(record, operation, success) {
                if (success) {
                    var response = Ext.decode(operation.getResponse().responseText);
                    if (response.data.length > 0) {
                        var prescriberFax = response.metadata;

                        if (prescriberFax != undefined && prescriberFax != null && prescriberFax.length == 10) {
                            Prescriberfax1.setValue(prescriberFax.substr(0, 3));
                            Prescriberfax2.setValue(prescriberFax.substr(3, 3));
                            Prescriberfax3.setValue(prescriberFax.substr(6, 4));
                        }
                    }
                }
            }
        });

        membercoveragehistorystore.getProxy().setExtraParam('pKeyValue', this.receipientID);
        membercoveragehistorystore.getProxy().setExtraParam('pKeyType', 'RecipientID');
        membercoveragehistorystore.load({
            callback: function (record, operation, success) {
                if (success) {
                    if (record.length > 0 && record[record.length - 1].data.tPCPID != '') {

                        queryDbModel.getProxy().setExtraParam('pBuffer', 'NPIMaster');
                        queryDbModel.getProxy().setExtraParam('pField', 'LocFax');
                        queryDbModel.getProxy().setExtraParam('pWhere', "npi = '" + record[record.length - 1].data.tPCPID + "'");
                        queryDbModel.load({
                            callback: function(record, operation, success) {
                                if (success) {
                                    var response = Ext.decode(operation.getResponse().responseText);
                                    if (response.data.length > 0) {
                                        var prescriberFax = response.metadata;

                                        if (prescriberFax != undefined && prescriberFax != null && prescriberFax.length == 10) {
                                            PCPfax1.setValue(prescriberFax.substr(0, 3));
                                            PCPfax2.setValue(prescriberFax.substr(3, 3));
                                            PCPfax3.setValue(prescriberFax.substr(6, 4));
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    },

    PreviewAuthFax: function () {
        var view = this.getView(),
            winAckFax = view.down('#winAckFax'),
            FaxEntity = winAckFax.down('#rdgFaxTo').getValue().FaxEntity,
            fax1,
            fax2,
            fax3,
            faxNumber,
            fields = 'authID,letterType,FreeText1,CreateUser,CreateDateTime,ApprovedUser,ApprovedDate,sentUser,sentDate',
            fieldLists;

        if (FaxEntity == 'rdPCP') {
            fax1 = (winAckFax.down('#PCPfax1').getValue() != null ? winAckFax.down('#PCPfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#PCPfax2').getValue() != null ? winAckFax.down('#PCPfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#PCPfax3').getValue() != null ? winAckFax.down('#PCPfax3').getValue().toString() : '');
        }
        else if (FaxEntity == 'rdPrescriber') {
            fax1 = (winAckFax.down('#Prescriberfax1').getValue() != null ? winAckFax.down('#Prescriberfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#Prescriberfax2').getValue() != null ? winAckFax.down('#Prescriberfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#Prescriberfax3').getValue() != null ? winAckFax.down('#Prescriberfax3').getValue().toString() : '');
        }
        else {
            fax1 = (winAckFax.down('#Memberfax1').getValue() != null ? winAckFax.down('#Memberfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#Memberfax2').getValue() != null ? winAckFax.down('#Memberfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#Memberfax3').getValue() != null ? winAckFax.down('#Memberfax3').getValue().toString() : '');
        }

        faxNumber = fax1 + '-' + fax2 + '-' + fax3;

        if (faxNumber.length != 12) {
            Ext.Msg.alert('Message','Please enter valid fax number for all checked fax to parties before proceed');
            return;
        }

        fieldLists = this.selectedAuthID + '|' + 'PA acknowledge' + '|' + faxNumber;
        fieldLists = fieldLists + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdetail/update', null, [true], {
                pSystemID: '0',
                pFields: fields,
                pFieldList: fieldLists,
                pMode: 'A'
            },
            saveAction, ['pRetSystemID']);

        var pRetSystemID = saveData.pRetSystemID;

        if (pRetSystemID != '0' && pRetSystemID != '') {
            this.ackLetterSystemID = pRetSystemID;
            var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc('Fax Preview PA Auth ID ' + this.selectedAuthID, 'printPAackLetter.p', pRetSystemID, '1', 'Report', false, faxNumber);

            if (documentInfo.code == 0) {
                Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)
            }
            else
            {
                Ext.Msg.alert('Error', documentInfo.message);
            }
        }
    },

    GetSendFax: function () {

        var me = this,
            vm = this.getViewModel(),
            win;

        this.ackLetterSystemID = null;

        win = Ext.create('Ext.window.Window', {
            itemId: 'winAckFax',
            height: 270,
            width: 450,
            modal: true,
            title: 'Auth Additional Info',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            listeners: {
                show: {
                    fn: 'GetFaxInfo',
                    scope: me
                },
                close: {
                    fn: 'checkLetterDetail',
                    scope: me
                }
            },
            controller: {
                parent: me
            },
            viewModel: {
                parent: vm
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'btnNotesSave',
                            text: 'Ok',
                            iconCls: 'fa fa-save',
                            handler: 'onAddFaxOK',
                            scope: me
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCancel',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-times',
                            handler: 'onAddFaxCancel',
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            itemId: 'cbxRecVia',
                            fieldLabel: 'Received Via',
                            labelWidth: 150,
                            disabled: true
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cbxRecFrom',
                            fieldLabel: 'Received From',
                            labelWidth: 150,
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'fit'
                    },
                    dockedItems: {
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'checkbox',
                                itemId : 'chkFaxAck',
                                labelWidth : 50,
                                boxLabel : 'Fax Acknowledgement',
                                value: true,
                                listeners : {
                                    change : 'chkFaxAck_Change',
                                    scope: me
                                }
                            }
                        ]
                    },
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'panelFaxAck',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype : 'radiogroup',
                                    itemId : 'rdgFaxTo',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    flex: 3,
                                    items: [
                                        {
                                            xtype: 'radio',
                                            itemId: 'rdPCP',
                                            inputValue: 'rdPCP',
                                            value: true,
                                            name: 'FaxEntity',
                                            boxLabel: 'PCP'
                                        },
                                        {
                                            xtype: 'radio',
                                            itemId: 'rdPrescriber',
                                            inputValue: 'rdPrescriber',
                                            name: 'FaxEntity',
                                            boxLabel: 'Prescriber'
                                        },
                                        {
                                            xtype: 'radio',
                                            itemId: 'rdMember',
                                            inputValue: 'rdMember',
                                            name: 'FaxEntity',
                                            boxLabel: 'Member'
                                        }
                                    ],
                                    listeners : {
                                        change : 'rdgFaxTo_Change',
                                        scope: me
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    flex: 7,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            itemId: 'PanelPCP',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'PCPfax1',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'PCPfax2',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'PCPfax3',
                                                    width: 60,
                                                    minValue: 0,
                                                    minLength: 4,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Preview Fax',
                                                    iconCls: 'x-fa fa-file-pdf-o',
                                                    align: 'center',
                                                    handler: 'PreviewAuthFax',
                                                    scope: me
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            itemId: 'PanelPrescriber',
                                            disabled: true,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Prescriberfax1',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Prescriberfax2',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Prescriberfax3',
                                                    width: 60,
                                                    minValue: 0,
                                                    minLength: 4,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Preview Fax',
                                                    iconCls: 'x-fa fa-file-pdf-o',
                                                    align: 'center',
                                                    handler: 'PreviewAuthFax',
                                                    scope: me
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            itemId: 'PanelMember',
                                            disabled: true,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Memberfax1',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Memberfax2',
                                                    width: 50,
                                                    minValue: 0,
                                                    minLength: 3,
                                                    maxLength: 3,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    value: '-'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'Memberfax3',
                                                    width: 60,
                                                    minValue: 0,
                                                    minLength: 4,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Preview Fax',
                                                    iconCls: 'x-fa fa-file-pdf-o',
                                                    align: 'center',
                                                    handler: 'PreviewAuthFax',
                                                    scope: me
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    chkFaxAck_Change: function (checkbox, newValue, oldValue) {

        var view = this.getView(),
            me = this,
            winAckFax = view.down('#winAckFax'),
            panelFaxAck = winAckFax.down('#panelFaxAck');

        if (newValue == true) {
            panelFaxAck.enable();
        }
        else {
            panelFaxAck.disable();
        }
    },

    rdgFaxTo_Change: function (rdgFaxTo, newValue, oldValue, eOpts) {
        var view = this.getView(),
            FaxEntity = newValue.FaxEntity,
            winAckFax = view.down('#winAckFax'),
            panelFaxAck = winAckFax.down('#panelFaxAck'),
            PanelPCP = panelFaxAck.down('#PanelPCP'),
            PanelPrescriber = panelFaxAck.down('#PanelPrescriber'),
            PanelMember = panelFaxAck.down('#PanelMember');

        if (FaxEntity == 'rdPCP') {
            PanelPCP.enable();
            PanelPrescriber.disable();
            PanelMember.disable();
        }
        else if (FaxEntity == 'rdPrescriber') {
            PanelPCP.disable();
            PanelPrescriber.enable();
            PanelMember.disable();
        }
        else {
            PanelPCP.disable();
            PanelPrescriber.disable();
            PanelMember.enable();
        }
    },

    onAddFaxOK: function () {
        var view = this.getView(),
            winAckFax = view.down('#winAckFax'),
            faxTo,
            FaxEntity = winAckFax.down('#rdgFaxTo').getValue().FaxEntity,
            chkAckFax = winAckFax.down('#chkFaxAck').getValue(),
            fax1,
            fax2,
            fax3,
            fax;

        if (FaxEntity == 'rdPCP') {
            fax1 = (winAckFax.down('#PCPfax1').getValue() != null ? winAckFax.down('#PCPfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#PCPfax2').getValue() != null ? winAckFax.down('#PCPfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#PCPfax3').getValue() != null ? winAckFax.down('#PCPfax3').getValue().toString() : '');
            faxTo = 'PCP';
        }
        else if (FaxEntity == 'rdPrescriber') {
            fax1 = (winAckFax.down('#Prescriberfax1').getValue() != null ? winAckFax.down('#Prescriberfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#Prescriberfax2').getValue() != null ? winAckFax.down('#Prescriberfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#Prescriberfax3').getValue() != null ? winAckFax.down('#Prescriberfax3').getValue().toString() : '');
            faxTo = 'Prescriber';
        }
        else {
            fax1 = (winAckFax.down('#Memberfax1').getValue() != null ? winAckFax.down('#Memberfax1').getValue().toString() : '');
            fax2 = (winAckFax.down('#Memberfax2').getValue() != null ? winAckFax.down('#Memberfax2').getValue().toString() : '');
            fax3 = (winAckFax.down('#Memberfax3').getValue() != null ? winAckFax.down('#Memberfax3').getValue().toString() : '');
            faxTo = 'Member';
        }

        fax = fax1 + '-' + fax2 + '-' + fax3;

        if (fax.length != 12) {
            Ext.Msg.alert('Message','Please enter valid fax number for all checked fax to parties before proceeding');
        }
        else {
            if (chkAckFax) {
                this.SendFaxLetterDocument(fax, faxTo);
            }
            winAckFax.destroy();
        }
    },

    onAddFaxCancel: function () {
        var view = this.getView(),
            winAckFax = view.down('#winAckFax');

        winAckFax.destroy();
    },

    setAuthNotes: function (pMode, pFieldList, pFields) {
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], {
                pMode: pMode,
                pFieldList: pFieldList,
                pFields: pFields
            },
            saveAction, [null]);
    },

    SendFaxLetterDocument: function (faxNumber, member) {
        var me = this,
            vm = this.getViewModel(),
            authId = this.selectedAuthID,
            AuthLetterDetail = vm.getStore('AuthLetterDetail'),
            pSystemId = vm.get('cdmodel.systemID'),
            fields = 'authID,letterType,FreeText1,CreateUser,CreateDateTime,ApprovedUser,ApprovedDate,sentUser,sentDate',
            fieldLists = this.selectedAuthID + '|' + 'PA acknowledge' + '|' + faxNumber;

        fieldLists = fieldLists + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if (this.ackLetterSystemID == null) {
            var saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdetail/update', null, [true], {
                    pSystemID: '0',
                    pFields: fields,
                    pFieldList: fieldLists,
                    pMode: 'A'
                },
                saveAction, ['pRetSystemID']);
        }

        var pRetSystemID = this.ackLetterSystemID == null ? saveData.pRetSystemID : this.ackLetterSystemID;

        if (pRetSystemID != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdocument/update', null, [true], {
                    pSystemID: pRetSystemID,
                    pLetterProgramName: 'printPAackLetter.p'
                },
                saveAction, [null]);

            AuthLetterDetail.getProxy().setExtraParam('pSystemID', pRetSystemID);
            AuthLetterDetail.getProxy().setExtraParam('pFieldList', 'documentid');
            AuthLetterDetail.load(
                {
                    callback: function (records, opts, success) {
                        if (success && records.length == 1) {
                            var documentid = records[0].data.documentid;

                            if (documentid != '') {
                                saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                                        pDescription: "AuthID: " + authId + " " + "PA acknowledge" + " to " + member,
                                        pProgramName: 'faxDocument.p',
                                        pParameters: documentid + '|',
                                        pRunMode: '2',
                                        pProgramType: 'Fax',
                                        pSaveDocument: true,
                                        pFaxNumber: faxNumber
                                    },
                                    saveAction, ['pJobNumber']);

                                var pJobNumber =  saveData.pJobNumber;

                                if (saveData.code == 0) {
                                    var pField = 'ParentSystemID,Subject,Note,CreateUser',
                                        pValues = pSystemId + '|' + 'PA acknowledge Letter' + '|' + 'PA acknowledge letter has been sent to ' + member + " at fax number: " + faxNumber + '|' +
                                            Atlas.user.un;

                                    me.setAuthNotes('A', pField, pValues);

                                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], {
                                            pJobNum: pJobNumber,
                                            pFieldList: 'parentSystemID',
                                            pFieldValues: pSystemId
                                        },
                                        saveAction, [null]);

                                    if (saveData.code == 0) {
                                        saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                                                pcPlanID: 'HPM',
                                                pcKeyType: 'PriorAuthID',
                                                pcKeyValue: authId,
                                                pcKeyAction: 'A',
                                                pcDocIDList: documentid,
                                                pcDescrData: 'Letter Faxed'
                                            },
                                            saveAction, null);
                                    }
                                }

                                me.GetPALoad(me.selectedAuthID);
                            }
                        }
                    }
                });
        }
    },

    lockPAAfterDecision: function (isMedicarePlan, authStatusCode, determinationType) {

        var view = this.getView(),
            isDisableAfterDecision = false,
            vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters'),
            MemberInfoPanel = view.down('#MemberInfoPanel'),
            CDFormPanel = view.down('#CDFormPanel'),
            DMRFormPanel = view.down('#DMRFormPanel'),
            RequestInfoPanel = view.down('#RequestInfoPanel');

        if (isMedicarePlan && (authStatusCode == "07" || authStatusCode == "08" || authStatusCode == "09" || authStatusCode == "13" || authStatusCode == "14" || authStatusCode == "15")) {
            if (!this.hasMedicarePAQueueAccess) {
                isDisableAfterDecision = true;
            }
        }

        //CDAGLetterParameters[0].DisableAfterDecision = isDisableAfterDecision;

        if (isDisableAfterDecision) {
            MemberInfoPanel.down('#cbxMember').setDisabled(true);
            MemberInfoPanel.down('#cbxMemGroup').setDisabled(true);
            MemberInfoPanel.down('#cbxPrescriber').setDisabled(true);
            MemberInfoPanel.down('#cbxPharmacy').setDisabled(true);
            MemberInfoPanel.down('#cbxMedication').setDisabled(true);
            MemberInfoPanel.down('#cbxGPINDC').setDisabled(true);
            MemberInfoPanel.down('#radGCN').setDisabled(true);
            MemberInfoPanel.down('#radHICL').setDisabled(true);
            MemberInfoPanel.down('#radNDC').setDisabled(true);
            MemberInfoPanel.down('#radGPI14').setDisabled(true);
            MemberInfoPanel.down('#radGPI10').setDisabled(true);
            MemberInfoPanel.down('#btnCustomPrice').setDisabled(true);

            RequestInfoPanel.disable();
            CDFormPanel.disable();
            DMRFormPanel.disable();
            view.down('#chkReopen').setDisabled(true);
            view.down('#chkDiscard').setDisabled(true);
            view.down('#dtEffectiveDate').setDisabled(true);
            view.down('#dtTermDate').setDisabled(true);
            view.down('#cbxStatus').setDisabled(true);
        }
        else {
            MemberInfoPanel.down('#cbxMember').setDisabled(false);
            MemberInfoPanel.down('#cbxMemGroup').setDisabled(false);
            if (determinationType == 'DMR') {
                MemberInfoPanel.down('#cbxPharmacy').setDisabled(false);
            }
            else {
                MemberInfoPanel.down('#cbxPharmacy').setDisabled(true);
            }
            MemberInfoPanel.down('#cbxPrescriber').setDisabled(false);
            MemberInfoPanel.down('#cbxMedication').setDisabled(false);
            MemberInfoPanel.down('#cbxGPINDC').setDisabled(false);
            MemberInfoPanel.down('#radGCN').setDisabled(false);
            MemberInfoPanel.down('#radHICL').setDisabled(false);
            MemberInfoPanel.down('#radNDC').setDisabled(false);
            MemberInfoPanel.down('#radGPI14').setDisabled(false);
            MemberInfoPanel.down('#radGPI10').setDisabled(false);
            MemberInfoPanel.down('#btnCustomPrice').setDisabled(false);

            RequestInfoPanel.enable();
            CDFormPanel.enable();
            DMRFormPanel.enable();
            if (!view.down('#chkReopen').getValue()) {
                view.down('#chkReopen').setDisabled(false);
            }
            else {
                view.down('#chkReopen').setDisabled(true);
            }
            view.down('#chkDiscard').setDisabled(false);
            view.down('#dtEffectiveDate').setDisabled(false);
            view.down('#dtTermDate').setDisabled(false);
            view.down('#cbxStatus').setDisabled(false);
        }

        view.down('#btnSave').setDisabled(false);
        this.markAuthReadOnly();
    },

    PACheckOut: function (authId, reload) {

        var saveData,
            view = this.getView(),
            btnUnlock = view.down('#btnUnlock'),
            btnSave = view.down('#btnSave'),
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/priorauthmasterunassign/update', null, [true], {
                piAuthID: authId,
                pAction: 'UnassignAll'
            },
            saveAction, null);

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/priorauthmasterassigned/update', null, [true], {
                piAuthID: authId,
                pcUsername: Atlas.user.un
            },
            saveAction, null);

        if (saveData.message.indexOf('refresh not required') != -1){
            reload = false;
        }

        if (reload) {
            this.GetPALoad(authId);
        }

        if (saveData.code == "0") {
            btnSave.setDisabled(false);
            btnUnlock.hide();
        }
        else {
            Ext.Msg.alert('CD Checkout', 'Error in CD Checkout.');
        }

        this.markAuthReadOnly();
    },

    CheckPAAssignment: function () {
        var me = this,
            saveData,
            view = this.getView(),
            authId = this.selectedAuthID;

        if (view == null || view == undefined) {
            return;
        }

        var btnUnlock = view.down('#btnUnlock'),
            btnSave = view.down('#btnSave'),
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if (authId == null || Ext.first('[reference=workspaceTabs]').getActiveTab().xtype != 'cdagmain') {
            return;
        }

        view.mask('Checking PA Assignment....');

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/priorauthmasterassigned/update', null, [true], {
                piAuthID: authId,
                pcUsername: Atlas.user.un
            },
            saveAction, null);

        view.unmask();

        if (saveData.code == '0') {
            btnSave.setDisabled(false);
            btnUnlock.hide();
        }
        else if (saveData.code == '3') {

            Ext.Msg.confirm('Release PA', saveData.message + ', Would you like to release and assign it to yourself for editing?', function (btn) {
                if (btn == 'yes') {
                    me.PACheckOut(authId, true);
                }
                else {
                    btnSave.setDisabled(true);
                }
            });

            btnSave.setDisabled(true);
            btnUnlock.show();
        }
        else {
            btnSave.setDisabled(true);
            btnUnlock.show();
        }

        this.markAuthReadOnly();
    },

    btnUnlock_Click: function () {
        this.PACheckOut(this.selectedAuthID, true);
    },

    getCompoundGCNs: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            compoundGCNs = '',
            storecompoundgcn = vm.getStore('storecompoundgcn');

        if (view.down('#lblGCN').text == '9999999' && storecompoundgcn.data.length != 0) {
            for (var item in storecompoundgcn.data.items) {
                compoundGCNs = compoundGCNs + (compoundGCNs == '' ? '' : ',') + storecompoundgcn.data.items[item].data.GCN_SEQNO;
            }
        }

        return compoundGCNs;
    },

    getCompoundGPIs: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            compoundGPIs = '',
            storecompoundgpi = vm.getStore('storecompoundgpi');

        if (view.down('#lblGPICode14').text == '99999999999999' && storecompoundgpi.data.length != 0) {
            for (var item in storecompoundgpi.data.items) {
                compoundGPIs = compoundGPIs + (compoundGPIs == '' ? '' : ',') + storecompoundgpi.data.items[item].data.GPICode;
            }
        }

        return compoundGPIs;

    },

    checkDateTime: function (dControl, tControl, cControl) {
        var format = cControl.getValue();
        var ddate = dControl.getRawValue();
        var time = tControl.getValue();

        if (format == null || format == '') {
            format = 'AM';
        }

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

    checkManualReceivedDateTime: function () {
        var view = this.getView();
        var changeDate = [view.down('#dtManualRcvd').getValue() != null ? Ext.Date.format(view.down('#dtManualRcvd').getValue(), 'm/d/Y') : '', view.down('#tManualRcvd').getValue(), view.down('#cbAmPM').getValue()];
        if (view.down('#hdnManualRcvdDate').text === changeDate.toString()) {
            view.down('#hdnIsOverride').setText('no');
        }
        else {
            view.down('#hdnIsOverride').setText('yes');
        }
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

    setMemberInfoMenu: function(recipientID, planGroupId) {
        var me = this,
            vm = this.getViewModel(),
            membercoveragehistorystore = vm.getStore('membercoveragehistorystore'),
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'),
            effDate,
            termDate;

        membercoveragehistorystore.getProxy().setExtraParam('pKeyValue', recipientID);
        membercoveragehistorystore.getProxy().setExtraParam('pKeyType', 'RecipientID');
        membercoveragehistorystore.load({
            callback: function (record, operation, success) {
                for (var item in record) {

                    effDate = Ext.Date.format(new Date(record[item].data.tEffDate), 'm/d/Y');
                    termDate = (record[item].data.tTermDate != '' && record[item].data.tTermDate != null ? Ext.Date.format(new Date(record[item].data.tTermDate), 'm/d/Y') : '');

                    if (record[item].data.tPlanGroupID == planGroupId) {

                        if (effDate <= today && (termDate == '' || termDate >= today)) {
                            me.showHideMemInfo(record[item].data.hospiceInd, record[item].data.ESRDInd, record[item].data.transplantIndicator);
                            break;
                        }
                    }
                }
            }
        });
    },

    planSelection: function(pPlanGroup, paStatus, isRefresh){
        var view = this.getView();
        var vm = this.getViewModel();
        var determinationType = view.down('#cbxDeterminationType').getValue();

        determinationType = (determinationType == null || determinationType == '' ? 'CD' : determinationType);

        view.down('#cbxRequestType').setValue('');
        view.down('#cbxUrgencyType').setValue('');

        if (isRefresh) {
            view.down('#dtEffectiveDate').setValue(new Date());
            view.down('#dtTermDate').setValue(new Date());
        }

        var recipientId = view.down('#lblRecipientID').getText();

        view.down('#cbxUpdateEffectuationDate').hide();
        view.down('#cbxUpdateEffectuationDate').allowBlank = true;
        var lobId = 0;
        if(pPlanGroup != ''){
            var fieldList = 'systemId,planGroupId,carrierId,carrierName,carrierAcctNumber,accountName,carrierLOBId,lobName,planGroupCode,planGroupName,effDate,renewalDate,termDate,planGroupStatus,exclFormularyId,formularyId,MACListID,allowMemberLocks,processMTMCase,processMAPCase,pharmNetworkId,nonPrefPharmNetworkId,planFaxLogo,allowMedAdminFee,medAdminFeeAmt,payablePatRespCodes,partBPCN,pcnCodeList,mandatoryGeneric,cmsPBPid,CMSPlanId,CMSFormularyId,CMSCntrId,CMSPlanType,asthmaHEDISAlert,copayCalcFunction,defMemberEnollAddrType,MbrCardFrontImage,MbrCardFrontCSS,MbrCardBackImage,MbrCardBackCSS,@DrugDataSource,PDEPlanType,useAllowedPrescribers,PayNonPartDIngredients';
            var store = vm.getStore('storeplangroupinfo');
            store.getProxy().setExtraParam('pplanGroupId', pPlanGroup);
            store.getProxy().setExtraParam('pFieldList', fieldList);
            store.load(
                {
                    scope: this,
                    failure: function (record, operation) {
                        //do something if the load failed
                    },
                    success: function (record, operation) {

                    },
                    callback: function (record, operation, success) {
                        var fieldsValues = record[0].data.result[0].data;

                        lobId = fieldsValues['carrierLOBId'];
                        view.down('#hdnCarrierId').setValue(fieldsValues['carrierId']);
                        var carrierLOBId = fieldsValues['carrierLOBId'];
                        var drugDataSource =  fieldsValues['@DrugDataSource'];
                        if (view.down('#hdnDataSource').getValue() != "" && view.down('#hdnDataSource').getValue() != drugDataSource) {
                            /*view.down('#radGCN').setValue(false);
                             view.down('#radHICL').setValue(false);
                             view.down('#radGPI10').setValue(false);
                             view.down('#radGPI14').setValue(false);*/
                            if (isRefresh) {
                                view.down('#cbxGPINDC').setValue("");
                                view.down('#cbxMedication').setValue("");
                                view.down('#lblGPICode10').setText('');
                                view.down('#lblGPICode14').setText('');
                                view.down('#lblGCN').setText('');
                                view.down('#lblHICL').setText('');
                            }
                            view.down('#radGCN').BoxLabel = "<b>GCN:</b>";
                            view.down('#radHICL').BoxLabel = "<b>HICL SEQ NO:</b>";
                            view.down('#radGPI10').BoxLabel = "<b>GPI10:</b>";
                            view.down('#radGPI14').BoxLabel = "<b>GPICode:</b>";
                        }
                        view.down('#hdnDataSource').setValue(drugDataSource);

                        if (drugDataSource == "MDB") {
                            view.down('#cbxGPINDC').show();
                            view.down('#cbxMedication').hide();
                            view.down('#radGCN').hide();
                            view.down('#radHICL').hide();

                            view.down('#cbxGPINDC').allowBlank = false;
                            view.down('#cbxMedication').allowBlank = true;

                            if (determinationType == 'CD') {
                                view.down('#radGPI10').show();
                                view.down('#radGPI14').show();
                                view.down('#radNDC').hide();
                            }
                            else {
                                view.down('#radGPI10').hide();
                                view.down('#radGPI14').hide();
                                view.down('#radNDC').show();
                            }
                        }
                        else {
                            view.down('#cbxGPINDC').hide();
                            view.down('#cbxMedication').show();
                            view.down('#radGPI10').hide();
                            view.down('#radGPI14').hide();

                            view.down('#cbxGPINDC').allowBlank = true;
                            view.down('#cbxMedication').allowBlank = false;

                            if (determinationType == 'CD') {
                                view.down('#radGCN').show();
                                view.down('#radHICL').show();
                                view.down('#radNDC').hide();
                            }
                            else {
                                view.down('#radGCN').hide();
                                view.down('#radHICL').hide();
                                view.down('#radNDC').show();
                            }
                        }

                        if (isRefresh && view.down('#hdnPlanGroup').getValue() != view.down('#cbxMemGroup').getValue()) {
                            var authStatus = view.down('#cbxStatus').getValue();
                            if ((authStatus == '07' || authStatus == '08' || authStatus == '09' || authStatus == '13' || authStatus == '14' || authStatus == '15') && (view.down('#hidMedicarePAQueueAccess').getValue() == 'true' || view.down('#hidMedicarePAQueueAccess').getValue() == true) && view.down('#hidLOB').getValue() == '2') {
                                view.down('#chkReopen').setValue('');
                                view.down('#chkReopen').show();
                                view.down('#chkReopen').setDisabled(false);
                            }
                            else {
                                view.down('#chkReopen').hide();
                            }

                        }

                        view.down('#hidLOB').setValue(lobId);
                        // debugger;
                        if (lobId == '2')
                        {
                            if (isRefresh) {
                                view.down('#dtEffectiveDate').setValue(Ext.util.Format.date(new Date(),'m/d/Y'));
                                view.down('#dtTermDate').setValue( Ext.util.Format.date('12/31/'+ new Date().getFullYear(),'m/d/Y'));
                            }

                            if ((view.down('#hidMedicarePAQueueAccess').getValue() == 'true' || view.down('#hidMedicarePAQueueAccess').getValue() == true) && (view.down('#hidPAStatus').getValue() == '09' || view.down('#hidPAStatus').getValue() == '14')) {
                                view.down('#cbxUpdateEffectuationDate').show();
                                view.down('#cbxUpdateEffectuationDate').allowBlank = false;
                            }
                        }

                        if (view.down('#cbxMedication').getValue() != null && view.down('#cbxMedication').getValue() != undefined && view.down('#cbxMedication').getValue() != '') {
                            this.getDrugFormularyDetails(false);// for show hide carveout
                        }

                        if (isRefresh) {
                            this.loadStatusDropDown(pPlanGroup, '01', 'Received');
                        }
                        this.bindRequestTypeCombo(lobId, !isRefresh);

                        this.setMemberInfoMenu(recipientId, pPlanGroup);

                    }
                });
        }
        else {
            view.unmask();
        }
    },

    bindRequestTypeCombo: function (lobID, addExisting) {
        var view = this.getView(),
            vm = this.getViewModel(),
            cdmodel = vm.get('cdmodel'),
            cbxRequestType = view.down('#cbxRequestType'),
            storeurgencytypeCD = vm.getStore('storeurgencytypeCD'),
            storerequesttype = vm.getStore('storerequesttype'),
            storerequesttypemedicare = vm.getStore('storerequesttypemedicare');

        storeurgencytypeCD.removeAll();

        if (lobID == '0' || lobID == '') {
            cbxRequestType.bindStore(storeurgencytypeCD);
        }
        else if (lobID == '2') {
            cbxRequestType.bindStore(storerequesttypemedicare);
        }
        else {
            cbxRequestType.bindStore(storerequesttype);
        }

        var store = cbxRequestType.getStore(),
            selIndex = store.find('tempRec', true);

        if (selIndex != -1) {
            store.removeAt(selIndex);
        }

        if (cdmodel != 'undefined' && cdmodel != null) {
            if (addExisting) {
                var selIndex = store.findExact('value', cdmodel.PAtypeFlag),
                    emptySelection = Ext.data.Record.create({
                        name: cdmodel.PAtypeFlagDesc,
                        value: cdmodel.PAtypeFlag,
                        tempRec: true
                    });

                if (selIndex == -1) {
                    store.add(emptySelection);
                }
            }
            cbxRequestType.setValue(cdmodel.PAtypeFlag);
        }

        this.bindUrgencyTypeCombo(lobID);
    },

    bindUrgencyTypeCombo: function (lobID) {
        var view = this.getView(),
            vm = this.getViewModel(),
            cdmodel = vm.get('cdmodel'),
            cbxUrgencyType = view.down('#cbxUrgencyType'),
            storeurgencytypeCD = vm.getStore('storeurgencytypeCD'),
            storeurgencytypebyplan = vm.getStore('storeurgencytypebyplan'),
            storeurgencytypebyplanmedicare = vm.getStore('storeurgencytypebyplanmedicare');

        storeurgencytypeCD.removeAll();

        if (lobID == '0' || lobID == '') {
            cbxUrgencyType.bindStore(storeurgencytypeCD);
        }
        else if (lobID == '2') {
            cbxUrgencyType.bindStore(storeurgencytypebyplanmedicare);
        }
        else {
            cbxUrgencyType.bindStore(storeurgencytypebyplan);
        }

        if (cdmodel != 'undefined' && cdmodel != null) {
            cbxUrgencyType.setValue(cdmodel.UrgencyType);
        }
    },

    onPrintReviewNotes: function () {
        if (this.selectedAuthID != null) {
            var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc('PrintPANotes', 'printPANotes.p', this.selectedAuthID, '1', 'Report', false, '');

            if (documentInfo.code == 0) {
                Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)
            }
        }
    },

    cbxReason_Select: function (combo, record) {
        var view = this.getView(),
            reasonCode = record.data.ContactCode;

        if(reasonCode != '' && reasonCode != undefined) {
            view.down('#chkResvldInFirstCall').setDisabled(false);
        }
        else{
            view.down('#chkResvldInFirstCall').setDisabled(true);
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
    },

    rendererAttachTo: function (value) {
        var viewModel=this.getViewModel();
        var storeFormularyName = viewModel.getStore('StoreAttachTo');
        var r=  storeFormularyName.data.find('OutreachEntity',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.Description;
    },

    rendererAttachmentType: function (value) {
        var viewModel=this.getViewModel();
        var storeFormularyName = viewModel.getStore('StoreAttachmentType');
        var r=  storeFormularyName.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },

    markAuthReadOnly: function () {
        var view = this.getView(),
            tabExternalReview = view.down('#tabExternalReview'),
            tabOutreach = view.down('#tabOutreach'),
            IsAuthFromOldModule = view.down('#IsAuthFromOldModule').getValue() == 'true' || view.down('#IsAuthFromOldModule').getValue() == true;

        view.down('#btnSendFax').setDisabled(IsAuthFromOldModule);
        view.down('#btnSave').setDisabled(IsAuthFromOldModule);
        tabExternalReview.setDisabled(IsAuthFromOldModule);

        if (IsAuthFromOldModule) {
            tabOutreach.setDisabled(true);
        }
    }
});