Ext.define('Atlas.provider.view.mymembers.MyMembers', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-mymembers-mymembers',
    store: 'store.memberInfoStore',

    title: 'My Members',

    items: [{
        xtype: 'panel',
        title: 'Selection',
        frame: true,

        items: [{
            xtype: 'hboxform',
            frame: false,
            layout: 'hbox',
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Member',
                name: 'memberInput',
                itemId: 'memberInput',
                flex: 5
            },{
                xtype: 'textfield',
                fieldLabel: 'Plan',
                name: 'planInput',
                itemId: 'planInput',
                flex: 5
            },{
                xtype: 'button',
                text: 'Add',
                flex: 1
            },{
                xtype: 'button',
                text: 'Search',
                flex: 1
            },{
                xtype: 'button',
                text: 'Reset',
                flex: 1
            },{
                xtype: 'button',
                text: 'Export to Excel',
                flex: 1
            }]
        },{
            xtype: 'prescriberportal-mymembers-mymembersgrid'
        }]
    }]
});
