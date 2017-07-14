/**
 * Created by d3973 on 10/11/2016.
 */
Ext.define('Atlas.admin.view.ListsViewController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.data.proxy.Server'
    ],
    alias: 'controller.adminlistsviewcontroller',

    /*
     NOTE
     Because the backend code only saves a new list if there is at least one record within the list,
     two stores have been created for the grid. They are switched between depending on whether a new
     list or former list is accessed
     */

    init: function(){
        var me = this,
            batchSize = 0,
            where = '',
            storePlanGroupAccess = me.getViewModel().getStore('planGroupAccess'),
            storeProxy = storePlanGroupAccess.getProxy(),
            storeListGrid = me.getViewModel().getStore('listGrid'),
            storeNewListGrid = me.getViewModel().getStore('newListGrid');

        storeListGrid.getProxy().setExtraParam('pagination', true);
        //storeListGrid.onAfter('load', 'onLoadListGrid');

        storeListGrid.onAfter('datachanged', 'checkIfNoRecords');
        storeNewListGrid.onAfter('datachanged', 'checkIfNoRecords');

        storeProxy.setExtraParam('pBatchSize', batchSize);
        storeProxy.setExtraParam('pWhere', where);
        this.addedRow =false;
       // storePlanGroupAccess.onAfter('load', 'onLoadPlanGroupAccess');
        storePlanGroupAccess.load();
       var storeComboBoxLists = me.getViewModel().getStore('comboBoxLists');
         storeComboBoxLists.load();
    },


    checkIfNoRecords: function(store){
        var me = this;

        if (store.getCount() === 0){
            var view = me.getView(),
                btnRemoveListItem = view.down('#removeButton'),
                btnSave = view.down('#saveButton');

            btnRemoveListItem.disable();
            btnSave.disable();
        }
    },

    beforeEditing:function(editor, context){
        var me = this,
            record = context.record,
            arrayPlanGroupAccess = record.get('arrayPlanGroupAccess'),
            view = me.getView();
        context.record.set('isNeedUpdate', true);
        if (!this.addedRow) {
            this.addedRow =true;
        }else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }

    },

    afterEditing:function(editor, context){
        var me = this,
            view = me.getView(),
            btnSave = view.down('#saveButton'),
            btnRemoveListItem = view.down('#removeButton');

        if (context.record.dirty && context.record.crudState == 'C')
            context.record.set('isNeedUpdate', true);

        if (context.record.dirty && context.record.crudState == 'U')
            context.record.set('isNeedUpdate', true);

        btnSave.enable();
        btnRemoveListItem.enable();
        this.addedRow = false;
    },

    onLoadListGrid: function(storeListGrid, records){
        var me = this,
            view = me.getView();

        for (var idx = 0, length = records.length; idx < length; idx = idx + 1){
            var currentRec = records[idx],
                planGroupAccess = currentRec.get('planGroupAccess'),
                arrayPlanGroupAccess = planGroupAccess.split(',');
                storeListGrid.getAt(idx).set('arrayPlanGroupAccess', arrayPlanGroupAccess);
        }
        storeListGrid.commitChanges();
    },

    onListSelect: function(combo, record){
        //debugger;
        var me = this,
            view = me.getView(),
            storeComboBoxLists = me.getViewModel().getStore('comboBoxLists'),
            listSelected = record.get('name'),
            storeListGrid = me.getViewModel().getStore('listGrid'),
            newComboBoxRecs = storeComboBoxLists.getNewRecords(),
            storeNewListGrid = me.getViewModel().getStore('newListGrid');

        if (newComboBoxRecs.length === 0){
            view.reconfigure(storeListGrid);

            storeListGrid.setListName(listSelected);
            storeNewListGrid.setListName('');
            storeListGrid.getProxy().setExtraParam('pListName', listSelected);
            storeListGrid.load();
        }
        //for if the add list button was selected at some point and changes have not been saved
        else {
            if (listSelected !== newComboBoxRecs[0].get('name')){
                var confirmSave = Ext.Msg.confirm(
                    'Remove List',
                    'You have not saved the new list. Continue and delete changes?',
                    function(buttonId){
                        if (buttonId == 'yes'){
                            storeNewListGrid.rejectChanges();
                            view.reconfigure(storeListGrid);
                            storeListGrid.setListName(listSelected);
                            storeNewListGrid.setListName('');
                            storeListGrid.getProxy().setExtraParam('pListName', listSelected);
                            storeListGrid.load();
                            storeComboBoxLists.load();

                            me.getView().down('#addButton').enable();
                            me.getView().down('#removeButton').enable();
                            me.getView().down('#saveButton').enable();
                            me.getView().down('#removeListButton').enable();
                            return;
                        }
                        else {
                            var store = me.retrieveStore();

                            combo.setValue(store.getListName());

                            me.getView().down('#addButton').enable();
                            me.getView().down('#removeButton').disable();
                            me.getView().down('#saveButton').disable();
                            me.getView().down('#removeListButton').enable();
                            return;
                        }
                    }
                );
            }
            else{
                storeNewListGrid.setListName(listSelected);
                storeListGrid.setListName('');
                storeNewListGrid.rejectChanges();
                view.reconfigure(storeNewListGrid);

                me.getView().down('#addButton').enable();
                me.getView().down('#removeButton').disable();
                me.getView().down('#saveButton').disable();
                me.getView().down('#removeListButton').enable();
                return;
            }
        }
        me.getView().down('#addButton').enable();
        me.getView().down('#removeButton').enable();
        me.getView().down('#saveButton').enable();
        me.getView().down('#removeListButton').enable();
    },

    /*onReject: function(btnReject){
        var me = this,
            record = btnReject.$widgetRecord;

        if (record.phantom){
            var store = me.retrieveStore();
            store.remove(record);
        }
        else{
            record.reject();
            record.set('isUpdated', false);

            if(!(record.get('ListItem'))){
                var grid = btnReject._rowContext.ownerGrid,
                    store = grid.getStore();
                    store.remove(record);
            }
        }
    },*/
    onReject: function (btn) {
        var reportList = this.getView().getStore();
        var rec = btn.up().getViewModel().data.record;
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEdit').disabled=true;
            reportList.remove(rec);
            this.getView().getPlugin('rowEdit').disabled=false;
        }

        rec.reject();
        rec.set('isNeedUpdate', false);
        rec.dirty =false;
        rec.crudState = "";
        this.getView().down('#removeButton').setDisabled(true);
        this.getView().down('#addButton').setDisabled(false);
        if(!this.isDirtyStore(reportList))
            this.getView().down('#saveButton').setDisabled(true);
    },


    addListItem: function(){
        //debugger;
        var me = this,
            store = me.retrieveStore(),
            newList = Ext.create('Atlas.admin.model.ListsModel'),
            plugin = me.getView().getPlugin('rowEdit'),
            sorters = store.getSorters(),
            currentSorter = sorters.getAt(0);

        if (plugin.editing){
            return;
        }

        newList.data.ListItem = '';
        newList.data.ListDescription = '';
        newList.data.planGroupAccess = '';
        newList.data.charString = '';
        newList.data.Active = true;

        /*
        if the user has changed the sort order of a column, the following will account for the change
         */
        if(currentSorter._direction === 'ASC'){
            store.insert(0, newList);
            plugin.startEdit(0);
        }
        else{
            var storeCount = store.getCount();

            store.insert(storeCount, newList);
            plugin.startEdit(storeCount);
        }
    },

    cancelEditing: function(editor, context){
        var me = this;

        if (!(context.record.get('ListItem')) || !(context.record.get('ListDescription'))){
            var store = me.retrieveStore();

            store.remove(context.record);
        }

        this.addedRow = false;
    },

    removeListItem: function(){
        var me = this,
            store = me.retrieveStore(),
            gridSelectedRows = me.getView().getSelection();

        if (gridSelectedRows){
            store.remove(store.remove(gridSelectedRows));
        }

        var saveBut=me.getView().down('#saveButton');
        saveBut.setDisabled(false);
        this.addedRow = false;
    },

    saveList: function() {
        //debugger;
        var me = this,
            view = me.getView(),
            store = me.retrieveStore(), //this is the grid that is currently binded to the grid
            storeComboBoxLists = me.getViewModel().getStore('comboBoxLists'),
            storeNewListGrid = me.getViewModel().getStore('newListGrid'),
            storeListGrid = me.getViewModel().getStore('listGrid'),
            testReturn;

        if(storeNewListGrid.data.items.length==0)
        {
            if (!this.isDirtyStore(this.getViewModel().get('listGrid')))
            return;
        }

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

            store.data.items.forEach(function (item, index) {
                if(item.data.planGroupAccessData)
                {
                    item.data.planGroupAccess = item.data.planGroupAccessData.join(',');
                    item.data.planGroupAccessData="";
                }
            });

            store.removed.forEach(function (item, index) {
                item.data.planGroupAccessData="";
            });

        testReturn = Atlas.common.utility.Utilities.saveData([store], 'system/rx/listdetail/update', 'ttListDetail', [true], {'pListName': store.getListName()},
            saveAction, null);

            if (testReturn.code == 0) {
               /* storeListGrid.getProxy().setExtraParam('pListName', store.getListName());
                storeListGrid.load({
                    callback: function (records, operation, success) {
                        view.reconfigure(storeListGrid);
                    }
                });*/

                storeListGrid.getProxy().setExtraParam('pListName', store.getListName());
                storeListGrid.load();
                view.reconfigure(storeListGrid);

                if (store == storeNewListGrid) {
                    storeListGrid.setListName(store.getListName());
                    storeNewListGrid.setListName('');
                }
            }
            else {
                Ext.Msg.alert("PBM Alert", testReturn.message);
            }

    },

    addList: function(){
        //debugger;
        var me = this,
            view = me.getView(0);

        //create a window to get the new list name
        var listWindow = Ext.create('Ext.window.Window', {
            title: 'Create a New List',
            modal: true,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Please enter the new list name:',
                itemId: 'newListName',
                listeners: {
                    //get value of the entered list name and close after pressing enter
                    specialkey: function(f, e){
                        if (e.getKey() == e.ENTER){
                            me.confirmAddNewList(this, listWindow);
                        }
                    },
                    afterrender: function(field) {
                        field.focus();
                    }
                }
            }],
            dockedItems:[{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'OK',
                        listeners: {
                            click: function(){
                                me.confirmAddNewList(this.up('window').down('#newListName') , listWindow);
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        handler: function(){
                            this.up('window').close();
                        }
                    },
                    '->'
                ]
            }]
        });
        view.add(listWindow).show();
    },

    removeList: function(){
        var me = this,
            storeListGrid = me.getViewModel().getStore('listGrid'),
            storeComboBoxLists = me.getViewModel().getStore('comboBoxLists'),
            store = me.retrieveStore(), //this will retrieve the current store binded with the grid
            currentListName = store.getListName(),
            storeNewListGrid = me.getViewModel().getStore('newListGrid'),
            view = me.getView();

        if (!currentListName){
            Ext.Msg.alert('Cannot Delete - Error', 'Choose a list to delete.');
            return;
        }

        if (store == storeListGrid){
            var confirmSave = Ext.Msg.confirm(
                'Remove List',
                'Are you sure you would like to delete list: <b>' + storeListGrid.getListName() + '</b>',
                function(buttonId){
                    if (buttonId == 'yes'){
                        storeListGrid.removeFilter();
                        storeListGrid.removeAll();
                        me.saveList();
                        view.down('#listComboBox').bindStore(storeComboBoxLists);
                        storeListGrid.setListName('');
                        storeNewListGrid.setListName('');
                        view.down('#listComboBox').setValue('');

                        view.down('#addButton').disable();
                        view.down('#removeButton').disable();
                        view.down('#saveButton').disable();
                        view.down('#removeListButton').disable();
                    }
                },
                null
            );
        }
        else{
            var confirmSave = Ext.Msg.confirm(
                'Remove List',
                'Are you sure you would like to delete list: <b>' + store.getListName() + '</b>',
                function(buttonId){
                    if (buttonId == 'yes'){
                        store.rejectChanges();
                        storeListGrid.removeFilter();
                        storeListGrid.removeAll();
                        storeListGrid.commitChanges();
                        view.reconfigure(storeListGrid);
                       // storeComboBoxLists.reload();
                        storeListGrid.setListName('');
                        storeNewListGrid.setListName('');
                        view.down('#listComboBox').setValue('');

                        view.down('#addButton').disable();
                        view.down('#removeButton').disable();
                        view.down('#saveButton').disable();
                        view.down('#removeListButton').disable();
                    }
                },
                null
            );
        }
    },

    retrieveStore: function(){
        /*
         this function ONLY returns the store that is currently binded to the grid
         */
        var me = this,
            view = me.getView(),
            store = view.getStore();
        return store;
    },

    confirmAddNewList: function(enteredListName, window){
        //debugger;
        var me = this;

        if (enteredListName.getValue() && !(enteredListName.getValue() == 'Enter List Name')){

            var storeComboBoxLists = me.getViewModel().getStore('comboBoxLists'),
                storeNewListGrid = me.getViewModel().getStore('newListGrid'),
                storeListGrid = me.getViewModel().getStore('listGrid'),
                view = me.getView(),
                modelListName = Ext.create('Atlas.admin.model.ListNamesModel'),
                cbxListName = view.down('combobox');

            modelListName.set('name', enteredListName.getValue());

            if (storeComboBoxLists.findRecord('name',enteredListName.getValue(),0,false,true,true) == null ){
                //debugger;
                storeComboBoxLists.add(modelListName);
            }else{
                Ext.Msg.alert('Error', 'This List Name Already exists, Please try another.');
                return;
            }

           // storeComboBoxLists.add(modelListName);
            cbxListName.select(modelListName);
            me.onListSelect(cbxListName, modelListName);

            view.reconfigure(storeNewListGrid);

            storeListGrid.rejectChanges();

            window.close();
        }
        else {
            //Ext.getComponent('newListName').setEmptyText('Enter List Name');
        }
    },
