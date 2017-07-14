/** ...  **/

Ext.define('Atlas.letter.view.LetterQueueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.letterqueuevm',
    data: {
        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        vmRequiredLetters: 'Required Letters (0)',
        vmPendingLetters: 'Pending Letters (0)',
        vmAIMSBatches: 'AIMS Batches (0)',
        vmApprovedTitle: 'Approved Letters (0)',
        vmBatchDate: '',
        vmBatchTime: '',
        vmBatchToD: 'AM',
        vmDateTime: '',
        vmAIMSBatchesDetailTitle: 'Details for AIMS Batch#: <aimsbatch>'
    },
    stores: {
        requiredlettersdata: {
            model: 'Atlas.letter.model.RequiredLettersModel'
        },
        pendinglettersdata: {
            model: 'Atlas.letter.model.PendingLettersModel'
        },
        aimsbatchesdata: {
            model: 'Atlas.letter.model.AIMSBatchesModel',
            remoteSort: true,
            pageSize: 15
        },
        aimsjobsdocsdata: {
            model: 'Atlas.letter.model.AIMSJobsDocsModel',
            remoteSort: true,
            pageSize: 10
        },
        approvedlettersdata: {
            model: 'Atlas.letter.model.ApprovedLettersModel'
        },
        AssignToUserStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.AssignToUser',
            autoLoad: false,
            proxy: {
                extraParams: {
                    pQueueListID: '2'
                },
                url: 'system/{0}/queuelist'
            }
        }
    }
});