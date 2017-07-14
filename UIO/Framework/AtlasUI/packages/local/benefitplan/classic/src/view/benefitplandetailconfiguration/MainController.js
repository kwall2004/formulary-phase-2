Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-mainbenefitplandetailconfigurationcontroller',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
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
        if (phantomRowsExist||this.getViewModel().data.changed){
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
        if (phantomRowsExist||this.getViewModel().data.changed){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    if(args.cmbBenefitPlanSK == 0){
                        panel.atlasId=args.atlasId;
                        panel.iscopy=args.iscopy;
                        panel.cmbBenefitPlanSK=args.cmbBenefitPlanSK;
                        panel.cmbBenefitType=args.cmbBenefitType;
                        panel.LOBName=args.LOBName;
                        me.beforeInit();
                        me.init();
                        me.afterRender();
                    }
                    me.fireEvent('proceedWithProgressNavigation', {t: args.t, atlasId: args.atlasId, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
                }
            });
        }else{
            panel.events.beforeclose.clearListeners();
            if(args.cmbBenefitPlanSK == 0){
                panel.atlasId=args.atlasId;
                panel.iscopy=args.iscopy;
                panel.cmbBenefitPlanSK=args.cmbBenefitPlanSK;
                panel.cmbBenefitType=args.cmbBenefitType;
                panel.LOBName=args.LOBName;
                me.beforeInit();
                me.init();
                me.afterRender();
            }
            else{
                panel.getForm().reset();
            }
            me.fireEvent('proceedWithProgressNavigation', {t: args.t, atlasId: args.atlasId, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
        }
    },
    init: function() {
        this.saving = false;
        this.canceling = false;
        this.gridisvalid = true;
        this.formulary = false;
        this.value = 0;
        this.cnt = 0;
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
    beforeInit: function(){
        var vm = this.getViewModel(),
            view = this.getView(),
            benefitType = view.cmbBenefitType,
            lobName = view.LOBName;
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('viewclass',view.$className);
        vm.set('viewnumber',1);
        if(!isNaN(parseFloat(benefitType)) && isFinite(benefitType)) {
            vm.set('cmbBenefitType', benefitType);//Medical or Pharmacy
        } else {
            if(benefitType == "Medical") {
                vm.set('cmbBenefitType', 1);
            }
            else if(benefitType == "Pharmacy") {
                vm.set('cmbBenefitType', 2);
            }
            else if(benefitType == "Dental") {
                vm.set('cmbBenefitType', 3);
            }
            else if(benefitType == "Vision") {
                vm.set('cmbBenefitType', 4);
            }
            else if(benefitType == "Hearing") {
                vm.set('cmbBenefitType', 5);
            }
            else if(benefitType == "Behavioral Health") {
                vm.set('cmbBenefitType', 6);
            } else {
                this.showMessage('Error','Invalid Benefit Type: ' + benefitType + '.');
            }
        }
        if(!isNaN(parseFloat(lobName)) && isFinite(lobName)) {
            vm.set('LOBName', lobName);//Commercial, HIX, Medicaid, Medicare
        } else {
            if(lobName == "Commercial") {
                vm.set('LOBName', 1);
            }
            else if(lobName == "HIX") {
                vm.set('LOBName', 2);
            }
            else if(lobName == "Medicaid") {
                vm.set('LOBName', 3);
            }
            else if(lobName == "Medicare") {
                vm.set('LOBName', 4);
            } else {
                this.showMessage('Error','Invalid Line of Business: ' + lobName + '.');
            }
        }
    },
    afterRender: function() {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            details = view.down('[itemId="detailContainer"]'),
            planTypes = view.down('[itemId="benefitPlanTypeFieldset"]'),
            LOBName = vm.get('LOBName'),
            cmbBenefitType = vm.get('cmbBenefitType');
        vm.getStore('producttypes').getProxy().setExtraParam('LOBSK', LOBName);
        if(vm.get('cmbBenefitPlanSK') == undefined || vm.get('cmbBenefitPlanSK') == null) {
            this.showMessage('Error','No Entity ID passed.');
        } else if (LOBName == undefined || LOBName < 1 || LOBName > 4) {
            this.showMessage('Error','Invalid Line of Business: ' + LOBName + '.');
        } else if (cmbBenefitType == undefined || cmbBenefitType < 1 || cmbBenefitType > 6) {
            this.showMessage('Error', 'Invalid Benefit Type: ' + cmbBenefitType + '.');
        } else {
            Ext.suspendLayouts();
            details.removeAll();
            if(cmbBenefitType != 2) {//medical
                vm.getStore('numberoftiers').add({Value: '6'});
                me.lookup('productTypeCombo').allowBlank = false;
                if (LOBName == 1) {//commercial
                    var detailpanel = Ext.create({xtype: 'benefitplan-commercialmedicaldetail'});
                    planTypes.setTitle("Commercial");
                } else if (LOBName == 2) {//HIX
                    var detailpanel = Ext.create({xtype: 'benefitplan-hixmedicaldetail'});
                    planTypes.setTitle("HIX");
                } else if (LOBName == 4) {//Medicare
                    var detailpanel = Ext.create({xtype: 'benefitplan-medicaremedicaldetail'});
                    planTypes.setTitle("Medicare");
                } else if (LOBName == 3) {//Medicaid
                    var detailpanel = Ext.create({xtype: 'benefitplan-medicaidmedicaldetail'});
                    planTypes.setTitle("Medicaid");
                }
            }
            else if(cmbBenefitType == 2) {//rx
                var detailpanel = Ext.create({xtype: 'benefitplan-rxdetail'});
                me.lookup('productTypeCombo').allowBlank = true;
                if (LOBName == 1 || LOBName == 2) {//commercial/HIX or Medicaid
                    planTypes.setTitle("Commercial/HIX");
                } else if (LOBName == 4) {//Medicare
                    planTypes.setTitle("Medicare");
                } else if (LOBName == 3) {//Medicaid
                    planTypes.setTitle("Medicaid");
                }
            }
                details.add(detailpanel);
            if(cmbBenefitType == 2) {//rx
                var additionaldetailpanel = Ext.create({xtype: 'benefitplan-medicarerxdetail'}),
                    rxdetails = view.down('[itemId="rxdetailpanel"]');
                if (LOBName == 4) {//Medicare

                    view.down('[itemId="additionalrxdetail"]').add(additionaldetailpanel);
                    planTypes.setTitle("Medicare");
                    rxdetails.setTitle('Medicare Detail');
                    rxdetails.items.items[0].items.items[6].items.items[1].hidden = false;
                } else if(LOBName == 3) {
                    rxdetails.setTitle('Medicaid Detail');
                } else if(LOBName == 1 || LOBName == 2) {
                    rxdetails.setTitle('Commercial/HIX Detail');
                }
            }
            Ext.resumeLayouts(true);
            if (LOBName == 3 || LOBName == 4) {//Medicaid || Medicare
                vm.set('isMedicaidOrMedicare', true);
                vm.getStore('classifications').removeAll(true);
                view.down('[name="PlanClsfcnTypeSK"]').setEmptyText ( 'N/A' );
            } else {
                Ext.getBody().mask('Loading');
                vm.getStore('classifications').load({
                    callback:function(){
                        Ext.getBody().unmask();
                        vm.set('changed',false);
                    }
                });
            }
            if(vm.get('cmbBenefitPlanSK') == 0) {
                var record = Ext.create('Atlas.benefitplan.model.BenefitPlan', {
                    BnftPlanSK: 0,
                    BnftPlanTypeSK: vm.get('cmbBenefitType'),
                    LOBSK: vm.get('LOBName'),
                    BenefitPlanWaiverRiders: []
                });
                if(cmbBenefitType == 2) {
                    record.set("RxPrcgTypeSK",2);
                }
                var store = vm.getStore('basicdetails');
                store.getProxy().setExtraParams({'BnftPlanSK': 0});
                view.loadRecord(record);
                vm.set('changed',false);
                vm.getStore('waivers').load(function(){
                    if(view.down('[reference="WaiverContainer"]') != undefined) {
                        view.down('[reference="WaiverContainer"]').reconfigure(record.BenefitPlanWaiverRiders());
                    }
                });
                vm.set('validform', false);
            } else {
                var store = vm.getStore('basicdetails');
                store.getProxy().setExtraParams({});
                Ext.getBody().mask('Loading');
                store.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
                store.load(function (records) {
                    if (records.length == 1) {
                        me.originalDataValues = records[0];
                        view.loadRecord(records[0]);
                        vm.set('changed',false);
                        var pricingValue =records[0].data.RxPrcgTypeSK;
                        Ext.util.Cookies.set('onPricingValue', pricingValue);
                        Ext.getBody().unmask('');
                        if(view.isCopy) {
                            view.down('[itemId="BnftPlanName"]').setValue('');
                        }
                        vm.getStore('waivers').load(function(){
                            for(var i = 0;i<view.getForm().getFields().items.length;i++){
                                view.getForm().getFields().items[i].originalValue = view.getForm().getFields().items[i].value;
                            }
                            vm.set('changed', false);
                            if(view.down('[reference="WaiverContainer"]') != undefined) {
                                view.down('[reference="WaiverContainer"]').reconfigure(records[0].BenefitPlanWaiverRiders());
                            }
                            if(vm.getStore('waivers').data.length == 0) {
                                vm.set('nooptions', true);
                            }
                        });
                    } else {
                        Ext.getBody().unmask();
                        me.showMessage('Error', 'Found ' + records.length + 'records, but expected 1.');
                    }

                });
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        if((args.atlasId && this.getView().atlasId != args.atlasId) || (this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1)) {
            this.getView().close();
        }
    },
    onSaveClick: function() {
        this.saving = true;
        this.finishSaving();
    },
    finishSaving: function() {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            form = view.getForm(),
            isNewEntity = (this.getViewModel().get('cmbBenefitPlanSK') == 0),
            newEntityId = null,
            bPct = null;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                me.saving = false;
                if (btn == 'yes') {
                    Ext.getBody().mask('Loading');
                    if (vm.get('changed') || isNewEntity) {
                        //post the data
                        var record = form.getRecord();
                        bPct = view.down('[name="McrPartBCoinsurancePct"]');
                        if (bPct != undefined) {
                            var ispartb = !bPct.isDisabled();
                            vm.set('McrPartBCoinsurancePct',true);
                            record.set("McrPartBCoinsurancePct",bPct.getValue());
                        }
                        form.updateRecord(); // update the record with the form data
                        record.set("CurrentUser", vm.get('user').un);
                        if (view.down('[reference="WaiverContainer"]') != undefined) {
                            for (var i = record.BenefitPlanWaiverRiders().data.items.length - 1; i > -1; i--) {
                                var item = record.BenefitPlanWaiverRiders().data.items[i];
                                if (!item.phantom) {
                                    record.BenefitPlanWaiverRiders().remove(item);
                                }
                            }
                        }
                        if (isNewEntity) {
                            record.set(id, null);
                        }
                        record.getProxy().setExtraParams({});
                        record.save({ // save the record to the server
                            success: function (results, operation) {
                                Ext.getBody().unmask();
                                if (results.data.success == "false") {
                                    me.showMessage('Failed to Save', results.data.messages.map(function (elem) {
                                            return elem.name;
                                        }).join(",") + '.');
                                } else {
                                    if (isNewEntity) {
                                        var responsedata = JSON.parse(operation.getResponse().responseText);
                                        newEntityId = responsedata["id"][0];
                                        form.getRecord().set('BnftPlanSK', newEntityId);
                                        vm.set('BnftPlanSK', newEntityId);
                                        vm.set('cmbBenefitPlanSK', newEntityId);
                                        vm.getStore('basicdetails').getProxy().setExtraParam('BnftPlanSK', newEntityId);
                                    } else {
                                        vm.getStore('basicdetails').getProxy().setExtraParam('BnftPlanSK', vm.get('cmbBenefitPlanSK'));
                                    }
                                    var pricingValue =form.getRecord().data.RxPrcgTypeSK;
                                    Ext.util.Cookies.set('onPricingValue', pricingValue);
                                    me.showMessage('Success', 'Data saved successfully');
                                    if(bPct){
                                        vm.set('mcrPartBCoinsurancePct',ispartb);
                                        bPct.allowBlank = !ispartb;
                                        bPct.validateValue(bPct.getValue());

                                    }
                                    vm.set('changed',false);
                                    vm.set('validform',false);
                                    view.getViewModel().set("changedAddress", false);
                                    //reload the grid, cuz i blasted the records to save and I want it to dephantomize....
                                    if(view.isCopy) {
                                        view.isCopy = false;
                                    }
                                    me.fireEvent('planConfigurationSaved');
                                }
                            },
                            failure: function (results, operation) {
                                Ext.getBody().unmask();
                                var responsedata = JSON.parse(operation.getResponse().responseText);
                                me.showMessage('Failed to Save', responsedata.messages.map(function (elem) {
                                        return elem.message;
                                    }).join(","));
                            }
                        });
                    }
                    Ext.getBody().unmask();
                }
            }
        });
    },
    onCancelClick: function() {
        this.canceling = true;
        this.finishCanceling();
    },
    finishCanceling: function() {
        var me = this;
        if(me.getViewModel().get('changed') || me.getViewModel().get('cmbBenefitPlanSK') == 0) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    me.canceling = false;
                    if (btn == 'yes') {
                        if (me.getViewModel().get('cmbBenefitPlanSK') == 0) {
                          me.getView().events.beforeclose.clearListeners();
                            me.getView().close();
                        } else {
                            me.resetForm();
                        }
                    }
                }
            });
        } else {
            me.resetForm();
        }
    },
    resetForm: function() {
        var me = this;
        me.cancelButtonClick = true;
        me.getView().getViewModel().set("changed", false);
        var store = me.getViewModel().getStore('basicdetails');
        store.getProxy().setExtraParams({'bnftPlanSK': me.getViewModel().get('cmbBenefitPlanSK')});
        Ext.getBody().mask('loading');
        store.load(function (records) {
            Ext.getBody().unmask();
            if (records.length == 1) {
                me.getView().loadRecord(records[0]);
                me.getViewModel().set("changed", false);
                var pricingValue =records[0].data.RxPrcgTypeSK;
                Ext.util.Cookies.set('onPricingValue', pricingValue);
                me.getViewModel().getStore('waivers').load(function(){
                    if(me.getView().down('[reference="WaiverContainer"]') != undefined) {
                        me.getView().down('[reference="WaiverContainer"]').reconfigure(records[0].BenefitPlanWaiverRiders());
                    }
                    if(me.getViewModel().getStore('waivers').data.length == 0) {
                        me.getViewModel().set('nooptions', true);
                    }
                });
            }
        });
    },
    onItemChanged: function(field, value) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            bPct = view.down('[name="McrPartBCoinsurancePct"]');
        if(vm.get('cmbBenefitPlanSK') == 0) {
            vm.set('changed', view.isValid());
        }else{
            vm.set('changed', view.isDirty());
        }
        if (field.name == 'COBRABnftOfferedInd' && field.checked) {
            vm.set('isCobra', field.inputValue == 'true');
        }
        else if (field.name == 'PrcsMcrPartBClaimsInd') {
            if (!field.checked) {
                bPct.setValue('');
            }
            this.getViewModel().set('mcrPartBCoinsurancePct',field.checked);
            bPct.allowBlank = !field.checked;
            bPct.validateValue(bPct.getValue());
        }
        else if (field.name == 'NbrofFrmlryTiers') {
            if (value && value != '') {
                vm.getStore('formularies').filter('NbrofFrmlryTiers', value);
            } else {
                vm.getStore('formularies').filter('NbrofFrmlryTiers', '999');
            }
        }
        else if (field.name == 'DrugRefDbSK') {
            if (value && value != '') {
                vm.getStore('formularies').filter('DrugRefDbSK', value);
            } else {
                vm.getStore('formularies').filter('DrugRefDbSK', '999');
            }
        }
        if(field.name == 'FrmlrySK'){
            if (value && value != '') {
                this.formulary = true;
                this.value = value;
                var rec = vm.getStore('formularies').findRecord('FrmlrySK', this.value, 0, false, false, true);
                if(rec !=null && rec != 'undefined'){
                    view.down('[name="DrugRefDbSK"]').setValue(rec.data.DrugRefDbSK);
                }
                else {
                    view.down('[name="DrugRefDbSK"]').setValue('');
                }
            }
        }
        if(field.name == 'PrcsMcrPartBClaimsInd' && field.checked ){
            if(view.isValid() && this.getView().down('[name="McrPartBCoinsurancePct"]').getValue() == ""){
                vm.set('validform',false);
            }else{
                vm.set('validform', view.isValid());
            }
        }else{ vm.set('validform', view.isValid());}

    },
    onItemchangebeforeSelect: function(combo) {
        var newEntityFlag = this.getViewModel().get('cmbBenefitPlanSK');
        var cancelFlag = this.cancelButtonClick;
        if (newEntityFlag == 0 || cancelFlag) {
            if (cancelFlag) {
                this.cnt++;
                if(this.cnt == 2){
                    this.cancelButtonClick = false;
                    this.cnt = 0;
                }
            }
        } else {
            var me = combo;
            var beforeValue = me.value;
            var checkFlag = me.up('fieldset').beforeSelectFlag;
            if (!checkFlag) {
                Ext.Msg.confirm('Confirm', 'Are you sure you want to make this change? This will affect the structure of the Benefit Plan you are creating', function (btn) {
                    if (btn != 'yes') {
                        me.up('fieldset').beforeSelectFlag = true;
                        me.setValue(beforeValue);
                    }
                })
            } else {
                me.up('fieldset').beforeSelectFlag = false;
            }
        }
    },
    onItemEnabled: function() {
        this.getViewModel().set('validform', this.getView().isValid());
    },
    addWaiverRow: function (button) {
        this.addedRow = true;
        var grid = button.up('grid');
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.insert(0, {WvrRiderTypeSK: '', "CurrentUser": this.getViewModel().get('user').un, "Deleted": false, "BnftPlanWvrRiderSK": 0});
        grid.findPlugin('rowediting').startEdit(0);
    },
    isGridValid: function() {
        return this.gridisvalid;
    },
    onGridItemStartEdit: function(){
        this.gridisvalid = false;
    },
    onGridItemCancelEdit: function() {
        this.gridisvalid = true;
        if (this.getPhantomData().length > 0) {
            this.getViewModel().set('changed',true);
        }
        //if this was an added row, remove it
        if (this.addedRow) {
            var store = this.getView().down('[reference="WaiverContainer"]').getStore();
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
    },
    onGridItemComplete: function(){
        this.gridisvalid = true;
        this.addedRow = false;
        if (this.getPhantomData().length > 0) {
            this.getViewModel().set('changed',true);
        }
        if(this.getViewModel().getStore('waivers').data.length == 0) {
            this.getViewModel().set('nooptions', true);
        }
    },
    onSelectionChange: function () {
        var getGrid=  this.getView().down('[reference="WaiverContainer"]');
        // check if the record is from the server or new
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection()) {
            var row = selected.getSelection()[0];
            if(!row.phantom)
            {
                getGrid.getPlugin('rowEditing').disable();
            }
            else
            {
                getGrid.getPlugin('rowEditing').enable();
            }
        }
    },
    getPhantomData: function () {
        var newRows =[],
            rows = this.getView().down('[reference="WaiverContainer"]').getStore().data.items;
        for (var i = 0; i < rows.length; i++) {
            var isNew = rows[i].phantom;
            if (isNew) {
                newRows.push(rows[i]);
            }
        }
        return newRows;
    },
    onFormularyTiersBlur: function(element, event) {
        event.preventDefault();
        var cancelFlag = this.cancelButtonClick;
        if (this.getViewModel().get('cmbBenefitPlanSK') == 0 || cancelFlag) {
            if (cancelFlag) {
                this.cnt++;
                if(this.cnt == 2){
                    this.cancelButtonClick = false;
                    this.cnt = 0;
                }
            }
        } else {
            var me = element,
                cont = this;
            if (!me.up('fieldset').beforeSelectFlag) {
                Ext.Msg.confirm('Confirm', 'Are you sure you want to make this change? This will affect the structure of the Benefit Plan you are creating', function (btn) {
                    if (btn != 'yes') {
                        me.up('fieldset').beforeSelectFlag = true;
                        me.setValue(me.originalValue);
                    } else {
                        if(cont.saving) {
                            cont.getView().down('[itemId="saveButton"]').focus();
                            cont.finishSaving();
                        } else if (cont.canceling) {
                            cont.getView().down('[itemId="cancelButton"]').focus();
                            cont.finishCanceling();
                        }
                    }
                })
            } else {
                me.up('fieldset').beforeSelectFlag = false;
            }
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
            //THIS IS GOING TO FAIL BECAUSE I AM FILTERING!!!!filter removed for now
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    }
});
