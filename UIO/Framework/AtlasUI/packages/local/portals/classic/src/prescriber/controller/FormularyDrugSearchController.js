/**
 * Created by c4539 on 10/3/2016.
 */
Ext.define('Atlas.portals.prescriber.controller.FormularyDrugSearchController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsPrescriberFormularyDrugSearchController',

    init: function() {
        var view = this.getView();

        if (!view.brand || !view.planGroupId || !view.planGroupName) { return; }

        this.lookupReference('drugSearch').setValue(view.brand);
        this.getViewModel().set('_drugTitle', view.brand);
        this.lookupReference('plan').setValue(view.planGroupId);
        this.lookupReference('plan').setRawValue(view.planGroupName);

        this.lookupReference('coveredOnly').setValue('0');
        this.lookupReference('noPriorAuthorization').setValue('0');
        this.lookupReference('overTheCounter').setValue('0');
        this.lookupReference('genericAlternatives').setValue('0');

        this.onDrugSearch();
    },

    onDrugSearch: function() {
        var me = this,
            form = me.lookupReference('drugsearchform'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            drugSearchResults = vm.getStore('formularyDrugSearchResults'),
            user = Ext.first('viewport').getViewModel().get('user');

        if(form.isValid()){
            drugSearchResults.getProxy().setExtraParam('pSessionID', user.retSessionID);
            drugSearchResults.getProxy().setExtraParam('pBN', parameters.drugSearch);
            drugSearchResults.getProxy().setExtraParam('pCovered', parameters.coveredOnly !== "0");
            drugSearchResults.getProxy().setExtraParam('pPA', parameters.noPriorAuthorization !== "0");
            drugSearchResults.getProxy().setExtraParam('pOTC', parameters.overTheCounter !== "0" ? "1" : "0");
            drugSearchResults.getProxy().setExtraParam('pPlanGroupID', parameters.plan);
            drugSearchResults.getProxy().setExtraParam('pGeneric', parameters.genericAlternatives !== "0" ? "GEN" : "");
            drugSearchResults.getProxy().setExtraParam('pPreferred', parameters.preferred !== "0" && vm.get('isPreferred'));
            drugSearchResults.getProxy().setExtraParam('pFormularyTier', parameters.tier);
            drugSearchResults.load({
                callback: function(records) {
                    if (records.length === 0) {
                        vm.set('hasDrugs', false);
                        Ext.Msg.alert('Alert', 'No Generic Alternatives Available for the Searched Drug');
                        return;
                    }
                    vm.set('hasDrugs', records.length > 0);
                }
            });
            vm.set('drugTitle', vm.get('_drugTitle'));
        }
    },

    onMedicationSelected: function(combo, record) {
        this.getViewModel().set('_drugTitle', record.get('BN'));
    },

    onPlanSelected: function(combo, record) {
        var me = this,
            queryDbModel = Ext.create('Atlas.common.model.shared.QueryDb', {}),
            user = Ext.first('viewport').getViewModel().getData().user;

        this.getViewModel().set('isPreferred', record.get('planGroupId') === 191);
        queryDbModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        queryDbModel.getProxy().setExtraParam('pBuffer', 'plangroup');
        queryDbModel.getProxy().setExtraParam('pField', 'formularyId');
        queryDbModel.getProxy().setExtraParam('pWhere', 'planGroupId = ' + record.get('planGroupId'));
        queryDbModel.load({
            callback: function(formulary) {
                me.lookupReference('tier').setValue(null);
                me.loadFormularyTiers(this.getProxy().getReader().metaData.pList);
            }
        });
    },

    loadFormularyTiers: function(formularyId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            formularyTiers = vm.getStore('formularyTiers');

        formularyTiers.getProxy().setExtraParam('pSessionID', user.retSessionID);
        formularyTiers.getProxy().setExtraParam('piFormularyID', formularyId);
        formularyTiers.load({
            callback: function(tiers) {
                vm.set('hasTiers', tiers.length > 0);
            }
        });
    },

    onDrugSelected: function(view, record) {
        var me = this,
            form = me.lookupReference('drugdetails');
        me.getViewModel().set('drugDetailTitle', record.get('BN'));
        form.loadRecord(record);
    },

    exportToExcel: function() {
        var grid = this.lookupReference('drugSearchGrid');

        if (!this.getViewModel().data.hasDrugs) { return; }
        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Formulary Drug Search',
            fileName: 'FormularyDrugSearch.xlsx'
        });
    }
});