/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGHistoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdaghistoryviewmodel',
    stores: {
        storehistoryjson: {
            model: 'Atlas.authorization.model.cdag.MemberPAHistoryModel',
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
