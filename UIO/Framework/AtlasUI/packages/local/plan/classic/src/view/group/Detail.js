Ext.define('Atlas.plan.view.group.Detail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-detail',
    title: 'details',

    viewModel: 'plan-group-detail',
    controller: 'plan-group-detail',
    layout: 'border',
    defaults: {
        collapsible: true,
        split: true

    },
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            region: 'center',
            flex: 3,
            layout: 'hbox',
            collapsible: false,
            defaults: {
                flex: 1
            },
            overFlowX:true,
            overFlowY:true,
            autoScroll: true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    //weight: 200,
                    //reference: 'planAction',
                    items: [
                        {
                            xtype: 'displayfield',
                            labelWidth: 90,
                            name: 'carrierName',
                            reference: 'carrierName',
                            submitValue: true,
                            fieldLabel: 'Carrier'

                        },
                        '->',

                        {
                            xtype: 'displayfield',
                            labelWidth: 90,
                            name: 'planGroupStatus',
                            reference: 'plnGroupStatus',
                            itemId:'plnGroupStatus',
                            submitValue: true,
                            renderer: function (value) {
                                if (value == "I") return "Inactive";
                                else if (value == "A") return "Active";
                                else if(value=="null") return "";
                                else

                                    var carrierInfo = this.up('plan-group-detail').lookupReference('carrierName');
                                if (typeof(carrierInfo.value) == 'undefined' || value == null) return "";
                                else  return "Draft";
                            },

                            fieldLabel: 'Status'
                        }

                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    //weight: 100,
                    //reference: 'planAction',
                    items: [

                        '->',
                        {
                            iconCls: 'x-fa fa-edit',
                            handler: 'onEditClick',
                            bind: {
                                disabled: '{!canEdit}'
                            },


                            text: 'Admin Edit'
                        },
                        {
                            iconCls: 'x-fa fa-floppy-o',
                            handler: 'onSaveClick',
                            bind: {
                                disabled: '{!isEditing}'
                            },
                            text: 'Save'
                        },
                        {
                            iconCls: 'x-fa fa-ban',
                            handler: 'onCancelClick',
                            bind: {
                                disabled: '{!isEditing}'
                            },
                            text: 'Cancel'
                        },

                        {
                            iconCls: 'x-fa fa-toggle-on',
                            handler: 'onActivateClick',
                            bind: {
                                disabled: '{!canActivate }'
                            },
                            text: 'Activate'
                        },

                        {
                            iconCls: 'x-fa fa-toggle-off',
                            handler: 'onDeactivateClick',
                            bind: {
                                disabled: '{!canDeactivate }'
                            },
                            text: 'Deactivate'
                        }

                    ]


                }

            ],

            items: [
                {
                    // left panel -----------------------------------------------------------------------------------
                    xtype: 'container',
                    reference: 'container1',
                    disabled: false,
                    defaults: {

                        labelWidth: 195,
                        flex: 1,
                        minWidth: 400
                    },


                    items: [
                        // leftpanel content ---------------------------------------------------- //
                        {
                            xtype: 'textfield',
                            name: 'planGroupCode',
                            fieldLabel: 'Rx Group Code',
                            emptyText: 'Enter Group Code',
                            allowBlank: false,
                            maxLength: 15
                        },
                        {
                            xtype: 'textfield',
                            name: 'planGroupName',
                            reference: 'planGroupName',
                            fieldLabel: 'Plan Group Name',
                            emptyText: 'Enter Group Name',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'carrierId',
                            reference: 'carrierId',
                            fieldLabel: 'Carrier Id',
                            emptyText: '',
                            hidden: true
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'carrierAcctNumber',
                            reference: 'carrierAcctNumber',
                            fieldLabel: 'Account',
                            emptyText: 'Select an account',
                            allowBlank: false,
                            bind: {store: '{accounts}'},
                            displayField: 'accountName',
                            valueField: 'carrierAcctNumber'
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'carrierLOBId',
                            fieldLabel: 'LOB',
                            emptyText: 'Select a LOB',
                            allowBlank: false,
                            bind: {store: '{lobs}'},
                            displayField: 'lobName',
                            valueField: 'carrierLOBId',
                            listeners: {
                                select: 'onLOBSelected'
                            }
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode:'local',
                            name: 'formularyId',
                            fieldLabel: 'Formulary',
                            emptyText: 'Select a formulary',
                            allowBlank: false,
                            //queryMode: 'local',
                            bind: {
                                store: '{formularies}'
                            },
                            displayField: 'FormularyName',
                            valueField: 'FormularyID'
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'exclFormularyId',
                            fieldLabel: 'Excluded Formulary',
                            emptyText: 'Select a formulary',
                            allowBlank: true,
                            bind: {store: '{formularies}'},
                            displayField: 'FormularyName',
                            valueField: 'FormularyID'
                        },
                        {
                            xtype: 'textfield',
                            name: 'PlanFaxLogo',
                            fieldLabel: 'Fax Logo Name',
                            emptyText: 'Fax Logo Name',
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'copayCalcFunction',
                            fieldLabel: 'Copay Function',
                            emptyText: 'Copay Function Name',
                            allowBlank: true,
                            bind: {
                                store: '{copayfunctions}'
                            },
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: 'textfield',
                            name: 'payablePatRespCodes',
                            fieldLabel: 'Payable Pat Resp Amt Qual',
                            emptyText: 'Enter Pat Resp Amt Qual',
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'MACListID',
                            fieldLabel: 'MAC List',
                            emptyText: 'Select a MAC List',
                            allowBlank: false,
                            bind: {store: '{maclists}'},
                            displayField: 'MACListName',
                            valueField: 'MACListID'
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            autoLoadOnValue: true,
                            name: 'useAllowedPrescribers',
                            fieldLabel: 'Allowed Prescribers',
                           tip: 'Check this if Prescriber list needs to be allowed for this Plan Group.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            autoLoadOnValue: true,
                            name: 'allowMemberLocks',
                            fieldLabel: 'Allow Member Locks',
                            tip: 'Check this if Member locks needs to be allowed for this Plan Group.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            autoLoadOnValue: true,
                            name: 'processMTMCase',
                            fieldLabel: 'Process MTM Cases',
                            tip: 'Check this if MTM Cases are allowed to be created for this Plan Group.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            autoLoadOnValue: true,
                            name: 'processMAPCase',
                            fieldLabel: 'Process MAP Cases',
                            tip: 'Check this if MAP Cases are allowed to be created for this Plan Group.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            autoLoadOnValue: true,
                            labelWidth: 205,
                            name: 'PayNonPartDIngredients',
                            fieldLabel: 'Pay Non Part D Ingredients',
                            tip: 'Check this if Non Part D Ingredients are allowed to be payed for this Plan Group.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            autoLoadOnValue: true,
                            name: 'includeNonPartDOnPDE',
                            fieldLabel: 'Include Non Part D On PDE',
                            tip: 'Check this if Non Part D claim are to be submitted on PDE.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            labelWidth: 205,
                            name: 'exclPHIInReports',
                            fieldLabel: 'Exclude PHI Data In Reports',
                            allowBlank: true,
                            tip: 'Check this if Exclude PHI Data In Reports.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'partBPCN',
                            fieldLabel: 'Medicare Part B PCN',
                            emptyText: 'Enter Part B PNC',
                            allowBlank: true,
                            maxLength: 15
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            name: 'pcnCodeList',
                            fieldLabel: 'PCN Code List',
                            emptyText: 'Select PCN',
                            multiSelect: true,
                            allowBlank: true,
                            bind: {store: '{pcnDetail}'},
                            displayField: 'pcnDesc',
                            valueField: 'pcnCode',
                            queryMode: 'local',
                            itemId: 'cbPcnCodeList',
                            reference: 'cbPcnCodeList',
                            listConfig: {
                                getInnerTpl: function (displayfield) {
                                    //debugger;

                                    //return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {pcnDesc} ('+ '{pcnCode}) </div>';

                                    return '<div class="x-combo-list-item"> <span class="chkCombo-default-icon chkCombo" ></span>' + '{pcnDesc}'+ ' ( '+ '{pcnCode} )</div>';
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'defMemberEnollAddrType',
                            fieldLabel: 'Default Enrollment Address Type',
                            emptyText: 'Select Address Type',
                            allowBlank: true,
                            bind: {store: '{plandefaultaddress}'},
                            displayField: 'AddressType',
                            valueField: 'AddressType'
                        }
                    ]
                },
                { //start right panel -----------------------------------------------------------------------------------------------------
                    xtype: 'container',
                    reference: 'container2',
                    disabled: false,
                    defaults: {
                        labelWidth: 205,
                        flex: 1,
                        minWidth: 400
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'effDate',
                            emptyText: 'mm/dd/yyyy',
                            fieldLabel: 'Effective Date',
                            format: 'm/d/Y',
                            placeHolder: 'mm/dd/yyyy',
                            allowBlank: false,
                            formatText: 'Expected date format mm/dd/yyyy'
                        },
                        {
                            xtype: 'datefield',
                            name: 'termDate',
                            emptyText: 'mm/dd/yyyy',
                            fieldLabel: 'Termination Date',
                            format: 'm/d/Y',
                            placeHolder: 'mm/dd/yyyy',
                            formatText: 'Expected date format mm/dd/yyyy'
                        },
                        {
                            xtype: 'datefield',
                            name: 'renewalDate',
                            emptyText: 'mm/dd/yyyy',
                            fieldLabel: 'Renewal Date',
                            format: 'm/d/Y',
                            placeHolder: 'mm/dd/yyyy',
                            formatText: 'Expected date format mm/dd/yyyy'
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            reference: 'PrefPharmNetwork',
                            name: 'pharmNetworkId',
                            fieldLabel: 'Preferred Pharmacy Network',
                            emptyText: 'Select a pharmacy network',
                            allowBlank: false,
                            bind: {store: '{pharmanetworks}'},
                            displayField: 'NetworkDescription',
                            valueField: 'NetworkID',
                            queryMode:'local',
                            listeners: {change: 'onPharmanetworkChange'}
                        },
                        {
                            xtype: 'combobox',
                            //autoLoadOnValue: true,
                            reference: 'nonPrefPharmNetwork',
                            name: 'nonPrefPharmNetworkId',
                            fieldLabel: 'Non-Preferred Pharmacy Network',
                            emptyText: 'Select a pharmacy network',
                            allowBlank: true,
                            bind: {store: '{nonpharmanetworks}'},
                            displayField: 'NetworkDescription',
                            valueField: 'NetworkID',
                            queryMode:'local',
                            forceSelection : true,
                            listeners: {change: 'onNonPharmanetworkChange'}

                        },
                        {
                            xtype: 'checkbox',
                            autoLoadOnValue: true,
                            labelWidth: 215,
                            name: 'mandatoryGeneric',
                            fieldLabel: 'Mandatory Generic',
                            tip: 'Mandatory Generic',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }

                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                // Start field container for vaccine admin fee and textfield
                                {
                                    xtype: 'checkbox',
                                    name: 'allowMedAdminFee',
                                    reference:'allowMedAdminFee',
                                    labelWidth: 215,
                                    fieldLabel: 'Vaccine Admin Fee',
                                    tip: 'Allow vaccine admin fee.',
                                    listeners: {
                                        render: function(c) {
                                            Ext.create('Ext.tip.ToolTip', {
                                                target: c.getEl(),
                                                html: c.tip
                                            });
                                        }
                                    }

                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'medAdminFeeAmt',
                                    reference: 'medAdminFeeAmt',
                                    width: 145,
                                    margin: '0 0 0 10',
                                    hideLabel: true,
                                    emptyText: 'Admin Fee Amount',
                                    dataType: 'int',
                                    minValue: 0,
                                    maxValue: 99,
                                    hideTrigger: true,
                                    itemId: 'medAdminFeeAmt'
                                }
                                // end container
                            ]
                        },
                        {xtype: 'checkbox',labelWidth: 215, name: 'asthmaHEDISAlert', fieldLabel: 'Asthma HEDIS Alert',
                            tip: 'Asthma HEDIS Alert.',
                            listeners: {
                                render: function(c) {
                                    Ext.create('Ext.tip.ToolTip', {
                                        target: c.getEl(),
                                        html: c.tip
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'cmsPBPid',
                            fieldLabel: 'CMS PBP ID',
                            emptyText: 'Enter CMS PBP ID',
                            allowBlank: true,
                            maxLength: 3
                        },
                        {
                            xtype: 'textfield',
                            name: 'CMSPlanId',
                            fieldLabel: 'CMS Plan ID',
                            emptyText: 'Enter CMS Plan ID',
                            allowBlank: true,
                            maxLength: 10
                        },
                        {
                            xtype: 'textfield',
                            name: 'CMSFormularyId',
                            fieldLabel: 'CMS Formulary ID',
                            emptyText: 'Enter Formulary ID',
                            allowBlank: true,
                            maxLength: 10
                        },
                        {
                            xtype: 'textfield',
                            name: 'CMSCntrId',
                            fieldLabel: 'CMS Part D Contract ID',
                            emptyText: 'Enter CMS Part D Contract ID',
                            allowBlank: true,
                            maxLength: 8
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'CMSPlanType',
                            reference: 'CMSPlanType',
                            fieldLabel: 'CMS Plan Type',
                            emptyText: 'Select a CMS Plan Type',
                            allowBlank: true,
                            bind: {store: '{cmsplantypes}'},
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection : true,
                            queryMode: 'local',
                            name: 'PDEPlanType',
                            fieldLabel: 'PDE Plan Type',
                            emptyText: 'Select a PDE Plan Type',
                            allowBlank: true,
                            bind: {store: '{pdeplantypes}'},
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: 'textfield',
                            name: 'MbrCardFrontImage',
                            fieldLabel: 'Member Card Front Image',
                            emptyText: 'Enter Member Card Front Image',
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'MbrCardBackImage',
                            fieldLabel: 'Member Card Back Image',
                            emptyText: 'Enter Member Card Back Image',
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'MbrCardFrontCSS',
                            fieldLabel: 'Member Card Front CSS',
                            emptyText: 'Enter Member Card Front Images',
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'MbrCardBackCSS',
                            fieldLabel: 'Member Card Back CSS',
                            emptyText: 'Enter Member Card Back Images',
                            allowBlank: true
                        }
                    ]
                }// end right panel
            ]

        },
        {
            xtype: 'plan-group-benefits',
            height: 200,
            flex: 2,
            bodyPadding: 0,
            region: 'south'
        }
    ]
});