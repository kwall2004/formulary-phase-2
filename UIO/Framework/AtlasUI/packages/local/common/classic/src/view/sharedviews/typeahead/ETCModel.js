/*
 Developer: Manasa Korivi
 Description: view model for etc
 Origin: Merlin
 11/01/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ETCModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.etc',

    stores: {
        etc: {
            pageSize: 10,
            model: 'Atlas.common.model.ETC',
            remoteSort:true,
            remoteFilter: true
        }
    }
});