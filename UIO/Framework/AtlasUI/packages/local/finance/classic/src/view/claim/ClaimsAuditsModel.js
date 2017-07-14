Ext.define('Atlas.finance.view.collection.ClaimsAuditsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-claimsaudits',

    stores: {
        responseQueue: {
            model: 'Atlas.finance.model.ClaimAuditSearch'
        },

        resolutionQueue: {
            model: 'Atlas.finance.model.ClaimAuditSearch'
        },

        resolutionCode: {
            model: 'Atlas.plan.model.DMRLob',
            autoLoad: false,
            listeners: {
                load: 'resolutionCodeInitLoad'
            }
        },

        takeBacks: {
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,// required for correct filtering using paging memory
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },

        takeBacksAllRecs: {
            model: 'Atlas.finance.model.ClaimAuditSearch'
        },

        approvalQueue: {
            model: 'Atlas.finance.model.ClaimAuditSearch'
        },

        setClaimAudits: {
            model: 'Atlas.finance.model.setClaimAudit'
        },

        PagingToolbarResponse: {
            storeId: 'PagingToolbarResponse',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        PagingToolbarResolution: {
            storeId: 'PagingToolbarResolution',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        PagingToolbarTakeBack: {
            storeId: 'PagingToolbarTakeBack',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        PagingToolbarApproval: {
            storeId: 'PagingToolbarApproval',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        errorCode: {
            model: 'Atlas.common.model.shared.ListModel'
        },

        reasonCode: {
            model: 'Atlas.common.model.shared.ListModel'
        }
    },

    data: {
        searchParamsResponse: {
            pQueueName: 'Response',
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
        },
        searchParamsResolution: {
            pQueueName: 'Resolution',
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
        },
        searchParamsTakeBacks: {
            pQueueName: 'TakeBacks',
            pTransId: null,
            pStartDate: null,
            pEndDate: null,
            pAuditErrorCode: '',
            ipiBatchSize: 0,
            ipiJumpStart: 0,
            ipcFilter: '',
            ipcDirection: 'Fwd',
            ipcBckRecPointer: '',
            ipcFwdRecPointer: '',
            pagination: false,
            loadPagination: true
        },
        searchParamsApproval: {
            pQueueName: 'PendingApproval',
            pTransId: null,
            pStartDate: null,
            pEndDate: null,
            pAuditErrorCode: '',
            ipiBatchSize: 25,
            ipiJumpStart: 0,
            ipcFilter: '',
            ipcDirection: 'Fwd',
            ipcBckRecPointer: '',
            ipcFwdRecPointer: '',
            pagination: false,
            loadPagination: true
        },
        fromDateResponse: Ext.Date.subtract(new Date((new Date()).setHours(0, 0, 0, 0)), Ext.Date.DAY, 7),
        toDateResponse: new Date((new Date()).setHours(0, 0, 0, 0)),
        fromDateResolution:Ext.Date.subtract(new Date((new Date()).setHours(0, 0, 0, 0)), Ext.Date.DAY, 7),
        toDateResolution:new Date((new Date()).setHours(0, 0, 0, 0)),
        fromDateTakeBacks:Ext.Date.subtract(new Date((new Date()).setHours(0, 0, 0, 0)), Ext.Date.DAY, 7),
        toDateTakeBacks:new Date((new Date()).setHours(0, 0, 0, 0)),
        fromDateApproval:Ext.Date.subtract(new Date((new Date()).setHours(0, 0, 0, 0)), Ext.Date.DAY, 7),
        toDateApproval:new Date((new Date()).setHours(0, 0, 0, 0)),
        responseRecCount: 0,
        resolutionRecCount: 0,
        takebacksRecCount: 0,
        approvalRecCount: 0
    }
});