Ext.define('Atlas.portals.view.provider.MemberDocuments', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberDocuments',
  title: 'Documents',

  requires: [
    'Ext.grid.filters.Filters'
  ],

  controller: 'memberdocuments',

  viewModel: {
    stores: {
      documentlist: {
        model: 'Atlas.portals.hpmember.model.DocumentList'
      },
      reportStore: {
        model: 'Atlas.portals.hpmember.model.RunReport64'
      }
    }
  },

  items: [
    {
      xtype: 'form',
      reference: 'myDocumentsForm',
      title: 'Selections',
      cls: 'card-panel',

      tbar: [
        {
          xtype: 'datefield',
          fieldLabel: 'From',
          value: Ext.Date.add(new Date(), Ext.Date.DAY, -45),
          maxValue: new Date(),
          name: 'fromDate',
          reference: 'fromDate',
          labelWidth: 40,
          format: 'm/d/Y',
          renderer: Ext.util.Format.dateRenderer('m/d/Y'),
          listeners: {
            change: 'onFromDateChange'
          }
        },
        {
          xtype: 'datefield',
          fieldLabel: 'To',
          value: new Date(),
          maxValue: new Date(),
          name: 'toDate',
          reference: 'toDate',
          format: 'm/d/Y',
          renderer: Ext.util.Format.dateRenderer('m/d/Y'),
          labelWidth: 40,
          listeners: {
            change: 'onToDateChange'
          }
        },
        {
          xtype: 'button',
          text: 'Search',
          handler: 'searchDocuments'
        }
      ]
    },
    {
      xtype: 'gridpanel',
      title: 'Documents',
      cls: 'card-panel',
      bind: '{documentlist}',

      plugins: 'gridfilters',
      height: 500,
      scrollable: true,
      columns: [
        {
          xtype: 'actioncolumn',
          menuDisabled: true,
          sortable: false,
          align: 'center',
          text: 'Download',
          items: [{
            xtype: 'button',
            handler: 'viewDocument',
            iconCls: 'x-fa fa-download'
          }],
          flex: 1
        },
        {
          text: 'Date',
          xtype: 'datecolumn',
          format: 'm/d/Y',
          dataIndex: 'createdate',
          flex: 1
        },
        {
          text: 'Document Name',
          dataIndex: 'documentDesc',
          filter: 'list',
          flex: 2
        },
        {
          text: 'First Name',
          dataIndex: 'firstname',
          flex: 1
        },
        {
          text: 'Last Name',
          dataIndex: 'lastname',
          flex: 1
        }
      ],

      bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'No documents to display.'
      }
    }
  ]
});