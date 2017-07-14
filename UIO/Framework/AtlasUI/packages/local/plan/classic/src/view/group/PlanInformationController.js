/**
 * Created by d3973 on 11/22/2016.
 */
Ext.define('Atlas.plan.view.group.PlanInformationController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.planplaninformationcontroller',

    // listen: {
    //     controller: {
    //         '*': {
    //             groupchange: 'selectPlan'
    //         }
    //     }
    // },

    init: function(){
        var me = this,
            view = me.getView(),
            storeLetterInfo = me.retrieveStore('letterInfo'),
            modelPlanGroup = me.retrievePlanGroup();

        storeLetterInfo.onAfter('load', 'onLoadLetterInfo');

        if (modelPlanGroup){
            me.selectPlan();
        }
    },

    selectPlan: function(){
        var me = this,
            planGroup = me.retrievePlanGroup(),
            planGroupId = planGroup.get('planGroupId'),
            storeLetterInfo = me.retrieveStore('letterInfo'),
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers');

        var paramsLetterInfo = {
            pBatchSize: 0,
            pWhere: 'planGroupId = ' + planGroupId
        };
        storeLetterInfo.load({
            params: paramsLetterInfo
        });

        var paramsLetterDisclaimers = {
            pPlanGroupID: planGroupId
        };
        storeLetterDisclaimers.load({
            params: paramsLetterDisclaimers
        });
    },

    onLoadLetterInfo: function(storeLetterInfo){
        var me = this,
            storeLetterMRxInfoVert = me.retrieveStore('letterMRxInfoVert'),
            storeLetterInfoVert = me.retrieveStore('letterInfoVert'),
            btnSave = me.getView().down('#planInformationSave'),
            fieldsArray;

        function filterRecords(record){
            if((record.get('letterFields') == 'systemID') || (record.get('letterFields') == 'recordVersion') || (record.get('letterFields') == 'letterFrom') || (record.get('letterFields') == 'lastModified') || (record.get('letterFields') == 'planGroupId') || (record.get('letterFields') == 'id')){
                return false;
            }
            else {
                return true;
            }
        }

        if (storeLetterInfo.getCount() === 0){
            var letterFromArray = ['MRx', 'Plan'];

            fieldsArray = storeLetterInfo.model.getFields();

            for (var idx = 0, length = letterFromArray.length; idx < length; idx = idx + 1){
                var arrayVertModels = [];

                for (var idx2 = 0, numFields = fieldsArray.length; idx2 < numFields; idx2 = idx2 + 1){
                    var fieldName = fieldsArray[idx2].name,
                        vertModel = Ext.create('Atlas.plan.model.PlanLetterInfoVert'),
                        valueOfField = '';

                    switch (fieldName){
                        case 'letterFrom':
                            valueOfField = letterFromArray[idx];
                            break;
                        case 'logoXScale':
                            fieldName = 'Logo XScale';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'logoRow':
                            fieldName = 'Logo Row';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pgNameLong':
                            fieldName = 'Long Name';
                            break;
                        case 'pgContactExtension':
                            fieldName = 'Contact Extension';
                            break;
                        case 'planServStates':
                            fieldName = 'Plan Serv States';
                            break;
                        case 'pgContactFax':
                            fieldName = 'Contact Fax';
                            break;
                        case 'pgNameShort':
                            fieldName = 'Short Name';
                            break;
                        case 'pgTTYcontactPhone':
                            fieldName = 'TTY Contact Phone';
                            break;
                        case 'pgContactPhone':
                            fieldName = 'Contact Phone';
                            break;
                        case 'logoColumn':
                            fieldName = 'Logo Column';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pgState':
                            fieldName = 'State';
                            break;
                        case 'pgAddress':
                            fieldName = 'Address';
                            break;
                        case 'pharmTechPhone':
                            fieldName = 'Tech Phone';
                            break;
                        case 'pgCity':
                            fieldName = 'City';
                            break;
                        case 'logoYScale':
                            fieldName = 'Logo YScale';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pharmTechTTY':
                            fieldName = 'Tech TTY';
                            break;
                        case 'pgAvailTime':
                            fieldName = 'Avail Time';
                            break;
                        case 'pgAvailDays':
                            fieldName = 'Avail Days';
                            break;
                        case 'pgZip':
                            fieldName = 'Zip';
                            break;
                        case 'pharmTechFax':
                            fieldName = 'Tech Fax';
                            break;
                        case 'pgLogoName':
                            fieldName = 'Logo Name';
                            break;
                        case 'planGroupId':
                            var planGroup = me.retrievePlanGroup();
                            valueOfField = planGroup.get('planGroupId');
                            break;
                    }

                    vertModel.set('letterFields', fieldName);
                    vertModel.set('value', valueOfField);
                    arrayVertModels.push(vertModel);
                }
                if(letterFromArray[idx] == 'MRx'){
                    storeLetterMRxInfoVert.loadRecords(arrayVertModels);
                    storeLetterMRxInfoVert.filterBy(filterRecords);
                }
                else {
                    storeLetterInfoVert.loadRecords(arrayVertModels);
                    storeLetterInfoVert.filterBy(filterRecords);
                }
            }
        }
        else {
            for (var idx = 0, length = storeLetterInfo.getCount(); idx < length; idx = idx + 1){
                var model = storeLetterInfo.getAt(idx),
                    arrayVertModels = [];

                fieldsArray = model.getFields();

                for (var idx2 = 0, numFields = fieldsArray.length; idx2 < numFields; idx2 = idx2 + 1){
                    var fieldName = fieldsArray[idx2].getName(),
                        vertModel = Ext.create('Atlas.plan.model.PlanLetterInfoVert'),
                        valueOfField = model.get(fieldName);

                    switch (fieldName){
                        case 'logoXScale':
                            fieldName = 'Logo XScale';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'logoRow':
                            fieldName = 'Logo Row';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pgNameLong':
                            fieldName = 'Long Name';
                            break;
                        case 'pgContactExtension':
                            fieldName = 'Contact Extension';
                            break;
                        case 'planServStates':
                            fieldName = 'Plan Serv States';
                            break;
                        case 'pgContactFax':
                            fieldName = 'Contact Fax';
                            break;
                        case 'pgNameShort':
                            fieldName = 'Short Name';
                            break;
                        case 'pgTTYcontactPhone':
                            fieldName = 'TTY Contact Phone';
                            break;
                        case 'pgContactPhone':
                            fieldName = 'Contact Phone';
                            break;
                        case 'logoColumn':
                            fieldName = 'Logo Column';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pgState':
                            fieldName = 'State';
                            break;
                        case 'pgAddress':
                            fieldName = 'Address';
                            break;
                        case 'pharmTechPhone':
                            fieldName = 'Tech Phone';
                            break;
                        case 'pgCity':
                            fieldName = 'City';
                            break;
                        case 'logoYScale':
                            fieldName = 'Logo YScale';
                            if (!valueOfField){
                                valueOfField = 0;
                            }
                            break;
                        case 'pharmTechTTY':
                            fieldName = 'Tech TTY';
                            break;
                        case 'pgAvailTime':
                            fieldName = 'Avail Time';
                            break;
                        case 'pgAvailDays':
                            fieldName = 'Avail Days';
                            break;
                        case 'pgZip':
                            fieldName = 'Zip';
                            break;
                        case 'pharmTechFax':
                            fieldName = 'Tech Fax';
                            break;
                        case 'pgLogoName':
                            fieldName = 'Logo Name';
                            break;
                    }

                    vertModel.set('letterFields', fieldName);
                    vertModel.set('value', valueOfField);


                    arrayVertModels.push(vertModel);
                }

                if(model.get('letterFrom') == 'MRx'){
                    storeLetterMRxInfoVert.loadRecords(arrayVertModels);
                    storeLetterMRxInfoVert.filterBy(filterRecords);
                }
                else {
                    storeLetterInfoVert.loadRecords(arrayVertModels);
                    storeLetterInfoVert.filterBy(filterRecords);
                }
            }
        }

        storeLetterMRxInfoVert.commitChanges();
        storeLetterInfoVert.commitChanges();

        btnSave.disable();
    },

    onCancelEdit: function(plugin, context){
        var me = this,
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers'),
            modelLetterDisclaimers = storeLetterDisclaimers.getAt(context.rowIdx);

        if(modelLetterDisclaimers.get('DisclaimerText') == ''){
            storeLetterDisclaimers.remove(modelLetterDisclaimers);
        }
    },

    editDisclaimers: function(editor, context){
        var me = this,
            view = me.getView(),
            pageView = view.up('#planPlanInformation'),
            colConversionNeeded = pageView.down('[text = Conversion Needed]'),
            chkConversionNeeded = colConversionNeeded.getEditor(),
            btnSave = pageView.down('#planInformationSave'),
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers'),
            editedDisclaimerName = context.record.get('DisclaimerName'),
            editedLetterFrom = context.record.get('LetterFrom');

        for (var idx = 0, length = storeLetterDisclaimers.getCount(); idx < length; idx = idx + 1){
            var tempRec = storeLetterDisclaimers.getAt(idx);
            if ((editedDisclaimerName === tempRec.get('DisclaimerName')) && (editedLetterFrom === tempRec.get('LetterFrom')) && (idx !== context.rowIdx)){
                Ext.Msg.alert('Disclaimer Error', 'Duplicate Disclaimer Name and From Type');
                storeLetterDisclaimers.remove(context.record);
                return;
            }
        }

        for (var tempField in context.record.data){
            if (tempField == 'ConversionNeeded' && (chkConversionNeeded.originalValue != chkConversionNeeded.getValue()) &&  (chkConversionNeeded.originalValue == true)){
                context.record.set(tempField, !chkConversionNeeded.originalValue);
            }
        }

        //checks the modified row to see if there are any changes to the row apart from 'isUpdated' being changed
        if(context.record.dirty){
            if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
                context.record.set('isUpdated', false);

                btnSave.disable();
            }
            else {
                context.record.set('isUpdated', true);

                btnSave.enable();
            }
        }
    },

    onBtnReject: function(button){
        var me = this,
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers'),
            storeLetterInfoVert = me.retrieveStore('letterInfoVert'),
            storeLetterMRxInfoVert  = me.retrieveStore('letterMRxInfoVert'),
            plugin = me.getView().getPlugin(),
            newRecs = storeLetterDisclaimers.getNewRecords(),
            selectedRow,
            storeIdx;

        if (plugin.editing){
            me.checkForCurrentEdits(plugin);
            return;
        }

        if (newRecs.length > 0){
            for(var idx = 0, length = storeLetterDisclaimers.getCount(); idx < length; idx = idx + 1){
                var rec = storeLetterDisclaimers.getAt(idx);

                if (rec.internalId == button.getWidgetRecord().internalId){
                    storeIdx = idx;
                    selectedRow = storeLetterDisclaimers.getAt(storeIdx);

                    //rejects all changes to row
                    storeLetterDisclaimers.remove(selectedRow);

                    if (plugin.editing){
                        plugin.cancelEdit();
                    }
                    break;
                }
            }
        }
        else {
            storeIdx = button._rowContext.recordIndex;
            selectedRow = storeLetterDisclaimers.getAt(storeIdx);

            //rejects all changes to row
            selectedRow.reject();

            //hides the reject button
            selectedRow.set('isUpdated', false);
        }

        if ((storeLetterDisclaimers.getModifiedRecords().length === 0) && (storeLetterInfoVert.getModifiedRecords().length === 0) && (storeLetterMRxInfoVert.getModifiedRecords().length === 0) && (storeLetterDisclaimers.getRemovedRecords().length === 0)){
            var btnSave = me.getView().up('#planPlanInformation').down('#planInformationSave');

            btnSave.disable();
        }
    },

    editTopGrids: function(){
        var me = this,
            view = me.getView(),
            btnAdd = view.down('#planInformationSave'),
            storeLetterInfoVert = me.retrieveStore('letterInfoVert'),
            storeLetterMRxInfoVert = me.retrieveStore('letterMRxInfoVert'),
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers');

        if ((storeLetterInfoVert.getModifiedRecords().length > 0) || (storeLetterMRxInfoVert.getModifiedRecords().length > 0) || (storeLetterDisclaimers.getModifiedRecords().length > 0) || (storeLetterDisclaimers.getRemovedRecords().length > 0)){
            btnAdd.enable();
        }
        else {
            btnAdd.disable();
        }
    },

    renderConversion: function(value){
        if (value === true){
            return 'Yes';
        }
        else if (value === false){
            return 'No';
        }
    },

    saveBtn: function(btnSave){
        var me = this,
            view = me.getView(),
            gridDisclaimers = view.down('[title = Disclaimers]'),
            plugin = gridDisclaimers.getPlugin(),
            planGroup = me.retrievePlanGroup(),
            storeLetterInfoVert = me.retrieveStore('letterInfoVert'),
            storeLetterMRxInfoVert = me.retrieveStore('letterMRxInfoVert'),
            storeLetterInfo = me.retrieveStore('letterInfo'),
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers'),
            storeArray = [storeLetterMRxInfoVert, storeLetterInfoVert];

        function saveDisclaimers(){
            if ((storeLetterDisclaimers.getModifiedRecords().length > 0) || (storeLetterDisclaimers.getRemovedRecords().length > 0)){
                var saveAction =[{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                var setPlanLetterDisclaimers = Atlas.common.utility.Utilities.saveData([storeLetterDisclaimers], 'plan/rx/planletterdisclaimers/update', 'ttPlanLetterDisclaimer',[true], {},
                    saveAction, null);

                if (setPlanLetterDisclaimers.message != 'Successful'){
                    Ext.Msg.alert('Plan Letter Info', 'Failed to process the request');
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }

        if (plugin.editing){
            Ext.Msg.alert('Message', 'Please complete editing current record before save');
            return;
        }

        if(planGroup.get('planGroupId') > 0){
            //if there are updates on either of the top two grids, the following occurs
            if ((storeLetterMRxInfoVert.getModifiedRecords().length > 0) || (storeLetterMRxInfoVert.getRemovedRecords().length > 0) || (storeLetterInfoVert.getModifiedRecords().length > 0) || (storeLetterInfoVert.getRemovedRecords().length > 0) || storeLetterDisclaimers.getModifiedRecords().length > 0 || storeLetterDisclaimers.getRemovedRecords().length > 0){
                var valid = true,
                    errorMessage = '',
                    gridNameArray = ['MRx', 'Plan'],
                    modelsArray = [];

                //validation
                for (var storeNum = storeArray.length - 1; storeNum > -1; storeNum = storeNum - 1){
                    var storeVal = storeArray[storeNum],
                        modelLogoColumn = storeVal.findRecord('letterFields', 'Logo Column', 0, false, true, true),
                        modelLogoRow = storeVal.findRecord('letterFields', 'Logo Row', 0, false, true, true),
                        modelLogoXScale = storeVal.findRecord('letterFields', 'Logo XScale', 0, false, true, true),
                        modelLogoYScale = storeVal.findRecord('letterFields', 'Logo YScale', 0, false, true, true),
                        modelContactPhone = storeVal.findRecord('letterFields', 'Contact Phone', 0, false, true, true),
                        modelLogoName = storeVal.findRecord('letterFields', 'Logo Name', 0, false, true, true);

                    if ((isNaN(modelLogoColumn.get('value'))) || (isNaN(modelLogoRow.get('value'))) || (isNaN(modelLogoXScale.get('value'))) || (isNaN(modelLogoYScale.get('value')))){
                        function checkIfInvalid(model){
                            if (isNaN(model.get('value'))){
                                errorMessage = errorMessage + model.get('letterFields') + ' in ' + gridNameArray[storeNum] + ' requires a numeric value.</br>';
                            }
                        }

                        checkIfInvalid(modelLogoColumn);
                        checkIfInvalid(modelLogoRow);
                        checkIfInvalid(modelLogoXScale);
                        checkIfInvalid(modelLogoYScale);

                        valid = false;
                    }
                    if ((!modelContactPhone.get('value')) || (!modelLogoName.get('value'))){
                        function checkIfEmpty(model){
                            if (!model.get('value')){
                                errorMessage = errorMessage + model.get('letterFields') + ' in ' + gridNameArray[storeNum] + ' is required.</br>';
                            }
                        }

                        checkIfEmpty(modelLogoName);
                        checkIfEmpty(modelContactPhone);
                        checkIfEmpty(modelLogoRow);
                        checkIfEmpty(modelLogoColumn);
                        checkIfEmpty(modelLogoXScale);
                        checkIfEmpty(modelLogoYScale);

                        valid = false;
                    }
                }

                if (!valid){
                    Ext.Msg.alert('Validation Error', errorMessage);
                    return;
                }
                //validation complete

                //clear out all record from storeLetterInfo so that values from the two grids can be input back into storeLetterInfo
                storeLetterInfo.removeAll();
                storeLetterInfo.commitChanges();

                for (var idx = 0, length = storeArray.length; idx < length; idx = idx + 1){
                    var model = new Atlas.plan.model.PlanLetterInfo(),
                        currentStore = storeArray[idx];

                    /*
                    The existing filters must be cleared and then a new one recreated to filter out 'id'. If
                    this is not done, only one grid's values will be loaded into storeLetterInfo.
                     */
                    currentStore.clearFilter();
                    currentStore.filterBy(function(model){
                        if(model.get('letterFields') == 'id'){
                            return false;
                        }
                        else{
                            return true;
                        }
                    });

                    for (var idx2 = 0, length2 = currentStore.getCount(); idx2 < length2; idx2 = idx2 + 1){
                        var currentRecord = currentStore.getAt(idx2),
                            currentField = currentRecord.get('letterFields'),
                            currentValue = currentRecord.get('value');

                        //changing the fields back to their original names that match the model
                        switch (currentField){
                            case 'Logo XScale':
                                currentField = 'logoXScale';
                                break;
                            case 'Logo Row':
                                currentField = 'logoRow';
                                break;
                            case 'Long Name':
                                currentField = 'pgNameLong';
                                break;
                            case 'Contact Extension':
                                currentField = 'pgContactExtension';
                                break;
                            case 'Plan Serv States':
                                currentField = 'planServStates';
                                break;
                            case 'Contact Fax':
                                currentField = 'pgContactFax';
                                break;
                            case 'Short Name':
                                currentField = 'pgNameShort';
                                break;
                            case 'TTY Contact Phone':
                                currentField = 'pgTTYcontactPhone';
                                break;
                            case 'Contact Phone':
                                currentField = 'pgContactPhone';
                                break;
                            case 'Logo Column':
                                currentField = 'logoColumn';
                                break;
                            case 'State':
                                currentField = 'pgState';
                                break;
                            case 'Address':
                                currentField = 'pgAddress';
                                break;
                            case 'Tech Phone':
                                currentField = 'pharmTechPhone';
                                break;
                            case 'City':
                                currentField = 'pgCity';
                                break;
                            case 'Logo YScale':
                                currentField = 'logoYScale';
                                break;
                            case 'Tech TTY':
                                currentField = 'pharmTechTTY';
                                break;
                            case 'Avail Time':
                                currentField = 'pgAvailTime';
                                break;
                            case 'Avail Days':
                                currentField = 'pgAvailDays';
                                break;
                            case 'Zip':
                                currentField = 'pgZip';
                                break;
                            case 'Tech Fax':
                                currentField = 'pharmTechFax';
                                break;
                            case 'Logo Name':
                                currentField = 'pgLogoName';
                                break;
                            case 'lastModified':
                                currentValue = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                break;
                        }

                        if ((currentField == 'systemID') || (currentField == 'logoColumn') || (currentField == 'logoRow') || (currentField == 'logoXScale') || (currentField == 'logoYScale')){
                            if (currentValue){
                                parseFloat(currentValue);
                            }
                            else{
                                currentValue = null;
                            }
                        }
                        else if ((currentField == 'planGroupId') || (currentField == 'recordVersion') || (currentField == 'rowNum')){
                            if (currentValue){
                                parseInt(currentValue);
                            }
                            else {
                                currentValue = null;
                            }
                        }

                        model.set(currentField, currentValue);
                    }
                    //adding all the values from one grid to storeLetterInfo as one record.
                    storeLetterInfo.add(model);
                }

                var saveAction =[{
                    "Create": {},
                    "Update": {},
                    "Delete": {}
                }];

                var setPlanLetterInfo = Atlas.common.utility.Utilities.saveData([storeLetterInfo], 'plan/rx/planletterinfo/update', 'ttPlanLetterInfo',[true], {},
                    saveAction, null);

                if (setPlanLetterInfo.message == 'Successful'){
                    var disclaimerSaveSuccessful = saveDisclaimers();

                    if (disclaimerSaveSuccessful){
                        me.selectPlan();
                    }
                }
                else {
                    Ext.Msg.alert('Plan Letter Info', 'Failed to process the request');
                    return;
                }
            }
            else {
                var disclaimerSaveSuccessful = saveDisclaimers();

                if (disclaimerSaveSuccessful){
                    me.selectPlan();
                }
            }
        }
        else{
            Ext.Msg.alert('Failer - Plan Letter Info', 'Failed to retrieve Plangroup');
            return;
        }
        btnSave.disable();
    },

    checkForCurrentEdits: function(plugin){
        if (plugin.editing){
            Ext.Msg.alert('Message', 'Please complete edit of current record before proceeding');
            Ext.raise('Cancel or complete current edit');
        }
    },

    onAdd: function(){
        var me = this,
            plugin = me.getView().getPlugin(),
            modelLetterDisclaimers= Ext.create('Atlas.plan.model.LetterDisclaimers'),
            storeLetterDisclaimers = me.retrieveStore('letterDisclaimers'),
            planGroup = me.retrievePlanGroup(),
            planGroupId = planGroup.get('planGroupId');

        if (plugin.editing){
            Ext.Msg.alert('Message', 'Please complete edit of current record before proceeding');
            Ext.raise('Cancel or complete current edit');
            return;
        }

        modelLetterDisclaimers.set('DisclaimerName', '');
        modelLetterDisclaimers.set('ConversionNeeded', false);
        modelLetterDisclaimers.set('RowID', 0);
        modelLetterDisclaimers.set('SystemID', 0);
        modelLetterDisclaimers.set('PlanGroupID', planGroupId);
        storeLetterDisclaimers.insert(0, modelLetterDisclaimers);

        plugin.startEdit(0);
    },

    onRemoveButtonClick: function(button){
        var me = this,
            view = me.getView(),
            pageView = view.up('#planPlanInformation'),
            plugin = view.getPlugin(),
            selectedRows = view.getSelectionModel().getSelection(),
            storeLetterDisclaimer = me.retrieveStore('letterDisclaimers');

        if (plugin.editing){
            me.checkForCurrentEdits(plugin);
            return;
        }

        if (selectedRows.length >= 1){
            var btnSave = pageView.down('#planInformationSave');

            storeLetterDisclaimer.remove(selectedRows);
            btnSave.enable();
        }
        else {
            Ext.Msg.alert('Remove', 'Select row to remove');
        }
    },

    retrieveStore: function(store){
        var me = this,
            view = me.getView(),
            gridLetterDisclaimer,
            pageView;

        if (view.itemId == 'planPlanInformation'){
            pageView = view;
            gridLetterDisclaimer = view.down('[title = Disclaimers]');
        }
        else {
            pageView = view.up('#planPlanInformation');
            gridLetterDisclaimer = view;
        }

        if (store != 'letterDisclaimers'){
            return pageView.getViewModel().getStore(store);
        }
        else{
            return gridLetterDisclaimer.getViewModel().storeInfo.letterDisclaimers;
        }
    },

    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
    }
});