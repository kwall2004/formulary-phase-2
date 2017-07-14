/**
 * Created by n6684 on 12/7/2016.
 */

Ext.define('Atlas.admin.view.MenusUpdateFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menusupdateformviewmodel',

    stores: {
        dashboardItems: {
            type: 'clonestore',
            autoLoad: true,
            model: 'Atlas.admin.model.DashboardItem',
            filters: [
                function (item) {
                    return item.get('isDefault') != true
                }

            ],
            proxy: {
                url: 'system/rx/dashboardmaster'
            }
        },
        menuDashboardItems: {
            type: 'clonestore',
            autoLoad: true,
            // listeners:{
            //     load: 'onMenuDashboardLoad'
            // },
            proxy: {
                extraParams:{
                   // pMenuID: record.get('menuID')
                },
                url: 'system/rx/dashboardmenuaccess'
            }
        }
    }
});
