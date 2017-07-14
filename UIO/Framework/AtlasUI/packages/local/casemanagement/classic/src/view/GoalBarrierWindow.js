/**
 * Created by s6627 on 11/17/2016.
 */
/**
 * Created by s6627 on 11/16/2016.
 */
Ext.define('Atlas.casemanagement.view.GoalBarriersWindow', {
    extend: 'Ext.window.Window',
    xtype: 'casemanagementGoalBarriersWindow',
    itemId: 'winBarriers',
    title:'Barriers',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    width: 800,
    height:200,
    defaults: {
        labelWidth: 200
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            defaults: {
                labelWidth: 200
            },
            items:[
                {
                    xtype: 'barrierstypeahead',
                    emptyText: '[e.g. Homeless]',
                    itemId: 'cbxGoalBarriers',
                    fieldLabel:'Barrier',
                    hideLabel: false
                },
                {
                    xtype: 'button',
                    text: 'Add Barrier',
                    iconCls: 'fa  fa-plus-circle',
                    itemId:'btnAddBarrier',
                    handler: 'btnAddBarrier_Click'
                }
            ]
        },
        {
            xtype: 'grid',
            tbar: [
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa fa-minus-circle',
                    handler: 'removeBarrier',
                    itemId:'btnRemove'
                }],
            itemId: 'grdBarriers',
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Code', dataIndex: 'BarrierCode'
                    },
                    {
                        text: 'Description', dataIndex: 'BarrierDescription'
                    }
                ]
            },
            bind: '{storeBarriers}'
        },
        {
            xtype: 'hidden', itemId: 'hdnGoalIdBarrier'
        }

    ],
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
                    handler: 'SaveGoalBarriers',
                    itemId: 'btnSaveBarriers'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'btnCancelBarrier_Click',
                    itemId: 'Button1'
                }
            ]
        }
    ]
})