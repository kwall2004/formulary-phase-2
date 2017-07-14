/**
 * This class is the Main ViewModel of the Pharmacy Credentialing Page
 * @author : Leo
 */

Ext.define('Atlas.pharmacy.view.credentialing.CredentialingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacy-credentialing',

    data: {
        selCredType: 'RID',
        credDetailSavetype: 'Update',
        trgSaveState: 'Update',
        selCredValue: '',
        keySystemID: '',
        isPharma: false,
        hasNCPDPID: false,
        hasRID: false,
        hasApplyAll: false,
        relationshipLbl: 'Relationship ID',
        activeTab: '',
        canAddCredentialYear: false,
        canSendMissingLetter: false
    },

    stores: {

        applicationtypelist: {
            model: 'Atlas.pharmacy.model.PharmaListitems'
        },

        stateslist: {
            model: 'Atlas.pharmacy.model.PharmaListitems'
        },

        credresultlist: {
            model: 'Atlas.pharmacy.model.PharmaListitems'
        },

        dispenserclasslist: {
            model: 'Atlas.pharmacy.model.PharmaListitems'
        },

        credtypelist: {
            model: 'Atlas.pharmacy.model.PharmaListitems'
        },

        trainingtypelist: {
            // model : 'Atlas.pharmacy.model.PharmaListitems'
            data: [
                {value: "FWA", name: "Fraud Waste & Abuse Training"}
            ]

        },


        //The Search combo store
        relationshiplocationdetail: {
            model: 'Atlas.pharmacy.model.RelationshipLocationDetail',
            autoLoad: true
        },

        //The Search combo store
        pharmacylocationdetail: {
            model: 'Atlas.pharmacy.model.PharmacyLocationDetail',
            autoLoad: true
        },

        //The Pharma Credential Log grid
        pharmacredlogmaster: {
            model: 'Atlas.pharmacy.model.PharmaCredMaster',
            listeners: {
                load: 'onPharmaCredMasterLoad'
            }
        },

        //fax Attachment Grid
        credfaxattachment: {
            model: 'Atlas.pharmacy.model.CredFaxAttachment',
            autoLoad: false
        },

        //General Info Form
        relationshipmasterdata: {
            model: 'Atlas.pharmacy.model.RelationshipMasterData',
            listeners: {
                load: 'loadMainInfoForm'
            }
        },

        //Relationship Popup
        relationshipPopupData: {
            model: 'Atlas.pharmacy.model.RelationshipMasterData'
        },

        //General Info Form
        pharmacymasterdata: {
            model: 'Atlas.pharmacy.model.PharmCredMaster',
            listeners: {
                load: 'loadMainInfoForm'
            }
        },

        // The To Do List Grid
        credentailtodo: {
            model: 'Atlas.pharmacy.model.CredentialToDo'
        },

        //Checklist Grid
        pharmcredchecklist: {
            model: 'Atlas.pharmacy.model.PharmCredChecklist'
        },

        //Load Pharmacy information Left menu
        pharmaciesbyrid: {
            model: 'Atlas.pharmacy.model.PharmaciesByRid',
            listeners: {
                load: 'onPharmaciesByRIDLoad'
            }
        },

        //On Pharmacy information Left menu Click
        pharmacylicinfo: {
            model: 'Atlas.pharmacy.model.PharmaciesLicInfoByNCPDPId',
            listeners: {
                load: 'loadLicenseInfoByNCPDPId'
            }
        },

        //Pharmacy Information - tab 1
        piclicenseinfo: {
            model: 'Atlas.pharmacy.model.PICLicenseInfo'
        },

        //Pharmacy Information - tab 2
        dealicensehistory: {
            model: 'Atlas.pharmacy.model.DEALicenseHistory'
        },

        //Pharmacy Information - tab 3
        inslicensehistory: {
            model: 'Atlas.pharmacy.model.InsLicenseHistory'
        },

        //Pharmacy Information - tab 4
        statelicensencpdphistory: {
            model: 'Atlas.pharmacy.model.StateLicenseNCPDPHistory'
        },

        //Pharmacy Information - tab 4
        statelicensepbminfo: {
            model: 'Atlas.pharmacy.model.StateLicensePBMHistory'
        },

        statelicensepbmhistoryTemp: {},

        //Pharmacy Information - tab 4
        statelicensepbmhistory: {
            model: 'Atlas.pharmacy.model.StateLicensePBMHistory'
        },

        // Pharmacy Information - tab 4
        statelicensepbmshow: {
            model: 'Atlas.pharmacy.model.StateLicensePBMHistory'
        },

        //Pharmacy Information - tab 5
        pharmacyandpatientinfo: {
            model: 'Atlas.pharmacy.model.PharmacyAndPatientInfo'
        },

        //Pharmacy Information - tab 6
        pharmntisinfo: {
            model: 'Atlas.pharmacy.model.PharmNTISInfo'
        },

        //Pharmacy Information - tab 6
        federaltaxidhistory: {
            model: 'Atlas.pharmacy.model.FederalTaxIDHistory'
        },

        //Pharmacy Information - tab 6
        pharmtraining: {
            model: 'Atlas.pharmacy.model.PharmTraining',
            listeners: {
                load: 'loadPharmaTraining'
            }
        },

        //Pharmacy Information - tab 6
        pharmtrainingToSave: {
            model: 'Atlas.pharmacy.model.PharmTraining'
        },

        //Pharmacy Information - tab 6
        contactinfotable: {
            model: 'Atlas.pharmacy.model.ContactInfoTable',
            listeners: {
                load: 'loadContactInfo'
            }
        },

        //Pharmacy Information - tab 6
        contactinfotableToSave: {
            model: 'Atlas.pharmacy.model.ContactInfoTable'
        },
        letterDetail: {
            model: 'Atlas.pharmacy.model.LetterDetail'
        },
        letterNameId: {
            model: 'Atlas.letter.model.QueryDBModel'
        },
        letterProgramName: {
            model: 'Atlas.letter.model.QueryDBModel'
        },

        yesnona: {
            fields: [
                {name: 'name', type: 'string'},
                {name: 'value', type: 'string'}
            ],
            data: [
                {name: 'Yes', value: 'Yes'},
                {name: 'No', value: 'No'},
                {name: 'N/A', value: 'N/A'}
            ]
        },
        pharmacyMasterData: {
            model: 'Atlas.pharmacy.model.PharmacyMasterData'
        },
        pharmacyrelationship: {
            model: 'Atlas.pharmacy.model.PharmacyRelationship'
        }
    }
});
