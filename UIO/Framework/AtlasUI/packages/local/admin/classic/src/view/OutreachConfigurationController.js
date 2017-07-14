/**
 * Created by S4505 on 10/20/2016.
 */

/*
 Last Developer: Sundar Parthasarathy
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for PBM Rules view controller.
 */
Ext.define('Atlas.admin.view.OutreachConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-outreachconfiguration',

    init: function () {

        // Any init logic should go here.
        var grid = this.getView();
        grid.on("select", 'selectedGrid', this);

        grid.on("itemdblclick", 'beforeRenderContactCodes', this);
        var vm = this.getViewModel();
        var outreachConfigurationStore= vm.getStore('outreachConfigurationStore');
        var outreachContactCodes = vm.getStore('outreachContactCodes');

        outreachContactCodes.on('load',function(store , recordInfo , successful , operation , eOpts){
            outreachConfigurationStore.getProxy().setExtraParam();
            outreachConfigurationStore.load();
        });
        outreachContactCodes.getProxy().setExtraParam('pShowAll',true);
        outreachContactCodes.getProxy().setExtraParam('ipcCategory','All');
        outreachContactCodes.getProxy().setExtraParam('iplGetGeneral',false);
        outreachContactCodes.load();

        grid.on('edit',function(editor,context){
            if (context.record.dirty && context.record.crudState!='C' ) {
                context.record.set('isNeedUpdate', true);
            }
        });
        grid.on('canceledit',function(editor,context){
            if(context.record && context.record.crudState=='C' && context.record.dirty)
            {
                outreachConfigurationStore.remove(grid.getSelection());
            }

            grid.lookupReference('addButton').setDisabled(false);
            if(grid.getSelection())
            {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (outreachConfigurationStore.getModifiedRecords().length>0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
    },
    onItemdblclick: function (grid, record, item) {
        console.log("dude");
        //Ext.Msg.alert('Alert','The Outreach Configuration Row is click '+ e.text);

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
    onUpdateCategory : function(combo, record)
    {
        var vm = this.getViewModel();
        var SubCat = this.getView().lookupReference('SubCat'),
            outreachSubCategory = vm.getStore('outreachSubCategory'),
            SubCategoryBlankStore = vm.getStore('SubCategoryBlankStore');

        if (record.get('value')=='Decision')
        {
            //console.log("Dec " + enable);
            SubCat.enable();
            SubCat.bindStore(outreachSubCategory);
            if (outreachSubCategory.data.length > 0) {
                SubCat.setValue(outreachSubCategory.data.items[0].data.value);
            }
        }

        else
        {
            SubCat.bindStore(SubCategoryBlankStore);
            SubCat.setValue('');
        }
        var tf = this.getView().lookupReference('AllowedAttempts');
        var tf2 = this.getView().lookupReference('SuccessCodes');
       var outreachContactCodesPartial= this.getViewModel().getStore('outreachContactCodesPartial');
        outreachContactCodesPartial.getProxy().setExtraParam('pShowAll',true);
        outreachContactCodesPartial.getProxy().setExtraParam('ipcCategory',record.get('value'));
        outreachContactCodesPartial.getProxy().setExtraParam('iplGetGeneral',false);
        outreachContactCodesPartial.load({
                callback: function (recordInfo, operation, success) {
                    tf.setValue('');
                    tf2.setValue('');
                }
            }

        );
    },
    beforeRenderContactCodes: function(combo,eOpts){
        var grid = this.getView();
        var tf = grid.lookupReference('AllowedAttempts');
        var tf2 = grid.lookupReference('SuccessCodes');
        var SubCat = grid.lookupReference('SubCat');
        var row = grid.getSelectionModel().getSelection()[0];
        var cat = row.get("Category");
        var vm = this.getViewModel(),
            outreachContactCodesPartial= vm.getStore('outreachContactCodesPartial'),
            SubCategoryBlankStore = vm.getStore('SubCategoryBlankStore'),
            outreachSubCategory = vm.getStore('outreachSubCategory');
        outreachContactCodesPartial.getProxy().setExtraParam('pShowAll',true);
        outreachContactCodesPartial.getProxy().setExtraParam('ipcCategory',cat);
        outreachContactCodesPartial.getProxy().setExtraParam('iplGetGeneral',false);
        outreachContactCodesPartial.load({
                callback: function (recordInfo, operation, success) {
                    if(tf) {
                       // var row = this.getView().getSelectionModel().getSelection()[0];
                        if (row) {
                            //console.log('setting values cc');
                            var val = row.get('AllowedContactCodes');
                            if (val) {
                                tf.setValue(val.split(','));
                            }
                            var val2 = row.get('SuccessContactCodes');
                            if (val2) {
                                tf2.setValue(val2.split(','));
                            }
                        }
                    }
                }
            }

        );

        if (row) {
            if (row.get("Category") == 'Decision') {
                SubCat.bindStore(outreachSubCategory);
            }
            else {
                SubCat.bindStore(SubCategoryBlankStore);
            }
        }

        this.editGrid();

    },
    displayCategoryDesc:function(value,meta,record)
    {
        var viewModel=this.getViewModel();
        var outreachConfigurationCategory = viewModel.getStore('outreachConfigurationCategory');
        var r=  outreachConfigurationCategory.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    displayDeterminationTypeDesc:function(value,meta,record)
    {
        var viewModel=this.getViewModel();
        var determinationTypes = viewModel.getStore('determinationTypes');
        var r=  determinationTypes.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    displayContactedEntityDesc:function(value,meta,record)
    {
        var viewModel=this.getViewModel();
        var outreachContactedEntity = viewModel.getStore('outreachContactedEntity');
        var r=  outreachContactedEntity.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    displayContactCodesFull:function(value){
        if (value)
        {
            var vm = this.getViewModel();
            var outreachContactCodes = vm.getStore('outreachContactCodes');
            var vArray = value.split(',');
            var returnVal='';
            try {
                for (var i = 0; i < vArray.length; i++) {
                    var record = outreachContactCodes.findRecord('ReasonCode', vArray[i]);
                    returnVal += record.get('DESCRIPTION');
                    if (i < vArray.length - 1)
                        returnVal += ',';
                }
            }
            catch( e)
            {
            }
            return returnVal;
        }
        else
            return '';
    },
    onAdd: function (btn) {
        var plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing)
        {
            return false;
        }
        else {
            this.editGrid();
            var vm = this.getViewModel(),
                store = vm.get('outreachConfigurationStore'),
                outreachContactCodesPartial= vm.getStore('outreachContactCodesPartial'),
                SubCategoryBlankStore = vm.getStore('SubCategoryBlankStore'),
                newList = Ext.create('Atlas.admin.model.OutreachConfiguration');

            outreachContactCodesPartial.removeAll();
            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
            this.getView().lookupReference('SubCat').bindStore(SubCategoryBlankStore);
            this.getView().lookupReference('cbActive').setValue(true);
        }
    },
    onRemove: function (btn) {
        var store = this.getViewModel().get('outreachConfigurationStore'),
            gridSelectedRows = this.getView().getSelection();

        if (gridSelectedRows != null && gridSelectedRows.length != 0) {
            store.remove(gridSelectedRows);
            this.getView().lookupReference('saveButton').setDisabled(false);
        }
    },
    onSave: function(btn){
        var store = this.getViewModel().get('outreachConfigurationStore');

        var plugin = this.getView().getPlugin();
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return;
        }

        var saveAction = [{
            "Create": {"key": 'recordAction', "value": 'A'},
            "Update": {"key": 'recordAction', "value": 'U'},
            "Delete": {"key": 'recordAction', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/outreachconfiguration/update', 'ttOutreachConfig',[true], null,
            saveAction, null  );

        if (testReturn.code != 0) {
            Ext.Msg.alert('Error', testReturn.message, Ext.emptyFn);
        }

        store.getProxy().setExtraParam();
        store.load();
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
        grid.lookupReference('removeButton').setDisabled(true);
        grid.lookupReference('addButton').setDisabled(false);

    },
    onReject: function (btn) {

        //undo any changes to the record
        var outreachConfigurationStore = this.getViewModel().getStore('outreachConfigurationStore');
        var grid = this.getView();
        var rec = btn.up().getViewModel().data.record;
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            outreachConfigurationStore.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
            this.editGrid();
            return;

        }

        rec.reject();

        //reset the state
        rec.set('isNeedUpdate', false);
        var m =outreachConfigurationStore.getModifiedRecords().length;
        if (m>0)
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    }

});
