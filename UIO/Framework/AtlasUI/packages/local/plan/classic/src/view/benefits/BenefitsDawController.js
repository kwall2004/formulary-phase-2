/**
 * Created by a6686 on 11/14/2016.
 */



Ext.define('Atlas.plan.view.benefits.BenefitsDawController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefits-BenefitsDaw',
    init: function () {

        var me=this,
        //storeCarrierAccounts = this.getViewModel().get('carrieraccounts'),
            storedruglevel = this.getViewModel().get('druglevel'),
            storeClaimRuleType = this.getViewModel().get('planclaimruletype'),
            storeDrugType = this.getViewModel().get('drugtype'),
            storePlanClaimRules = this.getViewModel().get('planclaimrules'),
            storeDawType = this.getViewModel().get('dawtype'),
            storeCarrierAccounts = this.getViewModel().get('carrieraccounts'),
            planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
            carrierAcctNumber= '',
            pPlanGroupId = 0,
            canEdit = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('canEdit');

        if(canEdit) {
            me.getViewModel().set('canEdit', true);
        }
        else
        {
            me.getViewModel().set('canEdit', false);
        }

        me.getViewModel().set('isEditing', false);


        me.enableDisableitems('planClaimRulesgrid',true);


        if( planGroupRecord!=null ) {
            //pPlanGroupId = planGroupRecord.data.planGroupId;
            carrierAcctNumber = planGroupRecord.data.carrierAcctNumber;

            storeCarrierAccounts.load({
                callback: function () {

                    storedruglevel.load();
                    storeClaimRuleType.load();
                    storeDrugType.load();
                    storeDawType.load();

                    storePlanClaimRules.getProxy().setExtraParam('pPlanGroupID', planGroupRecord.data.planGroupId);
                    storePlanClaimRules.load();

                }}
            );
        }
    },
    cmbRuleLevelrenderer:function(value)
    {
        if(value =='Drug')
        {
            this.enableDisableGridEdit('cbxDrugLevel',true);
            this.enableDisableGridEdit('txtDrugCode',true);

            this.enableDisableGridEdit('cbxDrugTypeFrom',false);
            this.enableDisableGridEdit('cbxDrugTypeTo',false);
            this.enableDisableGridEdit('cbxDAWCode',false);

        }
        else if(value = 'DAW')
        {
            this.enableDisableGridEdit('cbxDrugLevel',false);
            this.enableDisableGridEdit('txtDrugCode',false);

            this.enableDisableGridEdit('cbxDrugTypeFrom',true);
            this.enableDisableGridEdit('cbxDrugTypeTo',true);
            this.enableDisableGridEdit('cbxDAWCode',true);
        }
        else
        {
            this.enableDisableGridEdit('cbxDrugLevel',true);
            this.enableDisableGridEdit('txtDrugCode',true);

            this.enableDisableGridEdit('cbxDrugTypeFrom',true);
            this.enableDisableGridEdit('cbxDrugTypeTo',true);
            this.enableDisableGridEdit('cbxDAWCode',true);
        }
    },

    cmbCarriersrenderer:function(value)
    {
        if(value !=null)
        {
            carrierStore = this.getViewModel().get('carriers');
            if(carrierStore !=null)
            {
                var carrierRecord = carrierStore.findRecord('carrierId',value);
                if(carrierRecord!=null) {
                    var carrierName = carrierRecord.get('carrierName');
                    if(carrierName!=null)
                        return carrierName;
                }
            }
        }
    },



    cmbCarriersLOBIdrenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getViewModel().get('lobs');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('carrierLOBId',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('lobName');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbCarriersAcctrenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getViewModel().get('carrieraccounts');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('carrierAcctNumber',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('accountName');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbPlanGrouprenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getViewModel().get('plangroups');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('planGroupId',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('planGroupName');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbPlanBenefitrenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getViewModel().get('planbenefitlistItem');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('planBenefitId',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('planBenefitCode');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },


    cbxDrugLevelrenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getView().up('panel').getViewModel().getStore('druglevel');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('value',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('name');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },

    cbxDrugTyperenderer:function(value)
    {
        if(value !=null)
        {
            var theStore = this.getView().up('panel').getViewModel().getStore('drugtype');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('value',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('name');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }


    },

    cbxDAWCoderenderer:function(value)
    {
        //debugger;
        if(value !=null)
        {
            var theStore = this.getView().up('panel').getViewModel().getStore('dawtype');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('value',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('name');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },


    cbxRuleTyperenderer:function(value)
    {
        //debugger;
        if(value !=null)
        {
            var theStore = this.getView().up('panel').getViewModel().getStore('planclaimruletype');
            if(theStore !=null)
            {
                var theRecord = theStore.findRecord('value',value);
                if(theRecord!=null) {
                    var theDisplayField = theRecord.get('name');
                    if(theDisplayField!=null)
                        return theDisplayField;
                }
            }
        }
    },



    onUndoChangeClick:function(button)
    {
        var dataToRevert = Ext.getCmp('planClaimRulesgrid').getView().store;
        dataToRevert.getAt(Ext.getCmp(button.id).up()._rowContext.recordIndex).reject();
    },


    cancelEditButton: function() {
        //debugger;
    },


    completeEdit:function(editor, context)
    {
        if( context.record.dirty  ){
            this.getAllowedPrescriberRecord().set('isUpdated',true);
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

                    var storeAllowedPresciberList = this.getView().up('panel').getViewModel().getStore('planclaimrules');
                    storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
                    storeAllowedPresciberList.load();



                    me.getViewModel().set('isEditing', false);
                    me.getViewModel().set('canEdit', true);

                    me.enableDisableitems('planClaimRulesgrid',true);

                } else {
                    console.log('No pressed');
                }
            }
        });
    },




    onRemoveButtonClick:function (){
        //debugger;
        var me = this;
        var vm = this.getViewModel(),
        //grid = this.getView();
            grid = Ext.getCmp('planClaimRulesgrid').getView();
        grid.up().findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        sm.getSelection()[0].data.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        this.getViewModel().set('changed',true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
    },

    getAllowedPrescriberRecord: function(){

        var grid = Ext.getCmp('planClaimRulesgrid').getView();
        if(grid){
            return grid.getSelection()[0];
        }
    },

    onAdd:function()
    {
        //debugger;
        var me = this,
        //grid = Ext.getCmp('planClaimRulesgrid').getView(),
            store = this.getView().up('panel').getViewModel().getStore('planclaimrules'),
            newRecord = new Atlas.plan.model.PlanClaimRules();

        store.insert(0, newRecord);

        Ext.getCmp('planClaimRulesgrid').getPlugin('rowEditing').startEdit(newRecord, 0);

        this.getAllowedPrescriberRecord().set('isNew',true);

        this.addedRow = true;
    },






    onSaveClick: function (button) {
        var me = this;


        var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ;
        var planGroupId = 0;

        if( planGroupRecord!=null )
            planGroupId = planGroupRecord.data.planGroupId;

        this.saveList(planGroupId);

        var storeAllowedPresciberList = this.getView().up('panel').getViewModel().getStore('planclaimrules');
        storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
        storeAllowedPresciberList.load();

        me.getViewModel().set('isEditing', false);
        me.getViewModel().set('canEdit', true);
        me.enableDisableitems('planClaimRulesgrid',true);

    },
    saveList: function(palnGroupId){


        var theStore = this.getView().up('panel').getViewModel().getStore('planclaimrules');

        theStore.each(function(record,id){

            if(record.data.active== 'on')
            {
                record.data.active.setValue(true);
            }

        });


        var saveAction = [{
            "Create": {"key": 'recordAction', "value": 'A'},
            "Update": {"key": 'recordAction', "value": 'U'},
            "Delete": {"key": 'recordAction', "value": 'D'}
        }];

        testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/planclaimrules/update', 'ttPlanClaimRules', [true],
            {
                'pPlanGroupId': palnGroupId
            },
            saveAction, null);

    },

    onAdminEditClick: function (button) {
        var me=this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
        me.enableDisableitems('planClaimRulesgrid',false);

    },


    enableDisableitems:function(cmponent,value)
    {
        //debugger;
        var cmpToChangeEditability = Ext.getCmp(cmponent);
        if(cmpToChangeEditability!=null)
            cmpToChangeEditability.setDisabled(value);

    },
    onRuleLevelSelect:function(record,combo,a,b)
    {
        if(record.value=='Drug')
        {
            this.enableDisableGridEdit('cbxDrugLevel',true);
            this.enableDisableGridEdit('txtDrugCode',true);

            this.enableDisableGridEdit('cbxDrugTypeFrom',false);
            this.enableDisableGridEdit('cbxDrugTypeTo',false);
            this.enableDisableGridEdit('cbxDAWCode',false);

        }
        else if(record.value = 'DAW')
        {
            this.enableDisableGridEdit('cbxDrugLevel',false);
            this.enableDisableGridEdit('txtDrugCode',false);

            this.enableDisableGridEdit('cbxDrugTypeFrom',true);
            this.enableDisableGridEdit('cbxDrugTypeTo',true);
            this.enableDisableGridEdit('cbxDAWCode',true);
        }
        else
        {
            this.enableDisableGridEdit('cbxDrugLevel',true);
            this.enableDisableGridEdit('txtDrugCode',true);

            this.enableDisableGridEdit('cbxDrugTypeFrom',true);
            this.enableDisableGridEdit('cbxDrugTypeTo',true);
            this.enableDisableGridEdit('cbxDAWCode',true);
        }
    },

    enableDisableGridEdit:function(component,value)
    {
        var rowItem = Ext.getCmp('planClaimRulesgrid').getView().up().getPlugin('rowEditing').editor.form.findField(component);
        if(rowItem!=null)
        {
            if(value)
            {
                rowItem.enable();
            }
            else
            {
                rowItem.disable();
            }

        }

    },

    chkActiverenderer:function(value)
    {

        if(value)
            return true;
        else
            return false;
    }







});
