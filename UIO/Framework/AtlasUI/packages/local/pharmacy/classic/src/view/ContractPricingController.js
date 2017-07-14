/**
 * Created by rsalekin on 11/28/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractPricingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contractpricing',

    listen: {
        controller: {
            '*': {
                PopulateContractPricing: 'populateContractPricing'
            }
        }
    },

    FulfillmentTypeVal: '',
    LOBVal: '',
    LOB: '',
    FulfillmentType: '',
    PriceId: '',
    ParentSystemID: '',
    ContractID: '',
    LoadContractDetail: '',
    contactInfo: '',

    init: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view) {

            var storeMaintenance=vm.getStore('storeMaintenance');
            storeMaintenance.getProxy().setExtraParam('pListName','Maintenance');
            storeMaintenance.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                }
            });

            var storeCostBasisEditor=vm.getStore('storeCostBasisEditor');
            storeCostBasisEditor.getProxy().setExtraParam('pListName','CostBasis');
            storeCostBasisEditor.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                }
            });


            var storeDrugType=vm.getStore('storeDrugType');
            storeDrugType.getProxy().setExtraParam('pListName','DrugType');
            storeDrugType.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                }
            });

            this.populateContractPricing(view.extraParams["FulfillmentTypeVal"], view.extraParams["LOBVal"], view.extraParams["LOB"], view.extraParams["FulfillmentType"], view.extraParams["PriceId"], view.extraParams["ParentSystemID"], view.extraParams["ContractID"], view.extraParams["LoadContractDetail"], '');
        }
    },

    populateContractPricing: function(fulfillmentTypeVal, lOBVal, lOB, fulfillmentType, priceId, parentSystemID, contractID, loadContractDetail, contractInfo){
        FulfillmentTypeVal = fulfillmentTypeVal;
        LOBVal = lOBVal;
        LOB = lOB;
        FulfillmentType = fulfillmentType;
        PriceId = priceId;
        ParentSystemID = parentSystemID;
        ContractID = contractID;
        LoadContractDetail = loadContractDetail;
        contactInfo = contractInfo;

        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            view.down('#txtLOB').setValue(LOB);
            view.down('#txtFulfillmentType').setValue(FulfillmentType);
            view.down('#btnDeleteAll').setText('Delete ' + LOB + " " + FulfillmentType + ' Pricing');

            var storeDispFeeRuleID = viewModel.getStore('storeDispFeeRuleID');
            storeDispFeeRuleID.getProxy().setExtraParam('pDispFeeRuleID', '0');
            storeDispFeeRuleID.load();

            this.getPricingMasterData();
        }
    },

    getPricingMasterData: function () {
        var view = this.getView();
        if (view) {
            var modelPricingMaster = Ext.create('Atlas.pharmacy.model.PricingMasterData');
            modelPricingMaster.getProxy().setExtraParam('ParentSystemId', ParentSystemID);
            modelPricingMaster.phantom = false;
            modelPricingMaster.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        var filterRecord = {};
                        objResp.data.forEach(function (item, index) {
                            if (item.FulfillmentTypeVal == FulfillmentTypeVal && item.LOB == LOB) {
                                filterRecord = item;
                            }
                        });
                        if(filterRecord.PriceId) {
                            PriceId = filterRecord.PriceId;
                            view.down('#cbxCostBasis').setValue(filterRecord.GERCostBasis);
                            view.down('#cbxPeriod').setValue(filterRecord.GERPeriod);
                            view.down('#txtPer').setValue(filterRecord.GERDiscPercent);
                            view.down('#cbxMultiSource').setValue(filterRecord.MultiSource);
                            view.down('#txtVaccineAdminFee').setValue(filterRecord.VaccineAdminFee); //String.Format("{0:0.00}", Convert.ToDecimal(da["VaccineAdminFee"]));
                            view.down('#cbxDispFeeRuleID').setValue(filterRecord.DispFeeRuleID);
                        }
                        view.down('#btnAdd').setDisabled(PriceId == 0 || PriceId == '0');
                        view.down('#btnRemove').setDisabled(PriceId == 0 || PriceId == '0');
                        view.down('#btnSavePricingDetail').setDisabled(PriceId == 0 || PriceId == '0');
                        view.down('#btnDeleteAll').setDisabled(PriceId == 0 || PriceId == '0');
                    }
                    this.getPharmacyContractMaster();
                }
            });
        }
    },

    getPharmacyContractMaster: function () {
        var view = this.getView();
        if (view) {
            var modelPharmacyContractMaster = Ext.create('Atlas.pharmacy.model.PharmacyContractMaster');
            modelPharmacyContractMaster.getProxy().setExtraParam('pKeyValue', ContractID);
            modelPharmacyContractMaster.getProxy().setExtraParam('pKeyType', 'ContractID');
            modelPharmacyContractMaster.getProxy().setExtraParam('pFieldList', 'prefNetworkProgram');
            modelPharmacyContractMaster.phantom = false;
            modelPharmacyContractMaster.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            var networkType = objResp.data[0].prefNetworkProgram == 'yes' ? 'Closed' : 'Open';
                            view.down('#formContractPricingNetwork').setTitle('Contract Pricing - ' + networkType + ' Network');
                            this.getPricingDetailTemplate(networkType);
                        }
                    }
                }
            });
        }
    },

    getPricingDetailTemplate: function (networkType) {
        var view = this.getView();
        if (view) {
            var modelPricingDetailTemplate = Ext.create('Atlas.pharmacy.model.PricingDetailTemplate');
            modelPricingDetailTemplate.getProxy().setExtraParam('pFulfillmentType', FulfillmentTypeVal);
            modelPricingDetailTemplate.getProxy().setExtraParam('pLobId', LOBVal);
            modelPricingDetailTemplate.getProxy().setExtraParam('pNetworkType', networkType);
            modelPricingDetailTemplate.phantom = false;
            modelPricingDetailTemplate.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        view.down('#btnSelect').setText('Add from Pricing Template');
                    }
                    else {
                        view.down('#btnSelect').setText('No Pricing Template Available');
                    }
                    this.getPricingDetail();
                }
            });
        }
    },

    getPricingDetail: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            var storeContractsDetail = viewModel.getStore('storePricingDetail');
            storeContractsDetail.getProxy().setExtraParam('pRowID', '0');
            storeContractsDetail.getProxy().setExtraParam('pRowNum', 0);
            storeContractsDetail.getProxy().setExtraParam('pBatchSize', 0);
            storeContractsDetail.getProxy().setExtraParam('pPriceID', PriceId);
            storeContractsDetail.getProxy().setExtraParam('pSort', '');
            storeContractsDetail.load({
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            if (PriceId != 0 && PriceId != '0' && objResp.data.length == 0 && view.down('#btnSelect').getText() != 'No Pricing Template Available') {
                                view.down('#btnSelect').setDisabled(false);
                            }
                            else {
                                view.down('#btnSelect').setDisabled(true);
                            }
                        }
                    }
                }
            });
        }
    },

    btnSaveDetail_Click: function(){
        var view = this.getView();
        if(view) {
            var fieldList = "FulfillmentType,LOBId,GERPeriod,GERDiscPercent,GERCostBasis,MultiSource,PharmaPricing,ParentSystemID,VaccineAdminFee,DispFeeRuleID";
            var fields = FulfillmentTypeVal + "|" + LOBVal + "|" + view.down('#cbxPeriod').getValue() + "|" + view.down('#txtPer').getValue() + "|" + view.down('#cbxCostBasis').getValue() + "|"
                 + view.down('#cbxMultiSource').getValue() + "|" + "yes" + "|" + ParentSystemID + "|" + view.down('#txtVaccineAdminFee').getValue() + "|" + (view.down('#cbxDispFeeRuleID').getValue() == null? '' : view.down('#cbxDispFeeRuleID').getValue());
            var modelSetPricingMasterData = Ext.create('Atlas.pharmacy.model.SetPricingMasterData');
            modelSetPricingMasterData.getProxy().setExtraParam('pPriceID', PriceId);
            modelSetPricingMasterData.getProxy().setExtraParam('pFieldList', fieldList);
            modelSetPricingMasterData.getProxy().setExtraParam('pFields', fields);
            modelSetPricingMasterData.phantom = false;
            modelSetPricingMasterData.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var vm = this.getViewModel();
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        PriceId = objResp.metadata.pRetPriceID;
                        view.down('#btnAdd').setDisabled(false);
                        view.down('#btnRemove').setDisabled(false);
                        view.down('#btnSavePricingDetail').setDisabled(false);
                        view.down('#btnDeleteAll').setDisabled(false);
                        view.down('#btnSelect').setDisabled(view.down('#btnSelect').getText() == 'No Pricing Template Available');
                        this.fireEvent('contractInfo', contactInfo);
                        Ext.Msg.alert('PBM', 'Record saved successfully.');
                    }
                    else{
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
            });
        }
    },

    btnDeleteAll_Click: function(){
        var view = this.getView();
        if(view) {
            Ext.Msg.confirm('Confirm', 'All <b>' + LOB + '-' + FulfillmentType + '</b> pricing information will be deleted. Are you sure you would like to continue?', function (btn) {
                if (btn == 'yes') {
                    var modelDelPricingMasterData = Ext.create('Atlas.pharmacy.model.DelPricingMasterData');
                    modelDelPricingMasterData.getProxy().setExtraParam('pPriceID', PriceId);
                    modelDelPricingMasterData.phantom = false;
                    modelDelPricingMasterData.save({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            if (success) {
                                var objResp = Ext.decode(operation.getResponse().responseText);
                                if (objResp.message[0].code == 0) {

                                    this.fireEvent('contractInfo', contactInfo);
                                }
                                else {
                                    Ext.Msg.alert('PBM', objResp.message[0].message);
                                }
                            }
                        }
                    });
                }
            }, this);
        }
    },

    btnSelect_Click: function(){
        var view = this.getView();
        if (view) {
            var modelPharmacyContractMaster = Ext.create('Atlas.pharmacy.model.PharmacyContractMaster');
            modelPharmacyContractMaster.getProxy().setExtraParam('pKeyValue', ContractID);
            modelPharmacyContractMaster.getProxy().setExtraParam('pKeyType', 'ContractID');
            modelPharmacyContractMaster.getProxy().setExtraParam('pFieldList', 'prefNetworkProgram');
            modelPharmacyContractMaster.phantom = false;
            modelPharmacyContractMaster.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            var networkType = objResp.data[0].prefNetworkProgram == 'yes' ? 'Closed' : 'Open';

                            var modelPricingDetailTemplate = Ext.create('Atlas.pharmacy.model.PricingDetailTemplate');
                            modelPricingDetailTemplate.getProxy().setExtraParam('pFulfillmentType', FulfillmentTypeVal);
                            modelPricingDetailTemplate.getProxy().setExtraParam('pLobId', LOBVal);
                            modelPricingDetailTemplate.getProxy().setExtraParam('pLobId', LOBVal);
                            modelPricingDetailTemplate.getProxy().setExtraParam('pNetworkType', networkType);
                            modelPricingDetailTemplate.phantom = false;
                            modelPricingDetailTemplate.load({
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {
                                    var objResp = Ext.decode(operation.getResponse().responseText);
                                    if (objResp.message[0].code == 0) {
                                        var fieldList = '';
                                        var fields = '';
                                        if (objResp.data.length > 0) {
                                            objResp.data.forEach(function (item, index) {
                                                fieldList = "CostBasis,DiscAmount,Maintenance,DrugType,DiscPercent,DispFee,OTCInd";
                                                fields = item.costBasis + '|' + item.DiscAmount + '|' + item.Maintenance + '|' + item.DrugType
                                                    + '|' + item.DiscPercent + '|' + item.DispFee + '|' + item.OTCInd;

                                                var modelSetPricingDetail = Ext.create('Atlas.pharmacy.model.SetPricingDetail');
                                                modelSetPricingDetail.getProxy().setExtraParam('pSystemID', '0');
                                                modelSetPricingDetail.getProxy().setExtraParam('pPriceID', PriceId);
                                                modelSetPricingDetail.getProxy().setExtraParam('pFieldList', fieldList);
                                                modelSetPricingDetail.getProxy().setExtraParam('pFields', fields);
                                                modelSetPricingDetail.phantom = false;
                                                modelSetPricingDetail.save();
                                            });
                                            this.getPricingDetail();
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
    },

    btnAddClick:function()
    {
        var view=this.getView();
        var viewModel=this.getViewModel();
        var grid =  view.down('#gpPricingDetail');
        var store=viewModel.getStore('storePricingDetail');
        if(!grid.plugins[0].editing) {
            store.insert(0, {
                Maintenance: '',
                DiscAmount: '0',
                systemID: '',
                DiscPercent: '0',
                DispFee: '0',
                DrugType: '',
                costBasis: '',
                OTCInd: ''
            });

            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },

    btnRemoveClick:function()
    {
        var view=this.getView();
        var grid =  view.down('#gpPricingDetail');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('storePricingDetail');
            store.remove( store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },

    btnSavePricingDetail_Click: function() {
        var viewModel=this.getViewModel();
        var view = this.getView();
        var grid = view.down('#gpPricingDetail');
        var store = grid.getStore();

        if (!grid.plugins[0].editing) {
            for (var i in store.removed) {
                var rec = store.removed[i];
                var recordData = rec.data;
                var modelSetPricingDetail = Ext.create('Atlas.pharmacy.model.DelPricingDetail');
                modelSetPricingDetail.getProxy().setExtraParam('pKeyType', 'SystemID');
                modelSetPricingDetail.getProxy().setExtraParam('pKeyValue', recordData.systemID);
                modelSetPricingDetail.phantom = false;
                modelSetPricingDetail.save();
            }

            for (var i in store.data.items) {
                var item = store.data.items[i];
                if (!!item.dirty) {
                    var recordData = item.data;
                    if (item.crudState == 'C') {
                        var fieldList = 'CostBasis,DiscAmount,Maintenance,DrugType,DiscPercent,DispFee,OTCInd';
                        var fields = recordData.CostBasis + '|' + recordData.DiscAmount + '|' + recordData.Maintenance + '|' + recordData.DrugType + '|' + recordData.DiscPercent + '|' +
                            recordData.DispFee + '|' + (recordData.OTCInd == null ? '' : recordData.OTCInd);
                        var modelSetPricingDetail = Ext.create('Atlas.pharmacy.model.SetPricingDetail');
                        modelSetPricingDetail.getProxy().setExtraParam('pSystemID', '0');
                        modelSetPricingDetail.getProxy().setExtraParam('pPriceID', PriceId);
                        modelSetPricingDetail.getProxy().setExtraParam('pFieldList', fieldList);
                        modelSetPricingDetail.getProxy().setExtraParam('pFields', fields);
                        modelSetPricingDetail.phantom = false;
                        modelSetPricingDetail.save();
                    }
                    else if (item.crudState == 'U') {
                        var fieldList = 'CostBasis,DiscAmount,Maintenance,DrugType,DiscPercent,DispFee,OTCInd';
                        var fields = recordData.CostBasis + '|' + recordData.DiscAmount + '|' + recordData.Maintenance + '|' + recordData.DrugType + '|' + recordData.DiscPercent + '|' +
                            recordData.DispFee + '|' + (recordData.OTCInd == null ? '' : recordData.OTCInd);
                        var modelSetPricingDetail = Ext.create('Atlas.pharmacy.model.SetPricingDetail');
                        modelSetPricingDetail.getProxy().setExtraParam('pSystemID', recordData.systemID);
                        modelSetPricingDetail.getProxy().setExtraParam('pPriceID', '0');
                        modelSetPricingDetail.getProxy().setExtraParam('pFieldList', fieldList);
                        modelSetPricingDetail.getProxy().setExtraParam('pFields', fields);
                        modelSetPricingDetail.phantom = false;
                        modelSetPricingDetail.save();
                    }
                }
            }
            //this.getPricingDetail();
            this.fireEvent('contractInfo', contactInfo);
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.')
        }
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
        var storeMaintenance=vm.getStore('storeCostBasisEditor');
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
    }
});