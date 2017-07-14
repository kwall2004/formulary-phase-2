
Ext.define('Atlas.macprice.view.MacAlertModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MacAlertModel',

    stores: {
        maclist: {
            pageSize: 10,
            model: 'Atlas.macprice.model.MacSetup',
            autoLoad: true
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
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
        MacPriceChangeAlert: {
            model: 'Atlas.macprice.model.MacPriceChangeAlert',
            pageSize: 25,
            autoLoad: false
        },
        MacPriceChangeAlertExport: {
            model: 'Atlas.macprice.model.MacPriceChangeAlertExport',
            pageSize: 25,
            autoLoad: false
        },
        GPINDCChangeAlert: {
            storeId: 'GPINDCChangeAlert',
            model: 'Atlas.macprice.model.GPINDCChangeAlert',
            pageSize: 20,
            autoLoad: false
        },
        DrugMonitorAlert: {
            model: 'Atlas.macprice.model.GPINDCChangeAlert',
            pageSize: 25,
            autoLoad: false
        },
        ExcludedForm: {
            storeId: 'ExcludedForm',
            fields: ['FormularyId', 'FormularyName']
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
        MacAlertMktShrPeriod: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MacAlertMktShrPeriod'
                },
                url: 'shared/{0}/listitems'
            }
        },
        AnalystMacAlert: {
            type: 'clonestore',
            storeId: 'AnalystMacAlert',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 7
                },
                url: 'system/{0}/queuelist'
            }
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
            pageSize: 10,
            model: 'Atlas.macprice.model.StateMacValue'
        },
        NDCUtilization: {
            storeId: 'NDCUtilization',
            fields: ['Period', 'TotRx', 'TotQty', 'TotIng', 'AvgIng', 'MktRx', 'MktQty', 'MktIng']
        },
        AlertNotes: {
            storeId: 'AlertNotes',
            model: 'Atlas.common.model.Notes'
        },
        AlertAttachments: {
            storeId: 'AlertAttachments',
            model: 'Atlas.common.model.AttachmentList'
        },
        MDBMacHistory: {
            autoLoad: false,
            storeId: 'MDBMacHistory',
            model: 'Atlas.macprice.model.MDBMacHistory'
        },
        AlertStatusUpdate: {
            fields: ['drugLevel', 'alertType', 'NDC', 'GPICode', 'GCNSeqNo', 'suggMAC', 'included', 'exclFormularyIds', 'systemID']
        },
        PriceChangeMonitor: {
            fields: ['priceChangeMonitorID', 'createDate', 'GPICode', 'NDC']
        },
        PriceChangeDeleteMonitor: {
            fields: ['priceChangeMonitorID', 'createDate', 'GPICode', 'NDC']
        }
    },

    formulas: {

    }
});