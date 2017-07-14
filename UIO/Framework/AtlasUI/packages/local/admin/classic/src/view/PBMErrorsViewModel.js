/**
 * Created by d3973 on 12/12/2016.
 */
Ext.define('Atlas.admin.view.PBMErrorsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.view-pbmerrorsviewmodel',

    stores: {
        errorList: {
            model: 'Atlas.admin.model.ErrorListModel',
            storeId: 'errorListStore'
        },

        errorDetail: {
            model: 'Atlas.admin.model.ErrorDetail',
            pageSize: 10,
            storeId: 'errorListDetail',
            remoteSort: true,
            remoteFilter: true
        },

        cbxErrorSource: {
            model: 'Atlas.admin.model.ListsModel'
        }
    }
});