/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.model.AccountIndustryIdentifierTypeValue', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.accountIndustryIdentifierTypeValue',
    fields: [
        {name: 'IndustryIdentifier', type: 'number'},
        {name: 'TenantTypeKey', type: 'number'},
        {name: 'AcctTypeKey', type: 'number'},
        {name: 'ValueID', type: 'number'},
        {name: 'Type', type: 'string'},
        {name: 'Value', type: 'string'}
    ]
});