/*
    planGroupHierarchyRender: function(value, cell, recordListGrid){
        var me = this,
            vm = me.getViewModel(),
            sysIdArray = recordListGrid.get('planGroupAccess').split(','),
            storePlanGroupAccess = vm.getStore('planGroupAccess'),
            stringPlanGroupHier = '';

        for(var idx = 0, length = sysIdArray.length; idx < length; idx = idx + 1){
            var sysId = sysIdArray[idx],
                recordPlanGroupAccess = storePlanGroupAccess.findRecord('SystemID', sysId, 0, false, false, true);
            if (recordPlanGroupAccess){
                stringPlanGroupHier = stringPlanGroupHier + ',' + recordPlanGroupAccess.get('planGroupHierFullName');
            }
            else {
                return;
            }
        }
        if (sysIdArray){
            return stringPlanGroupHier.substr(1);
        }
        else {
            return;
        }
    }
    ,*/

    planGroupHierarchyRender : function(value, metaData, record, rowIndex, colIndex, store) {
        if(!value)
            return '';
        var arr;
        var names;
        var vm=this.getViewModel();
        arr = value;
        var storeplanGroupAccess=vm.getStore('planGroupAccess');
        arr.forEach(function (val, index) {
            var idx = storeplanGroupAccess.find('SystemID', val);
            var rec = storeplanGroupAccess.getAt(idx);
            if(!names)
                names = rec.get('planGroupHierFullName')
            else
                names = names +","+ rec.get('planGroupHierFullName');
        });

        if(!names)
            return '';

        return  '<SPAN>' + names + '</SPAN>' ;
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
