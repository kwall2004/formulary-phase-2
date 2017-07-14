/**
 * Created by rsalekin on 12/28/2016.
 */
Ext.define('Atlas.pharmacy.view.SendFaxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sendfax',

    init: function () {
        var view = this.getView();
        if (view.extraParams) {
            var sendFaxParams = view.extraParams["pSendFaxParams"];

            if (sendFaxParams) {
                view.down('#lblOrg').setValue(sendFaxParams.Org);
                view.down('#txtTo').setValue(sendFaxParams.FaxTo);
                view.down('#txtFaxNum').setValue(sendFaxParams.FaxNumber);
                view.down('#txtRe').setValue(sendFaxParams.ReferenceForm);

                var today = Atlas.common.utility.Utilities.getLocalDateTime() ;
                view.down('#txtDate').setValue((today.getMonth() + 1).toString() + '/' + today.getDate().toString() + '/' + today.getFullYear().toString());
                var user = Ext.create('Atlas.common.model.merlin.User');
                user.getProxy().setExtraParam('pUserName', Atlas.user.un);
                user.getProxy().setExtraParam('pFieldList', 'firstname,lastname');
                user.load({
                    callback: function (userInfo, operation, success) {
                        view.down('#txtFrom').setValue(userInfo.get('firstname') + ' ' + userInfo.get('lastname'));
                    }
                });
            }
        }
    },

    onPreviewFax: function () {
        var view = this.getView();
        if (view.down('#formSendFax').getForm().isValid()) {
            var faxNumber = view.down('#txtFaxNum').getValue().match(/\d/g).join('');
            if (faxNumber && faxNumber.length == 10) {
                faxNumber = faxNumber.substring(0, 3) + '-' + faxNumber.substring(3, 6) + '-' + faxNumber.substring(6);
                var parameters = view.down('#txtTo').getValue() + "|" +
                    view.down('#txtFrom').getValue() + "|" +
                    faxNumber + "|" +
                    view.down('#txtDate').getValue() + "|" +
                    view.down('#txtPages').getValue() + "|" +
                    view.down('#txtRe').getValue() + "|" +
                    view.down('#txtMessage').getValue() + "|" +
                    (view.down('#chkAttachment').getValue() ? 'FORM30 MRx Electronic Funds Transfer Form' : '') +
                    '|true|8669846462|3132021255|Network Management';

                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                var extraParameters = {
                    pDescription: 'EFT Fax - ' + view.down('#lblOrg').getValue(),
                    pProgramName: 'sendfax.p',
                    pParameters: parameters,
                    pRunMode: 1,
                    pProgramType: 'Report',
                    pSaveDocument: false,
                    pFaxNumber: faxNumber
                };

                var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                    saveAction, ['pDocumentID', 'pData']);
               var  docData = setsubmitjob.pData;
                if (setsubmitjob.code == 0) {
                    Atlas.common.utility.Utilities.displayDocument('pdf', docData);
                }
                else {
                    Ext.Msg.alert('Error', setsubmitjob.message);
                }
            }
            else {
                Ext.Msg.alert('Message', 'Please enter valid fax number before proceeding.');
            }
        }
    },

    formatFaxNumber: function (control, e) {
        var i;
        var returnString = '';
        var s = control.getValue();
        if (s.charAt(0) == '+') {
            return false;
        }
        filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';

        /* Search through string and append to unfiltered values
         to returnString. */
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }
        control.setValue(returnString);

        return false;
    },

    onSendFax: function (btn) {
        var view = this.getView();
        if (view.down('#formSendFax').getForm().isValid()) {
            var faxNumber = view.down('#txtFaxNum').getValue().match(/\d/g).join('');
            if (faxNumber && faxNumber.length == 10) {
                faxNumber = faxNumber.substring(0, 3) + '-' + faxNumber.substring(3, 6) + '-' + faxNumber.substring(6);

                var parameters = view.down('#txtTo').getValue() + "|" +
                    view.down('#txtFrom').getValue() + "|" +
                    faxNumber + "|" +
                    view.down('#txtDate').getValue() + "|" +
                    view.down('#txtPages').getValue() + "|" +
                    view.down('#txtRe').getValue() + "|" +
                    view.down('#txtMessage').getValue() + "|" +
                    (view.down('#chkAttachment').getValue() ? 'FORM30 MRx Electronic Funds Transfer Form' : '') +
                    '|true|8669846462|3132021255|Network Management';

                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                var extraParameters = {
                    pDescription: 'EFT Fax - ' + view.down('#lblOrg').getValue(),
                    pProgramName: 'sendfax.p',
                    pParameters: parameters,
                    pRunMode: 2,
                    pProgramType: 'Fax',
                    pSaveDocument: false,
                    pFaxNumber: faxNumber
                };

                var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                    saveAction, ['pDocumentID']);
                if (setsubmitjob.code == 0) {
                    Ext.Msg.alert('Fax', 'Please check your fax status in Job Queue.');
                    btn.up('window').close();
                }
                else {
                    Ext.Msg.alert('Error', setsubmitjob.message);
                }
            }
            else {
                Ext.Msg.alert('Message', 'Please enter valid fax number before proceeding.');
            }
        }
    }
});
