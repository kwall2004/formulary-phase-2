

Ext.define('Atlas.macprice.view.MacAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacAlertController',

    listen: {
        store: {
            '#AlertStatus': {
                load: 'onAlertStatusLoad'
            },
            '#AnalystMacAlert': {
                load: 'OnUserListLoad'
            },
            '#ApproveMacAlert': {
                load: 'OnUserListLoad'
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
    },

    onMacListChange: function (combo, record) {
        var vm = this.getViewModel();
        vm.set('masterrecord', record);

        this.fireEvent('MACListChange', record);
    },

    onAlertStatusLoad: function (store, records, success) {
        store.filter('charString', 'MacAlert');
    },

    OnUserListLoad: function (store, records, success) {
        var vm = this.getViewModel(),
            userName = Atlas.user.un;

        store.filter('userName', userName);

        if (store.data.items.length > 0) {
            if (store.storeId == 'AnalystMacAlert') {
                vm.set('AnalystMacAlert', true);
            }
            else {
                vm.set('ApproveMacAlert', true);
            }
        }
    },

    onTabChange: function (tab) {
        this.setInitialPageParam();
        this.fireEvent('ReloadSelectedTabData', tab.title, false, false);
    },

    onSearch: function () {
        this.setInitialPageParam();
        this.fireEvent('ReloadSelectedTabData', null, false, false);
    },

    onAlertStatusChange: function () {
        this.setInitialPageParam();
        this.fireEvent('ReloadSelectedTabData', null, false, true);
    },

    onMonitorGPISearch: function () {

        var MacManualMonitoring = Ext.first('#MacManualMonitoring');

        MacManualMonitoring.down('#cbxDrug').setValue('');

        this.onMonitorSearch();
    },

    onMonitorNDCSearch: function () {

        var MacManualMonitoring = Ext.first('#MacManualMonitoring');

        MacManualMonitoring.down('#cbxGPI').setValue('');

        this.onMonitorSearch();
    },

    onMonitorSearch: function() {

        var vm = this.getViewModel(),
            masterrecord = vm.get('masterrecord'),
            MacManualMonitoring = Ext.first('#MacManualMonitoring'),
            manualMonitorGrid = MacManualMonitoring.down('#manualMonitorGrid'),
            DrugMonitorAlert = vm.getStore('DrugMonitorAlert'),
            NDC = (MacManualMonitoring.down('#cbxDrug').getValue() == null ? '' : MacManualMonitoring.down('#cbxDrug').getValue()),
            GPI = (MacManualMonitoring.down('#cbxGPI').getValue() == null ? '' : MacManualMonitoring.down('#cbxGPI').getValue());

        if (masterrecord == null)
        {
            return;
        }

        var macListId = masterrecord.get('MACListID');

        DrugMonitorAlert.removeAll();

        DrugMonitorAlert.getProxy().setExtraParam('pMACListId', '0');
        DrugMonitorAlert.getProxy().setExtraParam('pDrugLevel', 'SEARCH');
        DrugMonitorAlert.getProxy().setExtraParam('pGPICode', GPI);
        DrugMonitorAlert.getProxy().setExtraParam('pNDC', NDC);
        DrugMonitorAlert.getProxy().setExtraParam('pAlertType', '');
        DrugMonitorAlert.getProxy().setExtraParam('pAlertStatus', '0,1');
        DrugMonitorAlert.getProxy().setExtraParam('pMktShrPeriod', '0');
        DrugMonitorAlert.getProxy().setExtraParam('pTopN', '0');
        DrugMonitorAlert.getProxy().setExtraParam('pSort', '');
        DrugMonitorAlert.getProxy().setExtraParam('pDateFrom', '');
        DrugMonitorAlert.getProxy().setExtraParam('pDateTo', '');
        DrugMonitorAlert.getProxy().setExtraParam('ipiBatchSize', '0');
        DrugMonitorAlert.getProxy().setExtraParam('ipiJumpStart', '0');
        DrugMonitorAlert.getProxy().setExtraParam('ipcDirection', 'Fwd');
        DrugMonitorAlert.getProxy().setExtraParam('ipcBckRecPointer', '');
        DrugMonitorAlert.getProxy().setExtraParam('ipcFwdRecPointer', '');

        DrugMonitorAlert.load();
    },

    onAddDrug: function () {
        var vm = this.getViewModel(),
            MacManualMonitoring = Ext.first('#MacManualMonitoring'),
            manualMonitorGrid = MacManualMonitoring.down('#manualMonitorGrid'),
            PriceChangeMonitor = vm.getStore('PriceChangeMonitor'),
            saveData,
            ttDrugList = {},
            selectionModel = manualMonitorGrid.getSelectionModel().getSelection(),
            saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];

        PriceChangeMonitor.removeAll();

        if (selectionModel.length == 0) {
            Ext.Msg.alert('PBM', 'Please select a records to add to the Monitoring List.');
            return;
        }

        Ext.each(selectionModel, function (item) {

            var newRec = Ext.data.Record.create({
                priceChangeMonitorID: '0',
                createDate: Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d').toString(),
                GPICode: item.data.GPICode,
                NDC: item.data.NDC
            });

            newRec.dirty = true;

            PriceChangeMonitor.insert(0, newRec);

        });

        saveData = Atlas.common.utility.Utilities.saveData([PriceChangeMonitor], 'formulary/rx/pricechangemonitor/update', 'ttDrugList', [false], {
                pAction: 'A',
                pDrugLevel: '',
                pGPICode: ''
            },
            saveAction, null);

        if (saveData.code == "0") {

            Ext.Msg.alert('PBM', 'Successfully added Drug(s) to the Monitoring List.');

            this.onMonitorSearch();
            this.fireEvent('ReloadSelectedTabData', null, false);
        }
    },

    setInitialPageParam: function () {
        var vm = this.getViewModel();

        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('LoadPagination', 'true');

    }

});
