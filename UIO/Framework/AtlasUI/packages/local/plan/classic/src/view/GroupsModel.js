Ext.define('Atlas.plan.view.GroupsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-groups',
    data:{
        initialized: false,
        atlasId: null,
        isEditing: false,
        masterRecord: null
    },
    stores: {
        plangroups: {
            type: 'plan-plangroups',
            listeners: {
                load: 'onPlangroupLoad' //loads the correct record if openView
            }
        },
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
            type:'plan-plancarrierLOBs',
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
            type:'plan-PlanBenefitExt'
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
        planlocationcoverage:{
            type:'plan-planlocationcoverage'
        },
        countybystate:{
            type:'plan-countybystate'
        },
        states:{
            type: 'plan-states'
        },
        planlocationcoveragestate:{
            type: 'plan-planlocationcoveragestate'
        },
        coveragephaseplanbenefititems: {
            remoteSort: true,
            // proxy: {
            //     type: 'memory'
            // },
            type:'plan-PlanBenefitExt',

            data:[{
                planBenefitId: 0,
                planBenefitCode: "All",
                BenefitName: "All",
                planGroupId: 0,
                planGroupName: "All",
                CarrierName: "All",
                lobName: "0"
            }]
        }

    }
});