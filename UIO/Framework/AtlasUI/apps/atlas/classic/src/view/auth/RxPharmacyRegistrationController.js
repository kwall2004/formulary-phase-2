/**
 * Created by c4539 on 12/8/2016.
 */
Ext.define('Atlas.view.auth.RxPharmacyRegistrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rxpharmacyregistration',

    init: function() {
        this.loadSecurityQuestions();
    },

    loadSecurityQuestions: function() {
        var securityStore = this.getView().getViewModel().getStore('securityQuestions');

        securityStore.getProxy().setExtraParam('pListName', 'PrescPortalSecQues');
        securityStore.load();
    },

    filterSecurityQuestions: function(combo, record) {
        var secondCombo = this.lookupReference('SecurityQuestion2');

        secondCombo.setValue('');
        secondCombo.setFilters(function(rec) {
            return rec.data.value !== record.get('value');
        });
    },

    goToPrevious: function() {
        var vm = this.getView().getViewModel();

        for (var i = 1; i < 7; i++) {
            if (vm.get('isOnStep' + i)) {
                this.showStep(i - 1);
                break;
            }
        }
    },

    goToNext: function() {
        var vm = this.getView().getViewModel();

        for (var i = 1; i < 7; i++) {
            if (vm.get('isOnStep' + i)) {
                if (this.validateStep(i)) { this.registerPharmacy(i); }
                break;
            }
        }
    },

    validateStep: function(stepNumber) {
        var form = this.lookupReference('form' + stepNumber);

        if (stepNumber === 2) { return this.validateStep2(); }

        if (stepNumber === 3) {
            form.isValid();
            return this.validateStep3();
        }
        return !form ? true : form.isValid();
    },

    validateStep2: function() {
        var params = this.lookupReference('form2').getValues();

        if (!params.pharmacyType) {
            Ext.Msg.alert('Validation', 'The pharmacy type is required before continuing.');
            return false;
        }

        return true;
    },

    validateStep3: function() {
        var params = this.lookupReference('form3').getValues(),
            isIndependent = this.getView().getViewModel().get('isIndependent');

        if (isIndependent) {
            this.lookupReference('RelationshipID').setValue('');
            return params.NcpdpID && params.RxNum;
        }
        this.lookupReference('NcpdpID').setValue('');
        return params.RelationshipID && params.RxNum;
    },

    showStep: function(stepNumber) {
        var vm = this.getView().getViewModel();

        for (var i = 1; i < 7; i++) {
            vm.set('isOnStep' + i, i === stepNumber);
        }
    },

    registerPharmacy: function(stepNumber) {
        var action = 'Step' + stepNumber,
            form2 = this.lookupReference('form2').getValues(),
            form3 = this.lookupReference('form3').getValues(),
            form4 = this.lookupReference('form4').getValues(),
            accepted = stepNumber === 5,
            pharmacyDetails = {},
            me = this,
            registerModel = Ext.create('Atlas.portals.rxpharmacy.model.RegisterPharmacyP', {});

        pharmacyDetails = {
            AdminAcceptTerms: accepted,
            Answer1: form4.Answer1,
            Answer2: form4.Answer2,
            Email: form4.Email,
            NcpdpID: form3.NcpdpID,
            Phone: form4.Phone,
            SecurityQuestion1: form4.SecurityQuestion1,
            SecurityQuestion2: form4.SecurityQuestion2,
            RelationshipID: form3.RelationshipID,
            RxNum: form3.RxNum,
            ContactName: form4.ContactName,
            UserName: 0
        };

        if (stepNumber !== 3 && stepNumber !== 5) {
            this.showStep(stepNumber + 1);
            return;
        }

        registerModel.phantom = false;
        registerModel.getProxy().setExtraParam('ttPharmacyDetails', pharmacyDetails);
        registerModel.getProxy().setExtraParam('pAction', action);
        registerModel.save({
            callback: function(record, operation) {
                var response = '';

                if (!operation._response) {
                    Ext.Msg.alert('Error', 'Pharmacy could not be registered at this time.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                if (response.message[0].code === 2001) {
                    Ext.Msg.alert('Error', response.message[0].message);
                    return;
                }
                if (response.message[0].code !== 0) {
                    Ext.Msg.alert('Error', 'Error Occurred, please contact Network Management at 313.324.3800.');
                    return;
                }
                me.showStep(stepNumber + 1);
            }
        });
    },

    savePharmacy: function() {
        this.registerPharmacy(5);
    }
});