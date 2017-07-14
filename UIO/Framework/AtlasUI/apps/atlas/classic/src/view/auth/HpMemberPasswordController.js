Ext.define('Atlas.view.auth.HpMemberPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpmemberpassword',

    initViewModel: function () {
        if (this.getView().getViewModel().get('username')) {
            this.doProcess(this.getView().getViewModel().get('username'));
        }
    },

    onReset: function () {
        var form = this.lookupReference('resetForm'),
            params = form.getValues(),
            me = this,
            vm = me.getViewModel(),
            userState = vm.get('userState');

        if (!form.isValid()) { return; }
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/forgotpasswordmember/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pRecipientID: params.userId,
                pAnswer1: Ext.util.Base64.encode(params.answer1.trim().toLowerCase()),
                pAnswer2: Ext.util.Base64.encode(params.answer2.trim().toLowerCase()),
                userState: userState
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                if (!obj.data || obj.data.length === 0) {
                    me.updateStatus(obj.message[0].message);
                    me.resetForm();
                    return;
                }

                if (obj.data[0].pResult.indexOf('incorrect') >= 0) {
                    me.resetForm();
                    me.updateStatus(obj.data[0].pResult);
                    return;
                }

                Ext.Msg.alert('Message', obj.data[0].pResult, function() {
                    me.resetForm();
                    //me.fireEvent('hpMemberConditionProcessed');
                    me.getView().destroy();
                });
            }
        });
    },

    resetForm: function() {
        var answer1 = this.lookupReference('answer1');

        this.lookupReference('answer1').setValue('');
        this.lookupReference('answer2').setValue('');
        answer1.focus();
    },

    doProcess: function(memberId) {
        var me = this,
            vm = me.getViewModel(),
            userState = vm.get('userState');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'member/hp/memberfuncs/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pFunction: 'fGetRecipientID',
                pPlanID: '',
                pLobID: '',
                pRecipientID: '',
                pMemberID: memberId,
                userState: userState
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                if (!obj.metadata.pRetValue) {
                    me.updateStatus(obj.message[0].message);
                    me.resetForm();
                    return;
                }

                me.lookupReference('userId').setValue(obj.metadata.pRetValue);
                me.getDetails(obj.metadata.pRetValue);
            }
        });
    },

    getDetails: function(userId) {
        var me = this,
            vm = me.getViewModel(),
            userState = vm.get('userState');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/membersecretqaweb/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pRecipientID: userId,
                userState: userState
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText),
                    qId1 = '',
                    qId2 = '',
                    values = [];

                if (!obj.metadata.pFields) {
                    var message = 'There was a problem retrieving your secret questions';
                    if (obj.message[0] && obj.message[0].message) {
                        message = obj.message[0].message;
                    }
                    Ext.Msg.alert('Forgot Password', message);
                    me.getView().close();
                    return;
                }

                values = obj.metadata.pFields.split('|');
                qId1 = values[0].length === 1 ? '0' + values[0] : values[0];
                qId2 = values[1].length === 1 ? '0' + values[1] : values[1];
                me.loadSecretQuestion(qId1, 1);
                me.loadSecretQuestion(qId2, 2);
            }
        });
    },

    loadSecretQuestion: function(qId, fieldIndex) {
        var me = this,
            vm = me.getViewModel(),
            userState = vm.get('userState');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            paramsAsJson: true,
            withCredentials: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/getlistdesc/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'SecretQuestions',
                pListItem: qId,
                userState: userState
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                if (!obj.metadata.pListDesc) {
                    answerInput.setFieldLabel('Question #' + fieldIndex + ' - NOT AVAILABLE');
                    Ext.Msg.alert('Forgot Password Message', 'Either the Member ID is invalid or you have not yet setup the Secret Question/Answer to reset and retrieve the password online.');
                    me.lookupReference('resetForm').reset();
                    return;
                }
                me.lookupReference('question' + fieldIndex).setValue(me.formatQuestion(obj.metadata.pListDesc));
                me.lookupReference('answer' + fieldIndex).setFieldLabel(me.formatQuestion(obj.metadata.pListDesc));
            }
        });
    },

    formatQuestion: function(question) {
        var formattedQuestion = question,
            multiplier = 1,
            index = 0;

        if (!question) { return ''; }

        for (var i = 0; i < formattedQuestion.length; i++) {
            if (i === multiplier * 70) {
                index = formattedQuestion.indexOf(' ', i - 5);
                formattedQuestion = formattedQuestion.slice(0, index) + '<br>' + formattedQuestion.slice(index);
                multiplier++;
            }
        }

        return formattedQuestion;
    },

    onCancel: function(){
        this.getView().close();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }

});
