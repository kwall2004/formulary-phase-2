/**
 * Created by s6685 on 11/10/2016.
 */
Ext.define('Atlas.authorization.view.authletterqueue.ApprovalLettersGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ApprovalLettersGridController',
    onClick: function(component, eOpts) {
        var authid =component.getWidgetRecord().data.authid;
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
        var AuthID=view.actionables[0].activeRecord.data.authid;
        var SystemId=view.actionables[0].activeRecord.data.systemID;

        var modelGetAuthLetter = Ext.create('Atlas.authorization.model.SetAuthLetterDetailModel');
        modelGetAuthLetter.getProxy().setExtraParam('pSystemID',SystemId);
        modelGetAuthLetter.getProxy().setExtraParam('pFields', 'AssignTo');
        modelGetAuthLetter.getProxy().setExtraParam('pFieldList', AssignTo);
        modelGetAuthLetter.getProxy().setExtraParam('pMode', 'U');
        modelGetAuthLetter.phantom = false;
        modelGetAuthLetter.save();
    }
});