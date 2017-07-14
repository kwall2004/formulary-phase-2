/**
 * Created by agupta on 10/16/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGOutreachViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdagoutreachviewmodel',
    stores: {

        storeoutreachhistory: {
            model: 'Atlas.authorization.model.cdag.OutreachModel',
            autoLoad: false
        },

        storedetermination: {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModel',
            autoLoad: false
        }
        /*storereviewreason: {
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



         */

    }
});
