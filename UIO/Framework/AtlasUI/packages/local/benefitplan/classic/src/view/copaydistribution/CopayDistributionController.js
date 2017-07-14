/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.view.copaydistribution.CopayDistributionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CopayDistributionController',
    listen : {
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    init: function () {
        this.storeloadcount = 0;
        this.recordMsg=''; this.saveMsg='';this.cnt=0;this.save = false;
        this.saveCnt = 0;this.LICS4DeducblInitialAmt = 0;
        this.CvrgPhaseTypeFilter = new Ext.util.Filter({
            property: 'CvrgPhaseTypeSK',
            value   : '',
            exactMatch: true
        });
        this.FrmlryTierFilter = new Ext.util.Filter({
            property: 'FrmlryTierSK',
            value   : '',
            exactMatch: true
        });
        this.LICSTypeFilter = new Ext.util.Filter({
            property: 'LICSTypeSK',
            value   : '',
            exactMatch: true
        });
        var me = this,
            vm = me.getViewModel(),
            copayLICSStore = vm.getStore('copaydistributionLICS'),
            LicsDeductible = '';
        copayLICSStore.getProxy().setExtraParam('BnftPlanSK',vm.get('cmbBenefitPlanSK'));
        copayLICSStore.load({
                callback: function (records) {
                    if(records[0].data.isEnabled){
                        vm.set('isEnabled',true);
                        me.lookup('LICSDeductible').setValue(records[0].data.LICS4DeducblAmt);
                        me.LICS4DeducblInitialAmt = records[0].data.LICS4DeducblAmt;
                        var formField = me.getView().getForm().getFields();
                        for(var i = 0;i<formField.items.length;i++){
                            formField.items[i].originalValue = formField.items[i].value;
                        }
                    }
                    else{
                        vm.set('isEnabled',false);
                    }
                }
            }
        );
        //Load Coverage Phase Type Buttons
        var storeCvrgType = vm.getStore('coveragephasetype');
        storeCvrgType.getProxy().setExtraParam('bnftPlanSK',vm.get('cmbBenefitPlanSK'));
        storeCvrgType.load(function(records) {
            if (records.length > 0) {
                me.coveragePhaseType = records[0].data.CvrgPhaseTypeSK;
                this.each(function (row) {
                    var button = Ext.create('Ext.Button', {
                        text: row.get('CvrgPhaseCode'),
                        coveragePhaseType: row.get('CvrgPhaseTypeSK'),
                        handler: 'onCvrgPhaseTypeButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="coveragePhaseTypeButtons"]').add(button);
                });
                me.guideUser('');
                var store = vm.getStore('copaydistribution');
                store.getProxy().setExtraParam('BnftPlanSK',vm.get('cmbBenefitPlanSK'));
                store.load();
            }
            else{
                Ext.getBody().unmask();
                me.guideUser('Coverage Phase Type ');
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
                        text: 'Tier '+ row.get('FrmlryTierNbr'),
                        formularytier: row.get('FrmlryTierSK'),
                        handler: 'onFrmlryButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="formularyTierButtons"]').add(button);
                });
                me.guideUser('');
            }
            else{
                Ext.getBody().unmask();
                me.guideUser('Formulary Tier ');
            }
        });
        //Load LICS Type Buttons
        var storeForm = vm.getStore('licstypebyplan');
        storeForm.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
        storeForm.load(function(records){
            if(records.length > 0) {
                me.licstype = records[0].data.LICSTypeSK;
                this.each(function (row) {
                    var button = Ext.create('Ext.Button', {
                        text: row.get('LICSTypeCode'),
                        licstype: row.get('LICSTypeSK'),
                        handler: 'onLICSTypeButtonClick'
                    });
                    button.removeCls('aBenefitPlanBtn');
                    me.getView().down('[itemId="LICSTypeButtons"]').add(button);
                });
                me.guideUser('');
            }
            else{
                Ext.getBody().unmask();
                me.guideUser('LICS Type ');
            }
        });
    },
    guideUser: function(Msg) {
        this.storeloadcount++;
        if(Msg != '') {
            this.recordMsg = this.recordMsg + Msg  + ', ';
        }
        if(this.storeloadcount == 3 && this.recordMsg != '') {
            Ext.Msg.show({
                title: 'Warning!',
                msg: this.recordMsg + ' values not set up yet, please go back and configure.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
        if(this.storeloadcount ==3){
            Ext.getBody().unmask();
        }
    },
    onCvrgPhaseTypeButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copaydistribution');
        this.getView().down('[itemId="coveragePhaseTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.CvrgPhaseTypeFilter);
        if(activating) {
            this.CvrgPhaseTypeFilter.setConfig('value',button.coveragePhaseType);
            store.addFilter(this.CvrgPhaseTypeFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },
    onFrmlryButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copaydistribution');
        this.getView().down('[itemId="formularyTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.FrmlryTierFilter);
        if(activating) {
            this.FrmlryTierFilter.setConfig('value', button.formularytier);
            store.addFilter(this.FrmlryTierFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },
    onLICSTypeButtonClick:function(button)
    {
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('copaydistribution');
        this.getView().down('[itemId="LICSTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.LICSTypeFilter);
        if(activating) {
            this.LICSTypeFilter.setConfig('value',button.licstype);
            store.addFilter(this.LICSTypeFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        Ext.getBody().mask('loading..');
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber',11);
    },
    storeUpdated: function() {
        this.getViewModel().set('changed', true);
    },
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        var vm = this.getViewModel();
        if (this.addedRow) {
            var store = vm.getStore('copaydistribution');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        vm.set("changed", this.checkGridDirty(context.grid));
    },
    onGridItemComplete: function(editor, e){
        var vm = this.getViewModel();
        this.saveCnt = 1;
        this.addedRow = false;
        e.record.set('CurrentUser',vm.get('user').un);
        vm.set('validform', true);
        vm.set('changed', this.checkGridDirty(e.grid));
    },
    checkGridDirty:function(grid){
        var phantomRowsExist= false;
        grid.store.each(function(record){
            if (record.dirty) {
                var keys = Object.keys(record.modified);
                phantomRowsExist = !(keys.length == 1 && keys[0] == 'CurrentUser');
            }
        });
        return phantomRowsExist;
    },
    onSelectionChange: function() {
        var getGrid=  this.lookup('refCopayDistributionGrid');
        if (getGrid.getSelectionModel().hasSelection()) {
            getGrid.getPlugin('rowEditing').enable();
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    onItemChanged: function(field) {
        var changedFlag = this.getView().isDirty();
        if(!changedFlag){
            changedFlag = this.checkGridDirty(this.lookup('refCopayDistributionGrid'));
        }
        this.getViewModel().set('changed',changedFlag);
        this.getViewModel().set('validform',field.isValid());
    },
    onSaveClick: function(button) {
        var me = this,
            vm = me.getViewModel(),
            isChanged = vm.get('changed'),
            form = button.up('panel').getForm().findField('LICS4DeducblAmt'),
            record = {},
            store=me.lookup('refCopayDistributionGrid').getStore();
        record.LICS4DeducblAmt =  form.value;
        record.CurrentUser  = vm.get('user').un;
        record.BnftPlanSK = vm.get('cmbBenefitPlanSK');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {

                    if (isChanged) {
                        var responsemessage = "",
                            detailrows = store.removed;
                        for (var j = detailrows.length-1 ; j > -1 ; j--) {
                            detailrows[j].data.CurrentUser = vm.get('user').un;
                        }
                        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        store.sync({ // save the record to the server
                            success: function() {
                                store.getProxy().setExtraParam('BnftPlanSK', vm.get('cmbBenefitPlanSK'));
                                store.getProxy().setExtraParam('CurrentUser',vm.get('user').un);
                                store.load();
                                vm.set('changed',false);
                                me.resetForm();
                                responsemessage = "Copay Distribution Saved Successfully";
                                me.callShowMessage(responsemessage);
                            },
                            failure: function(results) {
                                var responsemessage = "";
                                if(results.exceptions && results.exceptions.length && results.exceptions[0]){
                                    responsemessage = JSON.parse(results.exceptions[0].error.response.responseText).Message;
                                }
                                else {
                                    responsemessage = "Unknown backend error failure.";
                                }
                                me.callShowMessage(responsemessage);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                        if(me.LICS4DeducblInitialAmt != form.value) {
                            this.saveCnt = 2;
                            if(!form.disabled){
                                var copayLICSStore = vm.getStore('copaydistributionLICS');
                                copayLICSStore.add(record);
                                if(copayLICSStore.getNewRecords() || copayLICSStore.getUpdatedRecords() || copayLICSStore.getRemovedRecords()){
                                    Ext.getBody().mask('Saving');
                                }
                                copayLICSStore.sync({
                                    success: function () {
                                        vm.set('changed', false);
                                        responsemessage = "LICS 4 Deductible saved successfully";
                                        me.callShowMessage(responsemessage)
                                    },
                                    failure: function (results) {
                                        if (results.exceptions && results.exceptions.length && results.exceptions[0]) {
                                            responsemessage = JSON.parse(results.exceptions[0].error.response.responseText).Message;
                                        }
                                        else {
                                            responsemessage = "Unknown backend error failure.";
                                        }
                                        me.callShowMessage(responsemessage)

                                    },
                                    callback: function(){
                                        Ext.getBody().unmask();
                                    }
                                });
                            }else{
                                me.callShowMessage("");
                            }

                        }else{
                            me.callShowMessage("");
                        }
                    }
                }
            }
        });
    },
    callShowMessage:function(msg) {
        this.cnt++;
        if (this.saveMsg != '') {
            this.saveMsg += '</br>';
        }
        this.saveMsg += msg;
        if(this.saveCnt == 0 && this.cnt == 1){
            this.cnt = 2;
        }
        if (this.cnt == 2) {
            Ext.getBody().unmask();
            Ext.Msg.show({
                title: 'Information',
                msg: this.saveMsg,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
            this.cnt = 0;
            this.saveCnt = 0;
            this.saveMsg = '';
        }
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
    benefitPlanHasUnsavedRecords: function(args) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var me = this,
            phantomRowsExist = false,
            panel = this.getView();
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
    onCancelClicks: function() {
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
                        var grid = me.lookup('refCopayDistributionGrid');
                        grid.findPlugin('rowediting').cancelEdit();
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
            vm = me.getViewModel(),
            view = me.getView(),
            copayLICSStore = vm.getStore('copaydistributionLICS'),
            LicsDeductible = '',
            store = me.lookup('refCopayDistributionGrid').store;
        view.down('[itemId="coveragePhaseTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        view.down('[itemId="formularyTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        view.down('[itemId="LICSTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.FrmlryTierFilter);
        store.removeFilter(this.CvrgPhaseTypeFilter);
        store.removeFilter(this.LICSTypeFilter);
        copayLICSStore.getProxy().setExtraParam('BnftPlanSK',vm.get('cmbBenefitPlanSK'));
        copayLICSStore.reload();
        vm.set("changed", false);
    },
    onCopayDistGridAddClick: function(){
        var store = this.getViewModel().getStore('copaydistribution'),
            newRecord = new Atlas.benefitplan.model.CopayDistribution({});
        if(store.getFilters().contains(this.CvrgPhaseTypeFilter)) {
            newRecord.set('CvrgPhaseTypeSK',this.CvrgPhaseTypeFilter.getConfig('value'));
        }
        if(store.getFilters().contains(this.FrmlryTierFilter)) {
            newRecord.set('FrmlryTierSK',this.FrmlryTierFilter.getConfig('value'));
        }
        if(store.getFilters().contains(this.LICSTypeFilter)) {
            newRecord.set('LICSTypeSK',this.LICSTypeFilter.getConfig('value'));
        }
        store.insert(0, newRecord);
        this.lookup('refCopayDistributionGrid').getPlugin('rowEditing').startEdit(newRecord, 0);
        this.addedRow = true;
    },
    onCopayDistGridRemoveRowClick:function (){
        var grid = this.lookup('refCopayDistributionGrid');
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        sm.getSelection()[0].data.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        this.getViewModel().set('changed',true);
        this.getViewModel().set('validform', true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
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
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField);
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    }
});