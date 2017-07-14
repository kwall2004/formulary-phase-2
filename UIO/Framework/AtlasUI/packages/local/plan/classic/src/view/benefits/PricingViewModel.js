/**
 * Created by S4505 on 11/23/2016.
 */

Ext.define('Atlas.plan.view.benefits.PricingModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-pricing',
    data:{
        isEditing: false
    },
    stores: {
        planpricingmaster: {
            type:'plan-planbenefitspricingmaster'
        },
        planpricingdetail: {
            type:'plan-planbenefitspricingdetail'
        },
        maintenance: {
            type:'plan-benefitmaintenance'
        },
        drugtype:{
            type: 'plan-drugtype'
        },
        costbasis:{
            type: 'plan-costbasis'
        },
        PlanServiceTypeStore: {
            model: 'Atlas.plan.model.PlanPharmaLimitsModel',
            autoLoad: false
        }
    }
});