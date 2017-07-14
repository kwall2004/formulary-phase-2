/**
 * Created by a6686 on 11/21/2016.
 */

Ext.define('Atlas.Plan.view.PlanErrorMessageWindow', {
    extend: 'Ext.window.Window',
    xtype: 'plan-planerrormessagewindow',
    itemId: 'winPlanErrorMessageWindow',
    title: 'Validation Errors',
    width: 700,
    height: 400,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'GridErrorMessage',
            columns: [
                {
                    text: 'Error Type', dataIndex: 'errorCode', flex:1,
                    renderer: function (value) {
                        //debugger;
                        if (value == 1) return "Error";
                        else if (value == 2) return "Warning";
                        else  return "";
                    }
                },
                {
                    text: 'Error Message', dataIndex: 'errorMessage', flex:1
                },
                {
                    text: 'Corrective Action', dataIndex: 'correctiveAction', flex:1
                    //xtype: 'datecolumn',
                    //format: 'm/d/Y'
                }

            ],//,
            bind: '{StoreErrorMessage}'
        }

    ],
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'bottom',
            items: [

                '->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onAccpetAndActivateWithWarnings',
                    itemId: 'btnWarningOk',
                    hidden: true,
                    text: 'Ok'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onCancelCloseErrorInfo',
                    itemId: 'btnErrClose',
                    text: 'Close'
                }

            ]
        },
        {
            xtype:'toolbar',
            dock:'bottom',
            items: [

                {
                    xtype: 'displayfield',
                    itemId:'ErrMsgStatusBar',
                    alignment:'left'
                }

            ]
        }
    ]
});

