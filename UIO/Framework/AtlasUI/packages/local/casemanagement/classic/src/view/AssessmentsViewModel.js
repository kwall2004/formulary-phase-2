/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.store.AssessmentsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.AssessmentsViewModel',
    stores: {
        StoreQuestionnaire: {
            model: 'Atlas.casemanagement.model.MTMQuestionnaireModel',
            autoLoad: false
        },
        StoreAssessment: {
            model: 'Atlas.casemanagement.model.AssessmentListModel',
            autoLoad: false
        }

    }})