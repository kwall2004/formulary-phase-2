Ext.define('Atlas.letter.model.AIMSJobsDocsModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.aimsjobsdocsmdl',
    fields: [
        {
            name: 'CreateDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'ApprovedDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'MerlinSentDate',
            type: 'string',
            dateFormat: 'Y/m/d H:i:s'
        },
        {
            name: 'AIMSDate',
            type: 'string',
            dateFormat: 'Y/m/d H:i:s'
        },
        {
            name: 'POBoxDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }

    ],
    proxy: {
        url: 'member/{0}/aimsjobdocs',
        extraParams: {
            pagination: true,
            pageSize: 10
        }
    }
});