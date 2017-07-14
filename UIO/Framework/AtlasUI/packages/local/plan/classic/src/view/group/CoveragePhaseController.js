Ext.define('Atlas.plan.view.group.CoveragePhaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-coveragephase',
    // listen: {
    //     controller: {
    //         '*': {
    //             groupchange: 'init'
    //
    //         }
    //     }
    // },

    init: function () {
       // debugger;
        var me = this;
        //var canEdit = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('canEdit');

        var planGroupRecord = me.retrievePlanGroup(),
        planStatus = 'I',
        pPlanGroupId = -1;


        if(planGroupRecord) {
            planStatus = planGroupRecord.get('planGroupStatus');
            pPlanGroupId = planGroupRecord.get('planGroupId');
        }

        var canEdit = false;
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        /*if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/

        if (planStatus == 'A' && !atlasRecord) // Active
        {
            canEdit = true ;
        }
        this.getView().canEdit = canEdit;

        if (canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('CoveragePhasegrid',true);
        }
        else {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('CoveragePhasegrid', false);
        }
        if(atlasRecord)
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('CoveragePhasegrid',true);
        }


        if(pPlanGroupId > -1) {

            var storeCoverage = me.getViewModel().get('coveragephases');
            storeCoverage.getProxy().setExtraParam('pPlanGroupId', pPlanGroupId);
            storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0);
            storeCoverage.load();

            // me.enableDisableitems('btnSave',true);
            //
            // me.enableDisableitems('btnCancel',true);
        }
        
    },


    coverageCodeRenderer: function(value){
        //debugger;
        if(value!=null) {
            var cvrgCodes = this.getViewModel().get('coveragecodes');
            if(cvrgCodes!=null ) {
                var cvrgCode = cvrgCodes.findRecord('value', value);
                if(cvrgCode !=null) {
                    var cvrgCodeName = cvrgCode.get('name');
                    if(cvrgCodeName!=null)
                        return cvrgCodeName;
                }
            }
        }
        return '';
    },

    onUndoChangeClick:function(button)
    {

        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {

            var grid = this.lookupReference('CoveragePhasegrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },

    onAdd:function()
    {
        if(!this.addedRow) {
            var me = this,
                grid = this.lookupReference('CoveragePhasegrid').getView(),
                store = grid.getStore(),
                newRecord = new Atlas.plan.model.CoveragePhase();
            newRecord.set('planBenefitId','');
            store.insert(0, newRecord);
            this.lookupReference('CoveragePhasegrid').getPlugin('rowEditing').startEdit(newRecord, 0);
            this.getCoveragePhaseRecord().set('isNew', true);
            this.addedRow = true;
        }
    },

    cancelEditButton: function(editor, context) {

        if(context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
        if(this.addedRow)
        {
            this.addedRow =false;
        }
    },

    setVisibility:function()
    {
        //debugger;
    },

    completeEdit:function(editor, context)
    {

        var grid = this.lookupReference('CoveragePhasegrid').getView();
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
        }

        var curSelModel = grid.getSelectionModel().getSelection()[0];
        var curRow = grid.getSelectionModel().getSelection()[0];
        this.addedRow =false;
        grid.up().findPlugin('rowediting').cancelEdit();
    },

    beforeEdit:function(editor,context)
    {
        //debugger;

        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('CoveragePhasegrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
        else {
            var planBenefitIdField = this.lookupReference('CoveragePhasegrid').getView().up().getPlugin('rowEditing').editor.form.findField('planBenefitId');
            if (context && context.record && context.record.phantom) {
                planBenefitIdField.enable();
            }
            else {
                planBenefitIdField.disable();
            }
        }

    },


    onRemoveButtonClick:function (){

        var me = this;
        var vm = this.getViewModel(),

        grid = this.lookupReference('CoveragePhasegrid').getView();
        grid.up().findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        if(sm.getSelection().length >0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }
        }
        else {
            Ext.MessageBox.alert("PBM - Error", 'Please select the plan coverage phase to delete');

        }
    },

    getCoveragePhaseRecord: function(){

        var grid = this.lookupReference('CoveragePhasegrid');
        if(grid){
            return grid.getSelection()[0];
        }
    },

    onMasterCancelClick:function()
    {
        //debugger;
        var me = this;
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Are you sure you want to cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {


                    var planGroupRecord = me.retrievePlanGroup(),
                    pPlanGroupId = 0;


                    if( planGroupRecord!=null )
                        pPlanGroupId = planGroupRecord.get('planGroupId');

                    var storeCoverage = me.getViewModel().get('coveragephases');
                    storeCoverage.getProxy().setExtraParam('pPlanGroupId',  pPlanGroupId);
                    storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0 );
                    storeCoverage.load();


                    if (me.getView().canEdit) {
                        me.getViewModel().set('canEdit', true);
                        me.getViewModel().set('isEditing', false);
                        me.enableDisableitems('CoveragePhasegrid',true);
                    }
                    else {
                        me.getViewModel().set('canEdit', false);
                        me.getViewModel().set('isEditing', true);
                        me.enableDisableitems('CoveragePhasegrid', false);
                    }




                } else {
                    console.log('No pressed');
                }
            }
        });
    },

    onSaveClick: function (button) {
        //debugger;
        var me = this;
        this.saveList();
        if (me.getView().canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('CoveragePhasegrid',true);
        }
        else {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('CoveragePhasegrid', false);
        }


    },


    saveList: function(){
        //debugger;
        var me = this,
            storeCoverage = this.lookupReference('CoveragePhasegrid').getView().getStore(),
            planGroupRecord = me.retrievePlanGroup(),
            pPlanGroupId = 0;

        if( planGroupRecord!=null )
            pPlanGroupId = planGroupRecord.get('planGroupId');

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData(
            [storeCoverage],
            'plan/rx/plancoveragephases/update',
            'ttPlanCoveragePhases',
            [true],
            {'pPlanGroupId':pPlanGroupId},
            saveAction,
            null
        );

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }

        storeCoverage.getProxy().setExtraParam('pPlanGroupId',  pPlanGroupId);
        storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0 );
        storeCoverage.load();
    },


    onAdminEditClick: function (button) {
        var me = this;

        me.getViewModel().set('canEdit', false);
        me.getViewModel().set('isEditing', true);
        me.enableDisableitems('CoveragePhasegrid', false);

    },

    planBenefitRenderer:function(value)
    {
        //debugger;
        if(value) {
            if (value == '0') {
                return 'ALL';
            }
            else {
                var plnBnftList = this.getViewModel().get('plangroupbenefits');
                if (plnBnftList != null) {
                    var plnBnfItem = plnBnftList.findRecord('planBenefitId', value, 0, false, false, true);
                    if (plnBnfItem != null) {
                        var plnBnfItemName = plnBnfItem.get('benefitName');
                        if (plnBnfItemName != null)
                            return plnBnfItemName;
                    }
                }
            }
        }
        return '';

    },
    enableDisableitems:function(cmponent,value)
    {
        var adminBtn = this.lookupReference(cmponent);
        adminBtn.setDisabled(value);
    },
    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();

    }

});