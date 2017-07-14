/**
 * Created by t3852 on 11/8/2016.
 */
Ext.define('Atlas.portals.registration.MemberMHPRegistrationViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.membermhpregistrationview',

    init: function(){
        this.getViewModel().set('hiddenForIL', true);
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
                    planCombo = me.lookupReference('planList');

                for (var i = 0; i < listItems.length; i += 2) {
                    if (listItems[i] != 'Advantage Plus') {
                        listItemsObj.push({name: listItems[i], value: listItems[i+1]});
                    }
                }

                planListStore = new Ext.data.Store({
                    fields: [
                        'planList'
                    ]
                });

                planListStore.loadData(listItemsObj);
                planCombo.setStore(planListStore);
            }
        });


    },

    getStates: function () {
        var me = this,
            stateStore = {},
            stateCombo = me.lookupReference('stateCombo');

        stateStore = new Ext.data.Store({
            fields: ['name', 'value'],
            data : [
                {"name":"MI", "value":"MI"},
                {"name":"IL", "value":"IL"}
            ]
        });

        stateCombo.setStore(stateStore);
    },

    hidePlan: function () {
        var me = this,
            vm = me.getViewModel();

        vm.set('hiddenForIL', me.lookup('stateCombo').getValue() == 'IL');
    },

    registerUser: function () {
        var me = this,
            vm = me.getViewModel(),
            memberFuncsStore = vm.getStore('portalmemberfuncs'),
            registrationForm = me.lookupReference('registrationForm'),
            validForm = registrationForm.isValid(),
            registrationStatus = me.lookupReference('registrationStatus'),
            regSuccessMsg = me.lookupReference('regSuccessMsg');

        if (validForm === true) {
            var formValues = registrationForm.getValues(),
                fieldList = 'UpdateMemberChange|socsecnum|birthdate|firstname|lastname|email|phone',
                inputValues = '|' + (formValues.fourSSN == undefined ? '' : formValues.fourSSN) + '|' + formValues.dateOfBirth + '|' + formValues.firstName
                    + '|' + formValues.lastName + '|' + formValues.email + '|' + formValues.phone,
                selectedState = formValues.stateSelect;

            registrationStatus.setText('working...');
            memberFuncsStore.getProxy().setExtraParam('pFunction', 'fGetRecipientID');
            memberFuncsStore.getProxy().setExtraParam('pMemberID', formValues.memberId);
            memberFuncsStore.getProxy().setExtraParam('pMemberDOB', formValues.dateOfBirth);
            memberFuncsStore.getProxy().setExtraParam('userState', formValues.stateSelect);


            memberFuncsStore.load({
                callback: function (records, operation, success) {
                    var obj = Ext.JSON.decode(operation.getResponse().responseText);
                    if (obj.data[0].value.toLowerCase().indexOf('member not found') == -1) {
                        var requestModel = Ext.create('Atlas.portals.hpmember.MemberRegister', {});

                        requestModel.phantom = false;
                        requestModel.getProxy().url = 'portal/hp/memberregister';
                        requestModel.getProxy().setExtraParam('pRecipientID', obj.data[0].value);
                        requestModel.getProxy().setExtraParam('pFieldList', fieldList);
                        requestModel.getProxy().setExtraParam('pFields', inputValues);
                        requestModel.getProxy().setExtraParam('userState', selectedState);
                        requestModel.save({
                            callback: function (response, operation) {
                                var obj = Ext.JSON.decode(operation.getResponse().responseText);
                                if (obj.message[0].message.toLowerCase() == 'success') {
                                    registrationStatus.setText('Your registration is complete.');
                                    regSuccessMsg.setText('Please check your email to activate and access your account online.');
                                } else {
                                    registrationStatus.setText(obj.message[0].message);
                                }

                            }
                        })
                    } else {
                        registrationStatus.setText(obj.data[0].value);
                    }
                }
            })
        } else {
            registrationStatus.setText('Please enter the required fields!');
        }
    },

    clearForm: function () {
        this.lookupReference('registrationForm').reset();
    }
});