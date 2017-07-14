/**
 * Created by j2487 on 9/28/2016.
 * Developer: Jagman Bhullar
 * Controller for Member-->Menu-->Drug Allergies
 */
Ext.define('Atlas.member.view.MemberDrugAllergiesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberdrugallergies',
    init: function(){
        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        this.RefreshDrugAllergy(recipientID);
    },
    listen:{
        controller:{
            'member': {
                MemberChange: 'RefreshDrugAllergy'
            }
        }

    },
    RefreshDrugAllergy:function (recipientID,parentPanelId) {
        if(this.getView().up().id == parentPanelId) {
            var ViewModel = this.getViewModel();
            var MemDrugAllergiesstore = ViewModel.getStore('memberdrugallergiesstore');
            MemDrugAllergiesstore.getProxy().setExtraParam('pRecipientId', recipientID);
            MemDrugAllergiesstore.load();
        }
    }
});