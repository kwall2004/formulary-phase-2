Ext.define('Atlas.view.auth.HpProviderTermsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providertermscontroller',

    onAcceptClick: function() {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/provideradminterm/update',
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
                var obj = Ext.decode(response.responseText);

                user.adminTerm = true;
                me.fireEvent('hpMemberConditionProcessed', user);
                me.getView().close();
            }
        });
    },

    onDenyClick: function() {
        var me = this,
            user = me.getViewModel().get('user');

        Ext.Msg.alert('Terms and Conditions', 'You are responsible for contacting your Network Development Specialist of any terminated user accounts.', function(){
            me.fireEvent('hpMemberConditionProcessed', user);
            me.getView().close();
        });
    }
});