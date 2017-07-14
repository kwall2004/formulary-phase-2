Ext.define('Atlas.common.view.WorkspaceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspace',

    //continues the route processsor from the main controller once the correct workspace is determined
    processRoute: function (viewCls, atlasId, parentMenuId, menuId, title, overrideExisting) {
        var me = this,
            workspace = me.getView(),
            client = workspace.atlasClient,
            newView,
            newApp,
            existingItem,
            tabPanel = me.lookup('workspaceTabs'),
            menu = Atlas.menu[menuId],
            cfg = {
                atlasClient: client,
                atlasId: null,
                parentMenuId: parentMenuId,
                menuId: menuId
            },
            controller;
        if(atlasId && atlasId.menuId!=atlasId.PId){
            menu = Atlas.menu[atlasId.menuId],
                menuId=atlasId.menuId,
                overrideExisting=false;
        }

        if (!viewCls) {
            return false;
        }

        if (title) {
            cfg.title = title;
        }

       // if(menu == undefined )
        //{
         //   Ext.Msg.alert('Security', 'You do not have access to this module.');
          //  return;
        //}
        //If flag is set we allow duplicates, this will happen from routeTo only
        if (!overrideExisting || (menu && menu.openTabs >= menu.maxRunning)) {
            existingItem = me.getExistingItem(client, viewCls, atlasId);
        }

        if (!existingItem) {
            var createNewView = false;
            // Check how many tabs should be opened
            if (menu && menu.openTabs < menu.maxRunning) {
                menu.openTabs++;
                createNewView = true;
            } else if(!menu) {
                createNewView = true;
            }
            if(createNewView) {
                if (atlasId) {
                    if (typeof atlasId === 'string') {
                        cfg.atlasId = atlasId;
                    } else if (typeof atlasId === 'object') {
                        Ext.apply(cfg, atlasId);
                    }
                }
                newView = Ext.create(viewCls, cfg);
            }
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.

                tabPanel.setActiveItem(existingItem);
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the activeItem.
                newApp = tabPanel.add(newView);
                tabPanel.setActiveItem(newApp);
            }
        }

        //Process remaining part of the route
        if (newView) {
            controller = newView.getController();
            if (controller) {
                if (Ext.isFunction(controller.handleAppRouting)) {
                    controller.handleAppRouting.apply(controller, arguments);
                }
            }
        }
    },

    closeView: function (client, viewCls, atlasId) {
        var me = this,
            existingItem = me.getExistingItem(client, viewCls, atlasId);
        if (existingItem) {
            existingItem.destroy();
        }
    },

    getExistingItem: function (client, viewCls, atlasId) {
        var tabPanel = this.lookup('workspaceTabs'),
            tabCount = tabPanel.items.items.length,
            workTab,
            i,
            existingItem;

        if (atlasId) {
            if (typeof atlasId === 'string') {
                atlasId = atlasId;
            } else if (typeof atlasId === 'object') {
                atlasId = atlasId.atlasId;
            }
        }

        for (i = 0; i < tabCount; i++) {
            workTab = tabPanel.items.items[i];
            if (workTab['$className'] === viewCls && workTab['atlasClient'] === client && workTab['atlasId'] == atlasId) {
                existingItem = workTab;
                break;
            }
        }

        return existingItem;
    },

    onWorkspaceTabClose: function (panel) {
        var me = this,
            client = me.getView()['atlasClient'];

        // This will test true if a menuId was passed to the showView event.
        if (panel.menuId && Atlas.menu[panel.menuId].openTabs) {
            //Decrease opened tabs counter
            Atlas.menu[panel.menuId].openTabs--;
        }

        //if I am the last child redirect to the base route for the client
        if (panel.up('tabpanel').items.items.length == 1) {
            me.redirectTo(client);
        }
    },

    getNavRouteParts: function (routeInfo) {
        var routeArray = routeInfo.split('/'),
            parts = {};
        if (routeArray.length) {
            parts['client'] = routeArray[0];
            parts['pkg'] = routeArray[1];
            parts['appClass'] = routeArray[2];
            parts['atlasId'] = routeArray[3];
            parts['appSection'] = routeArray[4];

        }
        return parts;
    },

    onNavigationItemClick: function (tree, info) {
        var me = this,
            //client = me.getView()['atlasClient'],
            node = info.node || info,
            //TODO Match property name for new Workspaces. Should align to 'route'
            route = node.get('route') || node.get('routeId'),
            //routeInfo,
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menu = Atlas.menu[menuId],
            menuTitle = node.get('menuTitle');

        //<debug>
        console.log('Navigate to menuId=' + menuId + ', parentMenuId=' + parentMenuId +
            ' Single view querystring: ?' + Atlas.user.start + '&single=yes' + '#' + route + '/' + menuId + '/' + parentMenuId);
        //</debug>

        if (route) {
            me.fireEvent('routeTo', {
                routeId: route,
                parentMenuId: parentMenuId,
                menuId: menuId,
                title: menuTitle
            });

            //routeInfo = me.getNavRouteParts(route);
            //this.fireEvent('openView', client, routeInfo.pkg, routeInfo.appClass, routeInfo.atlasId);

        } else if(node.data.expanded === false){
            node.expand();
        } else {
            node.collapse();
        }
    }
});
