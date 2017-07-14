/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.store.LTCDetailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.LTCDetailsViewModel',
    stores: {
        StoreLTC: {
            // model: 'Atlas.casemanagement.model.LTCModel',
            // autoLoad: false
            type:'casemanagement-ltcdetails'
        }
    }
})
