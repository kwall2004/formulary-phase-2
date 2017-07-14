/**
 * Created by j2487 on 10/27/2016.
 */
Ext.define('Atlas.prescriber.view.MemberAddContactController', {
    extend: 'Atlas.common.view.sharedviews.AddContactLogController',
    alias: 'controller.memberaddcontactcontroller',
    init:function() {

        var me = this;
        me.callParent();
        var view = Ext.first('viewport').down().down().lookup('membertoolbar'),
            membertoolbarvm = view.getViewModel(),
            membertypeahead = this.getView().lookup('membertypeaheadbox'),
        plantypeahead = this.getView().down('#Plan');
     //  var MemberName = membertoolbarvm.data.masterrecord.data.MemberName;

       membertypeahead.setValue(membertoolbarvm.get('masterrecord').get('MemberName'));
        plantypeahead.setValue(membertoolbarvm.get('planGroupName'));

    }

});
