Ext.define('Atlas.portals.view.provider.MemberHEDIS', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberHEDIS',
  title: 'HEDIS',
  controller: 'memberhedis',

  viewModel: {
    stores: {
      hedissummarymaster: {
        model: 'Atlas.portals.provider.model.MemberHEDISSummaryMaster'
      },
      measurehelptext: {
        model: 'Atlas.portals.provider.model.MeasureDetailMasterWeb'
      },
      providerlocations: {
        model: 'Atlas.portals.provider.model.MeasureDetailMasterWeb'
      }
    }
  },

  items: [
    {
      xtype: 'panel',
      cls: 'card-panel',
      title: 'Attention! New Requirement for HEDIS Reporting',

      items: [
        {
          cls: 'formPanel',
          padding: 7,
          bind: {
            html: '<span style="color: red">Please fax the clinical information that supports this HEDIS entry to ' +
            '{HEDISFaxNumber}. If clinical documentation is not faxed within 30 days this entry will not result in ' +
            'a HEDIS hit. Do you have an EMR? If so, contact your Meridian Health Plan Provider Network ' +
            'Development Representative so we can work with you to collect EMR data!</span>'
          }
        }
      ]
    },
    {
      xtype: 'panel',
      title: 'HEDIS',
      cls: 'card-panel',

      tbar: [{
        xtype: 'container',
        reference: 'myDocumentsForm',

        items: [
          {
            xtype: 'combobox',
            fieldLabel: 'Reporting Year',
            store: [new Date().getFullYear(), new Date().getFullYear() - 1],
            value: new Date().getFullYear(),
            name: 'reportingYearCombo',
            reference: 'reportingYearCombo',
            listeners: {
              change: 'loadHEDISForm'
            }
          },
          {
            xtype: 'radiogroup',
            reference: 'filterRadioGroup',
            items: [
              {
                boxLabel: 'Due',
                name: 'filterRadios',
                inputValue: 'due',
                checked: true
              },
              {
                boxLabel: 'All',
                name: 'filterRadios',
                inputValue: 'all'
              }
            ],
            listeners: {
              change: 'filterRadio'
            }
          },
          {
            xtype: 'displayfield',
            fieldLabel: 'Last PCP Visit',
            reference: 'lastPcpVisit'
          }
        ]
      }],
      
      bbar: [
        {
          xtype: 'button',
          text: 'Print HEDIS Profile',
          handler: 'showHedisProfile'
        },
        {
          xtype: 'button',
          text: 'Print Member Report',
          handler: 'printMemberReport'
        }
      ],

      items: [{
        xtype: 'gridpanel',
        margin: 5,
        height: 300,
        scrollable: true,
        bind: '{hedissummarymaster}',
        reference: 'hedisGrid',

        columns: [
          {
            text: 'Measure',
            dataIndex: 'measureDesc',
            flex: 3
          },
          {
            text: 'Sub Desc',
            dataIndex: 'subMeasure',
            flex: 2
          },
          {
            text: 'Due By',
            dataIndex: 'dueBy',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            flex: 1
          },
          {
            text: 'HEDIS Hit Date',
            dataIndex: 'lastSeen',
            flex: 1
          },
          {
            text: 'Complete',
            reference: 'completeFilterField',
            dataIndex: 'complete',
            flex: 1
          },
          {
            xtype: 'actioncolumn',
            text: 'Report HEDIS',
            dataIndex: 'complete',
            flex: 1,
            items: [{
              xtype: 'button',
              iconCls: '',
              getClass: function (value) {
                if (value === 'false') {
                  return 'x-fa fa-file-text';
                }

                return 'x-hidden';
              },
              handler: 'reportHEDIS'
            }]
          },
          {
            xtype: 'actioncolumn',
            text: 'View History',
            dataIndex: 'measure',
            flex: 1,
            items: [{
              xtype: 'button',
              iconCls: '',
              getClass: function (value) {
                if (value === 20 || value === 21) {
                  return 'x-hidden';
                }

                return 'x-fa fa-search';
              },
              handler: 'viewHistory'
            }]
          },
          {
            text: 'Report Year',
            dataIndex: 'reportYear',
            flex: 1
          },
          {
            text: 'Status',
            dataIndex: 'pending',
            flex: 1
          }
        ],

        bbar: {
          xtype: 'pagingtoolbar',
          displayInfo: true,
          emptyMsg: '<span style="color: red">No Record(s) Found for COB</span>'
        },

        listeners: {
          select: 'coverageRowClick'
        }
      }, {
        xtype: 'displayfield',
        flex: 1,
        width: '100%',
        reference: 'measureHelpText'
      }]
    }
  ]
});