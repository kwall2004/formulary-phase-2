/**
 * Created by agupta on 10/21/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGWinNotesController', {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.cdagwinnotescontroller',
        letterAuthId: null,

        winBtnSaveNotes_Click: function () {

            var view = this.getView();
            var letterName = view.down('#hdnLetterNameWinNotes').getValue(),
                letterFunction = '';

            switch (letterName){

                case 'D Medicare':
                case 'D Medicaid':
                case 'D Commercial':
                case 'QuickenPADenial':
                case 'MedicareDenial':
                case 'MedicaidPADenial':
                case 'ChoicePADenial':
                case 'NextLevelPADenial':
                    letterFunction = 'saveLetter_CDAGDenialLetters';
                    break;

                case 'NextLevelProviderAppeal':
                case 'ProviderRedetermination':
                case 'R Medicare':
                case 'R Medicaid':
                case 'R Commercial':
                case 'ProviderAppeal':
                    letterFunction = 'saveLetter_CDAGProviderAppealLtr';
                    break;

                case 'NextLevelMemberAppeal':
                case 'ChoiceMemberAppeal':
                case 'MemberRedetermination':
                case 'A Medicare':
                case 'A Medicaid':
                case 'A Commercial':
                case 'MemberAppeal':
                    letterFunction = 'saveLetter_CDAGMemberAppealLtr';
                    break;

                case 'Medicare Case Notification Medicare':
                case 'CaseNotification':
                    letterFunction = 'saveLetter_CDAGCaseNotificationLtr';
                    break;

                case 'MedicareApproval':
                    letterFunction = 'saveLetter_CDAGApprovalLetter';
                    break;

                case 'AdditionalInfoRequest':
                case 'Medicare Additional Info Request Medicare':
                    letterFunction = 'saveLetter_CDAGAdditonalInfoReqLtr';
                    break;

                case 'Intervention':
                case 'Intervention Medicaid':
                    letterFunction = 'saveLetter_CDAGInterventionLetter';
                    break;

                case 'ChoicePAApproval':
                case 'HIX Auth Approval Commercial':
                case 'HIX Auth Approval':
                case 'QuickenPAApproval':
                case 'NextLevel Auth Approval Medicaid':
                case 'NextLevelPAApproval':
                    letterFunction = 'saveLetter_CDAGAppovalHIXLetter';
                    break;

                case 'Appeal Acknowledgement Medicaid':
                case 'Level 2 Appeal Acknowledgement Medicaid':
                    letterFunction = 'saveLetter_CDAGAppealAckLetter';
                    break;
            }

            if (letterFunction != '') {
                this.fireEvent('updateCDAGAuthLetter', this.letterAuthId, letterFunction, this.getView().down('#winTxtNotes').rawValue);
            }
        },

        onCancelClick: function () {
            this.getView().destroy();
        },

        init: function () {
            var view = this.getView();
            var txtNotes = view.extraParams["pTxtNotes"];
            this.letterAuthId = view.extraParams["letterAuthId"];
            view.down('#hdnLetterNameWinNotes').setValue(view.extraParams["pLetterName"]);
            view.down('#winTxtNotes').setValue(txtNotes);
        }


    }
);