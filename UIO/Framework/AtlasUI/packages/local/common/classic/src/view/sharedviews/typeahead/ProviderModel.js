/*
 Developer: Tremaine Grant
 Description: view model for providers
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ProviderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.provider',

    stores: {
        provider: {
            pageSize: 10,
            model: 'Atlas.common.model.Provider',
            remoteSort:true,
            remoteFilter: true
        }
    }
});