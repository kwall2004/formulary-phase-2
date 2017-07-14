/**
 * Created by n6684 on 11/29/2016.
 */

Ext.define('Atlas.common.view.MyProfileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myprofileviewmodel',

    stores: {
        userdashboarditems: {
            model: 'Atlas.common.view.GetUserDashboardItems',
            autoLoad: false
        }
    }
});
