/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.ICBRTransactions', {
  extend: 'Ext.Container',
  xtype: 'icbrtransactions',
  title: 'ICBR Transactions',
  controller: 'icbrtransactionscontroller',
  viewModel: 'icbrtransactionsmodel',

  items: [
        /* include child components here */
    {
      xtype: 'gridpanel',
      cls: 'formPanel',
      reference: 'icbrtransactionspanel',
      bind: {
        store: '{transactionsstore}'
      },
      columns: [
        {
          xtype: 'datecolumn',
          text: 'Sent Date',
          dataIndex: 'sentDate',
          flex: 1,
          hidden: true,
          format: 'm/d/Y'
        },
        {
          xtype: 'datecolumn',
          text: 'Receive Date',
          dataIndex: 'receiveDate',
          flex: 1,
          format: 'm/d/Y'
        },
        {
          text: 'Source',
          dataIndex: 'source',
          flex: 1
        }
      ],
      listeners: {
        itemclick: 'onTransactionsGridClick'
      }
    }]
});