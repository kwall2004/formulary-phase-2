Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.MedicareMedicalDetail', {
    extend: 'Ext.form.FieldSet',
    title: 'Medicare Detail',
    alias: 'widget.benefitplan-medicaremedicaldetail',
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items: [
                {
                    xtype: 'grid',
                    title: 'Waiver Services ID',
                    height: 200,
                    width: 300,
                    reference: 'WaiverContainer',
                    viewConfig: {
                        loadMask: false
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        reference: 'rowediting',
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        pluginId: 'rowEditing',
                        autoCancel: false
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            text: 'Add Waiver ID',
                            handler: 'addWaiverRow',
                            bind: {
                                disabled: '{nooptions}'
                            }
                        }]
                    }],
                    columns: [{
                        dataIndex: 'WvrRiderTypeSK',
                        width: '100%',
                        renderer: 'getEditorDisplayValue',
                        editor: {
                            xtype: 'combobox',
                            queryMode: 'local',
                            emptyText: 'Select',
                            typeAhead: true,
                            displayField: 'WvrRiderCode',
                            valueField: 'WvrRiderTypeSK',
                            bind: {
                                store: '{waivers}'
                            }
                        }
                    }],

                    listeners: {
                        selectionchange: 'onSelectionChange',
                        beforeedit: 'onGridItemStartEdit',
                        canceledit: 'onGridItemCancelEdit',
                        edit: 'onGridItemComplete'
                    }
                },
                {
                    xtype: 'combobox',
                    labelWidth: 165,
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
