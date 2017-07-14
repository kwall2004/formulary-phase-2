/**
 * Created by s6635 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.view.planexceptionlimits.PlanExceptionLimitsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanexceptionlimits',

    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                onCloseBenefitPlanDetailConfiguration: 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    beforeInit: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        this.getViewModel().set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber',5);
    },
    init: function(){
        this.storeLoadCount = 0;
        this.saveMsg='';
        this.cnt=0;
        this.msgArr = [];
        this.isvalid = true;
        var vm = this.getViewModel();
        vm.set('bnftPlanSK', this.getView().cmbBenefitPlanSK);
        if(this.getView().cmbBenefitPlanSK > 0)
        {
            vm.set('hasBnftPlanSK',  true);
            this.onLoadTheGrid();
        }
        else
        {
            vm.set('hasBnftPlanSK',  false);
        }
    },
    onCloseBenefitPlanDetailConfiguration: function (args) {
        if (this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    /*Screen Operations */
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
        var phantomRowsExist= false,
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
    onCurrentUserRenderer : function(value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onBtnSaveClick: function() {
        var me = this,
            vm = me.getViewModel(),
            earlyRefillStore = vm.getStore('earlyRefills'),
            planCapLimitStore = vm.getStore('planCapLimits'),
            planExceptionErrorMsg = "";
        Ext.Msg.show({
                title: 'Confirm Save',
                msg: 'Are you sure you want to save?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if(earlyRefillStore.getNewRecords() || earlyRefillStore.getUpdatedRecords() || earlyRefillStore.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        earlyRefillStore.sync({
                            success: function () {
                                planExceptionErrorMsg = 'Early Refills Data Successfully Saved';
                                me.showMessage(planExceptionErrorMsg);
                                me.lookup('earlyRefillsGrid').getStore().reload();
                                vm.set('changed',false);
                            },
                            failure: function (results) {
                                var responsemessage = "";
                                for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                                    var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                                    if (responsemessage != '') {
                                        responsemessage += '<br />';
                                    }
                                    responsemessage += responsedata.messages.map(function (elem) {
                                        return elem.message;
                                    }).join(",");
                                }
                                planExceptionErrorMsg  =  'Early Refills Data failed to save:<br />' + responsemessage;
                                me.showMessage(planExceptionErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                        if(planCapLimitStore.getNewRecords() || planCapLimitStore.getUpdatedRecords() || planCapLimitStore.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        planCapLimitStore.sync({
                            success: function () {
                                planExceptionErrorMsg = 'Plan Cap Limits Data Successfully Saved';
                                me.showMessage(planExceptionErrorMsg);
                                me.lookup('planCapLimitsGrid').getStore('planCapLimits').reload();
                                vm.set('changed',false);
                            },
                            failure: function (results) {
                                    var responsemessage = "";
                                    for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                                        var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                                        if (responsemessage != '') {
                                            responsemessage += '<br />';
                                        }
                                        responsemessage += responsedata.messages.map(function (elem) {
                                            return elem.message;
                                        }).join(",");
                                    }
                                    planExceptionErrorMsg  =  'Plan Cap Limits failed to save:<br />' + responsemessage;
                                    me.showMessage(planExceptionErrorMsg );
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }, scope: me
            }
        );
    },
    showMessage:function(msg){
        this.cnt++;
        if(this.saveMsg != ''){
            this.saveMsg+='</br>';
        }
        this.saveMsg+= msg;
        if(this.cnt == this.msgArr.length){
            Ext.Msg.show({
                title: 'Information',
                msg: this.saveMsg,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
            this.saveMsg = '';
            this.cnt=0;
            this.msgArr = [];
        }
    },
    onBtnCancelClick: function() {
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
    resetForm: function() {
        var gridList = this.lookup('earlyRefillsGrid');
        gridList.findPlugin('rowediting').cancelEdit();
        gridList.store.reload();
        var gridList2 = this.lookup('planCapLimitsGrid');
        gridList2.findPlugin('rowediting').cancelEdit();
        gridList2.store.reload();
        this.addedearlyrefillRow = false;
        this.addedRow=false;
        this.getViewModel().set('changed',false);
    },

    /*Grid Operations*/
    onLoadTheGrid: function(){
        var me=this,
            vm = me.getViewModel();
        if(vm.get('hasBnftPlanSK')) {
            var qualifierStore = vm.getStore('earlyrefillqualifiers');
            qualifierStore.getProxy().setExtraParams({ 'BnftPlanSK': vm.get('bnftPlanSK')});
            Ext.getBody().mask('loading');
            qualifierStore.load(function(){
                me.connectGrids();
                var earlyrefillexceptionStore = vm.getStore('earlyRefills');
                earlyrefillexceptionStore.getProxy().setExtraParams({
                    'BnftPlanSK': vm.get('bnftPlanSK')
                });
                earlyrefillexceptionStore.load(function(){
                    me.connectGrids();
                });
            });
            vm.getStore('caplimitsperiod').load(function () {
                me.connectGrids();
                var caplimitqlfrstore = vm.getStore('caplimitsqualifiers');
                caplimitqlfrstore.getProxy().setExtraParams({ 'BnftPlanSK': vm.get('bnftPlanSK')});
                caplimitqlfrstore.load(function(){
                    var plancaplimitsStore = vm.getStore('planCapLimits');
                    plancaplimitsStore.getProxy().setExtraParams({
                        'BnftPlanSK': vm.get('bnftPlanSK')
                    });
                    plancaplimitsStore.load(function(){
                        me.connectGrids();
                    });
                });
            });
            var formularyTiersStore = vm.getStore('basicdetails');
            formularyTiersStore.getProxy().setExtraParams({
                'BnftPlanSK': vm.get('bnftPlanSK')
            });
            formularyTiersStore.load(function(){
                me.connectGrids();
            });
        }
    },
    connectGrids: function() {
        this.storeLoadCount++;
        if(this.storeLoadCount == 5) {
            Ext.getBody().unmask();
        }
    },
    onearlyrefillAddRowClick: function(){
        var newRecord = new Atlas.benefitplan.model.EarlyRefillExceptions({});
        this.getViewModel().getStore('earlyRefills').add(newRecord);
        var grid = this.lookup('earlyRefillsGrid');
        grid.findPlugin('rowediting').cancelEdit();
        grid.findPlugin('rowediting').startEdit(newRecord);
        this.addedearlyrefillRow = true;
        this.getViewModel().set('changed', false);
    },
    onearlyrefillRemoveRowClick: function(){
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookup('earlyRefillsGrid');
        if(me.msgArr.indexOf(grid.reference)==-1){
            me.msgArr.push(grid.reference);
        }
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel(),
            sel = sm.getSelection()[0].data;
        sel.BnftPlanSK = vm.get('bnftPlanSK');
        sel.CurrentUser = vm.get('user').un;
        sel.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
        vm.set('changed',this.checkGridDirty());
    },
    onGridItemComplete: function(editor,e){
        if(this.msgArr.indexOf(e.grid.reference)==-1){
            this.msgArr.push(e.grid.reference);
        }
        if(editor.grid.reference == "earlyRefillsGrid"){
            this.addedearlyrefillRow = false;
        }
        if(editor.grid.reference == "planCapLimitsGrid"){
            this.addedRow = false;
        }
        this.getViewModel().set('changed',this.checkGridDirty());
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
    },
    onGridBeforeEdit: function(editor, context) {
        if(editor.grid.reference == "earlyRefillsGrid"){
            this.getViewModel().set("earlyrefilldata",true);
        }
        if(editor.grid.reference == "planCapLimitsGrid"){
            this.getViewModel().set("plancaplimits",true);
            if(context.record.data.PlanCapLimPerQulfrTypeSK){
                editor.grid.columns[4].field.regex  = /^[1-9]/;
                editor.grid.columns[4].field.minLength = null;
                editor.grid.columns[4].field.maxLength = 8;
                editor.grid.columns[4].field.enforceMaxLength = true;
            }
        }
        this.getViewModel().set('changed',false);
    },
    validateCombo: function(oThis) {
        var store = oThis.up().up().getStore(),
            dataItems = store.data.items,
            comboVal = oThis.up().up().getColumns()[2].field.getValue(),
            comboRawVal = oThis.up().up().getColumns()[2].field.rawValue,
            column = oThis.up().up().getColumns()[3].field;
        if(comboVal == 2){
            combofiled =  oThis.up().up().getColumns()[2].field;
            combofiled.store = this.getViewModel().getStore('earlyrefillqualifiers');
            var comboRecord = combofiled.getStore().findRecord(combofiled.valueField,comboVal);
            comboRawVal = comboRecord.data.EarlyRefillExcpQulfrTypeCode;
        }
        this.validComboCheck(column, comboVal, dataItems, comboRawVal);
    },

    checkValidation: function( ){
        var grid = this.lookup('earlyRefillsGrid'),dataItems = grid.getSelectionModel().getSelection(),
            comboVal = grid.getColumns()[2].field.getValue(),
            comboRawVal = grid.getColumns()[2].field.rawValue,
            column = grid.getColumns()[3].field;
        this.validComboCheck(column, comboVal, dataItems,comboRawVal);
    },

    validComboCheck:function(column,comboVal,dataItems,comboRawVal){
        for(var i=0; i<dataItems.length;i++){
            if(comboVal == 1){
                column.regex  = /^[1-9]/;
                column.minLength = null;
                column.maxLength = 8;
                column.enforceMaxLength = true;
            }
            else if(comboVal == 4){
                column.regex  = /^[1-9]/;
                column.minLength = 8;
                column.maxLength = 8;
                column.enforceMaxLength = true;

            }
            else if(comboVal == 5){
                column.regex  = /^\d{4}(-|\s)\d{4}(-|\s)\d{2}$|^\d{10}$|^\d{5}(-|\s)\d{3}(-|\s)\d{2}$|^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
                column.minLength = null;
                column.maxLength = 12;
                column.enforceMaxLength = false;
            }
            else if(comboVal == 6){
                column.regex = /^[a-zA-Z0-9]+$/;
                column.minLength = 8;
                column.maxLength = 8;
                column.enforceMaxLength = true;
            }
            else if(comboVal == 7){
                column.regex  = /^[1-9]/;
                column.minLength = null;
                column.maxLength = 3;
                column.enforceMaxLength = false;
            }
            if(comboRawVal == "GCN" ){
                column.regex  = /^[0-9]/;
                column.minLength = 6;
                column.maxLength = 6;
                column.enforceMaxLength = true;
            }
            else if(comboRawVal == "GPI"){
                column.regex = /^[1-9]\d(\d\d)*$/;// for even numbers
                column.minLength = null;
                column.maxLength = 14;
                column.enforceMaxLength = true;
            }
            column.validate();
        }
    },
    planCapLimitValidateCombo: function(oThis){
        var capLimitStore = oThis.up().up().getStore(),
            dataItems = capLimitStore.data.items,
            planCapLimitsComboValue =  oThis.up().up().getColumns()[3].field.getValue(),
            planCapLimitsRawValue =  oThis.up().up().getColumns()[3].field.rawValue,
            columnValue =  oThis.up().up().getColumns()[4].field;
        if(planCapLimitsComboValue == 2){
            combofield =  oThis.up().up().getColumns()[3].field;
            combofield.store = this.getViewModel().getStore('caplimitsqualifiers');
            var comboRecord = combofield.getStore().findRecord(combofield.valueField,planCapLimitsComboValue),
                planCapLimitsRawValue = comboRecord.data.PlanCapLimQulfrTypeCode;
        }
        this.plamCapLimitComboCheck(columnValue,planCapLimitsComboValue,dataItems,planCapLimitsRawValue);
    },
    checkPlanCapLimitValidation: function(){
      var capLimitGrid = this.lookup('planCapLimitsGrid'), dataItems = capLimitGrid.getSelectionModel().getSelection(),
          planCapLimitsComboValue = capLimitGrid.getColumns()[3].field.getValue(),
          planCapLimitsRawValue = capLimitGrid.getColumns()[3].field.rawValue,
          columnValue =  capLimitGrid.getColumns()[4].field;
        this.plamCapLimitComboCheck(columnValue,planCapLimitsComboValue,dataItems,planCapLimitsRawValue);
    },
    plamCapLimitComboCheck: function(columnValue,planCapLimitsComboValue,dataItems,planCapLimitsRawValue){
    for(var i=0; i<dataItems.length;i++){
        if( planCapLimitsComboValue == 2){
            //ETC
            columnValue.regex  = /^[1-9]/;
            columnValue.minLength = null;
            columnValue.maxLength = 8;
            columnValue.enforceMaxLength = true;
        }
        else if(planCapLimitsComboValue == 5){
            //MedID
            columnValue.regex  = /^[1-9]/;
            columnValue.minLength = 8;
            columnValue.maxLength = 8;
            columnValue.enforceMaxLength = true;

        }
        else if(planCapLimitsComboValue == 6){
            //NDC
            columnValue.regex  = /^\d{4}(-|\s)\d{4}(-|\s)\d{2}$|^\d{10}$|^\d{5}(-|\s)\d{3}(-|\s)\d{2}$|^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
            columnValue.minLength = null;
            columnValue.maxLength = 12;
            columnValue.enforceMaxLength = false;

        }
        else if(planCapLimitsComboValue == 7){
            //RXCUI
            columnValue.regex = /^[a-zA-Z0-9]+$/;
            columnValue.minLength = 8;
            columnValue.maxLength = 8;
            columnValue.enforceMaxLength = true;

        } if(planCapLimitsRawValue == "GCN"){
            //GCN
            columnValue.regex  = /^[1-9]/;
            columnValue.minLength = 6;
            columnValue.maxLength = 6;
            columnValue.enforceMaxLength = true;

        }
        else if(planCapLimitsRawValue == "GPI"){
            //GPI
            columnValue.regex = /^[1-9]\d(\d\d)*$/; // for even numbers
            columnValue.minLength = null;
            columnValue.maxLength = 14;
            columnValue.enforceMaxLength = true;

        }
        if(planCapLimitsComboValue == 1){
            columnValue.regex  = /^[1-9]/;
            columnValue.minLength = null;
            columnValue.maxLength = 3;
            columnValue.enforceMaxLength = false;
        }
        columnValue.validate();

    }
    },
    onSelectionChange: function () {
        var getGrid = this.lookup('planCapLimitsGrid') || this.lookup('earlyRefillsGrid');
        if (getGrid.getSelectionModel().hasSelection()) {
            getGrid.getPlugin('rowEditing').enable();
        }
    },
    onAddRowClick: function(){
        var newRecord = new Atlas.benefitplan.model.PlanCapLimits({}),
            vm = this.getViewModel();
        newRecord.set('BnftPlanSK',vm.get('bnftPlanSK'));
        vm.getStore('planCapLimits').insert(0, newRecord);
        this.lookup('planCapLimitsGrid').getPlugin('rowEditing').startEdit(newRecord, 0);
        this.addedRow = true;
        vm.set('changed',false);
    },
    onRemoveRowClick:function (){
        var vm = this.getViewModel(),
            grid = this.lookup('planCapLimitsGrid');
        if(this.msgArr.indexOf(grid.reference)==-1){
            this.msgArr.push(grid.reference);
        }
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        sm.getSelection()[0].data.IsDeleted = true;
        sm.getSelection()[0].data.CurrentUser = vm.get('user').un;
        grid.store.remove(sm.getSelection());
        vm.set('validform', true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
        vm.set('changed',this.checkGridDirty());
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
    },
    checkGridDirty:function(){
        var phantomRowsExist = false;
        this.getView().query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.dirty) {
                    var keys = Object.keys(record.modified);
                    if(keys.length == 1 && keys[0] == 'CurrentUser')
                        phantomRowsExist = false;
                    else
                        phantomRowsExist = true;
                }
            });
            if(gridStore.removed.length != 0){
                phantomRowsExist = true;
            }
        });
        return phantomRowsExist;
    },
    onEarlyRefillCancelEdit: function(editor){
        if(editor.grid.reference == "earlyRefillsGrid" && this.addedearlyrefillRow){
            var store = this.getViewModel().getStore('earlyRefills');
            store.remove(store.getAt(store.getData().getCount()-1));
            this.addedearlyrefillRow = false;
        }
        this.getViewModel().set('changed',this.checkGridDirty());
    } ,
    onCancelEdit: function(editor) {
        //if this was an added row, remove it
        if (editor.grid.reference == "planCapLimitsGrid" && this.addedRow) {
            var store = this.getViewModel().getStore('planCapLimits');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    validateEdit: function(editor , context){
        var isRecValid = true, formularyCheck = false,
            record = context.newValues,
            maxValue = this.getViewModel().storeInfo.basicdetails.data.items[0].data.NbrofFrmlryTiers;
        if (record != null) {
            this.lookup('earlyRefillsGrid').getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.EarlyRefillExcpQulfrTypeSK == record.EarlyRefillExcpQulfrTypeSK && row.data.EarlyRefillVal == record.EarlyRefillVal ) {
                    isRecValid = false;
                    return false;
                }
            });
            if(record.EarlyRefillExcpQulfrTypeSK == 7 && record.EarlyRefillVal > maxValue){
                formularyCheck = true;
            }
            if (!isRecValid) {
                Ext.Msg.show({
                    title: 'Duplicate Data Alert',
                    msg: 'Data is duplicated. Please change.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                })
            }
            if(formularyCheck){
                isRecValid = false;
                Ext.Msg.show({
                    title: 'Please Change the Value',
                    msg: ' Maximum value for Formulary Tier is: ' + maxValue,
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        }
        return isRecValid;
    },
    validateCapLimitsEdit: function(editor , context){
        var isRecValid = true, formularyValue = false,
            record = context.newValues,
        maxValue = this.getViewModel().storeInfo.basicdetails.data.items[0].data.NbrofFrmlryTiers;
        if (record != null) {
            this.lookup('planCapLimitsGrid').getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.PlanCapLimQulfrTypeSK == record.PlanCapLimQulfrTypeSK && row.data.PlanCapLimVal == record.PlanCapLimVal ) {
                    isRecValid = false;
                    return false;
                }
            });
            if(record.PlanCapLimQulfrTypeSK == 1 && record.PlanCapLimVal > maxValue){
                formularyValue = true;
            }
            if (!isRecValid) {
                Ext.Msg.show({
                    title: 'Duplicate Data Alert',
                    msg: 'Data is duplicated. Please change.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        }
        if(formularyValue){
            isRecValid = false;
            Ext.Msg.show({
                title: 'Please Change the Value',
                msg: ' Maximum value for Formulary Tier is: ' + maxValue,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
        return isRecValid;
    }
});
