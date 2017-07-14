/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Print Options
 * Description: Controller for Member Print Options
 */
Ext.define('Atlas.portals.provider.MemberPrintOptionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberprintoptionscontroller',

    onFamilyMembersClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('printHraSummary').setValue(false);
            this.lookupReference('pharmacyDetail').setValue(false);
            this.lookupReference('memberProfile').setValue(false);
        }
    },

    onEligibilityHistoryClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('printHraSummary').setValue(false);
            this.lookupReference('pharmacyDetail').setValue(false);
            this.lookupReference('memberProfile').setValue(false);
        }
    },

    onHedisClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('printHraSummary').setValue(false);
            this.lookupReference('pharmacyDetail').setValue(false);
            this.lookupReference('memberProfile').setValue(false);
        }
    },

    onMemberProfileClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('familyMembers').setValue(false);
            this.lookupReference('eligibilityHistory').setValue(false);
            this.lookupReference('hedis').setValue(false);
            this.lookupReference('printHraSummary').setValue(false);
            this.lookupReference('pharmacyDetail').setValue(false);
        }
    },

    onPrintHraSummaryClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('familyMembers').setValue(false);
            this.lookupReference('eligibilityHistory').setValue(false);
            this.lookupReference('hedis').setValue(false);
            this.lookupReference('memberProfile').setValue(false);
        }
    },

    onPharmacyDetailClick: function (component, eOpts) {
        if (component.getValue()) {
            this.lookupReference('familyMembers').setValue(false);
            this.lookupReference('eligibilityHistory').setValue(false);
            this.lookupReference('hedis').setValue(false);
            this.lookupReference('memberProfile').setValue(false);
        }
    },

    onOkClick: function (component, eOpts) {
        var familyMembersValue = this.lookupReference('familyMembers').getValue(),
            eligibilityHistoryValue = this.lookupReference('eligibilityHistory').getValue(),
            hedisValue = this.lookupReference('hedis').getValue(),
            memberProfileValue = this.lookupReference('memberProfile').getValue(),
            printHraSummaryValue = this.lookupReference('printHraSummary').getValue(),
            pharmacyDetailValue = this.lookupReference('pharmacyDetail').getValue(),
            user = Ext.first('viewport').getViewModel().get('user'),
            input = '',
            reportName = '';
        if (familyMembersValue || eligibilityHistoryValue || hedisValue) {
            var strFamilyMembersValue = familyMembersValue ? 'Yes' : 'No',
                strEligibilityHistoryValue = eligibilityHistoryValue ? 'Yes' : 'No',
                strHedisValue = hedisValue ? 'Yes' : 'No',
                pcpChk = 'No';
                input = this.getViewModel().data.recipientId + "|" + strEligibilityHistoryValue + "|" + pcpChk + "|" + strFamilyMembersValue + "|" + strHedisValue + "";
                reportName = 'memberrpt.p';
        } else if(printHraSummaryValue || pharmacyDetailValue) {
            var strPrintHraSummaryValue = printHraSummaryValue ? 'Yes' : 'No',
                strPharmacyDetailValue = pharmacyDetailValue ? 'Yes' : 'No';
                reportName = 'reporthraform01.p';
                input = this.getViewModel().data.recipientId + "|" + strPrintHraSummaryValue + "|" + strPharmacyDetailValue + "";

        } else if(memberProfileValue) {
                var currentDate = new Date(),
                    lastyearDate = Ext.Date.add(new Date(), Ext.Date.YEAR, -1);
                    input = this.getViewModel().data.recipientId + "|"+ Ext.util.Format.date(lastyearDate, 'm/d/Y')+"|"+ Ext.util.Format.date(currentDate, 'm/d/Y')+"|"+ this.getViewModel().data.lobId;
                    reportName = 'memberprofilereportpcp.p';
        }
        if(reportName != ''){
            var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});
                requestModel.phantom = false;
                requestModel.getProxy().url = 'eligibility/hp/runreport64';
                requestModel.getProxy().setExtraParam('pReportName', reportName);
                requestModel.getProxy().setExtraParam('pParameters', input);
                requestModel.getProxy().setExtraParam('pRegenReport', 2);
                requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
                requestModel.getProxy().setExtraParam('pJobNum', 0);
                requestModel.getProxy().setExtraParam('userState', user.homeState);
                requestModel.save({
                    success: function (response, operation) {
                        var obj = Ext.JSON.decode(operation._response.responseText),
                            base64EncodedPDF = obj.data;
                        if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                            if (obj.metadata.pStatus != ''){
                                Ext.Msg.alert('Error',obj.metadata.pStatus);
                            } else {
                                Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function () {
                                });
                            }
                        } else {
                            Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                        }
                    }
                });
        }

        this.getView().up('window').close();
    }


});