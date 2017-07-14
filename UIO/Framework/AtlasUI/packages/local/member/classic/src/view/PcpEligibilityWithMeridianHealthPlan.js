Ext.define('Atlas.member.view.PcpEligibilityWithMeridianHealthPlan', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-pcpeligibilitywithmeridianhealthplan',

    requires: [
        'Ext.panel.Panel'
    ],
    title: 'PCP Eligibility With Meridian Health Plan',
    items: [
          {
            title: 'Services Needed Information',
            iconCls: 'fa fa-book',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>Services Needed Infromation</h2></br>'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Family:',
                        name: 'family',
                        flex: 0
                      }
                    ]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Name:',
                        name: 'name',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'DOB:',
                        name: 'dob',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Sex:',
                        name: 'sex',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Ph No:',
                        name: 'phNoPersonal',
                        flex: 1
                      }
                    ]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'LOB:',
                        name: 'lob',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'EFF:',
                        name: 'eff',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Term:',
                        name: 'term',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Status:',
                        name: 'status',
                        flex: 1
                      }
                    ]
                  },
                  {
                    html: '<h3>Alerts: HEDIS Measures Due, Notes, Assessment Required'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'PCP Name:',
                        labelWidth: 70,
                        name: 'pcpName',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Ph No:',
                        name: 'phNoPCP',
                        flex: 1
                      }
                    ]
                  },
                  {
                    html: '</br><h3 style="color:red;" >Note: Eligibility and PCP history details are populated below based on the selected memeber in the family drop down.</h3>'
                  },
                  {
                    xtype: 'hboxform',
                          items: [
                            {
                            xtype: 'grid',
                            title: 'Eligibility with meridian Health Plan',
                            flex: 1,
                            padding: '10px',
                            columns: [
                                        {
                                          text: 'From Date',
                                          flex: 1
                                        },
                                        {
                                          text: 'Thru Date',
                                          flex: 1
                                        },
                                        {
                                          text: 'County',
                                          flex: 1
                                        }
                                      ]
                          },
                          {
                          xtype: 'grid',
                          title: 'PCP History',
                          flex: 1,
                          padding: '10px',
                          columns: [
                                      {
                                        text: 'PCP Name',
                                        flex: 1
                                      },
                                      {
                                        text: 'From Date',
                                        flex: 1
                                      },
                                      {
                                        text: 'Thru Date',
                                        flex: 1
                                      }
                                    ]
                        }
                      ]
                  },
                  {
                      xtype: 'container',
                      layout: {
                          type: 'hbox',
                          pack: 'end'
                      },
                      items: [
                        {
                            html: '<a href="google.com" >Cancel</a>',
                            anchor: '100% 50%',
                            padding: '10px 20px 0px 0px'
                        },
                        {
                          xtype: 'button',
                          text: 'Print Member Report',
                          scale: 'medium'
                        }
                      ]
                  }
                ]
            }
          ]
      }
    ]
});
