/**
 * Created by akumar on 1/13/2017.
 */

Ext.define('Atlas.claims.view.ClaimsTestModel', {
    extend: 'Ext.app.ViewModel',
    alias:'viewmodel.claims-claimstestmodel',

    stores: {
        PatientResidenceCode: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'PatientResidenceCode',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PatientResidenceCode'
                },
                url: 'shared/{0}/listitems'
            }
        },

        CMSQualFacility: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'CMSQualFacility',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'CMSQualFacility'
                },
                url: 'shared/{0}/listitems'
            }
        },

        UCFPatRespAmtQualifier: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'UCFPatRespAmtQualifier',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'UCFPatRespAmtQualifier'
                },
                url: 'shared/{0}/listitems'
            }
        },

        OtherCoverageCode: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'OtherCoverageCode',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'OtherCoverageCode'
                },
                url: 'shared/{0}/listitems'
            }
        },

        DAWType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'DAWType',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DAWType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        CompoundDosageForm: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'CompoundDosageForm',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'CompoundDosageForm'
                },
                url: 'shared/{0}/listitems'
            }
        },

        CompoundDispUnit: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'CompoundDispUnit',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'CompoundDispUnit'
                },
                url: 'shared/{0}/listitems'
            }
        },

        TestClaimRxOrigin: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'TestClaimRxOrigin',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TestClaimRxOrigin'
                },
                url: 'shared/{0}/listitems'
            }
        },

        DURType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'DURType',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DURType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        TDOverrideServiceCodes: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'TDOverrideServiceCodes',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TDOverrideServiceCodes'
                },
                url: 'shared/{0}/listitems'
            }
        },

        UCFCostBasis: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'UCFCostBasis',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'UCFCostBasis'
                },
                url: 'shared/{0}/listitems'
            }
        },

        DURResultOfService: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'DURResultOfService',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DURResultOfService'
                },
                url: 'shared/{0}/listitems'
            }
        },

        DispenserType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'DispenserType',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DispenserType'
                },
                url: 'shared/{0}/listitems'
            }
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

        MemberPlanPCN: {
            storeId: 'MemberPlanPCN',
            fields: ['PCNCode', 'PCNName'],
            autoLoad: false
        },

        MemberInfo: {
            model: 'Atlas.letter.model.MemberInfoModel',
            autoLoad: false
        },

        MemberCoverageHistory: {
            model: 'Atlas.member.model.MemberCoverage',
            autoLoad: false
        },

        PCNMaster: {
            model: 'Atlas.common.model.PCN',
            autoLoad: false
        },

        PharmacyMasterData: {
            model: 'Atlas.pharmacy.model.PharmacyMasterData',
            autoLoad: false
        },

        storecompoundgcn: {
            storeId: 'storecompoundgcn',
            fields: ['NDC', 'ingQuantity', 'ingCost', 'ingBasisOfCost', 'gcnseq', 'LN'],
            autoLoad: false
        },

        PatientResponsibility: {
            storeId: 'PatientResponsibility',
            fields: ['otherPayerPatRespQual', 'otherPayerPatRespAmt'],
            autoLoad: false
        },

        PharmacyPricingStore: {
            storeId: 'PharmacyPricingStore',
            fields: ['ContractId', 'CostBasis', 'UnitPrice', 'DiscPercent', 'DiscAmount', 'DispFee', 'FinalPrice', 'TransactionID', 'usedForClaimPricing'],
            autoLoad: false
        },

        PlanPricingStore: {
            storeId: 'PlanPricingStore',
            fields: ['ContractId', 'CostBasis', 'UnitPrice', 'DiscPercent', 'DiscAmount', 'DispFee', 'FinalPrice', 'TransactionID'],
            autoLoad: false
        },

        SubmitPaid: {
            storeId: 'SubmitPaid',
            fields: ['DESCRIPTION', 'submitted', 'paid', 'PlanPricing'],
            autoLoad: false
        },

        DUROverride: {
            storeId: 'DUROverride',
            fields: ['serviceRsnCode', 'profServCode', 'resultOfServiceCode'],
            autoLoad: false
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

        PagingToolbarStore: {
            storeId: 'PagingToolbarStore',
            pageSize: 10,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },

        ClaimTestData: {
            model:'Atlas.claims.model.ClaimTest',
            pageSize: 10,
            autoLoad: false
        },

        ClaimTestSearchData: {
            model:'Atlas.claims.model.ClaimTest',
            pageSize: 10,
            autoLoad: false
        },

        ClaimTestDetailData: {
            model:'Atlas.claims.model.DetailsForTestCalim',
            autoLoad: false
        },

        ClaimRejectionDetail: {
            fields: ['rejectCode', 'DESCRIPTION', 'respMessage'],
            autoLoad: false
        }

    },

    data: {
        horizPanScroll: false,
        // minPanSize: 965
        minPanSize: 305
    }

});