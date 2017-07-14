/**
 * Created by n6684 on 11/15/2016.
 */

Ext.define('Atlas.authorization.view.PopupChooseNetworksViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractassignment_popupchoosenetworksviewmodel',
    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false
        },

        assignedNetworkIds: {

        },

        unAssignedNetworks: {

        },

        selectedassignedNetworks:{

        },

        selectedunassignedNetworks:{

        }
        ,

        finalSavedNetworks:{

        }
    }
});