/**
 *  Last Developer: Paul Glinski
 *  Previous Developers: [T4317]
 */
Ext.define('Atlas.member.model.MemberCoverage', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'tAltInsCarrierName', type: 'string' },
        { name: 'tAltInsInd', type: 'string' },
        { name: 'tAltInsIndYesNo', type: 'string', mapping: function(rec){
            var retValue = '';
            retValue =  (rec.tAltInsInd == 'false' ||  rec.tAltInsInd == false || rec.tAltInsInd == '')? 'No' : 'Yes';
            return retValue;
            }
        },
        { name: 'tAltInsMemberID', type: 'string' },
        { name: 'tAltInsRelationShip', type: 'string' },
        { name: 'tCarrierAcctNumber', type: 'string' },
        { name: 'tCarrierID', type: 'string' },
        { name: 'tCarrierLOBName', type: 'string' },
        { name: 'tCountyCode', type: 'string' },
        { name: 'tEffDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'tFSAID', type: 'string' },
        { name: 'tFSAIndicator', type: 'string' },
        { name: 'tLICSInd', type: 'string' },
        { name: 'tLICSLev', type: 'string' },
        { name: 'tmemberId', type: 'string' },
        { name: 'tNotifyDate', type: 'string' },
        { name: 'tPlanBenefitID', type: 'string' },
        { name: 'tPlanGroupID', type: 'string' },
        { name: 'tPrimaryCarePhys', type: 'string' },
        { name: 'tPCPID', type: 'string' },
        {name:'NPI',calculate:function(obj){
            var PCPName;
            var npi;
                PCPName = obj.tPrimaryCarePhys;
                npi = obj.tPCPID;
            return PCPName + ' ( NPI: ' + npi +' )' ;
        }},
        { name: 'tRecipientID', type: 'string' },
        { name: 'tRespCountyCode', type: 'string' },
        { name: 'tSpenAccPln', type: 'string' },
        { name: 'tsystemID', type: 'string' },
        { name: 'tTermDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'tTermReason', type: 'string' },
        { name: 'tRelationshipCode', type: 'string' },
        { name: 'tPrimaryMemberName', type: 'string' },
        { name: 'tCarrierName', type: 'string' },
        { name: 'tPlanGroupName', type: 'string' },
        { name: 'tPlanGroupCode', type: 'string' },
        { name: 'rowNum', type: 'int' },
        { name: 'altInsOverride', type: 'string' },
        { name: 'altInsOverrideEndDate', type:'date', dateFormat: 'Y-m-d' },
        { name: 'CarrierLOBid', type: 'string' },
        { name: 'MemDetailsSysId', type: 'string' },
        { name: 'allowMemberLocks', type: 'string' },
        { name: 'tPlanBenefitCode', type: 'string' },
        { name: 'tPlanBenefitName', type: 'string' },
        { name: 'tmemberRelationShipCode', type: 'string' },
        { name: 'tmemberReciepientID', type: 'string' },
        { name: 'tmcsProgGroupCode', type: 'string' },
        { name: 'tmcsprogBenefitCode', type: 'string' },
        { name: 'tmcsProgGroupCodeDesc', type: 'string' },
        { name: 'sparefield02', type: 'string' },
        { name: 'PersonCode', type: 'string' },
        { name: 'FosterCare', type: 'string' },
        { name: 'AltInsStartDate', type: 'string' },
        { name: 'AltInsEndDate', type: 'string' },
        { name: 'hixAPTCMember', type: 'string' },
        { name: 'hixAPTCMemberYesNo', type: 'string', mapping: function(rec){
            var retValue = '';
            retValue =  (rec.hixAPTCMember == 'false' ||  rec.hixAPTCMember == false || rec.hixAPTCMember == '')? 'No' : 'Yes';
            return retValue;
        } },
        { name: 'hixDelinquentInd', type: 'string' },
        { name: 'hixDelinquentIndYesNo', type: 'string' , mapping: function(rec){
            var retValue = '';
            retValue =  (rec.hixDelinquentInd == 'false' ||  rec.hixDelinquentInd == false || rec.hixDelinquentInd == '')? 'No' : 'Yes';
            return retValue;
        }},
        { name: 'hixDelinquentStartDt', type: 'string' },
        { name: 'hixDelinquentEndDt', type: 'string' },
        { name: 'benefitResetDate', type: 'string' },
        { name: 'ESRDInd', type: 'string' },
        { name: 'hospiceInd', type: 'string' },
        { name: 'transplantIndicator', type: 'string' },
        { name: 'tAltMemberID', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'recipientID'
        },
        url: 'member/{0}/membercoveragehistory'
    }
});