/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.view.LTCDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ltcdetailscontroller',
    listen: {
        controller: {
            'casedetailscontroller': {
                LoadLTC: 'LoadLTC'
            }
        }
    },
    init: function () {
        this.LoadLTC();
    },
    LoadLTC: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != "") {
            view.down('#btnAdd').setDisabled(false);
            var StoreLTC = vm.getStore('StoreLTC');
            StoreLTC.getProxy().setExtraParam('pMTMId', view.up('CaseInfo').down('#hiddenMTMID').getValue());
            StoreLTC.getProxy().setExtraParam('pSystemId', 0);
            StoreLTC.getProxy().setExtraParam('pRecordType', 'LTC');
            StoreLTC.load();
        }
        else {
            view.down('#btnAdd').setDisabled(true);
        }
    },
    btnAddClick: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagement-AddLTCDetails',
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.setTitle('Add LTC Details');
        win.down('#formAddLTC').reset();
        this.getView().add(win);
        win.show();
    },
    gpLTC_Click: function (dv, record, item, index, e) {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagement-AddLTCDetails',
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.setTitle('Update LTC Details');
        win.down('#formAddLTC').reset();
        win.down('#formAddLTC').loadRecord(record);
        win.down('#btnDeleteLTC').setDisabled(false);
        this.getView().add(win);
        win.show();
    },
    btn_SaveClick: function () {
        var view = this.getView();
        if (view.down('#cbxLTCEnrolled').getValue() == '' &&
            view.down('#dtLTCEntrollStartDate').getValue() == '' && view.down('#dtLTCEntrollEndDate').getValue() == '') {
            Ext.Msg.alert('PBM', 'Please enter LTC Details and click Save.');
            return false;
        }
        else if(view.down('#cbxLTCEnrolled').getValue() == null)
        {
            Ext.Msg.alert('PBM', 'Please enter LTC Details and click Save.');
            return false;
        }
        else {
            var result;
            var message;
            var serviceType = "";
            var oCaseDetSystemId;
            var view = this.getView();

            try {
                var Mode = "";
                var systemId = view.down('#hdnLTCSystemId').getValue();
                var MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                var sMessage = "";

                if (MTMId == "" || MTMId == "0")
                    return;

                if (systemId == "0" || systemId.length <= 0) {
                    Mode = "A";
                    sMessage = "Added LTC Details Successfully.";
                }
                else {
                    Mode = "U";
                    sMessage = "Updated LTC Details Successfully.";
                }
                var ttMTMCaseDetails = {};
                var ttMTMCaseDetailssingle = {};
                ttMTMCaseDetailssingle.mode = Mode;
                ttMTMCaseDetailssingle.systemID = systemId;
                ttMTMCaseDetailssingle.MTMId = MTMId;
                ttMTMCaseDetailssingle.recordType = 'LTC';
                ttMTMCaseDetailssingle.CMRNonConfReason = "";
                ttMTMCaseDetailssingle.CMRDate = null;
                ttMTMCaseDetailssingle.TMRDate = null;
                ttMTMCaseDetailssingle.CMROfferDate = null;
                ttMTMCaseDetailssingle.LTCEnrolledNew = view.down('#cbxLTCEnrolled').getValue();
                ttMTMCaseDetailssingle.LTCEntrollStartDate = view.down('#dtLTCEntrollStartDate').getValue();
                ttMTMCaseDetailssingle.LTCEntrollEndDate = view.down('#dtLTCEntrollEndDate').getValue();
                ttMTMCaseDetailssingle.targetedReviews = "";
                ttMTMCaseDetailssingle.prescInterventions = "";
                ttMTMCaseDetailssingle.NPI = "";
                ttMTMCaseDetailssingle.prescriberName = "";
                ttMTMCaseDetailssingle.therapyChangeType = "";
                ttMTMCaseDetailssingle.therapyChangeDate = "";
                ttMTMCaseDetailssingle.interventionDate = null;
                ttMTMCaseDetailssingle.cmrOfferMethod = "";
                ttMTMCaseDetailssingle.cmrDelvMethod = "";
                ttMTMCaseDetailssingle.LicProfType = "";
                ttMTMCaseDetailssingle.cmrRecipient = "";
                var tempData = [];
                tempData.push(ttMTMCaseDetailssingle);
                ttMTMCaseDetails.ttMTMCaseDetails = tempData;
                if (ttMTMCaseDetails.ttMTMCaseDetails.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'ttMTMCaseDetails': ttMTMCaseDetails
                    };
                    var returnField = ['oCaseDetSystemId'];
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcasedetails/update', null, [false], extraParameters,
                        saveAction, null);
                    if (submitJobReturn.code == 0) {
                        Ext.Msg.alert("PBM", sMessage);
                        this.LoadLTC();
                        view.down('#AddLTCWindow').close();
                    }
                    else {
                        Ext.Msg.alert("PBM", submitJobReturn.message);
                    }
                }
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }
        }
        return true;
    },
    DeleteLTC: function () {
        var view = this.getView();
        var result;
        var message;
        var serviceType = "";
        var oCaseDetSystemId;
        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete the selected LTC Record?', function (btn) {
            if (btn == 'yes') {
                try {
                    var Mode = "D";
                    var systemId = view.down('#hdnLTCSystemId').getValue();
                    var MTMId = view.up('CaseInfo').down('#hiddenMTMID').getValue();
                    var sMessage = "Deleted LTC Details Successfully.";

                    if (MTMId == "" || MTMId == "0")
                        return;

                    var ttMTMCaseDetails = {};
                    var ttMTMCaseDetailssingle = {};
                    ttMTMCaseDetailssingle.mode = Mode;
                    ttMTMCaseDetailssingle.systemID = systemId;
                    ttMTMCaseDetailssingle.MTMId = MTMId;
                    ttMTMCaseDetailssingle.recordType = 'LTC';
                    ttMTMCaseDetailssingle.CMRNonConfReason = "";
                    ttMTMCaseDetailssingle.CMRDate = null;
                    ttMTMCaseDetailssingle.TMRDate = null;
                    ttMTMCaseDetailssingle.CMROfferDate = null;
                    ttMTMCaseDetailssingle.LTCEnrolledNew = "";
                    ttMTMCaseDetailssingle.LTCEntrollStartDate = null;
                    ttMTMCaseDetailssingle.LTCEntrollEndDate = null;
                    ttMTMCaseDetailssingle.targetedReviews = "";
                    ttMTMCaseDetailssingle.prescInterventions = "";
                    ttMTMCaseDetailssingle.NPI = "";
                    ttMTMCaseDetailssingle.prescriberName = "";
                    ttMTMCaseDetailssingle.therapyChangeType = "";
                    ttMTMCaseDetailssingle.therapyChangeDate = "";
                    ttMTMCaseDetailssingle.interventionDate = null;
                    ttMTMCaseDetailssingle.cmrOfferMethod = "";
                    ttMTMCaseDetailssingle.cmrDelvMethod = "";
                    ttMTMCaseDetailssingle.LicProfType = "";
                    ttMTMCaseDetailssingle.cmrRecipient = "";
                    var tempData = [];
                    tempData.push(ttMTMCaseDetailssingle);
                    ttMTMCaseDetails.ttMTMCaseDetails = tempData;
                    if (ttMTMCaseDetails.ttMTMCaseDetails.length > 0) {
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        var extraParameters = {
                            'ttMTMCaseDetails': ttMTMCaseDetails
                        };
                        var returnField = ['oCaseDetSystemId'];
                        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcasedetails/update', null, [false], extraParameters,
                            saveAction, null);
                        if (submitJobReturn.code == 0) {
                            Ext.Msg.alert("PBM", sMessage);
                            this.LoadLTC();
                            view.down('#AddLTCWindow').close();
                        }
                        else {
                            Ext.Msg.alert("PBM", submitJobReturn.message);
                        }
                    }
                }
                catch (ex) {
                    Ext.Msg.alert("Exception", ex.message);
                }
            }
        }, this)
    },
    btn_Cancel:function()
    {
        var view = this.getView();
        view.down('#AddLTCWindow').close();
    }
})
