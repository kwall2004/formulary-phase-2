/**
 * Created by j3703 on 12/14/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitIntegration', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'status',type:'string'}
    ]
    ,
     proxy: {
     url: '/BenefitIntegration',
         actionMethods: {
             create: 'POST',
             read: 'GET',
             update: 'POST',
             destroy: 'DELETE'
         }

     }

});



