/**
 * Created by S4505 on 11/22/2016.
 */

Ext.define('Atlas.plan.view.CopayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefitscopay',
    // listen: {
    //     controller: {
    //         '*': {
    //             reloadCopaySetUp:'onReloadCopaySetUp'
    //
    //         }
    //         // ,
    //         // 'plan-benefitscontroller': {
    //         //     benefitChange: 'onBenefitChange'
    //         // }
    //     }
    // },

    init: function () {

        // debugger;

        var me = this,
            modelPlanGroup = me.retrievePlanGroup();
        if(!modelPlanGroup)
            return;
        var planGroupId = modelPlanGroup.get('planGroupId'),
            planBenefitId = modelPlanGroup.get('planBenefitId');
            //planGroupId = 8341,
            //planBenefitId = 11451;

        // var data = me.getView().findParentByType('tabpanel').BenefitData;

        var StoreServiceType = this.getViewModel().getStore('PlanServiceTypeStore');

        StoreServiceType.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        var isNonPrefered = true;
        var isPrefered = true;

        var networkId = 0;

        var storeMaintenance = this.getViewModel().getStore('maintenance');
        storeMaintenance.load();

        var storeFormularytiers = this.getViewModel().getStore('formularytiers');
        storeFormularytiers.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        storeFormularytiers.load();


        var storeCoverage = me.getViewModel().get('coveragephases');
        storeCoverage.getProxy().setExtraParam('pPlanGroupId', planGroupId );
        storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0 );
        storeCoverage.load();

        var groupInfo = Ext.create('Atlas.plan.model.PlanGroupInfo');
        groupInfo.getProxy().setExtraParam('pplanGroupId', planGroupId);
        groupInfo.load({

            callback: function (grouprecordInfo, operation, success) {


                if(grouprecordInfo.data.pharmNetworkId == null || grouprecordInfo.data.pharmNetworkId == 0)
                    isPrefered = false;

                if(grouprecordInfo.data.nonPrefPharmNetworkId == null || grouprecordInfo.data.nonPrefPharmNetworkId == 0)
                    isNonPrefered = false;


                StoreServiceType.load({
                    callback: function (recordInfo, operation, success) {


                        if(recordInfo && recordInfo.length >0) {


                            var parentTab = [];

                            if(isPrefered) {

                                networkId = grouprecordInfo.data.pharmNetworkId;

                                var newPrefParentTab = Ext.create('Ext.tab.Panel', {
                                    title: 'Preferred Network',
                                    reference: 'preferredNetwork',
                                    listeners: {
                                        activate: 'onNetworkTabActivated'
                                    },
                                    networkId : grouprecordInfo.data.pharmNetworkId
                                });

                                parentTab.push(newPrefParentTab);
                            }

                            if(isNonPrefered) {

                                var newNonPrefParentTab = Ext.create('Ext.tab.Panel', {
                                    title: 'Non-Preferred Network',
                                    reference: 'non-preferredNetwork',
                                    listeners: {
                                        activate: 'onNetworkTabActivated'
                                    },
                                    networkId : grouprecordInfo.data.nonPrefPharmNetworkId
                                });

                                parentTab.push(newNonPrefParentTab);

                            }

                            me.getView().add(parentTab);






                            //me.getView().setActiveTab(me.lookupReference('preferredNetwork'));
                            me.getView().setActiveTab(me.getView().items.items[0])

                            var prefTabArr=[];
                            var nonPreTabArr =[];
                            var fulFillmentType;

                            for(var i = 0 ; i < recordInfo.length; i++)
                            {

                                if( i ==0 )
                                    fulFillmentType = recordInfo[i].data.fulFillmentType;
                                if(isPrefered) {

                                    var newPrefTab = Ext.create('Atlas.plan.view.benefits.CopayGrid', {
                                        title: recordInfo[i].data.fulFillmentTypeDesc,
                                        listeners: {
                                            activate: 'onDetailTabActivated'
                                        },
                                        fulFillmentType : recordInfo[i].data.fulFillmentType
                                    });

                                    prefTabArr.push(newPrefTab)

                                }

                                if(isNonPrefered) {

                                    var newNonPrefTab = Ext.create('Atlas.plan.view.benefits.CopayGrid', {
                                        title: recordInfo[i].data.fulFillmentTypeDesc,
                                        listeners: {
                                            activate: 'onDetailTabActivated'
                                        },
                                        fulFillmentType : recordInfo[i].data.fulFillmentType
                                    });

                                    nonPreTabArr.push(newNonPrefTab)

                                }

                            }

                            if(isPrefered)
                                me.lookupReference('preferredNetwork').add(prefTabArr);
                            if(isNonPrefered)
                                me.lookupReference('non-preferredNetwork').add(nonPreTabArr);

                            //var parentTab = me.lookupReference(me.getView().items.items[0].referenceKey);
                            me.lookupReference(me.getView().items.items[0].referenceKey).setActiveTab(0);

                            me.loadGridData(planBenefitId,networkId, fulFillmentType);
                        }

                    }});

            }
        });


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

    onNetworkTabActivated:function(tab){


    },
    onDetailTabActivated:function(tab){

        var me = this,
            planGroup = me.retrievePlanGroup(),
            planBenefitId = planGroup.get('planBenefitId');

        this.getViewModel().set('currentTab', tab);

        this.loadGridData(planBenefitId,tab.up().networkId ,tab.fulFillmentType);
    },

    loadGridData:function(planBenefitId,networkId,fullfilmentType)
    {
        var me = this;
        var storePlanCopay = this.getViewModel().getStore('plancopay');
        storePlanCopay.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);
        storePlanCopay.getProxy().setExtraParam('pPharmNetworkId', networkId);
        storePlanCopay.getProxy().setExtraParam('pFulfillmentType', fullfilmentType);
        storePlanCopay.load({
            callback: function (recordInfo, operation, success) {

                var tab = me.getViewModel().get('currentTab');
                Ext.getCmp(tab.id).lookupReference('planBenefitCopyGrid').bindStore(me.getViewModel().getStore('plancopay'));
                Ext.getCmp(tab.id).lookupReference('planBenefitCopyGrid').getStore().loadData(recordInfo);



            }});
    },

    onReloadCopaySetUp:function(planBenefitId,networkId,fullfilmentType)
    {
        this.loadGridData(planBenefitId,networkId,fullfilmentType);
    },

    retrievePlanGroup: function() {
        //debugger;
        return this.getView().findParentByType('tabpanel').down('planBenefit').getSelection();
    }
});