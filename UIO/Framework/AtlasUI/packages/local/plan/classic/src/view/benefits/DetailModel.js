/**
 * Created by a6686 on 11/16/2016.
 */

Ext.define('Atlas.plan.view.benefits.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-detail',
    data: {
        isEditing: false
    },
    stores: {

        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        planbenefit: {
            model: 'Atlas.plan.model.FormularyTier',
            autoLoad: true


        },
        accounts: {
            type: 'plan-carrieraccounts'
        },
        formularies: {
            type: 'plan-formularyitems',
            filters: [function (record) {
                // debugger;
                var now = Atlas.common.utility.Utilities.getLocalDateTime() ;
                return (record.get('StatDesc') == 'Draft' || record.get('StatDesc') == 'Approved'); // &&  record.get('TerminationDate') > now
            }]
        },

        dayallowedonline: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PlanSetupClaimDaysLimit'
                },
                url: 'shared/{0}/listitems'
            }
        },

        dayallowedreversal: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PlanSetupClaimDaysLimit'
                },
                url: 'shared/{0}/listitems'
            }
        },

        dayallowedpaper: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PlanSetupClaimDaysLimit'
                },
                url: 'shared/{0}/listitems'
            }
        },

        plandeductibleexcludedtiercodes: {
            model: 'Atlas.plan.model.FormularyTier',
            autoLoad: false


        },

        plangroups: {
            type: 'plan-plangroups',
            listeners: {
                load: 'onPlangroupLoad' //loads the correct record if openView
            }
        },
        StoreCoveragePhase: {
            model: 'Atlas.plan.model.PlanCoveragePhase',
            autoLoad: false
        },
        PlanServiceTypeStore: {
            model: 'Atlas.plan.model.PlanPharmaLimitsModel',
            autoLoad: false
        },
        StoreFulfillmentType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DispenserType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        DaysAllowedOnlineStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PlanSetupClaimDaysLimit'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreErrorMessage: {
           // type: 'clonestore',
            model: 'Atlas.plan.model.validatePlanBenefitSetup',
            autoLoad: false

        },
        planbenefitext: {
            model: 'Atlas.common.model.PlanBenefitExt',
            autoLoad: false
        }




    }
});



