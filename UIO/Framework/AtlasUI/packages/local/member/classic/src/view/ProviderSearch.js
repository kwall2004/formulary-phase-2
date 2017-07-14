Ext.define('Atlas.member.view.ProviderSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-providersearch',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Provider Search',
    items: [
          {
            title: 'Provider Search',
            iconCls: 'fa fa-search',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>Search Provider By</h2></br>'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Provider Name:',
                        labelWidth: 90,
                        name: 'providerName',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Language:',
                        name: 'language',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'County:',
                        name: 'county',
                        flex: 1
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'City:',
                        name: 'city',
                        flex: 1
                      }
                    ]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Gender:',
                        name: 'gender',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Speciality:',
                        labelWidth: 70,
                        name: 'speciality',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Affiliations:',
                        labelWidth: 70,
                        name: 'affiliations',
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
                        xtype: 'checkbox',
                        boxLabel: 'Show all providers accepting new memebers',
                        name: 'speciality',
                        flex: 1
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
                            html: '<a href="google.com" >Clear</a>',
                            anchor: '100% 50%',
                            padding: '10px 20px 0px 0px'
                        },
                        {
                          xtype: 'button',
                          text: 'Search',
                          scale: 'medium'
                        }
                      ]
                  },
                  {
                    html: '</br><h3>Select a Provider from the list below to view Provider Details</h3>'
                  },
                  {
                  xtype: 'grid',
                  title: 'Search Result',
                  padding: '10px',
                  columns: [
                              {
                                text: 'Provider Name',
                                flex: 1
                              },
                              {
                                text: 'County',
                                flex: 1
                              },
                              {
                                text: 'City',
                                flex: 1
                              },
                              {
                                text: 'Gender',
                                flex: 1
                              },
                              {
                                text: 'New Patients',
                                flex: 1
                              },
                              {
                                text: 'LOB',
                                flex: 1
                              },
                              {
                                text: 'Hospital Affiliations',
                                flex: 1
                              },
                              {
                                text: 'Speciality',
                                flex: 1
                              },
                              {
                                text: 'ADA',
                                flex: 1
                              }
                            ]
                  }
                ]
            }
          ]
      }

    ]
});
