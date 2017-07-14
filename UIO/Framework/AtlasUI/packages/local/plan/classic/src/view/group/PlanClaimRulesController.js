/**
 * Created by S4505 on 11/7/2016.
 */


Ext.define('Atlas.plan.view.group.PlanClaimRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-planclaimrules',
    // listen: {
    //     controller: {
    //         '*': {
    //             newGroupSelected: 'init'
    //
    //         }
    //     }
    // },
    init: function () {


        var me = this,
        //storeCarrierAccounts = this.getViewModel().get('carrieraccounts'),
            storedruglevel = this.getViewModel().get('druglevel'),
            storeClaimRuleType = this.getViewModel().get('planclaimruletype'),
            storeDrugType = this.getViewModel().get('drugtype'),
            storePlanClaimRules = this.getViewModel().get('planclaimrules'),
            storeDawType = this.getViewModel().get('dawtype'),
            storeCarrierAccounts = this.getViewModel().get('carrieraccounts'),
            storeCarrier = this.getViewModel().get('carriers'),
            storeLobs = this.getViewModel().get('lobs'),
            storePBList = this.getViewModel().get('planbenefitlistItem'),
            planGroupRecord = me.retrievePlanGroup(),
            carrierAcctNumber = '',
            pPlanGroupId = 0,
            canEdit = false,
            planStatus = 'I';

        this.addedRow = false;
        if(planGroupRecord)
            planStatus = planGroupRecord.get('planGroupStatus');
       // var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        /*if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/

        if (planStatus == 'A' ) // Active
        {
            canEdit = true ;
        }
        //this.getView().canEdit = canEdit;

        this.getView().canEdit = canEdit;

        if (canEdit) {
            me.getViewModel().set('canEdit', true);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('planClaimRulesgrid', true);
        }
        else {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', true);
            me.enableDisableitems('planClaimRulesgrid', false);
        }
        /*if(atlasRecord)
        {
            me.getViewModel().set('canEdit', false);
            me.getViewModel().set('isEditing', false);
            me.enableDisableitems('planClaimRulesgrid',true);
        }*/



        if (planGroupRecord != null) {
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

                        storeCarrierAccounts.filter('carrierId', planGroupRecord.data.carrierId);


                        storeCarrierAccounts.filter(Ext.create('Ext.util.Filter',
                            {
                                property: "carrierId",
                                value: planGroupRecord.data.carrierId,
                                exactMatch: true
                            }
                        ));

                        storeCarrierAccounts.filter(Ext.create('Ext.util.Filter',
                            {
                                property: "carrierAcctNumber",
                                value: planGroupRecord.data.carrierAcctNumber,
                                exactMatch: true
                            }
                        ));

                        if (storeLobs != null) {
                            storeLobs.filter(Ext.create('Ext.util.Filter',
                                {
                                    property: "carrierId",
                                    value: planGroupRecord.data.carrierId,
                                    exactMatch: true
                                }
                            ));

                            storeLobs.filter(Ext.create('Ext.util.Filter',
                                {
                                    property: "carrierLOBId",
                                    value: planGroupRecord.data.carrierLOBId,
                                    exactMatch: true
                                }
                            ));
                        }

                        if (storeCarrier != null)
                            storeCarrier.filter(Ext.create('Ext.util.Filter', {
                                property: "carrierId",
                                value: planGroupRecord.data.carrierId,
                                exactMatch: true
                            }));

                        if (storePBList != null)
                            storePBList.filter(Ext.create('Ext.util.Filter', {
                                property: "planGroupId",
                                value: planGroupRecord.data.planGroupId,
                                exactMatch: true
                            }));

                    }
                }
            );
        }
    },
    cmbRuleLevelrenderer: function (ruleLevelType) {

        if (ruleLevelType == 'Drug') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', true, false,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', false, true,ruleLevelType,false);

        }
        else if (ruleLevelType = 'DAW') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', false, true,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, false,ruleLevelType,false);
        }
        else {
            this.enableDisableGridEdit('cbxDrugLevel', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', true, true,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, true,ruleLevelType,false);
        }

    },

    cmbCarriersrenderer: function (value) {
        // debugger;
        if (value != null) {
            var carrierStore = this.getViewModel().get('carriers');
            if (carrierStore != null) {
                var carrierRecord = carrierStore.findRecord('carrierId', value);
                if (carrierRecord != null) {
                    var carrierName = carrierRecord.get('carrierName');
                    if (carrierName != null)
                        return carrierName;
                }
            }
        }
    },


    cmbCarriersLOBIdrenderer: function (value) {
        if (value != null) {
            var theStore = this.getViewModel().get('lobs');
            if (theStore != null) {
                var theRecord = theStore.findRecord('carrierLOBId', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('lobName');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbCarriersAcctrenderer: function (value) {
        if (value != null) {
            var theStore = this.getViewModel().get('carrieraccounts');
            if (theStore != null) {
                var theRecord = theStore.findRecord('carrierAcctNumber', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('accountName');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbPlanGrouprenderer: function (value) {
        if (value != null) {
            var theStore = this.getViewModel().get('plangroups');
            if (theStore != null) {
                var theRecord = theStore.findRecord('planGroupId', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('planGroupName');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },


    cmbPlanBenefitrenderer: function (value) {
        if (value != null) {
            var theStore = this.getViewModel().get('planbenefitlistItem');
            if (theStore != null) {
                var theRecord = theStore.findRecord('planBenefitId', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('planBenefitCode');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },


    cbxDrugLevelrenderer: function (value) {
        if (value != null) {
            var theStore = this.getView().up('panel').getViewModel().getStore('druglevel');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },

    cbxDrugTyperenderer: function (value) {
        if (value != null) {
            var theStore = this.getView().up('panel').getViewModel().getStore('drugtype');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }


    },

    cbxDAWCoderenderer: function (value) {
        //debugger;
        if (value != null) {
            var theStore = this.getView().up('panel').getViewModel().getStore('dawtype');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },


    cbxRuleTyperenderer: function (value) {
        //debugger;
        if (value != null) {
            var theStore = this.getView().up('panel').getViewModel().getStore('planclaimruletype');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },

    onUndoChangeClick: function (button) {
        //button.up().getViewModel().data.record.reject();

        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.lookupReference('planClaimRulesgrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('planClaimRulesgrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
        else
        {
            context.record.set('isEditing', true);
        }
        //debugger;
        var record = context.record;
        var ruleLevelType = record.get('RuleLevel');

        if (ruleLevelType == 'Drug') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', true, false,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', false, true,ruleLevelType,false);

        }
        else if (ruleLevelType = 'DAW') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', false, true,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', false, true,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, false,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, false,ruleLevelType,false);
        }
        else {
            this.enableDisableGridEdit('cbxDrugLevel', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('txtDrugCode', true, true,ruleLevelType,false);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, true,ruleLevelType,false);
            this.enableDisableGridEdit('cbxDAWCode', true, true,ruleLevelType,false);
        }


    },


    cancelEditButton: function (editor, context) {
        // debugger;
        if (context.record.phantom) {
            context.grid.store.removeAt(context.rowIdx);
        }
        else {
            context.record.reject();
            context.record.set('isEditing', false);
        }
        this.addedRow = false;

    },


    completeEdit: function (editor, context) {
        var grid = this.lookupReference('planClaimRulesgrid').getView();
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
        context.record.set('isEditing', false);
        this.addedRow = false;
    },

    onMasterCancelClick: function () {
        //debugger;
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

                    var storePlanClaimRules = me.getView().up('panel').getViewModel().getStore('planclaimrules');
                    storePlanClaimRules.getProxy().setExtraParam('pPlanGroupId', planGroupId);
                    storePlanClaimRules.load();


                    if (me.getView().canEdit) {
                        me.getViewModel().set('isEditing', false);
                        me.getViewModel().set('canEdit', true);
                        me.enableDisableitems('planClaimRulesgrid', true);
                    }


                    var StorePlanGroupsFiltered = me.getViewModel().get('plangroups');
                    if (StorePlanGroupsFiltered != null)
                        StorePlanGroupsFiltered.clearFilter();

                } else {
                    console.log('No pressed');
                }
            }
        });
    },


    onRemoveButtonClick: function () {
        //debugger;
        var me = this;
        var vm = this.getViewModel(),
        //grid = this.getView();
            grid = this.lookupReference('planClaimRulesgrid').getView();
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
            Ext.MessageBox.alert("PBM - Error", 'Please select the plan claim rule to delete');
        }
    },

    getAllowedPrescriberRecord: function () {

        var grid = this.lookupReference('planClaimRulesgrid').getView();
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onAdd: function () {
        //debugger;
        if(!this.addedRow) {
            var me = this,

                store = this.getView().up('panel').getViewModel().getStore('planclaimrules'),
                newRecord = new Atlas.plan.model.PlanClaimRules();

            newRecord.set('active', true);

            store.insert(0, newRecord);

            this.lookupReference('planClaimRulesgrid').getPlugin('rowEditing').startEdit(newRecord, 0);

            this.getAllowedPrescriberRecord().set('isNew', true);

            this.addedRow = true;
        }
    },


    onSaveClick: function (button) {
        var me = this;


        var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord');
        var planGroupId = 0;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.data.planGroupId;

        this.saveList();

        // var storeAllowedPresciberList = this.getView().up('panel').getViewModel().getStore('planclaimrules');
        // storeAllowedPresciberList.getProxy().setExtraParam('pPlanGroupId',  planGroupId);
        // storeAllowedPresciberList.load();
        if (me.getView().canEdit) {
            me.getViewModel().set('isEditing', false);
            me.getViewModel().set('canEdit', true);
            me.enableDisableitems('planClaimRulesgrid', true);
        }

        var storePlanClaimRules = me.getView().up('panel').getViewModel().getStore('planclaimrules');
        storePlanClaimRules.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        storePlanClaimRules.load();

        var StorePlanGroupsFiltered = this.getViewModel().get('plangroups');
        if (StorePlanGroupsFiltered != null)
            StorePlanGroupsFiltered.clearFilter();

    },
    saveList: function () {

        var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord');
        var planGroupId = 0;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.data.planGroupId;


        var theStore = this.getView().up('panel').getViewModel().getStore('planclaimrules');

        theStore.each(function (record, id) {

            if (record.data.active == 'on') {
                record.data.active.setValue(true);
            }

        });


        var saveAction = [{
            "Create": {"key": 'recordAction', "value": 'A'},
            "Update": {"key": 'recordAction', "value": 'U'},
            "Delete": {"key": 'recordAction', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/planclaimrules/update', 'ttPlanClaimRules', [true],
            {
                'pPlanGroupId': planGroupId
            },
            saveAction, null);

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('PBM', testReturn.message, this.showResult, this);
        }

    },

    onAdminEditClick: function (button) {
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
        me.enableDisableitems('planClaimRulesgrid', false);

        var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord');
        var planGroupId = 0;


        if (planGroupRecord != null)
            planGroupId = planGroupRecord.data.planGroupId;

        var StorePlanGroupsFiltered = this.getViewModel().get('plangroups');
        if (StorePlanGroupsFiltered != null)
        //StorePlanGroupsFiltered.filter("planGroupId",planGroupId)
            StorePlanGroupsFiltered.filter(Ext.create('Ext.util.Filter', {
                property: "planGroupId",
                value: planGroupId,
                exactMatch: true
            }));

    },


    enableDisableitems: function (cmponent, value) {
        //debugger;
        var cmpToChangeEditability = this.lookupReference(cmponent);
        if (cmpToChangeEditability != null)
            cmpToChangeEditability.setDisabled(value);

    },
    onRuleLevelSelect: function (record, combo, a, b) {
        //debugger;

        var ruleLevelType = record.value;


        if (ruleLevelType == 'Drug') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', true, false,ruleLevelType,true);
            this.enableDisableGridEdit('txtDrugCode', true, false,ruleLevelType,true);

            this.enableDisableGridEdit('cbxDrugTypeFrom', false, true,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDrugTypeTo', false, true,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDAWCode', false, true,ruleLevelType,true);

        }
        else if (ruleLevelType == 'DAW') {
            //debugger;
            this.enableDisableGridEdit('cbxDrugLevel', false, true,ruleLevelType,true);
            this.enableDisableGridEdit('txtDrugCode', false, true,ruleLevelType,true);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, false,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, false,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDAWCode', true, false,ruleLevelType,true);
        }
        else {
            this.enableDisableGridEdit('cbxDrugLevel', true, true,ruleLevelType,true);
            this.enableDisableGridEdit('txtDrugCode', true, true,ruleLevelType,true);

            this.enableDisableGridEdit('cbxDrugTypeFrom', true, true,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDrugTypeTo', true, true,ruleLevelType,true);
            this.enableDisableGridEdit('cbxDAWCode', true, true,ruleLevelType,true);
        }
    },

    enableDisableGridEdit: function (component, value, allowBlank,ruleType,clearFields) {
        //debugger;
        var rowItem = this.lookupReference('planClaimRulesgrid').getView().up().getPlugin('rowEditing').editor.form.findField(component);
        if (rowItem != null) {
            if (value) {
                rowItem.enable();
            }
            else {
                rowItem.disable();
            }
            Ext.getCmp(rowItem.id).clearInvalid();
            rowItem.allowBlank = allowBlank;
            rowItem.config.allowBlank = allowBlank;

            if(clearFields) {

                if (ruleType == 'Drug') {
                    if (component == 'cbxDAWCode' || component == 'cbxDrugTypeFrom' || component == 'cbxDrugTypeTo') {
                        Ext.getCmp(rowItem.id).setValue('');
                        Ext.getCmp(rowItem.id).setRawValue('');
                    }

                }
                else if (ruleType == 'DAW') {
                    if (component == 'cbxDrugLevel') {
                        Ext.getCmp(rowItem.id).setValue('');
                        Ext.getCmp(rowItem.id).setRawValue('');
                    }

                    if (component == 'txtDrugCode') {
                        Ext.getCmp(rowItem.id).setValue('');
                    }

                }

                if (!allowBlank && !rowItem.value) {
                    Ext.getCmp(rowItem.id).markInvalid('');
                }
            }

        }

    },


    chkActiverenderer: function (value) {

        if (value)
            return true;
        else
            return false;
    },
    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        //modelPlanGroup.get('planGroupId')
    }

});