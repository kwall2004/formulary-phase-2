/**
 * Created by s6685 on 11/10/2016.
 */
Ext.define('Atlas.authorization.view.authletterqueue.PendingAppealDecisionGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PendingAppealDecisionGridController',
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
    },
    assignToSelect:function(combobox) {
        //objAuthLtrMst.fireEvent('parentEventGetPA');
        var view = this.getView();
        var AssignTo =combobox.getValue();
        var AuthID=view.actionables[0].activeRecord.data.AuthID;
        var SystemId=view.actionables[0].activeRecord.data.appealdetailsystemID;
        var modelSetPAMAster = Ext.create('Atlas.authorization.model.cdag.SetPAMAsterModel');
        modelSetPAMAster.getProxy().setExtraParam('pAuthID', AuthID);
        modelSetPAMAster.getProxy().setExtraParam('pFields', 'appealAssignTo');
        modelSetPAMAster.getProxy().setExtraParam('pFieldList', AssignTo);
        modelSetPAMAster.getProxy().setExtraParam('pMode', 'U');
        modelSetPAMAster.phantom = false;
        modelSetPAMAster.save();

        var DenialDetailModel = Ext.create('Atlas.authorization.model.SetAppealDenialDetailModel');
        DenialDetailModel.getProxy().setExtraParam('pSystemId',SystemId);
        DenialDetailModel.getProxy().setExtraParam('pAuthId', AuthID);
        DenialDetailModel.getProxy().setExtraParam('pFields', AssignTo);
        DenialDetailModel.getProxy().setExtraParam('pFieldList', 'AssignTo');
        DenialDetailModel.getProxy().setExtraParam('pMode', 'U');
        DenialDetailModel.phantom = false;
        DenialDetailModel.save();


    }
});
