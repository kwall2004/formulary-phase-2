/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGLettersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdaglettersviewmodel',
    stores: {

        storeLetters : {
            model: 'Atlas.authorization.model.cdag.DenialAppealModel',
            pageSize: 15,
            autoLoad: false
        },

        storePriorAuthRequestType : {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeCaseNotificationType : {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeMbrAppealLetters : {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        }


        /*
        storehistoryjson: {
            model: 'Atlas.authorization.model.cdag.MemberPAHistoryModel',
            autoLoad: false
        }

        storeauthstatus: {
         type: 'clonestore',
         model: 'Atlas.common.model.shared.ListModel',
         proxy: {
         extraParams: {
         pListName: 'PriorAuthStatus'
         },
         url: 'shared/{0}/listitems'
         }
         }*/
    }
});
