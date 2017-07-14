/**
 * Created by agupta on 10/12/2016.
 */
Ext.define('Atlas.authorization.view.cdag.SendFaxWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sendfaxwindowmodel',
    stores: {
        storesubmitJob : {

        },

        storeexistingpa: {
            model: 'Atlas.authorization.model.ExistingPAModel',
            autoLoad: false
        },

        storeauthstatus: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PriorAuthStatus'
                },
                url: 'shared/{0}/listitems'
            }
        }
    }
});
