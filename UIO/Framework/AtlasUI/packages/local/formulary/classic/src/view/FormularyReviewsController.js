/**
 * Created by mkorivi on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FormularyReviewsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formularyreviews',
    /**
     * Called when the view is created
     */
    listen: {
        controller: {
            'formulary': {
                FormularyListChange: 'cbxFormularyList_SelectHandler'
            }
        }
    },
    init: function () {
        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
        if (masterRecord!=null && masterRecord.get('FormularyID') != null && masterRecord.get('FormularyID') != '') {
            this.getFormularyInfo();


        }
    },

    getFormularyInfo: function () {
        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            FormInfoModel = this.getView().up('formularyinfo').down('formularygeneralinfo').getViewModel(),
            FormInfoRec = FormInfoModel.get('rec'),
            masterRecord = viewModel.get('masterrecord');
        if (masterRecord.get('Stat') == '2' || masterRecord.get('Stat') == '3' || masterRecord.get('Stat') == '4') //Approved
        {
            view.down('#btnCreateFormulary').setDisabled(true);
            view.down('#btnSubmitPDApproval').setDisabled(true);

        }
        else {
            view.down('#btnSubmitPDApproval').setDisabled(false);
            view.down('#btnCreateFormulary').setDisabled(false);

        }
        if(viewModel.get('isAtlasFormulary'))
        {
            view.down('#btnCreateFormulary').setDisabled(true);
            view.down('#btnSubmitPDApproval').setDisabled(true);
            view.down('#btnValidateFormulary').setDisabled(true);

        }
        else {
            view.down('#btnValidateFormulary').setDisabled(false);
        }


    },
    cbxFormularyList_SelectHandler: function (selectedFormuRec) {
        try {
           // this.LoadGrid();
            var view = this.getView(),
                parentView = view.up(),
                viewModel = parentView.getViewModel(),
                masterRecord = viewModel.get('masterrecord');
            if (masterRecord!=null && masterRecord.get('FormularyID') != null && masterRecord.get('FormularyID') != '') {
                this.getFormularyInfo();
            }
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    },
    btnValidate_Click: function () {

        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
        if (masterRecord) {
            var formularyId = masterRecord.get('FormularyID');
            var formularyVersion = masterRecord.get('FormularyVersion');

            var sReportName = "Validate Formulary";
            var sProgramName = "validateFormulary.p";
            var pParameters = formularyId + '|' + formularyVersion;
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': false,
                'pFaxNumber': ''
            }
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                Ext.Msg.alert("Formulary Validation", "Job to validate formulary has been submitted. Job No is : " + submitJobReturn.pJobNumber);


            }
        }
    },

    btnPDApproval_Click: function () {

        var view = this.getView(),
            viewModel = this.getViewModel,
            FormInfoModel = this.getView().up('formularyinfo').down('formularygeneralinfo').getViewModel(),
            FormInfoRec = FormInfoModel.get('rec'),
            newStatus = "3";  //Pending PD Approval
        if (FormInfoRec) {
            var parentView = view.up(),
                parentviewModel = parentView.getViewModel(),
                masterRecord = parentviewModel.get('masterrecord');
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to submit for pharmacy director approval? Formulary will be locked down from further editing.',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if (FormInfoRec.get('Stat') != '1' && FormInfoRec.get('Stat') != 5) {
                            Ext.MessageBox.alert("Formulary Management", "Only draft or rejected status formulary can be submitted for PD Approval. Please check the formulary status.", this.showResult, this);

                        }
                        var saveAction = [
                            {"Save": {"key": 'mode', "value": 'A'}}
                        ];
                        var saveData = Atlas.common.utility.Utilities.saveData([], 'formulary/rx/changeformularystatus/update', null, [false],
                            {
                                "pcFormID": FormInfoRec.get("FormularyID"),
                                "pcFormVsn": FormInfoRec.get("FormularyVersion"),
                                'pStatusToBe': newStatus,
                                'pcEffDate': Ext.Date.format(masterRecord.data.EffectiveDate, 'm/d/Y')
                            },
                            saveAction, []);

                        if (saveData.code == '0') {

                            var milliseconds = Atlas.common.utility.Utilities.getLocalDateTime().getTime();
                            var pFieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime',
                                pFieldValues = FormInfoRec.get("systemID") + "|Submit for Approval|Formulary submitted for pharmacy director approval.|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + milliseconds;
                            var theStore = {"pFieldList": pFieldList, "pFieldValues": pFieldValues};

                            saveAction = [
                                {"Save": {"key": 'mode', "value": 'A'}}
                            ];
                            var saveNotesData = Atlas.common.utility.Utilities.saveData([theStore], 'shared/rx/notes/update', null, [false], {},
                                saveAction, []);
                            view.down('#btnSubmitPDApproval').setDisabled(true);
                            Ext.MessageBox.alert("Formulary Management", "Formulary has been successfully submitted for pharmacy director approval.", this.showResult, this);
                        }
                        else {

                            Ext.Msg.alert("Formulary Management", saveData.message);
                        }


                    }
                }
            });


        }
    },

    btnCreateFormulary_Click: function () {

        var view = this.getView(),
            viewModel = this.getViewModel,
            FormInfoModel = this.getView().up('formularyinfo').down('formularygeneralinfo').getViewModel(),
            FormInfoRec = FormInfoModel.get('rec');
        if (FormInfoRec) {
            var sReportName = "Explode Formulary";
            var sProgramName = "setFormularyExplodeRules.p";
            var pParameters = FormInfoRec.get("FormularyID") + '|' + FormInfoRec.get("FormularyVersion");
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': false,
                'pFaxNumber': ''
            }
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                Ext.Msg.alert("PBM", "Create Formulary Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job Status in the Job Queue before generating the Formulary PDF.");


            }
        }
    }
    ,
    btnGetChangeHistory_Click: function () {
        this.LoadGrid();

    },

    LoadGrid: function () {
        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
        if(masterRecord!=null) {
            var fromdate = Ext.Date.format(view.down('#from_date').getValue(), 'm/d/Y'),
                todate = Ext.Date.format(view.down('#to_date').getValue(), 'm/d/Y'),
                grid = view.down('#gridReview');

//Submit for Approval is allowed only for Draft or Reject.
            if (masterRecord.get('Stat') == '1' || masterRecord.get('Stat') == '5')
                view.down('#btnSubmitPDApproval').setDisabled(false);
            else
                view.down('#btnSubmitPDApproval').setDisabled(true);


            if (masterRecord.get('Stat') == '2' || masterRecord.get('Stat') == '3' || masterRecord.get('Stat') == '4') //Approved
            {
                view.down('#btnCreateFormulary').setDisabled(true);
            }
            if(viewModel.get('isAtlasFormulary'))
            {
                view.down('#btnCreateFormulary').setDisabled(true);
                view.down('#btnSubmitPDApproval').setDisabled(true);
            }

            //lblFormuName.Text = "Formulary: " + pFormuName;
            //lblFormuVersion.Text = "Version: " + pFormuVer.ToString();
            if (fromdate != '' || todate != '') {
                var StoreFormularyRuleDetails = this.getView().getViewModel().get('StoreFormularyRuleDetails');
                StoreFormularyRuleDetails.getProxy().setExtraParam('pFormularyId', masterRecord.get('FormularyID'));
                StoreFormularyRuleDetails.getProxy().setExtraParam('pFormularyVersion', masterRecord.get('FormularyVersion'));
                StoreFormularyRuleDetails.getProxy().setExtraParam('pFromDate', fromdate);
                StoreFormularyRuleDetails.getProxy().setExtraParam('pToDate', todate);
                StoreFormularyRuleDetails.load();

            }
            else {
                Ext.Msg.alert("Formulary Review", "Please specify the date range");
            }
        }
    },
    btnViewFormularyPDF_Click: function () {
        var view = this.getView(),
            viewModel = this.getViewModel(),
            FormInfoModel = this.getView().up('formularyinfo').down('formularygeneralinfo').getViewModel(),
            FormInfoRec = FormInfoModel.get('rec');
        if (FormInfoRec) {
            var pPDFPrintFunction = FormInfoRec.get('pdfPrintFunction'),
                AssociatedPlanIds = new Array(),
                AssociatedPlans = new Array(),
                data = [];

            if (pPDFPrintFunction != '') {


                if (FormInfoRec.get('AssociatedPlanIds').split(',').length > 1) {


                    AssociatedPlanIds = FormInfoRec.get('AssociatedPlanIds').split(',');
                    AssociatedPlans = FormInfoRec.get('AssociatedPlans').split(',');
                    for (var i = 0; i < AssociatedPlanIds.length; i++) {

                        data.push({value: AssociatedPlanIds[i], name: AssociatedPlans[i]});
                    }
                    viewModel.set('AssociatedPlans', data);

                    // view.up('#cbxAssociatedPlans').store.add(data);
                    //  this.


                    this.winGetPlan();
                }
                else if (FormInfoRec.get('AssociatedPlanIds').split(',').length == 1 && FormInfoRec.get('AssociatedPlanIds').split(',') != '') {
                    this.GetFormularyPDF();

                }
                else {
                    Ext.Msg.alert('Message', 'Please attach this formulary to a plan first.');
                }
            }
            else {
                this.getView().add(Ext.Msg.alert('Message', 'Print PDF function not defined.'));

            }
        }
    },
    winGetPlan: function () {

          var  me = this,
        win = Ext.create('Ext.window.Window', {
            title: 'Associated Plans',
            modal: true,
            scrollable: true,
            layout: 'vbox',
            xtype: 'WinAssociatedPlans',
            refernce: 'WinAssociatedPlans',
            viewModel:{
                parent: this.getViewModel()
            },
            height: 100,
            width: 400,
            listeners:{
                boxready: { fn: 'LoadAssociatedPlans'}

                     },
//            controller: me,
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {xtype: 'button', text: 'OK', iconCls: 'fa fa-save', handler: 'GetFormularyPDF', scope: this}

                    ]


                }
            ],
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Select a Plan',
                    name: 'cbxAssociatedPlans',
                    itemid: 'cbxAssociatedPlans',
                    handler: 'GetFormularyPDF',
                    // store: [],
                  /*  listeners:{
                        scope: this,
                        afterRender: this.LoadAssociatedPlans
                    },*/
                   /* bind: {
                        store: '{AssociatedPlans}'
                    },*/
                    displayField:'name',
                    valueField:'value'

                }


            ]
        });
        this.getView().add(win);
        win.show().center();


    },
    LoadAssociatedPlans: function () {
        var view = this.getView(),
            viewModel = this.getViewModel();

        var theComboBox = view.query('window')[0].down('combobox');


        var theStore = new Ext.data.Store({
            fields: [ 'name', 'value'],
            data: this.getViewModel().get('AssociatedPlans'),
            autoLoad: true
        })
        theComboBox.setStore(theStore);

    },

    GetFormularyPDF: function () {
        var view = this.getView(),
            FormInfoModel = this.getView().up('formularyinfo').down('formularygeneralinfo').getViewModel(),
            FormInfoRec = FormInfoModel.get('rec');
            var plan = '';
        if (view.query('window')[0]!= undefined) {
            if(view.query('window')[0].down('combobox').getValue()!=null)
            { plan = view.query('window')[0].down('combobox').value;}
           else {
                Ext.Msg.alert("PBM", "Please select a plan.");
                return;
            }

        }
        else {
            plan = FormInfoRec.get('AssociatedPlanIds');
        }
        if(FormInfoRec.get("FormularyID")) {
            var sReportName = "Print Formulary";
            var sProgramName = FormInfoRec.get('pdfPrintFunction');
            var pParameters = plan + '|' + FormInfoRec.get("FormularyID") + '|' + FormInfoRec.get("FormularyVersion");
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': false,
                'pFaxNumber': ''
            }
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
                Ext.Msg.alert("PBM", "PDF Formulary Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job in the Job Queue.");


            }
        }
    },
    btnGenerateFormularyExcel_Click: function () {

        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
        if (masterRecord) {
            var sReportName = "Export Formulary Details";
            var sProgramName = 'exportFormularyDetails.p';
            var pParameters = masterRecord.get("FormularyID") + '|' + masterRecord.get("FormularyVersion") + "|FormularyID,FormularyVersion,DrugCode,Covered,OTCIND,ovrGenericCheck,PDLFlag,MedicaidCarveOutDrug,MedicaidFeeScreen,partDDrug,PartDExcludedDrug,restrictToPkgSize,DrugCodeObsoleteDate,Maint,HCFA_FDA,GCN_SEQNO,GenericMedID,LN,BN,DEA,DrugType,ETC_ID,ETC_NAME,PARENT_ETC_ID,PARENT_ETC_NAME,ULTIMATE_PARENT_ETC_ID,ULTIMATE_PARENT_ETC_NAME,GCDF_DESC,GCRT_DESC,HICL_SEQNO,GNN60,GTC,GTC_DESC,SpecialtyDrugInd,StepTherapyName,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3,PAName,MedicarePAType,PAMinAge,PAMaxAge,Notes,TierCode,GenderRestriction,MinAge,MaxAge,AgeType,DaysSupply,DaysSupplyTimePeriod,Fills,FillsTimePeriod,QtyLimit,QtyLmtTimePeriod,ResourceLink,DeletedDate,fedRebateDrug,DesiDrug,CMS_RxCUI,PAInd,extendedDaysSupply,GPICode,GPIName,AHFSCategory,AHFSClass";
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': false,
                'pFaxNumber': ''
            }
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                Ext.Msg.alert("PBM", "Excel Formulary Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job in the Job Queue.");


            }
        }
    },

    btnViewPrefDrugsPdf_Click: function()
    {

        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');

        var sReportName = "Preferred Drugs List";
        var sProgramName = 'printPreferred.p';
        var pParameters =  masterRecord.get('FormularyID') + '|' + masterRecord.get("FormularyVersion");
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
        var extraParameters = {
            'pDescription': sReportName,
            'pProgramName': sProgramName,
            'pParameters': pParameters,
            'pRunMode': 1,
            'pProgramType': "Report",
            'pSaveDocument': false,
            'pFaxNumber': ''
        }
        var returnField = ['pJobNumber'];
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
            saveAction, returnField);
        if (submitJobReturn.code == 0) {
            Ext.Msg.alert("PBM", "Excel Formulary Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job in the Job Queue.");


        }

    },
    btnExportClick:function()
    {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportExcelStore = theViewModel.getStore('StoreFormularyRuleDetails');
        if(ExportExcelStore.getCount() == 0) {
            Ext.Msg.alert("PBM", "No data in the grid to be exported to Excel");
        }
        else {
            Atlas.common.utility.Utilities.exportToExcel(ExportExcelStore);
        }

    }


});