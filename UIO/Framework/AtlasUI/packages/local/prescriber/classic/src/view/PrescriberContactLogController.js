/**
 * Created by T4317 on 10/24/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberContactLogController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.prescribercontactlogcontroller',
    init:function () {
        //debugger;
        var vm = this.getViewModel();
        var contactlogstore = vm.getStore('contactloglist');
        var masterrecord = vm.get('masterrecord');
        if(masterrecord){
            contactlogstore.getProxy().setExtraParam('pKeyType', 'npi');
            contactlogstore.getProxy().setExtraParam('pKeyValue', masterrecord.get('npi'));
            contactlogstore.load();

            if(vm.get('masterrecord')) {
                this.fireEvent('recordLoaded');
            }
        }
    }
});