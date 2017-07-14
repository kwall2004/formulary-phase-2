/** ... **/

Ext.define('Atlas.letter.model.MemberCoverageHistoryModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.membercoveragehistorymdl',
    fields: [
        'allowMemberLocks', 'tCarrierLOBName', 'tmemberId', 'tPlanGroupID', 'benefitResetDate', 'ESRDInd',
        'mcsProgGroupCodeDesc', 'MemDetailsSysId', 'rowNum', 'tPrimaryMemberName', 'tSpenAccPln', 'tPlanBenefitID',
        'tRespCountyCode', 'tTermDate', 'tCarrierName', 'tLICSInd', 'tsystemID', 'altInsOverride', 'fosterCareInd',
        'mcsWaiverCode', 'tPrimaryCarePhys', 'PersonCode', 'altInsOverrideEndDate', 'CarrierLOBid', 'tAltInsMemberID',
        'tAltInsInd', 'tFSAID', 'tPlanGroupName', 'hospiceInd', 'tAltInsRelationShip', 'tPlanGroupCode',
        'mcsprogBenefitCode', 'tRecipientID', 'tTermReason', 'mcsProgGroupCode', 'altInsStartDate', 'tNotifyDate',
        'tAltMemberID', 'tPCPID', 'tAltInsCarrierName', 'hixDelinquentStartDt', 'hixDelinquentInd', 'tFSAIndicator',
        'hixAPTCMember', 'planBenefitName', 'tRelationshipCode', 'tCountyCode', 'hixDelinquentEndDt', 'tLICSLev',
        'tCarrierID', 'altInsEndDate', 'tCarrierAcctNumber', 'tEffDate', 'transplantIndicator'
    ],
    proxy: {
        url: 'member/{0}/membercoveragehistory'
    }
});