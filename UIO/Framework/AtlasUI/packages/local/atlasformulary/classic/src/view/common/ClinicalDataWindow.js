Ext.define('Atlas.atlasformulary.view.common.ClinicalDataWindow', {
  extend: 'Ext.window.Window',
  itemId: 'clinicaldatawindow',
  modal: true,
  closeable: true,
  resizable: true,
  width: 500,
  height: 320,
  layout: 'fit',

  bind: {
    title: '{NDC} - {labelName} - Drug Search Detail'
  },

  controller: 'clinicaldatawindowctrl',

  viewModel: {
    stores: {
      fdbclinicaldata: {
        type: 'fdbclinicaldata',
        autoLoad: false,
        proxy: {
          url: '/fdbclinicaldata',
          reader: {
            rootProperty: ''
          }
        }
      }
    },
    data: {
      NDC: null,
      labelName: null,
      activeTab: null,
      clinicaldata: null
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        '->',
        {
          xtype: 'button',
          text: 'Close',
          handler: 'onCloseClick'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'tabpanel',
      items: [
        {
          title: 'Disclaimer',
          itemId: 'disclaimer',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section1Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Uses',
          itemId: 'uses',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section3Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'How to Use',
          itemId: 'howtouse',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section4Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Precautions',
          itemId: 'precautions',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section2Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Side Effects',
          itemId: 'sideeffects',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section5Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Notes',
          itemId: 'notes',
          items: [
            {
              layout: 'hbox',
              items: [
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.MonographTitle}'
                },
                {
                  xtype: 'displayfield',
                  bind: '{clinicaldata.PhoeneticTitle}'
                }
              ]
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.BrandNames}'
            },
            {
              xtype: 'textarea',
              bind: '{clinicaldata.Section6Content}',
              readOnly: true,
              height: '50%',
              width: '99%'
            },
            {
              xtype: 'displayfield',
              bind: '{clinicaldata.Footer}'
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        }
      ]
    }
  ]
});
