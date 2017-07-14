Ext.define('Atlas.common.view.Workspace', {
    extend: 'Ext.Container',
    alias: 'widget.workspace',

    requires: [
        'Ext.list.Tree'
    ],
    viewModel: 'workspace',
    controller: 'workspace',

    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'west',
            //title: '<i class="fa fa-tasks" aria-hidden="true"></i> Apps',
            bind: {
                title: '{workspaceTitle}'
            },
            split: true,
            //collapseMode: 'mini',
            collapsible: true,
            width: 230,
            scrollable: true,

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [
                {
                    xtype: 'treelist',
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
                }
            ]
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            reference: 'workspaceTabs',

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
