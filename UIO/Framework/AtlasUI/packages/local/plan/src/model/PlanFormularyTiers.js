/**
 * Created by S4505 on 11/28/2016.
 */

Ext.define('Atlas.plan.model.PlanFormularyTiers', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'FormularyTierID',  type: 'number'},
        {name: 'TierDesc',  type: 'string'},
        {name: 'FormularyID',  type: 'number'},
        {name: 'TierCode',  type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/planformularytiers'
    }
});