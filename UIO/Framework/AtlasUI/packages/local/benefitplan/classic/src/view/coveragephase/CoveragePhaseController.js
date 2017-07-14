/**
 * Created by s6635 on 10/18/2016.
 */
Ext.define('Atlas.benefitplan.view.CoveragePhase.CoveragePhaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-coveragephasecontroller',

    listen : {
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    beforeGridEdit: function(editor, context){
        var tdsfield = editor.grid.columns[2].field,
            troopfield = editor.grid.columns[3].field;
        tdsfield.allowBlank = (context.record.data.CvrgPhaseTrOOPMax != '');
        tdsfield.validate();
        troopfield.allowBlank = (context.record.data.CvrgPhaseTotalDrugSpend != '');
        troopfield.validate();
    },
    onTDSChanged: function(field, value) {
        field.up().down('[name="CvrgPhaseTrOOPMax"]').allowBlank = (value != '');
        field.up().down('[name="CvrgPhaseTrOOPMax"]').isValid();
    },
    onTrOOPMaxChanged: function(field, value) {
        field.up().down('[name="CvrgPhaseTotalDrugSpend"]').allowBlank = (value != '');
        field.up().down('[name="CvrgPhaseTotalDrugSpend"]').isValid();
    },
    init: function () {
        Ext.getBody().mask('loading');
        var me = this,
            vm = me.getViewModel(),
            store2=vm.getStore('coveragePhaseTypes');
        store2.getProxy().setExtraParams({});
        store2.load(function(){
            var store1 = vm.getStore('coveragePhase');
            store1.getProxy().setExtraParam('BnftPlanSK',vm.get('cmbBenefitPlanSK'));
            store1.load(function(){
                if(store1.getData().getCount() > vm.getStore('coveragePhaseTypes').getData().getCount()-1){
                    vm.set("canadd", false);
                } else {
                    vm.set("canadd", true);
                }
                Ext.getBody().unmask();
            });
        });
    },
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber',2);
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    onCurrentUserRenderer : function(value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onBtnSaveClick: function() {
        var me = this;
        var store=  me.getViewModel().getStore('coveragePhase');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    Ext.getBody().mask('saving..');
                    if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                   store.sync({
                        callback:function(){
                            Ext.getBody().unmask();
                        },
                        success: function () {
                            me.getViewModel().set('changed', false);
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data saved successfully',
                                buttons: Ext.Msg.OK,
                                closable: false,
                                draggable: false,
                                resizable: false
                            });
                            me.lookup('refCoveragePhaseTypeGrid').getStore('coveragePhase').reload();
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
                        }
                    });
                }
            }
        });
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
                    me.resetForm();
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
                    panel.close();
                }
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
        var phantomRowsExist = false,
            me = this,
            panel = me.getView();
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
                    me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
                }
            });

        }else{
            panel.events.beforeclose.clearListeners();
            me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
        }
    },
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        var vm = this.getViewModel();
        if (this.addedRow) {
            var store = vm.getStore('coveragePhase');
            store.remove(store.getAt(store.getData().getCount()-1));
            this.addedRow = false;
        }
        vm.set("canadd", true);
        vm.set("changed", this.checkGridDirty(context.grid));
    },
    resetForm: function() {
        var vm = this.getViewModel(),
            gridList = this.lookup('refCoveragePhaseTypeGrid');
        gridList.findPlugin('rowediting').cancelEdit();
        Ext.getBody().mask('loading');
        gridList.store.reload(function(){
            Ext.getBody().unmask();
        });
        vm.set("changed", false);
    },
    onCoveragePhaseGridAddClick: function(){
        this.addedRow = true;
        var vm = this.getViewModel(),
            store = vm.getStore('coveragePhase'),
            records = store.getData().getCount() + 1,
            newRecord = new Atlas.benefitplan.model.CoveragePhase({});
        newRecord.set('BnftPlanSK',this.getViewModel().get('cmbBenefitPlanSK'));
        newRecord.set('CvrgPhaseSeq',records);
        store.insert(records, newRecord);
        this.lookup('refCoveragePhaseTypeGrid').getPlugin('rowEditing').startEdit(newRecord, 0);
        this.addedRow = true;
        vm.set("canadd", false);
        vm.set("changed", false);
    },
    onSelectionChange: function () {
        var getGrid =  this.lookup('refCoveragePhaseTypeGrid');
        if (getGrid.getSelectionModel().hasSelection()) {
            getGrid.getPlugin('rowEditing').enable();
        }
    },
    onCoveragePhaseGridRemoveRowClick:function (){
        var vm = this.getViewModel(),
            grid = this.lookup('refCoveragePhaseTypeGrid');
        grid.findPlugin('rowediting').cancelEdit();
        var selected = grid.getSelectionModel();
        selected.getSelection()[0].data.IsDeleted = true;
        selected.getSelection()[0].data.CurrentUser = vm.get('user').un;
        grid.store.remove(selected.getSelection());
        vm.set('changed',true);
        if (grid.store.getCount() > 0) {
            selected.select(0);
        }
        vm.set("canadd", true);
    },
    onGridEditComplete: function(editor,e){
        this.addedRow = false;
        var vm = this.getViewModel(),
            store = vm.getStore('coveragePhase');
        if(store.getData().getCount() > vm.getStore('coveragePhaseTypes').getData().getCount()-1){
            vm.set("canadd", false);
        } else {
            vm.set("canadd", true);
        }
        vm.set("changed", this.checkGridDirty(e.grid));
    },
    checkGridDirty:function(grid){
        var phantomRowsExist = false;
        grid.store.each(function(record){
            if (record.dirty) {
                phantomRowsExist = true;
            }
        });
        return phantomRowsExist;
    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
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