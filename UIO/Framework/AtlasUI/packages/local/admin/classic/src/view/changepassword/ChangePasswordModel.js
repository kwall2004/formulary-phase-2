/**
 * Created by mrabahnasr on 6/10/2016.
 */
Ext.define('Atlas.claims.view.myclaims.ChangePasswordModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.changepasswordmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.ChangePasswordModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: '/packages/local/claims/resources/JSON/ChangePasswordModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'ChangePasswordModel'
                }
            },
            autoLoad: true
        }
    }


});

