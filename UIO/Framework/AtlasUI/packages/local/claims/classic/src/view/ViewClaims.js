Ext.define('Atlas.claims.view.ViewClaims', {
    extend: 'Ext.panel.Panel',
    xtype: 'claims-viewclaims',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'View Claims',
    items: [
          {
            title: 'View Claims',
            iconCls: 'fa fa-usd',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>View Claims</h2></br>'
                  },
                  {
                    xtype: 'combobox',
                    fieldLabel: 'Family:',
                    labelWidth: 50,
                    margin: 6,
                    name: 'family'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Name:',
                        name: 'name'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'DOB:',
                        name: 'dob'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Status:',
                        name: 'status'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Age:',
                        name: 'age'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Gender:',
                        name: 'gender'
                      }
                    ]
                  },
                  {
                    xtype: 'panel',
                    title: 'Claim Summary',
                    items: [
                      {
                          xtype: 'hboxform',
                          items: [
                            {
                              xtype: 'datefield',
                              fieldLabel: 'From:',
                              name: 'fromDate',
                              flex: 1
                            },
                            {
                              xtype: 'datefield',
                              fieldLabel: 'To:',
                              name: 'toDate',
                              flex: 1
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'Status:',
                              name: 'claimSummaryStatus',
                              flex: 1
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
                        xtype: 'grid',
                        flex: 1,
                        padding: '10px',
                        columns: [
                                    {
                                      text: 'Benefit Plan',
                                      flex: 1
                                    },
                                    {
                                      text: 'Service Date',
                                      flex: 1
                                    },
                                    {
                                      text: 'Provider Name',
                                      flex: 1
                                    },
                                    {
                                      text: 'Claim #',
                                      flex: 1
                                    },
                                    {
                                      text: 'Status',
                                      flex: 1
                                    },
                                    {
                                      text: 'Date Paid',
                                      flex: 1
                                    },
                                    {
                                      text: 'Amount Billed',
                                      flex: 1
                                    },
                                    {
                                      text: 'Allowed Amount',
                                      flex: 1
                                    },
                                    {
                                      text: 'Amount Paid',
                                      flex: 1
                                    },
                                    {
                                      text: 'Amount You Owe',
                                      flex: 1
                                    }
                                  ]
                      },
                      {
                        xtype: 'hboxform',
                        items: [
                          {
                            xtype: 'container',
                            html: '<h3>Claims Count: </h3>'
                          },
                          {
                            xtype: 'hboxform',
                            margin: 0,
                            padding: 0,
                            items: [
                                {
                                  xtype: 'button',
                                  iconCls: 'fa fa-angle-double-left fa-2x',
                                  flex: 0,
                                  scale: 'medium'
                                },
                                {
                                  xtype: 'container',
                                  html: '<h3>No Claims Found</h3>',
                                  flex: 0
                                },
                                {
                                  xtype: 'button',
                                  iconCls: 'fa fa-angle-double-right fa-2x',
                                  flex: 0,
                                  scale: 'medium'
                                }
                              ]
                            }
                        ]
                      }
                    ]

                  }
                ]
            }
          ]
      },
      {
        padding: 20,
        html: "To see a claim for a service you received, pick the date you got the service or a date range that includes the date you got the service. If you don't see the claim,"
        + "<br>Meridian has not received it yet. We get claims everyday so check back if you don't see the claims that you want to see. You may also call Member Services at"
        + "<br>888-437-0606 to find out about a claim."
        + "<br><br>In accordance with State law, minor members may receive certain healthcare services without parental consent. For those services, the minor must first consent"
        + "<br>before a parent may obtain information about those services. Descriptions for such claims may have been generalized or masked to comply with State and"
        + "<br>Federal law."
      }

    ]
});
