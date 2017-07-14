/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.view.MemberModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member',

    data: {
        isMemberPassedIn: false,
        isMemberSelected: false,
        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        planGroupName: "", //value set from MemberMasterExt to be used in Order Docs
        contactdisabledflag: false,
        recipientID: 0,
        userpermissions: {
            create: true,
            update: true,
            destroy: true,
            activate: false,
            deactivate: false
        }
    },

    stores: {
        memberMasterStore: {
            model: 'Atlas.member.model.MemberMaster'
        },
        PlanBenefitStore: {
            //model: 'Atlas.plan.model.PlanBenefitListItem',
            model: 'Atlas.common.model.PlanBenefitExt',
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true
        },

        storeMCSProgGroupCode: {
            //model: 'Atlas.plan.model.PlanProgramCodeUnique',
            model: 'Atlas.plan.model.PlanProgramCode',
            autoLoad: true
        },
        memberlettersstore: {
            pageSize: 10,
            remoteSort: true,
            remoteFilter: true,
            model: 'Atlas.member.model.MemberLettersModel'

        },
        memberpriorauths: {
            model: 'Atlas.common.model.MemberPAHistory',
            remoteSort: true,
            remoteFilter: true
        },
        memberhedissummary: {
            model: 'Atlas.member.model.MemberHedisSummary',
            autoLoad: false

        },
        memberhedissummaryall: {
            model: 'Atlas.member.model.MemberHedisSummary',
            groupField: 'complete'
        },
        memberhedissummaryWindow: {
            model: 'Atlas.member.model.MemberHedisSummaryWindow',
            sorters: [{
                property: 'measureDesc',
                direction: 'DESC'
            }],
            autoLoad: false
        },
        membercoveragehistorystore: {
            model: 'Atlas.member.model.MemberCoverage',
            autoLoad: false
        },
        orderDocsListItems: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'coverLetterType'
                }
                ,
                url: 'shared/{0}/listitems'
            }
        },
        memberfamilylist: {
            model: 'Atlas.member.model.FamilyList',
            remoteSort: true,
            remoteFilter: true
        },
        letterslist: {
            model: 'Atlas.member.model.LettersList',
            remoteSort: true,
            remoteFilter: true
        },
        membercobdetailstore: {
            model: 'Atlas.member.model.MemberCOBDetail',
            remoteSort: true,
            remoteFilter: true
        },
        auditmaster: {
            model: 'Atlas.member.model.AuditMaster',
            remoteSort: true,
            remoteFilter: true
        },
        memberdrugallergiesstore: {
            model: 'Atlas.member.model.MemberDrugAllergies',
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true
        },
        genderstore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GenderList'
                }
                ,
                url: 'shared/{0}/listitems'
            }
        },
        martialstatusstore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MaritalStatusList'
                }
                ,
                url: 'shared/{0}/listitems'
            }
        },
        relationshipcodestore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MemberRelationShipCode'
                }
                ,
                url: 'shared/{0}/listitems'
            }
        },
        memberfamilystore: {
            model: 'Atlas.member.model.MemberFamilyModel',
            autoLoad: false
            //remoteSort: true,
            //remoteFilter: true
        },
        planbenefitstore: {
            model: 'Atlas.common.model.PlanBenefitExt',
            remoteSort: true,
            remoteFilter: true
        },
        contactloglist: {
            model: 'Atlas.common.model.ContactLog',
            session: true,
            remoteSort: true,
            remoteFilter: true
        },
        memberplanstore: {
            model: 'Atlas.member.model.MemberPlanGroups',
            session: true,
            remoteSort: true,
            remoteFilter: true
        },
        memberidstore: {
            model: 'Atlas.member.model.PBMMember',
            session: true,
            remoteSort: true,
            remoteFilter: true
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        memberorderdocsplanstore: {
            // this store is used in Order Docs Pop up screen.
        }
    },
    formulas: {
        canOrderDocs: function (get) {
            return get("isMemberSelected");
        }
    }
});