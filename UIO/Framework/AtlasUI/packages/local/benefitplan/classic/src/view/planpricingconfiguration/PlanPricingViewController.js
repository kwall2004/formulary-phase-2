/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitplan.PlanPricingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planpricingview',

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
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    beforeInit: function() {
        this.getViewModel().set('cmbBenefitPlanSK', this.getView().cmbBenefitPlanSK);
        this.getViewModel().set('cmbBenefitType', this.getView().cmbBenefitType);
        this.getViewModel().set('LOBName', this.getView().LOBName);
        this.getViewModel().set('viewclass', this.getView().$className);
        this.getViewModel().set('viewnumber',8);
    },
    init: function() {
        var me = this;
        var vm = me.getViewModel();
        var pharmacytypestore = vm.getStore('pharmacytypes');
        pharmacytypestore.getProxy().setExtraParam('BnftPlanSK',me.getView().cmbBenefitPlanSK);
        Ext.getBody().mask('loading');
        pharmacytypestore.load(function(records){
            if(records.length > 0) {
                me.getViewModel().set('pharmacytypesexist',true);
                me.pharmacyType = records[0].data.PharmTypeSK;
                for (var i = 0; i < records.length; i++) {
                    var currentVer = records[i];
                    var button = Ext.create('Ext.Button', {
                        text: currentVer.data.PharmTypeCode,
                        pharmacyType: currentVer.data.PharmTypeSK,
                        handler: function(button) {
                            if (!me.getViewModel().get('changed')) {
                                me.getView().down('[itemId="pharmacyTypeButtons"]').items.each(function (obj) {
                                    obj.removeCls('aBenefitPlanBtn');
                                });
                                button.addCls('aBenefitPlanBtn');
                                me.pharmacyType = button.pharmacyType;
                                var store = vm.getStore('basicdetails');
                                store.getProxy().setExtraParam('PharmTypeSK', me.pharmacyType);
                                store.getProxy().setExtraParam('BnftPlanSK', me.getView().cmbBenefitPlanSK);
                                store.reload(function(){
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: 'Please save or cancel changes to the currently selected Pharmacy type before attempting to modify another pharmacy type.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                            }
                        }
                    });
                    if(i == 0) {
                        button.addCls('aBenefitPlanBtn');
                    }
                    me.getView().down('[itemId="pharmacyTypeButtons"]').add(button);
                }
                var basicstore = vm.getStore('basicdetails');
                basicstore.getProxy().setExtraParam('PharmTypeSK', me.pharmacyType);
                basicstore.getProxy().setExtraParam('BnftPlanSK',me.getView().cmbBenefitPlanSK);
                basicstore.load(function(){
                    Ext.getBody().unmask();
                });
            }
            else{
                me.getViewModel().set('pharmacytypesexist',false);
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'At least one pharmacy type must be configured before pricing details can be created.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });


            }
        });
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
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
        var phantomRowsExist= false;
        var panel = this.getView();
        var me = this;
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
    onSelectionChange: function () {
        var getGrid=  this.getReferences().CopayDistributionGrid;
        // check if the record is from the server or new
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection()) {
            var row = getGrid.getSelectionModel().getSelection()[0];
            if(!row.phantom)
            {
                this.getViewModel().set('phantomrecord',false);
            }
            else
            {
                this.getViewModel().set('phantomrecord',true);
            }
        }
    },
    onAddClick: function () {
        var grid = this.getReferences().CopayDistributionGrid;
        var store = grid.getStore();
        var newRecord = new Atlas.benefitplan.model.BenefitPlanPricing(
            { BnftPlanSK: this.getView().cmbBenefitPlanSK,
                PharmTypeSK: this.pharmacyType,
                CurrentUser: this.getViewModel().get('user').un
            });
        store.insert(0,newRecord);
        grid.getPlugin('rowEditing').startEdit(newRecord,0);
        this.addedRow = true;
    },
    onRemoveClick: function () {
        var me = this;
        var getGrid=  this.getReferences().CopayDistributionGrid;
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection())
        {
            var selection = getGrid.getSelectionModel().getSelection()[0];
            var row = getGrid.getSelectionModel().getSelection()[0];
            if(!row.phantom)
            {
                getGrid.clicksToMoveEditor =2;
                selection.set('CurrentUser',this.getViewModel().get('user').un);
                selection.set('isDeleted',true);
                getGrid.getStore().remove(selection);
                this.getViewModel().set('changed', true);
                this.getViewModel().set('phantomrecord',false);
            }
            else {
                if (selection) {
                    var store = getGrid.getStore();
                    store.remove(selection);
                    var hasPhantom = false;
                    if(store.data.length > 0)
                    {
                        var rows = store.data.items;
                        for (var i = 0; i < rows.length; i++) {
                            var isNew = rows[i].phantom;
                            if (isNew) {
                                hasPhantom = true;
                            }
                        }
                    }
                }
            }
        }
    },
    onSaveClick: function() {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (me.getViewModel().get('changed') || isNewEntity) {
                        var basicStore=me.getViewModel().getStore('basicdetails');
                        if(basicStore.getNewRecords() || basicStore.getUpdatedRecords() || basicStore.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        basicStore.sync({ // save the record to the server
                            success: function () {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Data saved successfully',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                                me.getView().getViewModel().set("changed", false);
                                var getGrid = me.getReferences().CopayDistributionGrid;
                                getGrid.getStore().reload();
                                me.getViewModel().set('phantomrecord', false);
                            },
                            failure: function () {
                                Ext.Msg.show({
                                    title: 'Failed to Save',
                                    msg: 'Data failed to save:',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
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
    onCancelClick: function() {
        var me = this;
        if(me.getViewModel().get('changed')) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if (btn == 'yes') {
                        me.resetForm();
                    }
                }
            });
        } else {
            me.resetForm();
        }
    },
    resetForm: function() {
        var me = this;
        me.getView().getForm().reset();
        var vm = this.getViewModel();
        var store = vm.getStore('basicdetails');
        store.reload();
        me.getView().getViewModel().set("changed", false);
    },
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        var vm = this.getViewModel();
        if (this.addedRow) {
            var store = vm.getStore('basicdetails');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        vm.set('changed',this.checkGridDirty(context.grid));
    },
    onGridItemComplete: function(editor,e){
        this.addedRow = false;
        this.getViewModel().set('changed', this.checkGridDirty(e.grid));
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
        e.record.set('BnftPlanSK',this.getView().cmbBenefitPlanSK);
        e.record.set('BnftPlanPharmTypeSK',this.pharmacyType);
    },
    checkGridDirty:function(grid){
        var phantomRowsExist= false;
        var gridStore = grid.store;
        gridStore.each(function(record){
            if (record.dirty) {
                phantomRowsExist = true;
            }
        });
        return phantomRowsExist;
    },

    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        var column = gridView.getGridColumns()[col];
        var combo =  column.getEditor();
        var comboStoreName = combo.initialConfig.bind.store;
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{','');
        comboStoreName = comboStoreName.replace('}','');
        try {
            //THIS IS GOING TO FAIL BECAUSE I AM FILTERING!!!!filter removed for now
            var editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    }

});