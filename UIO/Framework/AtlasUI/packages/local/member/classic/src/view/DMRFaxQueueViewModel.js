/**
 * Created by d3973 on 10/28/2016.
 */
Ext.define('Atlas.member.view.DMRFaxQueueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dmrfaxqueueviewmodel',

    stores: {
        faxQDocuments: {
            model: 'Atlas.member.model.faxQDocuments',
            //remoteSort: true,
            sorters: [
                'ReceiptDate'
            ]
        },

        qManagementData: {
            model: 'Atlas.member.model.QManagementData'
        }
    }
});