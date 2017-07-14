Ext.define('Atlas.grievances.view.grievances.OtherInfo',{
    extend: 'Ext.panel.Panel',
    xtype: 'OtherInfo',
    fullscreen:true,
    layout:{type:'hbox', align:'middle'},
    defaults:{
        flex:1
    },
    items:[
        //left column of the form
        {
            defaults:{
                layout: {type:'hbox', align:'middle'}
            },
            items:[
                {
                    items: [
                        {
                            xtype: 'label',
                            text: 'Initiated Date:'
                        },
                        {
                            xtype: 'label',
                            text: '7/12/2016'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Incident Date:'
                        },
                        {
                            xtype: 'datefield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Notification Method:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Category:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'label',
                            text: 'Type:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Level:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Compliance Committee Date:'
                        },
                        {
                            xtype: 'datefield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Resolution:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Disposition:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Grievance Committee Date:'
                        },
                        {
                            xtype: 'datefield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'LOB:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Extension Requested:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                }
            ]
        },
        //Right column of the form
        {
            defaults:{
                layout: {type:'hbox', align:'middle'}
            },
            items:[
                {
                    items: [
                        {
                            xtype: 'label',
                            text: 'No. of Days Open:'
                        },
                        {
                            xtype: 'label',
                            text: '0',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ack. Letter Due:'
                        },
                        {
                            xtype: 'label'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ack. Letter Sent:'
                        },
                        {
                            xtype: 'datefield',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Resolution Letter Due:'
                        },
                        {
                            xtype: 'datefield',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Resoultion Letter Sent:'
                        },
                        {
                            xtype: 'datefield'
                        },
                        {
                            xtype:'timefield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Follow-up Date:'
                        },
                        {
                            xtype: 'datefield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Assigned To:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Status:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Notes:'
                        },
                        {
                            xtype: 'textareafield'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Method of Response:'
                        },
                        {
                            xtype: 'combobox'
                        }
                    ]
                }
            ]
        }
    ]
});