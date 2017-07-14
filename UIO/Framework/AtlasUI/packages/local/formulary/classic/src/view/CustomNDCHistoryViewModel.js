/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCHistoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customndchistorywindowviewmodel',
    //data: {
    //    isPlanGroupSelected: false
    //},
    stores: {
        storecustomndchistory: {
            model: 'Atlas.formulary.model.CustomNDCHistoryModel',
            autoLoad: false

            //,groupField: 'complete'
        }
    }
});
