Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.MedicaidMedicalDetail', {
    extend: 'Ext.form.FieldSet',
    title: 'Medicaid Detail',
    alias: 'widget.benefitplan-medicaidmedicaldetail',
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            title: 'Waiver Services ID',
            height: 200,
            reference: 'WaiverContainer',
            viewConfig: {
                loadMask: false
            },
            plugins: [{
                ptype: 'rowediting',
                reference: 'rowediting',
                clicksToEdit: 2,
                clicksToMoveEditor: 1,
                pluginId: 'rowEditing',
                autoCancel: false
            }],
            //model: 'Atlas.benefitplan.model.BenefitPlanWaiverRiders',
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
                //renderer: Ext.ux.util.ComboRenderer,
                renderer: 'getEditorDisplayValue',
                editor: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    emptyText: 'Select',
                    typeAhead: true,
                    displayField: 'WvrRiderCodeDesc',
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
        }
    ]
});
