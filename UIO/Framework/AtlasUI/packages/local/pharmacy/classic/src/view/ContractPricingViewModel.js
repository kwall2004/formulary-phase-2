/**
 * Created by rsalekin on 11/28/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractPricingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractpricing',

    stores: {
        storePricingDetail: {
            model: 'Atlas.pharmacy.model.PricingDetail',
            autoLoad: false
        },

        storeGERPeriod: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'Monthly', value: 'Monthly'
                },
                {
                    name: 'Quarterly', value: 'Quarterly'
                },
                {
                    name: 'Yearly', value: 'Yearly'
                },
                {
                    name: '-----', value: '-----'
                }
            ]
        },

        storeCostBasis: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'AWP', value: 'AWP'
                },
                {
                    name: 'WAC', value: 'WAC'
                },
                {
                    name: '-----', value: '-----'
                }
            ]
        },

        storeMultiSource: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'Actual', value: 'Actual'
                },
                {
                    name: 'Highest', value: 'Highest'
                },
                {
                    name: 'Lowest', value: 'Lowest'
                },
                {
                    name: '-----', value: '-----'
                }
            ]
        },

        storeDispFeeRuleID: {
            model: 'Atlas.pharmacy.model.DispFeeRuleMaster',
            autoLoad: false
        },

        storeCostBasisEditor: {
            model: 'Atlas.pharmacy.model.storeCostBasis',
            autoLoad: false
        },

        storeDrugType: {

            model: 'Atlas.pharmacy.model.storeDrugType',
            autoLoad: false
        },

        storeMaintenance: {
            model: 'Atlas.pharmacy.model.storeMaintenance',
            autoLoad: false
        },

        storeOTCInd: {
            data:[
                { value :"A", name : "All" },
                { value : "O", name : "OTC" },
                { value : "R", name : "Non-OTC" }
            ]
        }
    }
});
