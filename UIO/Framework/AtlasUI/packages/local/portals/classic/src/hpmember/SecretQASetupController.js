Ext.define('Atlas.portals.view.hpmember.SecretQASetupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.secretqasetupcontroller',

    init: function() {
        // we can possibly get here before the workspace has loaded and the extra Atlas properties are populated
        if (Atlas.common.data.proxy.Layer7.prototype.config.extraParams.userState == undefined) {
            // we are here before the extraParams have been populated
            var me = this,
                vm = me.getViewModel(),
                user = vm.get('user'),
                secretQuestionStore  = this.getStore('secretQuestions');

            secretQuestionStore.getProxy().setExtraParams({
                userState: user.portalStateSelected,
                pSessionID: user.sessionId,
                pSessionId: user.sessionId
            })
        }
    },

    onSaveClick: function () {
        var me = this,
            vm = this.getViewModel(),
            user = vm.get('user'),
            portal = vm.get('portal'),
            form = me.lookupReference('secretQAFrom').getForm(),
            values = form.getValues(),
            sameQuestions = false,
            cookieName = user.recipientId, // defaulting to values for hpmember
            saveUrl = 'portal/hp/memberprofileweb/update'; // defaulting to values for hpmember

        if (form.isValid()) {
            if (values.q1 === values.q2) {
                form.markInvalid([{
                    field: 'q2',
                    message: 'Question #1 & #2 cannot be the same. Please select different questions.'
                }])
            }
            else {
                var params = {},
                    pFields = [values.q1, values.q2, Ext.util.Base64.encode(values.a1.trim().toLowerCase()), Ext.util.Base64.encode(values.a2.trim().toLowerCase()), true];

                if (portal == 'hpmember'){
                    cookieName = user.recipientId; // defaulting to values for hpmember
                    saveUrl = 'portal/hp/memberprofileweb/update'; // defaulting to values for hpmember
                    params = {
                        pSessionID: user.sessionId,
                        pRecipientID: user.recipientId,
                        pFieldList: 'questionID1,questionID2,answer1,answer2,secretQAstatus',
                        pFields: pFields.join('|'),
                        userState: user.portalStateSelected
                    };
                }
                else if (portal == 'hpprovider') {
                    cookieName = user.un;
                    saveUrl = 'system/hp/userdataweb/update';
                    params = {
                        pSessionID: user.sessionId,
                        pRecipientID: user.recipientId,
                        pUserName: user.un,
                        pFieldList: 'questionID1,questionID2,answer1,answer2,secretQASetupSTatus',
                        pFields: pFields.join('|'),
                        userState: user.portalStateSelected
                    };
                }

                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    withCredentials: true,
                    paramsAsJson: true,
                    noCache: false,
                    url: Atlas.apiURL + saveUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(params),
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);

                        // Save cookie to remember user
                        if (form.getValues().remember){
                            var expDate = new Date();
                            expDate.setYear(expDate.getFullYear() + 10);
                            Ext.util.Cookies.set(cookieName, 'yes', expDate);
                        }

                        me.fireEvent('hpMemberConditionProcessed');
                        me.getView().close();
                    }
                });
            }
        }

    },

    onClearClick: function () {
        var me = this,
            form = me.lookupReference('secretQAFrom').getForm();

        form.reset();
    },

    onCancelClick: function() {
        this.getView().close();
    }
});