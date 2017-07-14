Ext.define('Atlas.plan.view.BenefitsController', {
    // extend: 'Ext.app.ViewController',
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.plan-benefitscontroller',


    init: function () {
       // debugger;
        var me = this;

        var me = this,
            vm = this.getViewModel();
        queryDbModel = Ext.create('Atlas.common.model.shared.QueryDb', {}),
            user = Ext.first('viewport').getViewModel().getData().user;
        queryDbModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        queryDbModel.getProxy().setExtraParam('pBuffer', 'planGroup');
        queryDbModel.getProxy().setExtraParam('pField', 'atlasBPRecordId');
        queryDbModel.getProxy().setExtraParam('pWhere', 'planGroupId = ' + this.getView().PlanGroupID);
        queryDbModel.load({
            callback: function (value) {
                if (value.data.atlasBPRecordId != "0" && value.data.atlasBPRecordId != "") {
                    vm.set('isAtlasRecord', true);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("<b>*This plan can only be edited from Atlas Benefit Plan</b>");
                }
                else {
                    vm.set('isAtlasRecord', false);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("");
                }
                //me.LoadFormulary(record);
                //me.callParent();
            }
        });

        me.callParent();
        //me.getViewModel().getStore('carriers').load();

    },


    onBenefitChange: function(record){

        var me=this;
        // debugger;
    },

    cbxbenefits_Select:function(combo, record) {
        //debugger;
       // var planGroupId = record.get('planGroupId');
      //  this.checkAtlasBPRecord(planGroupId, record);

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
                    vm.set('isAtlasRecord', true);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("<b>*This plan can only be edited from Atlas Benefit Plan</b>");
                }
                else {
                    vm.set('isAtlasRecord', false);
                    me.getView().down('#lblAtlasBenefitPlan').setHtml("");
                }
                //me.LoadFormulary(record);

                me.getView().benefitStatus = record.data.benefitStatus;
                //this.fireEvent('benefitChange',record);
                me.getView().down('plan-benefits-detail').getController().onBenefitChange(record);

                var adminstrativeTab = me.getView().down('plan-benefits-adminfees');
                if(adminstrativeTab)
                {
                    //adminstrativeTab.getController().onBenefitChange(record);
                    adminstrativeTab.getController().init();
                }

                var copayTab = me.getView().down('plan-benefits-copay');
                if(copayTab)
                {
                    copayTab.getController().onBenefitChange(record);
                    //copayTab.getController().init();

                }

                var dawCopayTab = me.getView().down('plan-benefits-dawcopay');
                if(dawCopayTab)
                {
                    //dawCopayTab.getController().onBenefitChange(record);
                    dawCopayTab.getController().init();

                }

                var copayDistributionTab = me.getView().down('plan-benefits-copaydistribution');
                if(copayDistributionTab)
                {
                    copayDistributionTab.getController().init();

                }

                var pricingTab = me.getView().down('plan-benefits-pricing');
                if(pricingTab)
                {
                    pricingTab.getController().onBenefitChange(record);
                   // pricingTab.getController().init();
                }

                var copyBenefitTab = me.getView().down('plan-group-copydetail');
                if(copyBenefitTab)
                {
                    copyBenefitTab.getController().selectPlan();
                    //copyBenefitTab.getController().init();
                }

            }
        });

    },

    onAdminEditClick: function (button) {
        var me=this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);

        var view = this.getView();
        this.DisableControls(false);
        view.down('#btnSave').setDisabled(false);

        view.down('#btnCancel').setDisabled(false);

    },


    onNewPlanBenefitsClick: function (button) {


        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#cbxPlanGroupCode').setValue("");
        view.down('#txtPlanBenefitCode').setValue("");
        view.down('#txtPlanBenefitName').setValue("");
        view.down('#chkLICSSubsidy').setValue(false);

       // view.lookupReference('PlanAdminFeeGrid').setDisabled(true);
        view.down('#chkCopayRequired').setValue(false);
        view.down('#chkEmergencyFill').setValue(false);
        view.down('#chkTraditional').setValue(false);
        view.down('#txtPartBCopayPercentage').setValue("");
        // view.down('#txtEffDate').setValue(new Date());
        //view.down('#txtTermDate').setValue("");
        view.down('#txtRenewalDate').setValue("");
        view.down('#chkOutOfNetwork').setValue(false);
        view.down('#chkTransitionRefill').setValue(false);
        view.down('#chkSpecDrugAtSpecPharm').setValue(true);
        view.down('#chkEmbeddedDeductible').setValue(true);
        view.down('#txtDeductIndividual').setValue("");
        view.down('#txtDeductFamily').setValue("");
        view.down('#txtOOPIndividual').setValue("");
        view.down('#txtOOPFamily').setValue("");
        view.down('#txtCLMaxCopay').setValue("");
        view.down('#txtCLDMRProcessedBy').setValue("");
        view.down('#txtcoinsuranceStartAmt').setValue("");
        view.down('#txtMAXIndividual').setValue("");
        view.down('#txtMAXFamily').setValue("");
        //  vm.getStore('PlanServiceTypeStore').removeAll();
        view.down('#cbxDaysAllowedOnline').setValue("");
        view.down('#cbxDaysAllowedPaper').setValue("");
        view.down('#cbxDaysAllowedReversal').setValue("");
        view.down('#cbxnonprefPharmExclTierCodes').setValue("");
        view.down('#cbxprefPharmExclTierCodes').setValue("");
        view.down('#txtMaxCoInsuranceFamily').setValue("");
        view.down('#txtMaxCoInsuranceIndiv').setValue("");
        view.down('#txtEffDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 0, 1), 'm/d/Y'));
        view.down('#txtTermDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 11, 31), 'm/d/Y'));


        view.down('#cbxPlanGroupCode').setDisabled(false);
        view.down('#txtPlanBenefitCode').setDisabled(false);
        view.down('#txtPlanBenefitName').setDisabled(false);
        view.down('#chkLICSSubsidy').setDisabled(false);
        view.down('#chkPassThruPricing').setDisabled(true);
        view.down('#chkCopayRequired').setDisabled(false);
        view.down('#chkEmergencyFill').setDisabled(false);
        view.down('#chkTraditional').setDisabled(false);
        view.down('#txtPartBCopayPercentage').setDisabled(false);
        view.down('#txtEffDate').setDisabled(false);
        view.down('#txtTermDate').setDisabled(false);
        view.down('#txtRenewalDate').setDisabled(false);
        view.down('#chkOutOfNetwork').setDisabled(false);
        view.down('#chkTransitionRefill').setDisabled(false);
        view.down('#chkSpecDrugAtSpecPharm').setDisabled(false);
        view.down('#chkEmbeddedDeductible').setDisabled(false);
        view.down('#txtDeductIndividual').setDisabled(false);
        view.down('#txtDeductFamily').setDisabled(false);
        view.down('#txtOOPIndividual').setDisabled(false);
        view.down('#txtOOPFamily').setDisabled(false);
        view.down('#txtCLMaxCopay').setDisabled(false);
        view.down('#txtCLDMRProcessedBy').setDisabled(false);
        view.down('#txtcoinsuranceStartAmt').setDisabled(false);
        view.down('#txtMAXIndividual').setDisabled(false);
        view.down('#txtMAXFamily').setDisabled(false);
        //  vm.getStore('PlanServiceTypeStore').removeAll();
        view.down('#cbxDaysAllowedOnline').setDisabled(false);
        view.down('#cbxDaysAllowedPaper').setDisabled(false);
        view.down('#cbxDaysAllowedReversal').setDisabled(false);
        view.down('#cbxnonprefPharmExclTierCodes').setDisabled(false);
        view.down('#cbxprefPharmExclTierCodes').setDisabled(false);
        view.down('#cbxPlanDedExclTierCodes').setDisabled(false);
        view.down('#txtMaxCoInsuranceFamily').setDisabled(false);
        view.down('#txtMaxCoInsuranceIndiv').setDisabled(false);
        view.down('#cbxPlanDedExclTierCodes').setValue('');
        view.down('#cbxnonprefPharmExclTierCodes').setValue('');
        view.down('#cbxprefPharmExclTierCodes').setValue('');

        //view.down('#mcbApplicableCovePhase').setValue("");

        // var view = this.getView();
        var me = this;
        var plnBenefitDetail = this.getView().down('plan-benefits-detail');
        me.getViewModel().set('PlanServiceTypeStore', null);
        plnBenefitDetail.getViewModel().set('isEditing', true);
        // this.DisableControls(false);
        view.down('#btnSave').setDisabled(false);
        view.down('#btnCancel').setDisabled(false);
        //this.fireEvent('newbenefit',null);
        this.getView().down('plan-benefits-detail').getController().newbenefit();
    }
    //,



    // menuOnClick: function (selection) {
    //     //debugger;
    //     var tabPanel = this.getView();
    //
    //     var existingTab = tabPanel.down(selection.value),
    //         tab;
    //
    //     if (!existingTab) {
    //         tab = tabPanel.add({
    //             xtype: selection.value,
    //             closable: true
    //         });
    //         //tab.closable = true;
    //         tabPanel.setActiveTab(tab);
    //     } else {
    //         tabPanel.setActiveTab(existingTab);
    //     }
    // }
});
