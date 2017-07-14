Ext.define('Atlas.pharmacy.view.PharmacyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy',

    listen: {
        controller: {
            'pharmacy-advsearch': {
                selected: 'onAdvSearchChange'
            }
        }
    },

    init: function () {
        //Load Main menus for the right side - have to know parent Id
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),

            menuStore = vm.getStore('menu'),
            menuProxy = menuStore.getProxy();
        menuProxy.setExtraParam('pRootMenu', view.menuId);
        menuProxy.setExtraParam('pLevels', 1);
        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true // Remove listener after Load
        });

        menuStore.load();

    },

    //Called once view has performed it's initial layout run
    boxReady: function (view, width, height) {
        //Starting with mask and defer any user interactions until component is fully loaded, e.g. menus
        var me = this,
            vm = view.lookupViewModel();

        if (!vm.get('initialized')) {
            view.mask('Preparing...');
        }

        vm.set('viewready', true);

        if (view.atlasId) {
            me.lookup('searchfield').setValue(view.atlasId);
            me.onSearch(view.atlasId);
        }
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

    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            vm = this.getViewModel(),
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

            if (item.text == 'Claims') {
                var ncpdpId = vm.get('ncpdpId');
                this.fireEvent('SearchClaimsCommonController', 'ncpdpId', ncpdpId, true);
            }
            else if (item.text == "Contact Log") {
                this.fireEvent('contactloggridrefresh');
            }
        }
    },

    onSearchTypeToggle: function (seg, button) {
        var vm = this.getViewModel(),
            field = this.lookup('searchfield'),
            searchBy = button.action,
            hint = button.hint;

        vm.set('searchEmptyText', hint);
        vm.set('searchBy', searchBy);

        field.setValue(vm.get(searchBy));
    },

    onSearch: function (value) {
        var vm = this.getViewModel(),
            npi = vm.get('npi');
        if (value && value.length > 3) {
            vm.set(vm.get('searchBy'), value); // update vm
            this.searchForPharmacy();
            this.fireEvent('SearchClaimsCommonController', 'ncpdpId', value, true);
        } else {
            Ext.Msg.alert('Message', 'Please enter ' + vm.get('searchBy').toUpperCase());
        }
    },

    onAdvancedSearch: function () {
        var me = this,
            view = this.getView();

        if (!me.searchWin) {
            me.searchWin = view.add({
                xtype: 'pharmacy-advancesearchwindow',
                origin: me.getView().id,
                closeAction: 'hide' // Keep window around and don't destroy
            });
        }
        me.searchWin.show();
    },

    onAdvSearchChange: function (origin, ncpdpId, npi) {

        var me = this,
            vm = me.getViewModel(),
            view = me.getView();

        //IMPORTANT! Because we will receive any events from advanced search windows (in case of multiple open tabs)
        // It is mandatory to check if this instance is currently active (active tab)
        if (origin !== view.id) {
            return; // ignore
        }

        vm.set('ncpdpId', ncpdpId);
        vm.set('npi', npi);

        me.lookup('searchfield').setValue(vm.get('searchBy') === 'npi' ? npi : ncpdpId);

        me.searchForPharmacy();
        this.fireEvent('SearchClaimsCommonController', 'ncpdpId', ncpdpId, true);
    },

    searchForPharmacy: function () {
        // debugger;
        var me = this,
            vm = me.getViewModel(),
            pharmacy,
            pharmacyRelationship = vm.getStore('pharmacyRelationship');

        //Ensure that we have clean model to start with
        if (pharmacy = vm.get('activePharmacy')) {
            pharmacy.destroy();
        }
        // Add blank activePharmacy, we will work on Model level
        pharmacy = new Atlas.pharmacy.model.PharmacyMasterData;
        vm.set('activePharmacy', pharmacy);

        me.pendingChainedLoads = 2; // We will load 2 stores in parallel, but have to inform observers only when all stores are loaded
        //me.getView().mask('Loading...');
        pharmacy.load({
            params: {
                pFieldList: pharmacy.getFieldNames().join(','),  // grab field list from model prototype
                pKeyType: vm.get('searchBy'),
                pKeyValue: vm.get('searchBy') === 'npi' ? vm.get('npi') : vm.get('ncpdpId')
            },
            callback: function (record, operation) {
                var status = operation.getResultSet().message[0];
                if (status.code === 0) {
                    var data = record.data;
                    vm.set('ncpdpId', data.ncpdpid);
                    vm.set('npi', data.npi);


                    me.getView().setTitle('Pharmacy - ' + data.name);
                    var param ={
                        page:'pharmacy',
                        key:'ncpdpId',
                        keyvalue:data.ncpdpid,
                        keytext:data.name
                    };
                    vm.set('masterrecord',param);
                    var sendDate = record.get('@ContractSendDate');
                    if (sendDate && sendDate!=''){
                        record.set('ContractSendDateCheck',true);
                        record.set('@ContractSendDate',Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(new Date(),'m/d/Y'));

                    }

                    else
                        record.set('ContractSendDateCheck',false);
                    //debugger;
                   // var controller = Ext.create('Atlas.prescriber.view.PrescriberContactLogController');
                    me.fireEvent('contactloggridrefresh');

                } else {
                    Ext.Msg.alert('Error', status.message);

                    me.getView().setTitle('Pharmacy');
                    pharmacy.destroy();
                    vm.set('activePharmacy', null);
                }
                me.chainedStoreLoaded();
            }
        });

        // var serachType = pKeyType: vm.get('searchBy')
        var serachType = vm.get('searchBy');

        // if(serachType=== 'npi' ||  serachType==='ncpdpId' )
        // {
        //     pharmacyRelationship.setExtraParam('pKeyType',serachType);
        // }
        if(serachType=== 'npi' ||  serachType==='ncpdpId' ) {
            pharmacyRelationship.load({
                params: {
                    pWhere: Ext.String.format("{0}='{1}'", vm.get('searchBy'), vm.get('searchBy') === 'npi' ? vm.get('npi') : vm.get('ncpdpId')),
                    pKeyType: serachType
                },
                callback: function (record, operation) {
                    var status = operation.getResultSet().message[0];

                    if (status.code !== 0) {
                        //Ext.Msg.alert('Error', status.message);
                    }
                    me.chainedStoreLoaded();
                }
            });
        }
        else
        {
            pharmacyRelationship.load({
                params: {
                    pWhere: Ext.String.format("{0}='{1}'", vm.get('searchBy'), vm.get('searchBy') === 'npi' ? vm.get('npi') : vm.get('ncpdpId'))
                },
                callback: function (record, operation) {
                    var status = operation.getResultSet().message[0];

                    if (status.code !== 0) {
                        //Ext.Msg.alert('Error', status.message);
                    }
                    me.chainedStoreLoaded();
                }
            });

        }
    },

    chainedStoreLoaded: function () {
        var me = this;
        --me.pendingChainedLoads;

        // If there are no pending loads, let others know
        if (!me.pendingChainedLoads) {
            me.getView().unmask();
            me.notifyObservers();
        }
    },

    notifyObservers: function () {
        var me = this;
        // Notify any observers that we have new pharmacy in play so other views can change their data on focus
        Ext.defer(function () {
            me.fireEvent('datachanged', me.getView().id);
        },300);

    }

    //onDestroy: function () {
    //    // Do some housekeeping
    //    if (this.searchWin) {
    //        Ext.destroy(this.searchWin);
    //    }
    //    this.callParent();
    //}
});
