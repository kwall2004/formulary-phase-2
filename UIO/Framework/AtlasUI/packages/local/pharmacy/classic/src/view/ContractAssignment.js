Ext.define('Atlas.pharmacy.view.ContractAssignment', {
    extend: 'Ext.panel.Panel',
    controller: 'contractassignmentcontroller',
    viewModel: 'contractassignmentviewmodel',
    //layout: 'Con',
    require: 'Atlas.authohrization.view.PopupChooseNetworks',
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
                            text: 'Relationship',
                            hint: '[e.g. CVS MI]',
                            action: 'ncpdpId',
                            pressed: true,
                            tooltip: ['Search Relationship Contract']
                        },
                        {
                            text: 'Pharmacy',
                            hint: '[e.g. Target Pharmacy MI 48188]',
                            action: 'npi',
                            tooltip: ['Search Pharmacy Contract']
                        }
                    ]
                    ,
                    listeners: {
                        toggle: 'onSearchTypeToggle'
                    }
                },
                {
                    xtype: 'relationshiptypeahead',
                    itemId: 'cbxrelationshiptype',
                    displayField: 'name',
                    valueField: 'relationshipID',
                    width: 250,
                    emptyText: '[e.g. CVS MI]',
                    listeners: {
                        select: function (relationship, b, c, d) {
                            relationship.setValue(relationship.lastSelection[0].data.relationshipID + ' ' + relationship.lastSelection[0].data.name);

                        }
                    }
                },
                {
                    xtype: 'providertypeahead',
                    itemId: 'cbxprovidertype',
                    displayField: 'Name',
                    hidden: true,
                    valueField: 'ncpdpId',
                    width: 250,
                    emptyText: '[e.g. Target Pharmacy MI 48188]',
                    listeners: {
                        select: 'cbxprovidertype_select'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    text: 'View Pharmacy',
                    itemId: 'btnviewpharmacy',
                    iconCls: 'fa fa-home fa-2x',
                    handler: 'onbtnviewpharmacy'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Pharmacy Network',
                    itemId: 'cbxPharmacyNetwork',
                    labelWidth: 115,
                    width: 350,
                    displayField: 'NetworkDescription',
                    valueField: 'NetworkID',
                    listConfig: {
                        maxWidth: 220
                    },
                    bind: {
                        //  value: '{cdmodel.SupportStmtType}',
                        store: '{allNetworkSetup}'
                    }
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Line of Business',
                    itemId: 'cbxLineofBusiness',
                    labelWidth: 115,
                    width: 350,
                    displayField: 'name',
                    valueField: 'value',
                    listConfig: {
                        maxWidth: 220
                    },
                    bind: {
                        //  value: '{cdmodel.SupportStmtType}',
                        store: '{listdetailsLineOfBusiness}'
                    }
                }, {
                    xtype: 'button',
                    text: 'Search',
                    itemId: 'btnSearch',
                    iconCls: 'fa fa-search',
                    handler: 'onSearch'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId: 'gpcontractassignment',
            height: 900,
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Contract ID', dataIndex: 'ContractId'
                    },
                    {
                        text: 'Pharmacy Relationships', dataIndex: 'RelationShipName'
                    },
                    {
                        text: 'Eff Date', dataIndex: 'EffectiveDate', dateformat: 'm/j/Y', xtype: 'datecolumn'
                    }, {
                        text: 'Term Date', dataIndex: 'Termdate', dateformat: 'm/j/Y', xtype: 'datecolumn'
                    },
                    {
                        text: 'Contract Status', dataIndex: 'contractStatus'
                    },
                    {
                        text: 'Networks', dataIndex: 'NetworkDescr'
                    },
                    {
                        text: 'Line of Business', dataIndex: 'LOB'
                    }
                ]
            },
            listeners: {
                itemdblclick: 'contractassignment_itemdblclick'
            },
            bind: '{contractassignment}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{contractassignment}',
                    displayInfo: 'true',
                    dock: 'bottom',
                    pageSize: 25
                }
            ]
        }

    ]
});