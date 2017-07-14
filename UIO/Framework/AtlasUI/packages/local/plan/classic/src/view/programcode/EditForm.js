Ext.define('Atlas.plan.view.programcode.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-programcode-editform',
    layout: 'hbox',
    reference: 'editorForm',
    defaults: {
        layout: 'vbox',
        flex: 1
    },
    items: [
        // start top content section ------------------------------------------------------------
        {
            defaults: {
                labelWidth: 180,
                flex: 1,
                xtype: 'textfield',
                minWidth: 240
            },
            items: [
                {
                    fieldLabel: 'Plan Group Name',
                    xtype: 'textfield',
                    name: 'planGroupName',
                    allowBlank: false
                }, {
                    fieldLabel: 'Plan Benefit Name',
                    name: 'planBenefitName',
                    allowBlank: false
                }, {
                    fieldLabel: 'Program Group Code',
                    name: 'progGroupCode',
                    allowBlank: false
                }, {
                    fieldLabel: 'Program Benefit Code',
                    name: 'progBenefitCode',
                    allowBlank: false
                }, {
                    fieldLabel: 'Program Code Description',
                    name: 'progDescription',
                    allowBlank: false
                }

            ]
        },
        {
            xtype: 'panel',
            defaults: {
                labelWidth: 200,
                flex: 1,
                xtype: 'textfield',
                minWidth: 240
            },
            items: [
                {
                    fieldLabel: 'Effective Date',
                    name: 'effDate',
                    bind: '{gridRecord.effDate}',
                    xtype: 'datefield',
                    vtype: 'daterange',
                    startDateField: 'effDate',

                    //endDateField: 'termDate', // id of the end date field
                    allowBlank: false
                }, {
                    fieldLabel: 'Termination Date',
                    name: 'termDate',
                    //emptyText: 'Leave blank for never',
                    bind: '{gridRecord.termDate}',
                    xtype: 'datefield',
                    vtype: 'daterange',
                    endDateField: 'termDate',
                    //startDateField: 'effDate', // id of the start date field
                    allowBlank: true
                }, {
                    fieldLabel: 'Accumulator Reset Date',
                    name: 'benefitResetDate',
                    emptyText: 'format mm/dd',
                    xtype: 'datefield',
                    allowBlank: false
                }, {
                    fieldLabel: 'Riders',
                    name: 'groupRiders',
                    allowBlank: false
                }, {
                    fieldLabel: 'Rider Tier Code',
                    name: 'riderTierCodes',
                    allowBlank: false
                }, {
                    fieldLabel: 'Rider Coverage Ma',
                    name: 'riderCovMax',
                    allowBlank: false
                }, {
                    fieldLabel: 'Employee Group Name',
                    name: 'empGroupName',
                    allowBlank: false
                }
            ]
        }
    ]
});