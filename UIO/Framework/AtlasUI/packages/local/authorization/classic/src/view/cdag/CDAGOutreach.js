/**
 * Created by agupta on 9/8/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGOutreach',{
    extend : 'Ext.panel.Panel',
    xtype:'cdagoutreach',
    controller : 'cdagoutreachcontroller',
    viewModel :'cdagoutreachviewmodel',
    flex: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: '100%',
    width: '100%',
    items : [
        {
            xtype:'grid',
            itemId : 'gridOutreachHistory',
            selectionModel : {
                singleSelect : true
            },
            flex : 5,
            columns:{
                items:[
                    { text: 'Contact Type', dataIndex: 'ContactType', width : 150},
                    { text: 'Determination', dataIndex: 'AppealTypeDesc' , width : 200},
                    { text: 'Contact', dataIndex: 'ContactEntityDesc' , width : 150},
                    { text: 'Reason', dataIndex: 'ReasonCodeDescription' , width : 400},
                    { text: 'Contact Date/Time', dataIndex: 'CallDateTime' , width : 200},
                    { text: 'Create Date', dataIndex: 'CreateDate',xtype: 'datecolumn', hidden: true}
                ]
            },
            listeners: {
                itemclick: 'gridRowSelected'
            },
            bind : '{storeoutreachhistory}'
        },/*Grid*/
        {
            xtype: 'form',
            region: 'center',
            itemId : 'formOutreach',
            flex : 5,
            layout: {
                type: 'hbox',
                align:'stretch'
            },
            items:[
                {
                    xtype: 'panel',
                    region: 'center',
                    flex : 7,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    autoScroll: true,
                    defaults: {
                        cls: 'card-panel',
                        defaults: {
                            labelWidth: 150,
                            width: '85.5%'
                        }
                    },
                    items:[
                        {
                            title: 'Outreach',
                            iconCls: 'x-fa fa-pencil-square-o',
                            items:[
                                {
                                    xtype : 'combobox',
                                    itemId : 'cbxDetermination',
                                    fieldLabel : 'Determination',
                                    displayField :'Description',
                                    valueField :'OutreachEntity',
                                    allowBlank: false,
                                    queryMode: 'local',
                                    name: 'OutreachEntity',
                                    forceSelection: true,
                                    bind : {
                                        store : '{storedetermination}'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            var tpl = '<div>' +
                                                '<b>Type:</b> {Description}<br/>' +
                                                '<b>Status:</b> {AppealStatus}' +
                                                '</div>';
                                            return tpl;
                                        }
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
                                            xtype : 'textfield',
                                            itemId : 'txtCallerLastName',
                                            fieldLabel : 'Caller Name',
                                            emptyText : 'Caller Last Name',
                                            name: 'CallerLastName',
                                            width : 300
                                        }
                                        ,{
                                            xtype : 'textfield',
                                            itemId : 'txtCallerFirstName',
                                            emptyText : 'Caller First Name',
                                            name: 'CallerFirstName',
                                            width : 250
                                        }
                                    ]
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
                                            fieldLabel : 'Contact Date/Time',
                                            itemId : 'dtCreateDate',
                                            allowBlank: false,
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                            width : 320,
                                            maxText: "The Date in this Field must be on or before {0}"
                                        }
                                        ,{
                                            xtype : 'textfield',
                                            itemId : 'tCreateTime',
                                            width : 100,
                                            enableKeyEvents: true,
                                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                                            listeners: {
                                                'keyup': {
                                                    fn: 'timeChange'
                                                }
                                            },
                                            emptyText: 'HH:MM:SS',
                                            allowBlank: false,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8
                                        }
                                        ,{
                                            xtype: 'combobox',
                                            itemId : 'cbxCreateAMPM',
                                            allowBlank: false,
                                            width : 72,
                                            store: ['AM', 'PM']
                                        }
                                    ]
                                },

                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Caller Phone',
                                    itemId : 'txtCallerPhone',
                                    name: 'CallerPhone',
                                    emptyText: '(xxx)-xxx-xxxx',
                                    maxLength: 14,
                                    enforceMaxLength: 14,
                                    minLength:14,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: 'formatPhoneNumber'
                                        }
                                    },
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Caller Fax',
                                    itemId :'txtCallerFax',
                                    name: 'CallerFax',
                                    emptyText: '(xxx)-xxx-xxxx',
                                    maxLength: 14,
                                    enforceMaxLength: 14,
                                    minLength:14,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: 'formatPhoneNumber'
                                        }
                                    },
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Reason',
                                    itemId : 'txtReason',
                                    name: 'ReasonCodeDescription',
                                    allowBlank: false,
                                    readOnly : true
                                },
                                {
                                    xtype : 'textarea',
                                    fieldLabel : 'Description',
                                    name: 'OutreachDescription',
                                    itemId : 'txtOutreachDescription'
                                }
                            ]

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    flex : 7,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    autoScroll: true,
                    defaults: {
                        cls: 'card-panel',
                        defaults: {
                            labelWidth: 150,
                            width: '85.5%'
                        }
                    },
                    items:[
                        {
                            title: 'Contact Type',
                            flex: 2,
                            minHeight: 70,
                            items: [
                                {
                                    xtype : 'radiogroup',
                                    itemId : 'rdgContactType',
                                    listeners : {
                                        change : 'rdgContactType_Change'
                                    }
                                }
                            ]

                        },
                        {
                            title: 'Contact Code',
                            flex: 8,
                            autoScroll: true,
                            items: [
                                {
                                    xtype : 'radiogroup',
                                    itemId : 'rdgContactCode',
                                    columns: 1,
                                    listeners : {
                                        change : 'rdgContactCode_Change'
                                    }
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
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hdnRecordAction'},
                {xtype: 'hidden', itemId: 'hdnRowSelected'}
                ]
        }
    ],
    dockedItems :{
        dock: 'bottom',
        xtype: 'toolbar',
        style: { borderColor: 'black', borderStyle: 'solid'},
        items : [
            '->',
            {
                xtype : 'button',
                text : 'Create',
                itemId : 'btnCreate',
                iconCls : 'fa fa-plus-circle',
                listeners : {
                    click : 'btnCreate_Click'
                }
            }
            ,'-',
            {
                xtype : 'button',
                text : 'Save',
                itemId : 'btnSave',
                iconCls : 'fa fa-save',
                listeners : {
                    click : 'btnSave_Click'
                }
            }
            ,'-',
            {
                xtype : 'button',
                text : 'Cancel',
                itemId : 'btnCancel',
                iconCls : 'fa fa-close',
                listeners : {
                    click : 'btnCancel_Click'
                }
            }
            ,'-',
            {
                xtype : 'button',
                text : 'Delete',
                itemId : 'btnDelete',
                iconCls : 'fa fa-minus-circle',
                listeners : {
                    click : 'btnDelete_Click'
                }
            }

        ]
    }
});