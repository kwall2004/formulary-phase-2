Ext.define('Atlas.portals.hpmember.model.Affiliation', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'name'
    ],
    proxy: {
        // For reference only, value is set based on selected LOB
        //extraParams: {
        //    pListName: ''
        //},
        url: 'portal/hp/listitems'
    }
});