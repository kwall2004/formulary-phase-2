Ext.define('Atlas.atlasformulary.view.manageformulary.EditorWindow', {
  extend: 'Ext.window.Window',
  xtype: 'manageformulary-editorwindow',

  bind: {
    title: '{title}'
  },

  layout: 'fit',

  ghost: false,
  modal: true,

  width: 500,
  closable: true,

  items: [
    {
      xtype: 'form',
      bodyPadding: 10,
      reference: 'manageformularyeditorform',
      waitMsgTarget: true,
      modelValidation: true,
      layout: {
        type: 'vbox',
        align: 'stretch'
      },

      defaults: {
        xtype: 'textfield',
        msgTarget: 'side'
      },

      items: [
        {
          fieldLabel: 'Formulary Name',
          name: 'FrmlryName',
          bind: '{formularyRecord.FrmlryName}'
        },
        {
          fieldLabel: 'Formulary ID',
          name: 'FrmlryID',
          bind: '{formularyRecord.FrmlryID}'
        },
        {
          fieldLabel: 'Version',
          name: 'FrmlryVer',
          bind: '{formularyRecord.FrmlryVer}'
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: 'onSaveClick'
        },
        {
          text: 'Cancel',
          handler: 'onCancelClick'
        }
      ]
    }
  ]
});
