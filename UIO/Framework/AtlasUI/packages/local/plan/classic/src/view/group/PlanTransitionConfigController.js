/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.view.PlanTransitionConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-plantransitionconfig',

    init: function () {
        //debugger;
        var me = this;

        var planGroupRecord = me.retrievePlanGroup(),
            planStatus = 'I',
            pPlanGroupId = 0;

        if (planGroupRecord != null){

            planStatus = planGroupRecord.get('planGroupStatus');
            pPlanGroupId = planGroupRecord.data.planGroupId;
        }

        var canEdit = false;
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        if (planStatus == 'A'&& !atlasRecord) // Active
        {
            canEdit = true ;
        }
        this.getView().canEdit = canEdit;

        if (canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('PlanTransitionConfigGrid',true);
        }
        else {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('PlanTransitionConfigGrid', false);
        }
        if(atlasRecord)
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('PlanTransitionConfigGrid',true);
        }

        var storeTransConfig = this.getViewModel().get('plantransitionconfig');
        storeTransConfig.getProxy().setExtraParam('pPlanGroupID', pPlanGroupId);
        storeTransConfig.load();

    },
    onTransitionConfigAdminEdit: function (button) {
        //debugger;
        this.lookupReference('PlanTransitionConfigGrid').setDisabled(false);
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('PlanTransitionConfigGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
        else
        {
            context.record.set('isEditing', true);
        }

    },

    onAdd: function () {
        if(!this.addedRow) {
            var me = this,
                grid = me.getView().down('grid');

            //debugger;
            var store = grid.getStore(),
                newRecord = Ext.create('Atlas.plan.model.PlanTransitionConfig', {});

            store.insert(0, newRecord);
            grid.getPlugin('rowEditing').startEdit(newRecord, 0);
            this.getPlanTransitionConfigRecord().set('isNew', true);
            this.addedRow = true;
        }

    },
    cancelEditButton: function(editor, context) {

        if(context.record.phantom) {
            context.grid.store.removeAt(context.rowIdx);
        }
        else {
            context.record.reject();
            context.record.set('isEditing', false);
        }
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
            var grid = this.lookupReference('PlanTransitionConfigGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },
    completeEdit: function (editor, context) {
        // debugger;

        var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
            pPlanGroupId = 0;

        if (planGroupRecord != null)
            pPlanGroupId = planGroupRecord.data.planGroupId;

        if (context.record.dirty) {
            this.getPlanTransitionConfigRecord().set('isUpdated', true);
            this.getPlanTransitionConfigRecord().set('PlangroupId', pPlanGroupId);
        }

        context.record.set('isEditing', false);
        this.addedRow = false;
    },
    getPlanTransitionConfigRecord: function () {

        //debugger;
        var grid = this.lookupReference('PlanTransitionConfigGrid');
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onTransitionConfigSave: function (button) {

        //debugger;
        var me = this;
        this.saveList();
        if (me.getView().canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('PlanTransitionConfigGrid',true);
        }
        else {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('PlanTransitionConfigGrid', false);
        }

        this.saveList();
    },
    saveList: function () {
        //debugger;
        var theStore = this.getViewModel().getStore('plantransitionconfig');


        var saveAction = [{
            "Create": {"key": 'recordAction', "value": 'A'},
            "Update": {"key": 'recordAction', "value": 'U'},
            "Delete": {"key": 'recordAction', "value": 'D'}
        }];

        //theStore.filter(Ext.create('Ext.util.Filter', {
        //    property: "EffectiveDate",
        //    value: planGroupRecord.data.planGroupId,
        //    exactMatch: true
        //}));

        /*  var recordIndex = theStore.findBy(
         function(record, id){
         if(record.get('EffectiveDate') === EffectiveDate_from_form){
         return true;  // a record with this data exists
         }
         return false;  // there is no record in the store with this data
         }
         );

         if(recordIndex != -1){
         alert("We have a duplicate, abort!");
         }
         */
        var testReturn = Atlas.common.utility.Utilities.saveData(
            [theStore],
            'plan/rx/plantransitionconfig/update',
            'ttplanTransitionConfig',
            [true], {},
            saveAction,
            null
        );
        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('PBM', testReturn.message, this.showResult, this);
        }

        theStore.load();
    },
    onRemoveButtonClick: function () {
        // debugger;

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
            Ext.MessageBox.alert("PBM - Error", 'Please select the plan transition configuration to delete');
        }
    },
    onTransitionConfigCancel: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Are you sure you want to cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                 if (btn === 'yes') {
                    var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord');
                    var planGroupId = 0;

                    if (planGroupRecord != null)
                        planGroupId = planGroupRecord.data.planGroupId;

                    var storePlantranConfig = me.getView().getViewModel().getStore('plantransitionconfig');
                    storePlantranConfig.getProxy().setExtraParam('pPlanGroupID', planGroupId);
                    storePlantranConfig.load();

                    var canEdit = true;
                    me.getViewModel().set('canEdit', true);
                    me.getViewModel().set('isEditing', false);

                    var StorePlanGroupsFiltered = me.getViewModel().get('plangroups');
                    if (StorePlanGroupsFiltered != null)
                        StorePlanGroupsFiltered.clearFilter();

                } else {
                    console.log('No pressed');
                }
            }
        });
    },

    enableDisableitems:function(cmponent,value)
    {
        var adminBtn = this.lookupReference(cmponent);
        adminBtn.setDisabled(value);

    },
    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        //modelPlanGroup.get('planGroupId')
    }

});