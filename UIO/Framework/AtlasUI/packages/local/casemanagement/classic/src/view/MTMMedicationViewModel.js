/**
 * Created by s6627 on 11/17/2016.
 */
Ext.define('Atlas.casemanagement.store.MTMMedicationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MTMMedicationViewModel',
    stores: {
        StoreMedications: {
            // model: 'Atlas.casemanagement.model.MedicationsModel',
            // remoteSort: true,
            // autoLoad: false
           type:'casemanagement-medications'
        },
        StoreDataSource:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMMedDataSource'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMMedType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        ClaimTransStatusStore:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMMedDataSource'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreLogical:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'YesNo'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCMROfferMethod:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMCMROfferMethod'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreTherapyChangeType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalResult'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCMRDelvMethod:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMDeliveryMethod'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreLicProfType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMLicProfType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCMRRecipient:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMCMRRecipient'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreService: {
            model: 'Atlas.casemanagement.model.CMRServiceModel',
            autoLoad: false,
            groupField: 'CMRDateYear',
            groupDir:'DESC',
            filters: [{property: 'TMRDate', value: null}]

        },
        StoreServiceTMR: {
            model: 'Atlas.casemanagement.model.CMRServiceModel',
            autoLoad: false,
            groupField: 'TMRDateYear',
            groupDir:'DESC',
            filters: [{property: 'TMRDate',operator:"!=", value: null}]
        },
        StoreMedicationActionPlan: {
            model: 'Atlas.casemanagement.model.MedicationActionPlanModel',
            autoLoad: false
        },
        StoreClaimsSearch: {
            model: 'Atlas.casemanagement.model.ClaimMasterExt',
            autoLoad: false
        }
    }
})