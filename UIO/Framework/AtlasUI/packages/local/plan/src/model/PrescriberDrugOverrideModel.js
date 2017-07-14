/**
 * Created by d3973 on 11/18/2016.
 */
Ext.define('Atlas.plan.model.PrescriberDrugOverrideModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'PrescDrugOverrideRuleName',
        type: 'string'
    }, {
        name: 'systemID',
        type: 'number'
    }, {
        name: 'TerminationDate',
        type: 'date'/*,
        convert: function(value){
            if (!value){
                return '';
            }
        }*/
        ,dateFormat:'Y-m-d'
    }, {
        name: 'exclPlanBenefitId',
        type: 'number'/*,
        convert: function(value){
            if (!value){
                return '';
            }
        }*/
    }, {
        name: 'PlanGroupId',
        type: 'number'
    }, {
        name: 'PrescDrugOverrideRuleID',
        type: 'number'
    }, {
        name: 'EffectiveDate',
        type: 'date',
        dateFormat:'Y-m-d'
    }],

    proxy: {
        url: 'plan/{0}/prescoverriderules'
    }
});