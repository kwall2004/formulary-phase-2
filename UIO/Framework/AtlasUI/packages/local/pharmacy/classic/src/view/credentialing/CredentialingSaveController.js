/**
 * This class is a Controller which extends the main Controller
 * This class holds the code related to Persistance
 * @author : Leo
 */

Ext.define('Atlas.pharmacy.view.credentialing.CredentialingSaveController', {
    extend: 'Atlas.pharmacy.view.credentialing.CredentialingController',
    alias: 'controller.pharmacy-credentialing',
    listen: {
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },

    /**
     * On Add new Credential Year
     * @param btn
     * @param scope
     */


    doAddCredDetailGenInfo: function (btn, scope) {
        var me = this,
            giForm = me.lookupReference('credGeneralInfoFormRef'),
            vm = me.getViewModel(),
            refs = me.getReferences(),
            credLogStore = vm.getStore('pharmacredlogmaster'),
            credLogModel = Ext.create('Atlas.pharmacy.model.PharmaCredMaster');

        refs.credentiallingMainTbRef.setDisabled(true);
        refs.pharmaCredLogGridRef.setDisabled(true);
        refs.pharmaCredTodoGridRef.setDisabled(true);
        refs.credHomeTabPnlRef.setActiveTab(0);

        credLogModel.data.CreatedBy = Atlas.user.un;
        credLogModel.data.Action = 'Add';
        credLogModel.data.crudState = 'C';
        credLogModel.data.NCPDPId = this.getViewModel().get('selCredType') != 'RID' ? this.getViewModel().get('selCredValue') : '';
        credLogModel.data.RelationshipId = this.getViewModel().get('selCredType') == 'RID' ? this.getViewModel().get('selCredValue') : '';

        giForm.reset();
        giForm.loadRecord(credLogModel);
        credLogStore.insert(0, credLogModel);
        me.enableCredentialingDetailForm();
    },

    /**
     * To Save the details of the Credentialling details Tab
     */
    doSaveCredDetailTab: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.lookupReference('credGeneralInfoFormRef'),
            values = form.getValues(),
            record = form.getRecord(),
            saveData,
            giStore = vm.get('pharmacredlogmaster'),
            saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];

        form.updateRecord();

        if (form.isValid() && values && me.validCredResult() && me.validCredCompleteDate()) {

            saveData = Atlas.common.utility.Utilities.saveData(
                [giStore],
                'pharmacy/rx/pharmcredmaster/update',
                'ttPharmCredMaster',
                [true],
                {}, //extraparams
                saveAction,
                null
            );

            if (saveData.code == 0) {
                Ext.MessageBox.alert('Pharmacy - Credentialling Detail', "Credentialing details has been sucessfully saved.", this.showResult, this);
                var rec = record.set('relationshipID', this.getViewModel().get('selCredValue'));
                this.getView().down('#btnCredLetters').setDisabled(false);
                giStore.reload();
                me.doCancelCredDetailTab();

            } else {
                Ext.MessageBox.alert('Pharmacy - Credentialling Detail', "Credentialing details not saved - " + saveData.message, this.showResult, this);
            }
        }
        else {
            Ext.MessageBox.alert('Pharmacy - Credentialling Detail', "Please enter all required fields before submitting job.", this.showResult, this);
        }
    },

    /**
     * On Cred Detail Remove
     * @param btn
     * @param scope
     */
    doRemoveCredDetailGenInfo: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Credentials',
            message: "Are you sure you would like to delete this record, This will also delete all associated records?",
            buttons: Ext.Msg.YESNOCANCEL,
            scope: me,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.deleteCredDetailGenInfo();
                }
            }
        });
    },

    /**
     * Delete Credentialling detail
     */
    deleteCredDetailGenInfo: function () {
        var me = this,
            vm = me.getViewModel(),
            giStore = vm.get('pharmacredlogmaster'),
            refs = me.getReferences(),
            grid = refs.pharmaCredLogGridRef,
            rec = grid.getSelectionModel().getSelection()[0],
            saveData,
            saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];

        rec.data.CreatedBy = Atlas.user.un;
        rec.data.Action = 'Delete';
        rec.data.crudState = 'D';
        grid.getSelectionModel().getSelection()[0].phantom = false;
        //rec.data.dirty = true;
        grid.getStore().remove(rec);

        saveData = Atlas.common.utility.Utilities.saveData(
            [giStore],
            'pharmacy/rx/pharmcredmaster/update',
            'ttPharmCredMaster',
            [true],
            {}, //extraparams
            saveAction,
            null
        );

        if (saveData.code == 0) {
            Ext.MessageBox.alert('Pharmacy - Credentialling Detail', "Credentialing details has been sucessfully deleted.", this.showResult, this);
            giStore.reload();
        } else {
            Ext.MessageBox.alert('Pharmacy - Credentialling Detail', "Credentialing not deleted - " + saveData.message, this.showResult, this);
        }
    },

    /**
     * On Cancel of Credentialling detail
     */
    doCancelCredDetailTab: function () {
        var me = this,
            vm = me.getViewModel(),
            giStore = vm.get('pharmacredlogmaster'),
            refs = me.getReferences();

        refs.credentiallingMainTbRef.setDisabled(false);
        refs.pharmaCredLogGridRef.setDisabled(false);
        refs.pharmaCredTodoGridRef.setDisabled(false);

        me.getView().setDisabled(false);
        giStore.reload();
    },


    doCredDetailCredLetters: function () {

    },

    doCredDetailPrintVerification: function () {
        var vm = this.getViewModel();
        if (vm.get('selCredLogId') && vm.get('selCredLogId') != '') {
            var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc('ltrCredChainVerification', 'ltrCredVerification.p', vm.get('selCredLogId'), '1', 'Report', false, '');
            if (documentInfo.code == 0) {
                Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)
            }
        }
    },

    /**
     * Checklist Save
     */
    doSaveChecklist: function () {

        var me = this,
            vm = me.getViewModel(),
            cklStore = vm.get('pharmcredchecklist'),
            saveData,
            saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];
        for(var i = 0; i < cklStore.data.items.length ; i ++){
            if(cklStore.data.items[i].dirty == true){
                if(cklStore.data.items[i].get('CompleteStatus') == 'Yes' && cklStore.data.items[i].get('CompleteDate') == null){
                    Ext.Msg.alert('Error', 'Please insert complete date.');
                    me.getView().down("#btnchecklistsave").setDisabled(true);
                    //metaData.record.set('isNeedUpdate', true);
                    return;
                }
            }
        }
        saveData = Atlas.common.utility.Utilities.saveData([cklStore],
            'pharmacy/rx/pharmcredchecklist/update',
            'ttPharmCredCheckList',
            [true],
            {}, //extraparams
            saveAction,
            null);

        if (saveData.code == 0) {
            Ext.MessageBox.alert('Credentialing Checklist', "Credentialing details has been sucessfully saved", this.showResult, this);
            this.getView().down('#btnchecklistsave').setDisabled(true);
            cklStore.reload();
        }
        else {
            Ext.MessageBox.alert('Credentialing Checklist', "Checklist changes not saved - " + saveData.message, this.showResult, this);
        }
    },


    /**
     * Training Add
     */
    doTrainingAdd: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.lookupReference('pharmaTrainingFormref');
        form.reset();
        vm.set('trgSaveState', "Add");
    },

    /**
     * Training cancel
     */
    doTrainingCancel: function () {
        var vm = this.getViewModel();
        vm.set('trgSaveState', "Update");
        vm.getStore('pharmtraining').reload();
    },


    /**
     * Training Save
     */
    doTrainingSave: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.lookupReference('pharmaTrainingFormref'),
            grid = me.lookupReference('gridTrainingFormref'),
            values = form.getValues(),
            record = form.getRecord(),
            saveData,
            trgStore = vm.get('pharmtraining');


        if (form.isValid() && values) {
            if (vm.get('trgSaveState') == 'Add') {
                trgStore.insert(0, values);
            }
            form.updateRecord();
            record.data.NCPDPId = vm.get('selCredType') != 'RID' ? vm.get('selCredValue') : '';
            record.data.RelationshipId = vm.get('selCredType') == 'RID' ? vm.get('selCredValue') : '';

            var saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];


            saveData = Atlas.common.utility.Utilities.saveData(
                [trgStore],
                'pharmacy/rx/pharmtrainingpbm/update',
                'ttPharmTraining',
                [true],
                {pAction: vm.get('trgSaveState')},
                saveAction,
                null
            );

            if (saveData.code == 0) {
                Ext.MessageBox.alert('Credentialing', "Training details has been sucessfully saved", this.showResult, this);
                trgStore.reload();
                vm.set('trgSaveState', "Update");
            }
            else {
                Ext.MessageBox.alert('Credentialing Training', "Training not saved - " + saveData.message, this.showResult, this);
            }
        }
        else {
            Ext.MessageBox.alert('Credentialing Training', "Please enter all required fields before submitting job.", this.showResult, this);
        }
    },

    /**
     *
     */
    doCommunicationSave: function () {
        var me = this,
            view = this.getView(),
            vm = me.getViewModel(),
            comStore = vm.get('contactinfotableToSave');
        for (var i = 1; i < 6; i++) {
            var contactType = 'contactType' + i,
                contactObj = this.lookupReference(contactType);
            if (contactObj) {
                var form = contactObj.getForm();
                form.wasDirty=true;
              /*  var  record = form.getRecord();
                if (record) {
                    //  var values = form.getValues();*/
                    //form.updateRecord();
                    if (form.getValues()) {
                        if (form.isValid()) {
                            comStore.insert(i-1,form.getValues());
                            comStore.data.items[i-1].dirty = true;
                            comStore.data.items[i-1].data.contactType = i;
                        }
                        else {
                            Ext.MessageBox.alert('Credentialing Communication', "Please enter all required fields before submitting job.", this.showResult, this);
                            return;
                        }
                    }
                }
           // }
        }
        // for (var i = 0; i < comStore.data.length; i++) {
        //     comStore.data.items[i].dirty = true;
        //     comStore.data.items[i].data.contactType = i+1;
        // }
        if (comStore.getCount() > 0) {
            var saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];

            var saveData = Atlas.common.utility.Utilities.saveData(
                [comStore],
                'pharmacy/rx/contactinfotable/update',
                'ttContactInfo',
                [true],
                {
                    'ipcParent': vm.get('selCredType'),
                    'ipcParentKey': vm.get('selCredValue')
                }, //extraparams
                saveAction,
                null
            );

            if (saveData.code == 0) {
                Ext.MessageBox.alert('Credentialing Communication', "Communication details has been sucessfully saved", this.showResult, this);
            } else {
                Ext.MessageBox.alert('Credentialing Communication', "Communication details not saved - " + saveData.message, this.showResult, this);
            }
            comStore.clearData();
            comStore.removeAll();
        }
    },




    /**
     * To Add and update NCPCD row
     */
    doSaveStateLicense: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            form = me.lookupReference('stateLicAddFormRef'),
            PbmInfoGrid = me.lookupReference('stateLicInfoGridRef'),
            historyGrid = me.lookupReference('stateLicHistGridRef'),
            store = vm.getStore('statelicensepbminfo'),
            rec = form.getForm().getRecord();

        if(form.isValid()) {
            form.updateRecord();
            form.reset();
            if(this.gaction=='Add') {
                var flag=true;
                for (var i = 0, slength = store.data.length; i < slength; i++){
                    if(store.data.items[i].data.LicenseStateCode == rec.data.LicenseStateCode){
                        flag=false;
                        Ext.MessageBox.alert('Alert', 'Record already exist.');
                        return flag;
                    }
                }
                if(flag) {
                    store.add(rec);
                    vm.getStore('statelicensepbmhistoryTemp').removeAll();
                    vm.getStore('statelicensepbmhistoryTemp').add(rec);
                }

            }
            else{
                PbmInfoGrid.getView().refresh();
                historyGrid.getView().refresh();
                vm.getStore('statelicensepbmhistoryTemp').data.items[0] =rec;
               // vm.getStore('statelicensepbmhistoryTemp').loadData();

                var staLicHistStore = vm.getStore('statelicensepbmhistory');
                var  tempstaLicHistStore=[];
                for (var idx2 = 0, length2 = staLicHistStore.data.length; idx2 < length2; idx2++){
                    if(staLicHistStore.data.items[idx2].data.LicenseStateCode == rec.data.LicenseStateCode){
                        tempstaLicHistStore.push(staLicHistStore.data.items[idx2]);
                    }
                }
                if(rec.dirty) {
                    if (tempstaLicHistStore.length == 0) {
                        tempstaLicHistStore.push(rec);
                    }
                    else{
                        tempstaLicHistStore[0]=rec;
                    }
                }
                 store = vm.getStore('statelicensepbmhistoryTemp');

                store.data.clear();
                vm.getStore('statelicensepbmhistoryTemp').loadData(tempstaLicHistStore);


            }
            btn.up('window').close();
        }
    },

    /**
     * To delete NCPCD row
     * @param store
     * @param rec
     */
    doDeleteStateLicense: function (btn, evnt) {
        var me=this,
            vm = me.getViewModel(),
            PBMHistoryStoreLocal= vm.getStore('statelicensepbmhistoryTemp'),
            store = me.getViewModel().getStore('statelicensepbminfo'),
            grid = me.lookupReference('stateLicInfoGridRef'),
            rec = grid.getSelectionModel().selected.items[0];

         if(store.data.items.length>0) {
             if(grid.getSelectionModel().selected.items.length>0) {
                 Ext.Msg.show({
                     title: 'Confirm',
                     message: 'Are you sure you want to delete ?',
                     buttons: Ext.Msg.YESNO,
                     icon: Ext.Msg.QUESTION,
                     fn: function (btn) {
                         if (btn === 'yes') {

                             rec.action = 'Delete';
                             rec.crudState = 'D';
                             grid.getSelectionModel().getSelection()[0].phantom = false;
                             store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));

                             var staLicHistStore = vm.getStore('statelicensepbmhistory');
                             var tempstaLicHistStore = [];
                             for (var idx2 = 0, length2 = staLicHistStore.data.length; idx2 < length2; idx2++) {
                                 if (store.data.items.length > 0) {
                                     if (staLicHistStore.data.items[idx2].data.LicenseStateCode == store.data.items[0].data.LicenseStateCode) {
                                         tempstaLicHistStore.push(staLicHistStore.data.items[idx2])
                                     }
                                 }
                             }
                             if (store.getCount() > 0) {
                                 grid.getSelectionModel().select(0);
                             }
                             vm.getStore('statelicensepbmhistoryTemp').removeAll();
                             vm.getStore('statelicensepbmhistoryTemp').loadData(tempstaLicHistStore);

                         }
                     }
                 });
             }
         }
    },

    /**
     * Pharmay Tab Save involing Save of 5 Tabs
     * @param button
     */
    doPharmachyLicInfoSave: function (button) {
        var me = this,
            vm = me.getViewModel();

        var pharmaStore = vm.getStore('pharmacylicinfo'),  //The main request store which has data
            dealLicenHistoryStore = vm.getStore('dealicensehistory'),
            insLicenHistoryStore = vm.getStore('inslicensehistory'), //mandatory TT for Save
            stateLicensenNCPDPHistoryStore = vm.getStore('statelicensencpdphistory'),
            stateLicensePbmHistoryStore = vm.getStore('statelicensepbminfo'),
            pharmacyInfoStore = vm.getStore('pharmacyandpatientinfo'),
            action = 'Add',
            refs = me.getReferences(),
            requestParameter = {},
            fpLICFlag = false;

        if (button.text != 'Save') {
            action = 'Apply'
        }

        if (refs.picLicInforFormRef.getForm()._record != undefined) {
            refs.picLicInforFormRef.updateRecord();
        }


        if (refs.deaLicFormRef.getForm()._record != undefined) {
            refs.deaLicFormRef.updateRecord();
        }

        if (refs.insLicInfoFormRef.getForm()._record != undefined) {
            fpLICFlag = true;
            refs.insLicInfoFormRef.updateRecord();  //Mandatory for Save
        }

        if (refs.pharmacyAndPatientFormRef.getForm()._record != undefined) {
            refs.pharmacyAndPatientFormRef.updateRecord();
        }

        if (refs.ntisInfoFormRef.getForm()._record != undefined) {
            refs.ntisInfoFormRef.updateRecord();
        }


        if (action == 'Apply') {
            Ext.Msg.confirm('Confirm', 'Do you want to apply this information across Relationship?',
                function (btn) {
                    if (btn == 'yes') {
                        var ttPICLicenseHistory = {};
                        ttPICLicenseHistory.ttPICLicenseHistory = [];
                        requestParameter['ttPICLicenseHistory'] = ttPICLicenseHistory;

                        var ttDEALicenseHistory = {};
                        ttDEALicenseHistory.ttDEALicenseHistory = [];
                        requestParameter['ttDEALicenseHistory'] = ttDEALicenseHistory;

                        if (fpLICFlag == true) {
                            if (insLicenHistoryStore.data.length == 0) {
                                var newRecordTable = me.convertArrayToTempTable(refs.insLicInfoFormRef.items, 'ttINSLicenseHistory');
                                requestParameter['ttINSLicenseHistory'] = newRecordTable
                            }
                            else {
                                requestParameter['ttINSLicenseHistory'] = me.convertStoreToTempTable(insLicenHistoryStore, 'ttINSLicenseHistory'); //Mandatory working
                            }
                        }
                        if(vm.get('activeTab') == 'pharmacy-pharmacyandpatient'){
                            requestParameter['ttPharmacyInfo'] = me.convertStoreToTempTable(pharmacyInfoStore, 'ttPharmacyInfo'); //working
                        }
                        else{
                            var ttPharmacyInfo = {};
                            ttPharmacyInfo.ttPharmacyInfo = [];
                            requestParameter['ttPharmacyInfo'] = ttPharmacyInfo;
                        }


                        var ttStateLicenseNCPDPHistory = {};
                        ttStateLicenseNCPDPHistory.ttStateLicenseNCPDPHistory = [];
                        requestParameter['ttStateLicenseNCPDPHistory'] = ttStateLicenseNCPDPHistory;

                        var ttStateLicensePBMHistory = {};
                        ttStateLicensePBMHistory.ttStateLicensePBMHistory = [];
                        requestParameter['ttStateLicensePBMHistory'] = ttStateLicensePBMHistory;

                        requestParameter['pRelationshipId'] = me.getViewModel().get('selCredType') == 'RID' ? me.getViewModel().get('selCredValue') : '';
                        requestParameter['pNCPDPId'] = me.getViewModel().get('pNCPDPId');
                        requestParameter['pAction'] = action;
                        //me.savePharmacy('pharmacy/rx/pharmacylicinfo/update', requestParameter, action);
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                        var savePharmacy = Atlas.common.utility.Utilities.saveData([{}], 'pharmacy/rx/pharmacylicinfo/update', null, [true], requestParameter,
                            saveAction, null);
                        if (savePharmacy.code == 0) {
                            me.onPharmacySaveSuccess(null, action);
                        }
                        else{
                            Ext.MessageBox.alert('Credentialing Pharmacy', "Pharmacy Information not saved - "+ savePharmacy.message, this.showResult, this);
                        }
                    }
                    else {
                        return false;
                    }
                });

        }
        else {
            if (pharmaStore.data.length == 0) {
                var newRecordTable = me.convertArrayToTempTable(refs.picLicInforFormRef.items, 'ttPICLicenseHistory');
                requestParameter['ttPICLicenseHistory'] = newRecordTable;
            }
            else {
                requestParameter['ttPICLicenseHistory'] = me.convertStoreToTempTable(pharmaStore, 'ttPICLicenseHistory'); //This is not a temp table
            }
            if (dealLicenHistoryStore.data.length == 0) {
                var newRecordTable = me.convertArrayToTempTable(refs.deaLicFormRef.items, 'ttDEALicenseHistory');
                requestParameter['ttDEALicenseHistory'] = newRecordTable
            }
            else {
                requestParameter['ttDEALicenseHistory'] = me.convertStoreToTempTable(dealLicenHistoryStore, 'ttDEALicenseHistory'); //Working
            }
            if (insLicenHistoryStore.data.length == 0) {
                var newRecordTable = me.convertArrayToTempTable(refs.insLicInfoFormRef.items, 'ttINSLicenseHistory');
                requestParameter['ttINSLicenseHistory'] = newRecordTable
            }
            else {
                requestParameter['ttINSLicenseHistory'] = me.convertStoreToTempTable(insLicenHistoryStore, 'ttINSLicenseHistory'); //Mandatory working
            }
            requestParameter['ttPharmacyInfo'] = me.convertStoreToTempTable(pharmacyInfoStore, 'ttPharmacyInfo'); //working
            requestParameter['ttStateLicenseNCPDPHistory'] = me.convertStoreToTempTableXX(stateLicensenNCPDPHistoryStore, 'ttStateLicenseNCPDPHistory'); // Not implemented - it is an Empty Structure            
            requestParameter['pRelationshipId'] = me.getViewModel().get('selCredType') == 'RID' ? me.getViewModel().get('selCredValue') : '';
			for (var i in stateLicensePbmHistoryStore.removed) {
	            var rec = stateLicensePbmHistoryStore.removed[i];
	            var recordData = rec.data;
	            rec.data.action = 'Delete';
	            stateLicensePbmHistoryStore.insert(rec.length,rec.data);
	        }	
	        requestParameter['ttStateLicensePBMHistory'] = me.convertStoreToTempTable(stateLicensePbmHistoryStore, 'ttStateLicensePBMHistory');	        
            requestParameter['pNCPDPId'] = me.getViewModel().get('pNCPDPId');
            requestParameter['pAction'] = action;

            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
           // me.savePharmacy('pharmacy/rx/pharmacylicinfo/update', requestParameter, action);
            var savePharmacy = Atlas.common.utility.Utilities.saveData([{}], 'pharmacy/rx/pharmacylicinfo/update', null, [true], requestParameter,
                saveAction, null);
            if (savePharmacy.code == 0) {
                me.onPharmacySaveSuccess(null, action);
            }
            else{
                Ext.MessageBox.alert('Credentialing Pharmacy', "Pharmacy Information not saved - "+ savePharmacy.message, this.showResult, this);
            }
        }


    }
    ,



    /**
     * Callback on Pharmacy save success
     * @param response
     */
    onPharmacySaveSuccess: function (response, pAction) {
        var me = this;
        var vm = me.getViewModel();
        //var responseJSON = Ext.decode(response.responseText);
        vm.getStore('pharmacylicinfo').reload();
        if(pAction == 'Add'){
            Ext.MessageBox.alert('PBM', "Record successfully saved.", this.showResult, this);
        }
        else if(pAction == 'Apply'){
            Ext.MessageBox.alert('PBM', "Record successfully applied.", this.showResult, this);
        }
    },


