/**
 * Created by s6393 on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.view.GoalBarriersSettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goalBarriersSettingsController',

    init: function () {
        var StoreGroup = this.getViewModel().getStore('StoreGroup');
        StoreGroup.load();
    },
    onAddClick:function () {
        var vm = this.getViewModel();
        var store = vm.getStore('goalBarriersSettingsStore');
        var plugin = this.lookupReference('refGoalBarriersSettingsGrid').plugins[0];
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return;
        }
        else {
            var newRecord = new Atlas.casemanagement.model.GoalBarriersSettingsModel({});
            store.insert(0, newRecord);
            this.getView().down('#GoalBarriersSettingsGrid').plugins[0].startEdit(0, 0);
            this.getView().down('#GoalBarriersSettingsGrid').getView().refresh();
            //this.getReferences().refGoalBarriersSettingsGrid.getPlugin('rowEditing').startEdit(newRecord, 0);
            this.addedRow = true;
        }
    },
    rendererGroup: function (value) {
        if (!value)
            return '';
        if (value) {
            var arr;
            var display = "";
            var vm = this.getViewModel();
            arr = value;
            var StoreGroup = vm.getStore('StoreGroup');
            arr.forEach(function (val, index) {
                var idx = StoreGroup.find('groupId', val);
                var rec = StoreGroup.getAt(idx);
                if (display == "") {
                    display = rec.data.groupName;
                }
                else {
                    display = display + "," + rec.data.groupName;
                }
            });
            return display;
        }
    },
    completeEdit:function(editor, context)
    {
        var grid = this.getView().down('#GoalBarriersSettingsGrid');
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 0)){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
        }

    },
    beforeEdit:function(editor,context) {
        var plugin = this.lookupReference('refGoalBarriersSettingsGrid').plugins[0];
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
    },
    onUndoChangeClick:function(button)
    {

        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {

            var grid = this.getView().down('#GoalBarriersSettingsGrid');
            grid.store.remove(record);
            grid.findPlugin('rowediting').cancelEdit();

        }
    },
    onRemoveClick:function () {
        var grid=  this.lookupReference('refGoalBarriersSettingsGrid');
        var selected = grid.getSelectionModel();
        if (selected.hasSelection())
        {
            var row = grid.getSelectionModel().getSelection()[0];
            {
                if (row)
                {
                    Ext.Msg.confirm('Confirm', 'Are you sure you want to remove '+ row.data.description +' from this Goal Barriers Settings ?', function(btn){
                        if(btn == 'yes') {
                            //ready for delete
                            var store = grid.getStore();
                            store.remove(row);
                        }
                    },this);
                 }
            }
        }

    },
    onSaveClick: function () {

        var store=  this.lookupReference('refGoalBarriersSettingsGrid').getStore();
        var  saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var data="";
        var plugin = this.lookupReference('refGoalBarriersSettingsGrid').plugins[0];
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return;
        }
        else {
            var store = this.getViewModel().get('contactCodesStore');
            if (this.isDirtyStore(store)) {
                for (var i in store.data.items) {
                    var item = store.data.items[i];
                    if (!!item.dirty) {
                        item.data.TypeCode.forEach(function (val, index) {
                            if (data == "")
                                data = val;
                            else
                                data = data + "," + val;
                        })
                        item.data.groupPermissions = data;
                        item.data.TypeCode = null;
                    }
                }
                for (var i in store.removed) {
                    var rec = store.removed[i];
                    rec.data.TypeCode = null;
                }
                var saveData = Atlas.common.utility.Utilities.saveData(
                    [store],
                    'member/rx/mtmgoalbarriers/update',
                    'ttMTMGoalBarriers',
                    [true],
                    {}, //extraparams
                    saveAction,
                    null
                );
                if (saveData.code == 0) {
                    store.reload();
                    Ext.MessageBox.alert('Goal Barriers Settings', "Goal Barriers Settings successfully saved.", this.showResult, this);

                }
                else {
                    Ext.MessageBox.alert('Goal Barriers Settings', "Goal Barriers Settings not saved - " + saveData.message, this.showResult, this);
                }
            }

        }
    }
});