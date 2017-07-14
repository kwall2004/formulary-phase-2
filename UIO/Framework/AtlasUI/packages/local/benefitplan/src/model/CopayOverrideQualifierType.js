/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.model.CopayOverrideQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CopayOvrrdQulfrTypeSK', type: 'int'},
        {name: 'CopayOvrrdQulfrTypeCode', type: 'string'},
        {name: 'CopayOvrrdQulfrTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/CopayOverrideQualifierType'
    }
});
