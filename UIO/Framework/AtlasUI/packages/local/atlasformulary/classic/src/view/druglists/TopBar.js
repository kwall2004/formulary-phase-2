Ext.define('Atlas.atlasformulary.view.druglists.TopBar', {
  extend: 'Ext.panel.Panel',
  xtype: 'druglists-topbar',

  defaults: {
    xtype: 'button',
    margin: '12 6',
    flex: 1
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          text: 'View',
          bind: {
            disabled: '{!druglistsgrid.selection}'// Enable edit only when selection is available
          },
          handler: 'onViewDrugListClick'
        },
        {
          text: 'Copy',
          bind: {
            disabled: '{!druglistsgrid.selection}'// Enable edit only when selection is available
          },
          handler: 'onCopyDrugListClick'
        },
        {
          text: 'Edit',
          bind: {
            disabled: '{!druglistsgrid.selection}'// Enable edit only when selection is available
          },
          handler: 'onEditDrugListClick'
        },
        {
          text: 'Delete',
          bind: {
            disabled: '{!druglistsgrid.selection}'
          },
          handler: 'onDeleteDrugListClick'
        },
        '->',
        {
          text: 'Clear Filters',
          handler: 'onClearFiltersClick'
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          text: 'Create New Drug List',
          handler: 'onCreateDrugListClick'
        },
        '->',
        {
          xtype: 'combobox',
          bind: {
            store: '{resultsPerPage}'
          },
          editable: false,
          selectOnFocus: false,
          triggerAction: 'all',
          displayField: 'resultsPerPage',
          valueField: 'resultsPerPage',
          fieldLabel: 'Results per page',
          forceSelection: true,

          listeners: {
            select: 'onPageSizeSelect',
            afterrender: 'onPageSizeSelectRendered'
          }
        },
        {
          text: 'Export',
          handler: 'onExportDrugListClick',
          bind: {
            disabled: '{!druglistsgrid.selection}'
          }
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'smartdruglistsearchcombo',
          reference: 'smartdruglistsearchcombo',
          width: 300,
          listeners: {
            select: 'onDrugListSearchSelect'
          }
        }
      ]
    }
  ]
});
