Ext.define('Atlas.atlasformulary.view.manageformulary.TopBar', {
  extend: 'Ext.panel.Panel',
  xtype: 'manageformulary-topbar',

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
            disabled: '{!manageformularygrid.selection}'// Enable edit only when selection is available
          },
          handler: 'onViewFormularyClick'
        },
        {

          text: 'Copy',
          bind: {
            disabled: '{!manageformularygrid.selection}'// Enable edit only when selection is available
          },
          isNewVersion: false,
          handler: 'onCopyFormularyClick'
        },
        {

          text: 'Edit',
          itemId: 'editButton',
          disabled: true,
          handler: 'onEditFormularyClick'
        },
        {
          text: 'Delete',
          itemId: 'deleteButton',
          disabled: true,
          handler: 'onDeleteFormularyClick'
        },
        {
          text: 'View Notes',
          handler: 'onViewNotesClick',
          bind: {
            disabled: '{!manageformularygrid.selection}'
          }

        },
        '->',
        {
          text: 'Compare Formularies',
          handler: 'onCompareFormulariesClick'
        },
        {
          text: 'Discrepency Report',
          handler: 'onDiscrepancyReportClick',
          disabled: true
        },
        {
          text: 'Validation Report',
          handler: 'onValidationReportClick',
          disabled: true
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          text: 'Create New Formulary',
          handler: 'onCreateFormularyClick'
        },
        {
          text: 'Create New Version',
          itemId: 'createNewVersionButton',
          handler: 'onCreateNewVersionClick',
          isNewVersion: true,
          disabled: true
        },
        '->',
        {
          text: 'Export...',
          menu: [
            {
              text: 'Export Rules',
              handler: 'onExportFormularyRulesClick'
            },
            {
              text: 'Export NDCs',
              handler: 'onExportFormularyNDCClick'
            },
            {
              text: 'Formulary Summary',
              handler: 'onFormularySummaryClick'
            },
            {
              text: 'Missing FDB NDCs',
              handler: 'onMissingFDBNDCsClick',
              hidden: true,
              bind: {
                hidden: '{manageformularygrid.selection.DrugRefDbName != "Medispan"}'
              }
            }
          ],
          bind: {
            disabled: '{!manageformularygrid.selection}'
          }
        }
      ]

    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'smartformularysearchcombo',
          reference: 'smartformularysearchcombo',
          width: 300,
          listeners: {
            select: 'onFormularySearchSelect'
          }
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
          xtype: 'button',
          text: 'Clear Filters',
          handler: 'onClearFiltersClick'
        }
      ]

    }
  ]
});
