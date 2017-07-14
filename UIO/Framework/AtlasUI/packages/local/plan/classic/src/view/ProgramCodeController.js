/**
 * Created by b2352 on 12/21/2016.
 */


Ext.define('Atlas.plan.view.ProgramCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-programcode',

    init: function () {
        //debugger;
        var me = this,
            storePC = this.getViewModel().getStore('programcodes'),
            storePB = this.getViewModel().getStore('planbenefitlistItem'),
            storeRiders = this.getViewModel().getStore('plangroupriders'),
            storePlanGroups = this.getViewModel().getStore('plangroups');

        this.addedRow = false;

        storePC.getProxy().setExtraParam('pPlanGroupId', 0);
        storePC.getProxy().setExtraParam('pPlanBenefitId', 0);
        storePC.getProxy().setExtraParam('pCarrierID', 0);
        storePC.getProxy().setExtraParam('pCarrierAccountNumber', '');
        storePC.getProxy().setExtraParam('pLobID', 0);
        storePC.getProxy().setExtraParam('pagination', true);
        //storePC.getProxy().setExtraParam('pageSize', 18);
        storeRiders.load({
            scope: this,
            callback: function (records1, operation1, success) {

                storePB.load({
                    callback: function (records2, operation2, success) {

                        storePlanGroups.load({
                            callback: function (records3, operation3, success) {

                                storePC.load();

                            }});

                    }});

            }});

        //storePC.load();

    },
    /*beforeEdit: function (record) {
    },*/

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('PlanProgramGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }

        var planGroupId = context.record.get('planGroupId');
        var benefitList = this.getViewModel().getStore('planbenefitlistItem');
        if(benefitList)
        {
            benefitList.clearFilter();
            benefitList.filter(Ext.create('Ext.util.Filter', {
                property: "planGroupId",
                value: planGroupId,
                exactMatch: true
            }));
        }
        context.record.set('isEditing', true);

    },

    onAdd: function () {
        if(!this.addedRow ) {
            var me = this,
                grid = me.getView().down('grid');
            // debugger;
            var store = grid.getStore(),
                newRecord = Ext.create('Atlas.plan.model.PlanProgramCode', {});
            store.insert(0, newRecord);
            grid.getPlugin().startEdit(newRecord);

            grid.getSelection()[0].set('isNew', true);

            this.addedRow = true;
        }

    },
    cancelEditButton: function (editor, context) {
        //debugger;
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    onUndoChangeClick: function (button) {
        //debugger;
        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.lookupReference('PlanProgramGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },



    /*onUndoChangeClick: function (button) {
        //debugger;
        button.up().getViewModel().data.record.reject();
    },*/

    completeEdit: function (editor, context) {
       // debugger;
        if (context.record.dirty) {
            this.getPlanProgramRecord().set('isUpdated', true);
        }
        context.record.set('isEditing', false);
        this.addedRow = false;

    },
    onPlangroupSelect: function(combo,record){

        var planGroupId = record.get('planGroupId');
        var benefitList = this.getViewModel().getStore('planbenefitlistItem');
        if(benefitList)
        {
            benefitList.clearFilter();
            benefitList.filter(Ext.create('Ext.util.Filter', {
                property: "planGroupId",
                value: planGroupId,
                exactMatch: true
            }));
        }

    },


    getPlanProgramRecord: function () {

       // debugger;
        var grid = this.lookupReference('PlanProgramGrid');
        if (grid) {
            return grid.getSelection()[0];
        }
    },
    onSaveClick: function (button) {
        this.saveList();
    },
    saveList: function () {
        var theStore = this.getViewModel().get('programcodes');
        var saveAction = [{
            "Create": {"key": 'action ', "value": 'Add'},
            "Update": {"key": 'action ', "value": 'Update'},
            "Delete": {"key": 'action ', "value": 'Delete'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData(
            [theStore],
            'plan/rx/planprogramcodes/update',
            'ttPlanProgramCodes',
            [true],
            {},
            saveAction,
            null
        );
        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }

        theStore.load();

    },
    planBenefitRenderer: function (value) {
        if (value != 0) {
            var plnBnftList = this.getViewModel().get('planbenefitlistItem');
            if (plnBnftList != null) {
                var plnBnfItem = plnBnftList.findRecord('planBenefitId', value);
                if (plnBnfItem != null) {
                    var plnBnfItemName = plnBnfItem.get('BenefitName');
                    if (plnBnfItemName != null)
                        return plnBnfItemName;
                }
            }
            // var planBenefitStore =  this.getViewModel().getStore('planBenefitExt');
            // planBenefitStore.getProxy().setExtraParam('pWhere', 'planBenefitId=' + PlanBenefitId+ ' and planGroupId=' + PlanGroupId);
            // planBenefitStore.load({
            //     callback: function (recordInfo, operation, success) {
            //         //debugger;
            //         if (recordInfo && recordInfo.length > 0) {
            //             //PlanBenefitsParent.setSelection(recordInfo[0]);
            //             return recordInfo[0].data.BenefitName;
            //         }
            //
            //     }
            // });
        }
        return '';
    },
    planGroupNameRenderer: function (value,record) {
        if (value != 0) {
            var plnGrpNameList = this.getViewModel().get('planbenefitlistItem');
            if (plnGrpNameList != null) {
                var plnGrpNameItem = plnGrpNameList.findRecord('planGroupId', value);
                if (plnGrpNameItem != null) {
                    var plnGrpNameItemName = plnGrpNameItem.get('planGroupName');
                    if (plnGrpNameItemName != null)
                        return plnGrpNameItemName;
                }
            }
        }
        return '';
    }
    ,
    // planGroupNameRenderer: function (value) {
    //     //debugger;
    //     if (value != 0) {
    //         var plnGrpNameList = this.getViewModel().get('plangroups');
    //         if (plnGrpNameList != null) {
    //             var plnGrpNameItem = plnGrpNameList.findRecord('planGroupId', value,0,false,false,true);
    //             if (plnGrpNameItem != null) {
    //                 var plnGrpNameItemName = plnGrpNameItem.get('planGroupName');
    //                 if (plnGrpNameItemName != null)
    //                     return plnGrpNameItemName;
    //             }
    //         }
    //     }
    //     //return 'ALL';
    //     //debugger;
    //     //return value;
    // },
    groupRidersRenderer: function (value) {

        if (value != 0) {
            var groupRidersList = this.getViewModel().get('plangroupriders');
            if (groupRidersList != null) {
                var groupRidersItem = groupRidersList.findRecord('value', value,0,false,false,true);
                if (groupRidersItem != null) {
                    var groupRidersItemName = groupRidersItem.get('name');
                    if (groupRidersItemName != null)
                        return groupRidersItemName;
                }
            }
        }
        return '';
    },
    onRemoveButtonClick: function () {

        var me = this,
            grid = me.getView().down('grid');
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        if(sm.getSelection().length >0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }
        }
        else
        {
            Ext.MessageBox.alert("PBM - Error", 'Please select the plan program code to delete');
        }
    }

});