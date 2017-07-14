/** ... ***/
Ext.define('Atlas.letter.view.CreateEditLetter', {
    extend: 'Ext.form.Panel',
    xtype: 'CreateEditLetter',
    title: 'Create/Edit Letters',
    controller: 'createeditletterctrl',
    viewModel: 'createeditlettervm',
    itemId: 'CreateEditLetterMainView',
    layout: 'border',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'uxsearchfield',
                    itemId: 'uiLetterID',
                    reference: 'searchfield',
                    width: 180,
                    maskRe: /[0-9]/,
                    emptyText: '[Letter ID]',
                    listeners: {
                        search: 'onClickSearch'
                    },
                    bind: {
                        value: '{vmLetterID}',
                        readOnly: '{vmUIActivation.inputs.cbxLetterId.isReadOnly}'
                    }

                },
                {
                    text: 'Advanced Search',
                    handler: 'onAdvancedSearch'
                }
            ]
        }
    ],
    items: [
        {
            region: 'west',
            removePanelHeader: true,
            title: 'Info',
            width: 250,
            split: true,
            collapsible: true,
            scrollable: true,
            defaults: {
                collapsible: true
            },
            items: [
                {xtype: 'XTClaimInfo', title: 'Claim Info', iconCls: 'x-fa fa-folder'},
                {xtype: 'XTMedicationInfo', title: 'Medication', iconCls: 'x-fa fa-medkit'},
                {xtype: 'XTMemberInfo', title: 'Member', iconCls: 'x-fa fa-user'},
                {xtype: 'XTPrescriberInfo', title: 'Prescriber', cls:'icon-prescriber'},
                {xtype: 'XTPCPInfo', title: 'PCP', iconCls: 'x-fa fa-tag'},
                {xtype: 'XTPharmacyInfo', title: 'Pharmacy', iconCls: 'x-fa fa-medkit', collapsed: true}
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            iconCls: 'x-fa fa-folder',
                            tooltip: 'View Claims',
                            tooltipType: 'title',
                            handler: 'openClaimsModule',
                            bind: {
                                disabled: '{vmUIActivation.bottomToolbar.links.viewClaims.isDisabled}'
                            }
                        },
                        {
                            iconCls: 'x-fa fa-user',
                            tooltip: 'View Member',
                            tooltipType: 'title',
                            handler: 'openMemberModule',
                            bind: {
                                disabled: '{vmUIActivation.bottomToolbar.links.viewMember.isDisabled}'
                            }
                        },
                        {
                            iconCls: 'x-fa fa-user-md',
                            tooltip: 'View Prescriber',
                            tooltipType: 'title',
                            handler: 'openPrescriberModule',
                            bind: {
                                disabled: '{vmUIActivation.bottomToolbar.links.viewPrescriber.isDisabled}'
                            }
                        },
                        {
                            iconCls: 'x-fa fa-tag',
                            tooltip: 'View PCP',
                            tooltipType: 'title',
                            handler: 'openPCPModule',
                            bind: {
                                disabled: '{vmUIActivation.bottomToolbar.links.viewPCP.isDisabled}'
                            }
                        },
                        {
                            iconCls: 'x-fa fa-medkit',
                            tooltip: 'View Pharmacy',
                            tooltipType: 'title',
                            handler: 'openPharmacyModule',
                            bind: {
                                disabled: '{vmUIActivation.bottomToolbar.links.viewPharmacy.isDisabled}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Letter Detail',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'xTypeTemplatePlaceHolder',
                            labelWidth: '250',
                            flex: 1,
                            layout: 'fit',
                            margin: 'auto'
                        },
                        {
                            xtype: 'ltrLetterStatusGrid',
                            border: true
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            defaults: {
                                labelWidth: 50
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Letter Type:',
                                    itemId: 'uiLetterType',
                                    allowBlank: true,
                                    displayField: 'LetterName',
                                    valueField: 'LetterNameID',
                                    matchFieldWidth: false,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    bind: {
                                        store: '{lettertypes}',
                                        value: '{vmLetterType}',
                                        readOnly: '{vmUIActivation.inputs.cbxLetterType.isReadOnly}'
                                    },
                                    listeners: {
                                        change: 'onChangeLetterTypes'
                                    }
                                },
                                {
                                    xtype: 'membertypeahead',
                                    fieldLabel: 'Member',
                                    itemId: 'uiCbxMemberName',
                                    name: 'uiCbxMemberName',
                                    bind: {
                                        value: '{vmMemberTypeAhead}',
                                        hidden: '{vmUIActivation.inputs.cbxMemberName.isHidden}'
                                    },
                                    listeners: {
                                        select: 'onSelectLetterMemberTypeAhead'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Claim ID',
                                    name: 'uiTxtClaimID',
                                    itemId : 'uiTxtClaimID',
                                    allowBlank: true,
                                    bind: {
                                        value: '{vmClaimID}',
                                        hidden: '{vmUIActivation.inputs.txtClaimID.isHidden}'
                                    },
                                    listeners: {
                                        specialkey: 'runGetClaimInfo'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'MTM ID',
                                    name: 'uiTxtMTMID',
                                    itemId: 'uiTxtMTMID',
                                    allowBlank: true,
                                    emptyText: '[MTM Case ID]',
                                    maskRe: /[0-9]/,
                                    enableKeyEvents: true,
                                    bind: {
                                        value: '{vmMTMID}',
                                        hidden: '{vmUIActivation.inputs.txtMTMID.isHidden}'
                                    },
                                    listeners: {
                                        specialkey: 'onBlurMTMID',
                                        blur: 'onBlurMTMID_Blur'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Plan Group:',
                                    itemId: 'uiPlanGroupList',
                                    blankText: 'Plan Group is required',
                                    displayField: 'planGroupName',
                                    valueField: 'planGroupId',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    bind: {
                                        value: '{vmPlanGroupID}',
                                        hidden: '{vmUIActivation.inputs.cbxPlanGroupList.isHidden}',
                                        store: '{plangrouplistdata}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'UCF Claim ID',
                                    name: 'uiTxtUCFClaimID',
                                    itemId: 'uiTxtUCFClaimID',
                                    emptyText: '[UCF ClaimID]',
                                    maskRe: /[0-9]/,
                                    allowBlank: true,
                                    hidden: true,
                                    bind: {
                                        value: '{vmUCFClaimID}',
                                        hidden: '{vmUIActivation.inputs.txtUCFClaimID.isHidden}'
                                    },
                                    listeners: {
                                        specialkey: 'onBlurPaidClaimID'//,
                                        //blur: 'onBlurPaidClaimID_Blur'
                                    }
                                },
                                {
                                    xtype: 'prescribertypeahead',
                                    itemId: 'uiCbxPrescriberName',
                                    fieldLabel: 'Prescriber',
                                    name: 'uiCbxPrescriberName',
                                    emptyText: '[NPI DEA PrescriberName Address]',
                                    displayField: 'fullname',
                                    valueField: 'npi',
                                    hidden: true,
                                    bind: {
                                        value: '{vmPrescriberID}',
                                        hidden: '{vmUIActivation.inputs.cbxPrescriberName.isHidden}'
                                    },
                                    listeners: {
                                        select: 'onSelectPrescriber'
                                    }
                                },
                                '->',
                                {
                                    iconCls: 'x-fa fa-plus',
                                    text: 'Create Letter',
                                    handler: 'onClickCreate',
                                    bind: {
                                        disabled: '{vmUIActivation.topToolbar.btnCreate.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-times-circle',
                                    text: 'Cancel',
                                    handler: 'onClickCancel',
                                    bind: {
                                        disabled: '{vmUIActivation.topToolbar.btnCancel.isDisabled}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Assign To:',
                                    itemId: 'uiAssignTo',
                                    allowBlank: true,
                                    disabled: false,
                                    displayField: 'userName',
                                    valueField: 'userName',
                                    matchFieldWidth: true,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    bind: {
                                        store: '{assigntouserlist}',
                                        value: '{vmOrigAssignToID}'
                                    },
                                    listeners: {
                                        change: 'onChangeAssignToUserList'
                                    }
                                },
                                '->',
                                {
                                    iconCls: 'x-fa fa-floppy-o',
                                    text: 'Save',
                                    handler: 'onClickSave',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-file-pdf-o',
                                    text: 'View',
                                    handler: 'onClickView',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnView.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-check-circle',
                                    text: 'Approve',
                                    handler: 'lookupOptionsValue',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnApprove.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-check-circle',
                                    text: 'Reset Approve',
                                    handler: 'lookupOptionsValue',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled}',
                                        hidden: '{vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-fax',
                                    text: 'Fax',
                                    handler: 'onClickFax',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnFax.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-paper-plane-o',
                                    text: 'Send',
                                    handler: 'onClickSend',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnSend.isDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'x-fa fa-trash',
                                    text: 'Delete',
                                    bind: {
                                        disabled: '{vmUIActivation.bottomToolbar.buttons.btnDelete.isDisabled}'
                                    },
                                    handler: 'onClickDelete'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});