/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.pharmacy.view.dispensingfee.DispensingFeeRuleSetup', {
    extend: 'Ext.form.Panel',
    xtype: 'dispensingfeerulesetup',
    //scrollable: true,
    reference: 'DispensingFeeRuleSetup',
    title: 'Setup',
    itemId: 'dfrSetupForm',
    layout: 'anchor',
    defaults: {
        //padding: '10 0 10 0',
    },
    dockedItems: [{
        xtype: 'toolbar',
        itemId: 'gridTbar',
        dock: 'bottom',
        flex: 1,
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'btnCreate',
                text: 'Create',
                iconCls: 'fa  fa-plus',
                handler: 'onCreate'
            },
            {
                xtype: 'button',
                text: 'Save',
                itemId: 'btnSave',
                iconCls: 'fa  fa-save',
                handler: 'onSave'
            }
            ]
    }],
    items: [{
        xtype: 'fieldset',
        title: 'Dispensing Fee Rule',
        // CAN NOT SET IT TO BE collapsible, or as tagfield control grows, buttons will go down.
        //collapsible: true,
        itemId: 'dfrFldset',
        layout: 'anchor',
        defaults: {
            padding: '10 0 10 0',
            labelWidth: 175,
            width: 350
        },
        items: [ {
            xtype: 'textfield',
            fieldLabel: '<b>Dispensing Fee Rule Name</b>',
            reference: 'dispensingFeeRuleName',
            itemId: 'dispensingFeeRuleName',
            bind: '{inDispensingFeeRuleName}',
            allowBlank: false
        }]
    }]
});