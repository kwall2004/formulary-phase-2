/**
 * Created by agupta on 11/24/2016.
 */

Ext.define('Atlas.grievances.view.grievances.ViewAllGrievancesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.viewallgrievancesviewmodel',
    stores: {

        StoreGrievances: {
            model: 'Atlas.grievances.model.GrievanceSummaryModel',
            autoLoad: false,
            remoteSort: true,
            listeners : {
                beforesort : function(store, sorters) {
                    var sorter = sorters[0];
                    if (sorter.getProperty() === 'InitiatorFullName') {
                        sorter.setProperty('InitiatorFName');
                    }
                    else if (sorter.getProperty() === 'initiatedByID') {
                        sorter.setProperty('InitType');
                        //sorter.setProperty('initiatedByID');
                    }
                    else if (sorter.getProperty() === 'ReportingOnId') {
                        sorter.setProperty('ReptType');
                    }
                }
            }
        }


    }
});