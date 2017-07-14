Ext.define('Atlas.formulary.view.FDBDrugSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fdbdrugsearch',
    data: {
        record: null
    },
    stores: {
        StoreFormularyList:
        {
            model: 'Atlas.formulary.model.FormularyApprovalModel',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: true

        },
        StoreDrugSearch:
        {
            model: 'Atlas.formulary.model.FDBDrugsSearchModel',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true

        },
        StoreDrugFormularyDetails:
        {
            model: 'Atlas.formulary.model.NDCFormularyDetailsModel',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true

        },
        StoreFDBDrugDetails:
        {
            model: 'Atlas.macprice.model.FDBDrugDetail',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true

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
        }
    }
});

