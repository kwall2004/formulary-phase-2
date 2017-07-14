/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.GenCMSFFFile', {
        extend: 'Ext.panel.Panel',
        xtype: 'formulary-gencmsfffile',
        //itemId : 'redetermination',
        viewModel: 'gencmsfffileviewmodel',
        controller: 'gencmsfffilecontroller',
        title: 'Gen CMS FF File',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
      requires: [
        'Ext.form.RadioGroup'
      ],
        width: 1245,
        height: 640,
        items: [
            {
                xtype: 'fieldset',
                title: 'Formulary',
                items: [
                    {
                        xtype: 'container',
                        style: {'padding-left': '70px'},
                        layout: 'vbox',
                        flex: 2,
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Formulary',
                                displayField: 'name',
                                valueField: 'value',
                                width: 350,
                                bind: {
                                    //value: '{cdmodel.InTake}',
                                    //store: '{storereceivedvia}'
                                }
                            },
                            {
                                xtype: 'radiogroup',
                                items: [
                                    {
                                        boxLabel: 'Full',
                                        itemId : 'radFull',
                                        checked: true
                                    },
                                    {
                                        boxLabel: 'Delta',
                                        itemId : 'radDelta',
                                        checked : false
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
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
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Formulary Version',
                items: [
                    {
                        xtype: 'container',
                        style: {'padding-left': '70px'},
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Base Version',
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
                                fieldLabel: 'Current Version',
                                displayField: 'name',
                                valueField: 'value',
                                width: 350,
                                bind: {
                                    //value: '{cdmodel.InTake}',
                                    //store: '{storereceivedvia}'
                                }
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                flex: 2,
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Create Flat File',
                                        iconCls: 'fa  fa-plus-circle',
                                        handler: 'btnRemoveClick'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Create Excel File',
                                        iconCls: 'fa fa-file-excel-o',
                                        handler: 'btnRemoveClick'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Reset',
                                        iconCls: 'fa fa-file-excel-o',
                                        handler: 'btnRemoveClick'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Formulary Version',
                items: [
                    {
                        xtype: 'container',
                        style: {'padding-left': '70px'},
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Formulary',
                                displayField: 'name',
                                valueField: 'value',
                                width: 350,
                                bind: {
                                    //value: '{cdmodel.InTake}',
                                    //store: '{storereceivedvia}'
                                }
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                flex: 2,
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'RxCUI Search',
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
                                        text: 'View All',
                                        handler: 'btnRemoveClick'
                                    }
                                ]
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
                        height:330,
                        itemId: 'gpGenCMSFile',
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
                                text: 'RxCUI', dataIndex: 'RxCUI', width: 200
                            },
                            {
                                text: 'AHFS8', dataIndex: 'AHFS8', width: 200
                            },
                            {
                                text: 'Description', dataIndex: 'Description', width: 200
                            },
                            {
                                text: 'Category', dataIndex: 'Category', width: 200
                            },
                            {
                                text: 'Class', dataIndex: 'Class', width: 200
                            }
                        ],
                        bind: '{storeCMSFFFile}',
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                bind: '{storeCMSFFFile}',
                                displayInfo: true,
                                dock: 'bottom'
                            }

                        ]
                    }
                ]
            }

        ]
    }
)
