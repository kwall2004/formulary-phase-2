// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.InquiryWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.homeinquirywindow',

  init: function () {
    var vm = this.getViewModel(),
      metaData = vm.getData().metaData,
      medicaidData = metaData.tt_Coverage.tt_Coverage,
      hedisData = metaData.tt_Hedis.tt_Hedis,
      countsData = metaData.ttCounts.ttCounts,
      medicaidStore = vm.getStore('medicaidStore'),
      hedisStore = vm.getStore('hedisStore'),
      countsStore = vm.getStore('serviceCountsStore'),
      currentDateTime = new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear() +
      ' - ' + new Date().getHours() + ':' + new Date().getMinutes();

    vm.set('currentDateTime', currentDateTime);

    medicaidStore.getProxy().setData(null);
    medicaidStore.getProxy().setData(medicaidData);
    medicaidStore.reload();

    hedisStore.getProxy().setData(null);
    hedisStore.getProxy().setData(hedisData);
    hedisStore.reload();

    countsStore.getProxy().setData(null);
    countsStore.getProxy().setData(countsData);
    countsStore.reload();
  },

  onOKClick: function () {
    this.getView().destroy();
  },

  onPrintClick: function () {
    var conrtolNum = this.getViewModel().getData().controlNum;

    this.displayReportFile('print271.p', conrtolNum, 2, 'pdf', 0);

    Ext.MessageBox.show({
      title: 'Request Submitted',
      msg: 'Please Wait...',
      closable: false
    });
  },

  displayReportFile: function (reportName, params, regenReport, outputType, jobNum) {
    var notificationPrintModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {});

    notificationPrintModel.phantom = false;
    notificationPrintModel.getProxy().url = 'eligibility/hp/runreport64';
    notificationPrintModel.getProxy().setExtraParam('pReportName', reportName);
    notificationPrintModel.getProxy().setExtraParam('pParameters', params);
    notificationPrintModel.getProxy().setExtraParam('pRegenReport', regenReport);
    notificationPrintModel.getProxy().setExtraParam('pOutputType', outputType);
    notificationPrintModel.getProxy().setExtraParam('pJobNum', jobNum);
    notificationPrintModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    notificationPrintModel.save({
      success: function (response, operation) {
        var base64String = Ext.JSON.decode(operation._response.responseText).data;

        if (null !== base64String && '' !== base64String) {
          if ('pdf' === outputType) {
            Atlas.common.utility.Utilities.displayDocument('pdf', base64String);
            Ext.MessageBox.hide();
          }
        } else if (null !== base64String && '' === base64String) {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        } else {
          Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
        }
      },
      failure: function () {
        Ext.MessageBox.alert('Request Failed', 'Unknown Failure.');
      }
    });
  }
});