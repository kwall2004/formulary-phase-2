/**
 * Created by S4505 on 10/20/2016.
 */

Ext.define('Atlas.admin.model.ReportSettings', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminReportSettings',

    fields: [

        { name: 'reportModule',     type: 'string' },
        { name: 'category',      type: 'string' },
        { name: 'reportobject',   type: 'string'},
        { name: 'reportName',     type: 'string' },
        { name: 'programName',      type: 'string' },
        { name: 'runMode',   type: 'string'},
        { name: 'userGroup',      type: 'string' },
        { name: 'reportByDrugClass',   type: 'boolean'},
        { name: 'dataAccessFilter',   type: 'boolean'},
        { name: 'expandPlanLevel',   type: 'boolean'}
    ],
    proxy: {
        url: 'admin/rx/reportsettings',
        timeout: 120000
    }

});
