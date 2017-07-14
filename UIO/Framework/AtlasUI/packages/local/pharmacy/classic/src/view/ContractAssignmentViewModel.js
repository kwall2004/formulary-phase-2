/**
 * Created by n6684 on 11/15/2016.
 */


Ext.define('Atlas.authorization.view.ContractAssignmentViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractassignmentviewmodel',

    stores: {
        contractassignment: {
            model: 'Atlas.pharmacy.model.ContractAssignmentModel',
            autoLoad: false
        }

        ,allNetworkSetup: {
            model: 'Atlas.pharmacy.model.allpharmacynetworks',
            autoLoad: false
        }

        ,listdetailsLineOfBusiness: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        }
    }
});
