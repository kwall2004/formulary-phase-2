/**
 * Created by s6627 on 11/4/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.GPINDCModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gpindc',

    stores: {
        gpindc: {
            pageSize: 10,
            model: 'Atlas.common.model.GPINDC',
            remoteSort:true,
            remoteFilter: true
        }
    }
});