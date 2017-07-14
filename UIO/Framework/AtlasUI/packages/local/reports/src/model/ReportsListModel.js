/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Model for store: Atlas.reports.view.ReportsListViewModel (reportlistdata)
 **/

Ext.define('Atlas.reports.model.ReportsListModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'CategoryId', 'CategoryName', 'ReportModule', 'ReportObject', 'RptByDrugClass', 'dataAccessFilterFlag',
        'isFav', 'programName', 'reportID', 'reportName', 'rowNum', 'runMode', 'usePlanLevelDATree', 'userGroup'
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/reportlist',
        reader: {
            idProperty: 'reportlistTable'
        }
    }
});