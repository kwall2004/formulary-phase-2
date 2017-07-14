/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdaghistorycontroller',

    initViewModel: function () {
        var parentRecipientID = 98900;//Ext.ComponentQuery.query('hidPARecipientID')[0].getValue();
        var vm = this.getViewModel();
        var store = vm.getStore('storehistoryjson');
        store.getProxy().setExtraParam('pKeyValue', parentRecipientID);
        store.getProxy().setExtraParam('pKeyType', 'RecipientID');
        store.load();
    },

    row_dblClick : function(dv, record, item, index, e){
        var authid = record.data.AuthID,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
        this.fireEvent('openView','merlin','authorization','cdag_CDAGMain',{
            menuId: menuId,
            authID: authid
        })
    },

    showPriorAuthInfo :function (PriorAuthMenuID, CDAGMenuId, authID) {
    if (PriorAuthMenuID == 0 || CDAGMenuId == 0) {
        Ext.Msg.alert("Security", "You do not have access to this module.");
        return;
    }

    /*Ext.net.DirectMethods.GetAuthOrigin(authID, { -------------------------- need to implement
        success: function (Origin) {
            var title = 'Prior Authorization';

            if (Origin == "CDAG") {
                var URL = 'Authorization/CDAGMain.aspx?ID=' + CDAGMenuId + '&PAID=' + authID;
                title = 'CDAG';
            }
            else {
                var URL = 'Authorization/PriorAuthInfo.aspx?ID=' + PriorAuthMenuID + '&PAID=' + authID;
            }
            CheckTabExceedLimit(title, URL);
        },
        eventMask: {
            showMask: false
        }
    });*/
}

});