/**
 * Created by agupta on 10/22/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGWinFax', {
    extend: 'Ext.window.Window',
    xtype: 'cdagwinfax',
    controller: 'cdagwinfaxcontroller',
    title: 'Fax Letter',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: 180,
    width: 520,
    items: [
        {
            xtype: 'form',
            itemId: 'fpFax',
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'panel',
                    columnWidth: 0.3,
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 1,
                            itemId: 'Group2',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    itemId: 'chkPCP',
                                    boxLabel: 'PCP',
                                    listeners : {
                                        change : 'chkPCP_Change'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    itemId: 'chkPrescriber',
                                    boxLabel: 'Prescriber',
                                    listeners : {
                                        change : 'chkPrescriber_Change'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    itemId: 'chkMember',
                                    boxLabel: 'Member',
                                    listeners : {
                                        change : 'chkMember_Change'
                                    }
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    columnWidth: 0.7,
                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax1',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax2',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax3',
                                            maskRe: /[0-9]/,
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtPage1',
                                            maskRe: /[0-9\,]/,
                                            text: '1,2,3,4,5,6',
                                            disabled : true,
                                            emptyText: 'Select Page (e.g. 1,3,4)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax4',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax5',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax6',
                                            maskRe: /[0-9]/,
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtPage2',
                                            maskRe: /[0-9\,]/,
                                            text: '1,2,3,4,5,6',
                                            disabled : true,
                                            emptyText: 'Select Page (e.g. 1,3,4)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax7',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax8',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 50
                                        },
                                        {
                                            xtype: 'displayfield',
                                            text: '-'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtFax9',
                                            maskRe: /[0-9]/,
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            disabled : true,
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtPage3',
                                            maskRe: /[0-9\,]/,
                                            disabled : true,
                                            emptyText: 'Select Page (e.g. 1,3,4)'
                                        }
                                    ]
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
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'winBtnSendFax',
                iconCls: 'fa fa-save',
                text: 'Send Fax',
                listeners: {
                    click : 'winBtnSendFax_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'winBtnCancel',
                iconCls: 'fa fa-file-o',
                text: 'Cancel',
                handler: 'onCancelClick'
            }
        ]
    }
});

