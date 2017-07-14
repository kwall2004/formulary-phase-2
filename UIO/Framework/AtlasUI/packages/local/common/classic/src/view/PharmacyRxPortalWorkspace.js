/**
 * Created by c4539 on 11/7/2016.
 */
Ext.define('Atlas.common.view.PharmacyRxPortalWorkspace', {
    extend: 'Atlas.common.view.Workspace',
    alias: 'widget.pharmacyportalrxworkspace',
    controller: 'portalworkspace',
    layout: 'border',

    viewModel: {
        stores:{
            navigation:{
                type: 'tree',
                root: {
                    "expanded": true,
                    "menuID": 1,
                    "children":[
                        {
                            "menuTitle": "MAC View",
                            "expanded": false,
                            "menuID": 2,
                            "iconCls": "icon-authorization,13",
                            "leaf": true
                        }
                    ]
                }
            }
        }
    },

    items: [
        {
            xtype: 'panel',
            region: 'west',
            bind: {
                title: '{workspaceTitle}'
            },
            split: true,
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
                        useColorIcons: true,
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
                xtype: 'portalspharmacyrxmain',
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