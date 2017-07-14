/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.view.hpmember.MyDocuments', {
    extend: 'Ext.container.Container',
    xtype: 'portalshpmembermydocuments',
    title: 'My Documents',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    controller: 'mydocumentsview',
    viewModel: 'mydocuments',
    //layout: 'border',
    //scrollable: true,   // Really not needed, not does it come into play with layout below
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            scrollable: true,
            flex: 1,
            reference: 'myDocumentsForm',
            region: 'north',
            title: 'Selections',
            //collapsible: false,   // Need form to be able to resize
            cls: 'card-panel',
            defaults: {
                width: 500,
                labelWidth: 110,
                style: {
                    padding: '5px'
                }
            },
            items: [
                {
                    xtype: 'combo',
                    reference: 'familyListCombo',
                    fieldLabel: 'Family',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    name: 'familyCombo'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'From',
                    value: Ext.Date.add(new Date(), Ext.Date.DAY, -45),
                    maxValue: new Date(),
                    name: 'fromDate',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'To',
                    value: new Date(),
                    maxValue: new Date(),
                    name: 'toDate',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'container',
                    width: 600,
                    layout: {
                        pack: 'center',
                        align: 'center',
                        type: 'hbox'
                    },
                    items: {
                        xtype: 'button',
                        text: 'Search',
                        iconCls: 'x-fa fa-share-square-o',
                        handler: 'searchDocuments',
                        align: 'center',
                        width: 100
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Note: Documents listed are filtered by the From and To dates.',
                            reference: 'status',
                            style: {
                                color: 'red'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'Documents',
            cls: 'card-panel',
            region: 'center',
            flex: 2,
            bind: '{documentlist}',
            plugins: 'gridfilters',
            defaults: {
                flex: 1
            },
            columns: [
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    text: 'Download',
                    items: [{
                        xtype: 'button',
                        handler: 'viewDocument',
                        iconCls: 'x-fa fa-download'
                    }]
                },
                {
                    text: 'Date',
                    dataIndex: 'createdate',
                    formatter: 'date("m/d/Y")'
                },
                {
                    text: 'Document Name',
                    dataIndex: 'documentDesc',
                    filter: 'list',
                    flex: 2
                },
                {
                    text: 'First Name',
                    dataIndex: 'firstname'
                },
                {
                    text: 'Last Name',
                    dataIndex: 'lastname'
                }
            ],

            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No documents to display.'
            }
        }
    ]
});