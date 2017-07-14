Ext.define('Atlas.atlasformulary.view.formularyconfig.FormularyDetailsHeader', {
  extend: 'Ext.panel.Panel',
  xtype: 'formularyconfig-formularydetailsheader',
  controller: 'formularydetailscontroller',
  cls: 'border-none',
  viewModel: 'formularydetails',

  initComponent: function (config) {
    this.getViewModel().set('formularySK', this.formularySK);
    this.getViewModel().set('mode', this.mode);
    this.getViewModel().set('titleMode', this.titleMode);
    this.getViewModel().set('formularyStatus', this.formularyStatus);
    this.callParent(config);
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      layout: {
        pack: 'end'
      },

      items: [
        {
          xtype: 'button',
          text: 'View Notes',
          handler: 'onViewNotesClick'
        },
        {
          text: 'Import...',
          menu: [
            {
              text: 'Import Rules',
              handler: 'onImportFormularyRulesClick'
            },
            {
              text: 'Import NDCs',
              handler: 'onImportFormularyNDCClick'
            }
          ]
        },
        {
          text: 'Export...',
          menu: [
            {
              text: 'Export Rules',
              handler: 'onExportFormularyRulesClick'
            },
            {
              text: 'Export NDCs',
              handler: 'onExportFormularyNDCClick'
            },
            {
              text: 'Formulary Summary',
              handler: 'onFormularySummaryClick'
            },
            {
              text: 'Missing FDB NDCs',
              handler: 'onMissingFDBNDCsClick',
              hidden: true,
              bind: {
                hidden: '{dataSource != "medispan"}'
              }
            }
          ]
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'container',
      layout: 'column',

      items: [
        {
          xtype: 'container',
          columnWidth: 0.15,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right',
            labelWidth: 100
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Formulary ID',
              bind: '{formularyHeader.FrmlryID}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Version',
              bind: '{formularyHeader.FrmlryVer}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Status',
              bind: '{formularyHeader.StatDesc}'
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.35,
          bodyPadding: 10,
          margin: 10,

          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Formulary Name',
              bind: '{formularyHeader.FrmlryName}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Effective Date',
              bind: '{formularyHeader.EfctvStartDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.25,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Data Source',
              bind: '{formularyHeader.DrugRefDbName}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Line of Business',
              bind: '{formularyHeader.LOBName}'
            }
          ]
        }
      ]
    }
  ]
});
