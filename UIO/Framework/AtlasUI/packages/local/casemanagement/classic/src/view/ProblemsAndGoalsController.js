/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.ProblemsAndGoalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.problemsandgoalscontroller',
    listen: {
        controller: {
            'casedetailscontroller': {
                LoadProblemAAndBarriers: 'LoadProblemAAndBarriers'
            }
        }
    },
    init: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != '') {
            var StoreProblemAndRecords = vm.getStore('StoreProblemAndRecords');
            StoreProblemAndRecords.getProxy().setExtraParam('ipiMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
            StoreProblemAndRecords.load();
        }
    },
    LoadProblemAAndBarriers:function()
    {
        this.LoadProblemAndGoalRecords();
        this.LoadGoalBarrier();
    },
    btnAddProblemClick: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementAddUpdateProblems',
            autoShow: true,
            title: 'Add Problem',
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#btnDeleteProblem').hide()
        this.getView().add(win);
        win.show();
    },
    btnGoals_Click: function (sender, index) {
        var grid = this.getView().down('#gpProblemsAndGoals');
        var record = grid.getSelectionModel().getSelection()[0];
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementGoals',
            autoShow: true,
            title: 'Add Goal',
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#btnDeleteGoal').hide();
        win.down('#lblDescription').setValue(record.data.ProblemDesc);
        win.down('#cbxGoalStatus').getStore().load({
            callback: function() {
                win.down('#cbxGoalStatus').setValue('1');
            }
        })
        win.down('#hdnProblemIdGoal').setValue(record.data.ProblemId);
        this.getView().add(win);
        win.show();
    },
    btnAddGoalBarrier: function (sender,index) {
        var grid = this.getView().down('#gpProblemsAndGoals');
        var record = grid.getStore().getAt(index);
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementGoalBarriersWindow',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        //win.down('#hdnGoalIdBarrier').setValue(record.data.GoalId);
        //this.LoadGoalBarrier();
        this.getView().add(win);
        win.show();
    },
    LoadGoalBarrier:function()
    {
        var view=this.getView();
        var vm=this.getViewModel();
        var storeBarriers = vm.getStore('storeBarriers');
        if (view.down('#hdnGoalIdBarrier').getValue() != null && view.down('#hdnGoalIdBarrier').getValue() != '') {
            storeBarriers.getProxy().setExtraParam('pGoalId', view.down('#hdnGoalIdBarrier').getValue());
        }else storeBarriers.getProxy().setExtraParam('pGoalId', '');
        storeBarriers.load();
    },
    btnAddBarrier_Click:function()
    {
        var view=this.getView();
        try {
            var insert=true;
            if (view.down('#cbxGoalBarriers').getValue() != '' && view.down('#cbxGoalBarriers').getValue() != null) {
                var records = view.down('#cbxGoalBarriers').getStore().data.items;
                var rowIndex = view.down('#cbxGoalBarriers').getStore().findExact('Code', view.down('#cbxGoalBarriers').getValue(), 0);
                var code = records[rowIndex].get('Code');
                var detail = records[rowIndex].get('Detail');
                var grid = view.down('#grdBarriers');
                var store = view.down('#grdBarriers').getStore();
                for(var i=0;i<store.data.items.length;i++)
                {
                    if(store.data.items[i].data.BarrierCode==code)
                    {
                        insert=false;
                        break;
                    }
                }
                if(insert) {
                    store.insert(0, {
                        BarrierCode: code,
                        BarrierDescription: detail
                    });
                }
                else {
                    Ext.Msg.alert("PBM", "Record is already present in grid");
                }
                grid.getView().refresh();
                //grid.getRowEditor().startEditing(0);
                view.down('#cbxGoalBarriers').setValue('');
            }
        }
        catch(ex)
        { }
    },
    removeBarrier:function()
    {
        var view=this.getView();
        var grid =  view.down('#grdBarriers');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var store = grid.getStore();
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },
    SaveGoalBarriers:function()
    {
        try
        {
            var view=this.getView();
            var store = view.down('#grdBarriers').getStore();
            var sSelectedBarriers = "";
            var sSuccessMessage = "";
            var pFieldList = ""; //Comma Separated list of fields..
            var pFieldValues = ""; //Values of the fields..
            var result;
            var message;
            var oSystemId;
            var ttNDC={};
            var tempData=[];
            for (var c = 0; c < store.data.items.length; c++) {
                if(sSelectedBarriers=="")
                {
                    sSelectedBarriers=  store.data.items[c].data.BarrierCode;
                }
                else
                {
                    sSelectedBarriers= sSelectedBarriers + "," + store.data.items[c].data.BarrierCode;
                }

            }
            pFieldList = 'goalBarriers';
            pFieldValues = sSelectedBarriers;
            var extraParameters = {
                'pGoalId':view.down('#hdnGoalIdBarrier').getValue(),
                'pFieldList': pFieldList,
                'pFields':pFieldValues

            };
            var listDetail;
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/goalbarriers/update', null, [false], extraParameters,
                saveAction, null);
            if (submitJobReturn.code == 0)
            {
                sSuccessMessage = "Goal Barriers Successfully Updated.";
                Ext.Msg.alert("PBM", sSuccessMessage);
                view.down('#hdnGoalIdBarrier').setValue('');
                this.LoadGoalBarrier(); //Reload the Goal Barriers grid.
                this.LoadProblemAndGoalRecords(); //Reload the Goals Grid.
            }
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    gpProblemsAndGoals_select:function(dv, record, item, index, e)
    {
        var view=this.getView();
        if(record.data.GoalId>0) {
            view.down('#PlnBarriers').setDisabled(false);
            view.down('#btnUpdateMedication').setDisabled(false);
            view.down('#btnAddGoal').setDisabled(false);
            view.down('#hdnGoalIdBarrier').setValue(record.data.GoalId);
            this.LoadGoalBarrier();
        }
        else {
            view.down('#PlnBarriers').setDisabled(true);
            view.down('#btnUpdateMedication').setDisabled(false);
            view.down('#btnAddGoal').setDisabled(false);
            view.down('#hdnGoalIdBarrier').setValue('');
        }
    },
    gpProblemsAndGoals_Click: function (dv, record, item, index, e) {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementGoals',
            autoShow: true,
            title: 'Update Goal',
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#cbxGoal').getStore().load({
            callback: function() {
                win.down('#cbxGoal').setValue(record.data.Goal);
            }
        })
        win.down('#cbxGoalType').getStore().load({
            callback: function() {
                win.down('#cbxGoalType').setValue(record.data.GoalType);
            }
        })
        win.down('#cbxGoalStatus').getStore().load({
            callback: function() {
                win.down('#cbxGoalStatus').setValue(record.data.GoalStatus);
            }
        })
        win.down('#cbxGoalProgress').getStore().load({
            callback: function() {
                win.down('#cbxGoalProgress').setValue(record.data.GoalProgress);
            }
        })
        win.down('#cbxGoalAction').getStore().load({
            callback: function() {
                win.down('#cbxGoalAction').setValue(record.data.actionTaken);
            }
        })
        win.down('#cbxGoalResult').getStore().load({
            callback: function() {
                win.down('#cbxGoalResult').setValue(record.data.GoalResult);
            }
        })
        win.down('#cbxGoalClosedReason').getStore().load({
            callback: function() {
                win.down('#cbxGoalClosedReason').setValue(record.data.closedReason);
            }
        })
        win.down('#btnDeleteGoal').show();
        win.down('#btnSaveGoal').setText("Update");
        win.down('#hdnProblemIdGoal').setValue(record.data.ProblemId);
        win.down('#hdnGoalId').setValue(record.data.GoalId);
        win.down('#lblDescription').setValue(record.data.ProblemDesc);
        //win.down('#cbxGoal').setValue(record.data.GoalDesc);
        win.down('#txtGoalDescription').setValue(record.data.GoalDesc);
        win.down('#dtGoalStartDate').setValue(record.data.GoalstartDate);
        win.down('#dtGoalFollowupDate').setValue(record.data.followupDate);
        win.down('#dtGoalEndDate').setValue(record.data.closedDate);
        this.getView().add(win);
        win.show();
    },
    btnSaveProblemClick: function () {
        var view = this.getView();
        var closeCheck = true;
        var StoreProblemAndRecords = this.getViewModel().getStore('StoreProblemAndRecords');
        view.down('#cbxProblemClosedReason').clearInvalid();
        view.down('#dtProblemEndDate').clearInvalid();
        if (view.down('#cbxProblemStatus').getRawValue() == 'Closed') {
            if (view.down('#cbxProblemClosedReason').getValue() == null || view.down('#cbxProblemClosedReason').getValue() == '') {
                view.down('#cbxProblemClosedReason').markInvalid('Closed Reason is required.');
                closeCheck = false;
            }
            if (view.down('#dtProblemEndDate').getValue() == null || view.down('#dtProblemEndDate').getValue() == '') {
                view.down('#dtProblemEndDate').markInvalid('Close Date is required.');
                closeCheck = false;
            }
        }
        if (closeCheck && view.down('#formProblems').isValid()) {
            var checkExit = false;
            for (var i = 0; i < StoreProblemAndRecords.data.items.length; i++) {
                if (view.down('#cbxProblem').getRawValue() == StoreProblemAndRecords.data.items[i].ProblemDesc) {
                    checkExit = true;
                }
            }
            if (checkExit)
                Ext.Msg.alert('PBM', 'Problem already exists.');
            else {
                try {
                    var sSuccessMessage = "";
                    var pFieldList = ""; //Comma Separated list of fields..
                    var pFieldValues = ""; //Values of the fields..
                    var pMTMId = "0";
                    var pProblemId = "0";
                    var result;
                    var message;
                    var sAction = "";
                    var retProblemId;
                    var retSystemId;
                    if (view.up('CaseInfo').down('#hiddenMTMID').getValue() == "" || view.up('CaseInfo').down('#hiddenMTMID').getValue() == "0") {
                    }
                    else {
                        pMTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue().trim();
                    }

                    if (view.down('#hdnProblemId').getValue() == "" || view.down('#hdnProblemId').getValue() == "0") {
                    }
                    else {
                        pProblemId = view.down('#hdnProblemId').getValue().trim();
                    }

                    if (pMTMId == "0") {
                        Ext.Msg.alert("PBM", "Invalid MTM Record.");
                        return;
                    }

                    if (pProblemId == "0") {
                        sAction = "A";
                    }
                    else {
                        sAction = "U";
                    }
                    pFieldList = 'Problem,problemDescr,ProblemStatus,startDate,ClosedDate,ClosedReason';
                    if (view.down('#cbxProblem').getValue() != null) {
                        pFieldValues = view.down('#cbxProblem').getValue();
                    }
                    pFieldValues = pFieldValues + '|';
                    if (view.down('#txtProblemDescription').getValue() != null) {
                        pFieldValues = pFieldValues + view.down('#txtProblemDescription').getValue();
                    }
                    pFieldValues = pFieldValues + '|';
                    if (view.down('#cbxProblemStatus').getValue() != null) {
                        pFieldValues = pFieldValues + view.down('#cbxProblemStatus').getValue();
                    }
                    pFieldValues = pFieldValues + '|';
                    if (view.down('#dtProblemStartDate').getValue() != null&&view.down('#dtProblemStartDate').getValue() != '') {
                        pFieldValues = pFieldValues + Ext.Date.format(view.down('#dtProblemStartDate').getValue(), 'm/d/Y');
                    }
                    pFieldValues = pFieldValues + '|';
                    if (view.down('#dtProblemEndDate').getValue() != null&&view.down('#dtProblemEndDate').getValue() != '') {
                        pFieldValues = pFieldValues + Ext.Date.format(view.down('#dtProblemEndDate').getValue(), 'm/d/Y');
                    }
                    pFieldValues = pFieldValues + '|';
                    if (view.down('#cbxProblemClosedReason').getValue() != null) {
                        pFieldValues = pFieldValues + view.down('#cbxProblemClosedReason').getValue();
                    }
                    var extraParameters = {
                        'pMTMId': pMTMId,
                        'pProblemId': pProblemId,
                        'pMode': sAction,
                        'pFields': pFieldList,
                        'pValues': pFieldValues
                    };
                    var returnField = ['oProblemId'];
                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmproblems/update', null, [false], extraParameters,
                        saveAction, returnField);
                    if (testReturn.code == 0) {
                        if (pProblemId == "0") //Insert
                        {
                            sSuccessMessage = "Problem Record Successfully Created.";
                        }
                        else {
                            sSuccessMessage = "Problem Record Successfully Updated.";
                        }
                        //view.down('#hdnProblemId').setValue(testReturn.oProblemId);
                        view.down('#btnSaveProblem').setText("Update");
                        view.down('#btnDeleteProblem').show();
                        Ext.Msg.alert("PBM", sSuccessMessage);
                        this.LoadProblemAndGoalRecords(); //Reload the Problems grid.
                        view.down('#hdnGoalIdBarrier').setValue('');
                        this.LoadGoalBarrier();
                        view.down('#winAddProblems').close();
                    }
                }
                catch (ex) {
                    Ext.Msg.alert("Exception", ex.message);
                }
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }

    },
    LoadProblemAndGoalRecords: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != '') {
            var StoreProblemAndRecords = vm.getStore('StoreProblemAndRecords');
            StoreProblemAndRecords.getProxy().setExtraParam('ipiMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
            StoreProblemAndRecords.load();
            view.down('#btnAddGoal').setDisabled(true);
            view.down('#PlnBarriers').setDisabled(true);
            view.down('#btnUpdateMedication').setDisabled(true);
        }
    },
    btnCancelClick: function () {
        var view = this.getView();
        view.down('#winAddProblems').close();
    },
    btnUpdateMedicationClick: function () {
        var grid=this.getView().down('#gpProblemsAndGoals');
        var me = this;
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");
        }
        else {
            var record = grid.getSelectionModel().getSelection()[0];
            var win = Ext.create({
                xtype: 'casemanagementAddUpdateProblems',
                autoShow: true,
                title: 'Update Problem',
                viewModel: {
                    parent: me.getViewModel()
                }
            });
            win.down('#cbxProblem').getStore().load({
                callback: function() {
                    win.down('#cbxProblem').setValue(record.data.Problem);
                }
            });
            win.down('#cbxProblemStatus').getStore().load({
                callback: function() {
                    win.down('#cbxProblemStatus').setValue(record.data.ProblemStatus);
                }
            });
            win.down('#cbxProblemClosedReason').getStore().load({
                callback: function() {
                    win.down('#cbxProblemClosedReason').setValue(record.data.problemClosedReason);
                }
            });
            win.down('#btnSaveProblem').setText("Update");
            win.down('#txtProblemDescription').setValue(record.data.problemDescr);
            win.down('#dtProblemStartDate').setValue(record.data.problemStartDate);
            win.down('#dtProblemEndDate').setValue(record.data.problemClosedDate);
            win.down('#btnSaveProblem').setText('Update');
            win.down('#btnDeleteProblem').show()
            me.getView().down('#hdnProblemId').setValue(record.data.ProblemId);
            this.getView().add(win);
            win.show();
        }
    },
    btnDeleteProblem_Click: function () {
        var view = this.getView();
        Ext.Msg.confirm('PBM', 'Are you sure you would like to delete problem record ' + view.down('#cbxProblem').getRawValue() + ', This will also delete associated goals?',
            function (btn) {
                if (btn == 'yes') {
                    try {
                        var sSuccessMessage = "";
                        var pFieldList = ""; //Comma Separated list of fields..
                        var pFieldValues = ""; //Values of the fields..
                        var pMTMId = "0";
                        var pProblemId = "0";
                        var result;
                        var message;
                        var sAction = "";
                        var retProblemId;
                        var retSystemId;
                        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() == "" || view.up('CaseInfo').down('#hiddenMTMID').getValue() == "0") {
                        }
                        else {
                            pMTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue().trim();
                        }

                        if (view.down('#hdnProblemId').getValue() == "" || view.down('#hdnProblemId').getValue() == "0") {
                        }
                        else {
                            pProblemId = view.down('#hdnProblemId').getValue().trim();
                        }

                        if (pMTMId == "0") {
                            Ext.Msg.alert("PBM", "Invalid MTM Record.");
                            return;
                        }
                        if (pProblemId == "0") {
                            Ext.Msg.alert("PBM", "Invalid Problem Id.");
                            return;
                        }
                        sAction = "D";
                        pFieldList = 'Problem,problemDescr,ProblemStatus,startDate,ClosedDate,ClosedReason';
                        if (view.down('#cbxProblem').getValue() != null) {
                            pFieldValues = view.down('#cbxProblem').getValue();
                        }
                        var extraParameters = {
                            'pMTMId': pMTMId,
                            'pProblemId': pProblemId,
                            'pMode': sAction,
                            'pFields': pFieldList,
                            'pValues': pFieldValues
                        };
                        var returnField = ['oProblemId'];
                        var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmproblems/update', null, [false], extraParameters,
                            saveAction, returnField);
                        if (testReturn.code == 0) {
                            sSuccessMessage = "Problem Record Successfully Deleted.";
                            Ext.Msg.alert("PBM", sSuccessMessage);
                            this.LoadProblemAndGoalRecords(); //Reload the Problems grid.
                            //LoadProblemAndGoalRecords();
                            view.down('#hdnGoalIdBarrier').setValue('');
                            this.LoadGoalBarrier();
                            view.down('#hdnProblemId').setValue("0");
                            view.down('#winAddProblems').close();
                        }
                    }
                    catch (ex) {
                        Ext.Msg.alert("Exception", ex.message);
                    }
                }
            }, this);
    },
    btnCancelGoalClick: function () {
        var view = this.getView();
        view.down('#winGoals').close();
    },
    btnSaveGoalClick: function () {
        var view = this.getView();
        var closeCheck = true;
        view.down('#cbxGoalClosedReason').clearInvalid();
        view.down('#dtGoalEndDate').clearInvalid();
        if (view.down('#cbxGoalStatus').getRawValue() == 'Closed') {
            if (view.down('#cbxGoalClosedReason').getValue() == null || view.down('#cbxGoalClosedReason').getValue() == '') {
                view.down('#cbxGoalClosedReason').markInvalid('Closed Reason is required.');
                closeCheck = false;
            }
            if (view.down('#dtGoalEndDate').getValue() == null || view.down('#dtGoalEndDate').getValue() == '') {
                view.down('#dtGoalEndDate').markInvalid('Close Date is required.');
                closeCheck = false;
            }
        }
        if (closeCheck && view.down('#formGoals').isValid()) {
            try {
                var sSuccessMessage = "";
                var pFieldList = ""; //Comma Separated list of fields..
                var pFieldValues = ""; //Values of the fields..
                var pGoalId = "0";
                var pProblemId = "0";
                var result;
                var message;
                var sAction = "";
                var retProblemId;
                var retSystemId;
                if (view.down('#hdnProblemIdGoal').getValue() == "" || view.down('#hdnProblemIdGoal').getValue() == "0") {
                }
                else {
                    pProblemId = view.down('#hdnProblemIdGoal').getValue().trim();
                }
                if (view.down('#hdnGoalId').getValue() == "" || view.down('#hdnGoalId').getValue() == "0") {
                }
                else {
                    pGoalId = view.down('#hdnGoalId').getValue().trim();
                }
                if (pProblemId == "0") {
                    Ext.Msg.alert("PBM", "Invalid Problem Id.");
                    return;
                }

                if (pGoalId == "0") {
                    sAction = "A";
                }
                else {
                    sAction = "U";
                }
                pFieldList = 'Goal,GoalType,goalDescr,counter,goalStatus,startDate,followupDate,closedReason,closedDate,goalProgress,actionTaken,goalResult';
                if (view.down('#cbxGoal').getValue() != null) {
                    pFieldValues = view.down('#cbxGoal').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#cbxGoalType').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalType').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#txtGoalDescription').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#txtGoalDescription').getValue();
                }
                pFieldValues = pFieldValues + '|' + '0' + '|';
                if (view.down('#cbxGoalStatus').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalStatus').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#dtGoalStartDate').getValue() != null && view.down('#dtGoalStartDate').getValue() != '') {
                    pFieldValues = pFieldValues + Ext.Date.format(view.down('#dtGoalStartDate').getValue(), 'm/d/Y');
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#dtGoalFollowupDate').getValue() != null && view.down('#dtGoalFollowupDate').getValue() != '') {
                    pFieldValues = pFieldValues + Ext.Date.format(view.down('#dtGoalFollowupDate').getValue(), 'm/d/Y');
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#cbxGoalClosedReason').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalClosedReason').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#dtGoalEndDate').getValue() != null) {
                    pFieldValues = pFieldValues + Ext.Date.format(view.down('#dtGoalEndDate').getValue(), 'm/d/Y');
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#cbxGoalProgress').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalProgress').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#cbxGoalAction').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalAction').getValue();
                }
                pFieldValues = pFieldValues + '|';
                if (view.down('#cbxGoalResult').getValue() != null) {
                    pFieldValues = pFieldValues + view.down('#cbxGoalResult').getValue();
                }
                var extraParameters = {
                    'pProblemId': pProblemId,
                    'pGoalId': pGoalId,
                    'pMode': sAction,
                    'pFields': pFieldList,
                    'pValues': pFieldValues
                };
                var returnField = ['oGoalId'];
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmgoals/update', null, [false], extraParameters,
                    saveAction, returnField);
                if (testReturn.code == 0) {
                    if (pGoalId == "0") //Insert
                    {
                        sSuccessMessage = "Goal Record Successfully Created.";
                    }
                    else {
                        sSuccessMessage = "Goal Record Successfully Updated.";
                    }
                    view.down('#hdnGoalId').setValue(testReturn.oGoalId);
                    view.down('#btnSaveGoal').setText("Update");
                    view.down('#btnDeleteGoal').show();
                    Ext.Msg.alert("PBM", sSuccessMessage);
                    this.LoadProblemAndGoalRecords(); //Reload the Problems grid.
                    view.down('#hdnGoalIdBarrier').setValue('');
                    this.LoadGoalBarrier();
                    view.down('#winGoals').close();
                }
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }
    },
    btnDeleteGoalClick: function () {
        var view = this.getView();
        Ext.Msg.confirm('PBM', 'Are you sure you would like to delete goal record ' + view.down('#cbxGoal').getRawValue() + '?',
            function (btn) {
                if (btn == 'yes') {
                    try {
                        var sSuccessMessage = "";
                        var pFieldList = ""; //Comma Separated list of fields..
                        var pFieldValues = ""; //Values of the fields..
                        var pGoalId = "0";
                        var pProblemId = "0";
                        var result;
                        var message;
                        var sAction = "";
                        var retProblemId;
                        var retSystemId;
                        if (view.down('#hdnProblemIdGoal').getValue() == "" || view.down('#hdnProblemIdGoal').getValue() == "0") {
                        }
                        else {
                            pProblemId = view.down('#hdnProblemIdGoal').getValue().trim();
                        }
                        if (view.down('#hdnGoalId').getValue() == "" || view.down('#hdnGoalId').getValue() == "0") {
                        }
                        else {
                            pGoalId = view.down('#hdnGoalId').getValue().trim();
                        }
                        if (pProblemId == "0") {
                            Ext.Msg.alert("PBM", "Invalid Problem Id.");
                            return;
                        }
                        sAction = "D";
                        pFieldList = 'Goal';
                        if (view.down('#cbxGoal').getValue() != null) {
                            pFieldValues = view.down('#cbxGoal').getValue();
                        }
                        var extraParameters = {
                            'pGoalId': pGoalId,
                            'pProblemId': pProblemId,
                            'pMode': sAction,
                            'pFields': pFieldList,
                            'pValues': pFieldValues
                        };
                        var returnField = ['oProblemId'];
                        var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmgoals/update', null, [false], extraParameters,
                            saveAction, returnField);
                        if (testReturn.code == 0) {
                            sSuccessMessage = "Goal Record Successfully Deleted.";
                            Ext.Msg.alert("PBM", sSuccessMessage);
                            this.LoadProblemAndGoalRecords(); //Reload the Problems grid.
                            //LoadProblemAndGoalRecords();
                            view.down('#hdnGoalIdBarrier').setValue('');
                            this.LoadGoalBarrier();
                            view.down('#hdnGoalId').setValue("0");
                            view.down('#winGoals').close();
                        }
                    }
                    catch (ex) {
                        Ext.Msg.alert("Exception", ex.message);
                    }
                }
            }, this);
    },
    btnCancelBarrier_Click: function () {
        var view = this.getView();
        view.down('#winBarriers').close();
    },
    btnViewPDF_Click:function()
    {
        var view=this.getView();
        var pParameters = view.up('CaseInfo').down('#hiddenMTMID').getValue();
        if(pParameters!=""&& view.down('#gpProblemsAndGoals').getStore().data.length>0) {
            var description = 'MTM Problems and Goals', programName = 'MTMProblemsAndGoals.p', parameters = pParameters, runMode = 1, programType, saveDoc = false;
            var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(description, programName, parameters, runMode, programType, saveDoc, null);
            if (documentInfo.code == 0) Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data);
        }
    }
})