//******************************** Below are Methods implemented by Daniel / Sunder  *****************************


//to do method
    doViewDocument: function (description, programName, parameters, runMode, programType, saveDoc, faxNumber) {
        var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(description, programName, parameters, runMode, programType, saveDoc, faxNumber);
        if (documentInfo.code == 0) Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)

    }
    ,

    convertArrayToTempTable: function (arr, tempTableName) {
        if (!arr)
            return null;

        var requestParameter = {};
        var items = arr.items;
        var rcd = {};
        for (var i = 0; i < items.length; i++) {
            rcd[items[i].name] = (items[i].xtype == 'datefield' ? Ext.Date.format(items[i].value, 'Y/m/d') : items[i].value);
        }
        requestParameter[tempTableName] = [];
        requestParameter[tempTableName].push(rcd);
        return requestParameter;
    },


    convertStoreToTempTable: function (store, tempTableName) {
        if (!store)
            return null;

        var requestParameter = {};

        var recordsModified = [];
        var items = store.data.items;

        for (var i = 0; i < items.length; i++) {
            var recordData = items[i].data;
            recordsModified.push(recordData);
        }

        requestParameter[tempTableName] = recordsModified;
        return requestParameter;

    }
    ,

    convertStoreToTempTableXX: function (store, tempTableName) {
        if (!store)
            return null;

        var requestParameter = {};

        var recordsModified = [];
        var items = store.data.items;

        //for (var i = 0; i < items.length; i++) {
        //    var recordData = items[i].data;
        //    recordsModified.push(recordData);
        //}

        requestParameter[tempTableName] = recordsModified;
        return requestParameter;

    }
    ,

