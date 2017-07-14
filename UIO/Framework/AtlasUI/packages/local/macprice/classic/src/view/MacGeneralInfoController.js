Ext.define('Atlas.macprice.view.MacGeneralInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacGeneralInfoController',
    macListID: null,
    macListVersion: null,
    listDataSource: null,
    listEffDate: null,
    listName: null,
    listStatus: null,
    listSystemID: '0',

    listen: {
        controller: {
            'MacSetupController': {
                SelectedMAC: 'GetUpdatedMAC'
            }
        }
    },

    init: function(){
        this.getView().down('#btnSave').disable(true);
        this.enableDisableFormFields(true);
    },

    GetUpdatedMAC: function(record) {
        if(record == null || record == 'undefined')
        {
            this.macListID = null;
            this.macListVersion = null;
            this.listDataSource = null;
            this.listEffDate = null;
            this.listName = null;
            this.listStatus = null;
            this.listSystemID = null;
            return;
        }

        var MacGeneralInfo = this.getView().down('#MacGeneralInfo'),
            MacInfo = this.getView().down('#MacInfo'),
            MacAlert = this.getView().down('#MacAlert');

        this.macListID = record.get('MACListID');
        this.macListVersion = record.get('MACListVersion');
        this.listDataSource = record.get('DataSource');
        this.listEffDate = record.get('EffectiveDate');
        this.listName = record.get('MACListName');
        this.listStatus = record.get('Stat');
        this.listSystemID = record.get('systemID');

        this.getViewModel().set('SelectedMacRecord', record);
        MacInfo.loadRecord(record);
        MacAlert.loadRecord(record);

        MacInfo.down('#EffectiveDate').setReadOnly(true);
        MacInfo.down('#MACListName').setReadOnly(true);

        this.EnableDisableMACGeneral(this.listStatus, this.listDataSource);

    },

    EnableDisableMACGeneral: function(MacListStatus, DataSource) {
        var view = this.getView(),
            MacInfo = view.down('#MacInfo'),
            MacAlert = view.down('#MacAlert');

        if (MacListStatus.toUpperCase() == 'APPROVED' || MacListStatus.toUpperCase() == 'SUBMIT FOR APPROVAL')
        {
            MacInfo.down('#ClinicalDataSource').setReadOnly(true);
            MacInfo.down('#IncludeDrugType').setReadOnly(true);
            MacInfo.down('#AWPDiscount').setReadOnly(true);
            MacInfo.down('#WACDiscount').setReadOnly(true);
            MacInfo.down('#MarkUpPct').setReadOnly(true);
            MacInfo.down('#BaseMACList').setReadOnly(true);
        }
        else if (MacListStatus.toUpperCase() == 'DRAFT')
        {
            MacInfo.down('#ClinicalDataSource').setReadOnly(false);
            MacInfo.down('#IncludeDrugType').setReadOnly(false);
            MacInfo.down('#AWPDiscount').setReadOnly(false);
            MacInfo.down('#WACDiscount').setReadOnly(false);
            MacInfo.down('#MarkUpPct').setReadOnly(false);
            MacInfo.down('#BaseMACList').setReadOnly(false);
        }

        if (DataSource == 'MDB') {
            MacAlert.show(true);
            view.down('#btnSave').enable(true);
            MacAlert.down('#AWPDropsBy').setReadOnly(false);
            MacAlert.down('#AWPRisesBy').setReadOnly(false);
            MacAlert.down('#WACDropsBy').setReadOnly(false);
            MacAlert.down('#WACRisesBy').setReadOnly(false);
            MacAlert.down('#NewDrugAlert').setReadOnly(false);
            MacAlert.down('#InactiveDrugAlert').setReadOnly(false);
        }
        else {
            MacAlert.hide(true);

            if (MacListStatus.toUpperCase() == 'APPROVED')
            {
                view.down('#btnSave').disable(true);
            }
            else {
                view.down('#btnSave').enable(true);
            }
        }
    },

    EnableMDBPanel: function(combo , record) {
        this.EnableDisableMACGeneral('Draft', record.data.value);
    },

    onCreateMacList: function (btn, event) {
        var view = this.getView();
        view.down('#btnCreate').setDisabled(true);
        view.down('#btnSave').setDisabled(false);
        this.listSystemID = '0';

        this.enableDisableFormFields(false);
    },

    onSaveMacList: function (btn, event) {

        var MacInfo = this.getView().down('#MacInfo'),
            MacAlert = this.getView().down('#MacAlert'),
            effDate = MacInfo.down('#EffectiveDate').getRawValue();

        var pSystemId = this.listSystemID,
            pAction = (pSystemId == '0' ? 'A' : 'U'),
            macListId = this.macListID,
            macListVer = this.macListVersion,
            pFields = (pAction == 'A' ? 'CreatedDate,CreatedBy,Stat' : 'MACListID,MACListVersion'),
            pValues = (pAction == 'A' ? Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' +  Atlas.user.un +'|Draft' : macListId + '|' + macListVer),
            listStatus = (pAction == 'A' ? 'Draft' : MacInfo.down('#CurrentStatus').value),
            dataSource = MacInfo.down('#ClinicalDataSource').value,
            baseMacListId = (MacInfo.down('#BaseMACList').value == null || MacInfo.down('#BaseMACList').value == '' ? '0' : MacInfo.down('#BaseMACList').value),
            saveProgram = '';

        if (pAction == 'A' && effDate < Ext.Date.format(new Date(), 'm/d/Y')) {
            Ext.Msg.alert('Validation Error', 'Effective Date can not be less than today date.');
            return false;
        }

        if(pAction == 'U' && dataSource == 'MDB' && (listStatus.toUpperCase() == 'APPROVED' || listStatus.toUpperCase() == 'SUBMIT FOR APPROVAL'))
        {
            saveProgram = 'MacListDetail';
            pFields = 'AWPBelowAlert,AWPAboveAlert,WACBelowAlert,WACAboveAlert,NewDrugAlertDelay,InactiveDrugAlertDelay';
            pValues = (MacAlert.down('#AWPDropsBy').value == null ? '0' : MacAlert.down('#AWPDropsBy').value) + '|' +
                (MacAlert.down('#AWPRisesBy').value == null ? '0' : MacAlert.down('#AWPRisesBy').value) + '|' +
                (MacAlert.down('#WACDropsBy').value == null ? '0' : MacAlert.down('#WACDropsBy').value) + '|' +
                (MacAlert.down('#WACRisesBy').value == null ? '0' : MacAlert.down('#WACRisesBy').value) + '|' +
                (MacAlert.down('#NewDrugAlert').value == null ? '0' : MacAlert.down('#NewDrugAlert').value) + '|' +
                (MacAlert.down('#InactiveDrugAlert').value == null ? '0' : MacAlert.down('#InactiveDrugAlert').value);
        }
        else {
            saveProgram = 'MacList';
            pFields = pFields + ',' + 'MACListName,DataSource,baseMACListID,IncDrugTypes,AWPDiscountPct,WACDiscountPct,MarkUpPct,EffectiveDate,AWPBelowAlert,AWPAboveAlert,WACBelowAlert,WACAboveAlert,NewDrugAlertDelay,InactiveDrugAlertDelay';
            pValues = pValues + '|' +
                MacInfo.down('#MACListName').value + '|' +
                MacInfo.down('#ClinicalDataSource').value + '|' +
                baseMacListId + '|' +
                MacInfo.down('#IncludeDrugType').value + '|' +
                (MacInfo.down('#AWPDiscount').value == null ? '0' : MacInfo.down('#AWPDiscount').value) + '|' +
                (MacInfo.down('#WACDiscount').value == null ? '0' : MacInfo.down('#WACDiscount').value) + '|' +
                (MacInfo.down('#MarkUpPct').value == null ? '0' : MacInfo.down('#MarkUpPct').value) + '|' +
                MacInfo.down('#EffectiveDate').getRawValue() + '|' +
                (MacAlert.down('#AWPDropsBy').value == null ? '0' : MacAlert.down('#AWPDropsBy').value) + '|' +
                (MacAlert.down('#AWPRisesBy').value == null ? '0' : MacAlert.down('#AWPRisesBy').value) + '|' +
                (MacAlert.down('#WACDropsBy').value == null ? '0' : MacAlert.down('#WACDropsBy').value) + '|' +
                (MacAlert.down('#WACRisesBy').value == null ? '0' : MacAlert.down('#WACRisesBy').value) + '|' +
                (MacAlert.down('#NewDrugAlert').value == null ? '0' : MacAlert.down('#NewDrugAlert').value) + '|' +
                (MacAlert.down('#InactiveDrugAlert').value == null ? '0' : MacAlert.down('#InactiveDrugAlert').value);
        }

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if(MacInfo.isValid())
        {
            if (saveProgram == 'MacList') {

                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/maclist/update', null, [true], {
                        pSystemID: pSystemId,
                        pAction: pAction,
                        pFields: pFields,
                        pValues: pValues
                    },
                    saveAction, ['pJobNum','pRetSystemID']);

                if (saveData.code == "0") {
                    Ext.Msg.alert('PBM', 'Create New MAC List Job # ' + saveData.pJobNum + 'has been successfully queued. Please review the Job in the Job Queue.', Ext.emptyFn);
                    this.fireEvent('ReloadMacList', pAction == 'A' ? null : saveData.pRetSystemID);
                }
            }
            else {
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/maclistupdatedetails/update', null, [true], {
                        pMACListID: macListId,
                        pMACListVersion: macListVer,
                        pFields: pFields,
                        pValues: pValues
                    },
                    saveAction, null);

                if (saveData.code == "0") {
                    Ext.Msg.alert('PBM', 'MAC List - ' + MacInfo.down("#MACListName").value + ' successfully updated.', Ext.emptyFn);
                    this.fireEvent('ReloadMacList', this.listSystemID);
                }
            }
        }
        else
        {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
        }
    },

    onCancelList: function () {
        var vm = this.getViewModel(),
            view = this.getView(),
            SelectedMacRecord = vm.get('SelectedMacRecord');

        view.down('#btnCreate').setDisabled(false);

        if (SelectedMacRecord == null) {
            this.enableDisableFormFields(true);
            view.down('#btnSave').setDisabled(true);
        }
        else {
            this.GetUpdatedMAC(SelectedMacRecord);
        }
    },

    enableDisableFormFields: function (disable) {
        var view = this.getView(),
            MacInfo = view.down('#MacInfo'),
            MacAlert = view.down('#MacAlert');

        MacInfo.down('#MACListName').setReadOnly(disable);
        MacInfo.down('#BaseMACList').setReadOnly(disable);
        MacInfo.down('#ClinicalDataSource').setReadOnly(disable);
        MacInfo.down('#IncludeDrugType').setReadOnly(disable);
        MacInfo.down('#AWPDiscount').setReadOnly(disable);
        MacInfo.down('#WACDiscount').setReadOnly(disable);
        MacInfo.down('#MarkUpPct').setReadOnly(disable);
        MacInfo.down('#EffectiveDate').setReadOnly(disable);

        MacAlert.down('#AWPDropsBy').setReadOnly(disable);
        MacAlert.down('#AWPRisesBy').setReadOnly(disable);
        MacAlert.down('#WACDropsBy').setReadOnly(disable);
        MacAlert.down('#WACRisesBy').setReadOnly(disable);
        MacAlert.down('#NewDrugAlert').setReadOnly(disable);
        MacAlert.down('#InactiveDrugAlert').setReadOnly(disable);

        MacInfo.reset();
        MacAlert.reset();
    }

});
