/**
 * Created by s6685 on 12/2/2016.
 */

Ext.define('Atlas.admin.view.EDITransactionWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EDITransactionWindowController',
    TransactionID:'',
    init:function()
    {
       var view = this.getView();
        var vm = this.getViewModel();
        var TransactionID = view.extraParams["TransactionID"];
        var fieldList='AccYr,Bin,FacTransID,NCPDPVersion,Port,ProcessorCntr,ProviderID,ProviderIDQ,RawDataIN,RawDataOUT,recordVersion,ServiceDate,Socket,SoftVenCertID,SOURCE,TmIn,TmOut,TranCode,TransactionID,TransactionTime,TransCnt,TransDate,StatFlg';
        var modelEDITransaction = vm.getStore('TransactionDetailstore');
        modelEDITransaction.getProxy().setExtraParam('pTransactionID',TransactionID);
        modelEDITransaction.getProxy().setExtraParam('pFieldList',fieldList);
        modelEDITransaction.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success){

                var objRespListDetailForPlan = Ext.decode(operation.getResponse().responseText);
                view.down('#formEDIDetail').loadRecord(record[0]);

                if(objRespListDetailForPlan.data[0].TmOut != '') {
                    var TmOutvalue = Ext.Date.format(new Date(objRespListDetailForPlan.data[0].TmOut), 'H:i:s.u');
                    view.down('#lblTimeOutDate').setValue(TmOutvalue);
                }

                if(objRespListDetailForPlan.data[0].TmIn!='') {
                    var Tminvalue = Ext.Date.format(new Date(objRespListDetailForPlan.data[0].TmIn), 'H:i:s.u');
                    view.down('#lblTimeInDate').setValue(Tminvalue);
                }

                if(objRespListDetailForPlan.data[0].TransactionTime!='') {
                    var item = objRespListDetailForPlan.data[0].TransactionTime;
                    item = (item == '') ? '' : item;
                    var TransactionTime='';
                    if (item.toString().length >=4) {
                        var sec= parseInt(item)/1000;
                        TransactionTime= '00:0'+sec;
                    }
                    else {
                        TransactionTime=  '00:00.'+item;
                    }
                    view.down('#lblProcessTime').setValue(TransactionTime.toString());
                }
                if(objRespListDetailForPlan.data[0].StatFlg=="no")
                    view.down('#lblStatusFlag').setValue('No');
                else
                    view.down('#lblStatusFlag').setValue('Yes');
            }
        });
    }

});


