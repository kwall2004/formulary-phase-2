/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/12/2016
 * Origin: MERLIN - Formulary
 * Description: Changes window for Formulary Approval
 **/

Ext.define('Atlas.formulary.view.FormularyChanges', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-formularychanges',
    width: 900,
    height: 500,
    name : 'formularychangew',
    controller: 'formularychanges',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{

        xtype: 'form',

        items: [{
            xtype: 'toolbar',
            items: [
                // leftpanel content ---------------------------------------------------- //
                {

                    xtype: 'button',
                    itemId: 'approveFormulary',
                    text: 'Approve',
                    handler: 'onApproveButtonCLick',
                    disabled: true

                }, {
                    xtype: 'button',
                    itemId: 'rejectFormulary',
                    handler: 'onRejectButtonCLick',
                    text: 'Reject'

                }, {
                    xtype: 'button',
                    text: 'Export',
                    handler: 'onExportButtonCLick'
                },
                {
                    xtype: 'textarea',
                    flex: 3,
                    scrollable: true,
                    readOnly: true,
                    bind: {value: '{NotesData}'}

                }]
        },
            {

                xtype: 'grid',
                title: 'Formulary Changes',
                itemId: 'gvFormularies',
                loadMask: true,
                flex: 1,
                height: 370,
                bind: '{storeformularychanges}',
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        bind: '{storeformularychanges}',
                        pageSize: 25,
                        displayInfo: true,
                        dock: 'bottom'
                    }
                ],
                columns: {
                    items: [{
                        dataIndex: 'FormularyName',
                        text: 'Formulary',
                        width: 300
                    }, {
                        dataIndex: 'FormularyVersion',
                        text: 'Version',
                        width: 100
                    }, {
                        dataIndex: 'LevelType',
                        text: 'Rule Level',
                        width: 100
                    }, {
                        dataIndex: 'RuleLevelID',
                        text: 'Level ID',
                        width: 100
                    }, {
                        dataIndex: 'Descr',
                        text: 'Description',
                        width: 100
                    }, {
                        dataIndex: 'Changes',
                        text: 'Changes',
                        width: 100
                    }, {
                        dataIndex: 'OTCind',
                        text: 'OTC',
                        width: 100
                    }, {
                        dataIndex: 'Covered',
                        text: 'Covered',
                        width: 100
                    }, {
                        dataIndex: 'MedicaidCarveOutDrug',
                        hidden: true,
                        text: 'Medicaid Carved Out'
                    }, {
                        dataIndex: 'SpecialtyDrugInd',
                        hidden: true,
                        text: 'Specialty Drug'
                    }, {
                        dataIndex: 'PAInd',
                        hidden: true,
                        text: 'PA Reqd'
                    }, {
                        dataIndex: 'QtyLimit',
                        hidden: true,
                        text: 'Qty Limit'

                    }, {
                        dataIndex: 'QtyLmtTimePeriod',
                        hidden: true,
                        text: 'Qty Limit Time Periodt'
                    }, {
                        dataIndex: 'DaysSupply',
                        hidden: true,
                        text: 'Days Supply'
                    }, {
                        dataIndex: 'DaysSupplyTimePeriod',
                        hidden: true,
                        text: 'Qty Limit Time Periodt'
                    }, {
                        dataIndex: 'MedicarePAType',
                        text: 'Medicare PA Type',
                        width: 200
                    }]
                    //plugins: [
                    //    {
                    //        ptype: 'gridexporter'
                    //    }
                    //]
                }
            }
        ]
    }]




});

