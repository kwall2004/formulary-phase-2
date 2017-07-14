Ext.define('Atlas.atlasformulary.view.formularyheader.DrugListData', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.atlas-druglisteditor-main',
  controller: 'druglistdata',

  title: 'Drug Lists',

  viewModel: {
    data: {
      drugListInput: ''
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
          itemId: 'drugListCombo',
          flex: 8,
          fieldLabel: 'Drug Lists',
          labelAlign: 'right',

          store: {
            type: 'druglists',
            autoLoad: true
          },

          queryMode: 'local',
          anyMatch: true,
          displayField: 'DrugListName',
          valueField: 'DrugListName',

          bind: {
            value: '{drugListInput}',
            hidden: '{viewonly}'
          },

          listeners: {
            specialkey: 'onEnterKey',

            afterrender: function () {
              delete this.getStore().getProxy().getExtraParams().query;
              this.getStore().getProxy().setExtraParams({
                includeinactive: false
              });
            }
          }
        },
        {
          xtype: 'button',
          flex: 2,
          iconCls: 'x-fa fa-plus',
          tooltip: 'Add',
          handler: 'onPlusClick',

          bind: {
            hidden: '{viewonly}'
          }
        }
      ]
    },
    {
      xtype: 'grid',
      emptyText: 'No drug lists',

      bind: {
        store: '{druglistdata}'
      },

      columns: [
        {
          header: 'Name',
          dataIndex: 'FrmlryDrugListName',
          flex: 6
        },
        {
          xtype: 'actioncolumn',
          flex: 2,

          bind: {
            hidden: '{viewonly}'
          },

          items: [
            {
              iconCls: 'x-fa fa-minus',
              tooltip: 'Remove',
              handler: 'onRemoveClick'
            }
          ]
        }
      ]
    }
  ]
});
