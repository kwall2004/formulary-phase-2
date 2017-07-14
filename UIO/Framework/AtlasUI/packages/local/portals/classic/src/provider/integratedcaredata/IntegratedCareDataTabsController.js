/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.IntegratedCareDataTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.integratedcaredatatabscontroller',

    listen: {
        controller: {
            '*': {
                loadHeaderMemberDetail: 'loadHeaderMemberDetail',
                clearICDdata: 'clearICDdata'
            }
        }
    },

    clearICDdata: function(me, record){
        this.lookupReference('patientinformation').reset();
        this.getViewModel().get('NurseFacilityStore').removeAll();
        this.getViewModel().get('MedicationStore').removeAll();
        this.lookupReference('socialhistoryform').reset();
        this.getViewModel().get('LevelTwoAssessment').removeAll();
        this.lookupReference('leveliform').reset();
        this.lookupReference('initialscreeningform').reset();
        this.getViewModel().get('individualicplanstore').removeAll();
        this.getViewModel().get('CareTeamStore').removeAll();
        this.getViewModel().get('IntegratedConditionsStoreMed').removeAll();
        this.getViewModel().get('IntegratedConditionsStoreBehavior').removeAll();
        this.getViewModel().get('ContinuityOfCareStore').removeAll();

    },

    getNurseFacilityStore: function (me, record) {
        var nfRecord = record["0"].joined["0"].proxy.reader.metaData.tNFLevelOfCare.tNFLevelOfCare,
            nfArray = [];

        for (var i = 0; i < nfRecord.length; i++) {
            var individualArray = [];
            individualArray.push(nfRecord[i].comments);
            individualArray.push(nfRecord[i].endDate);
            individualArray.push(nfRecord[i].ICBRControlNum);
            individualArray.push(nfRecord[i].seqNum);
            individualArray.push(nfRecord[i].recipientID);
            individualArray.push(nfRecord[i].source);
            individualArray.push(nfRecord[i].NFLocation);
            individualArray.push(nfRecord[i].determinationStatus);
            individualArray.push(nfRecord[i].startDate);
            nfArray.push(individualArray);
        }

        if(nfArray === "" || nfArray === undefined || nfArray === null || nfArray.length === 0) {
            me.getViewModel().get('NurseFacilityStore').removeAll();
            return;
        }

        var nfStore = new Ext.data.ArrayStore({
            fields: ['comments', 'endDate', 'ICBRControlNum', 'seqNum', 'recipientID', 'source', 'NFLocation', 'determinationStatus', 'startDate'],
            data: nfArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('NurseFacilityStore', nfStore);
    },

    getMedicationStore: function (me, record) {
        var medRecord = record["0"].joined["0"].proxy.reader.metaData.tMedication.tMedication,
            medArray = [];

        for (var i = 0; i < medRecord.length; i++) {
            var individualArray = [];
            individualArray.push(medRecord[i].medicationName);
            individualArray.push(medRecord[i].medicationInfoSource);
            individualArray.push(medRecord[i].medicationInfoSourceText);
            individualArray.push(medRecord[i].assessmentOrigination);
            individualArray.push(medRecord[i].assessmentOriginationText);
            individualArray.push(medRecord[i].medForm);
            individualArray.push(medRecord[i].instructions);
            individualArray.push(medRecord[i].startDate);
            individualArray.push(medRecord[i].dosage);
            individualArray.push(medRecord[i].frequency);
            individualArray.push(medRecord[i].reason);
            individualArray.push(medRecord[i].diagType);
            individualArray.push(medRecord[i].route);
            individualArray.push(medRecord[i].prescribed);
            individualArray.push(medRecord[i].overTheCounterMed);
            individualArray.push(medRecord[i].herbalSupplements);
            individualArray.push(medRecord[i].prescribingProviderNPI);
            individualArray.push(medRecord[i].diagCode);
            individualArray.push(medRecord[i].NDC);
            individualArray.push(medRecord[i].quantity);
            individualArray.push(medRecord[i].fillDate);
            individualArray.push(medRecord[i].daysSupplied);
            medArray.push(individualArray);
        }

        if(medArray === "" || medArray === undefined || medArray === null || medArray.length === 0) {
            me.getViewModel().get('MedicationStore').removeAll();
            return;
        }

        var medStore = new Ext.data.ArrayStore({
            fields: ['medicationName', 'medicationInfoSource', 'medicationInfoSourceText', 'assessmentOrigination','assessmentOriginationText', 'medForm', 'instructions', 'startDate', 'dosage','frequency','reason','diagType','route','prescribed','overTheCounterMed','herbalSupplements','prescribingProviderNPI','diagCode','NDC','quantity','fillDate','daysSupplied'],
            data: medArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('MedicationStore', medStore);
    },

    getSocialStore: function (me, record) {
        var socialhistoryform = me.lookupReference('socialhistoryform');
        var socialRecord = record["0"].joined["0"].proxy.reader.metaData.tSocialHistory.tSocialHistory,
            socialArray = [];

        for (var i = 0; i < socialRecord.length; i++) {
            var individualArray = [];
            individualArray.push(socialRecord[i].memberEducation);
            individualArray.push(socialRecord[i].memberEmployment);
            individualArray.push(socialRecord[i].livingArrangement);
            individualArray.push(socialRecord[i].healthSafetyProblem);
            individualArray.push(socialRecord[i].correctionsStatus);
            individualArray.push(socialRecord[i].smokingStatus);
            individualArray.push(socialRecord[i].familyHistory);
            socialArray.push(individualArray);
        }

        if(socialArray === "" || socialArray === undefined || socialArray === null || socialArray.length === 0) {
            return;
        }

        var socialStore = new Ext.data.ArrayStore({
            fields: ['memberEducation', 'memberEmployment', 'livingArrangement', 'healthSafetyProblem', 'correctionsStatus', 'smokingStatus', 'familyHistory'],
            data: socialArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        socialhistoryform.loadRecord(socialStore.data.items[0]);
    },

    getLevelIIStore: function (me, record) {
        var level2Record = record["0"].joined["0"].proxy.reader.metaData.tLevelTwoAssessment.tLevelTwoAssessment,
            level2Array = [];

        for (var i = 0; i < level2Record.length; i++) {
            var individualArray = [];
            individualArray.push(level2Record[i].levelIIIDType);
            individualArray.push(level2Record[i].score);
            individualArray.push(level2Record[i].BHServiceRequired);
            individualArray.push(level2Record[i].advanceDirectives);

            var convertedDate = this.convertTimeStamp(level2Record[i].dateTimeStamp);
            individualArray.push(convertedDate);
            level2Array.push(individualArray);
        }

        if(level2Array === "" || level2Array === undefined || level2Array === null || level2Array.length === 0) {
            me.getViewModel().get('LevelTwoAssessment').removeAll();
            return;
        }

        var level2Store = new Ext.data.ArrayStore({
            fields: ['levelIIIDType', 'score', 'BHServiceRequired', 'advanceDirectives', 'dateTimeStamp'],
            data: level2Array,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('LevelTwoAssessment', level2Store);
    },

    convertTimeStamp: function(timestamp) {
        if(timestamp === null || timestamp === undefined || timestamp === "") {
            return;
        }

        var date = timestamp.substring(0,8);
        var month = timestamp.substring(0,2);
        var day = timestamp.substring(2,4);
        var year = timestamp.substring(4,8);

        var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date;
    },

    getLevelIStore: function (me, record) {
        var leveliform = me.lookupReference('leveliform');
        var leveliRecord = record["0"].joined["0"].proxy.reader.metaData.tLevelOneAssessment.tLevelOneAssessment,
            leveliArray = [];

        for (var i = 0; i < leveliRecord.length; i++) {
            var individualArray = [];
            individualArray.push(leveliRecord[i].littleInterest);
            individualArray.push(leveliRecord[i].feelingDown);
            individualArray.push(leveliRecord[i].feelingIrritated);
            individualArray.push(leveliRecord[i].sleepingLessLotsOfEnergy);
            individualArray.push(leveliRecord[i].feelingNervous);
            individualArray.push(leveliRecord[i].feelingPanic);
            individualArray.push(leveliRecord[i].avoidingSituations);
            individualArray.push(leveliRecord[i].unexplainedAchesAndPains);
            individualArray.push(leveliRecord[i].illnessesNotTakenSerious);
            individualArray.push(leveliRecord[i].thoughtsHurtingSelf);
            individualArray.push(leveliRecord[i].hearingThings);
            individualArray.push(leveliRecord[i].feelingHearingThoughts);
            individualArray.push(leveliRecord[i].problemsWithSleep);
            individualArray.push(leveliRecord[i].problemsWithMemory);
            individualArray.push(leveliRecord[i].drinksADay);
            individualArray.push(leveliRecord[i].smoking);
            individualArray.push(leveliRecord[i].usingMedsOnYourOwn);
            individualArray.push(leveliRecord[i].dateTimeStamp);
            leveliArray.push(individualArray);
        }

        if(leveliArray === "" || leveliArray === undefined || leveliArray === null || leveliArray.length === 0) {
            return;
        }

        var leveliStore = new Ext.data.ArrayStore({
            fields: ['littleInterest', 'feelingDown', 'feelingIrritated', 'sleepingLessLotsOfEnergy', 'feelingNervous', 'feelingPanic', 'avoidingSituations', 'unexplainedAchesAndPains', 'illnessesNotTakenSerious', 'thoughtsHurtingSelf', 'hearingThings', 'feelingHearingThoughts', 'problemsWithSleep', 'problemsWithMemory', 'drinksADay', 'smoking', 'usingMedsOnYourOwn',  'dateTimeStamp'],
            data: leveliArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        leveliform.loadRecord(leveliStore.data.items[0]);
    },

    getInitialScreeningData: function (me, record) {
        var initialform = me.lookupReference('initialscreeningform');
        var initialRecord = record["0"].joined["0"].proxy.reader.metaData.tInitialScreening.tInitialScreening,
            initialArray = [];

        for (var i = 0; i < initialRecord.length; i++) {
            var individualArray = [];
            individualArray.push(initialRecord[i].inHospitalLast90Days);
            individualArray.push(initialRecord[i].inEmergencyLast90Days);
            individualArray.push(initialRecord[i].physOccupTherapy);
            individualArray.push(initialRecord[i].useOxygenAtHome);
            individualArray.push(initialRecord[i].dialysis);
            individualArray.push(initialRecord[i].homeHealthServices);
            individualArray.push(initialRecord[i].currentLivingNursingHome);
            individualArray.push(initialRecord[i].assistanceWPerService);
            individualArray.push(initialRecord[i].hadAnyProblems);
            individualArray.push(initialRecord[i].DATETIME);
            initialArray.push(individualArray);
        }

        if(initialArray === "" || initialArray === undefined || initialArray === null || initialArray.length === 0) {
            return;
        }

        var initialStore = new Ext.data.ArrayStore({
            fields: ['inHospitalLast90Days', 'inEmergencyLast90Days', 'physOccupTherapy', 'useOxygenAtHome', 'dialysis', 'homeHealthServices', 'currentLivingNursingHome', 'assistanceWPerService', 'hadAnyProblems', 'DATETIME'],
            data: initialArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });


        initialform.loadRecord(initialStore.data.items[0]);
    },

    getIndividualICPlanStore: function (me, record) {
        var icpRecord = record["0"].joined["0"].proxy.reader.metaData.tICP.tICP,
            icpArray = [];

        for (var i = 0; i < icpRecord.length; i++) {
            var individualArray = [];
            individualArray.push(icpRecord[i].ICPDueByDate);
            individualArray.push(icpRecord[i].ICPStartDate);
            individualArray.push(icpRecord[i].ICPProblem);
            individualArray.push(icpRecord[i].ICPBarriers);
            individualArray.push(icpRecord[i].ICPStrengths);
            individualArray.push(icpRecord[i].ICPPriority);
            individualArray.push(icpRecord[i].ICPGoal);
            individualArray.push(icpRecord[i].ICPGoalType);
            individualArray.push(icpRecord[i].ICPIntervention);
            individualArray.push(icpRecord[i].ICPGoalStatus);
            individualArray.push(icpRecord[i].ICPGoalStartDate);
            individualArray.push(icpRecord[i].ICPGoalEndDate);
            individualArray.push(icpRecord[i].ICPDeclineDate);
            individualArray.push(icpRecord[i].ICPTimeForCompletion);
            icpArray.push(individualArray);
        }

        if(icpArray === "" || icpArray === undefined || icpArray === null || icpArray.length === 0) {
            me.getViewModel().get('individualicplanstore').removeAll();
            return;
        }

        var icpStore = new Ext.data.ArrayStore({
            fields: ['ICPDueByDate', 'ICPStartDate', 'ICPProblem', 'ICPBarriers', 'ICPStrengths', 'ICPPriority', 'ICPGoal', 'ICPGoalType', 'ICPIntervention', 'ICPGoalStatus', 'ICPGoalStartDate', 'ICPGoalEndDate', 'ICPDeclineDate', 'ICPTimeForCompletion'],
            data: icpArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('individualicplanstore', icpStore);

    },

    getCareTeamStore: function (me, record) {
        var careTeamRecord = record["0"].joined["0"].proxy.reader.metaData.tCareTeam.tCareTeam,
            careTeamArray = [];

        for (var i = 0; i < careTeamRecord.length; i++) {
            var individualArray = [];
            individualArray.push(careTeamRecord[i].ICTFirstName);
            individualArray.push(careTeamRecord[i].ICTLastName);
            individualArray.push(careTeamRecord[i].ICTRelationShip);
            individualArray.push(careTeamRecord[i].ICTAddress);
            individualArray.push(careTeamRecord[i].ICTCity);
            individualArray.push(careTeamRecord[i].ICTState);
            individualArray.push(careTeamRecord[i].ICTZipCode);
            individualArray.push(careTeamRecord[i].ICTPhoneNumber);
            individualArray.push(careTeamRecord[i].ICTPhoneExt);
            individualArray.push(careTeamRecord[i].ICTFaxNumber);
            individualArray.push(careTeamRecord[i].ICTEmail);
            individualArray.push(careTeamRecord[i].ICTProviderOrg);
            individualArray.push(careTeamRecord[i].ICTProviderSpecialty);
            individualArray.push(careTeamRecord[i].ICTDateOfService);
            individualArray.push(careTeamRecord[i].ICTTaxonomy);
            individualArray.push(careTeamRecord[i].ICTNPI);
            careTeamArray.push(individualArray);
        }

        if(careTeamArray === "" || careTeamArray === undefined || careTeamArray === null || careTeamArray.length === 0) {
            me.getViewModel().get('CareTeamStore').removeAll();
            return;
        }

        var careTeamStore = new Ext.data.ArrayStore({
            fields: ['ICTFirstName', 'ICTLastName', 'ICTRelationShip', 'ICTAddress', 'ICTCity', 'ICTState', 'ICTZipCode', 'ICTPhoneNumber', 'ICTPhoneExt', 'ICTFaxNumber', 'ICTEmail', 'ICTProviderOrg', 'ICTProviderSpecialty', 'ICTDateOfService', 'ICTTaxonomy', 'ICTNPI'],
            data: careTeamArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('CareTeamStore', careTeamStore);
    },

    getIntegratedConditionStore: function(me, record) {

        var integratedConditionRecord = record["0"].joined["0"].proxy.reader.metaData.tIC.tIC,
            integratedConditionMedArray = [],
            integratedConditionBehaviorArray = [];

        for (var i = 0; i < integratedConditionRecord.length; i++) {
            var individualArray = [];
            individualArray.push(integratedConditionRecord[i].diagCodes);
            individualArray.push(integratedConditionRecord[i].diagDescription);
            individualArray.push(integratedConditionRecord[i].diagType);
            individualArray.push(integratedConditionRecord[i].dateOfService);
            individualArray.push(integratedConditionRecord[i].NPI);
            individualArray.push(integratedConditionRecord[i].conditionSource);
            individualArray.push(integratedConditionRecord[i].dateOfServiceBH);
            individualArray.push(integratedConditionRecord[i].NPIBH);

            if(integratedConditionRecord[i].conditionSource === "1"){
                integratedConditionMedArray.push(individualArray);
                continue;
            }

            integratedConditionBehaviorArray.push(individualArray);
        }

        if(integratedConditionMedArray !== "" || integratedConditionMedArray !== undefined || integratedConditionMedArray !== null || integratedConditionMedArray.length !== 0) {
            var integratedConditionMedStore = new Ext.data.ArrayStore({
                fields: ['diagCodes', 'diagDescription', 'diagType', 'dateOfService', 'NPI', 'conditionSource', 'dateOfServiceBH', 'NPIBH'],
                data: integratedConditionMedArray,
                pageSize: 15,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });


            me.getViewModel().set('IntegratedConditionsStoreMed', integratedConditionMedStore);


        }

        if(integratedConditionBehaviorArray !== "" || integratedConditionBehaviorArray !== undefined || integratedConditionBehaviorArray !== null || integratedConditionBehaviorArray.length !== 0) {
            var integratedConditionBehaviorStore = new Ext.data.ArrayStore({
                fields: ['diagCodesBehavior', 'diagDescriptionBehavior', 'diagTypeBehavior', 'dateOfServiceBehavior', 'NPIBehavior', 'conditionSourceBehavior', 'dateOfServiceBHBehavior', 'NPIBHBehavior'],
                data: integratedConditionBehaviorArray,
                pageSize: 15,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });

            me.getViewModel().set('IntegratedConditionsStoreBehavior', integratedConditionBehaviorStore);
        }

        if(integratedConditionMedArray.length < 1) {
            me.getViewModel().get('IntegratedConditionsStoreMed').removeAll();

        }

        if(integratedConditionBehaviorArray.length < 1) {
            me.getViewModel().get('IntegratedConditionsStoreBehavior').removeAll();

        }
    },

    getContinuityStore: function(me, record) {
        var continuityRecord = record["0"].joined["0"].proxy.reader.metaData.tContinuityOfCare.tContinuityOfCare,
            continuityArray = [];

        for (var i = 0; i < continuityRecord.length; i++) {
            var individualArray = [];
            individualArray.push(continuityRecord[i].waiveredServices);
            individualArray.push(continuityRecord[i].allergies);
            continuityArray.push(individualArray);
        }

        if(continuityArray === "" || continuityArray === undefined || continuityArray === null || continuityArray.length === 0) {
            me.getViewModel().get('ContinuityOfCareStore').removeAll();
            return;
        }

        var continuityStore = new Ext.data.ArrayStore({
            fields: ['waiveredServices', 'allergies'],
            data: continuityArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('ContinuityOfCareStore', continuityStore);
    },

    loadHeaderMemberDetail: function(record) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = vm.get('recipientId'),
            portalDetailStore = vm.getStore('portalDetailStore');

        portalDetailStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        portalDetailStore.getProxy().setExtraParam('pRecipientID',record.data.recipientID);
        portalDetailStore.getProxy().setExtraParam('pControlNum', record.data.ICBRControlNum);
        portalDetailStore.getProxy().setExtraParam('pSource', 'portal');
        portalDetailStore.load({
            callback: function(record) {
                var patientinformationform = me.lookupReference('patientinformation');
                patientinformationform.loadRecord(record[0]);

                me.getNurseFacilityStore(me, record);
                me.getMedicationStore(me, record);
                me.getSocialStore(me, record);
                me.getLevelIIStore(me, record);
                me.getLevelIStore(me, record);
                me.getInitialScreeningData(me, record);
                me.getIndividualICPlanStore(me, record);
                me.getCareTeamStore(me, record);
                me.getIntegratedConditionStore(me, record);
                me.getContinuityStore(me, record);
            }
        });
    }
});