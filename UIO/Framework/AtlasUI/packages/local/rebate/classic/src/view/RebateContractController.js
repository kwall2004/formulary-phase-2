/**
 * Created by j2487 on 11/11/2016.
 */
Ext.define('Atlas.rebate.view.RebateContractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rebatecontract',
    listen: {
        store: {
            '#lobstore': {
                load: 'OnLoadLOB'
            }
        },
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachmentIdentify'
            }
        }
    },

    ManufacturerID:'',parentId:'',contId:'',
    init:function(){
        this.LoadDropdowns();
        var view = this.getView();
        var plangroupstore=this.getViewModel().getStore('plangroupstore');
        plangroupstore.load();

    },
    OnLoadLOB:function(store, records, success) {
        for(var i = 0;i< records.length;i++)
        {
            this.getView().down('#lobfieldset').add({
                xtype:'checkbox',
                boxLabel:records[i].get('name'),
                inputValue:records[i].get('value'),
                itemId:'LOB'+records[i].get('value'),
                listeners:{
                    change:'onChange'
                }
            })
        }
    },
    onChange:function (me,newValue,oldValue) {
        if(newValue == true)
        {
            var tabTitle = 'LOB-'+ me.boxLabel;
            this.getView().down('#contractTabs').add(
                {
                xtype:'rebateproducts',
                title:tabTitle,
                itemId:'tab'+me.inputValue,
                CarrierLOBId:me.inputValue,
                tabConfig: {
                    listeners: {
                        activate: 'onTabChange'
                    }
                }
            });
        }
        else if(newValue == false)
        {
            this.getView().down('#tab'+me.inputValue).destroy();
        }
    },
    LoadDropdowns:function() {
        var view = this.getView();
        var vm = this.getViewModel();
        var manufacturersrebate = this.getViewModel().getStore('manufacturersrebate');
       // manufacturerstore1.getProxy().setExtraParam('pWhere','');
        manufacturersrebate.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
    },
    viewManufacturerInfo: function(combo, record) {
        var vm = this.getViewModel();
        var view = this.getView();
        vm.set("manufacturerRec", record);
        this.ManufacturerID = record.get('manufacturerID');
        var manufacturerId = this.ManufacturerID;
        var parentSystemID = record.get('systemID');
        var  contactstore =this.getViewModel().getStore('contactstore');
        contactstore.getProxy().setExtraParam('pParentSystemID',parentSystemID);
        contactstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
        this.getAllContractDetails(manufacturerId);
        view.down('#formId').reset();
        view.down('#txtContractID').setValue('');
        view.down('#btnCancelContract').setDisabled(false);
        this.getStore('contractnotestore').removeAll();
        for(var i = 0; i <  view.down('#lobfieldset').items.length;i++) {
            if(view.down('#lobfieldset').items.items[i].getValue() == true){
                view.down('#lobfieldset').items.items[i].setValue(false);
                view.down('#lobfieldset').items.items[i].setDisabled(false);
            }
        }
        view.down('#panelNotes').setDisabled(true);
        view.down('#panelLob').setDisabled(true);
        view.down('#panelContractDetail').setDisabled(true);
        view.down('#tabRebateFiles').setDisabled(true);
        view.down('#tabcontractTerms').setTitle('<span>Contract Terms</span>');
    },
    getAllContractDetails:function(manufacturerId){
        var view = this.getView();
        var where = '';
        if (manufacturerId != "")
        {
            where = (where != "" ? where + " and manufacturerID = '" + manufacturerId + "'" : "manufacturerID = '" + manufacturerId + "'");
        }
        var rebatecontractstore = this.getViewModel().getStore('rebatecontractstore');
        rebatecontractstore.getProxy().setExtraParam('pWhere',where);
        rebatecontractstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
        this.getView().down('#btnAddCon').setDisabled(false);
    },
    onContractSelect:function(me , record , tr , rowIndex , e , eOpts){
        var view = this.getView();

        view.down('#tabcontractTerms').setTitle('<span>Contract Terms</span>');

        view.down('#panelNotes').setDisabled(false);
        view.down('#panelLob').setDisabled(false);
        view.down('#panelContractDetail').setDisabled(false);
        view.down('#tabRebateFiles').setDisabled(false);

        view.down('#btnCancelContract').setDisabled(true);
        view.down('#btnDelCon').setDisabled(false);
        for(var i = 0; i <  view.down('#lobfieldset').items.length;i++) {
            if(view.down('#lobfieldset').items.items[i].getValue() == true){
                view.down('#lobfieldset').items.items[i].setValue(false);
                view.down('#lobfieldset').items.items[i].setDisabled(false);
            }
        }

        if(record == undefined || record.length < 0) {
            return;
        }
        //debugger;
        //view.down('#formFieldSet').un('change','handleFieldChanged');
        //this.getView();
//         view.down('#panelNotes').setDisabled(false);
//         view.down('#panelLob').setDisabled(false);
//         view.down('#panelContractDetail').setDisabled(false);
//         view.down('#tabRebateFiles').setDisabled(false);
        view.down('#txtContractID').setValue(record.get('contractID'));
        view.down('#cbxContractStatus').setValue(record.get('contractStatus'));
        view.down('#dtEffDate').setValue(record.get('effDate'));
        view.down('#dtTermDate').setValue(record.get('termDate'));
        view.down('#cbxPaymentCycle').setValue(record.get('payCycle'));
        view.down('#dtIssueDate').setValue(record.get('issueDate'));
        view.down('#txtIssueBy').setValue(record.get('issueBy'));
        view.down('#txtContractInfo').setValue(record.get('notes'));
//         view.down('#btnCancelContract').setDisabled(true);
//         view.down('#btnDelCon').setDisabled(false);
//         for(var i = 0; i <  view.down('#lobfieldset').items.length;i++) {
//             if(view.down('#lobfieldset').items.items[i].getValue() == true){
//                 view.down('#lobfieldset').items.items[i].setValue(false);
//                 view.down('#lobfieldset').items.items[i].setDisabled(false);
//             }
//         }
        var parentSystemId = record.get('systemID');
        var contractID =record.get('contractID');
        this.getViewModel().set('parentSystemId', parentSystemId);
        this.getViewModel().set('contractID', contractID);
        var contractId = record.get('contractID');
        this.parentId = parentSystemId;
        contId = contractId;
        this.getRebateContractDetail(parentSystemId,contractId);
        var keyType = 'RebateContractSystemID';
        var keyValue = parentSystemId;
        this.getAttachmentList(keyType,keyValue);
        this.getNotes(parseFloat(parentSystemId));

        //view.down('#formFieldSet').on('change','handleFieldChanged');
    },

    onTabChange:function( newActiveItem , me , oldActiveItem , eOpts) {
        this.fireEvent('onTabChange', newActiveItem,oldActiveItem);
    },
    getRebateContractDetail:function(parentSystemId,contractId){
        var view = this.getView(),
            vm = this.getViewModel();
        var where = '';
        var lob = '';
        var message = '';
        var result = null;
        if (parentSystemId != "" && parentSystemId != "0")
        {
            where = (where != "" ? where + " and parentSystemID = " + parentSystemId : "parentSystemID = " + parentSystemId);
        }
        else
        {
            return null;
        }
        var contractdetailstore = this.getViewModel().getStore('contractdetailstore');
        contractdetailstore.getProxy().setExtraParam('pWhere',where);
        contractdetailstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length == 0){
                    vm.set('contractDetailCount', 0);
                    return;
                }
                else {
                    vm.set('contractDetailCount', record.length);
                    for(var j = 0; j<record.length; j++ ){
                        lob = (j == 0 ? "LOB" + record[j].getData().carrierLOBID.toString()  : lob + "^" + "LOB" + record[j].getData().carrierLOBID.toString());
                    }
                    if(lob!=''){
                        var lobpieces = lob.split('^');
                        for(var j = 0;j<lobpieces.length;j++){
                            view.down('#'+lobpieces[j]).setValue(true);
                            view.down('#'+lobpieces[j]).setDisabled(true);
                        }
                    }
                }
            }
        });
        me=this;
        var plans= [];
        var rebatecontractplanstore = this.getViewModel().getStore('rebatecontractplanstore');
        rebatecontractplanstore.getProxy().setExtraParam('pContractID',contId);
        rebatecontractplanstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                    for(var i = 0; i < record.length ; i++) {
                       plans.push(record[i].get('planGroupID'));
                    }
                me.getView().down('#cbxCoveredPlans').setValue(plans);

            }
        });

    },
    getAttachmentList:function(keyType,keyValue) {
        if (keyValue.length <= 0 || keyValue == '0') {
            return;
        }
        if (keyType == 'RebateContractSystemID') {
            var attachmentandreportstore = this.getViewModel().getStore('attachmentandreportstore');
            attachmentandreportstore.getProxy().setExtraParam('pKeyType', keyType);
            attachmentandreportstore.getProxy().setExtraParam('pParentSystemId', keyValue);
            attachmentandreportstore.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                }
            });
        }
    },
    DeleteJobAndAttachment:function(grid, rowIndex, colIndex){
        var me = this;
        var view = this.getView();
        var jobNum = grid.getStore().getAt(rowIndex).data.jNum;
        var DocumentID = grid.getStore().getAt(rowIndex).data.DocumentID;
        var keyType = 'RebateContractSystemID';
        var keyValue = this.parentId;
        Ext.MessageBox.show({
            title:'PBM',
            msg:'Are you sure you would like to delete this record?',
            buttons: Ext.MessageBox.OKCANCEL, fn:function
                (btn){
                if(btn == 'ok') {

                    if (jobNum != '') {
                        me.SetDeleteJobqueueDirectly(jobNum);
                    }
                    else {
                        me.SetAttachmentList(keyType,keyValue,DocumentID);
                    }
                    if ( DocumentID != '') {
                        me.DeleteDocument(DocumentID);
                    }
                }
                else {return;}
            }})
    },
    SetDeleteJobqueueDirectly:function (jobNum) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "D"}}];
        var extraParameters = {
            pJobNumber:jobNum
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deletejobqueuedirectly/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0)
        {
            Ext.Msg.alert('PBM','Record Deleted.');
        }
    },
    SetAttachmentList:function (keyType,keyValue,DocumentID) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "D"}}];
        var extraParameters = {
            pcPlanID: '',
            pcKeyType: keyType,
            pcKeyType: keyValue,
            pcDocIDList:DocumentID,
            pcDescrData:'anything'
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0)
        {
            Ext.Msg.alert('PBM','Record Deleted.');
        }

    },
    DeleteDocument:function (DocumentID) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "D"}}];
        var extraParameters = {
            pDocumentID:DocumentID
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deldocument/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0)
        {
            Ext.Msg.alert('PBM','Record Deleted.');
        }

    },
    getNotes:function (parentSystemId) {
        var strReviewNotes = '';
        var contractnotestore = this.getViewModel().getStore('contractnotestore');
        contractnotestore.getProxy().setExtraParam('pParentSystemID',parentSystemId);
        contractnotestore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if(record.length > 0){
                    this.getView().down('#btnUpdateNotes').setDisabled(false);
                }
                else{
                    this.getView().down('#btnUpdateNotes').setDisabled(true);
                    this.getView().down('#btnDeleteNotes').setDisabled(true);
                }
            }

        });
    },
    AddNotes:function(){
        var  view = this.getView();
        var Notes = Ext.create(winRebateNotes);
        view.add(Notes);
        Notes.show();
        var today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
        var user = Atlas.user.un;
        this.getView().down('#noteDate').setValue(today);
        this.getView().down('#noteUser').setValue(user);
        this.getView().down('#winNotes').setTitle('Add');
        this.getView().down('#btnSave').setText('Add');
    },
    onRowDoubleClick:function( me , record , element , rowIndex , e , eOpts ){
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        this.getView().down('#btnDeleteNotes').setDisabled(false);
        this.getViewModel().set('masterNotesRec',record);
        this.UpdateNotes();
    },
    UpdateNotes:function(){
        var  view = this.getView();
        var Notes = Ext.create(winRebateNotes);
        var vm = this.getViewModel();
        view.add(Notes);
        Notes.show();
        var today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
        var user = vm.get('masterNotesRec').get('CreateUser');
        view.down('#noteDate').setValue(Ext.Date.format(vm.get('masterNotesRec').get('CreateDate'),'m/d/Y'));
        view.down('#noteUser').setValue(user);
        view.down('#winNotes').setTitle('Update');
        view.down('#btnSave').setText('Update');
        if(Atlas.user.un == user){ view.down('#btnSave').setDisabled(false);}
        else view.down('#btnSave').setDisabled(true);
        view.down('#txtSbj').setValue(vm.get('masterNotesRec').get('Subject'));
        view.down('#txtDesc').setValue(vm.get('masterNotesRec').get('Note'));
    },
    DeleteNotes:function(){
        var view =this.getView();
        var vm = this.getViewModel();
        var systemID = parseFloat(vm.get('masterNotesRec').get('SystemID'));
        var parentSystemId = this.parentId,subject = '',notes = '',user = '',pFieldList = '',pFieldValues = '';
        var mode = [{"Save": {"key": "pMode", "value": "D"}}];
        this.SetNotes(parseFloat(parentSystemId),subject,notes,user,pFieldList,pFieldValues,mode,systemID);

    },
    winNotesSave:function(){
        var view = this.getView(); var vm = this.getViewModel();
        var mode = '',seconds,systemID;
        if(view.down('#winNotes').getTitle() == 'Add'){
            mode =[{"Save": {"key": "pMode", "value": "A"}}];
            systemID = 0;
        }
        else if(view.down('#winNotes').getTitle() == 'Update'){
            mode =[{"Save": {"key": "pMode", "value": "U"}}];
            systemID = vm.get('masterNotesRec').get('SystemID');
        }
        var now = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y H:i:s'));
        then = new Date(now);
        then.setHours(0);
        then.setMinutes(0);
        then.setSeconds(0);
        then.setMilliseconds(1);
        var a = (now.getTime()/1000);
        var b = (then.getTime()/1000);
        var seconds = (a-b);

        /*var now = new Date(),
            then = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,0,0),
            seconds = now.getTime() - then.getTime();*/

        var parentSystemId = this.parentId;
        parentSystemId = parseFloat(parentSystemId);
        var subject = view.down('#txtSbj').getValue();
        var notes = view.down('#txtDesc').getValue();
        var user = view.down('#noteUser').getValue();
        var today = view.down('#noteDate').getValue();
        var pFieldList = "ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime";
        var pFieldValues = parseFloat(parentSystemId) + "|" + subject + "|" + notes + "|" + user + "|" + Ext.util.Format.date(now, 'm/d/Y') + "|" + seconds.toString();
        this.SetNotes(parentSystemId,subject,notes,user,pFieldList,pFieldValues,mode,systemID);
        if(view.down('#winNotes')){
            view.down('#winNotes').close();
        }
    },
    SetNotes:function(parentSystemId,subject,notes,user,pFieldList,pFieldValues,mode,systemID){

        var extraParameters = {
            psystemId: systemID,
            pFieldList: pFieldList,
            pFields:pFieldValues
        };
        var saveAction = mode;
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
        this.getNotes(parentSystemId);
    },
    onGridRowSelect:function (me,record,tr,rowIndex,e,eOpts) {
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        if(Atlas.user.un.toString() == tr.lastChild.textContent) {
            this.getView().down('#btnDeleteNotes').setDisabled(false);
        }
        else {
            this.getView().down('#btnDeleteNotes').setDisabled(true);
        }
        this.getViewModel().set('masterNotesRec',record);
    },
    winNotesClose:function(){
        this.getView().down('#winNotes').close();
    },
    getUtilizationDetail:function(){

        var store = this.getStore('attachmentandreportstore'),
            vm = this.getViewModel();
        if(vm.get('contractDetailCount') == 0){
            Ext.Msg.alert('PBM', 'Rebate contract details not available. Report could not be generated.');
            return false;
        }
        else {
            var RptProgName = 'rebateUtilizationRpt.p';
            var RptType = 'DETAIL';
            this.getReport(RptProgName, RptType);
        }

    },
    getInvoice:function () {
        var vm = this.getViewModel();
        if(vm.get('contractDetailCount') == 0){
            Ext.Msg.alert('PBM', 'Rebate contract details not available. Report could not be generated.');
            return false;
        }
        else {
            var RptProgName = 'rebateUtilizationRpt.p';
            var RptType = 'SUMMARY';
            this.getReport(RptProgName, RptType);
        }
    },
    getCoveredLives:function () {
        var vm = this.getViewModel();
        if(vm.get('contractDetailCount') == 0){
            Ext.Msg.alert('PBM', 'Rebate contract details not available. Report could not be generated.');
            return false;
        }
        else {
            var RptProgName = 'rebateCoveredLivesRpt.p';
            var RptType = 'COVEREDLIVES';
            this.getReport(RptProgName, RptType);
        }
    },
    getReport:function(RptProgName,RptType){
        var me=this;
        var view = me.getView();
        var vm = me.getViewModel();
        var RptId,RptName,RunMode;
        vm.getStore('reportinfostore').getProxy().setExtraParam('pReportProgName',RptProgName);
        vm.getStore('reportinfostore').load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var obj = Ext.decode(operation.getResponse().responseText);
                RptId = obj.metadata.pReportId;
                if(RptType == 'SUMMARY')
                    RptName ='Rebate Invoice Report';
                else
                    RptName = obj.metadata.pReportName;
                RunMode = obj.metadata.pRunMode;
                me.createFilterForm(RptProgName,RptId,RptName,RunMode,RptType );
            }
        });
    },
    createFilterForm:function(RptProgName,RptId,RptName,RunMode,RptType){
        var me=this,
            vm = me.getViewModel();
        var  programName= RptProgName,
            runMode= RunMode ,
            reportID = RptId,
            reportName = RptName;
        vm.set('reportType',RptType);

        vm.getStore('dataaccessReport').getProxy().setExtraParam('pUserName', Atlas.user.un);
        vm.getStore('dataaccessReport').getProxy().setExtraParam('pExpandToLevel', '');
        vm.getStore('dataaccessReport').load();
        var datasourcePicker = {
                xtype: 'common-tri-treepicker',
                width: 500,
                name: 'dataaccess',
                store: vm.getStore('dataaccessReport'),
                pickerURL: 'system/rx/dataaccesstree/update', //required for apply
                displayField: 'nodeName',
                emptyText: 'Data Access List',
                toolbarText: 'Data Access List',
                hideApply: true,
                itemId: 'rptDataAccessTree'
            },
            reportFilterWindow = new Atlas.reports.view.FilterWindow(
                {
                    title: reportName,
                    autoShow: true,
                    viewModel:{
                        parent: vm,
                        data: {
                            masterrecord: null, //This is what the form binds to on successful load of MemberMaster
                            record: {
                                data:{
                                    parentSystemId: vm.get('parentSystemId'),
                                    contractID: vm.get('contractID'),
                                    programName: programName,
                                    dataAccessFilterFlag: true,
                                    runMode: runMode ,
                                    reportID: reportID,
                                    reportName: reportName,
                                    reportType: RptType}
                            },
                            ReportFrom:'RebateContract'
                        },
                        stores: {
                            reportfilterdata: {
                                model: 'Atlas.reports.model.ReportFilterModel',
                                session: true
                            },
                            comboboxlistsdata: {
                                model: 'Atlas.reports.model.ReportsListItemsModel',
                                session: true,
                                storeId: 'rptListsStore',
                                autoLoad: true
                            },
                            reportsubmitdata: {
                                model: 'Atlas.reports.model.ReportSubmitModel',
                                session: true,
                                storeId: 'rptSubmitStore',
                                root: 'message'
                            },
                            useraccessplangroup: {
                                model: 'Atlas.reports.model.UserAccessPlanGroupModel',
                                storeId: 'rptUserAccessPlanGroupStoreId',
                                root: 'metadata',
                                session: true
                            }
                        }
                    }
                });
        // If dataAccessFilterFlag, add DataAccessTree to window object
        /*if(record.data.dataAccessFilterFlag) {*/
        reportFilterWindow.down('#filterFormItems').add({
            xtype: 'fieldset',
            title: 'My Data Access Filter',
            itemId: 'filterWindowDataAccessTree'
            //items: []
        });
        reportFilterWindow.down('#filterWindowDataAccessTree').add(datasourcePicker);
        /*}*/
    },
    AddContract:function(){
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#panelLob').setDisabled(true);
        view.down('#panelNotes').setDisabled(true);
        view.down('#panelContractDetail').setDisabled(false);
        view.down('#mfrGrid').setDisabled(true);
        view.down('#mfrInfo').setDisabled(true);
        view.down('#mfrToolbar').setDisabled(true);
      /*  var date = Ext.Date.format(new Date(), 'n/j/Y');
        view.down('#dtIssueDate').setValue(date);*/
        view.down('#formId').reset();
        view.down('#txtContractID').setValue('');
        view.down('#txtIssueBy').setValue(Atlas.user.un);
        view.down('#btnCancelContract').setDisabled(false);
        this.getStore('contractnotestore').removeAll();
        view.down('#cbxContractStatus').markInvalid('');
        view.down('#dtEffDate').markInvalid('');

    },
    onContractStatusChanged:function (comb,record) {
        //debugger;
        var view = this.getView();
        var title = view.down('#tabcontractTerms').title;
        var n = title.indexOf("edited");
        if(n<0)
        {
            view.down('#tabcontractTerms').setTitle('<span>Contract Terms (edited)</span>'); 
        }

    },

    // onContractInfoChanged : function(field, newVal, oldVal){
    //     if(newVal != oldVal){
    //         view.down('#tabcontractTerms').setTitle('<span class="m-green-color"> Contract Terms(edited)</span>');
    //     }
    // },

    SaveContractDetails:function() {
        var view = this.getView();
        var contractId =  view.down('#txtContractID').getValue();
        var createdBy = view.down('#txtIssueBy').getValue();
        var status = view.down('#cbxContractStatus').getValue();
        if(status == '' || status == null){
            Ext.Msg.alert('Error','Please fill required fields');
            return;
        }
        var effDate = view.down('#dtEffDate').getValue();
        effDate = Ext.Date.format(effDate,'m/d/Y');
        if(effDate == '' || effDate == null){
            Ext.Msg.alert('Error','Please fill required fields');
            return;
        }
        var termDate = view.down('#dtTermDate').getValue();
        if (termDate == null) {termDate = ''}
        else termDate = Ext.Date.format(termDate,'m/d/Y');
        var payCycle = view.down('#cbxPaymentCycle').getValue();
        if(payCycle == '' || payCycle == null){
           payCycle = '';
        }
        var contractInfo = view.down('#txtContractInfo').getValue();
        var coveredPlans = view.down('#cbxCoveredPlans').getValue();
        var issueDate = view.down('#dtIssueDate').getValue();
        var tempData=[];
        var ttRebateContractPlans ={};
        if (issueDate == null) {issueDate = ''} else issueDate = Ext.Date.format(issueDate,'m/d/Y');
        if((status ==''||status == null) && (effDate == ''||effDate == null ))
        {
            var saveMessage = 'This form has errors.';
            view.down('#formstatus').setStatus({text:saveMessage,clear:true});
            return;
        }

        var mfrId = this.ManufacturerID;
        var pFieldList,pFieldValues,saveAction;

        if(contractId == 0 || contractId == '' ) {
            saveAction = [{"Save": {"key": "pAction", "value": "A"}}];
            contractId = '0'
        }
        else{
            saveAction = [{"Save": {"key": "pAction", "value": "U"}}];
        }
        pFieldList = 'manufacturerID,payCycle,effDate,termDate,issueDate,contractStatus,notes,issueBy';
        pFieldValues = mfrId + '|' + payCycle + '|' + effDate + '|' + termDate + '|' + issueDate + '|' + status + '|' + contractInfo + '|' + createdBy;
        var extraParameters = {
            pContractId:contractId,
            pFields:pFieldList,
            pValues:pFieldValues
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractmaster/update', null, [true], extraParameters,
            saveAction,['pRetContractID','pRetSystemID']);
        if (result.code == 0)
        {
            if(coveredPlans != 0){
                for(var i = 0;i<coveredPlans.length;i++){
                    tempData.push(
                        {
                            planGroupID:coveredPlans[i],
                            effDate:"",
                            termDate:""
                        }
                    );ttRebateContractPlans.ttRebateContractPlans = tempData;
                }
                var extraParameters = {
                    pContractId:contractId,
                    ttRebateContractPlans:ttRebateContractPlans
                };
                var res =  Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractplans/update', null, [true], extraParameters,
                saveAction,null);
            }
            Ext.Msg.alert('PBM','Rebate Contract Details Successfully Saved (Contract Id:'+ result.pRetContractID +')');
            view.down('#txtContractID').setValue(result.pRetContractID);
            this.parentId=result.pRetSystemID;
            view.down('#panelLob').setDisabled(false);
            view.down('#mfrGrid').setDisabled(false);
            view.down('#mfrInfo').setDisabled(false);
            view.down('#panelNotes').setDisabled(false);
            view.down('#mfrToolbar').setDisabled(false);
            this.getStore('rebatecontractstore').reload();
            Ext.defer(function(){
                var selectedItem = view.down('#mfrGrid').getStore().find('contractID', result.pRetContractID);
                view.down('#mfrGrid').getSelectionModel().select(selectedItem);
                view.down('#mfrGrid').fireEvent('rowclick');
            }, 1000);
            this.getNotes(this.parentId);
        }
    },
    cancelConract:function(){
        var view = this.getView();
        var vm = this.getViewModel();
        if(view.down('#txtContractID') == '')
        {
            view.down('#formId').reset();
        }
        view.down('#mfrGrid').setDisabled(false);
        view.down('#mfrInfo').setDisabled(false);
        view.down('#mfrToolbar').setDisabled(false);
        view.down('#panelLob').setDisabled(true);
        view.down('#panelNotes').setDisabled(true);
        view.down('#panelContractDetail').setDisabled(true);
    },
    DeleteContract:function(){
        var me = this,
            view = this.getView(),
            mfrId = this.ManufacturerID,
            contractId = view.down('#mfrGrid').getSelection()[0].get('contractID');
        Ext.Msg.confirm('Delete Contract', 'Are you sure you would like to delete Contract Id: <b>' + contractId + '</b> ?', function (btn) {
            if (btn == 'yes') {
                var saveAction,pFieldList,pFieldValues,result;
                saveAction = [{"Save": {"key": "pAction", "value": "D"}}];
                pFieldList = 'systemID';
                pFieldValues =  view.down('#mfrGrid').getSelection()[0].get('systemID');
                var extraParameters = {
                    pContractId:contractId,
                    pFields:pFieldList,
                    pValues:pFieldValues
                };

                result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractmaster/update', null, [true], extraParameters,
                    saveAction,['pRetContractID','pRetSystemID']);

                if(result.code == 0)
                {
                    Ext.Msg.alert('PBM','Rebate Contract Id:'+ contractId +'successfully Deleted.');
                    me.getStore('rebatecontractstore').reload();
                    view.down('#formId').reset();
                    for(var i = 0; i <  view.down('#lobfieldset').items.length;i++) {
                        if(view.down('#lobfieldset').items.items[i].getValue() == true){
                            view.down('#lobfieldset').items.items[i].setValue(false);
                            view.down('#lobfieldset').items.items[i].setDisabled(false);
                        }
                    }

                }
            }
        });

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
                    keyType: 'imageRebate',
                    height: '100%',
                  /*  fileType: 'csv',*/
                    origin: me.getView().id,
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });
        this.getView().add(win);
        win.show()
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
                    pcKeyType: 'RebateContractSystemID',
                    pcKeyValue: this.getViewModel().data.parentSystemId,
                    pcKeyAction: 'A',
                    pcDocIDList: arrayDocumentId[0].trim(),
                    pcDescrData: fileStore.getAt(0).get('description')
                };
                var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params, saveAction, null);
                if(setAttachmentList.code ==0)
                {
                    this.getAttachmentList('RebateContractSystemID',this.getViewModel().data.parentSystemId);
                    Ext.Msg.alert('Success', 'File Upload Sucessfully');
                    win.close();
                }
                else
                Ext.Msg.alert('Failure', setAttachmentList.message);
            }
            else {
                view.down('#hdnDocumentId').setValue(arrayDocumentId[0].trim())
            }
        }
    }
});
var winRebateNotes;
winRebateNotes = Ext.create('Ext.window.Window',{
    layout:'vbox',itemId:'winNotes',height:230,width:300,
    items:[
        {xtype:'textfield',itemId:'txtSbj',fieldLabel:'Subject'},
        {xtype:'textarea',itemId:'txtDesc',fieldLabel:'Description'}
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock:'bottom',items:[
            '->',
            {xtype: 'button', handler:'winNotesSave',itemId:'btnSave'},
            {xtype: 'button', text: 'Cancel',handler:'winNotesClose'}
        ]
        },
        {
            xtype: 'toolbar',
            dock:'top',items:[
            {xtype: 'displayfield',itemId:'noteDate',userCls:'x-fa fa-calendar-check-o'},'-',
            {xtype: 'displayfield',itemId:'noteUser',userCls:'x-fa fa-user-o'}
        ]
        }
    ]
})