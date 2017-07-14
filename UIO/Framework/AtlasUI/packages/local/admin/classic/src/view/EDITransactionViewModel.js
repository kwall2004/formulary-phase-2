/**
 * Created by s6685 on 11/30/2016.
 */
Ext.define('Atlas.admin.view.EDITransactionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.EDITransactionViewModel',
    stores: {

        EDITransactionsStore: {
            model: 'Atlas.admin.model.EDITransactionsModel',
            autoLoad: true

        },
        EDIHubsSourceStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName:'EDIHub'
                },
                url: 'shared/{0}/listitems'
            }
        },
        EDIPortsStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName:'EDIPort'
                },
                url: 'shared/{0}/listitems'
            }
        },

        LOBStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'EDIProcessorCntr'
                },
                url: 'shared/{0}/listitems'


            }
        },
        TransactionDetailstore: {
            model: 'Atlas.admin.model.EDITransactionModel',
            autoLoad: true
        }



    }
});

