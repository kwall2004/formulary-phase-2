/**
 * Created by a6686 on 11/17/2016.
 */


Ext.define('Atlas.plan.view.benefit.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefit-detail',
    // listen: {
    //     controller: {
    //         'plan-benefitscontroller': {
    //             benefitChange: 'onBenefitChange',
    //             newbenefit: 'newbenefit'
    //         }
    //     }
    // },
    newbenefit: function () {
        var view = this.getView();
        view.down('#hdnSystemId').setValue("0");
        view.down('#hdnBenefitStatus').setValue("D");
        this.planBenefitStatus = "Draft";
        view.down('#lblStatus').setValue("Draft");
        this.SetControlsForBenefitStatus("Draft");
        view.down('#lblCarrier').setValue("");
        //  view.down('#lblCarrier').setValue("");
        view.down('#cbxprefPharmExclTierCodes').setDisabled(false);
        view.down('#cbxPlanDedExclTierCodes').setDisabled(false);
        view.down('#cbxnonprefPharmExclTierCodes').setDisabled(false);
        view.down('#btnCancel').setDisabled(true);
        var vm = this.getViewModel();
        vm.getStore('PlanServiceTypeStore').removeAll();
        var StoreCoveragePhase = vm.getStore('StoreCoveragePhase');
        StoreCoveragePhase.getProxy().setExtraParam('pPlanGroupId', 0);
        StoreCoveragePhase.getProxy().setExtraParam('pPlanBenefitId', 0);
        StoreCoveragePhase.load();
    },
    PlanBenefitID: 0,
    PlanGroupID: 0,
    PlanBenefitStatus: "",
    init: function () {

        var view = this.getView();
        view.down('#btnAdminEdit').setDisabled(true);
        view.down('#btnActivate').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.down('#btnSave').setDisabled(true);

        this.DisableControls(true);
    },
    onEffectiveDateSelect:function(field,value){
        this.getView().down('#txtTermDate').setMinValue(value);
    },
    renderPercent:function(value){

       if (value)
           return value+'%';
        else
            return '0%'
    },
    renderDollar:function(value){
        if(value)
            return '$'+ Ext.util.Format.number(value, '0,0');
        else
            return '$0'
    },
    boxReady: function () {


        if (this.getView().up().openView) {
            var record = this.getView().up().benefitRecord;
            if (record != null) {
                this.PlanBenefitID = record.data.planBenefitId;
                this.onBenefitChange(record);
            }
            // the else conditon is to integrate with other module which just send only the benefit id and Plan group Id
            else {

                var planBenefitId = this.getView().up().planBenefitId,
                    planGroupId = this.getView().up().planGroupId;
                if (planBenefitId && planGroupId) {
                    this.setValues(planBenefitId, planGroupId);
                }
            }

        }

    },

    onBenefitChange: function (record) {
        //debugger;

        this.setValues(record.data.planBenefitId, record.data.planGroupId);
    },

    onNewPlanGroupClick: function (button) {
        var me = this;
        var plnBenefitDetail = this.getView().down('plan-benefits-detail');
        me.getViewModel().set('PlanServiceTypeStore', null);
        plnGrpDetail.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    onCancelClick: function (button) {
        var me = this;
        var view = this.getView();
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var PlanBenefitId = parseInt(view.down('#hdnPlanBenefitId').getValue());
                    var PlanGroupId = parseInt(view.down('#hdnPlanGroupId').getValue());
                    me.ClearFields();
                    if(PlanBenefitId>0) {
                        me.setValues(PlanBenefitId, PlanGroupId);
                    }

                } else {
                    console.log('No pressed');
                }
            }
        });

    },

    onSaveClick: function (button) {
        var me = this;
        if (!this.getView().getForm().isValid())
        {
            Ext.MessageBox.alert("Validation Error","Please populate all of the required fields before saving the data.");

        }
        else
        {
            Ext.Msg.show({
                title: 'Save Changes?',
                message: 'Would you like to save your changes?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {

                    if (btn === 'yes') {
                        me.performSave();
                        // me.ClearFields();

                    } else {
                        console.log('No pressed');
                    }
                }
            });
        }


    },

    performSave: function () {
        try {
            var view = this.getView();
            var vm = this.getViewModel();
            var PlanBenefitId = parseInt(view.down('#hdnPlanBenefitId').getValue());
            var PlanGroupId = parseInt(view.down('#hdnPlanGroupId').getValue());
            var applicableCoveragePhasesSave = "";

            if (view.down('#formDetails').isValid()) {
                if (view.down('#mcbApplicableCovePhase').getRawValue() != null && view.down('#mcbApplicableCovePhase').getRawValue() != "") {
                    var stuff = view.down('#mcbApplicableCovePhase').getValue();
                    /*stuff = stuff.replace("[","");
                     stuff = stuff.replace("]","");
                     stuff = stuff.replace("[","");*/
                    applicableCoveragePhasesSave = stuff.join();//view.down('#mcbApplicableCovePhase').getValue().replace('[','').replace(']','').replace("\"", "");
                }

                if (!this.UpdatePlanBenefitInfo(applicableCoveragePhasesSave)) {
                    Ext.Msg.alert("Benefits", "Failed to update plan benefit data.");
                }
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var extraParameters = {
                    'pPlanBenefitId': view.down('#hdnPlanBenefitId').getValue()

                };
                //debugger;
                //var view = this.getView();
                var store = vm.getStore('PlanServiceTypeStore');
                var dirty = false;
                saveAction = [{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];
                var testReturn = Atlas.common.utility.Utilities.saveData([store], 'plan/rx/planpharmalimits/update', 'ttPlanServiceTypes', [true], extraParameters,
                    saveAction, null);
                //debugger;
                var index = testReturn.message.indexOf('Duplicate');
                if (index != -1) {
                    Ext.Msg.alert("Pharma Limits", "Duplicate Pharmacy Types not allowed.");
                    return;
                }

                //Reload the data from the database.
                PlanBenefitId = extraParameters.pPlanBenefitId;
                var PlanBenefitsParent = view.up().down('#hdnPlanBenefitCodeLA');
                var planBenefitStore = vm.getStore('planbenefitext');
                planBenefitStore.getProxy().setExtraParam('pWhere', 'planBenefitId=' + PlanBenefitId+ ' and planGroupId=' + PlanGroupId);
                planBenefitStore.load({
                    callback: function (recordInfo, operation, success) {
                        //debugger;
                        if (recordInfo && recordInfo.length > 0) {
                            PlanBenefitsParent.setSelection(recordInfo[0]);
                        }

                    }
                });
                //this.setValues(PlanBenefitId, PlanGroupId);
                // this.GetCustomNDCFormDetail(view.down('#hdnSelectedNDC').getValue());

                Ext.Msg.alert("Benefits", "Successfully updated plan benefit data.");
                //this.ClearFields();

            }
            else {
                Ext.Msg.alert('Benefits', 'Please enter valid values');
            }

        }
        catch (ex) {
            console.log(ex.message);
            console.log(ex.stack);
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    oncbxprefPharmExclTierCodesChange: function (control, newValue, oldValue) {
        // will need to set the value of the combobox too.
        // debugger;
        var what = control.getValue();
        var vm = this.getViewModel();
        var record = vm.get('masterRecord');
        if (record) {
            record.data.prefPharmExclTierCodes = newValue.join();
            vm.set('masterRecord', record);
        }

    },
    oncbxPlanDedExclTierCodesChange: function (control, newValue, oldValue) {
        // will need to set the value of the combobox too.
        // debugger;
        var what = control.getValue();
        var vm = this.getViewModel();
        var record = vm.get('masterRecord');
        if (record) {
            record.data.planDedExclTierCodes = newValue.join();
            vm.set('masterRecord', record);
        }
    },
    oncbxnonprefPharmExclTierCodesChange: function (control, newValue, oldValue) {
        // will need to set the value of the combobox too.
        // debugger;
        /* var nv = newValue.join();
         for (var i=0;i<newValue.length;i++){
         if (i<newValue.length-1 && newValue[i] == newValue[newValue.length-1]){

         nv = nv.replace(','+newValue[i]);
         nv = nv.replace(newValue[i]+',');
         }
         }
         if (nv!=newValue.join()){
         if (nv.indexOf(',')!=-1){
         newValue=nv.split(',');
         }
         else {
         newValue = [nv];
         }


         }
         /*var index = newValue().join().indexOf(oldValue.join());
         if (index !=-1)
         {
         var bad =
         var nv = newValue.join().replace()
         }*/
        //control.setValue(old)
        var what = control.getValue();
        var vm = this.getViewModel();
        var record = vm.get('masterRecord');
        if (record) {
            record.data.nonPrefPharmExclTierCodes = newValue.join();
            vm.set('masterRecord', record);
        }

    },
    onApplicableCoveragePhaseChange: function (control, newValue, oldValue) {
        // will need to set the value of the combobox too.
        // debugger;
        var what = control.getValue();
        var vm = this.getViewModel();
        var record = vm.get('masterRecord');
        if (record) {
            record.data.applicableCoveragePhases = newValue.join();
            vm.set('masterRecord', record);
        }

    },

    onPlangroupLoad: function (store, records, successful, operation) {
        // this.setupAtlasRecord();
        //Ext.defer(this.setupAtlasRecord, 100, this);

    },

    onPlangroupSelect: function (combo, record) {
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#hdnPlanGroupId').setValue(record.data.planGroupId);
        view.down('#cbxprefPharmExclTierCodes').setDisabled(false);
        view.down('#cbxPlanDedExclTierCodes').setDisabled(false);
        view.down('#cbxnonprefPharmExclTierCodes').setDisabled(false);
        var plandeductibleexcludedtiercodes = vm.getStore('plandeductibleexcludedtiercodes');
        plandeductibleexcludedtiercodes.getProxy().setExtraParam('pPlanGroupId', record.data.planGroupId);
        plandeductibleexcludedtiercodes.load({
            callback: function (recorddata2, operation2, success) {

            }
        });


    },
    ClearFields: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        //txtPlanBenefitCode
        view.down('#cbxPlanGroupCode').setValue("");
        view.down('#cbxPlanGroupCode').setValue("");
        view.down('#cbxPlanGroupCode').setEmptyText("[e.g. MHP Medicare 2011]");
        view.down('#cbxPlanGroupCode').setReadOnly(true);
        view.down('#txtPlanBenefitName').setValue("");
        view.down('#chkLICSSubsidy').setValue(false);
        view.down('#chkPassThruPricing').setValue(false);
        view.down('#chkCopayRequired').setValue(false);
        view.down('#chkEmergencyFill').setValue(false);
        view.down('#chkTraditional').setValue(false);
        view.down('#txtPartBCopayPercentage').setValue("");
        view.down('#txtEffDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 0, 1), 'm/d/Y'));
        view.down('#txtTermDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 11, 31), 'm/d/Y'));
        //view.down('#txtEffDate').setValue(new Date());
        //view.down('#txtTermDate').setValue("");
        view.down('#txtRenewalDate').setValue("");
        view.down('#chkOutOfNetwork').setValue(false);
        view.down('#chkTransitionRefill').setValue(false);
        view.down('#chkSpecDrugAtSpecPharm').setValue(true);
        view.down('#chkEmbeddedDeductible').setValue(true);
        view.down('#cbAccDAWPenalty').setValue(true);
        view.down('#txtDeductIndividual').setValue("");
        view.down('#txtDeductFamily').setValue("");
        view.down('#txtOOPIndividual').setValue("");
        view.down('#txtOOPFamily').setValue("");
        view.down('#txtCLMaxCopay').setValue("");
        view.down('#txtCLDMRProcessedBy').setValue("");
        view.down('#txtcoinsuranceStartAmt').setValue("");
        view.down('#txtMAXIndividual').setValue("");
        view.down('#txtMAXFamily').setValue("");
        vm.getStore('PlanServiceTypeStore').removeAll();
        view.down('#cbxDaysAllowedOnline').setValue("");
        view.down('#cbxDaysAllowedPaper').setValue("");
        view.down('#cbxDaysAllowedReversal').setValue("");
        view.down('#cbxnonprefPharmExclTierCodes').setValue("");
        view.down('#cbxprefPharmExclTierCodes').setValue("");
        view.down('#cbxPlanDedExclTierCodes').setValue("");
        view.down('#cbxprefPharmExclTierCodes').setDisabled(true);
        view.down('#cbxPlanDedExclTierCodes').setDisabled(true);
        view.down('#cbxnonprefPharmExclTierCodes').setDisabled(true);

        view.down('#txtMaxCoInsuranceFamily').setValue("");
        view.down('#txtMaxCoInsuranceIndiv').setValue("");

        view.down('#mcbApplicableCovePhase').setValue("");
        //this.BindCoveragePhaseDropdown();



    },
    BindCoveragePhaseDropdown: function (applicableCoveragePhases) {


        var view = this.getView();
        var vm = this.getViewModel();
        var PlanBenefitId = parseInt(view.down('#hdnPlanBenefitId').getValue());
        var PlanGroupId = parseInt(view.down('#hdnPlanGroupId').getValue());
        var StoreCoveragePhase = vm.getStore('StoreCoveragePhase');
        view.down('#mcbApplicableCovePhase').setValue('');
        StoreCoveragePhase.getProxy().setExtraParam('pPlanGroupId', PlanGroupId);
        StoreCoveragePhase.getProxy().setExtraParam('pPlanBenefitId', PlanBenefitId);
        StoreCoveragePhase.load(
            {
                callback: function (recorddata2, operation2, success) {

                    if (applicableCoveragePhases != "") {
                        var arrSelectedCodes = [];
                        if (applicableCoveragePhases.indexOf(',') == -1)
                            arrSelectedCodes[0] = applicableCoveragePhases;
                        else
                            arrSelectedCodes = applicableCoveragePhases.split(',');
                        //var r = vm.get('masterRecord');
                        // var r.applicableCoveragePhases
                        view.down('#mcbApplicableCovePhase').setValue(arrSelectedCodes);
                        /*for (var i = 0; i < arrSelectedCodes.length; i++) {
                         view.down('#mcbApplicableCovePhase').setValue(arrSelectedCodes[i]);
                         }*/

                    }
                }
            }
        );
    },
    SetControlsForBenefitStatus: function (Status) {
        var view = this.getView();
        if (this.PlanBenefitID > 0) {
            view.down('#btnActivate').setDisabled(false);
            view.down('#btnCancel').setDisabled(false);
            view.down('#chkPassThruPricing').setReadOnly(false);
        }
        else {
            view.down('#chkPassThruPricing').setValue(true);
            view.down('#chkPassThruPricing').setReadOnly(true);
            view.down('#txtDeductFamily').setValue("0");
            view.down('#chkEmbeddedDeductible').setValue(true);
            view.down('#txtDeductIndividual').setValue("0");
            view.down('#txtOOPFamily').setValue("0");
            view.down('#txtOOPIndividual').setValue("0");
            view.down('#txtMAXIndividual').setValue("0");
            view.down('#txtMAXFamily').setValue("0");
            view.down('#txtCLMaxCopay').setValue("0");
            view.down('#txtcoinsuranceStartAmt').setValue("0");
            //debugger;
            view.down('#txtEffDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 0, 1), 'm/d/Y'));
            view.down('#txtTermDate').setValue(Ext.Date.format(new Date(Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 11, 31), 'm/d/Y'));
            view.down('#txtRenewalDate').setMinValue(new Date((Atlas.common.utility.Utilities.getLocalDateTime() .getFullYear() + 1, 0, 1)));
            // view.down('#txtPlanBenefitCode').ValidateOnEvent = false;
        }

        switch (Status) {
            case "Draft":
                this.DisableControls(false);
                view.down('#cbxPlanGroupCode').setReadOnly(false);
                view.down('#btnActivate').setText("Activate");
                // view.down('#btnActivate.CommandArgument = "activate";
                view.down('#btnSave').setDisabled(false);
                break;
            case "Active":
                this.DisableControls(true);
                view.down('#cbxPlanGroupCode').setReadOnly(true);
                view.down('#btnActivate').setText("Deactivate");
                //view.down('#btnActivate.CommandArgument = "deactivate";
                view.down('#btnSave').setDisabled(true);
                if(this.getView().up().atlasRecord){
                    view.down('#btnAdminEdit').setDisabled(true);
                }else
                view.down('#btnAdminEdit').setDisabled(false);
                break;
            case "Inactive":
                view.down('#cbxPlanGroupCode').setReadOnly(true);
                this.DisableControls(false);
                view.down('#btnSave').setDisabled(false);
                view.down('#btnActivate').setText("Activate");
                //view.down('#btnActivate.CommandArgument = "activate";
                break;
        }
        var planbenefitView = view.up();
        if(planbenefitView)
        {
            //debugger;
            if(planbenefitView.getViewModel().get('isAtlasRecord'))
            {
                view.down('#btnActivate').setDisabled(true);
                view.down('#btnCancel').setDisabled(true);
                view.down('#btnSave').setDisabled(true);
                view.down('#btnAdminEdit').setDisabled(true);
            }
        }
    },
    DisableControls: function (bDisabled) {
        //debugger;
        var view = this.getView();
        view.down('#cbxPlanGroupCode').setReadOnly(bDisabled);
        view.down('#txtPlanBenefitCode').setReadOnly(bDisabled);
        view.down('#txtPlanBenefitName').setReadOnly(bDisabled);
        view.down('#chkLICSSubsidy').setReadOnly(bDisabled);
        view.down('#chkPassThruPricing').setReadOnly(bDisabled);
        view.down('#chkCopayRequired').setReadOnly(bDisabled);
        view.down('#chkEmergencyFill').setReadOnly(bDisabled);
        view.down('#chkTraditional').setReadOnly(bDisabled);
        view.down('#txtPartBCopayPercentage').setReadOnly(bDisabled);
        view.down('#txtEffDate').setReadOnly(bDisabled);
        view.down('#txtRenewalDate').setReadOnly(bDisabled);
        view.down('#txtTermDate').setReadOnly(bDisabled);
        view.down('#chkOutOfNetwork').setReadOnly(bDisabled);
        view.down('#chkTransitionRefill').setReadOnly(bDisabled);
        view.down('#chkSpecDrugAtSpecPharm').setReadOnly(bDisabled);
        view.down('#chkEmbeddedDeductible').setReadOnly(bDisabled);
        view.down('#txtDeductIndividual').setReadOnly(bDisabled);
        view.down('#txtDeductFamily').setReadOnly(bDisabled);
        view.down('#txtCLMaxCopay').setReadOnly(bDisabled);
        view.down('#txtcoinsuranceStartAmt').setReadOnly(bDisabled);
        view.down('#txtCLDMRProcessedBy').setReadOnly(bDisabled);
        view.down('#txtOOPIndividual').setReadOnly(bDisabled);
        view.down('#txtOOPFamily').setReadOnly(bDisabled);
        view.down('#txtMAXIndividual').setReadOnly(bDisabled);
        view.down('#txtMAXFamily').setReadOnly(bDisabled);
        view.down('#grdPlanServiceType').setDisabled(bDisabled);
        view.down('#btnAdd').setDisabled(bDisabled);
        view.down('#btnRemove').setDisabled(bDisabled);
        view.down('#cbxDaysAllowedOnline').setReadOnly(bDisabled);
        view.down('#cbxDaysAllowedPaper').setReadOnly(bDisabled);
        view.down('#cbxDaysAllowedReversal').setReadOnly(bDisabled);
        view.down('#cbxnonprefPharmExclTierCodes').setReadOnly(bDisabled);
        view.down('#cbxprefPharmExclTierCodes').setReadOnly(bDisabled);
        view.down('#cbxPlanDedExclTierCodes').setReadOnly(bDisabled);
        view.down('#txtMaxCoInsuranceIndiv').setReadOnly(bDisabled);
        view.down('#txtMaxCoInsuranceFamily').setReadOnly(bDisabled);
        view.down('#mcbApplicableCovePhase').setReadOnly(bDisabled);
        view.down('#cbAccDAWPenalty').setReadOnly(bDisabled);
    },
    setValues: function (prmPlanBenefitId, prmPlanGroupId) {
        var view = this.getView();
        var me = this;
        try {
            this.PlanBenefitID = parseInt(prmPlanBenefitId);
            var planBenefitStatus = "";
            var vm = this.getViewModel();
            this.PlanGroupID = parseInt(prmPlanGroupId);
            view.down('#hdnPlanGroupId').setValue(prmPlanGroupId);
            view.down('#hdnPlanBenefitId').setValue(prmPlanBenefitId);
            //PlanStatus planBenefitStatus;
            this.ClearFields();
            if (this.PlanBenefitID == 0) {
                view.down('#hdnSystemId').setValue("0");
                view.down('#hdnBenefitStatus').setValue("D");
                planBenefitStatus = "Draft";
                view.down('#lblStatus').setValue("Draft");
                this.SetControlsForBenefitStatus("Draft");
                return;
            }
            var pFieldList = "systemId,planGroupId,planBenefitId,planBenefitCode,benefitName,helpDeskPhone,effDate,renewalDate,termDate,benefitStatus,passThroughPricing,licsSubsidy,allowOutOfNetworkClaims,allowTransitionRefill,copayRequired,allowEmergencyFill,partBCopayPct,daysAllowedOnline,daysAllowedReversal,daysAllowedPaper,prefPharmExclTierCodes,nonPrefPharmExclTierCodes,planDedExclTierCodes,pcnCodeList,applyPlanPricing,specDrugAtSpecPharm,embeddedDeductible,initialCoveragePhaseLimit,catastrophicAmount,maxCopay,dirMemReimbProcessedBy,maxBenefitIndv,maxBenefitFmly,deductAmountIndv,deductAmountFmly,deductApplToMailOrder,deductApplToDiabeticSense,outOfPocketAmountIndv,outOfPocketAmountFmly,outOfPocketAcumMailOrder,outOfPocketAcumDiabeticSense,coinsuranceStartAmt,coInsOOPMaxIndiv,coInsOOPMaxFamily,applicableCoveragePhases,accumDAWPenaltyInOOP";
            var pFieldListGroup = "systemId,planGroupId,carrierId,carrierName,carrierAcctNumber,accountName,carrierLOBId,lobName,planGroupCode,planGroupName,effDate,renewalDate,termDate,planGroupStatus,exclFormularyId,formularyId,MACListID,allowMemberLocks,processMTMCase,processMAPCase,pharmNetworkId,nonPrefPharmNetworkId,planFaxLogo,allowMedAdminFee,medAdminFeeAmt,payablePatRespCodes,partBPCN,pcnCodeList,mandatoryGeneric,cmsPBPid,CMSPlanId,CMSFormularyId,CMSCntrId,CMSPlanType,asthmaHEDISAlert,copayCalcFunction,defMemberEnollAddrType,MbrCardFrontImage,MbrCardFrontCSS,MbrCardBackImage,MbrCardBackCSS,@DrugDataSource,PDEPlanType,useAllowedPrescribers,PayNonPartDIngredients";
            var model = Ext.create('Atlas.plan.model.PlanBenefit');
            // var mainBenefitDetailStore = this.getViewModel().getStore('mainBenefitDetailStore');
            var saveProxy = model.getProxy();
            saveProxy.setExtraParam('planBenefitId', this.PlanBenefitID);
            saveProxy.setExtraParam('pFieldList', pFieldList);
            model.load({
                failure: function (record, operation) {
                    //debugger;
                },
                callback: function (recorddata, operation, success) {
                    vm.set('masterRecord', recorddata);
                    me.PlanGroupID = recorddata.data.planGroupId;

                    view.down('#hdnPlanGroupId').setValue(recorddata.data.planGroupId);
                    view.down('#hdnSystemId').setValue(recorddata.data.systemId);
                    //Session["SystemID"] = planBenefitInfo.PlanBenefit.SystemID;
                    me.PlanBenefitStatus = recorddata.data.benefitStatus;

                    // hdnPlanGroupId will be zero in Add mode.
                    if (view.down('#hdnPlanGroupId').getValue() == "" || view.down('#hdnPlanGroupId').getValue() == "0")
                        view.down('#hdnPlanGroupId').setValue(recorddata.data.planGroupId);
                    var modelGroup = Ext.create('Atlas.plan.model.PlanGroupInfo');
                    var saveProxy1 = modelGroup.getProxy();
                    saveProxy1.setExtraParam('pplanGroupId', recorddata.data.planGroupId);
                    saveProxy1.setExtraParam('pFieldList', pFieldListGroup);
                    modelGroup.load({
                        failure: function (record, operation) {
                        },
                        success: function (recorddata1, operation) {
                            //debugger;
                            view.down('#lblCarrier').setValue(recorddata1.data.carrierName);
                            var store = view.down('#cbxPlanGroupCode').getStore();
                            //var store = me.getView().getViewModel().getStore('plangroups');
                            if (store) {
                                store.getProxy().setExtraParam('pWhere', 'wrdidx contains ');
                                store.load({
                                    callback: function (record, operation, success) {
                                        var form = view.down('#form1');
                                        if(form) {
                                            //debugger;
                                            form.loadRecord(recorddata1);
                                        }
                                    }
                                });
                            }

                            if (recorddata.data.planGroupId > 0) {

                                var plandeductibleexcludedtiercodes = vm.getStore('plandeductibleexcludedtiercodes');
                                plandeductibleexcludedtiercodes.getProxy().setExtraParam('pPlanGroupId', recorddata.data.planGroupId);
                                plandeductibleexcludedtiercodes.load({

                                        callback: function (recorddata2, operation2, success) {
                                            //debugger;


                                            //debugger;
                                            if (recorddata.data.prefPharmExclTierCodes != "") {
                                                var lstTiers = [];
                                                if (recorddata.data.prefPharmExclTierCodes.indexOf(',') == -1)
                                                    lstTiers[0] = recorddata.data.prefPharmExclTierCodes;
                                                else
                                                    lstTiers = recorddata.data.prefPharmExclTierCodes.split(',');
                                                var cb = view.down('#cbxprefPharmExclTierCodes');
                                                cb.setValue(lstTiers);
                                            }
                                            else
                                                view.down('#cbxprefPharmExclTierCodes').setValue("");

                                            if (recorddata.data.nonPrefPharmExclTierCodes != "") {
                                                //console.log(recorddata.data.nonPrefPharmExclTierCodes);
                                                var lstTiers = [];
                                                if (recorddata.data.nonPrefPharmExclTierCodes.indexOf(',') == -1)
                                                    lstTiers[0] = recorddata.data.nonPrefPharmExclTierCodes;
                                                else
                                                    lstTiers = recorddata.data.nonPrefPharmExclTierCodes.split(',');
                                                var cb = view.down('#cbxnonprefPharmExclTierCodes');
                                                cb.setValue(lstTiers);
                                            }
                                            else view.down('#cbxnonprefPharmExclTierCodes').setValue("");


                                            if (recorddata.data.planDedExclTierCodes != "") {
                                                var lstTiers = [];
                                                if (recorddata.data.planDedExclTierCodes.indexOf(',') == -1)
                                                    lstTiers[0] = recorddata.data.planDedExclTierCodes;
                                                else
                                                    lstTiers = recorddata.data.planDedExclTierCodes.split(',');
                                                var cb = view.down('#cbxPlanDedExclTierCodes');
                                                cb.setValue(lstTiers);
                                            }
                                            else view.down('#cbxPlanDedExclTierCodes').setValue("");


                                        }
                                    }
                                );

                            }

                            if (me.getView().up().openView) {
                                var planBenefitId = 0,
                                    planGroupId = 0;
                                var record = me.getView().up().benefitRecord;
                                var combo = me.getView().up().lookupReference('planBenefitInfo');
                                if (record) {

                                    planBenefitId = record.data.planBenefitId;
                                    planGroupId = record.data.planGroupId;
                                    combo.setValue(record.data.planBenefitId);
                                    combo.setRawValue(record.data.planBenefitCode);
                                }

                                else {
                                    planBenefitId = me.getView().up().planBenefitId;
                                    planGroupId = me.getView().up().planGroupId;
                                    if (planBenefitId && planGroupId) {
                                        combo.setValue(planBenefitId);
                                        combo.setRawValue(recorddata.data.planBenefitCode);
                                    }
                                }

                                var planBenefitStore = me.getViewModel().getStore('planbenefitext');

                                if (planBenefitStore && planBenefitId > 0 && planGroupId > 0) {
                                    //debugger;
                                    planBenefitStore.getProxy().setExtraParam('pWhere', 'planBenefitId=' + planBenefitId + ' and planGroupId=' + planGroupId);

                                    planBenefitStore.load({
                                        callback: function (recordInfo, operation, success) {
                                            //debugger;
                                            if (recordInfo && recordInfo.length > 0) {
                                                combo.suspendEvents(false);
                                                combo.setSelection(recordInfo[0]);
                                                combo.resumeEvents(false);
                                            }

                                        }
                                    });
                                }

                                me.getView().up().openView = false;

                            }


                        }
                    });
                    //TODO: Use utility class for date formatting.
                    planBenefitStatus = "Draft";
                    //view.up().benefitStatus =recorddata.data.benefitStatus;

                    switch (recorddata.data.benefitStatus) {


                        case "A":
                            // debugger;
                            view.down('#lblStatus').setValue("Active");

                            planBenefitStatus = "Active";
                            view.down('#hdnBenefitStatus').setValue("A");
                            break;
                        case "I":
                            // debugger;
                            view.down('#lblStatus').setValue("Inactive");
                            planBenefitStatus = "Inactive";
                            view.down('#hdnBenefitStatus').setValue("I");
                            break;
                        case "D":
                            // debugger;
                            view.down('#lblStatus').setValue("Draft");
                            planBenefitStatus = "Draft";
                            view.down('#hdnBenefitStatus').setValue("D");
                            break;
                        default:
                            // debugger;
                            view.down('#lblStatus').setValue("Draft");
                            planBenefitStatus = "Draft";
                            view.down('#hdnBenefitStatus').setValue("D");
                            break;

                    }


                    view.down('#txtPlanBenefitCode').setValue(recorddata.data.planBenefitCode);
                    view.down('#txtPlanBenefitName').setValue(recorddata.data.benefitName);
                    view.down('#chkLICSSubsidy').setValue(recorddata.data.licsSubsidy);
                    view.down('#chkPassThruPricing').setValue(recorddata.data.passThroughPricing);
                    view.down('#chkCopayRequired').setValue(recorddata.data.copayRequired);
                    view.down('#chkEmergencyFill').setValue(recorddata.data.allowEmergencyFill);
                    view.down('#chkTraditional').setValue(recorddata.data.applyPlanPricing);
                    view.down('#txtPartBCopayPercentage').setValue(recorddata.data.partBCopayPct);
                    if (recorddata.data.effDate != ""){
                        view.down('#txtEffDate').setValue(new Date(recorddata.data.effDate));
                        view.down('#txtTermDate').setMinValue(new Date(recorddata.data.effDate));
                    }

                    if (recorddata.data.termDate != "")
                        view.down('#txtTermDate').setValue(new Date(recorddata.data.termDate));
                    if (recorddata.data.renewalDate != "")
                        view.down('#txtRenewalDate').setValue(new Date(recorddata.data.renewalDate));
                    view.down('#chkOutOfNetwork').setValue(recorddata.data.allowOutOfNetworkClaims);
                    view.down('#chkTransitionRefill').setValue(recorddata.data.allowTransitionRefill);
                    view.down('#chkSpecDrugAtSpecPharm').setValue(recorddata.data.specDrugAtSpecPharm);
                    if (recorddata.data.accumDAWPenaltyInOOP == 'yes')
                        view.down('#cbAccDAWPenalty').setValue(true);
                    else
                        view.down('#cbAccDAWPenalty').setValue(false);
                    view.down('#chkEmbeddedDeductible').setValue(recorddata.data.embeddedDeductible);
                    view.down('#txtDeductIndividual').setValue(recorddata.data.deductAmountIndv);
                    view.down('#txtDeductFamily').setValue(recorddata.data.deductAmountFmly);
                    view.down('#txtOOPIndividual').setValue(recorddata.data.outOfPocketAmountIndv);
                    view.down('#txtOOPFamily').setValue(recorddata.data.outOfPocketAmountFmly);
                    view.down('#txtCLMaxCopay').setValue(recorddata.data.maxCopay);
                    view.down('#txtCLDMRProcessedBy').setValue(recorddata.data.dirMemReimbProcessedBy);
                    view.down('#txtMAXIndividual').setValue(recorddata.data.maxBenefitIndv);
                    view.down('#txtMAXFamily').setValue(recorddata.data.maxBenefitFmly);

                    view.down('#cbxDaysAllowedOnline').setValue(parseInt(recorddata.data.daysAllowedOnline) < 10 ? "0" + recorddata.data.daysAllowedOnline : recorddata.data.daysAllowedOnline);
                    view.down('#cbxDaysAllowedPaper').setValue(parseInt(recorddata.data.daysAllowedPaper) < 10 ? "0" + recorddata.data.daysAllowedPaper : recorddata.data.daysAllowedPaper);
                    view.down('#cbxDaysAllowedReversal').setValue(parseInt(recorddata.data.daysAllowedReversal) < 10 ? "0" + recorddata.data.daysAllowedReversal : recorddata.data.daysAllowedReversal);
                    me.getPlanPharmaLimits(me.PlanBenefitID);
                    me.SetControlsForBenefitStatus(planBenefitStatus);
                    view.up().down('#hdnParentPlanGroupId').setValue(this.PlanGroupID);
                    view.up().down('#hdnParentPlanBenefitId').setValue(this.PlanBenefitID);
                    view.up().down('#hdnParentPlanBenefitStatus').setValue(this.PlanBenefitStatus);
                    me.BindCoveragePhaseDropdown(recorddata.data.applicableCoveragePhases);
                    me.BindCoInsuranceFields(recorddata.data.coinsuranceStartAmt, recorddata.data.coInsOOPMaxIndiv, recorddata.data.coInsOOPMaxFamily);

                    //this.getView().up().BenefitData = recorddata;
                    //debugger;
                    me.getView().findParentByType('tabpanel').BenefitData = recorddata;
                }
            })
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    getPlanPharmaLimits: function (PlanBenefitID) {
        var view = this.getView();
        var PlanServiceTypeStore = view.down('#grdPlanServiceType').getStore();
        //debugger;
        //var PlanServiceTypeStore = view.getViewModel().getStore('PlanServiceTypeStore');

        PlanServiceTypeStore.getProxy().setExtraParam('pPlanBenefitId', PlanBenefitID);
        PlanServiceTypeStore.load();
    },
    BindCoInsuranceFields: function (coinsuranceStartAmt, coInsOOPMaxIndiv, coInsOOPMaxFamily) {
        var view = this.getView();
        view.down('#txtcoinsuranceStartAmt').setValue(coinsuranceStartAmt);
        view.down('#txtMaxCoInsuranceIndiv').setValue(coInsOOPMaxIndiv);
        view.down('#txtMaxCoInsuranceFamily').setValue(coInsOOPMaxFamily);
        /*if (applicableCoveragePhases != "") {
         var arrSelectedCodes = applicableCoveragePhases.split(',');
         for (var i = 0; i < arrSelectedCodes.length; i++) {
         view.down('#mcbApplicableCovePhase').setValue(arrSelectedCodes[i]);
         }

         }*/
    },
    onAdminEditClick: function () {
        var view = this.getView();
        this.DisableControls(false);
        view.down('#btnSave').setDisabled(false);

        view.down('#btnCancel').setDisabled(false);

    },
    onAdd: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var grid = view.down('#grdPlanServiceType');
        var store = viewModel.getStore('PlanServiceTypeStore');//grid.getStore();
        //debugger;
        if (!grid.plugins[0].editing) {
            store.insert(0, {
                SystemID: 0,
                fulFillmentType: "",
                daysSupplyNonMaint: 30,
                daysSupplyMaint: 90,
                qtyLimitNonMaint: 30,
                qtyLimitsMaint: 90,
                earlyRefillPercent: 0,
                maxDollarPerRx: 9999,
                maxDollarPer30Days: 9999,
                maxDollarPer60Days: 9999,
                maxDollarPer90Days: 9999
            });
            // var plugin = view.getPlugin('rowediting');
            //rowediting
            grid.plugins[0].startEdit(0, 0);
            //var plugin = grid.plugins[0];
            //plugin.startEdit(0);
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },
    btnRemoveClick: function () {
        var view = this.getView();
        var grid = view.down('#grdPlanServiceType');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = grid.getStore();
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },
    onRuleLevelSelect: function (combo, record) {
        var view = this.getView();
        var storeGrid = view.down('#grdPlanServiceType');
        var viewModel = this.getViewModel();
        var store = storeGrid.getStore();
        store.getProxy().setExtraParam('pGCN', record.data.GCN_SEQNO);
        store.load({
            //  failure: function (record, operation) {
            //  },
            //  success: function (record, operation) {
            //  },
            //  callback: function (record, operation) {
            //      var StoreGCNBrandNameClone=viewModel.getStore('StoreGCNBrandNameClone');
            //      StoreGCNBrandNameClone.load();
            //  }
        });
        storeGrid.getView().refresh();
    },
    rendererPharmacyType: function (value, metaData, record, rowIndex, colIndex, store) {

        var viewModel = this.getViewModel();
        var StoreFulfillmentType = viewModel.getStore('StoreFulfillmentType');
        var r = StoreFulfillmentType.data.find('value', value);
        if (Ext.isEmpty(r)) {
            return record.data.fulFillmentTypeDesc;
        }
        record.data.fulFillmentTypeDesc = r.data.name;
        return r.data.name;
    },
    setButtons: function (dv, record, item, index, e) {
        var view = this.getView();
        var grid = view.down('#grdPlanServiceType');
        if (view.down('#hdnBenefitStatus').getValue() == 'A') {
            view.down('#btnRemove').setDisabled(bDisabled);
            //  return false;
        }
        else {

            var record = grid.store.getAt(index);
            if (record.data.copayConfiguredInd)
                view.down('#btnRemove').setDisabled(true);
            else
                view.down('#btnRemove').setDisabled(false);
        }
    },
    SetUniqueFulfillment: function (combo, record, index) {
        var view = this.getView();
        var grid = view.down('#grdPlanServiceType');
        var curRow = grid.getSelectionModel().getSelected();
        if (curRow.items[0].data.SystemID != '0') {
            Ext.Msg.alert('Pharmacy Type', 'Can not change the Pharmacy Type for existing records.');
            return false;
        }
        var gridRowIndex = grid.store.findExact('fulFillmentType', record.get('value'));
        if (gridRowIndex > 0) {
            Ext.Msg.alert('Pharmacy Type', 'Cannot select Pharmacy Type ' + record.get('name') + ', it is already configured.');
            return false;
        }
        return true;
    },
    ValidateEdit: function (e) {
        var view = this.getView();
        //Disable edit for Active Plan Benefit.
        if (view.down('#hdnBenefitStatus').getValue() == 'A') {
            view.down('#btnRemove').setDisabled(true);
            return false;
        }
        //Can't change the Fulfillment Type.
        if (e.field == 'fulFillmentType') {
            if (e.record.get('SystemID') != 0)
                return false;
        }
        return true;
    },
    UpdatePlanBenefitStatus: function () {
        //debugger;
        var me = this;
        var view = this.getView();
        var vm = this.getViewModel();
        Ext.Msg.confirm('Confirm', 'Are you sure you want to ' + view.down('#btnActivate').getText() + ' the plan benefit setup?', function (btn) {
            if (btn == 'yes') {

                var benefitStatus = view.down('#btnActivate').getText();
                this.PlanBenefitID = view.down('#hdnPlanBenefitId').getValue();
                this.PlanGroupID = view.down('#hdnPlanGroupId').getValue();
                var applicableCoveragePhasesUpdate = "";
                if (view.down('#mcbApplicableCovePhase').getRawValue() != null && view.down('#mcbApplicableCovePhase').getRawValue() != "") {
                    applicableCoveragePhasesUpdate = view.down('#mcbApplicableCovePhase').getValue().join(',').trim('[').trim(']').replace("\"", "");
                }
                switch (benefitStatus.toLowerCase()) {
                    case "activate":
                        //debugger;
                        if (this.UpdatePlanBenefitInfo(applicableCoveragePhasesUpdate)) {
                            var viewModel = this.getViewModel();
                            var store = viewModel.getStore('StoreErrorMessage');
                            store.getProxy().setExtraParam('PPLanBenefitId', this.PlanBenefitID);
                            store.load({
                                callback: function (record, operation) {
                                    //debugger;
                                    var obj = Ext.decode(operation.getResponse().responseText);
                                    if (obj.message[0].code == 0) {
                                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                                        var extraParameters = {
                                            'planBenefitId': view.down('#hdnPlanBenefitId').getValue(),
                                            'pFieldList': 'benefitStatus',
                                            'pFields': 'A'
                                        };
                                        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'plan/rx/planbenefitinfo/update', null, [false], extraParameters,
                                            saveAction, null);

                                        //debugger;

                                        if(testReturn && testReturn.code == 0) {

                                            var planBenfitCombo = me.getView().up().lookupReference('planBenefitInfo');
                                            planBenfitCombo.getSelection().set('benefitStatus', "A");
                                            me.getView().up().benefitStatus = 'A';

                                            view.down('#FormStatusBar').setText("Activated plan benefit.");//btnActivate
                                            view.down('#btnActivate').setText("Deactivate");
                                        }
                                    }
                                    else {
                                        //debugger;
                                        me.AddWindow();
                                        var errGrid = view.down('#GridErrorMessage');
                                        //errGrid.setData(record);/*
                                        if (obj.message[0].code == 1) {
                                            // for (var i = 0; i < record.length; i++) {
                                            //     if (record[i].data.errorCode == 1) {
                                            //         view.down('#ErrMsgStatusBar').setText("Please fix all the errors before activating the plan benefit design.");
                                            //         view.down('#btnErrClose').setText("Close");
                                            //         //view.down('#btnWarningOk').hidden = true;
                                            //         break;
                                            //     }
                                            //     if (record.data[i].errorCode == 2) {
                                            //         view.down('#ErrMsgStatusBar').setText("Click Ok to activate the plan benefit or click Cancel to make any changes..");
                                            //         view.down('#btnErrClose').setText("Close");
                                            //         //view.down('#btnWarningOk').hidden = false;
                                            //         break;
                                            //     }
                                            // }
                                            var statusBar = view.down('#ErrMsgStatusBar');
                                            statusBar.setValue("<b>Please fix all the errors before activating the plan benefit design.</b>");
                                            view.down('#btnErrClose').setText("Close");
                                            view.down('#btnWarningOk').hidden = true;
                                            /*statusBar.setStatus({
                                                text: "Please fix all the errors before activating the plan benefit design.",
                                                defaultText: "Please fix all the errors before activating the plan benefit design."
                                            });*/
                                            //break;
                                        }
                                        else {
                                            view.down('#ErrMsgStatusBar').setValue("<b>Click Ok to continue with plan benefit activation or click Cancel to make any changes to the plan benefit setup.</b>");
                                            view.down('#btnErrClose').setText("Cancel");
                                            view.down('#btnWarningOk').hidden = false;
                                        }
                                        view.down('#winPlanErrorMessageWindow').show();
                                    }
                                }
                            });
                        }
                        else {
                            view.down('#FormStatusBar').setText("Unable to activate plan benefit.");
                        }
                        break;
                    case "deactivate":
                        me.DeactivatePlanBenefit();
                        //     view.down('#FormStatusBar').setText("Deactivated plan benefit Sucessful.");
                        // else
                        //     view.down('#FormStatusBar').setText("Deactivated plan benefit not Sucessful.");
                        break;
                }
                this.setValues(me.PlanBenefitID, me.PlanGroupID);
                view.up().down('#hdnParentPlanGroupId').setValue(this.PlanGroupID);
                view.up().down('#hdnParentPlanBenefitId').setValue(this.PlanBenefitID);
                view.up().down('#hdnParentPlanBenefitStatus').setValue(this.PlanBenefitStatus);
            }
            else {
                return false;
            }
        }, this)
    },
    DeactivatePlanBenefit: function () {
        var view = this.getView();
        var me = this;
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var extraParameters = {
            'planBenefitId': view.down('#hdnPlanBenefitId').getValue(),
            'pFieldList': 'benefitStatus',
            'pFields': 'I'
        };
        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'plan/rx/planbenefitinfo/update', null, [false], extraParameters,
            saveAction, null);

        if(testReturn && testReturn.code == 0) {

            var planBenfitCombo = me.getView().up().lookupReference('planBenefitInfo');
            planBenfitCombo.getSelection().set('benefitStatus', "I");
            me.getView().up().benefitStatus = 'I';
        }

        //debugger;

        me.setValues(view.down('#hdnPlanBenefitId').getValue(), view.down('#hdnPlanGroupId').getValue());

        view.down('#FormStatusBar').setText("Deactivated plan benefit Sucessful.");

        //return true;
    },
    AddWindow: function () {
        var win = Ext.create({
            xtype: 'plan-planerrormessagewindow',
            autoShow: false
        });
        this.getView().add(win);
    },

    onAccpetAndActivateWithWarnings: function (button) {

        var me = this;
        var view = this.getView();
        var status = 'A';
        // me.updatePlanGroupStatus(status);

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var extraParameters = {
            'planBenefitId': view.down('#hdnPlanBenefitId').getValue(),
            'pFieldList': 'benefitStatus',
            'pFields': status
        };
        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'plan/rx/planbenefitinfo/update', null, [false], extraParameters,
            saveAction, null);

        if(testReturn && testReturn.code == 0) {

            view.down('#FormStatusBar').setText("Activated plan benefit.");//btnActivate
            view.down('#btnActivate').setText("Deactivate");

            var planBenfitCombo = me.getView().up().lookupReference('planBenefitInfo');
            planBenfitCombo.getSelection().set('benefitStatus', "A");
            me.getView().up().benefitStatus = 'A';
        }

        me.setValues(view.down('#hdnPlanBenefitId').getValue(), view.down('#hdnPlanGroupId').getValue());


        button.up('window').close();
    },

    onCancelCloseErrorInfo: function (button) {
        button.up('window').close();
    },
    UpdatePlanBenefitInfo: function (applicableCoveragePhases) {
        try {
            //debugger;
            var view = this.getView();
            var pFields = "";
            var pFieldValue = "";
            pFields = "systemId,planGroupId,planBenefitId,planBenefitCode,benefitName,effDate,renewalDate,termDate,benefitStatus,passThroughPricing,licsSubsidy,allowOutOfNetworkClaims,allowTransitionRefill,copayRequired,allowEmergencyFill,partBCopayPct,daysAllowedOnline,daysAllowedReversal,daysAllowedPaper,prefPharmExclTierCodes,nonPrefPharmExclTierCodes,planDedExclTierCodes,applyPlanPricing,specDrugAtSpecPharm,embeddedDeductible,initialCoveragePhaseLimit,catastrophicAmount,maxCopay,dirMemReimbProcessedBy,maxBenefitIndv,maxBenefitFmly,deductAmountIndv,deductAmountFmly,deductApplToMailOrder,deductApplToDiabeticSense,outOfPocketAmountIndv,outOfPocketAmountFmly,outOfPocketAcumMailOrder,outOfPocketAcumDiabeticSense,coinsuranceStartAmt,coInsOOPMaxIndiv,coInsOOPMaxFamily,applicableCoveragePhases,accumDAWPenaltyInOOP ";
            if (view.down('#hdnSystemId').getValue() == "") {
                pFieldValue = '0';
            }
            else
                pFieldValue = view.down('#hdnSystemId').getValue();
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + view.down('#hdnPlanGroupId').getValue() + '|';
            if (view.down('#hdnPlanBenefitId').getValue() == "") {
                pFieldValue = pFieldValue + '0' + '|';
            }
            else
                pFieldValue = pFieldValue + view.down('#hdnPlanBenefitId').getValue() + '|';
            if (view.down('#txtPlanBenefitCode').getValue() != null) {
                pFieldValue = pFieldValue + view.down('#txtPlanBenefitCode').getValue();
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtPlanBenefitName').getValue() != null) {
                pFieldValue = pFieldValue + view.down('#txtPlanBenefitName').getValue();
            }
            pFieldValue = pFieldValue + '|';

            if (view.down('#txtEffDate').getValue() != null) {
                pFieldValue = pFieldValue + Ext.Date.format(view.down('#txtEffDate').getValue(), 'm/d/Y');
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtRenewalDate').getValue() != null) {
                pFieldValue = pFieldValue + Ext.Date.format(view.down('#txtRenewalDate').getValue(), 'm/d/Y');
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtTermDate').getValue() != null) {
                pFieldValue = pFieldValue + Ext.Date.format(view.down('#txtTermDate').getValue(), 'm/d/Y');
            }
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + view.down('#hdnBenefitStatus').getValue() + '|';
            pFieldValue = pFieldValue + view.down('#chkPassThruPricing').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkLICSSubsidy').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkOutOfNetwork').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkTransitionRefill').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkCopayRequired').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkEmergencyFill').checked + '|';
            if (view.down('#txtPartBCopayPercentage').getValue() != null) {
                pFieldValue = pFieldValue + view.down('#txtPartBCopayPercentage').getValue();
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#cbxDaysAllowedOnline').getValue() != null) {
                pFieldValue = pFieldValue + parseInt(view.down('#cbxDaysAllowedOnline').getValue());
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#cbxDaysAllowedReversal').getValue() != null) {
                pFieldValue = pFieldValue + parseInt(view.down('#cbxDaysAllowedReversal').getValue());
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#cbxDaysAllowedPaper').getValue() != null) {
                pFieldValue = pFieldValue + parseInt(view.down('#cbxDaysAllowedPaper').getValue());
            }
            pFieldValue = pFieldValue + '|';
            var cTemp = "";
            var prefPharmExclTierCodes = "";

            if (view.down('#cbxprefPharmExclTierCodes').getValue().length > 0) {
                var tc = view.down('#cbxprefPharmExclTierCodes').getValue();
                prefPharmExclTierCodes = view.down('#cbxprefPharmExclTierCodes').getValue().join();
            }
            /*for (var iCount = 0; iCount < prefPharmExclTierCodes.length; iCount++) {
             cTemp = cTemp + (cTemp != "" ? "," : "") + prefPharmExclTierCodes[iCount];
             }*/
            pFieldValue = pFieldValue + prefPharmExclTierCodes;
            pFieldValue = pFieldValue + '|';
            cTemp = "";
            var nonprefPharmExclTierCodes = "";
            if (view.down('#cbxnonprefPharmExclTierCodes').getValue().length > 0) {
                nonprefPharmExclTierCodes = view.down('#cbxnonprefPharmExclTierCodes').getValue().join();
            }
            /*for (var iCount = 0; iCount < nonprefPharmExclTierCodes.length; iCount++) {
             cTemp = cTemp + (cTemp != "" ? "," : "") + nonprefPharmExclTierCodes[iCount];
             }*/
            pFieldValue = pFieldValue + nonprefPharmExclTierCodes;
            pFieldValue = pFieldValue + '|';
            cTemp = "";
            var planDedExclTierCodes = "";
            if (view.down('#cbxPlanDedExclTierCodes').getValue().length > 0) {
                planDedExclTierCodes = view.down('#cbxPlanDedExclTierCodes').getValue().join();
            }
            /*for (var iCount = 0; iCount < planDedExclTierCodes.length; iCount++) {
             cTemp = cTemp + (cTemp != "" ? "," : "") + planDedExclTierCodes[iCount];
             }*/
            pFieldValue = pFieldValue + planDedExclTierCodes;
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + view.down('#chkTraditional').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkSpecDrugAtSpecPharm').checked + '|';
            pFieldValue = pFieldValue + view.down('#chkEmbeddedDeductible').checked + '|';
            pFieldValue = pFieldValue + '0' + '|';
            pFieldValue = pFieldValue + '0' + '|';
            if (view.down('#txtCLMaxCopay').getValue() != null && view.down('#txtCLMaxCopay').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtCLMaxCopay').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtCLDMRProcessedBy').getValue() != null) {
                pFieldValue = pFieldValue + view.down('#txtCLDMRProcessedBy').getValue();
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtMAXIndividual').getValue() != null && view.down('#txtMAXIndividual').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtMAXIndividual').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtMAXFamily').getValue() != null && view.down('#txtMAXFamily').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtMAXFamily').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtDeductIndividual').getValue() != null && view.down('#txtDeductIndividual').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtDeductIndividual').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtDeductFamily').getValue() != null && view.down('#txtDeductFamily').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtDeductFamily').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + 'True' + '|';
            pFieldValue = pFieldValue + 'True' + '|';
            // pFieldValue = pFieldValue + 'True' + '|';
            if (view.down('#txtOOPIndividual').getValue() != null && view.down('#txtOOPIndividual').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtOOPIndividual').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';

            if (view.down('#txtOOPFamily').getValue() != null && view.down('#txtOOPFamily').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtOOPFamily').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + 'True' + '|';
            pFieldValue = pFieldValue + 'True' + '|';
            if (view.down('#txtcoinsuranceStartAmt').getValue() != null && view.down('#txtcoinsuranceStartAmt').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtcoinsuranceStartAmt').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtMaxCoInsuranceIndiv').getValue() != null && view.down('#txtMaxCoInsuranceIndiv').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtMaxCoInsuranceIndiv').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            if (view.down('#txtMaxCoInsuranceFamily').getValue() != null && view.down('#txtMaxCoInsuranceFamily').getValue() != "") {
                pFieldValue = pFieldValue + parseFloat(view.down('#txtMaxCoInsuranceFamily').getValue().trim());
            }
            else {
                pFieldValue = pFieldValue + '0';
            }
            pFieldValue = pFieldValue + '|';
            pFieldValue = pFieldValue + applicableCoveragePhases;
            pFieldValue = pFieldValue + '|';
            if (view.down('#cbAccDAWPenalty').checked)
                pFieldValue = pFieldValue + 'yes';
            else
                pFieldValue = pFieldValue + 'no';
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var extraParameters = {
                'planBenefitId': view.down('#hdnPlanBenefitId').getValue(),
                'pFieldList': pFields,
                'pFields': pFieldValue
            };
            var returnField = ['pRetPlanBenefitId'];
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'plan/rx/planbenefitinfo/update', null, [false], extraParameters,
                saveAction, returnField);

            //debugger;

            if (this.PlanBenefitID == 0) {
                this.PlanBenefitID = parseInt(testReturn.pRetPlanBenefitId);
                view.down('#hdnPlanBenefitId').setValue(testReturn.pRetPlanBenefitId);
                view.up().down('#hdnParentPlanGroupId').setValue(view.down('#hdnPlanGroupId').getValue());
                view.up().down('#hdnParentPlanBenefitId').setValue(view.down('#hdnPlanBenefitId').getValue());
                view.up().down('#hdnParentPlanBenefitStatus').setValue(view.down('#hdnBenefitStatus').getValue());
            }
            //Set parent window hidden values and reload the Plab Benefit Dropdown.

            return true;
        }
        catch (ex) {
            console.log(ex.message);
            console.log(ex.stack);
            Ext.Msg.alert("Exception", ex.message);
        }
        return false;
    },
    UpdatePlanBenefitStatus_click: function () {
        //debugger;
        var view = this.getView();
        var benefitStatus = view.down('#btnActivate').getText();
        this.PlanBenefitID = parseInt(view.down('#hdnPlanBenefitId').getValue());
        this.PlanGroupID = parseInt(view.down('#hdnPlanGroupId').getValue());
        var applicableCoveragePhasesUpdate = "";
        if (view.down('#formDetails').isValid()) {
            if (view.down('#mcbApplicableCovePhase').getValue() != null) {
                applicableCoveragePhasesUpdate = view.down('#mcbApplicableCovePhase').getValue().trim('[').trim(']').replace("\"", "");
            }
            switch (benefitStatus.toLowerCase()) {
                case "activate":
                    //1. Save any modified data
                    //2. Validate Plan Benefit Setup
                    //3. Activate Plan Benefit
                    if (this.UpdatePlanBenefitInfo(applicableCoveragePhasesUpdate)) {
                        var model = Ext.create('Atlas.plan.model.validatePlanBenefitSetup');
                        var saveProxy = model.getProxy();
                        saveProxy.setExtraParam('PPLanBenefitId ', parseInt(view.down('#hdnPlanBenefitId').getValue()));
                        model.phantom = false;
                        model.load({
                            failure: function (record, operation) {
                            },
                            success: function (recorddata, operation) {

                                var planBenfitCombo = view.up('plan-benefits').lookupReference('planBenefitInfo');
                                planBenfitCombo.getSelection().set('benefitStatus',"A");
                                view.up('plan-benefits').benefitStatus ='A'


                            }

                        })


                    }
            }
        }
        else {
            Ext.Msg.alert('Benefits', 'Please enter Valid values');
        }
    }
});