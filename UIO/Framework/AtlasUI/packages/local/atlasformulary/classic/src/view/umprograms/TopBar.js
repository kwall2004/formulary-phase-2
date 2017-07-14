Ext.define('Atlas.atlasformulary.view.umprograms.TopBar', {
  extend: 'Ext.panel.Panel',
  xtype: 'umprograms-topbar',

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
            disabled: '{!umprogramsgrid.selection}'
          },
          handler: 'onViewProgramClick'
        },
        {

          text: 'Copy',
          bind: {
            disabled: '{!umprogramsgrid.selection}'
          },
          isNewVersion: false,
          handler: 'onCopyProgramClick'
        },
        {

          text: 'Edit',
          itemId: 'editButton',
          bind: {
            disabled: '{!umprogramsgrid.selection}'
          },
          //disabled: true,
          handler: 'onEditProgramClick'
        },
        {
          text: 'Delete',
          itemId: 'deleteButton',
          bind: {
            disabled: '{!umprogramsgrid.selection}'
          },
          disabled: true,
          handler: 'onDeleteProgramClick'
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          text: 'Create New PA Program',
          handler: 'onCreatePAProgramClick'
        },
        {
          text: 'Create New ST Program',
          handler: 'onCreateSTProgramClick'
        }
      ]

    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        // {
        //   //xtype: 'smartformularysearchcombo',
        //   xtype: 'combobox',
        //   reference: 'smartprogramsearchcombo',
        //   width: 300,
        //   listeners: {
        //     select: 'onProgramSearchSelect'
        //   }
        // },
        // '->',
        // {
        //   xtype: 'combobox',
        //   bind: {
        //     store: '{resultsPerPage}'
        //   },
        //   editable: false,
        //   selectOnFocus: false,
        //   triggerAction: 'all',
        //   displayField: 'resultsPerPage',
        //   valueField: 'resultsPerPage',
        //   fieldLabel: 'Results per page',
        //   forceSelection: true,

        //   listeners: {
        //     select: 'onPageSizeSelect',
        //     afterrender: 'onPageSizeSelectRendered'
        //   }
        // },
        // {
        //   xtype: 'button',
        //   text: 'Clear Filters',
        //   handler: 'onClearFiltersClick'
        // }
      ]

    }
  ]
});
