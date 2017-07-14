/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.authorization.view.PricingTemplateController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.pricingtemplatecontroller',
        listen: {
            controller: {
                '*': {
                    changeDispenser: 'chkDischargeNotification_Change',
                    //AfterSaveLoad : 'LoadPage'
                    AfterSaveLoad : 'AfterSaveLoad'

                }
            }
        },
        StoreValue:{},
        init: function(){
            scope : this;
            var me = this;
            var view = this.getView();
            var vm = this.getViewModel();
            me.LoadPage();
        },
        AfterSaveLoad:function () {
            var tabpanel = this.getView().down('#tabPanelPharmacyContracts');
            tabpanel.setActiveTab(tabpanel.getActiveTab());
            if (tabpanel.currentCheckBox && tabpanel.currentCheckBox.getValue())
            {
                tabpanel.currentCheckBox.setDisabled(true);
            }

        },


        LoadPage: function()
        {

            scope : this;
            var me = this;
            var view = this.getView();
            Ext.getBody().mask('Loading');
            var vm = this.getViewModel();
            var storePricingTemplateServiceTypes=vm.getStore('storePricingTemplateServiceTypes');
            storePricingTemplateServiceTypes.getProxy().setExtraParam('pagination', false);
            storePricingTemplateServiceTypes.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                    StoreValue =objResp;
                    var modelList = Ext.create('Atlas.pharmacy.model.ListItems');
                    modelList.getProxy().setExtraParam('pListName', 'LineOfBusiness');
                    modelList.load({
                        scope : this,
                        failure : function(record, operation){},
                        success : function(record, operation){},
                        callback : function(recordLOB, operationLOB, successLOB){
                            if (successLOB) {
                                var objRespLineOfBusiness = Ext.decode(operationLOB.getResponse().responseText);
                                var modelList = Ext.create('Atlas.pharmacy.model.ListItems');
                                modelList.getProxy().setExtraParam('pListName', 'DispenserType');
                                modelList.load({
                                    scope: this,
                                    failure: function (record, operation) {
                                    },
                                    success: function (record, operation) {
                                    },
                                    callback: function (recordDT, operationDT, successDT) {

                                        if (successDT) {
                                            var objRespDispenserType = Ext.decode(operationDT.getResponse().responseText);
                                            objRespLineOfBusiness.data.forEach(function (itemLOB, countLOB) {
                                                lobDetails = itemLOB;
                                                var fieldLOB = Ext.create('Ext.form.FieldSet', {
                                                    itemId: itemLOB.name.replace('-',''),
                                                    title: itemLOB.name,
                                                    width: '100%',
                                                    defaults: {
                                                        labelWidth: 150,
                                                        flex: 1
                                                    },
                                                    collapsible: true,
                                                    collapsed: false
                                                });

                                                var fieldChkGroup = Ext.create('Ext.form.CheckboxGroup', {
                                                    columns: 3
                                                });

                                                objRespDispenserType.data.forEach(function (itemDT, countDT) {
                                                    var lobId = lobDetails.value;
                                                    var lobName = lobDetails.name;
                                                    var isexist = false;
                                                    StoreValue.data.forEach(function (val,ind) {
                                                        if(val.LOB==lobDetails.value && val.fulfillmentType == itemDT.value) {
                                                            isexist = true;
                                                        }
                                                    });
                                                    var chkName = itemDT.value + lobName.replace('-', '');
                                                    var tempObj = Ext.create('Ext.form.Checkbox', {

                                                        name: chkName,
                                                        boxLabel: itemDT.name,
                                                        checked:isexist,
                                                        disabled:isexist,
                                                        listeners : {

                                                            change : function(control,checked){
                                                                // control.disable();
                                                                lobDetails = {"name": lobName, "value": lobId};
                                                                //var controller = Ext.create('Atlas.pharmacy.view.ContractsController');
                                                                var setup=false;
                                                                me.fireEvent('changeDispenser', checked, lobId, lobName, control.name, control.boxLabel,lobDetails,itemDT,true,tempObj,setup);
                                                            }
                                                        }
                                                    });
                                                    fieldChkGroup.items.add(tempObj);
                                                    if(isexist)
                                                    {
                                                        /*debugger;
                                                        var tabPanel = view.down('#tabPanelPharmacyContracts');

                                                        var addIndex = tabPanel.items.length;
                                                        view.down('#tabPanelPharmacyContracts').newTabIndex=addIndex;
                                                        // this value is used in the PricingTemplateInfoController init function.
                                                        tabPanel.insert(addIndex, {
                                                            xtype: Ext.create({
                                                                xtype: 'xtypricinginfo_pricingtemplate',
                                                                itemId: (lobName + chkName).replace(/[^a-zA-Z0-9]/g, ''),
                                                                title: lobName+ '-' + chkName,
                                                                lobDetails:lobDetails,
                                                                itemDT:itemDT,
                                                                extraParams: {
                                                                    'lobDetails':lobDetails,
                                                                    'itemDT':itemDT
                                                                }
                                                            }),
                                                            closable: true
                                                        });*/
                                                        //var controller = Ext.create('Atlas.pharmacy.view.ContractsController');
                                                        var setup=true;
                                                        me.fireEvent('changeDispenser', true, lobId, lobName, itemDT.value + lobName.replace('-', ''), itemDT.name,lobDetails,itemDT,false,tempObj,setup);
                                                    }
                                                });
                                                fieldLOB.add(fieldChkGroup);
                                                view.down('#pnlFtypes').add(fieldLOB);
                                            });
                                            //view.down('#tabPanelPharmacyContracts').newTabIndex = 0;
                                            Ext.getBody().unmask();
                                            view.down('#tabPanelPharmacyContracts').setActiveTab(0);

                                        }
                                        else{
                                            Ext.getBody().unmask();
                                        }
                                    }
                                });

                            }
                            else{
                               Ext.getBody().unmask();
                            }

                        }
                    });

                }
            });



        },



        chkDischargeNotification_Change: function(checked, lobId, lobName, chkId, chkName,lobDetails,itemDT,isfired,checkbox,setup){
            var view = this.getView();
            if(view){
                var tabPanel = view.down('#tabPanelPharmacyContracts');
                tabPanel.currentCheckBox = checkbox;
                if(checked) {
                    var addIndex = tabPanel.items.length;
                    view.down('#tabPanelPharmacyContracts').newTabIndex=addIndex;
                    // this value is used in the PricingTemplateInfoController init function.
                    var comp = tabPanel.insert(addIndex, {
                        xtype: Ext.create({
                            xtype: 'xtypricinginfo_pricingtemplate',
                            itemId: (lobName + chkName).replace(/[^a-zA-Z0-9]/g, ''),
                            title: lobName+ '-' + chkName,
                            lobDetails:lobDetails,
                            itemDT:itemDT,
                            extraParams: {
                                'lobDetails':lobDetails,
                                'itemDT':itemDT
                            }
                        }),
                        closable: true
                    });
                    comp.lobDetails = lobDetails;
                    comp.itemDT = itemDT;
                    if(!setup){
                        tabPanel.setActiveTab(addIndex);
                    }



                }
                else{
                    var tab = tabPanel.getComponent((lobName + chkName).replace(/[^a-zA-Z0-9]/g, ''));
                    tabPanel.remove(tab);
                }
            }
        },

        tabPanelPharmacyContracts_tabchange: function(tabPanel, tab, old,eOpts) {
            this.fireEvent('BindGridPanel',tab.itemDT,tab.lobDetails);
        }

    }
);