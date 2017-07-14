/**
 * Created by S4505 on 12/29/2016.
 */


Ext.define('Atlas.plan.model.PlanBenefitExt',{
    extend: 'Atlas.common.model.Base',
    fields: [

        {name: 'planBenefitId',  type: 'number'},
        {name: 'planBenefitCode',  type: 'string'},
        {name: 'BenefitName',  type: 'string'},
        {name: 'planGroupId',  type: 'number'},
        {name: 'planGroupCode', type:'string'},
        {name: 'planGroupName', type :'string'},
        {name: 'benefitStatus',  type: 'string'},
        {name: 'CarrierName',  type: 'string'},
        {name: 'accountName', type:'string'},
        {name: 'lobName',  type: 'string'},
        {name: 'effDate',  type: 'date', dateFormat:'Y-m-d'},
        {name: 'termDate',  type: 'date', dateFormat:'Y-m-d'}
    ],
    proxy: {
        url: 'plan/{0}/planbenefitsext'
    }
});



