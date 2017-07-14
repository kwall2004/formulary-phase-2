/**
 * Created by agupta on 9/7/2016.
 */
Ext.define('Atlas.authorization.view.cdag.Redetermination',{
    extend : 'Ext.panel.Panel',
    xtype:'redetermination',
    controller: 'redeterminationcontroller',
    viewModel: 'redeterminationviewmodel',
    flex: 10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    width : '100%',
    height : '100%',
    items : [
        {
            xtype:'grid',
            itemId : 'RedeterminationHistoryGridPanel',
            flex : 3,
            selectionModel : {
                singleSelect : true
            },
            columns:{
                items:[
                    { text: 'Appeal Type', dataIndex: 'AppealTypeDesc', width : 200},
                    { text: 'Received Date', dataIndex: 'UserStartDate', width : 180},
                    { text: 'Due Date', dataIndex: 'DueDate', width : 180},
                    { text: 'Hours Remaining', dataIndex: 'HoursRemaining' , width : 150},
                    { text: 'Decision', dataIndex: 'AppealStatusDesc' , width : 200},
                    { text: 'Decision Date', dataIndex: 'AppealDecisionDate', width : 180},
                    { text: 'Canceled', dataIndex: 'AppealCanceledYesNo' , width : 100}
                ]
            },
            listeners: {
                itemclick: 'gridRowSelected'
            },
            bind: '{storeredeterminationhistory}'
        },/*Grid*/
        {
            xtype: 'form',
            region: 'center',
            itemId : 'formRedetermination',
            flex : 7,
            layout: {
                type: 'hbox',
                align:'stretch'
            },
            items:[
                {
                    xtype: 'container',
                    flex: 5,
                    overflowY: 'scroll',
                    items:[
                        {
                            xtype: 'form',
                            region: 'center',
                            flex : 7,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                cls: 'card-panel'
                            },
                            items:[
                                {
                                    title: 'Redetermination',
                                    iconCls: 'x-fa fa-pencil-square-o',
                                    items: [
                                        {
                                            xtype: 'container',
                                            defaults: {
                                                labelWidth: 150,
                                                width: '88%'
                                            },
                                            items: [
                                                {
                                                    xtype : 'displayfield',
                                                    itemId : 'lblCreatedBy',
                                                    name: 'AssignFrom',
                                                    fieldLabel : 'Appeal Created By'
                                                },
                                                {
                                                    xtype : 'displayfield',
                                                    itemId : 'lblFirstDecisionMaker',
                                                    fieldLabel : 'Initial Decision By'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId : 'cbxRDIntake',
                                                    name: 'AuthOirign',
                                                    fieldLabel: 'Intake',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    allowBlank: false,
                                                    queryMode: 'local',
                                                    forceSelection: true,
                                                    bind: {
                                                        store: '{storerdreceivedvia}'
                                                    }
                                                },
                                                {
                                                    xtype:'container',
                                                    layout : 'hbox',
                                                    defaults: {
                                                        labelWidth: 150
                                                    },
                                                    items : [
                                                        {
                                                            xtype : 'datefield',
                                                            itemId : 'dtRDReceivedDate',
                                                            fieldLabel : 'Received Date',
                                                            listeners: {
                                                                render: function(control) {
                                                                    control.setMaxValue(Ext.Date.format(new Date(), 'm/d/Y'));
                                                                }

                                                            },
                                                            format: 'm/d/Y',
                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                            width : 310,
                                                            allowBlank: false,
                                                            maxText: "The Date in this Field must be on or before {0}"
                                                        }
                                                        ,{
                                                            xtype : 'textfield',
                                                            itemId : 'tRDReceivedTime',
                                                            width : 100,
                                                            enableKeyEvents: true,
                                                            allowBlank: false,
                                                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                                                            listeners: {
                                                                'keyup': {
                                                                    fn: 'timeChange'
                                                                }
                                                            },
                                                            emptyText: 'HH:MM:SS',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 8,
                                                            enforceMaxLength: 8
                                                        }
                                                        ,{
                                                            xtype: 'combobox',
                                                            itemId : 'cbxRDReceiveDate',
                                                            width : 76,
                                                            store:['AM','PM'],
                                                            allowBlank: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype : 'combobox',
                                                    itemId : 'cbxRDAppealType',
                                                    name: 'AppealType',
                                                    fieldLabel : 'Appeal Type',
                                                    displayField: 'ListDescription',
                                                    valueField: 'ListItem',
                                                    allowBlank: false,
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    bind: {
                                                        store: '{storeappealtype}'
                                                    }
                                                },
                                                {
                                                    xtype : 'combobox',
                                                    itemId : 'cbxUrgencyType',
                                                    name: 'UrgencyType',
                                                    fieldLabel : 'Urgency Type',
                                                    displayField: 'ListDescription',
                                                    valueField: 'ListItem',
                                                    queryMode: 'local',
                                                    allowBlank: false,
                                                    forceSelection: true
                                                },
                                                {
                                                    xtype : 'checkbox',
                                                    itemId  : 'chkAppealCancel',
                                                    cls:'cdagCheckbox',
                                                    name: 'AppealCanceled',
                                                    fieldLabel : 'Cancel Appeal'
                                                },
                                                {
                                                    xtype : 'checkbox',
                                                    itemId : 'chkDischargeNotification',
                                                    cls:'cdagCheckbox',
                                                    name: 'PendDischrgNotify',
                                                    fieldLabel : 'Discharge Notification',
                                                    listeners: {
                                                        change: 'selectDischargenotification'
                                                    }
                                                },
                                                {
                                                    xtype : 'textfield',
                                                    itemId  : 'txtHospital',
                                                    name: 'PendDischrgHospital',
                                                    fieldLabel : 'Hospital'
                                                },
                                                {
                                                    xtype : 'combobox',
                                                    itemId : 'cbxRDAssignUser',
                                                    name: 'AssignTo',
                                                    fieldLabel : 'Assign To',
                                                    displayField: 'userName',
                                                    valueField: 'userName',
                                                    queryMode: 'local',
                                                    bind: {
                                                        store: '{storeassignto}'
                                                    }
                                                },
                                                {
                                                    xtype:'container',
                                                    layout : 'hbox',
                                                    defaults: {
                                                        labelWidth: 150
                                                    },
                                                    items : [
                                                        {
                                                            xtype : 'datefield',
                                                            itemId : 'dtRDAORRecvdDate',
                                                            width : 310,
                                                            fieldLabel : 'AOR Received Date',
                                                            format: 'm/d/Y',
                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                            listeners: {
                                                                render: function(control) {
                                                                    control.setMaxValue(Ext.Date.format(new Date(), 'm/d/Y'));
                                                                }

                                                            },
                                                            maxText: "The Date in this Field must be on or before {0}"
                                                        }
                                                        ,{
                                                            xtype : 'textfield',
                                                            itemId : 'tRDAORRecvdTime',
                                                            width : 100,
                                                            enableKeyEvents: true,
                                                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                                                            listeners: {
                                                                'keyup': {
                                                                    fn: 'timeChange'
                                                                }
                                                            },
                                                            emptyText: 'HH:MM:SS',
                                                            allowBlank: 'false',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 8,
                                                            enforceMaxLength: 8
                                                        }
                                                        ,{
                                                            xtype: 'combobox',
                                                            itemId : 'cbxRDAORRecvdDate',
                                                            width : 76,
                                                            store:['AM','PM']
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype : 'combobox',
                                                    itemId : 'cbxRDSSReceiveType',
                                                    name: 'SupportingDocIntake',
                                                    fieldLabel : 'S.S. Intake',
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    bind: {
                                                        store: '{storereceivedviass}'
                                                    }
                                                },
                                                {
                                                    xtype:'container',
                                                    layout : 'hbox',
                                                    defaults: {
                                                        labelWidth: 150
                                                    },
                                                    items : [
                                                        {
                                                            xtype : 'datefield',
                                                            itemId : 'dtSSReceived',
                                                            width : 310,
                                                            listeners: {
                                                                render: function(control) {
                                                                    control.setMaxValue(Ext.Date.format(new Date(), 'm/d/Y'));
                                                                }

                                                            },
                                                            format: 'm/d/Y',
                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                            fieldLabel : 'S.S. Received',
                                                            maxText: "The Date in this Field must be on or before {0}"
                                                        }
                                                        ,{
                                                            xtype : 'textfield',
                                                            itemId : 'tSSRecvdTime',
                                                            width : 100,
                                                            enableKeyEvents: true,
                                                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                                                            listeners: {
                                                                'keyup': {
                                                                    fn: 'timeChange'
                                                                }
                                                            },
                                                            emptyText: 'HH:MM:SS',
                                                            allowBlank: 'false',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 8,
                                                            enforceMaxLength: 8
                                                        }
                                                        ,{
                                                            xtype: 'combobox',
                                                            itemId : 'cbxSSAmPm',
                                                            width : 76,
                                                            store:['AM','PM']
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype : 'combobox',
                                                    itemId : 'cbxRDRequestor',
                                                    name: 'AuthRecvdFrom',
                                                    fieldLabel : 'Requestor',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    allowBlank: false,
                                                    queryMode: 'local',
                                                    forceSelection: true,
                                                    listeners: {
                                                        select: 'selectRequestor'
                                                    },
                                                    bind: {
                                                        store: '{storereceivedfrom}'
                                                    }
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'form',
                                            region: 'center',
                                            itemId: 'formRequestor',
                                            flex : 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                cls: 'card-panel',
                                                //flex: 1,
                                                collapsible: true,
                                                defaults: {
                                                    labelWidth: 150,
                                                    width: 500
                                                }
                                            },
                                            items:[
                                                {
                                                    title: 'Requestor',
                                                    itemId : 'formRDRequestor',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Requestor Name',
                                                            itemId : 'txtRDRequestorName',
                                                            name: 'RequestorName'
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Relationship',
                                                            itemId : 'txtRDRequestorRelationship',
                                                            name: 'RequestorRelationship'
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Address',
                                                            itemId : 'txtRDRequestorAddress',
                                                            name: 'Address'
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'City',
                                                            itemId : 'txtRDRequestorCity',
                                                            name: 'City'
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'State',
                                                            itemId : 'txtRDRequestorState',
                                                            name: 'State'
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Zip',
                                                            itemId : 'txtRDRequestorZip',
                                                            name: 'ZipCode',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 10,
                                                            enforceMaxLength: 10,
                                                            minLength:5
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Phone',
                                                            itemId : 'txtRDRequestorPhone',
                                                            name: 'Phone',
                                                            emptyText: '(xxx)-xxx-xxxx',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 14,
                                                            enforceMaxLength: 14,
                                                            minLength:14,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                'keypress': {
                                                                    fn: 'formatPhoneNumber'
                                                                }
                                                            }
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Fax',
                                                            itemId : 'txtRDRequestorFax',
                                                            name: 'Fax',
                                                            maskRe: /[0-9]/,
                                                            emptyText: '(xxx)-xxx-xxxx',
                                                            maxLength: 14,
                                                            enforceMaxLength: 14,
                                                            minLength:14,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                'keypress': {
                                                                    fn: 'formatPhoneNumber'
                                                                }
                                                            }
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Email',
                                                            regex: /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
                                                            regexText: "<b>Error</b></br>Invalid Email",
                                                            itemId : 'txtRDRequestorEmail',
                                                            name: 'Email'
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
                    xtype: 'container',
                    flex: 5,
                    items:[
                        {
                            xtype: 'form',
                            region: 'center',
                            flex : 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                cls: 'card-panel',
                                flex: 1,
                                defaults: {
                                    labelWidth: 150,
                                    width: 500
                                }
                            },
                            items:[
                                {
                                    title: 'Notes',
                                    iconCls: 'x-fa fa-sticky-note-o',
                                    items: [
                                        {
                                            xtype : 'textarea',
                                            itemId : 'txtRDNotes',
                                            heigth: 400,
                                            fieldLabel : 'Notes',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'reasontypeahead',
                                            fieldLabel: 'Reason',
                                            itemId: 'cbxRDReason',
                                            minChars: 1,
                                            listeners: {
                                                select: 'cbxReason_Select'
                                            }
                                        },
                                        {
                                            xtype : 'checkbox',
                                            itemId : 'chkRDResvldInFirstCall',
                                            cls:'cdagCheckbox',
                                            fieldLabel : 'Resolved in first Call'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Update Effectuation Date/Time',
                                            itemId : 'cbxUpdateEffectuationDate',
                                            forceSelection: true,
                                            hidden:true,
                                            width: 300,
                                            labelWidth:200,
                                            store:['Yes','No']
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
            xtype : 'panel',
            itemId : 'hdnContainer',
            hidden : true,
            items : [
                {xtype: 'hidden', itemId: 'hdnPendDischrgNotify'},
                {xtype: 'hidden', itemId: 'hdnRecordAction'},
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hdnSaveDocList'},
                {xtype: 'hidden', itemId: 'hdnSaveDescList'},
                {xtype: 'hidden', itemId: 'hdnSendAppealLetterFlag'},
                {xtype: 'hidden', itemId: 'hdnPrntHidMedicarePAQueueAccess'},
                {xtype: 'hidden', itemId: 'hdnPrntHidLOB'},
                {xtype: 'hidden', itemId: 'hdnDischargeNotification'},
                {xtype: 'hidden', itemId: 'hdnHospital'},
                {xtype: 'hidden', itemId: 'hdnRDUrgencyType'},
                {xtype: 'hidden', itemId: 'hdnRowSelected'},
                {xtype: 'hidden', itemId: 'hdnAppealStatus'},
                {xtype: 'hidden', itemId: 'hdnPlanGroupID'},
                {xtype: 'hidden', itemId: 'tempHdnRdList'}
            ]
        }
    ],
    dockedItems :{
        dock: 'bottom',
        xtype: 'toolbar',
        style: { borderColor: 'black', borderStyle: 'solid'},
        items : [
            '->'
            ,{ xtype : 'datefield', itemId : 'dtRDEffectiveDate', name: 'EffectiveDate', fieldLabel : 'Effective Date', format: 'm/d/Y', altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j', width : 220,  labelWidth :90}
            ,'-'
            ,{ xtype : 'datefield', itemId : 'dtRDTermDate', name: 'TermDate', fieldLabel : 'Term Date', format: 'm/d/Y', altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j', width : 200,  labelWidth :70}
            ,'-'
            ,{
                xtype : 'combobox',
                itemId : 'cbxRedeterminationStatus',
                fieldLabel : 'Status',
                queryMode: 'local',
                width : 270,
                labelWidth : 40,
                displayField : 'ListDescription',
                valueField : 'ListItem',
                listeners : {
                    select: 'AppealStatusUpdate'
                }
            }
            ,'-',
            {
                xtype : 'button',
                itemId : 'btnRedeterminationCreate',
                text : 'Create',
                iconCls : 'fa fa-plus-circle',
                listeners : {
                    click : 'btnCreate_Click'
                }

            }
            ,'-'
            ,{ xtype : 'button', itemId : 'btnRedeterminationEdit', text : 'Edit', iconCls : 'fa fa-user-md',
                listeners : {
                    click : 'btnEdit_Click'
                }
            }

            ,'-'
            ,{
                xtype : 'button',
                itemId : 'btnSave',
                text : 'Save',
                iconCls : 'fa fa-save',
                listeners : {
                    click : 'btnSave_Click'
                }}
            ,'-'
            ,{ xtype : 'button', itemId : 'btnRedeterminationCancel', text : 'Cancel', iconCls : 'fa fa-close',
                listeners : {
                    click : 'btnCancel_Click'
                }
            }
            ,'-'
            ,{ xtype : 'button', itemId : 'btnRedeterminationDelete', text : 'Delete', iconCls : 'fa fa-minus-circle',
                listeners : {
                    click : 'btnDelete_Click'
                }
            }

        ]
    }
});
