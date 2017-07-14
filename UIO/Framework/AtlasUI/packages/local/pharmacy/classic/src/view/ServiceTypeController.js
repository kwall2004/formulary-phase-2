/**
 * Created by n6684 on 11/10/2016.
 */


Ext.define('Atlas.authorization.view.ServiceTypeController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.servicetypecontroller',
        controlinit:{},
        globalNCPDPID:'',
        init:function()
        {


            var vm = this.getViewModel();

            

            // var theStore = vm.getStore('searchServiceType');
            // theStore.loadData([]);

            // below three lines is needed to Bug #1199 Fix
            var store = vm.getStore('searchServiceType');
            store.getProxy().setExtraParam('pKeyType','');
            store.getProxy().setExtraParam('pKeyValue', '');



            var servicetypestore=vm.getStore('storeDispenserType');
            servicetypestore.getProxy().setExtraParam('pListName','DispenserType');
            servicetypestore.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {


                    }
                }
            });
        },
        // boxReady:function(){
        //     debugger;
        //
        //     this.getView().down("#gpServiceType").getStore().loadData([],true);
        //
        // },

        gpPharmacyServiceType_beforeedit : function (editor, e, record, rowIndex){

        },

        gpPharmacyServiceType_afteredit :function (editor, e, record, rowIndex) {

            this.getView().down("#btnSave").setDisabled(false);
            if(e.record.crudState=="U")
            e.record.set('isNeedUpdate', true);

        },

        onEdit: function (editor, context) {
            if (context.record.dirty && context.record.crudState != 'C') {
                //this.getChecklistRecord().set('isNeedUpdate',true);
                context.record.set('isNeedUpdate', true);
            }
        },

        onUndoChangeClick: function (button) {
            button.up().getViewModel().data.record.reject();
            var me = this,
                isEnable = false,
                vm = me.getViewModel(),
                cklStore = vm.get('searchServiceType');
            for(var i = 0; i < cklStore.data.items.length ; i ++){
                if(cklStore.data.items[i].dirty == true){
                    isEnable = true;
                }
            }
            if(isEnable == true){
                me.getView().down("#btnSave").setDisabled(false);
            }
            else{
                me.getView().down("#btnSave").setDisabled(true);
            }
        },

       getservicetyperejecttype  : function (v, m, r) {
            var id = Ext.id();
            Ext.defer(function () {
                Ext.widget('button', {
                    renderTo: id,
                    text: 'Reject ',
                    width: 75,
                    iconCls: 'fa fa-undo',
                    handler: function () { Ext.Msg.alert('Info', r.get('NCPDPID')) }
                });
            }, 50);
            return Ext.String.format('<div id="{0}"></div>', id);
        },

        onSearchTypeToggle: function (seg, button) {
            var view = this.getView();
            view.down("#cbxprovidertype").setValue('');
            view.down("#cbxprovidertype").setRawValue('');
            view.down("#cbxrelationshiptype").setValue('');
            view.down("#cbxrelationshiptype").setRawValue('');
            if(button.action=="npi"){
                view.down('#cbxrelationshiptype').hide();
                view.down('#cbxprovidertype').show();
                button.action=="ncpdpId";
                this.controlinit.action = "npi";
            }else {
                view.down('#cbxrelationshiptype').show();
                view.down('#cbxprovidertype').hide();
                button.action=="npi";
                this.controlinit.action = "ncpdpId";
            }
        },

        onSearch: function () {
            var view = this.getView();
            var relationshipid = view.down('#cbxrelationshiptype');
            var providertypeid = view.down('#cbxprovidertype');
            var searchtype= view.down('#searchtype').down('[pressed=true]').action;

            var vm = this.getViewModel();
            var store = vm.getStore('searchServiceType');

            //debugger;
            if(this.controlinit.action=="npi") {
                store.getProxy().setExtraParam('pKeyType','NCPDPID');
                store.getProxy().setExtraParam('pKeyValue', providertypeid.value);
            }
            else {
                store.getProxy().setExtraParam('pKeyType','relationshipID');
                store.getProxy().setExtraParam('pKeyValue', relationshipid.value);
            }
            store.getProxy().setExtraParam('pRowId', '');
            store.getProxy().setExtraParam('pBatchSize', 10);
            store.getProxy().setExtraParam('pServiceType','');
            store.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if(record.length==0)
                    {
                        Ext.MessageBox.show({
                            title: 'Failure',
                            msg: 'This '+ (this.controlinit.action=="npi"?'Pharmacy':'Relationship')+' is not active.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }

                }
            });
        },

        btnSaveClick:function() {

            var vm=this.getViewModel();
            var ttServiceType = {};
            ttServiceType.ttServiceType=[];
            var store = vm.getStore('comboServiceTypeproxy');
            var updatedstore = vm.getStore('searchServiceType');

            updatedstore.data.items.forEach(function (updateitem,updateindex) {
                if(updateitem.crudState=="U")
                {
                    updateitem.data.TypeCode.forEach(function(pharmacyval,pharmacyindex){
                        var  storeproxy = {NCPDPID: updateitem.data.NCPDPID ,pharmacyType: pharmacyval, addDate: Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d')};
                        ttServiceType.ttServiceType.push(storeproxy);
                    })
                }
            });


            var storeSetServiceTypeModel =  Ext.create('Atlas.pharmacy.model.SetServiceTypeModel');
            storeSetServiceTypeModel.getProxy().setExtraParam('ttServiceType', ttServiceType);
            storeSetServiceTypeModel.phantom = false;
            storeSetServiceTypeModel.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: 'Record has been saved',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        this.onSearch();
                        this.getView().down("#btnSave").setDisabled(true);
                    }
                }
            });

        },

        comboBoxforTypeCode : function(value, metaData, record, rowIndex, colIndex, store) {
            if(!value)
                return '';
            var arr;
            var names;
            var vm=this.getViewModel();
            arr = value;
            var storeDispenserType=vm.getStore('storeDispenserType');
            arr.forEach(function (val, index) {
                var idx = storeDispenserType.find('value', val);
                var rec = storeDispenserType.getAt(idx);
                if(!names)
                    names = rec.get('name')
                else
                    names = names +","+ rec.get('name');
            });

            return  '<SPAN style="COLOR: green">' + names + '</SPAN>' ;
        }
    }
);