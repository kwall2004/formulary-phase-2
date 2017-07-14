/*
 Developer: Tremaine Grant
 Description: view model for Drug
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.DrugModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.drug',

    stores: {
        drug: {
            pageSize: 10,
            model: 'Atlas.common.model.Drug',
            remoteSort:true,
            remoteFilter: true
        }
    }
});