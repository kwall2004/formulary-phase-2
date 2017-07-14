/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.healthcarerinancialaccountcontroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-healthcarerinancialaccountcontroller',
    init: function() {
        this.setEntityId(this.getView().atlasId);
        this.setUserId(this.getViewModel().get('user').un);
        //get the PBP and Userid variabes that were passed
        var PopGrpPBPSK = this.PopGrpPBPSK,
            UserId = this.UserId,
            isReadOnly = this.getView().isReadOnly,
            vm = this.getViewModel();
        vm.set('isReadOnly', isReadOnly);
        if(isReadOnly) {
            this.lookup('HealthcareFinancialAccountGrid').findPlugin('rowediting').disable();
        }
        var financialaccounttypeStore = vm.getStore('healthcarefinancialaccounttype'),
            benefitplantypeStore = vm.getStore('BenefitPlanType'),
            financialaccountStore = vm.getStore('healthcarefinancialaccount');
        Ext.getBody().mask('loading');
        financialaccounttypeStore.load(
            {
                callback: function(){
                    benefitplantypeStore.load({callback: function()
                    {
                        financialaccountStore.getProxy().setExtraParam("PopGrpPBPSK", PopGrpPBPSK);
                        financialaccountStore.getProxy().setExtraParam("CurrentUser", UserId);
                        financialaccountStore.load(function(){
                            Ext.getBody().unmask();
                        });
                    }});
                }
            });
        this.getView().show();
	},
    storeUpdated: function(){
        this.getViewModel().set('changed',true);
    },
    setEntityId: function(Id) {
        this.PopGrpPBPSK = Id;
    },
    setUserId: function(Id) {
        this.UserId = Id;
    },
    onAddClick: function () {
        var me = this,
            grid = me.getView().getComponent('HealthcareFinancialAccountGrid'),
            rec = new Atlas.benefitplan.model.healthcarefinancialaccount({
                PopGrpPBPHealthcareFinclAcctSK: null,
                PopGrpPBPSK: me.PopGrpPBPSK,
                BnftPlanTypeSK: null,
                HealthcareFinclAcctTypeSK: null,
                BankName:null,
                AcctNbr:null,
                MaxContributionAmt: null,
                CurrentUser: me.UserId
            });
        grid.store.insert(0, rec);
        grid.findPlugin('rowediting').startEdit(rec, 0);
    },
    onRemoveClick: function () {
        var grid = this.getView().getComponent('HealthcareFinancialAccountGrid');
        grid.getSelectionModel().getSelection().forEach(function logArrayElements(element) {
            if (element.phantom) {
                grid.store.remove(element);
            }else{
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'Records that have been previously saved cannot be removed.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        });
    },
    onSaveClick: function () {
        var me = this;
        var healthStore=  me.getView().getViewModel().getStore('healthcarefinancialaccount')
        if(healthStore.getNewRecords() || healthStore.getUpdatedRecords() || healthStore.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        healthStore.sync(
            {
                callback:function(){
                    Ext.getBody().unmask();
                },
                success: function () {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                    me.getViewModel().set('changed', false);

                },
                failure: function (results, operation, success) {
                    var responsemessage = "";
                    if(results.operations && results.operations.length && results.operations[0]){
                        responsemessage = JSON.parse(results.operations[0].getResponse().responseText).messages[0].message;
                    }
                    else {
                        responsemessage = "Unknown backend error failure.";
                    }
                    Ext.Msg.show({
                        title: 'Savings Account Failed to Save!',
                        msg: responsemessage,
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }
            });
    },
    checkForUnsavedRecords: function(panel) {
     /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved (phantom) records,
     If any phantom records are found the user will be prompted to confirm before closing the window.
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
                panel.close();
            }
        });
        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    onCancelClick: function (){
        this.getView().close();
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
