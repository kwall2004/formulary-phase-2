/**
 * Created by s6393 on 10/28/2016.
 */

Ext.define('Atlas.benefitplan.model.DeductibleExceptions', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'DeducbleExclSK', type: 'int'},
        {name: 'DeducblExclQulfrTypeSK', type: 'int'},
        {name: 'DeducbleExclQulfrTypeCode', type: 'string'},
        {name: 'DeducbleExclVal', type: 'string'},
        {name: 'CntTowardsMOOPInd', type: 'bool'},
        {name: 'isDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],

    proxy: {
        url: '/DeductibleExceptions'
    }
});
