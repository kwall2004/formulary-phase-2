Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.HIXMedicalDetail', {
    extend: 'Ext.form.FieldSet',
    title: 'HIX Detail',
    alias: 'widget.benefitplan-hixmedicaldetail',
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                labelWidth: 155
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'On/Off Exchange',
                    defaultType: 'radio',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'On',
                            name: 'OnHIEInd',
                            inputValue: 'true',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            checked:true
                        },
                        {
                            boxLabel: 'Off',
                            name: 'OnHIEInd',
                            inputValue: 'false',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    maxLength: 80,
                    name: 'HIOSPlanVarntID',
                    fieldLabel: 'HIOS Plan Variant ID',
                    allowBlank: true,
                    listeners: {
                        change: 'onItemChanged'
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'BnftPlanSizeClsfcnTypeSK',
                    fieldLabel: 'Size Classification',
                    forceSelection: true,
                    allowBlank: true,
                    minChars: 0,
                    displayField: 'BnftPlanSizeClsfcnCode',
                    valueField: 'BnftPlanSizeClsfcnTypeSK',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        store: '{sizeclassifications}'
                    }
                }
            ]
        }
    ]
});
