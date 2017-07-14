/**
 * Created by agupta on 8/30/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGMain', {
    extend: 'Ext.panel.Panel',
    xtype: 'cdagmain',
    cls: 'cdagMain',
    requires: [
        'Ext.form.RadioGroup'
    ],
    viewModel: 'cdagviewmodel',
    title: 'CDAG',
    controller: 'cdagmaincontroller',
    layout:'border',
    listeners:{
        beforeclose: 'onCloseCdagWindow'
    },
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        itemId: 'cdagMainTopbar',
        items: [
            {
                xtype: 'button',
                text: 'New',
                itemId : 'btnNew',
                iconCls: 'x-fa fa-plus',
                listeners : {
                    click :'btnNew_Click'
                }
            },
            {
                xtype: 'button',
                itemId : 'btnAudit',
                tooltip: 'CD Change History',
                iconCls: 'fa fa-newspaper-o',
                listeners : {
                    click :'btnAudit_Click'
                }
            },
            '-',
            {
                xtype: 'combobox',
                itemId: 'cbxDeterminationType',
                displayField: 'name',
                valueField: 'value',
                fieldLabel: 'Type',
                labelWidth: 30,
                width: 230,
                value: 'CD',
                queryMode: 'local',
                listeners: {
                    select: 'refreshDeterminationType'
                },
                bind: {
                    store: '{storedeterminationtype}'
                }
            },
            {
                xtype: 'numberfield',
                itemId: 'numAuthID',
                emptyText: 'ID',
                hideTrigger: true,
                allowDecimals: false,
                enableKeyEvents: true,
                listeners: {
                    'keypress': {
                        fn: 'GetPA'
                    }
                },
                bind: {value: '{cdmodel.authId}'},
                width: 100
            }, '-',
            {
                xtype: 'button',
                text: 'Search',
                iconCls: 'fa fa-search',
                handler: 'btnSearchClick'
            },
            {
                xtype: 'displayfield',
                cls: 'cdagStatus',
                readOnly: false,
                fieldLabel: 'Status',
                itemId: 'lblPAStsatus',
                labelWidth: 50,
                bind: {value: '{cdmodel.AuthStatusDesc}'}
            }, '-',
            {
                xtype: 'displayfield',
                readOnly: false,
                fieldLabel: 'Hours Remaining'
            },
            {
                xtype: 'button',
                itemId : 'lblPARemainingHours',
                bind: {text: '{cdmodel.HrsRemToProcess}'},
                iconCls: 'fa fa-clock-o'
            }, '-',
            {
                xtype: 'splitbutton',
                itemId: 'lblDateModified',
                iconCls: 'fa  fa-pencil-square-o',
                menu: [
                    {
                        xtype: 'panel',
                        cls:'borderNone',
                        itemId : 'trackChanges',
                        overflowY : 'scroll',
                        items: [

                        ]
                    }
                ],
                listeners : {
                    arrowclick: function(){
                        if(this.down('#trackChanges').items.length == 0){
                            this.down('#trackChanges').setHeight(0);
                        }
                        else{
                            this.down('#trackChanges').setHeight(300);
                        }
                    }
                }
            }, '-',
            {
                xtype: 'label',
                itemId : 'lblTolling',
                text: 'TOLLING',
                readOnly: false,
                hidden: true,
                style: {
                    color: 'red',
                    'font-weight': 'bold'
                }
            }, '-',
            {
                xtype: 'label',
                readOnly: false,
                itemId : 'lblSource'
            },
            {
                xtype: 'label',
                itemId : 'lblAuthModule',
                text: 'Auth created from old module',
                readOnly: false,
                hidden: true,
                style: {
                    color: 'red',
                    'font-weight': 'bold'
                }
            },
            '->',
            '-',
            {
                xtype: 'button',
                text: 'Locked',
                itemId : 'btnUnlock',
                iconCls: 'fa fa-lock',
                hidden: true,
                handler : 'btnUnlock_Click'
            },
            '-',
            {
                xtype: 'button',
                text: 'Send Fax',
                itemId : 'btnSendFax',
                iconCls: 'fa  fa-send-o',
                disabled: true,
                handler : 'btnSendFax_Click'
            }, '-',
            {
                xtype: 'button',
                text: 'Fax Queue',
                itemId : 'btnFaxQueue',
                iconCls: 'fa fa-sticky-note-o',
                handler : 'btnFaxQueue_Click'
            }, '-',
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }
        ]
    },
    items:[
        {
            xtype: 'form',
            itemId : 'FormCDAGMain',
            region : 'north',
            height : '100%',
            layout: 'hbox',
            autoScroll:true,
            items: [
                {
                    xtype: 'panel',
                    cls:'borderNone',
                    flex : .73,
                    minWidth: 1230,
                    layout: 'vbox',
                    height : '100%',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'MemberInfoPanel',
                            cls:'borderNone',
                            width : '100%',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId: 'MemberInfo',
                                    //flex: .24,
                                    width : '100%',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'membertypeahead',
                                                    itemId: 'cbxMember',
                                                    fieldLabel: 'Member Info',
                                                    labelWidth: 110,
                                                    matchFieldWidth: false,
                                                    emptyText: '[e.g. John]',
                                                    hideLabel: false,
                                                    allowBlank: false,
                                                    //forceSelection: true,
                                                    listeners: {
                                                        select: 'cbxMember_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield', readOnly: false, labelWidth: 110, fieldLabel: 'MeridianRx ID'
                                                },
                                                {
                                                    xtype: 'splitbutton',
                                                    itemId: 'lblRecipientID',
                                                    margin: '5 0 0 0',
                                                    iconCls: 'fa fa-user',
                                                    handler: 'routeToMember',
                                                    menu: [
                                                        {
                                                            xtype: 'panel',
                                                            cls:'borderNone',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    itemId: 'lblAddressLabel',
                                                                    width: 60,
                                                                    text: 'Address : '
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    itemId: 'lblAddress',
                                                                    text: ' NA'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblDOB',
                                                    fieldLabel: 'DOB',
                                                    readOnly: false,
                                                    labelWidth: 40,
                                                    bind: {value: '{cdmodel.BirthDate}'}
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'Gender',
                                                    itemId: 'lblGender',
                                                    readOnly: false,
                                                    labelWidth: 50,
                                                    bind: {value: '{cdmodel.Gender}'}
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblEnroll',
                                                    fieldLabel: 'Enrollment',
                                                    readOnly: false,
                                                    labelWidth: 60,
                                                    bind: {value: '{cdmodel.EnrollmentStatus}'}
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxMemGroup',
                                                    fieldLabel: 'Group',
                                                    labelWidth: 60,
                                                    width: 300,
                                                    margin: '5 0 0 0',
                                                    displayField: 'planGroupName',
                                                    valueField: 'planGroupId',
                                                    allowBlank: false,
                                                    queryMode: 'local',
                                                    //forceSelection: true,
                                                    bind: {
                                                        value: '{cdmodel.PlanGroupId}',
                                                        store: '{storememgroup}'
                                                    },
                                                    listeners: {
                                                        select: 'cbxMemGroup_Select'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'CntCocMember',
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lblCoCMember',
                                                    margin: '0, 0, 0, 130',
                                                    emptyText: '-',
                                                    style: {
                                                        'font-weight': 'bold'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'prescribertypeahead',
                                                    fieldLabel: 'Prescriber Info',
                                                    labelWidth: 110,
                                                    matchFieldWidth: false,
                                                    emptyText: '[e.g. Dr. Smith]',
                                                    itemId: 'cbxPrescriber',
                                                    displayField: 'fullname',
                                                    valueField: 'npi',
                                                    allowBlank: false,
                                                    //forceSelection: true,
                                                    listeners: {
                                                        select: 'cbxPrescriber_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield', fieldLabel: 'NPI', readOnly: false, labelWidth: 110//,
                                                },
                                                {
                                                    xtype: 'splitbutton',
                                                    fieldLabel: 'NPI',
                                                    itemId: 'lblNPI',
                                                    labelWidth: 40,
                                                    iconCls: 'fa fa-tag',
                                                    margin: '5 0 0 0',
                                                    handler: 'routeToPrescriber',
                                                    menu: [
                                                        {
                                                            xtype: 'panel',
                                                            cls:'borderNone',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    itemId: 'lblAddressNPILabel',
                                                                    width: 60,
                                                                    text: 'Address : '
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    itemId: 'lblAddressNPI',
                                                                    text: ' NA'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'providertypeahead',
                                                    fieldLabel: 'Pharmacy Info',
                                                    itemId: 'cbxPharmacy',
                                                    displayField: 'Name',
                                                    valueField: 'ncpdpId',
                                                    allowBlank: false,
                                                    //forceSelection: true,
                                                    labelWidth: 110,
                                                    matchFieldWidth: false,
                                                    listeners: {
                                                        select: 'cbxPharmacy_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'NCPDP',
                                                    readOnly: false,
                                                    itemId: 'lblNCPDPID',
                                                    labelWidth: 110
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'Relationship Id',
                                                    readOnly: false,
                                                    itemId: 'txtRelationshipID',
                                                    hidden: true,
                                                    labelWidth: 110
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    cls:'borderNone',
                                                    layout: 'hbox',
                                                    style: 'border:0px !important',
                                                    items: [
                                                        {
                                                            xtype: 'drugtypeahead',
                                                            itemId: 'cbxMedication',
                                                            fieldLabel: 'Medication Info',
                                                            labelWidth: 110,
                                                            // width : 285,
                                                            emptyText: '[e.g. Nexium]',
                                                            displayField: 'LN',
                                                            valueField: 'NDC',
                                                            allowBlank: false,
                                                            hideFieldLabel: false,
                                                            //forceSelection: true,
                                                            listeners: {
                                                                select: 'cbxMedication_Select'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gpindctypeahead',
                                                            itemId: 'cbxGPINDC',
                                                            fieldLabel: 'Medication Info',
                                                            labelWidth: 110,
                                                            width : 285,
                                                            matchFieldWidth: false,
                                                            emptyText: '[e.g. Nexium]',
                                                            displayField: 'descAbbr',
                                                            valueField: 'NDC',
                                                            allowBlank: false,
                                                            hideFieldLabel: false,
                                                            //forceSelection: true,
                                                            hidden: true,
                                                            listeners: {
                                                                select: 'cbxGPINDC_Select'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    cls:'boxLabelFont',
                                                    items: [
                                                        {
                                                            boxLabel: 'GCN:',
                                                            cls:'boxLabelFont',
                                                            itemId: 'radGCN',
                                                            checked: true
                                                        },
                                                        {
                                                            boxLabel: 'HICL SEQ NO:',
                                                            cls:'boxLabelFont',
                                                            itemId: 'radHICL',
                                                            width: 200,
                                                            checked: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radio',
                                                    cls:'boxLabelFont',
                                                    boxLabel: 'NDC:',
                                                    itemId: 'radNDC',
                                                    hidden: true,
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    cls:'boxLabelFont',
                                                    items: [
                                                        {
                                                            boxLabel: 'GPICode:',
                                                            cls:'boxLabelFont',
                                                            itemId: 'radGPI14',
                                                            hidden: true,
                                                            checked: true
                                                        },
                                                        {
                                                            boxLabel: 'GPI10:',
                                                            cls:'boxLabelFont',
                                                            itemId: 'radGPI10',
                                                            hidden: true,
                                                            width: 200,
                                                            checked: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'btnFormularyStatus',
                                                    text: 'Formulary',
                                                    tooltip: 'Show Formulary Status',
                                                    handler: 'btnFormularyStatus_Click',
                                                    params: {
                                                        isOpenFormularyWindow: true
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'btnCompoundGCN',
                                                    tooltip: 'Compound GCNs',
                                                    text: 'Compound',
                                                    handler: 'btnCompoundGCN_Click'
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'btnCustomPrice',
                                                    tooltip: 'Show Custom Price',
                                                    text: 'Custom Price',
                                                    handler: 'btnCustomPrice_Click'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Process Test Claim',
                                                    tooltip: 'Test Claim',
                                                    itemId : 'btnClaimTest',
                                                    handler : 'btnClaimTest_Click'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'drugIndicator',
                                            layout: 'vbox',
                                            margin: '0, 0, 0, 130',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lblProctectedClassDrug',
                                                    text: 'Protected Class Drug',
                                                    hidden: true,
                                                    style: {
                                                        color: 'red',
                                                        'font-weight': 'bold'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lblCarveOut',
                                                    text: 'Carve Out',
                                                    hidden: true,
                                                    style: {
                                                        color: 'red',
                                                        'font-weight': 'bold'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                } /*Common fields across all tabs*/
                            ]
                        },

                        {
                            xtype: 'panel',
                            cls:'borderNone',
                            flex: 1,
                            layout: 'vbox',
                            align: 'stretch',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    itemId: 'cdagTabBar',
                                    flex: 1,
                                    layout : 'vbox',
                                    listeners: {
                                        'tabchange': 'onTabChange'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            cls:'borderNone',
                                            title: 'Request',
                                            width: 1230,
                                            itemId: 'RequestPanel',
                                            height: '100%',
                                            layout: 'hbox',
                                            align: 'stretch',
                                            items: [
                                                {
                                                    xtype: 'form',
                                                    itemId: 'RequestForm',
                                                    flex: 4,
                                                    layout: 'fit',
                                                    height: '100%',
                                                    align: 'stretch',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            cls:'borderNone',
                                                            itemId: 'RequestInfoPanel',
                                                            flex: 1,
                                                            /*width: '100%',
                                                            height: '100%',*/
                                                            autoScroll: true,
                                                            layout: 'vbox',
                                                            align: 'stretch',
                                                            defaults: {
                                                                cls: 'card-panel',
                                                                width: '100%'
                                                            },
                                                            items: [
                                                                {
                                                                    title: 'Request Information',
                                                                    iconCls: 'x-fa fa-pencil-square-o',
                                                                    defaults: {
                                                                        width: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'container',
                                                                            defaults: {
                                                                                labelWidth: 130,
                                                                                width: '98%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Intake',
                                                                                    itemId : 'cbxIntake',
                                                                                    emptyText: 'Select Intake',
                                                                                    displayField: 'name',
                                                                                    valueField: 'value',
                                                                                    queryMode: 'local',
                                                                                    allowBlank: false,
                                                                                    forceSelection: true,
                                                                                    bind: {
                                                                                        value: '{cdmodel.InTake}',
                                                                                        store: '{storereceivedvia}'
                                                                                    },
                                                                                    listeners: {
                                                                                        select: 'cbxIntake_Select'
                                                                                    }
                                                                                }
                                                                                , {
                                                                                    xtype: 'container',
                                                                                    layout: 'hbox',
                                                                                    defaults: {
                                                                                        labelWidth: 130,
                                                                                        width: '100%'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'datefield',
                                                                                            fieldLabel: 'Request Received',
                                                                                            itemId: 'dtManualRcvd',
                                                                                            maxValue : new Date(),
                                                                                            flex: 7,
                                                                                            format:'m/d/Y',
                                                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                                                            maxText: "The Date in this Field must be on or before {0}"
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            itemId: 'tManualRcvd',
                                                                                            enableKeyEvents: true,
                                                                                            flex: 3,
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
                                                                                            enforceMaxLength: true
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'combobox',
                                                                                            itemId: 'cbAmPM',
                                                                                            margin: '3 0 0 5',
                                                                                            flex: 2,
                                                                                            store: ['AM', 'PM']
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    text: 'Override Received',
                                                                                    itemId: 'btnOverride',
                                                                                    style: 'margin-left:145px !important',
                                                                                    width: 150,
                                                                                    hidden: true,
                                                                                    handler: 'btnOverride_Click',
                                                                                    params: {
                                                                                        action: 'OverrideClicked'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Request Type',
                                                                                    itemId : 'cbxRequestType',
                                                                                    emptyText: 'Select Request Type',
                                                                                    displayField: 'name',
                                                                                    valueField: 'value',
                                                                                    allowBlank: false,
                                                                                    queryMode: 'local',
                                                                                    forceSelection: true,
                                                                                    bind: {
                                                                                        value: '{cdmodel.PAtypeFlag}'
                                                                                    }
                                                                                }
                                                                                , {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Urgency Type',
                                                                                    itemId : 'cbxUrgencyType',
                                                                                    emptyText: 'Select Urgency Type',
                                                                                    displayField: 'ListDescription',
                                                                                    valueField: 'ListItem',
                                                                                    queryMode: 'local',
                                                                                    allowBlank: false,
                                                                                    forceSelection: true,
                                                                                    bind: {
                                                                                        value: '{cdmodel.UrgencyType}'
                                                                                    }

                                                                                }
                                                                                , {
                                                                                    xtype: 'checkbox',
                                                                                    cls:'cdagCheckbox',
                                                                                    fieldLabel: 'Discharge Notification',
                                                                                    itemId : 'chkDischargeNotification',
                                                                                    //bind: {value: '{cdmodel.PendDischrgNotify}'},
                                                                                    listeners : {
                                                                                        change : 'chkDischargeNotification_Change'
                                                                                    }
                                                                                }
                                                                                , {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'Hospital',
                                                                                    itemId : 'txtHospital',
                                                                                    bind: {value: '{cdmodel.PendDischrgHospital}'}
                                                                                }
                                                                                , {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Reason For Request *',
                                                                                    itemId : 'cbxReasonforRequest',
                                                                                    emptyText: 'Select Reason for Request',
                                                                                    displayField: 'name',
                                                                                    valueField: 'value',
                                                                                    allowBlank: false,
                                                                                    queryMode: 'local',
                                                                                    forceSelection: true,
                                                                                    bind: {
                                                                                        value: '{cdmodel.ReasonForRequest}',
                                                                                        store: '{storereasonforrequest}'
                                                                                    }

                                                                                }
                                                                                , {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'S.S. Intake',
                                                                                    itemId : 'cbxSSReceiveType',
                                                                                    displayField: 'name',
                                                                                    valueField: 'value',
                                                                                    queryMode: 'local',
                                                                                    forceSelection: true,
                                                                                    bind: {
                                                                                        value: '{cdmodel.SupportStmtType}',
                                                                                        store: '{storereceivedviass}'
                                                                                    }
                                                                                }
                                                                                , {
                                                                                    xtype: 'container',
                                                                                    layout: 'hbox',
                                                                                    defaults: {
                                                                                        labelWidth: 130
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'datefield',
                                                                                            fieldLabel: 'S.S. Received',
                                                                                            itemId : 'dtSSReceived',
                                                                                            flex: 7,
                                                                                            maxValue : new Date(),
                                                                                            format:'m/d/Y',
                                                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                                                            maxText: "The Date in this Field must be on or before {0}"
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            itemId : 'tSSREceived',
                                                                                            flex: 3,
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
                                                                                            enforceMaxLength: true
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'combobox',
                                                                                            itemId : 'cbxSSAmPm',
                                                                                            margin: '3 0 0 5',
                                                                                            flex: 2,
                                                                                            store: ['AM', 'PM']
                                                                                        }
                                                                                    ]
                                                                                }
                                                                                , {
                                                                                    xtype: 'container',
                                                                                    layout: 'hbox',
                                                                                    defaults: {
                                                                                        labelWidth: 130
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'datefield',
                                                                                            fieldLabel: 'AOR Received',
                                                                                            itemId : 'dtCDAORRecvdDate',
                                                                                            maxValue : new Date(),
                                                                                            flex: 7,
                                                                                            format:'m/d/Y',
                                                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                                                            maxText: "The Date in this Field must be on or before {0}"
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            itemId : 'tCDAORRecvdTime',
                                                                                            enableKeyEvents: true,
                                                                                            flex: 3,
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
                                                                                            enforceMaxLength: true
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'combobox',
                                                                                            itemId : 'cbxCDAORRecvdDate',
                                                                                            margin: '3 0 0 5',
                                                                                            flex: 2,
                                                                                            store: ['AM', 'PM']
                                                                                        }
                                                                                    ]
                                                                                }
                                                                                , {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Requestor',
                                                                                    itemId : 'cbxRequestor',
                                                                                    emptyText: 'Select Requestor',
                                                                                    displayField: 'name',
                                                                                    valueField: 'value',
                                                                                    allowBlank: false,
                                                                                    queryMode: 'local',
                                                                                    forceSelection: true,
                                                                                    listeners : {
                                                                                        select : 'cbxRequestor_Select'
                                                                                    },
                                                                                    bind: {
                                                                                        value: '{cdmodel.Requestor}',
                                                                                        store: '{storereceivedfrom}'
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype : 'form',
                                                                            itemId : 'fpRequestor',
                                                                            layout: {
                                                                                type: 'vbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            defaults: {
                                                                                cls: 'card-panel',
                                                                                collapsible: true,
                                                                                defaults: {
                                                                                    width: '100%'
                                                                                }
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    title: 'Requestor',
                                                                                    itemId : 'pnlRequestorRep',
                                                                                    defaults: {
                                                                                        labelWidth: 120,
                                                                                        width: '90%'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Requestor Name',
                                                                                            itemId : 'txtRequestorName',
                                                                                            bind: {value: '{cdmodel.ReqFullName}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Relationship',
                                                                                            itemId : 'txtRelationship',
                                                                                            bind: {value: '{cdmodel.ReqRelationship}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Address',
                                                                                            itemId : 'txtAddress',
                                                                                            bind: {value: '{cdmodel.ReqAddress}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'City',
                                                                                            itemId : 'txtCity',
                                                                                            bind: {value: '{cdmodel.ReqCity}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'State',
                                                                                            itemId : 'txtState',
                                                                                            bind: {value: '{cdmodel.ReqState}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Zip',
                                                                                            itemId : 'txtZip',
                                                                                            maskRe: /[0-9]/,
                                                                                            maxLength: 10,
                                                                                            enforceMaxLength: true,
                                                                                            minLength:5,
                                                                                            bind: {value: '{cdmodel.ReqZip}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Phone',
                                                                                            itemId : 'txtPhone',
                                                                                            emptyText: '(xxx)-xxx-xxxx',
                                                                                            maskRe: /[0-9]/,
                                                                                            maxLength: 14,
                                                                                            enforceMaxLength: true,
                                                                                            minLength:14,
                                                                                            enableKeyEvents: true,
                                                                                            listeners: {
                                                                                                'keypress': {
                                                                                                    fn: 'formatPhoneNumber'
                                                                                                }
                                                                                            },
                                                                                            bind: {value: '{cdmodel.ReqPhone}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Fax',
                                                                                            itemId : 'txtFax',
                                                                                            maskRe: /[0-9]/,
                                                                                            emptyText: '(xxx)-xxx-xxxx',
                                                                                            maxLength: 14,
                                                                                            enforceMaxLength: true,
                                                                                            minLength:14,
                                                                                            enableKeyEvents: true,
                                                                                            listeners: {
                                                                                                'keypress': {
                                                                                                    fn: 'formatPhoneNumber'
                                                                                                }
                                                                                            },
                                                                                            bind: {value: '{cdmodel.ReqFax}'}
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Email',
                                                                                            itemId : 'txtEmail',
                                                                                            regex: /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
                                                                                            regexText: "<b>Error</b></br>Invalid Email",
                                                                                            bind: {value: '{cdmodel.ReqEmail}'}
                                                                                        }

                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }/*Request Information*/
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    cls:'borderNone',
                                                    flex: 6,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    height: '100%',
                                                    items: [
                                                        {
                                                            xtype: 'form',
                                                            itemId: 'CDForm',
                                                            flex: 7.5,
                                                            layout: 'fit',
                                                            align: 'stretch',
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    cls:'borderNone',
                                                                    flex: 1,
                                                                    itemId: 'CDFormPanel',
                                                                    overflowY: true,
                                                                    layout : {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            cls:'borderNone',
                                                                            flex: 2,
                                                                            defaults: {
                                                                                cls: 'card-panel',
                                                                                labelWidth: 130,
                                                                                width: '100%'
                                                                            },
                                                                            layout : {
                                                                                type: 'vbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            autoScroll: true,
                                                                            items: [
                                                                                {
                                                                                    title: 'Overrides',
                                                                                    iconCls: 'x-fa fa-pencil',
                                                                                    layout : {
                                                                                        type: 'vbox',
                                                                                        align: 'stretch'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout : {
                                                                                                type: 'hbox',
                                                                                                align: 'stretch'
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'container',
                                                                                                    cls:'boxLabelFont',
                                                                                                    flex: 2,
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            checked: true,
                                                                                                            boxLabel: 'Drug',
                                                                                                            itemId: 'Overrides_5'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'DAW',
                                                                                                            itemId: 'Overrides_14'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Max Cost',
                                                                                                            itemId: 'Overrides_13'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Quantity',
                                                                                                            itemId: 'Overrides_6'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Age',
                                                                                                            itemId: 'Overrides_12'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'DUR',
                                                                                                            itemId: 'Overrides_10'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Days Supply',
                                                                                                            itemId: 'Overrides_7'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Refill Too Soon',
                                                                                                            itemId: 'Overrides_9'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Medication Lock',
                                                                                                            itemId: 'Overrides_18'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Prescriber Lock',
                                                                                                            itemId: 'Overrides_19'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Provider Lock',
                                                                                                            itemId: 'Overrides_20'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Medicare B vs D',
                                                                                                            itemId: 'Overrides_8',
                                                                                                            listeners : {
                                                                                                                change : 'Overrides_8_Change'
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Medicare Part B Drug',
                                                                                                            itemId: 'Overrides_22',
                                                                                                            listeners : {
                                                                                                                change : 'Overrides_22_Change'
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Medicaid Fee Screen',
                                                                                                            itemId: 'Overrides_21'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Rejection Codes',
                                                                                                            itemId: 'Overrides_15',
                                                                                                            listeners : {
                                                                                                                change : 'Overrides_15_Change'
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'container',
                                                                                                    cls:'boxLabelFont',
                                                                                                    flex: 2,
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: '# of Fills',
                                                                                                            itemId: 'Overrides_16'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Specialty',
                                                                                                            itemId: 'Overrides_17'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Price',
                                                                                                            itemId: 'Overrides_4'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Eligibility',
                                                                                                            itemId: 'Overrides_1'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Provider',
                                                                                                            itemId: 'Overrides_3'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Prescriber',
                                                                                                            itemId: 'Overrides_2'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Brand Override',
                                                                                                            itemId: 'Overrides_23'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Copay Override',
                                                                                                            itemId: 'Overrides_24'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Max Script Count',
                                                                                                            itemId: 'Overrides_25'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Pref Pharm NDC',
                                                                                                            itemId: 'Overrides_26'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Non Pref Drug',
                                                                                                            itemId: 'Overrides_27'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Claim Too Old',
                                                                                                            itemId: 'Overrides_28'
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'checkbox',
                                                                                                            boxLabel: 'Accum. Benefits',
                                                                                                            hidden: true,
                                                                                                            itemId: 'Overrides_11'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            flex: 1,
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    width: 320,
                                                                                                    readOnly: true,
                                                                                                    emptyText: '[Selected Rejection Codes]',
                                                                                                    itemId: 'txtRejectionCodes'
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    width: 320,
                                                                                                    itemId: 'cbxNCPDPerrorCode_Add',
                                                                                                    emptyText: '[Select Rejection Codes]',
                                                                                                    forceSelection: true,
                                                                                                    queryMode: 'local',
                                                                                                    bind: {
                                                                                                        store: '{storencpdperrorcodes}'
                                                                                                    },
                                                                                                    multiSelect: true,
                                                                                                    tpl: new Ext.XTemplate('<tpl for=".">'
                                                                                                        + '<div class="x-boundlist-item" >'
                                                                                                        + '<tpl if="this.checkStatus(values) == true">'
                                                                                                        + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{id} - {value}'
                                                                                                        + '</tpl>'
                                                                                                        + '<tpl if="this.checkStatus(values) == false">'
                                                                                                        + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{id} - {value}'
                                                                                                        + '</tpl>'
                                                                                                        + '</div></tpl>',
                                                                                                        {
                                                                                                            checkStatus: function (values) {
                                                                                                                var rejectionCodeList = this.field.up().down('#txtRejectionCodes').getValue();
                                                                                                                this.field.up().down('#cbxNCPDPerrorCode_Add').setValue(rejectionCodeList.split(','));
                                                                                                                return (rejectionCodeList.indexOf(values.id) != -1 ? true : false);
                                                                                                            }
                                                                                                        }
                                                                                                    ),
                                                                                                    displayTpl: Ext.create('Ext.XTemplate',
                                                                                                        '<tpl for=".">',
                                                                                                        '{id} - {value}, ',
                                                                                                        '</tpl>'
                                                                                                    ),
                                                                                                    valueField: 'id',
                                                                                                    listeners: {
                                                                                                        change:'onRejectionCodeChange',
                                                                                                        select: function (combo, records) {
                                                                                                            var node;
                                                                                                            Ext.each(records, function (rec) {
                                                                                                                node = combo.getPicker().getNode(rec);
                                                                                                                Ext.get(node).down('input').dom.checked = true;
                                                                                                            });
                                                                                                        },
                                                                                                        beforedeselect: function (combo, rec) {
                                                                                                            var node = combo.getPicker().getNode(rec);
                                                                                                            Ext.get(node).down('input').dom.checked = false;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            cls:'borderNone',
                                                                            flex: 2,
                                                                            defaults: {
                                                                                cls: 'card-panel'
                                                                            },
                                                                            autoScroll: true,
                                                                            items: [
                                                                                {
                                                                                    title: 'Limitations',
                                                                                    iconCls: 'x-fa fa-crosshairs',
                                                                                    layout : {
                                                                                        type: 'vbox',
                                                                                        align: 'stretch'
                                                                                    },
                                                                                    defaults: {
                                                                                        labelWidth: 110
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            cls:'boxLabelFont',
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    html: 'Min',
                                                                                                    cls: 'fontBold',
                                                                                                    margin: '0 0 0 130'
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Max',
                                                                                                    cls: 'fontBold',
                                                                                                    margin: '0 0 0 50'
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'numberfield',
                                                                                                    minValue: 0,
                                                                                                    maxValue: 9999,
                                                                                                    maxLength: 7,
                                                                                                    enforceMaxLength: true,
                                                                                                    labelWidth: 110,
                                                                                                    width: 190,
                                                                                                    hideTrigger: true,
                                                                                                    fieldLabel: 'Quantity',
                                                                                                    itemId : 'txtQtyMin'
                                                                                                }
                                                                                                , {
                                                                                                    xtype: 'numberfield',
                                                                                                    minValue: 0,
                                                                                                    maxValue: 9999,
                                                                                                    maxLength: 7,
                                                                                                    enforceMaxLength: true,
                                                                                                    width: 80,
                                                                                                    hideTrigger: true,
                                                                                                    itemId : 'txtQtyMax'
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'numberfield',
                                                                                                    minValue: 0,
                                                                                                    maxValue: 365,
                                                                                                    maxLength: 3,
                                                                                                    enforceMaxLength: true,
                                                                                                    labelWidth: 110,
                                                                                                    width: 190,
                                                                                                    hideTrigger: true,
                                                                                                    allowDecimals: false,
                                                                                                    fieldLabel: 'Days Supply',
                                                                                                    itemId : 'txtDaysMin'
                                                                                                }
                                                                                                , {
                                                                                                    xtype: 'numberfield',
                                                                                                    minValue: 0,
                                                                                                    maxValue: 365,
                                                                                                    maxLength: 3,
                                                                                                    enforceMaxLength: true,
                                                                                                    width: 80,
                                                                                                    allowDecimals: false,
                                                                                                    hideTrigger: true,
                                                                                                    itemId : 'txtDaysMax'
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'numberfield',
                                                                                            minValue: 0,
                                                                                            maxValue: 999,
                                                                                            maxLength: 3,
                                                                                            enforceMaxLength: true,
                                                                                            hideTrigger: true,
                                                                                            allowDecimals: false,
                                                                                            fieldLabel: '# of Fills',
                                                                                            itemId : 'txtNoOfFills'
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'numberfield',
                                                                                            minValue: 0,
                                                                                            maxValue: 999999,
                                                                                            maxLength: 8,
                                                                                            enforceMaxLength: true,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Max Cost',
                                                                                            itemId : 'txtMaxCost'
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'numberfield',
                                                                                            minValue: 0,
                                                                                            maxValue: 999999,
                                                                                            maxLength: 8,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Price Override',
                                                                                            itemId : 'PriceMax'
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'numberfield',
                                                                                            minValue: 0,
                                                                                            maxValue: 999999999,
                                                                                            maxLength: 9,
                                                                                            enforceMaxLength: true,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Copay Override',
                                                                                            itemId : 'CopayMax'
                                                                                        }
                                                                                        ,{
                                                                                            xtype: 'checkbox',
                                                                                            cls:'cdagCheckbox',
                                                                                            fieldLabel: 'Partial Approval',
                                                                                            itemId : 'chkPartialApproval'
                                                                                        }
                                                                                        , {
                                                                                            xtype: 'checkbox',
                                                                                            cls:'cdagCheckbox',
                                                                                            fieldLabel: 'Emergency Supply',
                                                                                            itemId : 'chkEmergencySupply'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }/*Overrides, Limitations*/
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'form',
                                                            itemId: 'DMRForm',
                                                            flex: 7.5,
                                                            layout: 'fit',
                                                            height: '100%',
                                                            align: 'stretch',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    cls:'borderNone',
                                                                    itemId: 'DMRFormPanel',
                                                                    flex: 1,
                                                                    overflowY: true,
                                                                    align : 'stretch',
                                                                    layout : {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            cls:'borderNone',
                                                                            flex: 4,
                                                                            defaults: {
                                                                                cls: 'card-panel'
                                                                            },
                                                                            layout: {
                                                                                type: 'vbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    title: 'Additional Info',
                                                                                    iconCls: 'x-fa fa-info-circle',
                                                                                    defaults: {
                                                                                        labelWidth: 150,
                                                                                        width: '98%'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Claim Id',
                                                                                            itemId : 'txtClaimId',
                                                                                            disabled: true
                                                                                        },
                                                                                        {
                                                                                            xtype: 'numberfield',
                                                                                            maxValue: 9999999,
                                                                                            maxLength: 7,
                                                                                            enforceMaxLength: true,
                                                                                            minValue: 1,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Quantity',
                                                                                            itemId : 'txtQuantity',
                                                                                            allowDecimals: false,
                                                                                            allowBlank: false,
                                                                                            bind: {
                                                                                                value: '{cdmodel.Quantity}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'numberfield',
                                                                                            maxValue: 365,
                                                                                            maxLength: 3,
                                                                                            enforceMaxLength: true,
                                                                                            minValue: 1,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Day Supply',
                                                                                            itemId : 'txtDaySupply',
                                                                                            allowDecimals: false,
                                                                                            allowBlank: false,
                                                                                            bind: {
                                                                                                value: '{cdmodel.DaysSupply}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'numberfield',
                                                                                            maxValue: 9999999,
                                                                                            maxLength: 7,
                                                                                            enforceMaxLength: true,
                                                                                            minValue: 0.01,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Amount Paid',
                                                                                            itemId : 'txtAmountPaid',
                                                                                            allowBlank: false,
                                                                                            bind: {
                                                                                                value: '{cdmodel.AmtPaid}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combobox',
                                                                                            fieldLabel: 'Residence',
                                                                                            itemId : 'cbxResidence',
                                                                                            displayField: 'name',
                                                                                            valueField: 'value',
                                                                                            allowBlank: false,
                                                                                            queryMode: 'local',
                                                                                            forceSelection: true,
                                                                                            bind: {
                                                                                                value: '{cdmodel.Residence}',
                                                                                                store: '{storepatientresidencecode}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combobox',
                                                                                            fieldLabel: 'Pharmacy Service Type',
                                                                                            itemId : 'cbxPharServiceType',
                                                                                            displayField: 'name',
                                                                                            valueField: 'value',
                                                                                            allowBlank: false,
                                                                                            queryMode: 'local',
                                                                                            forceSelection: true,
                                                                                            bind: {
                                                                                                value: '{cdmodel.PharServiceType}',
                                                                                                store: '{storepharmacyservicetype}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'Subclarification Code',
                                                                                            itemId : 'txtSubclarificationCode',
                                                                                            disabled: true,
                                                                                            bind: {
                                                                                                value: '{cdmodel.SubClarificationCode}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'datefield',
                                                                                            fieldLabel: 'Date of Service',
                                                                                            itemId : 'dfService',
                                                                                            maxValue : new Date(),
                                                                                            format:'m/d/Y',
                                                                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                                                            allowBlank: false,
                                                                                            bind: {
                                                                                                value: '{cdmodel.ServiceDate}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'numberfield',
                                                                                            maxValue: 999999999999,
                                                                                            maxLength: 12,
                                                                                            enforceMaxLength: true,
                                                                                            minValue: 0,
                                                                                            hideTrigger: true,
                                                                                            fieldLabel: 'Rx ID',
                                                                                            itemId : 'txtRXID',
                                                                                            allowBlank: false,
                                                                                            bind: {
                                                                                                value: '{cdmodel.RxNum}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'datefield',
                                                                                                    fieldLabel: 'Check Sent Date',
                                                                                                    itemId : 'dtCheckSentDate',
                                                                                                    maxValue : new Date(),
                                                                                                    format:'m/d/Y',
                                                                                                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                                                                    labelWidth: 150,
                                                                                                    width: 285
                                                                                                }
                                                                                                , {
                                                                                                    xtype: 'textfield',
                                                                                                    itemId : 'tCheckSentDate',
                                                                                                    width: 90,
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
                                                                                                    enforceMaxLength: true
                                                                                                }
                                                                                                , {
                                                                                                    xtype: 'combobox',
                                                                                                    itemId : 'cbxCheckAmPm',
                                                                                                    width: 73,
                                                                                                    store: ['AM', 'PM']
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            cls:'borderNone',
                                                                            flex: 2,
                                                                            defaults: {
                                                                                cls: 'card-panel',
                                                                                labelWidth: 130,
                                                                                width: '100%'
                                                                            },
                                                                            layout: {
                                                                                type: 'vbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    title: 'Payment Info',
                                                                                    iconCls: 'x-fa fa-usd',
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'displayfield',
                                                                                            fieldLabel: 'Check',
                                                                                            bind: {
                                                                                                value: '{cdmodel.CheckNum}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'displayfield',
                                                                                            fieldLabel: 'Check Date',
                                                                                            bind: {
                                                                                                value: '{cdmodel.CheckDate}'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'displayfield',
                                                                                            itemId: 'ClaimNumber',
                                                                                            fieldLabel: 'Claim Number'
                                                                                        }

                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }/*Additional Info*/
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'form',
                                                            itemId: 'NotesForm',
                                                            flex: 2.5,
                                                            height: '100%',
                                                            overflowY: true,
                                                            items: [

                                                                , {
                                                                    xtype: 'textarea',
                                                                    fieldLabel: 'Notes',
                                                                    labelWidth: 50,
                                                                    itemId : 'txtNotes',
                                                                    allowBlank: false,
                                                                    height : '300',
                                                                    width: '97%'
                                                                }
                                                                , {
                                                                    xtype: 'reasontypeahead',
                                                                    fieldLabel: 'Reason',
                                                                    matchFieldWidth: false,
                                                                    emptyText: '',
                                                                    hideLabel: false,
                                                                    minChars: 1,
                                                                    labelWidth: 50,
                                                                    itemId: 'cbxReason',
                                                                    width: '97%',
                                                                    pickerAlign: 'bl-tl?',
                                                                    listeners: {
                                                                        select: 'cbxReason_Select',
                                                                        expand: 'onExpandReasonCbx'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    cls:'borderNone',
                                                                    layout : 'hbox',
                                                                    width: '97%',
                                                                    items : [
                                                                        {
                                                                            xtype: 'checkbox',
                                                                            itemId : 'chkResvldInFirstCall',
                                                                            boxLabel: 'Resolved in first Call',
                                                                            disabled: true 
                                                                        },
                                                                        {
                                                                            xtype: 'combobox',
                                                                            fieldLabel: 'Update Effectuation Date/Time',
                                                                            itemId : 'cbxUpdateEffectuationDate',
                                                                            forceSelection: true,
                                                                            hidden:true,
                                                                            width: 300,
                                                                            labelWidth:200,
                                                                            store: ['Yes', 'No']
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: {
                                                dock: 'bottom',
                                                xtype: 'toolbar',
                                                //style: {borderColor: 'gray', borderStyle: 'solid'},
                                                items: [
                                                    {xtype: 'checkbox', itemId : 'chkReopen', labelWidth : 50, cls:'boxLabelFont', boxLabel: 'Reopen', hidden: true},
                                                    '->'
                                                    , {
                                                        xtype: 'checkbox',
                                                        cls:'boxLabelFont',
                                                        boxLabel: 'Discard this PA',
                                                        labelWidth : 90,
                                                        itemId : 'chkDiscard',
                                                        hidden: true,
                                                        listeners : {
                                                            change : 'chkDiscard_Change'
                                                        }
                                                    }
                                                    , '-'
                                                    , {
                                                        xtype: 'datefield',
                                                        fieldLabel: 'Effective Date',
                                                        itemId: 'dtEffectiveDate',
                                                        format:'m/d/Y',
                                                        altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                        labelWidth: 90,
                                                        width: 230,
                                                        allowBlank: false,
                                                        maxText: "The Date in this Field must be on or before {0}",
                                                        listeners: {
                                                            select: 'validateDateRange',
                                                            focusleave: 'validateDateRange'
                                                        }
                                                    }
                                                    , '-'
                                                    , {
                                                        xtype: 'datefield',
                                                        fieldLabel: 'Term Date',
                                                        itemId: 'dtTermDate',
                                                        format:'m/d/Y',
                                                        altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                                        labelWidth: 70,
                                                        width: 210,
                                                        allowBlank: false,
                                                        listeners: {
                                                            select: 'validateDateRange',
                                                            focusleave: 'validateDateRange'
                                                        },
                                                        minText: "The Date in this Field must be on or after {0}"
                                                    }
                                                    , '-'
                                                    , {
                                                        xtype: 'combobox',
                                                        fieldLabel: 'Status',
                                                        itemId: 'cbxStatus',
                                                        displayField : 'ListDescription',
                                                        valueField : 'ListItem',
                                                        allowBlank: false,
                                                        forceSelection: true,
                                                        width: 300,
                                                        labelWidth: 40,
                                                        queryMode: 'local',
                                                        bind: {
                                                            store: '{storeauthstatus}'
                                                        },
                                                        listeners: {
                                                            beforeselect: 'cbxStatus_beforeSelect',
                                                            select: 'cbxStatus_Select',
                                                            afterrender: function (cb,records) {
                                                                cb.select('01');
                                                            }
                                                        }
                                                    }
                                                    , '-'
                                                    , {
                                                        xtype: 'button',
                                                        text: 'Save',
                                                        itemId : 'btnSave',
                                                        iconCls: 'fa fa-save',
                                                        handler : 'btnSave_Click'
                                                    }
                                                    , '-'
                                                    , {
                                                        xtype: 'button',
                                                        text: 'Cancel',
                                                        iconCls: 'fa fa-close',
                                                        handler: 'btnCancel_Click'
                                                    }
                                                ]
                                            } /*Bottombar save, cancel*/

                                        }/*Request Tab*/
                                        , {
                                            xtype: 'container',
                                            title: 'Redetermination',
                                            itemId: 'tabRedetermination',
                                            disabled: true,
                                            width: 1220,
                                            height : '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'redetermination'
                                                }
                                            ]
                                        }/*Redetermination Tab*/
                                        , {
                                            xtype: 'container',
                                            title: 'External Review',
                                            itemId: 'tabExternalReview',
                                            width: 1220,
                                            height : '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'externalreview'
                                                }
                                            ]
                                        }/*External Review Tab*/
                                        , {
                                            xtype: 'container',
                                            title: 'Letters',
                                            width: 1220,
                                            height : '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cdagletters'
                                                }
                                            ]
                                        }/*Letters Tab*/
                                        , {
                                            xtype: 'container',
                                            title: 'Determination History',
                                            width: 1220,
                                            height : '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'common-DeterminationHistory'
                                                }
                                            ]
                                        }/*Determination History Tab*/
                                        , {
                                            xtype: 'container',
                                            title: 'Outreach',
                                            itemId: 'tabOutreach',
                                            width: 1220,
                                            height : '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cdagoutreach'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }/*Left side*/
                , {
                    xtype: 'panel',    
                    flex : .27,
                    //style: {borderColor: 'gray', borderStyle: 'solid'},
                    //height: 845,
                    height : '100%',
                    minWidth: 350,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',                           
                            flex: 5,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId : 'GridPanel_AttachmentStore',
                                    viewConfig: {
                                        plugins: {
                                            ptype: 'gridviewdragdrop',
                                            containerScroll: true,
                                            dragGroup: 'faxDDGroup',
                                            dropGroup: 'faxDDGroup',
                                            enableDrag: false
                                        },
                                        listeners: {
                                            drop: function(node, data, dropRec, dropPosition) {
                                                data.records[data.records.length -1].dirty = true;
                                            }
                                        }
                                    },
                                    bind: {
                                        store: '{storeAttachments}'
                                    },
                                    tbar: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Doc Type',
                                            labelWidth: 50,
                                            displayField: 'name',
                                            valueField: 'value',
                                            itemId: 'cbxDocType',
                                            queryMode: 'local',
                                            listeners: {
                                                select: 'onDocTypeChange'
                                            },
                                            triggers: {
                                                clear: {
                                                    weight: 1,
                                                    cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                                                    tooltip: 'Remove selected',
                                                    handler: 'onClearClick'
                                                }
                                            },
                                            bind: {
                                                store: '{storeattachmenttype}'
                                            }
                                        },
                                        '->',
                                        {
                                            xtype: 'button',
                                            text: 'Add',
                                            itemId : 'btnAddDocType',
                                            iconCls: 'fa fa-plus-circle',
                                            handler : 'btnAddDocType_Click'
                                        }
                                    ],
                                    flex: 10,
                                    columns: {
                                        defaults: {
                                            width: 70
                                        },
                                        items: [
                                            {
                                                text: 'Attached To', dataIndex: 'AddlSystemID', itemId: 'attachTo',
                                                editor: {
                                                    xtype: 'combobox',
                                                    forceSelection: true,
                                                    allowBlank: true,
                                                    itemId: 'AddlSystemID',
                                                    bind: {store: '{StoreAttachTo}'},
                                                    matchFieldWidth: false,
                                                    queryMode: 'local',
                                                    displayField: 'Description',
                                                    valueField: 'OutreachEntity'
                                                },
                                                renderer: 'rendererAttachTo'
                                            },
                                            {text: 'In-Out', dataIndex: 'InOut'},
                                            {
                                                text: 'Type', dataIndex: 'AttachmentType',
                                                editor: {
                                                    xtype: 'combobox',
                                                    forceSelection: true,
                                                    allowBlank: true,
                                                    itemId: 'AttachmentType',
                                                    queryMode: 'local',
                                                    bind: {store: '{StoreAttachmentType}'},
                                                    matchFieldWidth: false,
                                                    displayField: 'name',
                                                    valueField: 'value'
                                                },
                                                renderer: 'rendererAttachmentType'
                                            },
                                            {
                                                text: 'Description', dataIndex: 'Subject',
                                                editor: {
                                                    xtype: 'textfield',
                                                    itemId: 'Subject'
                                                }
                                            },
                                            {text: 'Doc ID', dataIndex: 'DocumentID'},
                                            {
                                                text: 'Date Rcvd.',
                                                dataIndex: 'RecieptDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {text: 'Time Rcvd.', dataIndex: 'RecieptTime'},
                                            {
                                                xtype: 'actioncolumn',
                                                hideable: false,
                                                iconCls: 'x-fa fa-file-pdf-o',
                                                tooltip: 'View',
                                                align: 'center',
                                                dataIndex: 'DocumentID',
                                                handler: 'onViewDoc'
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                hideable: false,
                                                iconCls: 'x-fa fa-minus-circle',
                                                tooltip: 'Detach',
                                                align: 'center',
                                                dataIndex: 'DocumentID',
                                                handler: 'onDeleteDoc'
                                            }
                                        ]
                                    },
                                    selType: 'rowmodel',
                                    plugins:
                                        [{
                                            ptype: 'rowediting',
                                            clicksToEdit: 2
                                        }],
                                    dockedItems: [{
                                        xtype: 'pagingtoolbar',
                                        bind: {
                                            store: '{storeAttachments}'
                                        },
                                        pageSize: 20,
                                        dock: 'bottom',
                                        displayInfo: true
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            cls:'borderNone',
                            flex: 5,
                            frame : true,
                            layout: {
                                type: 'fit'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar', dock: 'top',
                                    items: [
                                        {xtype: 'tbtext', text: 'Review Notes'},
                                        '->',
                                        {xtype: 'button', text: 'Print Review Notes', iconCls: 'fa fa-sticky-note-o', handler: 'onPrintReviewNotes'}
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'textareafield',
                                    cls:'cdagTextarea',
                                    itemId: 'notesArea',
                                    readOnly: true,
                                    grow: true,
                                    anchor: '100%',
                                    bind: {value: '{notesmodel}'}
                                }

                            ]
                        }

                    ]
                }/*Right side - Doc Type*/
            ]
        },
        {
            xtype : 'panel',
            itemId : 'hdnContainer_CDAGMain',
            hidden : true,
            items : [
                {xtype: 'hidden', itemId: 'hdnDataSource'},
                {xtype: 'label', itemId: 'lblGPICode10', hidden: true},
                {xtype: 'label', itemId: 'lblGPICode14', hidden: true},
                {xtype: 'label', itemId: 'lblGCN', hidden: true},
                {xtype: 'label', itemId: 'lblHICL', hidden: true},
                {xtype: 'label', itemId: 'lblNDC', hidden: true},
                {xtype: 'hidden', itemId: 'hdnNDC', bind: {value: '{cdmodel.NDC}'}},
                {xtype: 'hidden', itemId: 'hidLOB', bind: {value: '{cdmodel.CarrierLobID}'}},
                {xtype: 'hidden', itemId: 'hdnMemberId', bind: {value: '{cdmodel.MemberID}'}},
                {xtype: 'hidden', itemId: 'hidPARecipientID', bind: {value: '{cdmodel.RecipientID}'}},
                {xtype: 'hidden', itemId: 'hiddenRecipientID', hidden: true, bind: {value: '{cdmodel.RecipientID}'}},
                {xtype: 'hidden', itemId: 'hdnCarrierId', bind: {value: '{cdmodel.CarrierID}'}},
                {xtype: 'label', itemId: 'hdnHasManualRcvd', hidden: true},
                {xtype: 'label', itemId: 'hdnManualRcvdDate', hidden: true},
                {xtype: 'hidden', itemId: 'hidMedicarePAQueueAccess'},
                {xtype: 'hidden', itemId: 'hidPAStatus'},
                {xtype: 'hidden', itemId: 'hidPrevNPI', bind: {value: '{cdmodel.PrescriberID}'}},
                {xtype: 'hidden', itemId: 'hdnSendApprovalLetterFlag'},
                {xtype: 'label', itemId: 'hdnSystemID', hidden: true},
                {xtype: 'hidden', itemId: 'hdnInitialDecisionUser', bind: {value: '{cdmodel.InitialDecisionBy}'}},
                {xtype: 'hidden', itemId: 'hdnIntakeDisplayVal', bind: {value: '{cdmodel.InitialDecisionBy}'}},
                {xtype: 'hidden', itemId: 'hdnUrgencyType', bind: {value: '{cdmodel.UrgencyType}'}},
                {xtype: 'hidden', itemId: 'hdnPendDischrgNotify', bind: {value: '{cdmodel.PendDischrgNotify}'}},
                {xtype: 'hidden', itemId: 'hidDisableAfterDecision'},
                {xtype: 'hidden', itemId: 'hdnRequestorDisplayVal', bind: {value: '{cdmodel.PendDischrgNotify}'}},
                {xtype: 'label', itemId: 'hdnIsOverride', hidden :true},
                {xtype: 'hidden', itemId: 'hidIsSendFaxRequired'},
                {xtype: 'hidden', itemId: 'hdnSendDenialLetterFlag'},
                {xtype: 'hidden', itemId: 'hdnSendNLHApprovalFlag'},
                {xtype: 'hidden', itemId: 'hdnSendHIXApprovalLetterFlag'},
                {xtype: 'label', itemId: 'hiddenSaveAttachmentFlag', hidden: true},
                {xtype: 'hidden', itemId: 'hdnLastModified'},
                {xtype: 'label', itemId: 'hiddenDelAttachmentDocIDList', hidden: true},
                {xtype: 'label', itemId: 'hiddenDelAttachmentFlag', hidden: true},
                {xtype: 'label', itemId: 'hiddenAuthID', hidden: true},
                {xtype: 'hidden', itemId: 'hidMHPPhysicians'},
                // ------------------------ Leter Templates hidden fields -----------------------------------------------------------------------
                {xtype: 'hidden', itemId: 'hidPCPID'},
                {xtype: 'hidden', itemId: 'hidPCPName'},
                {xtype: 'hidden', itemId: 'hidPCPFax'},
                {xtype: 'hidden', itemId: 'hidPrescriberFax'},
                {xtype: 'hidden', itemId: 'hidAssignTo'},
                {xtype: 'hidden', itemId: 'hidServiceDate'},
                {xtype: 'hidden', itemId: 'hidHasApprovalAccess'},
                {xtype: 'hidden', itemId: 'hdnIntakeDisplayVal'},
                {xtype: 'hidden', itemId: 'hdnRequestorDisplayVal'},
                {xtype: 'hidden', itemId: 'hdnPlanGroup'},
                {xtype: 'hidden', itemId: 'hdnPlanGroupID'},
                {xtype: 'hidden', itemId: 'hdnInitialDecisionUser'},
                {xtype: 'hidden', itemId: 'hdnUrgencyType'},
                {xtype: 'hidden', itemId: 'IsAuthFromOldModule'}

            ]
        }
    ]

});
