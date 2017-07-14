/**
 * Created by b2352 on 12/19/2016.
 */

Ext.define('Atlas.plan.model.PlanDAWCopay',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'systemId',
    fields: [
        {name: 'SystemID',  type: 'number'},
        {name: 'dawType',  type: 'string'},
        {name: 'dawTypeDescription',  type: 'string'},
        {name: 'maintenance',  type: 'number'},
        {name: 'maintenanceDescription',  type: 'string'},
        {name: 'copayAmount',  type: 'number'},
        {name: 'coinsurancePercent',  type: 'number'},
        {name: 'copayPercent',  type: 'number'},
        {name: 'FormularyTierId',  type: 'number'},
        {name: 'PharmacyNetworkId',  type: 'number'},// this is needed because while fetching  this is the parameter name
        {name: 'pharmNetworkId',  type: 'number'}, // this is needed because while saving this is the parameter name
        {name: 'costDiffMemberRespPct',  type: 'number'},
        {name: 'costDiffPlanRespPct',  type: 'number'},
        {name: 'costDiffPharmaRespPct',  type: 'number'}

    ],

    proxy: {
       url: 'plan/{0}/plandawcopay'
    }

});