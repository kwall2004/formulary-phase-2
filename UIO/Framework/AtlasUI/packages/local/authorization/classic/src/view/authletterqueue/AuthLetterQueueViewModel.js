/**
 * Created by s6685 on 11/7/2016.
 */

Ext.define('Atlas.authorization.view.authletterqueue.AuthLetterQueueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.AuthLetterQueueViewModel',

    stores: {
        ReqApprovalLetterStore: {
            model: 'Atlas.authorization.model.ApvlLetterQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        ReqDenialLetterStore: {
            model: 'Atlas.authorization.model.DenialAppealQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        ReqAppealLetterStore: {
            model: 'Atlas.authorization.model.ReqAppealLettersQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        ReqInterventionLetterStore: {
            model: 'Atlas.authorization.model.ReqInterventionLetterQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        PendingAppealStore: {
            model: 'Atlas.authorization.model.AppealDecisionQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        PendingLetterStore: {
            model: 'Atlas.authorization.model.PendingLettersQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        ApprovedLetterStore: {
            model: 'Atlas.authorization.model.ApprovedLettersQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        MedicareRequiredLetterStore: {
            model: 'Atlas.authorization.model.ReqApprovalLetterQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        MedicarePendingLetterStore: {
            model: 'Atlas.authorization.model.MadicarePendingLettersQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        MedicareApprovedLetterStore: {
            model: 'Atlas.authorization.model.MedicareApprovedLettersQModel',
            pageSize: 20,
            remoteSort: true,
            autoLoad: false
        },
        AssignToUserStore: {
            type: 'clonestore',
            storeId: 'storeassignto',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 2
                },
                url: 'system/{0}/queuelist'
            }
        }
    }
});

