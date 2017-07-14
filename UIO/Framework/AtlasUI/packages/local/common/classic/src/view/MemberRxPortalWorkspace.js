Ext.define('Atlas.common.view.MemberRxPortalWorkspace', {
    extend: 'Atlas.common.view.Workspace',
    alias: 'widget.memberportalrxworkspace',

    controller: 'memberrxportalworkspaceview',

    viewModel: {
        stores:{
            navigation:{
                type: 'tree',
                model: 'Atlas.common.model.MemberRxPortal'
            }
        }
    },

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
                    xtype: 'treepanel',
                    reference: 'navigationTree',
                    bind: {
                        store: '{navigation}'
                    },
                    rootVisible: false,
                    hideHeaders: true,
                    useArrows: false,
                    singleExpand: true,
                    columns: [{
                        xtype: 'treecolumn',
                        dataIndex: 'menuTitle',
                        flex: 1
                    }],
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

            items: [{
                xtype: 'portalsrxmembermain',
                closable: false
            }],

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
