Ext.define('Atlas.portals.hpmember.EnrollDiseaseManagementController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalshpmemberenrolldiseasemanagement',

    init: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            descriptionModel = Ext.create('Atlas.portals.hpmember.model.PortalDynamicDataWeb', {}),
            me = this;

        descriptionModel.getProxy().setExtraParam('pFunction', 'getAttribute');
        descriptionModel.getProxy().setExtraParam('pRole', 'memberPortal');
        descriptionModel.getProxy().setExtraParam('pPlan', '');
        descriptionModel.getProxy().setExtraParam('pLobID', '');
        descriptionModel.getProxy().setExtraParam('pBenefitPlanCode', '');
        descriptionModel.getProxy().setExtraParam('pDataName', 'diseaseManagementText');
        descriptionModel.getProxy().setExtraParam('pRecipientID', 0);
        descriptionModel.load({
            callback: function(description) {
                me.getViewModel().set('diseaseDescription', description.get('dataValue'));
            }
        });
    },

    onCheckBoxChange: function(checkbox, newValue) {
        var values = this.lookupReference('enrollForm').getValues(),
            hasValue = false;

        hasValue = hasValue ? hasValue : values.asthma !== '0';
        hasValue = hasValue ? hasValue : values.cardio !== '0';
        hasValue = hasValue ? hasValue : values.chronic !== '0';
        hasValue = hasValue ? hasValue : values.congestive !== '0';
        hasValue = hasValue ? hasValue : values.diabetes !== '0';

        this.getViewModel().set('conditionSelected', hasValue);
    },

    enroll: function() {
        var hasValue = this.getViewModel().get('conditionSelected'),
            form = this.lookupReference('enrollForm'),
            user = Ext.first('viewport').getViewModel().get('user'),
            enrollmentModel = Ext.create('Atlas.portals.hpmember.model.MemberProgramEnrollment', {}),
            me = this;

        if (!hasValue) { return; }
        enrollmentModel.phantom = false;
        enrollmentModel.getProxy().url = 'portal/hp/memberprogramenrollment';
        enrollmentModel.getProxy().setExtraParam('pSessionID', user.sessionId);
        enrollmentModel.getProxy().setExtraParam('pRecipientID', user.recipientId);
        enrollmentModel.getProxy().setExtraParam('pContactCodes', this.createList(form.getValues()));
        enrollmentModel.getProxy().setExtraParam('pContactLogDesc', 'Member requested enrollment in Disease Management through the Member Portal on');
        enrollmentModel.getProxy().setExtraParam('pNotes', '');
        enrollmentModel.save({
            success: function(record, operation) {
                var message = Ext.JSON.decode(operation._response.responseText).message[0].message;

                if (message === '') {
                    Ext.Msg.alert('Successfully Enrolled', 'Congratulations! You have successfully enrolled in the Disease Management Program.', function() {
                        me.fireEvent('routeTo',{ routeId: 'hpmember/portals/hpmember_Main' });
                        me.getView().destroy();
                    });
                    return;
                }
                Ext.Msg.alert('Enrollment Failure', 'There was an issue with enrolling in the selected programs. Please call member services. (' + message + ')', function() {
                    me.fireEvent('routeTo',{ routeId: 'hpmember/portals/hpmember_Main' });
                    me.getView().destroy();
                });
            },
            failure: function() {
                Ext.Msg.alert('Enrollment Failure', 'There was an issue with enrolling in the selected programs. Please call member services.', function() {
                    me.fireEvent('routeTo',{ routeId: 'hpmember/portals/hpmember_Main' });
                    me.getView().destroy();
                });
            }
        });
    },

    createList: function(codes) {
        var output = [];

        if (codes.asthma !== '0') { output.push(codes.asthma); }
        if (codes.cardio !== '0') { output.push(codes.cardio); }
        if (codes.chronic !== '0') { output.push(codes.chronic); }
        if (codes.congestive !== '0') { output.push(codes.congestive); }
        if (codes.diabetes !== '0') { output.push(codes.diabetes); }

        return output.toString();
    }
});