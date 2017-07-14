Ext.define('Atlas.portals.provider.model.State',{
    extend: 'Atlas.common.model.Base',

    fields: [
        'name',
        'abbr'
    ],
    proxy: {
        extraParams: {
            pListName: 'states'
        },

        url: 'member/hp/listitems'
    }
});