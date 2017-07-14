Ext.define('Atlas.provider.view.searchpriorauth.SearchPriorAuth', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-searchpriorauth-searchpriorauth',
    store: 'store.memberInfoStore',

    title: 'Search Prior Auth',

    items: [{
        xtype: 'form',
        title: 'Search Prior Auth',
        frame: true,
        margin: 10,

        header: {
            items: [{
                xtype: 'button',
                iconCls: 'fa fa-cog'
            }]
        },

        items: [{
            xtype: 'hboxform',

            items: [{
                xtype: 'datefield',
                fieldLabel: 'From:',
                name: 'fromInput',
                itemId: 'fromInput'
            },{
                xtype: 'textfield',
                fieldLabel: 'Member:',
                labelWidth: 80,
                name: 'memberInput',
                itemId: 'memberInput'
            }]
        },{
            xtype: 'hboxform',

            items: [{
                xtype: 'datefield',
                fieldLabel: 'To:',
                name: 'toInput',
                itemId: 'toInput'
            },{
                xtype: 'textfield',
                fieldLabel: 'Medication:',
                labelWidth: 80,
                name: 'medicationInput',
                itemId: 'medicationInput'
            }]
        },{
            xtype: 'hboxform',
            defaults: {
                xtype: 'button'
            },

            items: [{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'Auth Status:',
                name: 'authstatus'
            },{
                xtype: 'label'
            }]
        },{
            text: 'Search'
        },{
            text: 'Reset'
        },{
            text: 'Export To Excel'
        }]
    },{
        xtype: 'prescriberportal-searchpriorauth-searchpriorauthgrid'
    }]
});
