/**
 * Created by t3852 on 10/20/2016.
 */
Ext.define('Atlas.portals.view.hpmember.makeviewpayment.MakeAPaymentViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.makeapayment',

    /**
     * Called when the view is created
     */
    init: function() {
        var user = Ext.first('viewport').getViewModel().getData().user,
            vm = this.getViewModel(),
            memberPremium = vm.getStore('memberPremiumWeb'),
            seqNo = '';

        // concats the users name and address for the view
        user.fullName = user.firstName + ' ' + user.lastName;
        user.cityStateZip = user.homeCity + ', ' + user.homeState + ' ' + user.homeZip;

        memberPremium.getProxy().setExtraParam('viRecipientID', user.recipientId);
        memberPremium.getProxy().setExtraParam('viAction', 'getPaymentInfo');

        memberPremium.load({
            callback: function (records, operation) {
                var response = Ext.decode(operation.getResponse().responseText),
                    canPayNow = false,
                    premiumRecord,
                    date = new Date();

                // sets the record to be used in the view
                if (user.policySeqNum == null || user.policySeqNum == '') {
                    seqNo = '000';
                } else {
                    seqNo = user.policySeqNum;
                }
                if (response.data == null || response.data == '') {
                    premiumRecord = {
                        premiumAmount: '0.00',
                        paymentAmountDue: '0.00'
                    };
                } else {
                    premiumRecord = response.data[0];
                }

                date = new Date(premiumRecord.paymentDueDate);
                premiumRecord.paymentDueDate = ((date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' +  date.getFullYear());


                user.accountNumber = user.recipientId + seqNo + 'P';
                vm.set('userRecord', user);
                vm.set('premiumRecord', premiumRecord);
                vm.set('canPayNow', (premiumRecord.paymentAmountDue > 0) && (user.subscriberId == user.recipientId))
            }
        });

    },

    viewBill: function() {
        var me = this,
            vm = this.getViewModel(),
            user = Ext.first('viewport').getViewModel().getData().user,
            documentList = vm.getStore('documentList'),
            nowDate = new Date(),
            fromDate = new Date();
        
        fromDate.setDate(fromDate.getDate()-45);
        var pThruDate = Ext.Date.format(nowDate, 'Y-m-d');
        var pFromDate = Ext.Date.format(fromDate, 'Y-m-d');
        
        documentList.getProxy().setExtraParam('pIDList', user.recipientId);
        documentList.getProxy().setExtraParam('pSourceEnv', 'MP');
        documentList.getProxy().setExtraParam('pFromDate', pFromDate);
        documentList.getProxy().setExtraParam('pThruDate', pThruDate);
        documentList.getProxy().setExtraParam('pFromRecord', 1);
        documentList.getProxy().setExtraParam('pToRecord', 1);
        documentList.getProxy().setExtraParam('pSort', 'by docDate desc');
        documentList.getProxy().setExtraParam('pDocCategory', 'Invoice');
        
        documentList.load({
            callback: function (response, operation) {
                var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64Portal', {});
                if (response != '') {
                    var jobNumber = response[0].data.jobNum;
        
                    requestModel.phantom = false;
                    requestModel.getProxy().setExtraParam('pRegenReport', 3);
                    requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
                    requestModel.getProxy().setExtraParam('pJobNum', jobNumber);
        
                    requestModel.save({
                        success: function (response, operation) {
                            var obj = Ext.JSON.decode(operation._response.responseText),
                                base64EncodedPDF = obj.data;
        
                            if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                                Ext.MessageBox.alert('Error', 'No current bill to display.', function(){});
                            } else {
                                Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                            }
                        }
                    });
                } else {
                    Ext.MessageBox.alert('Error', 'No current bill to display.', function(){});
                }
            }
        });
    },

    payBill: function() {
        var me = this,
            vm = this.getViewModel(),
            user = vm.get('userRecord'),
            premiumRecord = vm.get('premiumRecord'),
            billingForm = me.lookupReference('billingForm').getForm();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'member/hp/memberpremiumweb/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                viRecipientID: user.subscriberId,
                viAction:'setMemberPaymentTransaction',
                viStartDate: null,
                viEndDate: null,
                ttmemberPaymentTransaction: {
                    ttmemberPaymentTransaction: [
                        {
                            paymentBroker: 'HP EazyPay',
                            paymentStatus: 'Attempted',
                            emailAddress: user.eMailcontactinfo,
                            paymentDueDate: Ext.Date.format(premiumRecord.paymentDueDate, 'Y-m-d'),
                            paymentAmountDue: premiumRecord.paymentAmountDue,
                            PBSAccountNumber: user.accountNumber
                        }]
                },
                userState: user.portalStateSelected
            }),
            success: function (response, opts) {
                billingForm.submit({
                    target: '_blank',
                    url: Atlas.paymentURL,
                    params: {
                        id: user.accountNumber,
                        txtAcctNumber: user.accountNumber,
                        txtDueDate: premiumRecord.paymentDueDate,
                        txtAmountDue: 's' + premiumRecord.paymentAmountDue,
                        txtEmailAddress: user.eMailcontactinfo,
                        txtMiscellaneous: '<MiscellaneousData><PostURL>' + Atlas.paymentCallbackURL + '</PostURL></MiscellaneousData>',
                        txtSource: 'Meridian!1248',
                        txtClientId: '1248',
                        txtPaymentChannel: 'I001248'
                    }
                });
            },
            failure: function (response, opts) {
                Ext.Msg.alert('Error', 'There was a problem processing your payment.');
            }
        });
    }
});