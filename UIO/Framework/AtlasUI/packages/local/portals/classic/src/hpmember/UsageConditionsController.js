Ext.define('Atlas.portals.view.hpmember.UsageConditionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usageconditionscontroller',

    init: function() {
        var vm = this.getViewModel(),
            user = vm.get('user');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/usageconditionlist/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pUserType: 'Member',
                userState: user.portalStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText),
                    winContractsDetail,
                    conditionList = obj.data;

                vm.set('conditionDescription', conditionList[0].longDesc);
                vm.set('conditionUrl', conditionList[0].url);
                vm.set('conditionList', conditionList);
                vm.set('isIAgreeDisabled', true);
            }
        });
    },

    onPrivacyAndTermsChange: function(sender, newValue, oldValue) {
        var vm = this.getViewModel();
        vm.set('isIAgreeDisabled', !sender.checked); // sender won't be checked until after this event fires
    },

    onOkClick: function() {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user'),
            conditionList = vm.get('conditionList'),
            conditions = [];

        conditionList.forEach(function(value, index, array){
            conditions.push(value.usageConditionID);
        });

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/usageconditiondata/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                pUserType: 'Member',
                pUserName: user.recipientId,
                userState: user.portalStateSelected,
                pUsageConditionIDs: conditions.join(',')
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                user.usageConditions = true;
                me.fireEvent('hpMemberConditionProcessed', user);
                me.getView().close();
            }
        });
    },

    onCancelClick: function() {
        this.fireEvent('logout');
    }
});