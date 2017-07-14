Ext.define('Atlas.finance.view.check.CheckMasterModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-checkmaster',

    stores: {
        checkmasterdetail: {
            model:'Atlas.finance.model.CheckMaster'
        },

        vendorledgerdetail: {
            model:'Atlas.finance.model.VendorLedger'
        },

        claimradetail: {
            /*model:'Atlas.finance.model.ClaimRADetail',
            remoteSort: true,
            sorters: [{
                property: 'transactionDate',
                direction: 'ASC'
            }]*/
            type: 'finance-claimsradetail'
        },
        dataaccessReport: {
            type: 'common-merlin-dataaccesstree'
        },

        checkmasternotes: {
            model:'Atlas.finance.model.Notes'
        },


        drugpricing: {
            model: 'Atlas.common.model.DrugPricing'
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

        storeCheckMastersNotes: {
            model: 'Atlas.common.model.Notes'
        },
        storeReportInfo : {
            model :'Atlas.rebate.model.ReportInfo'
        },
        storeReportFilter : {
            model : 'Atlas.common.model.ReportFilters'
        },
        storeReportsList : {
            model :'Atlas.common.model.ReportsList'
        }
    },

    data: {
        checkmasterrec: null,
        vendorledgerrec: null,
        searchBy: 'checkNumber', //checkNumber | eftTraceId
        searchEmptyText: '[Check Number]',
        searchValue: null,
        checkNum: null,
        eftId: null,
        ledgerSeq: null,
        isRecord: false,
        isRecordNotes: false,

        parentSystemId: null,
        selectedNoteRecord: {}
    }
});