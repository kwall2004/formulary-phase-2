/**
 * Created by T4317 on 10/26/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberAddContactController', {
    extend: 'Atlas.common.view.sharedviews.AddContactLogController',
    alias: 'controller.prescriberaddcontactcontroller',
    init:function() {
        //debugger;
        var me = this,
            vm = this.getViewModel(),view = Ext.first('viewport').down().down().lookup('prescribertoolbar'),
            prescribertoolbarvm = view.getViewModel(),
            prescribertypeahead = this.getView().lookup('prescribertypeaheadbox');

        me.callParent();
        vm.set('prescriberrecord', prescribertoolbarvm.get('masterrecord'));
        prescribertypeahead.setValue(prescribertoolbarvm.get('masterrecord').get('fullname'));
        prescribertypeahead.npi = prescribertoolbarvm.get('masterrecord').get('npi');


    }

});
