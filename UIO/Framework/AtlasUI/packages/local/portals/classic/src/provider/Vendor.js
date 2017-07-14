// k3279 - Kevin Tabasan - 11/22/2016

Ext.define('Atlas.portals.view.provider.Vendor', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsprovidervendor',
  controller: 'portalsprovidervendor',
  viewModel: 'portalsprovidervendor',
  title: 'Vendor',

  scrollable: true,

  items: [
    {
      xtype: 'form',
      layout: 'hbox',
      cls: 'card-panel',
      minWidth: 1180,
      margin: '20',
      scrollable: true,

      defaults:
      {
        padding: '10'
      },

      items: [
        {
          xtype: 'combobox',
          reference: 'vendorCombo',
          width: 400,
          fieldLabel: 'Vendor',
          editable: false,
          selectOnFocus: false,
          displayField: 'name',
          bind:
          {
            store: '{vendorComboStore}'
          }
        },
        {
          xtype: 'combobox',
          fieldLabel: 'LOB',
          reference: 'lobCombo',
          store: ['All', 'Medicaid', 'Medicare'],
          value: 'All'
        },
        {
          xtype: 'datefield',
          fieldLabel: 'Check Date From',
          reference: 'dateFrom',
          value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 45),
          format: 'm/d/Y',
          formatText: 'Expected date format mm/dd/yy',
          invalidText: '{0} is not a valid date - it must be in the format mm/dd/yy'
        },
        {
          xtype: 'datefield',
          fieldLabel: 'To',
          reference: 'dateTo',
          value: new Date(),
          format: 'm/d/Y',
          formatText: 'Expected date format mm/dd/yy',
          invalidText: '{0} is not a valid date - it must be in the format mm/dd/yy'
        },
        {
          xtype: 'button',
          text: 'Search',
          margin: '10px 0 0 0',
          handler: 'onSearchClick'
        }
      ]
    },
    {
      xtype: 'grid',
      minWidth: 1200,
      cls: 'card-panel',
      reference: 'detailsGrid',
      title: 'Check Details/Ledger',
      emptyText: 'No Data Available',
      forceFit: true,
      bind: '{vendorLedgerMaster}',

      columns: [
        {
          text: 'Check/EFT Number',
          renderer: function (one, two, record) {
            var data = record.data;

            if ('' !== data.eftTraceId) {
              return data.eftTraceId;
            }

            return data.checkNum;
          }
        },
        {
          xtype: 'datecolumn',
          text: 'Date',
          dataIndex: 'checkDate',
          renderer: function (one) {
            var date = null;

            if (one !== null) {
              date = new Date(one);
              return (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' + date.getFullYear();
            }

            return null;
          }
        },
        {
          text: 'LOB',
          dataIndex: 'lobID'
        },
        {
          text: 'Check Name',
          dataIndex: 'checkname'
        },
        {
          text: 'Bank',
          dataIndex: 'bankcode'
        },
        {
          text: 'Account Num',
          dataIndex: 'accountNum'
        },
        {
          text: 'Previous Balance',
          dataIndex: 'prevBalance'
        },
        {
          text: 'Remit Amount',
          dataIndex: 'remitIntAmt'
        },
        {
          text: 'Balance Due',
          dataIndex: 'balanceDue'
        },
        {
          text: 'Payment Amount',
          dataIndex: 'checkAmt'
        },
        {
          text: 'Type',
          dataIndex: 'vendorAcctType'
        },
        {
          text: 'Void',
          dataIndex: 'voidFlag',
          renderer: function (value) {
            if (true === value) {
              return 'Yes';
            }

            return 'No';
          }
        },
        {
          text: 'Recon Date',
          dataIndex: 'checkReconDate',
          renderer: function (one) {
            var date = null;

            if (one !== null) {
              date = new Date(one);
              return (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' + date.getFullYear();
            }

            return null;
          }
        },
        {
          text: 'Seq. Num',
          dataIndex: 'seqNum'
        },
        {
          text: 'Check Number',
          dataIndex: 'checkNum',
          hidden: true
        },
        {
          text: 'Eft Number',
          hidden: true
        },
        {
          text: 'Remit Seq. Num',
          dataIndex: 'remitSeqNum',
          hidden: true
        }
      ]
    }
  ],

  bbar: [
    '->',
    {
      text: 'Print',
      handler: 'onPrintClick'
    },
    {
      text: 'Create 835',
      handler: 'onCreate835Click'
    }
  ]
});