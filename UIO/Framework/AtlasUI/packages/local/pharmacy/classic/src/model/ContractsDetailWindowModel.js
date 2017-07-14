/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.ContractsDetailWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractsdetailwindowmodel',
    //data: {
    //    isPlanGroupSelected: false
    //},
    stores: {
        storecontractsdetail: {
            model: 'Atlas.pharmacy.model.ContractsDetailModel',
            autoLoad: true
        }
    }
});