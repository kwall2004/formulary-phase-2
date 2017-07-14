/*
 * Last Developer: Srujith Cheruku
 * Date: 11-22-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry
 * Description: Gives users a place to view Visit Counts Controller
 */
Ext.define('Atlas.portals.provider.VisitCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderVisitCountController',

    init: function() {
        var currentYear = new Date().getFullYear(),
            combo = this.lookupReference('yearCombo'),
            year = [],
            years = [],
            yearsStore = {};

        if (!this.getView().up().getViewModel().get('displayDate')) {
            this.lookupReference('yearToolbar').hidden = true;
            return;
        }
        for (currentYear; currentYear >= 1998; currentYear--) {
            year = [];
            year.push(currentYear);
            years.push(year);
        }

        yearsStore = new Ext.data.ArrayStore({
            fields: ['value'],
            data: years
        });

        combo.setStore(yearsStore);
        combo.setValue(new Date().getFullYear());
    },

    loadVisitCount: function() {
        var vm = this.getView().up().getViewModel(),
            visitCountStore = this.getView().getViewModel().getStore('visitCountStore'),
            recipientId = vm.get('recipientId'),
            benefitPlanCode = vm.get('benefitPlanCode'),
            year = vm.get('displayDate') ? this.lookupReference('yearCombo').value : new Date().getFullYear(),
            startDate = '01/01/' + year,
            endDate = '12/31/' + year,
            dateRange = startDate + '|' + endDate + '|';

        visitCountStore.getProxy().setExtraParam('pRecipientID', recipientId);
        visitCountStore.getProxy().setExtraParam('pParameters', dateRange + benefitPlanCode);
        visitCountStore.load();
    }
});