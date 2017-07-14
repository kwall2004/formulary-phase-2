/**
 * Created by S4505 on 11/10/2016.
 */

Ext.define('Atlas.plan.model.PlanLocationCoverage', {
    extend: 'Atlas.common.model.Base',

    fields: [

        {name: 'planCoverageCounty',  type: 'string'},
        {name: 'planCoverageCountyDesc',  type: 'string'},
        {name: 'PlanGroupId',  type: 'number'},
        {name: 'planCoverageState',  type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/planlocationcoverage'
    }

});
