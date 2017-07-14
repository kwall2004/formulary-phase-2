Ext.define('Atlas.atlasformulary.view.formularyheader.FrontTextConfig', {
  extend: 'Ext.window.Window',
  xtype: 'formularyheader-fronttextconfig',
  title: 'Front Text Configuration',
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

  controller: 'fronttextconfig',

  viewModel: {
    stores: {
      mainStore: {
        type: 'summaryreportfronttext',
        autoLoad: false,
        listeners: {
          beforeload: 'onStoreBeforeLoad',
          load: 'onStoreLoad'
        }
      },
      file: {
        type: 'summaryreportfronttextfiles',
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
      reference: 'frontTextForm',
      layout: {
        type: 'vbox',
        align: 'center'
      },
      items: [
        {
          xtype: 'checkbox',
          name: 'isTitlePageOnly',
          fieldLabel: 'Title Page Only'
        },
        {
          xtype: 'combobox',
          name: 'DefaultFrontTextPath',
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
