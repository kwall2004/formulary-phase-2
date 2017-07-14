/**
 * Created by d3973 on 11/18/2016.
 */
Ext.define('Atlas.plan.view.group.PrescriberDrugOverrideController', {
    //extend: 'Ext.app.ViewController',
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.planprescriberdrugoverridecontroller',

    // listen: {
    //     controller: {
    //         '*': {
    //             groupchange: 'selectPlan'
    //         }
    //     }
    // },

    onLoadPage: function() {
        //debugger;
        var me = this,
            modelPlanGroup = me.retrievePlanGroup(),
            view = me.getView(),
            btnAddOverrideRule = view.down('[text = Add]'),
            btnRemoveOverrideRule = view.down('[text = Remove]'),
            btnAddSpecPresc = view.down('[title = Specialty ~ Prescribers]').down('[text = Add]'),
            btnRemoveSpecPresc = view.down('[title = Specialty ~ Prescribers]').down('[text = Remove]'),
            btnAddDrugOverride = view.down('[title = Drug Override]').down('[text = Add]'),
            btnRemoveDrugOverride = view.down('[title = Drug Override]').down('[text = Remove]');

        if (modelPlanGroup){
            me.selectPlan();
        }
   },

    selectPlan: function(){
        //debugger;
        var me = this,
            view = me.getView();

        if (view.getItemId() != 'plan-prescriberdrugoverride'){
            return;
        }
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        /*if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/
        if (atlasRecord){
             var gridPresDrugOverride = view.down(),
                 gridSpecPresc = view.down('[title = Specialty ~ Prescribers]'),
                 gridDrugOverride = view.down('[title = Drug Override]');
             gridSpecPresc.disable();
             gridDrugOverride.disable();
             gridPresDrugOverride.disable();
             return;
        }else{
            var gridPresDrugOverride = view.down(),
                gridSpecPresc = view.down('[title = Specialty ~ Prescribers]'),
                gridDrugOverride = view.down('[title = Drug Override]');
            gridSpecPresc.enable();
            gridDrugOverride.enable();
            gridPresDrugOverride.enable();

        }

        var modelPlanGroup = me.retrievePlanGroup(),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride'),
            storeExcludedPlanBenefit = me.retrieveStore('excludedPlanBenefit'),
            btnSave = view.down('[text = Save]'),
            btnCancel = view.down('[text = Cancel]');

        //resets values upon selection of new plan
        btnSave.disable();
        btnCancel.disable();
        view.updatedRows = null;
        view.prescDrugRuleId = null;
        view.addedRowsOverrideRules = null;
        view.planGroupId = modelPlanGroup.get('planGroupId');


        storeOverrideRules.removeAll();
        storeOverrideRules.commitChanges();
        storeSpecPresc.removeAll();
        storeSpecPresc.commitChanges();
        storeDrugOverride.removeAll();
        storeDrugOverride.commitChanges();

        var postResult = Atlas.common.utility.Utilities.post(
            'plan/rx/plangroupinfo/read',
            {
                pplanGroupId: modelPlanGroup.get('planGroupId'),
                pFieldList: 'planBenefitId,planBenefitCode'
            },
            ['ttplanInfo']
        );

        storeExcludedPlanBenefit.loadData(postResult.ttplanInfo);

        storeOverrideRules.load({
            params: {
                pPlanGroupId: modelPlanGroup.get('planGroupId')
            }
        });
    },

    onAdd: function(){
        var me = this,
            view = me.getView(),
            pageView,
            grid;

        if (view.xtype == 'plan-group-prescriberdrugoverride'){
            pageView = view;
            grid = button.up().up();
        }
        else {
            pageView = view.up('#plan-prescriberdrugoverride');
            grid = view;
        }

        var plugin = grid.getPlugin(),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride'),
            planGroup = me.retrievePlanGroup(),
            title = grid.getTitle(),
            selectedRecOverrideRules = pageView.down('[title = Prescriber Drug Override Rules]').getSelection();

        if (!planGroup){
            Ext.Msg.alert('Plan Group', 'Please select a plan group first');
            return;
        }

        me.stopEdit(plugin);

        switch (title){
            case 'Prescriber Drug Override Rules':
                var editedBottomGrids = me.editsToBottomGrid('adding');

                if (editedBottomGrids){
                    return;
                }

                var modelOverrideRule = Ext.create('Atlas.plan.model.PrescriberDrugOverrideModel');

                modelOverrideRule.set('PrescDrugOverrideRuleName', '');
                modelOverrideRule.set('PrescDrugOverrideRuleID', 0);
                modelOverrideRule.set('TerminationDate', '');
                modelOverrideRule.set('EffectiveDate', '');

                storeOverrideRules.insert(0, modelOverrideRule);

                storeSpecPresc.removeAll();
                storeSpecPresc.commitChanges();
                storeDrugOverride.removeAll();
                storeDrugOverride.commitChanges();

                break;

            case 'Specialty ~ Prescribers':
                if (selectedRecOverrideRules.length != 1){
                    Ext.Msg.alert('Plan Group', 'Please select one Override Rule to add associated Prescriber Rules to');
                    return;
                }
                if (pageView.addedRowsOverrideRules){
                    Ext.Msg.alert('Plan Group', 'Please save the Override Rule before adding the Prescriber Override');
                    return;
                }

                var modelSpecPresc = Ext.create('Atlas.plan.model.DrugOverrideNPIXref');

                modelSpecPresc.set('systemId', 0);
                modelSpecPresc.set('NPI', '');
                modelSpecPresc.set('specialtyName', '');

                storeSpecPresc.insert(0, modelSpecPresc);

                break;

            case 'Drug Override':
                if (selectedRecOverrideRules.length != 1){
                    Ext.Msg.alert('Plan Group', 'Please select one Override Rule to add associated Drug Overrides to');
                    return;
                }
                if (pageView.addedaddedRowsOverrideRulesRows){
                    Ext.Msg.alert('Plan Group', 'Please save the Override Rule before adding the Drug Override');
                    return;
                }

                var modelDrugOverride = Ext.create('Atlas.plan.model.DrugOverrideGCNXref');

                modelDrugOverride.set('systemid', 0);
                modelDrugOverride.set('GCN_SEQNO', 0);
                modelDrugOverride.set('GNN60', '');

                storeDrugOverride.insert(0, modelDrugOverride);

                break;
        }
        plugin.startEdit(0);
    },

    onRemoveButtonClick: function(button){
        var me = this,
            view = me.getView(),
            pageView,
            grid,
            planGroup = me.retrievePlanGroup();

        function checkSelectedRecords(typeOfSelection){
            if (selectedRecords.length === 0){
                Ext.Msg.alert('Plan Group', 'Please select ' + typeOfSelection + ' to remove');
                return;
            }
        }

        if (!planGroup){
            Ext.Msg.alert('Plan Group', 'Please select a plan group first');
            return;
        }

        if (view.xtype == 'plan-group-prescriberdrugoverride'){
            pageView = view;
            grid = button.up().up();
        }
        else {
            pageView = view.up('#plan-prescriberdrugoverride');
            grid = view;
        }

        var title = grid.getTitle(),
            selectedRecords = grid.getSelection(),
            store = grid.getStore(),
            plugin = grid.getPlugin(),
            saveBtn = pageView.down('#planDrugOverrideSave'),
            cancelBtn = pageView.down('[text = Cancel]'),
            selectedRecordsOverrideRules = pageView.down('[title = Prescriber Drug Override Rules]').getSelection(),
            gridSpecPresc = pageView.down('[title = Specialty ~ Prescribers]'),
            gridDrugOverride = pageView.down('[title = Drug Override]');

        switch(title){
            case 'Prescriber Drug Override Rules':
                checkSelectedRecords('an Override Rule');

                var editedBottomGrids = me.editsToBottomGrid('removing');
                if (editedBottomGrids){
                    return;
                }

                for (var idx = 0, length = selectedRecordsOverrideRules.length; idx < length; idx = idx + 1){
                    var storeSpecPresc = me.retrieveStore('specPresc'),
                        storeDrugOverride = me.retrieveStore('drugOverride');

                    if ((selectedRecordsOverrideRules[idx].get('PrescDrugOverrideRuleID') == gridSpecPresc.gridDrugOverrideRuleId) || (selectedRecordsOverrideRules[idx].get('PrescDrugOverrideRuleID') == gridDrugOverride.gridDrugOverrideRuleId)){
                        storeSpecPresc.removeAll();
                        storeDrugOverride.removeAll();

                        gridSpecPresc.gridDrugOverrideRuleId = null;
                        gridDrugOverride.gridDrugOverrideRuleId = null;

                        break;
                    }
                }

                break;


            case 'Specialty ~ Prescribers':
                checkSelectedRecords('a Prescriber');
                break;

            case 'Drug Override':
                checkSelectedRecords('a Drug Override');
                break;
        }

        me.stopEdit(plugin);

        store.remove(selectedRecords);

        saveBtn.enable();
        cancelBtn.enable();
    },

    selectOverrideRules: function(table, td, cellIndex, model /*rowModel, model, index*/){
        var me = this,
            view = me.getView(),
            ruleId = model.get('PrescDrugOverrideRuleID'),
            gridOverrideRules = view.getReferences().gridOverrideRules,
            pluginGridOverrideRules = gridOverrideRules.getPlugin('planOverrideRulesRowEdit');

        var editedBottomGrids = me.editsToBottomGrid('selecting');
        if (editedBottomGrids){
            return;
        }
        else if (pluginGridOverrideRules.editing){
            // var editingRecord = pluginGridOverrideRules.context.record;

            Ext.Msg.alert('Alert', 'Please complete your current edit before switching rules');

            return;
        }

        if (view.prescDrugRuleId != ruleId){
            view.prescDrugRuleId = ruleId;

            if (ruleId > 0){
                var storeSpecPresc = me.retrieveStore('specPresc'),
                    storeDrugOverride = me.retrieveStore('drugOverride'),
                    gridSpecPresc = view.down('[title = Specialty ~ Prescribers]'),
                    gridDrugOverride = view.down('[title = Drug Override]');

                gridSpecPresc.gridDrugOverrideRuleId = ruleId;
                gridDrugOverride.gridDrugOverrideRuleId = ruleId;

                var params = {
                    pPrescDrugOverrideRuleID: ruleId
                };

                storeSpecPresc.load({
                    params: params
                });
                storeDrugOverride.load({
                    params: params
                });
            }
        }
    },

    editsToBottomGrid: function(userAction){
        var me = this,
            view = me.getView(),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride'),
            gridOverrideRules;

        if (view.getItemId() == 'plan-prescriberdrugoverride'){
            pageView = view;
            gridOverrideRules = view.down('[title = Prescriber Drug Override Rules]');
        }
        else {
            pageView = view.up('#plan-prescriberdrugoverride');
            gridOverrideRules = view;
        }

        if (!(storeOverrideRules.getAt(0)) || (storeOverrideRules.getAt(0).get('PrescDrugOverrideRuleName') == '')){
            return false;
        }

        if ((storeSpecPresc.getModifiedRecords().length > 0) || (storeSpecPresc.getRemovedRecords().length > 0) || (storeDrugOverride.getModifiedRecords().length > 0) || (storeDrugOverride.getRemovedRecords().length > 0)){
            var storeOverrideRules = me.retrieveStore('overrideRules'),
                prevSelectedRecord = storeOverrideRules.findRecord('PrescDrugOverrideRuleID', pageView.prescDrugRuleId, 0, false, true, true),
                selModel = gridOverrideRules.getSelectionModel();

            selModel.select(prevSelectedRecord);

            Ext.Msg.alert ('Alert', 'Please save or cancel your changes before ' + userAction + ' another rule');
            return true;
        }
        else {
            return false;
        }
    },

    editRow: function(editor, context){
        var me = this,
            grid = me.getView(),
            viewPage = grid.up('#plan-prescriberdrugoverride'),
            saveBtn = viewPage.down('#planDrugOverrideSave'),
            cancelBtn = viewPage.down('[text = Cancel]'),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride');

        if ((storeOverrideRules.getNewRecords().length > 0) || (storeSpecPresc.getNewRecords().length > 0) || (storeDrugOverride.getNewRecords().length > 0) || (storeOverrideRules.getUpdatedRecords().length > 0) || (storeSpecPresc.getUpdatedRecords().length > 0) || (storeDrugOverride.getUpdatedRecords ().length > 0)){
            if ((storeOverrideRules.getUpdatedRecords().length > 0) || (storeSpecPresc.getUpdatedRecords().length > 0) || (storeDrugOverride.getUpdatedRecords ().length > 0)){
                viewPage.updatedRows = true;
            }
            if (storeOverrideRules.getNewRecords().length > 0){
                var newRecs = storeOverrideRules.getNewRecords();

                viewPage.addedRowsOverrideRules = true;

                for(var idx = 0, length = newRecs.length; idx < length; idx = idx + 1){
                    if(context.record == newRecs[idx]){
                        storeSpecPresc.removeAll();
                        storeDrugOverride.removeAll();
                        break;
                    }
                }
            }
            saveBtn.enable();
            cancelBtn.enable();
        }
        else {
            saveBtn.disable();
            cancelBtn.disable();
        }
    },

    enablePrescriberName: function(){
        var me = this,
            col = me.getView().down('[text = Prescriber Name]'),
            editor = col.getEditor();

        editor.disable();
    },

    disablePrescriberName:function(edit, context){
        var me = this,
            col = me.getView().down('[text = Prescriber Name]'),
            editor = col.getEditor();

        editor.enable();
    },

    enableDrugGCN: function(){
        var me = this,
            col = me.getView().down('[text = Drug GCN]'),
            editor = col.getEditor();

        editor.enable();
    },

    disableDrugGCN: function(){
        var me = this,
            col = me.getView().down('[text = Drug GCN]'),
            editor = col.getEditor();

        editor.disable();
    },

    selectCbxVal:function(cbx, record){
        var me = this,
            displayfield,
            fieldToUpdate;

        if(cbx.getItemId() == 'prescriberTypeAhead'){
            displayfield = me.getView().down('[text = Prescriber Name]');
            fieldToUpdate = record.get('fullname');
        }
        else{
            displayfield = me.getView().down('[text = Drug GCN]');
            fieldToUpdate = record.get('GCN_SEQNO');
        }

        var displayEditor = displayfield.getEditor();

        displayEditor.setValue(fieldToUpdate);
    },

    saveBtn: function(btnSave){
        var me = this,
            view = me.getView(),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride'),
            success = true,
            btnAdd = view.down('#planDrugOverrideSave'),
            btnCancel = view.down('[text = Cancel]');

        function saveStore(store, uri, tempTable, params){
            if (store.getModifiedRecords() || store.getRemovedRecords()){
                var deletedRecs;
                var saveAction =[{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                if (store.getRemovedRecords()){
                    deletedRecs = true;
                }
                else{
                    deletedRecs = false;
                }

                var save = Atlas.common.utility.Utilities.saveData([store], uri, tempTable,[deletedRecs], params,
                    saveAction, null);



                if (save.message == 'Success.'){
                    success = true;
                }
                else{
                    success = false;
                }
            }
        }

        saveStore(storeOverrideRules, 'plan/rx/prescoverriderules/update', 'ttPrescOverrideRules', {'pPlanGroupId': view.planGroupId}, 'Override Rules');
        if (!success){
            Ext.Msg.alert('PBM', 'Override Rules save not successful');
            return;
        }

        saveStore(storeSpecPresc, 'plan/rx/prescdrugoverridenpixref/update', 'ttPrescDrugOverrideNPIXref', {'pPrescDrugOverrideRuleID': view.prescDrugRuleId});
        if (!success){
            Ext.Msg.alert('PBM', 'Prescriber Rules save not successful');
            return;
        }

        saveStore(storeDrugOverride, 'plan/rx/prescdrugoverridegcnxref/update', 'ttPrescDrugOverrideGCNXref', {'pPrescDrugOverrideRuleID': view.prescDrugRuleId});
        if (!success){
            Ext.Msg.alert('PBM', 'Drug Override save not successful');
            return;
        }

        Ext.Msg.alert('PBM', 'Updated Successfully');

        // storeOverrideRules.reload();
        // storeSpecPresc.reload();
        // storeDrugOverride.reload();

        if(view.addedRowsOverrideRules){
            storeOverrideRules.reload();
        }
        else{
            storeOverrideRules.onAfter('load', 'reselectOverrideRuleAfterSave');
            storeOverrideRules.reload();
            storeSpecPresc.reload();
            storeDrugOverride.reload();
        }
        view.updatedRows = false;
        view.addedRowsOverrideRules = false;
        btnAdd.disable();
        btnCancel.disable();
    },

    reselectOverrideRuleAfterSave: function(storeOverrideRules){
        var me = this,
            grid = me.getView(),
            view = grid.up('#plan-prescriberdrugoverride'),
            prescDrugRuleId = view.prescDrugRuleId,
            selRecord = storeOverrideRules.findRecord('PrescDrugOverrideRuleID', prescDrugRuleId, 0, false, true, true);

        storeOverrideRules.unAfter('load', 'reselectOverrideRuleAfterSave');

        grid.setSelection(selRecord);
    },

    cancelBtn: function(button){
        var me = this,
            view = me.getView(),
            storeOverrideRules = me.retrieveStore('overrideRules'),
            storeSpecPresc = me.retrieveStore('specPresc'),
            storeDrugOverride = me.retrieveStore('drugOverride');

        storeOverrideRules.rejectChanges();
        storeSpecPresc.rejectChanges();
        storeDrugOverride.rejectChanges();

        // pageView.updatedRows = false;
        // pageView.addedRowsOverrideRules = false;
        view.updatedRows = false;
        view.addedRowsOverrideRules = false;
    },

    renderDates: function(value){
        if (value){
            var fullDate = new Date(value),
                localDate = Ext.Date.utcToLocal(fullDate);
            return Ext.util.Format.date(localDate, 'm/d/Y');
        }
    },

    retrieveStore: function(storeName){
        var viewPage,
            initialView;

        if (this.isController){
            initialView = this.getView();
        }
        else {
            initialView = this;
        }

        if (initialView.xtype == 'plan-group-prescriberdrugoverride'){
            viewPage = initialView;
        }
        else{
            viewPage = initialView.up('#plan-prescriberdrugoverride');
        }

        switch (storeName){
            case 'overrideRules':
                return viewPage.down('[title = Prescriber Drug Override Rules]').getViewModel().getStore(storeName);

            case 'specPresc':
                return viewPage.down('[title = Specialty ~ Prescribers]').getViewModel().getStore(storeName);

            case 'drugOverride':
                return viewPage.down('[title = Drug Override]').getViewModel().getStore(storeName);

            case 'excludedPlanBenefit':
                return viewPage.down('[title = Prescriber Drug Override Rules]').getViewModel().getStore(storeName);

            case 'specList':
                return viewPage.down('[title = Specialty ~ Prescribers]').getViewModel().getStore(storeName);
        }
    },

    stopEdit: function(plugin){
        if (plugin.editing){
            plugin.cancelEdit();
        }
    },

    cancelEdit: function(plugin){
        var me = this,
            store,
            record = plugin.context.record;

        if(record.phantom){
            if ((plugin.id === 'planSpecPrescRowEdit') && (!(record.get('NPI')))){
                store = me.retrieveStore('specPresc');
            }
            else if ((plugin.id === 'planOverrideRulesRowEdit') && (!(record.get('PrescDrugOverrideRuleName')))){
                store = me.retrieveStore('overrideRules');
            }
            else if ((plugin.id === 'planDrugOverrideEdit') && (!(record.get('GNN60')))){
                store = me.retrieveStore('drugOverride');
            }
            store.remove(plugin.context.record);
        }
    },

    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
    }
});