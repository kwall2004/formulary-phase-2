Ext.define('Atlas.macprice.view.CustomPriceGeneralInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CustomPriceGeneralInfo',
    title: 'Custom Price General Info',
    controller: 'CustomPriceGeneralInfoController',
    cls: 'mClaimTest',
    layout: {
        type: 'border'
    },

    itemId: 'CustPriceGeneralInfo',

    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        style: {borderColor: 'gray', borderStyle: 'solid'},
        items: [
            '->'
            , {
                xtype: 'button',
                text: 'Create New',
                iconCls: 'fa fa-plus-square',
                menu: [
                    {
                        text: 'Create New Custom Price',
                        value: 'MacGeneralInfo',
                        handler: 'onNewCustomPrice'
                    },
                    {
                        text: 'Create New Version',
                        value: 'MacConfiguration',
                        handler: 'onNewCustomPriceVersion'
                    }
                ]
            }
            , '-'
            , {
                xtype: 'button',
                itemId: 'btnSave',
                text: 'Save',
                iconCls: 'fa fa-save',
                handler: 'onSavePriceList'
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
                    cls: 'borderNone',
                    itemId: 'PriceInfo',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        cls: 'card-panel',
                        flex: 1,
                        defaults: {
                            labelWidth: 160
                        }
                    },
                    items: [
                        {
                            cls: 'borderNone',
                            title: 'Custom Price Info',
                            items: [

                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Custom Price List Name',
                                    itemId: 'CustomPriceListName',
                                    name: 'customPriceName',
                                    allowBlank: false,
                                    width: 450
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'Version',
                                    name: 'customPriceListVersion',
                                    fieldLabel: 'Version'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Current Status',
                                    itemId: 'ListStatus',
                                    name: 'priceStatus',
                                    bind: {
                                        store: '{ListStatus}'
                                    },
                                    forceSelection: true,
                                    width: 350,
                                    valueField: 'value',
                                    displayField: 'text',
                                    listeners: {
                                        select: 'onStatusUpdate'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Effective Date',
                                    itemId: 'EffectiveDate',
                                    name: 'effectiveDate',
                                    renderer: function (record) {
                                        return Ext.Date.format(record, 'm/d/Y');
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Termination Date',
                                    itemId: 'TerminationDate',
                                    name: 'terminationDate',
                                    renderer: function (record) {
                                        return Ext.Date.format(record, 'm/d/Y');
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Updated Date',
                                    itemId: 'UpdatedDate',
                                    name: 'lastModifiedDt',
                                    renderer: function (record) {
                                        return Ext.Date.format(record, 'm/d/Y');
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'UpdateddBy',
                                    name: 'lastModifiedBy',
                                    fieldLabel: 'Updated By'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]


});