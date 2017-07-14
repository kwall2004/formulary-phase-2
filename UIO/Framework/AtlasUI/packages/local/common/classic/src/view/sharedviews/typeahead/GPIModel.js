/*
 Developer: Tremaine Grant
 Description: view model for GPI
 Origin: Merlin
 9/29/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.GPIModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gpi',

    stores: {
        gpi: {
            pageSize: 10,
            model: 'Atlas.common.model.GPI',
            remoteSort:true,
            remoteFilter: true
        }
    }
});
