/*
 Developer: Srujith Cheruku
 Description: view model for Plan Group
 Origin: Merlin
 8/22/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PlanGroupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plangroupmodel',

    
    stores: {
        plangroup: {
            model: 'Atlas.common.model.PlanGroup',
            remoteSort:true,
            remoteFilter: true
        }
    }
});