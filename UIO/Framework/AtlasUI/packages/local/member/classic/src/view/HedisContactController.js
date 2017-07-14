/**
 * Created by j2487 on 11/1/2016.
 */
Ext.define('Atlas.member.view.HedisContactController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HedisContact',
    recipientId:0,

    init:function () {
        var view = this.getView(),vm = this.getViewModel(),
            parentView = view.up(),
            viewModel = parentView.getViewModel();
        view.down('#rdMemberContact').setValue(true);
        view.down('#rdInboundCall').setValue(true);
        var  masterRecord = viewModel.get('masterrecord');
        var recipientID = masterRecord.recipientID;
        view.down('[name=MRxID]').setValue(recipientID);
        view.down('[name=memberName]').setValue(masterRecord.keytext);
        this.recipientId= recipientID;
        var memberplanstore = this.getViewModel().getStore('memberplanstore');
        memberplanstore.getProxy().setExtraParam('pRecipientId',recipientID);
        memberplanstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {

            }

        });
        var memberHedisStore = vm.getStore('memberhedissummary');
        memberHedisStore.getProxy().setExtraParam('pKey', recipientID);
        memberHedisStore.filter('lastSeen', null);
        /*   var measureid = [];
         memberHedisStore.filterBy(function(record) {
         var measure = record.get('measure');
         if(measureid.indexOf(measure)==-1)
         {
         measureid.push(measure);
         return true;
         } else {
         return false;
         }
         });*/
        // delete the filtered out record

        memberHedisStore.load({
            scope:this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {

            }
        });

    },
    onMeasureSelect: function()
    {
        var view = this.getView();
        if (view.down('#compHedis').getValue() != '')
        {
            view.down('#noteDesc').setValue('The following hedis measures' +' '+ view.down('#compHedis').getValue()+' '+'have been completed.');
        }
        else{
            view.down('#noteDesc').setValue('');
        }

    },
    onMemberPlanSelect:function (combo,record) {
        this.getViewModel().set('memberplan',record);
    },
    onSaveClick: function()
    {
        var reason1 = "";
        var reason2 = "";
        var reason3 = "";
        var Notes = "";
        var resolvedstatus = "";
        var callStatus = "";
        var dtCodeList=[];
        var dtCode={};
        var ttContactReasonCode = {};
        var view = this.getView();
        if (view.down('#rdMemberContact').getValue() == true && view.down('#rdInboundCall').getValue() == true)
        {
            reason1 = "A41";
            reason2 = "P32D";
        }
        else if (view.down('#rdMemberContact').getValue() == true && view.down('#rdOutboundCall').getValue() == true)
        {
            reason1 = "A47";
            reason2 = "P5C";
        }
        else if (view.down('#rdProviderContact').getValue() == true && view.down('#rdInboundCall').getValue() == true)
        {
            reason1 = "A42";
            reason2 = "P32C";
        }
        else if (view.down('#rdProviderContact').getValue() == true && view.down('#rdInboundCall').getValue() == true)
        {
            reason1 = "A42A";
            reason2 = "P5B";
        }
        if(view.down('#chkResolvedCall').getValue() == true){
            reason3 = "P8B";
            resolvedstatus = "yes";
            callStatus = "C";
        }
        else
        {
            resolvedstatus = "no";
            callStatus = "O";
        }
        dtCode.CodeType="";
        dtCode.CodeValue="";
        if (reason1 != '')
        {
            dtCode.CodeType = "Reason1";
            dtCode.CodeValue = reason1;
            dtCodeList.push(dtCode);
        }
        if (reason2 != '')
        {
            dtCode.CodeType = "Reason2";
            dtCode.CodeValue = reason2;
            dtCodeList.push(dtCode);
        }
        if (reason3 != '')
        {
            dtCode.CodeType = "Reason3";
            dtCode.CodeValue = reason3;
            dtCodeList.push(dtCode);
        }
        ttContactReasonCode.ttContactReasonCode = dtCodeList;
        Notes = view.down('#noteDesc').getValue();
        var RID = this.recipientId;
        var combo = this.lookupReference('planGroupCombo');
        var SelectedPlanGroupId = '';
        if(combo.selection)
        {
            SelectedPlanGroupId = combo.selection.data.planGroupId;
        }
        var fieldList = "reasonCode1,reasonCode2,reasonCode3,description,resolvedFirstCall,recipientID,callStatus,LastModifiedUser,CallDateTime,contactUser,updatedBy,contactType,subject,updatedDatetime,planGroupId";
        var fields = reason1 + "|" + reason2 + "|" + reason3 + "|" + Notes + "|" + resolvedstatus + "|" + RID + "|" + callStatus + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() ,'m/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Atlas.user.un + "|P|Hedis Contact|now|" + SelectedPlanGroupId;
        var saveAction = [{"Save": {"key": "mode", "value": "U"}}];
        var extraParameters = {
            pKeyValue: '0',
            pKeyType: 'CaseNum',
            pFieldList: fieldList,
            pFields: fields,
            ttContactReasonCode:ttContactReasonCode

        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [true], extraParameters,
            saveAction,null);
        if(result.code == 0)
        {
            view.close();
        }
        else
            Ext.Msg.alert('Failure',result.message);

        /* For MCS Save*/
        var pbmMemberId = '';
        var memberidstore =  this.getViewModel().getStore('memberidstore');
        memberidstore.getProxy().setExtraParam('pRecipientId', RID);
        memberidstore.load({
            scope:this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });

    }

})