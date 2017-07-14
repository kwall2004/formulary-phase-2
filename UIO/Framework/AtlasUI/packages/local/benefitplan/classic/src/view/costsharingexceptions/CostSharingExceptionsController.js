/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.costsharingexceptions.CostSharingExceptionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.costSharingExceptionsController',

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
        this.getViewModel().set('viewnumber',7);
    },
    init: function() {
        Ext.getBody().mask('loading..');
        this.Msg=''; this.count=0; this.msgArr = [];
        this.selectedRow = '';this.deductibleSeletedRow = '';
        this.isvalid = true;
        var vm = this.getViewModel();
        vm.getStore("benefitPlanPharmacyType").getProxy().setExtraParam('bnftPlanSK', this.getView().cmbBenefitPlanSK);
        vm.set('bnftPlanSK', this.getView().cmbBenefitPlanSK);
        if(this.getView().cmbBenefitPlanSK > 0)
        {
            vm.set('hasBnftPlanSK',  true);
            this.onLoadAllGrids();
        }
        else
        {
            vm.set('hasBnftPlanSK',  false);
        }

    },

    /*Add DeductibleExclusionGrid Row*/
    onDeductibleExclusionGridAddRowClick: function() {
        var vm = this.getViewModel();
        var store = vm.getStore('deductibleExceptions');
        var newRecord = new Atlas.benefitplan.model.DeductibleExceptions({ });
        newRecord.data.CurrentUser = this.getViewModel().get('user').un;
        newRecord.data.BnftPlanSK = vm.get('bnftPlanSK');
        store.insert(0, newRecord);
        this.getView().down('grid[reference=deductibleExceptionsGrid]').getPlugin().startEdit(newRecord, 0);
        vm.set('changed',false);
    },
    /*Remove DeductibleExclusionGrid Row*/
    onDeductibleExclusionGridRemoveRowClick: function() {
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    var me = this;
                    var vm = me.getViewModel(),
                        grid = this.lookupReference('deductibleExceptionsGrid');
                    if(me.msgArr.indexOf(grid.reference)==-1){
                        me.msgArr.push(grid.reference);
                    }
                    grid.findPlugin('rowediting').cancelEdit();
                    var sm = grid.getSelectionModel();
                    sm.getSelection()[0].data.isDeleted = true;
                    sm.getSelection()[0].data.CurrentUser = this.getViewModel().get('user').un;
                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    vm.set('changed',this.checkGridDirty());
                }
            }, this);
    },

    /*Add CopyExclusions Row*/
    onCopyExclusionsGridAddRowClick: function() {
        var vm = this.getViewModel();
        var store = vm.getStore('copayExclusions');
        var newRecord = new Atlas.benefitplan.model.CopayExclusions({ });
        newRecord.data.CurrentUser = this.getViewModel().get('user').un;
        newRecord.data.BnftPlanSK = vm.get('bnftPlanSK');
        newRecord.data.CopayCoinsuranceLogicTypeSK = 1;
        store.insert(0, newRecord);
        this.getView().down('grid[reference=copayExclusionsGrid]').getPlugin().startEdit(newRecord, 0);
        vm.set('changed',false);

    },

    /*Remove CopyExclusions Row*/
    onCopyExclusionsGridRemoveRowClick: function() {
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    var me = this;
                    var vm = me.getViewModel(),
                        grid = this.lookupReference('copayExclusionsGrid');
                    if(me.msgArr.indexOf(grid.reference)==-1){
                        me.msgArr.push(grid.reference);
                    }
                    grid.findPlugin('rowediting').cancelEdit();
                    var sm = grid.getSelectionModel();
                    sm.getSelection()[0].data.isDeleted = true;
                    sm.getSelection()[0].data.CurrentUser = this.getViewModel().get('user').un;
                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    vm.set('changed',this.checkGridDirty());
                }
            }, this);

    },
    /*Add DispenseAsWrittenCopay Row*/
    onDispenseAsWrittenCopayAddRowClick: function() {

        var vm = this.getViewModel();
        var store = vm.getStore('dispenseAsWrittenCopay');
        var newRecord = new Atlas.benefitplan.model.DispenseAsWrittenCopay({ });
        newRecord.data.CurrentUser = this.getViewModel().get('user').un;
        newRecord.data.BnftPlanSK = vm.get('bnftPlanSK');
        store.insert(0, newRecord);
        this.getView().down('grid[reference=dispenseAsWrittenCopayGrid]').getPlugin().startEdit(newRecord, 0);
        vm.set('changed',false);

    },
    /*Remove dispenseAsWrittenCopayGrid Row*/
    onDispenseAsWrittenCopayRemoveRowClick: function() {
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    var me = this;
                    var vm = me.getViewModel(),
                        grid = this.lookupReference('dispenseAsWrittenCopayGrid');
                    if(me.msgArr.indexOf(grid.reference)==-1){
                        me.msgArr.push(grid.reference);
                    }
                    grid.findPlugin('rowediting').cancelEdit();
                    var sm = grid.getSelectionModel();
                    sm.getSelection()[0].data.isDeleted = true;
                    sm.getSelection()[0].data.CurrentUser = this.getViewModel().get('user').un;
                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    vm.set('changed',this.checkGridDirty());
                }
            }, this);

    },
    /*Remove DeductibleExceptionsGrid Row*/
    /*Add FillExceptionsGrid Row*/
    onFillExceptionsGridAddRowClick: function() {
        var vm = this.getViewModel();
        var store = vm.getStore('fillException');
        var newRecord = new Atlas.benefitplan.model.FillException({ });
        newRecord.data.CurrentUser = this.getViewModel().get('user').un;
        newRecord.data.BnftPlanSK = vm.get('bnftPlanSK');
        newRecord.data.FillExcpChngQulfrTypeSK = 2;
        // @TODO - Chris - We need to not hard code a database SK here. The backend should be telling us what the default value for a new record is.

        store.insert(0, newRecord);
        this.getView().down('grid[reference=fillExceptionsGrid]').getPlugin().startEdit(newRecord, 0);
        vm.set('changed',false);
    },
    /*Remove FillExceptionsGrid Row*/
    onFillExceptionsGridRemoveRowClick:function (){
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    var me = this;
                    var vm = me.getViewModel(),
                        grid = this.lookupReference('fillExceptionsGrid');
                    if(me.msgArr.indexOf(grid.reference)==-1){
                        me.msgArr.push(grid.reference);
                    }
                    grid.findPlugin('rowediting').cancelEdit();
                    var sm = grid.getSelectionModel();
                    sm.getSelection()[0].data.isDeleted = true;
                    sm.getSelection()[0].data.CurrentUser = this.getViewModel().get('user').un;
                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    vm.set('changed',this.checkGridDirty());
                }
            }, this);
    },
    connectGrids: function(){
        this.storeloadcount++;
        if(this.storeloadcount == 9) {
            Ext.getBody().unmask();
            this.getReferences().copayExclusionsGrid.reconfigure(this.getViewModel().getStore('copayExclusions'));
            this.getReferences().dispenseAsWrittenCopayGrid.reconfigure(this.getViewModel().getStore('dispenseAsWrittenCopay'));
            this.getReferences().deductibleExceptionsGrid.reconfigure(this.getViewModel().getStore('deductibleExceptions'));
            this.getReferences().fillExceptionsGrid.reconfigure(this.getViewModel().getStore('fillException'));
        }
    },
    /*Load All Grids*/
    onLoadAllGrids:function () {
        var me = this;
        this.storeloadcount = 0;
        var vm = this.getViewModel();
        var hasBnftPlanSK  =  vm.get('hasBnftPlanSK');
        if(hasBnftPlanSK)
        {
            // initial load of the following stores

            var copayOverrideQualifierTypeStore = vm.getStore('copayOverrideQualifierType');
            copayOverrideQualifierTypeStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            copayOverrideQualifierTypeStore.load(function(){
                me.connectGrids();
            });


            var deductibleExclusionQualifierTypeStore = vm.getStore('deductibleExclusionQualifierType');
            deductibleExclusionQualifierTypeStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            deductibleExclusionQualifierTypeStore.load(function(){
                me.connectGrids();
            });

            var drugClassTypeStore = vm.getStore('drugClassType');
            drugClassTypeStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            drugClassTypeStore.load(function(){
                me.connectGrids();
            });

            //1. copayExclusions
            var copayExclusionsStore = vm.getStore('copayExclusions');
            copayExclusionsStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            copayExclusionsStore.load(function(){
                me.connectGrids();
            });

            //2. dispenseAsWrittenCopay
            var dispenseAsWrittenCopayStore = vm.getStore('dispenseAsWrittenCopay');
            dispenseAsWrittenCopayStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            dispenseAsWrittenCopayStore.load(function(){
                me.connectGrids();
            });


            //3. deductibleExceptions
            var deductibleExceptionsStore = vm.getStore('deductibleExceptions');
            deductibleExceptionsStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            deductibleExceptionsStore.load(function(){
                me.connectGrids();
            });

            //4. fillException
            var fillExceptionStore = vm.getStore('fillException');
            fillExceptionStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            fillExceptionStore.load(function(){
                me.connectGrids();
            });

            //4 . formularyTier drop down
            var formularyTierStore = vm.getStore('formularyTier');
            formularyTierStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            formularyTierStore.load(function(){
                me.connectGrids();
            });
            var formularyTiersStore = vm.getStore('basicdetails');
            formularyTiersStore.getProxy().setExtraParams({
                'bnftPlanSK': vm.get('bnftPlanSK')
            });
            formularyTiersStore.load(function(){
                me.connectGrids();
            });
        }

    },
    /*Save All Grids*/
    onCostSharingExceptionsSave:function () {
        var me = this;
        var vm = me.getViewModel();
        //1. copayExclusions
        var copayExclusionsStore = vm.getStore('copayExclusions');
        copayExclusionsStore.getProxy().setExtraParams({});
        //2. dispenseAsWrittenCopay
        var dispenseAsWrittenCopayStore = vm.getStore('dispenseAsWrittenCopay');
        dispenseAsWrittenCopayStore.getProxy().setExtraParams({});
        //3. deductibleExceptions
        var deductibleExceptionsStore = vm.getStore('deductibleExceptions');
        deductibleExceptionsStore.getProxy().setExtraParams({});
        //4. fillException
        var fillExceptionStore = vm.getStore('fillException');
        fillExceptionStore.getProxy().setExtraParams({});
        var costSharingErrorMsg = "";
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if(copayExclusionsStore.getNewRecords() || copayExclusionsStore.getUpdatedRecords() || copayExclusionsStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    //1. sync  copayExclusionsStore
                    copayExclusionsStore.sync(
                        {
                            // save the record to the server
                            success: function () {
                                costSharingErrorMsg = 'Copay Configuration Successfully Saved';
                                me.showMessage(costSharingErrorMsg);
                                vm.set("changed", false);
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
                                costSharingErrorMsg =  'Copay Data failed to save:<br />' + responsemessage;
                                me.showMessage(costSharingErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                    //2. sync  dispenseAsWrittenCopayStore

                    if(dispenseAsWrittenCopayStore.getNewRecords() || dispenseAsWrittenCopayStore.getUpdatedRecords() || dispenseAsWrittenCopayStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    dispenseAsWrittenCopayStore.sync(
                        {
                            // save the record to the server
                            success: function () {
                                costSharingErrorMsg =  'Dispense Data saved successfully';
                                me.showMessage(costSharingErrorMsg);
                                vm.set("changed", false);
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
                                costSharingErrorMsg =  'Dispense Data failed to save:<br />' + responsemessage;
                                me.showMessage(costSharingErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });

                    //3. sync  deductibleExceptionsStore
                    if(deductibleExceptionsStore.getNewRecords() || deductibleExceptionsStore.getUpdatedRecords() || deductibleExceptionsStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    deductibleExceptionsStore.sync(
                        {
                            // save the record to the server
                            success: function () {
                                costSharingErrorMsg =  'Deductible Exceptions Data saved successfully';
                                me.showMessage(costSharingErrorMsg);
                                vm.set("changed", false);
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
                                costSharingErrorMsg =  'Deductible Exceptions Data failed to save:<br />' + responsemessage;
                                me.showMessage(costSharingErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });

                    //4. sync  fillExceptionStore
                    if(fillExceptionStore.getNewRecords() || fillExceptionStore.getUpdatedRecords() || fillExceptionStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    fillExceptionStore.sync(
                        {
                            // save the record to the server
                            success: function () {
                                costSharingErrorMsg = 'Fill Exception Data saved successfully';
                                me.showMessage(costSharingErrorMsg);
                                vm.set("changed", false);

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
                                costSharingErrorMsg =  'Fill Exception Data failed to save:<br />' + responsemessage;
                                me.showMessage(costSharingErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                }
            }
        });
    },
    showMessage:function(message){
        this.count++;
        if(this.Msg != ''){
            this.Msg+='</br>';
        }
        this.Msg+= message;
        if(this.count == this.msgArr.length){
            Ext.getBody().unmask();
            this.displayMessage('Info',this.Msg);
            this.Msg = '';
            this.count=0;
            this.msgArr = [];
            this.resetForm();
        }

    },
    costSharingExceptionsBtnCancel: function() {
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
        me.getView().reset();
        this.onLoadAllGrids();
        me.getView().getViewModel().set("changed", false);
    },
    /*Generic Methods, these may need to move to common package*/
    onSelectionChange: function ( selModel , selectedRecs) {
        if(selModel.views[0].grid)
        {
            if (selModel.hasSelection()) {
                if(selModel.views[0].grid.reference == "copayExclusionsGrid"){
                    this.selectedRow = selModel.getSelection()[0];
                    this.checkValidation();
                }
                if(selModel.views[0].grid.reference == "deductibleExceptionsGrid"){
                    this.deductibleSeletedRow = selModel.getSelection()[0];
                    this.checkDeductibleValidation();

                }
                selModel.getSelection()[0].set('CurrentUser',this.getViewModel().get('user').un);
                selModel.views[0].grid.getPlugin('rowEditing').enable();
            }
        }
    },
    onGridBeforeEdit: function(editor, context) {
        this.getViewModel().set('changed',false);
        if(context.record.data.FillExcpChngQulfrTypeSK ==3){
            this.getViewModel().set('multiplierAmount',false);
            this.getReferences().MultiplierAmtEditor.setValue('');
        } else {
            this.getViewModel().set('multiplierAmount',true);
        }
    },
    onGridItemCancelEdit: function() {
        //if this was an added row, remove it
        if (this.addedRow) {
            var grid = this.lookupReference('refCopayConfigurationGrid') || this.lookupReference('dispenseAsWrittenCopayGrid')
                || this.lookupReference('deductibleExceptionsGrid') || this.lookupReference('fillExceptionsGrid');
            if(grid)
            {
                var selected = grid.getSelectionModel();
                if (selected.hasSelection()) {
                    var store = grid.getStore();
                    store.remove(store.getAt(0));
                }
            }
            this.addedRow = false;
        }
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    displayMessage: function(title,msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        })
    },
    validateEdit: function(editor , context){
        var me=this,
            refs=this.getReferences(),
            isRecValid = true,
            formularyCheck = false,
            maxValue = this.getViewModel().getStore('basicdetails').getData().items[0].getData().NbrofFrmlryTiers,
            record = context.newValues;
        if (record != null) {
            refs.copayExclusionsGrid.getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.CopayOvrrdQulfrTypeSK == record.CopayOvrrdQulfrTypeSK && row.data.CopayOvrrdVal == record.CopayOvrrdVal ) {
                    isRecValid = false;
                    return false;
                }
            });
            if(record.CopayOvrrdQulfrTypeSK == 7 && record.CopayOvrrdVal > maxValue){
                formularyCheck = true;
            }
            if (!isRecValid) {
                me.displayMessage('Duplicate Data Alert','Data is duplicated. Please change.');
            }
            if(formularyCheck){
                isRecValid = false;
                me.displayMessage('Please Change the Value',' Maximum value for Formulary Tier is: ' + maxValue);
            }
        }
        return isRecValid;
    },
    onGridValidateEdit: function() {
        this.getViewModel().set('multiplierAmount',true);
    },
    onGridItemComplete: function(editor,e){
        this.addedRow = false;
        if(this.msgArr.indexOf(e.grid.reference)==-1){
            this.msgArr.push(e.grid.reference);
        }
        this.getViewModel().set('changed',this.checkGridDirty());
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
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
    checkGridDirty:function(){
        var phantomRowsExist = false, value = false;
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
    validateDAWEdit: function(editor , context){
        var me=this,
            refs=me.getReferences(),
            isRecValid = true,record = context.newValues;
        if (record != null) {
            refs.dispenseAsWrittenCopayGrid.getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.DAWTypeSK == record.DAWTypeSK) {
                    isRecValid = false;
                    return false;
                }
            });
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
        }
        return isRecValid;
    },
    deductibleExceptionChange: function(oThis){
        var store = oThis.up().up().getStore(),
            dataItems = store.data.items,
            deductiblecomboVal = oThis.up().up().getColumns()[0].field.getValue(),
            deductiblecomboValcomboRawVal = oThis.up().up().getColumns()[0].field.rawValue,
            deductiblecolumn = oThis.up().up().getColumns()[1].field;
        if(deductiblecomboVal == 3){
            var combofield =  oThis.up().up().getColumns()[0].field;
            combofield.store = this.getViewModel().getStore('deductibleExclusionQualifierType');
            var comboRecord = combofield.getStore().findRecord(combofield.valueField,deductiblecomboVal);
            deductiblecomboValcomboRawVal = comboRecord.data.DeducblExclQulfrTypeCode;
        }
        this.validDeductibleComboCheck(deductiblecolumn, deductiblecomboVal, dataItems,deductiblecomboValcomboRawVal);

    },
    copayExclusionChange: function(oThis){
        var store = oThis.up().up().getStore(),
            dataItems = store.data.items,
            comboVal = oThis.up().up().getColumns()[0].field.getValue(),
            comboRawVal = oThis.up().up().getColumns()[0].field.rawValue,
            column = oThis.up().up().getColumns()[1].field;
        this.validComboCheck(column, comboVal, dataItems);
    },
    checkValidation: function(){
        var grid = this.lookup('copayExclusionsGrid'),dataItems = grid.getSelectionModel().getSelection(),
            comboVal = grid.getColumns()[0].field.getValue(),
            comboRawVal = grid.getColumns()[0].field.rawValue,
            column = grid.getColumns()[1].field;
        if(this.selectedRow != ''){
            dataItems = [this.selectedRow];
            comboVal = this.selectedRow.data.CopayOvrrdQulfrTypeSK;
        }
        this.selectedRow = '';
        this.validComboCheck(column, comboVal, dataItems);
    },
    validComboCheck: function(column, comboVal, dataItems){
        for(var i=0;i<dataItems.length;i++){
            if(comboVal == 1){//ETC
                column.regex  = /^[1-9]/;
                column.minLength = null;
                column.maxLength = 8;
            }
           else if(comboVal == 4){//MedID
                column.regex  = /^[1-9]/;
                column.minLength = 8;
                column.maxLength = 8;
            }
            else if(comboVal == 5){//NDC
                column.regex  = /^\d{4}(-|\s)\d{4}(-|\s)\d{2}$|^\d{10}$|^\d{5}(-|\s)\d{3}(-|\s)\d{2}$|^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
                column.minLength = null;
                column.maxLength = 12;
            }
            else if(comboVal == 6){//RXCUI
                column.regex = /^[a-zA-Z0-9]+$/;
                column.minLength = 8;
                column.maxLength = 8;
            }
            else if(comboVal == 7){//Formulary Tier
                column.regex  = /^[1-9]/;
                column.maxLength = 3;
                column.minLength = null;
            }
           else if(comboVal == 2){//GCN
                column.regex = /^[1-9]/;
                column.minLength = 6;
                column.maxLength = 6;
            }
           else if(comboVal == 3 ){//GPI
                column.regex = /^[1-9]\d(\d\d)*$/;
                column.minLength = null;
                column.maxLength = 14;
            }
            column.validate();
        }

    },
    DeductibleExceptionValidateEdit: function(editor , context){
        var me=this,
            refs=this.getReferences(),
            isRecValid = true, formularyValue = false,
            maxValue = this.getViewModel().getStore('basicdetails').getData().items[0].getData().NbrofFrmlryTiers,
            record = context.newValues;
        if (record != null) {
            refs.deductibleExceptionsGrid.getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.DeducblExclQulfrTypeSK == record.DeducblExclQulfrTypeSK && row.data.DeducbleExclVal == record.DeducbleExclVal ) {
                    isRecValid = false;
                    return false;
                }
            });
            if(record.DeducblExclQulfrTypeSK == 1 && record.DeducbleExclVal > maxValue){
                formularyValue = true;
            }
            if (!isRecValid) {
                me.displayMessage('Duplicate Data Alert','Data is duplicated. Please change.');
            }
            if(formularyValue){
                isRecValid = false;
                me.displayMessage('Please Change the Value',' Maximum value for Formulary Tier is: ' + maxValue);
            }
        }
        return isRecValid;
    },
    checkDeductibleValidation: function(){
        var grid = this.lookup('deductibleExceptionsGrid'),dataItems = grid.getSelectionModel().getSelection(),
            deductiblecomboVal = grid.getColumns()[0].field.getValue(),
            deductiblecomboValcomboRawVal = grid.getColumns()[0].field.rawValue,
            deductiblecolumn = grid.getColumns()[1].field;
        if(this.deductibleSeletedRow != ''){
            dataItems = [this.deductibleSeletedRow];
            deductiblecomboVal = this.deductibleSeletedRow.data.DeducblExclQulfrTypeSK;
        }
        this.deductibleSeletedRow = '';
        this.validDeductibleComboCheck(deductiblecolumn, deductiblecomboVal, dataItems);
    },
    validDeductibleComboCheck: function(deductiblecolumn, deductiblecomboVal, dataItems){
        for(var i = 0; i<dataItems.length; i++){
            if(deductiblecomboVal == 2){
                //ETC
                deductiblecolumn.regex  = /^[1-9]/;
                deductiblecolumn.minLength = null;
                deductiblecolumn.maxLength = 8;
            }
            if(deductiblecomboVal== 5){
                //MedID
                deductiblecolumn.regex  = /^[1-9]/;
                deductiblecolumn.minLength = 8;
                deductiblecolumn.maxLength = 8;

            } if(deductiblecomboVal == 6){
                //NDC
                deductiblecolumn.regex  =/^\d{4}(-|\s)\d{4}(-|\s)\d{2}$|^\d{10}$|^\d{5}(-|\s)\d{3}(-|\s)\d{2}$|^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
                deductiblecolumn.minLength = null;
                deductiblecolumn.maxLength = 12;

            }if(deductiblecomboVal == 7){
                //RXCUI
                deductiblecolumn.regex = /^[a-zA-Z0-9]+$/;
                deductiblecolumn.minLength = 8;
                deductiblecolumn.maxLength = 8;

            }
            if(deductiblecomboVal == 3){
                //GCN
                deductiblecolumn.regex  = /^[0-9]/;
                deductiblecolumn.minLength = 6;
                deductiblecolumn.maxLength = 6;
            }
            if(deductiblecomboVal == 4){
                //GPI
                deductiblecolumn.regex = /^[1-9]\d(\d\d)*$/ ;
                deductiblecolumn.minLength = null;
                deductiblecolumn.maxLength = 14;
            }
            if(deductiblecomboVal == 1){
                deductiblecolumn.regex  = /^[1-9]/;
                deductiblecolumn.minLength = null;
                deductiblecolumn.maxLength = 3;
            }
            deductiblecolumn.validate();
        }

    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
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
    onFillExceptionQualifierSelected: function(combo, record) {
        // TODO: cannot be hardcoding the SK of 3 for reject here. need to find a way to get the API to tell us
        if(record.data.FillExcpChngQulfrTypeSK ==3){
            record.data.MultiplierAmt = '';
            this.getReferences().MultiplierAmtEditor.allowBlank = true;
            this.getReferences().MultiplierAmtEditor.setValue('');
            this.getReferences().MultiplierAmtEditor.setDisabled(true);
        } else {
            this.getReferences().MultiplierAmtEditor.allowBlank = false;
            this.getReferences().MultiplierAmtEditor.setDisabled(false);
        }
    }
});