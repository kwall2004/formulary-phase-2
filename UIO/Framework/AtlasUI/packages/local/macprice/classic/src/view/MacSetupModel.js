/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: Mac Setup View Model
 */

Ext.define('Atlas.macprice.view.MacSetupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MacSetupModel',

    stores: {
        maclist: {
            model: 'Atlas.macprice.model.MacSetup',
            pageSize: 10,
            autoLoad: true
        },
        BaseMacList: {
            model: 'Atlas.macprice.model.BaseMacList',
            autoLoad: true
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        ClinicalDataSource: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyDataSource'
                },
                url: 'shared/{0}/listitems'
            }
        },
        IncludeDrugType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyDrugType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        MACAnalyst: {
            type: 'clonestore',
            storeId: 'MACAnalyst',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 7
                },
                url: 'system/{0}/queuelist'
            }
        },
        MACExecutive: {
            type: 'clonestore',
            storeId: 'MACExecutive',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 9
                },
                url: 'system/{0}/queuelist'
            }
        },
        MacDataGPI: {
            autoLoad: false,
            pageSize: 20,
            model: 'Atlas.macprice.model.MacConfiguration'
        },
        MacDataGPINDC: {
            autoLoad: false,
            pageSize: 20,
            model: 'Atlas.macprice.model.MacConfiguration'
        },
        MacDataGCN: {
            autoLoad: false,
            pageSize: 20,
            model: 'Atlas.macprice.model.MacConfigurationGCN'
        },
        MacNDCInfoForGCN: {
            autoLoad: false,
            pageSize: 20,
            storeId: 'MacNDCInfoForGCN',
            model: 'Atlas.macprice.model.MacNDCInfoForGCN'
        },
        MacDataBatch: {
            autoLoad: false,
            storeId: 'MacDataBatch',
            model: 'Atlas.macprice.model.MacDataCount'
        },
        MDBMacHistory: {
            autoLoad: false,
            pageSize: 10,
            storeId: 'MDBMacHistory',
            model: 'Atlas.macprice.model.MDBMacHistory'
        }
    },

    formulas: {

    }
});