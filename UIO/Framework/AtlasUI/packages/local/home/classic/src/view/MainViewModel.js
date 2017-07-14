Ext.define('Atlas.home.view.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboardhomemain',

    stores: {
        userdashboarditems: {
            model: 'Atlas.common.view.GetUserDashboardItems',
            autoLoad: false
        }
    }
});