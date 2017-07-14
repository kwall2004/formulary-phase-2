/**
 * Created by S4505 on 11/7/2016.
 */

Ext.define('Atlas.plan.view.group.AllowedPrescriberListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-allowedprescriberlist',
    // listen: {
    //     controller: {
    //         '*': {
    //             newGroupSelected: 'init'
    //
    //         }
    //     }
    // },

    init: function () {
        var me = this;


        // var canEdit = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('canEdit');
        this.addedRow = false;
        var planGroupRecord = me.retrievePlanGroup(),
            planStatus = 'I',
            planGroupId = 0;

        if(planGroupRecord) {
            planStatus = planGroupRecord.get('planGroupStatus');
            planGroupId = planGroupRecord.data.planGroupId;
        }


        var storeAllowedPresciberList = me.getView().up('panel').getViewModel().getStore('allowedprescriber');
        storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
        storeAllowedPresciberList.load();

        var canEdit = false;
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        if (planStatus == 'A' && !atlasRecord) // Active
        {
            canEdit = true ;
        }
        this.getView().canEdit = canEdit;

        if(canEdit) {
            me.getViewModel().set('isEditing', false);
            me.getViewModel().set('canEdit', canEdit);
            me.enableDisableitems('AllowedPrescriberListgrid',true);

        }
        else {
            me.getViewModel().set('isEditing', true);
            me.getViewModel().set('canEdit', canEdit);
            me.enableDisableitems('AllowedPrescriberListgrid', false);
        }
        if(atlasRecord)
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('AllowedPrescriberListgrid',true);
        }

    },

    onUndoChangeClick:function(button)
    {
        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.lookupReference('AllowedPrescriberListgrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },

    onAdd:function()
    {
        if(!this.addedRow) {

            var me = this,
                grid = this.lookupReference('AllowedPrescriberListgrid').getView(),
                store = grid.getStore(),
                newRecord = new Atlas.plan.model.PlanAllowedPrescriber();

            store.insert(0, newRecord);

            this.lookupReference('AllowedPrescriberListgrid').getPlugin('rowEditing').startEdit(newRecord, 0);

            this.getAllowedPrescriberRecord().set('isNew', true);

            this.addedRow = true;
        }
    },


    cancelEditButton: function(editor, context) {
        //debugger;
        if(context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('AllowedPrescriberListgrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }

    },


    completeEdit:function(editor, context)
    {
        //debugger;
        // if( context.record.dirty  ){
        //     this.getAllowedPrescriberRecord().set('isUpdated',true);
        // }

        var grid = this.lookupReference('AllowedPrescriberListgrid').getView();
        if(context.record.get('PrescriberName')) {

            var gridColumns = grid.headerCt.getGridColumns();

            if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated) {
                context.record.set('isUpdated', false);
                //btnSave.disable();
            }
            else {
                context.record.set('isUpdated', true);
                //btnSave.enable();
            }

            var curSelModel = grid.getSelectionModel().getSelection()[0];
            var curRow = grid.getSelectionModel().getSelection()[0];
        }
        else {
            grid.getStore().remove(context.record);
        }

        this.addedRow = false;
    },




    onRemoveButtonClick:function (){
        //debugger;
        var me = this;
        var vm = this.getViewModel(),
            //grid = this.getView();
            grid = this.lookupReference('AllowedPrescriberListgrid').getView();
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
        else
        {
            Ext.MessageBox.alert("PBM - Error", 'Please select the presciber to delete');
        }
    },

    getAllowedPrescriberRecord: function(){


        var grid = this.lookupReference('AllowedPrescriberListgrid').getView();
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
                    var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ;
                    var planGroupId = 0;

                    if( planGroupRecord!=null )
                        planGroupId = planGroupRecord.data.planGroupId;

                    var storeAllowedPresciberList = me.getView().up('panel').getViewModel().getStore('allowedprescriber');
                    storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
                    storeAllowedPresciberList.load();


                    if(me.getView().canEdit) {
                        me.getViewModel().set('isEditing', false);
                        me.getViewModel().set('canEdit', true);

                        me.enableDisableitems('AllowedPrescriberListgrid', true);
                    }

                } else {
                    console.log('No pressed');
                }
            }
        });
    },

    onSaveClick: function (button) {
        var me = this;
        this.saveList();
        var planGroupRecord = me.retrievePlanGroup() ;
        var planGroupId = 0;

        if( planGroupRecord!=null )
            planGroupId = planGroupRecord.data.planGroupId;

        var storeAllowedPresciberList = this.getView().up('panel').getViewModel().getStore('allowedprescriber');
        storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
        storeAllowedPresciberList.load();

        if(me.getView().canEdit) {

            me.getViewModel().set('isEditing', false);
            me.getViewModel().set('canEdit', true);
            me.enableDisableitems('AllowedPrescriberListgrid', true);
        }

    },



    saveList: function () {
        var theStore = this.getView().up('panel').getViewModel().getStore('allowedprescriber');
        var planGroupRecord = this.retrievePlanGroup(),

            saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];


        if(planGroupRecord) {
            var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/planallowedprescriber/update', 'ttplanAllowedPrescriber', [true],
                {
                    'pPlanGroupId': planGroupRecord.data.planGroupId
                },
                saveAction, null);

            if(testReturn && testReturn.code != 0)
            {
                Ext.MessageBox.alert('PBM', testReturn.message, this.showResult, this);
            }
        }


    },


    onAdminEditClick: function (button) {
        var me = this;

        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);

        me.enableDisableitems('AllowedPrescriberListgrid',false);

    },

    onNPISelect:function(combo, record)
    {

        combo.setRawValue(record.data.npi);

        //to do remove id

        var prescriberNameField = this.lookupReference('AllowedPrescriberListgrid').getView().up().getPlugin('rowEditing').editor.form.findField('prescriberName');
        if(prescriberNameField!=null)
        {
            prescriberNameField.setValue (record.data.fullname);
            prescriberNameField.setRawValue(record.data.fullname);
        }
    },
    enableDisableitems:function(cmponent,value)
    {
        var cmpToChangeEditability = this.lookupReference(cmponent);
        if(cmpToChangeEditability)
            cmpToChangeEditability.setDisabled(value);

    },
    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        //modelPlanGroup.get('planGroupId')
    }

});
