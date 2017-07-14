/**
 * Created by s6627 on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.CaseDetailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CaseDetailsViewModel',
    data: {
        record: null,
        caseData:null
    },
    stores: {

        StoreMTMCasesDetailsSearch: {
            model: 'Atlas.casemanagement.model.MTMCasesQueue',
            autoLoad: false

        },
        menu: {
            model: 'Atlas.common.model.SystemMenu'
        },
        StoreMTMCasesDetails: {
            model: 'Atlas.casemanagement.model.MTMCasesQueue',
            autoLoad: false

        },
        StoreMemberMasterData: {
            model: 'Atlas.member.model.MemberMaster'

        },
        StoreContactLog: {
            // model: 'Atlas.casemanagement.model.ContactLogModel',
            // autoLoad: false
            type:'casemanagement-contactlog'

        },
        StoreMemPlanGroups: {
            model: 'Atlas.casemanagement.model.MemberPlanGroupsModel',
            autoLoad: false

        },
        StoreMemberMasterExt: {
            model: 'Atlas.common.model.MemberMasterExt',
            autoLoad: false
        },
        StoreCaseDescription: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMCaseDescription'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCaseStatus: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMCaseStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreReasonToClose: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMCloseReason'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreOptOutMethod: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMOptOutMethod'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCMROfferMethod: {
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
        StoreMemberResponse: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMMemberResponse'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCaseManager: {
            model: 'Atlas.casemanagement.model.CaseManagerModel',
            autoLoad: true

        },
        contactloglist: {
            model: 'Atlas.common.model.ContactLog',
            session:true,
            remoteSort: true,
            remoteFilter: true
        },
        PagingToolbarStore: {
            storeId: 'PagingToolbarStore',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        StoreClaimsSearch:{
            model: 'Atlas.casemanagement.model.ClaimMasterExt'

        }
    }
});