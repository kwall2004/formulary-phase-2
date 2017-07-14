Ext.define('Atlas.finance.view.collection.ClaimAuditSearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-claimsearch',

    stores: {
        claimauditsearch: {
            model:'Atlas.finance.model.ClaimAuditSearch'
        },

        reasoncode: {
            model:'Atlas.finance.model.ReasonCode',
            autoLoad: true
        },

        errorcode: {
            model:'Atlas.finance.model.ErrorCode',
            autoLoad: true
        },

        PagingToolbarStore: {
            storeId: 'PagingToolbarStore',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        resolutioncode: {
            model:'Atlas.finance.model.ResolutionCode',
            autoLoad: true
        }
    },

    data: {
        pQueueName: 'Search',
        pTransId: null,
        pStartDate: null,
        pEndDate: null,
        pAuditErrorCode: null,
        ipiBatchSize: 25,
        ipiJumpStart: 0,
        ipcFilter: '',
        ipcDirection: 'Fwd',
        ipcBckRecPointer: '',
        ipcFwdRecPointer: '',
        pagination: false,
        loadPagination: true
    }
});