Ext.define('Atlas.view.main.SingleController', {
    extend: 'Ext.app.ViewController',

    //used to keep track of state
    lastRoute: null,

    alias: 'controller.mainsingle',

    init: function () {
        var me = this,
            hash = window.location.hash.substr(1),
            parts = hash.split('/'),
            lastView = me.lastView,
            view = me.getView(),
            cfg,
            newView,
            newViewClass,
            controller,
            user,
            sessionId;

        if (!hash) {
            console.log('Single view controller requires hash with route info. E.g. merlin/pharmacy/Pharmacy/3/19, where 3 is parentMenuId , and 19 is menuId from system menus table');
            return false;
        }

        //Check for session
        user = localStorage.getItem('AtlasAuthorization-user');

        if (!user) {
            console.log('Missing or expired session data. Please log in first.')
        }

        sessionId = JSON.parse(user).sessionId;
        Atlas.common.data.proxy.Layer7.prototype.config.extraParams = {
            pSessionID: sessionId,
            pSessionId: sessionId
        };

        cfg = {
            atlasClient: parts[0],
            atlasId: null,
            menuId: +parts[3] || null,
            parentMenuId: +parts[4] || null
        };

        newViewClass = 'Atlas.' + parts[1] + '.view.' + parts[2].replace('_', '.');

        // Check if this class is available
        if (!Ext.ClassManager.classes[newViewClass]) {
            console.log('Class ' + newViewClass + ' is not registered with Ext.ClassManager');
            return true;
        }

        // We have to terminate early if the view is the same that was already created and stored in lastView
        if (lastView && lastView.$className === newViewClass) {
            return true;
        }

        newView = Ext.create(newViewClass, cfg);

        view.add(newView);
        me.lastView = newView;

        //Process remaining part of the route
        if (newView) {
            controller = newView.getController();
            if (controller) {
                if (Ext.isFunction(controller.handleAppRouting)) {
                    controller.handleAppRouting.apply(controller, arguments);
                }
            }
        }
    }
});
