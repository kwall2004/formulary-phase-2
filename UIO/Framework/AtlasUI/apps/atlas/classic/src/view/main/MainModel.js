Ext.define('Atlas.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        user: {
            firstname: 'Atlas User #1',
            inboxEnabled: true,
            splitPanelEnabled: true,  // todo: needs entity switch sync, DnD Tabs developed, and activePanel logic established - Phase II
            email: 'user1@atlascomplete.com'
        }
    },
    stores: {
        projects: {
            sorters: 'text',
            data: [
                {id: 'merlin', text: 'Merlin'},
                //{id: 'mcs', text:'MCS'},
                {id: 'prescriber', text: 'Prescriber Portal'},
                {id: 'membermhp', text: 'Member MHP Portal'},
                {id: 'memberrx', text: 'Member Rx Portal'},
                {id: 'provider', text: 'Provider Portal'},
                {id: 'atlas', text: 'New Atlas'}
            ]
        },
        dataaccess: {
            type: 'common-merlin-dataaccesstree'
        }
    }

});
