/**
 * Created by d4662 on 11/19/2016.
 */
Ext.define('Atlas.admin.view.SignaturesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminSignaturesViewModel',

    stores: {
        signaturesStore: {
            model:'Atlas.common.model.Signatures',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        },
        postscriptnamesStore:{
            model:'Atlas.common.model.PostScriptNames',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        }
    }

    });