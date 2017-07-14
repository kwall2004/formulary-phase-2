
Ext.define('Atlas.portals.view.provider.CreateAuthRequestViewModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.portalsprovidercreateauthrequestviewmodel',

    stores: {
        portalFuncs: {
            model: 'Atlas.portals.provider.model.PortalMemberFuncs'
        },
        memberODCDStore: {
            model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
        },
        authProcedureStore: {
            model: 'Atlas.portals.provider.model.ProcedureModel'
        },
        authDiagnosisStore:{
            model:'Atlas.portals.provider.model.DiagnosisModel'
        },
        providerListStore : {
            model: 'Atlas.portals.provider.model.ProviderList'
        },
        // ***** Example listitem store
        // claimStatus: {
        //     type: 'provider-listitem',
        //     pListName: 'claimStatusCode',
        //     includeAll: true,
        //     autoLoad: true
        // },
        ODAGLevelOfServiceStore: {
            type: 'provider-listitem',
            pListName: 'ODAGLevelOfService',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        requestTypeStore: {
            type: 'provider-listitem',
            pListName: 'ODAGRequestType',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        placeOfServiceStore: {
            proxy: {
                type: 'memory'
            }
        },
        placeOfServiceUnfilteredStore: {
            type: 'provider-listitem',
            pListName: 'placeOfService',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        ProvPortalPlanLOBStore: {
            type: 'provider-listitem',
            pListName: 'ProvPortalPlanLOB',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        AuthPriorityWebStore: {
            type: 'provider-listitem',
            pListName: 'AuthPriorityWeb',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        subjectStore: {
            type: 'provider-listitem',
            pListName: 'ODAGNoteSubjectWeb',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        contactStore: {
            type: 'provider-listitem',
            pListName: 'grContactWeb',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        },
        measureStore: {
            type: 'provider-listitem',
            pListName: 'UnitsOfMeasure',
            autoLoad: true,
            sorters: [{property : 'name', direction: 'ASC'}]
        }
    },
    data: {
        recipientId: '',
        minServiceDate: '',
        memberTermDate: '',
        memberDetails:{},
        lobId: '',
        benefitPlanCode:'',
        workQueue: '',
        vRequestId:'',
        AuthServiceRequestedBy:''
    }
});
