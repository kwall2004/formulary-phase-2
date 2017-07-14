/**
 * Created by a6686 on 11/17/2016.
 */


Ext.define('Atlas.macprice.view.PlanBenefitSetupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlanBenefitSetupController',



listen: {
    store: {
        '#MACExecutive': {
            load: 'OnUserListLoad'
        },
        '#MACAnalyst': {
            load: 'OnUserListLoad'
        }
    },
    controller: {
        '*': {
            ReloadMacList: 'reloadMacList'
        }
    }
},

init: function(){
    var me = this,
        view = me.getView(),
        vm = me.getViewModel(),
        menuStore = vm.getStore('menu'),
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
    var me = this,
        view = me.getView(),
        vm = me.getViewModel(),
        menu = me.lookup('menu'),
        items = [],
        i = 0,
        iLen = records.length,
        defaultMenu = -1,
        route;

    for (; i < iLen; i++) {
        items.push({
            text: records[i].get('menuTitle'),
            route: records[i].get('route')
        });

        if (records[i].get('defaultMenu')) {
            defaultMenu = i;
        }
    }

    menu.getMenu().add(items);

    if (defaultMenu > -1) {
        route = items[defaultMenu].route;
        view.add({
            xclass: Atlas.common.Util.classFromRoute(route),
            title: items[defaultMenu].text,
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

boxReady: function (view, width, height) {
    //Starting with mask and defer any user interations until component is fully loaded, e.g. menus
    var vm = view.lookupViewModel();

    if (!vm.get('initialized')) {
        view.mask('Loading...');
    }

    vm.set('viewready', true);
},

reloadMacList: function(selRecord) {
    var ViewModel = this.getViewModel(),
        cbxMacList = this.getView().down('#cbxMacList');

    var MacListStore = ViewModel.getStore('maclist');
    MacListStore.load({
        callback: function (records, opts, success) {
            if (success) {
                if (selRecord != null)
                {
                    cbxMacList.setValue(selRecord);
                    cbxMacList.fireEvent('select', cbxMacList, cbxMacList.getSelection());
                }
            }
        }
    });
},

onMacListChange: function (combo, record) {
    var vm = this.getViewModel();
    vm.set('masterrecord', record);

    this.fireEvent('SelectedMAC',record);
},

OnUserListLoad: function(store, records, success) {
    var vm = this.getViewModel(),
        userName = Atlas.user.un;

    vm.set('MACAnalyst', false);
    vm.set('MACExecutive', false);

    store.filter('userName', userName);

    if (store.data.items.length > 0)
    {
        if (store.storeId == 'MACExecutive')
        {
            vm.set('MACExecutive', true);
        }
        else
        {
            vm.set('MACAnalyst', true);
        }
    }

    this.fireEvent('UserPermissionUpdate', null);

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
            route: item.route,
            title: item.text
        });
        view.setActiveTab(len);
    }
}

});

