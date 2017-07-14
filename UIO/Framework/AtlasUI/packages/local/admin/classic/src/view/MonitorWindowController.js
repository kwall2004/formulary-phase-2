/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.MonitorWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitorwindowcontroller',

    grdMonitor_ItemClick : function(dv, record){
        this.fireEvent('parentEventSetMonitorDetail',record.data);
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }

    },

    init: function(){}
});