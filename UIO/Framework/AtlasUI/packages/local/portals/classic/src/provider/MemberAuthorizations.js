
Ext.define('Atlas.portals.view.provider.MemberAuthorizations', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberAuthorizations',
  title: 'Authorization',
  controller: 'MemberAuthorizationsController',

  viewModel: {
    stores: {
      MemberAuthStore: {
        model: 'Atlas.portals.model.MemberAuthorizations',
        remoteSort: true,
        remoteFilter: true
      },
      MemberAuthSearchStore: {
        model: 'Atlas.portals.model.MemberAuthorizationsSearch',
        remoteSort: true,
        remoteFilter: true
      },
      MemberAuthProviderStore: {
        model: 'Atlas.portals.model.MemberAuthorizationsProvider',
        remoteSort: true,
        remoteFilter: true
      },
      MemberAuthFacilityStore: {
        model: 'Atlas.portals.model.MemberAuthorizationsFacility',
        remoteSort: true,
        remoteFilter: true
      }
    },
    data: {
      'benefitPlanCode': ''
    }
  },

  items: [{
      xtype: 'form',
      reference: 'filtersForm',
      cls: 'card-panel',
      title: 'Selections',

      bbar: [{
        text: 'Refresh',
        handler: 'onSubmitClick'
      }, {
        xtype: 'displayfield',
        hidden: true,
        reference: 'errorMessageRef'
      }],

      layout: 'hbox',

      defaults: {
        xtype: 'textfield'
      },

      items: [
        {
          fieldLabel: 'memberRep:',
          name: 'memberRep',
          reference: 'memberRep',
          hidden: true
        },
        {
          fieldLabel: 'lobRep:',
          name: 'lobRep',
          reference: 'lobRep',
          hidden: true
        },
        {
          fieldLabel: 'pcpRep:',
          name: 'pcpRep',
          reference: 'pcpRep',
          hidden: true
        }, {
          fieldLabel: 'requestRep:',
          name: 'requestRep',
          reference: 'requestRep',
          hidden: true
        },
        {
          xtype: 'container',

          defaults: {
            xtype: 'combo',
            labelWidth: 130
          },

          items: [
            {
              name: 'Type',
              fieldLabel: 'Type',
              reference: 'TypeRef',
              queryMode: 'local',
              displayField: 'key',
              valueField: 'value'
            },
            {
              name: 'Provider',
              fieldLabel: 'Service Provider',
              reference: 'ProviderRef',
              queryMode: 'local',
              displayField: 'key',
              valueField: 'value'
            }
          ]
        },
        {
          xtype: 'container',

          defaults: {
            labelWidth: 120
          },

          items: [
            {
              xtype: 'datefield',
              fieldLabel: 'Date:',
              name: 'dateFrom',
              reference: 'dateFrom',
              format: 'm/d/Y',
              invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy'
            },
            {
              xtype: 'combo',
              name: 'Facility',
              fieldLabel: 'Service Facility',
              reference: 'FacilityRef',
              queryMode: 'local',
              displayField: 'key',
              valueField: 'value'
            }
          ]
        },
        {
          xtype: 'container',

          items: [
            {
              xtype: 'combo',
              name: 'Status',
              fieldLabel: 'Status',
              labelWidth: 65,
              reference: 'StatusRef',
              queryMode: 'local',
              displayField: 'key',
              valueField: 'value'
            }
          ]
        }
      ]
    },
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      scrollable: true,

      plugins: [{
        ptype: 'gridexporter'
      }],

      reference: 'memAuthGrid',

      requires: [
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.Exporter'
      ],

      tbar: [
        {
          text: 'Print Report',
          handler: 'onPrintReportClick'
        }, {
          text: 'Print Authorization',
          handler: 'onPrintAuthClick'
        }, {
          text: 'Accumulators',
          handler: 'onAccumClick'
        }, {
          text: 'Authorizations After 11/15/15',
          handler: 'onAuthAfterClick'
        }
      ],

      columns: [{
        dataIndex: 'requestID',
        text: 'Auth ID'
      }, {
        dataIndex: 'levelOfServiceDesc',
        text: 'Type',
        width: 125
      }, {
        dataIndex: 'startDate',
        text: 'From',
        width: 125,
        renderer: function (value) {
          var date = '';

          if (!value) {
            return date;
          }
          date = new Date(value);
          date.setDate(date.getDate() + 1);

          return Ext.Date.format(date, 'm/d/Y');
        }
      }, {
        dataIndex: 'endDate',
        text: 'To',
        width: 125,
        renderer: function (value) {
          var date = '';

          if (!value) {
            return date;
          }
          date = new Date(value);
          date.setDate(date.getDate() + 1);

          return Ext.Date.format(date, 'm/d/Y');
        }
      }, {
        dataIndex: 'requestStatus',
        text: 'Status',
        width: 125
      }, {
        dataIndex: 'PCP',
        text: 'PCP',
        width: 175,
        flex: 1
      }, {
        dataIndex: 'servicingProvider',
        text: 'Service Provider',
        width: 175,
        flex: 1
      }, {
        width: 175,
        dataIndex: 'servicingFacility',
        text: 'Service Facility',
        flex: 1
      }],
      bind: {
        store: '{MemberAuthSearchStore}'
      },

      bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 2,
        displayInfo: true
      }]
    }
  ]
});