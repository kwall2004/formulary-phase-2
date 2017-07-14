/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: View Model for Reports.js
 **/

Ext.define('Atlas.reports.view.ReportsListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportsviewmodel',

    data: {
        masterrecord: null, //This is what the form binds to on successful load of MemberMaster
        isShowFavOn: true,
        isFirstListLoad: true,
        pcnList: '',
        plangroupList: '',
        planbenefitList: '',
        expandToLevel: '',
        uploadedDocId: [],
        hasFileUploader: false,
        dateRangeCounter: 0,
        orderFileUploader: [],
        fileUploaderDescriptionId: ''
    },
    stores: {
        reportlistdata: {
            model: 'Atlas.reports.model.ReportsListModel',
            sorters: 'reportName',
            pageSize: 25,
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        },
        dummylistdata: {
            model: 'Atlas.reports.model.ReportsListModel',
            sorters: 'reportName',
            remoteSort: true,
            autoLoad: false/*,
             pageSize: 25,
             remoteSort: true*/
        },
        userreportdata: {
            model: 'Atlas.reports.model.UserReportModel',
            sorters: 'reportName',
            autoLoad: false
        },
        dataaccessReport: {
            type: 'common-merlin-dataaccesstree'
        }
    }
});