Ext.define('Atlas.view.auth.RxMemberPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxmemberpassword',

    doReset: function () {
        var me = this,
            vm = me.getViewModel(),
            forgotPassForm = me.lookupReference('forgotPasswordForm'),
            validForm = forgotPassForm.isValid(),
            registrationStatus = me.lookupReference('registrationStatus'),
            regSuccessMsg = me.lookupReference('regSuccessMsg'),
            resetButton = me.lookupReference('resetButton');

        if (validForm === true) {

            var formValues = forgotPassForm.getValues();
            registrationStatus.setText('working...');


            var forgotPassModel = Ext.create('Atlas.common.model.resetMemberPassword', {});
            forgotPassModel.phantom = false;
            forgotPassModel.getProxy().setExtraParam('pMemberID', formValues.memberid);
            forgotPassModel.getProxy().setExtraParam('pCarrierID', formValues.planList);
            forgotPassModel.getProxy().setExtraParam('pFourDigitSSN', "");
            forgotPassModel.getProxy().setExtraParam('pDOB', formValues.DOB);
            forgotPassModel.getProxy().setExtraParam('pEmail', formValues.emailAddress);
            forgotPassModel.getProxy().setExtraParam('pUserName', formValues.userName);
            forgotPassModel.getProxy().setExtraParam('pPassword', formValues.password);
            forgotPassModel.getProxy().setExtraParam('pDevice', "");
            forgotPassModel.save({
                success: function (response, operation) {
                    var obj = Ext.JSON.decode(operation._response.responseText);
                    if (obj.message[0].code === 0) {
                        registrationStatus.setText('Your password has been successfully reset.');
                        regSuccessMsg.setText('');
                        resetButton.disable();

                    } else {
                        registrationStatus.setText(obj.message[0].message);
                    }

                }

            })
        } else {
            registrationStatus.setText('Please enter the required fields!');
        }

    },

    getListItems: function () {
        var me = this,
            vm = me.getViewModel(),
            listItemsStore = vm.getStore('listItems');

        listItemsStore.load({
            callback: function (response, operation) {
                var listItemsObj = [],
                    planCombo = me.lookupReference('planList'),
                    planListStore = new Ext.data.Store({
                        fields: [
                            'planList'
                        ]
                    });

                for (var i = 0; i < response.length; i++) {
                    listItemsObj.push({name: response[i].data.carrierName, value: response[i].data.carrierId});
                }

                planListStore.loadData(listItemsObj);
                planCombo.setStore(planListStore);
                planCombo.select(planCombo.getStore().getAt(0));
            }
        });


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
