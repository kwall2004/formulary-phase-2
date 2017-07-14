Ext.define('Atlas.portals.view.healthtracker.HealthHeightWeightBMI', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-healthheightweightbmi',

    title: 'BMI',

    scrollable: true,

    controller: 'healthheightweightbmicontroller',

    viewModel: 'healthheightweightbmimodel',

    items: [
        {
            xtype: 'container',
            
            defaults: {
                flex: 1
            },
            scrollable: true,
            items: [
                {
                    xtype: 'container',

                    scrollable: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            viewConfig:{
                                markDirty:false
                            },

                            region: 'north',

                            height: 400,

                            title: 'BMI',

                            cls: 'card-panel',

                            reference: 'bmiGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{bmistore}'
                            },

                            listeners: {
                                canceledit: 'cancelBMIEdit',
                                edit: 'editBMI',
                                beforeedit: 'maybeEditBMI',
                                'selectionchange': function(view, records){
                                    this.down('#removeBMI').setDisabled(!records.length);
                                }
                            },

                            columns: [
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'recipientID'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'sectionID'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'seqNum'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'markDelete'
                                },
                                {
                                    text: 'Date',
                                    dataIndex: 'measureDate',
                                    xtype: 'datecolumn',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'm/d/Y',
                                        maxValue: new Date()
                                    },
                                    filter: {type: 'date'}
                                },

                                {
                                    text: 'Weight (in lbs)',
                                    dataIndex: 'weight',
                                    xtype: 'numbercolumn',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Height (in inches)',
                                    dataIndex: 'height',
                                    menuDisabled: true,
                                    xtype: 'numbercolumn',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'BMI',
                                    dataIndex: 'bmi',
                                    flex: 1
                                },

                                {
                                    text: 'BMI Range',
                                    dataIndex: 'bmirange',
                                    flex: 1
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add BMI',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addBMI'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete BMI',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeBMI',

                                        itemId: 'removeBMI',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'gridpanel',

                            region: 'north',

                            title: 'BMI Reference Chart',

                            cls: 'card-panel',

                            reference: 'bmiRefGrid',

                            bind: {
                                store: '{bmiRefStore}'
                            },

                            columns: [
                                {
                                    text: 'BMI',
                                    dataIndex: 'bmi',
                                    flex: 1
                                },
                                {
                                    text: 'BMI Range',
                                    dataIndex: 'bmiRange',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});