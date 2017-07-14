/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.EDIPartnerWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edipartnerwincontroller',

    grdEDIPartnerInfo_ItemClick : function(dv, record){
        this.fireEvent('parentEventSetEDIPartnerId',record.data.partnerId);
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }

    },

    init: function(){}
});