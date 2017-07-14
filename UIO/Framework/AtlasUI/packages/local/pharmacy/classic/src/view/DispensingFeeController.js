/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.pharmacy.view.DispensingFeeController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    //extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.dispensingfee',

    init: function () {
        console.log('---- DispensingFeeController.init --- ');
        var vm, vw, me;
        me = this;

        vw = me.getView();
        vm = me.getViewModel();
        me.loadMainStore();
        me.disableButtonsByType(vm.data.cDisableSave);
        me.loadHelperLists();
        me.setupSubMenu();
        vw.down("#btnSave").setDisabled(true);
    },
    loadHelperLists: function () {
        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        var costBasisStore = vm.getStore('costBasis');
        costBasisStore.getProxy().setExtraParam('pListName', 'CostBasis');
        costBasisStore.load({
            scope: me,
            callback: function (records, operation, success) {

                var drugTypeStore = vm.getStore('drugType');
                drugTypeStore.getProxy().setExtraParam('pListName', 'DrugType');
                drugTypeStore.load({
                    scope: me,
                    callback: function (records, operation, success) {

                        var maintenanceStore = vm.getStore('maintenance');
                        maintenanceStore.getProxy().setExtraParam('pListName', 'Maintenance');
                        maintenanceStore.load({
                            scope: me,
                            callback: function (records, operation, success) {

                                var otcIndStore = vm.getStore('otcInd');
                                otcIndStore.load({
                                    scope: me,
                                    callback: function (records, operation, success) {

                                        var rangeBasisStore = vm.getStore('rangeBasis');
                                        rangeBasisStore.load({
                                            scope: me,
                                            callback: function (records, operation, success) {

                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    loadMainStore: function (screenIndex) {

        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        var dispFeeRulesStore = vm.getStore('dispFeeRules');
        dispFeeRulesStore.removeAll();
        delete dispFeeRulesStore.proxy.extraParams.ttDispFeeRuleMaster;
        dispFeeRulesStore.getProxy().setExtraParam('pDispFeeRuleID', '0');
        dispFeeRulesStore.on({
            scope: me,
            single: true,
            load: 'onLoadMainStore'
        });
        dispFeeRulesStore.load();
    },

    onLoadMainStore: function (store, records, success, operation, opts) {
        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        records.forEach(function (val, index) {
            if (vw.down('#dfrFldset').down('#dispensingFeeRuleName').getValue().toString().trim() && val.data.RuleName.toString().trim() === vw.down('#dfrFldset').down('#dispensingFeeRuleName').getValue().toString().trim())
                vw.lookup('cbxDispensingFee').setValue(val.data.DispFeeRuleID);
        })

    },

    disableButtonsByType: function (wType) {
        var vw, vm, btnCreate, btnSave, btnCancel;
        vm = this.getViewModel()
        vw = this.getView();

        btnCreate = vw.query('#btnCreate')[0];
        //vw.query('#btnAdd')[0].setDisabled(true);
        vw.down('#btnAdd').setDisabled(true);
        //vw.query('#btnRemove')[0].setDisabled(true);
        vw.down('#btnRemove').setDisabled(true);
        //vw.query('#btnSaveDetails')[0].setDisabled(true);
        vw.down('#btnSaveDetails').setDisabled(true);
    },


    onCreate: function (button) {
        var vw, vm;
        vw = this.getView();
        vm = this.getViewModel();
        this.disableButtonsByType(vm.data.cDisableCreate);
        vw.down("#btnSave").setDisabled(false);
        vw.down('#dfrFldset').down('#dispensingFeeRuleName').setValue("");
        vw.lookup('cbxDispensingFee').setValue("");
    },

    onSave: function (button) {

        var me, vw, vm, manualForm, fldDispensingFeeRuleName;
        me = this;
        vw = this.getView();
        vm = this.getViewModel();

        fldDispensingFeeRuleName = vw.down('#dfrFldset').down('#dispensingFeeRuleName');
        if (vw.down('#dispensingFeeRuleName').isValid()) {
            var ttDispFeeRuleMasterObj = new Object();
            ttDispFeeRuleMasterObj.DispFeeRuleID = vw.lookup('cbxDispensingFee').getValue();
            ttDispFeeRuleMasterObj.RecordMode = "U";
            if (!ttDispFeeRuleMasterObj.DispFeeRuleID) {
                ttDispFeeRuleMasterObj.RecordMode = "A";
                ttDispFeeRuleMasterObj.DispFeeRuleID = 0;
            }
            ttDispFeeRuleMasterObj.RuleName = fldDispensingFeeRuleName.getValue();

            var ttDispFeeRuleMasterArray = [];
            ttDispFeeRuleMasterArray.push(ttDispFeeRuleMasterObj);

            var dispFeeRuleMasterModel = Ext.create('Atlas.pharmacy.model.DispFeeRuleMaster', {});
            dispFeeRuleMasterModel.phantom = false;
            dispFeeRuleMasterModel.getProxy().setExtraParam('pDispFeeRuleID', 0);
            dispFeeRuleMasterModel.getProxy().setExtraParam('ttDispFeeRuleMaster', {"ttDispFeeRuleMaster": ttDispFeeRuleMasterArray});

            dispFeeRuleMasterModel.save({
                scope: me,
                success: function (record, operation, success, message) {
                    var retMessage = 'Dispensing fee rule created.';
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        if (ttDispFeeRuleMasterObj.RecordMode == "U") {
                            retMessage = "Dispensing fee rule updated.";
                        }
                        this.loadMainStore();
                        if (objResp.metadata.pDispFeeRuleIDOut) {
                            this.loadGridStore(objResp.metadata.pDispFeeRuleIDOut);
                        }
                    }
                    else {
                        retMessage = objResp.message[0].message;
                    }
                    Ext.MessageBox.show({
                        title: 'PBM',
                        msg: retMessage,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
        else {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
            return;
        }
    },

    onDetailStoreDataChanged: function () {

    },
    onMainStoreDataChanged: function () {

    },

    onRuleSelect: function (combo, record, eOpts) {
        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();
        var fldDispensingFeeRuleName = vw.down('#dfrFldset').down('#dispensingFeeRuleName');
        fldDispensingFeeRuleName.setValue(record.data.RuleName);
        this.loadGridStore(record.data.DispFeeRuleID);
        if (record.data.DispFeeRuleID != null || record.data.DispFeeRuleID != '') {
            //vw.query('#btnAdd')[0].setDisabled(false);
            vw.down('#btnAdd').setDisabled(false);
            //vw.query('#btnRemove')[0].setDisabled(false);
            vw.down('#btnRemove').setDisabled(false);
            //vw.query('#btnSaveDetails')[0].setDisabled(false);
            vw.down('#btnSaveDetails').setDisabled(false);
            vw.query('#btnSave')[0].setDisabled(false);
        }
    },

    loadGridStore: function (inRuleId) {

        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        vm.data.selDispFeeRuleId = inRuleId;
        vm.set('canRemove', false);

        var dispFeeRulesDetailStore = vm.getStore('dispFeeRulesDetail');
        delete dispFeeRulesDetailStore.proxy.extraParams.ttDispFeeRuleMaster;
        dispFeeRulesDetailStore.getProxy().setExtraParam('pDispFeeRuleID', inRuleId);
        dispFeeRulesDetailStore.on({
            scope: me,
            single: true,
            load: 'onLoadGridStore'
        });

        dispFeeRulesDetailStore.load();
    },

    onLoadGridStore: function (store, records, success, operation, opts) {


    },

    setupSubMenu: function () {
        var me = this,
            view = me.getView(),
            menuStore = me.getViewModel().getStore('menu'),
            proxy = menuStore.getProxy();

        proxy.setExtraParam('pRootMenu', view.menuId);
        proxy.setExtraParam('pLevels', 1);

        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true
        });

        menuStore.load();
    },

    onMenuLoad: function (store, records, success) {
        if (!success) {
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

        if (vm.get('viewready')) {
            view.unmask();
        }

        vm.set('initialized', true);

    }//,
    // onMenuClick: function (menu, item) {
    //
    //     var me = this,
    //         view = me.getView(),
    //         cards = view.getLayout().getLayoutItems(),
    //         created = false,
    //         len = cards.length,
    //         i = 0;
    //
    //     //Check if the tab exists
    //     for (; i < len; i++) {
    //         var curCard = cards[i];
    //         if (item.text == curCard.title) {
    //             view.setActiveTab(cards[i]);
    //             view.down('#detail').tab.show();
    //         }
    //     }
    // }

});
