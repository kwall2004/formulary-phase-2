/**
 * Created by n6684 on 12/9/2016.
 */

Ext.define('Atlas.admin.view.MenuAdvancedSecuritySettingsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_menuadvancedsecuritysettingsviewmodel',
    stores: {
        users: {
            model: 'Atlas.common.model.UserList',
            autoLoad: false
        },

        storegroupdata:{
            model: 'Atlas.admin.model.MenuAdvancedSecuritySettings',
            autoLoad: false
        }

    }
});