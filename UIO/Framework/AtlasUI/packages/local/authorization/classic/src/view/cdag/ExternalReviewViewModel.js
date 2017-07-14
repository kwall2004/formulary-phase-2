/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.ExternalReviewViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.externalreviewviewmodel',
    stores: {

        storereviewreason: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PAExternalReviewReason'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storecdrd: {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModel',
            autoLoad: false
        },


        storerereviewtype: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PAExternalReviewType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storereviewdecision : {
            model: 'Atlas.authorization.model.cdag.ListMaintenanceModel',
            autoLoad: false
        },

        storeexternalreviewlist : {
            model: 'Atlas.authorization.model.cdag.ExternalReviewModel',
            autoLoad: false
        }
    }
});
