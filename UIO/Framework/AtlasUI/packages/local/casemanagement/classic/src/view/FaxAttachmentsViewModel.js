/**
 * Created by s6627 on 11/27/2016.
 */
Ext.define('Atlas.casemanagement.view.FaxAttachmentsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FaxAttachmentsViewModel',
    stores: {
        FaxHistoryStore: {
            // model: 'Atlas.casemanagement.model.FaxHistoryModel',
            // autoLoad: false
            type:'casemanagement-faxhistory'
        },
        FaxQStore: {
            // model: 'Atlas.casemanagement.model.FaxQModel',
            // autoLoad: false
            type:'casemanagement-faxqdocuments'
        }
    }
})