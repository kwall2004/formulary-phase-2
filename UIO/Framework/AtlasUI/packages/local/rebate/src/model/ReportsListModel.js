Ext.define('Atlas.rebate.model.ReportsListModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'CategoryId', 'CategoryName', 'ReportModule', 'ReportObject', 'RptByDrugClass', 'dataAccessFilterFlag',
        'isFav', 'programName', 'reportID', 'reportName', 'rowNum', 'runMode', 'usePlanLevelDATree', 'userGroup'
    ],
    proxy: {
        url: 'shared/{0}/reportlist'
    }
});