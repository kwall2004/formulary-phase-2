/**
 * Created by j2487 on 11/23/2016.
 */
Ext.define('Atlas.rebate.model.ReportInfo', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'pReportId', type: 'string' },
        { name: 'pReportName', type: 'string' },
        { name: 'pRunMode', type: 'string' }

    ],
    proxy: {
        url: 'shared/{0}/reportinfo'
    }
});