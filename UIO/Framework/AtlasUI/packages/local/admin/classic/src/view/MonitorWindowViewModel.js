/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.MonitorWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.monitorwindowviewmodel',
    stores: {
        storeMonitorList: {
            model:'Atlas.admin.model.MonitorDirectoryModel',
            autoLoad: true
        }
    }
});
