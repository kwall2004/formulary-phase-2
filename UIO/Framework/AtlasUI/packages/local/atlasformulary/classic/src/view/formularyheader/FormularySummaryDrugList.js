Ext.define('Atlas.atlasformulary.view.formularyheader.FormularySummaryDrugList', {
  extend: 'Ext.window.Window',
  xtype: 'formularysummarydruglist',

  controller: 'formularysummarydruglist',

  title: 'Formulary Summary - Drug List',

  width: 350,
  height: 345,
  resizable: false,

  viewModel: {
    data: {
      configSectionSK: null,
      summaryConfigSection: null
    },
    stores: {
      summaryconfigorganizeby: {
        type: 'summaryconfigorganizeby',
        autoLoad: true
      },
      summaryconfigdrugsortby: {
        type: 'summaryconfigdrugsortby',
        autoLoad: true
      },
      summaryconfigotcby: {
        type: 'summaryconfigotcby',
        autoLoad: true
      },
      summaryconfigdruglistsection: {
        type: 'summaryconfigdruglistsection',
        autoLoad: true
      }
    }
  },

  items: [{
    xtype: 'form',
    layout: 'vbox',
    cls: 'border-none',
    border: false,
    frame: false,
    items: [
      {
        xtype: 'combobox',
        name: 'SumRptOrgBySK',
        fieldLabel: 'Organize By',
        displayField: 'SumRptOrgByName',
        valueField: 'SumRptOrgBySK',
        forceSelection: true,
        reference: 'summaryreportorgbycombo',
        bind: {
          value: '{summaryConfigSection.SumRptOrgBySK}',
          store: '{summaryconfigorganizeby}'
        },
        width: '85%',
        allowBlank: false
      },
      {
        xtype: 'combobox',
        name: 'SumRptDrugSortBySK',
        fieldLabel: 'Drug Level By',
        displayField: 'SumRptDrugSortByName',
        valueField: 'SumRptDrugSortBySK',
        forceSelection: true,
        reference: 'summaryreportsortbycombo',
        bind: {
          value: '{summaryConfigSection.SumRptDrugSortBy}',
          store: '{summaryconfigdrugsortby}'
        },
        width: '85%',
        allowBlank: false
      },
      {
        xtype: 'combobox',
        name: 'SumRptOTCSK',
        fieldLabel: 'OTC',
        displayField: 'SumRptOTCName',
        valueField: 'SumRptOTCSK',
        forceSelection: true,
        reference: 'summaryreportotccombo',
        bind: {
          value: '{summaryConfigSection.SumRptOTCSK}',
          store: '{summaryconfigotcby}'
        },
        width: '85%',
        allowBlank: false
      },
      {
        xtype: 'fieldcontainer',
        layout: 'vbox',
        fieldLabel: 'Column Headings',
        labelAlign: 'top',
        padding: '10 5 5 10',
        frame: true,
        width: '100%',
        cls: 'border-none',
        items: [{
          xtype: 'panel',
          layout: 'hbox',
          width: '100%',
          cls: 'border-none',
          items: [{
            xtype: 'checkboxfield',
            boxLabel: 'Column 1',
            reference: 'columnonecheckbox'
          },
          {
            xtype: 'textfield',
            reference: 'textfieldone',
            allowBlank: false,
            bind: {
              disabled: '{!columnonecheckbox.checked}',
              value: '{summaryConfigSection.ColumnOneHeading}'
            }

          }
          ]
        },
        {
          xtype: 'panel',
          layout: 'hbox',
          width: '100%',
          cls: 'border-none',
          items: [{
            xtype: 'checkboxfield',
            boxLabel: 'Column 2',
            reference: 'columntwocheckbox'
          },
          {
            xtype: 'textfield',
            reference: 'textfieldtwo',
            allowBlank: false,
            bind: {
              disabled: '{!columntwocheckbox.checked}',
              value: '{summaryConfigSection.ColumnTwoHeading}'
            }
          }
          ]
        },
        {
          xtype: 'panel',
          layout: 'hbox',
          width: '100%',
          cls: 'border-none',
          items: [{
            xtype: 'checkboxfield',
            boxLabel: 'Column 3',
            reference: 'columnthreecheckbox'
          },
          {
            xtype: 'textfield',
            reference: 'textfieldthree',
            allowBlank: false,
            bind: {
              disabled: '{!columnthreecheckbox.checked}',
              value: '{summaryConfigSection.ColumnThreeHeading}'
            }
          }
          ]
        },
        {
          xtype: 'panel',
          layout: 'hbox',
          width: '100%',
          cls: 'border-none',
          items: [{
            xtype: 'checkboxfield',
            boxLabel: 'Column 4',
            reference: 'columnfourcheckbox'
          },
          {
            xtype: 'textfield',
            reference: 'textfieldfour',
            allowBlank: false,
            bind: {
              disabled: '{!columnfourcheckbox.checked}',
              value: '{summaryConfigSection.ColumnFourHeading}'
            }
          }
          ]
        }

        ]
      }
    ],
    buttons: [
      {
        text: 'Save',
        handler: 'onSaveClick',
        disabled: true,
        formBind: true
      },
      {
        text: 'Close',
        handler: 'onCloseClick'
      }
    ]
  }]
});
