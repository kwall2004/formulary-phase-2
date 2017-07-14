/**
 * Created by s6635 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.model.EarlyRefillExceptions',{
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name:'EarlyRefillExcpSK',type:'number'},
        {name:'BnftPlanSK',type:'number'},
        {name:'EarlyRefillExcpQulfrTypeSK',type:'number'},
        {name:'EarlyRefillVal',type:'string'},
        {name:'EarlyRefillPct',type:'number'},
        {name: 'isDeleted',type: 'bool'},
        {name: 'CurrentUser',type: 'string'}
    ],
    proxy: {
        url: '/EarlyRefillExceptions'
    }
});