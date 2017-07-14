/**
 * Created by mrabahnasr on 6/10/2016.
 */
Ext.define('Atlas.claims.view.myclaims.ChangeQuestionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.changequestionsmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.ChangeQuestionsModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: '/packages/local/claims/resources/JSON/ChangeQuestionsModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'ChangeQuestionsModel'
                }
            },
            autoLoad: true
        }
    }


});

