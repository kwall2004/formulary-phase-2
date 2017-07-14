/**
 * Created by rsalekin on 11/17/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractsDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eftvanwindow',
    stores: {
        storeSearchGrid: {
            model: 'Atlas.pharmacy.model.PharmacyRelationship',
            sorters: [{
                property: 'EffectiveDate',
                direction: 'DESC' // 'ASC' 'DESC'
            }],
            autoLoad: false
        },

        storeEftVan: {
            model: 'Atlas.pharmacy.model.EftVanWindow',
            autoLoad: false
        },

        storeAccountTypleList: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'AccountType'
                },
                url: 'shared/{0}/listitems'
            },
            autoLoad: true
        },

        storeStates: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'states'
                },
                url: 'shared/{0}/listitems'
            },
            autoLoad: true
        },

        storeEFTStatus: {
            fields: [
                {name: 'value', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            data: [
                {
                    name: 'Draft', value: 'D'
                },
                {
                    name: 'Active', value: 'A'
                }
            ],
            autoLoad: true
        },

        storeEFTAttachment: {
            model: 'Atlas.pharmacy.model.EFTAttachmentList',
            autoLoad: false
        }
    }
});
