Ext.define('Atlas.common.view.ProviderPortalWorkspace', {
    extend: 'Atlas.common.view.Workspace',
    alias: 'widget.providerportalworkspace',
    controller: 'providerportalworkspacecontroller',

    viewModel: {
        stores:{
            navigation:{
                type:'common-portalsystemmenu'
            }
        }
    },

    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            cls: 'panelNavigation',
            reference:'providerpanel',
            bind: {
                store: '{navigation}',
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
                xtype: 'provider-home',
                closable: false
            }],

            defaults: {
                closable: true,
                focusable: true,
                listeners: {
                    close: 'onWorkspaceTabClose'
                }
            }
        },

        {
            region: 'south',
            margin: '5',
            padding: '5',
            html: '<p style="text-align: center;">  Copyright Caidan Management Company 2017. All rights reserved.</p>'
        }
    ]
});
