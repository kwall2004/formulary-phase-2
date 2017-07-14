/*
 Developer: Tremaine Grant
 Description: view model for prescriber
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PrescriberTypeAheadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.prescribertypeaheadmodel',

    stores: {
        prescriberlist: {
            pageSize: 10,
            model: 'Atlas.common.model.PrescriberList',
            remoteSort:true,
            remoteFilter: true
        }
    }
});