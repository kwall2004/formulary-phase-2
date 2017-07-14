Ext.define('Atlas.pharmacy.view.DispensingFeeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dispensingfee',
    data: {
        selDispFeeRuleId: "",
        inDispensingFeeRuleName: "",
        cDisableSave: 1,
        cDisableCreate: 2,
        initialized: false,
        atlasId: null,
        isEditing: false,
        masterRecord: null,
        canRemove: false
    },
    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false
        },
        dispFeeRules: {
            model: 'Atlas.pharmacy.model.DispFeeRuleMaster',
            autoLoad: true,
            listeners: {
                dataChanged: 'onMainStoreDataChanged'
            },
            sorters: [{
                property: 'RuleName',
                direction: 'ASC'
            }]
        },
        dispFeeRulesDetail: {
            model: 'Atlas.pharmacy.model.DispFeeRuleDetail',
            autoLoad: false,
            // listeners: {
            //     dataChanged: 'onDetailStoreDataChanged'
            // },
            sorters: [{
                property: 'RuleName',
                direction: 'ASC'
            }]
        },
        costBasis: {
            model: 'Atlas.pharmacy.model.ListItems',
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },
        maintenance: {
            model: 'Atlas.pharmacy.model.ListItems',
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },
        drugType: {
            model: 'Atlas.pharmacy.model.ListItems',
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },
        otcInd: {
            id: 'otcIndList',
            fields: ['name', 'value'],
            autoload: true,
            data: [
                {
                    "name": "All",
                    "value": "A"
                },
                {
                    "name": "OTC",
                    "value": "O"
                },
                {
                    "name": "Non-Otc",
                    "value": "R"
                }
            ]
        },
        rangeBasis: {
            id: 'rangeBasisList',
            fields: ['name', 'value'],
            autoload: true,
            data: [
                {
                    "name": "Days Supply",
                    "value": "DSU"
                },
                {
                    "name": "Drug Net Cost",
                    "value": "DNC"
                }
            ]
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        }
    }
});
