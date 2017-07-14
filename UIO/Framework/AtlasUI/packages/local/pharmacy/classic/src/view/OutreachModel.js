Ext.define('Atlas.pharmacy.view.OutreachModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.outreach',

    data: {
        initialized: false,
        searchBy: '',
        ncpdp: null,
        npi: null,
        searchEmptyText: '',
        currentPharmacy: null,
        dateFrom: "",
        dateTo: "",
        dispenserTypesList: "",
        statesList: "",
        srchJobGroupExtMdl: ""

    },
    stores: {
        srchJobGroup: {
            model: 'Atlas.pharmacy.model.JobGroupExt',
            autoLoad: false,
            listeners: {
                //dataChanged: 'onStatesChanged'
            }
        },
        states: {
            model: 'Atlas.pharmacy.model.ListItems',
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },
        dispenserTypes: {
            model: 'Atlas.pharmacy.model.ListItems',
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },
        jobqueueattachments: {
            model: 'Atlas.pharmacy.model.JobQueueAttachments',
            autoLoad: false,
            listeners: {
                dataChanged: 'onJobQueueAttachmentsChanged'
            },
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        }

    }
});
