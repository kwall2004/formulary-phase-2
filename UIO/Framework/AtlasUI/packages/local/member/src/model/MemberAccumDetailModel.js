/**
 * Created by j2487 on 10/17/2016.
 */

Ext.define('Atlas.member.model.MemberAccumDetailModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'RecSeqBenefitYear', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'RecSeqBenefitMonth', type: 'string'},
        {name: 'BenefitMonth', type: 'int'},
        {name: 'transactionId', type: 'string'},
        {name: 'serviceDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'transactionDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'memberId', type: 'string'},
        {name: 'GDCB', type: 'string'},
        {name: 'GDCA', type: 'string'},
        {name: 'PatPayAmt', type: 'float'},
        {name: 'OthTroopAmt', type: 'float'},
        {name: 'LICS', type: 'float'},
        {name: 'PLRO', type: 'float'},
        {name: 'CPP', type: 'float'},
        {name: 'NPP', type: 'string'},
        {name: 'BBP', type: 'string'},
        {name: 'EBP', type: 'string'},
        {name: 'RepGapDisc', type: 'string'},
        {name: 'Tier', type: 'string'},
        {name: 'tranDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'totalDrugCost', type: 'float'},
        {name: 'prevTroop',type: 'float'},
        {name: 'prevTDC', type: 'float'},
        {name: 'prevPlanPaidAmt', type: 'float'},
        {name: 'prevLicsAmt', type: 'float'},
        {name: 'prevMemberPaid', type: 'float'},
        {name: 'prevOtherPlanPaid', type: 'float'},
        {name: 'benefitStageAmt1', type: 'float'},
        {name: 'benefitStageAmt2', type: 'float'},
        {name: 'benefitStageAmt3', type: 'float'},
        {name: 'benefitStageAmt4', type: 'float'},
        {name: 'copayAmt', type: 'float'},
        {name: 'coinsAmt', type: 'float'},
        {name: 'deductAmt', type: 'float'},
        {name: 'NDC', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'planGroup', type: 'string'},
        {name: 'transactionCode', type: 'string'},
        {name: 'GCN_SEQNO', type: 'string'},
        {name: 'troop', type: 'float'}
    ]

})