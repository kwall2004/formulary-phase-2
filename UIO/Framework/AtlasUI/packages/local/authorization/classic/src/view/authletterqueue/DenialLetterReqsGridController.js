/**
 * Created by s6685 on 11/10/2016.
 */
var objAuthLtrMst = Ext.create('Atlas.authorization.view.authletterqueue.AuthLetterQueueController');
Ext.define('Atlas.authorization.view.authletterqueue.DenialLetterReqsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DenialLetterReqsGridController',
    onClick: function(component, eOpts) {
        var authid =component.getWidgetRecord().data.AuthId;
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
            var AuthID=view.actionables[0].activeRecord.data.AuthId;
            var modelSetPAMAster = Ext.create('Atlas.authorization.model.cdag.SetPAMAsterModel');
            modelSetPAMAster.getProxy().setExtraParam('pAuthID', AuthID);
            modelSetPAMAster.getProxy().setExtraParam('pFields', 'AssignTo');
            modelSetPAMAster.getProxy().setExtraParam('pFieldList', AssignTo);
            modelSetPAMAster.getProxy().setExtraParam('pMode', 'U');
            modelSetPAMAster.phantom = false;
            modelSetPAMAster.save();
    }
});
