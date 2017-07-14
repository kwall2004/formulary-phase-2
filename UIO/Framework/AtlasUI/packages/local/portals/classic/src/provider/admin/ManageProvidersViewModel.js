Ext.define('Atlas.portals.view.provider.admin.ManageProvidersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.provadminmanageproviders',

    stores: {
        providerList: {
            model: 'Atlas.portals.provider.model.ProviderList',
            listeners: {
                load: 'reformatProviderList'
            }
        },
        providerListReport: {
            model: 'Atlas.portals.provider.model.ProviderListReport'
        },
        providerLocation: {
            model: 'Atlas.portals.provider.model.ProvLocMasterWeb'
        },
        reformattedProviderList: {
            proxy: {
                type: 'memory'
            }
        },
        providerRemovalList: {
            proxy: {
                type: 'memory'
            }
        },
        providerAdditionList: {
            proxy: {
                type: 'memory'
            }
        },
        availableLocations: {
            proxy: {
                type: 'memory'
            }
        },
        selectedLocations: {
            model: 'Atlas.portals.provider.model.ProvGroupLocations'
        }
    }
});
