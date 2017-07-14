Ext.define('Atlas.plan.view.GroupsController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.plan-groups',

    listen:{
        controller:{
            '*' : {
                groupchange : 'onGroupChange'
            }
        }
    },


    init: function () {


        var me = this;

        me.callParent();

        me.getViewModel().getStore('carriers').load();

    },



    setupAtlasRecord: function(){

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            openView = view.openView,
            // menuID = view.menuId,
            planGroupId = view.planGroupId,
            // planGroupName = view.planGroupName,
            // planGroupCode = view.planGroupCode,
            // keyValue = view.keyValue,
            record = view.plangroupRecord;

        // below If condtion is to integrate with other module when they supply only the PlanGroup id
        // if(record ==null) {
        //     var selectedItem = vm.getStore('plangroups').findRecord('planGroupId', planGroupId, 0, false, true, true);
        //     if (selectedItem != null) {
        //        record = selectedItem;
        //        this.getView().plangroupRecord = selectedItem;
        //         me.getView().planGroupName = selectedItem.data.planGroupName;
        //     }
        // }

        var selectedItem = vm.getStore('plangroups').findRecord('planGroupId', planGroupId, 0, false, true, true);
        if (selectedItem != null) {
            record = selectedItem;
            this.getView().plangroupRecord = selectedItem;
            me.getView().planGroupName = selectedItem.data.planGroupName;
        }

        // below If condtion is to integrate with other module when they supply  PlanGroup record and also use the selected record from previous condition
        if(record !=null) {

            //this.fireEvent('groupchange', this.getView().plangroupRecord);
            this.lookupReference('plangroup').setSelection(record);
            this.lookupReference('plangroup').setValue(me.getView().planGroupId);
            this.lookupReference('plangroup').setRawValue(me.getView().planGroupName);
        }
    },



    onNewPlanGroupClick: function (button) {
        var me = this;
        //debugger;
        var plnGrpDetail = this.getView().down('plan-group-detail');
        var comboCarrier = this.lookupReference('carriercombo');

        if(comboCarrier !=null && comboCarrier.value !=null) {

            var me=this,
                storeCoverage = this.getViewModel().get('coveragephases'),
                storePA = this.getViewModel().get('palists'),
                storePb = this.getViewModel().get('planbenefits'),
                storeDUR = this.getViewModel().get('durs'),
                storeAddressTypes = this.getViewModel().get('planaddresstypes'),
                storeAccounts = plnGrpDetail.getViewModel().get('accounts'),
                storelobs = this.getViewModel().get('lobs'),
                storeFormularies= this.getView().down('plan-group-detail').getViewModel().getStore('formularies');

            storelobs.load();
            storePA.load();
            storeDUR.load();
            storeAddressTypes.load();
            storeCoverage.load();
            storeFormularies.load();


            // storeAccounts.filterBy(function (srecord) {
            //     debugger;
            //     return srecord.get('carrierId') == comboCarrier.value ;
            // });

            storeAccounts.getProxy().setExtraParam('pWhere', 'carrierId='+ comboCarrier.value);
            storeAccounts.getProxy().setExtraParam('pBatchSize', 0);
            storeAccounts.load();

            storelobs.filterBy(function (srecord) {
                //debugger;
                return srecord.get('carrierId') == comboCarrier.value;
            });

            // debugger;
            // storelobs.filter(Ext.create('Ext.util.Filter', {
            //
            //     property: "carrierId",
            //     value: comboCarrier.value,
            //     exactMatch: true
            // }));

            me.enableDisableDataEntry(false);
            me.setNewPlanFields();

            //debugger;
            var planGroupCombo =  this.lookupReference('plangroup');
            if(planGroupCombo!=null) {
                planGroupCombo.getStore().load();
                planGroupCombo.setValue(null);
                planGroupCombo.setRawValue('');
            }
            var carrierName =  me.getView().down('plan-group-detail').lookupReference('carrierName');
            if(carrierName!=null) {
                carrierName.setRawValue(comboCarrier.rawValue);
                carrierName.setValue(comboCarrier.rawValue);
            }

            var plnGroupStatus =  me.getView().down('plan-group-detail').lookupReference('plnGroupStatus');
            if(plnGroupStatus!=null) {
                plnGroupStatus.setRawValue("Draft");
                plnGroupStatus.setValue("D")
            }
            var carrierId =  me.getView().down('plan-group-detail').lookupReference('carrierId');
            if(carrierId!=null) {
                carrierId.setValue(comboCarrier.value);
            }

            plnGrpDetail.getViewModel().set('newCarrierid',comboCarrier.value);
            plnGrpDetail.getViewModel().set('newCarrierName',comboCarrier.rawValue);
            //debugger;
            var carrierAccountNumber =  me.getViewModel().getStore('carriers').findRecord('carrierId', comboCarrier.value);

            var storePlanGroupBenefits = me.getViewModel().get('plangroupbenefits');
            storePlanGroupBenefits.loadData([]);
            plnGrpDetail.getViewModel().set('isNewPlanGroupRecord', true);
            plnGrpDetail.getViewModel().set('isEditing', true);
            plnGrpDetail.getViewModel().set('canActivate', false);
            plnGrpDetail.getViewModel().set('canDeactivate', false);
            plnGrpDetail.getViewModel().set('canEdit', false);
            me.getViewModel().set('canEdit', false);


            var store = me.getView().down('plan-group-detail').getViewModel().get('nonpharmanetworks');
            var existinnaRecord = store.find('NetworkID', 0, 0, false, false, true);
            if (existinnaRecord < 0) {

                var naRecord = new Atlas.plan.model.PharmaNetwork;
                naRecord.data.NetworkID = 0;
                naRecord.data.NetworkDescription = "N/A";
                store.insert(0,naRecord);
            }
        }
        else {
            Ext.Msg.show({
                    title: 'Message',
                    message: 'Select a carrier',
                    buttons: Ext.Msg.OK,
                    fn: function (btn) {

                    }
                }
            )
        }
    },

    onCreatePlan: function (button) {
        var carrier = button.up('window').getViewModel().get('carrier');
        button.up('window').close();
        alert(carrier['value']);

    },

    //triggered when the store loads
    onPlangroupLoad: function(store , records , successful , operation){
        // this.setupAtlasRecord();
        Ext.defer(this.setupAtlasRecord,100,this);

    },

    onPlangroupSelect: function(combo,record){

        //debugger;
        var me = this,
            vm = this.getViewModel();
            queryDbModel = Ext.create('Atlas.common.model.shared.QueryDb', {}),
            user = Ext.first('viewport').getViewModel().getData().user;
        queryDbModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        queryDbModel.getProxy().setExtraParam('pBuffer', 'planGroup');
        queryDbModel.getProxy().setExtraParam('pField', 'atlasBPRecordId');
        queryDbModel.getProxy().setExtraParam('pWhere', 'planGroupId = ' + record.get('planGroupId'));
        queryDbModel.load({
            callback: function (value) {
                if (value.data.atlasBPRecordId != "0" && value.data.atlasBPRecordId != "") {
                    vm.set('isAtlasRecord',true);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("<b>*This plan can only be edited from Atlas Benefit Plan</b>");
                }
                else {
                    vm.set('isAtlasRecord',false);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("");
                }


                var groupDetail =  me.getView().down('plan-group-detail');
                if(groupDetail)
                {
                    groupDetail.getController().onGroupChange(record);
                }

                //this.getView().down('plan-group-detail').getController().onGroupChange(record);

                var coveragePhaseTab = me.getView().down('plan-group-coveragephase');
                if(coveragePhaseTab)
                {
                    coveragePhaseTab.getController().init();
                }
                var prescriberDrugTab = me.getView().down('plan-group-prescriberdrugoverride');
                if(prescriberDrugTab)
                {
                    prescriberDrugTab.getController().selectPlan();
                }

                var ruleSetUpTab = me.getView().down('plan-group-rulesetup');

                if(ruleSetUpTab)
                {
                    ruleSetUpTab.getController().init();
                }

                var planInformationTab = me.getView().down('plan-group-planinformation');
                if(planInformationTab)
                {
                    planInformationTab.getController().selectPlan();
                }


                var addressTab = me.getView().down('plan-group-address');

                if(addressTab)
                {
                    addressTab.getController().boxReady();
                }

                var copyDetailTab = me.getView().down('plan-group-copydetail');

                if(copyDetailTab)
                {
                    copyDetailTab.getController().selectPlan();
                }

                var planLocationCoverageTab = me.getView().down('plan-group-planlocationcoverage');

                if(planLocationCoverageTab)
                {
                    planLocationCoverageTab.getController().init();
                }

                var planClaimRulesTab = me.getView().down('plan-group-planclaimrules');

                if(planClaimRulesTab)
                {
                    planClaimRulesTab.getController().init();
                }

                var allowedPrescriberTab = me.getView().down('plan-group-allowedprescriberlist');

                if(allowedPrescriberTab)
                {
                    allowedPrescriberTab.getController().init();
                }


                var planTransitionConfigTab = me.getView().down('plan-group-plantransitionconfig');

                if(planTransitionConfigTab)
                {
                    planTransitionConfigTab.getController().init();
                }
            }

        });


        // debugger;

        //this.fireEvent('groupchange',record);

        // Plan Module can't use Events with the current design as in multi tabs feature it is listening to each other tab and the most recent tab opened.

        // so rather than doing it with the even we are doing it with calling the controller method.

        // var groupDetail =  this.getView().down('plan-group-detail');
        // if(groupDetail)
        // {
        //     debugger;
        //     groupDetail.getController().onGroupChange(record);
        // }
        //
        // //this.getView().down('plan-group-detail').getController().onGroupChange(record);
        //
        // var coveragePhaseTab = this.getView().down('plan-group-coveragephase');
        // if(coveragePhaseTab)
        // {
        //     coveragePhaseTab.getController().init();
        // }
        // var prescriberDrugTab = this.getView().down('plan-group-prescriberdrugoverride');
        // if(prescriberDrugTab)
        // {
        //     debugger;
        //     prescriberDrugTab.getController().selectPlan();
        // }
        //
        // var ruleSetUpTab = this.getView().down('plan-group-rulesetup');
        //
        // if(ruleSetUpTab)
        // {
        //     ruleSetUpTab.getController().init();
        // }
        //
        // var planInformationTab = this.getView().down('plan-group-planinformation');
        // if(planInformationTab)
        // {
        //     planInformationTab.getController().selectPlan();
        // }
        //
        //
        // var addressTab = this.getView().down('plan-group-address');
        //
        // if(addressTab)
        // {
        //     addressTab.getController().boxReady();
        // }
        //
        // var copyDetailTab = this.getView().down('plan-group-copydetail');
        //
        // if(copyDetailTab)
        // {
        //     copyDetailTab.getController().selectPlan();
        // }
        //
        // var planLocationCoverageTab = this.getView().down('plan-group-planlocationcoverage');
        //
        // if(planLocationCoverageTab)
        // {
        //     planLocationCoverageTab.getController().init();
        // }
        //
        // var planClaimRulesTab = this.getView().down('plan-group-planclaimrules');
        //
        // if(planClaimRulesTab)
        // {
        //     planClaimRulesTab.getController().init();
        // }
        //
        // var allowedPrescriberTab = this.getView().down('plan-group-allowedprescriberlist');
        //
        // if(allowedPrescriberTab)
        // {
        //     allowedPrescriberTab.getController().init();
        // }
        //
        //
        // var planTransitionConfigTab = this.getView().down('plan-group-plantransitionconfig');
        //
        // if(planTransitionConfigTab)
        // {
        //     planTransitionConfigTab.getController().init();
        // }




    },


    //list to many of the sub page stores change here so they are set when their view opens
    onGroupChange: function(record){

        if(record ==null)
            return ;
        var me=this,
            viewModel = this.getViewModel(),
            storeCoverage = viewModel.getStore('coveragephases'),
            storePA = viewModel.getStore('palists'),
            storePb = viewModel.getStore('planbenefits'),
            storeDUR = viewModel.getStore('durs'),
            storeAddressTypes = viewModel.getStore('planaddresstypes'),
            storeLOB = viewModel.getStore('lobs'),
            storePlnListItems = viewModel.getStore('planbenefitlistItem'),
            storePlanAllowedPrescriber = viewModel.getStore('allowedprescriber');

        //filter plan benefits
        storePb.getProxy().setExtraParam('pWhere', 'planGroupId=' + record.get('planGroupId'));
        storePb.load();

        //filter plan benefits
        if(storePlnListItems !=null) {
            storePlnListItems.getProxy().setExtraParam('pWhere', 'planGroupId=' + record.get('planGroupId'));
            storePlnListItems.load();
        }
        //debugger;
        //filter coveragephases
        storeCoverage.getProxy().setExtraParam('pPlanGroupId',  record.get('planGroupId'));
        storeCoverage.getProxy().setExtraParam('pPlanBenefitId', 0 );
        storeCoverage.load();

        //filter PA
        storePA.getProxy().setExtraParam('pPlanGroupId',  record.get('planGroupId'));
        storePA.load();

        //filter DUR
        storeDUR.getProxy().setExtraParam('pPlanGroupId',  record.get('planGroupId'));
        storeDUR.load();

        //filter plan LOB
        storeLOB.getProxy().setExtraParam('pWhere', 'carrierId=' + record.get('carrierId'));
        storeLOB.load();


        //filter plan AddressTypes
        storeAddressTypes.getProxy().setExtraParam('ipiPlanGroupID', record.get('planGroupId'));
        storeAddressTypes.load();

        //debugger;
        //fileter Plan Allowed Prescriber
        storePlanAllowedPrescriber.getProxy().setExtraParam('pPlanGroupId', record.get('planGroupId'))
        storePlanAllowedPrescriber.load();

    },

    onCarrierSelect:function(record) {
    },

    setAdminEditAccess: function(value){

    },

    setNewPlanFields :function() {

        var containerOne = this.getView().down('plan-group-detail').lookupReference('container1');
        //debugger;
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.reset();
                }
            )
        }
        var containerTwo = this.getView().down('plan-group-detail').lookupReference('container2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.reset();
                }
            )
        }

        var allowMedAdminFee = this.getView().down('plan-group-detail').lookupReference('allowMedAdminFee');
        if(allowMedAdminFee)
        {
            allowMedAdminFee.reset();
        }

        var medAdminFeeAmt = this.getView().down('plan-group-detail').lookupReference('medAdminFeeAmt');
        if(medAdminFeeAmt)
        {
            medAdminFeeAmt.reset();
        }
    },

    enableDisableDataEntry:function (value) {

        var containerOne = this.getView().down('plan-group-detail').lookupReference('container1');
        //debugger;
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.setReadOnly(value);
                }
            )
        }
        var containerTwo = this.getView().down('plan-group-detail').lookupReference('container2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.setReadOnly(value);
                }
            )
        }

        var allowMedAdminFee = this.getView().down('plan-group-detail').lookupReference('allowMedAdminFee');
        if(allowMedAdminFee)
        {
            allowMedAdminFee.setReadOnly(value);
        }

        var medAdminFeeAmt = this.getView().down('plan-group-detail').lookupReference('medAdminFeeAmt');
        if(medAdminFeeAmt)
        {
            medAdminFeeAmt.setReadOnly(value);
        }

    }

});
