/**
 * Created by s6685 on 11/17/2016.
 */
Ext.define('Atlas.authorization.view.MyPAQueueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MyPAQueueViewModel',
    stores: {
        ListMaintenanceModelStore: {
            model: 'Atlas.authorization.model.cdag.ListMaintenanceModel',
            autoLoad: false

        },

        PriorAuthInMyQueueStore: {
            model: 'Atlas.authorization.model.PriorAuthInMyQueueModel',
            remoteSort: true,
            pageSize: 18
            //autoLoad: true
        },
        UrgencyListDetailStore: {
            model: 'Atlas.common.model.shared.ListDetailModel'            
        },
        DeterminListDetailStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DeterminationType'
                },
                url: 'system/{0}/listdetail'
            }
        },
        PriorAuthHoursDetailStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthHoursWaitingInQueue'
                },
                url: 'system/{0}/listdetail'
            }
        },
        AssignToUserStore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.AssignToUser',
            autoLoad: false,
            proxy: {
                extraParams: {
                    pQueueListID: '2'
                },
                url: 'system/{0}/queuelist'
            }
        }

    }
});


