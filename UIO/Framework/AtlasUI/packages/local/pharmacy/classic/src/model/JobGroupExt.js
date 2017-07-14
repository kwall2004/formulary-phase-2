Ext.define('Atlas.pharmacy.model.JobGroupExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'groupCodeDescr', 'systemID', 'jobGroupCode', 'dbRowID', 'rowNum', 'moduleName', 'lastModified'
    ],

    proxy: {
        extraParams: {
            pBatchSize: '',
            pWhere: ''
        },
        url: 'shared/{0}/jobgroupext'
    }

});
