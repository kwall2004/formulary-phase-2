Ext.define('Atlas.portals.hpmember.model.MemberHraData', {
    //extend: 'Atlas.common.model.StaticBase',
    extend: 'Atlas.common.model.Base',

    fields: [
        'recipientId',
        'seqNum',
        'hraType',
        'createUser',
        'createTime',
        'createDate',
        'completeDate',
        'completeTime',
        'completeUser',
        'pcpId',
        'receivedGoldPlanCard',
        'currentlyLive',
        'nameOfAssistedLivingFacility',
        'englishPrimaryLanguage',
        'whatIsPrimaryLanguage',
        'otherPrimaryLanguage',
        'culturalEthnicOrigin',
        'otherCulturalEthnicOrigin',
        'patHeightFeet',
        'patHeightInches',
        'patWeight',
        'isPregnant',
        {
            name: 'dueDate',
            type: 'date',
            dateReadFormat: 'm/d/y',
            dateWriteFormat: 'm/d/Y'
        },
        'powerOfAttorneyHra',
        'livingWillHra',
        'providerNameMedicalCare',
        'howLongPhysicianYear',
        'howLongPhysicianMonth',
        'hasAppt',
        {
            name: 'pcpApptDate',
            type: 'date',
            dateReadFormat: 'm/d/y',
            dateWriteFormat: 'm/d/Y'
        },
        'careOfSpecialist',
        'specialistName',
        'specialistSpecialty',
        'hasOtherInsurance',
        'otherInsuranceCarrier',
        'otherInsurancePolicyNum',
        {
            name: 'otherInsuranceEffectiveDate',
            persist: true,
            type: 'date',
            dateReadFormat: 'm/d/y',
            dateWriteFormat: 'm/d/Y'
        },
        'overallHealth',
        'fruitsVegetables',
        {
            name: 'fluDate',
            persist: true,
            type: 'date',
            dateReadFormat: 'm/d/y',
            dateWriteFormat: 'm/d/Y'
        },
        'fluShot',
        {
            name: 'colorectalTestDate',
            persist: true,
            type: 'date',
            dateReadFormat: 'm/d/y',
            dateWriteFormat: 'm/d/Y'
        },
        'colorectalScreening',
        'hasAsthma',
        'hasAsthmaCondition',
        'hasEmphysima',
        'hasEmphysimaCondition',
        'hasHeartDisease',
        'hasHeartDiseaseCondition',
        'heartAttack',
        'hasHighBloodPressure',
        'hasHighBloodPressureCondition',
        'hasCongestiveHeartFailure',
        'hasCHFCondition',
        'hadStroke',
        'hadStrokeCondition',
        'hasDiabetes',
        'hasDiabetesCondition',
        'hasKidneyProblem',
        'hasKidneyProblemCondition',
        'hasCancer',
        'hasCancerCondition',
        'hasVisionProblem', 'hasVisionProblemCondition',
        'hasHearingProblem',
        'hasHearingProblemCondition',
        'hasMedicalConditions',
        'medicalConditions',
        'medicalConditionsOther',
        'hasMemoryLoss',
        'treatedChronicPain',
        'chronicPainOptions',
        'erPast12months',
        'patientHospMedicalCondition',
        'phyClinicPast12months',
        'overnightPsychHospital',
        'therapistPsychVisits',
        'snfPast12Months',
        'haveFallen',
        'afraidOfFalling',
        'shopPersonalItems',
        'prepareMeals',
        'manageMoney',
        'walkAcrossRoom',
        'bathOrShower',
        'goingToWork',
        'hasTroubleTakingMedications',
        'needHelpBecauseHealthProblems',
        'hasEquipmentNeeds',
        'adultEquipment',
        'feelsHelpless',
        'littleInterest',
        'hraMentalHealth',
        'takeMedications',
        'howManyMeds',
        'troubleTakingMeds',
        'takeHerbalSupplement',
        'doesSmoke',
        'packsPerDay',
        'glassesPerDay',
        'useStreetDrugs',
        'streetDrugsUsed',
        'dbRowID',
        'rowNum'
    ],

    proxy: {
        //url: 'resources/data/dummydata/portals/member/hra.json'
        url: 'portal/hp/memberhradatastdweb',
        writer: {
            type: 'json',
            transform: function (data, request) {
                // since disabled fields are not posted, we need to clear out the values for 'other' textboxes if a specific value is selected

                // currently live
                if (data.currentlyLive == '01') { // own home
                    data.nameOfAssistedLivingFacility = '';
                }

                // english primary language
                if (data.englishPrimaryLanguage != 'Y') {
                    if (data.whatIsPrimaryLanguage != '10') {//other
                        data.otherPrimaryLanguage = '';
                    }
                }
                else {
                    data.whatIsPrimaryLanguage = '';
                    data.otherPrimaryLanguage = '';
                }

                // other ethnic origin
                if (data.culturalEthnicOrigin != '09') { // ethnicity - other
                    data.otherCulturalEthnicOrigin = '';
                }

                // pregnant
                if (data.isPregnant != 'Y') {
                    data.dueDate = '';
                }

                // pcp appointment
                if (data.hasAppt != 'Y') {
                    data.pcpApptDate = '';
                }

                // specialist
                if (data.careOfSpecialist != 'Y') {
                    data.specialistName = '';
                    data.specialistSpecialty = '';
                }

                // other insurance
                if (data.hasOtherInsurance != 'Y') {
                    data.otherInsuranceEffectiveDate = '';
                    data.otherInsuranceCarrier = '';
                    data.otherInsurancePolicyNum = '';
                    data.otherInsuranceContainer = '';
                }

                // colorectal screening
                if (!(data.colorectalScreening == '01' || data.colorectalScreening == '02' || data.colorectalScreening == '03')) {
                    data.colorectalTestDate = '';
                }

                // have any of these conditions
                if (data.hasAsthma != 'Y') {
                    data.hasAsthmaCondition = 0;
                }
                if (data.hasEmphysima != 'Y') {
                    data.hasEmphysimaCondition = 0;
                }
                if (data.hasHeartDisease != 'Y') {
                    data.hasHeartDiseaseCondition = 0;
                }
                if (data.hasHighBloodPressure != 'Y') {
                    data.hasHighBloodPressureCondition = 0;
                }
                if (data.hasCongestiveHeartFailure != 'Y') {
                    data.hasCHFCondition = 0;
                }
                if (data.hasDiabetes != 'Y') {
                    data.hasDiabetesCondition = 0;
                }
                if (data.hasKidneyProblem != 'Y') {
                    data.hasKidneyProblemCondition = 0;
                }
                if (data.hasCancer != 'Y') {
                    data.hasCancerCondition = 0;
                }

                // other medical conditions
                if (data.hasMedicalConditions != 'Y') {
                    data.medicalConditions = '';
                }
                else {
                    // is other selected?
                    if (data.medicalConditions.indexOf('Other') == -1) {
                        data.medicalConditionsOther = '';
                    }
                }

                // takes medications
                if (data.takeMedications != 'Y') {
                    data.howManyMeds = '';
                }

                // use street drugs
                if (data.useStreetDrugs != 'Y') {
                    data.streetDrugsUsed = '';
                }

                // This is the good stuff.  The API is expecting the data to be in a property called TTweb
                return {
                    TTweb: data
                };
            }
        }
    }
});