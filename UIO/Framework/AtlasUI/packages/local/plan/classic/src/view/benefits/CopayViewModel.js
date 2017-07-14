/**
 * Created by S4505 on 11/23/2016.
 */
Ext.define('Atlas.plan.view.benefits.CopayModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-copay',
    data:{
        isEditing: false
    },
    stores: {
        plancopay: {
            type:'plan-planbenefitscopay'
        }
        ,
        maintenance: {
            type:'plan-benefitmaintenance'
        },
        coveragephases: {
            type:'plan-coveragephases'
        },
        formularytiers: {
            type:'plan-planformularytiers'
        },
        plancopayrule: {
            type:'plan-plancopayrule'
        },
        PlanServiceTypeStore: {
            model: 'Atlas.plan.model.PlanPharmaLimitsModel',
            autoLoad: false
        }

    }
});