/**
 * Created by j2487 on 9/30/2016.
 * Developer: Jagman Bhullar
 * Controller for Member-->Menu-->DMR
 */
Ext.define('Atlas.member.view.MemberDMRController', {
    extend: 'Ext.app.ViewController',
    alias:'controller.memberdmr',

    listen: {
        controller: {
            '#memberdmrfaxqueuecontroller': {
                attachFax: 'enableFaxAttachedButton'
            }
        }
    },

    init: function(){
        var me= this,
            parentViewModel = me.getView().up('panel').getViewModel();

        me.loadMemberData(parentViewModel);
    },

    createViewMemberDMRWindow:function()
    {
        var me = this,
            view = me.getView(),
            ViewMemberDMRWindow = view.add(win),
            storeViewMemberDMR = me.retrieveStore('viewMemberDMR');

        storeViewMemberDMR.load({
            callback: function(){
                ViewMemberDMRWindow.show();
            }
        });
    },

    loadMemberData: function(parentViewModel){
        var me = this,
            contactPerson = me.getView().down('#dmrContactPerson'),
            cbxDMRStatus = me.retrieveStore('getListItemByUser');

        contactPerson.setValue(parentViewModel.respFirstName + ' ' + parentViewModel.respLastname);

        cbxDMRStatus.getProxy().setExtraParam('pListName', 'DMRStatus');
        cbxDMRStatus.load();
    },

    showDmrFaxQueue: function(){
        var me = this;
        var faxQueue = Ext.create('Atlas.member.view.DMRFaxQueue');
    },

    pharmacyServiceTypeSelect: function(){
        var me = this,
            storePharmacyServiceType = me.retrieveStore('pharmacyServiceType');

        storePharmacyServiceType.getProxy().setExtraParam('pListName', 'PharmacyServiceType');
        storePharmacyServiceType.load();
    },

    enableFaxAttachedButton: function(faxDocID, faxSystemID, confirmFaxAttached/*, viewAttachmentDisabled*/){
        var me = this,
            faxAttachedButton = me.getView().down('#dmrFaxAttached'),
            confirmAttached = me.getView().down('#confirmDmrFaxAttached'),
            hiddenVals = me.getView().hiddenValues;

        confirmAttached.setValue(confirmFaxAttached);
        faxAttachedButton.enable();
        hiddenVals.faxDocumentID = faxDocID;
        hiddenVals.faxSysID = faxSystemID;
    },

    retrieveStore: function(storeName){
        var storeVal = this.getViewModel().getStore(storeName);
        return storeVal;
    }

});
