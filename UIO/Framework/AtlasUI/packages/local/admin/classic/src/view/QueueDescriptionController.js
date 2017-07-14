/**
 * Created by s6685 on 11/22/2016.
 */
var queDescrptGlobal;
var selectedQueID='';
Ext.define('Atlas.admin.view.QueueDescriptionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.QueueDescriptionController',

    init: function(){
    this.LoadQueueManagLists();
    },
    LoadQueueManagLists:function()
    {

        var strQueId=',';
        var vm = this.getViewModel(),
            view=this.getView(),
            grid=view.down('#gpQueueManagement');
        grid.getView().refresh();
        var modelTotalDescDetail = Ext.create('Atlas.member.model.TotalQueDescriptionModel');
        modelTotalDescDetail.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if(success) {
                    queDescrptGlobal = Ext.decode(operation.getResponse().responseText);
                }
            }

        });


    },
    btnAddClick:function()
    {
        var view=this.getView(),
        viewModel=this.getViewModel(),
        grid = view.down('#gpQueueManagement'),
        store= viewModel.getStore('QueueDescriptionListStore');

        viewModel.set('isNeedUpdate', true);
        if(!grid.plugins[0].editing) {
            store.insert(0, {
                Description:'',
                FaxId:'',
                PlanGroupName:'',
                QueID:'',
                SystemID:'',
                Type:'',
                id:'',
                isV5:'',
                lastModified:'',
                planGroupId:'',
                queName:'',
                recordVersion:'',
                spareField01:'',
                spareField02:'',
                spareField03:'',
                spareIndexedField:'',
                action:'Add'
            });
            grid.plugins[0].startEdit(0, 0);
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },
    beforeGridEdit:function (editor, e, record, rowIndex) {
        var view=this.getView(),
            viewModel=this.getViewModel(),
            grid = view.down('#gpQueueManagement'),
            store= viewModel.getStore('QueueDescriptionListStore');
        if (!this.addedRow) {
            this.addedRow =true;
            if(viewModel.data.QueueDescriptionListStore.data.items[0].data.action!='Add') {
                viewModel.set('isNeedUpdate', false);
            }
        }else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }

    },
    onUndoChangeClick: function (button) {
        button.getViewModel().data.record.reject();
        var me = this,
            isEnable = false,
            view=this.getView(),
            vm = me.getViewModel(),
            grid = view.down('#gpQueueManagement'),
            cklStore = vm.get('QueueDescriptionListStore'),
            StoreAvailablePlan=vm.getStore('StoreAvailablePlanGroup'),
            StoreAssigned=vm.getStore('storeAssignedPlanGroup');

        for(var i = 0; i < cklStore.data.items.length ; i ++){
            if(cklStore.data.items[i].dirty == true){
                isEnable = true;
            }
        }

        grid.findPlugin('rowediting').cancelEdit();
        grid.store.reload();
        grid.getStore().loadPage(1);
        StoreAvailablePlan.removeAll();StoreAssigned.removeAll();

        this.addedRow = false;
    },
    completeEdit:function(editor, context)
    {
        var grid = this.getView().down('#gpQueueManagement');
        var gridColumns = grid.headerCt.getGridColumns();
        this.addedRow = false;
        if ((Object.keys(context.record.getChanges()).length == 0)){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
        }
        this.LoadAvailnUnavailGrids(context.record.get('QueID'));

    },
    btnRemoveClick:function()
    {
        var view=this.getView();
        var grid =  view.down('#gpQueueManagement');
        var localwoutList=[];
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('QueueDescriptionListStore'),
                StoreAvailablePlan=viewModel.getStore('StoreAvailablePlanGroup'),
              StoreAssigned=viewModel.getStore('storeAssignedPlanGroup');

        var storedata= store.data.items;
        for (var i = 0; i < storedata.length; i++) {
            storedata[i].data.planGroupId = 0;
            localwoutList.push(storedata[i]);
        }
        store.data.items=localwoutList;
            store.remove( store.remove(grid.getSelectionModel().getSelection()[0]));
        StoreAvailablePlan.removeAll();StoreAssigned.removeAll();
        this.addedRow = false;
    },

    cancelEditButton: function (editor, context) {
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },

    grdQuedescRowClick:function(grid, selctedRow, e){
         selectedQueID=selctedRow.data.QueID;
        this.LoadAvailnUnavailGrids(selectedQueID);
    },

    grdAssignedRowClick:function(grid, selctedRow, e){
       // var selectedQueID=selctedRow.data.QueID;
        var view = this.getView();
        view.down('#btnup').setDisabled(false);
        view.down('#btndown').setDisabled(true);
    },
    grdAvailbleRowClick:function(grid, selctedRow, e){
       // var selectedQueID=selctedRow.data.QueID;
        var view = this.getView();
        view.down('#btnup').setDisabled(true);
        view.down('#btndown').setDisabled(false);
    },
    onAssign :function () {
        var view = this.getView();
        view.down('#btnup').setDisabled(true);
        view.down('#btndown').setDisabled(true);

        var gridQueueManagement =  view.down('#gpQueueManagement');
        if(gridQueueManagement.selection) {
            var discrip = gridQueueManagement.selection.data.Description;
            var Faxid = gridQueueManagement.selection.data.FaxId;

            var view = this.getView();
            var viewModel = this.getViewModel();
            var gridAvail = view.down('#grdAvailablePlanGroup');
            var grid = view.down('#grdAssinedGroups');
            var store = viewModel.getStore('storeAssignedPlanGroup');

            var PlanGroupId = gridAvail.selection.data.planGroupId;
            var PlanGroupName = gridAvail.selection.data.planGroupName;

            var AVstore = gridAvail.getStore('StoreAvailablePlanGroup');
            AVstore.remove(gridAvail.getSelectionModel().getSelection()[0]);

            if (!grid.plugins[0].editing) {
                store.insert(0, {
                    Description: discrip,
                    FaxId: Faxid,
                    PlanGroupName: PlanGroupName,
                    QueID: selectedQueID,
                    SystemID: '',
                    Type: '',
                    id: '',
                    isV5: '',
                    lastModified: '',
                    planGroupId: PlanGroupId,
                    queName: '',
                    recordVersion: '',
                    spareField01: '',
                    spareField02: '',
                    spareField03: '',
                    spareIndexedField: '',
                    action: 'Add'
                });

                grid.plugins[0].startEdit(0, 0)
                grid.getView().refresh();
                var localwoutList = [];
                var storedata = store.data.items;
                for (var i = 0; i < storedata.length; i++) {
                    if (i == 0) {
                        storedata[0].crudStateWas = 'U';
                        storedata[0].crudState = 'U';
                        storedata[0].dirty = true;
                        storedata[0].editing = false;
                    }
                    localwoutList.push(storedata[i]);

                }
                store.data.items = localwoutList;
                saveAction = [{
                    "Create": {"key": 'action', "value": 'Add'},
                    "Update": {"key": 'action', "value": 'Update'},
                    "Delete": {"key": 'action', "value": 'Delete'}
                }];

                var listDetail;
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/quedescription/update', 'ttqueDescription', [true], null,
                    saveAction, null);
                Ext.Msg.alert("Success", 'Record saved successfully.');

                var availstore = viewModel.getStore('storeAssignedPlanGroup');
                this.LoadQueueManagLists();
            }
        }
        else{
            Ext.Msg.alert("Alert", 'Select a record first.');
        }

    },

    LoadAvailnUnavailGrids :function (selectedQueID) {
        var view=this.getView(),
            viewModel=this.getViewModel(),
            grid = view.down('#gpQueueManagement'),
            gridAvail = view.down('#grdAvailablePlanGroup');

        var TotalQueDescriptions=queDescrptGlobal;
        //selectedQueID=selctedRow.data.QueID;
        var viewModel = this.getViewModel();

        var strQueId = '';
        var localDescriptionList = [];

        var modelManagementDescDetail = viewModel.getStore('storeAssignedPlanGroup');
        modelManagementDescDetail.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                TotalQueDescriptions.data.forEach(function (item, index,array) {
                    if (item.QueID == selectedQueID && item.planGroupId>0 ) {
                        localDescriptionList.push(item);
                    }
                });
                var storeStatus = viewModel.getStore('storeAssignedPlanGroup');
                storeStatus.loadRawData(localDescriptionList);

                // call for available groups

                var localAvailablePlanGroupList = [];
                var modelAvailablePlanGroup = Ext.create('Atlas.plan.model.PlanGroup');
                // var modelAvailablePlanGroup = viewModel.getStore('StoreAvailablePlanGroup');
                modelAvailablePlanGroup.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {

                        var PlanGroupResponse=Ext.decode(operation.getResponse().responseText);
                        localDescriptionList.forEach(function (item, index) {
                            strQueId = strQueId + ',' + item.planGroupId+'#';
                        });
                        for (var i = 0; i < PlanGroupResponse.data.length; i++) {
                            if(strQueId.indexOf(','+PlanGroupResponse.data[i].planGroupId+'#')<0) {
                                localAvailablePlanGroupList.push(PlanGroupResponse.data[i]);
                            }
                        }
                        var storeAvailableP = viewModel.getStore('StoreAvailablePlanGroup');
                        storeAvailableP.loadData(localAvailablePlanGroupList);
                        gridAvail.setStore(storeAvailableP);

                    }

                });
            }

        });
    },
    onUnAssign :function () {
        var view=this.getView(),
            viewModel=this.getViewModel();

        view.down('#btnup').setDisabled(true);
        view.down('#btndown').setDisabled(true);

        var grid =  view.down('#grdAssinedGroups'),
          gridAvail =  view.down('#grdAvailablePlanGroup');

            var store = viewModel.getStore('storeAssignedPlanGroup');
            store.remove( store.remove(grid.getSelectionModel().getSelection()[0]));

        var AVstore = gridAvail.getStore('StoreAvailablePlanGroup');
        AVstore.insert(0,grid.getSelectionModel().getSelection()[0]);

        saveAction = [{
            "Create": {"key": 'action', "value": 'Add'},
            "Update": {"key": 'action', "value": 'Update'},
            "Delete": {"key": 'action', "value": 'Delete'}
        }];

        var listDetail;
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/quedescription/update', 'ttqueDescription', [true], null,
            saveAction, null);
        if(submitJobReturn.code==0) {
            Ext.Msg.alert("Success", 'Record saved successfully.');
        }
        else {
            Ext.Msg.alert("PBM Alert",submitJobReturn.message);
        }
        this.LoadQueueManagLists();


    },
    SaveAssinedQueueName :function (textBox) {

        var view = this.getView();
         var QueueName=textBox.lastValue;
        var SelplanGroupId=view.down('#grdAssinedGroups').actionables[0].activeRecord.data.planGroupId;

        var viewModel=this.getViewModel();
        var grid = view.down('#grdAssinedGroups');
        var store = grid.getStore();
        var localwoutList=[];
        var storedata= store.data.items;
        for (var i = 0; i < storedata.length; i++) {
            if(storedata[i].data.planGroupId==grid.selection.data.planGroupId) {
                storedata[i].data.queName = QueueName;storedata[i].crudStateWas='U';storedata[i].crudState='U';storedata[i].dirty=true;storedata[i].editing=false;
            }
                localwoutList.push(storedata[i]);


        }
        store.data.items=localwoutList;
        var dirty=false;
        if (grid.plugins[0].editing) {
            var listDetail;
            saveAction = [{
                "Create": {"key": 'action', "value": 'Add'},
                "Update": {"key": 'action', "value": 'Update'},
                "Delete": {"key": 'action', "value": 'Delete'}
            }];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/quedescription/update', 'ttqueDescription', [true], null,
                saveAction, null);
            Ext.Msg.alert("Success", 'Record updated successfully.');

            var localDescriptionList2=[];
            var modelManagementDescDetail = viewModel.getStore('storeAssignedPlanGroup');
            modelManagementDescDetail.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    queDescrptGlobal.data.forEach(function (item, index,array) {

                        if (item.QueID == selectedQueID) {
                            localDescriptionList2.push(item);
                            //strQueId = strQueId + ',' + item.QueID+'#';
                        }
                    });

                    var storeStatus = viewModel.getStore('storeAssignedPlanGroup');
                    storeStatus.loadData(localDescriptionList2);
                }
            });

        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
        }
    },
    btnSaveClick:function() {
        var viewModel=this.getViewModel();
        var view = this.getView();
        var grid = view.down('#gpQueueManagement');
        var store = grid.getStore();
        var localwoutList=[];
        var dirty=false;
        if (!grid.plugins[0].editing) {

            saveAction = [{
                "Create": {"key": 'action', "value": 'Add'},
                "Update": {"key": 'action', "value": 'Update'},
                "Delete": {"key": 'action', "value": 'Delete'}
            }];
          var storedata= store.data.items;
            for (var i = 0; i < storedata.length; i++) {
                storedata[i].data.planGroupId = 0;
                localwoutList.push(storedata[i]);

                }
            store.data.items=localwoutList;
            var listDetail;
            if(this.isDirtyStore(store)) {
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/quedescription/update', 'ttqueDescription', [true], null,
                    saveAction, null);
                if (submitJobReturn.code == 0) {
                    Ext.Msg.alert("Success", 'Record saved successfully.');
                }
                else {
                    Ext.Msg.alert("PBM Alert", submitJobReturn.message);
                }
                var storeQueueDesc = viewModel.getStore('QueueDescriptionListStore');
                storeQueueDesc.load();
            }
            StoreAvailablePlan=viewModel.getStore('StoreAvailablePlanGroup'),
                StoreAssigned=viewModel.getStore('storeAssignedPlanGroup');
            StoreAvailablePlan.removeAll();StoreAssigned.removeAll();

        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
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
