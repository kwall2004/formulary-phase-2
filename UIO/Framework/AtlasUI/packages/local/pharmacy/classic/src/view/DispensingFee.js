Ext.define('Atlas.pharmacy.view.DispensingFee', {
    extend: 'Ext.tab.Panel',
    title: 'Dispensing Fee Rule',
    layout: 'border',
    controller: 'dispensingfee',
    viewModel: 'dispensingfee',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'combobox',
                    editable: true,
                    fieldLabel: 'Dispensing Fee Rule',
                    emptyText: 'Dispensing Fee',
                    name: 'cbxDispensingFee',
                    reference: 'cbxDispensingFee',
                    displayField: 'RuleName',
                    valueField: 'DispFeeRuleID',
                    forceSelection:true,
                    queryMode: 'local',
                    labelWidth: 125,
                    width: 350,
                    listeners: {
                        select: 'onRuleSelect'
                    },
                    bind: {
                        store: '{dispFeeRules}',
                        value: '{selDispFeeRuleId}'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    reference: 'menu',
                    text: 'Menu',
                    iconCls: 'x-fa fa-bars',
                    menu: {
                        plain: true,
                        listeners: {
                            click: 'onMenuClick'
                        }
                    }
                }
            ]
        }
    ],
    items: [{
        xtype: 'dispensingfeerulesetup',
        itemId: 'setup'
    }, {
        xtype: 'dispensingfeeruledtlgrid',
        hidden: true,
        itemId: 'detail'
    }]

});
