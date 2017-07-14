Ext.define('Atlas.atlasformulary.view.jobqueue.JobQueue', {
  extend: 'Ext.grid.Panel',
  xtype: 'formulary-jobqueue',

  controller: 'formularyjobqueuecontroller',
  plugins: 'gridfilters',

  reference: 'jobqueue',

  title: 'Job Queue',
  selModel: 'rowmodel',

  viewModel: {
    data: {
      selectedUser: null
    },
    stores: {
      jobqueueusers: {
        type: 'jobqueueusers',
        autoLoad: true,
        remoteSort: true,
        listeners: {
          load: 'onUsersLoaded'
        }
      },
      jobqueues: {
        type: 'jobqueues',

        listeners: {
          load: 'onJobQueuesPaged'
        }
      },
      jobqueuespaged: {
        pageSize: 25,
        remoteSort: true,
        remoteFilter: true, // required for correct filtering using paging memory
        proxy: {
          type: 'memory',
          enablePaging: true
        }
      }
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'combobox',
          fieldLabel: 'Submitted By',
          bind: {
            store: '{jobqueueusers}',
            value: '{selectedUser}'
          },
          queryMode: 'local',
          displayField: 'userId',
          valueField: 'userId',
          typeAhead: true,
          forceSelection: true,
          listeners: {
            select: 'onSearch'
          }
        },
        {
          xtype: 'button',
          text: 'Delete Job',
          handler: 'onDeleteJobClick'
        },
        '->',
        {
          xtype: 'button',
          text: 'Clear Filters',
          handler: 'onClearFiltersClick'
        }
      ]
    },
    {
      xtype: 'pagingtoolbar',
      itemId: 'pagingBar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No jobs to display.',
      bind: '{jobqueuespaged}'
    }
  ],

  bind: '{jobqueuespaged}',

  columns: {
    defaults: {
      flex: 1
    },
    items: [
      {
        text: 'Job#',
        dataIndex: 'JobNbr',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Description',
        dataIndex: 'JobDesc',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Job Status',
        dataIndex: 'StatDesc',
        emptyCellText: 'Pending',
        filter: {
          type: 'list',
          store: {
            proxy: {
              type: 'formulary',
              url: '/jobstattype'
            },
            autoLoad: true
          },
          idField: 'JobStatTypeCode',
          labelField: 'JobStatTypeCode'
        }
      },
      {
        text: 'Start Date',
        dataIndex: 'JobStartTs',
        xtype: 'datecolumn',
        format: 'm/d/Y',
        filter: true
      },
      {
        text: 'End Date',
        dataIndex: 'JobEndTs',
        xtype: 'datecolumn',
        format: 'm/d/Y',
        filter: true
      },
      {
        text: 'Type',
        dataIndex: 'JobTypeCode',
        filter: {
          type: 'list',
          store: {
            proxy: {
              type: 'formulary',
              url: '/jobtype'
            },
            autoLoad: true
          },
          idField: 'JobTypeCode',
          labelField: 'JobTypeCode'
        }
      },
      {
        text: 'Submitted By',
        dataIndex: 'UserId',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        xtype: 'widgetcolumn',
        widget: {
          xtype: 'component',
          autoEl: {
            tag: 'a',
            href: '#'
          },
          bind: {
            viewModel: {
              data: {
                filePath: '{record.Rslt}'
              }
            },
            html: '{record.Rslt ? "Download" : ""}'
          },
          afterRender: function () {
            this.addManagedListener(
              this.getEl(),
              'click',
              function (e, el, eOpts) {
                this.fireEvent('click', this, e, eOpts);
              },
              this,
              {
                stopEvent: true
              }
            );
          },
          listeners: {
            click: 'onDownloadClick'
          }
        }
      }
    ]
  },

  listeners: {
    rowdblclick: 'onJobClick'
  }
});
