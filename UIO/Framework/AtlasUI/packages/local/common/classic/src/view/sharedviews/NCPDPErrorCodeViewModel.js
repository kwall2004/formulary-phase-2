/**
 * Created by agupta on 10/6/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.NCPDPErrorCodeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ncpdperrorcodeviewmodel',

    stores: {
        storencpdperrorcodes: {
            pageSize: 10,
            model: 'Atlas.common.model.shared.NCPDPErrorCodeModel',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        }
    }
});