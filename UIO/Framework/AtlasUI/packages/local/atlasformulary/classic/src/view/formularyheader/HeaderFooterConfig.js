Ext.define('Atlas.atlasformulary.view.formularyheader.HeaderFooterConfig', {
  extend: 'Ext.window.Window',
  xtype: 'formularyheader-headerfooter',
  title: 'Header/Footer',
  modal: false,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',
  controller: 'headerfooterconfig',

  viewModel: {
    stores: {
      file: {
        type: 'summaryreportheaderfooter',
        autoLoad: false
      }
    },
    data: {
      selectedFile: null
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
          text: 'Save',
          handler: 'onSaveClick'
        },
        {
          xtype: 'button',
          text: 'Cancel',
          handler: 'onCancelClick'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'form',
      reference: 'headerFooterConfigForm',
      layout: {
        type: 'table',
        columns: 3,
        tableAttrs: {
          style: {
            width: '100%',
            padding: '10px'
          }
        }
      },
      items: [
        {
          xtype: 'label',
          text: ''
        },
        {
          xtype: 'label',
          cellCls: 'x-title-align-center',
          text: 'Header'
        },
        {
          xtype: 'label',
          cellCls: 'x-title-align-center',
          text: 'Footer'
        },
        {
          xtype: 'label',
          text: 'Formulary Owner'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyOwnerHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyOwnerFooter'
        },
        {
          xtype: 'label',
          text: 'Formulary Name'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyNameHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyNameFooter'
        },
        {
          xtype: 'label',
          text: 'Formulary ID'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyIdHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyIdFooter'
        },
        {
          xtype: 'label',
          text: 'Formulary Version'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyVersionHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyVersionFooter'
        },
        {
          xtype: 'label',
          text: 'Formulary Effective Date'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyEffectiveDateHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyEffectiveDateFooter'
        },
        {
          xtype: 'label',
          text: 'Formulary End Date'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyEndDateHeader'
        },
        {
          xtype: 'checkbox',
          style: {
            'margin-left': 'auto',
            'margin-right': 'auto'
          },
          uncheckedValue: false,
          name: 'FormularyEndDateFooter'
        }
      ]
    }
  ]
});
