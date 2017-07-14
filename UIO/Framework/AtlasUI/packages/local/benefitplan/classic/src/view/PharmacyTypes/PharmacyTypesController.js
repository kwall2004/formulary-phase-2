/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.PharmacyTypes.PharmacyTypesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacyTypesController',

    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args)
    {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    beforeInit: function()
    {
        this.getViewModel().set('cmbBenefitPlanSK', this.getView().cmbBenefitPlanSK);
        this.getViewModel().set('cmbBenefitType', this.getView().cmbBenefitType);
        this.getViewModel().set('LOBName', this.getView().LOBName);
        this.getViewModel().set('viewclass', this.getView().$className);
        this.getViewModel().set('viewnumber',4);
    },
    init: function()
    {
        Ext.getBody().mask('loading');
        var vm = this.getViewModel();
        if(this.getView().cmbBenefitPlanSK > 0)
        {
            vm.set('hasBnftPlanSK',  true);
            this.onLoadGrid();
        }
        else
        {
            vm.set('hasBnftPlanSK',  false);
        }

    },
    onLoadGrid: function () {
        var vm = this.getViewModel();
        var hasBnftPlanSK  =  vm.get('hasBnftPlanSK');
        if(hasBnftPlanSK) {
            // initial load of the store for the grid
            var pharmacyType = vm.getStore('pharmacyTypes');
            pharmacyType.getProxy().setExtraParams({});
            pharmacyType.load(function(){
                var pharmacyTypesStore = vm.getStore('pharmacyLimits');
                pharmacyTypesStore.getProxy().setExtraParams({
                    'BnftPlanSK': vm.get('cmbBenefitPlanSK')
                });
                pharmacyTypesStore.load(function(){
                    Ext.getBody().unmask();
                });
            });
        }
        else {
            Ext.getBody().unmask();
        }
    },
    checkForUnsavedRecords: function(panel , eOpts ) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element, index, array){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id, value){
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
        panel.query('grid').forEach(function logArrayElements(element, index, array){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id, value){
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
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        //var column = gridView.getGridColumns()[col];
        var column = gridView.headerCt.getGridColumns()[col];
        var combo =  column.getEditor();
        var comboStoreName = combo.initialConfig.bind.store;
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{','');
        comboStoreName = comboStoreName.replace('}','');
        try {
            var editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    },
    /*pharmacyTypes*/
    onPharmacyTypesRender:function(value) {
        var vm = this.getViewModel();
        var store = vm.getStore('pharmacyTypes');
        var rec = store.findRecord('PharmTypeSK', value, 0, false, false, true);
        if (rec)
        {
            return rec.get('PharmTypeCode');
        }
        return '&mdash;';
    },
    /*Add pharmacyLimits Row*/
    onRowAddClick: function() {
        var vm = this.getViewModel();
        var store = vm.getStore('pharmacyLimits');
        //This will create new model with all fields, but empty DaySupplyList
        var newRecord = new Atlas.benefitplan.model.BenefitPlanPharmacyLimitsConfig({
            // any new values that are part of model go here
        });
        //now add missing part in the model
        newRecord.set('DaySupplyTypeList', [
            {
                "BnftPlanPharmTypeDaySuplSK": 0,
                "DaySuplTypeSK": 1,
                "MaximumCost": 0,
                "DaySuplTypeCode": "1 Month",
                "DaySuplTypeDesc": "1 Month",
                "IsDeleted": false,
                CurrentUser:  vm.get('user').un
            },
            {

                "BnftPlanPharmTypeDaySuplSK": 0,
                "DaySuplTypeSK": 2,
                "MaximumCost": 0,
                "DaySuplTypeCode": "60 Day",
                "DaySuplTypeDesc": "60 Day",
                "IsDeleted": false,
                CurrentUser:  vm.get('user').un
            },
            {
                "BnftPlanPharmTypeDaySuplSK": 0,
                "DaySuplTypeSK": 3,
                "MaximumCost": 0,
                "DaySuplTypeCode": "90 Day",
                "DaySuplTypeDesc": "90 Day",
                "IsDeleted": false,
                CurrentUser:  vm.get('user').un
            },
            {
                "BnftPlanPharmTypeDaySuplSK": 0,
                "DaySuplTypeSK": 4,
                "MaximumCost": 0,
                "DaySuplTypeCode": "Any",
                "DaySuplTypeDesc": "Any",
                "IsDeleted": false,
                CurrentUser:  vm.get('user').un
            }]);
        this.addedRow = true;
        newRecord.set('BnftPlanSK',vm.get('cmbBenefitPlanSK'));
        store.insert(0, newRecord);
        this.getView().down('grid[reference=pharmacyLimitsConfigurationGrid]').findPlugin('rowediting').startEdit(newRecord, 0);

    },
    onGridBeforeEdit: function() {
        this.getViewModel().set('editingrow', true);
    },
    /*Remove pharmacyLimits Row*/
    onRowRemoveClick: function() {
        var me = this;
        var getGrid= this.getView().down('grid[reference=pharmacyLimitsConfigurationGrid]');
        getGrid.findPlugin('rowediting').cancelEdit();
        var selected = getGrid.getSelectionModel();
            var pharmTypeCode = selected.getSelection()[0].data.PharmTypeCode;
                    Ext.Msg.show({
                        title: 'Confirm Remove',
                        msg: 'Are you sure you want to remove ' + pharmTypeCode + ' from this Pharmacy Limits Configuration?',
                        buttons: Ext.Msg.YESNO,
                        closable: false,
                        draggable: false,
                        resizable: false,
                        fn: function (btn) {
                            if (btn == 'yes') {
                                //ready for delete
                                var selection = selected.getSelection()[0];
                                if (selection) {
                                    var vm = this.getViewModel();
                                    selection.data.BnftPlanSK = vm.get('cmbBenefitPlanSK');
                                    var daysup = selection.data.DaySupplyTypeList;
                                    for (var i = 0; i < daysup.length; i++) {
                                        daysup[i].CurrentUser = me.getViewModel().get('user').un;
                                    }
                                    selection.data.CurrentUser = me.getViewModel().get('user').un;
                                    selection.data.IsDeleted = true;
                                    vm.set('changed', true);
                                    getGrid.store.remove(selected.getSelection());
                                }
                            }
                        }, scope: this
                    });

    },
    onPharmacyLimitsConfigurationBtnSave:function () {
        var vm = this.getViewModel();
        //1. pharmacyLimits
        var pharmacyLimitsStore = vm.getStore('pharmacyLimits');

        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == 'yes') {
                    //1. sync  pharmacyLimits

                    if(vm.get('changed')) {
                        if(pharmacyLimitsStore.getNewRecords() || pharmacyLimitsStore.getUpdatedRecords() || pharmacyLimitsStore.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        pharmacyLimitsStore.sync(
                            {
                                success: function (results, operation) {
                                    Ext.getBody().unmask();
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: 'Data saved successfully',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                    vm.set("changed", false);
                                    pharmacyLimitsStore.reload();
                                },
                                failure: function (results, operation) {
                                    Ext.getBody().unmask();
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
                            }, this);
                    }
                    else{
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully',
                            buttons: Ext.Msg.OK,
                            closable: false,
                            draggable: false,
                            resizable: false
                        });
                    }
                }
            }
            , scope: this
        });
    },
    onPharmacyLimitsConfigurationBtnCancel: function() {
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
                    me.getReferences().pharmacyLimitsConfigurationGrid.getStore().rejectChanges();
                    me.getViewModel().set("changed", false);
                }
            }
        });
    },
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        var vm = this.getViewModel();
        if (this.addedRow) {
            var store = vm.getStore('pharmacyLimits');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        vm.set('editingrow', false);
        vm.set('changed',this.checkGridDirty(context.grid));

    },
    onCurrentUserRenderer : function(value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onGridItemComplete: function(editor,e,opt){
        var me = this;
        me.addedRow = false;
        me.getViewModel().set('editingrow', false);
        me.getViewModel().set("changed", me.checkGridDirty(e.grid));
        var daysup = e.record.data.DaySupplyTypeList;
        for(var i = 0; i < daysup.length;i++) {
            daysup[i].CurrentUser = me.getViewModel().get('user').un;
        }
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
    }
});
