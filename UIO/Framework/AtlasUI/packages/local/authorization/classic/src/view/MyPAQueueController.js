/**
 * Created by s6685 on 11/17/2016.
 */
Ext.define('Atlas.authorization.view.MyPAQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MyPAQueueController',
    extraParams: {
        'PACriteria': ''
    },
    onClick: function(component, eOpts) {
        var authid =component.getWidgetRecord().data.authID;
        var memberid = component.getWidgetRecord().data.authID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
        me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
            atlasId: authid,
            menuId: menuId,
            activeTab: 0
        }, null); 

    },
    assignToSelect:function(combobox) {
        var view = this.getView();
        var AssignTo =combobox.getValue();
        var AuthID=view.down('#grdPriorAuthItems').actionables[0].activeRecord.data.authID;
        var modelSetPAMAster = Ext.create('Atlas.authorization.model.SetPriorAuthMasterAssignedModel');
        modelSetPAMAster.getProxy().setExtraParam('piAuthID', AuthID);
        modelSetPAMAster.getProxy().setExtraParam('pcUsername', AssignTo);
        modelSetPAMAster.phantom = false;
        modelSetPAMAster.save();

    },
    SearchOnClick:function() {
        var view = this.getView(),grid=view.down('#grdPriorAuthItems');
        var PACriteria='';
        var UrgencyType=view.down('#cbxUrgencyType').getValue();
        grid.getStore().loadPage(1);
        if(UrgencyType) {
            UrgencyType = UrgencyType.toString().replace(/[^a-zA-Z0-9/\,]/g, '');
        }else{UrgencyType='';}
        var PAstatus= view.down('#cbxPAstatus').getValue();
        if(PAstatus) {
            PAstatus = PAstatus.toString().replace(/[^a-zA-Z0-9/\,]/g, '');
        }else{PAstatus='';}
        this.loadPAListStoreData(PAstatus, UrgencyType,PACriteria);
    },
    ResetOnClick:function() {
        this.getView().down('#frmSet').reset();
    },


    init: function(){
        var cmbType=this.getView().alertType;
        var StatusCode=this.getView().StatusCode;
        var StatusDesc=this.getView().StatusDesc;
        var UrgencyType='';
        var priorA='';
        var PACriteria='';
        var view = this.getView();
        var rdList='';
        var rdStatusList = [];
        var vm = this.getViewModel();
        var allListStatusIds=[];
        var modelListDetail = Ext.create('Atlas.common.model.shared.ListDetailModel');
        modelListDetail.getProxy().setExtraParam('pListName','DeterminationStatus');
        modelListDetail.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespListDetail = Ext.decode(operation.getResponse().responseText);
                objRespListDetail.data.forEach(function(item, index){
                    if(item.ListItem == 'RD'){
                        rdList = item.charString.split(',');
                    }
                });

            }
        });

        var modelListDetailForPlan = vm.getStore('ListMaintenanceModelStore');
        modelListDetailForPlan.getProxy().setExtraParam('ipiPlangroupId',0);
        modelListDetailForPlan.getProxy().setExtraParam('iplChkAccessToUser',true);
        modelListDetailForPlan.getProxy().setExtraParam('pListName','PriorAuthStatus');
        modelListDetailForPlan.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespListDetailForPlan = Ext.decode(operation.getResponse().responseText);
                var arrRdList =['09','08','07','13','14','15'];
                rdStatusList=[];
                objRespListDetailForPlan.data.forEach(function(item, index){
                    var flag=true;
                    arrRdList.forEach(function(it,i){
                        if(item.ListItem==it ){
                            if(flag)
                                flag=false;
                        }
                    });
                    if(flag){
                        rdStatusList.push(item);
                        allListStatusIds.push(item.ListItem);
                    }

                });

                vm.getStore('ListMaintenanceModelStore').loadRawData(rdStatusList);
                view.down('#cbxPAstatus').bindStore(vm.getStore('ListMaintenanceModelStore'));

                var modelUrgencyType = Ext.create('Atlas.common.model.shared.ListDetailModel');
                modelUrgencyType.getProxy().setExtraParam('pListName','UrgencyType');
                modelUrgencyType.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        var vm = this.getViewModel();
                        var objRespListUrgencyType = Ext.decode(operation.getResponse().responseText);
                        var rdStatusList =[];
                        objRespListUrgencyType.data.forEach(function(item, index){
                            rdStatusList.push(item);
                        });

                        var storeStatus = vm.getStore('UrgencyListDetailStore');
                        storeStatus.loadData(rdStatusList);

                        if(cmbType!='' && cmbType!=undefined) {
                            if(cmbType=='UrgencyType')
                            {
                                view.down('#cbxUrgencyType').setValue(StatusCode);
                                UrgencyType=StatusCode;
                            }
                            else if(cmbType=='PriorAuthStatus'){
                                view.down('#cbxPAstatus').setValue(StatusCode);
                                priorA=StatusCode;
                            }
                            else if(cmbType=='CoC')
                            {
                                PACriteria='CoC';
                                view.down('#cbxPAstatus').setValue(allListStatusIds);
                            }
                            else if(cmbType=='IRE')
                            {
                                PACriteria="IRE";
                                view.down('#cbxPAstatus').setValue(allListStatusIds);
                            }
                        }
                        else{
                            view.down('#cbxPAstatus').setValue(allListStatusIds);
                            var priorA= view.down('#cbxPAstatus').getValue();
                            if(priorA) {
                                priorA = priorA.toString().replace(/[^a-zA-Z0-9/\,]/g, '');
                            }
                        }
                        this.loadPAListStoreData(priorA,UrgencyType,PACriteria);

                    }
                });

            }
        });


    },
    btnExportToExcel: function () {
        var view = this.getView(),grid=view.down('#grdPriorAuthItems');
        var store =grid.getStore();
        Atlas.common.utility.Utilities.exportToExcel(store);
    },
    loadPAListStoreData: function(filterWhere, urgencyType,PACriteria){
        var vm = this.getViewModel();
        var view = this.getView(),grid=view.down('#grdPriorAuthItems');
        grid.getView().refresh();
        var myQueues = ((filterWhere == null) || (filterWhere == "")) ? "" : filterWhere;
        var waitingHrs = ((view.down('#cbxHrsWaiting').getValue() == null) || (view.down('#cbxHrsWaiting').getValue() == "")) ? 0 : view.down('#cbxHrsWaiting').getValue();
        var pDeterminationType =((view.down('#cbxDeterminationType').getValue() == null) || (view.down('#cbxDeterminationType').getValue() == "")) ? '' : view.down('#cbxDeterminationType').getValue();

        var pWhere = "";
        var pSort = "";
        var pageNum = 1; //default page num
        var batchSize = 500; //grid size
        var pCoC = "";
        var pIRE = "";
        if (PACriteria!= '') {
            if (PACriteria == "CoC") {
                pCoC = "CoC";
            }
            if (PACriteria == "IRE") {
                pIRE = "IRE";
                waitingHrs = 5;
            }
        }

         var modelPriorAuthInMyQueueStore = vm.getStore('PriorAuthInMyQueueStore');
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pMyQueues',myQueues);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pWaitingHours',waitingHrs);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('ipcUrgencyTypeList',urgencyType);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pCoC',pCoC);
        modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pIRE',pIRE);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pDeterminationType',pDeterminationType);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pcWhere',pWhere);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pcSort',pSort);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pPageNum',pageNum);
         modelPriorAuthInMyQueueStore.getProxy().setExtraParam('pBatchSize',batchSize);
         modelPriorAuthInMyQueueStore.load({
         scope: this,
         failure: function (record, operation) {
         },
         success: function (record, operation) {
         },
         callback: function (record, operation,success) {
             if(success) {
                 var objRespMyPaQueue = Ext.decode(operation.getResponse().responseText);
                 var localPaQueueList = [];
                 objRespMyPaQueue.data.forEach(function (item, index) {
                     localPaQueueList.push(item);
                 });
                 var storeStatus = vm.getStore('PriorAuthInMyQueueStore');
                 storeStatus.loadData(localPaQueueList);
             }
             else {
                 Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
             }
         }
         });

    }



});



