/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.CopayDistributionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefits-copaydistribution',

    // listen: {
    //     controller: {
    //         '*': {
    //             benefitChange: 'init'
    //         }
    //     }
    // },


    onBenefitChange: function (record) {
       // debugger;
        var me = this;
        var canEdit = true;
        this.addedRow = false;
        if(this.getView().up().benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('PlanCopayDistributionGrid').setDisabled(false);
        }
        var planGroupId   = record.data.planGroupId,
            planBenefitId = record.data.planBenefitId ;

        var storeCopayDistribution = this.getViewModel().get('copaydistributions');
        storeCopayDistribution.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        //storeCopayDistribution.load();
        /* storeCopayDistribution.load({
         callback: function (recordInfo, operation, success) {

         if (recordInfo && recordInfo.length == 0) {
         Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
         }
         }
         });*/

        var storeCoveragePhase  = this.getViewModel().getStore('coveragephases') ;
        storeCoveragePhase.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        storeCoveragePhase.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        //storeCoveragePhase.load();


        var storeFormularyTier = this.getViewModel().getStore('formularytiers');
        storeFormularyTier.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        // storeFormularyTier.load();

        storeCoveragePhase.load({

            callback: function (recordInfo, operation, success) {

                storeFormularyTier.load({
                    callback: function (recordInfo, operation, success) {
                        storeCopayDistribution.load({
                            callback: function (recordInfo, operation, success) {

                                if (recordInfo && recordInfo.length == 0) {
                                    Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                                }
                            }
                        });

                    }

                });

            }

        });

    },

    init: function () {
         //debugger;

        var me = this;
        // this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
        var canEdit = true;
        // this.getViewModel().set('canEdit', true);
        // this.getViewModel().set('isEditing', false);

        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        var record = this.getView().up().down('combobox').getSelection();
        if(record) {
            this.onBenefitChange(record);
            if(this.getView().up().benefitStatus =='A'&& !atlasRecord) {
                this.getViewModel().set('canEdit', true);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
            }else if(atlasRecord){
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
            }
            else
            {
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', true);
                this.lookupReference('PlanCopayDistributionGrid').setDisabled(false);
            }
        }
        else {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', false);
        }


        /* var me = this;
         this.addedRow = false;
         // this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
         var canEdit = true;
         this.getViewModel().set('canEdit', true);
         this.getViewModel().set('isEditing', false);
         var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

         // debugger;
         var planGroupRecord = me.getView().up().down('planBenefit').getSelection();
         if(!planGroupRecord){
             this.getViewModel().set('canEdit', false);
             this.getViewModel().set('isEditing', false);
             return;
         }
         else {
             this.onBenefitChange(planGroupRecord);
             if(this.getView().up().benefitStatus =='A' && !atlasRecord) {
                 this.getViewModel().set('canEdit', true);
                 this.getViewModel().set('isEditing', false);
                 this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
             }else if (atlasRecord){
                 this.getViewModel().set('canEdit', false);
                 this.getViewModel().set('isEditing', false);
                 this.lookupReference('PlanCopayDistributionGrid').setDisabled(true);
             }
             else
             {
                 this.getViewModel().set('canEdit', false);
                 this.getViewModel().set('isEditing', true);
                 this.lookupReference('PlanCopayDistributionGrid').setDisabled(false);
             }
         }*/
       /* var planGroupId   = planGroupRecord.data.planGroupId,
            planBenefitId = planGroupRecord.data.planBenefitId ;

        var storeCopayDistribution = this.getViewModel().get('copaydistributions');
        storeCopayDistribution.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        //storeCopayDistribution.load();
       /!* storeCopayDistribution.load({
            callback: function (recordInfo, operation, success) {

                if (recordInfo && recordInfo.length == 0) {
                    Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                }
            }
        });*!/



        var storeCoveragePhase  = this.getViewModel().getStore('coveragephases') ;
        storeCoveragePhase.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        storeCoveragePhase.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        //storeCoveragePhase.load();


       var storeFormularyTier = this.getViewModel().getStore('formularytiers');
        storeFormularyTier.getProxy().setExtraParam('pPlanGroupId', planGroupId);
       // storeFormularyTier.load();

        storeCoveragePhase.load({

            callback: function (recordInfo, operation, success) {

                storeFormularyTier.load({
                    callback: function (recordInfo, operation, success) {
                        storeCopayDistribution.load({
                            callback: function (recordInfo, operation, success) {

                                if (recordInfo && recordInfo.length == 0) {
                                    Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                                }
                            }
                        });


                    }

                });

            }

        });
*/
    },
    onCopayDistributionAdminEdit: function (button) {
        //debugger;
        this.lookupReference('PlanCopayDistributionGrid').setDisabled(false);
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    beforeEdit: function (editor, context) {

        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('PlanCopayDistributionGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }
        }
        else {
            //debugger;

            var theStore = this.getViewModel().getStore('coveragephases');
            if (theStore) {

                var existinallRecord = theStore.findRecord('coveragePhaseId', 0, 0, false, false, true);
                if (!existinallRecord) {
                    var allRercord = new Atlas.plan.model.CoveragePhase;
                    allRercord.data.systemId = 0;
                    allRercord.data.planBenefitId = 0;
                    allRercord.data.benefitName = "ALL";
                    allRercord.data.coveragePhaseId = 0;
                    allRercord.data.coveragePhaseName = "ALL";
                    allRercord.data.coverageCode = "ALL";
                    allRercord.data.rankOrder = "0";
                    allRercord.data.maxTROOPAmount = "0";
                    allRercord.data.maxTDSAmount = "0";
                    theStore.insert(0, allRercord);

                }
            }
        }
    },

    onAdd: function () {

        if(!this.addedRow) {
            var me = this,
                grid = me.getView().down('grid');

            //debugger;
            var store = grid.getStore(),
                newRecord = Ext.create('Atlas.plan.model.CopayDistribution', {});

            store.insert(0, newRecord);
            grid.getPlugin().startEdit(newRecord, 0);
            grid.getSelection()[0].set('isNew', true);
            this.addedRow = true;
        }

    },

    cancelEditButton: function (editor, context) {
        //debugger;
        if(context.record.phantom)
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
            var grid = this.lookupReference('PlanCopayDistributionGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },
    completeEdit: function (editor, context) {
        // debugger;
        if (context.record.dirty) {
            this.getCopayDistributionRecord().set('isUpdated', true);
        }
        this.addedRow = false;

    },

    validateEdit:function (editor,context,eOpts) {

        //debugger;
        var newrecord = editor.context.newValues;
        if( (newrecord.licsSubsidyPct > 0 || newrecord.mfrResponsibilityPct >0) && (newrecord.licsSubsidyPct + newrecord.mfrResponsibilityPct ) != 100){
            {
                Ext.Msg.alert("Alert", "Sum of LICS Subsidy and Manufacturer’s Resp  should be equal to 100%.");
                return false;
            }
        }

        return true;
    },
    getCopayDistributionRecord: function () {
        //debugger;
        var grid = this.lookupReference('PlanCopayDistributionGrid').getView();
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onCopayDistributionSave: function (button) {
        //debugger;
        this.saveList();
    },
    saveList: function () {
        // debugger;
        var theStore = this.getViewModel().getStore('copaydistributions');
        var planGroupRecord = this.getView().up().down('planBenefit').getSelection();

        var planBenefitId = planGroupRecord.data.planBenefitId ;

        theStore.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);

       var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData(
            [theStore],
            'plan/rx/plancopaydistribution/update',
            'ttCopayDetail',
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

        theStore.reload();

    },
    coveragePhaseRenderer: function (value) {
         //debugger;
        if (value!=null) {
            var coveragePhaseList = this.getViewModel().get('coveragephases');
            if (coveragePhaseList != null) {
                var coveragePhaseItem = coveragePhaseList.findRecord('coveragePhaseId', value);
                if (coveragePhaseItem != null) {
                    var coveragePhaseName = coveragePhaseItem.get('coveragePhaseName');
                    if (coveragePhaseName != null)
                        return coveragePhaseName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    formularyTierRenderer: function (value) {
        // debugger;
        if (value != 0) {
            var formularyTierList = this.getViewModel().get('formularytiers');
            if (formularyTierList != null) {
                var formularyTierItem = formularyTierList.findRecord('FormularyTierID', value);
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
            Ext.MessageBox.alert("PBM - Error", 'Please select the copay distribution item to delete');
        }
    }

});