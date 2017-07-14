Ext.define('Atlas.claims.view.search.UCFSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'claims-serch-ucfsearch',
    items: [
                {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Medication:',
                        labelWidth: 80,
                        name: 'medication'
                      },
                      {
                        xtype: 'button',
                        iconCls: 'fa fa-question',
                        scale: 'medium',
                        flex: 0
                      },
                      {
                        xtype: 'datefield',
                        fieldLabel: 'Date Range:',
                        labelWidth: 80,
                        name: 'fromDate',
                        flex: 1
                      },
                      {
                        xtype: 'datefield',
                        name: 'toDate',
                        flex: 1
                      },
                      {
                        xtype: 'button',
                        iconCls: 'fa fa-minus',
                        scale: 'medium',
                        flex: 0
                      }
                    ]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Rx Number:',
                        labelWidth: 80,
                        name: 'rxNumber',
                        flex: 0
                      },
                      {
                        xtype: 'button',
                        text: 'Reset',
                        scale: 'medium',
                        flex: 0
                      },
                      {
                        xtype: 'button',
                        text: 'Search',
                        scale: 'medium',
                        flex: 0
                      }
                    ]
                  },
                  {
                    xtype: 'claimsSearchGrid'
                  }


          ]
});
