Ext.define('Atlas.portals.view.provider.Authorization', {
    extend: 'Ext.Container',
    title: 'eregg',
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Training',
            layout: {
                type: 'table',
                columns: 4,
                tdAttrs: {style: 'padding-right: 60px; padding-left: 20px; padding-top: 5px;'}

            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'namefield',
                    fieldLabel: 'Auth Id'
                },
                {
                    xtype: 'combo',
                    name: 'comboType',
                    fieldLabel: 'Type'
                },
                {
                    xtype: 'textfield',
                    name: 'emailfield',
                    fieldLabel: 'Member ID'
                },
                {
                    xtype: 'combo',
                    name: 'comboType',
                    fieldLabel: 'LOB'
                },
                {
                    xtype: 'textfield',
                    name: 'emailfield',
                    fieldLabel: 'PCP'
                },
                {
                    xtype: 'textfield',
                    name: 'emailfield',
                    fieldLabel: 'Provider'
                },
                {
                    xtype: 'textfield',
                    name: 'emailfield',
                    fieldLabel: 'Facility'
                },

                {
                    xtype: 'datefield',
                    fieldLabel: 'Start Date:',
                    name: 'dateFrom',
                    itemId: 'dateFrom',
                    reference: 'dateFrom',
                    format: 'm/d/Y',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                },

                {
                    xtype: 'datefield',
                    fieldLabel: 'End Date:',
                    name: 'dateTo',
                    itemId: 'dateTo',
                    reference: 'dateTo',
                    format: 'm/d/Y',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                },
                {
                    xtype: 'checkbox',
                    name: 'billingSameAsMailing',
                    boxLabel: 'Same as Mailing Address?',
                    hideLabel: true,
                    checked: true
                }



            ],

            buttons: [
                {
            text: 'Search'
        },{
                text: 'Clear'
            },
                {
                    text: 'Print'
                },
                {
                    text: 'View'
                },
                {
                    text: 'Attack Clinical Document'
                }]

        }
    ]
});