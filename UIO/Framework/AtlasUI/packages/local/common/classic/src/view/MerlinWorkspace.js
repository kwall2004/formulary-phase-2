Ext.define('Atlas.common.view.MerlinWorkspace', {
    extend: 'Ext.Container',
    alias: 'widget.merlinworkspace',

    requires: [
        'Ext.ux.TabCloseMenu'
    ],
    viewModel: 'workspace',
    controller: 'merlinworkspace',

    layout: 'border',

    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            cls: 'panelNavigation',
            //title: '<i class="fa fa-tasks" aria-hidden="true"></i> Apps',
            bind: {
                store: '{menuitems}',
                title: '{workspaceTitle}'
            },
            split: true,
            collapsible: true,
            width: 230,

            rootVisible: false,
            hideHeaders: true,
            useArrows: false,
            singleExpand: true,

            columns: [{
                xtype: 'treecolumn',
                useColorIcons: true,
                dataIndex: 'menuTitle',
                flex: 1
            }],
            listeners: {
                itemclick: 'onNavigationItemClick' //different method as we have a tree here
            }
        },
        {
            xtype: 'tabpanel',
            region: 'center',

            reference: 'workspaceTabs',

            items: [{
                xtype: 'home-main',
                closable: false
            }],

            plugins: {
                ptype: 'tabclosemenu'
            },

            defaults: {
                closable: true,
                focusable: true,
                listeners: {
                    close: 'onWorkspaceTabClose'
                }
            }
        }
    ]
});
