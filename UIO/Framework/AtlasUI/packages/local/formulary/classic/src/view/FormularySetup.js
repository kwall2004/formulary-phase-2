/**
 * Created by mkorivi on 9/30/2016.
 */
Ext.define('Atlas.formulary.view.FormularySetup', {
    extend: 'Ext.panel.Panel',
    xtype: 'formularysetup',
    itemId: 'formularysetup',
    title: 'Formulary Configuration',
    controller: 'formularysetup',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            style: {borderColor: 'black', borderStyle: 'solid'},
            items: [
                '->'
                , {xtype: 'button', text: 'Validate RxCUI', itemId: 'btnValidateRxCUI', handler : 'btnValidateRxCUI_Click'}
                , '-'
                , {xtype: 'button', text: 'Load CMS File',itemId: 'btnLoadCMS', handler : 'btnLoadCMSFile_Click'}
                , '-'
                , {xtype: 'button', text: 'Import Rule' ,handler : 'btnImportRule_Click',itemId: 'btnImportRule'}
                , '-'
                , {xtype: 'button', text: 'Export Rule', handler : 'btnExportRule_Click',itemId: 'btnExportRule'}
                , '-'
                , {xtype: 'button', text: 'Relink RxCUI', handler : 'btnRelinkRXCUI_Click',itemId: 'btnRelink'}
                , '-'
                , {xtype: 'button', text: 'Collapse All', handler : 'btnCollapseAll_Click',itemId: 'btnCollapseAll'}
                , '-'
                , {xtype: 'button', text: 'Review Selected Items', handler : '',itemId: 'btnGetSelectedNodes',hidden:true}
                , '-'
                , {xtype: 'button', text: 'Save Rule', handler : 'btnSaveRule_Click',itemId: 'btnSave'}
                , '-'
                , {xtype: 'button', text: 'Generate Version Diff. Report', handler : 'GenerateDifferenceRpt',itemId:'btnGenerateDifferenceRpt'}
            ]
        }],
    scrollable: true,
    bodyPadding: 10,
    items: [{
        xtype: 'form',
        flex: 1,
        layout: 'hbox',
        align: 'stretch',
        itemId:'StatusForm',
        autoscroll: true,
        items: [
            {
                xtype: 'tabpanel',
                width: 700,
                flex: 1.5,
                items: [
                    {
                        xtype: 'panel',
                        title: 'All Drugs',
                        itemId:'pnlTree',
                        flex: 1,
                        width: 600,
                        height: 700,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'card-panel',
                                flex: 3.5,
                                height: '100%',
                                width:'100%',
                                //autoScroll: true,
                                overflowY: 'scroll',
                                overflowX: 'scroll',
                                autoScroll:true,
                                items: [
                                    {
                                        xtype: 'formularydrug',
                                        region: 'west',
                                        width:'100%',
                                        itemId:'fdbTreePanel',
                                        autoScroll:true,
                                        collapsible: true,
                                        listeners: {
                                            beforeitemexpand: 'onEtcExpand',
                                            select: 'onEtcSelected'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Search',
                        flex: 2,
                        width: 700,
                        height: 700,
                        layout: 'hbox',
                        itemId:'PanelTreeSearch',
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'card-panel',
                                flex: 3.5,
                                height: '100%',
                                autoScroll: true,
                                overflowY: 'scroll',
                                overflowX: 'scroll',
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        autoScroll: true,
                                        itemId: 'cmpFldCovered',
                                        items: [
                                            {
                                                xtype: 'combobox', fieldLabel: 'Drug', itemId: 'cbxDrug',
                                                labelWidth:50,
                                                width:400,
                                                typeAhead: false,
                                                hideTrigger:true,
                                                bind: {
                                                    store:'{storeMedication}'
                                                },
                                                listConfig: {
                                                    // Custom rendering template for each item
                                                    userCls: 'common-key-value-boundlist',
                                                    getInnerTpl: function() {
                                                        return '<b>NDC: </b>{NDC}<br>'+
                                                            '<b>Label: </b>{LN}<br>'+
                                                            '<b>Brand: </b>{BN}<br>'+
                                                            '<b>GCN: </b>{GCN_SEQNO}</br>'+
                                                            '<b>HICL: </b>{HICL_SEQNO}</br>'+
                                                            '<b>Generic Name: </b>{GNN60}</br>'+
                                                            '<b>Ult. Child ETC: </b>{UltChildETC}</br>'+
                                                            '<b>Ult. Parent ETC: </b>{UltParentETC}';
                                                    }
                                                },
                                                listeners: {
                                                    select: 'cbxNDC_Select',
                                                    beforequery: function (queryPlan) {
                                                        var filter = queryPlan.query;

                                                        filter = filter.trim();
                                                        filter = filter.replace("'", "");

                                                        var pFilter = filter.split(/,| /);

                                                        var strWrd = "wrdidx contains '";
                                                        for (var j = 0; j < pFilter.length; j++)
                                                        {
                                                            if (pFilter[j] != "")
                                                            {
                                                                strWrd = strWrd + pFilter[j] + "* ";
                                                            }
                                                        }
                                                        queryPlan.query = strWrd + "'";
                                                    }
                                                },
                                                displayField: 'NDCAndLabel',
                                                valueField: 'NDC',
                                                queryParam: 'pWhere',
                                                pageSize: 10
                                                //viewModel: 'formulary'
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Reset',
                                                iconCls: 'fa  fa-plus-circle',
                                                handler: 'btnResetClick'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'formularydrugsearch',
                                        region: 'west',
                                        width:'100%',
                                        collapsible: true,
                                        itemId:'formularyTreePanel',
                                        listeners: {
                                            select: 'GetSelectedNodeBySearch'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                listeners: {
                    'tabchange': 'tabTreeChange'
                    }
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                itemId:'pnlRules',
                frame: true,
                flex: 3,
                autoscroll: true,
                overflowY: 'scroll',
                overflowX: 'scroll',
                style: {padding: '5px'},
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        itemId:'cmpFldCovered',
                        items: [
                            {
                                xtype: 'checkbox', fieldLabel: 'Covered',itemId:'chkCovered',labelWidth:50,
                                listeners : {
                                    change : 'CoveredChecked'
                                }
                            },
                            {xtype: 'checkbox', fieldLabel: 'Specialty Drug',itemId:'chkSpecialty',labelWidth:60, style: {'padding-left': '15px'},
                                listeners : {
                                    change : 'CoveredChecked'
                                }},
                            {xtype: 'checkbox', fieldLabel: 'On Preferred List',itemId:'chkPreferred',labelWidth:110, hidden:true, style: {'padding-left': '20px'},
                                listeners : {
                                    change : 'CoveredChecked'
                                }
                            },
                            {xtype: 'checkbox', fieldLabel: 'Restrict To Package Size',itemId:'chkRestrictToPkgSize',labelWidth:140, style: {'padding-left': '20px'}},
                            {xtype: 'checkbox', fieldLabel: 'Override Generic Check',itemId:'chkOverrideGenericCheck',labelWidth:150, style: {'padding-left': '20px'}},
                            {xtype: 'checkbox', fieldLabel: 'Exclude During Transition',itemId:'chkTransFillExclude',labelWidth:160, style: {'padding-left': '20px'}}
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'displayfield', fieldLabel: 'Associated Plan Groups',labelWidth:170,hidden:true},
                            {xtype: 'label', itemId:'dispAssoPlans'}
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        itemId:'cmpPa',
                        anchorSize: 100,
                        items: [
                            {
                                xtype: 'combobox', fieldLabel: 'Required Prior Authorization',itemId:'cbxPA',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicarePANames}'
                                },
                                labelWidth: 180
                            },
                            {xtype: 'numberfield', fieldLabel: 'PA Min',itemId:'PAMinAge' ,labelWidth:60},
                            {xtype: 'numberfield', fieldLabel: 'PA Max',itemId:'PAMaxAge',labelWidth:60},
                            {xtype: 'combobox',itemId:'cbxPaGender',
                                hidden:true,
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StorePAGenderList}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'combobox', fieldLabel: 'Required Step Therapy',  width: 800,itemId:'cbxStepTherapy',
                                displayField: 'RuleName',
                                valueField: 'systemID',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StorePBMRules}'
                                },
                                labelWidth: 180
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'combobox', fieldLabel: 'Step 1 Description',  width: 520, labelWidth: 180,itemId:'cbxMedicareSt1Desc',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTDescription}'
                                }
                            },
                            {xtype: 'combobox', fieldLabel: 'Step 1 Value',  width: 520, labelWidth: 100,itemId:'cbxMedicareSt1Val',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTCountsAndValues}'
                                }}
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'combobox', fieldLabel: 'Step 2 Description',  width: 520, labelWidth: 180,itemId:'cbxMedicareSt2Desc',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTDescription}'
                                }},
                            {xtype: 'combobox', fieldLabel: 'Step 2 Value',  width: 520, labelWidth: 100,itemId:'cbxMedicareSt2Val',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTCountsAndValues}'
                                }}
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'combobox', fieldLabel: 'Step 3 Description',  width: 520, labelWidth: 180,itemId:'cbxMedicareSt3Desc',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTDescription}'
                                }},
                            {xtype: 'combobox', fieldLabel: 'Step 3 Value',  width: 520, labelWidth: 100,itemId:'cbxMedicareSt3Val',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreMedicareSTCountsAndValues}'
                                }}
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        layout: 'vbox',
                        title: 'Medicaid',
                        itemId:'fldSetMedicaid',
                        width: 1200,
                        collapsible: true,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId: 'cmpFldExclusions',
                                items: [
                                    {xtype: 'checkbox', fieldLabel: 'Medicaid Carve Out', itemId: 'chkMedCarveOut',labelWidth:120,
                                        listeners : {
                                            change : 'ExclusionChecked'
                                        }},
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Medicaid Fee Screen',
                                        itemId: 'chkMedicaidFeeScreen',labelWidth:120,
                                        listeners : {
                                            change : 'ExclusionChecked'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        layout: 'vbox',
                        title: 'Medicare',
                        collapsible: true,
                        width: 1200,
                        itemId:'fldSetMedicare',
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId:'cmpFldMedicare1',
                                items: [
                                    {xtype: 'checkbox', fieldLabel: 'Part D Drug',itemId:'chkPartDDrug',labelWidth:80,
                                        listeners : {
                                            change : 'PartDChecked'
                                        }
                                    },
                                    {xtype: 'checkbox', fieldLabel: 'Part D Excluded',itemId:'chkPartDExcDrug',labelWidth:80}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId:'cmpMedicareSTCount',
                                items: [
                                    {xtype: 'combobox', fieldLabel: 'Medicare PA Type',  width: 500, labelWidth: 160,itemId:'cbxMedicarePATypes',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreMedicarePATypes}'
                                        }
                                    },
                                    {xtype: 'combobox', fieldLabel: 'ST Groups',  width: 520, labelWidth: 100 ,itemId:'cbxMedicareSTGrpCount',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreMedicareSTCountsAndValues}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId:'CompositeField1',
                                items: [
                                    {xtype: 'displayfield', fieldLabel: 'AHFS Category'},
                                    {xtype: 'label', itemId:'lblAHFSCategoryvalue'}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId:'CompositeField2',
                                items: [
                                    {xtype: 'displayfield', fieldLabel: 'AHFS Class'},
                                    {xtype: 'label', itemId:'lblAHFSClassValue'}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId:'CompositeField3',
                                items: [
                                    {xtype: 'displayfield', fieldLabel: 'CMS RxCUI', labelWidth: 180},
                                    {xtype: 'numberfield', itemId:'txtRXCUIvalue'}
                                ]
                            }
                        ]
                    },

                    {
                        xtype: 'container',
                        layout: 'hbox',
                        itemId:'compFldAgeLmt',
                        items: [
                            {xtype: 'displayfield', fieldLabel:'Age Restriction' ,width: 160},
                            {xtype: 'numberfield', fieldLabel: 'Min',itemId:'AgeLimitMin',minValue: 0,maxValue: 999,labelWidth:50},
                            {xtype: 'numberfield', fieldLabel: 'Max',itemId:'AgeLimitMax',minValue: 0,maxValue: 999,labelWidth:50},
                            {xtype: 'combobox' ,itemId:'cbxAgeLimitType',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreAgeRestric}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'combobox', fieldLabel: 'Gender Restricted To',itemId:'cbxGender',labelWidth: 150,
                                displayField: 'name',
                                valueField: 'id',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreGenderList}'
                                }}
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'combobox', fieldLabel: 'Drug Tier',labelWidth: 150,itemId:'cbxTier',
                                displayField: 'TierDesc',
                                valueField: 'TierCode',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreTierList}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'PDL Status',
                                labelWidth: 150,
                                itemId: 'cbxPdlStatus',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StorePDLStatusList}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        itemId:'cmpCopay',
                        hidden:true,
                        items: [
                            {xtype: 'combobox', fieldLabel: 'Copay',labelWidth: 150,itemId:'cbxCopayType',
                                displayField: 'name',
                                valueField: 'value',
                                forceSelection:true,
                                queryMode: 'local',
                                bind: {
                                    store: '{StoreCopayTypeList}'
                                }
                            },
                            {xtype: 'numberfield', itemId:'CopayAmt',maxValue: 9999}

                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'textareafield', fieldLabel: 'PDF Message' ,labelWidth: 150, width: 700, height:30,itemId:'txtAreaTxtMsg'}

                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'textareafield', fieldLabel: 'Notes (Internal Use)', labelWidth: 150,width: 700, height:30,itemId:'txtAreaNotes'}

                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {xtype: 'textfield', fieldLabel: 'Resource Link',width: 700, labelWidth: 150,height:30,itemId:'txtResLink'}

                        ]
                    },
                    {
                        xtype: 'fieldset',
                        layout: 'vbox',
                        title:'Quantity Limits',
                        itemId:'qtyLimitCompositeField',
                        collapsible: true,
                        labelwidth: 100,
                        width: 1200,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                hidden:true,
                                items: [
                                    {xtype: 'displayfield', fieldLabel:'Dollar Amount' },
                                    {xtype: 'numberfield', fieldLabel: 'Max',maxValue: 999,itemId:'DollarMax', labelWidth:50},
                                    {xtype: 'combobox',itemId:'cbxQLDollarAmt',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreQLPeriods}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',

                                items: [
                                    {xtype: 'displayfield', fieldLabel:'Days Supply' },
                                    {xtype: 'numberfield', fieldLabel: 'Max',maxValue: 999,itemId:'DaysSupply',labelWidth:50},
                                    {xtype: 'combobox',itemId:'cbxQLDaysSupply',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreQLPeriods}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                width:560,
                                items: [
                                    {xtype: 'displayfield', fieldLabel:'Extended Days Supply',labelWidth:155 },
                                    {
                                        xtype: 'textfield', itemId: 'txtExtendDaysSupply', fieldLabel: ''
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {xtype: 'displayfield', fieldLabel:'Fills'},
                                    {xtype: 'numberfield', fieldLabel: 'Max',maxValue: 999,itemId:'FillsMax',labelWidth:50},
                                    {xtype: 'combobox',itemId:'cbxQLFills',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreQLPeriods}'
                                        }}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {xtype: 'displayfield', fieldLabel:'Quantity Limit'},
                                    {xtype: 'numberfield', fieldLabel: 'Max',maxValue: 999,itemId:'QLMax',labelWidth:50},
                                    {xtype: 'combobox',itemId:'cbxQL',
                                        displayField: 'name',
                                        valueField: 'value',
                                        forceSelection:true,
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreQLPeriods}'
                                        }}

                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hdnLevelId'},
                {xtype: 'hidden', itemId: 'hdnLevelType'},
                {xtype: 'hidden', itemId: 'hdnOtcOrOpd'},
                {xtype: 'hidden', itemId: 'lblGCN'},
                {xtype: 'hidden', itemId: 'lblHICL'},
                {xtype: 'hidden', itemId: 'lblNDC'},
                {xtype: 'hidden', itemId: 'hidFormuType'},
                {xtype: 'hidden', itemId: 'hdnFormularyId'},
                {xtype: 'hidden', itemId: 'hdnFormularyVersion'},
                {xtype: 'hidden', itemId: 'hdnFormularyStatus'},
                {xtype: 'hidden', itemId: 'hdnFormularyName'},
                {xtype: 'hidden', itemId: 'hidFormuType'},
                {xtype: 'hidden', itemId: 'hidFormuDataSource'},
                {xtype: 'hidden', itemId: 'hdnDocID'},
                {xtype: 'hidden', itemId: 'hdnFormularySelectField'},
                {xtype: 'hidden', itemId: 'hdnDrgGrpLoaded'},
                {xtype: 'hidden', itemId: 'hiddenKeyValue'},
                {xtype: 'hidden', itemId: 'hiddenKeyType'},
                {xtype: 'hidden', itemId: 'hdnFFDocID'},
                {xtype: 'hidden', itemId: 'hdnNodeId'},
                {xtype: 'hidden', itemId: 'hdnNodeText'},
                {xtype: 'hidden', itemId: 'hdnNodeIdSearch'},
                {xtype: 'hidden', itemId: 'hdnNodeTextSearch'},
                {xtype: 'hidden', itemId: 'hdnActiveTab'},
                {xtype: 'hidden', itemId: 'hdnNodeId'},
                {xtype: 'hidden', itemId: 'hdnLevelType'},
                {xtype: 'hidden', itemId: 'hdnRuleLevelId'},
                {xtype: 'hidden', itemId: 'hdnRuleAllowed'},
                {xtype: 'hidden', itemId: 'hdnLevelTypeSearch'},
                {xtype: 'hidden', itemId: 'hdnRuleLevelIdSearch'},
                {xtype: 'hidden', itemId: 'hdnRuleAllowedSearch'},
                {xtype: 'hidden', itemId: 'hdnSearchCalled'},
                {xtype: 'hidden', itemId: 'hdnSelectedNDC'}
            ]
        }
    ]
});








