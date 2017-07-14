/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.copayconfiguration.CopayConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.copayConfigurationController',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        var vm = this.getViewModel();
        if(vm.get('viewclass') && vm.get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    /*
     * Generic method to show a message dialog to prevent repeated code
     */
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
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        Ext.getBody().mask('loading..');
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber',6);
    },

    connectGrids: function(){
        this.storeloadcount++;
        if(this.storeloadcount == 7) {
            this.lookup('refCopayConfigurationGrid').reconfigure(this.getViewModel().getStore('copayconfiguration'));
            Ext.getBody().unmask();
        }
    },
    guideUser: function(screenname) {
        this.showMessage('Error', screenname + ' values not set up yet, please go back and configure.');
    },
    init: function() {
        this.isvalid = true;
        this.CvrgPhaseTypeFilter = new Ext.util.Filter({
            property: 'CvrgPhaseSK',
            value   : '',
            exactMatch: true
        });
        this.FrmlryTierFilter = new Ext.util.Filter({
            property: 'FrmlryTierSK',
            value   : '',
            exactMatch: true
        });
        this.NetworkTierFilter = new Ext.util.Filter({
            property: 'NtwrkTierSK',
            value   : '',
            exactMatch: true
        });
        this.PharmacyTypeFilter = new Ext.util.Filter({
            property: 'PharmTypeSK',
            value   : '',
            exactMatch: true
        });
        var me = this,
            vm = this.getViewModel(),
            storeCvrgType = vm.getStore('coveragephasetype');
        this.storeloadcount = 0;
        storeCvrgType.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        storeCvrgType.load(function(records) {
            if (records.length > 0) {
                me.coveragePhaseType = records[0].data.CvrgPhaseSK;
                this.each(function (row) {
                    var button = Ext.create('Ext.Button', {
                        text: row.get('CvrgPhaseCode'),
                        coveragePhaseType: row.get('CvrgPhaseSK'),
                        handler: 'onCvrgPhaseTypeButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="coveragePhaseButtons"]').add(button);
                });
                me.connectGrids();
            } else {
                Ext.getBody().unmask();
                me.guideUser('Coverage Phase', 'coveragephase.Main');
            }
        });
        //Load Formulary Tier Buttons
        var storeForm = vm.getStore('formularytier');
        storeForm.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        storeForm.load(function(records){
            if(records.length > 0) {
                me.formularytier = records[0].data.FrmlryTierSK;
                this.each(function (row) {
                    var button = Ext.create('Ext.Button', {
                        text: 'Tier ' + row.get('FrmlryTierNbr'),
                        formularytier: row.get('FrmlryTierSK'),
                        handler: 'onFrmlryButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="formularyTierButtons"]').add(button);
                });
                me.connectGrids();
            } else {
                Ext.getBody().unmask();
                me.guideUser('Formulary Tier', 'benefitplandetailconfiguration.Main');
            }
        });

        var NetworkTierStore = vm.getStore('NetworkTier');
        NetworkTierStore.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        NetworkTierStore.load(function(records){
            if(records.length > 0) {
                this.each(function (row) {
                    var button = Ext.create('Ext.Button', {
                        text: row.get('NtwrkTierName'),
                        networkTier: row.get('NtwrkTierSK'),
                        handler: 'onNetworkTierButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="networkTierButtons"]').add(button);
                });
                me.connectGrids();
            } else {
                Ext.getBody().unmask();
                me.guideUser('Network Tier', 'benefitplandetailconfiguration.Main');
            }
        });

        var pharmStore = me.getView().getViewModel().getStore('pharmacytype');
        pharmStore.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        pharmStore.load(function(records){
            if(records.length > 0) {
                this.each(function(record){
                    var button = Ext.create('Ext.Button', {
                        text: record.get('PharmTypeCode'),
                        pharmacyType: record.get('PharmTypeSK'),
                        handler: 'onPharmacyTypeButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="pharmacyTypeButtons"]').add(button);
                });
                me.connectGrids();
            } else {
                Ext.getBody().unmask();
                me.guideUser('Pharmacy Types', 'PharmacyTypes.Main');
            }
        });
        var store = vm.getStore('copayconfiguration');
        store.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        store.load({callback: function(){
            me.connectGrids();
        }});
        vm.getStore('daysupplytype').load({callback: function(){
            me.connectGrids();
        }});
        vm.getStore('logic').load({callback: function(){
            me.connectGrids();
        }});
    },
    onCvrgPhaseTypeButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copayconfiguration');
        this.getView().down('[itemId="coveragePhaseButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.CvrgPhaseTypeFilter);
        if(activating) {
            this.CvrgPhaseTypeFilter.setConfig('value',button.coveragePhaseType);
            this.lookup('refCopayConfigurationGrid').columns[2].setVisible(false);
            store.addFilter(this.CvrgPhaseTypeFilter);
            button.addCls('aBenefitPlanBtn');
        } else {
            this.lookup('refCopayConfigurationGrid').columns[2].setVisible(true);
        }
    },
    onFrmlryButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copayconfiguration');
        this.getView().down('[itemId="formularyTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.FrmlryTierFilter);
        if(activating) {
            this.FrmlryTierFilter.setConfig('value', button.formularytier);
            this.lookup('refCopayConfigurationGrid').columns[3].setVisible(false);
            store.addFilter(this.FrmlryTierFilter);
            button.addCls('aBenefitPlanBtn');
        } else {
            this.lookup('refCopayConfigurationGrid').columns[3].setVisible(true);
        }
    },
    onNetworkTierButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copayconfiguration');
        this.getView().down('[itemId="networkTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.NetworkTierFilter);
        if(activating) {
            this.NetworkTierFilter.setConfig('value', button.networkTier);
            this.lookup('refCopayConfigurationGrid').columns[0].setVisible(false);
            store.addFilter(this.NetworkTierFilter);
            button.addCls('aBenefitPlanBtn');
        } else {
            this.lookup('refCopayConfigurationGrid').columns[0].setVisible(true);
        }
    },
    onPharmacyTypeButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copayconfiguration');
        this.getView().down('[itemId="pharmacyTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.PharmacyTypeFilter);
        if(activating) {
            this.PharmacyTypeFilter.setConfig('value', button.pharmacyType);
            this.lookup('refCopayConfigurationGrid').columns[1].setVisible(false);
            store.addFilter(this.PharmacyTypeFilter);
            button.addCls('aBenefitPlanBtn');
        } else {
            this.lookup('refCopayConfigurationGrid').columns[1].setVisible(true);
        }
    },
    storeUpdated: function() {
        this.getViewModel().set('changed', true);
    },
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        if (this.addedRow) {
            var store = this.getViewModel().getStore('copayconfiguration');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        this.getViewModel().set('changed', this.checkGridDirty(context.grid));
    },
    onGridItemComplete: function(editor, e){
        this.addedRow = false;
        this.getViewModel().set('changed', this.checkGridDirty(e.grid));
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
    },
    checkGridDirty:function(grid){
        var phantomRowsExist= false;
        grid.store.each(function(record){
            if (record.dirty) {
                phantomRowsExist = true;
            }
        });
        return phantomRowsExist;
    },
    onSelectionChange: function () {
        var getGrid=  this.lookup('refCopayConfigurationGrid');
        if (getGrid.getSelectionModel().hasSelection()) {
            getGrid.getPlugin('rowEditing').enable();
        }
    },
    onCurrentUserRenderer : function(value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onSaveClick: function () {
        var me = this,
            vm = me.getViewModel(),
            store=vm.getStore('copayconfiguration');
        store.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        store.getProxy().setExtraParam('CurrentUser',vm.get('user').un);
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {

                    if (vm.get('changed')) {
                        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        store.sync({ // save the record to the server
                            success: function () {
                                me.showMessage('Success', 'Data saved successfully');
                                vm.set("changed", false);
                                vm.getStore('copayconfiguration').reload();
                            },
                            failure: function () {
                                me.showMessage('Failed to Save', 'Data failed to save:');
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            }
        });
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    panel.close();}
            });
        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    benefitPlanHasUnsavedRecords: function(args ) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var me = this,
            phantomRowsExist= false,
            panel = me.getView();
        panel.query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
                }
            });

        }else{
            panel.events.beforeclose.clearListeners();
            me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
        }
    },
    onCopyClick: function(){
        var vm = this.getViewModel();
        this.getView().down('[itemId="onCopyClick"]').show(null, function(){
            var cnstore = vm.getStore('CurrentNetworkTiers');
            cnstore.removeAll();
            var store = vm.getStore('copayconfiguration');
            store.each(function(record){
                if(cnstore.find('NtwrkTierSK', record.data.NtwrkTierSK) == -1) {
                    cnstore.add({NtwrkTierSK: record.data.NtwrkTierSK, NtwrkTierName: record.data.NtwrkTierName});
                }
            });
        });
    },
    onfromNtwrkTierSelect:function(combo, record){
        var vm = this.getViewModel();
        vm.set('copyFromNtwrkTier', record.data.NtwrkTierSK);
        var storeNetworkTierPharmTypesInPlan = vm.getStore('NetworkTierPharmTypesInPlan');
        storeNetworkTierPharmTypesInPlan.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        storeNetworkTierPharmTypesInPlan.getProxy().setExtraParam('NtwrkTierSK',record.data.NtwrkTierSK);
        storeNetworkTierPharmTypesInPlan.load();
        //Load Related Pharmacy type available for selected Network Tier
    },
    onfromPharmacyTypeSelect:function(combo, record) {
        this.getViewModel().set('copyFromPharmType', record.data.PharmTypeSK);
    },
    ontoNtwrkTierSelect: function(combo, record){
        this.getViewModel().set('copyToNtwrkTier', record.data.NtwrkTierSK);
    },
    ontoPharmacyTypeSelect: function(combo, record){
        this.getViewModel().set('copyToPharmType', record);
    },
    syncData: function(store) {
        var me = this,
            vm = me.getViewModel();
        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        store.sync({ // save the record to the server
            success: function() {
                me.showMessage('Success', 'Copy copay configuration successful.');
                vm.set("changed", false);
                store.remove(store.getAt(0));
            },
            failure: function(results) {
                var responsemessage = "";
                for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                    if (responsemessage != '') {
                        responsemessage += '<br />';
                    }
                    responsemessage += JSON.parse(results.operations[i].getResponse().responseText).messages.map(function (elem) {
                        return elem.message;
                    }).join(",");
                }
                me.showMessage('Failed to Save', 'Data failed to save:<br />' + responsemessage);
                store.remove(store.getAt(0));
            },
            callback:function(){
                Ext.getBody.unmask();
            }
        });
    },
    onCopyCopaySaveClick: function() {
        var me = this,
            vm =  me.getViewModel(),
            store = vm.getStore('copyCopay'),
            toPharmTypes = [];
        vm.get('copyToPharmType').forEach(function(item) {
            toPharmTypes.push(item.data.PharmTypeSK);
        });
        var newRecord = new Atlas.benefitplan.model.CopyCopayConfiguration(
            {
                'bnftPlanSK': vm.get('cmbBenefitPlanSK'),
                'copyFromPharmTypeSK': vm.get('copyFromPharmType'),
                'copyToPharmTypes': toPharmTypes,
                'copyFromNtwrkTierSK': vm.get('copyFromNtwrkTier'),
                'copyToNtwrkTierSK': vm.get('copyToNtwrkTier'),
                'username': vm.get('user').un,
                'overwriteDuplicates': ''
            }
        );
        store.insert(0, newRecord);
        store.getProxy().setUrl("/CopyCopayConfiguration");
        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        store.sync(
        {
            success: function () {
                var copaystore = vm.getStore('copayconfiguration');
                copaystore.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
                copaystore.load();
                me.showMessage('Success', 'Copy copay configuration successful.');
                vm.getStore('pharmacytype').clearFilter();
                me.resetForm();
            },
            failure: function (results) {
                var responsemessage = "";
                for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                    if (responsemessage != '') {
                        responsemessage += '<br />';
                    }
                    responsemessage += JSON.parse(results.operations[i].getResponse().responseText).messages.map(function (elem) {
                        return elem.message;
                    }).join(",");
                }
                if(responsemessage.indexOf("already exist for one or more") > -1) {
                    Ext.Msg.show({
                        title: 'Confirm Save',
                        msg: responsemessage + '</br>Would you like to overwrite them?',
                        buttons : Ext.Msg.YESNO,
                        closable: false,
                        draggable: false,
                        resizable: false,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                store.data.items[0].data.overwriteDuplicates = true;
                                me.syncData(store);
                            } else {
                                store.data.items[0].data.overwriteDuplicates = false;
                                me.syncData(store);
                            }
                        }
                    });
                } else {
                    me.showMessage('Failed to Save', 'Data failed to save:<br />' + responsemessage);
                    store.remove(store.getAt(0));
                }
            },
            callback:function(){
                Ext.getBody().unmask();
            }
        });
        me.getView().down('[itemId="onCopyClick"]').hide();
    },
    onCopyCopayCancelClick: function () {
        this.getView().down('[itemId="onCopyClick"]').hide();
    },
    onUserRenderer: function(value, obj, rec){
        return rec.data.username = this.getViewModel().get('user').un;
    },
    onCancelClick: function() {

        var me = this;
        Ext.Msg.show({
            title: 'Confirm Cancel',
            msg: 'Are you sure you want to cancel and lose your changes?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (me.getViewModel().get('changed')) {
                        var grid = me.lookup('refCopayConfigurationGrid');
                        grid.getPlugin('rowEditing').cancelEdit();
                        me.resetForm();
                        grid.store.reload();
                    }
                    else {
                        me.resetForm();
                    }
                }
            }
        });
    },
    resetForm: function() {
        var me = this,
            view = me.getView();
        view.down('[itemId="coveragePhaseButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        view.down('[itemId="formularyTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        view.down('[itemId="pharmacyTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        view.down('[itemId="networkTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        var store = this.lookup('refCopayConfigurationGrid').store;
        store.removeFilter(this.FrmlryTierFilter);
        store.removeFilter(this.CvrgPhaseTypeFilter);
        store.removeFilter(this.NetworkTierFilter);
        store.removeFilter(this.PharmacyTypeFilter);
        me.getViewModel().set("changed", false);
    },
    onCopaySetupGridAddClick: function(){
        var vm = this.getViewModel(),
            store = vm.getStore('copayconfiguration'),
            filters = store.getFilters(),
            newRecord = new Atlas.benefitplan.model.CopaySetup({'BnftPlanSK': this.getView().cmbBenefitPlanSK});
        vm.set('changed',true);
        if(filters.contains(this.FrmlryTierFilter)) {
            newRecord.set('FrmlryTierSK',this.FrmlryTierFilter.getConfig('value'));
        }
        if(filters.contains(this.CvrgPhaseTypeFilter)) {
            newRecord.set('CvrgPhaseSK',this.CvrgPhaseTypeFilter.getConfig('value'));
        }
        if(filters.contains(this.NetworkTierFilter)) {
            newRecord.set('NtwrkTierSK',this.NetworkTierFilter.getConfig('value'));
        }
        if(filters.contains(this.PharmacyTypeFilter)) {
            newRecord.set('PharmTypeSK',this.PharmacyTypeFilter.getConfig('value'));
        }
        newRecord.data.CopayCoinsuranceLogicTypeSK = 1;
        store.insert(0, newRecord);
        this.lookup('refCopayConfigurationGrid').getPlugin('rowEditing').startEdit(newRecord, 0);
        this.addedRow = true;
    },
    onCopaySetupGridRemoveRowClick:function (){
        var vm = this.getViewModel(),
            grid = this.lookup('refCopayConfigurationGrid'),
            sm = grid.getSelectionModel(),
            sel = sm.getSelection(),
            seldata = sel[0].data;
        grid.findPlugin('rowediting').cancelEdit();
        seldata.Deleted = true;
        seldata.bnftPlanSK = vm.get('cmbBenefitPlanSK');
        seldata.CurrentUser = vm.get('user').un;
        grid.store.remove(sel);
        vm.set('changed',true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
        vm.set('validform', true);
    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        //var column = gridView.getGridColumns()[col];
        var column = gridView.headerCt.getGridColumns()[col],
            combo =  column.getEditor(),
            comboStoreName = combo.initialConfig.bind.store,
            editorDisplayValue = '';
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{','');
        comboStoreName = comboStoreName.replace('}','');
        try {
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    }
});