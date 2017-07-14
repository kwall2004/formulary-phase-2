Ext.define('Atlas.common.view.main.WorkspaceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.workspace',
    data:{
        splitWorkspace: false,
        workspaceTitle: 'Apps'
    },
    stores: {

        // navigation: {
        //     type:'tree',
        //     autoLoad: false,
        //     proxy: {
        //         type: 'ajax',
        //
        //         // headers: { 'Cookie' : Atlas.user.SessionCookie },
        //         // useDefaultXhrHeader : false,
        //         // withCredentials : true,
        //
        //         noCache: false,
        //         pageParam: '',
        //         startParam: '',
        //         limitParam: '',
        //
        //         reader: {
        //             type: 'json',
        //             rootProperty: ''
        //         },
        //         url: 'resources/data/common-workspace-navigation.json'
        //         //,
        //         //useDefaultXhrHeader: false
        //        /// url: 'http://apidev.atlascomplete.local/atlas/v1/core/userroles'
        //     }
        // },

        menuitems: {
            type:'common-systemmenus'
        },

        history: {
            proxy: {
                type: 'ajax',
                url: '/api/history',
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            autoLoad: false
        }
    }
});
