/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.model.PlanBenefitListItem',{
    // extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    extend: 'Atlas.common.model.Base',
    //idProperty: 'systemId',
    fields: [

        {name: 'planBenefitId',  type: 'number'},
        {name: 'planBenefitCode',  type: 'string'},
        {name: 'BenefitName',  type: 'string'},
        {name: 'planGroupId',  type: 'number'},
        {name: 'planGroupCode', type:'string'},
        {name: 'planGroupName', type :'string'},
        {name: 'benefitStatus',  type: 'string'},
        {name: 'CarrierID', type:'number'},
        {name: 'CarrierName',  type: 'string'},
        {name: 'accountName', type:'string'},
        {name: 'lobName',  type: 'string'},
        {name: 'effDate',  type: 'date', dateFormat:'Y-m-d'},
        {name: 'termDate',  type: 'date', dateFormat:'Y-m-d'}
    ],
    proxy: {
        url: 'plan/{0}/planbenefits'
    }

});



