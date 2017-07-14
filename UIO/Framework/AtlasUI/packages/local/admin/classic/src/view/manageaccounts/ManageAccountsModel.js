/**
 * Created by mrabahnasr on 6/10/2016.
 */
Ext.define('Atlas.admin.view.myclaims.ManageAccountsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.manageaccountsmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.ChangePasswordModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: '/packages/local/claims/resources/JSON/ManageAccounts.json',
                reader: {
                    type: 'json',
                    rootProperty: 'ManageAccountsModel'
                }
            },
            autoLoad: true
        }
    }


});

