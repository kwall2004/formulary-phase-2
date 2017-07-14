Ext.define('Atlas.portals.view.prescriber.SearchPriorAuth', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxprescriberSearchPriorAuth',
    title: 'Prior Auth Details',
    controller: 'PortalsRxSearchPriorAuthController',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    viewModel: {
        stores: {
            PriorAuthStore: {
                model: 'Atlas.portals.model.SearchPriorAuth'
            },
            PriorAuthMasterListStore: {
                model: 'Atlas.portals.model.SearchPriorAuthMasterList'
            }
        }
    },

    layout: 'border',

    items: [{
            xtype: 'panel',
            cls: 'card-panel',
            region: 'north',
            layout: {
                type: 'table',
                columns: 2,
                tdAttrs: {style: 'padding-right: 60px; padding-left: 20px; padding-top: 5px; '}
            },
            title: 'Advanced Filter',
            iconCls: 'fa fa-search',
            name: 'testing',

            dockedItems: [        {
                xtype: 'toolbar',
                dock: 'bottom',

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
                        handler: 'resetControls'
                    },
                    {
                        xtype: 'button',
                        text: 'Export To Excel',
                        iconCls: 'fa fa-external-link',
                        name: 'export',
                        handler: 'exportExcel'
                    }]
            }],

            items: [
                {
                    xtype: 'portalmembertypeahead',
                    fieldLabel: 'Member:',
                    reference: 'member',
                    width: 380
                },

                {
                    xtype: 'datefield',
                    fieldLabel: 'Date From:',
                    name: 'dateFrom',
                    itemId: 'dateFrom',
                    reference: 'dateFrom',
                    format: 'm/d/Y',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                    /*            listeners: {
                     'change': function (me) {
                     alert(me.getSubmitValue());
                     }
                     }*/
                },

                {
                    xtype: 'drugtypeahead',
                    fieldLabel: 'Medication:',
                    emptyText: '[e.g Nexium]',
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
                    reference: 'authStatus',
                    width: 380,
                    bind: {
                        store: '{PriorAuthStore}'
                    },
                    displayField: 'ListDescription'
                }]

        },
        {
            xtype: 'grid',
            cls: 'card-panel',
            region: 'center',
            name: 'authgrid',
            reference: 'authgrid',
            itemId: 'authgrid',
            plugins: [{
                ptype: 'gridexporter'
            }],
            columns: [

                {text: 'Auth ID', dataIndex: 'authID'},
                {text: 'Member ID', dataIndex: 'memberID'},
                {text: 'Member Name', dataIndex: 'memberName', width: 140, flex: 1},
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    sortable: false,
                    hideable: false,
                    align: 'center',
                    text: 'Hedis',
                    width: 60,
                    items: [{
                        xtype: 'button',
                        handler: 'hedisAction',
                        iconCls: 'x-fa fa-bell'
                    }],
                    renderer : function(value, meta, record) {
                        this.items[0].hidden = record.get('HedisAlert') !== 'H';
                    }
                },
                {text: 'Last Filled', dataIndex: 'LastFilled'},
                {text: 'Pharmacy Filled', dataIndex: 'WhereFilled', width: 140},
                {text: 'Status Code', dataIndex: 'AuthStatusCode', hidden: true},
                {text: 'Status', dataIndex: 'authStatus'},
                {
                    text: '',
                    xtype: 'actioncolumn',
                    hideable: false,
                    width: 120,
                    renderer: function(val,meta,rec) {
                        // generate unique id for an element
                        var id = Ext.id(),
                            me = this;

                        Ext.defer(function() {
                            if (rec.get('AuthStatusCode') !== '00' && rec.get("AuthStatusCode") !== '03') {
                                Ext.widget('button', {
                                    renderTo: id,
                                    iconCls: 'x-fa fa-eye',
                                    text: 'View PA',
                                    width: 100,
                                    handler: function() {
                                        me.up().up().up().getController().viewPA(rec);
                                    }
                                });
                            } else {
                                Ext.widget('button', {
                                    renderTo: id,
                                    iconCls: 'x-fa fa-pencil-square-o',
                                    text: 'Update PA',
                                    width: 100,
                                    handler: function() {
                                        me.up().up().up().getController().updatePA(rec);
                                    }
                                });
                            }
                        }, 50);
                        return Ext.String.format('<div id="{0}" style="height:4px"></div>', id);
                    }
                },
                {
                    text: '',
                    xtype: 'widgetcolumn',
                    hideable: false,
                    width: 120,
                    widget: {
                        width: 100,
                        textAlign: 'left',
                        xtype: 'button',
                        iconCls: 'fa fa-refresh',
                        text: 'Refresh PA',
                        handler: 'refreshPA'
                    },
                    onWidgetAttach: function (column, widget, record) {
                        widget.setDisabled(!(
                            record.get('authStatus') == 'Approved'
                            && record.get('TermDateTime')
                            && new Date(record.get('TermDateTime')).getTime() < new Date().getTime()
                        ));
                    }
                },
                {text: 'Medication', dataIndex: 'LN'},
                {text: 'Source', dataIndex: 'source', hidden: true},
                {text: 'Effective Date', dataIndex: 'EffectiveDateTime', formatter: 'date("m/d/Y")', width: 140},
                {text: 'Termination Date', dataIndex: 'TermDateTime', formatter: 'date("m/d/Y")', width: 140},
                {text: 'Decision Made On', dataIndex: 'ApprovedDateTime', formatter: 'date("m/d/Y")', width: 140},
                {text: 'Plan', dataIndex: 'PlanGroupName'}
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