// k3279 - Kevin Tabasan - 12/09/2016

Ext.define('Atlas.portals.view.provider.admin.ManageProviders', {
  extend: 'Ext.panel.Panel',
  xtype: 'provadminmanageproviders',
  viewModel: 'provadminmanageproviders',
  controller: 'provadminmanageproviders',
  title: 'Manage Providers',
  scrollable: true,

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Provider Management',
    layout: 'hbox',

    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',

      defaults: {
        xtype: 'button'
      },

      items: ['->', {
        text: 'Submit Request',
        handler: 'onSubmitRequestClick'
      }, {
        text: 'Clear',
        handler: 'onClearClick'
      }, {
        text: 'Export Providers',
        handler: 'onExportProvidersClick'
      }, '->']
    }],

    defaults: {
      flex: 1
    },

    items: [{
      xtype: 'fieldset',
      title: 'Remove Existing Providers',

      items: [{
        xtype: 'combobox',
        fieldLabel: 'Provider',
        width: 350,
        editable: false,
        selectOnFocus: false,
        reference: 'providersCombo',
        bind: {
          store: '{reformattedProviderList}'
        },
        displayField: 'fullName',
        valueField: 'provID'
      }, {
        xtype: 'grid',
        forceFit: true,
        reference: 'removalListGrid',
        bind: '{providerRemovalList}',
        emptyText: 'No Providers To Remove',
        maxHeight: 300,
        margin: 10,

        plugins: [{
          ptype: 'gridexporter'
        }],

        dockedItems: [{
          xtype: 'toolbar',
          dock: 'top',

          items: [{
            xtype: 'button',
            text: 'Include',
            iconCls: 'x-fa fa-plus-circle',
            handler: 'onIncludeRemovalClick'
          }, {
            xtype: 'button',
            text: 'Exclude',
            iconCls: 'x-fa fa-minus-circle',
            handler: 'onExcludeRemovalClick'
          }]
        }],

        columns: [{
          text: 'Name',
          dataIndex: 'fullName'
        }, {
          text: 'ID',
          dataIndex: 'provID'
        }]
      }]
    }, {
      xtype: 'fieldset',
      title: 'Add New Providers',

      items: [{
        xtype: 'textfield',
        fieldLabel: 'NPI Number',
        reference: 'npiTextfield',
        width: 300
      }, {
        xtype: 'grid',
        reference: 'additionListGrid',
        forceFit: true,
        bind: '{providerAdditionList}',
        emptyText: 'No Providers To Add',
        maxHeight: 300,
        margin: 10,

        dockedItems: [{
          xtype: 'toolbar',
          dock: 'top',

          items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-plus-circle',
            text: 'Include',
            handler: 'onIncludeAdditionClick'
          }, {
            xtype: 'button',
            iconCls: 'x-fa fa-minus-circle',
            text: 'Exclude',
            handler: 'onExcludeAdditionClick'
          }]
        }],

        columns: [{
          text: 'NPI',
          dataIndex: 'npiNum'
        }, {
          text: 'Name',
          dataIndex: 'fullName'
        }, {
          text: 'ID',
          dataIndex: 'provID'
        }]
      }, {
        xtype: 'container',
        layout: 'hbox',
        scrollable: 'x',

        defaults: {
          xtype: 'grid',
          forceFit: true,
          flex: 1,
          height: 400
        },

        items: [{
          xtype: 'grid',
          reference: 'availableLocationsGrid',
          bind: '{availableLocations}',

          viewConfig: {
            plugins: {
              ptype: 'gridviewdragdrop',
              containerScroll: true,
              dragGroup: 'dd-grid-to-grid-group2',
              dropGroup: 'dd-grid-to-grid-group1',

                            // The right hand drop zone gets special styling
                            // when dragging over it.
              dropZone: {
                overClass: 'dd-over-gridview'
              }
            }
          },

          columns: [{
            text: 'Available Provider Locations',
            renderer: function (value, gridcell, record) {
              return '<b>' + record.get('locationDesc') + '</b><br>' + record.get('locationAddr') + '<br>' +
              record.get('locationCSZ');
            }
          }]
        }, {
          xtype: 'grid',
          reference: 'selectedLocationsGrid',
          bind: '{selectedLocations}',

          viewConfig: {
            plugins: {
              ptype: 'gridviewdragdrop',
              containerScroll: true,
              dragGroup: 'dd-grid-to-grid-group1',
              dropGroup: 'dd-grid-to-grid-group2'
            }
          },

          columns: [{
            text: 'Selected Provider Locations',
            renderer: function (value, gridcell, record) {
              return '<b>' + record.get('locationDesc') + '</b><br>' + record.get('locationAddr') + '<br>' +
              record.get('locationCSZ');
            }
          }]
        }]
      }]
    }]
  }]
});