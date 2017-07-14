Ext.define('Atlas.view.auth.HpMemberSecretQAValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpmembersecretqavalidation',

    init: function() {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user');

        me.loadSecretQuestion(1, user.secretQaSetupId1);
        me.loadSecretQuestion(2, user.secretQaSetupId2);
    },

    onValidate: function () {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user'),
            portal = vm.get('portal'),
            form = me.lookupReference('validateForm'),
            formValues = form.getValues(),
            params = {},
            apiUrl,
            cookieName;


        if (!form.isValid()) { return; }

        if (portal == 'hpmember') {
            apiUrl = 'portal/hp/validatemembersecretqa/update';
            params = {
                pSessionID: user.sessionId,
                pRecipientID: user.recipientId,
                pAnswer1: Ext.util.Base64.encode(formValues.answer1.trim().toLowerCase()),
                pAnswer2: Ext.util.Base64.encode(formValues.answer2.trim().toLowerCase()),
                userState: user.portalStateSelected
            };
            cookieName = user.recipientId;
        }
        else if (portal == 'hpprovider') {
            apiUrl = 'system/hp/validatesecretqa/update';
            params = {
                pSessionID: user.sessionId,
                pUserName: user.un,
                pAnswer1: Ext.util.Base64.encode(formValues.answer1.trim().toLowerCase()),
                pAnswer2: Ext.util.Base64.encode(formValues.answer2.trim().toLowerCase()),
                userState: user.portalStateSelected
            };
            cookieName = user.un;
        }
        else {
            Ext.Msg.alert('Error', 'The portal was not passed into the secret question and answer validation controller.');
        }

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + apiUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode(params),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                if (obj.message && obj.message[0]) {
                    if ((portal == 'hpmember' && obj.message[0].message) || (portal == 'hpprovider' && obj.message[0].code != 200)) {
                        Ext.Msg.alert('Secret QA Validation', obj.message[0].message);
                    }
                    else {
                        if (form.getValues().remember){
                            var expDate = new Date();
                            expDate.setYear(expDate.getFullYear() + 10);
                            Ext.util.Cookies.set(cookieName, 'yes', expDate);
                        }

                        user.secretQaValidated = true;
                        me.fireEvent('hpMemberConditionProcessed');
                        me.getView().close();
                    }
                }
            }
        });
    },

    onClear: function() {
        var me = this,
            answer1 = me.lookupReference('answer1'),
            answer2 = me.lookupReference('answer2');

        answer1.setValue('');
        answer2.setValue('');
        answer1.focus();
    },

    onCancel: function() {
        var me = this;
        me.fireEvent('hpMemberRestartLogin');
        me.getView().close();
    },

    loadSecretQuestion: function(questionNumber, questionId) {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user');

        if (questionId < 10) {
            questionId =  '0' + questionId;
        }

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/getlistdesc/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'SecretQuestions',
                pListItem: questionId,
                userState: user.portalStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText),
                    questionText = 'Question #' + questionNumber + ' - NOT AVAILABLE.  You have not yet setup the Secret Question/Answer to reset and retrieve the password online.';

                if (obj.metadata.pListDesc) {
                    questionText = obj.metadata.pListDesc;
                }

                vm.set('Q' + questionNumber, questionText);
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
    }
});
