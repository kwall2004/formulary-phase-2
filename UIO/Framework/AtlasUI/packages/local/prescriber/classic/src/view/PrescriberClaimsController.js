/**
 * Created by T4317 on 10/11/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberClaimsController', {
    extend: 'Atlas.common.view.sharedviews.ClaimsController',
    alias: 'controller.prescriberclaims',
    init: function () {
        var vm = this.getViewModel();
        vm.set('prescriberTypeAheadIsEnabled', false);
        this.getView().up().up().getViewModel().set('openedTabs.claims', true);
    },

    onClaimsSearch: function () {
        //------------------------------------------------------------------------------
        var view = this.getView();
        var where = '';
        var masterrecord = this.getView().up().up().getViewModel().get('masterrecord');

        if(masterrecord) {
            var npi = this.getView().up().up().getViewModel().get('masterrecord').data.npi;
            this.fireEvent('SearchClaimsCommonController', 'npi', npi);

        } else {
            Ext.MessageBox.alert('Message', 'Please select prescriber to search for a claim');
        }

    }
});
