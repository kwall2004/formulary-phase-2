/**
 * Created by s6685 on 1/31/2017.
 */

Ext.define('Atlas.admin.view.ViewReportFilterWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewReportFilterWindowController',
    onFilterAdd: function() {
        var report = Ext.create('Atlas.common.model.ReportFilters', {
                Editable: true
            }),
            view=this.getView(),
            grid = view.down('#gridReportFilter'),
            viewModel = this.getViewModel();

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, report);
        grid.editingPlugin.startEdit(0, 0);
    },
    init: function() {
        var vm = this.getViewModel(),
            view=this.getView(),
            ReportParams =  view.extraParams["ReportParams"];
        reportFilterStore = vm.getStore('reportFilter');
        reportFilterStore.getProxy().setExtraParam('pReportID', ReportParams.ReportId);
        reportFilterStore.load({});
        view.title='Report Filter -'+ReportParams.ReportName;
    },
    onEdit: function() {},
    onUndoChangeClick: function (button) {
        button.getViewModel().data.record.reject();
        var me = this,
            isEnable = false,
            vm = me.getViewModel(),
            cklStore = vm.get('reportFilter');

        for(var i = 0; i < cklStore.data.items.length ; i ++){
            if(cklStore.data.items[i].dirty == true){
                isEnable = true;
            }
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
    CloseReportFilterWindow: function () {
        var view = this.getView();
            view.close();
    },

    saveReportFilter: function () {
        var vm=this.getViewModel(),
            view = this.getView(),
            ReportParams =  view.extraParams["ReportParams"];
            grid=view.down('#gridReportFilter'),
            store = grid.getStore(),
            localFilterList=[],
            dirty=false;
        if (!grid.plugins[0].editing) {
            saveAction = [{
                "Create": {"key": 'Mode', "value": 'A'},
                "Update": {"key": 'Mode', "value": 'U'},
                "Delete": {"key": 'Mode', "value": 'D'}
            }];
            var storedata= store.data.items;
            for (var ind = 0; ind < storedata.length; ind++) {
                var locUserGroup=storedata[ind].data.userGroup;
                var strGroups='';
                //storedata[ind].pReportId=ReportParams.ReportId;
                if(storedata[ind].data.isFilterReqd=='on' || storedata[ind].data.isFilterReqd){
                    storedata[ind].data.isFilterReqd=true;
                }
                else{
                    storedata[ind].data.isFilterReqd=false;
                }
                localFilterList.push(storedata[ind]);
            }
            if(this.isDirtyStore(store)) {
                store.data.items = localFilterList;
                var listDetail;
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/ReportFilter/update', 'ttReportFilter', [true],
                    {pReportId: ReportParams.ReportId}, saveAction, null);
                if (submitJobReturn.code == 0) {
                    Ext.Msg.alert("PBM", 'Record updated successfully.');
                }
                else {
                    Ext.Msg.alert("PBM Alert", submitJobReturn.message);
                }

                var ListStore = vm.getStore('reportFilter');
                ListStore.load();
            }
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
        }
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
    gpPharmacyServiceType_beforeedit : function (editor, e, record, rowIndex){

    },

    afteredit :function (editor, e, record, rowIndex) {

        // this.getView().down("#btnSave").setDisabled(false);
        if(e.record.crudState=="U" || e.record.dirty)
            e.record.set('isNeedUpdate', true);

    },

    onEdit: function (editor, context) {
        if (context.record.dirty && context.record.crudState != 'C') {
            //this.getChecklistRecord().set('isNeedUpdate',true);
            context.record.set('isNeedUpdate', true);
        }
    },
    ReportModuleOnChange : function (field, newValue, oldValue) {
        var view=this.getView(),
            grid =this.getView(),//  view.down('#GridRptSettings'),
            viewModel = this.getViewModel();
        var store = viewModel.getStore('DataPACategories');
        if(newValue=='DATAPA'){
            store.getProxy().setExtraParam('pListName','DataPaCategories');
        }
        else{
            store.getProxy().setExtraParam('pListName','testsdfdsing');
        }
        store.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespListDetail = Ext.decode(operation.getResponse().responseText);
            }
        });
    }

});