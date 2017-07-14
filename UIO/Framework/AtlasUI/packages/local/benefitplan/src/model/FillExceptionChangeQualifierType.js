/**
 * Created by s6393 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.model.FillExceptionChangeQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [

        {name: 'FillExcpChngQulfrTypeSK', type: 'int'},
        {name: 'FillExcpChngQulfrTypeCode', type: 'string'},
        {name: 'FillExcpChngQulfrTypeDesc', type: 'string'}
    ],

    proxy: {
        url: '/FillExceptionChangeQualifierType'
    }
});
