Ext.define('Atlas.portals.hpmember.HealthRiskAssessmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.healthRiskAssessmentController',
    config: {},

    init: function () {
        var me = this,
            form = me.getView().getForm(),
            user = Ext.first('viewport').getViewModel().get('user'),
            refs = me.getReferences();

        refs.isPregnant.setDisabled(!(user.gender == 'F' && user.Age > 12 && user.Age < 50));
        refs.colorectalScreening.setDisabled(!(user.Age >= 50));
        form.findField('colorectalTestDate').setDisabled(!(user.Age >= 50));
        this.getHRA();
    },

    getUser: function () {
        var user = Ext.first('viewport').getViewModel().get('user');
        return user;
    },

    canEditHra: function () {
        var form = this.getView().getForm(),
            record = form.getRecord();

        form.updateRecord(record);

        if (record && record.data.completeDate) {
            return false; // there is a complete date - don't allow editing
        }
        else {
            return true;
        }
    },

    // Asynchronous call to get the sequence number
    getSeqNum: function () {
        var user = this.getUser();
        var response = Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            async: false,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/memberhraseqnum/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                pRecipientId: user.recipientId,
                userState: user.portalStateSelected
            })
        });

        var obj = Ext.decode(response.responseText);
        return obj.metadata.pSeqNum;
    },

    getHRA: function () {
        var me = this,
            user = me.getUser(),
            pSeqNum = this.getSeqNum(),
            form = me.getView().getForm(),
            ctl = me.getView().getController(),
            memberHraData = null;

        if (pSeqNum == 0) {
            // There is no HRA for this member, create an empty model with -1 as the sequence number
            memberHraData = Ext.create('Atlas.portals.hpmember.model.MemberHraData', {
                seqNum: -1,
                recipientId: user.recipientId,
                createUser: 'hpm'
            });
            memberHraData.phantom = false;
            form.loadRecord(memberHraData);
        }
        else {
            // There is an HRA for this member, go get it
            memberHraData = Ext.create('Atlas.portals.hpmember.model.MemberHraData');
            memberHraData.getProxy().extraParams = {
                pSeqNum: pSeqNum,
                pRecipientId: user.recipientId,
                pSessionID: user.sessionId,
                userState: user.portalStateSelected
            };
            memberHraData.load({
                    success: function (record, operation) {
                        // Transform the ^ delimited fields
                        ctl.transformRecordForClient(record);

                        // Load the record into the form
                        form.loadRecord(record);

                        ctl.disableFieldsIfHRAComplete();
                    }
                }
            );
        }
    },

    disableFieldsIfHRAComplete: function () {
        var me = this,
            ctl = me.getView().getController();

        if (!ctl.canEditHra()) {
            var card0 = Ext.getCmp('card-0');
            ctl.disableChildControls(card0, ctl);

            var card1 = Ext.getCmp('card-1');
            ctl.disableChildControls(card1, ctl);

            var card2 = Ext.getCmp('card-2');
            ctl.disableChildControls(card2, ctl);

            Ext.getCmp('save').setVisible(false);
            Ext.getCmp('saveSubmit').setVisible(false);
        }
    },

    disableChildControls: function (ctrl, ctl) {
        if (ctrl.items) {
            ctrl.items.each(function (item) {
                if (item.items) {
                    ctl.disableChildControls(item, ctl);
                }
                else {
                    item.setReadOnly(true);
                }
                return true;
            })
        }
    },

    navigate: function (panel, direction) {
        // This routine could contain business logic required to manage the navigation steps.
        // It would call setActiveItem as needed, manage navigation button state, handle any
        // branching logic that might be required, handle alternate actions like cancellation
        // or finalization, etc.  A complete wizard implementation could get pretty
        // sophisticated depending on the complexity required, and should probably be
        // done as a subclass of CardLayout in a real-world implementation.
        var layout = panel.getLayout();

        if (direction == 'prev' || direction == 'next') {
            layout[direction]();
        }
        else {
            layout.setActiveItem(direction);
        }

        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('move-next').setDisabled(!layout.getNext());
        Ext.getCmp('saveSubmit').setDisabled(layout.getNext() && !this.canEditHra()); // only enable this on the last page
        //Ext.getCmp('saveSubmit').setVisible(!layout.getNext()); // only show this on the last page - there is no visible config for a button!

        //save a draft, but only if the HRA is not complete
        if (this.canEditHra()) {
            this.onSubmit(panel);
        }
    },

    onSubmit: function (sender, e, eOpts) {
        var me = this,
            form = me.getView().getForm(),
            ctl = me.getView().getController(),
            record = form.getRecord(), // get the underlying model instance
            user = this.getUser();

        form.updateRecord(record); // update the record with the form data

        // this is for debugging purposes
        //this.dumpForm(record);

        this.transformRecordForServer(record);
        // save a draft of the form
        record.getProxy().setExtraParams({"pSessionID": user.sessionId, "userState": user.portalStateSelected});

        record.save({ // save the record to the server
            success: function (results, operation) {
                // If there was a new seqNum generated, update the form to reflect the new value
                if (record.data.seqNum == -1) {
                    var newSeqNum = ctl.getSeqNum();
                    form.findField('seqNum').setValue(newSeqNum)
                }

                // if this is the submit button, try to save the final version of the form
                if (sender.id == 'saveSubmit') // is there a better way to check this? We only want to do the final save if this is a submit.
                {
                    // // clear invalid fields
                    // form.getFields().each(function (item){
                    //     item.clearInvalid();
                    // });

                    ctl.validateAndSubmit(form, user);
                }
                else {
                    Ext.Msg.alert('Success', 'Draft saved.');
                }
            },
            failure: function (results, operation) {
                Ext.Msg.alert('Failure', ' errors: ' + operation.error);
            }
        });
    },

    validateAndSubmit: function (form, user) {
        // To save the final form, call validatecompletedhraweb
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/validatecompletedhraweb/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                pParameters: user.recipientId + '|' + form.getValues().seqNum + '|hpm', //  sending hpm as the user id since the backend can't handle the memberId
                userState: user.portalStateSelected
            }),
            scope: this,
            success: function (response, opts) {
                // Need to check the response.  This call will succeed, but might still fail validation.
                var me = this,
                    resp = null;
                try {
                    // this respsone text returns invalid JSON when there is a successful save.
                    resp = Ext.JSON.decode(response.responseText);
                }
                catch (e) {
                    //<debug>
                    console.log(e);
                    //</debug>
                }


                if (resp && resp.message[0].code == 400) {
                    // there were server side validation errors
                    //<debug>
                    console.log('***** server side validation errors *****');
                    //</debug>
                    for (var i = 0; i < resp.data.length; i++) {
                        var fieldName = resp.data[i].fieldName;
                        if (fieldName == 'colorectalTestDate'){
                            fieldName = 'colorectalScreening'
                        }

                        var field = me.lookupReference(fieldName);
                        if (field) {
                            if (field.reference == 'howLongPhysician'){
                                form.findField('howLongPhysicianYear').markInvalid('Please enter the number of years or months you have been with this physician.');
                                form.findField('howLongPhysicianMonth').markInvalid('Please enter the number of years or months you have been with this physician.');
                            }
                            else {
                                field.markInvalid(resp.data[i].reason);
                            }
                        }
                        else {
                            //<debug>
                            console.log(resp.data[i]);
                            //</debug>
                        }
                    }
                    Ext.Msg.alert('Error', 'Please answer required questions.');
                }
                else { // success?
                    // need to set the complete date to disable the form
                    form.findField('completeDate').setValue(new Date());

                    this.disableFieldsIfHRAComplete();

                    var successMessage = 'We appreciate you taking the time to complete this survey.  Your answers will help Meridian ' +
                        'provide better services and assist us with coordinating your care.<br /><br />Your survey answers ' +
                        'will be available to you anytime online for review.\<br /><br /><div style=\'text-align:center;\'>Thank You!</div>';

                    Ext.Msg.alert('** Health Risk Assessment Survey Submitted **', successMessage);
                }
            },
            failure: function (results, operation) {
                Ext.Msg.alert('Failure', ' errors: ' + operation.error);
            }
        })
        ;
    },

    /* convert array columns to ^ delimited string */
    transformRecordForServer: function (record) {
        if (Array.isArray(record.data.medicalConditions)) {
            record.data.medicalConditions = record.data.medicalConditions.join('^');
        }
        if (Array.isArray(record.data.adultEquipment)) {
            record.data.adultEquipment = record.data.adultEquipment.join('^');
        }
        if (Array.isArray(record.data.hraMentalHealth)) {
            record.data.hraMentalHealth = record.data.hraMentalHealth.join('^');
        }
        if (Array.isArray(record.data.streetDrugsUsed)) {
            record.data.streetDrugsUsed = record.data.streetDrugsUsed.join('^');
        }
    },

    /* convert ^ delimited string columns to arrays */
    transformRecordForClient: function (record) {
        record.data.medicalConditions = record.data.medicalConditions.split('^');
        record.data.adultEquipment = record.data.adultEquipment.split('^');
        record.data.hraMentalHealth = record.data.hraMentalHealth.split('^');
        record.data.streetDrugsUsed = record.data.streetDrugsUsed.split('^');
    },

    dumpForm: function (record) {
        console.log('receivedGoldPlanCard := ' + record.data.receivedGoldPlanCard);
        console.log('currentlyLive := ' + record.data.currentlyLive);
        console.log('nameOfAssistedLivingFacility := ' + record.data.nameOfAssistedLivingFacility);
        console.log('englishPrimaryLanguage := ' + record.data.englishPrimaryLanguage);
        console.log('whatIsPrimaryLanguage := ' + record.data.whatIsPrimaryLanguage);
        console.log('culturalEthnicOrigin := ' + record.data.culturalEthnicOrigin);
        console.log('otherCulturalEthnicOrigin := ' + record.data.otherCulturalEthnicOrigin);
        console.log('patHeightFeet := ' + record.data.patHeightFeet);
        console.log('patHeightInches := ' + record.data.patHeightInches);
        console.log('patWeight := ' + record.data.patWeight);
        console.log('isPregnant := ' + record.data.isPregnant);
        console.log('dueDate := ' + record.data.dueDate);
        console.log('powerOfAttorneyHra := ' + record.data.powerOfAttorneyHra);
        console.log('livingWillHra := ' + record.data.livingWillHra);
        console.log('providerNameMedicalCare := ' + record.data.providerNameMedicalCare);
        console.log('howLongPhysicianYear := ' + record.data.howLongPhysicianYear);
        console.log('howLongPhysicianMonth := ' + record.data.howLongPhysicianMonth);
        console.log('hasAppt := ' + record.data.hasAppt);
        console.log('pcpApptDate := ' + record.data.pcpApptDate);
        console.log('careOfSpecialist := ' + record.data.careOfSpecialist);
        console.log('specialistName := ' + record.data.specialistName);
        console.log('specialistSpecialty := ' + record.data.specialistSpecialty);
        console.log('hasOtherInsurance := ' + record.data.hasOtherInsurance);
        console.log('otherInsuranceCarrier := ' + record.data.otherInsuranceCarrier);
        console.log('otherInsurancePolicyNum := ' + record.data.otherInsurancePolicyNum);
        console.log('otherInsuranceEffectiveDate := ' + record.data.otherInsuranceEffectiveDate);
        console.log('overallHealth := ' + record.data.overallHealth);
        console.log('fruitsVegetables := ' + record.data.fruitsVegetables);
        console.log('fluShot := ' + record.data.fluShot);
        console.log('colorectalScreening := ' + record.data.colorectalScreening);
        console.log('colorectalTestDate := ' + record.data.colorectalTestDate);
        console.log('Page 2');
        console.log('hasAsthma := ' + record.data.hasAsthma);
        console.log('hasAsthmaCondition := ' + record.data.hasAsthmaCondition);
        console.log('hasEmphysima := ' + record.data.hasEmphysima);
        console.log('hasEmphysimaCondition := ' + record.data.hasEmphysimaCondition);
        console.log('hasHeartDisease := ' + record.data.hasHeartDisease);
        console.log('hasHeartDiseaseCondition := ' + record.data.hasHeartDiseaseCondition);
        console.log('heartAttack := ' + record.data.heartAttack);
        //console.log('hasHeartAttackCondition := ' + record.data.hasHeartAttackCondition); // no confidence level
        console.log('hasHighBloodPressure := ' + record.data.hasHighBloodPressure);
        console.log('hasHighBloodPressureCondition := ' + record.data.hasHighBloodPressureCondition);
        console.log('hasCongestiveHeartFailure := ' + record.data.hasCongestiveHeartFailure);
        console.log('hasCHFCondition := ' + record.data.hasCHFCondition);
        console.log('hadStroke := ' + record.data.hadStroke);
        //console.log('hadStrokeCondition := ' + record.data.hadStrokeCondition);
        console.log('hasDiabetes := ' + record.data.hasDiabetes);
        console.log('hasDiabetesCondition := ' + record.data.hasDiabetesCondition);
        console.log('hasKidneyProblem := ' + record.data.hasKidneyProblem);
        console.log('hasKidneyProblemCondition := ' + record.data.hasKidneyProblemCondition);
        console.log('hasCancer := ' + record.data.hasCancer);
        console.log('hasCancerCondition := ' + record.data.hasCancerCondition);
        console.log('hasVisionProblem := ' + record.data.hasVisionProblem);
        //console.log('hasVisionProblemCondition := ' + record.data.hasVisionProblemCondition);
        console.log('hasHearingProblem := ' + record.data.hasHearingProblem);
        //console.log('hasHearingProblemCondition := ' + record.data.hasHearingProblemCondition);
        console.log('medicalConditions := ' + record.data.medicalConditions);
        console.log('hasMemoryLoss := ' + record.data.hasMemoryLoss);
        console.log('treatedChronicPain := ' + record.data.treatedChronicPain);
        console.log('chronicPainOptions := ' + record.data.chronicPainOptions);
        console.log('erPast12months := ' + record.data.erPast12months);
        console.log('patientHospMedicalCondition := ' + record.data.patientHospMedicalCondition);
        console.log('phyClinicPast12months := ' + record.data.phyClinicPast12months);
        console.log('overnightPsychHospital := ' + record.data.overnightPsychHospital);
        console.log('therapistPsychVisits := ' + record.data.therapistPsychVisits);
        console.log('snfPast12Months := ' + record.data.snfPast12Months);
        console.log('haveFallen := ' + record.data.haveFallen);
        console.log('afraidOfFalling := ' + record.data.afraidOfFalling);
        console.log('shopPersonalItems := ' + record.data.shopPersonalItems);
        console.log('prepareMeals := ' + record.data.prepareMeals);
        console.log('manageMoney := ' + record.data.manageMoney);
        console.log('walkAcrossRoom := ' + record.data.walkAcrossRoom);
        console.log('bathOrShower := ' + record.data.bathOrShower);
        console.log('goingToWork := ' + record.data.goingToWork);
        console.log('hasTroubleTakingMedications := ' + record.data.hasTroubleTakingMedications);
        console.log('needHelpBecauseHealthProblems := ' + record.data.needHelpBecauseHealthProblems);
        console.log('hasEquipmentNeeds := ' + record.data.hasEquipmentNeeds);
        console.log('adultEquipment := ' + record.data.adultEquipment);
        console.log('feelsHelpless := ' + record.data.feelsHelpless);
        console.log('littleInterest := ' + record.data.littleInterest);
        console.log('hraMentalHealth := ' + record.data.hraMentalHealth);
        console.log('takeMedications := ' + record.data.takeMedications);
        console.log('howManyMeds := ' + record.data.howManyMeds);
        console.log('troubleTakingMeds := ' + record.data.troubleTakingMeds);
        console.log('takeHerbalSupplement := ' + record.data.takeHerbalSupplement);
        console.log('doesSmoke := ' + record.data.doesSmoke);
        console.log('packsPerDay := ' + record.data.packsPerDay);
        console.log('glassesPerDay := ' + record.data.glassesPerDay);
        console.log('useStreetDrugs := ' + record.data.useStreetDrugs);
        console.log('streetDrugsUsed := ' + record.data.streetDrugsUsed);
    },

    onCurrentlyLiveChange: function (sender, newValue, oldValue, eOpts) {
        var assistedLivingFacility = sender.up('form').down('[reference=nameOfAssistedLivingFacility]');

        if (newValue.currentlyLive == '01') { // own home
            assistedLivingFacility.reset();
            assistedLivingFacility.disable();
        }
        else {
            assistedLivingFacility.enable();
        }
    },

    onEnglishPrimaryLanguageChange: function (sender, newValue, oldValue, eOpts) {
        var primaryLanguageGroup = sender.up('form').down('[reference=whatIsPrimaryLanguage]');
        var otherPrimaryLanguage = sender.up('form').down('[reference=otherPrimaryLanguage]');

        if (newValue.englishPrimaryLanguage == 'N') {
            primaryLanguageGroup.enable();
            if (primaryLanguageGroup.getValue().whatIsPrimaryLanguage == '10') {//other
                otherPrimaryLanguage.enable();
            }
        }
        else {
            primaryLanguageGroup.reset();
            primaryLanguageGroup.disable();
            otherPrimaryLanguage.reset();
            otherPrimaryLanguage.disable();
        }
    },

    onPrimaryLanguageChange: function (sender, newValue, oldValue, eOpts) {
        var otherPrimaryLanguage = sender.up('form').down('[reference=otherPrimaryLanguage]');

        if (newValue.whatIsPrimaryLanguage == '10') { // primary language - other
            otherPrimaryLanguage.enable();
        }
        else {
            otherPrimaryLanguage.reset();
            otherPrimaryLanguage.disable();
        }
    },

    onCulturalEthnicOriginGroupChange: function (sender, newValue, oldValue, eOpts) {
        var otherCulturalEthnicOrigin = sender.up('form').down('[reference=otherCulturalEthnicOrigin]');

        if (newValue.culturalEthnicOrigin == '09') { // ethnicity - other
            otherCulturalEthnicOrigin.enable();
        }
        else {
            otherCulturalEthnicOrigin.reset();
            otherCulturalEthnicOrigin.disable();
        }
    },

    onIsPregnantChange: function (sender, newValue, oldValue, eOpts) {
        var dueDate = sender.up('form').down('[reference=dueDate]');

        if (newValue.isPregnant == 'Y') {
            dueDate.enable();
        }
        else {
            dueDate.reset();
            dueDate.disable();
        }
    },

    onHasApptChange: function (sender, newValue, oldValue, eOpts) {
        var pcpApptDate = sender.up('form').down('[reference=pcpApptDate]');

        if (newValue.hasAppt == 'Y') {
            pcpApptDate.enable();
        }
        else {
            pcpApptDate.reset();
            pcpApptDate.disable();
        }
    },

    onCareOfSpecialistChange: function (sender, newValue, oldValue, eOpts) {
        var specialistName = sender.up('form').down('[reference=specialistName]');
        var specialistSpecialty = sender.up('form').down('[reference=specialistSpecialty]');

        if (newValue.careOfSpecialist == 'Y') {
            specialistName.enable();
            specialistSpecialty.enable();
        }
        else {
            specialistName.reset();
            specialistName.disable();
            specialistSpecialty.reset();
            specialistSpecialty.disable();
        }
    },

    onHasOtherInsuranceChange: function (sender, newValue, oldValue, eOpts) {
        var otherInsuranceContainer = sender.up('form').down('[reference=otherInsuranceContainer]');
        var otherInsuranceCarrier = sender.up('form').down('[reference=otherInsuranceCarrier]');
        var otherInsurancePolicyNum = sender.up('form').down('[reference=otherInsurancePolicyNum]');
        var otherInsuranceEffectiveDate = sender.up('form').down('[reference=otherInsuranceEffectiveDate]');

        if (newValue.hasOtherInsurance == 'Y') {
            otherInsuranceContainer.enable();
        }
        else {
            otherInsuranceEffectiveDate.reset();
            otherInsuranceCarrier.reset();
            otherInsurancePolicyNum.reset();
            otherInsuranceContainer.disable();
        }
    },

    onColorectalScreeningChange: function (sender, newValue, oldValue, eOpts) {
        var colorectalTestDate = sender.up('form').down('[reference=colorectalTestDate]');

        if (newValue.colorectalScreening == '01' || newValue.colorectalScreening == '02' || newValue.colorectalScreening == '03') {
            colorectalTestDate.enable();
        }
        else {
            colorectalTestDate.reset();
            colorectalTestDate.disable();
        }
    },

    onConditionChanged: function (sender, newValue, oldValue, eOpts) {
        var form = sender.up('form'),
            target,
            condition;

        // need to deal with a one off name
        if (sender.name == 'hasCongestiveHeartFailure') {
            target = 'hasCHFCondition';
        }
        else {
            target = sender.name + 'Condition';
        }
        condition = form.down('[reference=' + target + ']');

        if (condition != null) {
            if (newValue) {
                condition.enable();
            }
            else {
                condition.disable();
            }
        }
    },

    onConditionChangedOriginal: function (sender, newValue, oldValue, eOpts) {
        var form = sender.up('form');
        var condition = form.down('[reference=' + sender.name + 'Condition]');

        if (condition != null) {
            if (newValue) {
                condition.enable();
            }
            else {
                condition.disable();
            }
        }
    },

    onHasMedicalConditionsChange: function (sender, newValue, oldValue, eOpts) {
        var hasMedicalConditionsGroup = sender.up('form').down('[reference=medicalConditions]');
        var medicalConditionsOther = sender.up('form').down('[reference=medicalConditionsOther]');

        if (newValue.hasMedicalConditions == 'Y') {
            hasMedicalConditionsGroup.enable();
        }
        else {
            hasMedicalConditionsGroup.reset();
            hasMedicalConditionsGroup.disable();
            medicalConditionsOther.reset();
            medicalConditionsOther.disable();
        }
    },

    onMedicalConditionsOtherChange: function (sender, newValue, oldValue, eOpts) {
        var medicalConditionsOther = sender.up('form').down('[reference=medicalConditionsOther]');

        if (newValue == true) { // primary language - other
            medicalConditionsOther.enable();
        }
        else {
            medicalConditionsOther.reset();
            medicalConditionsOther.disable();
        }
    },

    onTreatedChronicPainChange: function (sender, newValue, oldValue, eOpts) {
        var chronicPainOptionsGroup = sender.up('form').down('[reference=chronicPainOptionsGroup]');

        if (newValue.treatedChronicPain == 'Y') {
            chronicPainOptionsGroup.enable();
        }
        else {
            chronicPainOptionsGroup.reset();
            chronicPainOptionsGroup.disable();
        }
    },

    onHasEquipmentNeedsChange: function (sender, newValue, oldValue, eOpts) {
        var adultEquipmentGroup = sender.up('form').down('[reference=adultEquipment]');

        if (newValue.hasEquipmentNeeds == 'Y') {
            adultEquipmentGroup.enable();
        }
        else {
            adultEquipmentGroup.reset();
            adultEquipmentGroup.disable();
        }
    },

    onTakeMedicationsChange: function (sender, newValue, oldValue, eOpts) {
        var howManyMedsGroup = sender.up('form').down('[reference=howManyMeds]');
        var troubleTakingMeds = sender.up('form').down('[reference=troubleTakingMeds]');

        if (newValue.takeMedications == 'Y') {
            howManyMedsGroup.enable();
            troubleTakingMeds.enable();
        }
        else {
            howManyMedsGroup.reset();
            howManyMedsGroup.disable();

            troubleTakingMeds.reset();
            troubleTakingMeds.disable();
        }
    },

    onDoesSmokeChange: function (sender, newValue, oldValue, eOpts) {
        var packsPerDayGroup = sender.up('form').down('[reference=packsPerDayGroup]');

        if (newValue.doesSmoke == '02' || newValue.doesSmoke == '03') {
            packsPerDayGroup.enable();
        }
        else {
            packsPerDayGroup.reset();
            packsPerDayGroup.disable();
        }
    },

    useStreetDrugsChange: function (sender, newValue, oldValue, eOpts) {
        var streetDrugsUsedGroup = sender.up('form').down('[reference=streetDrugsUsed]');

        if (newValue.useStreetDrugs == 'Y') {
            streetDrugsUsedGroup.enable();
        }
        else {
            streetDrugsUsedGroup.reset();
            streetDrugsUsedGroup.disable();
        }
    },

    physicianMonthChange: function(sender) {
        this.getView().getForm().findField('howLongPhysicianYear').clearInvalid();
        this.getView().getForm().findField('howLongPhysicianMonth').clearInvalid();
    }
});