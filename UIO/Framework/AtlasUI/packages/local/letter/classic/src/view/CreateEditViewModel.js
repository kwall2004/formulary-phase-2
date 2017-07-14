/** ...  **/

Ext.define('Atlas.letter.view.CreateEditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.createeditlettervm',
    data: {

        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        letterDetailExtFullRecord: {
            data: {
                LOBName: '',
                LetterID: 0
            }
        },
        vmAcumenRecordsIncluded: '',
        vmUIActivation: {
            topToolbar: {
                btnCreate: {
                    isDisabled: false
                },
                btnCancel: {
                    isDisabled: true
                }
            },
            bottomToolbar: {
                links: {
                    viewClaims: {
                        isDisabled: false
                    },
                    viewMember: {
                        isDisabled: false
                    },
                    viewPrescriber: {
                        isDisabled: false
                    },
                    viewPCP: {
                        isDisabled: false
                    },
                    viewPharmacy: {
                        isDisabled: false
                    }
                },
                buttons: {
                    btnSave: {
                        isDisabled: true
                    },
                    btnView: {
                        isDisabled: true
                    },
                    btnApprove: {
                        isDisabled: true
                    },
                    btnResetApprove: {
                        isDisabled: true,
                        isHidden: true
                    },
                    btnFax: {
                        isDisabled: true
                    },
                    btnSend: {
                        isDisabled: true
                    },
                    btnDelete: {
                        isDisabled: true
                    }
                }
            },
            inputs: {
                cbxLetterType: {
                    isReadOnly: true
                },
                cbxLetterId:{
                    isReadOnly: false
                },
                cbxMemberName: {
                    isHidden: true
                },
                txtClaimID: {
                    isHidden: true
                },
                txtMTMID: {
                    isHidden: true
                },
                cbxPlanGroupList: {
                    isHidden: true,
                    isReadOnly: false
                },
                txtUCFClaimID: {
                    isHidden: true
                },
                cbxPrescriberName: {
                    isHidden: true
                }
            },
            template: {
                isDisabled: true
            }
        },
        vmHiddenFields: {
            keyValue: '',
            mtmID: '',
            mtmCaseMgr: '',
            ucfLetter: '',
            mtmPlanGroupID: '',
            letterType: '',
            letterID: '',
            _letterType: '',
            _letterId: '',
            _letterNameID: '',
            _assocRxRefNum: '',
            _letterName: '',
            STATE: '',
            UCFCLAIMID: '',
            RID: '',
            NCPDPID: '',
            NPI: '',
            MTMRID: '',
            prescriberID: ''
        },
        vmReqInputs: {
            freetext1: {allowBlank: true},
            freetext2: {allowBlank: true},
            freetext3: {allowBlank: true},
            freetext4: {allowBlank: true},
            freetext5: {allowBlank: true},
            freetext6: {allowBlank: true},
            freetext7: {allowBlank: true},
            freetext8: {allowBlank: true},
            freetext9: {allowBlank: true},
            freetext10: {allowBlank: true},
            freetext11: {allowBlank: true},
            freetext12: {allowBlank: true},
            freetext13: {allowBlank: true},
            freetext14: {allowBlank: true}
        },
        vmLetterID: '',
        vmLetterType: '',
        vmLetterProgramName: '',
        vmLetterName: '',
        vmClaimID: '278929931',
        vmRecipientID: '',
        vmMTMID: '',
        vmMemberTypeAhead: '',
        vmUCFClaimID: '',
        vmPrescriberID: '',
        vmPrescriberName : '',
        vmUCFStatus: '',
        vmOrigAssignToID: '',
        vmNewAssignToID: '',
        vmPlanGroupID: '',
        vmDocID: '',
        vmIsPCPFax: false,
        vmPCPFax: '',
        vmIsPrescriberFax: false,
        vmPrescriberFax: '',
        vmIsMemberFax: false,
        vmMemberFax: '',
        vmIsPharmacyFax: false,
        vmPharmacyFax: '',
        vmMemberEnrollStatus: '',
        vmExternalPritingSolution: false,
        vmIsLetterApproved: false,
        vmMedQtyList: {
            vmMedQty1: '',
            vmMedQty2: '',
            vmMedQty3: '',
            vmMedQty4: '',
            vmMedQty5: '',
            vmMedQty6: ''
        },
        vmViewLinks: {
            CID: '',   // View Claims - PBM/Main.aspx (#157) / PBM/Letters/Letterinfo.aaspx (#301)
            RID: '',   // View Member
            NPI: '',   // View Prescriber
            PCPID: '', // View PCP
            NCPDPID: ''  // View Pharmacy
        },
        vmConstants: {
            LETTER_MeridianRx_Contact_Phone: '1-866-984-6462',
            CURRENT_YEAR: '2017'
        },
        vmGeneralCoverLetter: {
            freetext1: '1'
        },
        vmViewMTM: {
            viewMTMIsSet: false,
            LetterID: '',
            LetterType: '',
            keyValue: '',
            MTMRID: '',
            mtmID: '',
            mtmCaseMgr: '',
            mtmPlanGroupID: ''
        }
    },
    stores: {
        defaultlettertemplatedata: {
            model: 'Atlas.letter.model.templates.DefaultLetterTemplateModel'
        },
        letterdetailextstore: {
            model: 'Atlas.letter.model.LetterDetailsModel',
            remoteSort: true,
            session: true
        },
        lettermasterdata: {
            model: 'Atlas.letter.model.LetterMasterModel'
        },
        letterinfodata: {
            model: 'Atlas.letter.model.LetterInfoModel'
        },
        letterusermaintdata: {
            model : 'Atlas.letter.model.LetterUserMaintModel'
        },
        queuelistdata: {
            model: 'Atlas.letter.model.QueueListModel',
            session: true
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        claiminfodata: {
            model: 'Atlas.letter.model.ClaimInfoModel'
        },
        memberinfodata: {
            model: 'Atlas.letter.model.MemberInfoModel'
        },
        mtmcaseinfodata: {
            model: 'Atlas.letter.model.MTMInfoModel'
        },
        mtmcasedetaildata: {
            model: 'Atlas.letter.model.MTMCaseDetailModel'
        },
        pcpinfodata: {
            model: 'Atlas.letter.model.PCPInfoModel'
        },
        pharmacyinfodata: {
            model: 'Atlas.letter.model.PharmacyInfoModel'
        },
        prescriberinfodata: {
            model: 'Atlas.letter.model.PrescriberInfoModel'
        },
        plangrouplistdata: {
            model: 'Atlas.letter.model.PlanGroupListModel',
            autoLoad:false
        },
        letterstatusdata: {
            model: 'Atlas.letter.model.LetterStatusModel'
        },
        lettertypes: {
            model: 'Atlas.letter.model.AdvancedSearchModel',
            session: true,
            listeners: {
                load: function (store) {
                    store.insert(0, {LetterName: '', LetterNameID: '0', LetterTemplateName: 'DefaultLetterTemplate'});
                }
            }
        },
        defaulttemplatedata: {
            model: 'Atlas.letter.model.templates.DefaultLetterTemplateModel'
        },
        assigntouserlist: {
            model: 'Atlas.letter.model.AssignToUserListModel',
            session: true
        },
        acumenmbrappusedata: {
            model: 'Atlas.letter.model.templates.AcumenMbrAppUseModel'
        },
        acumenmbrinappusedata: {
            model: 'Atlas.letter.model.templates.AcumenMbrInAppUseModel'
        },
        acumenmbrnotfdata: {
            model: 'Atlas.letter.model.templates.AcumenMbrNotfModel'
        },
        acumenpvdnotfdata: {
            model: 'Atlas.letter.model.templates.AcumenPvdNotfModel'
        },
        acumensponsnotfdata: {
            model: 'Atlas.letter.model.templates.AcumenSponsNotfModel'
        },
        claiminterventionletterdata: {
            model: 'Atlas.letter.model.templates.ClaimInterventionLetterModel'
        },
        drugrecallletterdata: {
            model: 'Atlas.letter.model.templates.DrugRecallLetterModel'
        },
        drugrecalljobqdata: {
            model: 'Atlas.letter.model.LetterJobQModel',
            autoLoad: true
        },
        lobstoredata: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DrugRecallLOBs'
                },
                url: 'shared/{0}/listitems'
            }
        },
        LetterLOBstoredata: {
            model: 'Atlas.letter.model.LetterLOBModel'
        },
        excludedproviderletterdata: {
            model: 'Atlas.letter.model.templates.ExcludedProviderLetterModel'
        },
        exclusionprovidertypedata: {
            model: 'Atlas.letter.model.templates.ExclusionProviderTypeModel'
        },
        formularychangedata: {
            model: 'Atlas.letter.model.templates.FormularyChangeLetterModel'
        },
        generalcoverletterdata: {
            model: 'Atlas.letter.model.templates.GeneralCoverLetterModel'
        },
        generalcoverlettertypedata: {
            model: 'Atlas.letter.model.templates.GeneralCoverLetterTypeModel',
            autoLoad:true
        },
        hrmmbrawarenesslettersdata: {
            model: 'Atlas.letter.model.templates.HRMMbrAwarenessLettersModel'
        },
        hrmpvdrawarenesslettersdata: {
            model: 'Atlas.letter.model.templates.HRMPvdrAwarenessLettersModel'
        },
        mapnoncomplianceletterdata: {
            model: 'Atlas.letter.model.templates.MAPNonComplianceLetterModel'
        },
        mtmphysicianinterventionletterdata: {
            model: 'Atlas.letter.model.templates.MTMPhysicianInterventionLetterModel'
        },
        mtmfollowupletterdata: {
            model: 'Atlas.letter.model.templates.MTMFollowupLetterModel'
        },
        mtminvitationletterdata: {
            model: 'Atlas.letter.model.templates.MTMInvitationLetterModel'
        },
        prescribernamedata: {
            model: 'Atlas.letter.model.templates.PrescriberNameModel'
        },
        rxtransfermedicareletterdata: {
            model: 'Atlas.letter.model.templates.RxTransferMedicareLetterModel'
        },
        transitionletterdata: {
            model: 'Atlas.letter.model.templates.TransitionLetterModel'
        },
        transitiontypedata: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TransitionTypes'
                },
                url: 'shared/{0}/listitems'
            }
        },
        ucfpaidtransitionletterdata: {
            model: 'Atlas.letter.model.templates.UCFPaidTransitionLetterModel'
        },
        ucfrejectedtransitionletterdata: {
            model: 'Atlas.letter.model.templates.UCFRejectedTransitionLetterModel'
        },
        ucfclaimdetaildata: {
            model: 'Atlas.letter.model.templates.UCFClaimDetailModel'
        },
        ucfclaim:{
            model:'Atlas.common.model.UCFClaim'
        }
    }
});