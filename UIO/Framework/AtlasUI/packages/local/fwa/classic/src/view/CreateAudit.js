Ext.define('Atlas.fwa.view.CreateAudit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fwa-createaudit',
    controller: 'fwacreateauditviewcontroller',
    viewModel: 'fwacreateauditviewmodel',
    title: 'Create Audit',
    layout: 'vbox',

    items:[
        {
        xtype: 'panel',
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Search Type',
            displayField: 'display',
            valueField: 'val',
            value: 'Manual',
            bind: {
                store: {
                    fields: [
                        'display',
                        'val'
                    ],

                    data: [{
                        'display':'Manual',
                        'val': 'Manual'
                    }, {
                        'display':'Concurrent',
                        'val':'Concurrent'
                    }]
                }
            },
            listeners: {
                select: 'onSearchSelect'
            }
        }]
    },
        {
        xtype: 'panel',
        layout: 'card',
        width: '100%',
        height: 150,
        id: 'createAuditCardPanel',
        activeItem: 0,
        items: [
            {
            xtype: 'container',
            id: 'manualCreditAudit',
            layout: 'column',
            frame: false,
            border: false,
            defaults: {
                frame: false,
                border: false
            },
            width: '100%',
            items: [{
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Pharmacy Name'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '# of Results'
                }],
                flex: 1
            }, {
                items:[{
                    xtype: 'combobox',
                    fieldLabel: 'State'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'City'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Zip'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'County'
                }],
                flex: 1,
                frame: false
            }]
        }, {
            xtype: 'container',
            id: 'concurrentCreditAudit',
            layout: 'column',
            width: '100%',
            items: [{
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '# of Rx',
                    value: 5
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Rx Age',
                    value: 30
                }],
                flex: 1
            }, {
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '# of Results',
                    value: 1
                }],
                flex: 1
            }]
        }],

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            layout: 'hbox',
            items: [
                '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-binoculars',
                text: 'Generate List'
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-repeat',
                text: 'Reset'
            }]
        }]
    }, {
        xtype: 'gridpanel',
        width: '100%',
            flex:1,
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Select All',
                iconCls: 'x-fa fa-random'
            }, {
                xtype: 'button',
                text: 'Deselect All',
                iconCls: 'x-fa fa-square-o'
            },
                '->',
            {
                xtype: 'tbseparator'
            }, {
                xtype: 'button',
                text: 'Create Audit List',
                iconCls: 'x-fa fa-floppy-o'
            }]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            displayInfo:true
        }],
        columns: [/*{
            xtype: 'checkcolumn'
        }, */{
            text: 'NCPDP'
        }, {
            text: 'NPI'
        }, {
            text: 'Pharmacy Name'
        }, {
            text: 'Address'
        }, {
            text: 'City'
        }, {
            text: 'State'
        }, {
            text: 'Zip'
        }]
    }]
});