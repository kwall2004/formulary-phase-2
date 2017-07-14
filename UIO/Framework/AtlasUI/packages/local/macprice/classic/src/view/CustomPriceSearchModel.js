Ext.define('Atlas.macprice.view.CustomPriceSearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CustomPriceSearchModel',

    stores: {
        CustomPriceSearch: {
            model: 'Atlas.macprice.model.CustomPriceSearch',
            autoLoad: false
        },
        LineOfBusiness: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'LineOfBusiness'
                },
                url: 'shared/{0}/listitems'
            }
        }
    }

});