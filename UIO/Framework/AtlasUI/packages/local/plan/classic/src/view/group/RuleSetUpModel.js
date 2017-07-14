/**
 * Created by S4505 on 11/15/2016.
 */
Ext.define('Atlas.plan.view.group.RuleSetUpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-group-rulesetup',
    data:{
        isEditing: false
    },
    stores: {
        rules: {
            type:'plan-planDURRules'
        },
        drugs: {
            type:'plan-plandurruledrugs'
        },
        ruletypes: {
            type:'plan-ruletypes'
        },
        durtypes: {
            type:'plan-durtypes'
        },
        durcondition: {
            type:'plan-durcondition'
        },
        rejectioncodes: {
            type:'plan-rejectioncodes'
        }
        ,
        hedismeasures: {
            type:'plan-hedismeasures'
        },
        ultimatechildetcid:{
            type:'plan-planetc'
        },
        plangcnseqno:{
            type:'plan-plangcnseqno'
        },
        plangpicodes:{
            type:'plan-plangpi'
        }
    }
});