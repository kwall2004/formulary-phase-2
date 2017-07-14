Ext.define('Atlas.admin.view.PbmRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-pbmrules',
    init: function () {
        var grid = this.getView();
        grid.on("select", 'selectedGrid', this);
        grid.on("itemdblclick", 'selectCombo', this);
        grid.on('edit', function (editor, context) {
            if (context.record.dirty) {
                context.record.set('isNeedUpdate', true);
                grid.lookupReference('saveButton').setDisabled(false);
            }
        });
        var pbmrulesStore = this.getViewModel().getStore('pbmrulesStore');
        grid.on('canceledit',function(editor,context){
            if(context.record && context.record.crudState=='C' && context.record.dirty)
            {
                pbmrulesStore.remove(grid.getSelection());
            }

            grid.lookupReference('addButton').setDisabled(false);
            if(grid.getSelection())
            {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (pbmrulesStore.getModifiedRecords().length>0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
    },

    cancelEditButton: function (editor, context) {
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    beforeEditing:function(editor, context){
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

    selectCombo: function () {
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(true);
    },
    onTypesSelect: function (combo, record) {
        var vm = this.getViewModel(),
          View = this.getView();
        var pbmrulesStore = vm.getStore('pbmrulesStore');
        if (record.get('name') == '[Create a New Rule Type]') {
            pbmrulesStore.removeAll();
            View.down('#pgToolbar').onLoad();
            Ext.Msg.prompt('Create a New Rule Type', 'Please enter the new Rule Type:', function (btn, text) {
                if (btn == 'ok') {
                    if (text != '') {
                        var pbmTypes = vm.getStore('pbmTypes');
                       var newType= Ext.create('Atlas.common.model.PbmTypes');
                            newType.set('name', text);
                        pbmTypes.add(newType);
                        combo.setValue(text);

                    }
                }
                else{
                    View.lookupReference('pbmRuleTypesCombo').setValue('');
                    View.lookupReference('addButton').setDisabled(true);
                    View.lookupReference('deleteListButton').setDisabled(true);

                }
            });
        }
        else {
            pbmrulesStore.getProxy().setExtraParam('pRuleType', record.get('name'));
            pbmrulesStore.load();
            View.lookupReference('addButton').setDisabled(false);
            View.lookupReference('deleteListButton').setDisabled(false);
        }
        View.lookupReference('saveButton').setDisabled(true);
        View.lookupReference('removeButton').setDisabled(true);


    },
    onAdd: function (btn) {
        var   plugin = this.getView().getPlugin('rowEdit');
        if(plugin.editing)
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
        else {
            var grid = this.getView();
            grid.lookupReference('saveButton').setDisabled(true);
            var store = this.getViewModel().get('pbmrulesStore'),
                newList = Ext.create('Atlas.admin.model.PbmRules');
            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
        }
    },

    onRemove: function (btn) {
        var store = this.getViewModel().get('pbmrulesStore'),
            gridSelectedRows = this.getView().getSelection();
        store.remove(gridSelectedRows);
        this.getView().lookupReference('saveButton').setDisabled(false);
        this.addedRow = false;
    },

    onSave: function (btn) {
        var store = this.getViewModel().get('pbmrulesStore');

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var type = this.getView().lookupReference('pbmRuleTypesCombo').getValue();
        if(this.isDirtyStore(store)) {
            var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/pbmrule/update', 'ttRules', [true], {pRuleType: type},
                saveAction, null);
            var vm = this.getViewModel();
            var pbmrulesStore = vm.getStore('pbmrulesStore');
            pbmrulesStore.getProxy().setExtraParam('pRuleType', type);
            pbmrulesStore.load();
            if (testReturn.code == 0) {
                Ext.Msg.alert('PBM Rules', 'Rules successfully updated.');

            } else {
                Ext.Msg.alert("PBM Alert", testReturn.message);
            }
            var grid = this.getView();
            grid.lookupReference('saveButton').setDisabled(true);
            grid.lookupReference('removeButton').setDisabled(true);
            grid.lookupReference('addButton').setDisabled(false);
        }

    },
    onReject: function (btn) {
        //undo any changes to the record
        var pbmrulesStore = this.getViewModel().getStore('pbmrulesStore');
        var rec = btn.up().getViewModel().data.record;
        var signaturesStore = this.getViewModel().getStore('signaturesStore');
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            pbmrulesStore.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
            //this.editGrid();
           // return;
        }

        rec.reject();
        rec.set('isNeedUpdate', false);
        rec.dirty =false;
        rec.crudState = "";
        var grid = this.getView();
        this.addedRow = false;
        var m =pbmrulesStore.getModifiedRecords().length;
        if (m>0)
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    },
    onDeleteList: function (btn) {
        //debugger;
        var vm = this.getViewModel();
        var grid = this.getView();
        var store = this.getViewModel().get('pbmrulesStore');
        var combo = grid.lookupReference('pbmRuleTypesCombo');
        var type = combo.getValue();
        Ext.Msg.confirm('Delete List', 'Are you sure you wish to delete list: <b>'+ this.getView().lookupReference('pbmRuleTypesCombo').getValue() +'</b>?',function (btn)
        {
            if (btn == 'no'){
                return;
             }

            var saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}}];

                var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/delpbmruletype/update', 'ttRules', [true], {pRuleType: type},
                    saveAction, null);
                if (testReturn.message == 'Successful') {
                    Ext.Msg.alert('PBM Rules', 'Rules successfully updated.');
                    var pbmTypes = vm.getStore('pbmTypes');
                    pbmTypes.load();
                    combo.setValue('');

                    var pbmrulesStore = vm.getStore('pbmrulesStore');
                    pbmrulesStore.getProxy().setExtraParam('pRuleType', '');
                    pbmrulesStore.load();

                } else
                    Ext.Msg.alert('PBM Rules', 'Error updating rules.');

                grid.lookupReference('addButton').setDisabled(true);
                grid.lookupReference('saveButton').setDisabled(true);
                grid.lookupReference('deleteListButton').setDisabled(true);
                grid.lookupReference('removeButton').setDisabled(true);



        });

    },

    isDirtyStore:function(theStore) {
    var isDirty = false;
    theStore.each(function(item){
        if(item.dirty == true){
            isDirty = true;
        }
    });
    if (!isDirty){
        isDirty = (theStore.removed.length > 0);
    }
    return isDirty;

}
    // ,
    // RuleActiveChange:function (checkbox, oldValue,newValue, eOpts ) {
    //     var vm = this.getViewModel();
    //     var view = this.getView();
    //     var store = this.getViewModel().get('pbmrulesStore');
    // }
});