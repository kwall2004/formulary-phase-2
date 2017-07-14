/**
 * Created by agupta on 10/19/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGLetterTemplateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdaglettertemplateviewmodel',

    stores: {

        storeLetter: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeDenialReason: {
            model: 'Atlas.authorization.model.cdag.DenialLanguageModel',
            autoLoad: false
        },

        storeDenyingPhysican: {
            model: 'Atlas.authorization.model.cdag.LetterSignatureModel',
            autoLoad: false
        },

        storeAssignTo: {
            model: 'Atlas.common.model.shared.AssignToUser',
            autoLoad: false
        },

        storeDenialLetters: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storePriorAuthRequestType: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeDetermination: {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModel',
            autoLoad: false
        },

        storeCaseNotificationType: {
            type: 'clonestore',
            autoLoad: true,
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'CaseNotificationLetterType'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storePvdAppealLetters: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeLinkedAppealProvider : {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModelProviderAppeal',
            autoLoad: false
        },

        storeLinkedAppealMember: {
            model: 'Atlas.authorization.model.cdag.OutreachEntityModelMemberAppeal',
            autoLoad: false
        },

        storeMbrAppealLetters : {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        }

    }
});
