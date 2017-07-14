/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGReviewHistoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdagreviewhistoryviewmodel',
    stores: {

        storestatushistory: {
            model: 'Atlas.authorization.model.cdag.PAStatusHistoryModel',
            autoLoad: false
        },
        storecoverageaudituniverse: {
            model: 'Atlas.authorization.model.cdag.CoverageAuditUniverseModel',
            groupField: 'GroupId',
            autoLoad: false
        }

        /*storeauthstatus: {
         type: 'clonestore',
         model: 'Atlas.common.model.shared.ListModel',
         proxy: {
         extraParams: {
         pListName: 'PriorAuthStatus'
         },
         url: 'shared/{0}/listitems'
         }
         }*/
    }
});
