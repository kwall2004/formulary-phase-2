Ext.define('Atlas.atlasformulary.view.manageformulary.CompareFormulariesPopUp', {
  extend: 'Ext.window.Window',
  xtype: 'widget.manageformulary-compareformulariespopup',
  title: 'Manage Formulary - Compare Formularies',
  region: 'center',
  modal: true,
  beforeclose: function () {
    Ext.getBody().unmask();
  },
  layout: 'border',
  closeable: true,
  resizable: true,
  width: 600,
  height: 260,
  controller: 'compareformulariespopup',
  items: [
    {
      xtype: 'toolbar',
      region: 'south',
      ui: 'footer',
      items: [
        {
          xtype: 'button',
          text: 'Cancel',
          itemId: 'btnCancel',
          listeners: {
            click: function (button) {
              button.up('window').destroy();
            }
          }
        },
        '->',
        {
          xtype: 'button',
          text: 'Submit',
          itemId: 'btnSubmit',
          listeners: {
            click: function (button) {
              var controller = button.up('window').getController();
              controller.onSubmitClick();
            }
          }
        }
      ]

    },
    {
      xtype: 'container',

      layout: {
        type: 'vbox'
      },
      region: 'east',
      flex: 1,
      items: [
        {
          xtype: 'combobox',
          displayField: 'FrmlryName',
          valueField: 'FrmlrySK',
          fieldLabel: 'Formulary #1',
          store: {
            type: 'formularyheaders',
            data: [
              {
                name: 'FrmlryName'
              }
            ],
            autoLoad: true
          },
          reference: 'compareformularycombo1',
          queryMode: 'local',
          typeAhead: true,
          minChars: 0
        },
        {
          xtype: 'combobox',
          displayField: 'FrmlryName',
          valueField: 'FrmlrySK',
          fieldLabel: 'Formulary #2',
          store: {
            type: 'formularyheaders',
            data: [
              {
                name: 'FrmlryName'
              }
            ],
            autoLoad: true
          },
          reference: 'compareformularycombo2',
          queryMode: 'local',
          typeAhead: true,
          minChars: 0
        },
        {
          xtype: 'combobox',
          displayField: 'name',
          valueField: 'name',
          fieldLabel: 'Criteria',
          store: {
            fields: ['name'],
            /* eslint-disable object-curly-newline */
            data: [
              { name: 'GCN' },
              { name: 'GPI' },
              { name: 'LabelName' },
              { name: 'MedId' }
            ]
            /* eslint-enable object-curly-newline */
          },
          reference: 'compareformularycriteriacombo'
        }]

    },
    {
      xtype: 'container',
      region: 'center',
      layout: 'fit',
      items: [
        {
          xtype: 'multiselector',
          flex: 1,
          viewConfig: {
            deferEmptyText: false,
            emptyText: 'No UM Criteria selected'
          },
          fieldName: 'CvrgPrptyTypeDesc',
          title: 'Selected UM Criteria',
          search: {
            xtype: 'manageformulary-multiselector-search',
            field: 'CvrgPrptyTypeDesc',
            store: {
              type: 'compareformularyumcriterias'
            },
            buttons: [{
              xtype: 'button',
              text: 'OK',
              listeners: {
                click: function (button) {
                  button.up().up().setVisible(false);
                }
              }
            }]
          },
          scrollable: true,
          constrain: true,
          shim: true,
          border: true,
          reference: 'compareformularyumcriteriamulti'
        }
      ]
    }
  ]
});