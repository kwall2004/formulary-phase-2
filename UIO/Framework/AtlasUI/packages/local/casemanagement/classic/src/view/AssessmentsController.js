/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.view.AssessmentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assessmentscontroller',
    listen: {
        controller: {
            'casedetailscontroller': {
                LoadAssessmentsQuestionnaire: 'LoadAssessmentsQuestionnaire'
            }
        }
    },
    init: function () {
        this.LoadAssessmentsQuestionnaire();
    },
    LoadAssessments: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != "") {
            var StoreAssessment = vm.getStore('StoreAssessment');
            StoreAssessment.getProxy().setExtraParam('pParentSystemId', this.getViewModel().getParent().getData().caseData[0].data.systemID);
            StoreAssessment.getProxy().setExtraParam('pAssesmentListName', 'MTMAssessment');
            StoreAssessment.load();
        }
    },
    LoadQuestionnaire: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != "") {
            var StoreQuestionnaire = vm.getStore('StoreQuestionnaire');
            StoreQuestionnaire.getProxy().setExtraParam('pParentSystemId', this.getViewModel().getParent().getData().caseData[0].data.systemID);
            StoreQuestionnaire.getProxy().setExtraParam('pAssesmentListName', 'MTMQuestionnaire');
            StoreQuestionnaire.load();
        }
    },
    LoadAssessmentsQuestionnaire: function () {
        this.LoadAssessments();
        this.LoadQuestionnaire();
    },
    btnSaveAssessmentClick: function () {
        try {
            var me = this;
            var ttAssessmentDetail = {};
            var tempData = [];
            var view = this.getView();
            var grid = view.down('#gpAssessment');
            var store = grid.getStore();
            if (this.isDirtyStore(store)) {
                for (c = 0; c < store.data.items.length; c++) {
                    var ttAssessmentDetailsingle = {};
                    ttAssessmentDetailsingle.assesmentListItem = store.data.items[c].data.assesmentListItem;
                    ttAssessmentDetailsingle.answer = store.data.items[c].data.AnswerTest == true ? 'Y' : 'N';
                    tempData.push(ttAssessmentDetailsingle);
                }
                ttAssessmentDetail.ttAssessmentDetail = tempData;
                if (tempData.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'pParentSystemId': this.getViewModel().getParent().getData().caseData[0].data.systemID,
                        'passesmentListName': 'MTMAssessment',
                        'ttAssessmentDetail': ttAssessmentDetail
                    };
                    var listDetail;
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/assessmentmasterdetail/update', null, [false], extraParameters,
                        saveAction, null);
                    if (submitJobReturn.code == 0) {
                        Ext.Msg.alert("PBM", "MTM Assessment Updated.");
                        this.LoadAssessments();
                    }
                    else {
                        Ext.Msg.alert("PBM", submitJobReturn.message);
                    }
                }
            }
        }
        catch (ex) {

        }

    },
    btnSaveQuestionnaireClick: function () {
        try {
            var me = this;
            var ttAssessmentDetail = {};
            var tempData = [];
            var view = this.getView();
            var grid = view.down('#gpQuestionnaire');
            var store = grid.getStore();
            if (this.isDirtyStore(store)) {
                for (c = 0; c < store.data.items.length; c++) {
                    var ttAssessmentDetailsingle = {};
                    ttAssessmentDetailsingle.assesmentListItem = store.data.items[c].data.assesmentListItem;
                    ttAssessmentDetailsingle.answer = store.data.items[c].data.AnswerTest == true ? 'Y' : 'N';
                    tempData.push(ttAssessmentDetailsingle);
                }
                ttAssessmentDetail.ttAssessmentDetail = tempData;
                if (tempData.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'pParentSystemId': this.getViewModel().getParent().getData().caseData[0].data.systemID,
                        'passesmentListName': 'MTMQuestionnaire',
                        'ttAssessmentDetail': ttAssessmentDetail
                    };
                    var listDetail;
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/assessmentmasterdetail/update', null, [false], extraParameters,
                        saveAction, null);
                    if (submitJobReturn.code == 0) {
                        Ext.Msg.alert("PBM", "MTM Questionnaire Updated.");
                        this.LoadQuestionnaire();
                    }
                    else {
                        Ext.Msg.alert("PBM", submitJobReturn.message);
                    }
                }
            }
        }
        catch (ex) {

        }
    },
    onCheckcolumnBeforeCheckChange: function (checkcolumn, rowIndex, checked, eOpts) {
        var grid = this.getView().down('#gpQuestionnaire');
        var record = grid.getStore().getAt(rowIndex);
        return (record.get('answer') == false);
    },
    isDirtyStore: function (theStore) {
        var isDirty = false;
        theStore.each(function (item) {
            if (item.dirty == true) {
                isDirty = true;
            }
        });
        if (!isDirty) {
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;

    }
});
