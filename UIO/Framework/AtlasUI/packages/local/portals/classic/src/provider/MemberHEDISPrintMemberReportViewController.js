Ext.define('Atlas.portals.provider.MemberHEDISPrintMemberReportViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberhedisprintmemberreport',

    memberReportGroup: function (group, checkbox) {
        if (checkbox != null) {
            this.lookup('memberProfileGroup').reset();
            this.lookup('printHraGroup').reset();
        }
    },

    memberProfileGroup: function (group, checkbox) {
        if (checkbox != null) {
            this.lookup('memberReportGroup').reset();
            this.lookup('printHraGroup').reset();
        }
    },

    printHraGroup: function (group, checkbox) {
        if (checkbox != null) {
            this.lookup('memberProfileGroup').reset();
            this.lookup('memberReportGroup').reset();
        }
    },

    generateReport: function () {
        var memberReportGroupValues = Ext.isEmpty(this.lookup('memberReportGroup').getChecked()),
            memberProfileGroupValues = Ext.isEmpty(this.lookup('memberProfileGroup').getChecked()),
            printHraGroupValues = Ext.isEmpty(this.lookup('printHraGroup').getChecked()),
            recipientId = this.getViewModel().data.recipientId,
            pReportName,
            pParameters;

        if (memberReportGroupValues == false) {
            if (this.lookup('familyMembersBox').checked == true) {
                var familyMember = 'yes';
            } else {
                var familyMember = 'no';
            }

            if (this.lookup('eligibilityHistoryBox').checked == true) {
                var eligibilityHistory = 'yes';
            } else {
                var eligibilityHistory = 'no';
            }

            if (this.lookup('hedisBox').checked == true) {
                var hedis = 'yes';
            } else {
                var hedis = 'no';
            }

            pReportName = 'memberrpt.p';
            pParameters = recipientId + '|' + eligibilityHistory + '|No|' + familyMember + '|' + hedis;

        } else if (memberProfileGroupValues == false) {
            var date = new Date(),
                currDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
                lastYear = Ext.Date.add(new Date(), Ext.Date.YEAR, -1),
                lastYearDateOnly = (lastYear.getMonth() + 1) + '/' + lastYear.getDate() + '/' + lastYear.getFullYear();

            if (this.lookup('memberProfileBox').checked == true) {
                var memberProfile = 'yes';
            } else {
                var memberProfile = 'no';
            }

            pReportName = 'memberprofilereportpcp.p';
            pParameters = recipientId + '|' + lastYearDateOnly + '|' + currDate + "|" + this.getViewModel().data.lobId;
        } else if (printHraGroupValues == false) {
            if (this.lookup('printHRABox').checked == true) {
                var printHRA = 'yes';
            } else {
                var printHRA = 'no';
            }

            if (this.lookup('sixMonthPharmacyBox').checked == true) {
                var sixMonthPharmacy = 'yes';
            } else {
                var sixMonthPharmacy = 'no';
            }

            pReportName = 'reporthraform01.p';
            pParameters = recipientId + '|' + printHRA + '|' + sixMonthPharmacy;
        }

        this.viewDocument(pReportName, pParameters);
    },

    viewDocument: function (pReportName, pParameters) {
        var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', pReportName);
        requestModel.getProxy().setExtraParam('pParameters', pParameters);
        requestModel.getProxy().setExtraParam('pRegenReport', 2);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', 0);

        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;
                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', obj.metadata.pStatus, function(){});
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });
    }

});