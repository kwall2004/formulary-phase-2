/**
 * This Class represents the Training Tab of the Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.Training', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-training',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
                    title: 'Annual Training Information',
                    reference: 'pharmaTrainingFormref',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'top'
                    },
                    defaults: {
                        width: 400,
                        labelWidth: 170,
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Training Type',
                            padding: '20 0 0 5',
                            name: 'trainingType',

                            allowBlank: false,
                            bind: {
                                store: '{trainingtypelist}'
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Completion Date',
                            name: 'completeDate',
                            format : 'm/d/Y'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Representative Name',
                            allowBlank: false,
                            name: 'repName'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Phone Number',
                            allowBlank: false,
                            emptyText: '(xxx)xxx xxxx',
                            name: 'repPhone',
                            maskRe: /[0-9]/,
                            maxLength: 14,
                            enforceMaxLength: 14,
                            minLength: 14,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function (e) {
                                    var val = e.rawValue;
                                    this.setValue(Atlas.common.Util.formatPhone(val));
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Fax Number',
                            emptyText: 'xxx-xxx-xxxx',
                            maskRe: /[0-9]/,
                            maxLength: 12,
                            name: 'repFax',
                            enableKeyEvents: true,
                            enforceMaxLength: 12,
                            minLength: 12,
                            listeners: {
                                keyup: function (e) {
                                    var val = e.rawValue;
                                    this.setValue(Atlas.common.Util.formatfax(val));
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Email Address',
                            allowBlank: false,
                            name: 'repEmail',
                            regex: /^([\w\-\’\-]+)(\.[\w\-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/
                        }
                    ]


                },

                {
                    xtype: 'panel',
                    title: 'Annual Training History',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            defaults: {
                                flex: 1
                            },
                            xtype: 'grid',
                            reference: 'gridTrainingFormref',
                            margin: 20,
                            bind: {
                                store: '{pharmtraining}'
                            },

                            columns: [
                                {text: 'Source', dataIndex: 'source'},
                                {text: 'Training Type', dataIndex: 'trainingType'},
                                {
                                    text: 'Completion Date',
                                    dataIndex: 'completeDate',
                                    xtype: 'datecolumn',
                                    format: 'm/d/Y',
                                    filter: {type: 'date'}
                                },
                                {text: 'Representative Name', dataIndex: 'repName'},
                                {text: 'Phone Number', dataIndex: 'repPhone'},
                                {text: 'Fax Number', dataIndex: 'repFax'},
                                {text: 'Email', dataIndex: 'repEmail'}
                            ],
                            listeners: {
                                rowclick: 'grdPharmTrngRowClick'
                            },
                            dockedItems: [
                                {
                                    dock: 'bottom',
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true,
                                    pageSize: 24
                                }]
                        }
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
                    text: 'Add',

                    bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'doTrainingAdd',
                    formBind: true
                },
                {
                    text: 'Save',
                    reference: 'btnSaveRef',
                    bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'doTrainingSave',
                    formBind: true
                },
                {
                    text: 'Cancel',
                    reference: 'btnCanRef',
                    bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'doTrainingCancel'
                }
            ]
        }
    ]
});