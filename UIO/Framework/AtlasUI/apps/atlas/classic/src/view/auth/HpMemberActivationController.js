/**
 * Created by b6636 on 1/3/2017.
 */
Ext.define('Atlas.view.auth.HpMemberActivationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpmemberactivation',

    init: function() {
        var vm = this.getViewModel();
        vm.set('hiddenForIL', true);
        vm.set('memberCardHidden', true);
    },

    onActivate: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.lookupReference('activateForm'),
            formValues = form.getValues(),
            activationCode = vm.get('activationCode'),
            email = vm.get('email'),
            pActivationCode = activationCode + '|' + email;

        if (form.isValid()) {
            var userState = formValues.stateCombo;
            if (me.getRecipientId(formValues.memberId, formValues.planList, formValues.memberDOB, formValues.stateCombo)) {
                var lobStore = Ext.create('Atlas.portals.hpmember.model.MemberLobList'),
                    proxy = lobStore.getProxy(),
                    pRecipientId = vm.get('recipientId');

                proxy.setExtraParam('pRecipientID', pRecipientId);
                proxy.setExtraParam('userState', userState);
                lobStore.load({
                    callback: function (records, operations, success) {
                        var primaryLOB = '',
                            result = Ext.decode(operations.getResponse().responseText);

                        if (result.success) {
                            primaryLOB = result.metadata.pLOBList.split(',')[0];
                        }

                        Ext.Ajax.request({
                            useDefaultXhrHeader: false,
                            withCredentials: true,
                            paramsAsJson: true,
                            noCache: false,
                            url: Atlas.apiURL + 'portal/hp/memberactivation/update',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: Ext.JSON.encode({
                                pRecipientID: pRecipientId,
                                pActivationCode: pActivationCode,
                                pLobID: primaryLOB,
                                userState: userState
                            }),
                            success: function (response, opts) {
                                var obj = Ext.decode(response.responseText),
                                    result = obj.data[0].pResult,
                                    message = obj.message[0].message;

                                if (result == '200' && message.toLowerCase() == 'success') {
                                    Ext.Msg.alert('Member Account Activated',
                                        'Please proceed to login using the initial password sent to you in your email during registration.',
                                        function() {
                                            // clear the url
                                            history.pushState('', document.title, window.location.pathname);
                                            // force the user to login
                                            me.fireEvent('login');
                                            // close the activation window
                                            me.getView().close();
                                        });
                                }
                                else {
                                    vm.set('errorMessage', message);
                                }
                            },
                            failure: function (response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            }
                        });
                    }
                });
            }
        }
    },

    getListItems: function () {
        var me = this,
            vm = me.getViewModel(),
            listItemsStore = vm.getStore('listItems');

        listItemsStore.getProxy().setExtraParam('pListName', 'MemberPortalPlanLOB');
        listItemsStore.getProxy().setExtraParam('userState', 'MI');

        listItemsStore.load({
            callback: function (response, operation) {
                var listItemsMetaData = listItemsStore.getProxy().getReader().metaData,
                    listItems = listItemsMetaData.pListItems.split('^'),
                    listItemsObj = [],
                    planCombo = me.lookupReference('planList'),
                    planListStore = new Ext.data.Store({
                        fields: [
                            'planList'
                        ]
                    });

                for (var i = 0; i < listItems.length; i += 2) {
                    listItemsObj.push({name: listItems[i], value: listItems[i + 1]});
                }

                planListStore.loadData(listItemsObj);
                planCombo.setStore(planListStore);
            }
        });
    },

    onPlanChange: function (sender, newValue, oldValue) {
        var me = this,
            vm = me.getViewModel(),
            planImage = me.lookupReference('planImage');

        if (newValue) {
            planImage.setSrc('resources/images/cards/' + newValue + '.png');
            vm.set('memberCardHidden', false);
        }
        else {
            planImage.setSrc(null);
            vm.set('memberCardHidden', true);
        }
    },

    getRecipientId: function (memberId, portalPlan, memberDOB, userState) {
        var me = this,
            vm = me.getViewModel(),
            response = Ext.Ajax.request({
                async: false,
                withCredentials: true,
                useDefaultXhrHeader: false,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'portal/hp/portalmemberfuncs/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pFunction: 'fGetRecipientID',
                    pMemberID: memberId,
                    pMemberDOB: memberDOB,
                    pPortalPlan: portalPlan,
                    pPortalType: 'Member',
                    userState: userState
                })
            });

        var obj = Ext.decode(response.responseText),
            result = obj.data[0].value;

        if (result.toUpperCase().indexOf('ERROR') > -1) {
            // there was an error
            vm.set('errorMessage', result);
            return false;
        }
        else {
            vm.set('recipientId', result);
            vm.set('errorMessage', '');
            return true;
        }
    },

    onClear: function() {
        var me = this,
            form = me.lookupReference('activateForm');

        form.reset();
    },

    hidePlanSelect: function () {
        var me = this,
            vm = me.getViewModel(),
            stateSelected = this.lookup('stateCombo').getValue(),
            planSelected = this.lookup('planList').getValue();

        vm.set('hiddenForIL', stateSelected == 'IL');
        vm.set('memberCardHidden', stateSelected == 'IL' || !(planSelected));
    }
});
