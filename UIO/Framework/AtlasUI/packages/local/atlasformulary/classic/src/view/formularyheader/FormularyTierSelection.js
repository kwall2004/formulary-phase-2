Ext.define('Atlas.atlasformulary.view.formularyheader.FormularyTierSelection', {
  extend: 'Ext.panel.Panel',
  xtype: 'formularytierselection',
  controller: 'formularytierselection',

  requires: ['Ext.grid.plugin.CellEditing'],

  title: 'Tiers',

  viewModel: {
    data: {
      viewOnly: false
    }
  },

  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  items: [
    {
      xtype: 'toolbar',
      cls: 'x-toolbar-docked-top border-none',

      style: {
        paddingBottom: '10px !important',
        backgroundColor: 'transparent !important'
      },

      items: [
        {
          xtype: 'combobox',
          itemId: 'tierCombo',
          flex: 8,
          fieldLabel: 'Tiers',
          labelAlign: 'right',
          forceSelection: false,
          editable: true,
          displayField: 'FrmlryTierName',
          valueField: 'FrmlryTierName',
          minChars: 999,

          bind: {
            hidden: '{viewOnly}'
          },
          /* eslint-disable object-curly-newline */
          store: {
            data: [
              { FrmlryTierName: 'Generic' },
              { FrmlryTierName: 'Preferred Generic' },
              { FrmlryTierName: 'Non-preferred Generic' },
              { FrmlryTierName: 'Brand' },
              { FrmlryTierName: 'Preferred Brand' },
              { FrmlryTierName: 'Non-preferred Brand' },
              { FrmlryTierName: 'Specialty' },
              { FrmlryTierName: 'Preventative' },
              { FrmlryTierName: 'Other' }
            ]
          },
          /* eslint-enable object-curly-newline */
          listeners: {
            specialkey: 'onSpecialKey',
            select: 'onAddClick'
          }
        },
        {
          xtype: 'button',
          itemId: 'addButton',
          flex: 2,
          iconCls: 'x-fa fa-plus',
          tooltip: 'Add',
          handler: 'onAddClick',

          bind: {
            hidden: '{viewOnly}'
          }
        }
      ]
    },
    {
      xtype: 'grid',
      selModel: 'cellmodel',

      plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
      },

      bind: {
        store: '{tiers}'
      },

      columns: [
        {
          header: 'Number',
          flex: 2,
          dataIndex: 'FrmlryTierNbr',

          editor: {
            xtype: 'numberfield',
            allowBlank: false,

            bind: {
              disabled: '{viewOnly}'
            }
          }
        },
        {
          header: 'Name',
          flex: 6,
          dataIndex: 'FrmlryTierName',

          editor: {
            xtype: 'textfield',
            allowBlank: false,

            bind: {
              disabled: '{viewOnly}'
            }
          }
        },
        {
          xtype: 'actioncolumn',
          flex: 2,

          bind: {
            hidden: '{viewOnly}'
          },

          items: [
            {
              iconCls: 'x-fa fa-minus',
              tooltip: 'Delete',
              handler: 'onRemoveClick',

              isDisabled: function (view, rowIndex, colIndex, item, record) {
                // Returns true if 'editable' is false (, null, or undefined)
                return record.get('FrmlryTierNbr') == 99; // eslint-disable-line eqeqeq
              }
            }
          ]
        }
      ]
    }
  ]
});

