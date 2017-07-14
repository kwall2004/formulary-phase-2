/**
 * Created by j2487 on 10/3/2016.
 */
Ext.define('Atlas.member.view.RequestIdCardController', {
    extend: 'Ext.app.ViewController',
  /*  requires: [
        'Atlas.utility.Utilities'
    ],*/
    alias: 'controller.requestidcard',

    init: function () {


    },

    onMemberSelection: function (combo, record)
    {
        this.getViewModel().set('masterrecord',record);
        var view = this.getView();
        var ViewModel = this.getViewModel();
        var record = ViewModel.get('masterrecord');
        var memberInfoStore = ViewModel.getStore('memberInfoStore');
        var memberplanstore = ViewModel.getStore('memberplanstore');
        memberInfoStore.getProxy().setExtraParam('pKeyValue',record.get('recipientID'));
        memberInfoStore.load({
            scope: this,
            callback: function(a, b, c){
                memberplanstore.getProxy().setExtraParam('pRecipientId',record.get('recipientID'));
                memberplanstore.load({
                    scope: this,
                    failure: function (recordm, operation) {
                    },
                    success: function (recordm, operation) {
                    },
                    callback: function (recordm, operation, success) {
                        ViewModel.set('planmasterrecord',recordm);
                        var rec = memberplanstore.findRecord('planGroupName',record.get('planGrpName'));
                        if (rec){
                            var pid = rec.get('planGroupId')
                            view.down('#plangroupId').setValue(pid);
                        }

                    }
                });
            }
        });

        this.getView().down('#addBtn').setDisabled(false);
        this.getView().down('#removeBtn').setDisabled(false);
    },
   /* onPlanSelection:function(combo,record)
    {
        this.getViewModel().set('planmasterrecord',record);
        var view = this.getView();
    },*/
    onAddClick:function () {
        var view = this.getView();
        var ViewModel = this.getViewModel();
        var record = ViewModel.get('masterrecord');
        var rec = ViewModel.get('planmasterrecord');
        var requestidcardstore = ViewModel.getStore('requestidcardstore');
        var memberInfoStore = ViewModel.getStore('memberInfoStore');
        if(view.down('#recipientId').getValue() == '' || view.down('#recipientId').getValue() == null){Ext.Msg.alert('Error','Please select a member');return;}
        if(view.down('#plangroupId').getValue() == '' || view.down('#plangroupId').getValue() == null){Ext.Msg.alert('Error','Please select a plan');return;}
        var cardTypeValue = view.down('#cardType').getValue();
        if(cardTypeValue == '' || cardTypeValue == null){Ext.Msg.alert('Error','Please select a card type');return;}
        var MemID = record.get('memberID');
        var planGroupId = rec[0].get('planGroupId');
        var memberInfo = memberInfoStore.data.items[0].data;
        memberInfo.CardType = cardTypeValue;
        memberInfo.memberId = MemID;
        memberInfo.planGroupId = planGroupId;
        requestidcardstore.add(memberInfo );
        this.getView().down('#ReqIDCard').setDisabled(false);
    },
    onRemoveClick:function () {
        var view = this.getView();
        var ViewModel = this.getViewModel();
        var store = ViewModel.getStore('requestidcardstore');
        var selection= view.down('#reqIdGrid').getSelectionModel().getSelection();
        store.remove(selection);
    },
    onRequestCardClick:function () {
        var view = this.getView();
        var ViewModel = this.getViewModel();
        var store = ViewModel.getStore('requestidcardstore');
            var ttMemberInfo = {};
            var tempData = [];

        view.down('#ReqIDCard').setDisabled(true);

            for (i = 0; i < store.data.items.length; i++) {
                tempData.push(
                    {
                        "recipientId": store.data.items[i].data.recipientID,
                        "memberId": store.data.items[i].data.memberId,
                        "lastName": store.data.items[i].data.lastname,
                        "firstName": store.data.items[i].data.firstname,
                        "AddressStreet": store.data.items[i].data.Home_Address1,
                        "AddressCity": store.data.items[i].data.Home_City,
                        "AddressState": store.data.items[i].data.Home_State,
                        "AddressZip": store.data.items[i].data.home_zipCode,
                        "CardType": store.data.items[i].data.CardType,
                        "carrierName": store.data.items[i].data.CarrierName,
                        "planGroupId": store.data.items[i].data.planGroupId
                    });
                ttMemberInfo.ttMemberInfo = tempData;
            }
            var model = Ext.create('Atlas.member.model.RequestIDCardModel');
            var setProxy = model.getProxy();
            setProxy.setExtraParam('ttMemberInfo', ttMemberInfo);
            model.phantom = false;
            model.save(
                {
                    scope: this,
                    failure: function (record, operation) {

                    },
                    success: function (record, operation) {

                    },
                    callback: function (record, operation, success) {
                        var obj = operation.getResponse().responseText;
                       // obj = obj.replace('\n"', '"');
                        view.down('#ReqIDCard').setDisabled(false);
                        var obj1 = Ext.decode(obj);
                        var obj2 = obj1.message[0].message;
                        if(obj1.message[0].code==0)
                        Ext.Msg.alert('PBM', "Member ID Card Request Successfully Submitted");
                        else
                            Ext.Msg.alert('PBM', obj2);
                    }
                }
            )
        }
});