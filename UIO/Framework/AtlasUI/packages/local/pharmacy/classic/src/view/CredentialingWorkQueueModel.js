Ext.define('Atlas.pharmacy.view.CredentialingWorkQueueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.credentialingworkqueuemodel',

    data: {
        // Grid Panel Labels
        addOnsReceivedLbl: "",
        initialReceivedLbl: "",
        inProcessLbl: "",
        lettersLbl: "",
        reCredReceivedLbl: "",
        missingInfoLbl: "",
        verificationLbl: "",
        signRequiredLbl: "",
        executiveSignLbl: "",
        financeLbl: "",

        // Grid Panel Identifiers
        addOnsReceivedPnl: 0,
        initialReceivedPnl: 1,
        inProcessPnl: 2,
        lettersPnl: 3,
        ReCredReceivedPnl: 4,
        missingInfoPnl: 5,
        verificationPnl: 6,
        signRequiredPnl: 7,
        executiveSignPnl: 8,
        financePnl: 9,

        // Grid Panel To Show as Selected
        panelToShowOnLoad: 0

    },
    stores: {

        pharmcredqueues: {
            model: 'Atlas.pharmacy.model.PharmCredQueues'
        },
        addOnsReceived: {
            proxy: {
                type: 'memory',
                enablePaging: true,
                remoteFilter: true
            }

            /*
             proxy: {
             type: 'memory',
             reader: {type: 'array'}
             },
             reader: {
             type: 'json',
             rootProperty: 'Rows',
             totalProperty: 'Count'
             }

             proxy: {
             type: 'memory',
             enablePaging: true,
             reader: {
             type: 'array',
             rootProperty: ''
             }
             },
             */



        },
        genderList: {
            id: 'genderList',
            fields: ['name', 'value'],
            autoload: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/dummydata/formulary/gender.json',
                reader: {
                    type: 'json',
                    rootProperty: ''
                }
            }
        },
        initialReceived: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        recred: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        inProcess: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        letters: {
            //Most likely 'Atlas.common.model.AttachmentList' from common area should be used
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        reCredReceived: {

            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        missingInfo: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        verification: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        signRequired: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        executiveSign: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        },
        finance: {
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        }
    }
});

