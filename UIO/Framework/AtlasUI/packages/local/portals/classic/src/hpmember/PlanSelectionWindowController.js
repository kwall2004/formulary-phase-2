Ext.define('Atlas.portals.hpmember.PlanSelectionWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planselectionwindow',

    getPlanNames: function () {
        var me = this,
            planStore = this.getViewModel().getStore('planstore');
        // request to get the list of possible plans
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/listitems/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'MemberPortalPlanLOB',
                userState: 'MI'
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                // console.dir(obj);
                if (!!obj.metadata.pListItems) { //obj.success
                    var planArray = obj.metadata.pListItems.split('^'),
                        plans = [];

                    for (var i = 0; i < planArray.length; i+=2) {
                        plans.push({
                            name: planArray[i],
                            value: planArray[i+1]
                        });
                    }

                    planStore.getProxy().setData(plans);
                    planStore.reload();

                } else {
                    me.updateStatus(obj.message[0].message);
                }

            }
        });
    },

    loginUser: function () {
        var credentials = this.getViewModel().get('credentials'),
            me = this.getViewModel().get('loginwindow'),
            planWindow = this,
            user = {};

        user.portalStateSelected = this.lookup('stateCombo').getValue();

        if (user.portalStateSelected == 'MI') {
            user.portalPlanId = this.lookup('planCombo').getValue();
        } else {
            user.portalPlanId = 'MHP';
        }

        // call to get the users recipient ID
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/portalmemberfuncs/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pFunction: 'fGetRecipientID',
                pMemberID: credentials.un,
                pPortalPlan: user.portalPlanId,
                pPortalType: 'Member',
                userState: user.portalStateSelected
                // Ext.util.Base64.encode(credentials.pwd)
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.data[0].value.toLowerCase().indexOf('error') == -1) { //obj.success

                    user.start = me.getViewModel().get('start');
                    user.memberId = credentials.un;
                    user.recipientId = obj.data[0].value;
                    // me.setUser(user);

                    // call to authenticate the user
                    Ext.Ajax.request({
                        useDefaultXhrHeader: false,
                        withCredentials: true,
                        paramsAsJson: true,
                        noCache: false,
                        url: Atlas.apiURL + 'portal/hp/authenticatememberinfoweb/read',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: Ext.JSON.encode({
                            pRecipientID: user.recipientId,
                            pPassword: Ext.util.Base64.encode(credentials.pwd),
                            userState: user.portalStateSelected
                        }),
                        success: function (response, opts) {
                            var obj = Ext.decode(response.responseText);

                            if (obj.data[0].value != '') { //obj.success
                                var memberDataFieldList = 'middleName,birthDate,@enrollmentStatus,@PCP,@familyList,' +
                                    '@contCoverageSince,@contCoverageTerm,homePhone.contactInfo,@PCPPhone,' +
                                    'SystemID,@PCPauthfax,@hedis,home.countyCode,@memberLanguage,caseNumber,' +
                                    'socSecNum,home.Address1,home.Address2,home.City,home.State,home.Zip,Homephone.contactinfo,' +
                                    'WorkPhone.contactInfo,Cell.contactInfo,eMail.contactinfo,resp.Address1,resp.Address2,' +
                                    'resp.City,resp.State,resp.Zip,respHomePhone.contactInfo,respWorkPhone.contactInfo,' +
                                    '@lastPcpVisit,@dispMemberID,@Age,@policySeqNum,@subscriberId,@primaryLOB,@isHealthyMI,' +
                                    '@isMIHealthLink,@enableOnlineBilling,@familyListUnder18,@benefitPlanCode, @benefitPlanCodeDesc,' +
                                    '@benefitPlanCodeShortDesc,@enableViewPocketCosts,@enableDiseaseManagement,@enableWellness'+
                                    '@SmsId,@SmsNumber,@smsOptOutFlag,@SmsContPrefOrdList,unsubscribeEmail';

                                // sets more attributes to our user object
                                user.lastName = obj.data[1].value;
                                user.firstName = obj.data[2].value;
                                user.gender = obj.data[3].value;
                                user.FamilyId = obj.data[4].value;
                                user.secretQaSetupStatus = (obj.data[5].value.toLowerCase() === 'yes');
                                user.secretQaSetupId1 = obj.data[6].value;
                                user.secretQaSetupId2 = obj.data[7].value;
                                user.answer1 = obj.data[8].value;
                                user.answer2 = obj.data[9].value;
                                // webStatus values:
                                // 0: Not a registered Member Portal user
                                // 1: Required to activate Member Portal by clicking on the link sent to your email during registration process.
                                // 2: Password change required
                                user.webStatus = obj.data[10].value;
                                user.sessionId = obj.data[11].value;
                                user.usageConditions = (obj.data[12].value.toLowerCase() === 'true');
                                user.isPasswordExpired = obj.metadata.passwordExpired;

                                // call to get the rest of the memberdata to be used throughout the app
                                Ext.Ajax.request({
                                    useDefaultXhrHeader: false,
                                    withCredentials: true,
                                    paramsAsJson: true,
                                    noCache: false,
                                    url: Atlas.apiURL + 'eligibility/hp/memberdataweb/read',
                                    //url: 'http://MICAGW01-SVA:8080/atlas/eligibility/hp/memberdataweb/read',
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    params: Ext.JSON.encode({
                                        pSessionID: user.sessionId,
                                        pRecipientID: user.recipientId,
                                        pFieldList: memberDataFieldList,
                                        portalPlan: user.portalPlanId,
                                        userState: user.portalStateSelected
                                    }),
                                    success: function (response, opts) {
                                        var obj = Ext.decode(response.responseText),
                                            str = JSON.stringify(obj.data[0]);
                                        str = str.replace(/@|\./g, '');

                                        var converted = JSON.parse(str);

                                        // convert ^ separated strings to real objects
                                        converted.familyList = Atlas.common.Util.parseCaretDelimitedNameValuePairs(converted.familyList);
                                        converted.familyListUnder18 = Atlas.common.Util.parseCaretDelimitedNameValuePairs(converted.familyListUnder18);


                                        // merges our user object with the returned data
                                        user = Ext.merge({}, converted, user);
                                        user = Ext.merge({}, obj.metadata, user);

                                        // message returns a blank string if params are bad
                                        if (obj.message.message != '') {
                                            me.updateStatus('Login Successful');
                                            //call validate to get more info
                                            me.fireEvent('validatesession', user);
                                            me.getView().close();
                                            planWindow.getView().close();
                                        } else {
                                            me.updateStatus('Invalid Member ID or Password');
                                            planWindow.getView().close();
                                        }

                                    }
                                });

                            } else {
                                me.updateStatus('Invalid Member ID or Password');
                                planWindow.getView().close();
                            }

                        }
                    });
                } else {
                    me.updateStatus('Invalid Member ID or Password');
                    planWindow.getView().close();
                }
            }
        });
    },

    onCancel: function () {
        var loginWindow = this.getViewModel().get('loginwindow');

        loginWindow.updateStatus('Please enter information');
        this.getView().close();
    },

    hidePlanSelect: function () {
        var stateSelected = this.lookup('stateCombo').getValue(),
            plans = this.lookup('planCombo'),
            cards = this.lookup('cardContainerRef'),
            servicesNum = this.lookup('servicesNumContainer');

        if (stateSelected == 'IL') {
            plans.hide();
            cards.hide();
            servicesNum.setHtml('Member Services: 866-606-3700');
        } else {
            plans.show();
            cards.show();
            servicesNum.setHtml('Member Services: 888-437-0606');
        }
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    },

    showPlanCard: function (one, record) {
        var cardContainer = this.lookup('cardContainerRef');
        cardContainer.setHidden(false);

        switch(record.get('value')) {
            case "AdvPlus":
                cardContainer.setHtml('<img src="resources/images/cards/AdvPlus.png" style="width: 280px; height: 180px">');
                break;
            case "HealthyMI":
                cardContainer.setHtml('<img src="resources/images/cards/HealthyMI.png" style="width: 280px; height: 180px">');
                break;
            case "MAdvantage":
                cardContainer.setHtml('<img src="resources/images/cards/MAdvantage.png" style="width: 280px; height: 180px">');
                break;
            case "MChoice":
                cardContainer.setHtml('<img src="resources/images/cards/MChoice.png" style="width: 280px; height: 180px">');
                break;
            case "MHP":
                cardContainer.setHtml('<img src="resources/images/cards/MHP.png" style="width: 280px; height: 180px">');
                break;
            case "MPrime":
                cardContainer.setHtml('<img src="resources/images/cards/MPrime.png" style="width: 280px; height: 180px">');
                break;
            case "MIHealthLink":
                cardContainer.setHtml('<img src="resources/images/cards/MIHealthLink.png" style="width: 280px; height: 180px">');
                break;
        }
    }

});


