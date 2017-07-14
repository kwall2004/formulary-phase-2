/**
 * Created by T4317 on 8/3/2016.
 * Modified by s6393 on 12/22/2016 to fix the defects from Test Track
 */
Ext.define('Atlas.rebate.view.RebateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rebate',

    stores: {
        states: {
            type: 'common-states',
            autoLoad: true
        },
        manufacturersrebate:{
            model: 'Atlas.rebate.model.Manufacturer',
            autoLoad: true
        },
        manufacturerstore: {
            model: 'Atlas.rebate.model.Manufacturer',
            autoLoad: true
          /*  listeners: {
                load: 'setLockUnlockImage'
            }*/
        },
        contactstore: {
            autoLoad: false,
            model: 'Atlas.rebate.model.Contact'
        },
        statestore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'states'
                },
                url: 'shared/{0}/listitems'
            }
        },
        lobstore: {
            type: 'clonestore',
            storeId:'lobstore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'LineOfBusiness'
                },
                url: 'shared/{0}/listitems'
            }
        },
        rebatecontractstore:{
            model: 'Atlas.rebate.model.RebateContract'
        },
        plangroupstore:{
            model:'Atlas.plan.model.PlanGroup'
        },
        contractdetailstore:{
            model:'Atlas.rebate.model.RebateContractDetail'
        },
        contractproductstore:{
            storeId:'productstore',
            model:'Atlas.rebate.model.RebateContractProduct'
        },
        paycyclestore:{
            fields:['name','value'],
            data:[
                {"name":"Quarterly","value":"Quarterly"},
                {"name":"Annually","value":"Annually"}
            ]
        },
        statusstore:{
            fields:['name','value'],
            data:[
                {"name":"Draft","value":"Draft"},
                {"name":"Active","value":"Active"},
                {"name":"Inactive","value":"Inactive"}
            ]
        },
        attachmentandreportstore:{
            model:'Atlas.rebate.model.JobQueueAndAttachmentsModel'
        },
        rebatetypestore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'RebateType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        costbasisstore:{
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'RebateCostBasis'
                },
                url: 'shared/{0}/listitems'
            }
        },
        contractnotestore:{
            model:'Atlas.common.model.Notes',
            remoteSort: true,
            remoteFilter: true
        },

        rebatecontractplanstore:{
            model:'Atlas.rebate.model.RebateContractPlans',
            remoteSort: true,
            remoteFilter: true
        },
        competitorproductstore:{
            model:'Atlas.rebate.model.CompetitorProduct',
            remoteSort: true,
            remoteFilter: true
        },
        dataaccessReport: {
            type: 'common-merlin-dataaccesstree'
        },
        reportinfostore:{
            model:'Atlas.rebate.model.ReportInfo'
        },
        claimrules:{
            model:'Atlas.rebate.model.ClaimRules'
        },
        rebateclaimfields: {
            autoLoad: true,
            model:'Atlas.rebate.model.RebateClaimFields'
        },
        claimeditrulecond:{
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'ClaimEditRuleCond'
                },
                url: 'shared/{0}/listitems'
            }
        }

    },
    data: {
        manufacturerRec:null,
        manufacturerID:0,
        selectedCoverdPlan:null,
        enableManufacturerId: false,
        inCreate: true,
        inEdit: false,
        inSave: false,
        inCancel: false,
        inDelete: false,
        isManufacturerSelected : false,
        contractDetailCount : 0,
        pcnList: '',
        plangroupList: '',
        planbenefitList: '',
        expandToLevel: ''
    }
});