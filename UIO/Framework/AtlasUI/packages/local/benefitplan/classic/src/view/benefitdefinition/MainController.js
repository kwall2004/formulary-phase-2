Ext.define('Atlas.benefitplan.view.benefitdefinition.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-adminconfigurationcontroller',
    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                onCloseBenefitDetailConfiguration: 'onCloseBenefitDetailConfiguration'
            }
        }
    },
    onCloseBenefitDetailConfiguration: function () {
        this.getView().close();
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
    init: function () {
        Ext.getBody().mask('Loading');
        var me = this,
            vm = me.getViewModel(),
            view = me.getView();
        this.updateFlag = false;
        this.updateDataChanged = false;
        this.updateOnLoadFlag = false;
        this.updateInitialData=[];
        if (view.LOBName != undefined && view.LOBName != 0) {
            view.down('[itemId="coverageSetConfigurationButton"]').show();
        }
        vm.set('objectSK', view.benefitSK);
        vm.set('isCopy', view.isCopy);
        vm.getStore('criteriasettype').load({callback:function() {
            var valueQualifierTypeStore = vm.getStore('valuequalifiertypes'),
                criteriasettyperowsk = vm.getStore('criteriasettype').findRecord('CrtriaSetTypeCode',"Benefit Definition", 0, false, false, true).data.CrtriaSetTypeSK;
            valueQualifierTypeStore.getProxy().setExtraParams({});
            vm.set('benefitpending', true);
            vm.set('criteriaSetType',criteriasettyperowsk);
            valueQualifierTypeStore.getProxy().setExtraParams({'CriteriaSetType' : criteriasettyperowsk});
            valueQualifierTypeStore.load(function () {
                if (vm.get('objectSK') == 0) {
                    vm.set('unsavedbenefit', true);
                    vm.getStore('basicdetails').getProxy().setExtraParams({});
                    var benefitrecord = Ext.create('Atlas.benefitplan.model.Benefit', {
                        BnftSK: 0,
                        EfctvStartDt: new Date('01/01/1900'),
                        EfctvEndDt: new Date('12/31/9999'),
                        StatDesc: 'Pending'
                    });
                    view.loadRecord(benefitrecord);
                    vm.getStore('rulesets').getProxy().setExtraParams({'CrtriaSetType':criteriasettyperowsk,'ObjectSK':benefitrecord.BnftSK});
                    vm.getStore('rulesets').load();
                    vm.set('validform', view.isValid());
                    Ext.getBody().unmask();
                } else {
                    vm.getStore('rulesets').getProxy().setExtraParams({});
                    me.updateFlag = true;
                    me.updateOnLoadFlag = true;
                    me.loadBenefit(vm.get('objectSK'));
                }
            });
        }
        });
    },
    onCurrentUserRenderer: function (value, obj, rec) {
        return rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    loadBenefit : function (benefitSK)
    {
        var me = this,
            vm = this.getViewModel(),
            store = vm.getStore('basicdetails'),
            view = me.getView();
        store.getProxy().setExtraParams({'BnftSK': benefitSK});
        vm.set('unsavedbenefit', false);
        store.load(function (records) {
            var benefitrecord = records[0];
            view.loadRecord(benefitrecord);
            var lastSubmtdForTestingTs = benefitrecord.getData().LastSubmtdForTestingTs;
            vm.set('lastSubmtdForTestingTs', lastSubmtdForTestingTs != null && lastSubmtdForTestingTs != '');
            me.updateInitialData[0]=benefitrecord;
            vm.set('benefitapproved', false);
            vm.set('benefitpending', false);
            vm.set('benefitlevel1approved', false);
            switch (benefitrecord.data.StatDesc) {
                case 'Approved':
                    vm.set('benefitapproved', true);
                    break;
                case 'Level 1 Approved':
                    vm.set('benefitlevel1approved', true);
                    break;
                case 'Pending':
                    vm.set('benefitpending', true);
                    break;
            }
            var serviceTypes = benefitrecord.data.ServiceTypes,
                serviceTypeSelection = [];
            for (var i = 0; i < serviceTypes.length; i++) {
                serviceTypeSelection.push(serviceTypes[i].SvcTypeSK);
            }
            view.down('[itemId="industryStandardNames"]').setValue(serviceTypeSelection);
            view.getForm().findField('ServiceTypes').originalValue = serviceTypeSelection;
            vm.set('changed', false);
            me.updateInitialData[1] = serviceTypeSelection;
            if (vm.get("isCopy")) {
                view.down('[itemId="BenefitName"]').setValue('');
                view.down('[itemId="BenefitCode"]').setValue('');
            }
            vm.getStore('rulesets').getProxy().setExtraParams({'CrtriaSetType':vm.get('criteriaSetType'),'objectSK':benefitSK});
            vm.getStore('rulesets').load();

            me.getView().down('[itemId="ruledetail-grid"]').getStore().loadData([],false);

            me.updateInitialData[2] = me.lookup('RuleSetGrid').store.data.items.length;
            Ext.getBody().unmask();
        });
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
    updateBenefitStatus: function (status, successmessage, failuremessage) {
        var me = this,
            vm = me.getViewModel(),
            basicdetailstore = vm.getStore('basicdetails');
        if (basicdetailstore.getData().length < 1) {
            return;
        }
        var basicstorerecord = basicdetailstore.getData().getAt(0),
            statusrecord = new Atlas.benefitplan.model.BenefitWorkflow({
                BnftSK: basicstorerecord.data.BnftSK,
                "newStatType": status,
                "StatTypeSK": null,
                CurrentUser: vm.get('user').un
            }),
            workflowstore = vm.getStore('BenefitWorkflow');
        workflowstore.add(statusrecord);
        workflowstore.sync({
            success: function () {
                if (status == 'Pending') {
                    me.showMessage('Success', successmessage);
                }
                if (status == 'Approved' || status == 'Level 1 Approved') {
                    var environment;
                    switch (status) {
                        case 'Approved':
                            environment = 'production';
                            break;
                        case 'Level 1 Approved':
                            environment = 'sandbox';
                            break;
                    }
                    var benefitintegrationstore = vm.getStore('benefitintegration'),
                        integrationrecord = new Atlas.benefitplan.model.BenefitIntegration({
                            status: status
                        });
                    benefitintegrationstore.add(integrationrecord);
                    benefitintegrationstore.sync({
                        success: function () {
                            me.showMessage('Export Succeeded', successmessage + '<br><br> Benefit export to ' + environment + ' succeeded.');
                            basicdetailstore.getProxy().setExtraParams({'BnftSK': me.getViewModel().get('objectSK')});
                            basicdetailstore.load({
                                callback: function (records) {
                                    var lastSubmtdForTestingTs = records[0].getData().LastSubmtdForTestingTs;
                                    vm.set('lastSubmtdForTestingTs', lastSubmtdForTestingTs != null && lastSubmtdForTestingTs != '');
                                    me.lookup('LastSubmtdForTestingTs').setValue(lastSubmtdForTestingTs);
                                    me.lookup('LastPblshTs').setValue(records[0].getData().LastPblshTs)
                                }
                            });
                        },
                        failure: function () {
                            try {
                                me.showMessage('Export Failed', successmessage + '<br><br> Benefit export to ' + environment + ' failed.');
                            } catch (e) {
                                me.showMessage('Expost Failed', 'Data failed to export:<BR>Unknown exception.');
                            }
                        }
                    });
                }
                vm.set('benefitSK', basicstorerecord.data.BnftSK);
                vm.set('objectSK', basicstorerecord.data.BnftSK);
                me.loadBenefit(basicstorerecord.data.BnftSK);
		me.fireEvent('ruleSetDataSaved');
            },
            failure: function () {
                me.showMessage('Failed', failuremessage);
            }
        });
    },
    onPublishToProduction: function () {
        var me = this,
            vm = me.getViewModel();
        if(vm.get('unsavedbenefit') || vm.get('changed') || vm.get('changedforms')){
            me.showMessage('Warning', 'Please save data before Publishing to Production');
        } else {
            var basicstorerecord = me.getViewModel().getStore('basicdetails').getData().getAt(0);
            Ext.Msg.show({
                title: 'Confirm submission',
                msg: 'Are you sure you want to submit the benefit ' + basicstorerecord.data.BenefitName + ' to production?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn != 'yes') {
                        return;
                    }
                    Ext.getBody().mask('Submitting..');
                    me.updateBenefitStatus("Approved", 'Benefit ' + basicstorerecord.data.BenefitName + ' status changed to approved ', 'Failed to update benefit ' + basicstorerecord.data.BenefitName + ' status to approved')
                }
            });
        }
    },
    onMakeChanges: function () {
        var me = this,
            basicstorerecord = me.getViewModel().getStore('basicdetails').getData().getAt(0);
        Ext.Msg.show({
            title: 'Confirm submission',
            msg: 'Are you sure you want to change the benefit ' + basicstorerecord.data.BenefitName + ' status to pending to unlock for editing?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.getBody().mask('Submitting..');
                me.updateBenefitStatus("Pending", 'Changes enabled. Benefit ' + basicstorerecord.data.BenefitName + ' status changed to pending', 'Failed to update benefit ' + basicstorerecord.data.BenefitName + ' status');
            }
        });
    },
    onSubmitToSandbox: function () {
        var me = this,
            vm = me.getViewModel();
        if(vm.get('unsavedbenefit') || vm.get('changed') || vm.get('changedforms')){
            me.showMessage('Warning', 'Please save data before Submitting to the Sandbox');
        } else {
            var basicstorerecord = me.getViewModel().getStore('basicdetails').getData().getAt(0);
            Ext.Msg.show({
                title: 'Confirm submission',
                msg: 'Are you sure you want to submit the benefit ' + basicstorerecord.data.BenefitName + ' to the sandbox?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn != 'yes') {
                        return;
                    }
                    Ext.getBody().mask('Submitting..');
                    me.updateBenefitStatus("Level 1 Approved", 'Benefit ' + basicstorerecord.data.BenefitName + ' status updated to Level 1 Approved', 'Failed to update benefit ' + basicstorerecord.data.BenefitName + 'status');

                }
            });
        }
    },
    onSaveClick: function () {
        var me = this,
            vm = this.getViewModel(),
            view = me.getView(),
            savedDetailParams = null,
            form = view.getForm(),
            isNewEntity = (vm.get('objectSK') == 0),
            newEntityId = null;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (vm.get('changed') || vm.get('changedforms') || isNewEntity) {
                        //post the data
                        var record = form.getRecord(); // get the underlying model instance
                        form.updateRecord(record); // update the record with the form data
                        record.set("CurrentUser", vm.get('user').un);
                        if (isNewEntity) {
                            vm.getStore('basicdetails').add(record);
                        }
                        var serviceTypes = [],
                            serviceTypeSelection = view.down('[itemId="industryStandardNames"]').getValue();
                        for (var i = 0; i < serviceTypeSelection.length; i++) {
                            serviceTypes.push({
                                "SvcTypeSK": serviceTypeSelection[i],
                                "CurrentUser": vm.get('user').un
                            })
                        }
                        record.set("ServiceTypes", serviceTypes);
                        vm.getStore('basicdetails').sync({
                            success: function (results) {

                                var thisEntityId = null,
                                    ruleSetGridStore = me.lookup('RuleSetGrid').getStore(),
                                    ruleDetailGridStore = me.lookup('RuleDetailGrid').getStore();
                                if(ruleDetailGridStore.storeId != "ext-empty-store") {
                                    savedDetailParams = ruleDetailGridStore.getProxy().getExtraParams();
                                    ruleDetailGridStore.getProxy().setExtraParams({});
                                }
                                if (isNewEntity) {
                                    newEntityId = JSON.parse(results.operations[0].getResponse().responseText)["id"][0];
                                    vm.getStore('basicdetails').getAt(0).data.BnftSK = newEntityId;
                                    vm.getStore('basicdetails').getProxy().setExtraParams({'BnftSK': newEntityId});
                                    vm.set('unsavedbenefit', false);
                                    thisEntityId = newEntityId;
                                    vm.set('objectSK', thisEntityId);
                                    ruleSetGridStore.each(function(record) {
                                        record.set('BnftSK',thisEntityId);
                                    });
                                } else {
                                    thisEntityId = vm.get('objectSK');
                                }
                                if(ruleSetGridStore.getNewRecords().length > 0 || ruleSetGridStore.getUpdatedRecords().length > 0 || ruleSetGridStore.getRemovedRecords().length > 0) {
                                    ruleSetGridStore.sync({
                                        success: function (results) {
                                            vm.getStore('rulesets').getProxy().setExtraParams({
                                                'CrtriaSetType': vm.get('criteriaSetType'),
                                                'ObjectSK': thisEntityId
                                            });
                                            vm.getStore('rulesets').load();
                                            if(me.lookup('RuleSetGrid').getSelectionModel().hasSelection()) {
                                                var ruleresponsedata = null;
                                                for(var i=0; i < results.operations.length; i++){
                                                    var parsedRecord = JSON.parse(results.operations[i].getResponse().responseText);
                                                    if(parsedRecord.data.CriteriaSetName == me.lookup('RuleSetGrid').getSelectionModel().getSelected().items[0].data.CriteriaSetName) {
                                                        ruleresponsedata = parsedRecord;
                                                        break;
                                                    }
                                                }
                                                ruleDetailGridStore.each(function (detailrecord) {
                                                    detailrecord.set('CrtriaSetSK', ruleresponsedata.data.CrtriaSetSK);
                                                });
                                                if (ruleDetailGridStore.getNewRecords().length > 0 || ruleDetailGridStore.getUpdatedRecords().length > 0 || ruleDetailGridStore.getRemovedRecords().length > 0) {
                                                    ruleDetailGridStore.sync({
                                                        success: function () {
                                                            ruleDetailGridStore.getProxy().setExtraParams(savedDetailParams);
                                                            ruleDetailGridStore.load();
                                                            me.showSuccessDialog();
                                                        },
                                                        failure: function (results) {
                                                            try {
                                                                me.showMessage('Failed to Save', 'Data failed to save:<BR>' + me.buildErrorString(results));
                                                            } catch (e) {
                                                                me.showMessage('Failed to Save', 'Data failed to save:<BR>Unknown exception.');
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    me.showSuccessDialog();
                                                }
                                            } else {
                                                me.showSuccessDialog();
                                            }
                                        },
                                        failure: function (results) {
                                            try {
                                                me.showMessage('Failed to Save', 'Data failed to save:<BR>' + me.buildErrorString(results));
                                            } catch (e) {
                                                me.showMessage('Failed to Save', 'Data failed to save:<BR>Unknown exception.');
                                            }
                                        }
                                    });
                                }  else {
                                    if (ruleDetailGridStore.getNewRecords().length > 0 || ruleDetailGridStore.getUpdatedRecords().length > 0 || ruleDetailGridStore.getRemovedRecords().length > 0) {
                                        ruleDetailGridStore.each(function (detailrecord) {
                                            detailrecord.set('CrtriaSetSK', me.lookup('RuleSetGrid').getSelectionModel().getSelected().items[0].data.CrtriaSetSK);
                                        });
                                        ruleDetailGridStore.sync({
                                            success: function () {
                                                ruleDetailGridStore.getProxy().setExtraParams(savedDetailParams);
                                                ruleDetailGridStore.load();
                                                me.showSuccessDialog();
                                            },
                                            failure: function (results) {
                                                try {
                                                    me.showMessage('Failed to Save', 'Data failed to save:<BR>' + me.buildErrorString(results));
                                                } catch (e) {
                                                    me.showMessage('Failed to Save', 'Data failed to save:<BR>Unknown exception.');
                                                }
                                            }
                                        });
                                    } else {
                                        me.showSuccessDialog();
                                    }
                                }
                                vm.getStore('basicdetails').getProxy().setExtraParams({'BnftSK': thisEntityId});
                            },
                            failure: function (results) {
                                try {
                                    me.showMessage('Failed to Save', 'Data failed to save:<BR>' + me.buildErrorString(results));
                                } catch (e) {
                                    me.showMessage('Failed to Save', 'Data failed to save:<BR>Unknown exception.');
                                }
                            }
                        });
                    }
                }
            }
        });
    },
    showSuccessDialog: function() {
        var vm = this.getViewModel();
        this.showMessage('Success', 'Data saved successfully');
        vm.set("changed", false);
        vm.set("changedforms", false);
        vm.set("isCopy", false);
        this.fireEvent('ruleSetDataSaved');
    },
    buildErrorString: function (results) {
        var errormessagestring = "";
        if (results.operations.length > 0) {
            Ext.Array.each(results.operations, function (operation) {
                Ext.Array.each(JSON.parse(operation.getResponse().responseText).messages[0], function (name) {
                    if (errormessagestring.length > 0) {
                        errormessagestring += '<br>'
                    }
                    errormessagestring += name.message;
                });
            });
        }
        return errormessagestring;
    },
    onCancelClick: function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView();
        if (vm.get('changed') || vm.get('changedforms') || vm.get('objectSK') == 0) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if (vm.get('objectSK') == 0) {
                            view.close();
                        } else {
                            view.down('[itemId="ruledetail-grid"]').getStore().rejectChanges();
                            me.addedDetailRow = false;
                            vm.set('ruledetailgridediting', false);
                            view.down('[itemId="ruleset-grid"]').getStore().rejectChanges();
                            me.addedRow = false;
                            vm.set('rulesetgridediting', false);
                            vm.set('validform', true);
                            me.updateOnLoadFlag = true;
                            me.resetForm()
                        }
                    }
                }
            });
        } else {
            me.resetForm();
        }
    },
    resetForm: function () {
        var vm = this.getViewModel();
        this.lookup('RuleDetailGrid').setStore(Ext.data.StoreManager.getByKey('ext-empty-store'));
        this.getView().getForm().reset();
        var benefit = vm.get('objectSK');
        if(benefit){
            this.loadBenefit(benefit);
        }
        //reload the grids
        vm.set("changed", false);
        vm.set("changedforms", false);
    },
    onItemChanged: function (field, value) {
        var me = this,
            vm = me.getViewModel();
        vm.set('changed', me.getView().isDirty());
        if(this.updateOnLoadFlag && field.itemId == "industryStandardNames"){
            this.updateDataChanged = false;
            var is_same = me.updateInitialData[1] && (me.updateInitialData[1].length == value.length) && me.updateInitialData[1].every(function(element, index) {
                    return element === value[index];
                });
            if(is_same){
                vm.set('validform', false);
            }else{
                vm.set('validform', true);
            }
        }else{
            this.updateDataChanged = true;
            vm.set('validform', me.getView().isValid());
        }
    },
    onItemEnabled: function () {
        var vm = this.getViewModel();
        if(this.updateOnLoadFlag){
            this.updateOnLoadFlag = false;
            vm.set('validform', false);
        }else{
            vm.set('validform', this.getView().isValid());
        }
    },
    onSearchClick: function () {
        this.fireEvent('openView', 'merlin', 'benefitplan', 'benefitsearch.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitsearch_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitsearch_Main')
        });
    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        var column = gridView.headerCt.getGridColumns()[col],
            combo = column.getEditor(),
            comboStoreName = combo.initialConfig.bind.store,
            editorDisplayValue = '';
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{', '').replace('}', '');
        try {
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(combo.valueField, value, 0, false, false, true).get(combo.initialConfig.displayField);
        }
        catch (err) {
            return value;
        }
        return editorDisplayValue;
    },
    beforeSelectionChange: function() {
        var view = this.getView();
        // check if the record is from the server or new
        if (view.down('[itemId="ruleset-grid"]').getSelectionModel().hasSelection()) {
            var store = view.down('[itemId="ruledetail-grid"]').getStore();
            if(store.getNewRecords().length > 0 || store.getUpdatedRecords().length > 0 || store.getRemovedRecords().length > 0) {
                this.showMessage('Info', 'Only one ruleset\'s detail can be modified at one time. Please save or cancel before continuing.');
                return false;
            }
        }
    },
    onSelectionChange: function () {
        var me = this,
            getGrid = me.getView().down('[itemId="ruleset-grid"]'),
            selected = getGrid.getSelectionModel();
        // check if the record is from the server or new
        if (selected.hasSelection()) {
            var row = selected.getSelection()[0];
            getGrid.getPlugin('rowEditing').enable();
            var ruleDetailsStore = me.getViewModel().getStore('ruledetails');
            ruleDetailsStore.getProxy().setExtraParams({'CrtriaSetSK': row.data.CrtriaSetSK});
            ruleDetailsStore.load();
            me.getView().down('[itemId="ruledetail-grid"]').setStore(ruleDetailsStore);
            me.selectedCriteriaSK = row.get('CrtriaSetSK');
        }
    },
    onGridItemCancelEdit: function () {
        //if this was an added row, remove it
        vm = this.getViewModel();
        if (this.addedRow) {
            var vm = this.getViewModel(),
                ruleSetstore = this.getView().down('[itemId="ruleset-grid"]').getStore();
            ruleSetstore.remove(ruleSetstore.getAt(0));
            this.lookup('RuleDetailGrid').setStore(Ext.data.StoreManager.getByKey('ext-empty-store'));
            this.addedRow = false;

                        if(this.updateFlag && this.updateInitialData[2] == ruleSetstore.data.items.length && !this.updateDataChanged){
                vm.set('changedforms',false);
            }
            else{
                vm.set('changedforms',true);
            }
        }
        vm.set('rulesetgridediting', false);
        vm.set('ruledetailgridediting', false);
        vm.set('changed',this.checkGridDirty());
    },
    onGridItemComplete: function () {
        this.addedRow = false;
        this.getViewModel().set('rulesetgridediting', false);
        this.getViewModel().set('changedforms', true);
        this.getViewModel().set('validform',  this.getView().isValid());
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    checkGridDirty:function(){
        var phantomRowsExist = false;
        this.getView().query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.dirty)
                    phantomRowsExist = true;
            });
        });
        return phantomRowsExist;
    },
    getHighestStoreValue: function(store,fieldname)
    {
        var highestvalue = 0;
        store.each(function(record){
            var recData = record.data[fieldname];
            if(parseInt(recData) != 'NaN' && parseInt(recData) > highestvalue)
            {
                highestvalue = recData;
            }
        });
        return highestvalue;
    },
    onAddClick: function () {
        var me = this,
            vm = me.getViewModel(),
            detailstore = me.getView().down('[itemId="ruledetail-grid"]').getStore();
        // check if the record is from the server or new
        if (me.getView().down('[itemId="ruleset-grid"]').getSelectionModel().hasSelection() && (detailstore.getNewRecords().length > 0 || detailstore.getUpdatedRecords().length > 0 || detailstore.getRemovedRecords().length > 0)) {
            me.showMessage('Info', 'Only one ruleset\'s detail can be modified at one time. Please save or cancel before continuing.');
        } else {
            vm.set('changedforms', true);
            vm.set('rulesetgridediting', true);
            var grid = this.getView().down('[itemId="ruleset-grid"]'),
                newRecord = new Atlas.benefitplan.model.BenDefRuleSets({
                    "CriteriaDetails": [],
                    "Deleted": false,
                    "CrtriaSetPrity": me.getHighestStoreValue(grid.getStore(), 'CrtriaSetPrity') + 1,
                    "CrtriaSetSK": 0,
                    "CvrgSetSK": null,
                    "CvrgSetCrtriaSetSK": null,
                    "BnftCrtriaSetSK": 0,
                    "CrtriaSetTypeSK": vm.get('criteriaSetType'),
                    BnftSK: vm.get('objectSK'),
                    CurrentUser: vm.get('user').un
                });
            grid.getStore().insert(0, newRecord);
            grid.findPlugin('rowediting').startEdit(newRecord, 0);
            me.addedRow = true;
        }
    },
    onRemoveClick: function () {
        var me = this,
            vm = me.getViewModel(),
            getGrid = me.getView().down('[itemId="ruleset-grid"]');
        vm.set('rulesetgridediting', false);
        if (getGrid.getSelectionModel().hasSelection()) {
            var selection = getGrid.getSelectionModel().getSelection()[0];
            if (selection) {
                selection.data.CurrentUser =  vm.get('user').un;
                getGrid.getStore().getProxy().skParam = selection.data.BnftCrtriaSetSK;
                getGrid.getStore().getProxy().userParam = vm.get('user').un;
                getGrid.getStore().remove(selection);
                me.lookup('RuleDetailGrid').setStore(Ext.data.StoreManager.getByKey('ext-empty-store'));
                vm.set("changed", true);
                vm.set("changedforms", true);
                vm.set('validform',  this.getView().isValid());
            }
        }
    },
    beforeGridItemEdit: function () {
        var vm = this.getViewModel();
        if(!vm.get('benefitpending') &&  !vm.get('unsavedbenefit')  ){
            return false;
        }
        vm.set('rulesetgridediting', true);
    },
    beforeDetailGridItemEdit: function () {
        var vm = this.getViewModel();
        if(!vm.get('benefitpending') &&  !vm.get('unsavedbenefit')  ){
            return false;
        }
        vm.set('ruledetailgridediting', true);
    },
    onRemoveDetailClick: function () {
        var vm = this.getViewModel(),
            getGrid = this.getView().down('[itemId="ruledetail-grid"]');
        vm.set('ruledetailgridediting', false);
        if (getGrid.getSelectionModel().hasSelection()) {
            var selection = getGrid.getSelectionModel().getSelection()[0];
            if (selection) {
                selection.data.CurrentUser = vm.get('user').un;
                getGrid.getStore().getProxy().skParam = selection.data.CrtriaDtlSK;
                getGrid.getStore().getProxy().userParam = vm.get('user').un;
                getGrid.getStore().remove(selection);
                vm.set("changed", true);
                vm.set("changedforms", true);
                vm.set('validform',  this.getView().isValid());
            }
        }
    },
    onDetailGridItemCancelEdit: function () {
        if (this.addedDetailRow) {
            this.getView().down('[itemId="ruledetail-grid"]').getStore().remove(store.getAt(0));
            this.addedDetailRow = false;
            this.getViewModel().set('ruledetailgridediting', false);
        }
    },
    onDetailGridItemComplete: function () {
        var vm = this.getViewModel();
        this.addedDetailRow = false;
        vm.set('ruledetailgridediting', false);
        vm.set('changedforms', true);
        vm.set('validform',  this.getView().isValid());
    },
    onAddDetailClick: function () {
        var me = this,
            vm = me.getViewModel(),
            grid = this.getView().down('[itemId="ruledetail-grid"]'),
            store = grid.getStore(),
            newRecord = new Atlas.benefitplan.model.CriteriaDetails({
                "CrtriaSetSK": this.selectedCriteriaSK,
                "CrtriaPrity" : me.getHighestStoreValue(store,'CrtriaPrity') +1,
                "CrtriaDtlSK": 0,
                "Deleted": false,
                CurrentUser: vm.get('user').un
            });
        store.insert(0, newRecord);
        grid.findPlugin('rowediting').startEdit(newRecord, 0);
        me.addedDetailRow = true;
        vm.set('changedforms', true);
        vm.set('ruledetailgridediting', true);
    },
    onBenefitConfigurationClick: function () {
        var view = this.getView();
        this.fireEvent('openView', 'merlin', 'benefitplan', 'benefitconfiguration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            cmbBenefitPlanSK: view.cmbBenefitPlanSK,
            cmbBenefitType: view.cmbBenefitType,
            LOBName: view.LOBName
        });
    },
    onRuleSetGridValidateEdit: function(editor, context){
        var me = this,
            result=true,
            store = this.getView().down('[itemId="ruleset-grid"]').getStore().removed;
        for (var j = store.length-1 ; j > -1 ; j--) {
            if(store[j].get("CrtriaSetPrity") == context.newValues.CrtriaSetPrity) {
                me.showMessage('Error Information', 'Duplicate Priority found in deleted but unsaved data! Please change or save changes before attempting to make this change.');
                return false;
            }
        }
        for (var j = store.length-1 ; j > -1 ; j--) {
            if(store[j].get("CriteriaSetName") == context.newValues.CriteriaSetName) {
                me.showMessage('Error Information', 'Duplicate Rule Set Name in deleted but unsaved data! Please change or save changes before attempting to make this change.');
                result =  false;
            }
        }
        store = this.getView().down('[itemId="ruleset-grid"]').getStore();
        store.each(function (row) {
            if (row != context.record) {
                if (row.data.CrtriaSetPrity == context.newValues.CrtriaSetPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority! Please change or save changes before attempting to make this change.');
                    result = false;
                } else if (row.dirty && typeof row.modified.CrtriaSetPrity != 'undefined' && row.modified.CrtriaSetPrity == context.newValues.CrtriaSetPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority found in unsaved changes! Please change or save changes before attempting to make this change.');
                    result = false;
                } else if(row.data.CriteriaSetName == context.newValues.CriteriaSetName) {
                    me.showMessage('Error Information', 'Duplicate RuleSet Name! Please change or save changes before attempting to make this change.');
                    result = false;
                } else if (row.dirty && typeof row.modified.CriteriaSetName != 'undefined' && row.modified.CriteriaSetName == context.newValues.CriteriaSetName) {
                    me.showMessage('Error Information', 'Duplicate RuleSet Name found in unsaved changes! Please change or save changes before attempting to make this change.');
                    result = false;
                }
            }
            return result;
        });
        return result;
    },
    onRuleDetailGridValidateEdit: function(editor, context) {
        var me = this,
            result=true,
            store = this.getView().down('[itemId="ruledetail-grid"]').getStore().removed;
        for (var j = store.length-1 ; j > -1 ; j--) {
            if(store[j].get("CrtriaPrity") == context.newValues.CrtriaPrity) {
                me.showMessage('Error Information', 'Duplicate Priority found in deleted but unsaved data! Please change or save changes before attempting to make this change.');
                return false;
            }
        }


        store = this.getView().down('[itemId="ruledetail-grid"]').getStore();
        store.each(function (row) {
            if (row != context.record) {
                if (row.data.CrtriaPrity == context.newValues.CrtriaPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority! Please change or save changes before attempting to make this change.');
                    result= false;
                } else if (row.dirty && typeof row.modified.CrtriaPrity != 'undefined' && row.modified.CrtriaPrity == context.newValues.CrtriaPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority found in unsaved changes! Please change or save changes before attempting to make this change.');
                    result = false;
                }
        }
        return result;
        });
        return result;
    }
});
