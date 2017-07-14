/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.view.AddLTCDetails', {
    extend: 'Ext.window.Window',
    xtype: 'casemanagement-AddLTCDetails',
    //itemId : 'compoundgcnwindow',
    width: 530,
    height: 200,
    modal: true,
    itemId: 'AddLTCWindow',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            layout: 'vbox',
            itemId: 'formAddLTC',
            defaults: {
                labelWidth: 200
            },
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'cbxLTCEnrolled',
                    fieldLabel: 'LTC Enrolled',
                    displayField: 'text',
                    valueField: 'value',
                    name: 'LTCEnrolledNew',
                    store: {
                        data: [{"text": 'Yes', "value": '1'},
                            {"text": 'No', "value": '2'},
                            {"text": 'Unknown', "value": '3'}]
                    }

                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'LTC Enroll Start Date',
                    itemId: 'dtLTCEntrollStartDate',
                    name: 'LTCEntrollStartDate',
                    format : 'm/d/Y'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'LTC Enroll End Date',
                    itemId: 'dtLTCEntrollEndDate',
                    name: 'LTCEntrollEndDate',
                    format : 'm/d/Y'
                },
                {
                    xtype: 'hidden', itemId: 'hdnLTCSystemId', name: 'systemID'
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->'
                    , {xtype: 'button', text: 'Save LTC Details', handler: 'btn_SaveClick', iconCls: 'fa fa-save'},
                    {xtype: 'button', text: 'Delete', handler: 'DeleteLTC', disabled: true, itemId: 'btnDeleteLTC'},
                    {
                        xtype: 'button', text: 'Close',
                        handler: 'btn_Cancel'
                    }
                ]
            }
        }
    ]
});
