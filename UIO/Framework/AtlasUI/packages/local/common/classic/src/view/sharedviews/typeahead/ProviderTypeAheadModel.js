
/*
 Developer: Tremaine Grant
 Description: view model for provider
 Origin: Merlin
 10/4/2016

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ProviderTypeAheadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.providertypeaheadmodel',

    stores: {
        providerlist: {
            pageSize: 10,
            model: 'Atlas.common.model.Provider',
            remoteSort:true,
            remoteFilter: true
        }
    }
});
