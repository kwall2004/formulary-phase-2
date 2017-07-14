/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Formulary
 * Description: View Model for Formulary Approval
 **/

Ext.define('Atlas.formulary.view.FormularyApprovalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formularyapprovalviewmodel',


    data: {
        FormularyID : '' ,
        FormularyName: '' ,
        Stat: '' ,
        FormularyVersion: '' ,
        systemID : '',
        EffectiveDate: '',
        Action: '',
        NotesData: '',
        title: '',
        Description: ''

    },

    stores: {
        formularyinfodata: {
            model: 'Atlas.formulary.model.FormularyApprovalModel',
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            pagination: true
        },

        storeformularychanges: {

            model: 'Atlas.formulary.model.FormularyChangesModel',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        },
        storenotes: {
            model: 'Atlas.common.model.shared.NotesModel',
            autoLoad: false,
            remoteSort: true

        }

    }





});

