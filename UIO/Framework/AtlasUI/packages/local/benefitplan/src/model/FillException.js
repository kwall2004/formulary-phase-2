/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.model.FillException', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'FillExcpSK', type: 'int'},
        {name: 'DrugClsTypeSK', type: 'int'},
        {name: 'FillExcpChngQulfrTypeSK', type: 'int'},
        {name: 'PharmTypeSK', type: 'int'},
        {name: 'FillRngMinAmt', type: 'string'},
        {name: 'FillRngMaxAmt', type: 'string'},
        {name: 'MultiplierAmt', type: 'string'},
        {name: 'isDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],

    proxy: {
        url: '/FillException'
    }
});
