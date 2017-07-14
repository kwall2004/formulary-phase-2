Ext.define('Atlas.encounter.view.EncountersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.encountersencountersviewmodel',

    data: {
        searchParams: {
            pEncounterID: null,
            pBatchSize: 25,
            pJumpStart: 0,
            pDirection: 'Fwd',
            pBckRecPointer: '',
            pFwdRecPointer: '',
            pagination: false
        },
        loadPagination: true
    },

    stores: {
        PagingToolbarStore: {
            storeId: 'PagingToolbarStore',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        },
        encountersGrid: {
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        encountersGridInitLoad: {
            model: 'Atlas.encounter.model.EncountersModel',
            autoLoad: true,
            sorters: [{
                property: 'EncounterId',
                direction: 'DESC'
            }],
            remoteSort: true,
            remoteFilter: true,
            listeners: {
                load: 'onLoadEncountersGridInitLoad'
            }
        },
        encountersDetailGrid: {
            model: 'Atlas.encounter.model.EncounterDetailModel',
            sorters: [
                'RecordId'
            ],
            pageSize: 25
        },
        encountersRejectGrid: {
            model: 'Atlas.encounter.model.EncounterRejectModel',
            sorters: [
                'RejectCode'
            ]
        },
        encounterDocument: {
            model: 'Atlas.encounter.model.EncounterDocumentModel'
        },

        getDocumentURL: {
            model: 'Atlas.encounter.model.getDocumentURL'
        }
    }
});