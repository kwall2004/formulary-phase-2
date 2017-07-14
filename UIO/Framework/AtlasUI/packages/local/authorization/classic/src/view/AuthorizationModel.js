/**
 * Created by agupta on 9/1/2016.
 */
Ext.define('Atlas.authorization.view.AuthorizationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authorization',

    data: {
        /*
        isMemberSelected: false,
        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        planGroupName: "" //value set from MemberMasterExt to be used in Order Docs
        */
    },

    stores: {
        storeDeterminationType: {
            model: 'Atlas.authorization.model.ModelDeterminationType',
            remoteSort: true,
            remoteFilter: true
        }
    },

    formulas: {
        canOrderDocs: function (get) {
            return get("isMemberSelected");
        }
    }
});