/**
 * Created by 
 */
Ext.define('Atlas.benefitplan.model.BenefitTiersItem', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'Name',type:'string'},
        {name: 'DeductibleAmt', type:'number'},
        {name: 'NtwrkTierSK', type: 'number'},
        {name: 'CurrentUser', type: 'string'}
    ]
});
