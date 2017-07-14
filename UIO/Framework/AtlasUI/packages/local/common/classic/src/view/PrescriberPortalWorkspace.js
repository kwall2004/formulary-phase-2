Ext.define('Atlas.common.view.PrescriberPortalWorkspace', {
    extend: 'Atlas.common.view.Workspace',
    alias: 'widget.prescriberportalworkspace',

    viewModel: {
        stores:{
            navigation:{
                type: 'tree',
                root: {
                    "expanded": true,
                    "menuID": 1,
                    "children":[
                        {
                            "menuTitle" : "Prior Authorization",
                            "expanded": false,
                            "menuID": 2,
                            "iconCls" : "icon-authorization,13",
                            "leaf" : false,
                            "children" : [
                                {
                                    "menuTitle" : "Search Prior Auth",
                                    "menuID": 3,
                      				"routeId" : "rxprescriber/portals/prescriber_SearchPriorAuth",
                                    "leaf" : true
                                },
                                {
                                    "menuTitle" : "Create Prior Auth",
                                    "menuID": 4,
                                    "routeId" : "rxprescriber/portals/prescriber_CreatePriorAuth",
                                    "leaf" : true
                                }
                            ]
                        },
                        {
                            "menuTitle" : "Member",
                            "expanded": false,
                            "menuID": 5,
                            "iconCls" : "icon-member,3",
                            "leaf" : false,
                            "children" : [
                                {
                                    "menuTitle" : "My Members",
                                    "menuID": 6,
                                    "routeId" : "rxprescriber/portals/prescriber_MyMembers",
                                    "leaf" : true
                                },
                                {
                                    "menuTitle" : "Member Information",
                                    "menuID": 7,
                                    "routeId" : "rxprescriber/portals/prescriber_MemberInformation",
                                    "leaf" : true
                                }
                            ]
                        },
                        {
                            "menuTitle" : "Search Tools",
                            "menuID": 8,
                            "expanded": false,
                            "iconCls" : "x-fa fa-search",
                            "leaf" : false,
                            "children" : [
                                {
                                    "menuTitle" : "Formulary Drug Search",
                                    "menuID": 9,
                                    "routeId" : "rxprescriber/portals/prescriber_FormularyDrugSearch",
                                    "leaf" : true
                                },
                                {
                                    "menuTitle" : "Claim Search",
                                    "menuID": 10,
                                    "routeId" : "rxprescriber/portals/prescriber_ClaimsSearchPrescriber",
                                    "leaf" : true
                                }
                            ]
                        },
                        {
                            "menuTitle" : "Documents & Forms",
                            "expanded": false,
                            "menuID": 11,
                            "iconCls" : "icon-reports,10",
                            "leaf" : false,
                            "children" : [
                                {
                                    "menuTitle" : "Forms",
                                    "menuID": 12,
                                    "routeId" : "rxprescriber/portals/prescriber_Forms",
                                    "leaf" : true
                                },
                                {
                                    "menuTitle" : "Formulary",
                                    "menuID": 13,
                                    "routeId" : "rxprescriber/portals/prescriber_PrescriberFormulary",
                                    "leaf" : true
                                },
                                {
                                    "menuTitle" : "User Guide",
                                    "menuID": 14,
                                    "routeId" : "rxprescriber/portals/prescriber_UserGuide",
                                    "leaf" : true
                                }
                            ]
                        },
                        {
                            "menuTitle" : "Prescriber Support",
                            "menuID": 15,
                            "expanded": false,
                            "iconCls" : "x-fa fa-info-circle",
                            "leaf" : false,
                            "children" : [
                                {
                                    "menuTitle" : "Contact Us",
                                    "menuID": 16,
                                    "routeId" : "rxprescriber/portals/prescriber_ContactUs",
                                    "leaf" : true
                                }
                            ]
                        }

                    ]
                }
            }
        }
    },

    controller: 'portalworkspace',

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
                xtype: 'portalsprescribermain',
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
