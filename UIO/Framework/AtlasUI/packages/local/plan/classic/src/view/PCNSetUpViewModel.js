/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.view.PCNSetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-planpcnsetup',


    data: {
        //note: this needs to move to controller with user permissions
        userpermissions: {
            create: true,
            update: true,
            destroy: true
        }
    },

    stores: {
        carriers: {
            //type: 'plan-carriers'
            model: 'Atlas.plan.model.Carrier'//,
            //autoLoad: true
        },
        lobs: {
           // type: 'plan-carrierLOBs'
            model: 'Atlas.plan.model.CarrierLOB',
            autoLoad: false
        },
        pcnaccounts: {
          //  type: 'plan-carrieraccounts'
            model: 'Atlas.plan.model.CarrierAccount',
            autoLoad: false
        },

        pcnsetups: {
            type: 'plan-planpcnsetups'
            // listeners: {
            //     load: function (store, records) {
            //         //debugger;
            //     }
            // }
        },
        planbenefitlistItem: {
            model: 'Atlas.plan.model.PlanBenefitListItem'
        },
        rejectedcodes: {
            model: 'Atlas.plan.model.RejectedCode'
           // autoLoad: true
        },
        pharmacytypes: {
            model: 'Atlas.plan.model.PharmacyType'
            //autoLoad: true
        },
        pcnrulesetupdetails: {
            model: 'Atlas.plan.model.PCNRuleSetupDetail'
        },
        planlineofbusiness: {
            type: 'plan-lineofbusiness'
        },
        plangroups: {
            //model: 'Atlas.plan.model.PlanGroup',
            model:'Atlas.common.model.PlanGroup',
            remoteSort:true,
            remoteFilter: true
        },
        plangroupdetailinfo: {
            model : 'Atlas.plan.model.PlanGroupInfo',
            autoLoad : false
        },
        planBenefitExt: {
            model : 'Atlas.plan.model.PlanBenefitExt',
            autoLoad : false
        }
    }

});