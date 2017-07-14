/**
 * Created by agupta on 10/3/2016.
 */
Ext.define('Atlas.authorization.view.RedeterminationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.redeterminationviewmodel',

    stores: {
        storeredeterminationhistory: {
            model: 'Atlas.authorization.model.cdag.RedeterminationModel',
            autoLoad: false
        },

        storerdreceivedvia: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedVia'
                },
                url: 'shared/{0}/listitems'
            },
            autoLoad : true
        },

        storeappealtype: {
            model: 'Atlas.authorization.model.cdag.AppealTypeModel',
            autoLoad : false
        },

        storeurgencytype: {
            type: 'clonestore',
            storeId: 'storeurgencytype',
            model: 'Atlas.common.model.shared.ListDetailModel',
            proxy: {
                extraParams: {
                    pListName: 'UrgencyTypeRD'
                },
                url: 'system/{0}/listdetail'
            },
            autoLoad : false
        },

        storeRDUrgency: {
            type: 'clonestore',
            storeId: 'storeRDUrgency',
            model: 'Atlas.common.model.shared.ListDetailModel',
            proxy: {
                extraParams: {
                    pListName: 'UrgencyTypeRD'
                },
                url: 'system/{0}/listdetail'
            },
            autoLoad : true
        },

        storeRDUrgencyMedicare: {
            type: 'clonestore',
            storeId: 'storeRDUrgencyMedicare',
            model: 'Atlas.common.model.shared.ListDetailModel',
            proxy: {
                extraParams: {
                    pListName: 'UrgencyTypeRD'
                },
                url: 'system/{0}/listdetail'
            },
            autoLoad : true
        },

        storereceivedviass: {
            type: 'clonestore',
            storeId: 'storereceivedviass',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedVia'
                },
                url: 'shared/{0}/listitems'
            },
            autoLoad : true
        },

        storereceivedfrom: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthReceivedFrom'
                },
                url: 'shared/{0}/listitems'
            },
            autoLoad : true
        },
        storeassignto: {
            type: 'clonestore',
            storeId: 'storeassignto',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 2
                },
                url: 'system/{0}/queuelist'
            }
        },

        storeredeterminationstatus: {
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: false
        },

        storeRDCombo: {
            storeId: 'storeRDCombo',
            fields: ['ListItem', 'ListDescription']
        }
    }
});