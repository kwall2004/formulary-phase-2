/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.costsharemaximums.CostShareMaximums', {
    extend: 'Ext.panel.Panel',
    title: 'Cost Share Maximums',
    controller: 'benefitplan-costsharemaximumscontroller',
    requires: [
        'Ext.form.RadioGroup'
    ],
    modelValidation: true,
    scrollable: true,
        cmbBenefitPlanSK: 0,
        cmbBenefitType: 0,
        LOBName: 0,

    height: '50%',
    width: '70%',
    itemId: 'BenefitPlanNew',
    name:'CreateBenefitPlan',
    closable: true,
    draggable: false,
    atlasId: 2,
    layout: 'border',

    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },

    viewModel: {
        data: {
            changed: false,
            radioValueOnLoad:false,
            gridUpdateFlag: false
        },
        stores: {

            CostShareMaximums: {
              model: 'Atlas.benefitplan.model.CostShareMaximums',
              sorters: 'DeducblCodeDesc',
              asynchronusLoad: false,
              queryMode: 'local',
              autosync: false,
              autoload: false
            }


        }
    },
    items: [
        {
            xtype: 'benefitplan-progress',
            region: 'north',
            itemId: 'thermometerPanel'
        },
        {
            xtype: 'fieldset',
            title: 'Cost Share Configuration',
            region: 'center',
            defaults: {
                labelWidth: 90
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Deductible Detail',
                    defaults: {
                        labelWidth: 90,
                        anchor: '100%',
                        layout: 'hbox'
                    },
                    items: [
                        {
                           xtype: 'radiogroup',
                            reference: 'radioValues',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  : 'Embedded',
                                    name      : 'size',
                                    inputValue: 'Embedded',
                                    id: 'embeddedRadio',
                                    value: true,
                                    handler: 'DeductibleDetailRadioClicked'
                                }, {
                                    boxLabel  : 'Aggregate',
                                    name      : 'size',
                                    inputValue: 'Aggregate',
                                    id: 'aggregateRadio',
                                    value: false,
                                    handler: 'DeductibleDetailRadioClicked'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: 'CostShareMaximumsGrid',
                    reference: 'CostShareMaximumsGrid',
                    minHeight: 200,
                    modelValidation: true,
                    defaults :
                    {
                        sortable: true,
                        filter :
                        {
                            type: 'string'
                        }
                    },
                    viewConfig: {
                        loadMask: false
                    },
                    plugins:[{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        modelValidation: true

                    }],
                    bind :
                    {
                        store: '{CostShareMaximums}'
                    },
                    columns: [
                        {
                            header: 'Deductible Type',
                            text: 'Deductible Type',
                            dataIndex: 'DeducblCodeDesc',
                            flex: 1

                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick',
            bind: {
                disabled: '{!changed}'
            }
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!changed}'
            }
        }
    ]
});