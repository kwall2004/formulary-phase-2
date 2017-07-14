Ext.define('Atlas.plan.view.Search', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.plan-search',
    title: '~plansearch',
    require: [
        'Ext.grid.plugin.Exporter'
    ],
    plugins: [{
        ptype: 'gridexporter'
    }],
    controller: 'plan-search',

    viewModel: {
        stores: {
            plangroups: {
                type: 'plan-plangroups',
                autoLoad: false,
                listeners: {
                    load: 'onPlanGroupsPaged'
                }
            },
            carriers: {
                type: 'plan-carriers'
            },
            lobs: {
                type: 'plan-lineofbusiness'
            },

            planGroupsPaged: {
                pageSize: 25,
                remoteSort: true,
                remoteFilter: true,// required for correct filtering using paging memory
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            },
            resultsPerPage: {
                fields: ['resultsPerPage'],
                data: [
                    [25], [50], [100], [250], [500]
                ]
            }
        }
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
      xtype: 'fieldset',
    iconCls: 'fa fa-search',
    title: 'Plan Filter',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [

                {
                    xtype: 'combo',
                    //
                    // labelWidth: 60,
                    width: 300,
                    fieldLabel: 'Carrier',
                    emptyText: 'Select a carrier',
                    bind: {
                        store: '{carriers}'
                    },
                    // listeners: {
                    //     select: 'onCarrierSelect'
                    //  },
                    queryMode: 'local',
                    name: 'carriergroup',
                    displayField: 'carrierName',
                    valueField: 'carrierId'
                },
                {
                    xtype: 'combo',
                    // labelWidth: 110,
                    // width: 350,
                    fieldLabel: 'Line of Business',
                    emptyText: 'Line of Business',
                    bind: {
                        store: '{lobs}'
                    },
                    queryMode: 'local',
                    /*listeners: {
                     change: 'onLobsChange'
                     },*/
                    name: 'lob',
                    reference:'lob',
                    displayField: 'ListDescription',
                    valueField: 'ListItem'
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    style: {
                        margin: '0px 0px 0px 20px! important'
                    },
                    iconCls: 'fa fa-search',
                    scale: 'small',
                    width: 90,
                    handler: 'onSearch'
                }
            ]


        }




        ]},
                '->',
                {

                    text: 'Export to Excel',
                    handler: 'onGridExport',
                    xtype:'button'
                }
            ]
        }
    ],

    listeners: {
        itemdblclick: 'onItemdblclick'
    },

    // note: no grid filters until the backend can support it.
    // plugins: 'gridfilters',
    // plugins: [{
    //    ptype: 'gridexporter'
    // }],

    bind:  '{planGroupsPaged}',
    columns: {
        defaults: {
            width: 150
            // filter: { type: 'string'}
        },
        items: [
            {
                text: 'Plan Group ID',
                dataIndex: 'planGroupId',
                hidden: true,
                ignoreExport:true

            },
            {
                text: 'Plan Group Name',
                dataIndex: 'planGroupName',
                // filter: { type: 'string'},
                width: 230
            },
            {
                text: 'Plan Group Code',
                dataIndex: 'planGroupCode'
            },
            {
                text: 'Effective Date',
                dataIndex: 'effDate',
                xtype: 'datecolumn',
                format: 'm/d/Y',
                exportStyle: {
                    alignment: {
                        horizontal: 'Right'
                    },
                    format: 'Short Date'
                }
                // filter: {type: 'date'}
            },
            {
                text: 'Renewal Date',
                dataIndex: 'renewalDate',
                xtype: 'datecolumn',
                format: 'm/d/Y',
                exportStyle: {
                    alignment: {
                        horizontal: 'Right'
                    },
                    format: 'Short Date'
                }
                // filter: {type: 'date'}
            },
            {
                text: 'Termination Date',
                dataIndex: 'termDate',
                xtype: 'datecolumn',
                format: 'm/d/Y',
                exportStyle: {
                    alignment: {
                        horizontal: 'Right'
                    },
                    format: 'Short Date'
                }
                // filter: {type: 'date'}
            },
            {
                text: 'Carrier Name',
                dataIndex: 'carrierName'

            },
            {
                text: 'Status',
                dataIndex: 'planGroupStatus'
                // filter: {type: 'list', options: ['Active', 'Inactive']}
            },
            {
                text: 'Line of Business',
                dataIndex: 'lobName'
                // filter: {type: 'list', options: ['Medicare', 'Commercial', 'THPMedicaid', 'Medicaid']}
            },
            {
                text: 'CMS Contract ID',
                dataIndex: 'CMSCntrId'
            },
            {
                text: 'Allow Member Locks',
                dataIndex: 'allowMemberLocks',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                },
                exportStyle: {
                    alignment: {
                        horizontal: 'Right'
                    },
                    format:'General'
                }

                // filter: {type: 'boolean'}

            },
            {
                text: 'Process MTM Case',
                dataIndex: 'processMTMCase',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                }
                // filter: {type: 'boolean'}
            },
            {
                text: 'Process MAP Case',
                dataIndex: 'processMAPCase',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                }
                // filter: {type: 'boolean'}
            },
            {
                text: 'Allow Med Admin Fee',
                dataIndex: '',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                },
                filter: {type: 'boolean'}
            },
            {
                text: 'Mandantory Generic',
                dataIndex: 'mandatoryGeneric',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                }
                // filter: {type: 'boolean'}
            },
            {
                text: 'Asthma HEDIS Alert',
                dataIndex: 'asthmaHEDISAlert',
                renderer:function(value)
                {
                    if(value)
                    {
                        return "<input type='checkbox' checked='true' onclick=\"return false;\"/>";
                    }
                    return "<input type='checkbox' onclick=\"return false;\"/>";
                }
                // filter: {type: 'boolean'}
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        bind: { 'store': '{planGroupsPaged}'},
        dock:'bottom',
        displayInfo: true,
        hideRefresh: true
    }
});
