Ext.define('Atlas.common.view.sharedviews.CMMPPPPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cmmppppanel',

    //TODO ! Important Model should not touch View!
    formulas: {
        showClaim: function (get) {
            return !!this.getView().moduleVisibility.claim;
        },
        showMember: function (get) {
            return !!this.getView().moduleVisibility.member;
        },
        showMedication: function (get) {
            return !!this.getView().moduleVisibility.medication;
        },
        showPCP: function (get) {
            return !!this.getView().moduleVisibility.pcp;
        },
        showPharmacy: function () {
            return !!this.getView().moduleVisibility.pharmacy;
        }
    }
});