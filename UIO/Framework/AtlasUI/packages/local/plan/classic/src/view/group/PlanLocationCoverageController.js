/**
 * Created by S4505 on 11/9/2016.
 */



Ext.define('Atlas.plan.view.group.PlanLocationCoverageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-planlocationcoverage',
    // listen: {
    //     controller: {
    //         '*': {
    //             groupchange: 'init'
    //
    //         }
    //     }
    // },
    init: function () {
        //debugger;

        var me = this,
            storeplanLocationCoverage = this.getViewModel().get('planlocationcoverage'),
            storeStates = this.getViewModel().get('states'),
            //planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
            planGroupRecord = me.retrievePlanGroup(),
            //canEdit = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('canEdit');
            canEdit = false,
            planStatus = 'I';

        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        if(planGroupRecord)
            planStatus = planGroupRecord.get('planGroupStatus');

        if (planStatus == 'A' && !atlasRecord) // Active
        {
            canEdit = true ;
        }
        this.getView().canEdit = canEdit;


        if(canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('planLocationCoverageStateGrid',true);
            me.enableDisableitems('availableCountyGrid',true);
            me.enableDisableitems('assignedCountyGrid',true);
        }
        else
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('planLocationCoverageStateGrid',false);
            me.enableDisableitems('availableCountyGrid',false);
            me.enableDisableitems('assignedCountyGrid',false);
        }
        if(atlasRecord)
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('planLocationCoverageStateGrid',true);
            me.enableDisableitems('availableCountyGrid',true);
            me.enableDisableitems('assignedCountyGrid',true);
        }

       /* var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/
        me.getViewModel().set('isDataModified', false);


        if( planGroupRecord!=null ) {
            storeplanLocationCoverage.getProxy().setExtraParam('pPlanGroupId', planGroupRecord.get('planGroupId'));

            storeStates.load();


            var planLocationCoverageState = me.getViewModel().get('planlocationcoveragestate');
            planLocationCoverageState.loadData([],false);

            storeplanLocationCoverage.load({
                callback: function (recordInfo, operation, success) {

                    if(storeplanLocationCoverage !=null && storeplanLocationCoverage.data !=null && storeplanLocationCoverage.data.items.length == 0 && recordInfo.length > 0 )
                    {
                        storeplanLocationCoverage.data.items = recordInfo;
                    }

                    // var planLocationCoverageState = me.getViewModel().get('planlocationcoveragestate');
                    if(storeplanLocationCoverage !=null && storeplanLocationCoverage.data !=null && storeplanLocationCoverage.data.items.length >0)
                    {
                        // planLocationCoverageState.loadData([],false);
                        me.lookupReference('planLocationCoverageStateGrid').bindStore(planLocationCoverageState);


                        var stateList =[];
                        var tempList = storeplanLocationCoverage.collect('planCoverageState');
                        for(var item in tempList)
                        {
                            var state = {};
                            state.stateCode = tempList[item];
                            state.isUpdated = false;
                            state.isExisting = true;
                            stateList.push(state);
                        }

                        planLocationCoverageState.loadData(stateList);
                        planLocationCoverageState.sort('stateCode', 'ASC');

                        me.lookupReference('planLocationCoverageStateGrid').getSelectionModel().select(0, true);
                    }

                    else
                    {
                        var storeCounty = me.getViewModel().get('countybystate');
                        if(storeCounty) {
                            storeCounty.loadData([],false);
                        }

                    }
                }

            });
        }
    },

    planCoverageStateRenderer: function(value)
    {
        return value;
    },

    onUndoChangeClick:function(button)
    {

        var me = this;
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Are you sure you want to cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    var storeplanLocationCoverage = me.getViewModel().get('planlocationcoverage');
                    if (storeplanLocationCoverage != null) {
                        storeplanLocationCoverage.clearFilter();
                    }


                    var grid = me.lookupReference('planLocationCoverageStateGrid').getView();
                    var gridSelectedRows = grid.getSelection();
                    var selectedRow = gridSelectedRows[0];
                    var isExistingrecord = selectedRow.get('isExisting');

                    if (isExistingrecord) {

                        selectedRow.set('isUpdated', false);


                        var theStore = me.getView().up('panel').getViewModel().getStore('planlocationcoverage');
                        var DeletedRecords = theStore.getRemovedRecords();

                        var currentrecords = theStore.getRange();

                        var storeCounty = me.getViewModel().get('countybystate');


                        for (var idx2 = 0; idx2 < DeletedRecords.length; idx2++) {

                            var deleteRecord = DeletedRecords[idx2];
                            theStore.add(deleteRecord);

                            if (storeCounty) {
                                var itemToRemove = storeCounty.findRecord('value', deleteRecord.data.planCoverageCounty, 0, false, false, true);
                                if (itemToRemove) {
                                    storeCounty.remove(itemToRemove);
                                }
                            }

                        }

                        for (var idx1 = 0; idx1 < currentrecords.length; idx1 = idx1 + 1) {
                            var record = currentrecords[idx1];

                            if (record.phantom) {

                                var removedRecord = new Atlas.common.model.County;
                                removedRecord.data.value = record.data.planCoverageCounty;
                                removedRecord.data.name = record.data.planCoverageCountyDesc;

                                record.reject();
                                theStore.remove(record);

                                if (storeCounty) {
                                    storeCounty.add(removedRecord);
                                }


                            }
                        }


                        if (storeCounty) {
                            storeCounty.sort('name', 'ASC');
                        }
                    }
                    else
                    {
                        grid.store.remove(selectedRow);

                        me.getViewModel().set('isDataModified', false); // need this here to make sure the select will work;

                        if(grid.store.getCount() >0)
                        {
                            grid.getSelectionModel().select(0, true);
                        }
                        else
                        {
                            me.loadCountyByState('');

                        }

                    }

                    me.getViewModel().set('isDataModified', false);
                }


            }
        });
    },


    cancelEditButton: function(editor, context) {

        var me = this;
        var vm = this.getViewModel(),
            parentVm = this.getView().up('panel').getViewModel(),
            gridStore = parentVm.getStore('planlocationcoveragestate'),
            curRowModel = gridStore.getAt(context.rowIdx);

        if(curRowModel.phantom){
            gridStore.remove(curRowModel);
        }

        me.getViewModel().set('isDataModified', false);
    },


    completeEdit:function(editor, context)
    {
        var grid = this.lookupReference('planLocationCoverageStateGrid').getView();
        var gridColumns = grid.headerCt.getGridColumns();
        var planLocationCoverageState = grid.getStore();

        if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);

        }
        this.loadCountyByState(context.record.data.stateCode);

        //planLocationCoverageState.reload();
    },


    beforeEdit:function(editor,context)
    {
        //debugger;

        var planBenefitIdField = this.lookupReference('planLocationCoverageStateGrid').getView().up().getPlugin('rowEditing').editor.form.findField('coverageState');
        if(context !=null && context.record!=null && !context.record.data.stateCode)
            return true;
        else
            return false;

    },

    validateEdit:function (editor,context,eOpts) {

        var newrecord = editor.context.newValues,
            grid = this.lookupReference('planLocationCoverageStateGrid').getView(),
            theStore = grid.getStore();

        var recordIndex = theStore.findBy(
            function(record, id)
            {
                if(record.get('stateCode') == newrecord.stateCode)
                {
                    return true;  // a record with this data exists
                }
                return false;  // there is no record in the store with this data
            }
        );

        if(recordIndex != -1 && recordIndex != context.rowIdx){
            Ext.Msg.alert("PBM", 'Record already exist for this State');
            //theStore.removeAt(context.rowIdx);
            grid.up().findPlugin('rowediting').cancelEdit();
            return false;
        }
        return true;
    },

    onMasterCancelClick:function()
    {
        var me = this,
            storeplanLocationCoverage = this.getViewModel().get('planlocationcoverage'),
            storeStates = this.getViewModel().get('states');
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Are you sure you want to cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    var grid = me.lookupReference('planLocationCoverageStateGrid').getView();
                    var gridSelectedRows = grid.getSelection();
                    var selectedRow = gridSelectedRows[0];
                    selectedRow.set('isUpdated', false);

                    //me.reloadPlanLocationCoverage();
                    me.init();

                } else {
                    console.log('No pressed');
                }
            }
        });
    },




    onRemoveButtonClick:function (){
        //debugger;
        var me = this,
            vm = this.getViewModel(),
            grid = this.lookupReference('planLocationCoverageStateGrid').getView(),
            theOldStore = this.getView().up('panel').getViewModel().getStore('planlocationcoverage'),
            sm = grid.getSelectionModel(),
            planGroupRecord = this.retrievePlanGroup() ,
            planGroupId = 0,
            stateCode = sm.getSelection()[0].data.stateCode;

        if( planGroupRecord!=null )
            planGroupId = planGroupRecord.get('planGroupId');

        Ext.Msg.show({
            title: 'Confirm?',
            message: 'Are you sure to delete all Coverages for this state?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            fn: function (btn) {
                //debugger;
                if (btn === 'yes') {
                    grid.up().findPlugin('rowediting').cancelEdit();
                    sm.getSelection()[0].data.IsDeleted = true;

                    var theStore = new Atlas.plan.store.PlanLocationCoverage;
                    if(theOldStore!=null) {
                        var records = theOldStore.getRange();

                        for (var i = 0; i < records.length; i++) {
                            var rec = records[i];

                            if(!rec.dirty){
                                rec.dirty = true;
                            }
                            theStore.add(rec);
                        }
                    }

                    var saveAction = [{
                        "Create": {"key": 'pMode', "value": 'A'},
                        "Update": {"key": 'pMode', "value": 'U'},
                        "Delete": {"key": 'pMode', "value": 'D'}
                    }];

                    var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/planlocationcoverage/update', 'ttPlanLocationCoverage', [true],
                    {
                        'pPlanGroupId': planGroupId, 'pState': stateCode,'pMode':'D'
                    },
                    saveAction, null);

                    grid.store.remove(sm.getSelection()[0]);
                    me.loadCountyByState('');
                    //me.reloadPlanLocationCoverage();
                    me.init();

                } else {
                    console.log('No pressed');
                }
            }
        });



    },

    getplanLocationCoverageStateRecord: function(){

        var grid = this.lookupReference('planLocationCoverageStateGrid').getView();
        if(grid){
            return grid.getSelection()[0];
        }
    },

    getSelectedAvailableCountyRecord: function(){

        var grid = this.lookupReference('availableCountyGrid').getView();
        if(grid){
            return grid.getSelection();
        }
    },

    getSelectedAssignedCountyRecord: function(){

        var grid = this.lookupReference('assignedCountyGrid').getView();
        if(grid){
            return grid.getSelection();
        }
    },

    onAdd:function()
    {


        if(!this.getViewModel().get('isDataModified')) {
            var me = this,
                store = this.getView().up('panel').getViewModel().getStore('planlocationcoveragestate'),
                newRecord = new Atlas.plan.model.PlanLocationCoverageState();

            store.insert(0, newRecord);

            this.lookupReference('planLocationCoverageStateGrid').getPlugin('rowEditing').startEdit(newRecord, 0);

            this.getplanLocationCoverageStateRecord().set('isNew', true);
            this.getplanLocationCoverageStateRecord().set('isUpdated', true);
            this.getplanLocationCoverageStateRecord().set('isExisting', false);


            this.addedRow = true;

            this.getViewModel().set('isDataModified', true);
        }
        else
        {
            Ext.Msg.show({
                title: 'Message',
                message: 'Please complete edit current record before proceed?',
                buttons: Ext.Msg.OK
            });
        }

        //this.lookupReference('planLocationCoverageStateGrid').getStore().reload();

    },

    onSaveClick: function (button) {
        var me = this;
        me.saveList();

    },
    saveList: function(){
       //debugger;

       // var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ,
        var planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0,
            stateCode = 0;

        if( planGroupRecord!=null )
            planGroupId = planGroupRecord.get('planGroupId');
            //planGroupId = planGroupRecord.data.planGroupId;


        var theStore = this.getView().up('panel').getViewModel().getStore('planlocationcoverage'),
            newRecords = theStore.getNewRecords(),
            updatedRecords = theStore.getUpdatedRecords();

        var slectedState = this.getplanLocationCoverageStateRecord();
        var isNewState = false;
        if(slectedState!=null)
        {
            stateCode= slectedState.data.stateCode;
            isNewState = slectedState.get('isNew');
        }

        var theNewStore = new Atlas.plan.store.PlanLocationCoverage;

        var currentrecords = theStore.getRange();

        for (var idx1 = 0; idx1 < currentrecords.length; idx1 = idx1 + 1){

            theNewStore.add(currentrecords[idx1]);
        }


        var saveAction = [{
            "Create": {"key": 'pMode', "value": 'A'},
            "Update": {"key": 'pMode', "value": 'U'},
            "Delete": {"key": 'pMode', "value": 'D'}
        }];


        var records = theNewStore.getRange();
        if(!isNewState || records.length > 0 ) {
            for (var i = 0; i < records.length; i++) {
                var rec = records[i];

                if (!rec.dirty) {
                    rec.dirty = true;
                }
            }

            var mode = 'A';
            if (records.length == 0)
                mode = 'D';


            var testReturn = Atlas.common.utility.Utilities.saveData([theNewStore], 'plan/rx/planlocationcoverage/update', 'ttPlanLocationCoverage', [true],
                {
                    'pPlanGroupId': planGroupId, 'pState': stateCode, 'pMode': mode
                },
                saveAction, null);

            if (theStore != null) {
                theStore.clearFilter();
            }


            var grid = this.lookupReference('planLocationCoverageStateGrid').getView();
            var gridSelectedRows = grid.getSelection();
            var selectedRow = gridSelectedRows[0];
            selectedRow.set('isUpdated', false);

            //this.reloadPlanLocationCoverage();
            this.init();
        }
        else
        {
            Ext.Msg.show({
                title: 'Alert',
                message: 'Please select atleast one County.',
                buttons: Ext.Msg.OK
            });
        }

    },

    onAdminEditClick: function () {
        var me=this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
        me.enableDisableitems('planLocationCoverageStateGrid',false);
        me.enableDisableitems('availableCountyGrid',false);
        me.enableDisableitems('assignedCountyGrid',false);

    },

    onAssignCounty:function(){


        var me = this,
            availableCountyList = me.getViewModel().get('countybystate'),
            store = this.getView().up('panel').getViewModel().getStore('planlocationcoverage'),
            slectedState = this.getplanLocationCoverageStateRecord(),
            selectedCounties = this.getSelectedAvailableCountyRecord(),
            //planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
            planGroupRecord = me.retrievePlanGroup(),
            planGroupId = 0;


        if(planGroupRecord!=null)
        {
            //planGroupId = planGroupRecord.data.planGroupId;
            planGroupId = planGroupRecord.get('planGroupId');
        }

        if(selectedCounties && slectedState)
        {
            for(var i = 0 ; i< selectedCounties.length;i++) {

                var newRecord = new Atlas.plan.model.PlanLocationCoverage();

                newRecord.data.planCoverageCounty = selectedCounties[i].data.value;
                newRecord.data.planCoverageCountyDesc = selectedCounties[i].data.name;
                newRecord.data.planCoverageState = slectedState.data.stateCode;
                newRecord.data.PlanGroupId = planGroupId;
                newRecord.isNew = true;
                newRecord.dirty = true;

                store.insert(0, newRecord);
                store.sort('planCoverageCountyDesc', 'ASC');

                availableCountyList.remove(selectedCounties[i]);
            }
        }

        slectedState.set('isUpdated',true);
        this.addedRow = true;

        me.getViewModel().set('isDataModified', true);

        //this.lookupReference('planLocationCoverageStateGrid').getStore().reload();
    },

    onRemoveCounty:function(){

        var me = this,
            removeAssociatedCounties = me.getSelectedAssignedCountyRecord(),
            grid = this.lookupReference('assignedCountyGrid').getView();
        if(removeAssociatedCounties) {

            for(var i = 0 ; i< removeAssociatedCounties.length;i++) {

                removeAssociatedCounties[i].data.IsDeleted = true;
                removeAssociatedCounties[i].data.dirty = true;
                removeAssociatedCounties[i].set('isUpdated', true);

                grid.store.remove(removeAssociatedCounties[i]);

                var removedRecord = new Atlas.common.model.County;
                removedRecord.data.value = removeAssociatedCounties[i].data.planCoverageCounty;
                removedRecord.data.name = removeAssociatedCounties[i].data.planCoverageCountyDesc;
                var storeCounty = this.getViewModel().get('countybystate');
                if (storeCounty) {
                    storeCounty.add(removedRecord);
                    storeCounty.sort('name', 'ASC');
                }
            }

            this.getplanLocationCoverageStateRecord().set('isUpdated', true);
            me.getViewModel().set('isDataModified', true);
        }

    },


    enableDisableitems:function(cmponent,value)
    {
        var adminBtn = this.lookupReference(cmponent);
        adminBtn.setDisabled(value);

    },

    loadCountyByState:function(stateCode)
    {
        var storeCounty = this.getViewModel().get('countybystate');
        storeCounty.getProxy().setExtraParam('pState',stateCode);
        //storeCounty.load();

        var storeplanLocationCoverage = this.getViewModel().get('planlocationcoverage');

        if(storeplanLocationCoverage!=null)
        {
            storeplanLocationCoverage.clearFilter();
            storeplanLocationCoverage.filter(Ext.create('Ext.util.Filter', {
                property: "planCoverageState",
                value: stateCode,
                exactMatch: true
            }));

            storeCounty.load({
                callback: function () {
                    storeplanLocationCoverage.each(function(record)
                    {
                        var CountyToRemove= storeCounty.findRecord('value',record.data.planCoverageCounty);

                        if(CountyToRemove!=null)
                            storeCounty.remove(CountyToRemove);

                    });

                }
            });

        }

    },
    onStateSelect:function(grid , record , index , eOpts)
    {
        if(!this.getViewModel().get('isDataModified')) {
            this.loadCountyByState(record.data.stateCode);
         }
         else
        {
            Ext.Msg.show({
                title: 'Message',
                message: 'Please complete edit current record before proceed?',
                buttons: Ext.Msg.OK
            });
        }
    },

    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
    }


});