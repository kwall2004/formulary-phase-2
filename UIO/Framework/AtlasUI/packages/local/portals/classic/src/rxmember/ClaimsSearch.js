/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.view.rxmember.ClaimsSearch', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsrxmemberclaimsearch',
  region: 'center',
  title: 'Claims Search',
  viewModel: 'claimsSearchModel',
  controller: 'claimSearchController',
  scrollable: true,

  requires: [
    'Ext.grid.plugin.Exporter'
  ],

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    region: 'north',
    layout: 'hbox',
    collapsible: true,
    title: 'Claim Search',

    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',

      items: [{
        xtype: 'button',
        text: 'Search',
        width: 115,
        iconCls: 'fa fa-search',
        handler: 'onSearchClick'
      },
      {
        xtype: 'button',
        text: 'Reset',
        width: 115,
        iconCls: 'fa fa-repeat',
        handler: 'onResetClick'
      }, {
        xtype: 'button',
        text: 'Export to Excel',
        reference: 'ExportButton',
        iconCls: 'fa fa-file-excel-o',
        disabled: true,
        handler: 'onExportClick'
      }]
    }],

    items: [{
      xtype: 'container',
      layout: 'vbox',
      items: [{
        xtype: 'drugtypeahead',
        fieldLabel: 'Medication',
        hideLabel: false,
        emptyText: '[e.g.ACETAMINOPHEN]',
        reference: 'NDC',
        valueField: 'NDC',
        displayField: 'LN',
        width: 450
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Rx Number',
        reference: 'RxNum',
        value: '',
        width: 450
      }]
    },
    {
      xtype: 'container',
      layout: 'vbox',
      items: [
        {
          xtype: 'container',
          layout: 'hbox',
          items: [{
            xtype: 'datefield',
            fieldLabel: 'Date Range',
            reference: 'dateFrom',
            value: Ext.Date.add(new Date(), Ext.Date.MONTH, -3),
            maxValue: new Date()

          },
          {
            xtype: 'datefield',
            reference: 'dateTo',
            value: new Date(),
            maxValue: new Date()
          }]
        }]

    }]
  },
  {
    xtype: 'grid',
    cls: 'card-panel',
    region: 'south',
    layout: 'fit',
    reference: 'claimSearchMemberGrid',
    name: 'claimSearchMemberGrid',
    itemId: 'claimSearchMemberGrid',
    height: 800,
    scrollable: true,
    plugins: [{
      ptype: 'gridexporter'
    }],
    columns: [{
      xtype: 'widgetcolumn',
      sortable: false,
      hideable: false,
      widget: {
        xtype: 'button',
        iconCls: 'fa fa-medkit',
        handler: 'onDrugSearchClick',
        tooltip: 'Click to view generic alternatives'
      }
    }, {
      text: 'Claim ID',
      flex: 2,
      dataIndex: 'claimID',
      hidden: true
    }, {
      text: 'RX ID',
      flex: 2,
      dataIndex: 'rxid',
      hidden: true
    }, {
      text: 'Medication',
      flex: 3,
      dataIndex: 'medication'
    }, {

      text: 'Brand Name',
      flex: 3,
      dataIndex: 'brandname'
    }, {
      text: 'Claim Date',
      dataIndex: 'svcdate',
      flex: 2,
      renderer: function (value) {
        return Ext.util.Format.date(value, 'm/d/Y');
      },
      exportStyle: {
        format: 'Short Date'
      }
    }, {
      text: 'Quantity',
      dataIndex: 'qty'
    }, {
      text: 'Days Supply',
      dataIndex: 'supply'
    }, {
      text: 'Your Paid Amount',
      dataIndex: 'patPaidAmt',
      flex: 2,
      renderer: function (value) {
        return Ext.util.Format.currency(value);
      }
    }],
    bind: {
      store: '{claimSearchStore}'
    },
    // paging bar on the bottom
    dockedItems: [{
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      pageSize: 10,
      bind: {
        store: '{claimSearchStore}'
      },
      displayInfo: true
    }],
    viewConfig: {
      getRowClass: function (record) {
        return record.get('RefillDueAlert') ? 'red-row' : '';
      }
    }
  }
  ]
});