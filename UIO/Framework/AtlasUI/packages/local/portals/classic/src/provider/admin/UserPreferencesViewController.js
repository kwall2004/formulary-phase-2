// k3279 - Kevin Tabasan - 12/28/2016

Ext.define('Atlas.portals.view.provider.admin.UserPreferencesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userhpprovider',

    init: function() {
        this.loadUserPrefs();
    },

    loadUserPrefs: function() {
        var me = this,
            userPrefsStore = this.getViewModel().getStore('userPrefs'),
            stateStore = this.getViewModel().getStore('states');

        stateStore.getProxy().setExtraParam('pListName', 'states');
        stateStore.load({
            callback: function(record, operation) {
                var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                    states = metadata.pListItems.split('^'),
                    objectArray = [];

                for (var i=2;i<states.length;i+=2) {
                    objectArray.push({
                        "key":states[i],
                        "value":states[i+1]
                    });
                }

                me.getViewModel().getStore('statesParsed').getProxy().setData(objectArray);
            }
        });

        userPrefsStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        userPrefsStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
        userPrefsStore.load({
            callback: function(record, operation) {
                var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                    fields = metadata.pFields.split('|'),
                    object = {
                        "username":Atlas.user.un,
                        "providerGroupID":fields[0],
                        "providerGroupDesc":fields[1],
                        "firstName":fields[2],
                        "lastName":fields[3],
                        "address1":fields[4],
                        "address2":fields[5],
                        "city":fields[6],
                        "state":fields[7],
                        "zip":fields[8],
                        "email":fields[9],
                        "homePhone":fields[10],
                        "fax":fields[11],
                        "theme":fields[12],
                        "activate":fields[13],
                        "phone":fields[14],
                        "cell":fields[15],
                        "extension":fields[16],
                        "adminUser":fields[17],
                        "outputType":fields[18],
                        "createWebMessage":fields[19],
                        "providerType":fields[20],
                        "providerGroupType":fields[21]
                    };

                me.getViewModel().set('userPrefs',object);

                if (object.outputType === 'pdf') {
                    me.lookup('outputPDF').setValue(true);
                    me.lookup('outputScreen').setValue(false);
                } else {
                    me.lookup('outputPDF').setValue(false);
                    me.lookup('outputScreen').setValue(true);
                }
            }
        });
    },

    onClearClick: function() {
        this.lookup('userInformationForm').getForm().reset();
    },

    onCancelClick: function() {
        this.getView().up().destroy();
    },

    onSaveClick: function() {
        var me = this,
            form = this.lookup('userInformationForm'),
            outputPDFValue = this.lookup('outputPDF').value,
            formValues = form.getValues(),
            notificationStatusModel = Ext.create('Atlas.portals.provider.model.UserSetupWeb', {}),
            fieldsToSend = formValues.firstName + '|'
                + formValues.lastName + '|'
                + formValues.address1 + '|'
                + formValues.address2 + '|'
                + formValues.city + '|'
                + formValues.state + '|'
                + formValues.zip + '|'
                + formValues.email + '|'
                + formValues.home + '|'
                + formValues.fax + '||'
                + formValues.work + '|'
                + formValues.cell + '|'
                + formValues.extension + '|';

        if (outputPDFValue === true) {
            fieldsToSend += 'pdf'
        } else if (outputPDFValue === false) {
            fieldsToSend += 'screen'
        }
        if (form.isValid()) {
            notificationStatusModel.phantom = false;
            notificationStatusModel.getProxy().url = 'system/hp/usersetupweb';
            notificationStatusModel.getProxy().setExtraParam('pUserName',Atlas.user.un);
            notificationStatusModel.getProxy().setExtraParam('pFields',fieldsToSend);
            notificationStatusModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
            notificationStatusModel.save({
                success: function() {
                    Ext.MessageBox.alert('Success!','User Preferences saved.');
                },
                failure: function() {
                    Ext.MessageBox.alert('Request Failed','Internal Server Error');
                }
            });
        } else {
            Ext.MessageBox.alert('Validation Error','Please fill out all the required fields.')
        }
    },

    onChangePasswordClick: function() {
        var changePasswordWindow = new Atlas.portals.view.provider.admin.ChangePassword({
            viewModel: {
                data: {
                    portal: 'hpprovider',
                    user: Atlas.user
                }
            }
        });
        changePasswordWindow.show();
    },

    onChangeSecretQAClick: function() {
        Ext.create({
            xtype: 'hpmember-secretqasetup',
            layout: 'fit',
            viewModel: {
                data: {
                    user: Atlas.user,
                    portal: 'hpprovider',
                    hideCancelButton: false
                }
            }
        }).show();
    }
});