/**
 * Created by g2304 on 11/4/2016.
 */
Ext.define('Atlas.common.view.merlin.JobQueueMainViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Atlas.common.model.Base'
    ],
    alias: 'viewmodel.jobqueuemain',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'JobQueueMain',
            autoLoad: true
        }
        */
        jobSortBy: {
            fields: [
                {name: 'text', type: 'string'},
                {name: 'value', type: 'string'}
            ],
            data: [
                {text: 'Job Number', value: 'JobNum'},
                {text: 'Date', value: 'submitDateTime'},
                {text: 'Status', value: 'JobStatus'},
                {text: 'User', value: 'submittedBy'}
            ]
        },

        jobStatus: {
            type: 'clonestore',
            model: Atlas.common.model.shared.ListModel,
            proxy: {
                extraParams: {pListName: 'jobstatus'},
                url: 'shared/{0}/listitems'
            },
            autoLoad: true
        },

        userList: {
            model: Atlas.common.model.shared.UserNameList,
            autoLoad: false
        },

        jobQueueList: {
            model: 'Atlas.home.model.JobQueueAlert'
        }

    },

    data: {
        showFilter: 'All',
        jobStatusValue: 'All',
        faxType: 'All',
        submitDateFrom: '',
        submitDateTo: '',
        userName: Atlas.user.un,
        description: '',
        sortBy: 'submitDateTime',
        documentID: null,
        faxNumber: null,
        jobNumber: null

    }
});