
Ext.define('Atlas.prescriber.view.PrescriberModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.prescriber',

    data: {
        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        openedTabs:{
            claims:false,
            contactlog:false,
            fax:false,
            general: false,
            priorAuth:false
        }
    },
    stores: {
        menu: {
            model: 'Atlas.common.model.SystemMenu',
            autoLoad: false
        },
        priorauths: {
            model: 'Atlas.common.model.MemberPAHistory',
            listeners:{
                load: function(store,record){
                    store.sort('AuthID', 'DESC');
                }
            }
        },
        prescriberliststore: {
            model: 'Atlas.common.model.PrescriberList',
            remoteSort: true,
            remoteFilter: true
        },
        prescribersstore: {
            model: 'Atlas.common.model.Prescriber',
            remoteSort: true,
            remoteFilter: true
        },
        faxandattachments: {
            model: 'Atlas.common.model.PrescriberFaxAndAttachments',
            remoteSort: true,
            remoteFilter: true
        },
        carrierlobsstore: {
            model: 'Atlas.plan.model.CarrierLOB',
            autoLoad:true
        },
        statestore: {
            model: 'Atlas.common.model.State',
            autoLoad:true
            /*remoteSort: true,
            removeFilter: true*/
        },
        contactloglist: {
            model: 'Atlas.common.model.ContactLog',
            session:true,
            remoteSort: true,
            remoteFilter: true
        }
    }
});
