/**
 * Created by T4317 on 10/19/2016.
 */
Ext.define('Atlas.claims.view.ClaimsToolbarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.claims-claimstoolbar',
    data: {
        canEdit: true,
        canUpdate: true,
        canCancel: true,
        transFill: false,
        transFillEdit: true,
        planpricing: false,
        canReversable: false,
        tranCodeB1B2: true,
        dispensedquantity: '',
        paidcontracttext: ''
    },
    stores: {
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        claimmasterdata: {
            model: 'Atlas.common.model.ClaimMasterData',
            remoteSort: true
        },
        drugpricing: {
            model: 'Atlas.common.model.DrugPricing'
        },
        claimrejectcodesext: {
            model: 'Atlas.common.model.ClaimRejectionInfo',
            remoteSort: true
        },
        contactloglist: {
            model: 'Atlas.common.model.ContactLog'
        },
        duralerts: {
            model: 'Atlas.common.model.ClaimDurAlerts',
            remoteSort: true
        },
        options: {
            model: 'Atlas.common.model.Option'
        },
        pricing: {
            type: 'clonestore',
            model: 'Atlas.common.model.ClaimPricingDetail',
            autoLoad: false,
            proxy: {
                extraParams: {
                    pClaimID: '',
                    pPlanPricing: 'false'
                },
                url: 'claims/{0}/claimpricingdetail'
            }
        },
        storePlanPricing: {
            type: 'clonestore',
            model: 'Atlas.common.model.ClaimPricingDetail',
            autoLoad: false,
            proxy: {
                extraParams: {
                    pClaimID: '',
                    pPlanPricing: 'true'
                },
                url: 'claims/{0}/claimpricingdetail'
            }
        },
        compounds: {
            model: 'Atlas.common.model.ClaimCompounds'
        },
        claimreverseaccess: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false,
            proxy: {
                extraParams: {
                    pListName: 'ClaimReverseAccess'
                },
                url: 'shared/{0}/listitems'
            }
        },
        claimmasterdatacount: {
            model:'Atlas.common.model.AdvanceClaimSearch',
            autoLoad: false
        },
        advancedsearchbybatch: {
            model:'Atlas.common.model.AdvanceClaimSearchByBatch',
            pageSize: 16,
            autoLoad: false
        },
        PBMClaimsQueryThreshold: {
            model: 'Atlas.letter.model.utils.LookupOptionsValueModel',
            autoLoad: false
        },
        ClaimTransStatusStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'ClaimTransactionStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },
        advancedsearchsort: {
            fields: ['value', 'text'],
            data: [
                ['ServiceDate DESC', 'Service Date DESC'],
                ['ServiceDate', 'Service Date ASC'],
                ['TransactionID DESC', 'Claim ID DESC'],
                ['TransactionID', 'Claim ID  ASC'],
                ['NDC DESC', 'NDC DESC'],
                ['NDC', 'NDC ASC']
            ]
        },
        PatientResponsibility: {
            storeId: 'PatientResponsibility',
            fields: ['otherPayerPatRespQual', 'otherPayerPatRespAmt'],
            autoLoad: false
        }
    }
});
