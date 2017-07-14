/**
 * Created by n6570 on 2/13/2017.
 */
Ext.define('Atlas.benefitplan.view.medicareconfiguration.MedicareConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.medicareConfigurationController',

    /*listen to events using GlobalEvents*/
    listen : {
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },

    /*close the current screen if use navigate another screen in the progress bar steps*/
    onCloseBenefitPlanDetailConfiguration: function(args)
    {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    /*before initialize the screen*/
    beforeInit: function()
    {
        this.getViewModel().set('cmbBenefitPlanSK', this.getView().cmbBenefitPlanSK);
        this.getViewModel().set('cmbBenefitType', this.getView().cmbBenefitType);
        this.getViewModel().set('LOBName', this.getView().LOBName);
        this.getViewModel().set('viewclass', this.getView().$className);
        this.getViewModel().set('viewnumber',10);
    },

    /*Initial Load of the screen*/
    init: function()
    {
        this.saveMsg='';

        this.storeloadcount = 0;
        this.gridstorescount = 0;
        this.recordMsg='';

        this.isvalid = true;
        var vm = this.getViewModel();
        vm.set('bnftPlanSK', this.getView().cmbBenefitPlanSK);
        this.cnt=0;
        if(this.getView().cmbBenefitPlanSK > 0)
        {
            vm.set('hasBnftPlanSK',  true);
            this.onInitLoadConfiguration();
        }
        else
        {
            vm.set('hasBnftPlanSK',  false);
        }

    },

    onInitLoadConfiguration: function () {
        var me = this,
            vm = me.getViewModel(),
            hasBnftPlanSK  =  vm.get('hasBnftPlanSK');
        if(hasBnftPlanSK) {
            var LICSTypeStore = me.getView().getViewModel().getStore('LICSType');
            Ext.getBody().mask('loading');
            LICSTypeStore.load(function(records){
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
                me.connectGrids();
            });

            var FrmlryTierStore = me.getView().getViewModel().getStore('formularytier');
            FrmlryTierStore.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            FrmlryTierStore.load(function (records) {
                if (records.length > 0) {
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
                    me.guideUser('');
                }
                else {
                    Ext.getBody().unmask();
                    me.guideUser('Formulary Tier ');
                }
                me.connectGrids();
            });

            var BntPlanPharmTypeStore = me.getView().getViewModel().getStore('benefitPlanPharmacyType');
            BntPlanPharmTypeStore.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            BntPlanPharmTypeStore.load(function (records) {
                if (records.length > 0) {
                    me.PharmType = records[0].data.PharmTypeSK;
                    this.each(function (row) {
                        var button = Ext.create('Ext.Button', {
                            text: row.get('PharmTypeCode'),
                            pharmtypeSK: row.get('PharmTypeSK'),
                            handler: 'onPharmTypeButtonClick'
                        });
                        button.removeCls('aBenefitPlanBtn');
                        me.getView().down('[itemId="pharmacyTypeButtons"]').add(button);
                    });
                    me.guideUser('');
                }
                else {
                    Ext.getBody().unmask();
                    me.guideUser('PharmacyType ');
                }
                me.connectGrids();
            });

            //load the drop down
            var store = vm.getStore('coveragephasetype');
            store.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            store.load(function (records) {
                if (records.length > 0) {
                    me.guideUser('');
                }
                else {
                    Ext.getBody().unmask();
                    me.guideUser('Coverage Phase Type ');
                }
                me.connectGrids();
            });

            //load the drop down
            var logicStore = vm.getStore('logic');
            logicStore.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            logicStore.load(function(records) {
                me.connectGrids();
            });

            var daySupplyStore = vm.getStore('daysupplytype');
            daySupplyStore.load(function(records) {
                me.connectGrids();
            });

            // Load the Setup  Grid.
            var storeSetup = vm.getStore('licsSetupConfiguration');
            storeSetup.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            storeSetup.load(function(records) {
                me.connectGrids();
            });

            me.LICSLevelFilter = new Ext.util.Filter({
                property: 'LICSTypeSK',
                value: '',
                exactMatch: true
            });
            me.FrmlryTierFilter = new Ext.util.Filter({
                property: 'FrmlryTierSK',
                value: '',
                exactMatch: true
                    });
            me.PharmacyTypeFilter = new Ext.util.Filter({
                property: 'PharmTypeSK',
                value: '',
                exactMatch: true
            });
            var CopyPharmacyType = me.getView().getViewModel().getStore('CopyPharmacyType');
            CopyPharmacyType.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));


        }
        else
        {
            vm.set('validForm', this.getView().isValid());
        }
    },

    connectGrids: function(){
        this.gridstorescount++;
        if(this.gridstorescount == 7) {
            this.getReferences().refTransitionConfigurationGrid.reconfigure(this.getViewModel().getStore('licsSetupConfiguration'));
            Ext.getBody().unmask();
        }
    },
    /*Filter Buttons */
    onFrmlryButtonClick:function(button)
    {
        var me=this;
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('licsSetupConfiguration');
        me.getView().down('[itemId="formularyTierButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.FrmlryTierFilter);
        if(activating) {
            this.FrmlryTierFilter.setConfig('value', button.formularytier);
            store.addFilter(this.FrmlryTierFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },
    onPharmTypeButtonClick:function(button)
    {
        var me=this;
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('licsSetupConfiguration');
        me.getView().down('[itemId="pharmacyTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(this.PharmacyTypeFilter);
        if(activating) {
            this.PharmacyTypeFilter.setConfig('value', button.pharmtypeSK);
            store.addFilter(this.PharmacyTypeFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },

    onLICSTypeButtonClick:function(button)
    {
        var me=this;
        var activating=false;
        if(!button.hasCls('aBenefitPlanBtn')) {
            activating=true;
        }
        var store = this.getViewModel().getStore('licsSetupConfiguration');
        me.getView().down('[itemId="LICSTypeButtons"]').items.each(function(obj){obj.removeCls('aBenefitPlanBtn');});
        store.removeFilter(me.LICSLevelFilter);
        if(activating) {
            me.LICSLevelFilter.setConfig('value', button.licstype);
            store.addFilter(me.LICSLevelFilter);
            button.addCls('aBenefitPlanBtn');
        }
    },

    /*Store Related Events*/
    licsStoreUpdated: function() {
        this.getViewModel().set('isLICSSetupChanged', true);
    },

    beforeGridEdit: function() {
        this.getViewModel().set("validForm",false);
    },


    /*Grid Events*/
    onGridItemCancelEdit: function(editor , context) {
        //if this was an added row, remove it
        var vm = this.getViewModel();
        if (this.addedRow) {
            var store = vm.getStore('licsSetupConfiguration');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
       vm.set('isLICSSetupChanged',this.checkGridDirty(context.grid));
    },
    validateEdit:function(editor , context){
        var me=this,
            refs=this.getReferences(),
            isRecValid = true;

        var record = context.newValues;
        if (record != null) {
            refs.refTransitionConfigurationGrid.getStore().each(function (row) {
                if (row.id != context.record.data.id && row.data.CvrgPhaseSK == record.CvrgPhaseSK && row.data.FrmlryTierSK == record.FrmlryTierSK &&
                    row.data.LICSTypeSK == record.LICSTypeSK && row.data.DaySuplTypeSK == record.DaySuplTypeSK && row.data.PharmTypeSK == record.PharmTypeSK) {
                    isRecValid = false;
                    return false;
                }
            });
            if (!isRecValid) {
                Ext.Msg.show({
                    title: 'Duplicate Data Alert!',
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
    onGridItemComplete: function(editor,e){
        this.addedRow = false;
        this.getViewModel().set('validForm', this.getView().isValid());
        this.getViewModel().set('isLICSSetupChanged', this.checkGridDirty(e.grid));
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
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
    onSelectionChange: function () {
        var getGrid=  this.getReferences().refTransitionConfigurationGrid;
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection()) {
            getGrid.getPlugin('rowEditing').enable();
        }
    },
    onGridAddRowClick: function(){
        var vm = this.getViewModel();
        var store = vm.getStore('licsSetupConfiguration');

        var newRecord = new Atlas.benefitplan.model.LICSSetup({
            BnftPlanSK: vm.get('bnftPlanSK'),
            CurrentUser:  vm.get('user').un
        });
        if(store.getFilters().contains(this.FrmlryTierFilter)) {
            newRecord.set('FrmlryTierSK',this.FrmlryTierFilter.getConfig('value'));
        }
        if(store.getFilters().contains(this.LICSLevelFilter)) {
            newRecord.set('LICSTypeSK',this.LICSLevelFilter.getConfig('value'));
        }
        store.insert(0, newRecord);
        this.getReferences().refTransitionConfigurationGrid.getPlugin('rowEditing').startEdit(newRecord, 0);
        this.addedRow = true;
    },
    onGridRemoveRowClick:function (){
        var me = this;
        var vm = me.getViewModel(),
            grid = this.getReferences().refTransitionConfigurationGrid;
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        sm.getSelection()[0].data.Deleted = true;
        sm.getSelection()[0].data.CurrentUser = this.getViewModel().get('user').un;
        grid.store.remove(sm.getSelection());
        vm.set('isLICSSetupChanged',true);
        this.getViewModel().set('validForm', this.getView().isValid());
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist = false;
        panel.query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('isLICSSetupChanged') ){
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
        panel.query('grid').forEach(function logArrayElements(element, index, array){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('isLICSSetupChanged')){
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
    /*Save both Grid and Config Form*/
    onSaveClick: function (button, record, e) {
        var me = this,
            vm = me.getViewModel(),
            form = me.getView(),
        //isChanged = vm.get('changed'),
            store = vm.getStore('licsSetupConfiguration'),
           // transConfigSaved=true,
           // transConfigErrorMsg='',
            LICSSaved=true,
            LICSErrorMsg='';
        store.getProxy().setExtraParam('BnftPlanSK',this.getViewModel().get('cmbBenefitPlanSK'));
        store.getProxy().setExtraParam('CurrentUser',this.getViewModel().get('user').un);

        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {


                    if(vm.get('isLICSSetupChanged')) {
                        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        store.sync({
                            // save the record to the server
                            success: function (results, operation, success) {
                                LICSErrorMsg = 'Medicare Configuration Successfully Saved!';
                                me.callShowMessage(LICSErrorMsg );
                                var storeSetup = me.getReferences().refTransitionConfigurationGrid.getStore();
                                storeSetup.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
                                storeSetup.load();
                            },
                            failure: function (results, operation, success) {
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
                                LICSErrorMsg = 'LICS Copay Failed to save:<br />' + responsemessage;
                                me.callShowMessage(LICSErrorMsg );
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
    guideUser: function(Msg) {
        this.storeloadcount++;
        if(Msg != '') {
            this.recordMsg = this.recordMsg + Msg  + ', ';
        }
        if(this.storeloadcount == 4 && this.recordMsg != '') {
            Ext.Msg.show({
                title: 'Warning!',
                msg: this.recordMsg + ' values not set up yet, please go back and configure.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
    },

    callShowMessage:function(msg){
        this.cnt++;
        if(this.saveMsg != ''){
            this.saveMsg+='</br>';
        }
        this.saveMsg+= msg;
        if(this.cnt ==1){
            Ext.Msg.show({
                title: 'Information',
                msg: this.saveMsg,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
            this.cnt=0;
            this.saveMsg='';
            var me = this;
            var vm = this.getViewModel();
            me.getView().getViewModel().set("editing", false);
            me.getView().getViewModel().set("isLICSSetupChanged", false);
        }
    },
    /*Screen Save Event*/
    onCancelClick: function() {
        var me = this;
        if(me.getViewModel().get('isLICSSetupChanged')) {
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
        }  else {
            me.resetForm();
            me.getView().events.beforeclose.clearListeners();
            me.getView().close();
        }
    },
    resetForm: function() {
        var me = this;
        me.getView().getForm().reset();
        var vm = this.getViewModel();

        var grid = this.getReferences().refTransitionConfigurationGrid;
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.reload();

        var store = vm.getStore('licsSetupConfiguration');
        store.reload();
        /* var formStore = vm.getStore('benefitPlanTransition');
         formStore.reload();*/
        //me.getView().getViewModel().set("changed", false);
        me.getView().getViewModel().set("editing", false);

        me.getView().getViewModel().set("isLICSSetupChanged", false);

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

    onCopyLICSSaveClick: function () {
        var me = this,
            vm =  me.getViewModel(),
            refs=me.getReferences(),
            toLICSTypes=[],
            toPharmTypes = [];
        refs.refToLICS.value.forEach(function(item) {
            toLICSTypes.push(item);
        });
        refs.refToPharm.value.forEach(function(item) {
            toPharmTypes.push(item);
        });

        var LICSCopystore =vm.getStore('LICSCopy');
        LICSCopystore.loadData([],false);
        var newRecord = new Atlas.benefitplan.model.LICSCopy(
            {
                'bnftPlanSK':  vm.get('cmbBenefitPlanSK'),
                'copyFromLICSTypeSK':  refs.refFromLICS.value,
                'copyToLICSTypes':toLICSTypes,
                'copyFromPharmTypeSK': refs.refFromPharm.value,
                'copyToPharmTypes':toPharmTypes,
                'username': vm.get('user').un,
                'overwriteDuplicates': false
            });
        LICSCopystore.insert(0,newRecord);
        var cvrgphaseSK = null;
        var daysuplySK = null;
        var frmlrySK = null;
        //Check if the combination already exists
        var store = me.getReferences().refTransitionConfigurationGrid.getStore();
        store.each(function(recorde,id){
            if(recorde.data.LICSTypeSK == refs.refFromLICS.value && recorde.data.PharmTypeSK == refs.refFromPharm.value){
                cvrgPhaseSK = recorde.data.CvrgPhaseSK;
                daysuplySK = recorde.data.DaySuplTypeSK;
                frmlrySK  = recorde.data.FrmlryTierSK;
            }
        });

        var dupExists = false;
        refs.refToLICS.value.forEach(function(LICSitem) {
            refs.refToPharm.value.forEach(function(pharmTypeitem) {
                store.each(function(row,id){
                    if(row.data.CvrgPhaseSK == cvrgPhaseSK && row.data.DaySuplTypeSK == daysuplySK && row.data.FrmlryTierSK == frmlrySK
                        && row.data.LICSTypeSK == LICSitem && row.data.PharmTypeSK == pharmTypeitem){
                        dupExists=true;
                        return false;
                    }
                });
                if(dupExists){
                    return false;
                }
            });
            if(dupExists){
                return false;
            }
        });
        if(dupExists){
            Ext.Msg.show({title: 'Confirm Save',
                msg: 'Duplicate(s) Exist! Would you like to overwrite them?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if (btn == 'yes') {
                        LICSCopystore.data.items[0].data.overwriteDuplicates = true;
                        if(LICSCopystore.getNewRecords() || LICSCopystore.getUpdatedRecords() || LICSCopystore.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        LICSCopystore.sync({ // save the record to the server
                            success: function (results, operation, success) {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Copy Medicare Configuration Successful.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                               // me.getView().getViewModel().set("changed", false);
                               // LICSCopystore.remove(LICSCopystore.getAt(0));
                                store.reload();
                            },
                            failure: function (results, operation) {
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
                                Ext.Msg.show({
                                    title: 'Failed to Save',
                                    msg: 'Data failed to save:<br />' + responsemessage,
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                                //LICSCopystore.remove(LICSCopystore.getAt(0));
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                    } else {
                        me.syncLICSCopyStore();
                    }
                }
            });
        }
        else{
            me.syncLICSCopyStore();
        }
        me.getView().down('[itemId="onCopyLICSClick"]').hide();
    },
    syncLICSCopyStore:function(){
        var me = this,
            vm =  me.getViewModel(),
         store = me.getReferences().refTransitionConfigurationGrid.getStore(),
            LICSCopystore =vm.getStore('LICSCopy');
        if(LICSCopystore.getNewRecords() || LICSCopystore.getUpdatedRecords() || LICSCopystore.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        LICSCopystore.sync({ // save the record to the server
            success: function (results, operation, success) {
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Copy medicare configuration successful.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
                store.reload();
            },
            failure: function (results, operation) {
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
                Ext.Msg.show({
                    title: 'Failed to Save',
                    msg: 'Data failed to save:<br />' + responsemessage,
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
    },
    onCopyLICSCancelClick: function () {
        this.getView().down('[itemId="onCopyLICSClick"]').hide();
    },
    onUserRenderer: function(value, obj, rec){
        return rec.data.username = this.getViewModel().get('user').un;
    },
    onCopyClick: function(record){
        var me = this,
            vm=me.getViewModel(),
        LICSCopystore =vm.getStore('LICSCopy'),
            refs=me.getReferences();


        var me = this;
        if(me.getViewModel().get('isLICSSetupChanged')) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Unsaved Data detected!. Save it or cancel it before you proceed with copy.',
                buttons : Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });

         return;
        }
        refs.refFromLICS.setValue('');
        refs.refFromPharm.setValue('');
        refs.refToLICS.setValue('');
        refs.refToPharm.setValue('');

        this.getView().down('[itemId="onCopyLICSClick"]').show(null, function(){
            var cnstore = me.getViewModel().getStore('CurrentLICSLevel');
            cnstore.removeAll();
            var store = me.getViewModel().getStore('licsSetupConfiguration');
            store.each(function(record,id){
                if(cnstore.find('LICSTypeSK', record.data.LICSTypeSK) == -1) {
                    cnstore.add({LICSTypeSK: record.data.LICSTypeSK, LICSTypeCode: record.data.LICSTypeCode});
                }
            });

            var cnstore1 = me.getViewModel().getStore('CurrentLICSPharmType');
            cnstore1.removeAll();
        });
    },
    onfromLICSLevelSelect:function(combo,record,eOpts){
        var me=this,  vm= me.getViewModel();
        var cnstorey = me.getViewModel().getStore('CurrentLICSPharmType');
        cnstorey.removeAll();
        //var store = me.getViewModel().getStore('licsSetupConfiguration');
        var store = me.getReferences().refTransitionConfigurationGrid.getStore();
        store.each(function(recorde,id){
            if(recorde.data.LICSTypeSK == record.data.LICSTypeSK){
                if(cnstorey.find('PharmTypeSK', recorde.data.PharmTypeSK) == -1) {
                    cnstorey.add({PharmTypeSK: recorde.data.PharmTypeSK, PharmTypeCode: recorde.data.PharmTypeCode});
                }
            }
        });
    }
});

