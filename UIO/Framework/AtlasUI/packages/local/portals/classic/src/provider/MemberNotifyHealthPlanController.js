/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Notify health Plan
 * Description: Controller for Member Notify Health Plan
 */
Ext.define('Atlas.portals.provider.MemberNotifyHealthPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.membernotifyhealthplancontroller',

    init: function () {
        var me = this,
            win = me.getView().up('window');

        Ext.on('resize', function () {
            if (win) {
                win.center();
            }
        });
    },

    loadMemberData: function (){
        var memberDetails = this.getViewModel().data.memberdetails,
            user = Atlas.user,
            phoneNumber = user.userPreferences.phone,
            providerName = user.firstName + ' ' + user.lastName;
        
        this.loadStates();
        this.loadListItems('TypeofActionPortal');

        this.loadListItems('cmReferralType');

        var termDate = Ext.util.Format.date(memberDetails.contCoverageTerm, 'm/d/Y');
        this.lookupReference('mcirTabRef').setDisabled(true);
        if(memberDetails.age <=15){
            if ((termDate == '') || (Ext.util.Format.date(new Date(), 'm/d/Y') <= termDate) ){
                this.lookupReference('mcirTabRef').setDisabled(false);
            }
        }
        this.lookupReference('memberIdRef').setValue(memberDetails.memberCardID);
        this.lookupReference('memberNameRef').setValue(memberDetails.name);
        this.lookupReference('memberMgmtAddr1').setValue(memberDetails.homeAddress1);
        this.lookupReference('memberMgmtAddr2').setValue(memberDetails.homeAddress2);
        this.lookupReference('memberMgmtCity').setValue(memberDetails.homeCity);
        this.lookupReference('stateCombo').setValue(memberDetails.homeState);
        this.lookupReference('memberMgmtzip').setValue(this.modifiedZip(memberDetails.homeZip));
        this.lookupReference('memberMgmtPhone').setValue(this.modifiedPhone(memberDetails.homePhonecontactInfo));
        this.lookupReference('TOACombo').setValue('GA');
        this.lookupReference('TOABehavioralCombo').setValue('GA');
        this.lookupReference('TOAComplianceCombo').setValue('NC');

        // provider phone number
        this.lookupReference('memberMgmtPhoneNum').setValue(phoneNumber);
        this.lookupReference('caseMgmtPhone').setValue(phoneNumber);
        this.lookupReference('behavioralPhone').setValue(phoneNumber);
        this.lookupReference('compliancePhone').setValue(phoneNumber);
        this.lookupReference('mcirPhone').setValue(phoneNumber);

        // provider name
        this.lookupReference('memberMgmtUserName').setValue(providerName);
        this.lookupReference('caseMgmtUserName').setValue(providerName);
        this.lookupReference('behavioralUserName').setValue(providerName);
        this.lookupReference('complianceUserName').setValue(providerName);
        this.lookupReference('mcirUserName').setValue(providerName);

    },
    
    loadStates: function(){
        var combo = this.lookupReference('stateCombo'),
            states = [["AL", "AL"], ["AK", "AK"], ["AZ", "AZ"], ["AR", "AR"], ["CA", "CA"], ["CO", "CO"], ["CN", "CN"],
                ["DE", "DE"], ["DC", "DC"], ["FL", "FL"], ["GA", "GA"], ["HW", "HW"], ["ID", "ID"], ["IL", "IL"],
                ["IN", "IN"], ["IA", "IA"], ["KS", "KS"], ["KY", "KY"], ["LA", "LA"], ["ME", "ME"], ["MA", "MA"],
                ["MD", "MD"], ["MI", "MI"], ["MN", "MN"], ["MS", "MS"], ["MO", "MO"], ["MT", "MT"], ["NE", "NE"],
                ["NV", "NV"], ["NH", "NH"], ["NJ", "NJ"], ["NM", "NM"], ["NY", "NY"], ["NC", "NC"], ["ND", "ND"], ["OH", "OH"],
                ["OK", "OK"], ["OR", "OR"], ["PA", "PA"], ["RH", "RH"], ["SC", "SC"], ["SD", "SD"], ["TE", "TE"], ["TX", "TX"],
                ["UT", "UT"], ["VE", "VE"], ["VA", "VA"], ["WA", "WA"], ["WV", "WV"], ["WI", "WI"], ["WY", "WY"]],
            statesStore = {};

        statesStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: states
        });

        combo.setStore(statesStore);
    },
    
    loadListItems: function(listName){
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            me = this,
            listStore = {};

        listItemsModel.getProxy().setExtraParam('pListName', listName);
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    listMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i+= 2) {
                    listMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                }

                listStore = new Ext.data.ArrayStore({});
                listStore.add(listMap);
                if  (listName == 'TypeofActionPortal') {
                    me.lookupReference('TOACombo').setStore(listStore);
                } else if (listName == 'cmReferralType'){
                    me.lookupReference('referralCombo').setStore(listStore);
                }

                var  behavioral = [["General Alert", "GA"], ["No Show","NS"]];
                var behavioralStore = new Ext.data.ArrayStore({
                    fields: ['key', 'value'],
                    data: behavioral
                });
                me.lookupReference('TOABehavioralCombo').setStore(behavioralStore);

                var  compliance = [["Non Compliance", "NC"]];
                var complianceStore = new Ext.data.ArrayStore({
                    fields: ['key', 'value'],
                    data: compliance
                });
                me.lookupReference('TOAComplianceCombo').setStore(complianceStore);
            }
        });
    },

    onOkClick : function () {
        var tabName = this.lookupReference('notifyHealthTabs').getActiveTab().title,
            memberDetails = this.getViewModel().data.memberdetails,
            me = this,
            errorMsg = '',
            user = Ext.first('viewport').getViewModel().get('user');

        switch(tabName) {
           case 'Member Management':
               if (this.lookupReference('memberMgmtUserName').getValue()==''){
                   errorMsg = errorMsg + '<font color="red">Please enter Requested by Name</font><br/>'
               }
               if (this.lookupReference('memberMgmtPhoneNum').getValue()==''){
               errorMsg = errorMsg + '<font color="red">Please enter Requested by Phone</font><br/>'
                }
               if (this.lookupReference('memberMgmtReason').getValue()==''){
                   errorMsg = errorMsg + '<font color="red">Please explain Reason for Notification</font><br/>'
               }
               if (errorMsg == ''){
                   var pFields = '';
                   var setMCNotificationDataWebStore = Ext.create('Atlas.portals.provider.model.MCNotificationDataWeb', {});
                   setMCNotificationDataWebStore.phantom = false;
                   pFields = this.lookupReference('memberMgmtAddr1').getValue() + "|" +  //1
                       this.lookupReference('memberMgmtAddr2').getValue() + "|" + //2
                       this.lookupReference('memberMgmtCity').getValue() + "|" +  //3
                       this.lookupReference('stateCombo').getValue() + "|" + //4
                       this.lookupReference('memberMgmtzip').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //5
                       this.lookupReference('memberMgmtPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //6
                       "" + "|" + //contactType //7
                       "" + "|" + //comments //8

                       this.lookupReference('TOACombo').getValue() + "|" + //10
                       this.lookupReference('memberMgmtReason').getValue() + "|" + //11
                       "" + "|" + //12
                       this.lookupReference('memberMgmtUserName').getValue() + "|" + //13
                       this.lookupReference('memberMgmtPhoneNum').getValue().replace(/[^a-zA-Z0-9 ]/g, "");
                   setMCNotificationDataWebStore.getProxy().setExtraParam('pRecipientID', memberDetails.recipientID);
                   setMCNotificationDataWebStore.getProxy().setExtraParam('pFields', pFields);
                   setMCNotificationDataWebStore.getProxy().setExtraParam('pUsername', user.un);

                   setMCNotificationDataWebStore.save({
                       success: function (response, operation, record) {
                           var obj = Ext.JSON.decode(operation._response.responseText),
                               result = obj.message[0].message;
                           if(result != '') {
                               Ext.Msg.alert("Message", result);
                           } else {
                               me.getView().up('window').close();
                           }
                       }
                   });
               } else {
                   this.lookupReference('errorMsgRef').setValue(errorMsg);
               }
               break;
            case 'Case Management':
                if ((this.lookupReference('referralCombo').getValue()==null) || (this.lookupReference('referralCombo').getValue()=='')){
                    errorMsg = errorMsg + '<font color="red">Please select Referral Reason</font><br/>'
                }
                if (this.lookupReference('caseMgmtUserName').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Name</font><br/>'
                }
                if (this.lookupReference('caseMgmtPhone').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Phone</font><br/>'
                }
                if (this.lookupReference('caseMgmtReason').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please explain Reason for Referral</font><br/>'
                }
                if (errorMsg == ''){
                    var setMemberNotificationDataWebStore = Ext.create('Atlas.portals.provider.model.MemberNotificationDataWeb', {});
                    setMemberNotificationDataWebStore.phantom = false;
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('recipientID', memberDetails.recipientID);
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('notificationType', 'C');
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('Address1', this.lookupReference('memberMgmtAddr1').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('Address2', this.lookupReference('memberMgmtAddr2').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('City', this.lookupReference('memberMgmtCity').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('State', this.lookupReference('stateCombo').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('Zip', this.lookupReference('memberMgmtzip').getValue().replace(/[^a-zA-Z0-9 ]/g, ""));
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('Phone', this.lookupReference('memberMgmtPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""));
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('typeOfAction', '');
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('referralReason', this.lookupReference('referralCombo').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('referredByName', this.lookupReference('memberMgmtUserName').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('referredByPhone', this.lookupReference('memberMgmtPhoneNum').getValue().replace(/[^a-zA-Z0-9 ]/g, ""));
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('referralExplanation', this.lookupReference('caseMgmtReason').getValue());
                    setMemberNotificationDataWebStore.getProxy().setExtraParam('userName', user.un);

                    setMemberNotificationDataWebStore.save({
                        success: function (response, operation, record) {
                            var obj = Ext.JSON.decode(operation._response.responseText),
                                result = obj.message[0].message;
                            if(result != '') {
                                Ext.Msg.alert("Message", result);
                            } else {
                                me.getView().up('window').close();
                            }
                        }
                    });
                } else {
                    this.lookupReference('errorMsgRef').setValue(errorMsg);
                }
                break;
            case 'Behavioral Health':
                if (this.lookupReference('behavioralUserName').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Name</font><br/>'
                }
                if (this.lookupReference('behavioralPhone').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Phone</font><br/>'
                }
                if (this.lookupReference('behavioralMgmtReason').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please explain Reason for Referral</font><br/>'
                }
                if (errorMsg == ''){
                    var setCreateBHTodoStore = Ext.create('Atlas.portals.provider.model.CreateBHTodo', {});
                    setCreateBHTodoStore.phantom = false;
                    pFields = this.lookupReference('memberMgmtAddr1').getValue() + "|" +  //1
                        this.lookupReference('memberMgmtAddr2').getValue() + "|" + //2
                        this.lookupReference('memberMgmtCity').getValue() + "|" +  //3
                        this.lookupReference('stateCombo').getValue() + "|" + //4
                        this.lookupReference('memberMgmtzip').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //5
                        this.lookupReference('memberMgmtPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //6
                        "" + "|" + //contactType //7
                        "" + "|" + //comments //8
                        "" + "|" + //need extra placeholder here so that comments end up in the correct spot //9
                        this.lookupReference('TOABehavioralCombo').getValue() + "|" + //10
                        this.lookupReference('behavioralMgmtReason').getValue() + "|" + //11
                        "" + "|" + //12
                        this.lookupReference('behavioralUserName').getValue() + "|" + //13
                        this.lookupReference('behavioralPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, "");
                    setCreateBHTodoStore.getProxy().setExtraParam('pRecipientID', memberDetails.recipientID);
                    setCreateBHTodoStore.getProxy().setExtraParam('pAddInfo', pFields);
                    setCreateBHTodoStore.getProxy().setExtraParam('pUserName', user.un);

                    setCreateBHTodoStore.save({
                        success: function (response, operation, record) {
                            var obj = Ext.JSON.decode(operation._response.responseText),
                                result = obj.message[0].message,
                                code = obj.message[0].code;
                            if(code == 200) {
                                Ext.Msg.alert("Message", "Your Referral Has Been Sent.");
                            } else {
                                me.getView().up('window').close();
                            }
                        }
                    });
                } else {
                    this.lookupReference('errorMsgRef').setValue(errorMsg);
                }
                break;
            case 'Compliance':
                if (this.lookupReference('complianceUserName').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Name</font><br/>'
                }
                if (this.lookupReference('compliancePhone').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Phone</font><br/>'
                }
                if (this.lookupReference('complianceReason').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please explain Reason for Referral</font><br/>'
                }
                if (errorMsg == ''){
                    var setCONotificationDataStore = Ext.create('Atlas.portals.provider.model.CONotificationData', {});
                    setCONotificationDataStore.phantom = false;
                    pFields = this.lookupReference('memberMgmtAddr1').getValue() + "|" +  //1
                        this.lookupReference('memberMgmtAddr2').getValue() + "|" + //2
                        this.lookupReference('memberMgmtCity').getValue() + "|" +  //3
                        this.lookupReference('stateCombo').getValue() + "|" + //4
                        this.lookupReference('memberMgmtzip').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //5
                        this.lookupReference('memberMgmtPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, "") + "|" + //6
                        "" + "|" + //contactType //7
                        "" + "|" + //comments //8

                        this.lookupReference('TOAComplianceCombo').getValue() + "|" + //10
                        this.lookupReference('complianceReason').getValue() + "|" + //11
                        "" + "|" + //12
                        this.lookupReference('complianceUserName').getValue() + "|" + //13
                        this.lookupReference('compliancePhone').getValue().replace(/[^a-zA-Z0-9 ]/g, "");
                    setCONotificationDataStore.getProxy().setExtraParam('pRecipientId', memberDetails.recipientID);
                    setCONotificationDataStore.getProxy().setExtraParam('pNote', pFields);
                    setCONotificationDataStore.getProxy().setExtraParam('pUserName', user.un);
                    setCONotificationDataStore.getProxy().setExtraParam('pSubject', 'Compliance Notification');
                    setCONotificationDataStore.getProxy().setExtraParam('pReqByName', this.lookupReference('complianceUserName').getValue());
                    setCONotificationDataStore.getProxy().setExtraParam('pReqByPhone', this.lookupReference('compliancePhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""));

                    setCONotificationDataStore.save({
                        success: function (response, operation, record) {
                            var obj = Ext.JSON.decode(operation._response.responseText),
                                result = obj.message[0].message,
                                code = obj.message[0].code;
                            if(code == 200) {
                                Ext.Msg.alert("Message",  "Your Referral Has Been Sent.");
                            } else {
                                me.getView().up('window').close();
                            }
                        }
                    });
                } else {
                    this.lookupReference('errorMsgRef').setValue(errorMsg);
                }
                break;
            case 'Report MCIR ID #':
                if (this.lookupReference('mcirIdNumber').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">MCIR ID Number is required</font><br/>'
                }
                if (this.lookupReference('mcirUserName').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please enter Requested by Name</font><br/>'
                }if (this.lookupReference('mcirPhone').getValue()==''){
                errorMsg = errorMsg + '<font color="red">Please enter Requested by Phone</font><br/>'
                }if (this.lookupReference('mcirReason').getValue()==''){
                    errorMsg = errorMsg + '<font color="red">Please explain Reason for Notification</font><br/>'
                }
                if (errorMsg == ''){
                    var setMCIRNotificationDataStore = Ext.create('Atlas.portals.provider.model.MCIRNotificationData', {});
                    setMCIRNotificationDataStore.phantom = false;
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pRecipientId', memberDetails.recipientID);
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pUserName', user.un);
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pType', 'QM');
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pNote', this.lookupReference('mcirReason').getValue());
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pReqByName', this.lookupReference('mcirUserName').getValue());
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pReqByPhone', this.lookupReference('mcirPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""));
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pRequestDate', Ext.util.Format.date(new Date(), 'm/d/Y'));
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pProvId', 0);
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pMCIRId', this.lookupReference('mcirIdNumber').getValue());
                    setMCIRNotificationDataStore.getProxy().setExtraParam('pLobID', '');

                    setMCIRNotificationDataStore.save({
                        success: function (response, operation, record) {
                            var obj = Ext.JSON.decode(operation._response.responseText),
                                result = obj.message[0].message;
                            if (result == ''){
                                result = 'A MCIR # Notification was created and sent to Meridian<br/>Health Plan for verification. Please allow 3-5 business days<br/>for your request to be processed.';
                                Ext.Msg.alert("MCIR # Notification Created",result);
                                me.getView().up('window').close();
                            }
                            Ext.Msg.alert("Message",result);
                        }
                    });
                } else {
                    this.lookupReference('errorMsgRef').setValue(errorMsg);
                }
                break;
        }
    },

    modifiedZip: function (zip) {
        var modifiedZip = '';
        if (zip.length > 5) {
            modifiedZip = zip.replace(/^(\d{5})(\d{4})$/, '$1-$2');
        } else {
            modifiedZip = zip;
        }
        return modifiedZip;
    },

    modifiedPhone: function (phoneNumber) {
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
    },

    removeErrorMsg: function() {
        this.lookupReference('errorMsgRef').setValue('');
    }
    

});