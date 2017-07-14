/**
 * Created by mkorivi on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.store.CaseQueuesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CaseQueuesViewModel',
    stores: {
        StoreMTMCases:
        {
            model: 'Atlas.casemanagement.model.MTMCasesQueue'

        },
        PagingToolbarStore1: {
            storeId: 'PagingToolbarStore1',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore2: {
            storeId: 'PagingToolbarStore2',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore3: {
            storeId: 'PagingToolbarStore3',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore4: {
            storeId: 'PagingToolbarStore4',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore5: {
            storeId: 'PagingToolbarStore5',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore6: {
            storeId: 'PagingToolbarStore6',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore7: {
            storeId: 'PagingToolbarStore7',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        PagingToolbarStore8: {
            storeId: 'PagingToolbarStore8',
            pageSize: 25,
            autoLoad: true,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        StoreMyCasesOverDue: {
            model: 'Atlas.casemanagement.model.MTMCasesQueueMyCasesOverDue'
        },
        StoreMyCasesDueToday: {
            model: 'Atlas.casemanagement.model.MTMCasesQueueMyCasesDueToday',
            autoLoad: false
        },
        StoreAllCasesOverDue: {
            model: 'Atlas.casemanagement.model.MTMCasesQueueAllCasesOverDue',
            autoLoad: false
        },
        StoreAllCasesDueToday: {
            model: 'Atlas.casemanagement.model.MTMCasesQueueAllCasesDueToday',
            autoLoad: false
        },
        StoreOpenMAPCases: {
            model: 'Atlas.casemanagement.model.MTMCasesQueueOpenMAPCases',
            autoLoad: false

        },
        StoreInvitationQ: {

            model: 'Atlas.casemanagement.model.MTMInviationCallQ'



        },
        StoreCMRQ: {

            model: 'Atlas.casemanagement.model.MTMCMRQ'


        },
        StoreTMRQ: {

            model: 'Atlas.casemanagement.model.MTMTMRQ'
        },
        casemanagementalert: {
            model:'Atlas.home.model.MTMAlert'
        }
    }
});