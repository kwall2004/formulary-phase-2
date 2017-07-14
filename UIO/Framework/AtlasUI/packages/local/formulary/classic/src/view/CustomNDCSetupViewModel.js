/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCSetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customndcetupviewmodel',
    stores: {
        storeNDCDetail: {
            model: 'Atlas.formulary.model.CustomNDCSetupModel',
            autoLoad: true,
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {

            }
        },
            storeFormularyDetail: {
                model: 'Atlas.formulary.model.FormularyDetailModel',
                autoLoad: false,
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {

                }
            },
            storeFormularyList:
            {
                model: 'Atlas.formulary.model.FormularyListModel',
                autoLoad: true,
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {

                }
            },
            storeTimePeriod:
            {
                type: 'clonestore',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'QLTimePeriod'
                    },
                    url: 'shared/{0}/listitems'
                }
            },
            storeFormularyName:
            {
                model: 'Atlas.formulary.model.FormularyNameModel',
                autoLoad: false,
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                }
            },
            storeFormularyTiers:
            {
                model: 'Atlas.formulary.model.FormularyTiers',
                autoLoad: false,
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                }
            },
        storeQueueList:
        {
            model: 'Atlas.formulary.model.QueueList',
            autoLoad: false
        },
        storeMedication: {
            pageSize: 10,
            model: 'Atlas.formulary.model.MedicationModel',
            remoteSort:true,
            remoteFilter: true
        }
        }
});
