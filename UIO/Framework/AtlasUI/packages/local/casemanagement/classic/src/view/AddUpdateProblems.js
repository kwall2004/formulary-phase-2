/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.AddUpdateProblems', {
    extend: 'Ext.Window',
    xtype: 'casemanagementAddUpdateProblems',
    itemId:'winAddProblems',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width:500,
    items:[{
        xtype:'form',
        itemId:'formProblems',
        width:'100%',
        defaults: {
            labelWidth: 200
        },
        items: [
            {
                xtype: 'combobox',
                itemId: 'cbxProblem',
                fieldLabel: 'Problem',
                emptyText: '[Select a Problem]',
                allowBlank:false,
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreProblems}'
                }
            },
            {
                xtype: 'textfield',
                itemId: 'txtProblemDescription',
                fieldLabel: 'Description'
            },
            {
                xtype: 'combobox',
                itemId: 'cbxProblemStatus',
                fieldLabel: 'Problem Status',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreProblemStatus}'
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Start Date',
                itemId: 'dtProblemStartDate',
                emptyText:'[mm/dd/yyyy]',
                format : 'm/d/Y'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Close Date',
                itemId: 'dtProblemEndDate',
                emptyText:'[mm/dd/yyyy]',
                format : 'm/d/Y'
            },
            {
                xtype: 'combobox',
                itemId: 'cbxProblemClosedReason',
                fieldLabel: 'Closed Reason',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreProblemClosedReason}'
                }
            }
        ]
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    handler: 'btnSaveProblemClick',
                    itemId: 'btnSaveProblem'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    iconCls: 'fa fa-minus-circle',
                    handler: 'btnDeleteProblem_Click',
                    itemId: 'btnDeleteProblem'
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    handler: 'btnCancelClick',
                    itemId: 'btnCancel'
                }
            ]
        }]
})