/**
 * Created by b2352 on 12/19/2016.
 */

Ext.define('Atlas.plan.view.benefit.DAWCopayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefit-dawcopay',

    // listen: {
    //     controller: {
    //         'plan-benefitscontroller': {
    //             benefitChange: 'onBenefitChange'
    //         }
    //     }
    // },

    onBenefitChange: function (record) {
        //debugger;
        var me = this;
        this.addedRow = false;

        if(this.getView().up().benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('DAWCopayGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('DAWCopayGrid').setDisabled(false);
        }

        var groupInfo = Ext.create('Atlas.plan.model.PlanGroupInfo');
        groupInfo.getProxy().setExtraParam('pplanGroupId', record.get('planGroupId'));
        groupInfo.load({

            callback: function (planRecordInfo, operation, success) {
                //debugger;
                me.getViewModel().set('planRecordInfo', planRecordInfo);
                var formularies = me.getViewModel().getStore('formularytiers');
                formularies.load();

                var pharmaNetwork = me.getViewModel().getStore('pharmacynetworks');
                pharmaNetwork.load(
                    {
                        callback: function (pharmaRecordInfo, operation, success) {
                            
                            //debugger;

                            if(pharmaNetwork)
                            {
                                var pharmaNetworkRecord = pharmaNetwork.findRecord('NetworkID',planRecordInfo.data.pharmNetworkId,0,false,false,true); //nonPrefPharmNetworkId

                                var filteredPharmacyNetworks = me.getViewModel().getStore('filteredpharmacynetworks');

                                if(pharmaNetworkRecord)
                                {
                                    pharmaNetworkRecord.data.NetworkDescription = 'Preferred Network- ' + pharmaNetworkRecord.data.NetworkDescription;
                                    filteredPharmacyNetworks.insert(0,pharmaNetworkRecord);

                                }

                                pharmaNetworkRecord = pharmaNetwork.findRecord('NetworkID',planRecordInfo.data.nonPrefPharmNetworkId,0,false,false,true); //nonPrefPharmNetworkId

                                if(pharmaNetworkRecord)
                                {
                                    pharmaNetworkRecord.data.NetworkDescription = 'Non-Preferred Network- ' + pharmaNetworkRecord.data.NetworkDescription;
                                    filteredPharmacyNetworks.insert(0,pharmaNetworkRecord);

                                }
                            }

                            //debugger;

                            var storeDAWCopay = me.getViewModel().getStore('dawcopays');
                            storeDAWCopay.getProxy().setExtraParam('pPlanBenefitId', record.get('planBenefitId'));
                            // storeDAWCopay.load();
                            storeDAWCopay.load({
                                callback: function (recordInfo, operation, success) {

                                    if (recordInfo && recordInfo.length == 0) {
                                        Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                                    }
                                }
                            });

                        }
                    }
                );
            }
        });

        var storeFormularyTier = this.getViewModel().getStore('formularytiers');
        storeFormularyTier.getProxy().setExtraParam('pPlanGroupId', record.get('planGroupId'));
        storeFormularyTier.load();

    },

    init: function () {
        // debugger;
        var me = this;
        // this.lookupReference('DAWCopayGrid').setDisabled(true);
        var canEdit = true;
        // this.getViewModel().set('canEdit', true);
        // this.getViewModel().set('isEditing', false);

        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        var record = this.getView().up().down('combobox').getSelection();
        if(record) {
            this.onBenefitChange(record);
            if(this.getView().up().benefitStatus =='A'  && !atlasRecord) {
                this.getViewModel().set('canEdit', true);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('DAWCopayGrid').setDisabled(true);
            }else if (atlasRecord){
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('DAWCopayGrid').setDisabled(true);
            }
            else
            {
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', true);
                this.lookupReference('DAWCopayGrid').setDisabled(false);
            }
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', false);
        }


    },
    onDAWCopayEdit: function (button) {
        //debugger;
        this.lookupReference('DAWCopayGrid').setDisabled(false);
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    beforeEdit: function (editor, context) {

        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('DAWCopayGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }

        var dawType = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('dawType'),
            maintenance = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('maintenance'),
            formularyTierId = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('FormularyTierId'),
            pharmacyNetworkId = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('PharmacyNetworkId');

        if (context != null && context.record != null && context.record.phantom) {
            dawType.enable();
            maintenance.enable();
            formularyTierId.enable();
            pharmacyNetworkId.enable();
        }
        else {
            dawType.disable();
            maintenance.disable();
            formularyTierId.disable();
            pharmacyNetworkId.disable();
        }
    },


    onAdd: function () {
        //debugger;
        if(!this.addedRow) {
            var me = this,
                grid = me.getView().down('grid');
            var store = grid.getStore(),
                newRecord = Ext.create('Atlas.plan.model.PlanDAWCopay', {});

            store.insert(0, newRecord);
            grid.getPlugin().startEdit(newRecord, 0);
            this.getDAWCopayRecord().set('isNew', true);

            this.addedRow = true;
        }

    },
    cancelEditButton: function(editor, context) {
        //debugger;
        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
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
            var grid = this.lookupReference('DAWCopayGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },
    completeEdit: function (editor, context) {
        //debugger;
        if (context.record.dirty) {
            this.getDAWCopayRecord().set('isUpdated', true);
        }
        if(context.record.data.PharmacyNetworkId)
            context.record.data.pharmNetworkId = context.record.data.PharmacyNetworkId;

        this.addedRow = false;

    },

    validateEdit:function (editor,context,eOpts) {

        var newrecord = editor.context.newValues;
        var theStore = this.getViewModel().getStore('dawcopays');

        var recordIndex = theStore.findBy(
            function(record, id){
                if(record.get('dawType') == newrecord.dawType &&
                    record.get('maintenance') == newrecord.maintenance &&
                    record.get('FormularyTierId') == newrecord.FormularyTierId &&

                    record.get('PharmacyNetworkId') == newrecord.PharmacyNetworkId
                    )
                {
                    return true;  // a record with this data exists
                }
                return false;  // there is no record in the store with this data
            }
        );

        if(recordIndex != -1 && recordIndex != context.rowIdx){
            Ext.Msg.alert("Alert", 'Duplicate Records Not Allowed');
            return false;
        }

        if((newrecord.copayAmount > 0 || newrecord.copayPercent > 0) && (newrecord.costDiffMemberRespPct + newrecord.costDiffPlanRespPct + newrecord.costDiffPharmaRespPct) != 100)
        {
            Ext.Msg.alert("Alert", "Sum of Member, Plan and Pharma Responsibility should be equal to 100%.");
            return false;
        }
        return true;
    },
    getDAWCopayRecord: function (editor, context) {

        var grid = this.lookupReference('DAWCopayGrid');
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onDAWCopaySave: function (button) {

        this.saveList();
    },
    saveList: function () {
         //debugger;
        var theStore = this.getViewModel().getStore('dawcopays');
        var record = this.getView().up().down('combobox');
        if (record != null) {

            var planBenefitId = record.getSelection().data.planBenefitId;
        }
        theStore.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData(
            [theStore],
            'plan/rx/plandawcopay/update',
            'ttSetDAWCopayDetail',
            [true],
            {
                'pPlanBenefitId': planBenefitId
            },
            saveAction,
            null
        );

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }

        if(this.getView().up().benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('DAWCopayGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('DAWCopayGrid').setDisabled(false);
        }

        theStore.load();

    },
    rendererDAWType: function (value) {
        // debugger;
        if (value != 0) {
            var dawTypeList = this.getViewModel().get('dawtypes');
            if (dawTypeList != null) {
                var dawTypeItem = dawTypeList.findRecord('value', value,0,false,false,true);
                if (dawTypeItem != null) {
                    var dawTypeName = dawTypeItem.get('name');
                    if (dawTypeName != null)
                        return dawTypeName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    rendererFormularyTier: function (value) {
        //debugger;
        if (value != 0) {
            var formularyTierList = this.getViewModel().getStore('formularytiers');
            if (formularyTierList != null) {
                var formularyTierItem = formularyTierList.findRecord('TierCode', value,0,false,false,true);
                if (formularyTierItem != null) {
                    var formularyTierName = formularyTierItem.get('TierDesc');
                    if (formularyTierName != null)
                        return formularyTierName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    rendererMaintenance: function (value) {
       // debugger;
        if (value != 0) {
            var maintenanceList = this.getViewModel().getStore('maintenances');
            if (maintenanceList != null) {
                var maintenanceItem = maintenanceList.findRecord('value', value,0,false,false,true);
                if (maintenanceItem != null) {
                    var maintenanceName = maintenanceItem.get('name');
                    if (maintenanceName != null)
                        return maintenanceName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    rendererPharmacyNetwork: function (value) {
        //debugger;
        var me = this;
        var pharmacyNetworkList = this.getViewModel().getStore('filteredpharmacynetworks');
        if ( value != 0 ) {
            // var pharmacyNetworkList = this.getViewModel().getStore('filteredpharmacynetworks');
            if (pharmacyNetworkList != null) {
                var pharmacyNetworkItem = pharmacyNetworkList.findRecord('NetworkID', value,0,false,false,true);
                if (pharmacyNetworkItem != null) {
                    var pharmacyNetworkName = pharmacyNetworkItem.get('NetworkDescription');
                    if (pharmacyNetworkName != null)
                        return pharmacyNetworkName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
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
            Ext.MessageBox.alert("PBM - Error", 'Please select the DAW copay to delete');
        }
    }

});

