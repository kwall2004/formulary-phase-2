/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Home
 * Description: Controller for the Home Page
 */
Ext.define('Atlas.portals.view.hpmember.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsMemberMHPMainController',

    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid',
                changePassword: 'onChangePassword'
            }
        }
    },

    usageConditionsWindow: {},
    secretQAWindow: {},
    checkSecretQAWindow: {},

    onAuthValid: function () {
        this.dispMemberName();
        this.dispMemberMessage();
        this.dispFluDialog();
    },

    dispMemberName: function () {
        var user = Ext.first('viewport').getViewModel().get('user'),
            displayName = '<h2> Hello ' + user.firstName + ' ' + user.lastName + ',</h2>';

        this.lookupReference('memberNameRef').setValue(displayName);
    },

    dispMemberMessage: function () {
        var displayMessage = '';
        var user = Ext.first('viewport').getViewModel().get('user');
        welcomeMessageStore = this.getViewModel().getStore('welcomeMessageStore');
        welcomeMessageStore.getProxy().setExtraParam('pFunction', "instantiate");
        welcomeMessageStore.getProxy().setExtraParam('pRole', "memberPortal");
        welcomeMessageStore.getProxy().setExtraParam('pPlan', '');
        welcomeMessageStore.getProxy().setExtraParam('pLobID', '');
        welcomeMessageStore.getProxy().setExtraParam('pBenefitPlanCode', '');
        welcomeMessageStore.getProxy().setExtraParam('pDataName', '');
        welcomeMessageStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        welcomeMessageStore.load({
            scope: this,
            failure: function (record, operation) {
                Ext.Msg.alert('Failure', 'Display Member message error, Please contact admin.');

            },
            success: function (record, operation) {

            },
            callback: function (records, operation, success) {
                var displaymessage = '';
                for (var i = 0; i < records.length; i++) {
                    if (records[i].data.dataName == 'portalWelcome') {
                        displaymessage = records[i].data.dataValue;
                    }
                }
            }
        });
    },

    dispFluDialog: function(){
        var  user = Ext.first('viewport').getViewModel().get('user'),
            month = new Date().getMonth(),
            userplan = user.portalPlanId,
            userselectedPlan = 'Meridian Health Plan';
        if (userplan == 'AdvPlus'){
            userselectedPlan = 'Advantage Plus';
        } else if (userplan == 'HealthyMI'){
            userselectedPlan = 'Healthy Michigan Plus';
        } else if (userplan == 'MAdvantage'){
            userselectedPlan = 'Meridian Advantage';
        } else if (userplan == 'MChoice'){
            userselectedPlan = 'Meridian Choice';
        } else if (userplan == 'MPrime'){
            userselectedPlan = 'Meridian Prime';
        } else if (userplan == 'MIHealthLink'){
            userselectedPlan = 'MI Health Link';
        }

        if(month >=9 || month <=3) {
            if (user.portalStateSelected == 'MI') {
                Ext.Msg.alert('Flu Shots Reminder', 'Please remember to get a flu shot. Flu shots are available at no cost to ' + userselectedPlan + ' members. \nFor more information about flu shots, call your PCP or visit www.michigan.gov/flu.');
            } else {
                Ext.Msg.alert('Flu Shots Reminder', 'Please remember to get a flu shot. Flu shots are available at no cost to ' + userselectedPlan + ' members. \nFor more information about flu shots, call your PCP.');
            }
        }
    },

    onChangeSettingsClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_MemberProfile', null);
    },

    onRequestCardClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_RequestIdCard', null);
    },

    onFindProvidersClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_ProviderSearch', null);
    },

    onCompleteHRAClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_HealthRiskAssessment', null);
    },

    onRequestPHIClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_RequestPHI', null);
    },

    onViewHealthServicesClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_ServicesNeeded', null);
    },

    onRequestHandbookClick: function() {
        this.fireEvent('openView','hpmember','portals','hpmember_RequestMemberHandbook', null);
    },

    onChangePassword: function(hideCancelButton) {
        var changePasswordWindow = new Atlas.portals.view.provider.admin.ChangePassword({
            viewModel: {
                data: {
                    portal: 'hpmember',
                    hideCancelButton: hideCancelButton,
                    user: Atlas.user
                }
            }
        });
        changePasswordWindow.show();
    }
});