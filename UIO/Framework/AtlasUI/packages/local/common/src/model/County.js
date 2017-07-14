Ext.define('Atlas.common.model.County',{
    extend: 'Atlas.common.model.Base',

    fields: [
        'name',
        'value'
    ],
    proxy: {
        // For reference only, value is set based on selected State
        //extraParams: {
        //    pState: ''
        //},
        url: 'shared/{0}/countybystate'
    }
});