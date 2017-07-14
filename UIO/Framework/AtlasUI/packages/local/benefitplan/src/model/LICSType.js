/**
 * Created by s6393 on 11/1/2016.
 */
//LICSType

Ext.define('Atlas.benefitplan.model.LICSType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'LICSTypeSK', type: 'number'},
        {name: 'LICSTypeCode', type: 'string'}
    ],
    proxy: {
        url: '/LICSType'
    }
});