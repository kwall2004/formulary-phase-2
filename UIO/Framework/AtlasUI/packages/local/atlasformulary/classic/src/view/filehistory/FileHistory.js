Ext.define('Atlas.atlasformulary.view.filehistory.FileHistory', {
  extend: 'Ext.grid.Panel',
  xtype: 'formulary-filehistory',

  controller: 'formularyfilehistorycontroller',

  title: 'File History',
  defaults: {
    xtype: 'button',
    flex: 1
  },

  plugins: 'gridfilters',
  selModel: 'rowmodel',

  viewModel: {
    stores: {
      filehistories: {
        id: 'filehistories',
        model: 'Atlas.atlasformulary.model.FileHistory',
        listeners: {
          load: 'onFilehistoriesPaged'
        }
      },

      filehistoriesPaged: {
        pageSize: 25,
        remoteSort: true,
        remoteFilter: true, // required for correct filtering using paging memory
        proxy: {
          type: 'memory',
          enablePaging: true
        }
      },
      resultsPerPage: {
        fields: [ 'resultsPerPage' ],
        data: [
          [ 25 ], [ 50 ], [ 100 ], [ 250 ], [ 500 ]
        ]
      }
    }
  },

  bind: {
    store: '{filehistoriesPaged}'
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          fieldLabel: 'From',
          xtype: 'datefield',
          name: 'startDate',
          format: 'm-d-Y',
          reference: 'From',
          listeners: {
            change: function (field) {
              field.lookupViewModel().set('changed', field.isDirty());
            }
          }
        },
        {
          fieldLabel: 'To',
          xtype: 'datefield',
          name: 'endDate',
          reference: 'To',
          format: 'm-d-Y',
          listeners: {
            change: function (field) {
              field.lookupViewModel().set('changed', field.isDirty());
            }
          }
        },
        {
          text: 'Submit',
          handler: 'onDateRangeSubmit'
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
          handler: 'onClearFilters'
        }
      ]
    },
    {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No Files to display.',
      bind: '{filehistoriesPaged}'
    },
    {
      xtype: 'panel',
      title: 'Drug Source File History'
    }
  ],

  columns: {
    defaults: {
      flex: 1
    },
    items: [
      {
        text: 'Source',
        dataIndex: 'FileType',
        filter: {
          type: 'list',
          options: [ 'FDB Daily', 'FDB Monthly', 'NSDE', 'Medispan', 'MedispanWeekly', 'Custom NDC' ]
        }
      },
      {
        text: 'Start Date/Time',
        dataIndex: 'StartTime',
        xtype: 'datecolumn',
        format: 'm-d-Y h:i:s',
        filter: true
      },
      {
        text: 'Status',
        dataIndex: 'RunStatus',
        filter: {
          type: 'list',
          options: [ 'Complete', 'Running', 'Failed' ]
        }
      },
      {
        text: 'End Date/Time',
        dataIndex: 'EndTime',
        xtype: 'datecolumn',
        format: 'm-d-Y h:i:s',
        filter: true
      },
      {
        text: '# of Records',
        dataIndex: 'RecordCount',
        filter: true
      }
    ]
  }

});
