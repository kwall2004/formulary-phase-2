/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.authorization.view.PricingTemplateInfoController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.pricingtemplateinfocontroller',
        custompage_init:{},
        listen: {
            controller: {
                '*': {
                    BindGridPanel: 'BindGridPanel_Event'

                }
            }
        },
        initPTI:function()
        {


             var view = this.getView();
             var vm=this.getViewModel();
            var me = this;
             this.custompage_init.paramlobDetails = view.extraParams["lobDetails"];
             this.custompage_init.paramitemDT = view.extraParams["itemDT"];
            vm.set('initialized',false);



            var storePharContractNetworkType=vm.getStore('storePharContractNetworkType');
                storePharContractNetworkType.getProxy().setExtraParam('pListName','PharContractNetworkType');
                storePharContractNetworkType.load( {
                    callback: function (record, operation, success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        var storeMaintenance=vm.getStore('storeMaintenance');
                        storeMaintenance.getProxy().setExtraParam('pListName','Maintenance');
                        storeMaintenance.load( {
                            callback: function (record, operation, success) {

                                var objResp = Ext.decode(operation.getResponse().responseText);
                                var storeCostBasis=vm.getStore('storeCostBasis');
                                storeCostBasis.getProxy().setExtraParam('pListName','CostBasis');
                                storeCostBasis.load( {
                                    callback: function (record, operation, success) {

                                        var objResp = Ext.decode(operation.getResponse().responseText);
                                        var storeDrugType=vm.getStore('storeDrugType');
                                        storeDrugType.getProxy().setExtraParam('pListName','DrugType');
                                        storeDrugType.load( {
                                            callback: function (record, operation, success) {

                                                var x = vm.get('initialized');
                                                if (vm) {
                                                    var storepricingdetailtemplate = vm.getStore('storepricingdetailtemplate');
                                                    storepricingdetailtemplate.getProxy().setExtraParam('pFulfillmentType', view.itemDT.value);
                                                    storepricingdetailtemplate.getProxy().setExtraParam('pLobId', view.lobDetails.value);
                                                    storepricingdetailtemplate.getProxy().setExtraParam('pNetworkType', '');
                                                    storepricingdetailtemplate.load({
                                                        callback: function (record, operation, success) {
                                                            var objResp = Ext.decode(operation.getResponse().responseText);
                                                            if (objResp.data.length == 0) {
                                                                view.down("#btnViewArchive").hide();
                                                                view.down("#btnArchive").hide();
                                                            } else {
                                                                view.down("#btnViewArchive").show();
                                                                view.down("#btnArchive").show();
                                                            }

                                                            var storepricingdetailtemplatearchivedate = vm.getStore('storepricingdetailtemplatearchivedateproxy');
                                                            storepricingdetailtemplatearchivedate.getProxy().setExtraParam('pFulfillmentType', view.itemDT.value);
                                                            storepricingdetailtemplatearchivedate.getProxy().setExtraParam('pLobId', view.lobDetails.value);
                                                            storepricingdetailtemplatearchivedate.load({
                                                                scope: this,
                                                                callback: function (record, operation, success) {
                                                                    var objResp = Ext.decode(operation.getResponse().responseText);
                                                                    if (objResp.data.length == 0)
                                                                        view.down("#btnViewArchive").setDisabled(true);
                                                                    else
                                                                        view.down("#btnViewArchive").setDisabled(false);
                                                                }
                                                            });
                                                        }
                                                    });


                                                }
                                                /*var parent = view.up();
                                                if(parent.newTabIndex>-1)
                                                {
                                                    var a = parent.items;
                                                    var index = a.items.indexOf(me.getView());
                                                    if (index==parent.newTabIndex&&!vm.get('initialized')){
                                                        vm.set('initialized',true);
                                                        parent.setActiveTab(index);
                                                    }

                                                }*/

                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }
                });








        },

        BindGridPanel_Event:function (paramitemDT,paramlobDetails) {

            var view = this.getView();
            if (!(view.itemDT.value==paramitemDT.value && view.lobDetails.value==paramlobDetails.value))
                return;
            else {
                this.initPTI();

            }

        },

        btnAddClick:function()
        {
            var view=this.getView();
            var viewModel=this.getViewModel();
            var grid =  view.down('#gppricingtemplateinfo');
            var store=viewModel.getStore('storepricingdetailtemplate');
            if(!grid.plugins[0].editing) {
                store.insert(0, {
                    NetworkType: '',
                    Maintenance: '',
                    DiscAmount: '0',
                    systemID: '',
                    DiscPercent: '0',
                    DispFee: '0',
                    DrugType: '',
                    costBasis: '',
                    OTCInd: ''
                });

                grid.plugins[0].startEdit(0, 0),
                grid.getView().refresh();
            }
            else {
                Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            }
        },

        btnRemoveClick:function()
        {
            var view=this.getView();
            var grid =  view.down('#gppricingtemplateinfo');
            if (grid.getSelectionModel().getSelected().items.length == 0) {
                Ext.Msg.alert("PBM", "Please select a row");

            }
            else {
                var viewModel = this.getViewModel();
                var store = viewModel.getStore('storepricingdetailtemplate');
                store.remove( store.remove(grid.getSelectionModel().getSelection()[0]));
            }
        },

        btnSaveClick:function() {
           // debugger;
            var me = this;
            var viewModel=this.getViewModel();
            var view = this.getView();
            var grid = view.down('#gppricingtemplateinfo');
            var store = grid.getStore();


            var dirty=false;
            if (!grid.plugins[0].editing) {

                saveAction = [{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                 var params = {
                    pFulfillmentType : this.custompage_init.paramitemDT.value+"",
                    pLOB :  this.custompage_init.paramlobDetails.value
                 };


                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'pharmacy/rx/pricingdetailtemplate/update', 'ttPriceDetailTemplate', [true], params,
                    saveAction, null);
               // Ext.Msg.alert("PBM", submitJobReturn.message);
                if (submitJobReturn.message.toLowerCase().indexOf('duplicate')!=-1)
                    Ext.Msg.alert("Alert", submitJobReturn.message);

                var storeNetworkSetup=viewModel.getStore('storepricingdetailtemplate');
                storeNetworkSetup.load();
                if(storeNetworkSetup.data.items.length==0)
                {
                    view.down("#btnArchive").hide();
                    view.down("#btnViewArchive").hide();
                }else{
                    view.down("#btnArchive").show();
                    view.down("#btnViewArchive").show();
                }
                me.fireEvent('AfterSaveLoad');
            }
            else
            {
                Ext.Msg.alert('Message','Please complete edit current record before proceed.')
            }
        },


        btnArchive :function () {
            Ext.MessageBox.confirm('Archive Pricing Template ','Are you sure you would like to ARCHIVE current pricing template?(*After archive, you can build new pricing template by modifing the template on the screen))', function(btn){
                if(btn === 'yes'){
                    var setPricingDetailArchive =  Ext.create('Atlas.pharmacy.model.SetPricingDetailArchive');
                    setPricingDetailArchive.getProxy().setExtraParam('pFulfillmentType', this.custompage_init.paramitemDT.value );
                    setPricingDetailArchive.getProxy().setExtraParam('pLobId',this.custompage_init.paramlobDetails.value);
                    setPricingDetailArchive.phantom = false;
                    setPricingDetailArchive.save({
                        callback: function (record, operation, success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                this.getView().down("#btnViewArchive").show();
                            }
                        }
                    });
                }
                else{

                }
            },this)
        },

        btnViewArchive :function () {

            var win = Ext.create({
                xtype: 'pricingtemplateinfo_popuparchivedpricingtemplate',
                extraParams: {
                    'lobDetails':  this.custompage_init.paramlobDetails,
                    'itemDT':this.custompage_init.paramitemDT,
                    'storePharContractNetworkType':this.getViewModel().getStore('storePharContractNetworkType'),
                    'storeMaintenance':this.getViewModel().getStore('storeMaintenance'),
                    'storeDrugType':this.getViewModel().getStore('storeDrugType'),
                    'storeCostBasis':this.getViewModel().getStore('storeCostBasis')
                },
                listeners:{
                    refreshgrid:'refreshgrid'
                }
            });
            win.show(this);
        },

        comboBoxNetworkTypeRenderer : function(value) {


            if(!value)
                return '';
            var vm=this.getViewModel();
            var storeMaintenance=vm.getStore('storePharContractNetworkType');

            var idx = storeMaintenance.find('value', value);
            var rec = storeMaintenance.getAt(idx);
            return rec.get('name');
        },

        // the renderer. You should define it within a namespace
         comboBoxMaintenanceRenderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
             if(!value)
                 return '';



             var vm=this.getViewModel();
             var storeMaintenance=vm.getStore('storeMaintenance');
             var idx = storeMaintenance.find('value', value);
             var rec = storeMaintenance.getAt(idx);
             return rec.get('name');

        },
        


        comboBoxDrugTypeRenderer : function(value) {
            if(!value)
                return '';
            var vm=this.getViewModel();
            var storeMaintenance=vm.getStore('storeDrugType');
            var idx = storeMaintenance.find('value', value);
            var rec = storeMaintenance.getAt(idx);
            return rec.get('name');

        },

        comboBoxCostBasisRenderer : function(value) {
            if(!value)
               return '';
            var vm=this.getViewModel();
            var storeMaintenance=vm.getStore('storeCostBasis');
            var idx = storeMaintenance.find('value', value);
            var rec = storeMaintenance.getAt(idx);
            return rec.get('value');

        },

        comboBoxOTCIndRenderer : function(value) {
            if(!value)
                return '';
            var name ="";
            if(value=="A")
                name ="All";
            else  if(value=="O")
                name ="OTC";
            else  if(value=="R")
                name ="Non-OTC";
            return name;
        },
        onUndoChangeClick: function (button) {
            //debugger;
            var record = button.getViewModel().data.record;
            if(!record.phantom ) {
                record.reject();
            }
            else
            {
                var grid = this.lookupReference('gppricingtemplateinfo').getView();
                grid.store.remove(record);
                grid.up().findPlugin('rowediting').cancelEdit();

            }
        }

    }
);