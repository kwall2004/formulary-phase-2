Ext.define('Atlas.macprice.view.MacGeneralInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.MacGeneralInfo',
    title: 'Mac General Information',
    controller: 'MacGeneralInfoController',
    cls: 'mClaimTest',

    layout: {
        type: 'border'
    },

    itemId: 'MacGeneralInfo',

    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        style: {borderColor: 'gray', borderStyle: 'solid'},
        items: [
            '->'
            , {
                xtype: 'button',
                itemId: 'btnCreate',
                text: 'Create',
                iconCls: 'x-fa fa-plus-square',
                handler: 'onCreateMacList'
            }
            , '-'
            , {
                xtype: 'button',
                itemId: 'btnSave',
                text: 'Save',
                iconCls: 'x-fa fa-save',
                handler: 'onSaveMacList'
            },
            '-',
            {
                xtype: 'button',
                itemId: 'btnCancel',
                text: 'Cancel',
                iconCls: 'x-fa fa-close',
                handler: 'onCancelList'
            }
        ]
    },

    items: [
        {
            xtype: 'panel',
            region: 'center',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'form',
                    itemId: 'MacInfo',
                    cls: 'borderNone',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        cls: 'card-panel',
                        flex: 1,
                        defaults: {
                            labelWidth: 150,
                            width: 400
                        }
                    },
                    items: [
                        {
                            title: 'MAC Info',
                            cls: 'borderNone',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'MAC List Name',
                                    itemId: 'MACListName',
                                    name: 'MACListName',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    fieldLabel: 'Base MAC List',
                                    itemId: 'BaseMACList',
                                    name: 'baseMACListID',
                                    emptyText: ' Base MAC List',
                                    forceSelection: true,
                                    bind: {store: '{BaseMacList}'},
                                    displayField: 'MACListName',
                                    valueField: 'MACListID'
                                },
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    fieldLabel: 'Clinical Data Source',
                                    itemId: 'ClinicalDataSource',
                                    name: 'DataSource',
                                    allowBlank: false,
                                    forceSelection: true,
                                    emptyText: ' Data Source',
                                    bind: {store: '{ClinicalDataSource}'},
                                    displayField: 'name',
                                    valueField: 'value',
                                    listeners: {
                                        select: 'EnableMDBPanel'
                                    }
                                },
                                {
                                    xtype: 'tagfield',
                                    queryMode: 'local',
                                    fieldLabel: 'Include Drug Type(s)',
                                    itemId: 'IncludeDrugType',
                                    name: 'IncDrugTypes',
                                    emptyText: ' Drug Type',
                                    forceSelection: true,
                                    bind: {store: '{IncludeDrugType}'},
                                    displayField: 'name',
                                    valueField: 'value',
                                    multiSelect: true,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 150,
                                        width: 220
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'AWP Discount',
                                            itemId: 'AWPDiscount',
                                            name: 'AWPDiscountPct',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 150,
                                        width: 220
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'WAC Discount',
                                            itemId: 'WACDiscount',
                                            name: 'WACDiscountPct',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 150,
                                        width: 220
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Mark Up',
                                            itemId: 'MarkUpPct',
                                            name: 'MarkUpPct',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Effective Date',
                                    itemId: 'EffectiveDate',
                                    name: 'EffectiveDate',
                                    allowBlank: false,
                                    format: 'm/d/Y',
                                    width: 300
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Version',
                                    itemId: 'Version',
                                    name: 'MACListVersion'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Current Status',
                                    itemId: 'CurrentStatus',
                                    name: 'Stat'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Termination Date',
                                    itemId: 'TerminationDate',
                                    name: 'TerminationDate',
                                    renderer: function (record) {
                                        return Ext.Date.format(record, 'm/d/Y');
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Created Date',
                                    itemId: 'CreatedDate',
                                    name: 'CreatedDate',
                                    renderer: function (record) {
                                        return Ext.Date.format(record, 'm/d/Y');
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Created By',
                                    itemId: 'CreatedBy',
                                    name: 'CreatedBy'
                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'form',
                    itemId: 'MacAlert',
                    cls: 'borderNone',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        cls: 'card-panel',
                        flex: 1,
                        defaults: {
                            labelWidth: 150
                        }
                    },
                    items: [
                        {
                            title: 'MAC Alerts',
                            cls: 'borderNone',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Alert if AWP drops by',
                                            itemId: 'AWPDropsBy',
                                            name: 'AWPBelowAlert',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Alert if AWP rises by',
                                            itemId: 'AWPRisesBy',
                                            name: 'AWPAboveAlert',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Alert if WAC drops by',
                                            itemId: 'WACDropsBy',
                                            name: 'WACBelowAlert',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Alert if WAC rises by',
                                            itemId: 'WACRisesBy',
                                            name: 'WACAboveAlert',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '%'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'New Drug Alert Delay',
                                            itemId: 'NewDrugAlert',
                                            name: 'NewDrugAlertDelay',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            allowDecimals: false,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '(Months)'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 170,
                                        width: 240
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Inactive Drug Alert Delay',
                                            itemId: 'InactiveDrugAlert',
                                            name: 'InactiveDrugAlertDelay',
                                            minValue: 0,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            allowDecimals: false,
                                            hideTrigger: true
                                        },
                                        {xtype: 'displayfield', value: '(Months)'}
                                    ]
                                },

                                {xtype: 'hidden', itemId: 'systemID', name: 'systemID'},
                                {xtype: 'hidden', itemId: 'MACListID', name: 'MACListID'}
                            ]
                        }
                    ]

                }
            ]
        }

    ]

});