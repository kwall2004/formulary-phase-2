/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.authorization.view.PricingTemplateInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pricingtemplateinfoviewmodel',

    stores: {
        storepricingdetailtemplatearchive: {
            model: 'Atlas.pharmacy.model.PricingDetailTemplateArchive',
            autoLoad: false
        },


        storepricingdetailtemplate: {
            model: 'Atlas.pharmacy.model.PricingDetailTemplate',
            autoLoad: false
        },

        storepricingdetailtemplatearchivedateproxy: {
            model: 'Atlas.pharmacy.model.PricingDetailTemplateArchiveDate',
            autoLoad: false
        },

        storeCostBasis: {
            model: 'Atlas.pharmacy.model.storeCostBasis',
            autoLoad: false
            // proxy: {
            //     extraParams: {
            //         pListName: 'CostBasis'
            //     },
            //     url: 'shared/{0}/listitems'
            //
            // }
        },

        storeDrugType: {
            model: 'Atlas.pharmacy.model.storeDrugType',
            autoLoad: false
            // proxy: {
            //     extraParams: {
            //         pListName: 'DrugType'
            //     },
            //     url: 'shared/{0}/listitems'
            // }
        },

        storeMaintenance: {
            model: 'Atlas.pharmacy.model.storeMaintenance',
            autoLoad: false
            // proxy: {
            //     extraParams: {
            //         pListName: 'Maintenance'
            //     },
            //     url: 'shared/{0}/listitems',
            //     reader: {
            //         //Specify metadata property
            //         metaProperty: 'metadata',
            //         //Optionally specify root of the data if it's other than 'data'
            //         rootProperty: function(payload) {
            //
            //             return payload.data;
            //         }
            //     }
            //
            // }
        },

        storePharContractNetworkType: {
            model: 'Atlas.pharmacy.model.storePharContractNetworkType',
            autoLoad: false
            // proxy: {
            //     extraParams: {
            //         pListName: 'PharContractNetworkType'
            //     },
            //     url: 'shared/{0}/listitems'
            //
            // }
        },

        storeOTCInd: {
            model: 'Atlas.pharmacy.model.storeOTCInd',
            data:[
                { value :"A", name : "All" },
                { value : "O", name : "OTC" },
                { value : "R", name : "Non-OTC" }
            ]
        }
    }
});

