/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.model.PlanDURRules', {

    extend: 'Atlas.common.model.Base',
    fields: [

        {name: 'LetterRequired', type: 'boolean'},
        {name: 'ClinicalSignificanceCode', type: 'string'},
        {name: 'ACTIVE', type: 'boolean'},
        {name: 'DURDesc', type: 'string'},
        {name: 'RejectionCodes', type: 'string'},
        {name: 'NDC', type: 'string'},
        {name: 'GPICode', type: 'number'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'DURType', type: 'string'},
        {name: 'AlertRequired', type: 'boolean'},
        {name: 'planGroupId', type: 'number'},
        {name: 'RuleType', type: 'string'},
        {name: 'GCN_SEQNO', type: 'number'},
        {name: 'planDURRuleName', type: 'string'},
        {name: 'ultimateChildETCID', type: 'number'},
        {name: 'DURCondDesc', type: 'string'},
        {name: 'planDURRuleID', type: 'number'},
        {name: 'allLevels', type: 'boolean'},
        {name: 'priorDays', type: 'number'},
        {name: 'measureCode', type: 'string'},
        {name: 'MonitorHrs', type: 'number'},
        {name: 'DURCondition', type: 'number'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'drugDesc', type: 'string'},
        {name: 'lastModifiedby', type: 'string'},
        {name: 'lastModified', type: 'date', dateFormat: 'C'}
    ],
    proxy: {
        url: 'plan/{0}/plandurrulesext'
    }
});


