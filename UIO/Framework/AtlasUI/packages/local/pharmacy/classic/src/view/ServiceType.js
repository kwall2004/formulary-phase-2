Ext.define('Atlas.pharmacy.view.ServiceType', {
    extend: 'Ext.panel.Panel',
    controller: 'servicetypecontroller',
    viewModel: 'servicetypeviewmodel',
    title: 'Service Type',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'box',
                    html: ' Search by'
                },
                {
                    xtype: 'segmentedbutton',
                    itemId: 'searchtype',
                    items: [
                        {
                            text: 'Pharmacies by Relationship',
                            hint: '[e.g. CVS MI]',
                            action: 'ncpdpId',
                            tooltip: 'Search Pharmacies by Relationship',
                            iconCls: 'x-fa fa-search',
                            pressed: true
                        },
                        {
                            text: 'Pharmacy',
                            hint: '[e.g. Target Pharmacy MI 48188]',
                            tooltip: 'Search Pharmacy Contract',
                            iconCls: 'x-fa fa-search',
                            action: 'npi'
                        }
                    ],
                    listeners: {
                        toggle: 'onSearchTypeToggle'
                    }
                },
                {
                    xtype: 'relationshiptypeahead',
                    itemId: 'cbxrelationshiptype',
                    displayField: 'Relationshipname',
                    valueField: 'relationshipID',
                    width: 250,
                    emptyText: '[e.g. CVS MI]',
                    listeners: {
                        select: 'onSearch'
                    }
                },
                {
                    xtype: 'providertypeahead',
                    itemId: 'cbxprovidertype',
                    displayField: 'Pharname',
                    hidden: true,
                    valueField: 'ncpdpId',
                    width: 250,
                    emptyText: '[e.g. Target Pharmacy MI 48188]',
                    listeners: {
                        select: 'onSearch'
                    }
                }
            ]
        }
    ],


    items: [
        {
            xtype: 'grid',
            itemId: 'gpServiceType',
            height: 900,
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'NCPDP', dataIndex: 'NCPDPID',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'NPI', dataIndex: 'npi',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    }, {
                        text: 'Pharmacy Name', dataIndex: 'PharmacyName',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'Address', dataIndex: 'address',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    }, {
                        text: 'City', dataIndex: 'city',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'State (*Filter)', dataIndex: 'state',
                        filterable: true,
                        local: false,
                        filter: {
                            type: 'string'
                        },
                        editor: {
                            // xtype: 'textfield',
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'Zip', dataIndex: 'zip',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'Service Type', dataIndex: 'TypeCode',
                        editor: {
                            xtype: 'combobox',
                            displayField: 'name',
                            id: 'checkCombo',
                            valueField: 'value',
                            queryMode: 'local',
                            bind: {
                                // value:'TypeCode',
                                store: '{storeDispenserType}'
                            },
                            multiSelect: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            listConfig: {
                                tpl: Ext.create('Ext.XTemplate',
                                    '<div style="margin-top:5px"><tpl for=".">',
                                    '<div class="boundList x-boundlist-item" style="display:table">',
                                    '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={value}></div>{name}</span>',
                                    '</div>',
                                    '</tpl></div>'
                                )
                            },
                            anyMatch: true,
                            lazyRender: true
                        }
                        , renderer: 'comboBoxforTypeCode'
                    },
                    {
                        text: 'NCPDP Service Type 1', dataIndex: 'typeDesc2',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'NCPDP Service Type 2', dataIndex: 'typeDesc3',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    },
                    {
                        text: 'NCPDP Service Type 3', dataIndex: 'typeDesc4',
                        editor: {
                            allowBlank: true,
                            disabled: true
                        }
                    }, {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        width: 100,
                        hideable: false,
                        flex: 0,
                        widget: {
                            xtype: 'container',
                            bind: true,
                            defaults: {
                                xtype: 'tool',
                                viewModel: true
                            },
                            items: [
                                // reject tool
                                {
                                    xtype: 'button',
                                    text: 'Reject',
                                    width: 75,
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {
                                        hidden: '{!record.isNeedUpdate}',
                                        tooltip: 'Reject '
                                    },
                                    handler: 'onUndoChangeClick'
                                }
                            ]
                        }
                    }
                ]
            },
            plugins: [
                {
                    ptype: 'rowediting',
                    clicksToEdit: 2,
                    autoCancel: false,
                    listeners: {
                        'edit': 'gpPharmacyServiceType_afteredit'
                    }
                },
                {
                    ptype: 'gridfilters'
                }
            ],
            listeners: {
                beforeedit: 'gpPharmacyServiceType_beforeedit'
            },
            bind: '{searchServiceType}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{searchServiceType}',
                    displayInfo: true,
                    dock: 'bottom',
                    hideRefresh: true
                }

            ]
        }],

    bbar: [

        '->',
        {
            xtype: 'button',
            itemId: 'btnSave',
            text: 'Save',
            iconCls: 'fa fa-save',
            handler: 'btnSaveClick',
            disabled: true
        }

    ]


});