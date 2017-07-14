/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FRFManagement', {
        extend: 'Ext.panel.Panel',
        xtype: 'frfmanagement',
        /*viewModel: {
         type: 'cdagviewmodel'
         },*/
        viewModel: 'frfmanagementviewmodel',

        //itemId: 'cdagmain',
        title: 'FRF Management',
        controller: 'frfmanagementcontroller',
        layout: 'fit',
        dockedItems: {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                '->',
                {
                    xtype: 'button',
                    iconCls: 'fa fa-search-plus',
                    text: 'Menu',

                    menu: [
                        //The value should be equal to the xtype of the view you are trying to load
                        {
                            text: 'FRF File Upload',
                            value: 'formulary-frffileupload',
                            handler: 'menuOnClick'
                        },
                        {
                            text: 'Gen CMS FF File',
                            value: 'formulary-gencmsfffile',
                            handler: 'menuOnClick'
                        }
                    ]
                }
            ]
        },
        defaults: {
            closable: false
        },
        items: [
            {
                xtype: 'tabpanel',
                itemId:'tabMenu',
                flex: 1,
                items: [
                    {
                        xtype: 'panel',
                        alias:'formulary-frffileupload',
                        title: 'FRF File Upload',
                        flex: 1,
                        width: 1245,
                        height: 640,
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                            pack: 'start'
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'FRF Upload',
                                items: [
                                    {
                                        xtype: 'container',
                                        style: {'padding-left': '70px'},
                                        layout: 'hbox',
                                        flex: 2,
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Month',
                                                displayField: 'name',
                                                valueField: 'value',
                                                width: 350,
                                                bind: {
                                                    //value: '{cdmodel.InTake}',
                                                    //store: '{storereceivedvia}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Year',
                                                displayField: 'name',
                                                valueField: 'value',
                                                width: 350,
                                                bind: {
                                                    //value: '{cdmodel.InTake}',
                                                    //store: '{storereceivedvia}'
                                                }
                                            },
                                            {
                                                xtype: 'filefield',
                                                itemId: 'File',
                                                name: 'File',
                                                emptyText: 'Select a file',
                                                fieldLabel: 'FRF File Upload',
                                                allowBlank: false,
                                                width: '350px',
                                                buttonText: '',
                                                buttonConfig: {
                                                    iconCls: 'upload-icon'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Upload',
                                                iconCls: 'fa fa-upload',
                                                handler:'btnRemoveClick'
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Reset',
                                                iconCls: 'fa  fa-minus-circle',
                                                handler:'btnRemoveClick'
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Relink',
                                                handler:'btnRemoveClick'
                                            }

                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'FRF View',
                                items: [
                                    {
                                        xtype: 'container',
                                        style: {'padding-left': '70px'},
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Month',
                                                displayField: 'name',
                                                valueField: 'value',
                                                width: 350,
                                                bind: {
                                                    //value: '{cdmodel.InTake}',
                                                    //store: '{storereceivedvia}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Year',
                                                displayField: 'name',
                                                valueField: 'value',
                                                width: 350,
                                                bind: {
                                                    //value: '{cdmodel.InTake}',
                                                    //store: '{storereceivedvia}'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'View',
                                                handler: 'btnRemoveClick'
                                            }

                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                border:true,
                                layout: {
                                    type: 'fit',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                items:[
                                    {
                                        xtype: 'grid',
                                        height:600,
                                        itemId: 'gpFRFManagement',
                                        tbar: [
                                            '->',
                                            {
                                                xtype: 'button',
                                                iconCls: 'fa fa-file-excel-o',
                                                handler:'btnRemoveClick',
                                                text:'Export To Excel'
                                            }
                                        ],
                                        columns: [
                                            {
                                                text: 'CMS Flag', dataIndex: 'CMSFlag', width: 200
                                            },
                                            {
                                                text: 'RxCUI', dataIndex: 'RxCUI', width: 200
                                            },
                                            {
                                                text: 'TTY', dataIndex: 'TTY', width: 200
                                            },
                                            {
                                                text: 'Rxnorm Description', dataIndex: 'RxNormDesc', width: 200
                                            },
                                            {
                                                text: 'RelatedBN', dataIndex: 'RelatedBN', width: 200
                                            },
                                            {
                                                text: 'RelatedSCDC', dataIndex: 'RelatedSCDC', width: 200
                                            },
                                            {
                                                text: 'RelatedDF', dataIndex: 'RelatedDF', width: 200
                                            },
                                            {
                                                text: 'RelatedNDC', dataIndex: 'RelatedNDC', width: 200
                                            }
                                        ],
                                        bind: '{storeFRFView}',
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                bind: '{storeFRFView}',
                                                displayInfo: true,
                                                dock: 'bottom'
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
)

