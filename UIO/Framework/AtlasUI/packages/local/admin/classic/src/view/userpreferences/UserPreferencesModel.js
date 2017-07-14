/**
 * Created by mrabahnasr on 6/10/2016.
 */
Ext.define('Atlas.claims.view.myclaims.UserPreferencesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userpreferencesmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.UserPreferencesModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: '/packages/local/claims/resources/JSON/UserPreferencesModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'UserPreferencesModel'
                }
            },
            autoLoad: true
        }
    }


});

