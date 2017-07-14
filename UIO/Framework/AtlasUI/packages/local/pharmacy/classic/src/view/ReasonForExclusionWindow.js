/**
 * Created by rsalekin on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.view.ReasonForExclusionWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-reasonforexclusion',
    name: 'reasonforexclusion',
    title: 'Reason for Exclusion',
    viewModel: 'reasonforexclusion',
    controller: 'reasonforexclusion',
    width: 350,
    height: 125,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            itemId : 'formReasonForExclusion',
            region : 'north',
            height : '100%',
            width : '100%',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'cbxReasonForExclusion',
                    fieldLabel: 'Reason For Exclusion',
                    flex: 1,
                    labelWidth: 150,
                    forceSelection: 'true',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{storeExclusionReason}'
                    },
                    allowBlank: false
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'btnExclude',
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'btnExclude_Click'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnCancel',
                        text: 'Cancel',
                        iconCls: 'fa fa-close',
                        handler: 'btnCancel_Click'
                    }
                ]
            }
        }
    ]
});
