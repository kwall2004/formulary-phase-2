/**
 * Created by c4539 on 12/2/2016.
 */
Ext.define('Atlas.portals.provider.PrintEnrollmentReportsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderprintenrollmentreportswindow',

    printReports: function() {
        var form = this.lookupReference('reportForm'),
            reportType = form.getValues().report,
            vm = this.getView().getViewModel(),
            provider = vm.get('provider'),
            user = Ext.first('viewport').getViewModel().get('user'),
            input = vm.get('input'),
            id = user.userPreferences.providerGroupId ? user.userPreferences.providerGroupId : provider.provID,
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});

        if (vm.get('multipleGroups') && !form.isValid()) { return; }
        if (vm.get('multipleGroups')) {
            id = form.getValues().provider.replace('-', '');
        }

        input = id + '|' + input + '|' + reportType;
        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', 'enrollallrpt.p');
        requestModel.getProxy().setExtraParam('pParameters', input);
        requestModel.getProxy().setExtraParam('pRegenReport', 2);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', 0);
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
        this.getView().up().destroy();
    },

    cancelReports: function() {
        this.getView().up().destroy();
    }
});