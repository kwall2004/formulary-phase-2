/**
 * Created by agupta on 9/7/2016.
 */
Ext.define('Atlas.authorization.view.cdag.ExternalReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'externalreview',
    controller: 'externalreviewcontroller',
    viewModel: 'externalreviewviewmodel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: '100%',
    width: '100%',
    items: [
        {
            xtype: 'grid',
            itemId: 'ExternalReviewGrid',
            flex: 5,
            selectionModel : {
                singleSelect : true
            },
            columns: {
                items: [
                    {text: 'Reviewer', dataIndex: 'ReviewerDisplay', width: 200},
                    {text: 'Medicare Appeal Number', dataIndex: 'MCRAppealNum', width: 180},
                    {text: 'Date Forwarded', dataIndex: 'DateForwarded', width: 150},
                    {text: 'Reason', dataIndex: 'ReasonDisplay', width: 200},
                    {text: 'Letter Sent To Member Date', dataIndex: 'LetterSentDate', width: 200},
                    {text: 'Decision', dataIndex: 'DecisionDisplay', width: 150},
                    {text: 'Decision Date', dataIndex: 'DecisionDate', width: 120}
                ]
            },
            listeners: {
                itemclick: 'gridRowSelected'
            },
            bind: '{storeexternalreviewlist}'

        }, /*Grid*/
        {
            xtype: 'form',
            region: 'center',
            itemId : 'formExternalReview',
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
                            labelWidth: 170,
                            width: '85.5%'
                        }
                    },
                    items:[
                        {
                            title: 'Review',
                            iconCls: 'x-fa fa-pencil-square-o',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxReason',
                                    fieldLabel: 'Reason',
                                    displayField: 'name',
                                    valueField: 'value',
                                    allowBlank: false,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    name: 'Reason',
                                    bind: {
                                        store: '{storereviewreason}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Determination',
                                    itemId: 'cbxCDRD',
                                    displayField: 'Description',
                                    valueField: 'OutreachEntity',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    name: 'ParentSystemID',
                                    listConfig: {
                                        getInnerTpl: function () {
                                            var tpl = '<div>' +
                                                '<b>Type:</b> {Description}<br/>' +
                                                '<b>Status:</b> {AppealStatus}' +
                                                '</div>';
                                            return tpl;
                                        }
                                    },
                                    bind: {
                                        store: '{storecdrd}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxExternalReviewer',
                                    fieldLabel: 'External Reviewer',
                                    displayField: 'name',
                                    valueField: 'value',
                                    allowBlank: false,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    name: 'ExternalReviewType',
                                    bind: {
                                        store: '{storerereviewtype}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Medicare Appeal Number',
                                    name: 'MCRAppealNum',
                                    itemId: 'txtMedicareAppreal'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date Forwarded',
                                            itemId: 'dtForwardedDate',
                                            allowBlank: false,
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                            width : 320,
                                            maxText: "The Date in this Field must be on or before {0}"
                                        }
                                        , {
                                            xtype: 'textfield',
                                            itemId: 'tForwardedTime',
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
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxForwardedDateAmPm',
                                            allowBlank: false,
                                            width : 72,
                                            store: ['AM', 'PM']
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtLetterSentDate',
                                            fieldLabel: 'Letter sent To Member Date',
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                            width : 320,
                                            maxText: "The Date in this Field must be on or before {0}"
                                        }
                                        , {
                                            xtype: 'textfield',
                                            itemId: 'tLetterSentTime',
                                            width : 100,
                                            enableKeyEvents: true,
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
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxLetterSentAmPm',
                                            width : 72,
                                            store: ['AM', 'PM']
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxDecision',
                                    fieldLabel: 'Decision',
                                    displayField: 'ListDescription',
                                    valueField: 'ListItem',
                                    queryMode: 'local',
                                    name: 'Decision',
                                    bind: {
                                        store: '{storereviewdecision}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtDecisionDate',
                                            fieldLabel: 'Decision Date',
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                            width : 320,
                                            maxText: "The Date in this Field must be on or before {0}"
                                        }
                                        , {
                                            xtype: 'textfield',
                                            itemId: 'tDecisionTime',
                                            width : 100,
                                            enableKeyEvents: true,
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
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxDecisionAmPm',
                                            width : 72,
                                            store: ['AM', 'PM']
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    region: 'center',
                    flex : 7,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        cls: 'card-panel',
                        flex: 1,
                        defaults: {
                            labelWidth: 100,
                            width: 550
                        }
                    },
                    items:[
                        {
                            title: 'Notes',
                            iconCls: 'x-fa fa-sticky-note-o',
                            items: [
                                {
                                    xtype: 'textarea',
                                    fieldLabel: 'Notes',
                                    itemId: 'taNotes',
                                    multiLine: true,
                                    allowBlank: false,
                                    height: 120,
                                    padding: 0
                                },
                                {
                                    xtype: 'reasontypeahead',
                                    fieldLabel: 'Reason',
                                    minChars: 1,
                                    itemId: 'cbxNotesReason'
                                }
                            ]
                        }

                    ]
                }
            ]

        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hdnRecordAction'},
                {xtype: 'hidden', itemId: 'hdnRowSelected'},
                {xtype: 'hidden', itemId: 'hdnSaveDocList'},
                {xtype: 'hidden', itemId: 'hdnSaveDescList'},
                {xtype: 'hidden', itemId: 'hdnPrntHidMedicarePAQueueAccess'},
                {xtype: 'hidden', itemId: 'hdnPrntHidLOB'},
                {xtype: 'hidden', itemId: 'hdnPlanGroupID'}
            ]
        }
    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        style: {borderColor: 'black', borderStyle: 'solid'},
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'btnCreate',
                text: 'Create',
                iconCls: 'fa fa-plus-circle',
                listeners: {
                    click: 'btnCreate_Click'
                }
            }
            , '-',
            {
                xtype: 'button',
                text: 'Edit',
                itemId: 'btnEdit',
                iconCls: 'fa fa-user-md',
                listeners: {
                    click: 'btnEdit_Click'
                }
            }

            , '-',
            {
                xtype: 'button',
                text: 'Save',
                itemId: 'btnSave',
                iconCls: 'fa fa-save',
                listeners: {
                    click: 'btnSave_Click'
                }
            }
            , '-',
            {
                xtype: 'button',
                text: 'Cancel',
                itemId: 'btnCancel',
                iconCls: 'fa fa-close',
                listeners: {
                    click: 'btnCancel_Click'
                }
            }
            , '-',
            {
                xtype: 'button',
                text: 'Delete',
                itemId: 'btnDelete',
                iconCls: 'fa fa-minus-circle',
                listeners: {
                    click: 'btnDelete_Click'
                }
            }

        ]
    }
});