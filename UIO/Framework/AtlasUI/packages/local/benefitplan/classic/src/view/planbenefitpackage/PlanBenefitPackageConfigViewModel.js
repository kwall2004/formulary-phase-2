/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.PlanBenefitPackageConfigViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.planbenefitpackageconfig',
    data: {
        PBPInfo: null
    },
    stores: {
        planbenefitpackageconfigs: {
            model: 'Atlas.benefitplan.model.PlanBenefitPackageConfig',
            remoteFilter: true,
            proxy: {
                type: 'benefitplan',
                url: '/PlanBenefitPackage',
                reader: {
                    keepRawData: true
                }
            }
        },
        benefitplantypes: {
            model: 'Atlas.benefitplan.model.BenefitPlanType'
        },

        PBPBnftPlanListStr : {
            model: 'Atlas.benefitplan.model.PlanBenefitPackageConfig'
        }
    }
});