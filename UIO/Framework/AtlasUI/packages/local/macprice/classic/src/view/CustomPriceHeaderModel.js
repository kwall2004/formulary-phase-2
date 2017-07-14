Ext.define('Atlas.macprice.view.CustomPriceHeaderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CustomPriceHeaderModel',

    stores: {
        CustomPriceList: {
            pageSize: 10,
            model: 'Atlas.macprice.model.CustomPriceHeader',
            autoLoad: false
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        CustomPriceListDetail: {
            model: 'Atlas.macprice.model.CustomPriceMaintenance',
            remoteSort: true,
            storeId: 'CustomPriceListDetail',
            pageSize: 20,
            autoLoad: false
        },
        CostBasis: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'CostBasis'
                },
                url: 'shared/{0}/listitems'
            }
        },
        ListStatus:
        {
            data: [
                ['D', 'Draft'],
                ['A', 'Approved']
            ],
            fields: ['value', 'text']
        }
    }

});