Ext.define('Atlas.pharmacy.model.JobQueueData', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //'metadata'
    ],
    proxy: {
        extraParams: {
            pJobNum: '',
            pFieldList: '',
            pFieldValues: ''
        },
        url: 'shared/{0}/jobqueuedata'
    }
});
