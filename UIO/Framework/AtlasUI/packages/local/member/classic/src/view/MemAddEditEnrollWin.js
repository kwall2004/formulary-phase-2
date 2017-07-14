/**
 * Created by agupta on 12/12/2016.
 */


Ext.define('Atlas.member.view.MemAddEditEnrollWin', {
    extend: 'Ext.window.Window',
    xtype: 'memaddeditenrollwin',
    itemId : 'WinEnrollment',
    controller: 'memaddeditenrollwincontroller',
    viewModel: 'memaddeditenrollwinviewmodel',
    title: 'Enrollment Details',
    listeners: {
        close: 'winEnrollSaveSuccess'
    },
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //height: 200,
    //width: 350,
    items: [
        {
            xtype: 'form',
            layout: 'hbox',
            itemId: 'formWinEnrollment',
            items: [
                {
                    xtype: 'fieldset',title:'Member Enrollment',
                    itemId: 'flsMemberWin',
                    defaults: {
                        labelWidth: 135,
                        minWidth: 450
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Member Id',
                            itemId: 'txtMemberIDWin',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Plan Group',
                            itemId: 'txtTempPlanGroup',
                            hidden: true,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'txtTempPlanGroup_Keyup'
                            }

                        },
                        {
                            xtype: 'plangrouptypeahead',
                            fieldLabel: 'Plan Group',
                            itemId: 'cmbSearchPlanGroupsWin',
                            listeners: {
                                select: 'onPlanSelection_Win'
                            },
                            displayField: 'planGroupName',
                            valueField: 'planGroupId',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Plan Benefit',
                            itemId: 'cmbSearchPlanBenefitWin',
                            displayField: 'planBenefitCode',
                            valueField: 'planBenefitId',
                            listeners: {
                                select: 'onBenefitSelection_Win'
                            },
                            bind: {
                                store: '{PlanBenefitStore}'
                            },
                            allowBlank: false
                        },
                        {xtype: 'textfield', fieldLabel: 'HICN', itemId: 'txtHICNWin'},
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Effective Date',
                            itemId: 'effDateWin',
                            allowBlank: false,
                            format : 'm/d/Y'
                        },
                        {xtype: 'datefield', fieldLabel: 'Termination Date', itemId: 'TermDateWin',
                            format : 'm/d/Y'},
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Relationship',
                            itemId: 'cbxRelationshipWin',
                            bind: {store: '{relationshipcodestore}'},
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Program Group Code',
                            itemId: 'cbxMCSProgGroupCodeWin',
                            displayField: 'progDescription',
                            valueField: 'progDescription',
                            listeners: {
                                select: 'onProgramGroupCodeWinSelection'
                            }//,
                            //bind: {
                            //    store: '{storeMCSProgGroupCode}'
                            //}
                        },
                        {xtype: 'textfield', fieldLabel: 'Person Code', itemId: 'txtPersonCodeWin'},
                        {xtype: 'displayfield', fieldLabel: 'Primary Recipient', itemId: 'lblPrimaryRecipientWin'}

                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'flsAltIns',title:'Alternate Insurance',
                    defaults: {
                        labelWidth: 150
                    },
                    items: [
                        {xtype: 'checkbox', fieldLabel: 'Alt Ins Indicator', itemId: 'chkAltInsIndWin',handler:'onAltInsIndicatorChange'},
                        {xtype: 'textfield', fieldLabel: 'Alt Ins ID', itemId: 'txtAltInsIdWin'},
                        {xtype: 'textfield', fieldLabel: 'Alt Ins Carrier Name', itemId: 'txtAltInsNameWin'},
                        {xtype: 'datefield', fieldLabel: 'Alt Ins Effective Date', itemId: 'dtAltInsEffDateWin',format : 'm/d/Y'},
                        {xtype: 'datefield', fieldLabel: 'Alt Ins Termination Date', itemId: 'dtAltInsTermDateWin',
                            format : 'm/d/Y'}
                    ]
                }
            ]
        }

    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'btnSaveWin',
                    iconCls: 'fa fa-save',
                    handler: 'btnSaveWinEnroll_Click',
                    params: {
                        source: 'WinEnrollment'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'btnCancelWin',
                    text: 'Cancel',
                    iconCls: 'fa fa-remove',
                    listeners: {
                        click: 'btnCancelWinEnroll_Click'
                    }
                }
            ]
        }
    ]
});
