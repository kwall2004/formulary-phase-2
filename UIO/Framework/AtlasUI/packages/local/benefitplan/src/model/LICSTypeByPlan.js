/**
 * Created by n6570 on 2/2/2017.
 */
Ext.define('Atlas.benefitplan.model.LICSTypeByPlan', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'LICSTypeSK', type: 'number'},
        {name: 'LICSTypeCode', type: 'string'}
    ],
    proxy: {
        url: '/LICSType'
    }
});