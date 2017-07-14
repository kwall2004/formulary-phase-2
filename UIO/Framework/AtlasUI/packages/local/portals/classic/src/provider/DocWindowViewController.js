/**
 * Created by c4539 on 12/2/2016.
 */
Ext.define('Atlas.portals.provider.DocWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderdocwindow',

    processDocument: function() {
        var provider = this.getView().getViewModel().get('provider'),
            record = this.getView().getViewModel().get('record'),
            jobNumber = record.get('jobNum'),
            inputs = this.lookupReference('docForm').getValues();

        if (inputs.planOfCare) {
            this.processPlanOfCareDocument(provider, record);
        }
        if (inputs.memObjProfile) {
            this.processMemberObjectProfile(provider, record);
        }
        if (inputs.all) {
            if (jobNumber === '0' || jobNumber === '') {
                // No plan of care document to show
            } else {
                this.processPlanOfCareDocument(provider, record);
            }
            this.processMemberObjectProfile(provider, record);
        }

        this.getView().up().destroy();
    },

    onCheckboxChanged: function() {
        var inputs = this.lookupReference('docForm').getValues(),
            vm = this.getView().getViewModel(),
            planOfCareCombo = this.lookupReference('planOfCare'),
            memObjProfileCombo = this.lookupReference('memObjProfile');

        if (!inputs.all && !inputs.planOfCare && !inputs.memObjProfile) {
            vm.set('isOkDisabled', true);
            planOfCareCombo.enable();
            memObjProfileCombo.enable();
            return;
        }

        if (inputs.all) {
            vm.set('isOkDisabled', false);
            planOfCareCombo.disable();
            planOfCareCombo.setValue(false);
            memObjProfileCombo.disable();
            memObjProfileCombo.setValue(false);
            return;
        }

        planOfCareCombo.enable();
        memObjProfileCombo.enable();
        if (inputs.planOfCare || inputs.memObjProfile) {
            vm.set('isOkDisabled', false);
        }
    },

    processPlanOfCareDocument: function(provider, record) {
        var pocModel = Ext.create('Atlas.portals.provider.model.PocNoteProviderWeb', {}),
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});

        pocModel.phantom = false;
        pocModel.getProxy().setExtraParam('pRecipientID', record.get('recipientID'));
        pocModel.getProxy().setExtraParam('pUserName', provider.un + '|' + provider.provID);
        pocModel.getProxy().setExtraParam('pStatus', 'Reviewed');
        pocModel.getProxy().setExtraParam('pNotes', '');
        pocModel.save();

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', '');
        requestModel.getProxy().setExtraParam('pParameters', '');
        requestModel.getProxy().setExtraParam('pRegenReport', 3);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', record.get('jobNum'));
        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;
                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    if (obj.metadata.pStatus != ''){
                        Ext.Msg.alert('Error',obj.metadata.pStatus);
                    } else {
                        Ext.MessageBox.alert(
                            'Error',
                            'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.',
                            function () {}
                        );
                    }
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });
    },

    processMemberObjectProfile: function(provider, record) {
        var memObjModel = Ext.create('Atlas.portals.provider.model.MopReportWeb', {});

        memObjModel.phantom = false;
        memObjModel.getProxy().setExtraParam(
            'pParameters',
            provider.un + '|' + record.get('recipientID') + '|' + 'Member Objective Profile - ' + record.get('firstName') + ' ' + record.get('lastName')
        );
        memObjModel.save({
            callback: function(record, operation) {
                var response = {};

                if (!operation) {
                    Ext.Msg.alert('Error', 'Request Failed: Connection error.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                if (response.message[0].message) {
                    Ext.Msg.alert('Error', response.message[0].message);
                    return;
                }

                Ext.Msg.alert(
                    'Message',
                    'Member Object Profile Report has been submitted to the queue. Please go to HOME tab and click refresh button on the web message panel.  Report may take several minutes to complete.'
                );
            }
        });
    },

    cancelDocument: function() {
        this.lookupReference('docForm').reset();
        this.getView().up().destroy();
    }
});