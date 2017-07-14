/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCHistoryWindowController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.customndchistorywindowcontroller',
        init : function(){
            var view=this.getView();
            var vm = this.getViewModel();
            var store= vm.getStore('storecustomndchistory');
            store.getProxy().setExtraParam('ipcNDC',view.extraParams["NDC"]);
            store.load();
        }
    });
