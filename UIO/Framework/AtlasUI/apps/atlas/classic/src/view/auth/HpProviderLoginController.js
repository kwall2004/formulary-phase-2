Ext.define('Atlas.view.auth.HpProviderLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpproviderlogin',

    listen: {
        controller: {
            '*': {
                hpMemberConditionProcessed: 'processConditions',
                hpMemberRestartLogin: 'restartLogin'
            }
        }
    },

    stepsToDo: [],

    onBoxReady: function () {
        var body = Ext.fly(document.body);
        body.addCls('provider-mhp-login');
    },

    onBeforeClose: function () {
        var body = Ext.fly(document.body);
        body.removeCls('provider-mhp-login');
        return true;
    },

    restartLogin: function () {
        var me = this,
            vm = me.getViewModel();
        me.stepsToDo = [];
        me.updateStatus(vm.initialConfig.data.status);
        me.getView().show(); // show the login dialog
    },

    onLogin: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.getView().down('form'),
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
            credentials = form.getValues();

        if (this.lookup('stateCombo').value === null) {
            Ext.Msg.alert('Error','Please select a state from the dropdown.');
            return false;
        }

        if (form.isValid()) {
            me.updateStatus('working...');

            var user = {},
                authUrl = Atlas.apiURL + 'eligibility/hp/userinfoweb/read';

            user.start = vm.get('start');
            user.memberId = credentials.un;

            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: authUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pUserName: credentials.un,
                    pPassword: Ext.util.Base64.encode(credentials.pwd),
                    pUserIPaddress: 'test',
                    pBrowserName: 'test',
                    pBrowserVersion: 'test',
                    pScreenResolutionWidth: 'test',
                    pScreenResolutionHeight: 'test',
                    pOperatingSystem: 'test',
                    userState: me.lookup('stateCombo').value
                }),
                success: function (response, opts) {
                    var returnFields = Ext.decode(response.responseText);

                    if (returnFields.data[0].value != '') {
                        user.un = returnFields.data[0].value;
                        user.password = returnFields.data[1].value;
                        user.userGroupId = returnFields.data[2].value;
                        user.userAuthLevel = returnFields.data[4].value;
                        user.hpmEmployee = returnFields.data[5].value;
                        user.pcpOffice = returnFields.data[6].value;
                        user.specialistOffice = returnFields.data[7].value;
                        user.defaultMenu = returnFields.data[8].value;
                        user.authUpdate = returnFields.data[9].value;
                        user.hedisPopulation = returnFields.data[10].value;
                        user.answeringServiceUser = returnFields.data[11].value;
                        user.planId = returnFields.data[12].value;
                        user.theme = returnFields.data[13].value;
                        user.newUser = (returnFields.data[14].value.toLowerCase() !== 'no');
                        user.secretQaSetupStatus = (returnFields.data[15].value.toLowerCase() !== 'no');
                        user.adminUser = (returnFields.data[16].value.toLowerCase() !== 'no');
                        user.webSuperUser = returnFields.data[17].value;
                        user.adminTerm = (returnFields.data[18].value.toLowerCase() !== 'no');
                        user.providerType = returnFields.data[19].value;
                        user.phoCapitated = returnFields.data[20].value;
                        user.dmcPendedClaimsFlag = returnFields.data[21].value;
                        user.providerGroupType = returnFields.data[22].value;
                        user.firstName = returnFields.data[23].value;
                        user.lastName = returnFields.data[24].value;
                        user.sessionId = returnFields.data[25].value;
                        user.providerStateSelected = me.lookup('stateCombo').value; 

                        me.finishLogin(user, returnFields);
                    } else {
                        me.updateStatus('Invalid Username or Password');
                    }
                }
            });
        }
    },

    finishLogin: function (user, returnFields) {
        var me = this,
            vm = me.getViewModel(),
            form = me.getView().down('form'),
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
            credentials = form.getValues();

        user.homeState = user.providerStateSelected;
        user.portalStateSelected = user.providerStateSelected;

        /*
         * TO-DO: Refactor userState to use the same parameter across all portal
         */

        user.isPasswordExpired = returnFields.metadata.passwordExpired;
        user.isPasswordChangeRequired = user.newUser;

        var cookie = Ext.util.Cookies.get(user.un);
        user.secretQaValidated = (cookie ? cookie.toLowerCase() === 'yes' : false);

        if (user.username !== null) {
            if ((user.hpmEmployee !== null && (user.hpmEmployee.toLowerCase() === "yes" || user.hpmEmployee.toLowerCase() === "y")) && (user.answeringServiceUser !== null && (user.answeringServiceUser.toLowerCase() === "yes" || user.answeringServiceUser.toLowerCase() === "y"))) {
                user.helpFileName = "MDC_for.chm";
            } else if (user.hpmEmployee !== null && (user.hpmEmployee !== "yes" || user.hpmEmployee !== "y")) {
                user.helpFileName = "MCS.chm"
            } else {
                user.helpFileName = "MCS_System_User_Guide_-_External.chm"
            }
        }

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/usersetupweb/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                pUserName: user.un,
                userState: user.providerStateSelected
            }),
            success: function (response, opts) {
                var returnFields = Ext.decode(response.responseText),
                    userPreferences = '';

                if (!returnFields || !returnFields.metadata || !returnFields.metadata.pFields) {
                    user.userPreferences = {};
                    me.fireEvent('validatesession', user);
                    me.getView().close();
                    return;
                }

                userPreferences = returnFields.metadata.pFields.split('|');
                user.userPreferences = {
                    providerGroupId: userPreferences[0],
                    providerGroupDesc: userPreferences[1],
                    firstName: userPreferences[2],
                    lastName: userPreferences[3],
                    address1: userPreferences[4],
                    address2: userPreferences[5],
                    city: userPreferences[6],
                    state: userPreferences[7],
                    zip: userPreferences[8],
                    email: userPreferences[9],
                    homePhone: userPreferences[10],
                    fax: userPreferences[11],
                    theme: userPreferences[12],
                    activate: (userPreferences[13].toLowerCase() !== "no"),
                    phone: userPreferences[14],
                    cell: userPreferences[15],
                    ext: userPreferences[16],
                    adminUser: userPreferences[17],
                    defaultReportOutput: userPreferences[18],
                    createWebMessage: userPreferences[19],
                    providerType: userPreferences[20],
                    providerGroupType: userPreferences[21]
                };

                // get the secret question ids
                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    withCredentials: true,
                    paramsAsJson: true,
                    noCache: false,
                    url: Atlas.apiURL + 'system/hp/userdataweb/read',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        pSessionID: user.sessionId,
                        userState: user.providerStateSelected,
                        pUserName: user.un,
                        pFieldList: 'questionID1,questionID2'
                    }),
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText),
                            questions = obj.metadata.pFields.split('|'); // if no questions will be '|'

                        var secretQIDs = {
                            secretQaSetupId1: parseInt(questions[0]),
                            secretQaSetupId2: parseInt(questions[1])
                        };

                        user = Ext.merge({}, secretQIDs, user);

                        // need to keep this since we haven't completed authentication yet and Atlas.user is not yet set
                        vm.set('user', user);

                        // adding stuff to support post login activities
                        // we need to take care of these items before sending the user to the portal workspace
                        me.stepsToDo = [
                            {
                                name: 'Terms and Conditions',
                                processCondition: user.adminUser && !user.adminTerm,
                                screen: 'hpprovider-terms',
                                viewModel: {
                                    data: {
                                        user: user,
                                        portal: 'hpprovider'
                                    }
                                }
                            },
                            {
                                name: 'Validate Secret Questions',
                                processCondition: user.secretQaSetupStatus && !user.secretQaValidated,
                                screen: 'hpmember-secretqavalidate',
                                viewModel: {
                                    data: {
                                        user: user,
                                        portal: 'hpprovider'
                                    }
                                }
                            },
                            {
                                name: 'Setup Secret Questions',
                                processCondition: !user.secretQaSetupStatus,
                                screen: 'hpmember-secretqasetup',
                                viewModel: {
                                    data: {
                                        user: user,
                                        portal: 'hpprovider'
                                    }
                                }
                            },
                            {
                                name: 'Secret QA Instructions',
                                processCondition: !user.secretQaSetupStatus,
                                screen: 'hpprovider-secretqainstructions'
                            },
                            {
                                name: 'Force password change',
                                processCondition: user.isPasswordChangeRequired || user.isPasswordExpired,
                                screen: 'providerchangepassword',
                                viewModel: {
                                    data: {
                                        user: user,
                                        portal: 'hpprovider',
                                        hideCancelButton: true
                                    }
                                }
                            }
                        ];

                        me.getView().hide(); // hide the login dialog
                        me.processConditions();

                    }
                });
            }
        });
    },

    // supporting post login activities
    processConditions: function () {
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

    // supporting post login activities
    proceedToWorkspace: function (user) {
        var me = this;

        //call validate to get more info
        me.fireEvent('validatesession', user);
        me.getView().close();
    },

    onForgot: function () {
        Ext.create('Atlas.view.auth.HpProviderPassword', {
            viewModel: {
                data: {
                    username: this.getView().down('form').getValues().un
                }
            }
        });

    },

    onRegister: function () {
        var me = this;
        Ext.MessageBox.show({
            title: 'State Selection',
            msg: 'Please choose the servicing state for this registration. <br /><br /><select id="stateListComboProvider"><option>MI</option><option>IL</option></select>',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            modal: true,

            callback: function (btn) {
                if (btn === 'ok') {
                    Ext.create({
                        xtype: 'hpproviderregistration',
                        viewModel: {
                            data: {
                                userState: Ext.get('stateListComboProvider').getValue()
                            }
                        }
                    }).show();
                }
            }
        });
    },

    updateStatus: function (status) {
        this.getViewModel().set('status', status);
    }

});