Ext.define('Atlas.atlasformulary.view.formularyheader.BackTextConfig', {
  extend: 'Ext.window.Window',
  xtype: 'formularyheader-backtextconfig',
  title: 'Back Text Configuration',
  modal: false,
  closeable: true,
  resizable: true,
  width: 300,
  height: 200,
  layout: 'fit',

  listeners: {
    afterlayout: function (view) {
      if (this.getViewModel().get('pendingCalls').length > 0) {
        Ext.getBody().mask('Loading...');
      }
    }
  },

  controller: 'backtextconfig',

  viewModel: {
    stores: {
      mainStore: {
        type: 'summaryreportbacktext',
        autoLoad: false,
        listeners: {
          beforeload: 'onStoreBeforeLoad',
          load: 'onStoreLoad'
        }
      },
      file: {
        type: 'summaryreportbacktextfiles',
        autoLoad: false,
        listeners: {
          beforeload: 'onStoreBeforeLoad',
          load: 'onStoreLoad'
        }
      }
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
      reference: 'backTextForm',
      layout: {
        type: 'vbox',
        align: 'center'
      },
      items: [
        {
          xtype: 'combobox',
          name: 'DefaultBackTextPath',
          fieldLabel: 'Select File',
          bind: {
            store: '{file}'
          },
          displayField: 'fileNames',
          valueField: 'fileNames',
          queryMode: 'local'
        },
        {
          xtype: 'filefield',
          name: 'uploadedFile',
          emptyText: 'File name',
          fieldLabel: 'File name',
          buttonText: '',
          buttonConfig: {
            iconCls: 'x-fa fa-upload'
          }
        }
      ]
    }
  ]
});
