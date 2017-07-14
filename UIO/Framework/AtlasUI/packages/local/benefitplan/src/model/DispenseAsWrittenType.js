/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.model.DispenseAsWrittenType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'DAWTypeSK', type: 'int'},
        {name: 'DAWTypeCode', type: 'string'},
        {name: 'DAWTypeDesc', type: 'string'}
    ],

    proxy: {
        url: '/DispenseAsWrittenType'
    }
});
