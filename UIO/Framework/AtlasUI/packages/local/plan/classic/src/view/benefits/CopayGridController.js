/**
 * Created by S4505 on 11/23/2016.
 */
Ext.define('Atlas.plan.view.CopayGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefitscopaygrid',
    // listen: {
    //     controller: {
    //         '*': {
    //             reloadCopaySetUp:'onReloadCopaySetUp'
    //
    //         }
    //     }
    // },

    init: function () {

        //this.lookupReference('planBenefitCopyGrid').setDisabled(true);
        //debugger;
        //var planGroup = this.retrievePlanGroup();
        // var canEdit = true;
        // this.getViewModel().set('canEdit',true);
        // this.getViewModel().set('isEditing', false);


    },
    boxReady:function () {

        //debugger;
        this.addedRow = false;
        var atlasRecord = this.getView().up().up().getViewModel().get('isAtlasRecord');

        if(this.getView().up().up().findParentByType('tabpanel').benefitStatus =='A' && !atlasRecord ) {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('planBenefitCopyGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('planBenefitCopyGrid').setDisabled(false);
        }
        if(atlasRecord)
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('planBenefitCopyGrid').setDisabled(true);
        }

    },


    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('planBenefitCopyGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
        else {


            var copayMaintenanceDays = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('maintenanceDays'),
                copayCoveragePhase = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('coveragePhase'),
                copayFormularyTiers = context.grid.getView().up().getPlugin('rowEditing').editor.form.findField('formularyTiers');

            if (context != null && context.record != null && context.record.phantom) {
                copayMaintenanceDays.enable();
                copayCoveragePhase.enable();
                copayFormularyTiers.enable();
            }
            else {
                copayMaintenanceDays.disable();
                copayCoveragePhase.disable();
                copayFormularyTiers.disable();
            }
        }
    },

    completeEdit:function(editor, context)
    {
        var grid = context.grid.getView();
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
            context.record.set('isUpdated', false);
            //btnSave.disable();
        }
        else {
            context.record.set('isUpdated', true);
            //btnSave.enable();
        }

        var curSelModel = grid.getSelectionModel().getSelection()[0];
        var curRow = grid.getSelectionModel().getSelection()[0];
        this.addedRow = false;
    },

    cancelEditButton: function(editor, context) {

        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
        this.addedRow = false;
    },


    onUndoChangeClick:function(button)
    {
        //debugger;

        //var dataToRevert = this.getView().store;
        // var dataToRevert =this.lookupReference('CoveragePhasegrid').getView().store;
        // dataToRevert.getAt(Ext.getCmp(button.id).up()._rowContext.recordIndex).reject();
        //button.up().getViewModel().data.record.reject();

        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.lookupReference('planBenefitCopyGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },

    getCopayInformationRecord: function(context){

        //debugger;
        //var grid = this.getView();
        var grid = context.grid;
        if(grid){
            return context.grid.getSelection()[0];
        }
    },

    onCopayAdd:function(button)
    {

        //debugger;
        if(!this.addedRow) {
            var me = this,
                grid = this.getView().down('grid').getView(),
                store = this.getViewModel().getStore('plancopay'),
                newRecord = new Atlas.plan.model.PlanBenefitsCopay();
            newRecord.set('isNew', true);
            store.insert(0, newRecord);

            var tab = this.getViewModel().get('currentTab');

            Ext.getCmp(tab.id).lookupReference('planBenefitCopyGrid').getView().up().getPlugin('rowEditing').startEdit(newRecord, 0);
            //this.lookupReference('planBenefitCopyGrid').getSelection()[0].set('isNew',true);
            this.addedRow = true;
        }


    },

    onCopayDelete:function(button)
    {

        var me = this;
        var vm = this.getViewModel(),
            grid = this.lookupReference('planBenefitCopyGrid').getView();
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
            Ext.MessageBox.alert("PBM - Error", 'Please select the copay to delete');
        }

    },

    onCopayAdminEdit:function(button)
    {
        //debugger;
        this.lookupReference('planBenefitCopyGrid').setDisabled(false);
        var me=this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    onCopaySave:function(button)
    {

        //debugger;
        var me = this,
            planGroup = me.retrievePlanGroup(),
            planBenefitId = planGroup.get('planBenefitId');

        var pharmNetworkId = this.getView().up().networkId ;
        //var planBenefitId = 11451;
        var fulfillmentType= this.getView().fulFillmentType;


        var theStore = this.getViewModel().getStore('plancopay');

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/plancopay/update', 'ttSetCopayDetail', [true],
            {
                'pPlanBenefitId': planBenefitId,
                'pPharmNetworkId': pharmNetworkId,
                'pfulfillmentType': fulfillmentType

            },
            saveAction, null);

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }

        this.onReloadCopaySetUp(planBenefitId,pharmNetworkId,fulfillmentType);

        // me.getViewModel().set('isEditing', false);
        // me.getViewModel().set('canEdit', true);

        if(this.getView().up().up().findParentByType('tabpanel').benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('planBenefitCopyGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('planBenefitCopyGrid').setDisabled(false);
        }
    },

    coveragePhaseRenderer: function(value){
        //debugger;
        if(value!=null) {
            var cvrgPhases = this.getViewModel().get('coveragephases');
            if(cvrgPhases!=null ) {
                var cvrgPhase = cvrgPhases.findRecord('coveragePhaseId', value);
                if(cvrgPhase !=null) {
                    var cvrgPhaseName = cvrgPhase.get('coveragePhaseName')
                    if(cvrgPhaseName!=null)
                        return cvrgPhaseName;
                }
            }
        }
        return '';
    },

    FormularyTiersRenderer: function(value){
        //debugger;
        if(value!=null) {
            var formularyTiers = this.getViewModel().get('formularytiers');
            if(formularyTiers!=null ) {
                var formularyTier = formularyTiers.findRecord('TierCode', value);
                if(formularyTier !=null) {
                    var formularyTierName = formularyTier.get('TierDesc');
                    if(formularyTierName!=null)
                        return formularyTierName;
                }
            }
        }
        return '';
    },



    CopayLesserOfRenderer: function(value){
        //debugger;
        if(value!=null) {
            var plancopayrules = this.getViewModel().get('plancopayrule');
            if(plancopayrules!=null ) {
                var plancopayrule = plancopayrules.findRecord('copayLesserOf', value);
                if(plancopayrule !=null) {
                    var plancopayruleName = plancopayrule.get('CopayRuleName');
                    if(plancopayruleName!=null)
                        return plancopayruleName;
                }
            }
        }
        return '';
    },

    maintenanceDaysRenderer: function(value){
        //debugger;
        if(value!=null) {
            var maintenanceDays = this.getViewModel().get('maintenance');
            if(maintenanceDays!=null ) {
                var maintenanceDay = maintenanceDays.findRecord('value', value);
                if(maintenanceDay !=null) {
                    var maintenanceDayName = maintenanceDay.get('name');
                    if(maintenanceDayName!=null)
                        return maintenanceDayName;
                }
            }
        }
        return '';
    },

    onReloadCopaySetUp:function(planBenefitId,networkId,fullfilmentType)
    {
        var copayTab = this.getView().up('plan-benefits-copay');
        if(copayTab)
        {
            copayTab.getController().onReloadCopaySetUp(planBenefitId,networkId,fullfilmentType);
        }

    },
    retrievePlanGroup: function() {
        //debugger;
        return this.getView().up().up().findParentByType('tabpanel').down('planBenefit').getSelection();
    }
});