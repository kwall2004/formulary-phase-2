/**
 * Created by rsalekin on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.view.InclusionExclusionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inclusionexclusion',

    stores: {
        storeInclude: {
            model: 'Atlas.pharmacy.model.Include',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        },
        storeExclude: {
            model: 'Atlas.pharmacy.model.Exclude',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        }
    }
});
