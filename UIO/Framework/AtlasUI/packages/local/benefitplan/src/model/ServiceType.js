/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.model.ServiceType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.serviceType',
    fields: [
        {name: 'SvcTypeSK', type: 'number'},
        {name: 'SvcTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/ServiceType'
    }
});