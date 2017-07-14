/**
 * Created by n6684 on 11/15/2016.
 */
Ext.define('Atlas.authorization.view.PopupChooseNetworksController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.contractassignment_popupchoosenetworkscontroller',


        init:function()
        {

            var view = this.getView();
            var paramRecord = view.extraParams["pRecord"];
            var vm=this.getViewModel();
            //var store=vm.getStore('allPharmacyNetworks');
            var store=vm.getStore('allPharmacyNetworks');
            store.getProxy().setExtraParam('pagination' , false);
            store.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {

                        objResp.data.forEach(function(item, index){
                            var networkids = paramRecord.data.NetworkID.split(",");
                            var networkDesc = paramRecord.data.NetworkDescr.split(",");
                            for(var i = 0; i < networkids.length; i++) {
                                if(parseInt(item.NetworkID)==parseInt(networkids[i]))
                                {
                                    var storeassignedNetworkIds = vm.getStore('assignedNetworkIds');
                                    var dummydata = {NetworkID: networkids[i], NetworkName:networkDesc[i], NetworkDescription  : networkDesc[i],actionField:'assigned'};
                                    storeassignedNetworkIds.insert(0, dummydata);
                                }
                            }

                            var storeunAssignedNetworks = vm.getStore('unAssignedNetworks');
                            var storeassignedNetworkIds = vm.getStore('assignedNetworkIds');
                            var isexist= storeassignedNetworkIds.find('NetworkID', item.NetworkID);
                            if(isexist){
                                var dummydata = {NetworkID: item.NetworkID, NetworkName:item.NetworkDescription, NetworkDescription  :  item.NetworkDescription,actionField:'unassigned'};
                                storeunAssignedNetworks.insert(0, dummydata);
                            }
                        });
                    }

                }
            });
        },

        btncancel :function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        },

        btnup :function () {

            var view = this.getView();
            view.down('#btnup').setDisabled(true);
            view.down('#btndown').setDisabled(true);

            var vm=this.getViewModel();
            var store=vm.getStore('selectedunassignedNetworks');

            var storeassignedNetworkIds = vm.getStore('assignedNetworkIds');
            storeassignedNetworkIds.insert(0, store.data.items[0].data);

            var storeunassignedNetworkIds = vm.getStore('unAssignedNetworks');
            storeunassignedNetworkIds.removeAt(storeunassignedNetworkIds.find('NetworkID', store.data.items[0].data.NetworkID));

            store.removeAll();
        },

        btndown :function () {

            var view = this.getView();
            view.down('#btnup').setDisabled(true);
            view.down('#btndown').setDisabled(true);

            var vm=this.getViewModel();
            var store=vm.getStore('selectedassignedNetworks');

            var storeunassignedNetworkIds = vm.getStore('unAssignedNetworks');
            storeunassignedNetworkIds.insert(0, store.data.items[0].data);

            var storeassignedNetworkIds = vm.getStore('assignedNetworkIds');
            storeassignedNetworkIds.removeAt(storeassignedNetworkIds.find('NetworkID', store.data.items[0].data.NetworkID));

            store.removeAll();
        },

        gpunAssignedNetworks_itemclick :function (dv, record, item, index, e) {

            var view = this.getView();
            view.down('#btnup').setDisabled(false);
            view.down('#btndown').setDisabled(true);

            var vm=this.getViewModel();
            var store=vm.getStore('selectedunassignedNetworks');
            store.removeAll();
            store.insert(0, record.data);
        },
        gpassignedNetworkIds_itemclick :function (dv, record, item, index, e) {

            var view = this.getView();
            view.down('#btndown').setDisabled(false);
            view.down('#btnup').setDisabled(true);

            var vm=this.getViewModel();
            var store=vm.getStore('selectedassignedNetworks');
            store.removeAll();
            store.insert(0, record.data);
        },

        btnUpdateClick:function() {
            var me =this;
            var view = this.getView();
            var paramRecord = view.extraParams["pRecord"];
            var vm=this.getViewModel();
            var store=vm.getStore('finalSavedNetworks');
            var storedata =[];

            var ttPharmacyNetwork = {};
            ttPharmacyNetwork.ttPharmacyNetwork=[];

            var storeassignedNetworkIds = vm.getStore('unAssignedNetworks');
            storeassignedNetworkIds.data.items.forEach(function(data,inext){

                if(data.data.actionField=="assigned")
                {
                    var val = {};
                    val.ContractId =paramRecord.data.ContractId;
                    val.NetworkID=  data.data.NetworkID;
                    val.systemID=0;
                    val.actionField ="Delete";
                    val.action ="Delete";
                    ttPharmacyNetwork.ttPharmacyNetwork.push(val);
                    //store.insert(0, val);
                   // storedata.push(val);
                }
            });

            var storeassignedNetworkIds = vm.getStore('assignedNetworkIds');
            storeassignedNetworkIds.data.items.forEach(function(data,inext){

                if(data.data.actionField=="unassigned")
                {
                    var val = {};
                    val.ContractId =paramRecord.data.ContractId;
                    val.NetworkID=  data.data.NetworkID;
                    val.systemID=0;
                    val.Action ="Add";

                    ttPharmacyNetwork.ttPharmacyNetwork.push(val);
                    //store.insert(0, tempstore);
                    //storedata.push(t);
                }
            });

            var storefinalSavedNetworks =  Ext.create('Atlas.pharmacy.model.PopupChooseNetworksModel');
            storefinalSavedNetworks.getProxy().setExtraParam('ttPharmacyNetwork', ttPharmacyNetwork);
            storefinalSavedNetworks.phantom = false;
            storefinalSavedNetworks.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        //me.refreshGrid();
                        me.fireEvent('refreshgrid_contractassignment');
                        var win = Ext.WindowManager.getActive();
                        if (win) {
                            win.close();

                        }
                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: 'Record has been saved',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO

                        });
                    }
                }
            });


        }
    }
);