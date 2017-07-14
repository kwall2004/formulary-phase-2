/**
 * Created by S4505 on 10/20/2016.
 */

/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Contact Codes view controller.
 */
Ext.define('Atlas.admin.view.ContactCodesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactCodesController',

    init: function () {

        var vm = this.getViewModel();
        var contactCodesStore = vm.getStore('contactCodesStore');
        contactCodesStore.getProxy().setExtraParam('pShowAll',true);
        contactCodesStore.getProxy().setExtraParam('ipcCategory','All');
        contactCodesStore.load();

        var ccusergroups = vm.getStore('ccusergroups');
        ccusergroups.load();

        var grid = this.getView();
        grid.on("select", 'selectedGrid', this);
    },

    beforeEditing:function(editor, context){
        var  plugin = this.getView().getPlugin('rowEdit');
        var me = this,
            record = context.record,
            view = me.getView();

    },

    afterEditing:function(editor, context){
        var me = this,
            view = me.getView(),
            btnSave = view.lookupReference('saveButton'),
            btnRemoveListItem = view.lookupReference('removeButton');

        // context.record.set('isEditing', false);
        // context.record.set('isUpdated', true);



        if (context.record.dirty && context.record.crudState == 'C')
            context.record.set('isNeedUpdate', true);

        if (context.record.dirty && context.record.crudState == 'U')
            context.record.set('isNeedUpdate', true);




        btnSave.enable();
        btnRemoveListItem.enable();
    },

    beforeEditing: function (editor, context) {
        var grid = this.getView();
        if (grid.plugins[0].editing) {
            this.DonotLoad = true;
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
    },

    selectedGrid:function () {
        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },
    renderUserGroup:function (value) {
        if (value)
        {
            var vm = this.getViewModel();
            if(Array.isArray(value)) {
                arr = value;
            }
            else {arr = value.split(',');}
            var ccusergroups = vm.getStore('ccusergroups');
            var returnVal='';
            try {
                for (var index = 0; index < arr.length; index++) {
                    var vVal = parseInt(arr[index]);
                    var record = ccusergroups.findRecord('groupId', vVal);
                    returnVal += record.get('groupName');
                    if (index < arr.length - 1)
                        returnVal += ',';
                }
            }
            catch(e){}
            return returnVal;
        }
        return '';
    },

    onAdd: function (btn) {

        var store = this.getViewModel().get('contactCodesStore'),
            newList = Ext.create('Atlas.admin.model.ContactCodes'),
            plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing)
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return;
        }
        else {
            this.getView().lookupReference('saveButton').setDisabled(false);
            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
        }
    },

    onRemove: function (btn) {
        var store = this.getViewModel().get('contactCodesStore');
        var grid = this.getView();
        var gridSelectedRows = grid.getSelection();
        store.remove(gridSelectedRows);
        grid.lookupReference('saveButton').setDisabled(false);

    },
    onSave: function(btn) {
        var grid = this.getView();
        if (grid.plugins[0].editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
        else {
            if (!this.isDirtyStore(this.getViewModel().get('contactCodesStore')))
                return;

            var store = this.getViewModel().get('contactCodesStore');
            store.data.items.forEach(function (item, index) {
                if (item.data.GroupPermissionsData) {
                    var indexAll = item.data.GroupPermissionsData.indexOf("0");
                    if (indexAll != -1)
                        item.data.GroupPermissionsData[indexAll] = "*";
                    item.data.GroupPermissions = item.data.GroupPermissionsData.join(',');
                    item.data.GroupPermissionsData = "";
                }
            });
            store.removed.forEach(function (item, index) {
                item.data.GroupPermissionsData = "";
            });
            var saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];
            var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/contactcode/update', 'ttContactCodeList', [true], null,
                saveAction, null);
            if (testReturn.code == 0) {
                var grid = this.getView();
                grid.lookupReference('saveButton').setDisabled(true);
                grid.lookupReference('removeButton').setDisabled(true);
                grid.lookupReference('addButton').setDisabled(false);
                var vm = this.getViewModel();
                store.getProxy().setExtraParam('pShowAll', true);
                store.getProxy().setExtraParam('ipcCategory', 'All');
                store.load();
            }
            else {
                Ext.Msg.alert("PBM Alert", testReturn.message);
            }

        }
    },


    exportContactToExcel:function(btn){
        var vm = this.getViewModel();
        var contactCodesStore= vm.getStore('contactCodesStore');
        Atlas.common.utility.Utilities.exportToExcel(contactCodesStore,'rowNum');

    },
    displayCategoryFull:function(value,metaData, record, rowIndex, colIndex, store){
        if (value)
        {
            var vm = this.getViewModel();
            var categoryCodesStore= vm.getStore('categoryCodesStore');
            var record = categoryCodesStore.findRecord('value', value);
            var returnVal=record.get('name');
            return returnVal;
        }
        return "";

    },

    onReject: function (btn) {

        //undo any changes to the record
        var contactCodesStore = this.getViewModel().getStore('contactCodesStore');
        var rec = btn.getViewModel().data.record;
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            contactCodesStore.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
            rec.dirty =false;
            rec.crudState = "";

            if (!this.isDirtyStore(contactCodesStore)) {
                this.getView().lookupReference('saveButton').setDisabled(true);
            }
            return;
        }

        rec.reject();
        rec.set('isNeedUpdate', false);
        rec.dirty =false;
        rec.crudState = "";

        if (!this.isDirtyStore(contactCodesStore)) {
            this.getView().lookupReference('saveButton').setDisabled(true);
        }
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
});