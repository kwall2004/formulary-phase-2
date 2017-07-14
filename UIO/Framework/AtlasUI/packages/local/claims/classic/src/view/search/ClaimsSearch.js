Ext.define('MemberPortal.view.search.ClaimsSearch', {
    extend: 'Ext.Container',
    xtype: 'claims-search-claimssearch',

    requires: [
        'Ext.panel.Panel'
    ],

    style: {
      padding: '20px'
    },

    items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Medication:',
                        name: 'medication'
                      },
                      {
                        xtype: 'button',
                        iconCls: 'fa fa-question',
                        scale: 'medium'
                      },
                      {
                        xtype: 'datefield',
                        fieldLabel: 'Date Range:',
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
                        scale: 'medium'
                      }
                    ]
                  },
                  {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Rx Number:',
                        name: 'rxNumber'
                      },
                      {
                        xtype: 'button',
                        text: 'Reset',
                        scale: 'medium'
                      },
                      {
                        xtype: 'button',
                        text: 'Search',
                        scale: 'medium'
                      }
                    ]
                  },
                  {
                    xtype: 'claimsSearchGrid'
                  }


          ]
});
