/**
 * Created by S4505 on 10/25/2016.
 */
// This is a Store Created to Load the Benefit details that we get from the same call as Plan Group Info Model
    Ext.define('Atlas.plan.store.PlanGroupBenefit',{
        alias: 'store.plan-plangroupbenefit',
        extend: 'Ext.data.SimpleStore',
        autoLoad: true,
        fields: [
            {name:'MACListID', type: 'int'},
            {name:'PB1ROWID', type: 'string'},
            {name:'RowNum', type: 'int'},
            {name:'allowMemberLocks', type: 'boolean'},
            {name: 'benefitName',  type: 'string'},
            {name: 'benefitStatus',  type: 'string'},
            {name: 'effDate',  type: 'date', dateFormat:'Y-m-d'},
            {name:'formularyId', type: 'int'},
            {name:'licsSubsidy', type: 'boolean'},
            {name:'nonPrefPharmNetworkId', type: 'int'},
            {name:'passThroughPricing', type: 'boolean'},
            {name: 'pcnCodeList',  type: 'string'},
            {name: 'pharmNetworkId',  type: 'int'},
            {name: 'planBenefitCode',  type: 'string'},
            {name: 'planBenefitId',  type: 'int'},
            {name: 'planFaxLogo',  type: 'string'},
            {name: 'processMAPCase',  type: 'boolean'},
            {name: 'processMTMCase',  type: 'boolean'},
            {name: 'renewalDate',  type: 'date', dateFormat:'Y-m-d'},
            {name: 'termDate',  type: 'date', dateFormat:'Y-m-d'}
        ]
    });
