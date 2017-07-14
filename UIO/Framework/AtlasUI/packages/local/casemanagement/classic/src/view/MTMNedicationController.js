/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.MTMMedicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mtmmedicationcontroller',
    listen: {
        controller: {
            'casedetailscontroller': {
                LoadMedicationCMRTMR: 'LoadMedicationCMRTMR'
            }
        }
    },
    btnAddCMRClick: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementAddCMR',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        this.getView().down('#hiddenServiceType').setValue('CMR');
        var StoreMedicationActionPlan = me.getViewModel().getStore('StoreMedicationActionPlan');
        StoreMedicationActionPlan.getProxy().setExtraParam('pWhere', " parentSystemId = " + null);
        StoreMedicationActionPlan.load();
        this.getView().add(win);

        win.show();
        this.getView().down('#dtCMROfferDate').setValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
        this.getView().down('#cbxCMROfferMethod').setValue('2');
    },
    btnAddTMRClick: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementAddTMR',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        this.getView().down('#hiddenServiceType').setValue('TMR');
        this.getView().add(win);
        win.show();
    },
    btnMTMFollowupLetterClick:function()
    {
        var view=this.getView();
        var me = this,
            vm = me.getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');

        me.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
            menuId: menuId,
            atlasId:0,
            openView:true,
            ID : menuId,
            LetterID:'NEW',
            LetterType : 'MTM Followup',
            keyValue:view.up('CaseInfo').down('#hiddenMTMID').getValue(),
            MTMRID:vm.getParent().getData().caseData[0].data.RecipientId,
            mtmID:view.up('CaseInfo').down('#hiddenMTMID').getValue(),
            mtmCaseMgr:vm.getParent().getData().caseData[0].data.caseManager,
            mtmPlanGroupID:vm.getParent().getData().caseData[0].data.planGroupId
        }, null);

    },
    btnPhyInterventionClick:function()
    {
        var view=this.getView();
        var me = this,
            vm = me.getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');

        me.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
            menuId: menuId,
            atlasId:1,
            openView:true,
            ID : menuId,
            LetterID:'NEW',
            LetterType : 'MTM Physician Intervention',
            keyValue:view.up('CaseInfo').down('#hiddenMTMID').getValue(),
            MTMRID:vm.getParent().getData().caseData[0].data.RecipientId,
            mtmID:view.up('CaseInfo').down('#hiddenMTMID').getValue(),
            mtmCaseMgr:vm.getParent().getData().caseData[0].data.caseManager,
            mtmPlanGroupID:vm.getParent().getData().caseData[0].data.planGroupId
        }, null);

    },
    btnAddfromClaimHistoryClick: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementClaimsSearch',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#lblRecipientId').setValue(me.getView().up('CaseInfo').down('#btnMRxId').getText());
        this.getView().add(win);
        this.BindClaimMasterStore('null');
        win.show();
    },
    init: function () {
        this.LoadMedicationCMRTMR();
    },
    rendererDataSource: function (value) {
        var viewModel=this.getViewModel();
        var StoreDataSource = viewModel.getStore('StoreDataSource');
        var r=  StoreDataSource.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    rendererdataType: function (value) {
        var viewModel=this.getViewModel();
        var StoreType = viewModel.getStore('StoreType');
        var r=  StoreType.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    LoadMedicationCMRTMR: function () {
        var caseData=this.getViewModel().getParent().getData().caseData;
        this.LoadMedication();
        this.LoadCMRTMR();
        if(caseData!=null) {
            if (caseData[0].data.DescriptionCode != "1") {
                this.getView().down('#panelcmrtmr').setDisabled(true);
            }
            else {
                this.getView().down('#panelcmrtmr').setDisabled(false);
            }
        }
    },
    LoadCMRTMR: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var StoreService = vm.getStore('StoreService');
        var StoreServiceTMR = vm.getStore('StoreServiceTMR');
        StoreService.getProxy().setExtraParam('pMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
        StoreService.on({
            load: 'ShowHideButton',
            single: true // Remove listener after Load
        });
        StoreService.load();
        var proxy = StoreServiceTMR.getProxy();
        proxy.setExtraParam('pMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
        StoreServiceTMR.on({
            load: 'ShowHideButton',
            single: true // Remove listener after Load
        });
        StoreServiceTMR.load();
    },
    ShowHideButton:function()
    {
        var view=this.getView();
        var vm = this.getViewModel();
        var StoreService = vm.getStore('StoreService');
        var StoreServiceTMR = vm.getStore('StoreServiceTMR');
        if(StoreServiceTMR.data.items.length>0||StoreService.data.items.length>0)
        {
            view.down('#btnMTMFollowupLetter').setDisabled(false);
            view.down('#btnPhyIntervention').setDisabled(false);
        }
        else {
            view.down('#btnMTMFollowupLetter').setDisabled(true);
            view.down('#btnPhyIntervention').setDisabled(true);
        }
    },
    LoadMedication: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var StoreMedications = vm.getStore('StoreMedications');
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != '') {
            StoreMedications.getProxy().setExtraParam('pMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
            StoreMedications.getProxy().setExtraParam('pMedicationId', '0');
            view.down('#btnAddMedication').setDisabled(false);
            view.down('#btnAddFromClaimHistory').setDisabled(false);
            view.down('#plnMedications').setDisabled(false);
            view.down('#panelcmrtmr').setDisabled(false);
        }
        else {
            Ext.Msg.alert('PBM', 'Select a MTM Record to view details.');
            StoreMedications.getProxy().setExtraParam('pMTMId', null);
            StoreMedications.getProxy().setExtraParam('pMedicationId', null);
            view.down('#btnAddMedication').setDisabled(true);
            view.down('#btnAddFromClaimHistory').setDisabled(true);
            view.down('#plnMedications').setDisabled(true);
            view.down('#panelcmrtmr').setDisabled(true);
        }
        StoreMedications.load();
    },
    cbxDrugNDC_Select: function (combo, record) {
        var view = this.getView();
        var grid = view.down('#gpMedications');
        var s = grid.getSelectionModel().getSelection();
        for (var i = 0, r; r = s[i]; i++) {
            r.data.medicationName = record.data.LN;
        }
    },
    setPrescriberName: function (combo, record) {
        var view = this.getView();
        var grid = view.down('#gpMedications');
        var s = grid.getSelectionModel().getSelection();
        for (var i = 0, r; r = s[i]; i++) {
            r.data.prescriberName = record.data.fullname;
        }
    },
    add: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var grid = view.down('#gpMedications');
        var store = grid.getStore();
        if (!grid.plugins[0].editing) {
            store.insert(0, {
                MTMId: view.up('CaseInfo').down('#hiddenMTMID').getValue(),
                MedicationId: "0",
                dataSource: "",
                dataSourceDesc: "",
                medType: "",
                medTypeDesc: "",
                dataType: "",
                dataTypeDesc: "",
                startDate: null,
                endDate: null,
                NDC: "",
                includeInLetter: true,
                medicationName: "",
                dosage: "",
                oralHX: false,
                filled: false,
                samples: false,
                knowDrugName: false,
                knowFrequency: false,
                knowReason: false,
                continueAtHome: false,
                systemID: "0",
                npi: "",
                prescriberName: "",
                TransactionID: "0",
                TransactionDate: null,
                ClaimType: "",
                treatmentOf: "",
                additionalInfo: ""
            });
            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },
    remove: function () {
        var view = this.getView();
        var grid = view.down('#gpMedications');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = grid.getStore();
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },
    ReloadClick: function () {
        var view = this.getView();
        Ext.Msg.confirm('PBM Confirm', 'Member\'s recent 90-day Maintenance claims and 30-day claim history will be loaded to medication profile. Would you like to proceed??;', function (btn) {
            if (btn == 'yes') {
                var RecipientId = view.up('CaseInfo').down('#hiddenRecipientId').getValue();
                var MTMID = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                var result;
                var message;
                if (RecipientId == "" || RecipientId == "0" || MTMID == "" || MTMID == "0") {
                    return;
                }
                var extraParameters = {
                    'pRecipientId': parseInt(RecipientId),
                    'pMTMId': parseInt(view.up('CaseInfo').down('#hiddenMTMID').getValue()),
                    'pNumberOfDays': 90,
                    'pNonMainNumberOfDays': 30
                };
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmmedicationsfromclaims/update', null, [false], extraParameters,
                    saveAction, null);
                if (testReturn.code == 0) {
                    Ext.Msg.alert("PBM", "Successfully reloaded medications from claims.");
                    this.LoadMedicationCMRTMR();
                }
            }
        }, this);
    },
    btnSaveClick: function () {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var grid = view.down('#gpMedications');
        var store = grid.getStore();
        var dirty = false;
        if (!grid.plugins[0].editing) {

            var saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];
            var extraParameters = {
                'pFields': ""
            };
            var returnField = ['pMedicationId'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'member/rx/mtmmedications/update', 'ttMTMMedications', [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0 && submitJobReturn.message!="") {
                Ext.Msg.alert("PBM", "Successfully updated the Medication Profile.");
            }
            this.LoadMedicationCMRTMR();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
        }
    },
    gpService_Click: function (dv, record, item, index, e) {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementAddCMR',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#frmCMR').reset();

        win.down('#frmCMR').loadRecord(record);
        Ext.defer(function () {
            win.down('#cbxPre').setValue(record.data.NPI);
            win.down('#cbxPre').setRawValue(record.data.NPI);
        }, 1000);
        this.getView().down('#hiddenServiceType').setValue('CMR');
        win.down('#cbxCMROfferMethod').getStore().load({
            callback: function () {
                win.down('#cbxCMROfferMethod').setValue(record.data.cmrOfferMethod);
            }
        })
        win.down('#cbxCMRDelvMethod').getStore().load({
            callback: function () {
                win.down('#cbxCMRDelvMethod').setValue(record.data.cmrDelvMethod);
            }
        })
        win.down('#cbxLicProfType').getStore().load({
            callback: function () {
                win.down('#cbxLicProfType').setValue(record.data.LicProfType);
            }
        })
        win.down('#cbxCMRRecipient').getStore().load({
            callback: function () {
                win.down('#cbxCMRRecipient').setValue(record.data.cmrRecipient);
            }
        })
        win.down('#cbxTherapyChangeType').getStore().load({
            callback: function () {
                win.down('#cbxTherapyChangeType').setValue(record.data.therapyChangeType);
            }
        })
        //var store = win.down('#cbxPre').getStore();
        ////store.getProxy().setExtraParam('pWhere', 'wrdidx contains '+record.data.NPI);
        //store.load({
        //    callback: function () {
        //        win.down('#cbxPre').setValue(record.data.NPI);
        //    }
        //});
        var StoreMedicationActionPlan = me.getViewModel().getStore('StoreMedicationActionPlan');
        StoreMedicationActionPlan.getProxy().setExtraParam('pWhere', " parentSystemId = " + record.data.systemID);
        StoreMedicationActionPlan.load();
        this.getView().add(win);
        win.show();
    },
    btnAddMedActionPlan_click: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var grid = view.down('#gpMedicationActionPlan');
        var store = grid.getStore();
        if (!grid.plugins[0].editing) {
            store.insert(0, {
                parentSystemId: view.down('#hdnParentsystemIDCMR').getValue(),
                plan: "",
                action: "",
                systemID: "0"
            });
            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },
    btnRemoveMedActionPlan_click: function () {
        var view = this.getView();
        var grid = view.down('#gpMedicationActionPlan');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = grid.getStore();
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },
    SaveCMRDetails: function (sender, e) {
        var result;
        var message;
        var serviceType = "";
        var oCaseDetSystemId;
        var view = this.getView();

        try {
            var Mode = "";
            var systemId = view.down('#hdnParentsystemIDCMR').getValue();
            var MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
            serviceType = view.down('#hiddenServiceType').getValue();
            var sMessage = "";

            if (MTMId == "" || MTMId == "0")
                return;

            if (systemId == "0" || systemId.length <= 0) {
                Mode = "A";
                sMessage = "Added" + " " + serviceType + " " + "Details Successfully.";
            }
            else {
                Mode = "U";
                sMessage = "Updated " + " " + serviceType + " " + "Details Successfully.";
            }
            var ttMTMCaseDetails = {};
            var ttMTMCaseDetailssingle = {};
            ttMTMCaseDetailssingle.mode = Mode;
            ttMTMCaseDetailssingle.systemID = systemId;
            ttMTMCaseDetailssingle.MTMId = MTMId;
            ttMTMCaseDetailssingle.recordType = 'SERVICE';
            ttMTMCaseDetailssingle.CMRNonConfReason = view.down('#txtCMRNonConfReason').getValue();
            ttMTMCaseDetailssingle.CMRDate = view.down('#dtCMRDate').getValue();
            ttMTMCaseDetailssingle.TMRDate = null;
            ttMTMCaseDetailssingle.CMROfferDate = view.down('#dtCMROfferDate').getValue(), 'm/d/Y';
            ttMTMCaseDetailssingle.LTCEnrolledNew = 3;
            ttMTMCaseDetailssingle.LTCEntrollStartDate = null;
            ttMTMCaseDetailssingle.LTCEntrollEndDate = null;
            ttMTMCaseDetailssingle.targetedReviews = "";
            ttMTMCaseDetailssingle.prescInterventions = view.down('#txtInterventionDesc').getValue();
            ttMTMCaseDetailssingle.NPI = view.down('#cbxPre').getValue();
            ttMTMCaseDetailssingle.prescriberName = view.down('#lblPrescriberName').getValue();
            ttMTMCaseDetailssingle.therapyChangeType = view.down('#cbxTherapyChangeType').getValue();
            ttMTMCaseDetailssingle.therapyChangeDate = view.down('#dtTherapyChangeDate').getValue();
            ttMTMCaseDetailssingle.interventionDate = view.down('#dtInterventionDate').getValue();
            ttMTMCaseDetailssingle.cmrOfferMethod = view.down('#cbxCMROfferMethod').getValue();
            ttMTMCaseDetailssingle.cmrDelvMethod = view.down('#cbxCMRDelvMethod').getValue();
            ttMTMCaseDetailssingle.LicProfType = view.down('#cbxLicProfType').getValue();
            ttMTMCaseDetailssingle.cmrRecipient = view.down('#cbxCMRRecipient').getValue();
            var tempData = [];
            tempData.push(ttMTMCaseDetailssingle);
            ttMTMCaseDetails.ttMTMCaseDetails = tempData;
            if ((view.down('#dtCMROfferDate').getValue()=='' || view.down('#dtCMROfferDate').getValue()==null )
                && Ext.util.Format.trim(view.down('#cbxCMROfferMethod').getValue())==''
                && (view.down('#dtCMRDate').getValue()=='' || view.down('#dtCMRDate').getValue()==null)
                && Ext.util.Format.trim(view.down('#cbxCMRDelvMethod').getValue())==''
                && Ext.util.Format.trim(view.down('#cbxLicProfType').getValue())=='' && Ext.util.Format.trim(view.down('#cbxCMRRecipient').getValue())==''
                && Ext.util.Format.trim(view.down('#txtCMRNonConfReason').getValue())==''
                && (view.down('#dtInterventionDate').getValue() =='' || view.down('#dtInterventionDate').getValue()==null)
                && Ext.util.Format.trim(view.down('#txtInterventionDesc').getValue()) ==''
                && (view.down('#dtTherapyChangeDate').getValue()=='' || view.down('#dtTherapyChangeDate').getValue()==null)
                && Ext.util.Format.trim(view.down('#cbxTherapyChangeType').getValue())=='' && Ext.util.Format.trim(view.down('#cbxPre').getValue())=='') {
                Ext.Msg.alert('PBM', 'Please enter CMR Details and click Save.');
                return false;
            }
                if (ttMTMCaseDetails.ttMTMCaseDetails.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'ttMTMCaseDetails': ttMTMCaseDetails
                    };
                    var returnField = ['opSystemId'];
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcasedetails/update', null, [false], extraParameters,
                        saveAction, returnField);
                    if (submitJobReturn.code == 0) {
                        if (serviceType == "CMR") {
                            this.SaveMedActionPlan(submitJobReturn.opSystemId);
                        }
                        Ext.Msg.alert("PBM", sMessage);
                        view.down('#btnDeleteCMR').setDisabled(true);
                        view.down('#winCMR').close();
                        this.LoadCMRTMR();
                    }
                    else {
                        Ext.Msg.alert("PBM", submitJobReturn.message);
                    }
                }

        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    SaveMedActionPlan: function (CaseSystemId) {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var grid = view.down('#gpMedicationActionPlan');
        var store = grid.getStore();
        for(var i=0;i<store.data.length;i++)
        {
            if(store.data.items[i].crudState=="C") {
                if (store.data.items[i].data.parentSystemId == "" || store.data.items[i].data.parentSystemId == null) {
                    store.data.items[i].data.parentSystemId = CaseSystemId;
                }
            }
        }
        var dirty = false;
        if (!grid.plugins[0].editing) {

            var saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];
            var extraParameters = {
                'pFields': ""
            };
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'member/rx/mtmactionplan/update', 'ttMTMActionPlan', [true], extraParameters,
                saveAction, null);
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
        }
    },
    gpService_select: function (dv, record, item, index, e) {
        var view = this.getView();
        view.down('#btnDeleteCMR').setDisabled(false);
        view.down('#hiddenServiceType').setValue(record.data.CMRTMRType);
        view.down('#hdnServiceSystemId').setValue(record.data.systemID);
    },
    btnCloseCMRClick: function () {
        var view = this.getView();
        view.down('#winCMR').close();
    },
    gpServiceTMR_Click: function (dv, record, item, index, e) {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementAddTMR',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#frmTMR').reset();
        win.down('#frmTMR').loadRecord(record);
        Ext.defer(function () {
            win.down('#cbxPreTMR').setValue(record.data.NPI);
            win.down('#cbxPreTMR').setRawValue(record.data.NPI);
        }, 1000);
        this.getView().down('#hiddenServiceType').setValue('TMR');
        //var store = win.down('#cbxPreTMR').getStore();
        ////store.getProxy().setExtraParam('pWhere', 'wrdidx contains '+record.data.NPI);
        //store.load({
        //    callback: function () {
        //        win.down('#cbxPreTMR').setValue(record.data.NPI);
        //    }
        //});
        this.getView().add(win);
        win.show();
    },
    gpServiceTMR_select: function (dv, record, item, index, e) {
        var view = this.getView();
        view.down('#btnDeleteTMR').setDisabled(false);
        view.down('#hiddenServiceType').setValue(record.data.CMRTMRType);
        view.down('#hdnServiceSystemId').setValue(record.data.systemID)
    },
    SaveTMRDetails: function (sender, e) {
        var result;
        var message;
        var serviceType = "";
        var oCaseDetSystemId;
        var view = this.getView();

        try {
            if(view.down('#frmTMR').isValid()) {
                var Mode = "";
                var systemId = view.down('#hdnParentsystemIDTMR').getValue();
                var MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                serviceType = view.down('#hiddenServiceType').getValue();
                var sMessage = "";

                if (MTMId == "" || MTMId == "0")
                    return;

                if (systemId == "0" || systemId.length <= 0) {
                    Mode = "A";
                    sMessage = "Added" + " " + serviceType + " " + "Details Successfully.";
                }
                else {
                    Mode = "U";
                    sMessage = "Updated " + " " + serviceType + " " + "Details Successfully.";
                }
                var ttMTMCaseDetails = {};
                var ttMTMCaseDetailssingle = {};
                ttMTMCaseDetailssingle.mode = Mode;
                ttMTMCaseDetailssingle.systemID = systemId;
                ttMTMCaseDetailssingle.MTMId = MTMId;
                ttMTMCaseDetailssingle.recordType = 'SERVICE';
                ttMTMCaseDetailssingle.LTCEnrolledNew = 3;
                ttMTMCaseDetailssingle.CMRNonConfReason = "";
                ttMTMCaseDetailssingle.CMRDate = view.down('#dtCMRDate2').getValue();
                ttMTMCaseDetailssingle.TMRDate = view.down('#dtTMRDate').getValue();
                ttMTMCaseDetailssingle.CMROfferDate = null;
                ttMTMCaseDetailssingle.LTCEnrolledNew = 3;
                ttMTMCaseDetailssingle.LTCEntrollStartDate = null;
                ttMTMCaseDetailssingle.LTCEntrollEndDate = null;
                ttMTMCaseDetailssingle.targetedReviews = view.down('#txtTMRDesc').getValue();
                ttMTMCaseDetailssingle.prescInterventions = view.down('#txtInterventionDesc2').getValue();
                ttMTMCaseDetailssingle.NPI = view.down('#cbxPreTMR').getValue();
                ttMTMCaseDetailssingle.prescriberName = view.down('#lblPrescriberName2').getValue();
                ttMTMCaseDetailssingle.therapyChangeType = view.down('#cbxTherapyChangeType2').getValue();
                ttMTMCaseDetailssingle.therapyChangeDate = view.down('#dtTherapyChangeDate2').getValue();
                ttMTMCaseDetailssingle.interventionDate = view.down('#dtInterventionDate2').getValue();
                ttMTMCaseDetailssingle.cmrOfferMethod = "";
                ttMTMCaseDetailssingle.cmrDelvMethod = "";
                ttMTMCaseDetailssingle.LicProfType = "";
                ttMTMCaseDetailssingle.cmrRecipient = "";
                var tempData = [];
                tempData.push(ttMTMCaseDetailssingle);
                ttMTMCaseDetails.ttMTMCaseDetails = tempData;
                if (ttMTMCaseDetails.ttMTMCaseDetails.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'ttMTMCaseDetails': ttMTMCaseDetails
                    };
                    var returnField = ['oCaseDetSystemId'];
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcasedetails/update', null, [false], extraParameters,
                        saveAction, null);
                    if (submitJobReturn.code == 0) {
                        Ext.Msg.alert("PBM", sMessage);
                        view.down('#btnDeleteTMR').setDisabled(true);
                        this.LoadCMRTMR();
                        view.down('#winTMR').close();
                    }
                    else {
                        Ext.Msg.alert("PBM", submitJobReturn.message);
                    }
                }
            }
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    btnCloseTMRClick: function () {
        var view = this.getView();
        view.down('#winTMR').close();
    },
    DeleteCMRTMR: function (sender, e) {
        var result;
        var message;
        var serviceType = "";
        var oCaseDetSystemId;
        var view = this.getView();
        var me = this;
        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete the selected' + ' ' + view.down('#hiddenServiceType').getValue() + ' ' + 'Record?', function (btn) {
            if (btn == 'yes') {
                try {
                    var Mode = "";
                    var systemId = view.down('#hdnServiceSystemId').getValue();
                    var MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                    serviceType = view.down('#hiddenServiceType').getValue();
                    var sMessage = "";

                    if (MTMId == "" || MTMId == "0")
                        return;
                    Mode = "D";
                    var sMessage = "Deleted" + " " + serviceType + " " + "Successfully.";
                    var ttMTMCaseDetails = {};
                    var ttMTMCaseDetailssingle = {};
                    ttMTMCaseDetailssingle.mode = Mode;
                    ttMTMCaseDetailssingle.systemID = systemId;
                    ttMTMCaseDetailssingle.MTMId = MTMId;
                    ttMTMCaseDetailssingle.recordType = 'SERVICE';
                    var tempData = [];
                    tempData.push(ttMTMCaseDetailssingle);
                    ttMTMCaseDetails.ttMTMCaseDetails = tempData;
                    if (ttMTMCaseDetails.ttMTMCaseDetails.length > 0) {
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        var extraParameters = {
                            'ttMTMCaseDetails': ttMTMCaseDetails
                        };
                        var returnField = ['oCaseDetSystemId'];
                        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcasedetails/update', null, [false], extraParameters,
                            saveAction, null);
                        if (submitJobReturn.code == 0 && serviceType == 'CMR') {
                            var StoreMedicationActionPlan = me.getViewModel().getStore('StoreMedicationActionPlan');
                            StoreMedicationActionPlan.getProxy().setExtraParam('pWhere', " parentSystemId = " + systemId);
                            StoreMedicationActionPlan.load(
                                {
                                    callback: function (record) {
                                        if (record.length > 0) {
                                            var ttMedActionPlanList = [];
                                            var ttMTMActionPlan = {};
                                            for (var i = 0; i < record.length; i++) {
                                                ttMedActionPlanList.push({
                                                    "mode": 'D',
                                                    "parentSystemId": record[i].data.parentSystemId,
                                                    "plan": record[i].data.plan,
                                                    "actionText": record[i].data.action,
                                                    "systemID": record[i].data.systemID
                                                })
                                            }
                                            if (ttMedActionPlanList.length > 0) {
                                                ttMTMActionPlan.ttMTMActionPlan = ttMedActionPlanList;
                                                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                                                var extraParameters = {
                                                    'ttMTMActionPlan': ttMTMActionPlan
                                                };
                                                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmactionplan/update', null, [false], extraParameters,
                                                    saveAction, null);
                                            }
                                        }
                                    }
                                }
                            );
                            view.down('#btnDeleteCMR').setDisabled(true);
                        }
                        if (submitJobReturn.code == 0) {
                            Ext.Msg.alert("PBM", sMessage);
                            if (serviceType == "TMR") {
                                view.down('#btnDeleteTMR').setDisabled(true);
                            }
                            me.LoadCMRTMR();
                        }
                        else {
                            Ext.Msg.alert("PBM", submitJobReturn.message);
                        }
                    }
                }
                catch (ex) {
                    Ext.Msg.alert("Exception", ex.message);
                }
            }
        }, this)
    },
    OnSearchClick: function (source, e) {
        var view = this.getView();
        var searchFilter = "";
        var srvcStartDate = "";
        var srvcEndDate = "";
        if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != "") {
            srvcStartDate = Ext.Date.format(view.down('#fromDate').getValue(), 'm/d/Y')
        }
        if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != "") {
            srvcEndDate = Ext.Date.format(view.down('#toDate').getValue(), 'm/d/Y')
        }
        // var paStatusQ = e.ExtraParams["PAStatusQ"];
        if (view.down('#lblRecipientId').getValue() != null && view.down('#lblRecipientId').getValue() != "") {
            searchFilter = "recipientId = " + view.down('#lblRecipientId').getValue();
        }
        if (view.down('#cbxPrescriberSearch').getValue() != null && view.down('#cbxPrescriberSearch').getValue() != "") {
            if (searchFilter != "") {
                searchFilter = searchFilter + ' AND prescriberId = "' + view.down('#cbxPrescriberSearch').getValue()+'"';
            }
            else {
                searchFilter = 'prescriberId = "' + view.down('#cbxPrescriberSearch').getValue()+'"';
            }
        }
        if (view.down('#cbxMedication2').getValue() != null && view.down('#cbxMedication2').getValue() != "") {
            if (searchFilter != "") {
                searchFilter = searchFilter + ' AND NDC = "' +view.down('#cbxMedication2').getValue() +'" ';
            }
            else {
                searchFilter = 'NDC = "' +view.down('#cbxMedication2').getValue() +'" ';
            }
        }
        if (view.down('#cbxGCN').getValue() != null && view.down('#cbxGCN').getValue() != "") {
            if (searchFilter != "") {
                searchFilter = searchFilter +' AND GCNSEQ = "' + view.down('#cbxGCN').getValue()+'" ';
            }
            else {
                searchFilter = 'GCNSEQ = "' + view.down('#cbxGCN').getValue()+'"';
            }
        }
        if (srvcStartDate != "") {
            if (searchFilter != "") {
                searchFilter = searchFilter + ' AND serviceDate >= "' + srvcStartDate+'"';
            }
            else {
                searchFilter = 'serviceDate >= "' + srvcStartDate+'"';
            }
        }
        if (srvcEndDate != "") {
            if (searchFilter != "") {
                searchFilter = searchFilter + ' AND serviceDate <= "' + srvcEndDate+'"';
            }
            else {
                searchFilter = 'serviceDate <= "' + srvcEndDate+'"';
            }
        }
        this.BindClaimMasterStore(searchFilter);
    },
    BindClaimMasterStore: function (searchFilter) {
        var view = this.getView();
        var store=this.getViewModel().getStore('StoreClaimsSearch');
        store.getProxy().setExtraParam('pRowid', "0");
        store.getProxy().setExtraParam('pRowNum', "0");
        store.getProxy().setExtraParam('pBatchSize', 0);
        store.getProxy().setExtraParam('pWhere', searchFilter);
        store.load();

    },
    onReset: function () {
        var view = this.getView();
        view.down('#cbxMedication2').setValue('');
        view.down('#cbxGCN').setValue('');
        view.down('#cbxPrescriberSearch').setValue('');
        view.down('#fromDate').setValue('');
        view.down('#toDate').setValue('');
        var grid = view.down('#claimsSearchgrid');
        var store = grid.getStore();
        store.removeAll();
    },
    setMedicationProfileFromClaims: function (sender, e) {
        try {
            var ttMedicationsList = [];
            var ttMedications = {};

            var view = this.getView();
            var grid = view.down('#claimsSearchgrid');
            if (grid.getSelectionModel().getSelected().items.length == 0) {
                Ext.Msg.alert("PBM", "Please select a row");
            }
            else {
                var selections = grid.getSelectionModel().getSelection();
                for (var i = 0; i < selections.length; i++) {
                    var ttMedicationsSingle = {};
                    ttMedicationsSingle.mode = "A";
                    ttMedicationsSingle.MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                    ttMedicationsSingle.MedicationId = 0;
                    ttMedicationsSingle.dataSource = "";
                    ttMedicationsSingle.dataSourceDescr = "";
                    ttMedicationsSingle.dataType = "";
                    ttMedicationsSingle.dataTypeDescr = "";
                    ttMedicationsSingle.includeInLetter = true;
                    ttMedicationsSingle.filled = false;
                    ttMedicationsSingle.startDate = "";
                    ttMedicationsSingle.endDate = "";
                    ttMedicationsSingle.samples = false;
                    ttMedicationsSingle.oralHX = false;
                    ttMedicationsSingle.NDC = selections[i].data.ndc;
                    ttMedicationsSingle.medicationName = selections[i].data.medication;
                    ttMedicationsSingle.dosage = "";
                    ttMedicationsSingle.knowDrugName = false;
                    ttMedicationsSingle.knowFrequency = false;
                    ttMedicationsSingle.knowReason = false;
                    ttMedicationsSingle.continueAtHome = false;
                    ttMedicationsSingle.npi = selections[i].data.npi;
                    ttMedicationsSingle.prescriberName = selections[i].data.drname;
                    ttMedicationsSingle.transactionID = selections[i].data.claimID;
                    ttMedicationsSingle.transactionDate = selections[i].data.svcdate;
                    ttMedicationsSingle.claimType = selections[i].data.stat;
                    ttMedicationsSingle.treatmentOf = "";
                    ttMedicationsSingle.additionalInfo = "";
                    ttMedicationsList.push(ttMedicationsSingle);
                }
                if (ttMedicationsList.length > 0) {
                    ttMedications.ttMTMMedications = ttMedicationsList;
                    var extraParameters = {
                        "ttMTMMedications": ttMedications
                    };
                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmmedications/update', null, [false], extraParameters,
                        saveAction, null);
                    if (testReturn.code == 0) {
                        Ext.Msg.alert("PBM", "Successfully added Medication(s) to the Medication Profile.");
                        var store = grid.getStore();
                        store.removeAll();
                        view.down('#winClaimSearch').close();
                        this.LoadMedicationCMRTMR();
                    }

                }
            }
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    CloseMedication:function()
    {
        var view = this.getView();
        view.down('#winClaimSearch').close();
    }
});