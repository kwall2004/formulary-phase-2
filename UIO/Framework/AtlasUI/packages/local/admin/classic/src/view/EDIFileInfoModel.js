/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.view.EDIFileInfoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.edifileinfo',

    requires: ['Atlas.common.store.CloneStore'],
    stores: {
        edifileinfo: {
            model: 'Atlas.admin.model.EDIFileInfo',
            remoteSort: true,
            remoteFilter: false,
            autoLoad: false
        },
        carrierAccountInfoExt:{
            //Atlas.admin.model.CarrierAccountInfo
            model: 'Atlas.admin.model.CarrierAccountInfoExt',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },
        allCarrierInfo:{
            model: 'Atlas.admin.model.AllCarrierInfo',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false

        },
        ediPartners:{
            model: 'Atlas.admin.model.EDIPartners',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },
        carrierLobExt:{
            model: 'Atlas.admin.model.CarrierLOBExt',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        },
        listDetails:{
            type:'admin-listDetails'
        }
    }
});