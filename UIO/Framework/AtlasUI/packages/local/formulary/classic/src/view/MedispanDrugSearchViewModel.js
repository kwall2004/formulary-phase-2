/**
 * Created by s6627 on 11/3/2016.
 */
Ext.define('Atlas.formulary.view.MedispanDrugSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.medispandrugsearchbiewmodel',
    data: {
       record:null
    },
    stores: {
        StoreFormularyList:
        {
            model: 'Atlas.formulary.model.FormularyApprovalModel',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: true
        },
        StoreGPILevels: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MSGPILevels'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreMDBDrugSearch:
        {
            model: 'Atlas.formulary.model.MDBDrugSearchModel',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },
        AWPPriceHistory: {
            storeId: 'AWPPriceHistory',
            pageSize: 10,
            autoLoad: false,
            model: 'Atlas.formulary.model.FDBDrugPriceHistoryAWP'
        },
        WACPriceHistory: {
            storeId: 'WACPriceHistory',
            pageSize: 10,
            autoLoad: false,
            model: 'Atlas.formulary.model.FDBDrugPriceHistoryWAC'
        },
        StoreDrugFormularyDetails:
        {
            model: 'Atlas.formulary.model.DrugFormularyDetailsModel',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: true
        }
    }
})