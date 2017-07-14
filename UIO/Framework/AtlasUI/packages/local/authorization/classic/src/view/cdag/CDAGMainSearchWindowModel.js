Ext.define('Atlas.authorization.view.cdag.CDAGMainSearchWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdgmainsearchwindowmodel',
    //data: {
    //    isPlanGroupSelected: false
    //},
    stores: {
        storeexistingpa: {
            model: 'Atlas.authorization.model.ExistingPAModel',
            pageSize: 25,
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
        },

        storedeterminationtype: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'DeterminationType'
                },
                url: 'shared/{0}/listitems'
            }
        }
    }
});

