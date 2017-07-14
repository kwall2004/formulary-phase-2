/**
 * Created by mkorivi on 10/6/2016.
 */
Ext.define('Atlas.formulary.view.MedispanDrugSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.medispandrugsearch',

    /**
     * Called when the view is created
     */
    init: function () {
        var me=this;
       // me.setTestViewVariables();
       var view=me.getView();
        if(view.openView!=null)
        {
            if(view.selectedField!=null)
            {
                if(view.selectedField=='NDC')
                {
                    view.down('#cbxNDCCode').setValue(view.selectedValue);
                    view.down('#cbxNDCCode').setRawValue(view.selectedValue);
                    me.SetCtrlValues();
                }
                else if(view.selectedField=='GPI')
                {
                    var model = Ext.create('Atlas.common.model.GPI');
                    var saveProxy = model.getProxy();
                    saveProxy.setExtraParam('pWhere', "GPICode = '"+view.selectedValue+"'");
                    model.phantom = false;
                    model.load({
                        failure: function (record, operation) {
                        },
                        success: function (recorddata, operation) {
                            view.down('#cbxGPI').setValue(view.selectedValue);
                            view.down('#cbxGPI').setRawValue(recorddata.data.GPIName);
                            me.SetCtrlValues();
                        }
                    });
                }
            }
        }
    },
    btnDrugDetails_CLick: function (event, sender) {
        //debugger;
        var me = this;
        var grid = me.getView().down('#MedispanGrid');
        var store = grid.getStore();
        var vm = me.getViewModel();
        vm.data.record = store.getAt(sender);
        var win = Ext.create({
            xtype: 'formulary-drugdetails',
            modal: true,
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.show();

    },
    btnDrugInfo_CLick: function (event, sender) {
        var _pFields = "FormularyID,DrugCode,DrugCodeAddDate,DrugCodeObsoleteDate,Covered,GCN_SEQNO,NDDF_RxCUI,LN,BN,DrugType,ETC_ID,ETC_NAME,PARENT_ETC_ID,PARENT_ETC_NAME,ULTIMATE_PARENT_ETC_ID,ULTIMATE_PARENT_ETC_NAME,HICL_SEQNO,GNN60,SpecialtyDrugInd,TierCode,GenderRestriction,MinAge,MaxAge,PAName,PAMinAge,PAMaxAge,DaysSupply,DaysSupplyTimePeriod,Fills,FillsTimePeriod,QtyLmtTimePeriod,QLNotes,StepTherapyName,Notes,TextMessage,ResourceLink,OTC_IND,StepTherapyInd,PAInd,FormularyVersion,PartDExcludedDrug,MedicaidCarveOutDrug,Maint,RuleLevelID,LevelType,MedicaidFeeScreen,MedicarePAType,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3,QtyLimit,extendedDaysSupply";
        var me = this;
        var vm = me.getViewModel();
        var grid = me.getView().down('#MedispanGrid');
        var store = grid.getStore();
        var record=store.getAt(sender);
        if(record.data.FormuIdVersionList == '')
        {
            Ext.MessageBox.alert("", "Formulary and Version Information not Passed.");
        }
        else {
            var StoreDrugFormularyDetails = vm.getStore('StoreDrugFormularyDetails');
            StoreDrugFormularyDetails.getProxy().setExtraParam('pDrugCode', record.data.NDC);
            StoreDrugFormularyDetails.getProxy().setExtraParam('pFormVsnLst', record.data.FormuIdVersionList);
            StoreDrugFormularyDetails.getProxy().setExtraParam('pFields', _pFields);
            StoreDrugFormularyDetails.load();
            var win = Ext.create({
                xtype: 'formulary-FormularyDetails',
                modal: true,
                autoShow: true,
                viewModel: {
                    parent: me.getViewModel()
                }

            });
            this.getView().add(win);
            win.show();
        }
    },
    btnExportClick: function () {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportExcelStore = theViewModel.getStore('StoreMDBDrugSearch');
        if(ExportExcelStore.data.length>0) {
            Atlas.common.utility.Utilities.exportToExcel(ExportExcelStore);
        }
        else{
            Ext.Msg.alert("Message", "No record found to export.");
        }
    },
    cbxFormularyList_OnSelect : function (combo, record) {
        var me = this,
            vm = this.getViewModel();
        vm.set('record', record);
    },
    Search_Click: function () {
        this.SetCtrlValues();
    },
    SetCtrlValuesBYGPI:function()
    {
        var view = this.getView();
        view.selectedField=null;
        this.SetCtrlValues();
    },
    SetCtrlValues: function () {
        var vm=this.getViewModel();
        var view = this.getView();
        var sGPI="";
        var sFormulary = "";
        var store = vm.getStore('StoreMDBDrugSearch');
        var sNDC = view.down('#cbxNDCCode').getValue(); // txtNDC.Text;
        if(view.selectedField != null&& view.selectedField=='GPI'&&view.down('#cbxGPI').getValue()!=null&&view.down('#cbxGPI').getValue()!='')
        {
             sGPI = view.selectedValue;
        }
        else {
             sGPI = view.down('#cbxGPI').getValue();
        }
        var sRxCui = view.down('#txtRxCUI').getValue();
        var sBN = view.down('#txtBN').getValue();
        var sActiveOnly = view.down('#chkInactive').checked == true ? "ACTIVE" : "";

        if (vm.get('record.FormularyID') != null && vm.get('record.FormularyVersion') != null) {
            sFormulary = vm.get('record.FormularyID') + "|" + vm.get('record.FormularyVersion');
        }

        var iGPILevel; // = Int32.Parse(cbxGPILevel.Value.ToString());

        if (view.down('#cbxGPILevel').getValue() == null) {
            iGPILevel = 0;
        }
        else {
            iGPILevel = parseInt(view.down('#cbxGPILevel').getValue().trim());
        }

        if (sFormulary == '|') {
            sFormulary = "";
        }
        var sKeyType = "";
        var sKeyValue = "";

        if (sGPI != null && sGPI != "" ) {
            sKeyType = "GPI";
            sKeyValue = sGPI.trim();
        }
        else if (sNDC != null && sNDC != "" ) {
            sKeyType = "NDC";
            sKeyValue = sNDC.trim();
        }
        else if (sBN != null && sBN != "" ) {
            sKeyType = "DrugName";
            sKeyValue = sBN.trim();
        }
        else if (sRxCui != null && sRxCui != "") {
            sKeyType = "RxCui";
            sKeyValue = sRxCui.trim();
        }
        if (sKeyType != "" && sKeyValue != "") {
            store.getProxy().setExtraParam('pKeyType', sKeyType);
            store.getProxy().setExtraParam('pKeyValue', sKeyValue);
            store.getProxy().setExtraParam('pSearchInitiative', sActiveOnly);
            store.getProxy().setExtraParam('pFormulary', sFormulary);
            store.getProxy().setExtraParam('pGPILevel', iGPILevel);
            store.load();
        }
        else {
            Ext.Msg.alert("Oops....", "Please specify the search criteria.");
        }

    },
    btnExportClickDetails: function () {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportStore = theViewModel.getStore('StoreDrugFormularyDetails');
        if(ExportStore.data.length>0) {
            Atlas.common.utility.Utilities.exportToExcel(ExportStore);
        }
        else{
            Ext.Msg.alert("Message", "No record found to export.");
        }
    },
    setTestViewVariables: function() {
        var me = this;

        me.getView().selectedField = 'GPI';
        me.getView().selectedValue = '97600000006100';
        me.getView().openView = true;
    }

});