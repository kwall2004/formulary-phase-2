/**
 * Created by S4505 on 4/10/2017.
 */

Ext.define('Atlas.casemanagement.store.casedetails.FaxQDocuments',{
    alias: 'store.casemanagement-faxqdocuments',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.FaxQModel',
    autoLoad: false,
    proxy: {
        type:'layer7',
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/faxqdocuments'
    }

});
