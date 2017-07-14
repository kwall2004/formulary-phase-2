/**
 * Created by s6393 on 10/25/2016.
 */
Ext.define('Atlas.benefitplan.view.costsharingexceptions.CostSharingExceptionsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.costSharingExceptionsViewModel',
    data: {
        changed: false,
        isValid: false,
        multiplierAmount: false
    },
    stores: {
        /*Copay Exclusions*/
        copayExclusions: {
            model: 'Atlas.benefitplan.model.CopayExclusions',
            proxy: {
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'PUT',
                    destroy: 'PUT'
                    
                },
                type: 'benefitplan',
                url: '/CopayExclusions'
            }
        },
        /*Dispense As Written*/
        dispenseAsWrittenCopay: {
            model: 'Atlas.benefitplan.model.DispenseAsWrittenCopay',
            proxy: {
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'PUT',
                    destroy: 'PUT'
                },
                type: 'benefitplan',
                url: '/DispenseAsWrittenCopay'
            }
        },
        basicdetails: {
            model: 'Atlas.benefitplan.model.BenefitPlan'
        },
        /*Deductible Exception */
        deductibleExceptions: {
            model: 'Atlas.benefitplan.model.DeductibleExceptions',
            proxy: {
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'PUT',
                    destroy: 'PUT'
                },
                type: 'benefitplan',
                url: '/DeductibleExceptions'
            }
        },
        /*Fill Exception*/
        fillException: {
            model: 'Atlas.benefitplan.model.FillException',
            proxy: {
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'PUT',
                    destroy: 'PUT'
                },
                type: 'benefitplan',
                url: '/FillException'
            }
        },
        /* Stores drop downs  */

        /*DispenseAsWrittenType*/
        dispenseAsWrittenType: {
            model: 'Atlas.benefitplan.model.DispenseAsWrittenType',
            autoLoad: true
        },
        /*CopayOverrideQualifierType*/
        copayOverrideQualifierType: {
            model: 'Atlas.benefitplan.model.CopayOverrideQualifierType',
            autoLoad: true
        },
        /*CopayCoinsuranceLogicType*/
        copayCoinsuranceLogicType: {
            model: 'Atlas.benefitplan.model.CopayCoinsuranceLogicType',
            autoLoad: true
        },
        /*BenefitPlan Pharmacy Type*/
        benefitPlanPharmacyType: {
            model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType',
            autoLoad: true
        },
        /*FormularyTier*/
        formularyTier: {
            model: 'Atlas.benefitplan.model.FormularyTier'
        },

        /*drugClassType*/
        drugClassType: {
            model: 'Atlas.benefitplan.model.DrugClassType',
            autoLoad: true
        },

        /*fillExceptionChangeQualifierType*/
        fillExceptionChangeQualifierType: {
            model: 'Atlas.benefitplan.model.FillExceptionChangeQualifierType',
            autoLoad: true
        },

        /*DeductibleExclusionQualifierType*/
        deductibleExclusionQualifierType: {
            model: 'Atlas.benefitplan.model.DeductibleExclusionQualifierType',
            autoLoad: true
        },
        BrandGenrcDifferenceIndStore: {
            fields : [
                'BrandGenrcDifferenceInd', 'display'
            ],
            data :[
                ['false', '% of Brand Cost'],
                ['true', 'Brand/Generic Difference']
            ]
        }

    }

}); //eof