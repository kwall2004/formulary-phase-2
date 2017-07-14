Ext.define('Atlas.portals.provider.VendorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsprovidervendor',

  init: function () {
    this.loadVendorCombo();
  },

  onSearchClick: function (taxIDInput) {
    var searchParam = null,
      taxID = taxIDInput,
      vendorLedgerMasterStore = this.getStore('vendorLedgerMaster'),
      vendorLedgerMasterProxy = vendorLedgerMasterStore.getProxy(),
      lobComboValue = this.lookup('lobCombo').value,
      dateFromFull = this.lookup('dateFrom').value,
      dateToFull = this.lookup('dateTo').value,
      dateFromInput = dateFromFull.getMonth() + 1 + '/' + dateFromFull.getDate() + '/' + dateFromFull.getFullYear(),
      dateToInput = dateToFull.getMonth() + 1 + '/' + dateToFull.getDate() + '/' + dateToFull.getFullYear(),
      vendorCombo = this.lookup('vendorCombo');

    if (taxIDInput === undefined || taxIDInput.componentCls !== undefined) {
      taxID = vendorCombo.lastSelection[0].data.value;
    }

    if ('All' === lobComboValue) {
      searchParam = 'taxID=\'' + taxID + '\' AND checkDate>=\'' +
      dateFromInput + '\' AND checkDate<=\'' + dateToInput + '\'';
    } else {
      searchParam = 'taxID=\'' + taxID + '\' AND checkDate>=\'' +
      dateFromInput + '\' AND checkDate<=\'' + dateToInput + '\' AND lobID=\'' + lobComboValue + '\'';
    }

    vendorLedgerMasterProxy.setExtraParam('pRowid', 0);
    vendorLedgerMasterProxy.setExtraParam('pRowNum', 0);
    vendorLedgerMasterProxy.setExtraParam('pRows', 0);
    vendorLedgerMasterProxy.setExtraParam('pWhere', searchParam);
    vendorLedgerMasterProxy.setExtraParam('pSort', 'checkDate desc');
    vendorLedgerMasterProxy.setExtraParam('userState', Atlas.user.providerStateSelected);
    vendorLedgerMasterStore.load();
  },

  loadVendorCombo: function () {
    var vm = this.getViewModel(),
      me = this,
      providerTaxIdStore = vm.getStore('providerTaxId'),
      vendorComboStore = vm.getStore('vendorComboStore'),
      vendorCombo = this.lookup('vendorCombo');

    providerTaxIdStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerTaxIdStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    providerTaxIdStore.load({
      callback: function (record, operation) {
        var inputArray = Ext.JSON.decode(operation._response.responseText).metadata.pVendorList.split('|'),
          j = 0,
          vendorObjectArray = [];

        vendorComboStore.getProxy().setData(null);

        for (j = 0; j < inputArray.length; j += 2) {
          vendorObjectArray.push({
            name: inputArray[j + 1],
            value: inputArray[j]
          });
        }

        vendorComboStore.getProxy().setData(vendorObjectArray);
        vendorComboStore.reload();
        vendorCombo.setValue(inputArray[1]);
        me.onSearchClick(inputArray[0]);
      }
    });
  },

  onPrintClick: function () {
    var grid = this.lookup('detailsGrid'),
      selection = grid.getView().getSelectionModel().getSelection()[0],
      vendorModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {}),
      selectionData = selection.getData(),
      taxID = selectionData.taxID,
      seqNum = selectionData.seqNum,
      checkNum = selectionData.checkNum,
      checkDateMonth = selectionData.checkDate.substring(5, 7),
      checkDateDay = selectionData.checkDate.substring(8, 10),
      checkDateYear = selectionData.checkDate.substring(0, 4),
      checkDate = checkDateMonth + '/' + checkDateDay + '/' + checkDateYear,
      params = taxID + '|||' + seqNum + '|' + checkNum + '||' + checkDate;

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a record first.');
    } else {
      Ext.MessageBox.show({
        title: 'Request Submitted',
        msg: 'Please Wait...',
        closable: false
      });

      vendorModel.phantom = false;
      vendorModel.getProxy().url = 'eligibility/hp/runreport64';
      vendorModel.getProxy().setExtraParam('pReportName', 'remitdetailreport.p');
      vendorModel.getProxy().setExtraParam('pParameters', params);
      vendorModel.getProxy().setExtraParam('pRegenReport', 2);
      vendorModel.getProxy().setExtraParam('pOutputType', 'PDF');
      vendorModel.getProxy().setExtraParam('pJobNum', 0);
      vendorModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
      vendorModel.save({
        success: function (response, operation) {
          var base64String = Ext.JSON.decode(operation._response.responseText).data;

          if (null !== base64String && '' !== base64String) {
            Atlas.common.utility.Utilities.displayDocument('pdf', base64String);
            Ext.MessageBox.hide();
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
  },

  onCreate835Click: function () {
    var grid = this.lookup('detailsGrid'),
      selection = grid.getView().getSelectionModel().getSelection()[0],
      vendorModel = Ext.create('Atlas.portals.provider.model.PrintNotification', {}),
      selectionData = selection.getData(),
      seqNum = selectionData.seqNum,
      remitBatch = selectionData.remitBatch,
      params = remitBatch + '||ERATXT|NO|' + seqNum;

    if (selection === undefined) {
      Ext.MessageBox.alert('Selection', 'Please Select a record first.');
    } else {
      Ext.MessageBox.show({
        title: 'Request Submitted',
        msg: 'Please Wait...',
        closable: false
      });

      vendorModel.phantom = false;
      vendorModel.getProxy().url = 'eligibility/hp/runreport64';
      vendorModel.getProxy().setExtraParam('pReportName', 'make004010x091a1.p');
      vendorModel.getProxy().setExtraParam('pParameters', params);
      vendorModel.getProxy().setExtraParam('pRegenReport', 2);
      vendorModel.getProxy().setExtraParam('pOutputType', 'txt');
      vendorModel.getProxy().setExtraParam('pJobNum', 0);
      vendorModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
      vendorModel.save({
        success: function (response, operation) {
          var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
            base64String = Ext.JSON.decode(operation._response.responseText).data,
            status = metadata.pStatus.toLowerCase(),
            txtArray = Ext.util.Base64.decode(base64String).split('~'),
            txt835 = '',
            html835 = '',
            i = 0,
            vendor835Window = null;

          if (0 === status.indexOf('no remittance')) {
            Ext.MessageBox.alert('Alert', 'No remittance detail found.');
          } else if (null !== base64String && '' !== base64String) {
            Ext.MessageBox.hide();

            for (i = 0; i < txtArray.length - 1; i++) {
              txt835 += txtArray[i] + '~';
              html835 += txtArray[i] + '~<br>';
            }

            vendor835Window = new Atlas.portals.view.provider.Vendor835({
              itemConfig: {
                txt835: txt835,
                html835: html835
              }
            });

            vendor835Window.show();
          } else if (null !== base64String && '' === base64String) {
            Ext.MessageBox.hide();
            Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
          } else {
            Ext.MessageBox.hide();
            Ext.MessageBox.alert('Request Failed', 'Document Not Found.');
          }
        },
        failure: function () {
          Ext.MessageBox.alert('Request Failed', 'Unknown Failure.');
        }
      });
    }
  }
});