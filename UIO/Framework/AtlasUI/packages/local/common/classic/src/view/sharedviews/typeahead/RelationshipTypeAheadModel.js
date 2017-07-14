/**
 * Created by n6684 on 11/10/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.RelationshipTypeAheadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.relationshiptypeaheadmodel',
    stores: {
        relationshiptypelist: {
            pageSize: 10,
            model: 'Atlas.common.model.ProviderRelationship',
            remoteSort:true,
            remoteFilter: true
        }
    }
});

