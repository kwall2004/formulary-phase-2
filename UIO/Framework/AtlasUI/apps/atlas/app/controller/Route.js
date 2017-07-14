Ext.define('Atlas.controller.Route', {
    extend: 'Ext.app.Controller',

    listen: {
        controller: {
            '*': {
                // Used internally from menu routing
                // this.fireEvent('routeTo',{
                //       routeId: {clientId}/{packagename}/{app Class Name}/{clientId}/{sub Class Name}
                //   });
                // For your own classes use openView instead!
                // @private
                routeTo: 'onRouteTo',

                //Used to open new views from other parts of the application and passing initial parameters that can be consumed later during view instantiation

                // From view controller fire event openView with the following parameters
                // Workspace, Package, ClassName with folder name separated by underscore, any properties you would like to send to that class
                // If properties to send is string then it will apply as atlasId
                // If properties to send is an object it will place all those properties on the class via apply() method

                /**
                 * @cfg client {String} Workspace name
                 * @cfg pkg {String} Package
                 * @cfg cls {String} Class name inlcuding any subfolders separated by undescore
                 * @cfg params {String|Object} String value will be applied to atlasId on view. Object will be apply params to the view class. Must contain atlasId !
                 * @cfg section // reserved for future developoment
                 */
                // Example:
                // this.fireEvent('openView', 'merlin', 'authorizAtion', 'memberprofile_MemberPortalUsers', 1251854);
                // this.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {atlasId: 2856, userId: 123, greetingMsg: 'Hello'}, null);
                openView: 'onOpenView'
            }
        }
    },

    // bool if we're actively engaged in routing so we don't spawn new routes mid-route
    processingRoute: false,

    //used to keep track of state
    lastRoute: null,


    getViewClass: function (pkg, cls) {
        var appClass = (cls || '').replace(/_/g, '.');

        return (pkg.length > 0 && appClass.length > 0) ? 'Atlas.' + pkg + '.view.' + appClass : false;
    },

    getRouteParts: function (routeInfo) {
        var routeArray = routeInfo.routeId.split('/');
        if (routeArray.length) {
            routeInfo['client'] = routeArray[0];
            routeInfo['pkg'] = routeArray[1];
            routeInfo['appClass'] = routeArray[2];
            routeInfo['atlasId'] = routeArray[3];
            routeInfo['appSection'] = routeArray[4];
        }
    },

    //Generic method to load existing or new application items
    onRouteTo: function (routeInfo,overrideFlag) {
        var me = this,
            viewCls;

        if (!!routeInfo['routeId']) {
            me.getRouteParts(routeInfo)
        }

        viewCls = me.getViewClass(routeInfo['pkg'], routeInfo['appClass']);

        //Defined
        if (routeInfo['client'] && me.isRouteValid(viewCls)) {
            //Permission
            if (me.isRouteAuthorized(routeInfo, routeInfo['client'])) {
                //Exists
                me.prepareWorkspace(routeInfo, viewCls, overrideFlag);
            } else {
                me.routeUnauthorized()
            }
        } else {
            me.routeUnknown()
        }
    },

    onOpenView: function (client, pkg, cls, params, section) {
        var me = this,
            viewCls = me.getViewClass(pkg, cls),
            routeInfo = {
                client: client,
                atlasId: params || null,
                appSection: section || null
            };

        //Defined
        Ext.suspendLayouts();
        if (client && me.isRouteValid(viewCls)) {
            //Permission
            if (me.isRouteAuthorized(routeInfo, client)) {
                //Proceed
                me.prepareWorkspace(routeInfo, viewCls);
            }
        }
        Ext.resumeLayouts(true);
        return false;
    },

    //WIP, Do not use! @developer Brad
    onCloseView: function (client, pkg, cls, atlasId) {
        var me = this,
            viewCls = me.getViewClass(pkg, cls),
            routeInfo = {
                client: client,
                atlasId: atlasId || null
            },
            workspace = mainCard.child('[atlasClient=' + client + ']');

        if(workspace){
            workspace.getController().closeView(client,viewCls, atlasId);
        }
    },

    isRouteValid: function (viewClass) {
        //check to see if the new ViewClass is defined
        return !!(viewClass && Ext.ClassManager.get(viewClass));
    },

    isRouteAuthorized: function (routeInfo, client) {
        var me = this,
            url = '',
            menuId = routeInfo['menuId'];
        //  return true;
        //order of this if statement is important
        if(client.toLowerCase() !== 'merlin' || menuId || routeInfo.atlasId.menuId) {
           return true;
        }
        else{
           me.routeUnknown();
           return false;
        }
//We really need to return a promise result but need the api
       /* return new Ext.Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: url,

                success: function (response) {
                    // Use the provided "resolve" method to deliver the result.
                    //
                    resolve(response.responseText);
                },

                failure: function (response) {
                    // Use the provided "reject" method to deliver error message.
                    //
                    reject(response.status);
                }
            });
        });*/
    },

    prepareWorkspace: function (routeInfo, viewCls, overrideExisting) {
        var mainCard = Ext.first('[reference=mainPanel]'),
            mainLayout = mainCard.getLayout(),
            atlasId = routeInfo['atlasId'],
            parentMenuId = routeInfo['parentMenuId'],
            menuId = routeInfo['menuId'],
            title = routeInfo['title'],
            client = routeInfo['client'],
            workspace = mainCard.child('[atlasClient=' + client + ']'),
            info;

        //If the workspace exists activate it, otherwise create it
        if (workspace) {
            mainLayout.setActiveItem(workspace);
            // then look for the exitingModule if it exists
        } else {
            info = Atlas.common.Util.getWorkspaceInfo(client);
            workspace = Ext.create('Atlas.common.view.' + info.cls, {
                atlasClient: client
            });

            workspace.getViewModel().set('workspaceTitle', info.title);
            mainLayout.setActiveItem(mainCard.add(workspace));
        }

        workspace.getController().processRoute(viewCls, atlasId, parentMenuId, menuId, title, overrideExisting);
    },

    routeUnauthorized: function () {
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainPanel,
            mainLayout = mainCard.getLayout(),
            workspace;

        workspace = mainCard.child('[$className=Atlas.view.Unauthorized]');
        if (!workspace) {
            workspace = Ext.create('Atlas.view.Unauthorized', {});
            mainCard.add(workspace);
        }
        mainLayout.setActiveItem(workspace);

        refs.clientcombo.clearValue();
        return true;
    },

    routeUnknown: function () {

        Ext.MessageBox.show({
            title: 'Error',
            msg: "You do not have access to this module",
            icon: Ext.MessageBox.ERROR
        });

        return true;
    }
});
