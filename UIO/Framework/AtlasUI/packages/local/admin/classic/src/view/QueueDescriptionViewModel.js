/**
 * Created by s6685 on 11/22/2016.
 */
Ext.define('Atlas.admin.view.QueueDescriptionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.QueueDescriptionViewModel',
    data:{isNeedUpdate:'false'},
    stores: {
        QueueDescriptionListStore: {
            model: 'Atlas.member.model.queDescriptionModel',
            autoLoad: true,
            sorters: 'QueID'

        },
        storeAssignedPlanGroup: {
            model: 'Atlas.member.model.queDescriptionModel',
            autoLoad: false
        },
        StoreAvailablePlanGroup: {
             model: 'Atlas.plan.model.PlanGroup',
            autoLoad: true
        }
    }
    });
