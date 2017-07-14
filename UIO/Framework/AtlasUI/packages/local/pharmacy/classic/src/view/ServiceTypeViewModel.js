/**
 * Created by n6684 on 11/10/2016.
 */

Ext.define('Atlas.authorization.view.ServiceTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.servicetypeviewmodel',

    stores: {
        searchServiceType: {
            model: 'Atlas.pharmacy.model.ServiceTypeModel',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },

        storeDispenserType: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        comboServiceTypeproxy: {
        },

        comboServiceTypeCodeeproxy: {
        }
    }
});