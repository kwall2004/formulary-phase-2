/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.view.rxmember.ClaimsSearchController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.claimSearchController',

  init: function () {
    var claimRecord = this.getView().claimRecord;

    if (!this.getView().isClaimPassed) {
      return;
    }
    this.lookupReference('dateFrom').setValue(claimRecord.get('svcdate'));
    this.lookupReference('dateTo').setValue(claimRecord.get('svcdate'));
    this.lookupReference('RxNum').setValue(claimRecord.get('rxid'));
    this.lookupReference('NDC').setValue(claimRecord.get('ndc'));
    this.onSearchClick();
  },

  onSearchClick: function () {
    var dateFrom = this.lookupReference('dateFrom').getRawValue(),
      dateTo = this.lookupReference('dateTo').getRawValue(),
      RxNum = this.lookupReference('RxNum').getRawValue(),
      NDC = this.lookupReference('NDC').getValue(),
      searchFilter = 'respStatus = \'P\' ',
      dateFromSearch = '',
      dateToSearch = '',
      vm = this.getViewModel(),
      recipientID = vm.get('user').retRecipientID,
      claimSearchStore = vm.getStore('claimSearchStore');

    if (null !== dateFrom && '' !== dateFrom) {
      dateFromSearch = ' AND serviceDate >=\'' + dateFrom + '\'';

      searchFilter += dateFromSearch;
    }
    if (null !== dateTo && '' !== dateTo) {
      dateToSearch = ' AND serviceDate <=\'' + dateTo + '\'';

      searchFilter += dateToSearch;
    }
    if (null !== NDC && '' !== NDC) {
      searchFilter = searchFilter + ' AND NDC = \'' + NDC + '\'';
    }
    if (null !== RxNum && '' !== RxNum) {
      searchFilter = searchFilter + ' AND RxNum = \'' + RxNum + '\'';
    }

    claimSearchStore.getProxy().setExtraParam('pWhere', searchFilter);
    claimSearchStore.getProxy().setExtraParam('pKeyValue', recipientID);
    claimSearchStore.getProxy().setExtraParam('pKeyType', 'recipientID');
    claimSearchStore.getProxy().setExtraParam('pOverdueAlert', 'No');
    claimSearchStore.load({
      scope: this,
      callback: function (records) {
        if (0 < records.length) {
          this.lookupReference('ExportButton').enable();
        } else {
          this.lookupReference('ExportButton').disable();
        }
      }
    });
  },

  onResetClick: function () {
    var vm = this.getViewModel(),
      claimSearchStore = vm.getStore('claimSearchStore');

    claimSearchStore.removeAll();
    this.lookupReference('dateFrom').setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, -3));
    this.lookupReference('dateTo').setValue(new Date());
    this.lookupReference('RxNum').setValue('');
    this.lookupReference('NDC').setValue('');
    this.lookupReference('ExportButton').disable();
  },


  onDrugSearchClick: function (component) {
    var brandName = component.getWidgetRecord().data.brandname,
      medication = component.getWidgetRecord().data.medication;

    this.fireEvent('openView', 'rxmember', 'portals', 'rxmember_DrugSearch', {
      brand: brandName,
      medication: medication,
      atlasId: brandName
    });
  },
  onPharmacyClick: function (component) {
    var vm = this.getViewModel(),
      pharmacyInfoStore = vm.getStore('pharmacyInfoStore');

    pharmacyInfoStore.getProxy().setExtraParam('pKeyType', 'NCPDPID');
    pharmacyInfoStore.getProxy().setExtraParam('pKeyValue', component.getWidgetRecord().data.ncpdpid);
    pharmacyInfoStore.getProxy().setExtraParam('pFieldList', 'ncpdpid,name,locCity,locState,locAddress1,' +
        'locAddress2,locZip,locPhone,locPhoneExt,locFax');
    pharmacyInfoStore.load(
      {
        scope: this,
        callback: function (records) {
          var window = Ext.ComponentQuery.query('window[itemId=viewPharmacyWindow]')[0];

          if (!window) {
            Ext.create('Ext.window.Window', {
              itemId: 'viewPharmacyWindow',
              autoheight: true,
              width: 400,
              modal: true,
              layout: 'fit',
              closable: false,
              session: {
                schema: 'atlas'
              },
              viewModel: {
                links: {
                  modalRecord: records[0]
                }
              },
              items: [{
                xtype: 'portalsrxmemberpharmacyinfo'
              }]
            }).show();
          } else {
            window.show();
          }
        }
      }
        );
  },
  onPrescriberClick: function (component) {
    var vm = this.getViewModel(),
      prescriberInfoStore = vm.getStore('prescriberInfoStore');

    prescriberInfoStore.getProxy().setExtraParam('pKeyType', 'npi');
    prescriberInfoStore.getProxy().setExtraParam('pKeyValue', component.getWidgetRecord().data.npi);
    prescriberInfoStore.getProxy().setExtraParam('pFieldList', 'npi,firstname,lastname,locaddr1,locaddr2,loccity,' +
        'locfax,locname,locphone,locstate,loczip,specialty');
    prescriberInfoStore.load(
      {
        scope: this,
        callback: function (records) {
          var window = Ext.ComponentQuery.query('window[itemId=viewPrescriberWindow]')[0];

          if (!window) {
            window = Ext.create('Ext.window.Window', {
              reference: 'viewPrescriberWindow',
              autoheight: true,
              width: 400,
              modal: true,
              layout: 'fit',
              closable: false,
              session: {
                schema: 'atlas'
              },
              viewModel: {
                links: {
                  modalRecord: records[0]
                }
              },
              items: [{
                xtype: 'portalsrxmemberprescriberinfo'
              }]
            }).show();
          } else {
            window.show();
          }
        }
      }
        );
  },

  onExportClick: function () {
    this.getView().items.map.claimSearchMemberGrid.saveDocumentAs({
      type: 'xlsx',
      title: 'Member Claim Search',
      fileName: 'MemberClaimSearch.xlsx'
    });
  }

});