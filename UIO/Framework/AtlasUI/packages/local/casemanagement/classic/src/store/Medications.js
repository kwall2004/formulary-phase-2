/**
 * Created by S4505 on 4/10/2017.
 */

Ext.define('Atlas.casemanagement.store.casedetails.Medications',{
    alias: 'store.casemanagement-medications',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.MedicationsModel',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type:'layer7',
        url: 'member/{0}/mtmmedications',
        extraParams: {
            pMTMId: null,
            pMedicationId:null,
            pagination:true
        },
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }

});
