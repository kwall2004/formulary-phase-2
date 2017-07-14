/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGLetterTemplate', {
    extend: 'Ext.window.Window',
    xtype: 'cdaglettertemplate',
    modal: true,
    controller: 'cdaglettertemplatecontroller',
    viewModel: 'cdaglettertemplateviewmodel',
    title: '',
    testdata: {},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: 930,
    items: [
        //<editor-fold desc="fsTop">
        {
            xtype: 'panel',
            cls:'borderNone',
            itemId: 'RequestInfoPanel',
            flex: 1,
            layout: 'vbox',
            align: 'stretch',
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'General Information',
                    iconCls: 'x-fa fa-pencil-square-o',
                    height:135,
                    layout : {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 4,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'AuthID',
                                    itemId: 'lblAuthID'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Member',
                                    itemId: 'lblRecpientID'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Plan',
                                    itemId: 'lblPlanGroupID'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 3,
                            cls: 'mLetter-displayfield',
                            margin: '5, 0, 0, 0',
                            items: [
                                {
                                    xtype: 'displayfield'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblMember'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPlan'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 4,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'LOB',
                                    itemId: 'lblLOB'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PCP',
                                    itemId: 'lblPCPID'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Prescriber',
                                    itemId: 'lblPrescriberID'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 3,
                            cls: 'mLetter-displayfield',
                            margin: '6, 0, 0, 0',
                            items: [
                                {
                                    xtype: 'displayfield'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPCP'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPrescriber'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        //<editor-fold desc="fpCDAGDenialLetters">
        {
            xtype: 'form',
            itemId: 'fpCDAGDenialLetters',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Denial Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Denial Letters',
                            itemId: 'cbxLetters',
                            allowBlank: false,
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{storeLetter}'
                            },
                            listeners: {
                                select: 'letterSelectHandler'
                            }
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: '',
                            itemId: 'cbxMHPPhysicians',
                            hidden: true,
                            displayField: 'DisplayLabel',
                            valueField: 'signatureId',
                            bind: {
                                store: '{storeDenyingPhysican}'
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'CriteriaComposite',
                            layout: 'hbox',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtYear'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxCri'
                                }
                            ]
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '',
                            itemId: 'txtFreeText',
                            hidden: true
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: '',
                            itemId: 'cmbDenialReason',
                            hidden: true,
                            bind: {
                                store: '{storeDenialReason}'
                            },
                            listeners: {
                                select: 'denialSelectHandler'
                            },
                            displayField: 'Reason',
                            valueField: 'DenialText'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Denial Language',
                            itemId: 'txtReason',
                            anchor: '100%'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '',
                            itemId: 'txtFreeText2',
                            hidden: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date of Service',
                            format: 'm/d/Y',
                            itemId: 'txtServiceDate'
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGProviderAppealLtr">
        {
            xtype: 'form',
            itemId: 'fpCDAGProviderAppealLtr',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Provider Appeal Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Linked Appeal',
                            itemId: 'cmbLinkedAppeal',
                            allowBlank: false,
                            displayField :'Description',
                            valueField :'OutreachEntity',
                            bind : {
                                store : '{storeLinkedAppealProvider}'
                            },
                            listConfig: {
                                getInnerTpl: function () {
                                    var tpl = '<div>' +
                                        '<b>Type:</b> {Description}<br/>' +
                                        '<b>Status:</b> {AppealStatus}' +
                                        '</div>';
                                    return tpl;
                                }
                            },
                            listeners : {
                                select : 'linkedAppealSelectHandler_fpCDAGProviderAppealLtr'
                            }
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Provider APL Letters',
                            itemId: 'cbxLetters',
                            allowBlank: false,
                            bind:{
                                store : '{storePvdAppealLetters}'
                            },
                            displayField : 'name',
                            valueField : 'value',
                            listeners : {
                                select : 'letterSelectHandler_fpCDAGProviderAppealLtr'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'txtApprovedTime',
                            hidden: true
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '',
                            itemId: 'txtReason',
                            hidden: true
                        }
                    ]
                }

            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGMemberAppealLtr">
        {
            xtype: 'form',
            itemId: 'fpCDAGMemberAppealLtr',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Member Appeal Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Linked Appeal',
                            itemId: 'cmbLinkedAppeal',
                            allowBlank: false,
                            emptyText: 'Select an appeal to link',
                            displayField :'Description',
                            valueField :'OutreachEntity',
                            listConfig: {
                                getInnerTpl: function () {
                                    var tpl = '<div>' +
                                        '<b>Type:</b> {Description}<br/>' +
                                        '<b>Status:</b> {AppealStatus}' +
                                        '</div>';
                                    return tpl;
                                }
                            },
                            bind : {
                                store : '{storeLinkedAppealMember}'
                            },
                            listeners : {
                                select : 'LinkedAppealSelectHandler_fpCDAGMemberAppealLtr'
                            }
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Member APL Letters',
                            itemId: 'cbxLetters',
                            allowBlank: false,
                            bind : {
                                store : '{storeMbrAppealLetters}'
                            },
                            displayField : 'name',
                            valueField : 'value',
                            listeners : {
                                select : 'letterSelectHandler_fpCDAGMemberAppealLtr'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'txtApprovedTime',
                            hidden: true
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '',
                            itemId: 'txtReason',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'txtPhyBoard',
                            hidden: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'txtMeetingDetail',
                            hidden: true
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGCaseNotificationLtr">
        {
            xtype: 'form',
            itemId: 'fpCDAGCaseNotificationLtr',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Member Appeal Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Case Type',
                            itemId: 'cmbCaseType',
                            allowBlank: false,
                            bind:{
                                store : '{storeCaseNotificationType}'
                            },
                            displayField :'name',
                            valueField :'value'

                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Linked Determination',
                            itemId: 'cmbLinkedDetermination',
                            displayField :'Description',
                            valueField :'OutreachEntity',
                            allowBlank: false,
                            bind : {
                                store : '{storeDetermination}'
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
                            xtype: 'datefield',
                            fieldLabel: 'Review Date',
                            itemId: 'dateReview',
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGApprovalLetter">
        {
            xtype: 'form',
            itemId: 'fpCDAGApprovalLetter',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Medicare CD/DMR Approval Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Time Frame',
                            itemId: 'txtTimeFrame'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Year',
                            itemId: 'txtYear'
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGAdditonalInfoReqLtr">
        {
            xtype: 'form',
            itemId: 'fpCDAGAdditonalInfoReqLtr',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Medicare Additional Info Request Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Auth Request Type',
                            itemId: 'cmbRequestType',
                            allowBlank: false,
                            bind:{
                                store : '{storePriorAuthRequestType}'
                            },
                            valueField: 'value',
                            displayField : 'name'
                        },
                        {
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Linked Determination',
                            itemId: 'cmbLinkedDetermination',
                            allowBlank: false,
                            valueField: 'OutreachEntity',
                            displayField : 'Description',
                            bind:{
                                store : '{storeDetermination}'
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
                            xtype: 'combobox',
                            fieldLabel: 'Filer',
                            itemId: 'cmbFiler',
                            allowBlank: false,
                            emptyText: '"Select Filer Type',
                            store: ['you', 'your physician']
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Required Document',
                            allowBlank: false,
                            itemId: 'txtReqDocs'
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGAppealAckLetter">
        {
            xtype: 'form',
            itemId: 'fpCDAGAppealAckLetter',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Member Appeal Acknowledgement',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'MBR APL Letter',
                            itemId: 'txtAplLetters',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Approved Time Frame',
                            itemId: 'txtAppealTimeFrame',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Appeal Recieved On',
                            itemId: 'dtAppealCreated',
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGInterventionLetter">
        {
            xtype: 'form',
            itemId: 'fpCDAGInterventionLetter',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Medicare Additional Info Request Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Covered Medications',
                            itemId: 'txtCoveredMeds',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Year',
                            itemId: 'txtYear',
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        //<editor-fold desc="fpCDAGAppovalHIXLetter">
        {
            xtype: 'form',
            itemId: 'fpCDAGAppovalHIXLetter',
            hidden: true,
            defaults: {
                cls: 'card-panel',
                width: '100%'
            },
            items: [
                {
                    title: 'Auth Approval Letter Template',
                    iconCls: 'x-fa fa-pencil-square-o',
                    layout : {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelWidth: 150,
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Denied Service/GCN',
                            itemId: 'lblService'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Time Frame',
                            itemId: 'txtTimeFrame',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date From',
                            itemId: 'dtFromDate',
                            format:'m/d/Y',
                            allowBlank: false,
                            listeners: {
                                select: 'validateDateRange'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date To',
                            itemId: 'dtToDate',
                            format:'m/d/Y',
                            allowBlank: false,
                            listeners: {
                                select: 'validateDateRange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Refill #',
                            itemId: 'txtRefills',
                            allowBlank: false,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Approval Language',
                            itemId: 'txtFreeText',
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        //</editor-fold>

        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hiddenSystemID'},
                {xtype: 'hidden', itemId: 'hiddenDocumentID'},
                {xtype: 'hidden', itemId: 'hiddenAuthSystemID'},
                {xtype: 'hidden', itemId: 'hiddenAction'},
                {xtype: 'hidden', itemId: 'hiddenApprovedUser'},
                {xtype: 'hidden', itemId: 'hiddenSentUser'},
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hdnLetterName'},
                {xtype: 'hidden', itemId: 'hiddenLetterType'},
                {xtype: 'hidden', itemId: 'hiddenServiceDate'}
            ]
        }

    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combobox',
                itemId: 'cbxAssignTo',
                fieldLabel: 'Assign to',
                displayField: 'userName',
                valueField: 'userName',
                queryMode: 'local',
                bind: {
                    store: '{storeAssignTo}'
                }
            },
            '->',
            {
                xtype: 'button',
                itemId: 'btnSave',
                iconCls: 'fa fa-save',
                text: 'Save',
                listeners: {
                    click: 'onLetterAction'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnView',
                iconCls: 'fa fa-file-o',
                text: 'View',
                disabled : true,
                listeners: {
                    click: 'viewDocHandler'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnApprove',
                iconCls: 'fa fa-check-circle',
                text: 'Approve',
                disabled : true,
                listeners: {
                    click: 'onLetterAction'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnReset',
                iconCls: 'fa fa-check-circle',
                text: 'Reset Approve',
                hidden: true,
                listeners: {
                    click: 'onLetterAction'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnFax',
                iconCls: 'fa fa-print',
                text: 'Fax',
                disabled : true,
                listeners: {
                    click: 'btnFax_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnSend',
                iconCls: 'fa fa-send-o',
                text: 'Send',
                disabled : true,
                listeners: {
                    click: 'onLetterAction'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnDelete',
                iconCls: 'fa fa-minus-circle',
                text: 'Delete',
                disabled : true,
                listeners: {
                    click: 'onLetterAction'
                }
            }

        ]
    }
});

