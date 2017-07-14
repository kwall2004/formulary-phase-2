/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.CoverageSetConfiguration', {
    extend: 'Atlas.benefitplan.model.Base',
    //hasOne: {model: 'CoverageSet', name: 'CoverageSet', associationKey: 'CoverageSet'},
    hasMany: [{
        model: 'RuleSets', name: 'RuleSets', associationKey: 'RuleSets'},
    {model: 'ThresholdConfiguration', name: 'Thresholds', associationKey: 'Thresholds'}
],
    fields: [
        {name: 'CoinsuranceCalculatedBeforeCopayIsApplied', type: 'bool'},
        {name: 'CoinsurancePct', type: 'string'},
        {name:'CopaymentEpisodeAmt', type:'string'},
        {name:'CoinsuranceEpisodeAmt', type:'string'},
        {name: 'CopayAfterDeductibleAmtIsMet', type: 'string'},
        {name: 'CopayBeforeDeductibleAmtIsMet', type: 'string'},
        {name: 'CopayCountsTowardsDeductable', type: 'bool'},
        {name: 'CopayCountsTowardsNetworkLevelDeductible', type: 'bool'},
        {name: 'CopayFrequencyValue', type: 'string'},
        {name: 'DeducblAmt',type:'string'},
        {name: 'DeducblEpsdSK',type:'number'},
        {name: 'CopaymentFreqQulfrTypeSK', type: 'string'},
        {name: 'CountMemberRespTowardsMOOP', type: 'bool'},
        {name: 'CountMemberRespTowardsPlanLevelDeductible', type: 'bool'},
        {name: 'PymtPrflSK',type:'number'},
        {name: 'PymtPrflDtlSK', type:'number'},
        {name:'Excluded',type: 'bool'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'RuleSets'},
        {name: 'Thresholds'},
        'coverageSet'
        /*,
        'RuleSets',
        'Thresholds'*/
    ], // Nested Data
    proxy: {
        /*actionMethods: {
            create: 'PUT',
            read: 'GET',
            update: 'PUT',
            destroy: 'PUT'
        },*/
        url: '/CoverageSetConfiguration'/*,
        reader: {
            type: 'json',
            rootProperty: function (node) {
                return node;
            }
        }*/
    }
});
