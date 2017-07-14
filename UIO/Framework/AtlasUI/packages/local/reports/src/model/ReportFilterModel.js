/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Member
 * Description: Model for the Formulary Approval page
 **/

Ext.define('Atlas.reports.model.ReportFilterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'reportfiltermodel',
    fields: [
        {name: 'ReportID', type: 'string', mapping: 'ReportID' },
        {name: 'LabelName', type: 'string', mapping: 'LabelName' },
        {name: 'ParameterOrder', type: 'string', mapping: 'ParameterOrder' },
        {name: 'ControlType', type: 'string', mapping: 'ControlType'},
        {name: 'isFilterReqd', type: 'string', mapping: 'isFilterReqd' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/reportfilters'
        ///atlas/portal/rx/listdetail/read
    }
});