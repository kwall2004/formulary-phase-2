/**
 * Created by s6393 on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.view.IdentifyCandidatesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.identifyCandidatesViewModel',

    stores: {
        StoreJobGroup: {
            model: 'Atlas.casemanagement.model.CaseManagementJobGroupModel',
            autoLoad: true
        },
        StoreJobQueueAttachments: {
            model: 'Atlas.casemanagement.model.JobQueueAttachments'
        },

        StoreDeleteQueue: {
            model: 'Atlas.casemanagement.model.DeleteJobQueueDirectlyModel'
        },
        StoreIncludeType:{
            model:'Atlas.casemanagement.model.IncludeTypeModel',
            autoLoad:true
        }
    },

    data: {
        mapMPRpercent: '80',
        qmAsthmaShortETC: '5970',
        qmAsthmaLongETC: '3713719',
        serviceDateFrom: Atlas.common.utility.Utilities.getLocalDateTime(),
        serviceDateTo: Atlas.common.utility.Utilities.getLocalDateTime(),
        userName: Atlas.user.un,
        systemID:'52.741198881', //MTM
        documentID: null,
        faxNumber: null,
        jobNumber: null,
        Type:null,
        isIncludeActive: false,
        plangroupname:null
    }
});