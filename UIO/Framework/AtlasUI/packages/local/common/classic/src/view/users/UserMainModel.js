Ext.define('Atlas.common.view.users.UserMainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usermain',

    stores: {
        navigation: {
            type:'tree',
            proxy: {
                type:'ajax',
                noCache: false,
                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: ''
                },
                url: 'resources/data/user-main.json'
            }
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
