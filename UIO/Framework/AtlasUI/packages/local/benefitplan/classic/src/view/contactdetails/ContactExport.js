/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.contactdetails.ContactExport', {
    extend: 'Ext.window.Window',
    title: 'Contact Export',
    controller: 'ContactExportController',

    height: '50%',
    width: '70%',
    scrollable: true,
    itemId: 'BenefitPlanNew',
    name:'CreateBenefitPlan',
    closable: false,
    draggable: false,
    resizable: false,
    modal: true,

    viewModel: {
        data: {
            changed: false,
            TenantFamSK : 0,
            TenantFamName: "",
            HideTenantFam: false,
             TenantSK: 0,
            HideTenant: false,
             TenantName: "",
             AcctSK: 0,
             AcctName: "",
            HideAcct: false,
             GrpSK: 0,
             GrpName: "",
            HideGrp: false,
             PopGrpSK: 0,
             PopGrpName: "",
            HidePopGrp: false
        },
        stores: {
            BreadCrumb: {
                model: 'Atlas.benefitplan.model.BreadCrumb',
                sorters: 'BnftPlanTypeDesc',
                asynchronusLoad: false,
                autosync: false,
                autoload: false
            }

        }
    },
    bbar: [
        '->',
        {
        text: 'Cancel',
        handler: 'onCancelClick'
        }
    ],
    items: [
        {
            xtype: 'fieldset',
            title: 'Contact Export',
            defaults: {
                labelWidth: 90,
                anchor: '100%',
                layout: 'hbox'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Selections',
                    defaults: {
                        labelWidth: 90,
                        anchor: '100%',
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype      : 'fieldcontainer',
                            defaultType: 'checkboxfield',
                            defaults: {
                                flex: 1
                            },
                            layout: 'vbox',
                            items: [
                                {
                                    xtype:'button',
                                    text  : 'Select All',
                                    name      : 'Export Button',
                                    handler :'onSelectAllClick'
                                },
                                {
                                    checked: true,
                                    name: 'TenantFamSK',
                                    bind: {boxLabel:'Tenant Family: {TenantFamName}', hidden: '{HideTenantFam}', value : '{!HideTenantFam}'},
                                    reference: 'TenantFamExportCombo'

                                }, {
                                    name      : 'Tenant',
                                    bind: {boxLabel:'Tenant: {TenantName}',hidden : '{HideTenant}',value : '{!HideTenant}'},
                                    reference: 'TenantExportCombo'
                                },
                                {
                                    name      : 'Acct',
                                    bind: {boxLabel:'Account: {AcctName}',hidden : '{HideAcct}',value : '{!HideAcct}'},
                                    reference: 'AcctExportCombo'
                                },
                                {
                                    name      : 'Grp',
                                    bind: {boxLabel:'Group: {GrpName}',hidden : '{HideGrp}', value : '{!HideGrp}'},
                                    reference: 'GrpExportCombo'
                                },
                                {
                                    name      : 'PopGrp',
                                    checked: true,
                                    bind: {boxLabel:'Population Group: {PopGrpName}',hidden : '{HidePopGrp}', value: '{!HidePopGrp}'},
                                    reference: 'PopGrpExportCombo'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Export Format',
                    defaults: {
                        labelWidth: 90,
                        anchor: '100%',
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype      : 'fieldcontainer',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {   xtype: 'combobox',
                                    fieldLabel  : 'Export to:',
                                    labelWidth : 50,
                                    name      : 'Export Format',
                                    store: {
                                        data: [['PDF', 'PDF'],
                                            ['EXCELOPENXML', 'Excel']],
                                        fields: ['value', 'text']
                                    },
                                    valueField: 'value',
                                    value: 'PDF',
                                    displayField : 'text',
                                    editable: false,
                                    selectOnFocus: false,
                                    reference: 'contactExportFormatCombo'
                                }, {
                                    xtype:'button',
                                    text  : 'Export',
                                    name      : 'Export Button',
                                    handler :'onExportClick'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});