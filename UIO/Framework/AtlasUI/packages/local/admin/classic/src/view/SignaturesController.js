Ext.define('Atlas.admin.view.SignaturesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-signatures',
    init: function(){
        var grid = this.getView();
        var signaturesStore = this.getViewModel().getStore('signaturesStore');
        grid.on("select", 'selectedGrid', this);
       // grid.on("itemdblclick", 'editGrid', this);

        grid.on('edit',function(editor,context){
            var view = this.getView();
            if (context.record.dirty) {
                context.record.set('isNeedUpdate', true);
                view.up().lookupReference('saveButton').setDisabled(false);
                //view.up().lookupReference('removeButton').setDisabled(false);
            }
            else
            {
                view.up().lookupReference('saveButton').setDisabled(true);
               // view.up().lookupReference('removeButton').setDisabled(true);
            }
        });
        grid.on('canceledit',function(editor,context){
            if (context.record.phantom) {
                if(context.record.data.systemID==0)
                    context.store.remove(context.record);
            }
            grid.lookupReference('addButton').setDisabled(false);
            if(grid.getSelection().length>0)
            {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (signaturesStore.getModifiedRecords().length>0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
    },
    beforeEdit:function(editor,context)
    {
        var grid = this.getView();
        if (grid.plugins[0].editing) {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
        else {
            this.DonotLoad=false;
        }
    },
    editGrid:function () {
        var view = this.getView();
        view.lookupReference('saveButton').setDisabled(true);
    },

    selectedGrid:function () {
        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },

    onAdd: function (btn) {
        var  plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing)
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
        else{
            this.editGrid();
            var store = this.getViewModel().get('signaturesStore'),
                newList = Ext.create('Atlas.common.model.Signatures');

            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
        }

    },
    afterEditing:function(editor, context) {
        var me = this,
            view = me.getView(),
            btnSave = view.lookupReference('saveButton'),
            btnRemoveListItem = view.lookupReference('removeButton');

        btnSave.enable();
        btnRemoveListItem.enable();
    },
    onRemove: function (btn) {
        var store = this.getViewModel().get('signaturesStore');
        gridSelectedRows = this.getView().getSelection();
        store.remove(gridSelectedRows);
        this.getView().lookupReference('saveButton').setDisabled(false);

    },
    onSave: function (btn) {
        var store = this.getViewModel().get('signaturesStore');
        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/lettersignatures/update', 'ttletterSignature',[true], null,
            saveAction, null  );
        if (testReturn.code == 0) {
            Ext.Msg.alert("Success", 'Record updated successfully.');
        }
        else {
            Ext.Msg.alert("PBM Alert", testReturn.message);
        }

        var vm = this.getViewModel();
        var signaturesStore= vm.getStore('signaturesStore');
        signaturesStore.getProxy().setExtraParam();
        signaturesStore.load();
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
        grid.lookupReference('removeButton').setDisabled(true);
        grid.lookupReference('addButton').setDisabled(false);
    },
    onReject: function (btn) {
        var grid = this.getView();
        var rec = btn.up().getViewModel().data.record;
        var signaturesStore = this.getViewModel().getStore('signaturesStore');
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            signaturesStore.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
            this.editGrid();
        }
        else {
            rec.reject();
            //reset the state
            rec.set('isNeedUpdate', false);
        }
        var m =signaturesStore.getModifiedRecords().length;
        if (m>0)
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    }
});