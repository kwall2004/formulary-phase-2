/**
 * Created by s6635 on 10/18/2016.
 */
Ext.define('Atlas.benefitplan.view.coveragephase.Main', {
    extend: 'Ext.form.Panel',
    // trackResetOnLoad: true,
    title: 'Coverage Phase Setup',
    controller: 'benefitplan-coveragephasecontroller',
    scrollable: true,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false,
            canadd: false
        },
        stores: {
            coveragePhase: {
                //storeId: 'coveragePhase',
                model: 'Atlas.benefitplan.model.CoveragePhase',
                proxy: {
                    type: 'benefitplan',
                    url: '/CoveragePhase',
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    }
                }
            },
            coveragePhaseTypes :{
                model : 'Atlas.benefitplan.model.CoveragePhaseType',
                autoLoad : true
            }
        }
    },
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: 'border',
            items: [
                {
                    xtype: 'benefitplan-progress',
                    region: 'north'
                },
                {
                    xtype: 'fieldset',
                    region: 'center',
                    title: 'Coverage Phases',
                    layout: 'fit',
                    itemId: 'coveragePhaseDetails',
                    items: [
                        {
                            xtype: 'grid',
                            viewConfig: {
                                loadMask: false
                            },
                            itemId: 'coveragePhaseGrid',
                            reference: 'refCoveragePhaseTypeGrid',
                            bind: {
                                store: '{coveragePhase}'
                            }
                            ,
                            plugins: [
                                {
                                    ptype: 'rowediting',
                                    reference: 'rowEditing',
                                    clicksToEdit: 2,
                                    clicksToMoveEditor: 1,
                                    id: 'rowEditing'
                                }
                            ],
                            columns: [
                                {
                                    header: 'Sequence',
                                    flex:1,
                                    dataIndex: 'CvrgPhaseSeq',
                                    editor:{
                                        allowBlank:false,
                                        validator: function(){
                                                var store = this.up().up().getStore();
                                                for(var i = 0; i<store.getTotalCount(); i++){
                                                    if(store.getAt(i) != this.up().up().getSelectionModel().getSelection()[0] && store.getAt(i).data.CvrgPhaseSeq == this.getValue()) {
                                                        return 'Sequence already exists';
                                                    }
                                                }
                                            return true;
                                        }
                                    }
                                },
                                {
                                    header: 'Coverage Phase',
                                    flex:1,
                                    dataIndex: 'CvrgPhaseTypeSK',
                                    renderer: 'getEditorDisplayValue',
                                    editor: {
                                        xtype: 'combo',
                                        bind: {
                                            store: '{coveragePhaseTypes}'
                                        },
                                        allowBlank: false,
                                        displayField: 'CvrgPhaseCode',
                                        valueField: 'CvrgPhaseTypeSK',
                                        validator: function(){
                                            var store = this.up().up().getStore();
                                            for(var i = 0; i<store.getTotalCount(); i++){
                                                if(store.getAt(i) != this.up().up().getSelectionModel().getSelection()[0] && store.getAt(i).data.CvrgPhaseTypeSK == this.getValue()) {
                                                    return 'Coverage Phase already exists';
                                                }
                                            }
                                            return true;
                                        }
                                    }
                                },
                                {
                                    header: 'Total Drug Spend(TDS)',
                                    flex:1,
                                    itemId: 'TDSField',
                                    dataIndex: 'CvrgPhaseTotalDrugSpend',
                                    formatter: 'usMoney',
                                    editor: {
                                        vtype: 'currency',
                                        listeners: {
                                            change: 'onTDSChanged'
                                        },
                                        allowBlank: false

                                    }
                                },
                                {
                                    header: 'TrOOP Max',
                                    flex:1,
                                    itemId: 'TrOOPMaxField',
                                    formatter: 'usMoney',
                                    dataIndex: 'CvrgPhaseTrOOPMax',
                                    editor: {
                                        vtype: 'currency',
                                        listeners: {
                                            change: 'onTrOOPMaxChanged'
                                        },
                                        allowBlank: false
                                    }
                                },
                                {
                                    dataIndex: 'CurrentUser',
                                    renderer: 'onCurrentUserRenderer',
                                    hidden: true
                                },
                                {
                                    dataIndex: 'IsDeleted',
                                    hidden: true
                                }
                            ],
                            tbar: [
                                {
                                    text: 'Add Row',
                                    itemId: 'addRow',
                                    handler: 'onCoveragePhaseGridAddClick',
                                    bind: {
                                        disabled: '{!canadd}'
                                    }
                                },
                                {
                                    text: 'Remove Row',
                                    itemId: 'removeRow',
                                    handler: 'onCoveragePhaseGridRemoveRowClick',
                                    bind:{
                                        disabled:'{!refCoveragePhaseTypeGrid.selection}'
                                    }
                                }
                            ],
                            listeners: {
                                canceledit: 'onGridItemCancelEdit',
                                edit: 'onGridEditComplete',
                                beforeedit: 'beforeGridEdit'
                            }
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
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            bind: {
                disabled: '{!changed}'
            },
            handler: 'onBtnSaveClick'
        }
    ]
});