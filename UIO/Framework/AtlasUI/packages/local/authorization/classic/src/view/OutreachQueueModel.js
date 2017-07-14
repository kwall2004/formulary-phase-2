/*
 Developer: Srujith Cheruku
 Description: view model for Outreach Queue
 Origin: Merlin
 8/22/16

 */
Ext.define('Atlas.authorization.view.OutreachQueueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.outreachqueuemodel',

    stores: {
        outreachPendingDecisionStore: {
            pageSize: 10,
            model: 'Atlas.authorization.model.OutreachPendingDecisionModel',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        },
        outreachAORStore: {
            pageSize: 10,
            model: 'Atlas.authorization.model.OutreachAORModel',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: true
        }
    }
})