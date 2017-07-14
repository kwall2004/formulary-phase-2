/**
 * Created by agupta on 9/19/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.CustomPriceWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.custompricewindowmodel',
    //data: {
    //    isPlanGroupSelected: false
    //},
    stores: {
        storelob : {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'LineOfBusiness'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storecustompricesearch: {
            model: 'Atlas.authorization.model.cdag.CustomPriceModel',
            autoLoad: false
        }
    }
});
