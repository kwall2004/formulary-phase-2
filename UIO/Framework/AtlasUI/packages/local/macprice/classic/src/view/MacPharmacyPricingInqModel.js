
Ext.define('Atlas.macprice.view.MacPharmacyPricingInqModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MacPharmacyPricingInqModel',

    stores: {
        MacPharmacyPricingInq: {
            model: 'Atlas.macprice.model.MacPharmacyPricingInq',
            storeId: 'MacPharmacyPricingInq',
            pageSize: 25,
            autoLoad: false
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
        MacPharmacyPricingInqExport: {
            model: 'Atlas.macprice.model.MacPharmacyPricingInqExport',
            storeId: 'MacPharmacyPricingInqExport',
            pageSize: 0,
            autoLoad: false
        },
        AlertStatus: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            storeId: 'AlertStatus',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MacAlertStatus'
                },
                url: 'system/{0}/listdetail'
            }
        },
        Maclist: {
            model: 'Atlas.macprice.model.BaseMacList',
            autoLoad: true
        },
        ApproveMacAlert: {
            type: 'clonestore',
            storeId: 'ApproveMacAlert',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 10
                },
                url: 'system/{0}/queuelist'
            }
        },
        StateMac: {
            autoLoad: false,
            storeId: 'StateMac',
            pageSize: 5,
            model: 'Atlas.macprice.model.StateMacValue'
        },
        PeriodGCN: {
            fields: ['value', 'text'],
            data: [
                ['CurrentYTD', 'Current YTD'],
                ['CurrentMonth', 'Current Month'],
                ['LastMonth', 'Last Month'],
                ['Last3Months', 'Last 3 Months'],
                ['LastQuarter', 'Last Quarter'],
                ['Last6Months', 'Last 6 Months'],
                ['LastYear', 'Last Year']
            ]
        },
        NDCUtilization: {
            storeId: 'NDCUtilization',
            fields: ['Period', 'TotRx', 'TotQty', 'TotIng', 'AvgIng', 'MktRx', 'MktQty', 'MktIng']
        },
        GCNUtilization: {
            autoLoad: false,
            storeId: 'GCNUtilization',
            pageSize: 10,
            model: 'Atlas.macprice.model.GCNUtilization'
        },
        AlertNotes: {
            storeId: 'AlertNotes',
            model: 'Atlas.common.model.Notes'
        },
        AlertAttachments: {
            storeId: 'AlertAttachments',
            model: 'Atlas.common.model.AttachmentList'
        },
        FDBDrugDetail: {
            storeId: 'FDBDrugDetail',
            model: 'Atlas.macprice.model.FDBDrugDetail'
        },
        AWPPriceHistory: {
            storeId: 'AWPPriceHistory',
            pageSize: 10,
            model: 'Atlas.macprice.model.FDBDrugPriceHistoryAWP'
        },
        WACPriceHistory: {
            storeId: 'WACPriceHistory',
            pageSize: 10,
            model: 'Atlas.macprice.model.FDBDrugPriceHistoryWAC'
        }
    }

});