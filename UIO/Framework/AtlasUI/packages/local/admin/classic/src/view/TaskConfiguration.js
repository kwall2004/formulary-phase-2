Ext.define('Atlas.admin.view.TaskConfiguration', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-taskconfiguration',
    title: 'Task Configuration',
    reference: 'admin-taskconfiguration',
    controller: 'admin-taskconfigurationcontroller',
    viewModel: 'taskconfigurationviewmodel',
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'gridTaskConfigMaster',
            reference : 'gridTaskConfigMaster',
            //flex: 1,
            title: 'Task Configuration',
            // selectionModel : {
            //     singleSelect : true
            // },
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Configuraton ID',
                        dataIndex: 'TaskConfigId'
                    },
                    {
                        text: 'Task Name',
                        dataIndex: 'TaskName'
                    },
                    {
                        text: 'Description',
                        dataIndex: 'Description'
                    },
                    {
                        text: 'Carrier',
                        dataIndex: 'CarrierName'
                    },
                    {
                        text: 'Carrier Account',
                        dataIndex: 'CarrierAccountName'
                    },
                    {
                        text: 'LOB',
                        dataIndex: 'CarrierLobName'
                    },
                    {
                        text: 'CarrierAccount',
                        dataIndex: 'CarrierAccount',
                        hidden: true
                    },
                    {
                        text: 'Active',
                        xtype: 'checkcolumn',
                        dataIndex: 'Active',
                        sortable: false,
                        disabled:true
                    }
                ]
            },
            bind: {
                store: '{storeTaskConfigMaster}'
            },
            listeners: {
                itemclick: 'resetControls'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: 'false',
                    hideRefresh : true,
                    bind: {
                        store: '{storeTaskConfigMaster}'
                    }
                }
            ]

        },
        {
            xtype: 'tabpanel',
            itemId : 'tpTaskSetup',
            flex: 1,
            region: 'south',
            split: true,
            autoScroll: true,
            overFlowX : 'scroll',
            overFlowY : 'scroll',
            listeners: {
                'tabchange': 'onTabChange'
            },
            items: [
                {
                    xtype : 'form',
                    itemId : 'fpTaskStatus',
                    title: 'Task Status',
                    minWidth : 1500,
                    minHeight : 400,
                    items : [
                        {

                            xtype: 'tabpanel',
                            itemId : 'tpInfo',
                            flex: 1,
                            items: [
                                {
                                    title: 'Submission',
                                    xtype: 'form',
                                    itemId : 'fpInfo',
                                    defaults: {
                                        margin: 10
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'form',
                                            itemId: 'fpInfoPart1',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 180,
                                                xtype: 'textfield',
                                                minWidth: 240
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Task Name',
                                                    itemId: 'txtTaskName',
                                                    emptyText: 'Task Name is Required',
                                                    allowBlank: false
                                                },
                                                {
                                                    fieldLabel: 'Description',
                                                    itemId: 'txtDescription'
                                                },
                                                {
                                                    fieldLabel: 'Active',
                                                    xtype: 'checkbox',
                                                    labelWidth: 190,
                                                    itemId: 'chkActive'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Carrier',
                                                    itemId: 'cbxCarrierID',
                                                    emptyText: 'Select a carrier',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeCarrierID}'
                                                    },
                                                    displayField: 'carrierName',
                                                    valueField: 'carrierId',
                                                    listeners: {
                                                        select: 'cbxCarrierID_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxCarrierAccount',
                                                    fieldLabel: 'Carrier Account',
                                                    emptyText: 'Select an account',
                                                    queryMode: 'local',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeCarrierAccount}'
                                                    },
                                                    displayField: 'accountName',
                                                    valueField: 'accountNumber'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxLOB',
                                                    //autoLoadOnValue: true,
                                                    name: 'state',
                                                    fieldLabel: 'Line of Business',
                                                    queryMode: 'local',
                                                    emptyText: 'Select a LOB',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeLOB}'
                                                    },
                                                    displayField: 'lobName',
                                                    valueField: 'carrierLOBId'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxDataSource',
                                                    fieldLabel: 'Data Source',
                                                    emptyText: 'Datasource is Required',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeTaskDataSource}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    queryMode : 'local'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxSourceEntity',
                                                    fieldLabel: 'Source Entity',
                                                    emptyText: 'Source Entity is Required',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeTaskSourceEntity}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    queryMode : 'local'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxTargetEntity',
                                                    fieldLabel: 'Target Entity',
                                                    emptyText: 'Target Entity is Required',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeTaskTargetEntity}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    queryMode : 'local'
                                                }


                                            ]
                                        },
                                        {
                                            xtype: 'form',
                                            itemId: 'fpInfoPart2',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 180,
                                                xtype: 'textfield',
                                                minWidth: 240
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            fieldLabel: 'EDI Partner',
                                                            labelWidth: 180,
                                                            flex: 1,
                                                            xtype: 'textfield',
                                                            itemId: 'txtEDIPartnerID',
                                                            minWidth: 240
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'btnSelectEDIPartner',
                                                            margin: '4 0 0 0',
                                                            iconCls: 'x-fa fa-search',
                                                            text: 'Select Partner',
                                                            listeners : {
                                                                click : 'btnSelectEDIPartner_Click'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    fieldLabel: 'Default Parameters',
                                                    itemId: 'txtDefaultParameters',
                                                    bind: {value: '{sdf}'}
                                                },
                                                {
                                                    fieldLabel: 'File Name Pattern',
                                                    emptyText : '@SenderId@_NCPDPClaim_@LobName@_@CCYYMMDD@@HHMMSS@',
                                                    itemId: 'txtFileNamePattern'/*,
                                                    allowBlank: false*/
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxPBMErrorListID',
                                                    name: 'state',
                                                    fieldLabel: 'PBM Error List',
                                                    emptyText: 'Select a list',
                                                    queryMode : 'local',
                                                    bind: {
                                                        store: '{storePBMErrorListID}'
                                                    },
                                                    displayField: 'Description',
                                                    valueField: 'ErrorListId'
                                                }
                                                ,
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxFileFormat',
                                                    fieldLabel: 'File Format',
                                                    emptyText: 'File Format is Required',
                                                    allowBlank: false,
                                                    queryMode : 'local',
                                                    bind: {
                                                        store: '{storeTaskFileFormat}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'value'
                                                },
                                                {
                                                    fieldLabel: 'Program Name',
                                                    itemId: 'txtProgramName',
                                                    allowBlank: false,
                                                    emptyText: 'Program Name is Required'/*,
                                                    bind: {value: '{sdf}'}*/
                                                }

                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Response',
                                    xtype: 'form',
                                    itemId : 'fpResponse',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    defaults: {
                                        margin: 10
                                    },
                                    items: [
                                        {
                                            xtype : 'form',
                                            itemId : 'fpAckResponse',
                                            flex : 1,
                                            items : [
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Acknowledgement Response',
                                                    itemId : 'fsAcknowledgementResponse',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    defaults: {
                                                        labelWidth: 180,
                                                        xtype: 'textfield',
                                                        minWidth: 240
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Program Name',
                                                                    itemId : 'txtAckProgramName',
                                                                    labelWidth: 180,
                                                                    flex: 1,
                                                                    xtype: 'textfield',
                                                                    minWidth: 240
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    itemId : 'btnAckMonitorId',
                                                                    margin: '4 0 0 0',
                                                                    iconCls: 'x-fa fa-search',
                                                                    text: 'Get Monitor',
                                                                    listeners : {
                                                                        click : 'btnAckMonitorId_Click'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            fieldLabel: 'Check Interval Seconds',
                                                            itemId : 'txtAckCheckIntervalSeconds'
                                                        },
                                                        {
                                                            fieldLabel: 'Active',
                                                            xtype: 'checkbox',
                                                            itemId : 'chkAckActive'
                                                        },
                                                        {
                                                            fieldLabel: 'Parameters',
                                                            itemId : 'txtAckParameters'
                                                        },
                                                        {
                                                            fieldLabel: 'File Pattern',
                                                            itemId : 'txtAckFilePattern'
                                                        },
                                                        {
                                                            fieldLabel: 'Description',
                                                            itemId : 'txtAckDescription'
                                                        },
                                                        {
                                                            fieldLabel: 'Directory',
                                                            itemId : 'txtAckDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Archive Directory',
                                                            itemId : 'txtAckArchiveDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Temp Directory',
                                                            itemId : 'txtAckTempDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Min File Age',
                                                            itemId : 'txtAckMinFileAge'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'form',
                                            itemId : 'fpValResponse',
                                            flex : 1,
                                            items : [
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Validation Response',
                                                    itemId : 'fsValidationResponse',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    defaults: {
                                                        labelWidth: 180,
                                                        xtype: 'textfield',
                                                        minWidth: 240
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Program Name',
                                                                    itemId : 'txtValProgramName',
                                                                    labelWidth: 180,
                                                                    flex: 1,
                                                                    xtype: 'textfield',
                                                                    minWidth: 240
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    margin: '4 0 0 0',
                                                                    iconCls: 'x-fa fa-search',
                                                                    text: 'Get Monitor',
                                                                    itemId : 'btnValMonitorID',
                                                                    listeners : {
                                                                        click : 'btnValMonitorID_Click'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            fieldLabel: 'Check Interval Seconds',
                                                            itemId : 'txtValCheckIntervalSeconds'
                                                        },
                                                        {
                                                            fieldLabel: 'Active',
                                                            xtype: 'checkbox',
                                                            itemId : 'chkValActive'
                                                        },
                                                        {
                                                            fieldLabel: 'Parameters',
                                                            itemId : 'txtValParameters'
                                                        },
                                                        {
                                                            fieldLabel: 'File Pattern',
                                                            itemId : 'txtValFilePattern'
                                                        },
                                                        {
                                                            fieldLabel: 'Description',
                                                            itemId : 'txtValDescription'
                                                        },
                                                        {
                                                            fieldLabel: 'Directory',
                                                            itemId : 'txtValDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Archive Directory',
                                                            itemId : 'txtValArchiveDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Temp Directory',
                                                            itemId : 'txtValTempDirectory'
                                                        },
                                                        {
                                                            fieldLabel: 'Min File Age',
                                                            itemId : 'txtValMinFileAge'
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
                },
                {
                    xtype: 'form',
                    title: 'Task Detail',
                    itemId : 'fpTaskDetail',
                    minWidth : 1500,
                    minHeight : 400,
                    layout : {
                        type : 'vbox',
                        align : 'stretch'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'gridTaskDetail',
                            flex: 1,
                            tbar: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnAdd',
                                    text: 'Add',
                                    //disabled: true,
                                    iconCls: 'fa  fa-plus-circle',
                                    handler:'btnAddClick'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnRemove',
                                    text: 'Remove',
                                    //disabled: true,
                                    iconCls: 'fa  fa-minus-circle',
                                    handler:'btnRemoveClick'
                                }
                            ],
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Program Group Code',
                                        dataIndex: 'ProgGroupCode',
                                        editor: {
                                            xtype: 'combobox',
                                            itemId : 'cbxProgGroupCode',
                                            reference: 'cbxProgGroupCode',
                                            editable: true,
                                            valueField: 'progGroupCode',
                                            displayField : 'progGroupCode',
                                            queryMode: 'local',
                                            bind: {
                                                value:'progGroupCode',
                                                store: '{storeMCSProgGroupCode}'
                                            },
                                            forceSelection: true,
                                            listeners: {
                                                select:'getProgramBenefitCode'
                                            }
                                        }
                                    },
                                    {
                                        text: 'Program Benefit Code',
                                        dataIndex: 'ProgBenefitCode',
                                        editor: {
                                            xtype: 'combobox',
                                            itemId : 'cbxProgBenefitCode',
                                            reference: 'cbxProgBenefitCode',
                                            editable: true,
                                            valueField: 'progBenefitCode',
                                            displayField : 'progBenefitCode',
                                            queryMode: 'local',
                                            bind: {
                                                value:'progBenefitCode',
                                                store: '{storeMCSprogBenefitCode}'
                                            },
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                //change:'comboxbox_multiselect'
                                            }
                                        }
                                    }
                                    /*{
                                        text: '',
                                        xtype: 'widgetcolumn',
                                        isEditable: false,
                                        widget: {

                                            xtype: 'panel',
                                            itemId: '',
                                            width: 75,
                                            bind: true,
                                            border:false,

                                            bind: {
                                                hidden: '{!record.isUpdated}'

                                            },

                                            items: [
                                                // reject tool
                                                {
                                                    xtype: 'button',
                                                    text: 'Reject',
                                                    handler: 'onUndoChangeClick',
                                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                                    width: 75,
                                                    border:false,


                                                    bind: {
                                                        hidden: '{!record.isUpdated}'
                                                    }
                                                }

                                            ]
                                        }
                                    }*/
                                ]
                            },
                            listeners : {
                              itemdblclick : 'gridTaskDetail_DblClick'
                            },
                            plugins: {
                                ptype: 'rowediting',
                                clicksToEdit: 2,
                                autoCancel: false,
                                listeners: {
                                    'canceledit': function (rowEditing, context) {
                                        if (context.record.data.SystemID == 0 || context.record.data.SystemID == undefined) {
                                            context.store.remove(context.record);
                                        }
                                    },
                                    'edit': function (rowEditing, context) {
                                        if(context.record.dirty) {
                                            // context.grid.columns[3].items[0].hidden = false;
                                            //context.grid.getView().refresh();
                                        }
                                    }
                                }
                            },
                            bind: '{storeTaskDetail}'

                        }
                    ]

                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    displayInfo: 'false',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'New',
                            itemId: 'btnNew',
                            iconCls: 'fa fa-plus-circle',
                            listeners : {
                            click : 'newRow'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'btnSave',
                            iconCls: 'fa fa-save',
                            listeners : {
                                click : 'SetPbmTaskConfigMaster'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            itemId: 'btnCancel',
                            iconCls: 'fa fa-remove',
                            listeners : {
                                click : 'cancelChange'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer_TaskConfiguration',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hdnTaskConfigID'},
                {xtype: 'hidden', itemId: 'hdnTaskSystemID'},
                {xtype: 'hidden', itemId: 'hdnMonitorRequestID'},
                {xtype: 'hidden', itemId: 'hdnAckRespMonitorID'},
                {xtype: 'hidden', itemId: 'hdnValRespMonitorID'},
                {xtype: 'hidden', itemId: 'LastTaskConfigMaster'}
            ]

        }
    ]


});

