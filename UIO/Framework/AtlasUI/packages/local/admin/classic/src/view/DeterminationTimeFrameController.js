/**
 * Created by S4505 on 10/20/2016.
 */
/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Determination Time Frame view controller.
 */
Ext.define('Atlas.admin.view.DeterminationTimeFrameController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.determinationtimeframe',

    init:function(){
        var grid = this.getView();
        var vm= this.getViewModel();
        grid.on("select", 'selectedGrid', this);

        grid.on('edit',function(editor,context){
            if (context.record.dirty && context.record.crudState!='C' ) {
                context.record.set('isNeedUpdate', true);
            }

            context.record.set('coverageTypeDesc',this.lookupReference('coverageTypeCombo').getRawValue());
            if (this.lookupReference('rdCombo').getRawValue())
                context.record.set('RDTypeDesc',this.lookupReference('rdCombo').getRawValue());
            if(this.lookupReference('determinationCategoryCombo').getRawValue())
                 context.record.set('determinationCategoryDesc',this.lookupReference('determinationCategoryCombo').getRawValue());
            if(this.lookupReference('determinationCategoryCombo'))
                context.record.set('PGH',this.lookupReference('pghCombo').getRawValue());
            if(this.lookupReference('urgencyCombo'))
                context.record.set('urgencyDesc',this.lookupReference('urgencyCombo').getRawValue());

        });
        var determinationtimeframe = vm.getStore('determinationtimeframe');
        grid.on('canceledit',function(editor,context){
            if(context.record && context.record.crudState=='C' && context.record.dirty)
            {
                determinationtimeframe.remove(grid.getSelection());
            }

            grid.lookupReference('addButton').setDisabled(false);
            if(grid.getSelection())
            {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (determinationtimeframe.getModifiedRecords().length>0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
        var planGroupHierarchyExt = vm.getStore('planGroupHierarchyExt');
        planGroupHierarchyExt.getProxy().setExtraParam('pWhere','');
        planGroupHierarchyExt.getProxy().setExtraParam('pBatchSize',0);
        planGroupHierarchyExt.load({
            scope:this,
            callback: function (recordInfo, operation, success) {


                determinationtimeframe.load();
            }

            });
        grid.on("itemdblclick", 'loadConditionalListsGrid', this);

    },
    editGrid:function () {
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(false);

    },

    selectedGrid:function () {
        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },
    getPlanGroupHierarchText:function(value,meta,record){

        if (value=='')
            return '';
        var vm= this.getViewModel();
        var planGroupHierarchyExt = vm.getStore('planGroupHierarchyExt');
       // var pg = record.get('planGroupHierachy');

        var r = planGroupHierarchyExt.findRecord('SystemID',value);
        if (r){
            var text = r.get('PGH');//r.get('carrierName') + ' - ' + r.get('AccountName') + ' - ' + r.get('LOBName') +' - ' + r.get('carrierAcctNumber');
            if (text!='')
                return text;
            else return '';
        }
        else {
           //console.log('SystemID not found in planGroupHeirarchExt ' + value + " " + record.);
            return '';
        }



    },

    loadConditionalListsGrid:function(){

        var grid=this.getView();
        var record = grid.getSelection()[0];
        var ct = record.get('RDType') != '' ? record.get('RDType') : record.get('coverageType');
        this.loadConditionalLists(ct);
        this.editGrid();
    },
    loadConditionalListsCombo:function(combo,record){
        var ct = combo.getValue();
        this.loadConditionalLists(ct, true);
    },
    loadConditionalLists:function(ct, setDefaultValue){
        var vm = this.getViewModel(),
            view = this.getView(),
            urgencyCombo = view.lookupReference('urgencyCombo'),
            determinationCategoryCombo = view.lookupReference('determinationCategoryCombo'),
            determinationCategoryCD = vm.getStore('determinationCategoryCD'),
            determinationCategoryRD = vm.getStore('determinationCategoryRD'),
            urgencyTypeCD = vm.getStore('urgencyTypeCD'),
            urgencyTypeRD = vm.getStore('urgencyTypeRD'),
            urgencyTypeDMR = vm.getStore('urgencyTypeDMR');

        if (ct == 'CD')
        {
            urgencyCombo.bindStore(urgencyTypeCD);
            determinationCategoryCombo.bindStore(determinationCategoryCD);
        }
        else if (ct == 'DMR'){
            urgencyCombo.bindStore(urgencyTypeDMR);
            determinationCategoryCombo.bindStore(determinationCategoryCD);
        }
        else {
            urgencyCombo.bindStore(urgencyTypeRD);
            determinationCategoryCombo.bindStore(determinationCategoryRD);
        }

        if (setDefaultValue && ct != 'DMR') {
            urgencyCombo.setValue(urgencyCombo.getStore().data.items[0].data.value);
        }
    },

    getCoveragetypeDesc:function(value,meta,record){
        var r = record.get('coverageTypeDesc');
        if (r)
            return r;
        else return '';
    },
    getRDTypeDesc:function(value,meta,record){
        var r = record.get('RDTypeDesc');
        if (r)
            return r;
        else return '';
    },
    getCategoryDetermimationDesc:function(value,meta,record){
        var r = record.get('determinationCategoryDesc');
        if (r)
            return r;
        else return '';
    },
    getUrgencyDesc: function (value,meta,record) {
        var r = record.get('urgencyDesc');
        if (r)
            return r;
        else return '';
    },
    onReject: function (btn) {

        //undo any changes to the record
        var grid=this.getView();
        var store = this.getViewModel().getStore('edifileinfo');
        var rec = btn.up().getViewModel().data.record;
        var determinationtimeframe = this.getViewModel().getStore('determinationtimeframe');
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            determinationtimeframe.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
            this.editGrid();
            return;

        }
        rec.reject();

        //reset the state
        rec.set('isNeedUpdate', false);
        var grid = this.getView();

        var m =determinationtimeframe.getModifiedRecords().length;
        if (m>0)
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    },
    onAdd: function (btn) {
        var view = this.getView(),
            vm = this.getViewModel(),
            determinationCategoryCD = vm.getStore('determinationCategoryCD'),
            urgencyTypeDMR = vm.getStore('urgencyTypeDMR');
        var   plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing)
            return false;
        else {
            this.editGrid();
            var store = this.getViewModel().get('determinationtimeframe'),
                newList = Ext.create('Atlas.admin.model.DeterminationTimeFrame');

            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
            view.lookupReference('cbTollIndicator').setValue(true);
            view.lookupReference('cbActive').setValue(true);
            view.lookupReference('urgencyCombo').bindStore(urgencyTypeDMR);
            view.lookupReference('determinationCategoryCombo').bindStore(determinationCategoryCD);
        }

    },
    onRemove: function (btn) {
        var store = this.getViewModel().get('determinationtimeframe'),
            gridSelectedRows = this.getView().getSelection();
        store.remove(gridSelectedRows);
        //grid.lookupReference('saveButton').setDisabled(false);
        //grid.lookupReference('removeButton').setDisabled(false);
        this.getView().lookupReference('saveButton').setDisabled(false);

    },
    onSave: function (btn) {
        var store = this.getViewModel().get('determinationtimeframe');
        //debugger;

        var plugin = this.getView().getPlugin();
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return;
        }

        var saveAction = [{
            "Create": {"key": 'Action', "value": 'Add'},
            "Update": {"key": 'Action', "value": 'Update'},
            "Delete": {"key": 'Action', "value": 'Delete'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'claims/rx/determinationtimeframe/update', 'ttDeterminationTimeFrame',[true], null,
            saveAction, null  );

        if (testReturn.code != 0) {
            Ext.Msg.alert('Error', testReturn.message, Ext.emptyFn);
        }
        else {
            Ext.Msg.alert('Success', 'Record Saved Successfully', Ext.emptyFn);
        }

        store.load();
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
        grid.lookupReference('removeButton').setDisabled(true);
        grid.lookupReference('addButton').setDisabled(false);
    }

});
