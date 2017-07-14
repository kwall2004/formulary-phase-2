/**
 * Created by S4505 on 11/8/2016.
 */

Ext.define('Atlas.plan.model.PlanClaimRules', {

    extend: 'Atlas.common.model.Base',
    fields: [

        {name: 'carrierId', type: 'number'},
        {name: 'carrierAcctNumber', type: 'string'},
        {name: 'carrierLOBId', type: 'number'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'planGroupId', type: 'number'},
        {name: 'planBenefitID', type: 'string'},
        {name: 'drugLevel', type: 'string'},
        {name: 'drugCode', type: 'string'},
        {name: 'daysSupply', type: 'number'},
        {name: 'fillPercent', type: 'number'},
        {name: 'ruleType', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'drugTypeFrom', type: 'number'},
        {name: 'drugTypeTo', type: 'number'},
        {name: 'ruleLevel', type: 'string'},
        {name: 'dawType', type: 'string'}

    ],
    proxy: {
        url: 'plan/{0}/planclaimrules'
    }
});






