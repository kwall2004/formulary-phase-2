/**
 * Created by mrabahnasr on 6/10/2016.
 */
Ext.define('Atlas.claims.view.myclaims.ManageProvidersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.manageprovidersmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.ManageProvidersModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: '/packages/local/claims/resources/JSON/ManageProvidersModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'ManageProvidersModel'
                }
            },
            autoLoad: true
        }
    }


});

