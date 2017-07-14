/**
 * Created by s6685 on 11/10/2016.
 */

Ext.define('Atlas.authorization.view.authletterqueue.InterventionLettersReqGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterventionLettersReqGridController',
    onClick: function(component, eOpts) {
        var authid =component.getWidgetRecord().data.AuthID;
        var memberid = component.getWidgetRecord().data.authID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
        me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
            atlasId: authid,
            menuId: menuId,
            activeTab: 3
        }, null);
    }
    ,onCheckClick: function(btn) {
        var AuthID =btn._rowContext.record.data.AuthID;
        var vm = this.getViewModel();
       var ownerGrid= btn._rowContext.ownerGrid;
        var ReqInterventionLetterStore = Ext.getStore('ReqInterventionLetterStore');
       Ext.Msg.confirm('Intervention Letter', 'There is no intervention letter for this Auth. Are you sure you would like to acknowledge?', function (btn) {
            if (btn == 'yes') {
                var modelSetPAMAster = Ext.create('Atlas.authorization.model.cdag.SetPAMAsterModel');
                modelSetPAMAster.getProxy().setExtraParam('pAuthID', AuthID);
                modelSetPAMAster.getProxy().setExtraParam('pFields', 'AckFlag');
                modelSetPAMAster.getProxy().setExtraParam('pFieldList', 'yes');
                modelSetPAMAster.getProxy().setExtraParam('pMode', 'U');
                modelSetPAMAster.phantom = false;
                modelSetPAMAster.save();
                vm.getStore('ReqInterventionLetterStore').load();
                ownerGrid.setTitle('Intervention Letters Required<font style=color:gray;> (' + (parseInt(vm.getStore('ReqInterventionLetterStore').totalCount)-1).toString()+ ')</font>')

            }
            });
    },
    assignToSelect:function(combobox) {
        //objAuthLtrMst.fireEvent('parentEventGetPA');
        var view = this.getView();
        var AssignTo =combobox.getValue();
        var AuthID=view.actionables[0].activeRecord.data.AuthID;
        var modelSetPAMAster = Ext.create('Atlas.authorization.model.cdag.SetPAMAsterModel');
        modelSetPAMAster.getProxy().setExtraParam('pAuthID', AuthID);
        modelSetPAMAster.getProxy().setExtraParam('pFields', 'AssignTo');
        modelSetPAMAster.getProxy().setExtraParam('pFieldList', AssignTo);
        modelSetPAMAster.getProxy().setExtraParam('pMode', 'U');
        modelSetPAMAster.phantom = false;
        modelSetPAMAster.save();
    }
});
