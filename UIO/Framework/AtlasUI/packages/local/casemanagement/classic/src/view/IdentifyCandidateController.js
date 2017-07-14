/**
 * Created by s6627 on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.IdentifyCandidateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.identifycandidatecontroller',
    listen: {
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachmentIdentify'
            }
        }
    },
    init: function () {
        /*Load the page with combo default value with MTM */
        this.loadCaseTypeCombo(this.getView().getViewModel().data.systemID);
        this.bindPlanGroupName();
    },
    onGridAfterRender: function(grid){
        setInterval(function(){
            grid.store.load();
        }, 30000);
    },
    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    onUploadAttachmentIdentify: function (arrayDocumentId,origin) {
        var view=this.getView();
        if (origin !== view.id) {
            return; // ignore
        }
        else
        {
            var win = Ext.WindowManager.getActive();
            if (win) {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var panelFileUpload = view.down('#fileUploadGrid'),
                    fileStore = panelFileUpload.getViewModel().getStore('fileStore');
                var params = {
                    pcPlanID: '',
                    pcKeyType: 'CaseTypeParentSystemId',
                    pcKeyValue: this.getView().getViewModel().getData().systemID,
                    pcKeyAction: 'A',
                    pcDocIDList: arrayDocumentId[0].trim(),
                    pcDescrData: fileStore.getAt(0).get('description')
                };
                var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                    saveAction, null);
                win.close();
                Ext.Msg.alert('Success', 'File Upload Sucessfully');
                this.loadGrid(this.getView().getViewModel().getData().systemID);
            }
            else {
                view.down('#hdnDocumentId').setValue(arrayDocumentId[0].trim())
            }
        }
    },
    bindPlanGroupName:function() {
        var vm=this.getViewModel();
        var me=this;
        var model = Ext.create('Atlas.casemanagement.model.PlanGroupsNameModel');
        var saveProxy = model.getProxy();
        saveProxy.setExtraParam('pUserName', Atlas.user.un);
        model.phantom = false;
        model.load({
            success: function (recorddata, operation) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                var record = objResp.data;
                var planGroupName="";
                for(var i=0;i< record.length;i++)
                {
                    if(planGroupName=="")
                    {
                        planGroupName= record[i].planGroupName;
                    }
                    else {
                        planGroupName=planGroupName+","+record[i].planGroupName;
                    }
                }
                vm.set('plangroupname',planGroupName);
            }
        });
    },
    ResetClick:function() {
        var newValue = this.getView().getViewModel().data.systemID;
        if (newValue != undefined && (newValue == '52.741198911' || newValue == '52.741198881' || newValue == '64.517864291' || newValue == '64.517868971' || newValue == '64.517869051')) {
            if (newValue == '52.741198911') //MAP
            {
                this.getView().down('[name=MAPFromDate]').setValue('');
                this.getView().down('[name=MAPToDate]').setValue('');
                this.getView().down('[name=MAPMPRPercent]').setValue('');
                this.getView().down('[name=MAPETC]').setValue('');
                this.getView().down('[name=MAPMaintenanceDrug]').setValue('');
                this.getView().down('[name=MAPMember]').setValue('');
            }
            else if (newValue == '52.741198881') //MTM
            {
                this.getView().down('[name=MTMFromDate]').setValue('');
                this.getView().down('[name=MTMToDate]').setValue('');
                this.getView().down('[name=plangroupname]').setValue('');
                this.getView().down('[name=noOfDrugsFilled]').setValue('');
                this.getView().down('[name=noOfQualifying]').setValue('');
                this.getView().down('[name=includeActiveChk]').setValue('');
                this.getView().down('[name=cbActiveType]').setValue('');
                this.getView().down('[name=includeExistingChk]').setValue('');
                this.getView().down('[name=minAmountTDS]').setValue('');
            }
            else if (newValue == '64.517864291') //QM-Asthma
            {
                this.getView().down('[name=QMAsthmaFromDate]').setValue('');
                this.getView().down('[name=QMAsthmaToDate]').setValue('');
                this.getView().down('[name=noOfShortActingQMAsthma]').setValue('');
                this.getView().down('[name=noOfShortActingETC]').setValue('');
                this.getView().down('[name=noOfLongActingETC]').setValue('');
            }
            else if (newValue == '64.517868971') //QM-High Risk
            {
                this.getView().down('[name=QMHighRiskFromDate]').setValue('');
                this.getView().down('[name=QMHighRiskToDate]').setValue('');
                this.getView().down('[name=noOfTDSOver]').setValue('');
            }
            else if (newValue == '64.517869051') //QM-Poly Pharm
            {
                this.getView().down('[name=QMPolyPharmFromDate]').setValue('');
                this.getView().down('[name=QMPolyPharmToDate]').setValue('');
                this.getView().down('[name=noOfPrescribersQMPolyPharm]').setValue('');
            }
        }
    },
    onOkClicked: function () {
        this.getView().destroy();
    },
    /*Form Events */
    loadCaseTypeCombo: function (type) {
        var store = this.getView().getViewModel().getStore('StoreJobGroup');
        store.load({
            scope: this,
            callback: function () {
                var combo = this.lookupReference('caseTypeCombo'); //this.getView().down('[name=caseTypeCombo]'); // view.query('#caseTypeCombo')[0];
                if (combo != null)
                    combo.setValue(type);
            }
        });
    },
    loadGrid: function (type) {

        var store = this.getView().getViewModel().getStore('StoreJobQueueAttachments');
        store.getProxy().setExtraParam('pParentSystemId', type);
        store.getProxy().setExtraParam('pKeyType', 'CaseTypeParentSystemId');
        store.load({
            scope: this,
            callback: function (records, operation, success) {

            }
        });
    },
    refreshGrid:function()
    {
        this.loadGrid(this.getView().getViewModel().getData().systemID);
    },
    loadSubmitJobForms: function (newValue) {
        var me = this;
        if (newValue != undefined &&
            (newValue == '52.741198911' || newValue == '52.741198881'
            || newValue == '64.517864291' || newValue == '64.517868971'
            || newValue == '64.517869051')) {
            Ext.suspendLayouts();
            me.getView().down('[name="searchFormFields"]').removeAll();
            if (newValue == '52.741198911') //MAP
            {
                var addPanel = Ext.create({xtype: 'casemanagement-identifyCandidatesMAP'});
            }
            else if (newValue == '52.741198881') //MTM
            {
                var addPanel = Ext.create({xtype: 'casemanagement-identifyCandidatesMTM'});
            }
            else if (newValue == '64.517864291') //QM-Asthma
            {
                var addPanel = Ext.create({xtype: 'casemanagement-identifyCandidatesQMAsthma'});
            }
            else if (newValue == '64.517868971') //QM-High Risk
            {
                var addPanel = Ext.create({xtype: 'casemanagement-identifyCandidatesQMHighRisk'});
            }
            else if (newValue == '64.517869051') //QM-Poly Pharm
            {
                var addPanel = Ext.create({xtype: 'casemanagement-identifyCandidatesQMPolyPharm'});
            }
            me.getView().down('[name="searchFormFields"]').add(addPanel);
            Ext.resumeLayouts(true);
            if(newValue== '52.741198911')
                me.getView().down('#hdnPlanGroups').setValue(me.getViewModel().getData().plangroupname);
        }
    },
    btnSearch_click:function()
    {
        this.onSubmitJobClick();
    },
    onUploadClick: function () {
        Ext.Msg.alert('Failure', 'Failed to upload');
    },
    onResetClick: function () {
        this.getView().down('[name=AddAttachmentsWindow]').hide();
    },
    onCancelClick: function () {
        this.getView().down('[name=InvitationLetterWindow]').hide();
    },
    onEditEnrollClick: function (sender, index) {
        var grid = this.getView().down('#jobQueueAttachmentsGrid');
        var record = grid.getStore().getAt(index);
        this.getViewModel().data.documentID = record.data.DocumentID;
        this.getViewModel().data.jobNumber = record.data.jNum;
        this.getViewModel().data.Type = record.data.RecordType;
        if (this.getView().getViewModel().data.systemID == '52.741198881') {
            var me = this,
                theView = me.getView(),
                vm = me.getViewModel(),
                win;
            var win = Ext.create('Ext.window.Window', {
                title: 'Please complete for MTM Invitation Letter',
                name: 'InvitationLetterWindow',
                itemId: 'InvitationLetterWindow',
                width: 400,
                height: 200,
                viewModel: {
                    parent: me.getViewModel()
                },
                modal: true,
                layout: 'border',
                items: [
                    {
                        region: 'north',
                        xtype: 'form',
                        itemId: 'formInvitation',
                        layout: 'column',
                        defaultButton: 'search',
                        defaults: {
                            xtype: 'container',
                            layout: 'anchor',
                            margin: 5,
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%',
                                labelWidth: 250
                            }
                        },

                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'MTM Invitation Letter Template',
                                items: [
                                    {
                                        fieldLabel: 'Pharmacist Title',
                                        itemId: 'PharmacistTitle',
                                        allowBlank: false
                                    },
                                    {
                                        fieldLabel: 'Pharmacist Phone',
                                        itemId: 'PharmacistPhone',
                                        allowBlank: false
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                text: 'OK',
                                handler: 'EnrollCandidates'
                            },
                            {
                                text: 'Cancel',
                                handler: 'onCancelClick'
                            }
                        ]
                    }
                ]
            });
            this.getView().add(win);
            win.show()
        }
        else {
            var docID = this.getViewModel().getData().documentID;
            var jNum = this.getViewModel().getData().jobNumber;
            var sType = this.getViewModel().getData().Type;
            var sReportName = "Enroll Candidates";
            var sProgramName = "EnrollCandidates.p";
            var pParameters = "";
            var parentJobNum = "";

            //Parameters: SessionId|CaseType|docID|UserName
            pParameters = Atlas.user.sessionId + "|" + this.getView().down('#caseTypeCombo').getRawValue() + "|" + docID + "|" + Atlas.user.un + "|" +""+ "|" + "";
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var extraParameters = {
                'pDescription': 'Enroll Candidates',
                'pProgramName': 'EnrollCandidates.p',
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': true,
                'pFaxNumber': ''
            };
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                if (sType == "Attachment") {
                    parentJobNum = docID;
                }
                else {
                    parentJobNum = jNum;
                }
                var extraParameters = {
                    'pJobNum': submitJobReturn.pJobNumber,
                    'pFieldList': "parentSystemID,parentJobNum",
                    'pFieldValues': this.getView().getViewModel().getData().systemID + '|' + parentJobNum
                };
                var returnField = ['pJobNumber'];
                var submitjobqueuedataReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], extraParameters,
                    saveAction, returnField);
                if (submitjobqueuedataReturn.code == 0) {
                    this.loadGrid(this.getView().getViewModel().getData().systemID);
                    Ext.Msg.alert("PBM", "Successfully submitted 'Enroll Candidates' job. Click 'Results' to see the enrollment results, after the job is completed.");
                }
            }
        }
    },
    /* Submit Job */
    onSubmitJobClick: function () {
        var pParameters="";
        var newValue = this.getView().getViewModel().data.systemID;
        if (newValue != undefined && (newValue == '52.741198911' || newValue == '52.741198881' || newValue == '64.517864291' || newValue == '64.517868971' || newValue == '64.517869051')) {
            if (newValue == '52.741198911') //MAP
            {
               // this.getView().down('#cbxMember').clearInvalid();
                if (this.getView().down('#rbMemberFileUpload').checked && this.getView().down('#hdnDocumentId').getValue() == "") {
                    Ext.Msg.alert("PBM", "Please Upload Correct Document First.");
                }
                else if((this.getView().down('#cbxMember').getValue()=='' ||this.getView().down('#cbxMember').getValue()==null) && this.getView().down('#rdMember').checked)
                {
                    Ext.Msg.alert('PBM','Please enter all required fields before submitting job.');
                }
                else {
                    if (this.getView().down('[name=rb]').checked) {
                        pParameters = Atlas.user.sessionId
                            + '|' + this.getView().down('#hdnPlanGroups').getValue()
                                //+'|'+  Atlas.user.planGroupName.join(',')
                            + '|' + Ext.Date.format(this.getView().down('[name=MAPFromDate]').getValue(), 'm/d/Y')
                            + '|' + Ext.Date.format(this.getView().down('[name=MAPToDate]').getValue(), 'm/d/Y')
                            + '|' + 'ETC'
                            + '|' + this.getView().down('[name=MAPETC]').getValue()
                            + '|' + this.getView().down('[name=MAPMPRPercent]').getValue()
                            + '|' + '0'
                            + '|' + this.getView().down('[name=MAPMaintenanceDrug]').getValue()
                            + '|' + this.getView().down('#hdnDocumentId').getValue()
                    }

                    else {
                        pParameters = Atlas.user.sessionId
                            + '|' + this.getView().down('#hdnPlanGroups').getValue()
                                //+'|'+  Atlas.user.planGroupName.join(',')
                            + '|' + Ext.Date.format(this.getView().down('[name=MAPFromDate]').getValue(), 'm/d/Y')
                            + '|' + Ext.Date.format(this.getView().down('[name=MAPToDate]').getValue(), 'm/d/Y')
                            + '|' + 'ETC'
                            + '|' + this.getView().down('[name=MAPETC]').getValue()
                            + '|' + this.getView().down('[name=MAPMPRPercent]').getValue()
                            + '|' + this.getView().down('[name=MAPMember]').getValue()
                            + '|' + this.getView().down('[name=MAPMaintenanceDrug]').getValue()
                            + '|' + this.getView().down('#hdnDocumentId').getValue();
                    }
                    var extraParameters = {
                        'pDescription': 'MAP Candidates Report',
                        'pProgramName': 'genMAPCandidatesRpt.p',
                        'pParameters': pParameters,
                        'pRunMode': 2,
                        'pProgramType': "Report",
                        'pSaveDocument': false,
                        'pFaxNumber': ''
                    };
                    this.doSubmit(extraParameters);
                }

            }
            else if (newValue == '52.741198881') //MTM
            {
                var pParameters = Atlas.user.sessionId
                    + '|' + Ext.Date.format(this.getView().down('[name=MTMFromDate]').getValue(), 'm/d/Y')
                    + '|' + Ext.Date.format(this.getView().down('[name=MTMToDate]').getValue(), 'm/d/Y')
                    + '|' + this.getView().down('[name=noOfDrugsFilled]').getValue()
                    + '|' + this.getView().down('[name=noOfQualifying]').getValue()
                    + '|' + this.getView().down('[name=minAmountTDS]').getValue()
                    + '|' + this.getView().down('[name=plangroupname]').getValue()
                    + '|' + this.getView().down('[name=includeExistingChk]').getValue()
                    + '|' + this.getView().down('[name=cbActiveType]').getValue()
                    + '|' + this.getView().down('[name=includeActiveChk]').getValue();

                var extraParameters = {
                    'pDescription': 'MTM Candidates Report',
                    'pProgramName': 'MTMAutoEnrollCand.p',
                    'pParameters': pParameters,
                    'pRunMode': 2,
                    'pProgramType': "Report",
                    'pSaveDocument': true,
                    'pFaxNumber': ''
                };
                this.doSubmit(extraParameters);
            }
            else if (newValue == '64.517864291') //QM-Asthma
            {
                var pParameters = Atlas.user.sessionId
                    + '|' + Ext.Date.format(this.getView().down('[name=QMAsthmaFromDate]').getValue(), 'm/d/Y')
                    + '|' + Ext.Date.format(this.getView().down('[name=QMAsthmaToDate]').getValue(), 'm/d/Y')
                    + '|' + this.getView().down('[name=noOfShortActingQMAsthma]').getValue()
                    + '|' + this.getView().down('[name=noOfShortActingETC]').getValue()
                    + '|' + this.getView().down('[name=noOfLongActingETC]').getValue();


                var extraParameters = {
                    'pDescription': 'QM Asthma Report',
                    'pProgramName': 'genQMAstCandidatesRpt.p',
                    'pParameters': pParameters,
                    'pRunMode': 2,
                    'pProgramType': "Report",
                    'pSaveDocument': true,
                    'pFaxNumber': ''
                };
                this.doSubmit(extraParameters);
            }
            else if (newValue == '64.517868971') //QM-High Risk
            {
                var pParameters = Atlas.user.sessionId
                    + '|' + Ext.Date.format(this.getView().down('[name=QMHighRiskFromDate]').getValue(), 'm/d/Y')
                    + '|' + Ext.Date.format(this.getView().down('[name=QMHighRiskToDate]').getValue(), 'm/d/Y')
                    + '|' + this.getView().down('[name=noOfTDSOver]').getValue();

                var extraParameters = {
                    'pDescription': 'QM High Risk Report',
                    'pProgramName': 'genQMHRCandidatesRpt.p',
                    'pParameters': pParameters,
                    'pRunMode': 2,
                    'pProgramType': "Report",
                    'pSaveDocument': true,
                    'pFaxNumber': ''
                };
                this.doSubmit(extraParameters);
            }
            else if (newValue == '64.517869051') //QM-Poly Pharm
            {
                var pParameters = Atlas.user.sessionId
                    + '|' + Ext.Date.format(this.getView().down('[name=QMPolyPharmFromDate]').getValue(), 'm/d/Y')
                    + '|' + Ext.Date.format(this.getView().down('[name=QMPolyPharmToDate]').getValue(), 'm/d/Y')
                    + '|' + this.getView().down('[name=noOfPrescribersQMPolyPharm]').getValue()
                    + '|' +'0'
                    + '|' +'0'
                    + '|' +'0';
                var extraParameters = {
                    'pDescription': 'QM PolyPharma Report',
                    'pProgramName': 'genQMPPCandidatesRpt.p',
                    'pParameters': pParameters,
                    'pRunMode': 2,
                    'pProgramType': "Report",
                    'pSaveDocument': true,
                    'pFaxNumber': ''
                };
                this.doSubmit(extraParameters);
            }
        }

    },
    /*  submitJob: function (extraParameters) {
     //

     var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
     var returnField = ['pJobNumber'];
     var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters, saveAction, returnField);
     if (submitJobReturn.code == 0) {
     Ext.MessageBox.alert('PBM', "Job # " + submitJobReturn.pJobNumber + " has been successfully queued. " +
     "Please review the Job Status in the Job Queue.", this.showResult, this);

     }
     },*/
    doSubmit: function (extraParameters) {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues(),
        //  record = form.getRecord(), // get the underlying model instance
            saveData;
        if (form.isValid() && values) {
            saveData = Atlas.common.utility.Utilities.saveData(
                [{}], //stores array of stores
                'shared/rx/submitjob/update', //url
                null, //temptablenames
                [true], //trackingRemoved
                extraParameters, //extraParameters
                [{"Save": {"key": "mode", "value": "Update"}}], //action
                ['pJobNumber'] //returnfields
            );
            var extraParameters = {
                'pJobNum': saveData.pJobNumber,
                'pFieldList': "parentSystemID",
                'pFieldValues': this.getView().getViewModel().getData().systemID
            };
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var submitjobqueuedataReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], extraParameters,
                saveAction, null);
            this.loadGrid(this.getView().getViewModel().getData().systemID);
            Ext.MessageBox.alert('PBM', "Job Submitted Successfully.Job Number is:" + saveData.pJobNumber, this.showResult, this);
            //this.loadGrid(this.getView().getViewModel().getData().systemID);
            //this.ResetClick();
        }
        else
            Ext.MessageBox.alert('PBM', "Please enter all required fields before submitting job.", this.showResult, this);
    },
    setJobQueueData: function (extraParameters) {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues(),
        //  record = form.getRecord(), // get the underlying model instance
            saveData;
        if (form.isValid() && values) {
            saveData = Atlas.common.utility.Utilities.saveData(
                [{}], //stores array of stores
                'shared/rx/jobqueuedata/update', //url
                null, //temptablenames
                [true], //trackingRemoved
                extraParameters, //extraParameters
                [{"Save": {"key": "mode", "value": "Update"}}], //action
                ['pJobNumber'] //returnfields
            );

            if (saveData.code == 0) {
                Ext.MessageBox.alert('PBM', "Job # " + saveData.pJobNumber + " has been successfully queued. " +
                    "Please review the Job Status in the Job Queue.", this.showResult, this);

            }
        }
        else
            Ext.MessageBox.alert('PBM', "Please enter all required fields before submitting job.", this.showResult, this);
    },
    deleteJob: function (extraParameters) {
        var vm=this.getViewModel();
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
        var returnField = ['pJobNumber'];
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deletejobqueuedirectly/update', null, [true], extraParameters, saveAction, returnField);
        if (submitJobReturn.code == 0) {
            //Ext.MessageBox.alert('PBM', "Job # " + submitJobReturn.pJobNumber + " has been successfully deleted. " +
            //    "Please review the Job Status in the Job Queue.", this.showResult, this);

        }
        //load grid
        //this.loadGrid(vm.get('systemID'));
    },

    onAddAttachmentClick: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            win;
        var win = Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            viewModel: {
                parent: me.getViewModel()
            },
            closable: true,
            scrollable: true,
            height: 300,
            width: 700,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            modal: true,
            name: 'AddAttachmentsWindow',
            items: [

                        {
                            xtype: 'merlin.fileuploader',
                            keyType: 'imageMTMEnroll',
                            height: '100%',
                            fileType: 'csv',
                            origin: me.getView().id,
                            endpoint: 'shared/rx/document/update'
                        }



            ]
            //dockedItems: [
            //    {
            //        xtype: 'toolbar',
            //        dock: 'bottom',
            //        style: {borderColor: 'black', borderStyle: 'solid'},
            //        items: [
            //            '->'
            //            , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'onUploadClick'}
            //            , {xtype: 'button', iconCls: 'fa fa-repeat', text: 'Reset', handler: 'onResetClick'}
            //        ]
            //    }
            //]
        });
        this.getView().add(win);
        win.show()
    },
    onIncludeActiveChanged: function (checkbox, newValue, oldValue, eOpts) {

        this.getViewModel().set("isIncludeActive", newValue);

    },
    onEnrollCandidates: function (caseType) {
        if (caseType == '52.741198881') //MTM
        {

            var pParameters = Atlas.user.sessionId
                + '|' + this.getView().down('[name=MTMFromDate]').getValue()
                + '|' + this.getView().down('[name=MTMToDate]').getValue()
                + '|' + this.getView().down('[name=plangroupname]').getValue()
                + '|' + this.getView().down('[name=noOfDrugsFilled]').getValue()
                + '|' + this.getView().down('[name=noOfQualifying]').getValue()
                + '|' + this.getView().down('[name=includeActiveChk]').getValue()
                + '|' + this.getView().down('[name=cbActiveType]').getValue()
                + '|' + this.getView().down('[name=includeExistingChk]').getValue()
                + '|' + this.getView().down('[name=minAmountTDS]').getValue();

            var extraParameters = {
                'pDescription': 'Enroll Candidates',
                'pProgramName': 'EnrollCandidates.p',
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': true,
                'pFaxNumber': ''
            };
            this.doSubmit(extraParameters);

            var jobNumber, parentSystemID, parentJobNum, caseTypeParentSystemId, parentJobNum; // todo: get this data from grid row
            var params = Atlas.user.sessionId
                + ',' + jobNumber
                + ',' + parentSystemID
                + ',' + parentJobNum
                + ',' + caseTypeParentSystemId
                + '|' + parentJobNum;
            this.setJobQueueData(params);
        }
    },
    onCancelClick:function()
    {
        var view=this.getView();
        view.down('#InvitationLetterWindow').close();
    },
    EnrollCandidates: function () {
        var view=this.getView();
        if(view.down('#formInvitation').isValid()) {
            var docID = this.getViewModel().getData().documentID;
            var jNum = this.getViewModel().getData().jobNumber;
            var sType = this.getViewModel().getData().Type;
            var sReportName = "Enroll Candidates";
            var sProgramName = "EnrollCandidates.p";
            var pParameters = "";
            var parentJobNum = "";

            //Parameters: SessionId|CaseType|docID|UserName
            pParameters = Atlas.user.sessionId + "|" + this.getView().down('#caseTypeCombo').getRawValue() + "|" + docID + "|" + Atlas.user.un + "|" + this.getView().down('#PharmacistTitle').getValue() + "|" + this.getView().down('#PharmacistPhone').getValue();
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var extraParameters = {
                'pDescription': 'Enroll Candidates',
                'pProgramName': 'EnrollCandidates.p',
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': true,
                'pFaxNumber': ''
            };
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                if (sType == "Attachment") {
                    parentJobNum = docID;
                }
                else {
                    parentJobNum = jNum;
                }
                var extraParameters = {
                    'pJobNum': submitJobReturn.pJobNumber,
                    'pFieldList': "parentSystemID,parentJobNum",
                    'pFieldValues': this.getView().getViewModel().getData().systemID + '|' + parentJobNum
                };
                var returnField = ['pJobNumber'];
                var submitjobqueuedataReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], extraParameters,
                    saveAction, returnField);
                if (submitjobqueuedataReturn.code == 0) {
                    this.loadGrid(this.getView().getViewModel().getData().systemID);
                    Ext.Msg.alert("PBM", "Successfully submitted 'Enroll Candidates' job. Click 'Results' to see the enrollment results, after the job is completed.");
                }
            }
            view.down('#InvitationLetterWindow').close();
        }
    },
    /*Combo Events*/
    onCaseTypeChange: function (combo, newValue, oldValue, eOpts) {
        this.getView().getViewModel().data.systemID = newValue;
        this.loadSubmitJobForms(newValue);
        this.loadGrid(newValue);
    },

    /*Grid Events*/

    /*download item from Grid */
    onResultsClick: function (grid, rowIndex, colIndex) {
        Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('ChildDocIDs'));

    },
    /*Edit item from Grid */
    onEnrollClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.onEnrollCandidates('52.741198881');//MTM
    },
    /*View item from Grid */
    onViewClick: function (grid, rowIndex, colIndex) {
        Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('DocumentID'));
    },
    /*Remove item from Grid */
    onDeleteClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var me = this;
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    if (rec.data.jNum != null && rec.data.jNum != "") {
                        var extraParameters = {
                            'pJobNumber': rec.get('jNum')
                        };
                        this.deleteJob(extraParameters);
                    }
                    else {
                        var systemID = this.getViewModel().getData().systemID;
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        var extraParameters = {
                            'pcPlanID': "",
                            'pcKeyType': systemID,
                            'pcKeyValue': systemID,
                            'pcKeyAction': 'D',
                            'pcDocIDList': rec.data.DocumentID,
                            'pcDescrData': "anything"
                        };
                        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [false], extraParameters,
                            saveAction, null);

                    }
                    if (rec.data.DocumentID != null && rec.data.DocumentID != "") {
                        this.DeleteDocument(parseInt(rec.data.DocumentID));
                    }
                    this.loadGrid(this.getViewModel().getData().systemID);
                }
            }, me);
    },
    DeleteDocument: function (DocId) {
        try {

            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var extraParameters = {
                'pDocumentID': DocId
            };
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deldocument/update', null, [false], extraParameters,
                saveAction, null);
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#MTMFromDate'),
            winDtTo = view.down('#MTMToDate'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'MTMFromDate') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    }

});