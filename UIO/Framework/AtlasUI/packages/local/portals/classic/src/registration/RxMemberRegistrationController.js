Ext.define('Atlas.portals.registration.RxMemberRegistrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rxmemberregistrationcontroller',

    init: function () {
    },

    getListItems: function () {
        var me = this,
            vm = me.getViewModel(),
            listItemsStore = vm.getStore('listItems');

        listItemsStore.load({
            callback: function (response, operation) {
                var listItemsObj = [],
                    planCombo = me.lookupReference('planList');

                for (var i = 0; i < response.length; i++) {
                    listItemsObj.push({name: response[i].data.carrierName, value: response[i].data.carrierId});
                }

                planListStore = new Ext.data.Store({
                    fields: [
                        'planList'
                    ]
                });

                planListStore.loadData(listItemsObj);
                planCombo.setStore(planListStore);
                planCombo.select(planCombo.getStore().getAt(0));
            }
        });


    },

    registerUser: function () {
        var me = this,
            vm = me.getViewModel(),
            registrationForm = me.lookupReference('registrationForm'),
            validForm = registrationForm.isValid(),
            registrationStatus = me.lookupReference('registrationStatus'),
            regSuccessMsg = me.lookupReference('regSuccessMsg');

        if (validForm === true) {
            var formValues = registrationForm.getValues();
            registrationStatus.setText('working...');



            if (formValues.password === formValues.confirmPassword) {
                var requestModel = Ext.create('Atlas.portals.rxmember.model.RegisterMember', {});

                requestModel.phantom = false;
                requestModel.getProxy().setExtraParam('pMemberID', formValues.memberid);
                requestModel.getProxy().setExtraParam('pCarrierID', formValues.planList);
                requestModel.getProxy().setExtraParam('pFourDigitSSN', "");
                requestModel.getProxy().setExtraParam('pDOB', formValues.DOB);
                requestModel.getProxy().setExtraParam('pFirstName', formValues.firstName);
                requestModel.getProxy().setExtraParam('pLastName', formValues.lastName);
                requestModel.getProxy().setExtraParam('pEmail', formValues.emailAddress);
                requestModel.getProxy().setExtraParam('pUserName', formValues.userName);
                requestModel.getProxy().setExtraParam('pPassword', formValues.password);
                requestModel.getProxy().setExtraParam('pDevice', "");
                requestModel.save({
                    success: function (response, operation) {
                        var obj = Ext.JSON.decode(operation._response.responseText);
                        if (obj.message[0].code === 0) {
                            registrationStatus.setText('Congratulations! Your account has been successfully created.');
                            regSuccessMsg.setText('You are now registered. Please use your username and password to login.');
                        } else {
                            registrationStatus.setText(obj.message[0].message);
                        }

                    }
                })
            } else {
                registrationStatus.setText("Passwords do not match.");
            }
        } else {
            registrationStatus.setText('Please enter the required fields!');
        }
    },

    clearForm: function () {
        this.lookupReference('registrationForm').reset();
    }
});