/**
 * Created by s6627 on 10/3/2016.
 */
Ext.define('Atlas.formulary.view.DrugCommonNameSetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.drugcommonnamesetupviewmodel',
    stores: {
        storeDrugCommonNameSetup: {
            model: 'Atlas.formulary.model.DrugCommonNameSetupModel',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        },
        StoreGCNBrandName: {
            model: 'Atlas.formulary.model.GCNBrandNameModel',
            autoLoad: false
        },
        StoreGCNBrandNameClone: {
            fields: {name: 'BN', type: 'string'}
            , data: [[]]
            , load: function () {
                var parentStore = Ext.data.StoreManager.lookup('StoreGCNBrandName');
                var arrayData = [];
                if (parentStore) {
                    Ext.each(parentStore.collect('box', false, true), function (value) {
                        arrayData.push([value]);
                    });
                    this.loadData(arrayData);
                }
            }
        }
    }
})

