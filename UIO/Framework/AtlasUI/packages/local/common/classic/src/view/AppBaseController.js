Ext.define('Atlas.common.view.AppBaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appBase',

    // during route this allows each app to do it's own thing
    // but in general try to add/select the third tier in it's tabpanel
    handleAppRouting: function () {
        var refs = this.getReferences(),
            appSection = (arguments[4]),
            newView,
            existingItem;

        //handle both tab stack and panel replacement subsections types
        if (appSection && refs.sectionTabs) {
            existingItem = refs.sectionTabs.child('component[xtype=' + appSection + ']');
            if (existingItem) {
                refs.sectionTabs.setActiveItem(existingItem);
            } else {
                //check to see if the newViewClass is defined
                if (appSection != undefined && Ext.ClassManager.get(appSection) == undefined) {
                    appSection = 'Atlas.view.Unknown'
                }
                newView = Ext.create(appSection);
                refs.sectionTabs.setActiveItem(refs.sectionTabs.add(newView));
            }
        } else if (appSection && refs.sectionPanel) {
            // refs.sectionPanel.removeAll();
            // newView = Ext.create(appSection);
            // refs.sectionPanel.add(newView);
        }
    },


    onSectionChange: function (combo, value) {
        var route = this.getView().routePath;

        if (route) {
            this.redirectTo(this.routePathChange(route, 4, value));
        }
    },


    //todo: duplicate of main app controller, should move into a utility class.
    routePathChange: function (route, indexValue, value) {
        var routeArray = this.getView().routePath.split('/');

        if (value) {
            routeArray[indexValue] = value;
            return routeArray.join('/');
        } else {
            return route;
        }

    }

});