Ext.define('Atlas.plan.view.BenefitsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits',
    data:{
        initialized: false,
        atlasId: null,
        isEditing: false,
        masterRecord: null
    },
    stores: {
        // planbenefits: {
        //     type: 'plan-PlanGroup'
        //     // listeners: {
        //     //    load: 'onPlangroupLoad'
        //     // }
        // },
        carriers: {
            type: 'plan-carriers',
            autoLoad: true
        },
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        //stores from detail we want to bind here
        coveragecodes:{
            type: 'plan-coveragecodes',
            autoLoad: true
        },
        lobs: {
            type:'plan-carrierLOBs',
            autoLoad: true
        },
        planaddresstypes: {
            type:'plan-planaddresstypes'
        },
        pcndetails: {
            type:'plan-pcndetails',
            autoLoad: false
        },
        planbenefits: {
            type:'plan-planbenefits',
            autoLoad: false
        },
        //stores from 3rd level we want to bind to a specific groupId here
        palists: {
            type: 'plan-palists'
        },
        coveragephases: {
            type:'plan-coveragephases'
        },
        enrollments: {
            type:'plan-enrollments'
        },
        durs: {
            type: 'plan-plandurs'
        },
        plangroupbenefits:{
            type:'plan-plangroupbenefit'
        },
        validationerrorinformation:{
            type:'plan-validationerrorinformation'
        },
        planbenefitlistItem:{
            type:'plan-planbenefitlistitem'
        },

        prescriberlocation:{
            type:'plan-prescriberlocation'
        },

        allowedprescriber:{
            type:'plan-allowedprescriber'
        },

        carrieraccounts:{
            type: 'plan-carrieraccounts'
        },

        druglevel:{
            type: 'plan-druglevel'
        },

        planclaimruletype:{
            type: 'plan-claimruletype'
        },
        drugtype:{
            type: 'plan-drugtype'
        },

        dawtype:{
            type: 'plan-dawtype'
        },
        planclaimrules:{
            type:'plan-planclaimrules'
        },

        planbenefitsselect: {
            model: 'Atlas.plan.model.PlanBenefit',
            autoLoad: false
        }


    }
});