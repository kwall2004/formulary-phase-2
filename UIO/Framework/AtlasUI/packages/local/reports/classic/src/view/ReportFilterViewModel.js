/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Formulary
 * Description: View Model for Formulary Approval
 **/

Ext.define('Atlas.reports.view.ReportFilterViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportfilterviewmodel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.ActionProxy',
        'Ext.Glyph',
        'Ext.util.*',
        'Ext.toolbar.Paging'
    ],
    data: {
        masterrecord: null //This is what the form binds to on successful load of MemberMaster
    },
    stores: {
        reportfilterdata: {
            model: 'Atlas.reports.model.ReportFilterModel',
            session: true
        },
        comboboxlistsdata: {
            model: 'Atlas.reports.model.ReportsListItemsModel',
            session: true,
            storeId: 'rptListsStore'//,
            //autoLoad: true
        },
        reportsubmitdata: {
            model: 'Atlas.reports.model.ReportSubmitModel',
            session: true,
            storeId: 'rptSubmitStore',
            root: 'message'
        },
        dataaccess: {
            type: 'common-merlin-dataaccesstree'
        }
    }
});
