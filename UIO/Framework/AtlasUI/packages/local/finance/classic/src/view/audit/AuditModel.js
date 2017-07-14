Ext.define('Atlas.finance.view.audit.AuditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-audit',

    stores: {
        audittakebacks: {
            model:'Atlas.finance.model.Audit'
        },

        auditdetail: {
            model:'Atlas.finance.model.AuditDetail'
        },

        auditpharmacy: {
            model:'Atlas.finance.model.AuditPharmacy'
        },

        auditnotes: {
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

        pharmRelationshipDetail: {
            model: 'Atlas.finance.model.PharmacyRelationshipDetail'
        },

        auditplanpricing: {
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
        cloneaudittakebacks: {
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,// required for correct filtering using paging memory
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        audittbprocessresults: {
            model:'Atlas.finance.model.Audit'
        }
    },

    data: {
        auditmasterrec: null,
        auditdetailrec: null,
        pharmacymasterrec: null,
        initialized: false,
        searchBy: 'auditId',
        auditId: null,
        ncpdpId: null,
        searchEmptyText: '[Audit ID]',
        pharmacyContractStatus: null,
        parentSystemId: null,
        selectedNoteRecord: {},
        activeContract: false,
        claimsToProcess: []
    }
});