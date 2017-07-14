/**
 * Created by S4505 on 10/20/2016.
 */

/*
 Last Developer:Sheeloo Sachan
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Report Settings view controller.
 */
Ext.define('Atlas.admin.view.ReportSettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-reportsettings',
    reportProxy:{},

    init: function () {
        var vm = this.getViewModel();
        this.addedRow = false;
        var contactCodesStore = vm.getStore('reportList');
        contactCodesStore.sort('reportName');
        contactCodesStore.load();

        var storeUserGroupWithAll = vm.getStore('usergroups');
        storeUserGroupWithAll.load();

        var storeDataPACategories = vm.getStore('DataPACategories');
        storeDataPACategories.getProxy().setExtraParam('pListName','DataPaCategories');
        storeDataPACategories.load();

        this.getView().lookupReference('removeButton').setDisabled(true);
        this.getView().lookupReference('saveButton').setDisabled(true);
        this.getView().lookupReference('addButton').setDisabled(false);
    },

    beforeEditing:function(editor, context){
        var me = this,
            vm = this.getViewModel();
        if (!this.addedRow) {
            this.addedRow =true;
            if (context.record.data.ReportModule == 'MERLIN')
                me.lookupReference('cbCategory').setDisabled(true);
            else
                me.lookupReference('cbCategory').setDisabled(false);
        }else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },



    afterEditing:function(editor, context){
        var me = this,
            vm = this.getViewModel();
        var catgoryId= context.record.get('CategoryId');
        var catStore= this.lookupReference('cbCategory').store;

        if (catStore != null) {
            for(var index=0; index<catStore.data.items.length; index++){
                if(catStore.data.items[index].data.ListItem==catgoryId){
                    context.record.set('CategoryName', catStore.data.items[index].data.ListDescription);
                }
            }
        }

        if (context.record.dirty && context.record.crudState == 'C')
            context.record.set('isNeedUpdate', true);

        if (context.record.dirty && context.record.crudState == 'U')
            context.record.set('isNeedUpdate', true);


        this.addedRow = false;
        this.getView().lookupReference('removeButton').setDisabled(true);
        this.getView().lookupReference('addButton').setDisabled(false);
        this.getView().lookupReference('saveButton').setDisabled(false);
    },

    cancelEditButton: function (editor, context) {
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    onRecordAdd: function(button) {
        if (!this.addedRow) {
            var store = this.getViewModel().get('reportList'),
                newList = Ext.create('Atlas.common.model.ReportsList'),
                plugin = this.getView().getPlugin('rowEditreportsettings');
            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
            this.getView().lookupReference('addButton').setDisabled(true);
            this.addedRow = true;
        } else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },

    onViewReportFilterClick: function(button) {
        var me = this,
            view = this.getView(),
            grid = this.getView();
        var selection = grid.selection;
        if (selection!=null) {
            var reportId = selection.get('reportID');
            var reportName = selection.get('reportName');
            var ReportParams = {
                ReportId: reportId,
                ReportName: reportName
            };
            if(reportName!=undefined && reportName !='' && !selection.dirty) {
                var win = Ext.create({
                    xtype: 'ViewReportFilterWindow',
                    extraParams: {
                        'ReportParams': ReportParams
                    }
                });
                view.add(win).show();
            }
            else {Ext.Msg.alert('Alert','Please SAVE the report before creating Report Filter.');}

        }
        else {
            Ext.Msg.alert('Alert','Please select a Report.');
        }
    },

    LoadViewFilters: function (reportId) {
        var view = this.getView(),
            viewModel = this.getViewModel(),
            grid=view.down('#gridReportFilter');
        var reportFilterStore = vm.getStore('reportFilter');
        reportFilterStore.getProxy().setExtraParam('pReportID', reportId);
        reportFilterStore.load({
            callback: function () {
                grid.setStore(reportFilterStore);
            }
        });
    },

    saveReportList: function (button) {
        var viewModel=this.getViewModel(),
            grid = this.getView(),
            store = grid.getStore();

        if (!this.isDirtyStore(this.getViewModel().get('reportList')))
            return;

        saveAction = [{
            "Create": {"key": 'Mode', "value": 'A'},
            "Update": {"key": 'Mode', "value": 'U'},
            "Delete": {"key": 'Mode', "value": 'D'}
        }];

        store.data.items.forEach(function (item, index) {
            if(item.data.userGroupsData) {
                var indexAll = item.data.userGroupsData.indexOf("0");
                if (indexAll != -1)
                    item.data.userGroupsData[indexAll] = "*";
                item.data.userGroup = item.data.userGroupsData.join(',');
            }

            if(item.data.dataAccessFilterFlag=='on' || item.data.dataAccessFilterFlag)
                item.data.dataAccessFilterFlag=true;
            else
                item.data.dataAccessFilterFlag=false;

            if(item.data.RptByDrugClass=='on' || item.data.RptByDrugClass)
                item.data.RptByDrugClass=true;
            else
                item.data.RptByDrugClass=false;

            if(item.data.usePlanLevelDATree=='on' || item.data.usePlanLevelDATree)
                item.data.usePlanLevelDATree=true;
            else
                item.data.usePlanLevelDATree=false;

            item.data.userGroupsData="";
        });

        store.removed.forEach(function (item, index) {
            item.data.userGroupsData="";
        });

        var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/reportlist/update', 'ttReportList', [true], null,
        saveAction, null);

        if (submitJobReturn.code == 0) {
          this.getView().lookupReference('removeButton').setDisabled(true);
          this.getView().lookupReference('saveButton').setDisabled(true);
          this.getView().lookupReference('addButton').setDisabled(false);
          viewModel.getStore('reportList').load();
        }
        else {
           Ext.Msg.alert("PBM Alert", submitJobReturn.message);
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
    },

    onReject: function (btn) {
        var reportList = this.getViewModel().getStore('reportList');
        var rec = btn.up().getViewModel().data.record;
        if (rec.crudState=='C'){
            this.getView().getPlugin('rowEditreportsettings').disabled=true;
            reportList.remove(rec);
            this.getView().getPlugin('rowEditreportsettings').disabled=false;
        }

        rec.reject();
        rec.set('isNeedUpdate', false);
        rec.dirty =false;
        rec.crudState = "";
        this.getView().lookupReference('removeButton').setDisabled(true);
        this.getView().lookupReference('addButton').setDisabled(false);
        if(!this.isDirtyStore(reportList))
            this.getView().lookupReference('saveButton').setDisabled(true);
    },

    removeRecord: function(){
        var view=this.getView(),
            grid =this.getView(),
            viewModel = this.getViewModel();
        var store = viewModel.getStore('reportList');
        if(grid.getSelectionModel()) {
            var selModels=grid.getSelectionModel().getSelection();
            selModels.forEach(function logArrayElements(element, index, array){
                store.remove(store.remove(selModels[index]));
            });
        }

        this.getView().lookupReference('saveButton').setDisabled(false);
        this.addedRow = false;
    },

    removeFilterRecord: function(){
        var view=this.getView(),
            grid = view.down('#gridReportFilter'),
            viewModel = this.getViewModel();
        var store = viewModel.getStore('reportFilter');
        if(grid.getSelectionModel()) {
            var selModels=grid.getSelectionModel().getSelection();
            selModels.forEach(function logArrayElements(element, index, array){
                store.remove(store.remove(selModels[index]));
            });

        }
    },

    comboBoxforTypeCode : function(value, metaData, record, rowIndex, colIndex, store) {
        if(!value)
            return '';
        var arr;
        var groupNames;
        var vm=this.getViewModel();
        if(Array.isArray(value)) {
            arr = value;
        }
        else {arr = value.split(',');}

        var storeusergroups=vm.getStore('usergroups');
        arr.forEach(function (val, index) {
            var idx = storeusergroups.find('groupId', val);
            var rec = storeusergroups.getAt(idx);
            if(rec!=null) {
                if (!groupNames)
                    groupNames = rec.get('groupName')
                else
                    groupNames = groupNames + "," + rec.get('groupName');
            }
        });

        return   groupNames ;
    },

    renderUserGroup:function (value) {

        if (value)
        {
            var vm = this.getViewModel();
            if(Array.isArray(value)) {
                arr = value;
            }
            else {arr = value.split(',');}
            var ccusergroups = vm.getStore('usergroups');
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
    } ,

    grdRowClick:function(grid, selctedRow, e){
        var me = this,
            view = me.getView(),
            btnSetViewFilter = view.lookupReference('setViewButton');
        if(selctedRow.data.ReportModule=='MERLIN'){
            btnSetViewFilter.setDisabled(false);
        }
        else{
            btnSetViewFilter.setDisabled(true);
        }
        this.getView().lookupReference('removeButton').setDisabled(false);
    },

    ReportModuleOnChange : function (field, newValue, oldValue) {
        var me = this,
            view=this.getView(),
            viewModel = this.getViewModel(),
            cbObject= me.lookupReference('cbReportObject');
        var store = viewModel.getStore('DataPACategories');
        if(newValue=='DATAPA'){
            me.lookupReference('cbCategory').setDisabled(false);
            store.getProxy().setExtraParam('pListName','DataPaCategories');
            cbObject.store.data.items[1].data.field1='Dashboard';
            store.load();
        }
        else {
            store.removeAll();
            me.lookupReference('cbCategory').setRawValue('');
            cbObject.store.data.items[1].data.field1='Batch';
        }
    },

    CategoryRenderer: function (value,record) {
        if (value != 0) {
            return record.record.get('CategoryName');
        }
    }

});