//to do method
    doDocumentDelete: function () {
        var me = this,
            modelFaxHistory = button.$widgetRecord;

        Ext.Msg.confirm('Delete Attachment', 'Are you sure you would like to remove this attachment?', function (buttonId) {
            if (buttonId == 'yes') {
                var storeFaxHistory = me.retrieveStore('faxHistory'),
                    storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
                    modelDocumentXRefPlanGroup = me.retrieveWidget('[title = Document Setup]').getSelection()[0],
                    params;

                storeFaxHistory.remove(modelFaxHistory);

                saveAction = [{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                params = {
                    pcPlanID: '',
                    pcKeyType: 'PlanGroupDocSystemId',
                    pcKeyValue: modelDocumentXRefPlanGroup.get('systemID'),
                    pcKeyAction: 'D',
                    pcDocIDList: modelFaxHistory.get('DocumentID'),
                    pcDescrData: 'DeletePGDocAttachment'
                };

                var setDocumentXRefPlanGroup = Atlas.common.utility.Utilities.saveData([storeFaxHistory], 'shared/rx/attachmentlist/update', 'ttDocList', [true], params,
                    saveAction, null);

                storeFaxHistory.reload();
            }
        });
    }
    ,

//*******************************************************************************************************************


    /**
     * this method is to view Document.
     * @param button
     */

    viewDocument: function (button) {
        var me = this,
            selectedRecord = button._rowContext.record;

        Atlas.common.utility.Utilities.viewDocument(selectedRecord.get('DocumentID'), 'pdf');
    }
    ,

    /**
     * this method is for removing the relation ship of the document with the supplied id.
     * @param keyValue
     * @param DocumentID
     * @constructor
     */
    DeleteAttachmentList: function (keyValue, DocumentID) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "D"}}];
        var extraParameters = {
            pcPlanID: '',
            pcKeyType: this.getViewModel().get('selCredType'),
            pcKeyValue: this.getViewModel().get('selCredValue'),
            pcDocIDList: DocumentID,
            pcDescrData: 'anything'
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0) {
            Ext.Msg.alert('PBM', 'Record Deleted.');
        }

    }
    ,

    /**
     * this method is for removing the document from the system.
     * @param DocumentID
     * @constructor
     */
    DeleteDocument: function (DocumentID) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "D"}}];
        var extraParameters = {
            pDocumentID: DocumentID
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deldocument/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0) {
            Ext.Msg.alert('PBM', 'Record Deleted.');
        }

    }
    ,


    showCredAddAttachmentPopUp: function (button, event, myParam) {
        /*var vm;
         vm = this.getViewModel();

         var mpuPopUp = new Atlas.common.view.sharedviews.windows.CredAttachmentPopUp({
         itemConfig: {
         tgtPlanId: '',
         tgtKeyType: 'PharmParentSystemId',
         tgtKeyValue: vm.data.srchJobGroupExtMdl.data.systemID,
         tgtAttachFile: true
         }
         });
         mpuPopUp.show();*/

        var me = this,
            view = me.getView();

        var winAddAttach = Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            floating: true,
            layout: {type: 'fit', align: 'stretch'},
            modal: true,
            closable: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            autoShow: false,
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    width: '100%',
                    height: '100%',
                    keyType: 'imageCredentialing',
                    fileType: 'pdf',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        view.add(winAddAttach);
        winAddAttach.show();
    }
    ,

    onUploadAttachment: function (arrayDocumentId) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            keyType = this.getViewModel().get('selCredType'),
            keyValue = this.getViewModel().get('selCredValue'),
            panelFileUpload = view.down('#fileUploadGrid'),
            fileStore = panelFileUpload.getViewModel().getStore('fileStore');

        for (var idx = 0, length = arrayDocumentId.length; idx < length; idx = idx + 1) {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];

            var params = {
                pcPlanID: '',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'A',
                pcDocIDList: arrayDocumentId[idx],
                pcDescrData: fileStore.getAt(idx).get('description')
            };

            var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                saveAction, null);
        }

        vm.getStore('credfaxattachment').reload();
    }
    ,

    onSendFax: function (btnSendFax) {
        var me = this,
            attachmentList,
            credDetailLetterWin = btnSendFax.up('window'),
            letterType = 'Recredentialing Letter', //insert dynamic value; this value is equal to the radio box box label
            docId = '28385801', //insert dynamic value
            runMode = 2,
            fieldList = '',//insert dynamic value
            valueList = '', //insert dynamic value
            letterId = 11; //insert dynamic value; // this is constant

        if (letterType == "Refresh Hold Request Letter") {
            letterType = "New Pharmacy Missing Cred Info Independent Letter";
        }
        else if (letterType == "Refresh Hold Request Letter - Relationship") {
            letterType = "New Pharmacy Missing Cred Info Corporate Letter";
        }

        attachmentList = me.setAttachmentList(letterType, docId, 'Faxed');

        if (attachmentList.message == 'Successful') {
            var faxNum = '401-770-7108'; //insert dynamic value; faxNum is equal to the faxNum from credentialing.js

            var params = {
                pDescription: letterType + ' sent to ' + faxNum,
                pProgramName: 'faxDocument.p',
                pParameters: docId + '|',
                pRunMode: runMode, // this is constant
                pProgramType: 'Fax', // this is constant
                pSaveDocument: true, // this is constant
                pFaxNumber: faxNum
            };

            saveAction = [{
                "Save": {"key": '', "value": ''}
            }];

            var submitJob = Atlas.common.utility.Utilities.saveData([], 'shared/rx/submitjob/update', null, [false], params,
                saveAction, ['pJobNumber']);

            if (submitJob.code === 0) {
                var mode = 'U';
                var letterDetail = me.setLetterDetail(fieldList, valueList, letterId, mode); // please pass on values to the parameters.

                Ext.Msg.alert('Fax', 'Please check your fax status in Job Queue');
            }
            else {
                Ext.Msg.alert('Fax', 'Error in fax submission');
            }
        }
        else {
            Ext.Msg.alert('Fax', 'Error in adding fax to attachment list');
            return;
        }

        credDetailLetterWin.close();
    }
    ,

    onSendBtn: function (btnSend) {
        var me = this,
            credDetailLettersWin = btnSend.up('window'),
            letterDetail,
            mode = 'U',
            letterType = 'Recredentialing Letter', //insert dynamic value; this value is equal to the radiobutton box label
            docId = '28385801',
            fieldList = '',//insert dynamic value
            valueList = '', //insert dynamic value
            letterId = 11; //insert dynamic value

        if (letterType == "Refresh Hold Request Letter") {
            letterType = "New Pharmacy Missing Cred Info Independent Letter";
        }
        else if (letterType == "Refresh Hold Request Letter - Relationship") {
            letterType = "New Pharmacy Missing Cred Info Corporate Letter";
        }

        letterDetail = me.setLetterDetail(fieldList, valueList, letterId, mode); // please pass on values to the parameters.

        if (letterDetail.code == 0) {
            var attachmentList = me.setAttachmentList(letterType, docId, 'Sent');

            if (attachmentList.message == 'Successful') {
                Ext.Msg.alert('Success', 'Letter has been sent successfully');
                credDetailLettersWin.close();
            }
            else {
                Ext.Msg.alert('Error', attachmentList.message);
                credDetailLettersWin.close()
            }
        }
    }
    ,

    setLetterDetail: function (fieldList, valueList, letterId, mode) {
        var me = this,
            //mode = 'U', //STATIC VALUE, DO NOT CHANGE
            // fieldList = 'sentBy,sentDate,AssignTo', //STATIC VALUE, DO NOT CHANGE
            date = Ext.util.Format.date(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y g:i:s A'),
            user = me.getView().findParentByType().findParentByType().findParentByType().findParentByType().getViewModel().get('user').un;
        //valueList = user + '|' + date + '|',
        //letterId = 1233651; //dyanmic value; insert the letterID associated with the radiobutton

        var paramsSetLetterDetail = {
            pLetterID: letterId,
            pMode: mode,
            pFields: fieldList,
            pValues: valueList
        };

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];

        var setLetterDetail = Atlas.common.utility.Utilities.saveData([], 'pharmacy/rx/letterdetail/update', null, [false], paramsSetLetterDetail,
            saveAction, ['pretLetterID']);

        return setLetterDetail;
    }
    ,

    setAttachmentList: function (letterType, docId, typeOfAttachment) {
        var me = this,
            keyType = 'RID', //INSERT DYNAMIC VALUE
            keyValue = '177', //INSERT DYNAMIC VALUE
            planId = 'HPM'; //insert dynamic value

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];

        var params = {
            pcPlanID: planId,
            pcKeyType: keyType,
            pcKeyValue: keyValue,
            pcKeyAction: 'A',
            pcDocIDList: docId,
            pcDescrData: letterType + ' ' + typeOfAttachment
        };

        var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
            saveAction, null);

        return setAttachmentList;
    }
    ,


    setLetterDocument: function (letterID, letterProgramName) {
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdocument/update', null, [true], {
                pLetterID: letterID,
                pLetterProgramName: letterProgramName
            },
            saveAction, null);

    }
    ,

    getLetterDetail: function (letterId) {
        //letterId = 11;
        var storeLetterDetails = this.getViewModel().getStore('letterDetail');
        storeLetterDetails.getProxy().setExtraParam('pLetterID', letterId);
        storeLetterDetails.getProxy().setExtraParam('pFields', 'DocID');
        storeLetterDetails.getProxy().setExtraParam('pSessionID', Atlas.user.sessionId);
        storeLetterDetails.load();
    }
    ,

    getLetterProgramName: function (letterName) {
        var storeLetterProgramName = this.getViewModel().getStore('letterProgramName');
        storeLetterProgramName.getProxy().setExtraParam('pBuffer', 'LetterMaster');
        storeLetterProgramName.getProxy().setExtraParam('pWhere', "LetterName = '" + letterName + "' ");
        storeLetterProgramName.getProxy().setExtraParam('pField', 'LetterProgramName');
        storeLetterProgramName.getProxy().setExtraParam('pSessionId', Atlas.user.sessionId);
        storeLetterProgramName.load();
    }
    ,

    getLetterNameId: function (letterName) {

        var storeLetterNameId = this.getViewModel().getStore('letterNameId');
        storeLetterNameId.getProxy().setExtraParam('pBuffer', 'LetterMaster');
        storeLetterNameId.getProxy().setExtraParam('pWhere', "LetterName = '" + letterName + "' ");
        storeLetterNameId.getProxy().setExtraParam('pField', 'LetterNameId');
        storeLetterNameId.getProxy().setExtraParam('pSessionId', Atlas.user.sessionId);
        storeLetterNameId.load();
    },

    setReCredDate: function () {
        var completedDate = this.getView().down('#dtCompleteDate').getValue();
        var CredResult = this.getView().down('#cbxCredResult').getRawValue();
        var dtExpectedReCredDate = this.getView().down('#dtExpectedReCredDate');

        if (completedDate && completedDate != '' && CredResult == 'Pass') {
            var reCredDate = new Date(completedDate);
            reCredDate.setMonth(reCredDate.getMonth() + 36);
            dtExpectedReCredDate.setValue(reCredDate);
        }
        else {
            dtExpectedReCredDate.setValue('');
        }
    },

    setReCredFileRcvDate: function () {
        var expRecredDate = this.getView().down('#dtExpectedReCredDate').getValue();
        var dtReCredFileReceivedDate = this.getView().down('#dtReCredFileReceivedDate');
        if (expRecredDate && expRecredDate != '') {
            dtReCredFileReceivedDate.setDisabled(false);
        }
        else {
            dtReCredFileReceivedDate.setValue('');
            dtReCredFileReceivedDate.setDisabled(true);
        }
    },

    validCredResult: function () {
        var completedDate = this.getView().down('#dtCompleteDate').getValue();
        if (completedDate && completedDate != '' && this.getView().down('#cbxCredResult').getValue() == '') {
            Ext.Msg.alert('PBM', 'Please enter credentialing result.');
            return false;
        }
        else {
            return true;
        }
    },

    validCredCompleteDate: function () {
        var dtCreateDate = this.getView().down('#dtCreateDate');
        var completedDate = (this.getView().down('#dtCompleteDate').getValue() == null ? '' : this.getView().down('#dtCompleteDate').getValue());
        if (completedDate && completedDate != '' && dtCreateDate.getValue() != null && (new Date(completedDate) < this.getView().down('#dtCreateDate').getValue())) {
            return false;
        }
        else {
            return true;
        }
    }

});
