/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.view.PatientSafetyRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-patientsafetyrules',

    /**
     * Called when the view is created
     */
    init: function() {
        var grid = this.getView();
        grid.on("itemclick", 'selectedGrid', this);
        grid.on('edit',function(editor,context){
            if (context.record.dirty && context.record.crudState!='C' ) {
                context.record.set('isNeedUpdate', true);
            }
            else if (context.record.dirty && context.record.crudState=='C')
            {
                context.record.set('ruleName',grid.lookupReference('psRuleCombo').getValue());
                context.record.set('ruleNameDesc',grid.lookupReference('psRuleCombo').getRawValue());
                context.record.set('ruleLevelDesc',grid.lookupReference('ruleLevelCombo').getRawValue());
            }
            //grid.lookupReference('psRuleCombo').setDisabled(false);
        });
        var store = this.getViewModel().getStore('patientSafetyRulesStore');
        grid.on('canceledit',function(editor,context){
            if(context.record &&  context.record.crudState=='C' && context.record.dirty)
            {
                store.remove(grid.getSelection());
            }

            grid.lookupReference('addButton').setDisabled(false);
            grid.lookupReference('removeButton').setDisabled(false);
        });
    },

    cancelEditButton: function (editor, context) {
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    beforeEditing:function(editor, context){
        var me = this,
            vm = this.getViewModel();
        if (!this.addedRow) {
            this.addedRow =true;
        }else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },

    afterEditing:function(editor, context){

        if (context.record.dirty && context.record.crudState == 'C')
            context.record.set('isNeedUpdate', true);

        if (context.record.dirty && context.record.crudState == 'U')
            context.record.set('isNeedUpdate', true);

        this.getView().lookupReference('saveButton').setDisabled(false);
        this.addedRow = false;
    },


    selectedGrid:function () {
        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },

    onRulesSelect:function(combo, record){
        var vm = this.getViewModel();
        var patientSafetyRulesStore = vm.getStore('patientSafetyRulesStore');
        patientSafetyRulesStore.getProxy().setExtraParam('pRuleName',record.get('value'));
        patientSafetyRulesStore.load();
        this.getView().lookupReference('addButton').setDisabled(false);
    },
    getRuleLevelDesc:function(value,meta,record){
        var cmsPatSafetyRuleLevelStore = this.getViewModel().getStore('cmsPatSafetyRuleLevelStore');
        if (value)
            return cmsPatSafetyRuleLevelStore.findRecord('value',value).get('name');
    },
    onAdd:function () {
        this.getView().lookupReference('saveButton').setDisabled(false);
        this.getView().lookupReference('removeButton').setDisabled(false);
        var store = this.getViewModel().get('patientSafetyRulesStore'),
            newList = Ext.create('Atlas.admin.model.PatientSafetyRulesModel'),
            plugin = this.getView().getPlugin('rowEdit');
        newList.set('isNeedUpdate', true);
        store.insert(0, newList);
        plugin.startEdit(0);
    },

    onRemove: function (btn) {
        var store = this.getViewModel().get('patientSafetyRulesStore'),
            gridSelectedRows = this.getView().getSelection();
        store.remove(gridSelectedRows);
        this.getView().lookupReference('saveButton').setDisabled(false);
        this.addedRow = false;
    },

    onSaveConfirm:function () {
        var me = this;
        Ext.MessageBox.confirm('Confirm ', 'Are you sure you would like to save changes?', function (btn) {
            if (btn === 'yes') {
                me.onSave();
            }
        }, this);

    },

    isDirtyStore: function (theStore) {
        var isDirty = false;
        theStore.each(function (item) {
            if (item.dirty == true) {
                isDirty = true;
            }
        });
        if (!isDirty) {
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;
    },

    onSave: function(btn){
        var store = this.getViewModel().get('patientSafetyRulesStore');

        if (!this.isDirtyStore(store))
            return;

        var saveAction = [{
            "Create": {"key": 'Action', "value": 'A'},
            "Update": {"key": 'Action', "value": 'U'},
            "Delete": {"key": 'Action', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/cmspatientsafetyrules/update', 'ttcmsPatientSafetyRules',[true], null,
            saveAction, null);

        if(testReturn){
            store.load();
            this.getView().lookupReference('saveButton').setDisabled(true);
            this.getView().lookupReference('removeButton').setDisabled(true);
            this.getView().lookupReference('addButton').setDisabled(false);
            this.getView().lookupReference('psRuleCombo').setDisabled(false);
            var title =  'Failure';
            var message =  testReturn.message;
            if(testReturn.code==0)
            {
                var title =  'Success';
                var message =  'Record saved Successfully.';
            }

            Ext.MessageBox.show({
                title: title,
                msg: message,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });

        }
    },

    onReject: function (btn) {

        //undo any changes to the record
        var patientSafetyRulesStore = this.getViewModel().getStore('patientSafetyRulesStore');
        var rec = btn.up().getViewModel().data.record;
        if (rec.crudState=='C'){
            patientSafetyRulesStore.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
        }else
            rec.reject();

        rec.set('isNeedUpdate', false);
        rec.dirty =false;
        rec.crudState = "";

        if (!this.isDirtyStore(patientSafetyRulesStore)) {
            this.getView().lookupReference('saveButton').setDisabled(true);
        }
    }
});