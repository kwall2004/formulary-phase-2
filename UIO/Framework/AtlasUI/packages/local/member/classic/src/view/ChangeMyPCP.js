/*
    Last Developer: Paul Glinski
    Previous Developers: [Paul Glinski]
    Description: A view that allows the user to search for Primary Care Physicians and see details about them in a grid and drop down.
                  They can also change there PCP from here if they want.
*/
Ext.define('Atlas.member.view.ChangeMyPCP', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-changemypcp',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Change My PCP',
    items: [
          {
            title: 'Change My PCP',
            iconCls: 'fa fa-user-md',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>Search PCP By</h2></br>'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'PCP Name:',
                        labelWidth: 70,
                        name: 'providerName',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Language:',
                        labelWidth: 70,
                        name: 'language',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'County:',
                        name: 'county',
                        flex: 1
                      },
                      {
                        xtype: 'combobox',
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
                    html: '</br><h3>Select a PCP from the list below to view Provider Details</h3>'
                  },
                  {
                  xtype: 'grid',
                  title: 'Search Result',
                  padding: '10px',
                  columns: [
                              {
                                text: 'PCP Name',
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
                  },
                  {
                      layout: 'accordion',
                      items: [
                        {
                          hidden: true
                        },
                        {
                          title: 'Provider Profile',
                          iconCls: 'fa fa-user-md', //current sass makes icon barely visible -paul glinski 2016/6/21
                          items: [
                            {
                              xtype: 'hboxform',
                              items:[
                                {
                                  xtype: 'container',
                                  layout: 'vbox',
                                  margin: '0, 0, 0, 150',
                                  items: [
                                    {
                                      xtype: 'fieldset',
                                      html: 'Provider Name: {data}</br>' +
                                            'Line of Business: {data}</br>' +
                                            'Medical Group Affiliations: {data}</br>' +
                                            'Address: {data}</br>' +
                                            'Phone: {data}</br>' +
                                            'Fax: {data}</br>' +
                                            'Accessibility: {data}'
                                    },
                                    {
                                      xtype: 'fieldset',
                                      html: 'Gender: {data}</br>' +
                                            'Languages: {data}</br>' +
                                            'Provider Messages: {data}</br>'
                                    }
                                  ]
                                },
                                {
                                  xtype: 'panel',
                                  title: 'Office Hours',
                                  html: 'Mon: {data}</br>'+
                                        'Tue: {data}</br>'+
                                        'Wed: {data}</br>'+
                                        'Thu: {data}</br>'+
                                        'Fri: {data}</br>'+
                                        'Sat: {data}</br>',
                                  frame: true,
                                  flex: 0,
                                  width: 200,
                                  margin: '0, 150, 0, 0'
                                }
                              ]
                            }
                          ]
                      }]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Effective Date (MM-DD-YYYY):',
                        labelWidth: 100,
                        name: 'effectiveDate',
                        margin: '0, 60, 0, 60'
                      },
                      {
                        xtype: 'button',
                        text: 'Change My PCP',
                        scale: 'medium',
                        margin: '0, 130, 0, 130'
                      },
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Family:',
                        name: 'family',
                        margin: '0, 60, 0, 60'
                      }
                    ]
                  }
                ]
            }
          ]
      }

    ]
});
