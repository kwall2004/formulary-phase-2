/**
 * Created by S4505 on 11/28/2016.
 */

Ext.define('Atlas.plan.store.PlanCopayRule',{
    alias: 'store.plan-plancopayrule',
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields: [
        {name:'copayLesserOf', type: 'string'},
        {name:'CopayRuleName', type: 'string'}

    ],
    data: [
    {copayLesserOf: 'Yes', CopayRuleName: 'Lesser of'},
    {copayLesserOf: 'No', CopayRuleName: 'Higher of'}
    ]
});

