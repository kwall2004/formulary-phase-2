/*
  Last Developer: Paul glinski
  Previous Developers: [Paul Glinski]
  Description: A view that allows that user to search for a pharmacy near them and in there network.
                Extra information is available at the bottom of the page in collapsable accordian components.
*/
Ext.define('Atlas.member.view.pharmacysearch.PharmacySearch', {
     extend: 'Ext.panel.Panel',
    xtype: 'member-pharmacysearch-pharmacysearch',

    requires: [
        'Ext.panel.Panel'
    ],
    title: 'Pharmacy Search',
    items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                    xtype: "container",
                    layout: 'hbox',
                    items: [
                        {
                          xtype: 'container',
                          layout: 'vbox',
                          flex: 1,
                          defaults: {
                            margin: 10
                          },
                          items: [
                            {
                              xtype: 'textfield',
                              fieldLabel: 'Pharmacy Name:',
                              name: 'pharmacyName'
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'Pharmacy Type:',
                              name: 'pharmacyType'
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'Network:',
                              name: 'network'
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'Coverage:',
                              name: 'coverage'
                            }
                          ]
                        },
                        {
                          xtype: 'container',
                          layout: 'vbox',
                          flex: 1,
                          defaults: {
                            margin: 10
                          },
                          items: [
                            {
                              xtype: 'combobox',
                              fieldLabel: 'State:',
                              name: 'state'
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'County:',
                              name: 'county'
                            },
                            {
                              xtype: 'combobox',
                              fieldLabel: 'City:',
                              name: 'city'
                            },
                            {
                              xtype: 'hboxform',
                              margin: '6, 6, 6, 4',
                              items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip:',
                                    width: 150,
                                    name: 'zip'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Miles Radius:',
                                    width: 140,
                                    labelWidth: 80,
                                    name: 'milesRadius'
                                }
                              ]
                            }
                          ]
                          }
                        ]
                      },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'fa fa-question',
                        style: 'border-radius: 100%;',
                        flex: 0
                      },
                      {
                        xtype: 'container',
                        html: '<a href="google.com">Instructions</a>'
                      },
                      {
                        xtype: 'container',
                        html: '*Select a network to display only "in-network" pharmacies'
                      },
                      {
                        xtype: 'hboxform',
                        padding: 0,
                        items: [
                          {
                              xtype: 'button',
                              text: 'Reset',
                              scale: 'medium',
                              flex: 0,
                              margin: '0, 6, 6, 6'
                          },
                          {
                              xtype: 'button',
                              text: 'Search',
                              scale: 'medium',
                              flex: 0,
                              margin: '0, 6, 6, 6'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    xtype: 'pharmacySearchGrid'
                  },
                  {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                      {
                          layout: 'accordion',
                          flex: 1,
                          items: [
                            {
                              hidden: true
                            },
                            {
                              title: 'Physical Location Information',
                              iconCls: 'fa fa-home',
                              xtype: 'grid',
                              columns: [
                                {
                                  text: '',
                                  flex: 1
                                }
                              ]
                            }
                          ]
                      },
                      {
                          layout: 'accordion',
                          flex: 1,
                          items: [
                            {
                              hidden: true
                            },
                            {
                              title: 'Services',
                              iconCls: 'fa fa-wrench',
                              xtype: 'grid',
                              columns: [
                                {
                                  text: '',
                                  flex: 1
                                }
                              ]
                            }
                          ]
                      },
                      {
                          layout: 'accordion',
                          flex: 1,
                          items: [
                            {
                              hidden: true
                            },
                            {
                              title: 'Store Hours',
                              iconCls: 'fa fa-clock-o',
                              xtype: 'grid',
                              columns: [
                                {
                                  text: '',
                                  flex: 1
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
});
