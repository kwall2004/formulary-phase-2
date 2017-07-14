/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.model.PlanDURRuleDrugs', {

    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'drugLevelID', type: 'string'},
        {name: 'drugLevel', type: 'number'},
        {name: 'drugLevelDesc', type: 'string'},
        {name: 'drugDesc', type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/plandurrulexdrug'
    }
});
