Ext.define('Atlas.portals.hpmember.EnrollWellnessProgramController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalshpmemberenrollwellnessprogram',

    init: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            descriptionModel = Ext.create('Atlas.portals.hpmember.model.PortalDynamicDataWeb', {}),
            me = this;

        descriptionModel.getProxy().setExtraParam('pFunction', 'getAttribute');
        descriptionModel.getProxy().setExtraParam('pRole', 'memberPortal');
        descriptionModel.getProxy().setExtraParam('pPlan', '');
        descriptionModel.getProxy().setExtraParam('pLobID', '');
        descriptionModel.getProxy().setExtraParam('pBenefitPlanCode', '');
        descriptionModel.getProxy().setExtraParam('pDataName', 'quitSmokingWellnessText');
        descriptionModel.getProxy().setExtraParam('pRecipientID', 0);
        descriptionModel.load({
            callback: function(description) {
                me.getViewModel().set('wellnessDescription', description.get('dataValue'));
            }
        });
    },

    onFormValueChange: function() {
        this.getView().getViewModel().set('daySelected', true);
    },

    enroll: function() {
        var form = this.lookupReference('enrollForm'),
            user = Ext.first('viewport').getViewModel().get('user'),
            enrollmentModel = Ext.create('Atlas.portals.hpmember.model.MemberProgramEnrollment', {}),
            me = this;

        enrollmentModel.phantom = false;
        enrollmentModel.getProxy().url = 'portal/hp/memberprogramenrollment';
        enrollmentModel.getProxy().setExtraParam('pSessionID', user.sessionId);
        enrollmentModel.getProxy().setExtraParam('pRecipientID', user.recipientId);
        enrollmentModel.getProxy().setExtraParam('pContactCodes', 'SC01');
        enrollmentModel.getProxy().setExtraParam('pContactLogDesc', this.createList(form.getValues()));
        enrollmentModel.getProxy().setExtraParam('pNotes', '');
        enrollmentModel.save({
            success: function(record, operation) {
                var message = Ext.JSON.decode(operation._response.responseText).message[0].message;

                if (message === '') {
                    Ext.Msg.alert('Successfully Enrolled', 'Congratulations! You have successfully enrolled in the New Beginnings program. A quit coach will be calling you soon!', function() {
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

        if (codes.Monday) { output.push(codes.Monday); }
        if (codes.Tuesday) { output.push(codes.Tuesday); }
        if (codes.Wednesday) { output.push(codes.Wednesday); }
        if (codes.Thursday) { output.push(codes.Thursday); }
        if (codes.Friday) { output.push(codes.Friday); }

        return output.toString();
    }
});