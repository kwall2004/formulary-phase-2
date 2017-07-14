/**
 * Created by j2487 on 10/22/2016.
 */
Ext.define('Atlas.member.view.MemberClaimsController', {
    extend: 'Atlas.common.view.sharedviews.ClaimsController',
    alias: 'controller.memberclaims',

    init: function() {
        var vm = this.getViewModel();
        vm.set('memberTypeAheadIsEnabled', false);
        var parentViewModel = this.getView().up('panel').getViewModel();
       /* var recipientID = parentViewModel.data.masterrecord.data.recipientID;
        var firstName = parentViewModel.data.masterrecord.data.firstname;
        var lastName = parentViewModel.data.masterrecord.data.lastname;
        var memberName = firstName + '' + lastName;

        this.getView().down('#memtypeahead').setValue(memberName);*/

    },
    onClaimsSearch: function() {
        var view = this.getView();
        var vm = this.getViewModel(),
            claimsStore = vm.getStore('claims'),
            CDAGTopPanelData = vm.get('CDAGTopPanelData'),
            parentViewModel,
            recipientID = '',
            where='';

        if (CDAGTopPanelData != null && CDAGTopPanelData != undefined) {
            recipientID = CDAGTopPanelData.RecipientID;
        }
        else {
            parentViewModel = this.getView().up('panel').getViewModel();
            if(parentViewModel.data.masterrecord != null){
               
                recipientID = parentViewModel.data.masterrecord.recipientID;
            }

        }

        this.fireEvent('SearchClaimsCommonController', 'recipientID', recipientID);
    }

});
