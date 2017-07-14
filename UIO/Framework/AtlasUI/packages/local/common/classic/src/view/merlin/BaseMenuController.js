Ext.define('Atlas.common.view.merlin.MenuBaseController', {
    extend: 'Ext.app.ViewController',

    init: function () {
        var me = this;
        me.setupSubMenu();

    },

    setupSubMenu: function () {
        //Load Main menus for the right side - have to know parent Id
        var me = this,
            view = me.getView(),
            menuStore = me.getViewModel().getStore('menu'),
            proxy = menuStore.getProxy();

        proxy.setExtraParam('pRootMenu', view.menuId);
        proxy.setExtraParam('pLevels', 1);

        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true // Remove listener after Load
        });

        menuStore.load();
    },

    onMenuLoad: function (store, records, success) {
        if(!success){
            //we might want to fire an error here.. not sure.
            return true;
        }
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = me.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            itemTitle,
            route;

        for (; i < iLen; i++) {
            if(records[i].data.defaultMenu == false) {
                items.push({
                    text: records[i].get('menuTitle'),
                    route: records[i].get('route')
                });
            }

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
                route = records[i].get('route');
                itemTitle = records[i].get('menuTitle');
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            //route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: itemTitle,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }

        if (vm.get('viewready')) {
            view.unmask();
        }

        vm.set('initialized', true);

    },


    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;

        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(item.route),
                height : '100%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                route: item.route,
                title: item.text
            });
            view.setActiveTab(len);
        }
    }
});