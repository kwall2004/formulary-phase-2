/**
 * Created by S4505 on 11/23/2016.
 */

Ext.define('Atlas.plan.view.PricingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefitspricing',
    // listen: {
    //     controller: {
    //         '*': {
    //             reloadPricingSetUp:'onReloadPricingSetUp',
    //             reloadPricingMaster:'onReloadPricingMaster'
    //
    //         },
    //         'plan-benefitscontroller': {
    //             benefitChange: 'onBenefitChange'
    //         }
    //     }
    // },

    init: function () {


        var me = this;
        var planGroup = me.retrievePlanGroup();
        if(!planGroup){
            return;
        }

        var planBenefitId = planGroup.get('planBenefitId'),
            planGroupId = planGroup.get('planGroupId'),
            carrierLOBId =0 ,
            parentSystemID = 0;

        var benefitData = me.getView().findParentByType('tabpanel').BenefitData;
        //debugger;
        if(benefitData!=null)
            parentSystemID = planGroup.get('systemId');

        var storeMaintenance = this.getViewModel().getStore('maintenance');
        storeMaintenance.load();

        var storeDrugType = this.getViewModel().getStore('drugtype');
        storeMaintenance.load();

        var StoreServiceType =  this.getViewModel().getStore('PlanServiceTypeStore');

        StoreServiceType.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);


        StoreServiceType.load({
            callback: function (recordInfo, operation, success) {

                if(recordInfo !=null) {

                    var tabArr=[];
                    var fulFillmentType = '';

                    var storeCoverage = me.getViewModel().get('coveragephases');
                    storeCoverage.getProxy().setExtraParam('pPlanGroupId', planGroupId );
                    storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0 );
                    storeCoverage.load();

                    var groupInfo = Ext.create('Atlas.plan.model.PlanGroupInfo');
                    groupInfo.getProxy().setExtraParam('pplanGroupId', planGroupId);
                    groupInfo.load({
                        callback: function (planRecordInfo, operation, success) {
                            carrierLOBId = planRecordInfo.data.carrierLOBId

                            for (var i = 0; i < recordInfo.length; i++) {

                                if (i == 0)
                                    fulFillmentType = recordInfo[i].data.fulFillmentType;

                                var newTab = Ext.create('Atlas.plan.view.benefits.PricingGrid', {
                                    title: recordInfo[i].data.fulFillmentTypeDesc,
                                    listeners: {
                                        activate: 'onDetailTabActivated'
                                    },
                                    fulFillmentType: recordInfo[i].data.fulFillmentType,
                                    CarrierLOBId: carrierLOBId,
                                    ParentSystemID: parentSystemID
                                });
                                tabArr.push(newTab);
                            }
                            me.getView().add(tabArr);
                            //debugger;
                            me.getView().setActiveTab(me.getView().items.items[0]);
                            me.getViewModel().set('currentTab',me.getView().items.items[0]);

                            //me.lookupReference(me.getView().items.items[0].referenceKey).setActiveTab(0);
                            me.loadPricingMasterAndDetail(planBenefitId, fulFillmentType);
                        }});

                }

            }});
    },

    onBenefitChange: function (record) {

        var tabPanel = Ext.getCmp(this.getView().id);

        for(var i=0; i<tabPanel.items.length; i++)
        {
            tabPanel.remove(tabPanel.items.getAt(i));
            i--;
        }

        this.init();
    },
    onDetailTabActivated:function(tab){
        //debugger;
        var   planGroup = this.retrievePlanGroup(),
            planBenefitId = planGroup.get('planBenefitId');
        //var planBenefitId = 11451;

        var storePlanPricingMaster = this.getViewModel().getStore('planpricingmaster');
        this.getViewModel().set('currentTab', tab);

        if(storePlanPricingMaster && storePlanPricingMaster.data.length >0 ) {
            var masterRecord = storePlanPricingMaster.findRecord('fulfillmentType',tab.fulFillmentType,0,false,false,true);
            if(masterRecord!=null)
                this.loadGridData(masterRecord.data.priceId);
            else
                this.loadGridData(0);

        }
        else {
            this.loadPricingMasterAndDetail(planBenefitId, tab.fulFillmentType);
        }

    },

    loadGridData:function(priceID)
    {

        var me = this;

        var storePlanPricingDetail = me.getViewModel().getStore('planpricingdetail');
        storePlanPricingDetail.getProxy().setExtraParam('pPriceID', priceID);
        storePlanPricingDetail.getProxy().setExtraParam('pRowid', '0');
        storePlanPricingDetail.getProxy().setExtraParam('pRowNum', 0);
        storePlanPricingDetail.getProxy().setExtraParam('pBatchSize', 0);
        storePlanPricingDetail.getProxy().setExtraParam('pSort', '');
        storePlanPricingDetail.load({
            callback: function (detailRecordInfo, operation, success) {
                //debugger;

                var tab = me.getViewModel().get('currentTab');
                if(tab) {
                    Ext.getCmp(tab.id).lookupReference('planBenefitPricingGrid').bindStore(me.getViewModel().getStore('planpricingdetail'));
                    Ext.getCmp(tab.id).lookupReference('planBenefitPricingGrid').getStore().loadData(detailRecordInfo);
                }

            }});

    },

    loadPricingMasterAndDetail:function(planBenefitId,fulFillmentType)
    {
        var me = this;
        var storePlanPricingMaster = this.getViewModel().getStore('planpricingmaster');
        //var priceID = 144651;
        var fulFillType = fulFillmentType;
        storePlanPricingMaster.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        storePlanPricingMaster.load({
            callback: function (masterRecordInfo, operation, success) {

                //debugger;

                var masterRecord = storePlanPricingMaster.findRecord('fulfillmentType',fulFillType,0,false,false,true);
                if(masterRecord!=null)
                    me.loadGridData(masterRecord.data.priceId);
                else
                    me.loadGridData(0);

            }
        })
    },


    onReloadPricingSetUp:function(priceID)
    {
        this.loadGridData(priceID);
    },

    onReloadPricingMaster:function(planBenefitId,fulFillmentType)
    {
        this.loadPricingMasterAndDetail(planBenefitId,fulFillmentType);
    },
    retrievePlanGroup: function() {
        //debugger;
        return this.getView().findParentByType('tabpanel').down('planBenefit').getSelection();
    }

});
