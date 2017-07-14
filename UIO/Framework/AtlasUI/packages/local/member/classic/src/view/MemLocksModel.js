Ext.define('Atlas.member.view.MemLocksModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.memlocks',

    stores: {
        memlockspharmacy: {
            model: 'Atlas.member.model.MemLocksPharmacy',
            pageSize: 25
        },

        memlocksprescriber: {
            model: 'Atlas.member.model.MemLocksPrescriber',
            pageSize: 25
        },

        memlocksmedication: {
            model: 'Atlas.member.model.MemLocksMedication',
            pageSize: 25
        },

        memlocksdeadrugs: {
            model: 'Atlas.member.model.MemLocksDEADrugs'
        },
        planGroupsStore: {
            model: 'Atlas.member.model.MemberPlanGroups'
        },
        memberLockStatusStore: {
            model: 'Atlas.member.model.MemberLockStatus'
        },
        StoreDrugLevel: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            storeId: 'StoreDrugLevel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DrugLevel'
                },
                url: 'system/{0}/listdetail'
            }
        },
        StoreDrugSubLevel: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            storeId: 'StoreDrugLevel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DrugSubLevel'
                },
                url: 'system/{0}/listdetail'
            }
        },
        storenotes: {
            model: 'Atlas.common.model.shared.NotesModel',
            autoLoad: false,
            remoteSort: true

        },
        LockApproversBean: {
            model: 'Atlas.member.model.LockApprovalBean'
        },
        FaxAndAttachmentsStore: {
            model: 'Atlas.member.model.FaxAndAttachments',
            autoLoad: true
        },
        memberLockStatusToBeStore:
        {
            fields: ['text', 'value'],
            autoLoad: false
        },
        FaxQStore: {
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        FaxQStoreAllRecs: {
            model: 'Atlas.member.model.FaxQModel',
            autoLoad: false
        },
        memberMasterStore:{
            model:'Atlas.member.model.MemberMaster'
        }
    }
});