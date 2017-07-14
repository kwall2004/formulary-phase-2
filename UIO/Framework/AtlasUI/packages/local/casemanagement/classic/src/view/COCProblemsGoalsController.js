/**
 * Created by mkorivi on 11/10/2016.
 */

Ext.define('Atlas.casemanagement.view.COCProblemsGoalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.COCProblemsGoals',
    listen: {
        controller: {
            'cocdetailscontroller': {
                LoadProblemAGoals: 'LoadProblemAndGoalRecordsawindow'
            }
        }
    },
    LoadProblemAndGoalRecordsawindow:function()
    {
        this.LoadProblemAndGoalRecords();
        this.loadContactWindow();
    },
    init: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var mcsRecipientId = vm.get('MCSRecipientId');
        if(mcsRecipientId != "")
            this.LoadProblemAndGoalRecords();
        else{
            view.down('#btnSave').setVisible(false);
            view.down('#btnUpdate').setVisible(false);
            view.down('#btnChart').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnFollowUp').setDisabled(true);
        }
    },

    loadContactWindow:function()
    {
        var view = this.getView();
        var vm = this.getViewModel();
        var mcsRecipientId = vm.get('MCSRecipientId');
        if(mcsRecipientId != "")
            this.WinContactShow();
    },
    btnCancel_Click:function()
    {
        var view=this.getView();
        var vm=this.getViewModel();
        this.LoadProblemAndGoalRecords();
        view.down('#btnSave').setVisible(false);
        view.down('#btnUpdate').setVisible(false);
        view.down('#btnChart').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.down('#btnFollowUp').setDisabled(true);
        view.getForm().getFields().each(function(field) {
            if(field.itemId!="MultiAllBarriers")
                field.setReadOnly(true);
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
        view.down('#AllBarriers').setVisible(false);
        view.down('#btnAddBarriers').setDisabled(true);
        view.down('#btnFollowUp').setDisabled(false);
        vm.set('pocrec',null);
    },
    LoadProblemAndGoalRecords: function() {
        var pWhere="";
        var  me = this,
            view = me.getView(),
            vm = me.getViewModel();
        view.down('#btnSave').setVisible(false);
        view.down('#btnUpdate').setVisible(false);
        view.down('#btnChart').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.getForm().getFields().each(function(field) {
            if(field.itemId!="MultiAllBarriers")
                field.setReadOnly(true);
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
        var HistoryGoals = '',
            ClosedGoals = '';
        HistoryGoals = view.down('#chkHisGoals').getValue();
        ClosedGoals = view.down('#chkclosedGoals').getValue();
        if (HistoryGoals == true)
             pWhere = "recipientID = " + vm.get('MCSRecipientId') + " And caseType='PH'|yes";
        else
             pWhere = "recipientID = " + vm.get('MCSRecipientId') + " And caseType='PH'|no";
        var StoreProblemAndGoalRecords = vm.getStore('StoreProblemAndGoalRecords');
        StoreProblemAndGoalRecords.getProxy().setExtraParam('viWhere', pWhere);
        StoreProblemAndGoalRecords.getProxy().setExtraParam('userState', "MI");
        StoreProblemAndGoalRecords.clearFilter(true);
        StoreProblemAndGoalRecords.load( {
            callback: function (record, operation, success) {
                    me.FilterRecord(ClosedGoals,StoreProblemAndGoalRecords);
            }
        });


    },
    FilterRecord:function(ClosedGoals,store)
    {
        var view=this.getView();
        store.clearFilter(true);
        if(!ClosedGoals) {
            store.filter({
                filterFn: function(f) {
                    return f.get('goalCloseDate') == "" || f.get('goalCloseDate') == null;
                }
            });
        }
        view.down('#gpProblemsAndGoals').setStore(store);
    },
    onRecordSelect: function(grid, rec)
    {
        var  me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.set('pocrec', rec );
        if(view.down('#hiddenContactCancel').getValue()==""||view.down('#hiddenContactCancel').getValue()=="false")
        {
        view.down('#btnSave').setVisible(false);
        view.down('#btnUpdate').setVisible(false);
        view.down('#btnChart').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.getForm().getFields().each(function(field) {
            if(field.itemId!="MultiAllBarriers")
                field.setReadOnly(true);
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
        if (rec.data.goalEndDate != null || rec.data.problemEndDate != null ) {
            view.down('#btnSave').setVisible(false);
            view.down('#btnUpdate').setVisible(false);
            view.down('#btnChart').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnAddBarriers').setDisabled(true);
            view.down('#txtBarriers').setDisabled(true);
            view.down('#AllBarriers').setVisible(false);
        }
        else{
            view.down('#btnUpdate').setVisible(true);
            view.down('#btnChart').setDisabled(false);
            view.down('#btnAddBarriers').setDisabled(true);
            view.down('#txtBarriers').setDisabled(true);
            view.down('#AllBarriers').setVisible(false);
            view.down('#btnSave').setDisabled(false);
        }
        }
        var barriers= rec.data.barriers;
        barriers=barriers.replace('^','\n');
        view.down('#txtBarriers').setValue(barriers);
        var StoreAvailableBarriers = vm.getStore('StoreAvailableBarriers');
        StoreAvailableBarriers.getProxy().setExtraParam('pBarriers', rec.data.barriers);
        StoreAvailableBarriers.getProxy().setExtraParam('userState', "MI");
        StoreAvailableBarriers.load(
            {
                callback: function (record, operation, success) {
                    scope:this;




                }
            }


        );


        // view.down('btnSave').setDisabled()

    },
    btnAddBarriers_Click:function() {
        var view = this.getView();
        var AllBarriers = "";
        var selected = view.down('#MultiAllBarriers').getSelected();
        var Barriers = view.down('#txtBarriers').getValue();
        var BarriersArray = Barriers.split('\n');
        for (var i = 0; i < selected.length; i++) {
            if(BarriersArray.indexOf(selected[i].data.value)==-1) {
                if (AllBarriers == "") {
                    AllBarriers = selected[i].data.value;
                }
                else {
                    AllBarriers = AllBarriers + '\r\n' + selected[i].data.value;
                }
            }
        }
        if (Barriers != null && Barriers != "") {
            Barriers = Barriers + '\r\n' + AllBarriers;
            view.down('#txtBarriers').setValue(Barriers);
        }
        else {
            view.down('#txtBarriers').setValue(AllBarriers);
        }
    },
    btnUpdateClick: function() {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        view.getForm().getFields().each(function (field) {
            if (field.itemId != "MultiAllBarriers")
                field.setReadOnly(false);
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
        view.down('#cbxchartReason').setValue('');

        view.down('#GoalNote').setValue('');
        view.down('#btnUpdate').setVisible(false);
        view.down('#btnSave').setVisible(true);
        view.down('#AllBarriers').setVisible(true);
        view.down('#btnAddBarriers').setDisabled(false);
        view.down('#btnCancel').setDisabled(false);


    },

    btnChartClick : function() {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Chart',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'

            },
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'winChart',
            xtype: 'winChart',
            height: 350,
            width: 700,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'setplanCareMaster'
                        },
                        {
                            xtype: 'button', text: 'Cancel', iconCls: 'fa fa-remove',handler: 'CancelChartClick' //handler: 'btn_Cancel'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId:'formChart',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    width: 500,
                    height: 270,
                    autoScroll: true,
                    items: [{
                        xtype: 'fieldset',
                        title: 'Chart',
                        defaults: {
                            flex: 1
                        },
                        items: [
                            // leftpanel content ---------------------------------------------------- //
                            {
                                xtype: 'textarea',
                                name: 'txtNote',
                                itemId: 'txtNote',
                                fieldLabel: 'chart',
                                allowBlank:false
                            }
                        ]
                    },
                        { //start right panel -----------------------------------------------------------------------------------------------------
                            xtype: 'fieldset',
                            title: 'Strengths',
                            defaults: {
                                flex: 1
                            },
                            items: [
                                {
                                    xtype: 'textarea',
                                    name: 'txtStrengths',
                                    id: 'txtStrengths',
                                    fieldLabel: 'Strengths',
                                    allowBlank:false
                                }
                            ]
                        }
                    ],
                    bbar: ['->', {

                        xtype: 'button',
                        text: 'Add/Remove Strengths',
                        handler: 'UploadAssignedStrengths'
                    }]
                }
            ]
        });
        view.add(win);
        var strengths=vm.getData().pocrec.data.strengths;
        strengths=strengths.replace('^','\n');
        view.down('#txtStrengths').setValue(strengths);
        win.show();
    },
    CancelChartClick:function()
    {
        var view=this.getView();
        view.down('#winChart').close();
    },
    setplanCareMaster:function() {
        var view = this.getView();
        var vm=this.getViewModel();
        if (view.down('#formChart').isValid()) {
            try
            {
                var ttNotes = [];
                var ttplanCareMaster={};
                var dr={};
                var state = vm.get('state');
                var  strength = view.down('#txtStrengths').getValue();
                dr.note = view.down('#txtNote').getValue();
                dr.pnMasterSystemID = vm.get('voPNSystemID');
                dr.recipientID = vm.get('MCSRecipientId');

                dr.strengths = strength.replace("\n", "^");
                ttNotes.push(dr);
                ttplanCareMaster.ttplanCareMaster=ttNotes;
                var result;
                var message;
                var sSuccessMessage = "";
                var extraParameters = {
                    'ttplanCareMaster': ttplanCareMaster,
                    'pUserName': Atlas.user.un,
                    'userState':state
                };
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'vendor/hp/plancaremasterapi/update', null, [false], extraParameters,
                    saveAction, null);
                if (testReturn.code == 0) {
                    sSuccessMessage = "Notes Saved.";
                    Ext.Msg.alert("PBM", sSuccessMessage);
                }
                else
                {
                    sSuccessMessage = "Error Saving Notes.";
                    Ext.Msg.alert("PBM", sSuccessMessage);
                }

                view.down('#winChart').close();
                this.LoadProblemAndGoalRecords();
                this.ResetProblemsGoalsCtrlValues();
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }
    },
    createFollowUpWindow:function()
    {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Plan of Care Follow up',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'

            },
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'winFollowup',
            xtype: 'winFollowup',
            height: 400,
            width: 1150,
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {
                            xtype: 'button',
                            text: 'copy',
                            iconCls: 'fa fa-save',
                            itemId: 'btnCopy',
                            handler: 'btnCopy_click'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'Setpocfollowup'
                        },
                        {
                            xtype: 'button', handler: 'btnFollowCancel_click', text: 'Cancel', iconCls: 'fa fa-remove' //handler: 'btn_Cancel'
                        }
                    ]


                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'formFollowup',
                    width: 500,
                    autoScroll: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'

                    },
                    items: [{
                        xtype: 'fieldset',
                        title: 'Plan of Care Follow up',
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                width:'100%',
                                defaults: {
                                    labelWidth: 100
                                },
                                items: [
                                    // leftpanel content ---------------------------------------------------- //
                                    {
                                        xtype: 'textfield',
                                        name: 'txtMemberID',
                                        itemId: 'txtMemberID',
                                        fieldLabel: 'Member Id',
                                        disabled: true,
                                        bind: {value: '{MCSRecipientId}'}
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'txtmemberName',
                                        disabled: true,
                                        itemId: 'txtmemberName',
                                        fieldLabel: 'Name'

                                    }]},
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                width:'100%',
                                defaults: {
                                    labelWidth: 100
                                },
                                items: [
                                    {
                                        xtype: 'datefield',
                                        name: 'dtFollowUpDate',
                                        itemId: 'dtFollowUpDate',
                                        fieldLabel: 'Follow Up Date',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        listeners: {
                                            'blur': {
                                                fn: 'ValidateDate'
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textarea',
                                        name: 'txtFollowupReason',
                                        itemId: 'txtFollowupReason',
                                        style: {'padding-left': '100px'},
                                        allowBlank: false
                                    }]}
                        ]
                    },
                        {
                            xtype: 'form',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            itemId: 'pnlLastFollowup',
                            height: 250,
                            items: [
                                { //start right panel -----------------------------------------------------------------------------------------------------
                                    xtype: 'fieldset',
                                    title: 'Previous Follow up',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            width:'100%',
                                            defaults: {
                                                labelWidth: 100
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    name: 'dtPrevFUDate',
                                                    itemId: 'dtPrevFUDate',
                                                    disabled: true,
                                                    fieldLabel: 'Follow Up Date',
                                                    allowBlank: false,
                                                    bind: {value: '{followuprec.pPrevFUDate}'}


                                                },
                                                {
                                                    xtype: 'textarea',
                                                    name: 'txtPrevFUReason',
                                                    itemId: 'txtPrevFUReason',
                                                    disabled: true,
                                                    allowBlank: false,
                                                    bind: {value: '{followuprec.pPrevFUReason}'}
                                                }]}
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        });
        this.getView().add(win);
    },
    btnFollowUpClick: function()
    {

        var theView = this.getView(),
            vm = this.getViewModel();
        this.createFollowUpWindow();
        try
        {
            var prevFUDate ="";
            theView.down('#txtmemberName').setValue(vm.getData().memberInfoMasterData.MemberName);
            theView.down('#txtMemberID').setValue(vm.get('MCSRecipientId'));
            theView.down('#btnCopy').setDisabled(false);
            var caseSystemId = vm.get('casesystemId');
            var state = vm.get('state');
            var model = Ext.create('Atlas.casemanagement.model.LastfollowupAPI');
            model.getProxy().setExtraParam('pSystemID', caseSystemId);
            model.getProxy().setExtraParam('userState', state);
            model.load({
                failure: function (record, operation) {
                },
                success: function (recorddata, operation) {
                    var obj = Ext.decode(operation.getResponse().responseText);
                    if(recorddata.pPrevFUDate!=null)
                    {
                        theView.down('#txtmemberName').setValue(vm.getData().memberInfoMasterData.MemberName);
                        theView.down('#txtMemberID').setValue(vm.get('MCSRecipientId'));
                        theView.down('#dtPrevFUDate').setValue (recorddata.pPrevFUDate);
                        if (recorddata.pPrevFUDate!=null && recorddata.pPrevFUDate!="") {
                            prevFUDate = new Date(recorddata.pPrevFUDate);
                        }
                        theView.down('#txtPrevFUReason').setValue(recorddata.pPrevFUReason);
                        theView.down('#dtFollowUpDate').setValue ("");
                        theView.down('#txtFollowupReason').setValue("");
                        if (prevFUDate <= Atlas.common.utility.Utilities.getLocalDateTime())
                        {
                            theView.down('#btnCopy').setDisabled(true);

                        }
                        theView.down('#winFollowup').show();
                    }
                    else {
                        Ext.Msg.alert("Exception", "NOT COC");
                    }
                }
            });

        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }

    },
    btnFollowCancel_click:function()
    {
        var view=this.getView();
        view.down('#winFollowup').close();
    },
    ValidateDate:function () {
        var view=this.getView();
        var year = new Date(view.down('#dtFollowUpDate').getValue()).getDate();
        var currentYear = Atlas.common.utility.Utilities.getLocalDateTime().getDate();
        if (year <= currentYear) {
            Ext.Msg.alert('Error', 'Follow up date must be in the future');
            view.down('#dtFollowUpDate').setValue('');
            return;
        }
    },
    btnCopy_click:function() {
        var view = this.getView();
        var prevFollowReson = view.down('#txtPrevFUReason').getValue();
        var prevFUDate = view.down('#dtPrevFUDate').getValue();
        view.down('#txtFollowupReason').setValue(prevFollowReson);
        view.down('#dtFollowUpDate').setValue(prevFUDate)
    },
    WinContactShow:  function()
    {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Contact',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'

            },
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'winContact',
            xtype: 'winContact',
            height: 400,
            width: 500,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'

                        , {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'setPlanCareContact',
                            scope: this
                        },
                        {
                            xtype: 'button', text: 'Cancel', iconCls: 'fa fa-remove' , handler: 'DisableFields'
                        }
                    ]


                }
            ],
            items: [
                {
                    xtype: 'form', itemId: 'formContact', items: [
                    {
                        xtype: 'fieldset',
                        title: 'Contact',
                        defaults: {
                            flex: 1
                        },
                        items: [
                            // leftpanel content ---------------------------------------------------- //
                            {
                                xtype: 'textfield',
                                name: 'memberID',
                                itemId: 'txtContMemberID',
                                fieldLabel: 'Member Id',
                                disabled: true

                            },
                            {
                                xtype: 'textfield',
                                name: 'memberName',
                                itemId: 'txtContMemberName',
                                fieldLabel: 'Member Name',
                                disabled: true

                            },
                            {
                                xtype: 'radio',
                                name: 'rdNocontact',
                                itemId: 'rdNocontact',
                                fieldLabel: 'Update No Contact',
                                checked: true,
                                disabled: true

                            }]
                    }]
                }]
        });

        view.add(win);
        win.down('#formContact').reset();
        win.down('#formContact').loadRecord(vm.getData().record);
        win.show();

    },

    DisableFields: function()
    {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        view.down('#btnSave').setVisible(false);
        view.down('#btnUpdate').setVisible(false);
        view.down('#btnChart').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.down('#btnFollowUp').setDisabled(true);
        view.getForm().getFields().each(function(field) {
            if(field.itemId!="MultiAllBarriers")
                field.setReadOnly(true);
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
        view.down('#hiddenContactCancel').setValue("true");
        view.down('#winContact').close();
    },
    setPlanCareContact: function()
    {

        var  me = this,
            view = me.getView(),
            vm = me.getViewModel();

        var saveAction = [{"Save": {"key": "mode", "value": "A"}}]
        var extraParameters = {
            "userState" : vm.get('state'),
            'ttplanCareContact': {
                'ttplanCareContact': {
                    "recipientID": vm.get('MCSRecipientId'),
                    "seqNum": vm.get('seqNum'),
                    "contact": "3",
                    "createUser":  Atlas.user.un,
                    "seePhysician" : ""


                }
            }
        }

        var savePlanCareContactData = Atlas.common.utility.Utilities.saveData([{}], 'vendor/hp/plancarecontactapi/update', null, [true], extraParameters, saveAction
            , ['voPNSystemID']);
        if (savePlanCareContactData.code == 0) {
            view.down('#winContact').close();
            view.down('#btnFollowUp').setDisabled(false);
            vm.set('voPNSystemID', savePlanCareContactData.voPNSystemID);
            view.down('#hiddenContactCancel').setValue("false");

        }

    },

    btnSaveClick:function()
    {
        var  me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            rec = vm.get('pocrec');
        if( view.down('#cbxmemberAgrees').getValue() == 'no' && view.down('#cbxdisagreeReason').getValue() == null)
        {
            view.down('#cbxdisagreeReason').markInvalid('Disagree Reason is required.');
                return;

        }
        if (view.down('#dtgoalEndDate').getValue() != null && view.down('#cbxGoalClosedReason').getValue() == null) {
                view.down('#cbxGoalClosedReason').markInvalid('Closed Reason is required.');
                return;

        }
        if (view.down('#cbxGoalClosedReason').getValue() != null && view.down('#dtgoalEndDate').getValue() == null ) {
                view.down('#dtgoalEndDate').markInvalid('Close Date is required.');
                return;

        }
        if(view.down('#POCInfo').isValid()&& view.down('#txtBarriers').getValue()!=null && view.down('#txtBarriers').getValue()!="") {
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}]
            var extraParameters = {
                "userState": vm.get('state'),
                "pUserName": Atlas.user.un,
                'ttPlancareHistory': {
                    'ttPlancareHistory': {
                        'recipientID': rec.data.recipientID,
                        'seqNum': rec.data.seqNum,
                        'systemID': rec.data.systemID,
                        'problemID': rec.data.problemID,
                        'caseType': rec.data.caseType,
                        'priority': rec.data.priority,
                        'problemStartDate': rec.data.problemStartDate,
                        'STGoalID': rec.data.STGoalID,
                        'strengths': rec.data.strengths,
                        'timeframe': view.down('#cbxtimeframe').getValue(),
                        'excludeGoalFromLetter': view.down('#ckexcludeGoalFromLetter').getValue(),
                        'includeNoteOnPOC': view.down('#ckincludeNoteOnPOC').getValue(),
                        'readinessToChange': view.down('#cbxreadinessToChange').getValue(),
                        'goalProgress': view.down('#cbxgoalProgress').getValue(),
                        'memberAgrees': view.down('#cbxmemberAgrees').getValue(),
                        'disagreeReason': view.down('#cbxdisagreeReason').getValue(),
                        'barriers': view.down('#txtBarriers').getValue(),
                        'LTGoalID': rec.data.LTGoalID,
                        'LTGoalShortDescription': rec.data.LTGoalShortDescription,
                        'followupDate': rec.data.followupDate,
                        'lastContact': rec.data.lastContact,
                        'closedReason': view.down('#cbxGoalClosedReason').getValue(),
                        // 'createDate': rec.data.createDate,
                        // 'createTime': rec.data.createTime,
                        // 'createDateTime': rec.data.createDateTime,
                        'createUser': rec.data.createUser,
                        'problemEndDate': Ext.Date.format(rec.data.problemEndDate, 'Y-m-d'),
                        'problemShortDescription': rec.data.problemShortDescription,
                        'STGoalShortDescription': rec.data.STGoalShortDescription,
                        'chartReason': view.down('#cbxchartReason').getValue(),
                        //'disagreeDate': view.down('disagreeDate,
                        'problemSeqNum': rec.data.problemSeqNum,
                        'STGoalLongDescription': rec.data.STGoalLongDescription,
                        'LTGoalLongDescription': rec.data.LTGoalLongDescription,
                        // 'problemCloseDateTime': rec.data.problemCloseDateTime,
                        // 'problemCloseTime': rec.data.problemCloseTime,
                        'problemCloseUser': rec.data.problemCloseUser,
                        // 'problemCloseDate': rec.data.problemCloseDate,
                        'goalPriority': view.down('#cbxgoalPriority').getValue(),
                        'goalStartDate': Ext.Date.format(view.down('#dtgoalStartDate').getValue(), 'Y-m-d'),
                        'goalEndDate': Ext.Date.format(view.down('#dtgoalEndDate').getValue(), 'Y-m-d'),
                        'goalCloseDateTime': Ext.Date.format(rec.data.goalCloseDateTime, 'Y-m-d'),
                        // 'goalCloseTime': rec.data.goalCloseTime,
                        'goalCloseUser': rec.data.goalCloseUser,
                        'goalCloseDate': Ext.Date.format(rec.data.goalCloseDate, 'Y-m-d'),
                        'goalSeqNum': rec.data.goalSeqNum,
                        'timeFrameDate': view.down('#lbltimeFrameDate').text,
                        'problemLongDescription': rec.data.problemLongDescription,
                        'note': view.down('#GoalNote').getValue()

                    }
                }
            }
            var savePlanCareHistoryData = Atlas.common.utility.Utilities.saveData([{}], 'vendor/hp/plancarehistoryapi/update', null, [true], extraParameters, saveAction
                , '');
            if (savePlanCareHistoryData.code == 0) {
                this.createFollowUpWindow();
                var caseSystemId = vm.get('casesystemId');
                var state = vm.get('state');
                var model = Ext.create('Atlas.casemanagement.model.LastfollowupAPI');
                model.getProxy().setExtraParam('pSystemID', caseSystemId);
                model.getProxy().setExtraParam('userState', state);
                model.load({
                    failure: function (record, operation) {
                    },
                    success: function (recorddata, operation) {
                        var obj = Ext.decode(operation.getResponse().responseText);
                        if(recorddata.pPrevFUDate!=null)
                        {
                            view.down('#txtmemberName').setValue(vm.getData().memberInfoMasterData.data.MemberName);
                            view.down('#txtMemberID').setValue(vm.get('MCSRecipientId'));
                            view.down('#dtPrevFUDate').setValue (recorddata.pPrevFUDate);
                            view.down('#txtPrevFUReason').setValue(recorddata.pPrevFUReason);
                            view.down('#dtFollowUpDate').setValue ("");
                            view.down('#txtFollowupReason').setValue("");
                            view.down('#winFollowup').show();
                        }
                        else {
                            Ext.Msg.alert("Exception", "NOT COC");
                        }
                    }
                });

            }
        }
        else {

            if(view.down('#txtBarriers').getValue() == null || view.down('#txtBarriers').getValue() == '')
            {
                view.down('#txtBarriers').markInvalid('barriers is required.');
            }

            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }

    },
    Setpocfollowup : function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            caseSystemId = vm.get('casesystemId'),
            voPnSystemID = vm.get('voPNSystemID');
        var FollowupReason=view.down('#txtFollowupReason').getValue();
        var FollowUpDate=Ext.Date.format(view.down('#dtFollowUpDate').getValue(), 'm/d/Y');
        if (view.down('#formFollowup').isValid()) {
            var extraParameters = {
                'pSystemID': caseSystemId,
                'pFollowUpDate': FollowUpDate,
                'pFollowUpReason':FollowupReason,
                'pUsername':Atlas.user.un,
                'pPNSystemID':voPnSystemID
            };
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
            var savePOCFollowup = Atlas.common.utility.Utilities.saveData([{}], 'vendor/hp/pocfollowupapi/update', null, [true], extraParameters, saveAction
                , null);
            if (savePOCFollowup.code == 0) {
                Ext.Msg.alert("PBM", "Successfully Saved Data.");
                view.down('#winFollowup').close();
                me.LoadProblemAndGoalRecords();
                me.ResetProblemsGoalsCtrlValues();
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }
    },
    ResetProblemsGoalsCtrlValues: function()
    {
        var  me = this,
            view = me.getView(),
            vm = me.getViewModel();
            vm.set('pocrec', null);
        view.getForm().getFields().each(function(field) {
            if(field.itemId!="MultiAllBarriers")
                field.setValue('');
        });
        view.down('#chkHisGoals').setReadOnly(false);
        view.down('#chkclosedGoals').setReadOnly(false);
    },
    UploadAssignedStrengths: function() {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            casesystemId = vm.get('casesystemId');
        var StoreAvailabeStrengths = vm.getStore('StoreAvailabeStrengths');
        StoreAvailabeStrengths.load();
        var storeAssignedStrengths = vm.getStore('storeAssignedStrengths');
        var Strengths = view.down('#txtStrengths').getValue();
        if (Strengths != null && Strengths != "") {
            var StrengthsArray = Strengths.split('\n');
            storeAssignedStrengths.removeAll();
            for (var j = 0; j < StrengthsArray.length; j++) {
                storeAssignedStrengths.add({"value": StrengthsArray[j]});
            }
        }
        me.WinStrengthsShow();
    },
    WinStrengthsShow:  function() {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Add/Remove Strengths',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'

            },
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'winStrengths',
            xtype: 'winStrengths',
            height: 450,
            width: 800,
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'

                        , {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'LoadStrengths'
                        },
                        {
                            xtype: 'button', text: 'Cancel', iconCls: 'fa fa-remove' ,handler: 'btnStrength_Cancel'
                        }
                    ]


                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cbxCategory',
                            bind: {store: '{StoreCategory}'},
                            listeners: {
                                select: 'onCategoryListChange'
                            },
                            displayField: 'listDescription',
                            valueField: 'listItem',
                            scope: this
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    height: 300,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel', itemId: 'Panel22', flex:0.45, title: 'Available', items: [
                            {
                                anchor: '100%',
                                height: 300,
                                width:350,
                                xtype: 'multiselect',
                                itemId: 'MSAvailStrenghths',
                                valueField: 'listDescription',
                                displayField: 'listDescription',
                                bind: {store: '{StoreAvailabeStrengths}'}
                            }]
                        },
                        {
                            xtype: 'container', layout: 'vbox', flex:0.10, items: [
                            {xtype: 'button', text: 'Add', itemId: 'btnAdd', handler: 'btnAddClick', padding:10},
                            {xtype: 'button', text: 'Remove', itemId: 'btnRemove', handler: 'btnRemoveClick'}
                        ]
                        },
                        {
                            xtype: 'panel', itemId: 'Panel21', flex:0.45, title: 'Assigned', items: [
                            {
                                anchor: '100%',
                                height: 300,
                                width:350,
                                xtype: 'multiselect',
                                itemId: 'MSAssignedStrenghths',
                                valueField: 'value',
                                displayField: 'value',
                                bind: {store: '{storeAssignedStrengths}'}
                            }]
                        }
                    ]
                }]

        });
        view.add(win);
        win.show();
    },
    btnStrength_Cancel:function()
    {
        var view=this.getView();
        view.down('#winStrengths').close();
    },
    btnAddClick:function() {
        var view = this.getView();
        var MSAvailStrenghthsselected = view.down('#MSAvailStrenghths').getValue();
        var MSAssignedStrenghthsStore = view.down('#MSAssignedStrenghths').getStore();
        if (MSAvailStrenghthsselected.length > 0) {
            var MSAssignedStrenghthsPushed=[];
            for (var j = 0; j < MSAssignedStrenghthsStore.data.items.length; j++) {
                MSAssignedStrenghthsPushed.push(MSAssignedStrenghthsStore.data.items[j].data.value);
            }
            var MSAssignedStrenghthsStore = view.down('#MSAssignedStrenghths').getStore();
            for (var i = 0; i < MSAvailStrenghthsselected.length; i++) {
                if(MSAssignedStrenghthsPushed.indexOf(MSAvailStrenghthsselected[i])==-1)
                    MSAssignedStrenghthsStore.add({"value": MSAvailStrenghthsselected[i]});
            }
        }
    },
    btnRemoveClick:function() {
        var view = this.getView();
        var MSAssignedStrenghthsValue = view.down('#MSAssignedStrenghths').getSelected();
        if (MSAssignedStrenghthsValue.length > 0) {
            var MSAssignedStrenghthsStore = view.down('#MSAssignedStrenghths').getStore();
            MSAssignedStrenghthsStore.remove(MSAssignedStrenghthsValue);
        }
    },
    LoadStrengths: function()
    {
       // debugger;
        var view = this.getView();
        var MSAssignedStrenghthsValue = view.down('#MSAssignedStrenghths').getStore();
        var AllStrengths = "";
        for (var i = 0; i < MSAssignedStrenghthsValue.data.items.length; i++) {
            if (AllStrengths == "") {
                AllStrengths = MSAssignedStrenghthsValue.data.items[i].data.value;
            }
            else {
                AllStrengths = AllStrengths + '\r\n' + MSAssignedStrenghthsValue.data.items[i].data.value;
            }
        }
        view.down('#txtStrengths').setValue(AllStrengths);
        view.down('#winStrengths').close();
    },
    onCategoryListChange: function (combo, record) {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var datar = new Array();
        var Grid = view.down('#MSAvailStrenghths');
        //   var category =  vm.get('category');
        var StoreProblemAndGoalRecords = vm.getStore('StoreProblemAndGoalRecords');

        var StoreAvailabeStrengths = vm.getStore('StoreAvailabeStrengths');
        StoreAvailabeStrengths.load();

        for (var i = 0; i < StoreAvailabeStrengths.data.length; i++) {


            var rec = StoreAvailabeStrengths.getAt(i);
            var TierCodeObj = {};
            // TierCodeObj["TierCode"] = record.data.TierCode
            if(rec.data.XcharString == record.data.listItem)
                datar.push(rec.data.listDescription);

        }


        // var gridCols = Grid.columns;
        Grid.setStore(datar);


    },

    onCategoryLoad : function (store, records, success) {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var category =  vm.get('category');

        store.filter('XcharString', category);


    }


});
