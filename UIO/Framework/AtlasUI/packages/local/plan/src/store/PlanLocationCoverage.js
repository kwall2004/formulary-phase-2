/**
 * Created by S4505 on 11/10/2016.
 */

Ext.define('Atlas.plan.store.PlanLocationCoverage',{
    alias: 'store.plan-planlocationcoverage',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanLocationCoverage',
    autoLoad: false,
    grouper:{
        property:'planCoverageState',
        direction:'ASC'
    },
    sorters:{
        property:'planCoverageState',
        direction:'ASC'
    }
});