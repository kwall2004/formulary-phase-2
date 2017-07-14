/**
 * Created by n6570 on 2/13/2017.
 */
Ext.define('Atlas.benefitplan.view.transitionconfiguration.TransitionConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transitionConfigurationController',

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
        this.getViewModel().set('viewnumber',9);
    },

    /*Initial Load of the screen*/
    init: function()
    {
        this.saveMsg='';
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
    transConfigStoreUpdated: function() {
        this.getViewModel().set('isTransConfigChanged', true);
    },

    onFillsChanged: function ( checkbox , newValue)  {
        this.getViewModel().set("isFillRules", newValue);
        var me=this;
        var task = Ext.create('Ext.util.DelayedTask', function() {
            me.onItemChanged(checkbox);
        }, this);
        task.delay(250);
    },
    onItemChanged: function() {
        this.getViewModel().set('validForm', this.getView().isValid());
        this.getView().getViewModel().set("isTransConfigChanged", this.getView().isDirty());
        if(this.lookup('checkboxselection').getValue()){
            this.getViewModel().set('transitionYear',true);
        }else{this.getViewModel().set('transitionYear',false);}
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist = false;
        var modifiedRowsExist = false;
        panel.query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }

                if (record.dirty) {
                    modifiedRowsExist = true;
                }
            });
        });
        if (phantomRowsExist || this.getViewModel().get('isTransConfigChanged') || modifiedRowsExist){
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
        panel.query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist || this.getViewModel().get('isTransConfigChanged')){
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
    /*Save both Grid and Config Form*/
    onSaveClick: function () {
        var me = this,
            vm = me.getViewModel(),
            form = me.getView(),
            transConfigErrorMsg='';
        var record = form.getRecord(); // get the underlying model instance
        record.data.AllowTransitionFillsInd = this.lookup('transition').getValue();
        record.data.RestartTransitionatPlanYrInd = this.lookup('checkboxselection').getValue();
        form.updateRecord(record); // update the record with the form data
        if(this.getView().isDirty()){
            record.set("CurrentUser", me.getViewModel().get('user').un);
        }
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (vm.get('isTransConfigChanged')) {
                        Ext.getBody().mask('saving..');
                        record.save({
                            scope: me,
                            success: function () {
                                transConfigErrorMsg = 'Transition Configuration Successfully Saved!';
                                me.callShowMessage(transConfigErrorMsg);
                            },
                            failure: function (record, operation) {

                                var responsemessage = "";
                                var responsedata = JSON.parse(operation.getResponse().responseText);
                                if (responsemessage != '') {
                                    responsemessage += '<br />';
                                }
                                responsemessage += responsedata.messages.map(function (elem) {
                                    return elem.message;
                                }).join(",");
                                transConfigErrorMsg = 'Transition Configuration Failed to save:<br />' + responsemessage;
                                me.callShowMessage(transConfigErrorMsg);
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        });
                    }
                    else{
                        me.cnt++;
                    }
                }
            }

        });
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
            var me = this,
                vm = this.getViewModel();
            vm.set("editing", false);
            vm.set("isTransConfigChanged", false);
        }
    },
    /*Screen Save Event*/
    onCancelClick: function() {
        var me = this;
        if(me.getViewModel().get('isTransConfigChanged')) {
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
            if(me.getViewModel().get('bnftPlanSK') == 0){
                me.resetForm();
                me.getView().events.beforeclose.clearListeners();
                me.getView().close();
            }else{
                me.resetForm();
            }
        }
    },
    resetForm: function() {
        var me = this,
            vm = this.getViewModel();
        me.getView().getForm().reset();
        vm.set("editing", false);
        vm.set("isTransConfigChanged", false);
    },
    onInitLoadConfiguration: function () {
        var me = this,
            vm = me.getViewModel(),
            hasBnftPlanSK  =  vm.get('hasBnftPlanSK');
        if(hasBnftPlanSK) {
            var storeConfig = vm.getStore('benefitPlanTransition');
            storeConfig.getProxy().setExtraParam('bnftPlanSK', vm.get('cmbBenefitPlanSK'));
            Ext.getBody().mask('loading');
            storeConfig.load({
                scope: this,
                callback: function (records) {
                    if (records.length != 0) {
                        var rec = records[0];
                        vm.set('ConfigInfo', rec);
                        me.getView().loadRecord(rec);
                        if(me.lookup('checkboxselection').getValue()){
                            vm.set('transitionYear',true);
                        }else{ vm.set('transitionYear',false);}
                        vm.set('validForm', me.getView().isValid());
                    } else {
                        vm.set('validForm', true);
                    }
                    Ext.getBody().unmask();
                }
            });
        }
        else
        {
            vm.set('validForm', this.getView().isValid());
        }
    }
});
