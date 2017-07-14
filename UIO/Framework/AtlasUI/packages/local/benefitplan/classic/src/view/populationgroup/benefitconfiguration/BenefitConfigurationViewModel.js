/**
 * Created by l6630 on 10/13/2016.
 */

Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.BenefitConfigurationViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.populationgroupbenefitconfiguration',

    data : {
        popGrpPBPSK : '0',
        popGrpPBPStatusIsDraft:true,
        cansavings: false,
        validforms: false,
        changed: false,
        editingmedrow: 0,
        editingpharmrow: 0,
        onstatuscheck: false

    },

    stores: {
        PopulationGroupPlanBenefitPackageSubmitForApproval:{
            model : 'Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSubmitForApproval',
            autoLoad: false
        },
        populationgroupbenefitconfiguration: {
            model : 'Atlas.benefitplan.model.PopulationGroupBenefitConfiguration',
            autoLoad: false,
            proxy: {
                type: 'benefitplan',
                url: '/PopulationGroupBenefitConfiguration'
            },
            listeners: {
                'load': 'onConfigurationLoad'
            }
        },


        macList : {
            fields: ['MACListName', 'MACListID']
        },

        pcnList : {
            fields: ['Value', 'Text']
        },


        binList : {
            fields: ['Value', 'Text']
        },

        statusnotes: {
            model: 'Atlas.benefitplan.model.workflow.StatusNotes'
        },
        /*PopulationGroupBenefitWorkflow*/
        popGrpBenefitWorkflow: {
            model: 'Atlas.benefitplan.model.workflow.PGBWorkflow',
            proxy: {
                actionMethods: {
                    create: 'PUT',
                    read: 'PUT',
                    update: 'PUT',
                    destroy: 'PUT'
                },
                type: 'benefitplan',
                url: '/PopulationGroupBenefitWorkflow'
            }
        },
        benefitPlanIntegration:{
            model: 'Atlas.benefitplan.model.workflow.BenefitPlanIntegration',
            proxy: {
                type: 'benefitplan',
                url: '/BenefitPlanIntegration',
                actionMethods: {
                    create: 'POST',
                    read: 'GET',
                    update: 'PUT',
                    destroy: 'PUT'
                }
            }
        }

    },
    formulas: {
        DOSProcsngStartDt: function(get) {
            var d = get('populationGroupPlanBenefitPackage.DOSProcsngStartDt');
            return d? Ext.Date.parseDate(d, 'Y-m-d\\TH:i:s') : '';
        },

        DOSProcsngEndDt: function(get) {
            var d = get('populationGroupPlanBenefitPackage.DOSProcsngEndDt');
            return d? Ext.Date.parseDate(d, 'Y-m-d\\TH:i:s') : '';
        }
    }
});