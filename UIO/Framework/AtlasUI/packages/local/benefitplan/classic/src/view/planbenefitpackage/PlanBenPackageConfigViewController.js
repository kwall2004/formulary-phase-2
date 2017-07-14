/**
 * Created by j2560 on 10/17/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.PlanBenPackageConfigViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planbenpackageconfig',
    listen: {
        controller: {
            '*': {
                onCloseBenefitPlanPackageConfiguration: 'onCloseBenefitPlanPackageConfiguration',
                onWorkFlowUpdate:'onWorkFlowUpdates'
            }
        }
    },
    onWorkFlowUpdates: function() {
        //I am adding a comment because of a defect with Surround and rollbacks
        this.init();
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
        var changedFlag = this.getViewModel().data.changed;
        if(this.getViewModel().data.changePBPBnftPlanList){
            changedFlag = false;
        }

        if (phantomRowsExist||changedFlag){
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
    init: function (e) {
        var me = this;
        this.businessRulesWindow = Ext.create('Atlas.benefitplan.view.businessrules.Main', {
            closeAction:'hide',
            autoShow: false
        });
        this.getViewModel().set('PBPSK', this.getView().atlasId);
        if (this.getViewModel().get('PBPSK') != 0) {
            var viewModel = this.getViewModel(),
                store = viewModel.getStore('PlanBenefitPackageConfig');
            store.getProxy().setExtraParam('PBPSK', this.getViewModel().get('PBPSK'));
            Ext.getBody().mask('loading');
            store.load({
                scope: this,
                callback: function (records, operation, success) {
                    Ext.getBody().unmask();
                    if (records.length != 0) {
                        var rec = records[0],
                            vm = this.getViewModel();

                        for (var i = 0; i < rec.PBPBnftPlanList().data.items.length; i++) {
                            rec.PBPBnftPlanList().data.items[i].data.CurrentUser = vm.get('user').un;

                        }
                        rec.set('CurrentUser', vm.get('user').un);
                        vm.set('PBPInfo', rec);
                        this.view.form.loadRecord(rec);

                        //var s = this.view.down('[name="LOBSK"]').getSelection().LOBName;
                        var LOBStore = vm.getStore('LineOfBusiness');
                        var recExist = LOBStore.findRecord('LOBSK', rec.data.LOBSK, 0, false, false, true);
                        if((recExist.data['LOBName'] =='HIX') || (recExist.data['LOBName'] =='Commercial')){
                            vm.set('isCommercialOrHIX',true);
                        }
                        if (me.getView().lookupReference('pbpinfogrid') != undefined) {
                            me.getView().lookupReference('pbpinfogrid').reconfigure(rec.PBPBnftPlanList());
                            me.getView().lookupReference('pbpinfogrid').getStore().on('update', function () {
                                me.getView().getViewModel().set("changed", true);
                            });
                        }
                        if (rec.data.PBPSK > 0) {
                            me.getViewModel().set('newPackage', false);
                        }
                        if (me.lookupReference('pbpinfogrid').items.items[0].dataSource.getData().length == 0) {
                            me.getViewModel().set('package', true);
                        }
                        viewModel.set('canChangePBPBnftPlanList', rec.data.CanChangePBPBnftPlanList);

                        viewModel.set('changePBPBnftPlanList',!rec.data.CanChangePBPBnftPlanList);
                        viewModel.set("onStatusChange", (viewModel.getData().canChangePBPBnftPlanList == false));
                        var formFields = me.getView().getForm().getFields().items;
                        for(var j = 0;j<formFields.length;j++){
                            formFields[j].originalValue = formFields[j].value;
                        }
                        me.getViewModel().set('changed',false);
                    }
                }
            });
        }
        else {
            this.getViewModel().set('validform', false);
            this.getViewModel().set('newPackage', true);
            this.getViewModel().set('package', true);
            var record = Ext.create('Atlas.benefitplan.model.PlanBenefitPackageConfig', {
                PBPSK: 0
            });
            this.view.form.loadRecord(record);
            this.getViewModel().set('validform', this.getView().isValid());
        }
        me.disableGridColumns();
    },
    disableGridColumns: function () {
        var me = this;
        if (me.getView().down('[name="CombinedPlanLvlDeducbIndGrp"]').items.items[1].boxLabel == "No") {
            //if no is checked
            if (me.getView().down('[name="CombinedPlanLvlDeducbIndGrp"]').items.items[1].checked) {
                //disable grid column
                me.getViewModel().set('combinedLevelDeductible',false);
            }
            else {
                me.getViewModel().set('combinedLevelDeductible',true);
            }
        }
        if (me.getView().down('[name="CombinedMOOPIndGrp"]').items.items[1].boxLabel == "No") {
            //if no is checked
            if (me.getView().down('[name="CombinedMOOPIndGrp"]').items.items[1].checked) {
                //disable grid column
                me.getViewModel().set('combinedPlanMOOP',false);
            }
            else {
                me.getViewModel().set('combinedPlanMOOP',true);
            }
        }
    },
    onCloseBenefitPlanPackageConfiguration: function (args) {
        this.getView().close();
    },
    onPlanGridSelect: function () {
        this.getViewModel().set('gridRowSelected', true);
    },
    isGridValid: function () {
        return this.isvalid;
    },
    onColumnRenderer: function (value, obj, rec) {
        rec.data.CurrentUser = this.getViewModel().get('user').un;
    },
    onAssignClick: function () {
        var me = this;
        me.fireEvent('closeBenefitPlanSearch');
        me.fireEvent('openView', 'merlin', 'benefitplan', 'benefitplan.Main',
            {
                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                PBPSK: this.getViewModel().get('PBPSK')
            });
    },
    onUnassignClick: function () {
        var me = this,
            viewModel = me.getViewModel();
        var selection = me.getReferences().pbpinfogrid.getSelectionModel();
        if (selection.hasSelection()) {
            Ext.Msg.show({
                title: 'Confirm Unassign/Remove',
                msg: 'Are you sure you want to unassign/remove selected plan from the package?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        var row = selection.getSelection()[0];
                        if (row.data.PBPSK != 0 && row.data.BnftPlanSK != 0) {
                            var vm = this.getViewModel();
                            var store = vm.getStore('PlanBenefitPackageConfig');
                            row.data.IsDeleted = true;
                            row.data.CurrentUser = me.getViewModel().get('user').un;
                            if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                                Ext.getBody().mask('Saving');
                            }
                            store.sync({
                                callback: function (record, operation, success) {
                                    Ext.getBody().unmask();
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: 'Plan UnAssign from Package successfully.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                    me.fireEvent('PackageConfigurationSavedEvent');
                                    store.reload();
                                    me.getReferences().pbpinfogrid.getStore().reload();
                                }
                            }); //TODO: need to test with backend call.
                        }
                    }
                }, scope: this
            });
        }
    },
    onServiceAreaClick: function () {
        var me = this;
        me.fireEvent('openView', 'merlin', 'benefitplan', 'servicearea.Main',
            {
                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                atlasId: this.getViewModel().get('PBPSK'),
                pbpName: this.lookup('PlanBenefitPackageDetailPBPName').getValue(),
                canChangePBPBnftPlanList: this.getViewModel().get('canChangePBPBnftPlanList')
            });
    },
    onBusinessRulesClick: function () {
        this.businessRulesWindow.getController().load(this.getViewModel().get('PBPSK'),this.getViewModel().get('canChangePBPBnftPlanList'));
        this.businessRulesWindow.show();
    },
    cancelPBPConfigOnClick: function (button, record, e) {
        var me = this;
        if (me.getViewModel().get('changed') || me.getViewModel().get('PBPSK') == 0) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if (me.getViewModel().get('PBPSK') == 0) {
                            me.getView().close();
                        } else {
                            me.resetForm();
                        }
                    }
                }
            });
        }
        else {
            me.resetForm();
        }
    },
    resetForm: function () {
        var me = this;
        me.getView().getForm().reset();
        var vm = this.getViewModel();
        var store = vm.getStore('PlanBenefitPackageConfig');
        store.reload();
        me.getView().getViewModel().set("changed", false);
        me.getViewModel().set('validform', me.getView().isValid());
    },
    onItemChanged: function (field, value) {
        var me = this;
        me.getViewModel().set('changed', me.getView().isDirty());
        me.getViewModel().set('validform', me.getView().isValid());

        //check if the line of business is commercial or HIX and set isCommercialOrHIX: true
        if (field.name == 'LOBSK') {
            me.getViewModel().set('isCommercialOrHIX', (field.lastMutatedValue == 'Commercial' || field.lastMutatedValue == 'HIX'));
        }
        if (field.name == 'CombinedPlanLvlDeducbIndGrp') {
            if (field.lastValue['CombinedPlanLvlDeducbInd'] == "true") {
                me.getViewModel().set('combinedLevelDeductible',field.lastValue['CombinedPlanLvlDeducbInd']);
            }
            else {
                me.getViewModel().set('combinedLevelDeductible',!field.lastValue['CombinedPlanLvlDeducbInd']);
            }
        }
        if (field.name == 'CombinedMOOPIndGrp') {
            if (field.lastValue['CombinedMOOPInd'] == "true") {
                me.getViewModel().set('combinedPlanMOOP',field.lastValue['CombinedMOOPInd']);
            }
            else {
                me.getViewModel().set('combinedPlanMOOP',!field.lastValue['CombinedMOOPInd']);
            }
        }


    },
    isValidPayAsSecondary:function(){
        var  me=this, gridStore=me.getView().lookupReference('pbpinfogrid').getStore(),
        medPlanCnt= 0, isRecValid = true;
        if(gridStore.data.length >= 1) {
            gridStore.data.each(function (record) {
                if (record.data.BnftPlanTypeCode == 'Medical') {
                    if (record.data.PayasScndInd == true) {
                        isRecValid =  true;
                        return;
                    }
                    medPlanCnt++;
                    if(medPlanCnt >= 2){
                        isRecValid=false;
                        return;
                    }
                }
            });
        }
        return isRecValid;
    },
    savePBPConfigOnClick: function (button, record, e) {
        var me = this,
            viewModel = me.getViewModel(),
            form = this.getView();
        var record = form.getRecord(); // get the underlying model instance
        form.updateRecord(record); // update the record with the form data
        record.set("CurrentUser", me.getViewModel().get('user').un);
        this.getViewModel().getStore('PlanBenefitPackageConfig').getProxy().setExtraParams({});
        var isChanged = this.getViewModel().get('changed');
        var isNewPBP = (form.getRecord().get(me.getViewModel().get('PBPSK')) == 0);
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (isChanged || isNewPBP)
                        if (me.isValidPayAsSecondary()) {
                            {
                                var pbpGridStore =  me.getView().lookupReference('pbpinfogrid').getStore();
                                if(pbpGridStore.getNewRecords() || pbpGridStore.getUpdatedRecords() || pbpGridStore.getRemovedRecords()){
                                    Ext.getBody().mask('Saving');
                                }
                                pbpGridStore.sync({
                                    callback: function() {
                                        Ext.getBody().unmask();
                                    }
                                },this);
                                record.save({
                                    scope: me,
                                    failure: function (record, operation) {
                                        var responsedata = JSON.parse(operation.getResponse().responseText);
                                        Ext.Msg.show({
                                            title: 'Failed to Save',
                                            msg: 'Data failed to save:' + responsedata.messages[0].message,
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            draggable: false,
                                            resizable: false
                                        });
                                    },
                                    success: function (record, operation) {
                                        Ext.Msg.show({
                                            title: 'Success',
                                            msg: 'Data saved successfully',
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            draggable: false,
                                            resizable: false
                                        });
                                        me.fireEvent('PackageConfigurationSavedEvent');
                                        var resObj = operation.getResponse() && Ext.decode(operation.getResponse().responseText);
                                        me.getViewModel().set('PBPSK', resObj.id[0]);
                                        me.getViewModel().set('newPackage', false);
                                        form.getRecord().set("PBPSK", resObj.id[0]);
                                        me.getView().getViewModel().set("changed", false);
                                        viewModel.set('canChangePBPBnftPlanList', true);
                                    },
                                    callback: function (record, operation, success) {
                                        Ext.getBody().unmask();
                                    }
                                });
                            }
                        }
                    else {
                            Ext.Msg.show({
                               title: 'Pay As Secondary Validation Failed!',
                                msg: 'Atleast one medical plan needs to have -Pay As Secondary- option checked',
                                buttons: Ext.Msg.OK,
                                closable: false,
                                draggable: false,
                                resizable: false
                            });
                        }
                }
            }
        });
    }
});