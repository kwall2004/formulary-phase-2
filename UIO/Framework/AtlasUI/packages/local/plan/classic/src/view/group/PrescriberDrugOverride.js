Ext.define('Atlas.plan.view.group.PrescriberDrugOverride', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-prescriberdrugoverride',
    layout: 'border',
    controller: 'planprescriberdrugoverridecontroller',
    itemId: 'plan-prescriberdrugoverride',

    planGroupId: null,
    addedRowsOverrideRules: null,
    prescDrugRuleId: null,
    updatedRows: null,

    listeners: {
        afterrender: 'onLoadPage'
    },

    items: [
        {
            region: 'center',
            flex:3,
            layout: 'fit',
            items:[
                {
                    xtype:'common-shared-editablegrid',
                    reference: 'editGridOverrideRules',
                    /*dialogxtype: {
                     xtype: 'panel',
                     items: [{
                     xtype: 'button',
                     text: 'hello'
                     }]
                     },*/
                    viewModel: {
                        type: 'common-shared-editgridmodel',

                        data:{
                            //note: this needs to move to controller with user permissions
                            userpermissions: {
                                create: true,
                                //update: true,
                                destroy: true
                            },
                            minDate: null,
                            maxDate: null
                        },
                        stores: {
                            overrideRules: {
                                model:'Atlas.plan.model.PrescriberDrugOverrideModel'
                            },

                            excludedPlanBenefit: {
                                model: 'Atlas.plan.model.ExcludedPlanBenefit'
                                //autoLoad: true
                            }
                        }
                    },
                    controller: 'planprescriberdrugoverridecontroller',
                    title: 'Prescriber Drug Override Rules',
                    reference: 'gridOverrideRules',
                    plugins: [{
                        ptype: 'rowediting',
                        triggeredEvent: 'celldblclick',
                        // removeUnmodified: true,
                        id: 'planOverrideRulesRowEdit',
                        listeners: {
                            edit: 'editRow',
                            canceledit: 'cancelEdit'
                        }
                    }],
                    selModel: {
                        mode: 'MULTI'
                    },
                    bind: {
                        store: '{overrideRules}'
                    },
                    listeners: {
                        // select: 'selectOverrideRules'
                        cellclick: 'selectOverrideRules'
                    },
                    columns:[{
                        text: 'System ID',
                        flex: 1,
                        dataIndex: 'systemID',
                        hidden: true
                    }, {
                        text: 'Plan Group ID',
                        flex: 1,
                        dataIndex: 'PlanGroupId',
                        hidden: true
                    }, {
                        text: 'Rule Id',
                        flex: 1,
                        dataIndex: 'PrescDrugOverrideRuleID'
                    }, {
                        text: 'Rule Name',
                        flex: 1,
                        editor:{
                            allowBlank: false
                        },
                        dataIndex: 'PrescDrugOverrideRuleName'
                    }, {
                        text: 'Effective Date',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        flex: 1,
                        editor: {
                            allowBlank: false,
                            xtype: 'datefield',
                            /*listeners: {
                                expand: function(datefield){
                                    var grid = this.up('[reference = gridOverrideRules]'),
                                        //selectedRow = grid.getSelectionModel().getSelection()[0],
                                        termDate = grid.down('[reference = termDate]').getEditor().getValue();

                                    datefield.setMaxValue(termDate);
                                }
                            }*/
                            bind: {
                                maxValue: '{maxDate}',
                                value: '{minDate}'
                            }
                        },
                        dataIndex: 'EffectiveDate',
                        renderer: 'renderDates'
                    }, {
                        text: 'Termination Date',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        flex: 1,
                        editor: {
                            xtype: 'datefield',
                            /*listeners: {
                                expand: function(datefield){
                                    var grid = this.up('[reference = gridOverrideRules]'),
                                        effDate = grid.down('[reference = effDate]').getEditor().getValue();

                                    datefield.setMinValue(effDate);
                                }
                            }*/
                            bind: {
                                minValue: '{minDate}',
                                value: '{maxDate}'
                            }
                        },
                        dataIndex: 'TerminationDate',
                        renderer: 'renderDates'
                    }, {
                        text: 'Excluded Plan Benefit',
                        flex: 1,
                        editor: {
                            xtype: 'combobox',
                            bind: {
                                store: '{excludedPlanBenefit}'
                            },
                            displayField: 'planBenefitCode',
                            valueField: 'planBenefitId',
                            queryMode: 'local'
                        },
                        dataIndex: 'exclPlanBenefitId',
                        renderer: function(value, metadata, record, rowIndex, colIndex,store, view){
                            var grid = this;

                            if(value!=0) {
                                /*var storeExcludedPlanBenefit = grid.viewModel._parent.data.planbenefits;
                                if(storeExcludedPlanBenefit!=null ) {
                                    var plnBnfRec = storeExcludedPlanBenefit.findRecord('planBenefitId', value);
                                    if(plnBnfRec !=null) {
                                        var plnBnfCode = plnBnfRec.get('planBenefitCode');
                                        if(plnBnfCode!=null){
                                            return plnBnfCode;
                                        }
                                    }
                                }*/
                                var storeExcludedPlanBenefit = grid.getViewModel().getStore('excludedPlanBenefit'),
                                    excludedPlanBenefitId = storeExcludedPlanBenefit.findRecord('planBenefitId', value, 0, false, true, true);

                                if (excludedPlanBenefitId){
                                    return excludedPlanBenefitId.get('planBenefitCode');
                                }
                            }
                        }
                    }]
                }
            ]
        },
        {
            region: 'south',
            layout:'hbox',
            split: 'true',

            flex:2,
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Save',
                        itemId: 'planDrugOverrideSave',
                        iconCls: 'x-fa fa-floppy-o',
                        disabled: true,
                        handler: 'saveBtn'
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        iconCls: 'x-fa fa-times',
                        disabled: true,
                        handler: 'cancelBtn'
                    }]
            }],
            defaults: {
                controller: 'planprescriberdrugoverridecontroller'
            },
            items:[
                {
                    xtype:'common-shared-editablegrid',
                    reference: 'editGridSpecPresc',
                    layout: 'fit',
                    height: '100%',
                    gridDrugOverrideRuleId: null,
                    viewModel: {
                        type: 'common-shared-editgridmodel',
                        data:{
                            //note: this needs to move to controller with user permissions
                            userpermissions: {
                                create: true,
                                //update: true,
                                destroy: true
                            }
                        },
                        stores: {
                            specPresc: {
                                model: 'Atlas.plan.model.DrugOverrideNPIXref'
                            },

                            specList: {
                                model: 'Atlas.plan.model.SpecialityList',
                                autoLoad: true
                            }
                        }
                    },
                    controller: 'planprescriberdrugoverridecontroller',
                    plugins: [{
                        ptype: 'rowediting',
                        triggeredEvent: 'celldblclick',
                        //removeUnmodified: true,
                        id: 'planSpecPrescRowEdit',
                        autoCancel: true,
                        listeners: {
                            edit: 'editRow',
                            validateedit: 'disablePrescriberName',
                            beforeedit: 'enablePrescriberName',
                            canceledit: 'cancelEdit'
                        }
                    }],
                    title: 'Specialty ~ Prescribers',
                    flex:1,
                    bind: {
                        store: '{specPresc}'
                    },
                    //scrollable: 'vertical',
                    columns:[{
                        text: 'System ID',
                        flex: 1,
                        hidden: true,
                        dataIndex: 'systemId'
                    },{
                        text: 'Specialty Name',
                        flex: 1,
                        dataIndex: 'specialtyName',
                        editor: {
                            xtype: 'combobox',
                            displayField: 'speciality',
                            valueField: 'speciality',
                            queryMode: 'local',
                            bind: {
                                store: '{specList}'
                            }
                        }
                    }, {
                        text: 'Prescriber NPI',
                        flex: 1,
                        dataIndex: 'NPI',
                        editor: {
                            xtype: 'prescribertypeahead',
                            allowBlank: false,
                            itemId: 'prescriberTypeAhead',
                            listConfig: {
                                getInnerTpl: function(){
                                    return '<h4>{fullname}</h4>' +
                                        '<h5>NPI: <span>{npi}</span></h5>'
                                }
                            },
                            displayField: 'npi',
                            listeners: {
                                select: 'selectCbxVal'
                            }
                        }
                    }, {
                        text: 'Prescriber Name',
                        flex: 1,
                        dataIndex: 'prescriberName',
                        editor: {
                            xtype: 'textfield',
                            disabled: true
                        }
                    }]
                },
                {
                    xtype:'common-shared-editablegrid',
                    reference: 'editGridDrugOverride',
                    layout: 'fit',
                    height: '100%',
                    gridDrugOverrideRuleId: null,
                    viewModel: {
                        type: 'common-shared-editgridmodel',
                        data:{
                            //note: this needs to move to controller with user permissions
                            userpermissions: {
                                create: true,
                                //update: true,
                                destroy: true
                            }
                        },
                        stores: {
                            drugOverride: {
                                model: 'Atlas.plan.model.DrugOverrideGCNXref'
                            }
                        }
                    },
                    controller: 'planprescriberdrugoverridecontroller',
                    title: 'Drug Override',
                    flex:1,
                    plugins: [{
                        ptype: 'rowediting',
                        triggeredEvent: 'celldblclick',
                        id: 'planDrugOverrideEdit',
                        //removeUnmodified: true,
                        listeners: {
                            edit: 'editRow',
                            beforeedit: 'disableDrugGCN',
                            validateedit: 'enableDrugGCN',
                            canceledit: 'cancelEdit'
                        }
                    }],
                    bind: {
                        store: '{drugOverride}'
                    },
                    //scrollable: 'vertical',
                    columns:[{
                        text: 'Drug GNN',
                        flex: 1,
                        dataIndex: 'GNN60',
                        editor: {
                            xtype: 'drugtypeahead',
                            displayField: 'GNN60',
                            valueField: 'GNN60',
                            allowBlank: false,
                            itemId: 'drugTypeAhead',
                            listConfig: {
                                getInnerTpl: function(){
                                    return '<h5>{GNN60}</h5>' +
                                        '<h5>LN-{LN}, GCN-{GCN_SEQNO}</H5>';
                                }
                            },
                            listeners: {
                                select: 'selectCbxVal'
                            }
                        }
                    }, {
                        text: 'Drug GCN',
                        editor: {
                            xtype: 'textfield',
                            disabled: true
                        },
                        flex: 1,
                        dataIndex: 'GCN_SEQNO'
                    }]
                }
            ]
        }

    ]
});