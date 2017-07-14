Ext.define('Atlas.portals.hpmember.model.City', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'name'
    ],
    proxy: {
        // For reference only, value is set based on selected State
        //extraParams: {
        //    pState: ''
        //    pCountyCode: ''
        //},
        url: 'portal/hp/citylist'
    }
});