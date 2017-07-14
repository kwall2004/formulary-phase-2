/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Provider Main
 * Description: Gives users a place to view Provider Info
 */
Ext.define('Atlas.portals.view.provider.ProviderMain', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsProviderMain',
  title: 'Provider',
  controller: 'portalsprovidermain',
  viewModel: {
    data: {
      providerId: '',
      providerDetails: {},
      lobSelected: ''
    }
  },
  scrollable: true,

  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    scrollable: true,
    items: [{
      xtype: 'form',
      scrollable: true,
      minWdith: 1600,
      maxWdith: 1600,
      flex: 1,
      width: '100%',
      reference: 'providerForm',
      title: 'Provider',
      cls: 'card-panel',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [{
        xtype: 'container',
        layout: 'hbox',
        title: 'Provider',
        items: [{
          xtype: 'combo',
          fieldLabel: 'Provider',
          labelWidth: 65,
          width: 350,
          reference: 'providerComboRef',
          displayField: 'key',
          allowBlank: false,
          valueField: 'value',
          queryMode: 'local',
          listeners: {
            select: 'onProviderComboSelected'
          }
        }, {
          xtype: 'combo',
          fieldLabel: 'LOB',
          labelWidth: 35,
          reference: 'lobRef',
          name: 'lob',
          displayField: 'key',
          valueField: 'value',
          queryMode: 'local',
          readOnly: false,
          disabled: true,
          listeners: {
            select: 'onLobComboSelected'
          }
        }, {
          xtype: 'combo',
          labelWidth: 65,
          width: 300,
          fieldLabel: 'Specialty',
          reference: 'specialityRef',
          disabled: true
        }]
      }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
          labelWidth: 70,
          xtype: 'checkboxfield',
          style: {
            padding: '0 0 0 20px'
          }
        },
        items: [{
          boxLabel: 'In Plan',
          reference: 'inPlanRef'
        }, {
          boxLabel: 'PCP',
          reference: 'pcpRef'
        }, {
          boxLabel: 'Accepting New Members',
          reference: 'AcceptNewMemRef'
        }, {
          boxLabel: 'Provider Open',
          reference: 'providerOpenRef'
        }]
      }]

    },
    {
      xtype: 'tabpanel',
      cls: 'formPanel',
      minWdith: 1600,
      maxWdith: 1600,
      flex: 1,
      width: '100%',
      scrollable: true,
      padding: 20,
      reference: 'providerTabs',
      activeTab: 0,
      items: [{
        title: 'Enrollment',
        xtype: 'portalsProviderEnrollment'
      }, {
        title: 'HEDIS',
        xtype: 'portalsproviderhedis'
      }, {
        title: 'Claim Status',
        xtype: 'portalsProviderClaims'
      }, {
        title: 'HEDIS Self Reporting',
        xtype: 'portalsProviderHEDISSelfReporting'
      }, {
        title: 'Hospital Reports',
        xtype: 'portalsProviderHospitalReports'
      }]
    }]
  }]
});