Ext.define('Atlas.finance.view.collection.CollectionQueueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-collectionqueue',

    stores: {
        requiredCollection: {
            model:'Atlas.finance.model.CollectionQueueRequired',
            remoteSort: true,
            sorters: [{
                property: 'DueDate',
                direction: 'DESC'
            }],
            pageSize: 25
        },

        pendingCollection: {
            model:'Atlas.finance.model.CollectionQueuePending',
            remoteSort: true,
            sorters: [{
                property: 'DueDate',
                direction: 'DESC'
            }],
            pageSize: 25
        },

        approvedCollection: {
            model:'Atlas.finance.model.CollectionQueueApproved',
            remoteSort: true,
            sorters: [{
                property: 'DueDate',
                direction: 'DESC'
            }],
            pageSize: 25
        },

        queueList: {
            model: 'Atlas.common.model.shared.AssignToUser'
        }
    },

    data: {

    }
});