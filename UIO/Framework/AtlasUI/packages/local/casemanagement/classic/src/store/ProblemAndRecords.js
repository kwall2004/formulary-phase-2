/**
 * Created by S4505 on 4/10/2017.
 */

Ext.define('Atlas.casemanagement.store.casedetails.ProblemAndRecords',{
    alias: 'store.casemanagement-problemandrecords',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.ProblemAndRecordsModel',
    autoLoad: false,
    groupField: 'ProblemDesc',
    proxy: {
        type:'layer7',
        url: 'member/{0}/mtmproblemandgoals',
        extraParams: {
            ipiMTMId: ''
        }
    }

});
