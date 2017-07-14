/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.costsharemaximums.CostShareMaximumsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-costsharemaximumscontroller',

    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        if(view.cmbBenefitType!=2) { vm.set('viewnumber',2);} else {vm.set('viewnumber',3);}
    },
    init: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        //set test values, these can be replaced once the parent page is created and can pass these in
        this.setUserId(vm.get('user').un);
        //Set the columns to add to be equal to the inital configuration of the grid (only 1 column)
        var CostShareMaximumsStore = vm.getStore('CostShareMaximums');
        CostShareMaximumsStore.getProxy().setExtraParam("BnftPlanSK", vm.get('cmbBenefitPlanSK'));
        CostShareMaximumsStore.getProxy().setExtraParam("Deleted", false);
        Ext.getBody().mask('loading');
        CostShareMaximumsStore.load({
            callback: function () {
                if (!CostShareMaximumsStore.first()){
                    //if the store is empty then exit the function
                    return;
                }
                var costShareMaximumsFields = Object.keys(CostShareMaximumsStore.first().data),
                    fieldsToAdd = CostShareMaximumsStore.model.prototype.fields,
                    columnsToAdd = [];
                //Get the first record and iterate through it's network tiers array. every record should have the same network tiers
                Ext.Array.forEach(costShareMaximumsFields,function(value){
                    var FieldsToSkip = [];
                    FieldsToSkip['$id']=true;
                    FieldsToSkip['id']=true;
                    FieldsToSkip['Deleted']=true;
                    FieldsToSkip['CurrentUser']=true;
                    if(FieldsToSkip[value] || value.slice(-2) =='SK') {return 1;}
                    if(value == 'DeducblScopeTypeCode' ) {
                        columnsToAdd.push({
                            header: 'Deductible Type',
                            text: 'Deductible Type',
                            dataIndex: 'DeducblScopeTypeCode',
                            flex: 1
                        });
                        fieldsToAdd.push(Ext.create('Ext.data.field.Field', {
                            name: value,
                            type: 'string'
                        }));
                        return 1;
                    }
                    if(value == 'EmbeddedInd' ) {
                        if(CostShareMaximumsStore.first().get(value)) {
                            view.down('[id="embeddedRadio"]').setValue(true);
                            view.down('[id="aggregateRadio"]').setValue(false);
                        } else {
                            vm.set('radioValueOnLoad',"aggregate");
                            view.down('[id="embeddedRadio"]').setValue(false);
                            view.down('[id="aggregateRadio"]').setValue(true);
                        }
                        fieldsToAdd.push(Ext.create('Ext.data.field.Field', {
                            name: value,
                            type: 'boolean'
                        }));
                        return 1;
                    }
                    columnsToAdd.push(me.createCurrencyColumn(value, value));
                    fieldsToAdd.push(Ext.create('Ext.data.field.Field', {
                        name: value,
                        type: 'float',
                        validators: [{
                            type: 'format',
                            matcher: /^\$*[0-9]+\.*[0-9]{0,2}|$/i,
                            message: 'A valid currency amount (ex. $100.00) is required.'
                        }]
                    }));
                });
                CostShareMaximumsStore.on('update','storeUpdated');
                CostShareMaximumsStore.model.addFields(fieldsToAdd);
                view.lookup('CostShareMaximumsGrid').reconfigure(columnsToAdd);
                Ext.getBody().unmask();
            }
        });
    },
    createCurrencyColumn: function(header, dataindex) {
        if (dataindex == 'RX_Deductible') {
            var newColumn = {
                renderer: function (value) {
                    return Ext.util.Format.usMoney(value);
                },
                header: header.replace(/_/g, ' '),
                text: header.replace(/_/g, ' '),
                flex: 1,
                dataIndex: dataindex,
                editor: {
                    xtype: 'textfield',
                    regex: /^(9\d{0,4}(\.0{1,2})?|9\d{0,3}[0-8]\d{0,1}(\.\d{1,2})?|[0-8]\d{0,4}(\.\d{1,2})?)$/i,
                    invalidText: 'Should be valid currency amount and max allowed is $99999.00'
                }
            };
        }
        else {
            var newColumn = {
                renderer: function (value) {
                    return Ext.util.Format.usMoney(value);
                },
                header: header.replace(/_/g, ' '),
                text: header.replace(/_/g, ' '),
                flex: 1,
                dataIndex: dataindex,
                editor: {
                    xtype: 'textfield',
                    regex: /^\$*[0-9]+\.*[0-9]{0,2}$/i,
                    invalidText: 'A valid currency amount (ex. $100.00) is required.'
                }
            };
        }
        return newColumn;
    },
    DeductibleDetailRadioClicked: function()  {
        var vm = this.getViewModel();
        if(this.getView().down('[id="aggregateRadio"]').getValue() && vm.get('radioValueOnLoad') == 'aggregate'){
            if(!vm.get('gridUpdateFlag'))
                vm.set('changed', false);
        }else{
            vm.set('changed', true);
        }},
    storeUpdated: function(){
        this.getViewModel().set('changed',true);
        this.getViewModel().set('gridUpdateFlag',true);
    },
    setUserId: function(Id) {
        this.UserId = Id;
    },
    onSaveClick: function() {
        var me = this;
        Ext.MessageBox.confirm('Save Cost Share Maximums','Are you sure you want to save your changes?',function (id){
            if (id === 'yes') {
                var CostShareMaximumsStore = me.lookup('CostShareMaximumsGrid').getStore();
                CostShareMaximumsStore.each(function (record,id){
                    record.set('EmbeddedInd',me.getView().down('[id="embeddedRadio"]').checked);
                    record.set("CurrentUser", me.getViewModel().get('user').un);
                });
                if(CostShareMaximumsStore.getNewRecords() || CostShareMaximumsStore.getUpdatedRecords() || CostShareMaximumsStore.getRemovedRecords()){
                    Ext.getBody().mask('Saving');
                }
                CostShareMaximumsStore.sync(
                {
                    callback:function(){
                        Ext.getBody().unmask();
                    },
                    success: function() {
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
                    failure: function() {
                        Ext.getBody().unmask();
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
    onCancelClick: function(){
        var vm = this.getViewModel(),
            view = this.getView();
        Ext.MessageBox.confirm('Cancel changes?','Are you sure that you want to cancel? Any unsaved rows that will be lost.',function (id){
            if (id === 'yes') {
                var CostShareMaximumsStore = vm.getStore('CostShareMaximums');
                CostShareMaximumsStore.rejectChanges();
                if(vm.get('radioValueOnLoad')!= 'aggregate'){
                    view.down('[id="embeddedRadio"]').setValue(true);
                    view.down('[id="aggregateRadio"]').setValue(false);
                } else {
                    vm.set('radioValueOnLoad',"aggregate");
                    view.down('[id="embeddedRadio"]').setValue(false);
                    view.down('[id="aggregateRadio"]').setValue(true);
                }
                vm.set('changed',false);
            }
        });
    }
});