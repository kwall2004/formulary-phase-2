/**
 * Created by mkorivi on 10/7/2016.
 */
Ext.define('Atlas.formulary.view.FormularyDetails', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-FormularyDetails',
    modal: true,
    closable: true,
    scrollable: true,
    width: 850,
    title: 'Drug Formulary Information',
    height: 550,
    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId:'grdDetail',
                        height: 450,
                        columns: [
                            {
                                text: 'Formulary ID',
                                dataIndex: 'FormularyID',
                                hidden: true
                            },
                            {
                                text: 'Formulary',
                                dataIndex: 'FormularyName'
                            },
                            {
                                text: 'Version',
                                dataIndex: 'FormularyVersion'
                            }
                            ,
                            {
                                text: 'Covered',
                                dataIndex: 'Covered'
                            }
                            ,
                            {
                                text: 'Spl Drug Ind',
                                dataIndex: 'SpecialtyDrugInd'
                            }
                            ,
                            {
                                text: 'Medicaid Carve Out',
                                dataIndex: 'MedicaidCarveOutDrug'

                            }
                            ,
                            {
                                text: 'Part D Excl.',
                                dataIndex: 'PartDExcludedDrug'

                            }
                            ,
                            {
                                text: 'Medicaid Fee Screen',
                                dataIndex: 'MedicaidFeeScreen'

                            }
                            ,
                            {
                                text: 'GenderRestriction',
                                dataIndex: 'GenderRestriction',
                                hidden: true

                            },
                            {
                                text: 'Min. Age',
                                dataIndex: 'MinAge'

                            }
                            ,
                            {
                                text: 'Max. Age',
                                dataIndex: 'MaxAge'

                            }
                            ,
                            {
                                text: 'Age Type',
                                dataIndex: 'AgeType',
                                hidden: true

                            }
                            ,
                            {
                                text: 'PA Ind.',
                                dataIndex: 'PAInd',
                                hidden: true

                            }
                            ,
                            {
                                text: 'PA Name',
                                dataIndex: 'PAName'

                            }
                            ,
                            {
                                text: 'PA Min. Age',
                                dataIndex: 'PAMinAge'

                            }
                            ,
                            {
                                text: 'PA Max. Age',
                                dataIndex: 'PAMaxAge'

                            }
                            ,
                            {
                                text: 'Medicare PA Type',
                                dataIndex: 'MedicarePAType'

                            }
                            ,
                            {
                                text: 'Step Therapy Ind.',
                                dataIndex: 'StepTherapyInd',
                                hidden: true

                            }
                            ,
                            {
                                text: 'Step Therapy Name',
                                dataIndex: 'StepTherapyName'
                            }
                            ,
                            {
                                text: 'Medicare ST Grp. Count',
                                dataIndex: 'MedicareSTGrpCount'

                            }
                            ,
                            {
                                text: 'Medicare ST Grp. Desc 1.',
                                dataIndex: 'MedicareSTGrpDesc1'
                            }
                            ,
                            {
                                text: 'Medicare ST Step Value 1',
                                dataIndex: 'MedicareSTStepValue1'
                            }
                            ,
                            {
                                text: 'Medicare ST Grp. Desc 2',
                                dataIndex: 'MedicareSTGrpDesc2'

                            }
                            ,
                            {
                                text: 'Medicare ST Step Value 2',
                                dataIndex: 'MedicareSTStepValue2'

                            },
                            {
                                text: 'Medicare ST Grp. Desc 3',
                                dataIndex: 'MedicareSTGrpDesc3'

                            },
                            {
                                text: 'Medicare ST Step Value 3',
                                dataIndex: 'MedicareSTStepValue3'

                            }
                            ,
                            {
                                text: 'Days Supply',
                                dataIndex: 'DaysSupply'
                            }
                            ,
                            {
                                text: 'Days Supply Period',
                                dataIndex: 'DaysSupplyTimePeriod'
                            }
                            ,
                            {
                                text: 'Fills',
                                dataIndex: 'Fills'
                            }
                            ,
                            {
                                text: 'Fills Time Period',
                                dataIndex: 'FillsTimePeriod'
                            }
                            ,
                            {
                                text: 'Qty. Limit',
                                dataIndex: 'QtyLimit'
                            },
                            {
                                text: 'Qty. Limit Period',
                                dataIndex: 'QtyLmtTimePeriod'
                            },
                            {
                                text: 'Ext. Days Supply',
                                dataIndex: 'extendedDaysSupply'
                            }
                            ,
                            {
                                text: 'PDF Message',
                                dataIndex: 'Notes'
                            }
                            ,
                            {
                                text: 'Notes',
                                dataIndex: 'TextMessage'
                            }
                            ,
                            {
                                text: 'Rule Level Id',
                                dataIndex: 'RuleLevelID',
                                hidden: true
                            }
                            ,
                            {
                                text: 'Level Type',
                                dataIndex: 'LevelType',
                                hidden: true
                            }

                        ],
                        plugins: [{
                            ptype: 'gridexporter'
                        }],
                        bind: '{StoreDrugFormularyDetails}',
                        dockedItems: [
                            {
                            xtype: 'pagingtoolbar',
                            dock:'bottom',
                            bind: '{StoreDrugFormularyDetails}',
                            displayInfo: true,
                            pageSize: 25
                        },
                            {
                                xtype:'toolbar',
                                dock:'top',
                                items:[
                                    '->', {
                                        xtype: 'button',
                                        text: 'Export To Excel',
                                        iconCls: 'x-fa fa-file-excel-o',
                                        handler: 'btnExportClickDetails'
                                    }
                                ]
                            }
                        ]
                    }]
});
