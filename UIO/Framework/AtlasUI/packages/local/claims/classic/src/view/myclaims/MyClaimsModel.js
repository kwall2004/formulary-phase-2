/**
 * Created by dmadhanagopal on 5/24/2016.
 */
Ext.define('Atlas.claims.view.myclaims.MyClaimsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myclaimsmodel',
    data:{

    },
    stores: {
        MyClaimsStore: {
            //model: 'MemberPortal.model.MyClaimsModel',

            proxy: {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an HttpProxy would be better
                type: 'ajax',
                url: 'resources/data/dummydata/claims/MyClaimsData.json',
                reader: {
                    type: 'json',
                    rootProperty: 'myClaimsData'
                }
            },
            autoLoad: true
        }
    }


});

