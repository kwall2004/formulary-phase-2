/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.model.PlanAdminFee',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'feeType',  type: 'number'},
        {name: 'feeAmount',  type: 'number'},
        {name: 'feePerRx',  type: 'boolean'},
        {name: 'feePeriod',  type: 'string'},
        {name: 'feeClassType',  type: 'string'},
        {name: 'feeClassValue',  type: 'string'},
        {name: 'startDate',  type: 'date', dateFormat:'Y-m-d'},
        {name: 'endDate',  type: 'date', dateFormat:'Y-m-d'},
        {name: 'feeClassValueDescription',  type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/planfees'

        /* extraParams: {
         pListName: ''
         },*/

    }
});
