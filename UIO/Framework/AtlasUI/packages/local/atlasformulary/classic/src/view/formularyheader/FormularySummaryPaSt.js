Ext.define('Atlas.atlasformulary.view.formularyheader.FormularySummaryPaSt', {
  extend: 'Ext.window.Window',
  xtype: 'formularysummarypast',

  controller: 'formularysummarypast',
  bind: {
    title: 'Formulary Summary - {configuration}'
  },

  width: 220,
  height: 220,
  resizable: false,
  layout: 'fit',

  viewModel: {
    data: {
      configSectionSK: null,
      summaryConfigSection: null,
      configuration: null
    },
    stores: {
      summaryconfigorganizeby: {
        type: 'summaryconfigorganizeby',
        autoLoad: true
      },
      summaryconfigpast: {
        type: 'summaryconfigpast',
        autoLoad: true
      }
    }
  },

  items: [
    {
      xtype: 'panel',
      layout: 'center',
      cls: 'border-none',
      items: [
        {
          xtype: 'combobox',
          name: 'SumRptOrgBySK',
          fieldLabel: 'Organize By',
          displayField: 'SumRptOrgByName',
          valueField: 'SumRptOrgBySK',
          forceSelection: true,
          reference: 'summaryreportorgbycombo',
          bind: {
            value: '{summaryConfigSection.SumRptOrgBySK}',
            store: '{summaryconfigorganizeby}'
          },
          width: '90%',
          allowBlank: false,
          queryMode: 'local'
        }
      ],

      buttons: [
        {
          text: 'Save',
          handler: 'onSaveClick'
        },
        {
          text: 'Close',
          handler: 'onCloseClick'
        }
      ]
    }
  ]
});
