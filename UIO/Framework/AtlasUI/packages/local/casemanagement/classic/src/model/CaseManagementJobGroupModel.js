/**
 * Created by s6393 on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.model.CaseManagementJobGroupModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemID', type: 'string'},
        {name: 'jobGroupCode', type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/jobgroupext',
        extraParams: {
            pBatchSize: 0,
            pWhere: "moduleName = 'CaseManagement'"
        }

    }

})