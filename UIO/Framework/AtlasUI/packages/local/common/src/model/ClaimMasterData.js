/**
 * Created by T4317 on 10/19/2016.
 */
Ext.define('Atlas.common.model.ClaimMasterData', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [
        {name: 'recipientID'},
        {name: 'respStatus'},
        {
            name: 'respStatusFormat', calculate: function (obj) {
            var status = '';

            if (obj.respStatus) {
                if (obj.respStatus === 'P') {
                    status = 'Paid'
                } else if (obj.respStatus === 'R') {
                    status = 'Rejected'
                } else if (obj.respStatus === 'A') {
                    status = 'Reversed'
                } else if (obj.respStatus === 'C') {
                    status = 'Captured'
                } else if (obj.respStatus === 'D') {
                    status = 'Duplicate Paid'
                } else if (obj.respStatus === 'F') {
                    status = 'Pa Defered'
                } else if (obj.respStatus === 'Q') {
                    status = 'Duplicate of Capture'
                } else if (obj.respStatus === 'S') {
                    status = 'Duplication of Reversed'
                }
            }

            return status;
        }
        },
        {name: 'ncpdpID'},
        {name: 'serviceDate'},
        {name: 'svcDateFormat', calculate: function (obj) {
            var svcDate = '';
            var svcDateFormat = '';
            var date = '',
                month = '';
            if (obj.serviceDate) {
                svcDate = new Date(obj.serviceDate);
                if(svcDate.getDate() < 10){
                    date = '0' + svcDate.getDate();
                }
                else{
                    date = svcDate.getDate();
                }
                if((svcDate.getMonth()+1) < 10){
                    month = '0' + (svcDate.getMonth()+1);
                } else {
                    month = svcDate.getMonth()+1;
                }
                svcDateFormat = month + "/" + date + "/" + svcDate.getUTCFullYear();
            }
            return svcDateFormat;
        }},
        {name: 'NDC'},
        {name: 'prescriberID'},
        {name: 'prescriberNPI'},
        {name: 'presFirstName'},
        {name: 'prescriberLastName'},
        {name: 'rxBin'},
        {name: 'PCN'},
        {name: 'rxNum'},
        {name: 'insuredId'},
        {name: 'pbmCarrierId'},
        {name: 'gcnseq'},
        {name: 'insuredFirstName'},
        {name: 'insuredLastName'},
        {
            name: 'insuredFullName', calculate: function (obj) {
            var fullname = '';
            var firstname = '';
            var lastname = '';
            if (obj.insuredFirstName) {
                firstname = obj.insuredFirstName
            }
            if (obj.insuredLastName) {
                lastname = obj.insuredLastName;
            }

            fullname = lastname + ', ' + firstname;

            return fullname;
        }
        },
        {name: 'reversedTranId'},
        {name: 'transactionCode'},
        {name: 'holdFlag'},
        {name: 'authID'},
        {name: 'planGroupId'},
        {name: 'LineOfBusiness', mapping: '@LineOfBusiness'},
        {name: 'PAapprovalCriteria', mapping: '@PAapprovalCriteria'},
        {name: 'FormularyInfo', mapping: '@FormularyInfo'},
        {name: 'PatResidenceCode', mapping: '@PatResidenceCode'},
        {name: 'PharmacyServType', mapping: '@PharmacyServType'},
        {name: 'clinicalFormulation', mapping: ' @clinicalFormulation'},
        {name: 'DrugType', mapping: ' formularyDetails.DrugType'},
        {name: 'PAMinAge', mapping: ' formularyDetails.PAMinAge'},
        {name: 'ProfessionalServiceCode', mapping: '@ProfessionalServiceCode'},
        {name: 'ReasonForServiceCode', mapping: '@ReasonForServiceCode'},
        {name: 'RetroTermedInd', mapping: '@RetroTermedInd'},
        {name: 'SourceIdentity', mapping: '@SourceIdentity'},
        {name: 'StepTherapyName', mapping: '@StepTherapyName'},
        {name: 'formularyDetailsStepTherapyName', mapping: 'formularyDetails.StepTherapyName'},
        {name: 'TransitionFillType', mapping: '@TransitionFillType'},
        {name: 'applyPlanPricing', mapping: '@applyPlanPricing'},
        {name: 'compoundCode', mapping: '@compoundCodeDesc'},
        {name: 'dawType', mapping: '@dawType'},
        {name: 'drugLN', mapping: '@drugLN'},
        {name: 'drugType', mapping: '@drugType'},
        {name: 'gnn', mapping: '@gnn'},
        {name: 'mcsProgGroupCode', mapping: '@mcsProgGroupCode'},
        {name: 'otherPayerPatRespAmt', mapping: '@otherPayerPatRespAmt'},
        {name: 'otherPayerPatRespQual', mapping: '@otherPayerPatRespQual'},
        {name: 'planGroupName', mapping: '@planGroupName'},
        {name: 'prescriberName', mapping: '@prescriberName'},
        {name: 'providerName', mapping: '@providerName'},
        {name: 'therapeuticClass', mapping: '@therapeuticClass'},
        {name: 'transDateTime', mapping: '@transDateTime'},
        {name: 'TransitionDate'},
        {name: 'versionNum'},
        {name: 'CMS', mapping: 'formularyDetails.CMS_RxCUI'},
        {name: 'Covered', mapping: 'formularyDetails.Covered'},
        {name: 'DaysSupply', mapping: 'formularyDetails.DaysSupply'},
        {name: 'DaysSupplyTimePeriod', mapping: 'formularyDetails.DaysSupplyTimePeriod'},
        {name: 'ETC_ID', mapping: 'formularyDetails.ETC_ID'},
        {name: 'ETC_NAME', mapping: 'formularyDetails.ETC_NAME'},
        {name: 'MaxAge', mapping: 'formularyDetails.MaxAge'},
        {name: 'MedicarePAType', mapping: 'formularyDetails.MedicarePAType'},
        {name: 'MinAge', mapping: 'formularyDetails.MinAge'},
        {name: 'formularyDetailsOTCInd', mapping: 'formularyDetails.OTCInd'},
        {
            name: 'OTCInd', calculate: function (obj) {
            var otcind = '';
            if (obj.formularyDetailsOTCInd) {
                otcind = obj.formularyDetailsOTCInd === '1' ? 'yes' : 'no';
            }
            return otcind;
        }
        },
        {name: 'PAInd', mapping: 'formularyDetails.PAInd'},
        {name: 'PAMaxAge', mapping: 'formularyDetails.PAMaxAge'},
        {name: 'PAName', mapping: 'formularyDetails.PAName'},
        {name: 'PDLFlag', mapping: 'formularyDetails.PDLFlag'},
        {name: 'PartDExcludedDrug', mapping: 'formularyDetails.PartDExcludedDrug'},
        {name: 'QtyLimit', mapping: 'formularyDetails.QtyLimit'},
        {name: 'QtyLmtTimePeriod', mapping: 'formularyDetails.QtyLmtTimePeriod'},
        {name: 'SpecialtyDrugInd', mapping: 'formularyDetails.SpecialtyDrugInd'},
        {name: 'StepTherapyInd', mapping: 'formularyDetails.StepTherapyInd'},
        {name: 'LineOfBusiness', mapping: '@LineOfBusiness'},
        {name: 'applyPlanPricing', mapping: '@applyPlanPricing'},
        {name: 'SourceIdentity', mapping: '@SourceIdentity'},
        {name: 'Tiercode', mapping: '@Tiercode'},
        {name: 'PartBDrug'},
        {name: 'Covered', mapping: '@Covered'},
        {name: 'ClaimAdjudicationCode', mapping: '@ClaimAdjudicationCode'},
        {
            name: 'formattedClaimAdjudicationCode', calculate: function (obj) {
            var code = '';
            if (obj.ClaimAdjudicationCode) {
                code = obj.ClaimAdjudicationCode.replace(/\^/g, '\n');
            }
            return code;
        }
        },
        {name: 'BLANDAdrug', mapping: '@BLANDAdrug'},
        {name: 'genSubstitutableNDC'},
        {name: 'otherCoverageCode', mapping: 'otherCoverageCode'},
        {
            name: 'coveragecode', calculate: function (obj) {
            var coveragecode = '';
            if (obj.otherCoverageCode && obj.otherCoverageCode != 0) {
                coveragecode = obj.otherCoverageCode;
            }
            return coveragecode;
        }
        }
    ],
    proxy: {
        url: 'claims/rx/claimmasterdata'
    }
});
