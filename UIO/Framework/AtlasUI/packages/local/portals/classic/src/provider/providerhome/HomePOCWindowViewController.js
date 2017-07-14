// k3279 - Kevin Tabasan - 12/29//2016

Ext.define('Atlas.portals.view.provider.providerhome.HomePOCWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.homepocwindow',

  onCancelClick: function () {
    this.getView().destroy();
  },

  onAllChecked: function () {
    var checkboxItems = this.lookup('pocCheckboxForm').items,
      allChk = checkboxItems.items[0],
      pocChk = checkboxItems.items[1],
      memberChk = checkboxItems.items[2];

    if (true === allChk.getValue()) {
      pocChk.setDisabled(true);
      pocChk.setValue(false);
      memberChk.setDisabled(true);
      memberChk.setValue(false);
    } else {
      pocChk.setDisabled(false);
      memberChk.setDisabled(false);
    }
  },

  onOKClick: function () {
    var checkboxItems = this.lookup('pocCheckboxForm').items,
      allChkValue = checkboxItems.items[0].getValue(),
      pocChkValue = checkboxItems.items[1].getValue(),
      memberChkValue = checkboxItems.items[2].getValue(),
      gridSelection = this.getViewModel().getData().selectedRow,
      jobNumber = this.getViewModel().getData().selectedRow.jobNum,
      params = Atlas.user.un + '|' + gridSelection.recipientID + '|Member Objective Profile - ';

    if (false === allChkValue && true === pocChkValue && false === memberChkValue) {
      this.displayPoCFile('', '', 3, 'pdf', jobNumber);
    } else if (false === allChkValue && false === pocChkValue && true === memberChkValue) {
      this.displayMOPFile(params);
    } else {
      this.displayPoCFile('', '', 3, 'pdf', jobNumber);
      this.displayMOPFile(params);
    }
  },

  displayMOPFile: function (params) {
    var mopModel = Ext.create('Atlas.portals.provider.model.MopReportWeb', {});

    mopModel.phantom = false;
    mopModel.getProxy().url = 'provider/hp/mopreportweb';
    mopModel.getProxy().setExtraParam('pParameters', params);
    mopModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    mopModel.save({
      success: function () {
        Ext.MessageBox.alert('Request Submitted', 'Member Object Profile Report has been submitted to the queue. ' +
        'Please go to the HOME tab and click the refresh button on the messages panel. Report may take several ' +
        'minutes to complete.');
      },
      failure: function () {
        Ext.MessageBox.alert('Request Failed', 'Internal Server Error.');
      }
    });
  },

  displayPoCFile: function (reportName, params, regenReport, outputType, jobNum) {
    var pocModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {});

    pocModel.phantom = false;
    pocModel.getProxy().url = 'eligibility/hp/runreport64';
    pocModel.getProxy().setExtraParam('pReportName', reportName);
    pocModel.getProxy().setExtraParam('pParameters', params);
    pocModel.getProxy().setExtraParam('pRegenReport', regenReport);
    pocModel.getProxy().setExtraParam('pOutputType', outputType);
    pocModel.getProxy().setExtraParam('pJobNum', jobNum);
    pocModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    pocModel.save({
      success: function (response, operation) {
        var base64String = Ext.JSON.decode(operation._response.responseText).data;

        if (null !== base64String && '' !== base64String) {
          if ('pdf' === outputType) {
            Atlas.common.utility.Utilities.displayDocument('pdf', base64String);
            Ext.MessageBox.hide();
          } else if ('xls' === outputType) {
            Atlas.common.utility.Utilities.displayDocument('xls', base64String);
            Ext.MessageBox.hide();
          }
        } else if (null !== base64String && '' === base64String) {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        } else {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        }
      },
      failure: function () {
        Ext.MessageBox.alert('Request Failed', 'Internal Server Error.');
      }
    });
  }
});