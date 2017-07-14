Ext.define('Atlas.common.view.users.UserMain', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usermain',

    requires: [
        'Ext.ux.TabReorderer'
    ],

    viewModel: 'usermain',
    controller: 'usermain',
    layout: {
        type: 'border'
    },
    items: [
        {
            xtype: 'panel',
            region: 'west',
            bind:{
                title: '<i class="fa fa-user" aria-hidden="true"></i> {user.firstname} '
            },
            split: true,
            collapseMode: 'mini',
            collapsible: true,
            width: 250,
            scrollable: true,
            items: [{
                xtype: 'treelist',
                flex: 1,
                reference: 'navigationTree',
                bind: {
                    store: '{navigation}'
                },
                rootVisible: false,
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    itemclick: 'onNavigationItemClick'
                }
            }]
        },
        {
            xtype: 'tabpanel',
            plugins: 'tabreorderer',
            flex:1,
            defaults: {
                bodyPadding: 10,
                scrollable: true,
                closable: true,
                focusable: true,
                listeners: {
                   // close: 'onWorkspaceTabClose'
                }
            },
            region: 'center',
            reference: 'workspaceTabs',
            listeners: {
               // tabchange: 'onWorkspaceTabChange'
            },
            items: [{
                title:'General',
                xtype: 'userGeneral'
            }]
        }
    ]
});