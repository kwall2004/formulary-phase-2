Ext.define('Atlas.finance.view.collection.CollectionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-collection',

    stores: {
        collectioncredit: {
            model:'Atlas.finance.model.Collection'
        },

        claimradetail: {
            model:'Atlas.finance.model.ClaimRADetail'
        },

        assignuser: {
            model:'Atlas.common.model.shared.AssignToUser'
        },

        storeCollectioncreditmasterext: {
            model: 'Atlas.finance.model.Collectioncreditmasterext',
            autoLoad: false,
            pagination:true,
            pageSize:25
        },

        memberinfo:{
            model:'Atlas.common.model.MemberInfo',
            autoLoad: false
        },

        storeCollectioncreditDetailExt: {

            type: 'finance-collectioncreditdetailextstore'
        },

        letterslist: {
            model: 'Atlas.finance.model.LettersList',
            autoLoad: true,
            listeners: {
                load: 'onLettersListLoad'
            }
        },


        checkmasternotes: {
            model:'Atlas.finance.model.Notes'
        },

        storeCheckMastersNotes: {
            model: 'Atlas.common.model.Notes'
        },

        memberplanstore: {
            model: 'Atlas.member.model.MemberPlanGroups',
            autoLoad:false
        },

        storeclaiminfo:{
            model: 'Atlas.common.model.ClaimMasterData',
            autoLoad:false
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
        creditsave :false,
        parentSystemId: null,
        collectionCreditDetailSysId: null,
        collectionCreditId: null,
        selectedNoteRecord: {}
    }
});