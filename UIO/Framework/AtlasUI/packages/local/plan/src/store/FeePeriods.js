/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.store.FeePeriods',{
    extend: 'Ext.data.Store',
    alias: 'store.plan-benefits-feeperiods',
    autoLoad: true,
    fields: [
        {name:'name', type: 'string'},
        {value:'value', type: 'string'}

    ],
    data: [
        {name: 'Weekly', value : '1'},
        {name: 'Monthly',value : '2'},
        {name: 'Quaterly', value : '3'},
        {name: 'Yearly', value : '4'}

    ]
});

