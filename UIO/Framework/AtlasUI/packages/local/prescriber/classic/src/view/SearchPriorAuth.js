Ext.define('Atlas.prescriber.view.SearchPriorAuth', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberSearchPriorAuth',
    title: 'Prior Auth Details',
    controller: 'SearchPriorAuthController',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    viewModel: {
        stores: {
            PriorAuthStore: {
                model: 'Atlas.prescriber.model.SearchPriorAuth',
                remoteSort: true,
                remoteFilter: true
            },
            PriorAuthMasterListStore: {
                model: 'Atlas.prescriber.model.SearchPriorAuthMasterList',
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    items: [{
        xtype: 'panel',
        style: ' margin-bottom: 40px;',
        layout: {
            type: 'table',
            columns: 2,
            tdAttrs: {style: 'padding-right: 60px; padding-left: 20px; padding-top: 5px; '}
        },
        title: 'Advanced Filter',
        iconCls: 'fa fa-search',
        name: 'testing',

        items: [
            {
                xtype: 'portalmembertypeahead',
                fieldLabel: 'Member:',
                width: 380,
                listeners: {
                    select: 'onMemberSelection',
                    beforequery: function (queryPlan) {
                        queryPlan.query = queryPlan.query;
                    }
                }
            },

            {
                xtype: 'datefield',
                fieldLabel: 'Date From:',
                name: 'dateFrom',
                itemId: 'dateFrom',
                reference: 'dateFrom',
                format: 'm/d/Y',
                value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
            },

            {
                xtype: 'drugtypeahead',
                fieldLabel: 'Medication:',
                emptyText: '[e.g Nexium]',
                allowblank: false,
                name: 'drugSearch',
                itemId: 'medication',
                reference: 'drugSearch',
                width: 380
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Date To:',
                name: 'dateTo',
                itemId: 'dateTo',
                reference: 'dateTo',
                format: 'm/d/Y',
                value: new Date()
            },

            {
                xtype: 'combobox',
                fieldLabel: 'Auth Status:',
                emptyText: 'Select a status...',
                name: 'authStatus',
                allowBlank: false,
                width: 380,
                bind: {
                    store: '{PriorAuthStore}'
                },
                displayField: 'ListDescription'
            }]

    },

        {
            xtype: 'panel',
            style: 'margin-bottom: 10px; margin-left: 5px;',
            layout: {
                style: ' margin-top: 50px; '
            },
            items: [{
                xtype: 'button',
                text: 'Search',
                iconCls: 'fa fa-search',
                name: 'search',
                handler: 'onOneClick'
            },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'fa fa-refresh',
                    name: 'reset',
                    handler: 'init'
                },
                {
                    xtype: 'button',
                    text: 'Export To Excel',
                    iconCls: 'fa fa-external-link',
                    name: 'export',
                    handler: 'exportExcel'
                }]
        },
        {
            xtype: 'grid',
            name: 'authgrid',
            reference: 'authgrid',
            itemId: 'authgrid',
            style: 'margin-left: 10px;',
            plugins: [{
                ptype: 'gridexporter'
            }],
            columns: [

                {text: 'Auth ID', dataIndex: 'authID'},
                {text: 'Member ID', dataIndex: 'memberID'},
                {text: 'Member Name', dataIndex: 'memberName', flex: 1, width: 50},
                {text: 'Hedis', dataIndex: 'HedisAlert'},
                {text: 'Last Filled', dataIndex: 'LastFilled'},
                {text: 'Pharmacy Filled', dataIndex: 'WhereFilled', flex: 1, width: 70},
                {text: 'Status', dataIndex: 'authStatus'},
                {
                    text: '',
                    width: 105,
                    xtype: 'widgetcolumn',
                    widget: {
                        width: 90,
                        textAlign: 'left',
                        xtype: 'button',
                        iconCls: 'fa fa-pencil-square-o',
                        text: 'View PA'
                        /*                        handler: function(btn) {
                         var rec = btn.getWidgetRecord();
                         //debugger;
                         Ext.Msg.alert("Button clicked", "Hey! " + rec.data.AccountName);
                         }*/
                    }

                },
                {
                    text: '',
                    width: 125,
                    xtype: 'widgetcolumn',
                    widget: {
                        width: 110,
                        textAlign: 'left',
                        xtype: 'button',
                        iconCls: 'fa fa-refresh',
                        text: 'Refresh PA'
                        /*                        handler: function(btn) {
                         var rec = btn.getWidgetRecord();
                         //debugger;
                         Ext.Msg.alert("Button clicked", "Hey! " + rec.data.AccountName);
                         }*/
                    }
                },
                {text: 'Medication', dataIndex: 'LN', flex: 1, width: 90},
                {text: 'Effective Date', dataIndex: 'EffectiveDateTime', formatter: 'date("m/d/Y")'},
                {text: 'Termination Date', dataIndex: 'TermDateTime', formatter: 'date("m/d/Y")'},
                {text: 'Decision Made On', dataIndex: 'ApprovedDateTime', formatter: 'date("m/d/Y")'},
                {text: 'Plan', dataIndex: 'PlanGroupName', flex: 1, width: 30}
            ],
            bind: {
                store: '{PriorAuthMasterListStore}'
            },
            //store: {
            //type: 'SearchPriorAuth'
            //},
            // paging bar on the bottom
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                pageSize: 2,
                displayInfo: true
            }]


        }]


});