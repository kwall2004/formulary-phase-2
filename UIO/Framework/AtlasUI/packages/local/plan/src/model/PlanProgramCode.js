/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.model.PlanProgramCode',{
    extend: 'Atlas.common.model.Base',
    alias: 'model.planprogramcode',
    // extend: 'Ext.data.Model',
    //idProperty: 'systemID',
    fields: [
        {name: 'planGroupId',  type: 'number'},
        {name: 'planGroupName',  type: 'string'},
        {name: 'planBenefitId',  type: 'number'},
        {name: 'planBenefitName',  type: 'string'},
        {name: 'progGroupCode',  type: 'string'},
        {name: 'progBenefitCode',  type: 'string'},
        {name: 'progDescription',  type: 'string'},
        {name: 'effDate',  type: 'date',dateFormat:'Y-m-d'},
        {name: 'termDate',  type: 'date',dateFormat:'Y-m-d'},
        {name: 'benefitResetDate',  type: 'string'},
        {name: 'groupRiders',  type: 'string'},
        {name: 'riderTierCodes',  type: 'string'},
        {name: 'riderCovMax',  type: 'number'},
        {name: 'empGroupName',  type: 'string'},
        {name: 'active',  type: 'boolean'}

    ],
    proxy: {
        url: 'plan/{0}/planprogramcodes'
     }

    /*proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getPlanGroups
        url: 'plan/{0}/planprogramcodes'
        // url: 'resources/data/dummydata/plan/programcodes.json'
    },
    validators: {
        benefitResetDate: { type: 'format', matcher: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/i }
    }*/
});