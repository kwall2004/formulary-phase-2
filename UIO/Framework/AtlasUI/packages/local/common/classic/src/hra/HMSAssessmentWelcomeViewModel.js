/**
 * Created by b6636 on 11/9/2016.
 */
Ext.define('Atlas.common.hra.HMSAssessmentWelcomeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hmsassessmentwelcomeviewmodel',

    stores: {
        assessmentData: {
            type: 'common-memberassessmentdataweb',
            autoLoad: false
        },
        memberAssessmentQA: {
            model: 'Atlas.common.hra.model.MemberAssessmentQA'
        },
        assessmentAnswerIO: {
            model: 'Atlas.common.hra.model.AssessmentAnswerIO'
            // filters: [
            //     function (item) {
            //         return (item.assessmentID === this.assessmentID && item.questionID == this.questionID);
            //     }
            // ],
            // assessmentID : 0,
            // questionID : 0
        },
        providers: {
            model: 'Atlas.portals.provider.model.ProviderListWeb'
        }
        /*
         A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
         store configuration. For example:

         users: {
         model: 'HMSAssessmentWelcome',
         autoLoad: true
         }
         */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});