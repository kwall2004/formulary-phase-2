/**
 * Created by S4505 on 11/10/2016.
 */


// Ext.define('Atlas.plan.store.PlanLocationCoverageState',{
//     alias: 'store.plan-planlocationcoveragestate',
//     extend: 'Ext.data.Store',
//     model: 'Atlas.plan.model.PlanLocationCoverageState',
//     autoLoad: false
//
// });


Ext.define('Atlas.plan.store.PlanLocationCoverageState',{
    alias: 'store.plan-planlocationcoveragestate',
    extend: 'Ext.data.SimpleStore',
    autoLoad: false,
    // fields: [
    //     {name:'correctiveAction', type: 'string'},
    //     {name:'errorMessage', type: 'string'},
    //     {name:'errorCode', type: 'int'}
    // ]

    fields: [
        {name: 'stateCode', type: 'string'},
        {name: 'isUpdated', type: 'boolean'}
    ]
});
