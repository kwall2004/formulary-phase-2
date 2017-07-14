Ext.define('Atlas.portals.registration.RxPrescriberRegistrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rxprescriberregistrationcontroller',

    init: function () {
        var me = this;
        me.getViewModel().set('tempUserName', Atlas.UUIDgen.generate());
    },

    createPrescriberDetail: function (formValues) {
        var me = this,
            vm = me.getViewModel(),
            termsAccepted = vm.get('termsCheckBox.checked'),
            tempUserName = vm.get('tempUserName'),
            ttPrescriberObject = {};

        ttPrescriberObject.firstName = formValues.firstName;
        ttPrescriberObject.lastName = formValues.lastName;
        ttPrescriberObject.NPI = formValues.npi;
        ttPrescriberObject.DEA = formValues.dea;
        ttPrescriberObject.licenseState = formValues.licenseState;
        ttPrescriberObject.StateLic = formValues.licenseNumber;
        ttPrescriberObject.ACTIVE = 'No';
        ttPrescriberObject.AdminAcceptTerms = false;
        ttPrescriberObject.address1 = formValues.address;
        ttPrescriberObject.address2 = formValues.address2;
        ttPrescriberObject.City = formValues.city;
        ttPrescriberObject.Zip = formValues.zip;
        ttPrescriberObject.email = formValues.email;
        ttPrescriberObject.Phone = formValues.phone;
        ttPrescriberObject.fax = formValues.fax;
        ttPrescriberObject.QuestionID1 = formValues.question1;
        ttPrescriberObject.Answer1 = formValues.answer1;
        ttPrescriberObject.QuestionID2 = formValues.question2;
        ttPrescriberObject.Answer2 = formValues.answer2;
        ttPrescriberObject.emailVerfId = true;
        ttPrescriberObject.userName = tempUserName;
        ttPrescriberObject.AdminAcceptTerms = termsAccepted;

        return ttPrescriberObject;
    },

    saveRegistration: function () {
        var me = this,
            termsAccepted = me.getViewModel().get('termsCheckBox.checked'),
            formRef1 = me.lookupReference('registrationForm1'),
            formRef2 = me.lookupReference('registrationForm2');

        if (formRef1.isValid() && formRef2.isValid() && termsAccepted) {
            me.validatePrescriber();
        }
        else {
            Ext.Msg.alert('Validation Errors', 'Please correct the validation errors in your registration before submitting.');
        }
    },

    validatePrescriber: function () {
        var me = this,
            vm = this.getViewModel(),
            requestModel = Ext.create('Atlas.portals.prescriber.model.RegisterPrescriber'),
            form1 = me.lookupReference('registrationForm1').getForm(),
            form2 = me.lookupReference('registrationForm2').getForm(),
            form3 = me.lookupReference('registrationForm3').getForm(),
            formValues1 = form1.getValues(),
            formValues2 = form2.getValues(),
            formValues3 = form3.getValues(),
            formValues = {},
            ttPrescriberObject;

        switch (me.getView().layout.getActiveItem().id) {
            case 'card-1':
                if (form1.isValid()) {
                    if (!(formValues1.npi || formValues1.dea)) {
                        form1.markInvalid([
                            {
                                field: 'npi',
                                message: 'Either NPI or DEA number is required.'
                            },
                            {
                                field: 'dea',
                                message: 'Either NPI or DEA number is required.'
                            }]);
                        return;
                    }
                }
                else {
                    // form is not valid
                    return;
                }
                vm.set('currentStep', 'step2');
                break;
            case 'card-2':
                if (form2.isValid()) {
                    // make sure security questions are different
                    if (formValues2.question1 === formValues2.question2) {
                        form2.markInvalid([{
                            field: 'question2',
                            message: 'Security question #1 & #2 cannot be the same. Please select different questions.'
                        }]);
                        return;
                    }
                }
                else {
                    // form is not valid
                    return;
                }
                vm.set('currentStep', 'step3');
                break;
            case 'card-3':
                vm.set('currentStep', 'step4');
                break;
        }

        // merge all the forms together
        Ext.merge(formValues, formValues1, formValues2, formValues3);
        ttPrescriberObject = me.createPrescriberDetail(formValues);

        vm.set('ttPrescriberDetails', ttPrescriberObject);

        requestModel.phantom = false;
        requestModel.getProxy().setExtraParam('ttPrescriberDetails', vm.get('ttPrescriberDetails'));
        requestModel.getProxy().setExtraParam('ipcAction', vm.get('currentStep'));
        requestModel.save({
            success: me.onRegistrationSave,
            scope: me
        });
    },

    onRegistrationSave: function (response, operation) {
        var me = this,
            vm = this.getViewModel(),
            obj = Ext.JSON.decode(operation.getResponse().responseText),
            code = obj.message[0].code,
            message = obj.message[0].message;

        if (code !== 0) {
            Ext.Msg.alert('Failed', message);
            return;
        } else if (vm.get('currentStep') == 'step4') {
            if (message == 'Failed to create User Name letter') {
                Ext.Msg.alert('Failed', message);
            } else {
                if (message == "") {
                    message = "Congratulations, registration complete!";
                }
                Ext.Msg.alert('Complete', message);
            }
            me.getView().close();
            return;
        }

        me.moveNext();
    },

    nextButton: function (btn) {
        var me = this;

        switch (me.getView().layout.getActiveItem().id) {
            case 'card-0':  // instructions
                me.moveNext();
                break;
            case 'card-1':  // page 1
                me.validatePrescriber();
                //me.moveNext(); // take this out after testing
                break;
            case 'card-2':  // page 2
                me.validatePrescriber();
                //me.moveNext(); // take this out after testing
                break;
        }
    },

    move: function (direction) {
        var me = this,
            vm = me.getViewModel(),
            nextButton = me.lookupReference('movenext'),
            prevButton = me.lookupReference('moveprev'),
            panel = nextButton.up("panel"),
            layout = panel.getLayout();

        layout[direction]();
        prevButton.setDisabled(!layout.getPrev());
        nextButton.setDisabled(!layout.getNext());
    },

    moveNext: function () {
        this.move('next');
    },

    movePrev: function () {
        this.move('prev');
    },

    clearForm: function () {
        this.lookupReference('registrationForm').reset();
    }
});