Ext.define('Atlas.view.auth.HpMemberLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpmemberlogin',

    listen: {
        controller: {
            '*': {
                hpMemberConditionProcessed: 'processConditions'
            }
        }
    },

    onBoxReady: function(){
        var body =  Ext.fly(document.body);
        body.addCls('member-mhp-login');
    },

    onBeforeClose: function(){
        var body =  Ext.fly(document.body);
        body.removeCls('member-mhp-login');
        return true;
    },

    onLogin: function () {
        var credentials = this.getView().down('form').getValues(),
            me = this,
            vm = me.getViewModel(),
            user = {};

        me.updateStatus('working...');

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

                    user.start = vm.get('start');
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
                                user.isPasswordChangeRequired = (user.webStatus == 2);

                                var cookie = Ext.util.Cookies.get(user.recipientId);
                                user.secretQaValidated = (cookie ? cookie.toLowerCase() === 'yes' : false);

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

                                        // need to keep this since we haven't completed authentication yet and Atlas.user is not yet set
                                        vm.set('user', user);

                                        // message returns a blank string if params are bad
                                        if (obj.message.message != '') {
                                            me.updateStatus('Login Successful');

                                            // we need to take care of these four items before sending the user to the portal workspace
                                            me.stepsToDo = [
                                                {
                                                    name: 'Terms and Conditions',
                                                    processCondition: !user.usageConditions,
                                                    screen: 'hpmember-usageconditions',
                                                    viewModel: {
                                                        data: {
                                                            user: user,
                                                            portal: 'hpmember'
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'Validate secret questions',
                                                    processCondition: user.secretQaSetupStatus && !user.secretQaValidated,
                                                    screen: 'hpmember-secretqavalidate',
                                                    viewModel: {
                                                        data: {
                                                            user: user,
                                                            portal: 'hpmember'
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'Setup secret questions',
                                                    processCondition: !user.secretQaSetupStatus,
                                                    screen: 'hpmember-secretqasetup',
                                                    viewModel: {
                                                        data: {
                                                            user: user,
                                                            portal: 'hpmember'
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'Force password change',
                                                    processCondition: user.isPasswordChangeRequired || user.isPasswordExpired,
                                                    screen: 'providerchangepassword',
                                                    viewModel: {
                                                        data: {
                                                            portal: 'hpmember',
                                                            hideCancelButton: true,
                                                            user: user
                                                        }
                                                    }
                                                }
                                            ];

                                            me.getView().hide(); // hide the login dialog
                                            me.processConditions();

                                        } else {
                                            me.updateStatus('Invalid Member ID or Password');
                                        }

                                    },

                                    failure: function (response, opts) {
                                        me.updateStatus('One or more fields are incorrect. Please try again.');

                                    }


                                });

                            } else {
                                var result = obj.metadata.pResult,
                                    notActivated = 'Required to activate Member Portal by clicking on the link sent to your email during registration process.',
                                    notEnrolled = 'Member currently not enrolled in our plan. Please call Member Services at 1-888-437-0606. Thank you.';

                                if (result && (result == notActivated || result == notEnrolled)) {
                                    me.updateStatus(result);
                                }
                                else {
                                    me.updateStatus('One or more fields are incorrect. Please try again.');
                                }
                            }

                        }
                    });
                } else if (obj.data[0].value.toLowerCase() === 'error - member not found.') {
                    me.updateStatus('One or more fields are incorrect. Please try again.');
                } else {
                    me.updateStatus('One or more fields are incorrect. Please try again.');
                }
            },

            failure: function (response, opts) {
                me.updateStatus('One or more fields are incorrect. Please try again.');

            }
        });
    },

    processConditions: function(){
        var me = this,
            user = me.getViewModel().get('user');

        if (me.stepsToDo.length == 0) {
            me.proceedToWorkspace(user);
        } else {
            var step = me.stepsToDo.pop(),
                viewModel = step.viewModel ? step.viewModel : null,
                itemConfig = step.itemConfig ? step.itemConfig : null;

            if (step.processCondition) {
                Ext.create({
                    xtype: step.screen,
                    layout: 'fit',
                    tempUser: user,
                    viewModel: viewModel,
                    itemConfig: itemConfig
                }).show();
            }
            else {
                me.processConditions();
            }
        }
    },

    proceedToWorkspace: function (user) {
        var me = this;

        //call validate to get more info
        me.fireEvent('validatesession', user);
        me.getView().close();
    },

    onForgot: function () {
        // check to make sure the user has entered their member id and selected the state
        var formValues = this.getView().down('form').getValues();

        if (formValues.stateCombo && formValues.un) {
            Ext.create('Atlas.view.auth.HpMemberPassword',{
                viewModel: {
                    data: {
                        username: formValues.un,
                        userState: formValues.stateCombo
                    }
                }
            });
        }
        else {
            Ext.Msg.alert('Forgot Password', 'Please enter your member ID and select your state to begin the password reset process.');
        }
    },

    onRegister: function () {
        Ext.create('Atlas.portals.view.registration.MemberMHPRegistration').show();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    },

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

        this.getView().center();
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
            this.getPlanNames();
            plans.show();
            cards.show();
            servicesNum.setHtml('Member Services: 888-437-0606');
        }

        this.getView().center();
    }
});



