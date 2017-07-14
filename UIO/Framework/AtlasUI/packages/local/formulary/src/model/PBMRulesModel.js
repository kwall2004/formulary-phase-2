/**
 * Created by s6627 on 10/14/2016.
 */
Ext.define('Atlas.formulary.model.PBMRulesModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'systemID', type: 'string'},
        {name: 'RuleCriteria', type: 'string'},
        {name: 'RuleActive', type: 'boolean'},
        {name: 'ProgressFuncName', type: 'string'},
        {name: 'RuleType', type: 'string'},
        {name: 'RuleName', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pRuleType:'Step Therapies'
        },
        url: 'shared/{0}/pbmrules',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});