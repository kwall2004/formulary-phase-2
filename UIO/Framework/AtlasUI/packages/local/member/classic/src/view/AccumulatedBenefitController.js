/**
 * Created by j2487 on 10/17/2016.
 * controller for Member Accumulated Benefits screen
 */
Ext.define('Atlas.member.view.AccumulatedBenefitController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accumbenefit',
    year:0,
    listen:{
        controller:{
            'member': {
                MemberChange: 'reloadPage'
            }
        }

    },
    init:function(){
        var view = this.getView();
        var viewmodel = this.getViewModel();


        var parentViewModel = view.up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        var i;
        var year = [];
        var today = Atlas.common.utility.Utilities.getLocalDateTime() ;

        var store = viewmodel.getStore('yearstore');
        var combo = this.getView().down('#cbxYear');
        for( i = 0; i<6; i++)
        {
            // year.push((today.getFullYear())-i);
            var ayear = {};
            ayear =  today.getFullYear()-i ;
            year.push(ayear);
        }
        combo.bindStore(year);
        var y = today.getFullYear();
        this.getView().down('#cbxYear').setValue(y);
        this.loadData(y);
  /*      Ext.query('div[class="x-grid-group-title"]');
        if ( Ext.query('div[class="x-grid-group-title"]').length > 0) {
            if ( Ext.query('div[class="x-grid-group-title"]')[0].innerText == "Month: 0") { Ext.query('div[class="x-grid-group-title"]')[0].innerText = "Medical:"}
        }
*/
    },
    btnExpand:function(button){
        var StoreBenefitEnrollment = this.getViewModel().getStore('StoreBenefitEnrollment');
        if(StoreBenefitEnrollment.data.length>0) {
            var grid = button.up('panel').down('gridpanel'), plugin = grid.findPlugin('rowwidget'), record = grid.getStore().getAt(0);
            plugin.toggleRow(0, record);
        }
    },
    onYearSelect: function () {

        var selectedYear = this.getView().down('#cbxYear').getValue();
        this.year = selectedYear;
        var y = this.year;
        this.loadData(y);


    },
    reloadPage:function (recipientID,parentPanelId) {

        if(this.getView().up().id == parentPanelId) {
            this.getView().down('#cbxYear').setValue('2017');
            var today = Atlas.common.utility.Utilities.getLocalDateTime() ;
            var y = today.getFullYear();
            this.loadData(y);
        }
    },
    onExpand:function(view,node,group){

    },
    loadData:function(y){
        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;

        var ViewModel = this.getViewModel();
        var View = this.getView();
        var selectedYear = this.getView().down('#cbxYear').getValue();
        var StoreBenefitEnrollment = ViewModel.getStore('StoreBenefitEnrollment');
        StoreBenefitEnrollment.getProxy().setExtraParam('pRecipientId', recipientID);
        StoreBenefitEnrollment.getProxy().setExtraParam('pYear',y );
        StoreBenefitEnrollment.load({
            scope: this,
            failure: function (record, operation) {

            },
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {
                //var AccumBenefitStore = ViewModel.getStore('AccumBenefitStore');
                var obj=Ext.decode(operation.getResponse().responseText);
                ViewModel.set('ParentAccum',record);
                var metaObject = obj.metadata;

                /*if(record.data.CanReprocess == true ){
                    View.down('#btnRep').setDisabled(false);
                }*/


                if(record.length != 0) {
                //    AccumBenefitStore.loadData(metaObject.ttAccumDetail.ttAccumDetail);
                    View.down('#lblOutOfPocketMsg').setFieldLabel(record[0].get('OutOfPocketMsg'));
                    View.down('#lblDrugCostMsg').setFieldLabel(record[0].get('DrugCostMsg'));
                }
            }});



    },
    onAccumBenefitEnrollmentLoad: function (store, records, successful, operation, eOpts)
    {
        var acumBenefitStore = this.getViewModel().getStore('AccumBenefitStore');
        acumBenefitStore.loadData(store.getExtraData().ttAccumDetail.ttAccumDetail);
    },
    btnReprocess:function () {
        var View = this.getView();
        this.ReprocessEnrollment();
    },
    ReprocessEnrollment:function () {
        var parentViewModel = this.getView().up('panel').getViewModel();
        var ViewModel = this.getViewModel();
        var record = ViewModel.get('ParentAccum');
        Ext.Msg.confirm('Reprocess Enrollment', 'Are you sure you want to reprocess member accumulators?',
            function (btn) {
                if (btn == 'yes') {

                    var recipientId = parentViewModel.data.masterrecord.recipientID;
                    var contractId = record[0].get('CMSCntrId');
                    var pcn = record[0].get('PCNCode');
                    var benefitYear = record[0].get('BenefitYear');
                    var pParameters = recipientId + '|' + contractId + '|' + pcn + '|' + benefitYear;
                    var reportSubmitModel = Ext.create('Atlas.reports.model.ReportSubmitModel');
                    reportSubmitModel.getProxy().setExtraParam('pDescription', 'Reprocess Accumulators');
                    reportSubmitModel.getProxy().setExtraParam('pParameters', pParameters);
                    reportSubmitModel.getProxy().setExtraParam('pProgramName','reProcessMemberAccumulators.p');
                    reportSubmitModel.getProxy().setExtraParam('pRunMode', 2);
                    reportSubmitModel.getProxy().setExtraParam('pProgramType', 'Batch' );
                    reportSubmitModel.getProxy().setExtraParam('pSaveDocument', true);
                    reportSubmitModel.getProxy().setExtraParam('pFaxNumber', '');
                    reportSubmitModel.save(
                        {
                            failure: function (record, operation) {
                                var obj = Ext.decode(operation.getResponse().responseText);
                                var returnMsgStatus = obj.message[0].message;
                                Ext.Msg.alert('Status', returnMsgStatus);
                            },
                            success: function (record, operation) {
                                //Ext.Msg.alert('Success', 'On success from call');
                            },
                            callback: function (record, operation, success) {
                                var obj = Ext.decode(operation.getResponse().responseText);
                                var newJobNumber = obj.metadata.pJobNumber;
                                var returnMsgStatus = 'Status: ' + obj.message[0].message;
                                var returnMsgText = 'Job number is: ' + '<span style="font-weight: bold;">' + newJobNumber + '</span>';
                                Ext.Msg.alert(returnMsgStatus, returnMsgText);
                            }
                        }
                    );
                }
            });
    },
    btnExportToExcel:function(){
        var view = this.getView();
        var ViewModel = this.getViewModel();
        var store= this.getViewModel().getStore('StoreBenefitEnrollment');
        var planGroupIds = Atlas.user.PlanGroupList + '^' + Atlas.user.PCNCodeList ;
        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        var pParameters = recipientID + "|" + view.down('#cbxYear').getValue() + "|" + planGroupIds;
        var description = "Member Accumulators";
        var progName = "rptMemberAccumulatedBenefits.p";
        var programType = 'Batch';
       var Info = Atlas.common.utility.Utilities.submitJobViewDoc(description, progName , pParameters, 2, programType , true, "");
        if(Info.code == 0){
            Ext.Msg.alert('Job',Info.message + '. Job Number is :'+ Info.jobNumber);
        }
    }
})