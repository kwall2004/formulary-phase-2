/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Paul Glinski]
 Description: A view that shows the user information about there claims.
 Each dropdown contains a paging grid with more information.
 */
Ext.define('Atlas.portals.view.rxmember.MyClaimsMember', {
    extend: 'Ext.panel.Panel',
    title: 'My Claims',
    scrollable: true,
    viewModel: 'myclaimsmembermodel',
    controller: 'myClaimsMemberController',
    reference: 'myclaimsmemberpanel',
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'My Claims',
            layout: 'hbox',

            items: [{
                xtype: 'toolbar',

                items: [{
                    xtype: 'combo',
                    reference: 'yearCombo',
                    fieldLabel: 'Select Year',
                    labelWidth: 80,
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'value',
                    value: new Date().getFullYear(),
                    listeners: {
                        beforerender:'initializeYears'
                    }
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Group By',
                    labelWidth: 80,
                    name: 'groupby',
                    reference: 'groupBySelected',
                    queryMode: 'local',
                    valueField: 'groupby',
                    displayField: 'groupby',
                    store: ['Month', 'Quarter', 'Year'],
                    value: 'Month',
                    autoSelect: true,
                    forceSelection: true
                },
                    {
                        xtype: 'button',
                        text: 'Search',
                        iconCls: 'fa fa-search',
                        handler: 'onSearchClick'
                    }]
            }]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'grid',
                cls: 'card-panel',
                flex: 1,
                columns: [{
                    text: 'Date',
                    dataIndex: 'itemDescription',
                    flex: 1
                },
                    {
                        text: 'Amount You Paid',
                        dataIndex: 'displayAmt',
                        flex: 2
                    }
                ],
                bind: {
                    store: '{myClaimsMemberStore}'
                },
                listeners: {
                    afterrender: 'onSearchClick',
                    itemclick: 'onMemberGridClick'
                }
            },
                {
                    xtype: 'grid',
                    cls: 'card-panel',
                    flex: 5,
                    height: 870,
                    scrollable:true,
                    columns: [
                        {
                            text: "",
                            xtype: 'widgetcolumn',
                            dataIndex: '',
                            widget: {
                                xtype: 'button',
                                iconCls: 'fa fa-medkit',
                                handler: 'onDrugSearchClick',
                                tooltip: 'Click to view generic alternatives'
                            },
                            sortable: false,
                            hideable: false
                        }, {
                            text: "Claim ID",
                            flex: 2,
                            dataIndex: 'claimID',
                            hidden: true
                        }, {
                            text: "RX ID",
                            flex: 2,
                            dataIndex: 'rxid',
                            hidden: true
                        }, {
                            text: "Medication",
                            flex: 3,
                            dataIndex: 'medication'
                        }, {

                            text: 'Brand Name',
                            flex: 3,
                            dataIndex: 'brandname'
                        }, {
                            text: "Claim Date",
                            dataIndex: 'svcdate',
                            flex: 2,
                            renderer: function(value, field){
                              return  Ext.util.Format.date(value, 'm/d/Y');
                            }
                        }, {
                            text: "Quantity",
                            dataIndex: 'qty'
                        }, {
                            text: "Days Supply",
                            dataIndex: 'supply'
                        }, /*{
                            text: 'Pharmacy Name',
                            xtype: 'widgetcolumn',
                            dataIndex: 'rxname',
                            flex: 3,
                            widget: {
                                xtype: 'button',
                                iconCls: 'fa fa-home',
                                handler: 'onPharmacyClick',
                                tooltip: 'Click to view pharmacy details'
                            }
                        }, {
                            text: 'Prescriber Name',
                            xtype: 'widgetcolumn',
                            dataIndex: 'drname',
                            flex: 3,
                            widget: {
                                xtype: 'button',
                                iconCls: 'fa fa-user-md',
                                handler: 'onPrescriberClick',
                                tooltip: 'Click to view doctor details'
                            }
                        }, */{
                            text: "Your Paid Amount",
                            dataIndex: 'patPaidAmt',
                            flex: 2,
                            renderer: function(value, field){
                                return Ext.util.Format.currency(value);
                            }
                        }
                    ],
                    bind: {
                        store: '{claimSearchStore}'
                    },
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        pageSize: 10,
                        bind: {
                            store: '{claimSearchStore}'
                        },
                        displayInfo: true
                    }]
                }]
        }
    ]
});
