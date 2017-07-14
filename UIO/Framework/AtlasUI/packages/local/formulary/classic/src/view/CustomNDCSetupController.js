/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCSetupController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.customndcetupcontroller',
    init: function () {
        var view=this.getView();
        var vm=this.getViewModel();
        vm.getStore('storeMedication').getProxy().setExtraParam('iplExcludeObsDrug',false);
        vm.getStore('storeMedication').getProxy().setExtraParam('pFilter',' and gcn_seqno = 8888888');
        var storeFormularyName=vm.getStore('storeFormularyName');
        storeFormularyName.load();
        var storeQueueList=vm.getStore('storeQueueList');
        storeQueueList.load({
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation) {
                for (var r in record) {
                    if (record[r].data.userName == Atlas.user.un) {
                        view.down('#hidApproveCustomNDCAccess').setValue('true');
                        break;
                    }
                }
            }
        });
    },
    btnExportClick:function() {
        var view=this.getView();
        var grid =  view.down('#gpNDCDetails');
        var store=grid.getStore();
        if(store.data.items.length>0) {
            Atlas.common.utility.Utilities.exportToExcel(store);
        //    grid.saveDocumentAs({
        //        type: 'xlsx',
        //        title: 'Custom NDC Setup',
        //        fileName: 'Custom_NDC_Setup.xlsx'
        //    });
        }

    },
    btnAddNDCClick:function() {
        var win= Ext.create({
            xtype: 'formulary-addndcwindow',
            extraParams: {
                'NDC': '',
                'GCN': '',
                'LN': '',
                'PriceDate': '',
                'Unitprice': '',
                'Mode':'A'
            },
            autoShow: true
        });
        this.getView().add(win);
        win.show();
    },
    gpNDCDetails_RowClick : function (dv, record, item, index, e){
        var view=this.getView();
        var viewModel=this.getViewModel();
        view.down('#hdnSelectedNDC').setValue(record.data.NDC);
        var storeFormularyDetail =viewModel.getStore('storeFormularyDetail');
        storeFormularyDetail.getProxy().setExtraParam('ipcNDC',record.data.NDC);
        storeFormularyDetail.load();
        view.down('#gpFormularyDetail').setDisabled(false);
        view.down('#btnApproval').setDisabled(true);
        view.down('#btnApprove').setDisabled(true);
        view.down('#btnReject').setDisabled(true);
        view.down('#btnSave').setDisabled(true);

    },
    completeEdit:function(editor, context)
    {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 0)){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
            view.down('#btnSave').setDisabled(false);
        }

    },
    onUndoChangeClick:function(button)
    {
        var view = this.getView();

        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {

            var grid = this.getView().down('#gpFormularyDetail');
            grid.store.remove(record);
            //grid.up().findPlugin('rowediting').cancelEdit();

        }
        view.down('#btnSave').setDisabled(true);
    },
    btnAddFormularyClick : function() {
        var view = this.getView();
        var viewModel=this.getViewModel();
        var storeGrid = view.down('#gpFormularyDetail').getStore();
        var grid= view.down('#gpFormularyDetail');

        //  if(storeGrid.editing) {
        //    Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        // }
        //  else{}
        if(!grid.plugins[0].editing) {
            storeGrid.insert(0, {
                NDC: view.down('#hdnSelectedNDC').getValue(),
                FormularyId: 0,
                FormularyTierId: 0,
                PAInd: false,
                QtyLimit: '',
                QtyLmtTimePeriod: '',
                DaysSupply: '',
                DaysSupplyTimePeriod: ''
            });
            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },
    cbxFormularyList_Select:function(combo, record) {
        var view=this.getView();
        var storeGrid = view.down('#gpFormularyDetail');
        var viewModel=this.getViewModel();
        var store= viewModel.getStore('storeFormularyTiers');
        store.getProxy().setExtraParam('piFormularyID',record.data.FormularyID);
        store.load();
        storeGrid.getView().refresh();
    },
    cbxNDC_Select:function(combo, record) {
        var view=this.getView();
        var storeGrid = view.down('#gpNDCDetails');
        var gpFormularyDetail=view.down('#gpFormularyDetail');
        var storeFormularyDetail=gpFormularyDetail.getStore();
        storeFormularyDetail.getProxy().setExtraParam('ipcNDC','');
        var store= storeGrid.getStore();
        store.getProxy().setExtraParam('ipcNDC',record.data.NDC);
        store.load();
        storeFormularyDetail.load();
        view.down('#gpFormularyDetail').setDisabled(true);
    },
    gpNDCDetails_ItemDblClick : function (dv, record, item, index, e) {
        var win= Ext.create({
            xtype: 'formulary-addndcwindow',
            extraParams: {
                'NDC': record.data.NDC,
                'GCN' : record.data.GCN_SeqNo,
                'LN': record.data.LN,
                'PriceDate': record.data.NPT_DATEC,
                'Unitprice': record.data.NPT_PRICEX,
                'Mode':'U'
            },
            autoShow: true,
            scope:this
        });
        this.getView().add(win);
        win.show();
    },
    btnNDCHistory_Click:function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);
        Ext.create({
            xtype: 'formulary-customndchistorywindow',
            extraParams: {
                'NDC': record.data.NDC
            },
            autoShow: true
        });
    },
    btnResetClick:function() {
        var view=this.getView();
        var cmbNDC=view.down('#cbxNDC');
        var storeGrid = view.down('#gpNDCDetails');
        var gpFormularyDetail=view.down('#gpFormularyDetail');
        var storeFormularyDetail=gpFormularyDetail.getStore();
        var store= storeGrid.getStore();
        cmbNDC.clearValue();
        storeFormularyDetail.getProxy().setExtraParam('ipcNDC','');
        store.getProxy().setExtraParam('ipcNDC','');
        store.load();
        storeFormularyDetail.load();
        view.down('#gpFormularyDetail').setDisabled(true);
    },
    rendererFormulary: function (value) {
        var viewModel=this.getViewModel();
        var storeFormularyName = viewModel.getStore('storeFormularyName');
        var r=  storeFormularyName.data.find('FormularyID',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.FormularyName;
    },
    rendererFormularyTier: function (value, metaData, record, rowIndex, colIndex, store) {

        var viewModel=this.getViewModel();
        var storeFormularyTiers = viewModel.getStore('storeFormularyTiers');
        var r=  storeFormularyTiers.data.find('FormularyTierID',value);
        if (Ext.isEmpty(r)) {
            return record.data.FormularyTierName;
        }
        record.data.FormularyTierName=r.data.TierDesc;
        return r.data.TierDesc;
    },
    rendererQtyLmtTimePeriod: function (value) {
        var viewModel=this.getViewModel();
        var storeTimePeriod= viewModel.getStore('storeTimePeriod');
        var r=  storeTimePeriod.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    rendererDaysSupplyTimePeriod: function (value) {
        var viewModel=this.getViewModel();
        var storeTimePeriod= viewModel.getStore('storeTimePeriod');
        var r=  storeTimePeriod.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    gpFormularyDetail_beforeedit:function(dv, grid) {
        var rulestatus=grid.record.data.RuleStatus;
        if(rulestatus== '3' || rulestatus== '2'){
            return false;
        }
        var view=this.getView();
        var viewModel=this.getViewModel();
        var store= viewModel.getStore('storeFormularyTiers');
        store.getProxy().setExtraParam('piFormularyID',grid.record.data.FormularyId);
        store.load();
        var cbxFormularyList=  dv.grid.columns[0].getEditor(grid.record.data);
        if(grid.record.data.SystemID== 0){
            cbxFormularyList.setDisabled(false);
        }
        else
        {
            cbxFormularyList.setDisabled(true);
        }
    },
    gpFormularyDetail_RowClick : function (dv, record, item, index, e){
        var view=this.getView();
        var grid =view.down('#gpFormularyDetail');
        if (!grid.plugins[0].editing) {
            this.EnableDisableButtons(false);
        }
        else{
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },
    EnableDisableButtons:function () {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var maxCount = grid.getSelectionModel().getSelected().items.length;
        if (maxCount > 0) {
            var flgEnableApproval = true;
            var flgEnableApproved = true;
            for (var i = 0; i < maxCount; i++) {
                if (grid.getSelectionModel().getSelected().items[i].data.RuleStatus.trim() != '1' && grid.getSelectionModel().getSelected().items[i].data.RuleStatus.trim() != '4') {
                    flgEnableApproval = false;
                    break;
                }
            }
            for (var i = 0; i < maxCount; i++) {
                if (grid.getSelectionModel().getSelected().items[i].data.RuleStatus.trim() != '2') {
                    flgEnableApproved = false;
                    break;
                }
            }
            if (flgEnableApproval) {
                view.down('#btnApproval').setDisabled(false);
            }
            else {
                view.down('#btnApproval').setDisabled(true);
            }
            if (flgEnableApproved && view.down('#hidApproveCustomNDCAccess').getValue() == 'true') {
                view.down('#btnApprove').setDisabled(false);
                view.down('#btnReject').setDisabled(false);
            }
            else {
                view.down('#btnApprove').setDisabled(true);
                view.down('#btnReject').setDisabled(true);
            }
        }
        else {
            view.down('#btnApproval').setDisabled(true);
            view.down('#btnApprove').setDisabled(true);
            view.down('#btnReject').setDisabled(true);
        }
    },
    btnSubmitforApprovalClick:function(sender,e) {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var store = grid.getStore();
        var dirty = false
        for (var c = 0; c < store.data.items.length; c++) {
            if (store.data.items[c].dirty == true) {
                dirty = true;
                break;
            }
        }
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Select records for submiting approval.");

        }
        else if (!grid.plugins[0].editing) {

            if (dirty) {
                Ext.Msg.confirm('Uncommitted Changes', 'You have uncommitted changes. Are you sure you want to reload data?',
                    function (btn) {
                        if (btn == 'yes') {
                            this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                        }
                    }, this);
                return false;
            }
            else {
                Ext.Msg.confirm('Submit for Approval', 'Are you sure you want to submit for approval?',
                    function (btn) {
                        if (btn == 'yes') {
                            this.btnApproval_Click();
                        }
                        else {
                            return false;
                        }
                    }, this);
            }
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },
    GetCustomNDCFormDetail:function( NDC) {
        var result;
        var message;
        var lstNDCFormularyDetail;
        var view = this.getView();
        try {
            view.down('#btnApproval').setDisabled(true);
            view.down('#btnApprove').setDisabled(true);
            view.down('#btnReject').setDisabled(true);
            var gpFormularyDetail = view.down('#gpFormularyDetail');
            var storeFormularyDetail = gpFormularyDetail.getStore();
            storeFormularyDetail.getProxy().setExtraParam('ipcNDC', NDC);
            storeFormularyDetail.load();
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    btnApproval_Click:function() {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var tempData = {};
        var tempDataList = [];
        var tempDataListobj={};
        for (var c = 0; c < grid.getSelectionModel().getSelected().items.length; c++) {
            tempData.DaysSupply = grid.getSelectionModel().getSelected().items[c].data.DaysSupply;
            tempData.DaysSupplyTimePeriod = grid.getSelectionModel().getSelected().items[c].data.DaysSupplyTimePeriod;
            tempData.FormularyId = grid.getSelectionModel().getSelected().items[c].data.FormularyId;
            tempData.NDC = grid.getSelectionModel().getSelected().items[c].data.NDC;
            tempData.Notes = grid.getSelectionModel().getSelected().items[c].data.Notes;
            tempData.PAInd = grid.getSelectionModel().getSelected().items[c].data.PAInd;
            tempData.QtyLimit = grid.getSelectionModel().getSelected().items[c].data.QtyLimit;
            tempData.QtyLmtTimePeriod = grid.getSelectionModel().getSelected().items[c].data.QtyLmtTimePeriod;
            tempData.FormularyTierId = grid.getSelectionModel().getSelected().items[c].data.FormularyTierId;
            tempData.SystemID = grid.getSelectionModel().getSelected().items[c].data.SystemID;
            tempData.Mode = 'SubApp';
            tempDataList.push(tempData);
        }
        tempDataListobj.ttNDCFormDetail = tempDataList;
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
        var extraParameters = {
            'ttNDCFormDetail': tempDataListobj
        }
        var returnField = ['pJobNumber'];
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/customndcformdetail/update', null, [true], extraParameters,
            saveAction, null);
        if (submitJobReturn.code == 0) {
            Ext.Msg.alert("PBM", "Selected records successfully submitted for approval.");
            this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
        }
        else {
            Ext.Msg.alert("PBM", submitJobReturn.message);
        }
        view.down('#btnApproval').setDisabled(true);

    },
    btnApprove_Click:function() {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var store = grid.getStore();
        var dirty = false
        for (var c = 0; c < store.data.items.length; c++) {
            if (store.data.items[c].dirty == true) {
                dirty = true;
                break;
            }
        }
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Select records for approve.");

        }
        else if (!grid.plugins[0].editing) {

            if (dirty) {
                Ext.Msg.confirm('Uncommitted Changes', 'You have uncommitted changes. Are you sure you want to reload data?',
                    function (btn) {
                        if (btn == 'yes') {
                            this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                        }
                    },this);
                return false;
            }
            else {
                win = Ext.create('Ext.window.Window', {
                    title: 'Notes',
                    modal: true,
                    scrollable: true,
                    layout: 'vbox',
                    viewModel:{
                        parent: this.getViewModel()
                    },
                    itemId:'WinApprovedNotes',
                    xtype: 'WinApprovedNotes',
                    height: 200,
                    width: 500,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            style: {borderColor: 'black', borderStyle: 'solid'},
                            items: [
                                '->'
                                , {xtype: 'button', text: 'Approve', iconCls: 'fa fa-save', handler: 'btnApprovedNotes_Click', scope:this}
                                , {xtype: 'button', text: 'cancel', iconCls: 'fa fa-remove' ,handler: 'btn_Cancel'}
                            ]


                        }
                    ],
                    items: [
                        {xtype: 'textarea', fieldLabel: 'Notes',itemId:'txtApprovedNotes',layout:'fit'}

                    ]
                });
                this.getView().add(win);
                win.show();
            }
        }
    },
    btnRejectClick:function() {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var tempData = {};
        var tempDataList = [];
        var store = grid.getStore();
        var dirty = false;
        var tempDataListobj={};
        for (var c = 0; c < store.data.items.length; c++) {
            if (store.data.items[c].dirty == true) {
                dirty = true;
                break;
            }
        }
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Select records for reject.");

        }
        else if (!grid.plugins[0].editing) {

            if (dirty) {
                Ext.Msg.confirm('Uncommitted Changes', 'You have uncommitted changes. Are you sure you want to reload data?',
                    function (btn) {
                        if (btn == 'yes') {
                            this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                        }
                    },this);
                return false;
            }
            else {
                Ext.Msg.confirm('Reject Custom NDC Addition', 'Are you sure you want to reject this record?',
                    function (btn) {
                        if (btn == 'yes') {
                            for (c = 0; c < grid.getSelectionModel().getSelected().items.length; c++) {
                                tempData.DaysSupply = grid.getSelectionModel().getSelected().items[c].data.DaysSupply;
                                tempData.DaysSupplyTimePeriod = grid.getSelectionModel().getSelected().items[c].data.DaysSupplyTimePeriod;
                                tempData.FormularyId = grid.getSelectionModel().getSelected().items[c].data.FormularyId;
                                tempData.NDC = grid.getSelectionModel().getSelected().items[c].data.NDC;
                                tempData.Notes = '';
                                tempData.PAInd = grid.getSelectionModel().getSelected().items[c].data.PAInd;
                                tempData.QtyLimit = grid.getSelectionModel().getSelected().items[c].data.QtyLimit;
                                tempData.QtyLmtTimePeriod = grid.getSelectionModel().getSelected().items[c].data.QtyLmtTimePeriod;
                                tempData.FormularyTierId = grid.getSelectionModel().getSelected().items[c].data.FormularyTierId;
                                tempData.SystemID = grid.getSelectionModel().getSelected().items[c].data.SystemID;
                                tempData.Mode = 'Rej';
                                tempDataList.push(tempData);
                            }
                            tempDataListobj.ttNDCFormDetail = tempDataList;
                            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                            var extraParameters = {
                                'ttNDCFormDetail': tempDataListobj
                            }
                            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/customndcformdetail/update', null, [true], extraParameters,
                                saveAction, null);
                            if (submitJobReturn.code == 0) {
                                Ext.Msg.alert("PBM", "Selected records have been rejected.");
                                this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                            }
                            else {
                                Ext.Msg.alert("PBM", submitJobReturn.message);
                            }
                            view.down('#btnApprove').setDisabled(true);
                            view.down('#btnReject').setDisabled(true);
                        }
                        else {
                            return false;
                        }
                    },this)
            }
        }
    },
    btnApprovedNotes_Click:function() {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var store = grid.getStore();
        if (!grid.plugins[0].editing) {

            if (view.down('#txtApprovedNotes').getValue().trim().length > 0) {
                var view = this.getView();
                var tempData = {};
                var tempDataList = [];
                var tempDataListobj = {};
                for (var c = 0; c < grid.getSelectionModel().getSelected().items.length; c++) {
                    tempData.DaysSupply = grid.getSelectionModel().getSelected().items[c].data.DaysSupply;
                    tempData.DaysSupplyTimePeriod = grid.getSelectionModel().getSelected().items[c].data.DaysSupplyTimePeriod;
                    tempData.FormularyId = grid.getSelectionModel().getSelected().items[c].data.FormularyId;
                    tempData.NDC = grid.getSelectionModel().getSelected().items[c].data.NDC;
                    tempData.Notes = view.down('#txtApprovedNotes').getValue();
                    tempData.PAInd = grid.getSelectionModel().getSelected().items[c].data.PAInd;
                    tempData.QtyLimit = grid.getSelectionModel().getSelected().items[c].data.QtyLimit;
                    tempData.QtyLmtTimePeriod = grid.getSelectionModel().getSelected().items[c].data.QtyLmtTimePeriod;
                    tempData.FormularyTierId = grid.getSelectionModel().getSelected().items[c].data.FormularyTierId;
                    tempData.SystemID = grid.getSelectionModel().getSelected().items[c].data.SystemID;
                    tempData.Mode = 'App';
                    tempDataList.push(tempData);
                }
                tempDataListobj.ttNDCFormDetail = tempDataList;
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                var extraParameters = {
                    'ttNDCFormDetail': tempDataListobj
                }
                var returnField = ['pJobNumber'];
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/customndcformdetail/update', null, [true], extraParameters,
                    saveAction, null);
                this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                view.down('#txtApprovedNotes').setValue('');
                var win =view.down('#WinApprovedNotes');
                if (win) {
                    win.close();
                }
                Ext.Msg.alert("PBM", submitJobReturn.message);
                view.down('#btnApprove').setDisabled(true);
                view.down('#btnReject').setDisabled(true);
            }
            else {

            }
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
        }
    },
    btn_Cancel : function() {
        var view=this.getView();
        view.down('#WinApprovedNotes').close();
    },
    btnSaveClick:function() {
        var view = this.getView();
        var grid = view.down('#gpFormularyDetail');
        var store = grid.getStore();
        var dirty=false;
        for (var c = 0; c < store.data.items.length; c++) {
            if (store.data.items[c].dirty == true) {
                dirty = true;
                break;
            }
        }
        if (!grid.plugins[0].editing) {
            if(dirty) {
                var saveAction = [{
                    "Create": {"key": 'mode', "value": 'Add'},
                    "Update": {"key": 'mode', "value": 'Upd'},
                    "Delete": {"key": 'mode', "value": 'Delete'}
                }];
                var listDetail;
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/customndcformdetail/update', 'ttNDCFormDetail', [false], null,
                    saveAction, null);
                if (submitJobReturn.code == 0) {
                    Ext.Msg.alert("PBM", "Record saved sucessfully.");
                    this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());
                }
                else {
                    Ext.Msg.alert("PBM", submitJobReturn.message);
                }
            }
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
        }
    }
})
