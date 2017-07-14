Ext.define('Atlas.macprice.view.MacConfiguration', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.MacConfiguration',
    itemId: 'MacDataGrid',
    title: 'MAC Configuration',
    controller: 'MacConfigurationController',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'NDC/LN',
                    itemId: 'lbDrug',
                    labelWidth: 50
                },
                {
                    xtype: 'drugtypeahead',
                    itemId: 'cbxDrug',
                    emptyText: ' [e.g. Nexium]',
                    listeners: {
                        select: 'drugtypeahead_Select'
                    },
                    displayField: 'NDC',
                    valueField: 'NDC',
                    width: 250
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'GPI',
                    itemId: 'lbGPI',
                    labelWidth: 30
                },
                {
                    xtype: 'gpitypeahead',
                    itemId: 'cbxCPI',
                    emptyText: ' [e.g. Cycloserine]',
                    listeners: {
                        select: 'gpitypeahead_Select'
                    },
                    displayField: 'GPICode',
                    valueField: 'GPICode',
                    width: 250
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Display Batch',
                    itemId: 'lbBatch',
                    labelWidth: 50
                },
                {
                    xtype: 'combobox',
                    itemId:'cbxBatch',
                    queryMode: 'local',
                    name:'wrange',
                    bind: {store: '{MacDataBatch}'},
                    displayField:'wrange',
                    valueField:'wrange',
                    listeners: {
                        select: 'onBatchUpdate'
                    }
                },
                {
                    xtype: 'displayfield',
                    itemId: 'lbBatchDetail'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'NDC',
                    itemId: 'lbNDC',
                    labelWidth: 30
                },
                {xtype: 'textfield', itemId:'NDC', name:'NDC', emptyText:' [e.g 00247008500]'},
                {
                    xtype: 'displayfield',
                    fieldLabel: 'GCN',
                    itemId: 'lbGCN',
                    labelWidth: 30
                },
                {xtype: 'textfield', itemId:'GCN', name:'GCN', emptyText:' [e.g 4169]'},
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Label Name',
                    itemId: 'lbLN',
                    labelWidth: 50
                },
                {xtype: 'textfield', itemId:'LN', name:'LN', emptyText:' [e.g ACETAMINOPHEN-COD #4 TABLET]'},
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Brand Name',
                    itemId: 'lbBN',
                    labelWidth: 50
                },
                {xtype: 'textfield', itemId:'BN', name:'BN', emptyText:' [e.g ACETAMINOPHEN-CODEINE]'},
                '-',
                {
                    xtype: 'button',
                    itemId: 'btnSearch',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                },
                {
                    xtype: 'button',
                    itemId: 'btnShowAll',
                    text: 'Show All',
                    iconCls: 'x-fa fa-binoculars',
                    handler: 'onShowAll'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'btnSelectAll',
                    text: 'Select All',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onSelectAll'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDeselectAll',
                    text: 'Deselect All',
                    iconCls: 'x-fa fa-circle-thin',
                    handler: 'onDeselectAll'
                }, '->',
                {
                    xtype: 'button',
                    itemId: 'btnUploadMac',
                    text: 'Upload MAC Pricing',
                    iconCls: 'x-fa fa-upload',
                    handler: 'onUploadMacPricing'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSubmitApproval',
                    text: 'Submit MAC List for Approval',
                    iconCls: 'x-fa fa-tasks',
                    handler: 'onSubmitApproval'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSaveChanges',
                    text: 'Save Changes',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onSaveChanges'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            itemId: 'gridPagingToolbar',
            displayInfo: true,
            pageSize: 20,
            dock: 'bottom'
        }
    ],
    selModel: 'rowmodel',
    plugins:[{
        ptype: 'rowediting',
        clicksToEdit: 2,
        reference: 'macPriceRowEditor',
        autoCancel: false,
        width: 300
        }
    ]
});
