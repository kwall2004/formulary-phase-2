/**
 * Created by agupta on 9/12/2016.
 */
Ext.define('Atlas.authorization.view.CDAGViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdagviewmodel',
    data: {
        cdmodel: null,
        notesmodel: null,
        plangroupmodel: null
    },

    stores: {
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        storereceivedvia: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedVia'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storerequesttype: {
            type: 'clonestore',
            storeId: 'storerequesttype',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
             proxy: {
             extraParams: {
                 pListName: 'PATypeList'
             },
             url: 'shared/{0}/listitems'
             }
        },

        storerequesttypemedicare: {
            type: 'clonestore',
            storeId: 'storerequesttypemedicare',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PATypeListMedicare'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeexistingpa: {
            model: 'Atlas.authorization.model.ExistingPAModel',
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },

        CDAGFAXQueueList: {
            fields: ['value', 'text'],
            data: [
                ['5', 'Medicaid New Faxes'],
                ['6', 'Medicare New Faxes'],
                ['1', 'Commercial Faxes'],
                ['2', 'Acknowledged Faxes'],
                ['7', 'WebPA New Faxes'],
                ['8', 'Discharge New Faxes'],
                ['3', 'Additional Info Faxes'],
                ['4', 'Acknowledged Addl. Info Faxes'],
                ['9', 'Redetermination New Faxes'],
                ['11', 'Acknowledged Redetermination Faxes'],
                ['10', 'DMR New Faxes'],
                ['12', 'Acknowledged DMR Faxes'],
                ['13', 'New Client Recommendations Faxes']
            ]
        },
        CDAGFAXQueueDocuments: {
            model: 'Atlas.member.model.faxQDocuments',
            remoteSort: true,
            remoteFilter: true,
            pageSize: 12,
            autoLoad: false
        },
        PAFaxQDistribution: {
            model: 'Atlas.authorization.model.cdag.FaxQDistribution',
            autoLoad: false
        },
        QManagementData: {
            storeId: 'QManagementData',
            autoLoad: false,
            model: 'Atlas.member.model.QManagementData'
        },

        ForwardFaxList: {
            fields: ['value', 'text']
        },

        storedeterminationtype: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DeterminationType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeattachmenttype: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'AttachmentType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeurgencytypeCD: {
            type: 'clonestore',
            storeId: 'storeurgencytypeCD',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: false,
             proxy: {
                 extraParams: {
                    pListName: 'UrgencyType'
                 },
             url: 'system/{0}/listdetail'
             }
        },

        storeurgencytypebyplan: {
            type: 'clonestore',
            storeId: 'storeurgencytypebyplan',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'UrgencyType'
                },
                url: 'system/{0}/listdetail'
            }
        },

        storeurgencytypebyplanmedicare: {
            type: 'clonestore',
            storeId: 'storeurgencytypebyplanmedicare',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'UrgencyType'
                },
                url: 'system/{0}/listdetail'
            }
        },

        storepharmacyservicetype: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'storepharmacyservicetype',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PharmacyServiceType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storepatientresidencecode: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'storepatientresidencecode',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PatientResidenceCode'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storereasonforrequest: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'ReasonForRequest'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storereceivedviass: {
            type: 'clonestore',
            storeId: 'storereceivedviass',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedVia'
                },
                url: 'shared/{0}/listitems'
            }
        },


        storereceivedfrom: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedFrom'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storecoveragedetermination: {
            model: 'Atlas.authorization.model.cdag.CoverageDeterminationModel',
            autoLoad: false
        },

        storememgroup: {
            model: 'Atlas.authorization.model.cdag.MemberGroupModel',
            autoLoad: false
        },

        storeplangroupinfo: {
            model: 'Atlas.authorization.model.cdag.PlanGroupModel',
            autoLoad: false
        },

        storeauthstatus: {
            type: 'clonestore',
            storeId: 'storeauthstatus',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeCDCombo: {
            storeId: 'storeCDCombo',
            fields: ['ListItem', 'ListDescription']
        },

        storeredeterminationstatus: {
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: false
        },

        storeAttachments: {
            model: 'Atlas.common.model.AttachmentList',
            pageSize: 20,
            autoLoad: false
        },

        StoreAttachTo: {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModel',
            autoLoad: false
        },

        StoreAttachmentType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'AttachmentType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storencpdperrorcodes: {
            model: 'Atlas.common.model.shared.NCPDPErrorCodeModel',
            storeId: 'storencpdperrorcodes',
            autoLoad: true
        },

        MedicarePAQueueAccess: {
            type: 'clonestore',
            storeId: 'MedicarePAQueueAccess',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 15
                },
                url: 'system/{0}/queuelist'
            }
        },

        AuthLetterDetail: {
            model: 'Atlas.authorization.model.cdag.AuthLetterDetailMasterModel',
            autoLoad: false
        },

        membercoveragehistorystore: {
            model: 'Atlas.member.model.MemberCoverage',
            autoLoad: false
        },

        memberInfo: {
            model: 'Atlas.letter.model.MemberInfoModel',
            autoLoad: false
        },

        memberAddressDetail: {
            model: 'Atlas.authorization.model.cdag.MemberAddressDetail',
            autoLoad: false
        },

        contactloglist: {
            model: 'Atlas.common.model.ContactLog',
            session: true,
            remoteSort: true,
            remoteFilter: true
        },

        storecompoundgcn: {
            storeId: 'storecompoundgcn',
            fields: ['GCN_SEQNO', 'GNN60'],
            autoLoad: false
        },

        storecompoundgpi: {
            storeId: 'storecompoundgpi',
            fields: ['GPICode', 'GPIName'],
            autoLoad: false
        },

        AuthReviewNotes: {
            storeId: 'AuthReviewNotes',
            model: 'Atlas.common.model.shared.NotesModel'
        }
    }
});