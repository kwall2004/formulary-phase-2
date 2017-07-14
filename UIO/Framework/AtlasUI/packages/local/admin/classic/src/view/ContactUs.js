Ext.define('Atlas.admin.view.ContactUs', {
    extend: 'Ext.panel.Panel',
    xtype: 'contactUs',

    requires: [
        'Ext.panel.Panel',
        'Ext.form.FieldSet'
    ],

    viewModel:{
        data: {
            medicaid:{
                phone: '866-984-6462',
                fax: '866-984-6462',
                address: '1001 Woodward Ave, Suite 704 Detroit,MI 48226'
            },
            medicare:{
                phone: '866-984-6462',
                fax: '866-984-6462',
                address: '1021 Woodward Ave, Suite 740 Detroit,MI 48226'
            },
            commercial:{
                phone: '866-984-6462',
                fax: '866-984-6462',
                address: '1012 Woodward Ave, Suite 704 Detroit,MI 48226'
            },
            meridianhealthplan:{
                phone: '313-324-3700',
                fax: '313-463-5250',
                address: '1 Campus Martius, Suite 700 Detroit, MI 48226'
            }
        }
    },

    title: 'Contact Us',
    padding: '20px',
            items: [{
                    title: 'Medicaid',
                    xtype: 'fieldset',
                    width: '55%',
                    defaults:{
                        xtype: 'displayfield'
                    },
                    items: [
                        {

                            fieldLabel: 'Phone',
                            bind: {
                                value: '{medicaid.phone}'
                            }
                        },
                        {
                            fieldLabel: 'Fax',
                            bind: {
                                value: '{medicaid.fax}'
                            }
                        },
                        {
                            fieldLabel: 'Address',
                            bind: {
                                value: '{medicaid.address}'
                            }
                        }
                    ]
                },
                {
                    title: 'Medicare',
                    xtype: 'fieldset',
                    width: '55%',
                    defaults:{
                        xtype: 'displayfield'
                    },
                    items: [
                        {

                            fieldLabel: 'Phone',
                            bind: {
                                value: '{medicare.phone}'
                            }
                        },
                        {
                            fieldLabel: 'Fax',
                            bind: {
                                value: '{medicare.fax}'
                            }
                        },
                        {
                            fieldLabel: 'Address',
                            bind: {
                                value: '{medicare.address}'
                            }
                        }
                    ]
                },
                {
                    title: 'Commercial',
                    xtype: 'fieldset',
                    width: '55%',
                    defaults:{
                        xtype: 'displayfield'
                    },
                    items: [
                        {

                            fieldLabel: 'Phone',
                            bind: {
                                value: '{commercial.phone}'
                            }
                        },
                        {
                            fieldLabel: 'Fax',
                            bind: {
                                value: '{commercial.fax}'
                              }
                        },
                        {
                            fieldLabel: 'Address',
                            bind: {
                                value: '{commercial.address}'
                            }
                        }
                    ]
                },
              {
                  title: 'Meridian Health Plan',
                  xtype: 'fieldset',
                  width: '55%',
                  defaults:{
                      xtype: 'displayfield'
                  },
                  items: [
                      {

                          fieldLabel: 'Phone',
                          bind: {
                              value: '{meridianhealthplan.phone}'
                          }
                      },
                      {
                          fieldLabel: 'Fax',
                          bind: {
                              value: '{meridianhealthplan.fax}'
                            }
                      },
                      {
                          fieldLabel: 'Address',
                          bind: {
                              value: '{meridianhealthplan.address}'
                          }
                      }
                  ]
              }]

});
