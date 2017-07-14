Ext.define('Atlas.portals.prescriber.MemberAccessWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsprescribermemberaccesswindowcontroller',

    init: function() {
        this.resetMemberAccess();
        this.loadGenders();
    },

    loadGenders: function() {
        var genderCombo = this.lookupReference('Gender'),
            genderStore = {};

        genderStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: [['Male', '1'], ['Female', '2']]
        });

        genderCombo.setStore(genderStore);
    },

    submitMemberAccess: function() {
        var form = this.lookupReference('memberAccessForm'),
            gender = this.lookupReference('Gender').value,
            dob = this.lookupReference('DOB').value,
            ssn = this.lookupReference('SSN').value,
            count = 0,
            user = Ext.first('viewport').getViewModel().getData().user,
            memberAccessModel = Ext.create('Atlas.portals.prescriber.model.CreateMember', {}),
            me = this;

        if (!form.isValid()) { return; }
        count = gender ? count + 1 : count;
        count = dob ? count + 1 : count;
        count = ssn ? count + 1 : count;

        if (count < 2) {
            Ext.Msg.alert('Information', 'Please provide at least two out of Gender/DOB/SSN.');
            return;
        }

        memberAccessModel.phantom = false;
        memberAccessModel.getProxy().url = 'portal/rx/portalmemberaccessp';
        memberAccessModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        memberAccessModel.getProxy().setExtraParam('pKeyType', 'Prescriber');
        memberAccessModel.getProxy().setExtraParam('pKeyValue', user.un);
        memberAccessModel.getProxy().setExtraParam('ttMemberDetail',  form.getValues());
        memberAccessModel.save({
            success: function(data, operation) {
                var message = Ext.JSON.decode(operation._response.responseText).message[0];

                me.resetMemberAccess();
                if (message.code === 0) {
                    Ext.Msg.alert('Success', 'Access to requested member has been granted.');
                    return;
                }
                Ext.Msg.alert('Failed', message.message);
            },
            failure: function() {
                Ext.Msg.alert('Failed', 'Access to requested member has failed.');
                me.resetMemberAccess();
            }
        });
    },

    resetMemberAccess: function() {
        this.lookupReference('memberAccessForm').reset();
    }
});