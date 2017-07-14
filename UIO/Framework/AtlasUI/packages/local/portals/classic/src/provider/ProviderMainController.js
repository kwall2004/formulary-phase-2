/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Provider Main
 * Description: Provider Main controller
 */
Ext.define('Atlas.portals.provider.ProviderMainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsprovidermain',

  init: function () {
    this.callProviderList();
  },

  maybeLoadClaimStatus: function () {
    var id = this.getView().memberId,
      tab = this.getView().activeTab,
      fromDate = this.getView().fromDate;

    if (!tab) {
      return;
    }
    this.lookupReference('providerTabs').setActiveTab(2);
    this.fireEvent('claimStatusSet', id, fromDate);
  },

  onProviderComboSelected: function () {
    var providerLobListStore = Ext.create('Atlas.portals.provider.model.ProviderLobList', {}),
      me = this,
      i = 0;

    providerLobListStore.getProxy().setExtraParam('pProvID', this.lookupReference('providerComboRef').getValue());
    providerLobListStore.getProxy().setExtraParam('pDelimiter', ',');
    providerLobListStore.load({
      callback: function (record, operation) {
        var providerLobMap = [],
          results = Ext.JSON.decode(operation._response.responseText).metadata.pLOBList,
          splitValues = [],
          providerLobStore = new Ext.data.ArrayStore({});

        splitValues = results.split(',');
        providerLobMap.push({
          key: 'All',
          value: 'All'
        });
        if (0 < splitValues.length) {
          for (i = 0; i < splitValues.length; i += 2) {
            providerLobMap.push({
              key: splitValues[i],
              value: splitValues[i + 1]
            });
          }
        }

        providerLobStore.add(providerLobMap);
        me.lookupReference('lobRef').setStore(providerLobStore);
        me.lookupReference('lobRef').setValue('All');
        me.getView().getViewModel().set('lobSelected', me.lookupReference('lobRef').getValue());
        me.lookupReference('lobRef').setDisabled(false);
        me.getProviderData();
      }
    });
  },

  onLobComboSelected: function () {
    this.getView().getViewModel().set('lobSelected', this.lookupReference('lobRef').getValue());
    this.getProviderData();
  },

  callProviderList: function () {
    var providerListStore = Ext.create('Atlas.portals.provider.model.ProviderList', {}),
      me = this,
      allProviders = [];

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load({
      scope: this,
      callback: function (record, operation) {
        var providerMap = [],
          results = Ext.JSON.decode(operation._response.responseText).data,
          providerStore = new Ext.data.ArrayStore({}),
          i = 0;

        if (0 < results.length) {
          for (i = 0; i < results.length; i++) {
            providerMap.push({
              key: results[i].lastName + ', ' + results[i].firstName,
              value: results[i].provID
            });

            allProviders.push(results[i].provID);
          }

          providerStore.add(providerMap);
          me.lookupReference('providerComboRef').setStore(providerStore);
        }

        me.fireEvent('providersLoaded', allProviders);
        me.maybeLoadClaimStatus();
      }
    });
  },

  getProviderData: function () {
    var providerDataStore = Ext.create('Atlas.portals.provider.model.ProviderDataExtWeb', {}),
      me = this,
      tabName = this.lookupReference('providerTabs').getActiveTab().getTitle();

    providerDataStore.getProxy().setExtraParam('pProvID', this.lookupReference('providerComboRef').getValue());
    providerDataStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerDataStore.getProxy().setExtraParam('pFieldList', 'provID, lastName, firstName, @PCP, @inPlan, ' +
    '@acceptNewPatients, @providerType, @provOpen, @providerSpecialty, @providerSpecialities, ' +
    'npinNum, @primaryTIN, @taxonomy');
    providerDataStore.getProxy().setExtraParam('pLobID', this.lookupReference('lobRef').getValue());
    providerDataStore.load({
      scope: this,
      callback: function (record) {
        var str = null,
          converted = null,
          providerdetails = null,
          specialties = null;

        if (!record) {
          Ext.Msg.alert('Error', 'There was an error searching for this provider.');

          return;
        }

        str = JSON.stringify(record.data).replace(/@|\./g, '');
        converted = JSON.parse(str);
        converted.selectedLob = me.lookupReference('lobRef').value;
        me.getView().getViewModel().set('providerDetails', converted);
        providerdetails = me.getView().getViewModel().get('providerDetails');
        me.lookupReference('inPlanRef').setValue(false);
        me.lookupReference('pcpRef').setValue(false);
        me.lookupReference('AcceptNewMemRef').setValue(false);
        me.lookupReference('providerOpenRef').setValue(false);
        if ('' !== record.get('@inPlan') && 'yes' === record.get('@inPlan')) {
          me.lookupReference('inPlanRef').setValue(true);
        }
        if ('' !== record.get('@PCP') && 'yes' === record.get('@PCP')) {
          me.lookupReference('pcpRef').setValue(true);
        }
        if ('' !== record.get('@acceptNewPatients') && 'yes' === record.get('@acceptNewPatients')) {
          me.lookupReference('AcceptNewMemRef').setValue(true);
        }
        if ('' !== record.get('@provOpen') && 'yes' === record.get('@provOpen')) {
          me.lookupReference('providerOpenRef').setValue(true);
        }
        me.lookupReference('inPlanRef').setDisabled(true);
        me.lookupReference('pcpRef').setDisabled(true);
        me.lookupReference('AcceptNewMemRef').setDisabled(true);
        me.lookupReference('providerOpenRef').setDisabled(true);
        specialties = record.get('@providerSpecialities').split(',');

        if (1 < specialties.length) {
          me.lookup('specialityRef').setStore(specialties);
          me.lookup('specialityRef').setDisabled(false);
        } else {
          me.lookup('specialityRef').setDisabled(true);
        }

        me.lookupReference('specialityRef').setValue(specialties[0]);

        switch (tabName) {
        default:
          break;
        case 'Enrollment':
          me.fireEvent('providerDetailsSet', providerdetails);
          me.getView().getViewModel().set('providerId', record.get('provID'));
          break;
        case 'HEDIS':
          me.fireEvent('providerDetailsSet', providerdetails);
          me.getView().getViewModel().set('providerId', record.get('provID'));
          break;
        case 'Claim Status':
          me.fireEvent('providerDetailsSet', providerdetails);
          me.getView().getViewModel().set('providerId', record.get('provID'));
          break;
        case 'HEDIS Self Reporting':
          me.fireEvent('providerDetailsSet', providerdetails);
          me.getView().getViewModel().set('providerId', record.get('provID'));
          break;
        case 'Hospital Reports':
          me.fireEvent('providerDetailsSet', providerdetails);
          me.getView().getViewModel().set('providerId', record.get('provID'));
          break;
        }
      }
    });
  }
});