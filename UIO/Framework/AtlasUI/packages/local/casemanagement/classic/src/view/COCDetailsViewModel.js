/**
 * Created by mkorivi on 11/14/2016.
 */

Ext.define('Atlas.casemanagement.view.COCDetailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cocdetailsviewmodel',
    data: {
        authorizationsGridData: null,
        memberInfoMasterData:null,
        memberCoverageHistoryData:null,
        memberPCPData: null,
        PBMRecipientId:'',
        memberID:'',
        systemId:'',
        record: null,
        state : '',
        MCSRecipientId: '',
        MeridianRxID:'',
        seqNum : '',
        casesystemId : '',
        stateName: '',
        action : '',
        voPNSystemID : '',
        pocrec : null,
        followuprec : null,
        category: '',
        alertSystemId: '',
        managedByUserName: '',
        caseStatus:''

    },
    stores: {
        StoreUsers: {

            model: 'Atlas.casemanagement.model.UserMasterAPI',
            autoLoad: true,
            sorters: [
                {
                    property : 'fullName',
                    direction: 'ASC'
                }
            ]

        },
        menu: {
            model: 'Atlas.common.model.SystemMenu'
        },
        StorePlanServStates: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PlanServStates'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreRefType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'COCReferralType'
                },
                url: 'shared/{0}/listitems'
            }

        },
        StoreStatus: {

            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName = 'cmCaseStatus'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }

        },
        StoreClosedReason: {

            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName = 'cmClosedReason'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreMCSRecipientIdAPI: {
            model:'Atlas.casemanagement.model.MCSRecipientIdAPI'
        },
        StoreCOCCases: {
            model: 'Atlas.casemanagement.model.CaseLoadMasterextAPI',
            autoLoad: false


        },
        StoreCOCCasesDetails: {
            model: 'Atlas.casemanagement.model.CaseLoadMasterextAPI',
            autoLoad: false


        },
        StoreCOCMaster: {
            model: 'Atlas.casemanagement.model.COCMasterextAPI',
            autoLoad: false


        },
        StoreCOCAlerts: {

            model: 'Atlas.casemanagement.model.CaseAlertsAPI',
            autoLoad: false
        },
        StoreClaimTransStatus: {
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
        StoreMedications: {
            model: 'Atlas.casemanagement.model.COCMedicationAPI',
            autoLoad: false
        },
        StoreDataSource: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "PP - PCP", "value": "PP"},
                {"name": "MC - Member", "value": "MC"},
                {"name": "DCI - Discharge", "value": "DI"},
                {"name": "MR - Medical Record", "value": "MR"}
            ]
        },
        StoreType: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "OTC - Over the counter", "value": "OTC"},
                {"name": "Rx - Prescription", "value": "Rx"}
            ]
        },
        StoreLogical: {
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
        /* Member info related stores*/

        StorePrescriberData: {
            model: 'Atlas.common.model.Prescriber'
        },
        StorePBMRecipientIdData:{
            model:'Atlas.casemanagement.model.PBMRecipientIDModel'
        }
        ,
        StoreMemberCoverageHistory: {
            model: 'Atlas.member.model.MemberCoverage'
        },
        StoreMemberInfoData:
        {
            model: 'Atlas.member.model.MemberMaster'
        },
        StoreMemberAuth:{
            model:'Atlas.casemanagement.model.CMAuthorizatonsModel'
        },
        StoreEligibilityHistory: {
            model: 'Atlas.casemanagement.model.EligibilityHistoryModel'
        },
        StorePCPHistory: {
            model: 'Atlas.casemanagement.model.PCPHistoryModel'
        },
        StoreClaimHeader: {
            model: 'Atlas.casemanagement.model.ClaimHeaderModel',
            type: 'clonestore',
            remoteSort: true,
            sorters: {
                property: 'stmtFromDate',
                direction: 'DESC'
            },
            proxy: {
                url: 'vendor/hp/claimheadermasterapi',
                extraParams: {
                    "pMode": "mrx",
                    "userState": "MI",
                    'pUserName': Atlas.user.un,
                    "pDeviceId": null,
                    "pTokenId": null,
                    "pSort": null,
                    pagination: true
                }

            },
            pageSize: 12
        },
        StoreProClaimHeader: {
            model: 'Atlas.casemanagement.model.ClaimHeaderModel',
            type: 'clonestore',
            proxy: {
                url: 'vendor/hp/claimheadermasterapi',
                extraParams: {
                    "pMode": "mrx",
                    "userState": "MI",
                    'pUserName': Atlas.user.un,
                    "pDeviceId": null,
                    "pTokenId": null,
                    "pSort": null,
                    pagination: true
                }

            },
            pageSize: 12
        },
        StoreClaimDetails: {
            model: 'Atlas.casemanagement.model.ClaimDetailsModel'
        },
        StoreProClaimDetails: {
            model: 'Atlas.casemanagement.model.ClaimDetailsModel'
        },
        StoreHedisList: {
            type: 'clonestore',
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreHedisSummary: {
            model: 'Atlas.casemanagement.model.HEDISSummaryModel'
        },
        storeYear: {
            //type: 'store'
            //model: 'Atlas.casemanagement.model.HEDISSummaryModel'
        },
        StoreHedisPopulation: {

            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName = 'hedisPopulation'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }

        },

        StoreHedisNotes: {
            model: 'Atlas.casemanagement.model.HEDISContactNotesModel'
        },
        StoreMedicareHRAPDF: {
            model: 'Atlas.casemanagement.model.MedicareHRAPDFModel'

        },
        AuthProceduresStore:{
           autoLoad:false
        },
        StoreClaimsSearch: {

            model: 'Atlas.casemanagement.model.ClaimMasterExt',
            autoLoad: false
        },

        StoreGoalClosedReason: {
            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName = 'POCClosedReason'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreDisagreeReason: {
            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName ='disagreeReasonPOC'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreGoalReason: {
            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName ='reasonforChart'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreCategory: {
            type: 'clonestore',
            autoLoad: true,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName ='CategoriesPOC'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreAvailabeStrengths: {
            type: 'clonestore',
            autoLoad: false,
            proxy: {
                extraParams: {
                    'pUserName': Atlas.user.un,
                    'pWhere': "listName ='StrengthsPOC'",
                    "pDeviceId": "",
                    "pTokenId": "",
                    "pSort": "",
                    "userState": "MI",
                    "pMode": "mrx"
                },
                url: 'vendor/hp/listmasterapi'
            }
        },
        StoreProblemAndGoalRecords: {
            model: 'Atlas.casemanagement.model.PlanCarehistoryAPI',
            autoLoad: false
        },
        StoregoalPriority: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "1", "value": "1"},
                {"name": "2", "value": "2"},
                {"name": "3", "value": "3"},
                {"name": "4", "value": "4"},
                {"name": "5", "value": "5"},
                {"name": "6", "value": "6"},
                {"name": "7", "value": "7"},
                {"name": "8", "value": "8"},
                {"name": "9", "value": "9"},
                {"name": "10", "value": "10"}

            ]

        },
        StorememberAgrees: {

            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "yes", "value": "yes"},
                {"name": "no", "value": "no"}


            ]

        },
        StorereadinessToChange: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {
                    "name": "I have little interest in change and I do not think I could even if I wanted to",
                    "value": "I have little interest in change and I do not think I could even if I wanted to"
                },
                {
                    "name": "I want to change but I don not think I am able to",
                    "value": "I want to change but I don not think I am able to"
                },
                {"name": "I am ready to change now", "value": "I am ready to change now"}


            ]

        },
        StoregoalProgress: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "Not Met", "value": "Not Met"},
                {"name": "Partially Met", "value": "Partially Met"},
                {"name": "Fully Met", "value": "Fully Met"}


            ]
        },
        Storetimeframe: {
            autoLoad: true,
            fields: ['name', 'value'],
            data: [
                {"name": "Today", "value": "0"},
                {"name": "1 Day", "value": "1"},
                {"name": "2 Days", "value": "2"},
                {"name": "7 Days", "value": "7"},
                {"name": "14 Days", "value": "14"},
                {"name": "30 Days", "value": "30"},
                {"name": "45 Days", "value": "45"},
                {"name": "60 Days", "value": "60"},
                {"name": "90 Days", "value": "90"},
                {"name": "180 Days", "value": "180"}
            ]
        },
        StoreLastFollowUp: {
            model: 'Atlas.casemanagement.model.LastfollowupAPI',
            autoLoad: false

        },
        StoreAvailableBarriers: {
            model: 'Atlas.casemanagement.model.BarriersAvailableAPI',
            autoLoad: false
        },
        StoreMedreconalert:{
            model: 'Atlas.casemanagement.model.MedReconalertextAPI',
            autoLoad: false

        },
        StoreAttachments:{
            type: 'clonestore',
            model: 'Atlas.casemanagement.model.COCAttachmentsModel',
            autoLoad: false

        },
        StoreAuthNotes:{
            model: 'Atlas.casemanagement.model.COCNotesAPI',
            autoLoad: false
        },
        StoreAuthAttachment:{
            type: 'clonestore',
            model: 'Atlas.casemanagement.model.COCAttachmentsModel',
            autoLoad: false
        },
        storeAssignedStrengths: {
            fields: ['value'],
            data:[{"value":""}],
            autoLoad: true
        }

    }
});
