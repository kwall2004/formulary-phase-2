/**
 * Created by T4317 on 10/21/2016.
 */

Ext.define('Atlas.common.model.DrugPricing', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'DESCRIPTION',type: 'string'},
        {name: 'submitted',type: 'string'},
        {name: 'formatSubmitted', calculate: function(obj){
            var price = '';
            var priceformat = '';
            if(obj.submitted) {
                //price = parseFloat(obj.submitted);
                priceformat = Ext.util.Format.currency(obj.submitted, '$', 2);
            }
            return priceformat;
        }},
        {name: 'paid',type: 'string'},
        {name: 'formatPaid', calculate: function(obj){
            var price = '';
            var priceformat = '';
            if(obj.paid) {
                //price = parseFloat(obj.paid);
                //priceformat ='$'+ price.toFixed(2);
                priceformat = Ext.util.Format.currency(obj.paid, '$', 2);
            }
            return priceformat;
        }},
        {name: 'PlanPricing',type: 'string'},
        {name: 'formatPrice', calculate: function(obj){
            var price = '';
            var priceformat = '';
            if(obj.PlanPricing) {
                //price = parseFloat(obj.PlanPricing);
                //priceformat ='$'+ price.toFixed(2);

                priceformat = Ext.util.Format.currency(obj.PlanPricing, '$', 2);
            }
            return priceformat;
        }},
        {name: 'Carrier',type: 'string'},
        {name: 'Account',type: 'string'},
        {name: 'LOB',type: 'string'}
    ],
    proxy:{
            url:'claims/rx/claimpricingsubmitpaid'
        }
});
