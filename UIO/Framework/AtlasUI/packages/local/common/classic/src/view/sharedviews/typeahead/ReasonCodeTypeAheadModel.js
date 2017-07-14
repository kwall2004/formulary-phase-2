
/*
 Developer: Tremaine Grant
 Description: view model for reason code
 Origin: Merlin
 10/3/2016

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ReasonCodeTypeAheadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reasoncodetypeaheadmodel',

    stores: {
        contactcodelist: {
            pageSize: 10,
            model: 'Atlas.common.model.ContactCodeList',
            remoteSort:true,
            remoteFilter: true
        }
    }
});
