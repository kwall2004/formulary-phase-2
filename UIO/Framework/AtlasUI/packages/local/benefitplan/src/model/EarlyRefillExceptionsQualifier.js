/**
 * Created by s6635 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.model.EarlyRefillExceptionsQualifier',{
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name:'EarlyRefillExcpQulfrTypeSK',type:'number'},
        {name: 'EarlyRefillExcpQulfrTypeCode', type:'string'},
        {name: 'EarlyRefillExcpQulfrTypeDesc',type:'string'}
    ],
   // autoload: true,
    proxy: {
        url: '/EarlyRefillExceptionsQualifier'
    }
});