/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Options view controller.
 */
Ext.define('Atlas.admin.view.OptionsController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.data.proxy.Server'
    ],

    alias: 'controller.optionsController',
    onAdd: function (btn) {
        var plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing)
            return false;
        else {
            this.editGrid();
            var store = this.getViewModel().get('optionsStore'),
                newList = Ext.create('Atlas.admin.model.Options');
            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
            var view = this.getView();
            view.lookupReference('saveButton').setDisabled(true);
        }


    },
    onRemove: function (btn) {
        var view=this.getView();
        var store = this.getViewModel().get('optionsStore');
         var   gridSelectedRows = this.getView().getSelection();
        store.remove(gridSelectedRows);
        this.editGrid();
        view.lookupReference('saveButton').setDisabled(false);

    },
    onSave: function (btn) {
        var store = this.getViewModel().get('optionsStore');


        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'system/rx/options/update', 'ttoptions',[true], null,
                saveAction, null  );
        //console.log(testReturn.message)
        if (testReturn.message.indexOf('already')!=-1)
        {
            var keyName = testReturn.message.substring(0, testReturn.message.indexOf('already'));
            Ext.Msg.alert('Options', 'Key Name ' + keyName + ' already exists in the database. Key Name must be unique.', function (btn, text) {
                /*if (btn == 'ok') {

                }*/
            });
            return;
        }

                    var vm = this.getViewModel();
        var optionsStore= vm.getStore('optionsStore');
        optionsStore.getProxy().setExtraParam();
        optionsStore.load();
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
        grid.lookupReference('removeButton').setDisabled(true);
        grid.lookupReference('addButton').setDisabled(false);

    },
    init: function () {

        // Any init logic should go here.
        var vm = this.getViewModel();
        var optionsStore= vm.getStore('optionsStore');
        //optionsStore.getProxy().setExtraParam();
        var grid = this.getView();
       //optionsStore.load();
       // // grid.filters.clearFilters(true);
        grid.on("select", 'selectedGrid', this);
        grid.on("itemdblclick", 'editGrid', this);

        grid.on('edit',function(editor,context){
            if (context.record.dirty) {
                context.record.set('isNeedUpdate', true);
                grid.lookupReference('saveButton').setDisabled(false);
            }
        });
        grid.on('canceledit',function(editor,context){
            if(context.record && context.record.crudState=='C' && context.record.dirty)
            {
                optionsStore.remove(grid.getSelection());
            }
            grid.lookupReference('addButton').setDisabled(false);
            if(grid.getSelection())
            {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (optionsStore.getModifiedRecords().length>0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
    },

    editGrid:function () {
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
    },

    selectedGrid:function () {

        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },

    onReject: function (btn) {
        var grid = this.getView();
        var rec = btn.up().getViewModel().data.record;
        var optionsStore = this.getViewModel().getStore('optionsStore');
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            optionsStore.remove(rec);
           this.getView().getPlugin('rowEdit').disabled=false;
            this.editGrid();
            return;

        }
        rec.reject();
        rec.set('isNeedUpdate', false);

        var storeLen =optionsStore.getModifiedRecords().length;
        if (storeLen>0)
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    }
});