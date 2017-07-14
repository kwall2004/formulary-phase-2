
Ext.define('Atlas.benefitplan.view.servicearea.ServiceAreaViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanservicearea',
    listen: {
        controller: {
            '*': {
                onWorkFlowUpdate:'onWorkFlowUpdate'
            }
        }
    },
    onWorkFlowUpdate: function(args) {
        var isReadOnly = args != undefined && args.status != undefined,
            vm = this.getViewModel();
        vm.set('isReadOnly', isReadOnly);
    },
    init: function() {
        Ext.getBody().mask('loading');
        var vm = this.getViewModel(),
            store = vm.getStore('bpserviceareaconfig'),
            isReadOnly = !this.getView().canChangePBPBnftPlanList;
        vm.set('pbpSK', this.getView().atlasId);
        vm.set('isReadOnly', isReadOnly);
        if(isReadOnly) {
            this.lookup('bpserviceareagrid').findPlugin('rowediting').disable();
            this.lookup('approvedInfo').show();
        }
        else {
            this.lookup('approvedInfo').hide();
        }
        this.lookup('saHierarchyArea').hide();
        this.lookup('lookupgrid').hide();
        this.lookup('pbpnamefield').setValue(this.getView().pbpName);
        store.getProxy().setExtraParam('pbpSK', vm.get('pbpSK'));
        store.load(function(){
            Ext.getBody().unmask();
        });
    },


    reloadBPServiceAreaStore: function (SvcAreaSK) {
        var me = this,
            vm = this.getViewModel(),
            store = vm.getStore('bpserviceareaconfig');
        store.reload({
            scope: this,
            callback: function() {
                var bpserviceareagird = me.lookup('bpserviceareagrid');
                bpserviceareagird.getSelectionModel().select(bpserviceareagird.getStore().find('SvcAreaSK',SvcAreaSK));
            }
        });

    },
    addHistoryRow: function () {
        var grid = this.lookupReference('bpserviceareagrid'),
            rec = new Atlas.benefitplan.model.servicearea.ServiceAreas({
                SvcAreaName: '',
                EfctvStartDt: new Date("1/1/1900"),
                EfctvEndDt: new Date("12/31/9999")

            });
        this.lookup('saHierarchyArea').show();
        this.lookup('lookupgrid').show();
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.add(rec);
        grid.findPlugin('rowediting').startEdit(rec);
        this.lookup('bpserviceareagrid').getSelectionModel().select(grid.store.getCount()-1);
        this.getViewModel().set('changed',true);
        this.getViewModel().set('serviceAreaSelected',false);
    },
    removeHistoryRow: function (button) {
        var me = this,
            grid = button.up('grid'),
            sm = grid.getSelectionModel(),
            vm = me.getViewModel();

        Ext.Msg.show({
            title: 'Confirm Remove',
            msg: 'Are you sure you want to remove this row?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == "yes") {
                    grid.findPlugin('rowediting').cancelEdit();
                    sm.getSelection()[0].set('Deleted', true);
                    sm.getSelection()[0].set('CurrentUser', vm.get('user').un);
                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    me.getViewModel().set('changed',true);
                    me.getViewModel().set('serviceAreaSelected',true);
                }
            }
        })
    },
    selectHistoryRow: function (view, record) {
        var vm = this.getViewModel(),
            store = vm.getStore('sacountrylookup'),
            proxy = store.getProxy();
        vm.set('record', record);
        vm.set('isCountryHidden', true);
        vm.set('isStateHidden', true);
        vm.set('isCountyHidden', true);
        var newRecord = record.data.ServiceAreaHierarchy;
        if(newRecord != null) {
            this.addLeafProperties(newRecord);
            this.lookup('saHierarchyArea').show();
            this.lookup('lookupgrid').show();
            this.lookup('saSelectAll').value = false;
            this.onSelectAll();
            var tree = this.lookup('sahierarchytree');
            tree.setRootNode({
                title: 'Service Area Tree',
                expanded: true,
                ChildrenNodes: Ext.clone(newRecord)
            });
            vm.set('lookupType', record.get('CountryLookup').LookupType);
            vm.set('svcAreaSK', record.get('CountryLookup').SvcAreaSK);
            proxy.setExtraParams({'lookupType': 10, 'svcAreaSK': vm.get('svcAreaSK'), 'lookupTypeSK': 1});
            store.load();
            tree.expandAll();
            vm.set('changed',false)
        }
        else {
            vm.set('lookupType', 10);
            vm.set('svcAreaSK', 0);
            record.set('PBPSK', this.getViewModel().get('pbpSK'));
            record.set('SvcAreaSK', 0);
            proxy.setExtraParams({'lookupType': 10, 'svcAreaSK': 0, 'lookupTypeSK': 1});
            store.load();
        }
    },
    selectDetailItem: function( ctrl, td, cellIndex, record) {
        if(cellIndex == 1 && record.get('LookupTypeChild') != 999) {
            var vm = this.getViewModel(),
                store = vm.getStore('sacountrylookup'),
                proxy = store.getProxy();
            if(record.get('LookupTypeChild') == 20 && vm.get('isCountryHidden') == true){
                vm.set('isCountryHidden', false);
                this.lookup('saCountry').setText('Country: ' + record.get('LookupTypeDescription'));
                vm.set('CountrySK', record.get('LookupTypeSK'));
            }
            if(record.get('LookupTypeChild') == 30 && vm.get('isStateHidden') == true) {
                vm.set('isStateHidden', false);
                this.lookup('saState').setText('State: ' + record.get('LookupTypeDescription'));
                vm.set('StateSK', record.get('LookupTypeSK'));
            }
            if(record.get('LookupTypeChild') == 40 && vm.get('isCountyHidden') == true) {
                vm.set('isCountyHidden', false);
                this.lookup('saCounty').setText('County: ' + record.get('LookupTypeDescription'));
                vm.set('CountySK', record.get('LookupTypeSK'));
            }
            vm.set('lookupType', record.get('LookupTypeChild'));
            vm.set('lookupTypeSK', record.get('LookupTypeSK'));
            this.lookup('saSelectAll').value = false;
            this.onSelectAll();
            proxy.setExtraParams({'lookupType':  record.get('LookupTypeChild'), 'svcAreaSK': vm.get('svcAreaSK'), 'lookupTypeSK': record.get('LookupTypeSK')});
            store.load();
        }
    },
    onSelectAll: function() {
        if(this.lookup('saSelectAll').value === true) {
            this.lookup('lookupgrid').getStore().each( function() {
                this.set('Selected', true);
            });
            this.getViewModel().set('changed',true);
        }
        else {
            this.lookup('lookupgrid').getStore().each( function() {
                this.set('Selected', false);
            });
            this.getViewModel().set('changed',true);
        }
    },
    onCountry: function() {
        var vm = this.getViewModel(),
            store = vm.getStore('sacountrylookup');
        vm.set('isCountryHidden', true);
        vm.set('isStateHidden', true);
        vm.set('isCountyHidden', true);
        this.lookup('saSelectAll').value = false;
        this.onSelectAll();
        vm.set('lookupType', 10);
        store.getProxy().setExtraParams({'lookupType': 10, 'svcAreaSK': vm.get('svcAreaSK'), 'lookupTypeSK': vm.get('CountrySK')});
        store.load();
    },
    onState: function() {
        var vm = this.getViewModel(),
            store = vm.getStore('sacountrylookup');
        vm.set('isStateHidden', true);
        vm.set('isCountyHidden', true);
        this.lookup('saSelectAll').value = false;
        this.onSelectAll();
        vm.set('lookupType', 20);
        store.getProxy().setExtraParams({'lookupType': 20, 'svcAreaSK': vm.get('svcAreaSK'), 'lookupTypeSK': vm.get('CountrySK')});
        store.load();
    },
    onCounty: function() {
        var vm = this.getViewModel(),
            store = vm.getStore('sacountrylookup');
        vm.set('isCountyHidden', true);
        this.lookup('saSelectAll').value = false;
        this.onSelectAll();
        vm.set('lookupType', 30);
        store.getProxy().setExtraParams({'lookupType': 30, 'svcAreaSK': vm.get('svcAreaSK'), 'lookupTypeSK': vm.get('StateSK')});
        store.load();
    },

    onGridItemCancelEdit: function(editor,e) {
        var me = this;
        if(e.record.phantom)
        {
            me.lookupReference('bpserviceareagrid').getStore().remove(e.record);
        }
        me.getViewModel().set('changed',false);
    },
    onGridBeforeEdit : function(){
        this.getViewModel().set('changed',true);
        this.getViewModel().set('serviceAreaSelected',false);
    },
    addLeafProperties: function(objects) {
        if(objects.length != null) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].ChildrenNodes.length == 0) {
                    objects[i].leaf = true;
                }
                else {
                    objects[i].leaf = false;
                    this.addLeafProperties(objects[i]);
                }
            }
        }
        else if(objects.ChildrenNodes != null){
            for (var i = 0; i < objects.ChildrenNodes.length; i++) {
                if (objects.ChildrenNodes[i].ChildrenNodes.length == 0) {
                    objects.ChildrenNodes[i].leaf = true;
                }
                else {
                    objects.ChildrenNodes[i].leaf = false;
                    this.addLeafProperties(objects.ChildrenNodes[i]);
                }
            }
        }
    },
    onCancel: function () {
        var me = this;
        if(!me.getViewModel().get('changed')){
            me.getView().events.close.clearListeners();
            me.getView().close();
        }else{
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == "yes") {
                        me.init();
                        me.getViewModel().set('changed',true);
                        me.getViewModel().set('serviceAreaSelected',true);
                    }
                }
            })
        }
    },

    GetReturnedRecords: function (results) {
        var ReturnedRecords = [];
        if (results.operations.length > 0) {
            Ext.Array.each(results.operations, function (operation) {
                Ext.Array.each(JSON.parse(operation.getResponse().responseText), function (responseobject) {
                    ReturnedRecords.push(responseobject);
                });
            });
        }
        if (ReturnedRecords.length ==1)
        {
            return ReturnedRecords[0];
        }else
        {
            return ReturnedRecords;
        }
    },
    selectionChangeFunction: function(){
        this.getViewModel().set('changed',true);
    },

    onServiceAreaSelectionChange : function(grid, selected)
    {
        var me=this,
            vm = me.getViewModel();
        if (selected.length > 0)
        {
            vm.set('serviceAreaSelected',true);
            if (selected[0].phantom)
            {
                this.lookup('saHierarchyArea').hide();
                this.lookup('lookupgrid').hide();
            }
        }else
        {
            vm.set('serviceAreaSelected',false);
            this.lookup('saHierarchyArea').hide();
            this.lookup('lookupgrid').hide();

        }
        vm.set('changed',false);
    },
    onGridItemComplete:function(){
        this.getViewModel().set('changed',true);
        this.getViewModel().set('serviceAreaSelected',true);
    },
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    onCurrentUserRenderer: function (value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onSave: function () {
        var me = this,
        vm = me.getViewModel();
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == "yes") {
                    var selected = null;
                    if(me.lookup('bpserviceareagrid').getSelectionModel().hasSelection()) {
                        selected = me.lookup('bpserviceareagrid').getSelectionModel().getSelected().items[0];
                    }
                    grid = me.lookupReference('bpserviceareagrid');
                    store = grid.getStore();
                    updatedRows = store.getUpdatedRecords();
                    if(updatedRows.length == 0 && selected){
                        updatedRows[0]=selected;
                    }

                    for (var i = 0; i < updatedRows.length; i++) {
                        selected = updatedRows[i];
                        selected.set('CurrentUser', vm.get('user').un);
                        if (me.lookup('lookupgrid').store.data.length > 0) {
                            selected.set('Transactions', []);
                            this.lookup('lookupgrid').store.each(function (serviceArea) {
                                if (serviceArea.dirty == true) {
                                    selected.get('Transactions').push({
                                        SvcAreaSK: vm.get('svcAreaSK'),
                                        TransactionType: vm.get('lookupType'),
                                        SvcAreaTypeSK: serviceArea.get('SvcAreaTypeSK'),
                                        TransactionTypeSK: serviceArea.get('LookupTypeSK'),
                                        Deleted: !serviceArea.get('Selected')
                                    });
                                    serviceArea.commit();
                                }
                            });
                            me.lookup('lookupgrid').store.sync();
                        }
                    }
                    var configStore=  vm.getStore('bpserviceareaconfig');
                    if(configStore.getNewRecords() || configStore.getUpdatedRecords() || configStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    configStore.sync({
                        callback:function(){
                          Ext.getBody().unmask();
                         },
                        failure: function () {
                            vm.set('changed',true);
                            me.showMessage('Failed to Save', 'Data failed to save:');
                        },
                        success: function (record) {
                            var returnedrecord = me.GetReturnedRecords(record);
                            for (var i = 0; i < updatedRows.length; i++) {
                                selected = updatedRows[i];
                                if(Ext.isObject(returnedrecord)){
                                    vm.set('selectedServiceAreaSK', returnedrecord.id[0]);
                                    selected.data.SvcAreaSK = returnedrecord.id[0];
                                    me.reloadBPServiceAreaStore(returnedrecord.id[0]);
                                }else{
                                    vm.set('selectedServiceAreaSK', returnedrecord[i].id[0]);
                                    selected.data.SvcAreaSK = returnedrecord[i].id[0];
                                    me.reloadBPServiceAreaStore(returnedrecord[i].id[0]);
                                }
                            }
                            me.lookup('saSelectAll').value = false;
                            me.onSelectAll();
                            vm.set('changed',false);
                            vm.set('serviceAreaSelected',false);
                            me.showMessage('Success', 'Data saved successfully');
                        }
                    });
                }
            }
        , scope: this
        });
    }
});