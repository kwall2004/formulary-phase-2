/**
 * Created by rsalekin on 11/15/2016.
 */

Ext.define('Atlas.pharmacy.view.ContractsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contracts',

    stores: {
        storePaymentCenter: {
            model: 'Atlas.pharmacy.model.Relationships',
            autoLoad: false
        },

        storePharmacyContractMaster: {
            model: 'Atlas.pharmacy.model.PharmacyContractMaster',
            autoLoad: false
        },

        storeContractStatus: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'Draft', value: 'Draft'
                },
                {
                    name: 'Active', value: 'Active'
                },
                {
                    name: 'Inactive', value: 'Inactive'
                }
            ],
            autoLoad: true
        },

        storePharmaNetwork: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: true
        },

        storeMACList: {
            model: 'Atlas.pharmacy.model.ApprovedMacList',
            autoLoad: true
        },

        storeCustPriceList: {
            model: 'Atlas.pharmacy.model.CustomPriceListInfo',
            autoLoad: true
        },

        storePaymentType: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'Fee for Service', value: 'Fee for Service'
                }
            ],
            autoLoad: true
        },

        storeAttachment: {
            model: 'Atlas.pharmacy.model.ContractAttachmentList',
            autoLoad: false
        }
    }
});

